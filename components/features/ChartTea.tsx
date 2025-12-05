
import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { TEA_DATA } from '../../constants';

const ChartTea: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="bg-[#1c1917] p-6 rounded-3xl shadow-2xl relative overflow-hidden border border-stone-800 font-mono">
      <div className="absolute top-4 right-4">
         <span className="text-[10px] text-stone-500 bg-stone-900 px-2 py-1 rounded flex gap-1 items-center">
            <Eye size={10} /> SALES DATA
         </span>
      </div>
      <h3 className="text-center text-lg font-bold mb-8 text-stone-200 tracking-widest uppercase">Tea Sales (1980-2020)</h3>

      <div className="h-64 relative px-4">
          {/* Grid Lines */}
          {[0, 10, 20, 30, 40, 50].map(val => (
              <div key={val} className="absolute w-full border-t border-stone-800" style={{ bottom: `${(val/50)*100}%` }}>
                  <span className="absolute -left-6 -top-2 text-[9px] text-stone-600">{val}</span>
              </div>
          ))}

          {/* SVG Lines */}
          <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
              {TEA_DATA.map((d, i) => {
                  // Simplified Bezier or Polyline
                  // We simulate intermediate points for visual interest based on description
                  let path = "";
                  const yStart = 100 - (d.y1980 / 50) * 100;
                  const yEnd = 100 - (d.y2020 / 50) * 100;
                  
                  // Specific logic for Country B (Rise then fall)
                  if (d.country === 'Country B') {
                      path = `M 0 ${yStart} Q 50 ${yStart - 40} 100 ${yEnd}`;
                  } else {
                      path = `M 0 ${yStart} L 100 ${yEnd}`;
                  }

                  const isHovered = hovered === d.country;

                  return (
                      <g key={i} onMouseEnter={() => setHovered(d.country)} onMouseLeave={() => setHovered(null)}>
                          {/* Shadow Path */}
                          <path d={path} fill="none" stroke="black" strokeWidth="6" opacity="0.5" transform="translate(2, 2)" />
                          {/* Main Path */}
                          <path 
                            d={path} 
                            fill="none" 
                            stroke={d.color} 
                            strokeWidth={isHovered ? "6" : "3"} 
                            strokeLinecap="round"
                            className="transition-all duration-300 cursor-pointer hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                          />
                          {/* End Dot */}
                          <circle cx="100%" cy={`${yEnd}%`} r={isHovered ? "6" : "3"} fill={d.color} className="transition-all duration-300"/>
                      </g>
                  );
              })}
          </svg>
          
          {/* Tooltip Overlay */}
          {hovered && (
             <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-stone-800 text-white text-xs px-3 py-1 rounded border border-stone-600 shadow-xl z-20 animate-fade-in-up">
                 {hovered}
             </div>
          )}
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-4 text-[10px] text-stone-400">
          {TEA_DATA.map((d, i) => (
              <span key={i} className="flex items-center gap-1 px-2 py-1 bg-stone-900 rounded border border-stone-800" style={{ color: d.color }}>
                  ■ {d.country}
              </span>
          ))}
      </div>
    </div>
  );
};

export default ChartTea;
