
import React, { useState } from 'react';
import { SALMON_CYCLE } from '../../constants';

const DiagramSalmon: React.FC = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="bg-cyan-900 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden border border-cyan-800">
        {/* Water Effect Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent)] animate-pulse"></div>
        
        <h3 className="text-center text-cyan-100 font-black text-2xl mb-12 relative z-10">Salmon Life Cycle</h3>

        <div className="relative w-64 h-64 mx-auto">
            {/* Circular Path */}
            <div className="absolute inset-0 rounded-full border-4 border-dashed border-cyan-700/50 animate-[spin_20s_linear_infinite]"></div>
            
            {SALMON_CYCLE.map((stage, i) => {
                const angle = (i / 4) * 360;
                const rad = angle * (Math.PI / 180);
                const x = 50 + 40 * Math.cos(rad);
                const y = 50 + 40 * Math.sin(rad);

                return (
                    <div 
                        key={i}
                        className="absolute w-24 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 hover:scale-110 cursor-pointer z-10"
                        style={{ left: `${x}%`, top: `${y}%` }}
                        onMouseEnter={() => setActive(i)}
                        onMouseLeave={() => setActive(null)}
                    >
                        <div className={`bg-cyan-950/80 backdrop-blur border-2 ${active === i ? 'border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'border-cyan-700'} rounded-2xl p-3 text-center transition-colors`}>
                             <div className="text-xs font-black text-cyan-200 uppercase mb-1">{stage.stage}</div>
                             <div className="text-[9px] text-cyan-400 font-mono">{stage.loc}</div>
                        </div>
                    </div>
                )
            })}
            
            {/* Center Hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                 <div className="text-4xl font-black text-white opacity-20">Cycle</div>
                 {active !== null && (
                     <div className="absolute top-full left-1/2 -translate-x-1/2 w-32 mt-2 text-xs text-cyan-300 font-bold bg-black/50 px-2 py-1 rounded animate-fade-in-up">
                         Size: {SALMON_CYCLE[active].size}
                     </div>
                 )}
            </div>
        </div>
    </div>
  );
};

export default DiagramSalmon;
