import React, { useEffect, useState } from 'react';
import { Cpu, Terminal, AlertTriangle, Activity, ShieldCheck, Zap } from 'lucide-react';
import { useSuperAI, NeuralMap } from '../../hooks/useSuperAI';

interface CoreInterfaceProps {
  onStartChallenge: (challenge: any) => void;
}

const CoreInterface: React.FC<CoreInterfaceProps> = ({ onStartChallenge }) => {
  const { profile, stream, aiState, executeIntervention } = useSuperAI();
  const [pulse, setPulse] = useState(false);

  // Pulse effect on stream update
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

  return (
    <div className="bg-[#020617] border border-teal-900/50 rounded-sm p-0 font-mono text-xs relative overflow-hidden shadow-2xl">
        {/* Top Status Bar */}
        <div className="flex justify-between items-center bg-teal-950/20 px-4 py-2 border-b border-teal-900/50">
             <div className="flex items-center gap-2 text-teal-500">
                 <Cpu size={14} className={aiState === 'optimizing' ? 'animate-spin' : ''} />
                 <span className="font-bold tracking-widest">C.O.R.E. v2.1</span>
             </div>
             <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2">
                     <div className={`w-2 h-2 rounded-full ${hasFracture ? 'bg-red-500 animate-ping' : 'bg-emerald-500'}`}></div>
                     <span className={hasFracture ? 'text-red-500 font-bold' : 'text-emerald-700'}>
                         {hasFracture ? 'INTEGRITY COMPROMISED' : 'SYSTEM NOMINAL'}
                     </span>
                 </div>
                 <div className="text-slate-600">ID: {profile.interactions.toString().padStart(6, '0')}</div>
             </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-teal-900/30">
            
            {/* Sector 1: Neural Map */}
            <div className="p-6">
                <h4 className="text-teal-700 mb-4 flex items-center gap-2 uppercase tracking-widest text-[10px]">
                    <Activity size={12} /> Neural Proficiency Map
                </h4>
                <div className="space-y-4">
                    {Object.entries(profile.neuralMap).map(([key, val]) => (
                        <div key={key} className="group">
                            <div className="flex justify-between mb-1 text-[10px] text-slate-400 uppercase">
                                <span>{key}</span>
                                <span className={(val as number) < 40 ? 'text-red-500 font-bold' : 'text-teal-400'}>{Math.round(val as number)}%</span>
                            </div>
                            <div className="w-full h-1 bg-slate-800 overflow-hidden">
                                <div 
                                    className={`h-full transition-all duration-1000 ${(val as number) < 40 ? 'bg-red-500' : 'bg-teal-600'}`} 
                                    style={{ width: `${val}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sector 2: Stream Log */}
            <div className="p-6 bg-black/20 flex flex-col justify-between">
                <div>
                    <h4 className="text-teal-700 mb-4 flex items-center gap-2 uppercase tracking-widest text-[10px]">
                        <Terminal size={12} /> Live Analysis
                    </h4>
                    <div className={`space-y-1 font-mono text-[10px] transition-opacity duration-100 ${pulse ? 'opacity-80' : 'opacity-100'}`}>
                        {stream.map((msg, i) => (
                            <div key={i} className={`${msg.includes('ERROR') || msg.includes('ALERT') ? 'text-red-400' : 'text-slate-500'}`}>
                                {msg}
                            </div>
                        ))}
                    </div>
                </div>
                {hasFracture && (
                    <div className="mt-4 p-2 border border-red-900/50 bg-red-950/10 text-red-500 text-[10px] flex items-center gap-2 animate-pulse">
                        <AlertTriangle size={12} /> CRITICAL WEAKNESS IDENTIFIED
                    </div>
                )}
            </div>

            {/* Sector 3: Intervention */}
            <div className="p-6 flex flex-col justify-center items-center text-center relative overflow-hidden">
                 {/* Background Grid */}
                 <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.03)_1px,transparent_1px)] bg-[length:20px_20px]"></div>

                 <div className="relative z-10 w-full">
                     <div className="mb-6">
                         <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Protocol Status</div>
                         <div className={`text-2xl font-black ${hasFracture ? 'text-red-500' : 'text-teal-400'}`}>
                             {hasFracture ? 'INTERVENTION REQ.' : 'MONITORING'}
                         </div>
                     </div>

                     <button 
                        onClick={handleOptimization}
                        className={`
                            w-full py-4 px-6 border font-bold text-xs uppercase tracking-[0.2em] transition-all
                            ${hasFracture 
                                ? 'bg-red-500 hover:bg-red-400 text-black border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]' 
                                : 'bg-transparent hover:bg-teal-500/10 text-teal-400 border-teal-500/50 hover:border-teal-400'}
                        `}
                     >
                         {hasFracture ? (
                             <span className="flex items-center justify-center gap-2"><Zap size={14} className="fill-current"/> INITIALIZE SURGERY</span>
                         ) : (
                             <span className="flex items-center justify-center gap-2"><ShieldCheck size={14} /> RUN DIAGNOSTIC</span>
                         )}
                     </button>
                 </div>
            </div>
        </div>
    </div>
  );
};

export default CoreInterface;