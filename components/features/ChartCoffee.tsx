
import React, { useState } from 'react';
import { Eye, Coffee, ShoppingBasket } from 'lucide-react';
import { COFFEE_DATA, BANANA_DATA } from '../../constants';

const ChartCoffee: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'coffee' | 'bananas'>('coffee');
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  const data = activeTab === 'coffee' ? COFFEE_DATA : BANANA_DATA;
  const colorPrimary = activeTab === 'coffee' ? 'bg-amber-700' : 'bg-yellow-400';
  const colorSecondary = activeTab === 'coffee' ? 'bg-amber-900' : 'bg-yellow-600';
  const maxVal = activeTab === 'coffee' ? 20 : 47; 

  return (
    <div className="bg-stone-100 p-8 rounded-3xl shadow-inner mb-8 relative overflow-hidden group font-sans border-t-8 border-stone-300">
      <div className="absolute top-2 right-2 flex gap-2">
        <span className="text-xs bg-stone-200 px-3 py-1.5 rounded-full shadow-sm text-stone-500 flex items-center gap-1.5 border border-stone-100">
          <Eye size={12}/> Interactive 3D View
        </span>
      </div>
      
      <div className="flex justify-center mb-10 gap-4">
        <button 
          onClick={() => setActiveTab('coffee')}
          className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'coffee' ? 'bg-amber-800 text-white shadow-lg scale-105' : 'bg-white border border-stone-200 text-stone-500 hover:bg-stone-50'}`}
        >
          <Coffee size={18}/> Coffee
        </button>
        <button 
          onClick={() => setActiveTab('bananas')}
          className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'bananas' ? 'bg-yellow-500 text-yellow-900 shadow-lg scale-105' : 'bg-white border border-stone-200 text-stone-500 hover:bg-stone-50'}`}
        >
          <ShoppingBasket size={18}/> Bananas
        </button>
      </div>
      
      <div className="flex justify-around items-end h-72 lg:h-80 px-4 pb-2 border-b-4 border-stone-300 perspective-1000">
         {/* Y Axis Grid Lines */}
         <div className="absolute inset-0 pointer-events-none z-0">
           {[0, 0.25, 0.5, 0.75, 1].map(val => (
             <div key={val} className="absolute w-full border-t border-stone-300 dashed opacity-50" style={{ bottom: `${val * 100}%` }}></div>
           ))}
         </div>

         {data.map((item, idx) => (
           <div key={idx} className="relative flex flex-col items-center justify-end h-full w-full mx-1 lg:mx-2 z-10">
              <div className="flex gap-1 lg:gap-2 items-end w-full justify-center h-full">
                {/* 1999 Bar */}
                <div 
                  className={`w-1/2 max-w-[24px] relative transition-all duration-700 ease-out group/bar hover:opacity-90 cursor-pointer ${colorPrimary} opacity-60 rounded-t-sm`}
                  style={{ height: `${(item.year1999 / maxVal) * 90}%`, minHeight: '4px' }}
                  onMouseEnter={() => setHoveredBar(`${idx}-99`)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  <div className={`absolute top-0 right-0 h-full w-1 lg:w-2 ${colorSecondary} origin-right transform skew-y-12 translate-x-full opacity-50`}></div>
                  <div className={`absolute top-0 left-0 w-full h-1 lg:h-2 ${colorSecondary} origin-top transform skew-x-12 -translate-y-full opacity-30`}></div>
                  
                  {hoveredBar === `${idx}-99` && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none">
                      <span className="font-bold">1999:</span> €{item.year1999}m
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-900"></div>
                    </div>
                  )}
                </div>

                {/* 2004 Bar */}
                <div 
                  className={`w-1/2 max-w-[24px] relative transition-all duration-700 ease-out group/bar hover:opacity-90 cursor-pointer ${colorPrimary} rounded-t-sm`}
                  style={{ height: `${(item.year2004 / maxVal) * 90}%`, minHeight: '4px' }}
                  onMouseEnter={() => setHoveredBar(`${idx}-04`)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  <div className={`absolute top-0 right-0 h-full w-1 lg:w-2 ${colorSecondary} origin-right transform skew-y-12 translate-x-full opacity-80`}></div>
                  <div className={`absolute top-0 left-0 w-full h-1 lg:h-2 ${colorSecondary} origin-top transform skew-x-12 -translate-y-full opacity-60`}></div>
                  
                  {hoveredBar === `${idx}-04` && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none">
                      <span className="font-bold">2004:</span> €{item.year2004}m
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-900"></div>
                    </div>
                  )}
                </div>
              </div>
              <span className="mt-4 font-bold text-stone-600 text-[10px] lg:text-sm text-center leading-tight uppercase tracking-wide">{item.country}</span>
           </div>
         ))}
      </div>

      <div className="mt-8 flex justify-center gap-8 text-sm text-stone-500 font-medium">
         <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${colorPrimary} opacity-60`}></div> 1999
         </div>
         <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${colorPrimary}`}></div> 2004
         </div>
      </div>
    </div>
  );
};

export default ChartCoffee;
