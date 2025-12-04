
import React, { useState } from 'react';
import { Eye, Anchor } from 'lucide-react';

const InteractiveMap: React.FC = () => {
  const [view, setView] = useState<'before' | 'after'>('before');

  return (
    <div className="bg-blue-50 p-6 rounded-xl shadow-inner mb-8 relative overflow-hidden group font-sans border-t-8 border-blue-600 transition-colors duration-500">
      <div className="absolute top-2 right-2 flex gap-2">
        <span className="text-xs bg-white px-2 py-1 rounded shadow text-blue-500 flex items-center gap-1">
          <Eye size={12}/> Interactive Map
        </span>
      </div>
      
      <div className="flex justify-center mb-6 gap-8">
        <button 
          onClick={() => setView('before')}
          className={`px-6 py-2 rounded-full font-bold transition-all border-2 ${view === 'before' ? 'bg-green-600 text-white border-green-600 scale-105' : 'bg-white text-gray-500 border-gray-300'}`}
        >
          Before Construction
        </button>
        <button 
          onClick={() => setView('after')}
          className={`px-6 py-2 rounded-full font-bold transition-all border-2 ${view === 'after' ? 'bg-blue-600 text-white border-blue-600 scale-105' : 'bg-white text-gray-500 border-gray-300'}`}
        >
          After Development
        </button>
      </div>
      
      {/* SVG Map Container */}
      <div className="relative w-full aspect-[2/1] bg-blue-400 rounded-xl overflow-hidden shadow-lg border-4 border-blue-300 transition-all duration-700">
        
        {/* Ocean Texture (CSS Pattern) */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

        {/* THE ISLAND */}
        <div className="absolute inset-10 bg-[#eecfa1] rounded-[50%_60%_40%_50%/60%_50%_60%_40%] shadow-xl transition-all duration-1000 transform md:scale-90 origin-center">
           
           {/* -- SHARED FEATURES (Natural) -- */}
           {/* Beach (West) */}
           <div className="absolute top-1/4 left-0 w-16 h-24 bg-[#fef3c7] rounded-r-full opacity-80"></div>

           {/* -- BEFORE FEATURES -- */}
           <div className={`transition-opacity duration-700 ${view === 'before' ? 'opacity-100' : 'opacity-0'}`}>
              {/* Scattered Trees */}
              {[...Array(8)].map((_, i) => (
                <div key={i} className="absolute text-green-700" style={{ top: `${20 + Math.random()*60}%`, left: `${20 + Math.random()*60}%`, transform: `scale(${0.8 + Math.random()})` }}>
                  <div className="w-2 h-4 bg-amber-800 mx-auto"></div>
                  <div className="w-6 h-6 bg-green-600 rounded-full -mt-5 opacity-90"></div>
                </div>
              ))}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-amber-900/20 font-bold text-4xl rotate-12 pointer-events-none">DESERTED</div>
           </div>

           {/* -- AFTER FEATURES -- */}
           <div className={`transition-opacity duration-700 ${view === 'after' ? 'opacity-100' : 'opacity-0'}`}>
              
              {/* Pier (South) */}
              <div className="absolute bottom-0 left-1/2 w-4 h-16 bg-stone-800 -mb-8 transform -translate-x-1/2"></div>
              <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2">
                 <Anchor size={16} className="text-white"/>
              </div>

              {/* Central Buildings */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
                 {/* Restaurant */}
                 <div className="w-12 h-8 bg-red-700 rounded shadow-md flex items-center justify-center text-[8px] text-white font-bold">REST</div>
                 {/* Reception */}
                 <div className="w-10 h-6 bg-red-600 rounded shadow-md flex items-center justify-center text-[8px] text-white font-bold">RCPT</div>
              </div>

              {/* Huts (West Cluster) */}
              <div className="absolute top-1/3 left-[15%] grid grid-cols-2 gap-1">
                 {[1,2,3].map(i => <div key={i} className="w-4 h-4 rounded-full bg-orange-300 border border-orange-500 shadow-sm"></div>)}
              </div>
              {/* Huts (Center Cluster) */}
              <div className="absolute top-1/3 right-[20%] grid grid-cols-2 gap-2">
                 {[1,2,3,4].map(i => <div key={i} className="w-4 h-4 rounded-full bg-orange-300 border border-orange-500 shadow-sm"></div>)}
              </div>

              {/* Vehicle Track (Dashed Line) */}
              <div className="absolute top-1/2 left-1/2 w-1 h-20 bg-stone-600 transform -translate-x-1/2 border-l-2 border-dashed border-white opacity-50"></div>

              {/* Swimming Area (West) */}
              <div className="absolute top-1/4 -left-4 w-12 h-20 border-2 border-dashed border-blue-600 rounded-r-xl flex items-center justify-center">
                 <span className="text-[8px] text-blue-800 font-bold -rotate-90">SWIM</span>
              </div>

           </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-2 right-2 bg-white/90 p-2 rounded text-[10px] shadow">
           <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-300 border border-orange-500"></div> Hut</div>
           <div className="flex items-center gap-1"><div className="w-2 h-2 bg-red-700"></div> Building</div>
           <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-600"></div> Tree</div>
        </div>
      </div>
      
      <p className="text-center mt-4 text-sm text-blue-800 italic">
        {view === 'before' ? "The island in its natural state." : "The island after tourist infrastructure was developed."}
      </p>
    </div>
  );
};

export default InteractiveMap;
