
import React, { useEffect, useState } from 'react';
import { Cpu, Terminal, AlertTriangle, Activity, ShieldCheck, Zap, Gauge, Brain, Flame, Radio } from 'lucide-react';
import { useSuperAI } from '../../hooks/useSuperAI';

interface CoreInterfaceProps {
  onStartChallenge: (challenge: any) => void;
  energyMode: 'focus' | 'flux';
}

const CoreInterface: React.FC<CoreInterfaceProps> = ({ onStartChallenge, energyMode }) => {
  const { profile, stream, aiState, executeIntervention } = useSuperAI();
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 200);
      return () => clearTimeout(t);
  }, [stream]);

  const handleOptimization = async () => {
      const drill = await executeIntervention();
      if (drill) onStartChallenge(drill);
  };

  const hasFracture = profile.fractures.length > 0;
  const isFlux = energyMode === 'flux';
  
  // HUD Theme System
  const styles = {
      hudBorder: isFlux ? 'border-teal-500/30' : 'border-indigo-500/30',
      hudBg: isFlux ? 'bg-teal-950/10' : 'bg-indigo-950/10',
      textMain: isFlux ? 'text-teal-400' : 'text-indigo-400',
      glow: isFlux ? 'shadow-[0_0_20px_rgba(20,184,166,0.1)]' : 'shadow-[0_0_20px_rgba(99,102,241,0.1)]',
      barFill: isFlux ? 'bg-teal-500' : 'bg-indigo-500'
  };

  return (
    <div className={`relative w-full rounded-xl border ${styles.hudBorder} ${styles.hudBg} backdrop-blur-md overflow-hidden transition-all duration-700 ${styles.glow}`}>
        
        {/* HUD Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_2px,rgba(0,0,0,0.1)_2px)] bg-[length:100%_4px] pointer-events-none z-0 opacity-50"></div>
        
        {/* Top Bar */}
        <div className={`relative z-10 flex justify-between items-center px-4 py-2 border-b ${styles.hudBorder} bg-black/20`}>
             <div className={`flex items-center gap-2 font-mono text-[10px] ${styles.textMain} font-bold uppercase tracking-widest`}>
                 <Cpu size={12} className={aiState === 'optimizing' ? 'animate-spin' : ''} />
                 <span>C.O.R.E. OS v3.0 // {isFlux ? 'FLUX' : 'FOCUS'}</span>
             </div>
             <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2">
                     <div className={`w-1.5 h-1.5 rounded-full ${hasFracture ? 'bg-red-500 animate-ping' : 'bg-emerald-500'}`}></div>
                     <span className={`text-[9px] font-bold font-mono tracking-widest ${hasFracture ? 'text-red-500' : 'text-emerald-500'}`}>
                         {hasFracture ? 'SYSTEM UNSTABLE' : 'OPTIMAL'}
                     </span>
                 </div>
                 <div className="font-mono text-[9px] text-slate-600">USR-{profile.interactions}</div>
             </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5">
            
            {/* Sector 1: Energy Matrix */}
            <div className="p-6 flex flex-col justify-center">
                <h4 className={`${styles.textMain} mb-4 flex items-center gap-2 uppercase tracking-widest text-[10px] font-bold`}>
                    <Gauge size={12} /> Bi-Modal Energy
                </h4>
                
                {/* Mode Labels */}
                <div className="flex justify-between items-end mb-2 text-[10px] font-mono font-bold">
                    <span className={`flex items-center gap-1 ${!isFlux ? 'text-indigo-400' : 'text-slate-700 opacity-50'}`}>
                        <Brain size={12} /> STRUCTURE
                    </span>
                    <span className={`flex items-center gap-1 ${isFlux ? 'text-teal-400' : 'text-slate-700 opacity-50'}`}>
                        ACTION <Flame size={12} />
                    </span>
                </div>

                {/* The Gauge */}
                <div className="h-2 w-full bg-slate-900 rounded-full relative overflow-hidden mb-4">
                    {/* Background Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-teal-900 opacity-50"></div>
                    
                    {/* The Needle Indicator */}
                    <div 
                        className="absolute top-0 h-full w-8 bg-white shadow-[0_0_15px_white] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] rounded-full mix-blend-overlay" 
                        style={{ left: isFlux ? 'calc(100% - 32px)' : '0%' }}
                    ></div>
                </div>

                {/* Velocity Stat */}
                <div className="flex items-center gap-3">
                     <div className="text-[10px] text-slate-500 uppercase font-mono">Processing Velocity</div>
                     <div className="flex-1 h-1 bg-slate-800 rounded-full">
                         <div className={`h-full ${styles.barFill} rounded-full transition-all duration-1000`} style={{ width: `${profile.neuralMap.velocity}%` }}></div>
                     </div>
                     <div className={`text-[10px] font-mono font-bold ${styles.textMain}`}>{Math.round(profile.neuralMap.velocity)}%</div>
                </div>
            </div>

            {/* Sector 2: Live Terminal */}
            <div className="p-6 bg-black/30 flex flex-col relative overflow-hidden h-32 md:h-auto">
                <h4 className={`${styles.textMain} mb-2 flex items-center gap-2 uppercase tracking-widest text-[10px] font-bold`}>
                    <Terminal size={12} /> Neural Log
                </h4>
                <div className="flex-1 overflow-hidden relative">
                    <div className={`absolute bottom-0 left-0 w-full space-y-1.5 font-mono text-[9px] transition-opacity duration-100 ${pulse ? 'opacity-90' : 'opacity-60'}`}>
                        {stream.map((msg, i) => (
                            <div key={i} className={`truncate ${msg.includes('ERROR') || msg.includes('ALERT') ? 'text-red-400' : 'text-slate-400'}`}>
                                <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
                                {msg}
                            </div>
                        ))}
                    </div>
                </div>
                {hasFracture && (
                    <div className="absolute top-2 right-2 animate-pulse text-red-500">
                        <AlertTriangle size={14} />
                    </div>
                )}
            </div>

            {/* Sector 3: Intervention Controls */}
            <div className="p-6 flex flex-col justify-center items-center text-center">
                 <div className="w-full mb-3">
                     <div className="text-[9px] text-slate-500 uppercase tracking-widest mb-1 font-mono">Current Status</div>
                     <div className={`text-xl font-black font-heading tracking-tight ${hasFracture ? 'text-red-500' : styles.textMain}`}>
                         {hasFracture ? 'FRACTURE DETECTED' : 'SYSTEM OPTIMAL'}
                     </div>
                 </div>

                 <button 
                    onClick={handleOptimization}
                    className={`
                        w-full py-3 px-4 border font-bold text-[10px] uppercase tracking-[0.2em] transition-all rounded hover:scale-105 active:scale-95
                        ${hasFracture 
                            ? 'bg-red-500 hover:bg-red-400 text-black border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]' 
                            : `bg-transparent hover:${styles.hudBg} ${styles.textMain} ${styles.hudBorder} hover:bg-white/5`}
                    `}
                 >
                     {hasFracture ? (
                         <span className="flex items-center justify-center gap-2"><Zap size={12} className="fill-current"/> INIT REPAIR</span>
                     ) : (
                         <span className="flex items-center justify-center gap-2"><ShieldCheck size={12} /> RUN DIAGNOSTIC</span>
                     )}
                 </button>
            </div>
        </div>
    </div>
  );
};

export default CoreInterface;
