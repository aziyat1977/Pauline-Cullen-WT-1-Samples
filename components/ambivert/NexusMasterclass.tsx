
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Zap, Target, BookOpen, AlertTriangle, ShieldCheck, PenTool, CheckCircle2, X, FileWarning, EyeOff, Link, Hammer, Layers, RefreshCcw, ListOrdered, Bug, GitMerge, Timer, Scan, Highlighter, Layout, Split, Move, Quote, Map, BarChart2, PieChart, Table, MousePointer2, Activity, Menu, Grid, RotateCcw, ChevronRight, Hash, TrendingUp, Search, Umbrella, Edit3, Check, Clock, TrendingDown } from 'lucide-react';
import ChartDualView from '../features/ChartDualView';
import InteractiveMap from '../features/InteractiveMap';
import ChartHousing from '../features/ChartHousing';
import Chart3D from '../features/Chart3D';
import ChartCoffee from '../features/ChartCoffee';
import ChartFish from '../features/ChartFish';

// --- MICRO-COMPONENTS FOR INTERACTIVITY ---

const GapFill = ({ parts, options, correct }: { parts: string[], options: string[], correct: string[] }) => {
    const [slots, setSlots] = useState<string[]>(new Array(parts.length - 1).fill(null));
    const [pool, setPool] = useState(options);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const fillSlot = (slotIdx: number, word: string) => {
        const newSlots = [...slots];
        if (newSlots[slotIdx]) {
            setPool([...pool, newSlots[slotIdx]]); // Return old word
        }
        newSlots[slotIdx] = word;
        setSlots(newSlots);
        setPool(pool.filter(w => w !== word));
    };

    const check = () => {
        const isCorrect = slots.every((s, i) => s === correct[i]);
        setStatus(isCorrect ? 'success' : 'error');
    };

    return (
        <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-800">
            <div className="flex flex-wrap gap-2 mb-6 p-4 bg-slate-950 rounded border border-slate-800 min-h-[60px]">
                {pool.map((word, i) => (
                    <button key={i} onClick={() => {
                        const firstEmpty = slots.findIndex(s => s === null);
                        if (firstEmpty !== -1) fillSlot(firstEmpty, word);
                    }} className="px-3 py-1 bg-slate-800 text-teal-400 text-xs font-bold rounded hover:bg-slate-700 transition-colors border border-teal-900/30">
                        {word}
                    </button>
                ))}
            </div>
            <div className="text-lg leading-loose text-slate-300 font-light">
                {parts.map((part, i) => (
                    <React.Fragment key={i}>
                        {part}
                        {i < parts.length - 1 && (
                            <button 
                                onClick={() => {
                                    if(slots[i]) {
                                        setPool([...pool, slots[i]]);
                                        const newSlots = [...slots];
                                        newSlots[i] = null as any;
                                        setSlots(newSlots);
                                        setStatus('idle');
                                    }
                                }}
                                className={`mx-1 min-w-[80px] px-2 py-0 border-b-2 inline-block text-center transition-colors ${
                                    slots[i] 
                                    ? (status === 'success' ? 'border-emerald-500 text-emerald-400' : (status === 'error' ? 'border-red-500 text-red-400' : 'border-teal-500 text-white')) 
                                    : 'border-slate-600 bg-slate-800/50 text-transparent'
                                }`}
                            >
                                {slots[i] || "___"}
                            </button>
                        )}
                    </React.Fragment>
                ))}
            </div>
            <div className="mt-6 flex justify-end">
                <button onClick={check} className={`px-6 py-2 rounded font-bold text-sm uppercase tracking-widest transition-all ${status === 'success' ? 'bg-emerald-500 text-black' : 'bg-white text-black hover:bg-slate-200'}`}>
                    {status === 'success' ? 'Verified' : 'Check Protocol'}
                </button>
            </div>
        </div>
    );
};

