import React from 'react';
import { CHART_DATA, HOUSING_CHART_DATA, TRANSPORT_CHART_DATA } from '../../constants';
import { BrainCircuit } from 'lucide-react';

// ZEN BAR CHART (Monochrome)
export const ZenBarChart: React.FC = () => {
    const maxVal = 16;
    
    return (
        <div className="w-full h-64 flex items-end justify-between gap-4 py-4 border-b border-[#44403c] font-mono text-xs text-[#78716c]">
            {CHART_DATA.map((group, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="flex gap-1 items-end h-40 w-full justify-center">
                        <div className="w-2 bg-[#44403c] group-hover:bg-[#78716c] transition-colors" style={{ height: `${(group.f1/maxVal)*100}%` }}></div>
                        <div className="w-2 bg-[#44403c] group-hover:bg-[#78716c] transition-colors" style={{ height: `${(group.f2/maxVal)*100}%` }}></div>
                        <div className="w-2 bg-[#44403c] group-hover:bg-[#78716c] transition-colors" style={{ height: `${(group.f3/maxVal)*100}%` }}></div>
                    </div>
                    <span className="uppercase tracking-widest text-[9px]">{group.label.split(' ')[0]} {group.label.split(' ')[1] || ''}</span>
                </div>
            ))}
        </div>
    )
}

// ZEN HOUSING CHART (Line approximation)
export const ZenHousingChart: React.FC = () => {
    return (
        <div className="w-full h-64 relative border-l border-b border-[#44403c] p-4">
             {/* Approximate visual for Owned vs Rented */}
            <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
                 {/* Rented Line (Down) */}
                 <polyline 
                    points="0,10 12,15 25,15 37,20 50,25 62,30 75,35 87,35 100,32" 
                    fill="none" 
                    stroke="#57534e" 
                    strokeWidth="1" 
                 />
                 {/* Owned Line (Up) */}
                 <polyline 
                    points="0,40 12,35 25,35 37,30 50,25 62,20 75,15 87,15 100,18" 
                    fill="none" 
                    stroke="#d6d3d1" 
                    strokeWidth="1"
                 />
                 <circle cx="50" cy="25" r="2" fill="#d6d3d1" />
            </svg>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-8 bg-[#1c1917] px-2 py-1 border border-[#44403c] text-[9px] text-[#a8a29e] font-mono">
                1971: Intersection
            </div>
        </div>
    )
}

// CONCEPT NODE (Replaces FlipCard)
export const ConceptNode: React.FC<{ term: string, def: string }> = ({ term, def }) => {
    return (
        <div className="border-l-2 border-[#44403c] pl-6 py-2 group hover:border-[#a8a29e] transition-colors">
            <h4 className="text-lg font-serif text-[#e7e5e4] mb-1">{term}</h4>
            <p className="text-sm font-light text-[#78716c] leading-relaxed group-hover:text-[#a8a29e] transition-colors">{def}</p>
        </div>
    )
}

// REFLECTION PROMPT (Replaces Quiz)
export const ReflectionPrompt: React.FC<{ question: string }> = ({ question }) => {
    return (
        <div className="bg-[#0c0c0e] border border-[#292524] p-8 rounded-sm my-8 flex items-start gap-4">
            <BrainCircuit className="text-[#57534e] mt-1 shrink-0" size={20} />
            <div>
                <p className="text-[#a8a29e] font-mono text-xs uppercase tracking-widest mb-3">Internalize</p>
                <p className="text-xl font-light text-[#d6d3d1] italic">"{question}"</p>
            </div>
        </div>
    )
}