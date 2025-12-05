
import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { FISH_DATA } from '../../constants';

const ChartFish: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);

  return (
    <div className="bg-slate-900 p-6 rounded-3xl shadow-2xl relative overflow-hidden group border border-slate-700">
      <div className="absolute top-4 right-4 flex gap-2">
         <span className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-400 border border-slate-700 flex items-center gap-1">
           <Eye size={10} /> 3D View
         </span>
      </div>
      <h3 className="text-center text-lg font-bold mb-6 text-white tracking-tight">Meat & Fish Consumption (1979-2004)</h3>
      
      <div className="h-64 relative perspective-1000">
         {/* Y-Axis Grid */}
         {[0, 1, 2, 3].map(i => (
             <div key={i} className="absolute w-full border-t border-slate-700/50" style={{ bottom: `${i * 33}%` }}>
                 <span className="absolute -left-6 -top-2 text-[9px] text-slate-500">{i*100}g</span>
             </div>
         ))}

         <div className="absolute inset-0 flex items-end px-4 gap-4 transform-style-3d rotate-x-12">
             {FISH_DATA.map((item, idx) => {
                 // Calculate height points for SVG curve simulation
                 const hStart = (item.start / 300) * 100;
                 const hEnd = (item.end / 300) * 100;
                 const isRising = hEnd > hStart;
                 
                 return (
                     <div 
                        key={idx} 
                        className="flex-1 h-full relative group/ribbon"
                        onMouseEnter={() => setHovered(item.label)}
                        onMouseLeave={() => setHovered(null)}
                     >
                         {/* 3D Ribbon Construction */}
                         <div className="absolute w-full h-full transition-transform duration-500 hover:scale-110">
                             <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                                 {/* The Ribbon Face */}
                                 <path 
                                    d={`M 0 ${100 - hStart} L 100 ${100 - hEnd} L 100 100 L 0 100 Z`} 
                                    fill={item.color} 
                                    fillOpacity="0.8"
                                    className={`transition-all duration-1000 ${mounted ? 'opacity-80' : 'opacity-0 translate-y-full'}`}
                                 />
                                 {/* Top Edge (The Line) */}
                                 <line 
                                    x1="0" y1={100 - hStart} 
                                    x2="100" y2={100 - hEnd} 
                                    stroke={item.color} 
                                    strokeWidth="4"
                                    className="drop-shadow-lg"
                                 />
                             </svg>
                             
                             {/* Floating Label */}
                             <div 
                                className={`absolute left-1/2 transform -translate-x-1/2 bg-slate-950 text-white text-[10px] px-2 py-1 rounded border border-slate-700 pointer-events-none transition-all duration-300 z-20
                                ${hovered === item.label ? 'opacity-100 -translate-y-8' : 'opacity-0'}`}
                                style={{ top: `${100 - Math.max(hStart, hEnd)}%` }}
                             >
                                 <span className="font-bold">{item.label}</span>
                                 <div className="text-[9px] text-slate-400">{item.start}g → {item.end}g</div>
                             </div>
                         </div>
                     </div>
                 )
             })}
         </div>
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex justify-center gap-4 border-t border-slate-800 pt-4">
          {FISH_DATA.map((d, i) => (
              <div key={i} className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
                  <div className="w-3 h-3 rounded-full shadow-lg" style={{ backgroundColor: d.color }}></div>
                  <span className="text-[10px] text-slate-300 font-bold">{d.label}</span>
              </div>
          ))}
      </div>
    </div>
  );
};

export default ChartFish;