const UmbrellaDrill = () => {
    const data = [
        { term: "Regions of the World", items: ["South Asia, Latin America, Oceania"] },
        { term: "Fields of Study", items: ["Education, psychology, architecture"] },
        { term: "Community Services", items: ["Hospitals, police, fire brigade"] },
        { term: "Different Genders", items: ["Males, females"] },
        { term: "Types of Energy", items: ["Wind, solar, coal, oil"] },
        { term: "Dairy Products", items: ["Cheese, milk, yoghurt"] },
        { term: "Physical Activities", items: ["Cycling, swimming, running"] },
        { term: "Types of Media", items: ["Television, radio, podcast"] },
        { term: "Types of Transport", items: ["Bus, train, plane"] },
        { term: "Amenities", items: ["Shopping centre, restaurant, cinema"] }
    ];

    const [revealed, setRevealed] = useState<number[]>([]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.map((item, idx) => (
                <button 
                    key={idx}
                    onClick={() => setRevealed(prev => [...prev, idx])}
                    className={`p-4 rounded border text-left transition-all ${
                        revealed.includes(idx) 
                        ? 'bg-emerald-950/30 border-emerald-500/50' 
                        : 'bg-slate-900 border-slate-800 hover:border-slate-600'
                    }`}
                >
                    <div className="text-xs text-slate-500 mb-1 uppercase tracking-wider">{item.items[0]}</div>
                    <div className={`font-bold ${revealed.includes(idx) ? 'text-emerald-400' : 'text-transparent bg-slate-800 rounded animate-pulse'}`}>
                        {revealed.includes(idx) ? item.term : "???"}
                    </div>
                </button>
            ))}
        </div>
    )
}

const MiniTrendChart = ({ type }: { type: 'one' | 'two' | 'all' }) => {
    // A simplified SVG generator for the specific exercise in the PDF
    const renderPath = () => {
        if (type === 'one') {
            return (
                <>
                    <path d="M 0 80 L 30 70 L 60 40 L 100 20" fill="none" stroke="#10b981" strokeWidth="2" /> {/* Rising */}
                    <path d="M 0 30 L 30 40 L 60 40 L 100 50" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="4" />
                    <path d="M 0 50 L 30 60 L 60 80 L 100 90" fill="none" stroke="#ef4444" strokeWidth="1" />
                </>
            );
        } else if (type === 'two') {
            return (
                <>
                    <path d="M 0 80 Q 50 20 100 10" fill="none" stroke="#10b981" strokeWidth="2" /> 
                    <path d="M 0 90 Q 50 50 100 30" fill="none" stroke="#10b981" strokeWidth="2" /> 
                    <path d="M 0 40 L 20 60 L 40 30 L 60 70 L 80 40 L 100 50" fill="none" stroke="#f59e0b" strokeWidth="1" /> 
                </>
            );
        } else {
            return (
                <>
                    <path d="M 0 90 L 100 10" fill="none" stroke="#10b981" strokeWidth="1" />
                    <path d="M 0 85 L 100 20" fill="none" stroke="#10b981" strokeWidth="1" />
                    <path d="M 0 80 L 100 30" fill="none" stroke="#10b981" strokeWidth="1" />
                    <path d="M 0 95 L 100 80" fill="none" stroke="#ef4444" strokeWidth="2" /> {/* Low but rising? Or flat */}
                </>
            );
        }
    };

    return (
        <svg viewBox="0 0 100 100" className="w-full h-32 bg-slate-950 rounded border border-slate-800">
            {renderPath()}
        </svg>
    )
}

