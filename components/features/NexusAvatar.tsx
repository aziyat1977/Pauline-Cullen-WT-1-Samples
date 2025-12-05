
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Cpu, Zap, Activity } from 'lucide-react';
import { useSuperAI } from '../../hooks/useSuperAI';
import { GoogleGenAI } from "@google/genai";

const NexusAvatar: React.FC = () => {
  const { profile, track } = useSuperAI();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: 'NEXUS ARCHITECT ONLINE. I AM SYNCED WITH YOUR NEURAL MAP. HOW CAN I ASSIST?' }
  ]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // Dynamic Avatar State based on User Profile
  const hasFracture = profile.fractures.length > 0;
  const velocity = profile.neuralMap.velocity;
  
  // Color logic: Red if fractured, Amber if fast/erratic, Teal if stable
  const coreColor = hasFracture ? 'border-red-500 shadow-red-500' : (velocity > 80 ? 'border-amber-400 shadow-amber-400' : 'border-teal-400 shadow-teal-400');
  const innerColor = hasFracture ? 'bg-red-500' : (velocity > 80 ? 'bg-amber-400' : 'bg-teal-400');
  const pulseSpeed = hasFracture ? 'duration-500' : 'duration-[3000ms]';

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setThinking(true);
    track('CHAT_INTERACTION', { type: 'general', result: 'neutral' });

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // We inject the user's live stats into the context
      const systemContext = `
        You are The Architect, an AI embedded in the Nexus learning system.
        You are represented as a 3D geometric entity.
        
        USER STATUS:
        - Interactions: ${profile.interactions}
        - Velocity (Speed): ${profile.neuralMap.velocity}/100
        - Weaknesses (Fractures): ${profile.fractures.join(', ') || "None"}
        - Strengths: Visualization (${profile.neuralMap.visualization}%), Trends (${profile.neuralMap.trends}%)
        
        INSTRUCTIONS:
        1. Keep responses concise, robotic but helpful, and sci-fi themed.
        2. If the user has fractures, mention them and offer specific advice to fix them.
        3. Do not write long paragraphs. Use bullet points or short code-like statements.
        4. You are strictly an IELTS Data Response tutor.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
            { role: 'user', parts: [{ text: systemContext + "\n\nUser Query: " + userMsg }] }
        ],
      });

      const responseText = response.text || "CONNECTION INTERRUPTED.";
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "ERROR: NEURAL LINK SEVERED. CHECK API KEY." }]);
    } finally {
      setThinking(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      
      {/* 3D AVATAR CONTAINER */}
      {!isOpen && (
        <button 
            onClick={() => setIsOpen(true)}
            className="relative w-24 h-24 group perspective-1000 cursor-pointer focus:outline-none"
        >
            {/* Tooltip */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-slate-300 text-[10px] px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                STATUS: {hasFracture ? 'CRITICAL' : 'OPTIMAL'}
            </div>

            {/* The 3D Construct (CSS Only) */}
            <div className="relative w-full h-full transform-style-3d animate-[spin_10s_linear_infinite] group-hover:animate-[spin_2s_linear_infinite]">
                {/* Outer Ring */}
                <div className={`absolute inset-0 rounded-full border-2 border-dashed ${coreColor.split(' ')[0]} opacity-30`}></div>
                
                {/* The Cube Assembly */}
                <div className="absolute top-[25%] left-[25%] w-[50%] h-[50%] transform-style-3d animate-[spin_5s_linear_infinite_reverse]">
                    <div className={`absolute w-full h-full border ${coreColor.split(' ')[0]} opacity-80`} style={{ transform: 'translateZ(20px)' }}></div>
                    <div className={`absolute w-full h-full border ${coreColor.split(' ')[0]} opacity-80`} style={{ transform: 'rotateY(90deg) translateZ(20px)' }}></div>
                    <div className={`absolute w-full h-full border ${coreColor.split(' ')[0]} opacity-80`} style={{ transform: 'rotateY(180deg) translateZ(20px)' }}></div>
                    <div className={`absolute w-full h-full border ${coreColor.split(' ')[0]} opacity-80`} style={{ transform: 'rotateY(-90deg) translateZ(20px)' }}></div>
                    <div className={`absolute w-full h-full border ${coreColor.split(' ')[0]} opacity-80`} style={{ transform: 'rotateX(90deg) translateZ(20px)' }}></div>
                    <div className={`absolute w-full h-full border ${coreColor.split(' ')[0]} opacity-80`} style={{ transform: 'rotateX(-90deg) translateZ(20px)' }}></div>
                </div>

                {/* The Core */}
                <div className={`absolute top-[40%] left-[40%] w-[20%] h-[20%] rounded-full ${innerColor} shadow-[0_0_20px_currentColor] animate-pulse ${pulseSpeed}`}></div>
            </div>
        </button>
      )}

      {/* CHAT INTERFACE */}
      {isOpen && (
        <div className="w-80 md:w-96 bg-[#020617]/95 backdrop-blur-md border border-slate-700 rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col animate-pop-in origin-bottom-right">
            
            {/* Header */}
            <div className={`p-3 border-b border-slate-800 flex justify-between items-center ${hasFracture ? 'bg-red-950/20' : 'bg-teal-950/20'}`}>
                <div className="flex items-center gap-2">
                    <Cpu size={16} className={hasFracture ? 'text-red-500' : 'text-teal-400'} />
                    <span className={`font-mono text-xs font-bold ${hasFracture ? 'text-red-400' : 'text-teal-400'}`}>THE ARCHITECT</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                    <X size={18} />
                </button>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-3 font-mono text-xs bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.5)_0%,#020617_100%)]">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-3 rounded-sm ${
                            msg.role === 'user' 
                            ? 'bg-slate-800 text-slate-200 border border-slate-700' 
                            : `bg-slate-900/80 border ${hasFracture ? 'border-red-900/50 text-red-100' : 'border-teal-900/50 text-teal-100'}`
                        }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {thinking && (
                    <div className="flex justify-start">
                         <div className="flex gap-1 items-center p-3 text-teal-500">
                             <Activity size={12} className="animate-spin" /> PROCESSING...
                         </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-slate-800 bg-slate-900 flex gap-2">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Query the database..."
                    className="flex-1 bg-black border border-slate-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500 font-mono"
                />
                <button 
                    onClick={handleSend}
                    disabled={thinking}
                    className={`p-2 rounded hover:bg-slate-800 transition-colors ${hasFracture ? 'text-red-500' : 'text-teal-500'}`}
                >
                    <Send size={16} />
                </button>
            </div>
            
            {/* Footer Stats */}
            <div className="px-3 py-1 bg-black text-[9px] font-mono text-slate-600 flex justify-between">
                <span>SYNC: {profile.interactions} OPS</span>
                <span className={hasFracture ? 'text-red-500 animate-pulse' : 'text-emerald-500'}>
                    {hasFracture ? 'SYSTEM UNSTABLE' : 'SYSTEM STABLE'}
                </span>
            </div>
        </div>
      )}
    </div>
  );
};

export default NexusAvatar;
