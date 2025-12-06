
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Cpu, Activity, BookOpen, BarChart, CheckCircle2, Terminal } from 'lucide-react';
import { useSuperAI } from '../../hooks/useSuperAI';
import { GoogleGenAI } from "@google/genai";

interface NexusAvatarProps {
  contextData?: any;
  contextTitle?: string;
  energyMode?: 'focus' | 'flux';
}

const NexusAvatar: React.FC<NexusAvatarProps> = ({ contextData, contextTitle, energyMode = 'flux' }) => {
  const { profile, track } = useSuperAI();
  const [isOpen, setIsOpen] = useState(false);
  
  type MsgType = 'text' | 'grade' | 'analysis';
  interface Message {
    role: 'user' | 'model';
    text: string;
    type?: MsgType;
  }

  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'ARCHITECT V2.5 ONLINE. READY.', type: 'text' }
  ]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, thinking]);

  useEffect(() => {
    if (contextTitle && isOpen) {
       setMessages(prev => [...prev, { 
           role: 'model', 
           text: `// CONTEXT: [${contextTitle.toUpperCase()}]\n// MODE: [${energyMode.toUpperCase()}]`,
           type: 'text'
       }]);
    }
  }, [contextTitle, isOpen, energyMode]);

  const hasFracture = profile.fractures.length > 0;
  const isFlux = energyMode === 'flux';
  
  // Style Config
  const styles = {
      primary: hasFracture ? 'text-red-500' : (isFlux ? 'text-teal-400' : 'text-indigo-400'),
      border: hasFracture ? 'border-red-500' : (isFlux ? 'border-teal-400' : 'border-indigo-400'),
      bg: hasFracture ? 'bg-red-500' : (isFlux ? 'bg-teal-400' : 'bg-indigo-400'),
      shadow: hasFracture ? 'shadow-red-500' : (isFlux ? 'shadow-teal-400' : 'shadow-indigo-400'),
  };

  const handleSend = async (manualInput?: string, protocol?: string) => {
    const textToSend = manualInput || input;
    if (!textToSend.trim()) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: textToSend, type: 'text' }]);
    setThinking(true);
    track('CHAT_INTERACTION', { type: 'general', result: 'neutral' });

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const systemContext = `
        IDENTITY: THE ARCHITECT (IELTS AI).
        MODE: ${energyMode.toUpperCase()} (Adjust tone: ${isFlux ? 'Fast, energetic, direct' : 'Calm, analytical, deep'}).
        USER SPEED: ${profile.neuralMap.velocity}/100.
        CONTEXT: ${contextTitle || "Nexus Dashboard"}.
        
        INSTRUCTION: Provide high-level IELTS Task 1 feedback. Be robotic but helpful. Keep it under 60 words.
      `;

      const prompt = systemContext + "\nUser: " + textToSend + (protocol ? `\nPROTOCOL: ${protocol}` : "");

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      });

      setMessages(prev => [...prev, { role: 'model', text: response.text || "NO DATA.", type: 'text' }]);

    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "CONNECTION ERROR.", type: 'text' }]);
    } finally {
      setThinking(false);
    }
  };

  const renderMessage = (msg: Message, idx: number) => {
    const isModel = msg.role === 'model';
    return (
        <div key={idx} className={`flex mb-4 ${isModel ? 'justify-start' : 'justify-end'} animate-fade-in-up`}>
            <div className={`max-w-[85%] rounded-lg p-3 relative overflow-hidden ${
                isModel 
                ? `bg-slate-900/90 border border-slate-700 text-slate-300` 
                : `bg-slate-800 border border-slate-600 text-white`
            }`}>
                {isModel && <div className={`absolute top-0 left-0 w-0.5 h-full ${styles.bg}`}></div>}
                <div className="font-mono text-xs leading-relaxed whitespace-pre-wrap">{msg.text}</div>
            </div>
        </div>
    );
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] font-sans">
      
      {/* 3D AVATAR */}
      {!isOpen && (
        <button 
            onClick={() => setIsOpen(true)}
            className="relative w-20 h-20 group perspective-1000 cursor-pointer focus:outline-none"
        >
            <div className="relative w-full h-full transform-style-3d animate-[float_6s_ease-in-out_infinite]">
                {/* FLUX MODE: SPINNING CHAOS */}
                {isFlux && (
                    <div className="w-full h-full animate-[spin_4s_linear_infinite]">
                        <div className={`absolute inset-0 rounded-full border-2 border-dashed ${styles.border} opacity-40`}></div>
                        <div className={`absolute inset-2 rounded-full border border-dotted ${styles.border} opacity-60 animate-[spin_10s_linear_infinite_reverse]`}></div>
                        <div className={`absolute top-[40%] left-[40%] w-[20%] h-[20%] rounded-full ${styles.bg} shadow-[0_0_30px_currentColor] animate-pulse`}></div>
                    </div>
                )}

                {/* FOCUS MODE: TESSERACT CUBE */}
                {!isFlux && (
                    <div className="w-full h-full transform-style-3d animate-[spin_10s_linear_infinite]">
                        <div className="absolute top-[25%] left-[25%] w-[50%] h-[50%] transform-style-3d">
                             {[...Array(6)].map((_, i) => (
                                 <div key={i} className={`absolute w-full h-full border ${styles.border} bg-indigo-500/10 backdrop-blur-sm`} style={{ 
                                     transform: i < 4 ? `rotateY(${i * 90}deg) translateZ(25px)` : `rotateX(${i === 4 ? 90 : -90}deg) translateZ(25px)` 
                                 }}></div>
                             ))}
                        </div>
                        <div className={`absolute top-[40%] left-[40%] w-[20%] h-[20%] bg-white shadow-[0_0_20px_white] animate-pulse`}></div>
                    </div>
                )}
            </div>
        </button>
      )}

      {/* EXPANDED INTERFACE */}
      {isOpen && (
        <div className={`w-[90vw] md:w-[400px] h-[550px] bg-[#020617]/95 backdrop-blur-2xl border ${styles.border} rounded-2xl shadow-2xl flex flex-col animate-pop-in origin-bottom-right relative overflow-hidden`}>
            
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20">
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg border ${styles.border} bg-slate-900 flex items-center justify-center`}>
                        <Cpu size={16} className={styles.primary} />
                    </div>
                    <div>
                        <div className={`font-heading font-bold text-sm text-white`}>THE ARCHITECT</div>
                        <div className={`text-[9px] font-mono uppercase tracking-wider ${styles.primary}`}>ONLINE // {energyMode}</div>
                    </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                    <X size={20} />
                </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10 custom-scrollbar">
                {messages.map((msg, idx) => renderMessage(msg, idx))}
                {thinking && (
                    <div className="flex justify-start">
                         <div className={`flex gap-2 items-center p-3 text-[10px] font-mono ${styles.primary} border border-dashed border-white/10 rounded-lg`}>
                             <Activity size={12} className="animate-spin" /> 
                             PROCESSING...
                         </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="p-2 grid grid-cols-2 gap-2 bg-black/40 border-t border-white/5">
                {[
                    { l: "SCAN DATA", i: <BarChart size={12}/>, c: "DATA" },
                    { l: "DEBUG TEXT", i: <CheckCircle2 size={12}/>, c: "GRADE" },
                    { l: "LEXICON UP", i: <BookOpen size={12}/>, c: "VOCAB" },
                    { l: "STRATEGY", i: <Terminal size={12}/>, c: "STRATEGY" },
                ].map((act, i) => (
                    <button 
                        key={i}
                        onClick={() => handleSend(`Run ${act.c} protocol.`, act.c)}
                        className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded text-[10px] text-slate-300 font-mono transition-colors"
                    >
                        {act.i} {act.l}
                    </button>
                ))}
            </div>

            {/* Input */}
            <div className="p-3 bg-black/60">
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Command or query..."
                        className="flex-1 bg-slate-900 border border-slate-700 rounded px-4 py-2 text-xs text-white focus:outline-none focus:border-white/30 font-mono"
                    />
                    <button onClick={() => handleSend()} disabled={thinking} className={`px-3 rounded hover:bg-white/10 transition-colors border ${styles.border} ${styles.primary}`}>
                        <Send size={16} />
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default NexusAvatar;