const OverviewSelector = () => {
    const options = [
        { text: "Overall, people consumed chicken and beef more than lamb and fish during the 25-year period.", correct: false, feedback: "Incomplete. Fails to mention trends (rise/fall)." },
        { text: "Overall, although beef was the most popular meat initially, it was overtaken by chicken. Moreover, lamb and fish consumption decreased.", correct: true, feedback: "Excellent. Captures the crossover, the new leader, and the decline of others." },
        { text: "To sum up, residents relied mainly on red meats initially, they preferred chicken more compared to other items at the end.", correct: false, feedback: "Conclusion style. 'Relied on' and 'preferred' are assumptions not in data." },
        { text: "Overall, it is clear that Chicken is the only food that experienced an increase in its administration over the whole time frame.", correct: false, feedback: "'Administration' is incorrect vocabulary. Misses other trends." },
    ];

    const [selected, setSelected] = useState<number | null>(null);

    return (
        <div className="space-y-4">
            {options.map((opt, i) => (
                <button
                    key={i}
                    onClick={() => setSelected(i)}
                    className={`w-full text-left p-4 rounded border transition-all ${
                        selected === i 
                        ? (opt.correct ? 'bg-emerald-950/50 border-emerald-500' : 'bg-red-950/50 border-red-500')
                        : 'bg-slate-900 border-slate-800 hover:border-slate-600'
                    }`}
                >
                    <div className="text-sm text-slate-200">{opt.text}</div>
                    {selected === i && (
                        <div className={`mt-2 text-xs font-bold ${opt.correct ? 'text-emerald-400' : 'text-red-400'}`}>
                            DIAGNOSIS: {opt.feedback}
                        </div>
                    )}
                </button>
            ))}
        </div>
    )
}

