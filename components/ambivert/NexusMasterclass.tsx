
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Zap, Target, BookOpen, AlertTriangle, ShieldCheck, PenTool, CheckCircle2, X, FileWarning, EyeOff, Link, Hammer, Layers, RefreshCcw, ListOrdered, Bug, GitMerge, Timer, Scan, Highlighter, Layout, Split, Move, Quote, Map, BarChart2, PieChart, Table, MousePointer2, Activity, Menu, Grid, RotateCcw, ChevronRight } from 'lucide-react';
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
    {
        title: "SECTOR 2: MISSION PARAMETERS",
        headline: "TASK ACHIEVEMENT",
        icon: <Target size={64} className="text-amber-500" />,
        content: (
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1">
                        <h3 className="text-4xl font-black text-white mb-6">THE GOLDEN RULE</h3>
                        <p className="text-2xl text-slate-400 font-light leading-relaxed">
                            "Summarise the information by <span className="text-amber-400 font-bold border-b-2 border-amber-400">selecting</span> and <span className="text-amber-400 font-bold border-b-2 border-amber-400">reporting</span> the main features, and make <span className="text-amber-400 font-bold border-b-2 border-amber-400">comparisons</span> where relevant."
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                     <div className="bg-slate-900 border border-red-900 p-6 flex flex-col items-center text-center">
                         <div className="text-red-500 font-black text-6xl mb-2">Band 6</div>
                         <div className="text-red-400 font-mono text-xs uppercase mb-4">The Robot Approach</div>
                         <p className="text-slate-400">"List all information you can see."</p>
                         <p className="text-xs text-red-500 mt-2">RESULT: Mechanical Recount</p>
                     </div>
                     <div className="bg-slate-900 border border-amber-500 p-6 flex flex-col items-center text-center shadow-[0_0_30px_rgba(245,158,11,0.1)]">
                         <div className="text-amber-500 font-black text-6xl mb-2">Band 7+</div>
                         <div className="text-amber-400 font-mono text-xs uppercase mb-4">The Analyst Approach</div>
                         <p className="text-white">"Select features. Highlight trends. Compare."</p>
                         <p className="text-xs text-amber-500 mt-2">RESULT: Clear Overview</p>
                     </div>
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 3: DATA PURITY",
        headline: "OPINION INJECTION",
        icon: <EyeOff size={64} className="text-rose-500" />,
        content: (
            <div className="space-y-8">
                <p className="text-2xl font-light text-slate-300">
                    Irrelevant details occur when you explain <span className="text-rose-400 font-bold">WHY</span> the data happened or give a personal opinion. 
                    <br/>If it is not in the chart, <span className="border-b border-rose-500 text-white">it does not exist.</span>
                </p>

                <div className="space-y-4">
                    <div className="bg-slate-900 p-6 border-l-4 border-red-500 flex flex-col group hover:bg-red-950/10 transition-colors">
                        <div className="text-xs font-mono text-red-500 mb-2 flex items-center gap-2"><X size={12}/> BAND 6 ERROR: COMMENTARY</div>
                        <p className="text-lg text-slate-300 group-hover:text-white transition-colors italic">
                            "The chart shows people eat more, so they have higher diabetes risk. <span className="text-red-400 font-bold">This suggests people should eat less.</span>"
                        </p>
                        <p className="text-xs text-slate-500 mt-2">DIAGNOSIS: The chart is about food, not medical advice. Irrelevant.</p>
                    </div>

                    <div className="bg-slate-900 p-6 border-l-4 border-red-500 flex flex-col group hover:bg-red-950/10 transition-colors">
                        <div className="text-xs font-mono text-red-500 mb-2 flex items-center gap-2"><X size={12}/> BAND 6 ERROR: JUDGEMENT</div>
                        <p className="text-lg text-slate-300 group-hover:text-white transition-colors italic">
                            "Energy use decreased in 2014, <span className="text-red-400 font-bold">which is good because it shows people are saving electricity.</span>"
                        </p>
                        <p className="text-xs text-slate-500 mt-2">DIAGNOSIS: "Good" is a personal opinion. Stick to the numbers.</p>
                    </div>
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 4: STRUCTURAL INTEGRITY",
        headline: "THE CONCLUSION PHANTOM",
        icon: <FileWarning size={64} className="text-orange-500" />,
        content: (
            <div className="space-y-8">
                <div className="bg-orange-950/20 border border-orange-500/30 p-8 rounded-lg">
                    <h3 className="text-3xl font-black text-orange-500 mb-4">"WHERE IS THE CONCLUSION?"</h3>
                    <p className="text-xl text-slate-300 leading-relaxed">
                        Task 1 is a <span className="text-white font-bold">Summary</span>, not an essay. A summary does not need a conclusion.
                        <br/>Including one often leads to Band 6 errors (repetition or opinion).
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-4">
                         <div className="flex items-center gap-3 text-red-400 font-bold uppercase text-sm border-b border-red-900 pb-2">
                             <X size={16} /> Task 2 (Essay)
                         </div>
                         <p className="text-slate-400 text-sm">Requires a <span className="text-red-400">Conclusion</span> to sum up your arguments and state your final position.</p>
                     </div>
                     <div className="space-y-4">
                         <div className="flex items-center gap-3 text-emerald-400 font-bold uppercase text-sm border-b border-emerald-900 pb-2">
                             <CheckCircle2 size={16} /> Task 1 (Report)
                         </div>
                         <p className="text-slate-400 text-sm">Requires an <span className="text-emerald-400">Overview</span> to summarize the trends. Can be placed after the Intro or at the end.</p>
                     </div>
                </div>
                
                <div className="bg-slate-900 p-4 text-center border border-slate-800 rounded">
                    <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">NEXUS RECOMMENDATION</p>
                    <p className="text-lg text-white font-bold">Write your Overview immediately after the Introduction.</p>
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 5: DATA HIERARCHY",
        headline: "THE 'EASY' MYTH",
        icon: <Zap size={64} className="text-indigo-500" />,
        content: (
            <div className="space-y-12">
                 <div className="bg-indigo-950/30 p-8 border-l-4 border-indigo-500">
                    <h3 className="text-3xl font-black text-indigo-400 mb-4">"I'M NOT WORRIED ABOUT TASK 1."</h3>
                    <p className="text-xl text-slate-300">
                        Writing Task 1 is shorter (150 words), but density is higher. You are writing a technical report, similar to a <span className="text-indigo-300 font-bold">Scientific Results Section</span>.
                    </p>
                 </div>

                 <div className="relative h-64 w-full bg-slate-900 border border-slate-800 rounded-lg overflow-hidden flex items-end justify-center pb-8 gap-12">
                      <div className="flex flex-col items-center gap-2 group">
                          <div className="w-32 h-40 bg-slate-800 group-hover:bg-slate-700 transition-colors flex items-center justify-center relative clip-triangle">
                              <span className="text-4xl font-black text-slate-600 group-hover:text-slate-500">A</span>
                          </div>
                          <span className="font-mono text-xs text-slate-500">MOUNTAIN A (LARGE)</span>
                      </div>

                      <div className="flex flex-col items-center gap-2 group">
                          <div className="w-16 h-24 bg-indigo-600 flex items-center justify-center relative shadow-[0_0_20px_rgba(79,70,229,0.5)]">
                              <span className="text-2xl font-black text-white">B</span>
                          </div>
                          <span className="font-mono text-xs text-indigo-400 font-bold">MOUNTAIN B (STEEP)</span>
                      </div>
                      
                      <div className="absolute top-4 right-4 max-w-xs text-right">
                          <p className="text-sm text-slate-400 font-mono">
                              Mountain B is smaller, but climbing it is technically harder. 
                              <br/><span className="text-indigo-400">Do not underestimate the density of Task 1.</span>
                          </p>
                      </div>
                 </div>
            </div>
        )
    },
    {
        title: "SECTOR 6: LOGIC FLOW",
        headline: "COHERENCE ≠ CONNECTORS",
        icon: <Link size={64} className="text-cyan-500" />,
        content: (
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                     <div>
                        <h3 className="text-2xl font-black text-white mb-4">THE SCREWDRIVER ANALOGY</h3>
                        <p className="text-lg text-slate-300 leading-relaxed font-light">
                            A screwdriver is a useful tool. But if you try to use it to hammer in a nail, it is <span className="text-cyan-400 font-bold">ineffective</span>.
                            <br/><br/>
                            Memorizing lists of linking words (Connectors) without knowing how to use them leads to "Mechanical" writing (Band 6).
                        </p>
                     </div>
                     <div className="flex justify-center">
                         <Hammer size={120} className="text-slate-800 drop-shadow-[0_0_10px_rgba(34,211,238,0.2)]" />
                     </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
                    <h4 className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-4">CRITERIA CHECK: PARAGRAPHING</h4>
                    <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-2 mb-2">
                        <span className="text-slate-500">BAND 6</span>
                        <span className="text-slate-300">"Arranges information... but paragraphing may not always be logical."</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-cyan-400 font-bold">BAND 7</span>
                        <span className="text-white">"Logically organises information and ideas."</span>
                    </div>
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 7: COHESION LAYERS",
        headline: "WITHIN VS BETWEEN",
        icon: <Layers size={64} className="text-fuchsia-500" />,
        content: (
            <div className="space-y-8">
                <p className="text-xl text-slate-300 font-light">
                   Learning lists of cohesive devices emphasizes the <span className="text-white font-bold">beginning</span> of sentences. However, cohesion lives <span className="text-fuchsia-400 font-bold">within</span> sentences too.
                </p>

                <div className="bg-slate-900 border border-slate-800 p-8 rounded-lg relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-fuchsia-500"></div>
                    <p className="text-2xl text-white font-serif italic mb-6">
                        "This is like picking up any tool you can find without thinking about how to use <span className="text-fuchsia-400 font-bold border-b border-fuchsia-400">it</span>."
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-black/30 p-4 rounded">
                            <h4 className="text-fuchsia-400 font-bold text-xs uppercase mb-2">Target 1: 'IT'</h4>
                            <p className="text-slate-400 text-sm">Refers to 'a tool'. This is cohesion <span className="text-white font-bold">WITHIN</span> the sentence.</p>
                        </div>
                        <div className="bg-black/30 p-4 rounded">
                            <h4 className="text-blue-400 font-bold text-xs uppercase mb-2">Target 2: 'THIS'</h4>
                            <p className="text-slate-400 text-sm">Refers to the previous situation. This is cohesion <span className="text-white font-bold">BETWEEN</span> sentences.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 8: PROGRESSION FAILURE",
        headline: "THE LIST VIRUS",
        icon: <ListOrdered size={64} className="text-emerald-500" />,
        content: (
            <div className="space-y-8">
                 <div className="bg-emerald-950/20 border-l-4 border-emerald-500 p-8">
                    <h3 className="text-2xl font-black text-emerald-500 mb-4">SYMPTOM: THE ROBOT LIST</h3>
                    <p className="text-lg text-slate-300">
                        "Chicken consumption stood at X... Beef recorded Y... Lamb was Z... Fish was A..."
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-red-400 text-xs font-mono uppercase bg-red-950/30 w-fit px-2 py-1">
                        <AlertTriangle size={12} /> BAND 5: NO CLEAR PROGRESSION
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                          <h4 className="text-slate-500 font-bold mb-2">The Problem</h4>
                          <p className="text-slate-400 text-sm leading-relaxed">
                              Every sentence follows the same pattern. The writer presents categories one by one. It is impossible to form a mental picture of the chart.
                          </p>
                      </div>
                      <div>
                          <h4 className="text-emerald-400 font-bold mb-2">The Cure</h4>
                          <p className="text-slate-400 text-sm leading-relaxed">
                              Group data by <span className="text-white">Trend</span>, not just Category. Discuss rising trends together, then falling trends. Weave the data; don't just list it.
                          </p>
                      </div>
                 </div>
            </div>
        )
    },
    {
        title: "SECTOR 9: REPETITION PROTOCOLS",
        headline: "SUBSTITUTION MATRIX",
        icon: <RefreshCcw size={64} className="text-purple-500" />,
        content: (
            <div className="space-y-8">
                <p className="text-xl text-slate-300">
                    Repetition kills your score. You must use <span className="text-purple-400 font-bold">Referencing</span> and <span className="text-purple-400 font-bold">Substitution</span>.
                </p>

                <div className="space-y-4">
                    <div className="p-4 bg-red-950/20 border border-red-900/50 rounded flex gap-4 opacity-70">
                        <X className="text-red-500 shrink-0 mt-1" />
                        <div>
                             <p className="text-slate-400 text-sm font-mono mb-1">REPETITIVE (BAD)</p>
                             <p className="text-slate-300 italic">"Beef consumption was high. Beef consumption grew slightly. Then beef consumption declined."</p>
                        </div>
                    </div>

                    <div className="p-4 bg-purple-950/20 border border-purple-500/50 rounded flex gap-4">
                        <CheckCircle2 className="text-purple-500 shrink-0 mt-1" />
                        <div>
                             <p className="text-purple-400 text-sm font-mono mb-1">SUBSTITUTED (GOOD)</p>
                             <p className="text-white italic">
                                 "Beef consumption was high. <span className="text-purple-400 font-bold">It</span> grew slightly, before <span className="text-purple-400 font-bold">this figure</span> declined."
                             </p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 p-4 rounded text-center">
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">SUBSTITUTION TOOLS</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {["It", "This", "That amount", "The figure", "The former", "The latter", "Such data"].map((word, i) => (
                            <span key={i} className="px-3 py-1 bg-slate-800 text-purple-300 rounded-full text-xs border border-purple-900/50">{word}</span>
                        ))}
                    </div>
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 10: SYNTAX DEBUGGING",
        headline: "COMMON TRAPS",
        icon: <Bug size={64} className="text-yellow-500" />,
        content: (
            <div className="space-y-6">
                 <div className="grid grid-cols-1 gap-4">
                     {/* Error 1 */}
                     <div className="bg-slate-900 p-4 border-l-4 border-red-500 flex flex-col md:flex-row gap-4 items-start md:items-center">
                         <div className="bg-red-950/30 text-red-500 px-2 py-1 text-[10px] font-bold uppercase tracking-widest shrink-0">Double Contrast</div>
                         <div className="flex-1">
                             <p className="text-slate-400 line-through decoration-red-500">"Although the figure rose, <span className="text-red-500 font-bold">but</span> it fell later."</p>
                             <p className="text-yellow-400 mt-1">"Although the figure rose, it fell later."</p>
                         </div>
                     </div>

                     {/* Error 2 */}
                     <div className="bg-slate-900 p-4 border-l-4 border-red-500 flex flex-col md:flex-row gap-4 items-start md:items-center">
                         <div className="bg-red-950/30 text-red-500 px-2 py-1 text-[10px] font-bold uppercase tracking-widest shrink-0">Relative Clause</div>
                         <div className="flex-1">
                             <p className="text-slate-400 line-through decoration-red-500">"Lamb which was consumed at 150g..."</p>
                             <p className="text-yellow-400 mt-1">"Lamb<span className="text-white font-bold">,</span> which was consumed at 150g<span className="text-white font-bold">,</span>..."</p>
                         </div>
                     </div>

                     {/* Error 3 */}
                     <div className="bg-slate-900 p-4 border-l-4 border-red-500 flex flex-col md:flex-row gap-4 items-start md:items-center">
                         <div className="bg-red-950/30 text-red-500 px-2 py-1 text-[10px] font-bold uppercase tracking-widest shrink-0">Timing Error</div>
                         <div className="flex-1">
                             <p className="text-slate-400">Using <span className="text-red-500 font-bold">"Meanwhile"</span> incorrectly.</p>
                             <p className="text-yellow-400 mt-1">"Meanwhile" implies two things happening at the exact same time. Use "In contrast" for general comparison.</p>
                         </div>
                     </div>
                 </div>
            </div>
        )
    },
    {
        title: "SECTOR 11: DEVICE INVENTORY",
        headline: "FULL ARSENAL",
        icon: <GitMerge size={64} className="text-blue-500" />,
        content: (
            <div className="space-y-8">
                <p className="text-xl text-slate-300 font-light">
                    Do not rely solely on Linking Words. A Band 7+ writer uses the full spectrum of cohesive devices.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                     {[
                         { type: "Linking Words", ex: "However, Therefore", color: "text-blue-400" },
                         { type: "Pronouns", ex: "It, This, They", color: "text-emerald-400" },
                         { type: "Relative Pronouns", ex: "Which, Where", color: "text-purple-400" },
                         { type: "Conjunctions", ex: "And, But, Or", color: "text-amber-400" },
                         { type: "Substitution", ex: "The former, Such figures", color: "text-rose-400" },
                     ].map((item, i) => (
                         <div key={i} className="bg-slate-900 p-4 border border-slate-800 rounded hover:border-slate-600 transition-colors">
                             <h4 className={`font-bold text-xs uppercase mb-2 ${item.color}`}>{item.type}</h4>
                             <p className="text-white text-sm">{item.ex}</p>
                         </div>
                     ))}
                </div>

                <div className="bg-blue-950/20 p-6 border border-blue-500/30 rounded text-center">
                    <h3 className="text-white font-bold mb-2">KEY IDEA</h3>
                    <p className="text-slate-400 italic">"It is not a good idea to learn lists of cohesive devices without thinking of their meaning."</p>
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 12: TACTICAL SUMMARY",
        headline: "PROTOCOL CHECKLIST",
        icon: <ShieldCheck size={64} className="text-teal-500" />,
        content: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-6">
                     <h3 className="font-mono text-teal-500 text-sm uppercase tracking-widest border-b border-teal-900 pb-2">Do: Band 7+</h3>
                     <ul className="space-y-4">
                         {["Select the main features", "Highlight key features", "Make comparisons (where relevant)", "Present a clear overview", "Use substitution to avoid repetition", "Vary cohesive devices"].map((item, i) => (
                             <li key={i} className="flex items-center gap-4 text-white text-lg">
                                 <CheckCircle2 size={24} className="text-teal-500 shrink-0" /> {item}
                             </li>
                         ))}
                     </ul>
                 </div>

                 <div className="space-y-6">
                     <h3 className="font-mono text-red-500 text-sm uppercase tracking-widest border-b border-red-900 pb-2">Don't: Band 6 Trap</h3>
                     <ul className="space-y-4">
                         {["Write a Conclusion", "Give Opinions/Reasons", "Use 'Spoken' Connectors", "List every number", "Start every sentence with a Linker", "Follow a 'Robot List' structure"].map((item, i) => (
                             <li key={i} className="flex items-center gap-4 text-slate-400 text-lg">
                                 <X size={24} className="text-red-500 shrink-0" /> {item}
                             </li>
                         ))}
                     </ul>
                 </div>
            </div>
        )
    },
    {
        title: "SECTOR 13: PRE-FLIGHT CHECK",
        headline: "THE RUSH PROTOCOL",
        icon: <Timer size={64} className="text-rose-600" />,
        content: (
            <div className="space-y-8">
                <div className="bg-rose-950/20 border-l-4 border-rose-600 p-8">
                    <h3 className="text-3xl font-black text-rose-500 mb-4">HASTE = FAILURE</h3>
                    <p className="text-xl text-slate-300 leading-relaxed">
                        If you do not manage your time well, you risk misunderstanding the data. A Band 3 is awarded if the task has been <span className="text-white font-bold border-b border-rose-500">completely misunderstood</span>.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="bg-slate-900 border border-slate-800 p-6 flex flex-col gap-4">
                         <div className="text-xs font-mono text-rose-500 uppercase flex items-center gap-2"><AlertTriangle size={12}/> CASE STUDY: BALLOON FLIGHT</div>
                         <p className="text-slate-400 text-sm italic">
                             "Using 1 candle was shown to be <span className="text-rose-500 font-bold">better</span> than using 2 or 3."
                         </p>
                         <p className="text-xs text-slate-500 border-t border-slate-800 pt-2">
                             DIAGNOSIS: The chart measures <span className="text-white">time (seconds)</span> to reach a height. Lower bar = Faster. "Better" is vague. The user misinterpreted the axis.
                         </p>
                     </div>
                     <div className="bg-slate-900 border border-emerald-900/50 p-6 flex flex-col gap-4">
                         <div className="text-xs font-mono text-emerald-500 uppercase flex items-center gap-2"><CheckCircle2 size={12}/> CORRECTION</div>
                         <p className="text-slate-300 text-sm">
                             "When one candle was used, the balloon took <span className="text-emerald-400 font-bold">longer</span> to reach the height (14-15s), whereas flights with 3 candles were <span className="text-emerald-400 font-bold">faster</span> (10s)."
                         </p>
                         <p className="text-xs text-slate-500 border-t border-slate-800 pt-2">
                             RESULT: Accurate data reporting.
                         </p>
                     </div>
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 14: TARGET ACQUISITION",
        headline: "SIGNAL VS NOISE",
        icon: <Scan size={64} className="text-lime-500" />,
        content: (
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1">
                        <h3 className="text-3xl font-black text-white mb-4">IDENTIFYING KEY FEATURES</h3>
                        <p className="text-xl text-slate-300 font-light">
                            If you only notice details, you will just list information ("Focus on details" = Band 5). You must <span className="text-lime-400 font-bold">highlight</span> key features (Band 7).
                        </p>
                    </div>
                </div>

                <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                    <h4 className="text-xs font-mono text-lime-500 uppercase tracking-widest mb-4">SCANNING PROTOCOL</h4>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: "BIG CHANGES", desc: "Where is the steepest climb or drop?" },
                            { label: "EXTREMES", desc: "What are the highest and lowest points?" },
                            { label: "SIMILARITIES", desc: "Do any lines mirror each other?" },
                            { label: "STABILITY", desc: "Did anything stay the same?" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-black/20 rounded">
                                <Target size={16} className="text-lime-500 mt-1 shrink-0" />
                                <div>
                                    <div className="text-white font-bold text-sm">{item.label}</div>
                                    <div className="text-slate-500 text-xs">{item.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 15: TACTICAL MARKUP",
        headline: "VISUAL SHORTHAND",
        icon: <Highlighter size={64} className="text-yellow-400" />,
        content: (
            <div className="space-y-8">
                <p className="text-xl text-slate-300">
                    Reduce your mental load during writing by marking up the question paper. Use a consistent symbol system.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-900 border border-slate-800 p-6 flex flex-col items-center gap-4 hover:border-yellow-500/50 transition-colors group">
                        <span className="text-6xl font-serif text-yellow-400 group-hover:scale-110 transition-transform">{"}"}</span>
                        <div className="text-center">
                            <div className="text-white font-bold text-sm">GROUPING</div>
                            <div className="text-slate-500 text-xs">Connect similar data points</div>
                        </div>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 p-6 flex flex-col items-center gap-4 hover:border-yellow-500/50 transition-colors group">
                        <span className="text-6xl font-black text-yellow-400 group-hover:scale-110 transition-transform">!</span>
                        <div className="text-center">
                            <div className="text-white font-bold text-sm">ANOMALY</div>
                            <div className="text-slate-500 text-xs">Unusual figures (e.g. Zero)</div>
                        </div>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 p-6 flex flex-col items-center gap-4 hover:border-yellow-500/50 transition-colors group">
                        <span className="text-6xl font-black text-yellow-400 group-hover:scale-110 transition-transform">*</span>
                        <div className="text-center">
                            <div className="text-white font-bold text-sm">KEY FEATURE</div>
                            <div className="text-slate-500 text-xs">Must include in Overview</div>
                        </div>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 p-6 flex flex-col items-center gap-4 hover:border-yellow-500/50 transition-colors group">
                        <div className="flex flex-col items-center">
                            <span className="text-4xl font-black text-yellow-400">↑</span>
                            <span className="text-4xl font-black text-yellow-400">↓</span>
                        </div>
                        <div className="text-center">
                            <div className="text-white font-bold text-sm">TREND</div>
                            <div className="text-slate-500 text-xs">Direction of movement</div>
                        </div>
                    </div>
                </div>
                
                <div className="bg-yellow-950/20 p-4 border border-yellow-500/30 rounded text-center">
                    <p className="text-sm text-yellow-200">
                        "Noticing small details like 'Number of travellers' vs 'Percentage' is crucial. Circle this information immediately."
                    </p>
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 16: LOGIC GATES",
        headline: "ORGANISATION STRATEGY",
        icon: <Layout size={64} className="text-sky-500" />,
        content: (
            <div className="space-y-8">
                <div className="bg-sky-950/20 border-l-4 border-sky-500 p-8">
                    <h3 className="text-3xl font-black text-sky-500 mb-4">BE OBVIOUS</h3>
                    <p className="text-xl text-slate-300">
                        "If you don't take the time to think about organization, it will not be clear to the examiner. You do not need to be inventive—the most obvious organization is usually the most logical."
                    </p>
                </div>

                <div className="space-y-4">
                    <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest">COMMON LOGIC PATTERNS</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-900 p-4 border border-slate-800 flex flex-col gap-2">
                            <div className="text-sky-400 font-bold text-sm uppercase">Scenario A</div>
                            <div className="text-white text-sm">Two Categories (Coffee & Bananas)</div>
                            <div className="h-px bg-slate-800 w-full my-2"></div>
                            <div className="text-slate-400 text-xs">
                                Para 1: Coffee Sales<br/>
                                Para 2: Banana Sales
                            </div>
                        </div>

                        <div className="bg-slate-900 p-4 border border-slate-800 flex flex-col gap-2">
                            <div className="text-sky-400 font-bold text-sm uppercase">Scenario B</div>
                            <div className="text-white text-sm">Mixed Charts (Pie + Table)</div>
                            <div className="h-px bg-slate-800 w-full my-2"></div>
                            <div className="text-slate-400 text-xs">
                                Para 1: Pie Chart (Global)<br/>
                                Para 2: Table (Regional)
                            </div>
                        </div>

                        <div className="bg-slate-900 p-4 border border-slate-800 flex flex-col gap-2">
                            <div className="text-sky-400 font-bold text-sm uppercase">Scenario C</div>
                            <div className="text-white text-sm">Process Map (Island)</div>
                            <div className="h-px bg-slate-800 w-full my-2"></div>
                            <div className="text-slate-400 text-xs">
                                Para 1: Before Development<br/>
                                Para 2: After Development
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 17: INTRODUCTORY SENTENCE",
        headline: "THE OPENING MOVE",
        icon: <PenTool size={64} className="text-indigo-400" />,
        content: (
            <div className="space-y-8">
                <div className="bg-indigo-950/30 border-l-4 border-indigo-500 p-8">
                    <h3 className="text-2xl font-black text-indigo-400 mb-4">PURPOSE: SPEED & PRECISION</h3>
                    <p className="text-xl text-slate-300 leading-relaxed font-light">
                        This is the sentence you spend the <span className="text-white font-bold">least</span> amount of time on. It answers 4 questions:
                    </p>
                    <div className="grid grid-cols-4 gap-4 mt-6 text-center">
                        {['What', 'Who', 'Where', 'When'].map(q => (
                            <div key={q} className="bg-indigo-900/50 p-2 rounded border border-indigo-500/50 text-indigo-300 font-bold uppercase">{q}</div>
                        ))}
                    </div>
                </div>
                
                <div className="bg-slate-900 p-6 rounded border border-slate-800 relative">
                    <Quote className="absolute top-4 right-4 text-slate-700" size={48} />
                    <p className="text-lg text-slate-400 mb-4 italic">"The introductory sentence explains what we are looking at. However, this is <span className="text-red-500 font-bold">NOT</span> your overview."</p>
                    
                    <div className="space-y-2 mt-6">
                        <div className="flex gap-2">
                            <span className="bg-emerald-900/50 text-emerald-400 px-2 py-1 text-xs font-mono rounded">WHAT</span>
                            <p className="text-white">The tables below give information about sales of Fairtrade-labelled coffee and bananas</p>
                        </div>
                        <div className="flex gap-2">
                            <span className="bg-amber-900/50 text-amber-400 px-2 py-1 text-xs font-mono rounded">WHEN</span>
                            <p className="text-white">in 1999 and 2004</p>
                        </div>
                        <div className="flex gap-2">
                            <span className="bg-blue-900/50 text-blue-400 px-2 py-1 text-xs font-mono rounded">WHERE</span>
                            <p className="text-white">in five European countries</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 18: INTRO PRACTICE A",
        headline: "MIXED DATA ASSEMBLY",
        icon: <Split size={64} className="text-emerald-500" />,
        content: (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <ChartDualView />
                    <p className="text-xs text-slate-500 text-center font-mono uppercase">TARGET: Pie + Table Integration</p>
                </div>
                <div className="flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-white mb-6">COMPLETE THE PROTOCOL</h3>
                    <GapFill 
                        parts={["Task A: The", "below", "information about", "worldwide", "and", "."]}
                        options={["charts", "give", "the causes of land degradation", "in three regions of the world"]}
                        correct={["charts", "give", "the causes of land degradation", "in three regions of the world"]}
                    />
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 19: INTRO PRACTICE B",
        headline: "PROCESS & MAP ASSEMBLY",
        icon: <Map size={64} className="text-blue-500" />,
        content: (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <InteractiveMap />
                    <p className="text-xs text-slate-500 text-center font-mono uppercase">TARGET: Before & After Logic</p>
                </div>
                <div className="flex flex-col justify-center space-y-8">
                    <div>
                        <h3 className="text-sm font-bold text-blue-400 mb-2 uppercase tracking-widest">TASK B: MAPS</h3>
                        <GapFill 
                            parts={["The", "maps", "an", "island", "the", "."]}
                            options={["two", "show", "before and after", "construction of some tourist facilities"]}
                            correct={["two", "show", "before and after", "construction of some tourist facilities"]}
                        />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-indigo-400 mb-2 uppercase tracking-widest">TASK C: BAR CHART</h3>
                        <GapFill 
                            parts={["The chart below shows the", "of", "travelling", "by", "in", "city in 1980 1990 and 2000."]}
                            options={["percentage", "people", "to work", "four means of transport", "one European"]}
                            correct={["percentage", "people", "to work", "four means of transport", "one European"]}
                        />
                    </div>
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 20: PARAPHRASING THEORY",
        headline: "SYNONYM PROTOCOLS",
        icon: <RefreshCcw size={64} className="text-purple-500" />,
        content: (
            <div className="space-y-8">
                <p className="text-xl text-slate-300 font-light">
                    Do not copy large chunks from the question paper. However, do not over-paraphrase to the point of error.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-900 border border-slate-800 p-6 rounded">
                        <h4 className="text-purple-400 font-bold mb-4 uppercase text-xs tracking-widest">SAFE TRANSFORMATIONS</h4>
                        <ul className="space-y-3 text-sm text-slate-300">
                            <li><span className="text-white font-bold">Chart type:</span> Keep it specific (Pie chart, Line graph).</li>
                            <li><span className="text-white font-bold">Show:</span> 'Illustrate' or 'Compare'. Avoid 'Display'.</li>
                            <li><span className="text-white font-bold">Time:</span> 'From 1990 to 2000' → 'Between 1990 and 2000'.</li>
                        </ul>
                    </div>
                    
                    <div className="bg-red-950/20 border border-red-900/50 p-6 rounded">
                        <h4 className="text-red-400 font-bold mb-4 uppercase text-xs tracking-widest">DANGEROUS SYNONYMS</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><X size={12} className="inline text-red-500 mr-2"/> "Display" (Visual, not data)</li>
                            <li><X size={12} className="inline text-red-500 mr-2"/> "Tell" (Needs indirect object)</li>
                            <li><X size={12} className="inline text-red-500 mr-2"/> "Present" (Often misused)</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-slate-900 p-4 text-center border-t border-slate-800">
                    <p className="italic text-slate-500">"Don't make your task harder by trying to change every word. Accuracy > Variety."</p>
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 21: DETAIL RESTRUCTURING",
        headline: "GRAMMATICAL FLIPS",
        icon: <Move size={64} className="text-orange-500" />,
        content: (
            <div className="space-y-8">
                <div className="bg-slate-900 p-8 rounded border border-slate-800">
                    <h3 className="text-2xl font-black text-white mb-6">THE "AMOUNT" FLIP</h3>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4 text-slate-500 line-through">
                            <span>The chart shows the amount of...</span>
                        </div>
                        <div className="flex justify-center text-orange-500">
                            <ArrowLeft className="rotate-90 md:rotate-0" />
                        </div>
                        <div className="flex items-center gap-4 text-emerald-400 font-bold bg-emerald-950/30 p-3 rounded">
                            <span>The chart shows how much...</span>
                        </div>
                    </div>
                    
                    <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                        <div className="p-3 bg-black/20 rounded">
                            <span className="block text-slate-500 text-xs uppercase mb-1">Noun Phrase</span>
                            The number of...
                        </div>
                        <div className="p-3 bg-emerald-900/20 border border-emerald-500/30 rounded text-emerald-300">
                            <span className="block text-emerald-600 text-xs uppercase mb-1">Clause</span>
                            How many...
                        </div>
                        
                        <div className="p-3 bg-black/20 rounded">
                            <span className="block text-slate-500 text-xs uppercase mb-1">Noun Phrase</span>
                            The percentage of...
                        </div>
                        <div className="p-3 bg-emerald-900/20 border border-emerald-500/30 rounded text-emerald-300">
                            <span className="block text-emerald-600 text-xs uppercase mb-1">Clause</span>
                            The proportion of...
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 22: RELATIVE CLAUSES",
        headline: "COMPLEX SENTENCE STRUCTURE",
        icon: <GitMerge size={64} className="text-pink-500" />,
        content: (
            <div className="space-y-8">
                <div className="bg-pink-950/20 border-l-4 border-pink-500 p-8">
                    <h3 className="text-2xl font-black text-pink-500 mb-4">THE DEFINING RULE</h3>
                    <p className="text-xl text-slate-300 leading-relaxed">
                        Introductory sentences often require combining clauses.
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-pink-200/70 list-disc pl-4">
                        <li>Relative pronoun comes immediately after the noun.</li>
                        <li>No commas for defining clauses.</li>
                        <li>Omit pronoun if it is the object.</li>
                        <li><span className="text-white font-bold border-b border-pink-500">Can be reduced to a participle (-ing / -ed).</span></li>
                    </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-900 p-4 border border-slate-800">
                        <span className="text-xs text-slate-500 uppercase block mb-2">Original</span>
                        <p className="text-slate-300">"The chart shows the number of men who attended college."</p>
                    </div>
                    <div className="bg-slate-900 p-4 border border-pink-500/50">
                        <span className="text-xs text-pink-500 uppercase block mb-2">Reduced (Band 8+)</span>
                        <p className="text-white">"The chart shows the number of men <span className="text-pink-400 font-bold">attending</span> college."</p>
                    </div>
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 23: PREPOSITIONS & 'NAMELY'",
        headline: "PRECISION TOOLS",
        icon: <MousePointer2 size={64} className="text-teal-500" />,
        content: (
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">USING 'NAMELY'</h3>
                        <p className="text-slate-400 mb-4">Use to list specific details after a general category.</p>
                        <div className="bg-slate-900 p-4 rounded border border-slate-800 italic text-slate-300">
                            "...in five countries, <span className="text-teal-400 font-bold">namely</span> the UK, Switzerland, Denmark, Belgium and Sweden."
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">TIME PREPOSITIONS</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between border-b border-slate-800 pb-1">
                                <span className="text-slate-500">Duration</span>
                                <span className="text-teal-400">Over / During / For</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-800 pb-1">
                                <span className="text-slate-500">Start/End</span>
                                <span className="text-teal-400">From... to / Between... and</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-800 pb-1">
                                <span className="text-slate-500">Specific Point</span>
                                <span className="text-teal-400">In / At</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 24: IDENTIFICATION PROTOCOL",
        headline: "MATCH DATA TO VISUAL",
        icon: <Scan size={64} className="text-blue-500" />,
        content: (
            <div className="w-full max-w-4xl mx-auto">
                <MatchingProtocol 
                    pairs={[
                        { label: "A Pie Chart", icon: <PieChart size={32} className="text-emerald-400" /> },
                        { label: "A Line Graph", icon: <Activity size={32} className="text-blue-400" /> },
                        { label: "A Bar Chart", icon: <BarChart2 size={32} className="text-amber-400" /> },
                        { label: "A Table", icon: <Table size={32} className="text-purple-400" /> },
                        { label: "Stacked Bar", icon: <div className="flex flex-col gap-0.5 w-6"><div className="bg-red-500 h-3 w-full"/><div className="bg-blue-500 h-3 w-full"/></div> }
                    ]}
                />
            </div>
        )
    },
    {
        title: "SECTOR 25: CLAUSE DIAGNOSTICS",
        headline: "GRAMMAR ANALYSIS",
        icon: <GitMerge size={64} className="text-indigo-500" />,
        content: (
            <div className="space-y-6">
                <div className="bg-indigo-950/20 p-4 text-center border border-indigo-500/30 rounded">
                    <p className="text-indigo-300 font-mono text-xs uppercase tracking-widest">DIAGNOSTIC: IDENTIFY CLAUSE TYPE</p>
                </div>
                <ClauseAnalysis 
                    sentences={[
                        "The chart shows men and women who attended college.",
                        "The graph shows tea and coffee drunk each month.",
                        "The table shows people who bought or rented.",
                        "The charts show how adults spend money they earn.",
                        "The charts show tourists visiting an island.",
                        "The bar chart shows men who did regular activity."
                    ]}
                    correctTypes={[0, 2, 0, 1, 2, 0]} // 0: Essential, 1: Non-essential/Omit, 2: Reduced
                />
                <div className="text-xs text-slate-500 mt-4 text-center">
                    TIP: If it's a subject, you can't omit. If it's passive (-ed), it might be reduced.
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 26: CLAUSE REDUCTION DRILL",
        headline: "OPTIMIZATION",
        icon: <Hammer size={64} className="text-fuchsia-500" />,
        content: (
            <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                    <h3 className="text-sm font-bold text-fuchsia-400 uppercase">EXPAND: "Tea and coffee drunk..."</h3>
                    <GapFill 
                        parts={["The line graph shows the amount of tea and coffee", "each month."]}
                        options={["that was drunk", "which drank", "drinking"]}
                        correct={["that was drunk"]}
                    />
                </div>
                <div className="space-y-2">
                    <h3 className="text-sm font-bold text-fuchsia-400 uppercase">EXPAND: "Tourists visiting..."</h3>
                    <GapFill 
                        parts={["The charts show the number of tourists", "an island."]}
                        options={["that visited", "visiting", "visited"]}
                        correct={["that visited"]}
                    />
                </div>
                <div className="space-y-2">
                    <h3 className="text-sm font-bold text-fuchsia-400 uppercase">REDUCE: "People who bought..."</h3>
                    <GapFill 
                        parts={["The table shows the percentage of people", "accommodation."]}
                        options={["buying or renting", "bought", "who buy"]}
                        correct={["buying or renting"]}
                    />
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 27: TEMPORAL LOGIC",
        headline: "PREPOSITION INSERTION",
        icon: <Timer size={64} className="text-amber-500" />,
        content: (
            <div className="space-y-6">
                <div className="bg-amber-950/20 p-4 text-center border border-amber-500/30 rounded mb-4">
                    <p className="text-amber-300 font-mono text-xs uppercase tracking-widest">FILL THE GAPS: TIME & PLACE</p>
                </div>
                <GapFill 
                    parts={[
                        "The level remained stable", "the first six years.",
                        "The line graph shows changes", "a fifty-year period.",
                        "There were no changes in Switzerland", "this time.",
                        "Sales fell", "1990", "2000 then increased."
                    ]}
                    options={["For", "over", "during", "from", "to"]}
                    correct={["For", "over", "during", "from", "to"]}
                />
            </div>
        )
    },
    // --- PDF INTEGRATION START ---
    {
        title: "SECTOR 28: MAP TASKS INTRO",
        headline: "BEFORE & AFTER LOGIC",
        icon: <Layout size={64} className="text-cyan-500" />,
        content: (
            <div className="space-y-8">
                <div className="bg-cyan-950/20 border-l-4 border-cyan-500 p-8">
                    <h3 className="text-3xl font-black text-cyan-500 mb-4">MAP & PLAN FUNDAMENTALS</h3>
                    <p className="text-xl text-slate-300 leading-relaxed">
                        With maps, you are always shown two images: <span className="text-white font-bold">Before</span> something happened and <span className="text-white font-bold">After</span>.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-sm">
                        <div className="bg-slate-900 p-3 rounded">
                            <span className="block text-cyan-400 font-bold mb-1">Example A</span>
                            An island before and after the construction of tourist facilities.
                        </div>
                        <div className="bg-slate-900 p-3 rounded">
                            <span className="block text-cyan-400 font-bold mb-1">Example B</span>
                            The layout of a university sports centre now vs future redevelopment.
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
                    <h4 className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-4">GRAMMAR PROTOCOL: 'BEFORE' vs 'PRIOR TO'</h4>
                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-white font-bold">Use with Verb (+ing):</span>
                                <span className="text-slate-500 text-xs">AFTER / BEFORE only</span>
                            </div>
                            <p className="text-slate-400 italic pl-4 border-l-2 border-slate-700">"After <span className="text-cyan-400">building</span> some facilities..."</p>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-white font-bold">Use with Noun:</span>
                                <span className="text-slate-500 text-xs">ALL OK (Prior to, Following, After)</span>
                            </div>
                            <p className="text-slate-400 italic pl-4 border-l-2 border-slate-700">"Prior to the <span className="text-cyan-400">construction</span> of..."</p>
                        </div>
                        <div className="mt-4 p-2 bg-red-950/20 border border-red-900 text-red-400 text-xs text-center">
                            WARNING: "Prior to building" is technically incorrect in formal grammar. Stick to Nouns for 'Prior to'.
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 29: OVERLOAD ERROR",
        headline: "GIVING TOO MUCH INFO",
        icon: <AlertTriangle size={64} className="text-amber-500" />,
        content: (
            <div className="space-y-8">
                <p className="text-xl text-slate-300 font-light">
                    The introductory sentence should not be confused with your overview. Do not add comments or extra adjectives.
                </p>

                <div className="bg-slate-900 border border-red-500/50 p-6 rounded relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1">BAD EXAMPLE</div>
                    <p className="text-lg text-slate-300 mb-4">
                        "The two maps illustrate the development that has taken place on <span className="text-red-500 line-through">the island</span> in terms of facilities for tourists that has turned a <span className="text-red-500 font-bold">desolate</span> place into one with several <span className="text-red-500 font-bold">amenities</span>."
                    </p>
                    <ul className="space-y-2 text-sm text-red-300 list-disc pl-4">
                        <li>"The island": Which island? Introduce it first as "an island".</li>
                        <li>"Desolate": This is an opinion/comment. It belongs in the body/overview, not the intro.</li>
                        <li>"Amenities": Too specific for the first sentence.</li>
                    </ul>
                </div>

                <div className="bg-slate-900 border border-emerald-500/50 p-6 rounded relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1">OPTIMIZED</div>
                    <p className="text-lg text-white">
                        "The maps show an island <span className="text-emerald-400 font-bold">prior to and following its development</span> as a tourist destination."
                    </p>
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 30: HOMEWORK CONTEXT",
        headline: "TABLE ANALYSIS",
        icon: <Table size={64} className="text-purple-500" />,
        content: (
            <div className="space-y-8">
                <div className="bg-purple-950/20 border border-purple-500/30 p-6 rounded text-center">
                    <h3 className="text-white font-bold mb-2">HOMEWORK BRIEF</h3>
                    <p className="text-slate-400">"Summarise the information by selecting and reporting the main features, and make comparisons where relevant."</p>
                </div>

                <ChartCoffee />

                <div className="text-center text-sm text-slate-500">
                    <p>Refer to Sector 17 for the Introductory Sentence structure of this specific task.</p>
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 31: VOCABULARY MATRIX",
        headline: "BUILD & CONSTRUCT",
        icon: <PenTool size={64} className="text-indigo-500" />,
        content: (
            <div className="space-y-8">
                <p className="text-lg text-slate-300">
                    Map tasks require specific transformation verbs. Convert the Verbs to Nouns below.
                </p>
                
                <VocabTable />

                <div className="mt-8 border-t border-slate-800 pt-8">
                    <h4 className="text-indigo-400 font-bold mb-4 uppercase tracking-widest text-sm flex items-center gap-2">
                        <Map size={16}/> PARAPHRASE CHALLENGE
                    </h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="h-48 rounded-lg overflow-hidden border border-slate-700 relative">
                             {/* Mini Map Preview */}
                             <InteractiveMap />
                        </div>
                        <div className="flex flex-col justify-center gap-4">
                            <p className="text-sm text-slate-400">Original Question:</p>
                            <p className="text-white font-serif italic border-l-2 border-indigo-500 pl-4">"The two maps below show an island before and after the construction of some tourist facilities."</p>
                            
                            <div className="space-y-2">
                                <p className="text-xs text-indigo-400 uppercase font-bold">Attempt Paraphrase:</p>
                                <textarea className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-sm text-white h-24" placeholder="The maps illustrate..."></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 32: ANSWERS & REVIEW",
        headline: "PARAPHRASE SOLUTIONS",
        icon: <CheckCircle2 size={64} className="text-emerald-500" />,
        content: (
            <div className="space-y-8">
                <div className="bg-emerald-950/20 border-l-4 border-emerald-500 p-8">
                    <h3 className="text-2xl font-black text-emerald-500 mb-6">MODEL ANSWERS</h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-slate-900 rounded border border-slate-800">
                            <p className="text-white text-lg">"The maps show an island <span className="text-emerald-400 font-bold">prior to and following</span> the building of some facilities for tourists."</p>
                        </div>
                        <div className="p-4 bg-slate-900 rounded border border-slate-800">
                            <p className="text-white text-lg">"The maps show changes on an island <span className="text-emerald-400 font-bold">following the construction</span> of some tourist facilities."</p>
                        </div>
                        <div className="p-4 bg-slate-900 rounded border border-slate-800">
                            <p className="text-white text-lg">"The maps show how an island changed <span className="text-emerald-400 font-bold">after tourist facilities were constructed</span>."</p>
                        </div>
                    </div>
                </div>
                
                <div className="text-center">
                    <p className="text-slate-400">Notice the variation: <em>Nouns</em> (Construction), <em>Gerunds</em> (Building), and <em>Passive Voice</em> (Were constructed).</p>
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 33: RAPID FIRE SYNONYMS",
        headline: "FLASHCARD PROTOCOL",
        icon: <Zap size={64} className="text-yellow-500" />,
        content: (
            <div className="flex flex-col items-center justify-center min-h-[500px]">
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-black text-white mb-2">NEURAL RECALL DRILL</h3>
                    <p className="text-slate-400">Test your definitions. Speed is key.</p>
                </div>
                <FlashcardDeck />
                <div className="mt-8 flex gap-2 text-xs text-slate-600 font-mono uppercase">
                    <RotateCcw size={12}/> Loop <span className="mx-2">|</span> <MousePointer2 size={12}/> Click to Flip
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 34: FINAL GRID TEST",
        headline: "MASTERY VERIFICATION",
        icon: <Grid size={64} className="text-fuchsia-500" />,
        content: (
            <div className="space-y-8">
                <p className="text-xl text-slate-300 text-center">
                    Complete the final matching protocol to verify map vocabulary retention.
                </p>
                
                <div className="w-full max-w-4xl mx-auto">
                    <MatchingProtocol 
                        pairs={[
                            { label: "Make something using materials", icon: <span className="font-bold text-sm">To Build</span> },
                            { label: "Make something better", icon: <span className="font-bold text-sm">To Improve</span> },
                            { label: "Change a wild place to be usable", icon: <span className="font-bold text-sm">To Develop</span> },
                            { label: "Replace old buildings with new", icon: <span className="font-bold text-sm">Redevelop</span> },
                            { label: "Repair to make 'new' again", icon: <span className="font-bold text-sm">Renovate</span> }
                        ]}
                    />
                </div>

                <div className="text-center mt-12">
                    <div className="inline-block px-6 py-2 bg-fuchsia-900/30 text-fuchsia-400 border border-fuchsia-500 rounded-full text-xs font-bold uppercase tracking-widest animate-pulse">
                        End of Masterclass Module
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
