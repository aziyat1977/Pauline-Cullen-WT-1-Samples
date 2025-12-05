
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Zap, Target, BookOpen, AlertTriangle, ShieldCheck, PenTool, CheckCircle2, X, FileWarning, EyeOff, Link, Hammer, Layers, RefreshCcw, ListOrdered, Bug, GitMerge, Timer, Scan, Highlighter, Layout, Split, Move, Quote, Map, BarChart2, PieChart, Table, MousePointer2, Activity, Menu, Grid, RotateCcw, ChevronRight, Hash, TrendingUp, Search, Umbrella } from 'lucide-react';
import ChartDualView from '../features/ChartDualView';
import InteractiveMap from '../features/InteractiveMap';
import ChartHousing from '../features/ChartHousing';
import Chart3D from '../features/Chart3D';
import ChartCoffee from '../features/ChartCoffee';

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

const VocabTable = () => {
    const [inputs, setInputs] = useState<Record<string, string>>({});
    const answers: Record<string, string> = {
        'build': 'building',
        'construct': 'construction',
        'improve': 'improvement',
        'develop': 'development',
        'refurbish': 'refurbishment',
        'renovate': 'renovation',
        'redevelop': 'redevelopment'
    };

    const handleChange = (key: string, val: string) => {
        setInputs(prev => ({...prev, [key]: val}));
    };

    return (
        <div className="overflow-hidden rounded-lg border border-slate-700">
            <table className="w-full text-left text-sm text-slate-400">
                <thead className="bg-purple-900/20 text-purple-400 uppercase font-mono text-xs">
                    <tr>
                        <th className="px-4 py-3">Verb</th>
                        <th className="px-4 py-3">Noun (Input)</th>
                        <th className="px-4 py-3">Meaning</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                    {[
                        { v: 'to build', m: 'make something using materials such as bricks or wood etc.', k: 'build' },
                        { v: 'to construct', m: 'build something or put pieces together', k: 'construct' },
                        { v: 'to improve', m: 'make something better', k: 'improve' },
                        { v: 'to develop', m: 'change a place so that it becomes more advanced', k: 'develop' },
                        { v: 'to refurbish', m: 'make a building look new again by painting, repairing', k: 'refurbish' },
                        { v: 'to renovate', m: 'repair and improve something to make it \'new\' again', k: 'renovate' },
                        { v: 'to redevelop', m: 'change an area of a town by replacing old buildings', k: 'redevelop' }
                    ].map((row, i) => {
                        const isCorrect = inputs[row.k]?.toLowerCase().trim() === answers[row.k];
                        return (
                            <tr key={i}>
                                <td className="px-4 py-3 font-bold text-white">{row.v}</td>
                                <td className="px-4 py-3">
                                    <input 
                                        type="text" 
                                        className={`bg-slate-950 border px-2 py-1 rounded w-full transition-colors outline-none ${
                                            isCorrect 
                                            ? 'border-emerald-500 text-emerald-400 bg-emerald-950/20' 
                                            : 'border-slate-600 text-white focus:border-purple-500'
                                        }`}
                                        placeholder="..."
                                        onChange={(e) => handleChange(row.k, e.target.value)}
                                    />
                                </td>
                                <td className="px-4 py-3 text-xs italic">{row.m}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

const FlashcardDeck = () => {
    const cards = [
        { q: "to change an area of a town by replacing old buildings with new ones", a: "to redevelop" },
        { q: "noun form of 'to construct'", a: "construction" },
        { q: "two verbs that mean 'to make a building look new again by repairing, decorating etc.'", a: "1) to renovate 2) to refurbish" },
        { q: "noun form of 'to improve'", a: "improvement" },
        { q: "noun form of 'to build'", a: "building" },
        { q: "noun form of 'to develop'", a: "development" },
        { q: "to make something better", a: "to improve" },
        { q: "to change a (usually wild or untouched) place so that it becomes more advanced / habitable", a: "to develop" },
        { q: "noun form of 'to renovate'", a: "renovation" },
        { q: "noun form of 'to redevelop'", a: "redevelopment" },
        { q: "noun form of 'to refurbish'", a: "refurbishment" },
        { q: "two verbs that mean 'to make something using materials such as bricks or wood'", a: "1) build 2) construct" }
    ];

    const [index, setIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);

    const next = () => {
        setFlipped(false);
        setTimeout(() => setIndex((index + 1) % cards.length), 200);
    };

    return (
        <div className="w-full max-w-md mx-auto aspect-[4/3] perspective-1000 group cursor-pointer" onClick={() => setFlipped(!flipped)}>
            <div className={`relative w-full h-full transition-all duration-500 transform-style-3d ${flipped ? 'rotate-y-180' : ''}`}>
                {/* Front */}
                <div className="absolute inset-0 bg-purple-600 rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 text-center backface-hidden border-4 border-white/20">
                    <div className="absolute top-4 left-4 bg-white/20 px-2 py-1 rounded text-[10px] font-bold text-white">CARD {index + 1}/{cards.length}</div>
                    <p className="text-xl md:text-2xl font-bold text-white">{cards[index].q}</p>
                    <p className="mt-8 text-purple-200 text-sm font-mono animate-pulse">TAP TO FLIP</p>
                </div>
                {/* Back */}
                <div className="absolute inset-0 bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 text-center backface-hidden rotate-y-180">
                    <p className="text-2xl md:text-3xl font-black text-purple-600">{cards[index].a}</p>
                    <button 
                        onClick={(e) => { e.stopPropagation(); next(); }} 
                        className="mt-8 px-6 py-2 bg-purple-600 text-white rounded-full font-bold hover:bg-purple-700 transition-colors flex items-center gap-2"
                    >
                        Next Card <ChevronRight size={16}/>
                    </button>
                </div>
            </div>
        </div>
    )
}

const MatchingProtocol = ({ pairs }: { pairs: { label: string, icon: React.ReactNode }[] }) => {
    const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
    const [matches, setMatches] = useState<Record<number, number>>({});
    
    // Shuffle right side visually
    const [rightIndices] = useState(() => [...Array(pairs.length).keys()].sort(() => Math.random() - 0.5));

    const handleLeft = (i: number) => {
        if (matches[i] !== undefined) {
            const newMatches = {...matches};
            delete newMatches[i];
            setMatches(newMatches);
        }
        setSelectedLeft(i);
    };

    const handleRight = (originalIdx: number) => {
        if (selectedLeft !== null) {
            setMatches(prev => ({ ...prev, [selectedLeft]: originalIdx }));
            setSelectedLeft(null);
        }
    };

    const isComplete = Object.keys(matches).length === pairs.length;
    const isCorrect = isComplete && Object.entries(matches).every(([k, v]) => parseInt(k) === v);

    return (
        <div className="flex gap-8 justify-between relative">
            {isCorrect && (
                <div className="absolute inset-0 bg-emerald-900/20 z-10 flex items-center justify-center backdrop-blur-[1px] animate-fade-in">
                    <div className="bg-emerald-500 text-black px-6 py-3 rounded-full font-black text-xl shadow-[0_0_50px_rgba(16,185,129,0.5)]">
                        SYSTEM SYNCHRONIZED
                    </div>
                </div>
            )}
            <div className="space-y-4 flex-1">
                {pairs.map((p, i) => (
                    <button 
                        key={i}
                        onClick={() => handleLeft(i)}
                        className={`w-full p-4 rounded border text-left transition-all ${
                            matches[i] !== undefined 
                            ? (isCorrect ? 'border-emerald-500 bg-emerald-950/30 text-emerald-400' : 'border-indigo-500 bg-indigo-950/30 text-indigo-300')
                            : (selectedLeft === i ? 'border-amber-400 bg-amber-950/30 text-amber-200' : 'border-slate-700 bg-slate-800/50 hover:border-slate-500')
                        }`}
                    >
                        <span className="font-mono text-xs uppercase tracking-widest block mb-1 opacity-50">Signal {i+1}</span>
                        {p.label}
                    </button>
                ))}
            </div>
            <div className="space-y-4 flex-1">
                {rightIndices.map((originalIdx) => {
                    const matchedKey = Object.keys(matches).find(k => matches[parseInt(k)] === originalIdx);
                    return (
                        <button
                            key={originalIdx}
                            onClick={() => handleRight(originalIdx)}
                            className={`w-full h-[82px] rounded border flex items-center justify-center transition-all ${
                                matchedKey 
                                ? (isCorrect ? 'border-emerald-500 bg-emerald-950/30' : 'border-indigo-500 bg-indigo-950/30') 
                                : 'border-slate-700 bg-slate-800/50 hover:border-slate-500'
                            }`}
                        >
                            {pairs[originalIdx].icon}
                        </button>
                    )
                })}
            </div>
        </div>
    );
};

const ClauseAnalysis = ({ sentences, correctTypes }: { sentences: string[], correctTypes: number[] }) => {
    const [answers, setAnswers] = useState<number[]>(new Array(sentences.length).fill(-1));
    
    const options = ["Essential (Cannot omit)", "Non-essential (Can omit)", "Reduced"];

    return (
        <div className="space-y-4">
            {sentences.map((s, idx) => (
                <div key={idx} className="bg-slate-900 p-4 rounded border border-slate-800">
                    <p className="text-white mb-3 font-serif italic">"{s}"</p>
                    <div className="flex gap-2">
                        {options.map((opt, optIdx) => (
                            <button
                                key={optIdx}
                                onClick={() => {
                                    const newAns = [...answers];
                                    newAns[idx] = optIdx;
                                    setAnswers(newAns);
                                }}
                                className={`flex-1 py-2 px-2 text-[10px] uppercase font-bold rounded border transition-colors ${
                                    answers[idx] === optIdx
                                        ? (optIdx === correctTypes[idx] ? 'bg-emerald-500 border-emerald-500 text-black' : 'bg-red-500 border-red-500 text-white')
                                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                                }`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
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
        { text: "Sales increased most in the UK and Switzerland.", correct: false, feedback: "Incomplete. Only mentions highs." },
        { text: "Sales of coffee saw a rising trend, bananas opposite.", correct: false, feedback: "Inaccurate. Bananas rose in some places." },
        { text: "Sales increased in every country... UK and Switzerland had biggest sales at €20m and €47m...", correct: false, feedback: "Too much detail. An overview should not have specific data points." },
        { text: "Sales of coffee increased in all five, while there was mixed success for bananas.", correct: true, feedback: "Perfect. Clear trend summary, no specific numbers." },
        { text: "Sales increased in these countries... The former had the biggest sales...", correct: false, feedback: "Unclear referencing. 'These countries' is vague." },
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
    // ... (Existing slides preserved)
    {
        title: "SECTOR 35: THE OVERVIEW PROTOCOL",
        headline: "TASK ACHIEVEMENT",
        icon: <TrendingUp size={64} className="text-amber-500" />,
        content: (
            <div className="space-y-8">
                <div className="bg-amber-950/20 border-l-4 border-amber-500 p-8">
                    <h3 className="text-3xl font-black text-amber-500 mb-4">THE CRITICAL 25%</h3>
                    <p className="text-xl text-slate-300 leading-relaxed">
                        "You cannot achieve Band 6 if you do not include an overview. You cannot achieve Band 7 unless your overview is clear."
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {[
                        { band: 5, text: "Recounts detail mechanically with NO clear overview.", color: "text-red-500", border: "border-red-500" },
                        { band: 6, text: "Presents an overview with information appropriately selected.", color: "text-yellow-500", border: "border-yellow-500" },
                        { band: 7, text: "Presents a clear overview of main trends, differences or stages.", color: "text-emerald-500", border: "border-emerald-500" },
                    ].map((item, i) => (
                        <div key={i} className={`p-4 bg-slate-900 border-l-4 ${item.border} flex items-center justify-between`}>
                            <span className={`font-black text-2xl ${item.color}`}>BAND {item.band}</span>
                            <span className="text-slate-300 text-sm text-right">{item.text}</span>
                        </div>
                    ))}
                </div>
                
                <div className="bg-slate-900 p-4 border border-slate-800 rounded text-center">
                    <p className="text-xs font-mono text-slate-500 uppercase">OBJECTIVE</p>
                    <p className="text-white font-bold">Present, Highlight, and Illustrate Key Features.</p>
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 36: OVERVIEW FUNCTION",
        headline: "GENERALITY",
        icon: <Search size={64} className="text-blue-500" />,
        content: (
            <div className="space-y-8">
                <div className="flex items-start gap-6">
                    <div className="bg-white text-black p-6 rounded-lg shadow-xl max-w-sm rotate-[-2deg]">
                        <h4 className="font-serif text-2xl font-bold mb-2">overview</h4>
                        <p className="text-sm italic mb-2">noun [C]</p>
                        <p className="text-lg leading-snug">"a short description of something that provides <span className="bg-yellow-200 px-1">general information</span> about it, but <span className="font-bold">no details</span>"</p>
                    </div>
                    <div className="flex-1 space-y-4">
                        <p className="text-xl text-slate-300">
                            The most common error is including too much detail. An overview is a summary of the <span className="text-blue-400 font-bold">Main Trends</span>.
                        </p>
                        <div className="bg-blue-900/30 border border-blue-500/50 p-4 rounded">
                            <p className="text-blue-300 text-sm font-mono uppercase mb-2">SIGNAL WORD</p>
                            <p className="text-2xl text-white font-black">"Overall,"</p>
                            <p className="text-slate-400 text-sm mt-1">Start your paragraph with this word. It signals to the examiner exactly what you are doing.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-900 p-4 border-l-2 border-emerald-500">
                        <h5 className="text-emerald-400 text-xs font-bold uppercase mb-2">Trend Vocabulary</h5>
                        <ul className="space-y-1 text-slate-300 text-sm">
                            <li>• A rising trend</li>
                            <li>• A falling trend</li>
                            <li>• An upward / downward trend</li>
                        </ul>
                    </div>
                    <div className="bg-slate-900 p-4 border-l-2 border-amber-500">
                        <h5 className="text-amber-400 text-xs font-bold uppercase mb-2">Verb Collocations</h5>
                        <ul className="space-y-1 text-slate-300 text-sm">
                            <li>• Experience a trend</li>
                            <li>• See a trend</li>
                            <li>• Witness a trend</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 37: UMBRELLA TERMS",
        headline: "AVOIDING DETAIL",
        icon: <Umbrella size={64} className="text-purple-500" />,
        content: (
            <div className="space-y-8">
                <p className="text-xl text-slate-300 font-light">
                    How do you describe multiple items without listing them? You use <span className="text-purple-400 font-bold">Umbrella Terms</span>.
                </p>

                <div className="grid grid-cols-2 gap-8">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-purple-500/20 rounded-t-full blur-xl group-hover:bg-purple-500/30 transition-colors"></div>
                        <div className="relative border-t-8 border-purple-500 rounded-t-full h-32 flex items-center justify-center bg-slate-900">
                            <span className="text-2xl font-black text-white">COUNTRIES</span>
                        </div>
                        <div className="w-2 h-12 bg-slate-700 mx-auto rounded-b"></div>
                        <div className="flex justify-center gap-2 mt-4">
                            <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400">UK</span>
                            <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400">Vietnam</span>
                            <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400">Sweden</span>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-0 bg-teal-500/20 rounded-t-full blur-xl group-hover:bg-teal-500/30 transition-colors"></div>
                        <div className="relative border-t-8 border-teal-500 rounded-t-full h-32 flex items-center justify-center bg-slate-900">
                            <span className="text-2xl font-black text-white">PRODUCTS</span>
                        </div>
                        <div className="w-2 h-12 bg-slate-700 mx-auto rounded-b"></div>
                        <div className="flex justify-center gap-2 mt-4">
                            <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400">Coffee</span>
                            <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400">Books</span>
                            <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400">TVs</span>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 p-6 border border-slate-800 rounded">
                    <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">EXAMPLE</h4>
                    <p className="text-lg text-white">
                        "Sales of <span className="text-purple-400">one product</span> rose continually, while <span className="text-teal-400">the other</span> experienced the opposite trend."
                    </p>
                    <p className="text-xs text-slate-500 mt-2">Note: No specific product names (Bananas/Coffee) mentioned.</p>
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 38: CATEGORIZATION DRILL",
        headline: "UMBRELLA MATCHING",
        icon: <Grid size={64} className="text-emerald-500" />,
        content: (
            <div className="space-y-6">
                <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white">REVEAL THE UMBRELLA</h3>
                    <p className="text-slate-400 text-sm">Click to identify the collective term for each group.</p>
                </div>
                <UmbrellaDrill />
            </div>
        )
    },
    {
        title: "SECTOR 39: THE TREND MATRIX",
        headline: "IDENTIFYING PATTERNS",
        icon: <TrendingUp size={64} className="text-cyan-500" />,
        content: (
            <div className="space-y-8">
                <p className="text-xl text-slate-300">
                    An overview can be unclear if it only mentions <span className="text-red-500 line-through">one trend</span> (e.g., just the highest figure). You must capture the whole picture.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-slate-900 p-6 border border-slate-800">
                        <h4 className="text-xs font-bold text-red-500 uppercase mb-2">Unclear Overview</h4>
                        <p className="text-slate-400 italic">"Harry Potter is a best-selling book about a boy called Harry Potter."</p>
                        <p className="text-xs text-slate-500 mt-2">Too specific / circular.</p>
                    </div>
                    <div className="bg-slate-900 p-6 border border-slate-800">
                        <h4 className="text-xs font-bold text-emerald-500 uppercase mb-2">Clear Overview</h4>
                        <p className="text-white italic">"Harry Potter is a book about a young wizard and his friends who attend a magical school."</p>
                        <p className="text-xs text-slate-500 mt-2">Summarizes the core concept.</p>
                    </div>
                </div>

                <div className="bg-cyan-950/20 p-6 border-l-4 border-cyan-500">
                    <h4 className="text-cyan-400 font-bold mb-2">Common Language Problems</h4>
                    <ul className="space-y-2 text-sm text-slate-300">
                        <li>1. <span className="font-bold text-white">Inaccurate Adjectives:</span> Don't say "plummeted" if it just fell slightly.</li>
                        <li>2. <span className="font-bold text-white">Personal Comment:</span> Never use words like "worrying" or "exciting".</li>
                        <li>3. <span className="font-bold text-white">Vague Referencing:</span> Be clear about WHO experienced the trend.</li>
                    </ul>
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 40: PATTERN RECOGNITION",
        headline: "MATCH OVERVIEW TO CHART",
        icon: <Activity size={64} className="text-indigo-500" />,
        content: (
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2 text-center">
                        <MiniTrendChart type="one" />
                        <div className="text-[10px] bg-slate-900 p-2 text-slate-400">
                            "Only one country experienced a clear rising trend... others varied between stability and falling."
                        </div>
                    </div>
                    <div className="space-y-2 text-center">
                        <MiniTrendChart type="two" />
                        <div className="text-[10px] bg-slate-900 p-2 text-slate-400">
                            "Clear rising trend in only two countries, which also experienced considerable fluctuations."
                        </div>
                    </div>
                    <div className="space-y-2 text-center">
                        <MiniTrendChart type="all" />
                        <div className="text-[10px] bg-slate-900 p-2 text-slate-400">
                            "Although all countries saw a rising trend, sales remained relatively low in several."
                        </div>
                    </div>
                </div>
                <div className="text-center text-sm text-slate-500 italic">
                    Identify the visual pattern that matches the description.
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 41: CRITIQUE PROTOCOL",
        headline: "IDENTIFY THE BEST OVERVIEW",
        icon: <Target size={64} className="text-rose-500" />,
        content: (
            <div className="space-y-6">
                <div className="bg-slate-900 p-4 border border-slate-800 text-center">
                    <p className="text-slate-400 text-sm">Context: Coffee Sales (All Up) & Banana Sales (Mixed)</p>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4">SELECT THE BAND 7+ RESPONSE</h3>
                <OverviewSelector />
                
                <div className="mt-6 p-4 bg-slate-950 rounded text-xs text-slate-500 font-mono">
                    <p>CRITERIA:</p>
                    <ul className="list-disc pl-4 mt-2 space-y-1">
                        <li>Must cover MAIN trends (Coffee up, Bananas mixed).</li>
                        <li>Must NOT contain specific figures (No €20m).</li>
                        <li>Must use clear referencing.</li>
                    </ul>
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