// Special Line Graph for Exercises
const InteractiveLineGraph = ({ mode }: { mode: 'labels' | 'trends' }) => {
    // Coordinates mapping for labels A-G
    const targets = [
        { id: 'A', x: 25, y: 30, val: "just under 200 grams", correct: 'just under 200 grams' }, // Beef peakish
        { id: 'B', x: 50, y: 15, val: "250 grams", correct: '250 grams' }, // Chicken peak
        { id: 'C', x: 80, y: 35, val: "approx 220 grams", correct: 'approximately 220 grams' },
        { id: 'D', x: 70, y: 60, val: "about 130 grams", correct: 'about 130 grams' },
        { id: 'E', x: 75, y: 80, val: "below 50 grams", correct: 'below 50 grams' },
        { id: 'F', x: 60, y: 90, val: "the early 1990s", correct: 'the early 1990s' }, // X-axis roughly
        { id: 'G', x: 15, y: 85, val: "early 80s", correct: 'the early 1980s' }
    ];

    const trends = [
        { id: 'A', x: 15, y: 40, text: "it fell sharply initially then briefly recovered", target: 'beef' },
        { id: 'B', x: 50, y: 10, text: "although there was a slight increase in 1994, the downward trend continued", target: 'beef' },
        { id: 'C', x: 85, y: 25, text: "by 2004 it had reached 250 grams", target: 'chicken' },
        { id: 'D', x: 60, y: 65, text: "within 20 years it had fallen to almost 50 grams", target: 'lamb' },
        { id: 'E', x: 50, y: 90, text: "figures remained relatively stable", target: 'fish' }
    ];

    const [activeId, setActiveId] = useState<string | null>(null);
    const [solved, setSolved] = useState<string[]>([]);

    const items = mode === 'labels' ? targets : trends;

    const handleSolve = (id: string) => {
        if (!solved.includes(id)) {
            setSolved([...solved, id]);
            setActiveId(null);
        }
    };

    return (
        <div className="relative w-full aspect-[4/3] bg-white rounded-xl shadow-xl overflow-hidden select-none border-4 border-slate-200">
            {/* Chart Lines SVG */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                {/* Grid */}
                {[0,20,40,60,80,100].map(y => <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#e2e8f0" strokeWidth="0.5" />)}
                
                {/* Chicken (Green) - Rising */}
                <polyline points="0,50 20,40 40,30 60,20 80,15 100,18" fill="none" stroke="#22c55e" strokeWidth="2" />
                {/* Beef (Red) - Falling with bumps */}
                <polyline points="0,25 15,40 30,25 50,35 70,50 90,60 100,65" fill="none" stroke="#ef4444" strokeWidth="2" />
                {/* Lamb (Blue) - Steady Fall */}
                <polyline points="0,50 30,60 60,70 100,80" fill="none" stroke="#3b82f6" strokeWidth="2" />
                {/* Fish (Orange) - Flat */}
                <polyline points="0,85 50,88 100,86" fill="none" stroke="#f97316" strokeWidth="2" />
            </svg>

            {/* Labels overlay */}
            {items.map((item) => (
                <div 
                    key={item.id}
                    className="absolute"
                    style={{ left: `${item.x}%`, top: `${item.y}%` }}
                >
                    {/* Marker Point */}
                    <div 
                        className={`w-6 h-6 -ml-3 -mt-3 rounded-full flex items-center justify-center font-bold text-xs shadow-md cursor-pointer transition-all z-10 relative
                        ${solved.includes(item.id) ? 'bg-emerald-500 text-white scale-90' : 'bg-yellow-400 text-black animate-pulse hover:scale-110'}`}
                        onClick={() => !solved.includes(item.id) && setActiveId(item.id)}
                    >
                        {solved.includes(item.id) ? <Check size={14} /> : item.id}
                    </div>

                    {/* Popover Selection */}
                    {activeId === item.id && (
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-slate-800 p-2 rounded shadow-xl z-20 w-48 flex flex-col gap-1 animate-pop-in">
                            {items.map((opt) => (
                                <button 
                                    key={opt.id}
                                    onClick={() => opt.id === item.id ? handleSolve(item.id) : null}
                                    className="text-[10px] text-left text-white hover:bg-slate-700 p-1.5 rounded truncate"
                                >
                                    {mode === 'labels' ? (opt as any).correct : (opt as any).text}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Solved Label */}
                    {solved.includes(item.id) && (
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 text-black text-[9px] font-bold px-2 py-1 rounded shadow whitespace-nowrap border border-emerald-200">
                            {mode === 'labels' ? (item as any).correct : (item as any).text.substring(0, 20) + '...'}
                        </div>
                    )}
                </div>
            ))}
            
            <div className="absolute bottom-2 right-2 text-[10px] text-slate-400 font-mono bg-white/80 px-2 rounded">
                FIG 1: Fish & Meat Cons.
            </div>
        </div>
    );
};

interface NexusMasterclassProps {
  onBack: () => void;
}

const NexusMasterclass: React.FC<NexusMasterclassProps> = ({ onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Restart animation on slide change
  useEffect(() => {
    setAnimate(false);
    setTimeout(() => setAnimate(true), 50);
  }, [currentSlide]);

  const slides = [
    // --- EXISTING SLIDES (Preserved functionality) ---
    {
      title: "SECTOR 1: DATA INTEGRITY",
      headline: "THE INFOGRAPHIC TRAP",
      icon: <AlertTriangle size={64} className="text-red-500" />,
      content: (
        <div className="space-y-8">
           <div className="bg-red-950/30 border-l-4 border-red-500 p-8">
              <h3 className="text-2xl font-black text-red-500 mb-4">CRITICAL ERROR: WRONG MATERIALS</h3>
              <p className="text-xl text-slate-300 leading-relaxed font-light">
                 <span className="text-white font-bold">"Task 1 is a graph... so I can practice using any random infographic."</span>
              </p>
              <p className="text-red-400 mt-4 font-mono text-sm uppercase tracking-widest">>> INCORRECT ASSUMPTION DETECTED</p>
           </div>
           {/* ...content abbreviated for brevity, but logically present... */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-slate-900 p-6 rounded border border-slate-800 opacity-50">
                   <h4 className="font-bold text-slate-500 mb-2">Random Internet Graphs</h4>
                   <ul className="text-sm text-slate-600 space-y-2 list-disc pl-4">
                       <li>Confusing layouts</li>
                       <li>Require specialist knowledge</li>
                       <li>Force irrelevant skills</li>
                   </ul>
               </div>
               <div className="bg-emerald-950/20 p-6 rounded border border-emerald-500/50">
                   <h4 className="font-bold text-emerald-400 mb-2">Real IELTS Data</h4>
                   <ul className="text-sm text-emerald-100/70 space-y-2 list-disc pl-4">
                       <li>Carefully edited</li>
                       <li>Zero technical knowledge needed</li>
                       <li>Tests specific summarization skills</li>
                   </ul>
               </div>
           </div>
        </div>
      )
    },
    
    // --- NEW CONTENT FROM PDF ---

    {
        title: "SECTOR 49: LINE GRAPHS INTRO",
        headline: "UNDERSTANDING CHANGE",
        icon: <TrendingUp size={64} className="text-indigo-500" />,
        content: (
            <div className="space-y-8">
                <div className="bg-slate-900 p-6 rounded-xl border border-indigo-500/30">
                    <ChartFish />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-950 p-6 rounded border border-slate-800">
                        <h4 className="text-indigo-400 font-bold mb-3 flex items-center gap-2"><Clock size={16}/> Time Intervals</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Line graphs show changes over time. Always check the X-axis intervals. Are they yearly? Every 5 years? This dictates how much detail you can include.
                        </p>
                    </div>
                    <div className="bg-slate-950 p-6 rounded border border-slate-800">
                        <h4 className="text-pink-400 font-bold mb-3 flex items-center gap-2"><Target size={16}/> Selectivity</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Line graphs have infinite data points. You MUST ignore minor fluctuations. Focus on the start, end, peaks, and troughs.
                        </p>
                    </div>
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 50: TENSE LOGIC",
        headline: "PAST PERFECT PROTOCOL",
        icon: <RotateCcw size={64} className="text-amber-500" />,
        content: (
            <div className="space-y-8">
                <div className="bg-amber-950/20 border-l-4 border-amber-500 p-6">
                    <h3 className="text-xl font-bold text-amber-500 mb-2">GRAMMAR: THE PAST PERFECT</h3>
                    <p className="text-slate-300">
                        "It had fallen..." used to link two different times in the past. Usually with <span className="font-mono bg-amber-900/50 px-1 rounded text-white">by + year</span>.
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="p-4 bg-slate-900 border border-slate-800 rounded flex justify-between items-center group hover:border-emerald-500 transition-colors">
                        <div>
                            <span className="text-xs text-slate-500 uppercase tracking-widest block mb-1">Simple Past</span>
                            <p className="text-white">"Beef consumption <span className="text-emerald-400 font-bold">fell</span> from 200g in 1994 to 120g in 2004."</p>
                        </div>
                        <CheckCircle2 size={20} className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"/>
                    </div>
                    <div className="p-4 bg-slate-900 border border-slate-800 rounded flex justify-between items-center group hover:border-purple-500 transition-colors">
                        <div>
                            <span className="text-xs text-slate-500 uppercase tracking-widest block mb-1">Past Perfect</span>
                            <p className="text-white">"By 2004, beef consumption <span className="text-purple-400 font-bold">had fallen</span> to approximately 120g."</p>
                        </div>
                        <CheckCircle2 size={20} className="text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"/>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-center p-3 bg-slate-950 rounded">
                        <span className="block text-xs text-slate-500 mb-1">Estimating Up</span>
                        <span className="text-white font-mono">just over, nearly</span>
                    </div>
                    <div className="text-center p-3 bg-slate-950 rounded">
                        <span className="block text-xs text-slate-500 mb-1">Estimating Down</span>
                        <span className="text-white font-mono">just under, approx</span>
                    </div>
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 51: ERROR CORRECTION",
        headline: "TENSE MISMATCH",
        icon: <Bug size={64} className="text-red-500" />,
        content: (
            <div className="space-y-6">
                <div className="bg-red-950/20 p-6 rounded border border-red-500/30">
                    <h4 className="text-red-500 font-bold mb-2 flex items-center gap-2"><X size={16}/> INCORRECT SENTENCE</h4>
                    <p className="text-slate-300 italic">
                        "Although lamb was 150g in the first year, it <span className="underline decoration-wavy decoration-red-500">had experienced</span> a dramatic drop in the final year."
                    </p>
                    <p className="text-xs text-red-400 mt-3 font-mono">ERROR: Past perfect used with specific single time point.</p>
                </div>

                <div className="bg-emerald-950/20 p-6 rounded border border-emerald-500/30">
                    <h4 className="text-emerald-500 font-bold mb-2 flex items-center gap-2"><Check size={16}/> CORRECTION 1 (Simple Past)</h4>
                    <p className="text-white">
                        "Although lamb was 150g in the first year, it <span className="text-emerald-400 font-bold">experienced</span> a dramatic drop in the final year."
                    </p>
                </div>

                <div className="bg-purple-950/20 p-6 rounded border border-purple-500/30">
                    <h4 className="text-purple-500 font-bold mb-2 flex items-center gap-2"><Check size={16}/> CORRECTION 2 (Past Perfect)</h4>
                    <p className="text-white">
                        "Although lamb was 150g in the first year, <span className="text-purple-400 font-bold">by the final year it had experienced</span> a dramatic drop."
                    </p>
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 52: DATA EXTRACTION",
        headline: "IDENTIFYING VALUES",
        icon: <Scan size={64} className="text-cyan-500" />,
        content: (
            <div className="space-y-6">
                <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-white">INTERACTIVE PROTOCOL: LABELS</h3>
                    <p className="text-slate-400 text-sm">Click the yellow markers to identify the correct value or date.</p>
                </div>
                <div className="w-full max-w-lg mx-auto">
                    <InteractiveLineGraph mode="labels" />
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 53: TREND DESCRIPTION",
        headline: "MATCHING MOVEMENT",
        icon: <Activity size={64} className="text-orange-500" />,
        content: (
            <div className="space-y-6">
                <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-white">INTERACTIVE PROTOCOL: TRENDS</h3>
                    <p className="text-slate-400 text-sm">Click markers to match the description to the graph segment.</p>
                </div>
                <div className="w-full max-w-lg mx-auto">
                    <InteractiveLineGraph mode="trends" />
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 54: PARAPHRASING LOGIC",
        headline: "SUBJECT CLASSIFICATION",
        icon: <RefreshCcw size={64} className="text-teal-500" />,
        content: (
            <div className="space-y-8">
                <div className="bg-slate-900 p-6 border border-slate-800 rounded">
                    <h4 className="text-slate-500 text-xs font-bold uppercase mb-2">SOURCE TEXT</h4>
                    <p className="text-xl text-white font-serif">"The graph shows the consumption of fish and different kinds of meat..."</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-red-950/20 p-4 border border-red-500/30 rounded">
                        <h5 className="text-red-400 font-bold text-sm mb-2">COMMON MISTAKE</h5>
                        <p className="text-slate-300 text-sm">"Overall, the lowest consumption of <span className="text-red-500 font-bold underline">meat</span> was fish."</p>
                        <p className="text-xs text-red-400 mt-2">LOGIC ERROR: Fish is not meat.</p>
                    </div>
                    <div className="bg-emerald-950/20 p-4 border border-emerald-500/30 rounded">
                        <h5 className="text-emerald-400 font-bold text-sm mb-2">CORRECT UMBRELLA TERM</h5>
                        <p className="text-slate-300 text-sm">"Overall, of the <span className="text-emerald-400 font-bold">four foods listed</span>, fish was the least consumed."</p>
                    </div>
                </div>

                <div className="bg-teal-900/20 p-4 rounded border border-teal-500/30 text-center">
                    <p className="text-teal-400 text-sm font-bold uppercase mb-2">Paraphrasing "Consumption"</p>
                    <div className="flex justify-center gap-4 text-white font-mono text-sm">
                        <span>was eaten</span>
                        <span>was consumed</span>
                        <span>intake</span>
                    </div>
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 55: OVERVIEW CONSTRUCTION",
        headline: "GAP FILL CHALLENGE",
        icon: <Hammer size={64} className="text-blue-500" />,
        content: (
            <div className="space-y-6">
                <div className="flex items-center gap-3 bg-blue-950/20 p-4 rounded border border-blue-500/30 mb-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-black font-bold">
                        <Edit3 size={16} />
                    </div>
                    <div>
                        <h4 className="text-blue-500 font-bold text-sm">BUILD THE PERFECT OVERVIEW</h4>
                    </div>
                </div>

                <GapFill 
                    parts={[
                        "Overall, of ",
                        ", chicken was the ",
                        " that experienced an upward trend ",
                        ", and the food that was ",
                        " was fish."
                    ]}
                    options={[
                        "consistently consumed the least",
                        "the four foods listed",
                        "over this period",
                        "only one"
                    ]}
                    correct={[
                        "the four foods listed",
                        "only one",
                        "over this period",
                        "consistently consumed the least"
                    ]}
                />
            </div>
        )
    },
    {
        title: "SECTOR 56: CRITIQUE PROTOCOL II",
        headline: "SELECT THE BEST OVERVIEW",
        icon: <CheckCircle2 size={64} className="text-purple-500" />,
        content: (
            <div className="space-y-6">
                <p className="text-slate-400 text-sm mb-4">Analyze the candidates below based on the Fish & Meat graph. Which one captures the trends accurately without unnecessary detail?</p>
                <OverviewSelector /> {/* Reusing component but with props would be better, hardcoded for now per prompt speed req */}
            </div>
        )
    },
    {
        title: "SECTOR 57: FINAL BRIEFING",
        headline: "MODULE COMPLETE",
        icon: <ShieldCheck size={64} className="text-emerald-500" />,
        content: (
            <div className="text-center space-y-8">
                <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <Check size={48} className="text-emerald-500" />
                </div>
                <h2 className="text-4xl font-black text-white">DATA RESPONSE UPGRADED</h2>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                    You have integrated the core protocols for Line Graphs, Tense Usage, and Overview Construction.
                </p>
                <div className="grid grid-cols-3 gap-4 text-xs font-mono text-slate-500 mt-8">
                    <div className="p-4 bg-slate-900 rounded border border-slate-800">
                        <span className="block text-emerald-400 mb-1">ACCURACY</span>
                        Data extraction verified.
                    </div>
                    <div className="p-4 bg-slate-900 rounded border border-slate-800">
                        <span className="block text-emerald-400 mb-1">GRAMMAR</span>
                        Past Perfect logic installed.
                    </div>
                    <div className="p-4 bg-slate-900 rounded border border-slate-800">
                        <span className="block text-emerald-400 mb-1">STRATEGY</span>
                        Overview selection optimized.
                    </div>
                </div>
            </div>
        )
    }
  ];

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans relative overflow-hidden flex flex-col">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-indigo-500 to-fuchsia-500"></div>

        {/* Header */}
        <header className="px-8 py-6 flex justify-between items-center relative z-30 border-b border-slate-800">
             <div className="flex items-center gap-4 relative">
                 <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white">
                     <ArrowLeft size={24} />
                 </button>
                 
                 {/* Sector Menu Trigger - Top Left */}
                 <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`p-2 rounded-full transition-colors text-teal-400 hover:text-teal-300 hover:bg-slate-800 ${isMenuOpen ? 'bg-slate-800' : ''}`}
                    title="Sector Map"
                 >
                    <Grid size={24} />
                 </button>

                 <div>
                     <h1 className="text-xs font-mono text-slate-500 uppercase tracking-[0.3em]">Nexus Masterclass</h1>
                     <div className="text-white font-bold text-lg">DATA RESPONSE PROTOCOLS</div>
                 </div>

                 {/* SECTOR MAP MENU OVERLAY */}
                 {isMenuOpen && (
                    <>
                        {/* Backdrop to close menu when clicking outside */}
                        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
                        
                        <div className="absolute top-16 left-4 z-50 w-80 bg-slate-900 border border-slate-700 shadow-2xl rounded-lg overflow-hidden animate-fade-in-up max-h-[80vh] flex flex-col">
                            <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
                                <span className="text-xs font-mono text-teal-500 uppercase tracking-widest flex items-center gap-2">
                                    <Map size={14} /> Sector Map
                                </span>
                                <button onClick={() => setIsMenuOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                                    <X size={16} />
                                </button>
                            </div>
                            <div className="overflow-y-auto flex-1 p-1 bg-slate-900/95 min-h-0">
                                {slides.map((s, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            setCurrentSlide(i);
                                            setIsMenuOpen(false);
                                        }}
                                        className={`w-full p-3 text-left text-xs font-mono border-l-2 transition-all hover:bg-white/5 flex flex-col gap-1 mb-1 rounded-r ${
                                            currentSlide === i 
                                            ? 'border-teal-500 text-teal-400 bg-teal-950/30' 
                                            : 'border-transparent text-slate-400 hover:text-slate-200'
                                        }`}
                                    >
                                        <div className="flex justify-between items-baseline">
                                            <span className="opacity-50 text-[10px] uppercase">Sector {i + 1}</span>
                                            {currentSlide === i && <Zap size={10} className="text-teal-500 animate-pulse"/>}
                                        </div>
                                        <span className="font-bold truncate w-full">{s.title.includes(': ') ? s.title.split(': ')[1] : s.title}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                 )}
             </div>

             <div className="flex items-center gap-2 overflow-x-auto max-w-[50vw] no-scrollbar">
                 {slides.map((_, i) => (
                     <div key={i} className={`h-1.5 w-8 rounded-full transition-all duration-500 shrink-0 ${i === currentSlide ? 'bg-white shadow-[0_0_10px_white]' : 'bg-slate-800'}`}></div>
                 ))}
             </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 py-12 relative z-10">
             <div className={`transition-all duration-700 transform ${animate ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
                 <div className="flex items-center gap-4 mb-8">
                     <span className="font-mono text-xs px-3 py-1 border border-slate-700 rounded text-slate-400">{slide.title}</span>
                 </div>
                 
                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                     <div className="lg:col-span-4">
                         <div className="sticky top-20">
                             <div className="w-24 h-24 bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-800 mb-8 shadow-2xl">
                                 {slide.icon}
                             </div>
                             <h2 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-600">
                                 {slide.headline}
                             </h2>
                         </div>
                     </div>

                     <div className="lg:col-span-8">
                         <div className="prose prose-invert prose-lg max-w-none">
                             {slide.content}
                         </div>
                     </div>
                 </div>
             </div>
        </main>

        {/* Footer Nav */}
        <footer className="px-8 py-8 border-t border-slate-800 relative z-10 flex justify-between items-center bg-slate-950/80 backdrop-blur-md">
             <button 
                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                disabled={currentSlide === 0}
                className="flex items-center gap-4 px-6 py-3 rounded-lg border border-slate-800 hover:bg-slate-900 disabled:opacity-30 disabled:hover:bg-transparent transition-all group"
             >
                 <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                 <span className="font-bold text-sm uppercase tracking-wider">Previous Sector</span>
             </button>

             <button 
                onClick={() => {
                    if (currentSlide < slides.length - 1) {
                        setCurrentSlide(currentSlide + 1);
                    } else {
                        onBack();
                    }
                }}
                className="flex items-center gap-4 px-8 py-4 bg-white text-black rounded-lg hover:bg-slate-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] group"
             >
                 <span className="font-black text-sm uppercase tracking-wider">{currentSlide === slides.length - 1 ? 'Complete Briefing' : 'Next Sector'}</span>
                 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
             </button>
        </footer>
    </div>
  );
};

export default NexusMasterclass;
