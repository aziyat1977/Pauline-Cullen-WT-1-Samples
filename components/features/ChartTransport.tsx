import React, { useState, useEffect } from 'react';
import { Eye, Users } from 'lucide-react';
import { TRANSPORT_CHART_DATA } from '../../constants';

const ChartTransport: React.FC = () => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="bg-purple-900 p-6 rounded-3xl shadow-inner mb-4 relative overflow-hidden group font-sans text-white border border-purple-800">
      <div className="absolute top-4 right-4 flex gap-2">
        <span className="text-[10px] bg-purple-800/80 backdrop-blur px-2 py-1 rounded-full shadow-sm text-purple-200 flex items-center gap-1 border border-purple-700">
          <Eye size={10}/> View
        </span>
      </div>
      
      <h3 className="text-center text-lg font-bold mb-6 tracking-tight">CO₂ Emissions vs Occupancy</h3>
      
      <div className="space-y-3">
        {TRANSPORT_CHART_DATA.map((item, idx) => (
          <div key={idx} className="relative">
            {/* Label Row */}
            <div className="flex items-center gap-3 mb-1">
               <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-lg shadow-sm border border-purple-700">
                 {item.icon}
               </div>
               <div className="w-20 font-bold text-xs text-purple-100">{item.label}</div>
            </div>

            {/* Bar Container */}
            <div 
              className="relative h-10 bg-black/20 rounded-r-xl flex items-center group cursor-pointer transition-all hover:bg-black/30"
              onMouseEnter={() => setHoveredBar(idx)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              {/* Occupancy Bubble (Left) */}
              <div className="absolute -left-3 z-10 w-10 h-10 rounded-full bg-green-500 border-4 border-purple-900 flex flex-col items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
                 <Users size={10} className="text-green-900" />
                 <span className="text-[9px] font-bold text-green-900 leading-none mt-0.5">{item.passengers}</span>
              </div>

              {/* CO2 Bar */}
              <div 
                className={`h-6 rounded-r-lg bg-blue-500 shadow-[0_3px_0_rgb(29,78,216)] transition-all duration-1000 ease-out relative ${mounted ? 'animate-grow-x' : 'scale-x-0'}`}
                style={{ width: `${Math.max(item.co2 / 2.6, 2)}%`, animationDelay: `${idx * 100}ms` }} 
              >
                 {/* 3D Side Effect */}
                 <div className="absolute top-full left-0 h-1.5 w-full bg-blue-700 rounded-br-lg opacity-60 transform skew-x-[-45deg] origin-top-left"></div>
                 
                 {/* Value Label */}
                 {item.co2 > 0 && (
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white drop-shadow-md">
                      {item.co2}g
                    </span>
                 )}
              </div>

              {/* Tooltip */}
              {hoveredBar === idx && (
                <div className="absolute left-1/2 top-[-40px] transform -translate-x-1/2 bg-white text-purple-900 text-[10px] px-3 py-1.5 rounded-lg shadow-xl z-20 animate-fade-in-up whitespace-nowrap">
                   <div className="font-bold mb-0.5">{item.label}</div>
                   <div>{item.co2}g CO₂  •  Avg {item.passengers} people</div>
                   <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white"></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between text-[10px] text-purple-300 px-2 border-t border-purple-700/50 pt-3">
         <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div> <span>Occupancy (Avg Travellers)</span>
         </div>
         <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded bg-blue-500"></div> <span>Grams CO₂ / passenger-km</span>
         </div>
      </div>
    </div>
  );
};

export default ChartTransport;