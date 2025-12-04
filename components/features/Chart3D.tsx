import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { CHART_DATA } from '../../constants';

const Chart3D: React.FC = () => {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
      setMounted(true);
  }, []);

  const colors = [
    { face: '#818cf8', side: '#6366f1', top: '#a5b4fc' }, // Indigo
    { face: '#fb7185', side: '#e11d48', top: '#fda4af' }, // Rose
    { face: '#fcd34d', side: '#d97706', top: '#fde68a' }, // Amber
    { face: '#22d3ee', side: '#0891b2', top: '#67e8f9' }, // Cyan
  ];

  const maxVal = 16;

  return (
    <div className="glass-panel p-5 rounded-3xl shadow-2xl mb-4 perspective-1000 relative overflow-hidden group border border-white/40">
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <span className="text-[10px] bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm text-gray-500 flex items-center gap-1 font-medium border border-gray-100">
          <Eye size={10}/> 3D
        </span>
      </div>
      
      <h3 className="text-center text-lg font-bold mb-6 text-gray-800 dark:text-white tracking-tight text-shadow">Flight Duration Results</h3>
      
      {/* Chart Container */}
      <div className="flex justify-around items-end h-56 lg:h-64 px-4 pb-2 border-b-2 border-gray-300 dark:border-gray-600 transform-style-3d mb-4 relative">
        {/* Y Axis Grid Lines */}
        <div className="absolute inset-0 pointer-events-none w-full h-full">
           {[0, 4, 8, 12, 16].map(val => (
             <div key={val} className="absolute w-full border-t border-gray-300 dark:border-gray-600 dashed opacity-40 transition-opacity group-hover:opacity-60" style={{ bottom: `${(val / maxVal) * 100}%` }}>
               <span className="absolute -left-8 -top-2 text-[10px] font-mono text-gray-400">{val}s</span>
             </div>
           ))}
        </div>

        {CHART_DATA.map((group, gIdx) => (
          <div key={gIdx} className="relative flex items-end justify-center w-full h-full gap-1.5 lg:gap-3 px-1">
            {[group.f1, group.f2, group.f3, group.avg].map((val, bIdx) => (
              <div 
                key={bIdx}
                className={`relative w-4 lg:w-6 transition-all duration-500 ease-out hover:-translate-y-4 cursor-pointer group/bar ${mounted ? 'animate-grow-y' : 'scale-y-0'}`}
                style={{ 
                    height: `${(val / maxVal) * 100}%`,
                    animationDelay: `${(gIdx * 4 + bIdx) * 100}ms`
                }}
                onMouseEnter={() => setHoveredBar(`${gIdx}-${bIdx}`)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                 {/* Floating Tooltip */}
                 <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded-md z-20 shadow-xl transition-all duration-300 pointer-events-none ${hoveredBar === `${gIdx}-${bIdx}` ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'}`}>
                   <span className="font-bold">{val}</span> <span className="text-gray-400">s</span>
                   <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                 </div>
                 
                {/* Front Face */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-t-[2px] shadow-sm"
                  style={{ backgroundColor: colors[bIdx].face }}
                ></div>
                
                {/* Side Face (3D effect) */}
                <div 
                  className="absolute top-0 right-0 h-full w-2 lg:w-3 origin-right transform skew-y-12 translate-x-full brightness-75 transition-all group-hover/bar:brightness-90"
                  style={{ backgroundColor: colors[bIdx].side }}
                ></div>

                {/* Top Face (3D effect) */}
                <div 
                  className="absolute top-0 left-0 w-full h-2 lg:h-3 origin-top transform skew-x-12 -translate-y-full brightness-110 transition-all group-hover/bar:brightness-125"
                  style={{ backgroundColor: colors[bIdx].top }}
                ></div>
              </div>
            ))}
            <span className="absolute -bottom-8 font-bold text-gray-500 text-[9px] lg:text-[10px] whitespace-nowrap uppercase tracking-wider">{group.label}</span>
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3 lg:gap-6 mt-8 pt-2 border-t border-gray-200/50 dark:border-gray-700/50">
        {['Flight #1', 'Flight #2', 'Flight #3', 'Avg'].map((label, idx) => (
          <div key={idx} className="flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 px-3 py-1 rounded-full shadow-sm hover:shadow-md transition-all cursor-default border border-gray-100 dark:border-gray-700">
            <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: colors[idx].side }}></div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chart3D;