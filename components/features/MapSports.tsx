
import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { SPORTS_MAP_DATA } from '../../constants';

const MapSports: React.FC = () => {
  const [view, setView] = useState<'present' | 'future'>('present');

  return (
    <div className="bg-slate-100 p-6 rounded-3xl shadow-lg border border-slate-200">
        <div className="flex justify-center gap-4 mb-6">
            <button 
                onClick={() => setView('present')}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all shadow-sm ${view === 'present' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
            >
                Present
            </button>
            <button 
                onClick={() => setView('future')}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all shadow-sm ${view === 'future' ? 'bg-purple-600 text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
            >
                Future Plans
            </button>
        </div>

        <div className="relative aspect-video bg-white rounded-xl shadow-inner border-4 border-slate-200 overflow-hidden p-8 flex flex-wrap gap-4 content-center justify-center transition-all">
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            {SPORTS_MAP_DATA[view].map((item: string, i: number) => (
                <div 
                    key={i}
                    className={`
                        relative px-6 py-4 rounded-lg shadow-md font-bold text-xs uppercase tracking-wider flex items-center justify-center text-center transition-all duration-500 animate-pop-in
                        ${view === 'present' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' : 'bg-purple-50 text-purple-700 border border-purple-100'}
                    `}
                    style={{ 
                        width: item.includes('Pool') || item.includes('Gym') ? '40%' : '25%',
                        height: '80px'
                    }}
                >
                    {item}
                </div>
            ))}
        </div>

        <div className="mt-4 text-center text-xs text-slate-400 italic">
            * Schematic representation of layout changes
        </div>
    </div>
  );
};

export default MapSports;
