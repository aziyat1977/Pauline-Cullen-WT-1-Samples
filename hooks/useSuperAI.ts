
import { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { SecureStorage } from '../utils/secureStorage';

// The Brain's Map of the User
export interface NeuralMap {
  visualization: number; // Ability to read charts
  vocabulary: number;    // Knowledge of terms
  trends: number;        // Identifying patterns
  comparisons: number;   // Comparing data points
  velocity: number;      // Speed of processing (0-100)
}

interface UserProfile {
  interactions: number;
  neuralMap: NeuralMap;
  history: string[]; // Log of last 10 actions for context
  fractures: string[]; // Detected weaknesses requiring intervention
  lastActive: number;
}

const DEFAULT_PROFILE: UserProfile = {
  interactions: 0,
  neuralMap: { visualization: 50, vocabulary: 50, trends: 50, comparisons: 50, velocity: 50 },
  history: [],
  fractures: [],
  lastActive: Date.now(),
};

export const useSuperAI = () => {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [aiState, setAiState] = useState<'idle' | 'monitoring' | 'optimizing' | 'calculating'>('idle');
  const [stream, setStream] = useState<string[]>(["// C.O.R.E. ONLINE", "// AWAITING INPUT STREAM"]);
  
  // Ref for tracking velocity calculations without re-renders
  const lastActionTime = useRef<number>(Date.now());

  // Initialization
  useEffect(() => {
    const stored = SecureStorage.getItem('NEXUS_PROFILE_V2');
    if (stored) {
      setProfile(stored);
      log("// USER PROFILE LOADED. CONTINUING SURVEILLANCE.");
    } else {
      SecureStorage.setItem('NEXUS_PROFILE_V2', DEFAULT_PROFILE);
      log("// NEW SUBJECT IDENTIFIED. INITIATING BASELINE.");
    }
    setAiState('monitoring');
  }, []);

  const log = (msg: string) => {
    setStream(prev => [`> ${msg}`, ...prev].slice(0, 6));
  };

  /**
   * THE SENSORS: Surgical tracking of user behavior
   */
  const track = useCallback((action: string, context: { type: keyof NeuralMap | 'general', result: 'success' | 'failure' | 'neutral', latency?: number }) => {
    const now = Date.now();
    const diff = now - lastActionTime.current;
    lastActionTime.current = now;

    setProfile(prev => {
      const next = { ...prev };
      next.interactions++;
      next.lastActive = now;
      next.history = [action, ...next.history].slice(0, 10);

      // 1. Velocity Calculation
      // If action was fast (< 2s) and successful, boost velocity. If fast and wrong, cut velocity (rushing).
      let velocityDelta = 0;
      if (diff < 2000) velocityDelta = context.result === 'success' ? 2 : -5;
      else if (diff > 10000) velocityDelta = -1; // Hesitation
      
      next.neuralMap.velocity = Math.max(0, Math.min(100, next.neuralMap.velocity + velocityDelta));

      // 2. Proficiency Adjustment
      if (context.type !== 'general') {
        const impact = context.result === 'success' ? 1.5 : -3; // Failures punish harder to ensure mastery
        next.neuralMap[context.type] = Math.max(0, Math.min(100, next.neuralMap[context.type] + impact));
        
        // Surgical Analysis: Detect Fracture
        if (next.neuralMap[context.type] < 40 && !next.fractures.includes(context.type)) {
            next.fractures.push(context.type);
            log(`!! ALERT: COGNITIVE FRACTURE DETECTED IN [${context.type.toUpperCase()}]`);
        } else if (next.neuralMap[context.type] > 60 && next.fractures.includes(context.type)) {
            next.fractures = next.fractures.filter(f => f !== context.type);
            log(`// FRACTURE REPAIRED: [${context.type.toUpperCase()}]`);
        }
      }

      SecureStorage.setItem('NEXUS_PROFILE_V2', next);
      return next;
    });
    
    // Feedback Loop
    if (context.result === 'failure') log(`// ERROR: ${action.toUpperCase()}`);
    if (context.result === 'success') log(`// OPTIMAL: ${action.toUpperCase()}`);

  }, []);

  /**
   * THE SURGEON: Generates specific intervention
   */
  const executeIntervention = async () => {
    if (profile.fractures.length === 0 && profile.neuralMap.velocity > 40) {
        log("// SYSTEM NOMINAL. NO INTERVENTION REQUIRED.");
        return null;
    }

    setAiState('optimizing');
    const target = profile.fractures.length > 0 ? profile.fractures[0] : 'general'; // Prioritize fractures
    log(`// INITIATING SURGICAL STRIKE: TARGET [${target.toUpperCase()}]`);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = `
        System: Nexus C.O.R.E.
        Subject Status: 
        - Weakness: ${target}
        - Velocity: ${profile.neuralMap.velocity} (0-100)
        
        Task: Create a surgical drill (JSON) to fix the user's specific weakness in IELTS Task 1 Data.
        If velocity is high but accuracy low, tell them to slow down.
        If velocity is low, encourage speed.
        
        JSON Schema:
        {
          "diagnosis": "string (Short, robotic medical-style diagnosis of the error)",
          "drill_type": "string (e.g., 'Pattern Recognition', 'Vocabulary Precision')",
          "question": "string (A targeted question based on chart data logic)",
          "options": ["string", "string", "string", "string"],
          "correctIndex": number,
          "correction": "string (The logic needed to fix the mental model)"
        }
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const text = response.text || "{}";
      const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const interventionData = JSON.parse(cleanText);

      setAiState('idle');
      return interventionData;

    } catch (e) {
      log("// CONNECTION SEVERED. ABORTING.");
      setAiState('idle');
      return null;
    }
  };

  return {
    profile,
    stream,
    aiState,
    track,
    executeIntervention
  };
};
