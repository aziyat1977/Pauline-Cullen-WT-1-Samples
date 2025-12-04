import React, { useState } from 'react';
import { Eye, PieChart, Table } from 'lucide-react';
import { DEGRADATION_PIE_DATA, DEGRADATION_TABLE_DATA } from '../../constants';

const ChartDualView: React.FC = () => {
  const [activeView, setActiveView] = useState<'pie' | 'table'>('pie');
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);

  // CSS Conic Gradient for Pie Chart
  // 35% Tree, 30% Animal, 28% Crop, 7% Other
  // 35% = 126deg, +30% = 234deg, +28% = 334.8deg
  const pieGradient = `conic-gradient(
    #059669 0deg 126deg, 
    #d97706 126deg 234deg, 
    #eab308 234deg 334.8deg, 
    #a8a29e 334.8deg 360deg
  )`;

  return (
    <div className="bg-stone-50 p-6 rounded-xl shadow-inner mb-4 relative overflow-hidden group font-sans border-t-8 border-emerald-600">
      <div className="absolute top-2 right-2 flex gap-2">
        <span className="text-[10px] bg-white px-2 py-1 rounded shadow text-stone-500 flex items-center gap-1">
          <Eye size={10}/> Interactive
        </span>
      </div>
      
      <div className="flex justify-center mb-6 gap-3">
        <button 
          onClick={() => setActiveView('pie')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-bold text-sm transition-all ${activeView === 'pie' ? 'bg-emerald-700 text-white shadow-lg scale-105' : 'bg-stone-200 text-stone-500 hover:bg-stone-300'}`}
        >
          <PieChart size={14}/> Worldwide (Pie)
        </button>
        <button 
          onClick={() => setActiveView('table')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-bold text-sm transition-all ${activeView === 'table' ? 'bg-stone-700 text-white shadow-lg scale-105' : 'bg-stone-200 text-stone-500 hover:bg-stone-300'}`}
        >
          <Table size={14}/> Regional (Table)
        </button>
      </div>
      
      <div className="min-h-[250px] flex items-center justify-center transition-all duration-500">
         
         {/* PIE VIEW */}
         {activeView === 'pie' && (
           <div className="relative w-full max-w-sm flex flex-col md:flex-row items-center gap-6 animate-fade-in-up">
              <div 
                className="w-40 h-40 rounded-full shadow-xl relative cursor-pointer hover:scale-105 transition-transform duration-300"
                style={{ background: pieGradient }}
              >
              </div>

              <div className="space-y-2 w-full text-xs">
                {DEGRADATION_PIE_DATA.map((item, idx) => (
                   <div 
                     key={idx} 
                     className="flex items-center justify-between p-1.5 rounded hover:bg-white hover:shadow-sm transition-all cursor-default"
                     onMouseEnter={() => setHoveredSlice(idx)}
                     onMouseLeave={() => setHoveredSlice(null)}
                   >
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <span className="font-medium text-stone-700">{item.label}</span>
                      </div>
                      <span className="font-bold text-stone-800">{item.value}%</span>
                   </div>
                ))}
              </div>
           </div>
         )}

         {/* TABLE VIEW */}
         {activeView === 'table' && (
           <div className="w-full overflow-x-auto animate-fade-in-up">
             <table className="w-full text-xs text-left text-stone-600">
                <thead className="text-[10px] text-stone-700 uppercase bg-stone-200">
                    <tr>
                        <th className="px-3 py-2 rounded-tl-lg">Region</th>
                        <th className="px-3 py-2">Trees</th>
                        <th className="px-3 py-2">Crops</th>
                        <th className="px-3 py-2">Animals</th>
                        <th className="px-3 py-2 rounded-tr-lg font-black">Total %</th>
                    </tr>
                </thead>
                <tbody>
                    {DEGRADATION_TABLE_DATA.map((row, idx) => (
                        <tr key={idx} className="bg-white border-b hover:bg-emerald-50 transition-colors">
                            <td className="px-3 py-2 font-bold text-stone-800">{row.region}</td>
                            <td className="px-3 py-2">{row.trees}</td>
                            <td className="px-3 py-2">{row.crops}</td>
                            <td className="px-3 py-2">{row.animals}</td>
                            <td className="px-3 py-2 font-black text-emerald-700">{row.total}%</td>
                        </tr>
                    ))}
                </tbody>
             </table>
             <p className="text-[9px] text-stone-400 mt-2 text-right italic">* Data represents % of land degraded</p>
           </div>
         )}
      </div>
    </div>
  );
};

export default ChartDualView;