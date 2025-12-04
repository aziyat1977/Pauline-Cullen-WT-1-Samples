import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { HOUSING_CHART_DATA } from '../../constants';

const ChartHousing: React.FC = () => {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Colors for the bars: Owned (Blue), Rented (Green)
  const colors = [
    { face: '#3b82f6', side: '#1d4ed8', top: '#60a5fa' }, // Blue (Owned)
    { face: '#84cc16', side: '#4d7c0f', top: '#a3e635' }, // Green (Rented)
  ];

  return (
    <div className="glass-panel p-5 rounded-3xl shadow-2xl mb-4 perspective-1000 relative overflow-hidden group border border-white/40">
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <span className="text-[10px] bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm text-gray-500 flex items-center gap-1 font-medium border border-gray-100">
          <Eye size={10}/> 3D
        </span>
      </div>
      
      <h3 className="text-center text-lg font-bold mb-6 text-gray-800 dark:text-white tracking-tight">Housing Tenure: Owned vs Rented (%)</h3>
      
      {/* Chart Container */}
      <div className="flex justify-between items-end h-52 px-2 pb-2 border-b-2 border-gray-300 dark:border-gray-600 transform-style-3d mb-4 relative">
        {/* Y Axis Grid Lines */}
        <div className="absolute inset-0 pointer-events-none w-full h-full">
           {[0, 25, 50, 75, 100].map(val => (
             <div key={val} className="absolute w-full border-t border-gray-300 dark:border-gray-600 dashed opacity-50 transition-opacity group-hover:opacity-70" style={{ bottom: `${val}%` }}>
               <span className="absolute -left-6 -top-2 text-[10px] font-mono text-gray-400">{val}%</span>
             </div>
           ))}
        </div>

        {HOUSING_CHART_DATA.map((group, gIdx) => (
          <div key={gIdx} className="relative flex items-end justify-center w-full h-full gap-0.5 px-0.5">
            {/* Owned Bar */}
            <div 
              className={`relative w-full max-w-[16px] transition-all duration-500 ease-out hover:-translate-y-2 cursor-pointer group/bar ${mounted ? 'animate-grow-y' : 'scale-y-0'}`}
              style={{ height: `${group.owned}%`, animationDelay: `${gIdx * 50}ms` }}
              onMouseEnter={() => setHoveredBar(`${gIdx}-owned`)}
              onMouseLeave={() => setHoveredBar(null)}
            >
               {/* Tooltip */}
               <div className={`absolute -top-10 left-1/2 transform -translate-x-1/2 bg-blue-900 text-white text-[10px] py-1 px-2 rounded-md z-20 shadow-xl transition-all duration-300 pointer-events-none ${hoveredBar === `${gIdx}-owned` ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'}`}>
                   <span className="font-bold whitespace-nowrap">Owned: {group.owned}%</span>
                   <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-blue-900"></div>
               </div>
              
              <div className="absolute inset-0 w-full h-full rounded-t-[1px]" style={{ backgroundColor: colors[0].face }}></div>
              <div className="absolute top-0 right-0 h-full w-1.5 origin-right transform skew-y-12 translate-x-full brightness-75 transition-all group-hover/bar:brightness-90" style={{ backgroundColor: colors[0].side }}></div>
              <div className="absolute top-0 left-0 w-full h-1.5 origin-top transform skew-x-12 -translate-y-full brightness-110 transition-all group-hover/bar:brightness-125" style={{ backgroundColor: colors[0].top }}></div>
            </div>

            {/* Rented Bar */}
            <div 
              className={`relative w-full max-w-[16px] transition-all duration-500 ease-out hover:-translate-y-2 cursor-pointer group/bar ${mounted ? 'animate-grow-y' : 'scale-y-0'}`}
              style={{ height: `${group.rented}%`, animationDelay: `${gIdx * 50 + 200}ms` }}
              onMouseEnter={() => setHoveredBar(`${gIdx}-rented`)}
              onMouseLeave={() => setHoveredBar(null)}
            >
               {/* Tooltip */}
               <div className={`absolute -top-10 left-1/2 transform -translate-x-1/2 bg-lime-900 text-white text-[10px] py-1 px-2 rounded-md z-20 shadow-xl transition-all duration-300 pointer-events-none ${hoveredBar === `${gIdx}-rented` ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'}`}>
                   <span className="font-bold whitespace-nowrap">Rented: {group.rented}%</span>
                   <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-lime-900"></div>
               </div>

              <div className="absolute inset-0 w-full h-full rounded-t-[1px]" style={{ backgroundColor: colors[1].face }}></div>
              <div className="absolute top-0 right-0 h-full w-1.5 origin-right transform skew-y-12 translate-x-full brightness-75 transition-all group-hover/bar:brightness-90" style={{ backgroundColor: colors[1].side }}></div>
              <div className="absolute top-0 left-0 w-full h-1.5 origin-top transform skew-x-12 -translate-y-full brightness-110 transition-all group-hover/bar:brightness-125" style={{ backgroundColor: colors[1].top }}></div>
            </div>

            <span className="absolute -bottom-6 font-bold text-gray-500 text-[8px] whitespace-nowrap transform -rotate-45 origin-top-left mt-2">{group.label}</span>
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex justify-center gap-4 mt-8 text-xs font-medium border-t border-gray-200/50 dark:border-gray-700/50 pt-2">
        <div className="flex items-center gap-2 bg-white/50 dark:bg-slate-800/50 px-2 py-1 rounded-full shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="w-3 h-3 rounded bg-blue-500"></div> <span className="text-gray-600 dark:text-gray-300">Owned</span>
        </div>
        <div className="flex items-center gap-2 bg-white/50 dark:bg-slate-800/50 px-2 py-1 rounded-full shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="w-3 h-3 rounded bg-lime-500"></div> <span className="text-gray-600 dark:text-gray-300">Rented</span>
        </div>
      </div>
    </div>
  );
};

export default ChartHousing;