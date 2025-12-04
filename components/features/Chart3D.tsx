import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { CHART_DATA } from '../../constants';

const Chart3D: React.FC = () => {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  const colors = [
    { face: '#818cf8', side: '#6366f1', top: '#a5b4fc' }, // Indigo
    { face: '#fb7185', side: '#e11d48', top: '#fda4af' }, // Rose
    { face: '#fcd34d', side: '#d97706', top: '#fde68a' }, // Amber
    { face: '#22d3ee', side: '#0891b2', top: '#67e8f9' }, // Cyan
  ];

  const maxVal = 16;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-3xl shadow-inner mb-8 perspective-1000 relative overflow-hidden group border border-gray-200">
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <span className="text-xs bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm text-gray-500 flex items-center gap-1.5 font-medium border border-gray-100">
          <Eye size={12}/> Interactive 3D Model
        </span>
      </div>
      
      <h3 className="text-center text-2xl font-bold mb-12 text-gray-800 tracking-tight">Flight Duration Results</h3>
      
      {/* Chart Container */}
      <div className="flex justify-around items-end h-72 lg:h-80 px-4 pb-2 border-b-4 border-gray-300 transform-style-3d mb-8 relative">
        {/* Y Axis Grid Lines */}
        <div className="absolute inset-0 pointer-events-none w-full h-full">
           {[0, 4, 8, 12, 16].map(val => (
             <div key={val} className="absolute w-full border-t border-gray-300 dashed opacity-40 transition-opacity group-hover:opacity-60" style={{ bottom: `${(val / maxVal) * 100}%` }}>
               <span className="absolute -left-8 -top-3 text-xs font-mono text-gray-400">{val}s</span>
             </div>
           ))}
        </div>

        {CHART_DATA.map((group, gIdx) => (
          <div key={gIdx} className="relative flex items-end justify-center w-full h-full gap-2 lg:gap-4 px-2">
            {[group.f1, group.f2, group.f3, group.avg].map((val, bIdx) => (
              <div 
                key={bIdx}
                className="relative w-6 lg:w-8 transition-all duration-500 ease-out hover:-translate-y-2 cursor-pointer group/bar"
                style={{ height: `${(val / maxVal) * 100}%` }}
                onMouseEnter={() => setHoveredBar(`${gIdx}-${bIdx}`)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                 {/* Floating Tooltip */}
                 <div className={`absolute -top-14 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1.5 px-3 rounded-lg z-20 shadow-xl transition-all duration-300 pointer-events-none ${hoveredBar === `${gIdx}-${bIdx}` ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'}`}>
                   <span className="font-bold">{val}</span> sec
                   <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                 </div>
                 
                {/* Front Face */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-t-[2px]"
                  style={{ backgroundColor: colors[bIdx].face }}
                ></div>
                
                {/* Side Face (3D effect) */}
                <div 
                  className="absolute top-0 right-0 h-full w-3 lg:w-4 origin-right transform skew-y-12 translate-x-full brightness-75 transition-all group-hover/bar:brightness-90"
                  style={{ backgroundColor: colors[bIdx].side }}
                ></div>

                {/* Top Face (3D effect) */}
                <div 
                  className="absolute top-0 left-0 w-full h-3 lg:h-4 origin-top transform skew-x-12 -translate-y-full brightness-110 transition-all group-hover/bar:brightness-125"
                  style={{ backgroundColor: colors[bIdx].top }}
                ></div>
              </div>
            ))}
            <span className="absolute -bottom-10 font-bold text-gray-500 text-xs lg:text-sm whitespace-nowrap uppercase tracking-wider">{group.label}</span>
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 lg:gap-8 mt-12 pt-4 border-t border-gray-200/50">
        {['Flight #1', 'Flight #2', 'Flight #3', 'Average'].map((label, idx) => (
          <div key={idx} className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all cursor-default border border-gray-100">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[idx].side }}></div>
            <span className="text-sm font-medium text-gray-600">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chart3D;