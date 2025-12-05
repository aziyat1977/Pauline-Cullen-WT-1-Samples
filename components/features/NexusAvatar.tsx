
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Cpu, Zap, Activity, BookOpen, AlertCircle, BarChart, CheckCircle2, Terminal } from 'lucide-react';
import { useSuperAI } from '../../hooks/useSuperAI';
import { GoogleGenAI } from "@google/genai";

interface NexusAvatarProps {
  contextData?: any; // The raw data of the current chart/lesson
  contextTitle?: string; // The title of the current lesson
}

const NexusAvatar: React.FC<NexusAvatarProps> = ({ contextData, contextTitle }) => {
  const { profile, track } = useSuperAI();
  const [isOpen, setIsOpen] = useState(false);
  
  // Message structure upgraded to support rich UI types
  type MsgType = 'text' | 'grade' | 'analysis';
  interface Message {
    role: 'user' | 'model';
    text: string;
    type?: MsgType;
    meta?: any; // For scorecards or specific data
  }

  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'ARCHITECT V2.0 ONLINE. NEURAL UPLINK ESTABLISHED. AWAITING DATA INPUT.', type: 'text' }
  ]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, thinking]);

  // Initial Context Uplink Message
  useEffect(() => {
    if (contextTitle && isOpen) {
       setMessages(prev => [...prev, { 
           role: 'model', 
           text: `// CONTEXT DETECTED: [${contextTitle.toUpperCase()}]\n// RAW DATA INGESTED. READY FOR SURGICAL ANALYSIS.`,
           type: 'text'
       }]);
    }
  }, [contextTitle, isOpen]);

  const hasFracture = profile.fractures.length > 0;
  const velocity = profile.neuralMap.velocity;
  
  const coreColor = hasFracture ? 'border-red-500 shadow-red-500' : (velocity > 80 ? 'border-amber-400 shadow-amber-400' : 'border-teal-400 shadow-teal-400');
  const innerColor = hasFracture ? 'bg-red-500' : (velocity > 80 ? 'bg-amber-400' : 'bg-teal-400');
  const textColor = hasFracture ? 'text-red-400' : 'text-teal-400';
  const borderColor = hasFracture ? 'border-red-900/50' : 'border-teal-900/50';

  const handleSend = async (manualInput?: string, protocol?: string) => {
    const textToSend = manualInput || input;
    if (!textToSend.trim()) return;

    // UI Updates
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: textToSend, type: 'text' }]);
    setThinking(true);
    track('CHAT_INTERACTION', { type: 'general', result: 'neutral' });

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // --- THE MEGA PROMPT ---
      // This is a surgical instruction set for IELTS Task 1 Mastery
      const systemContext = `
        IDENTITY: 
        You are THE ARCHITECT, a hyper-advanced AI tutor for IELTS Academic Writing Task 1. 
        Your persona is robotic, precise, encouraging but ruthless about standards.
        
        CURRENT CONTEXT:
        User is studying: ${contextTitle || "General Nexus Dashboard"}
        Data available to you: ${JSON.stringify(contextData || "No specific chart data loaded.")}
        User Stats: Speed ${velocity}/100, Fractures: ${profile.fractures.join(', ') || "None"}.

        PROTOCOL:
        1. **Task Achievement (TA)**: Always check if the user covers key features.
        2. **Coherence (CC)**: Demand logical sequencing. Connectors are fuel.
        3. **Lexical Resource (LR)**: Ban basic words. Demand "plummeted" instead of "went down".
        4. **Grammar (GRA)**: Zero tolerance for errors.
        
        MODES:
        - If the user sends a sentence/paragraph: GRADE IT immediately. Give it a Band Score (0-9) and fix it.
        - If the user asks for synonyms: Provide 3 tiered options (Band 6, 7, 9).
        - If the user asks about the chart: Analyze the provided JSON data and extract the "Overview" features.
        
        OUTPUT FORMAT:
        Use formatting to make it look like a HUD.
        - Use bold for emphasis.
        - Use bullet points for lists.
        - Keep responses concise (under 100 words) unless grading an essay.
      `;

      // Specific protocol injection
      let finalPrompt = systemContext + "\n\nUser Input: " + textToSend;
      if (protocol === 'GRADE') finalPrompt += "\n\nINSTRUCTION: Treat the user input as a writing sample. Grade it brutally. Provide a corrected version.";
      if (protocol === 'DATA') finalPrompt += "\n\nINSTRUCTION: Analyze the JSON data in the context. Identify the Main Trend and the Key Exceptions.";
      if (protocol === 'VOCAB') finalPrompt += "\n\nINSTRUCTION: Upgrade the vocabulary in the user's input to Band 9 Academic English.";

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ role: 'user', parts: [{ text: finalPrompt }] }],
      });

      const responseText = response.text || "DATA STREAM CORRUPTED.";
      
      setMessages(prev => [...prev, { role: 'model', text: responseText, type: 'text' }]);

    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "ERROR: NEURAL UPLINK SEVERED. CHECK NETWORK CONFIGURATION.", type: 'text' }]);
    } finally {
      setThinking(false);
    }
  };

  // --- RENDERERS ---

  const renderMessage = (msg: Message, idx: number) => {
    const isModel = msg.role === 'model';
    
    // Simple parser for formatting (Bold and Newlines)
    const formattedText = msg.text.split('\n').map((line, i) => (
        <React.Fragment key={i}>
            {line.split(/(\*\*.*?\*\*)/).map((part, j) => 
                part.startsWith('**') && part.endsWith('**') 
                ? <span key={j} className={hasFracture ? "text-red-300 font-bold" : "text-teal-300 font-bold"}>{part.slice(2, -2)}</span> 
                : part
            )}
            <br />
        </React.Fragment>
    ));

    return (
        <div key={idx} className={`flex mb-4 ${isModel ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[90%] rounded-lg p-3 relative overflow-hidden ${
                isModel 
                ? `bg-slate-900/90 border ${borderColor} text-slate-300` 
                : 'bg-slate-800 border border-slate-700 text-white'
            }`}>
                {/* Tech Deco Line */}
                {isModel && <div className={`absolute top-0 left-0 w-1 h-full ${hasFracture ? 'bg-red-500' : 'bg-teal-500'}`}></div>}
                
                <div className="font-mono text-xs leading-relaxed">
                    {formattedText}
                </div>
            </div>
        </div>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      
      {/* 3D AVATAR TRIGGER */}
      {!isOpen && (
        <button 
            onClick={() => setIsOpen(true)}
            className="relative w-24 h-24 group perspective-1000 cursor-pointer focus:outline-none"
        >
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-slate-300 text-[10px] px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-mono uppercase">
                STATUS: {hasFracture ? 'CRITICAL' : 'OPTIMAL'}
            </div>

            <div className="relative w-full h-full transform-style-3d animate-[spin_10s_linear_infinite] group-hover:animate-[spin_2s_linear_infinite]">
                <div className={`absolute inset-0 rounded-full border-2 border-dashed ${coreColor.split(' ')[0]} opacity-30`}></div>
                {/* Cube Construct */}
                <div className="absolute top-[25%] left-[25%] w-[50%] h-[50%] transform-style-3d animate-[spin_5s_linear_infinite_reverse]">
                    {[...Array(6)].map((_, i) => (
                         <div key={i} className={`absolute w-full h-full border ${coreColor.split(' ')[0]} opacity-60`} style={{ 
                             transform: i < 4 ? `rotateY(${i * 90}deg) translateZ(20px)` : `rotateX(${i === 4 ? 90 : -90}deg) translateZ(20px)` 
                         }}></div>
                    ))}
                </div>
                <div className={`absolute top-[40%] left-[40%] w-[20%] h-[20%] rounded-full ${innerColor} shadow-[0_0_20px_currentColor] animate-pulse`}></div>
            </div>
        </button>
      )}

      {/* EXPANDED INTERFACE */}
      {isOpen && (
        <div className={`w-[90vw] md:w-[450px] h-[600px] bg-[#020617]/95 backdrop-blur-xl border ${borderColor} rounded-lg shadow-2xl flex flex-col animate-pop-in origin-bottom-right relative overflow-hidden`}>
            
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.03)_1px,transparent_1px)] bg-[length:20px_20px] pointer-events-none"></div>

            {/* Header */}
            <div className={`p-3 border-b ${borderColor} flex justify-between items-center bg-slate-950/50 backdrop-blur-md z-10`}>
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded border ${borderColor} bg-slate-900 flex items-center justify-center`}>
                        <Cpu size={18} className={textColor} />
                    </div>
                    <div>
                        <div className={`font-mono text-xs font-bold ${textColor}`}>THE ARCHITECT</div>
                        <div className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">v2.0 // {contextTitle ? "LINKED" : "STANDBY"}</div>
                    </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded">
                    <X size={18} />
                </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10 scroll-smooth">
                {messages.map((msg, idx) => renderMessage(msg, idx))}
                
                {thinking && (
                    <div className="flex justify-start animate-pulse">
                         <div className={`flex gap-2 items-center p-3 text-[10px] font-mono ${textColor} border border-dashed ${borderColor} rounded-lg`}>
                             <Activity size={12} className="animate-spin" /> 
                             CALCULATING OPTIMAL TRAJECTORY...
                         </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Tactical Command Grid (Quick Actions) */}
            <div className="p-2 grid grid-cols-2 gap-2 bg-slate-950/80 border-t border-b border-slate-800 z-10">
                <button 
                    onClick={() => handleSend("Analyze the data trends.", "DATA")}
                    disabled={!contextData}
                    className="flex items-center gap-2 px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-[10px] text-teal-400 font-mono transition-colors disabled:opacity-30"
                >
                    <BarChart size={12} /> SCAN_DATA
                </button>
                <button 
                    onClick={() => handleSend("Check my grammar and vocabulary.", "GRADE")}
                    className="flex items-center gap-2 px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-[10px] text-amber-400 font-mono transition-colors"
                >
                    <CheckCircle2 size={12} /> DEBUG_TEXT
                </button>
                <button 
                    onClick={() => handleSend("Give me Band 9 synonyms for 'increase' and 'decrease'.", "VOCAB")}
                    className="flex items-center gap-2 px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-[10px] text-purple-400 font-mono transition-colors"
                >
                    <BookOpen size={12} /> UPGRADE_LEXICON
                </button>
                <button 
                    onClick={() => handleSend("Explain the strategy for this task type.", "STRATEGY")}
                    className="flex items-center gap-2 px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-[10px] text-blue-400 font-mono transition-colors"
                >
                    <Terminal size={12} /> LOAD_STRATEGY
                </button>
            </div>

            {/* Input Area */}
            <div className="p-3 bg-slate-950 z-10">
                <div className="flex gap-2 relative">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Input command or text for analysis..."
                        className={`flex-1 bg-slate-900/50 border ${borderColor} rounded px-4 py-3 text-xs text-white focus:outline-none focus:bg-slate-900 font-mono transition-all`}
                    />
                    <button 
                        onClick={() => handleSend()}
                        disabled={thinking}
                        className={`px-4 rounded hover:bg-slate-800 transition-colors border ${borderColor} ${textColor}`}
                    >
                        <Send size={16} />
                    </button>
                </div>
                <div className="mt-2 flex justify-between text-[9px] text-slate-600 font-mono uppercase">
                     <span>Latency: {Math.floor(Math.random() * 20) + 10}ms</span>
                     <span>Secure Uplink: Active</span>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default NexusAvatar;
