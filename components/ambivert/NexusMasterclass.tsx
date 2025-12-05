
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Zap, Target, BookOpen, AlertTriangle, ShieldCheck, PenTool, CheckCircle2, X, FileWarning, EyeOff, Link, Hammer, Layers, RefreshCcw, ListOrdered, Bug, GitMerge, Timer, Scan, Highlighter, Layout, Split, Move, Quote, Map, BarChart2, PieChart, Table, MousePointer2, Activity, Menu, Grid, RotateCcw, ChevronRight, Hash, TrendingUp, Search, Umbrella, Edit3, Check, Clock, TrendingDown, ClipboardCheck, ArrowDown, Headphones, Ruler, Trophy, Fish, Hourglass, ArrowUp, Shuffle, Factory, AlertCircle, Sprout, Filter, Droplets } from 'lucide-react';
import ChartDualView from '../features/ChartDualView';
import InteractiveMap from '../features/InteractiveMap';
import MapSports from '../features/MapSports';
import ChartHousing from '../features/ChartHousing';
import Chart3D from '../features/Chart3D';
import ChartCoffee from '../features/ChartCoffee';
import ChartFish from '../features/ChartFish';
import DiagramSalmon from '../features/DiagramSalmon';
import DiagramSugar from '../features/DiagramSugar';
import WriterConsole from '../features/WriterConsole';

// --- MICRO-COMPONENTS ---

const GapFill = ({ textWithGaps, answers, hints = [] }: { textWithGaps: string, answers: string[], hints?: string[] }) => {
    const parts = textWithGaps.split(/\[gap\]/g);
    const [inputs, setInputs] = useState<string[]>(Array(parts.length - 1).fill(''));
    const [showAnswers, setShowAnswers] = useState(false);

    return (
        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 shadow-inner font-serif text-lg leading-loose text-slate-300">
            {parts.map((part, i) => (
                <React.Fragment key={i}>
                    {part}
                    {i < parts.length - 1 && (
                        <span className="relative inline-block mx-1">
                            <input 
                                type="text" 
                                value={inputs[i]}
                                onChange={(e) => {
                                    const newInputs = [...inputs];
                                    newInputs[i] = e.target.value;
                                    setInputs(newInputs);
                                }}
                                placeholder={hints[i] || ""}
                                className={`bg-slate-800 border-b-2 border-indigo-500/50 text-indigo-300 px-2 py-0 min-w-[80px] focus:outline-none focus:border-indigo-400 text-center transition-colors ${showAnswers && inputs[i].toLowerCase().trim() === answers[i].toLowerCase() ? 'text-emerald-400 border-emerald-500' : ''}`}
                            />
                            {showAnswers && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 min-w-max text-[10px] text-emerald-500 font-sans font-bold text-center bg-slate-900 z-10 border border-emerald-900 rounded shadow-xl mt-1 px-2 py-1">
                                    {answers[i]}
                                </div>
                            )}
                        </span>
                    )}
                </React.Fragment>
            ))}
            <div className="mt-6 flex justify-end">
                <button 
                    onClick={() => setShowAnswers(!showAnswers)} 
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-bold uppercase tracking-widest transition-colors"
                >
                    {showAnswers ? 'Hide Answers' : 'Show Answers'}
                </button>
            </div>
        </div>
    );
};

const TextHighlighter = ({ text, targets }: { text: string, targets: string[] }) => {
    const [selected, setSelected] = useState<number[]>([]);
    const [showResult, setShowResult] = useState(false);
    
    const words = text.split(/(\s+)/);

    const toggleWord = (index: number) => {
        if (showResult) return;
        if (selected.includes(index)) {
            setSelected(prev => prev.filter(i => i !== index));
        } else {
            setSelected(prev => [...prev, index]);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white text-slate-800 p-8 rounded-xl shadow-xl font-serif text-lg leading-loose">
                {words.map((word, i) => {
                    const cleanWord = word.trim().replace(/[.,]/g, '').toLowerCase();
                    const isTarget = targets.some(t => cleanWord.includes(t.toLowerCase()));
                    const isSelected = selected.includes(i);
                    const isCorrect = isSelected && isTarget;
                    const isMissed = showResult && isTarget && !isSelected;
                    const isWrong = showResult && isSelected && !isTarget;

                    return (
                        <span 
                            key={i}
                            onClick={() => word.trim() && toggleWord(i)}
                            className={`
                                transition-all duration-200 cursor-pointer rounded px-0.5
                                ${isSelected ? 'bg-indigo-200' : 'hover:bg-slate-100'}
                                ${isCorrect && showResult ? '!bg-emerald-300' : ''}
                                ${isWrong && showResult ? '!bg-red-300' : ''}
                                ${isMissed ? 'border-b-2 border-emerald-500' : ''}
                            `}
                        >
                            {word}
                        </span>
                    )
                })}
            </div>
            <div className="flex justify-between items-center">
                <p className="text-xs text-slate-400 font-mono">Click words that match the criteria.</p>
                <button 
                    onClick={() => setShowResult(!showResult)} 
                    className="px-6 py-2 bg-indigo-600 text-white rounded-full font-bold text-xs uppercase tracking-widest"
                >
                    {showResult ? 'Reset' : 'Check Analysis'}
                </button>
            </div>
        </div>
    )
}

const VocabMatcher = ({ pairs }: { pairs: { term: string, def: string }[] }) => {
    const [inputs, setInputs] = useState<Record<string, string>>({});
    const [show, setShow] = useState(false);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pairs.map((p, i) => (
                <div key={i} className="flex items-center justify-between bg-slate-900 p-3 rounded border border-slate-800">
                    <span className="text-sm text-slate-400 italic">{p.def}</span>
                    <div className="flex flex-col items-end">
                        <input 
                            type="text" 
                            className="bg-slate-800 text-right text-indigo-300 text-sm border-b border-indigo-500/30 w-32 focus:outline-none"
                            onChange={(e) => setInputs(prev => ({ ...prev, [i]: e.target.value }))}
                        />
                        {show && <span className="text-[10px] text-emerald-500 font-bold">{p.term}</span>}
                    </div>
                </div>
            ))}
            <div className="md:col-span-2 flex justify-center mt-4">
                <button onClick={() => setShow(!show)} className="text-xs text-slate-500 hover:text-white underline">Reveal Answers</button>
            </div>
        </div>
    )
}

const Checklist = ({ items }: { items: string[] }) => {
  const [checked, setChecked] = useState<number[]>([]);
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <button key={i} onClick={() => setChecked(prev => prev.includes(i) ? prev.filter(x => x!==i) : [...prev, i])} className={`w-full text-left p-3 rounded border flex items-center gap-3 transition-all ${checked.includes(i) ? 'bg-emerald-900/20 border-emerald-500/50 text-emerald-400' : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800'}`}>
           <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${checked.includes(i) ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-slate-600'}`}>
              {checked.includes(i) && <Check size={14} />}
           </div>
           {item}
        </button>
      ))}
    </div>
  )
}

const VerbSorter = () => {
    const initialPool = ['remain', 'stay', 'flow', 'develop into', 'spend', 'grow into', 'take', 'last', 'move', 'travel', 'migrate', 'continue', 'change', 'become', 'leave', 'transform', 'turn into'];
    const [pool, setPool] = useState(initialPool);
    const [cats, setCats] = useState({
        time: [] as string[],
        movement: [] as string[],
        change: [] as string[]
    });
    
    const [selected, setSelected] = useState<string | null>(null);

    const handleSelect = (word: string) => setSelected(word);
    
    const handlePlace = (category: 'time' | 'movement' | 'change') => {
        if (!selected) return;
        setCats(prev => ({ ...prev, [category]: [...prev[category], selected] }));
        setPool(prev => prev.filter(w => w !== selected));
        setSelected(null);
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-2 p-4 bg-slate-900 rounded-xl min-h-[60px] border border-slate-800">
                {pool.map(word => (
                    <button 
                        key={word} 
                        onClick={() => handleSelect(word)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${selected === word ? 'bg-indigo-500 text-white scale-110' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                    >
                        {word}
                    </button>
                ))}
            </div>
            
            <div className="grid grid-cols-3 gap-4">
                {[
                    { id: 'time', label: 'Time', color: 'border-blue-500/30 bg-blue-900/10' },
                    { id: 'movement', label: 'Movement', color: 'border-emerald-500/30 bg-emerald-900/10' },
                    { id: 'change', label: 'Physical Change', color: 'border-amber-500/30 bg-amber-900/10' },
                ].map(c => (
                    <div 
                        key={c.id} 
                        onClick={() => handlePlace(c.id as any)}
                        className={`h-40 rounded-xl border-2 border-dashed p-3 ${c.color} cursor-pointer transition-all hover:bg-opacity-20`}
                    >
                        <h4 className="font-bold text-center text-xs uppercase mb-3 opacity-70">{c.label}</h4>
                        <div className="flex flex-wrap gap-1 justify-center">
                            {cats[c.id as keyof typeof cats].map(w => (
                                <span key={w} className="px-2 py-1 bg-black/40 rounded text-[10px] text-white">{w}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const SentenceCorrector = ({ sentence, correction }: { sentence: string, correction: string }) => {
    const [revealed, setRevealed] = useState(false);
    
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3 mb-3">
                <X size={18} className="text-red-500 mt-0.5" />
                <p className="text-slate-300 font-mono text-sm line-through decoration-red-500/50">{sentence}</p>
            </div>
            {revealed ? (
                <div className="flex items-start gap-3 animate-fade-in-up">
                    <CheckCircle2 size={18} className="text-emerald-500 mt-0.5" />
                    <p className="text-emerald-300 font-bold text-sm">{correction}</p>
                </div>
            ) : (
                <button 
                    onClick={() => setRevealed(true)}
                    className="text-xs text-indigo-400 hover:text-indigo-300 underline ml-8"
                >
                    Show Correction
                </button>
            )}
        </div>
    )
}

const ZigZagFlow = () => (
  <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 text-slate-800 font-serif relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
    <div className="space-y-8 relative z-10">
       <div className="relative">
          <p className="text-lg">The salmon lays <span className="font-bold bg-yellow-200 px-1 border-b-2 border-yellow-500">eggs</span>................................................................</p>
          <svg className="absolute -bottom-8 left-40 w-12 h-12 text-blue-500 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
             <path d="M4 0 V12 A12 12 0 0 0 16 24" />
             <path d="M12 20 L16 24 L20 20" />
          </svg>
       </div>
       <div className="pl-12 relative">
          <p className="text-lg">The <span className="font-bold bg-yellow-200 px-1 border-b-2 border-yellow-500">eggs</span> hatch into young salmon called <span className="font-bold bg-yellow-200 px-1 border-b-2 border-yellow-500">fry</span>.....................</p>
          <svg className="absolute -bottom-8 right-40 w-12 h-12 text-blue-500 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: 'scaleX(-1)' }}>
             <path d="M4 0 V12 A12 12 0 0 0 16 24" />
             <path d="M12 20 L16 24 L20 20" />
          </svg>
       </div>
       <div className="relative">
          <p className="text-lg">The <span className="font-bold bg-yellow-200 px-1 border-b-2 border-yellow-500">fry</span> can grow up to eight centimetres and develop into a bigger fish called <span className="font-bold bg-yellow-200 px-1 border-b-2 border-yellow-500">smolt</span>.</p>
          <svg className="absolute -bottom-8 left-20 w-12 h-12 text-blue-500 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
             <path d="M4 0 V12 A12 12 0 0 0 16 24" />
             <path d="M12 20 L16 24 L20 20" />
          </svg>
       </div>
       <div className="pl-12">
          <p className="text-lg"><span className="font-bold bg-yellow-200 px-1 border-b-2 border-yellow-500">Smolt</span> ......................</p>
       </div>
    </div>
  </div>
);

const WordScramble = ({ words, solution }: { words: string[], solution: string }) => {
    const [currentOrder, setCurrentOrder] = useState<string[]>([]);
    const [available, setAvailable] = useState<string[]>(words);
    const [solved, setSolved] = useState(false);

    // Reset when words change
    useEffect(() => {
        setAvailable(words);
        setCurrentOrder([]);
        setSolved(false);
    }, [words]);

    const handleAdd = (word: string) => {
        const newOrder = [...currentOrder, word];
        setCurrentOrder(newOrder);
        setAvailable(prev => {
            const idx = prev.indexOf(word);
            const next = [...prev];
            next.splice(idx, 1);
            return next;
        });
        
        if (newOrder.join(' ') === solution) {
            setSolved(true);
        }
    };

    const handleRemove = (word: string) => {
        if (solved) return;
        setAvailable(prev => [...prev, word]);
        setCurrentOrder(prev => {
            const idx = prev.indexOf(word);
            const next = [...prev];
            next.splice(idx, 1);
            return next;
        });
    };

    return (
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 mb-4">
            <div className={`min-h-[60px] bg-slate-800 rounded p-4 mb-4 flex flex-wrap gap-2 transition-colors ${solved ? 'border-2 border-emerald-500' : 'border border-slate-600'}`}>
                {currentOrder.map((w, i) => (
                    <button key={i} onClick={() => handleRemove(w)} className="px-3 py-1 bg-indigo-600 text-white rounded shadow text-sm hover:bg-red-500 transition-colors animate-pop-in">
                        {w}
                    </button>
                ))}
                {currentOrder.length === 0 && <span className="text-slate-500 italic text-sm">Tap words to build sentence...</span>}
            </div>
            {solved ? (
                <div className="text-center text-emerald-400 font-bold flex items-center justify-center gap-2 animate-fade-in-up">
                    <CheckCircle2 size={20} /> Correct!
                </div>
            ) : (
                <div className="flex flex-wrap gap-2 justify-center">
                    {available.map((w, i) => (
                        <button key={i} onClick={() => handleAdd(w)} className="px-3 py-1 bg-slate-700 text-slate-300 rounded border border-slate-600 hover:bg-slate-600 transition-all text-sm">
                            {w}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

const SequenceSort = () => {
    const correctOrder = [
        "There are four stages in the lifecycle of the Monarch butterfly.",
        "In the first stage, eggs are laid on a plant.",
        "After about four days, the eggs hatch into baby caterpillars, which are known as larvae.",
        "The larvae eat almost continually at this stage, growing in size.",
        "After two weeks, it is fully grown and can now begin a process called metamorphosis.",
        "During metamorphosis, the larvae will form a chrysalis, which is a hard protective coating.",
        "The chrysalis stage lasts for ten days.",
        "During this time, the body of the caterpillar develops wings and transforms into a butterfly."
    ];
    
    // Initial shuffled state
    const [items, setItems] = useState([...correctOrder].sort(() => Math.random() - 0.5));
    const [isCorrect, setIsCorrect] = useState(false);

    const moveItem = (fromIdx: number, toIdx: number) => {
        const newItems = [...items];
        const [removed] = newItems.splice(fromIdx, 1);
        newItems.splice(toIdx, 0, removed);
        setItems(newItems);
        
        if (JSON.stringify(newItems) === JSON.stringify(correctOrder)) setIsCorrect(true);
    };

    return (
        <div className="space-y-2">
            {items.map((item, i) => (
                <div key={item} className={`p-3 rounded border flex items-center gap-4 bg-slate-800 ${isCorrect ? 'border-emerald-500 text-emerald-100' : 'border-slate-700 text-slate-300'}`}>
                    <div className="flex flex-col gap-1">
                        <button onClick={() => i > 0 && moveItem(i, i - 1)} disabled={isCorrect || i === 0} className="hover:text-white disabled:opacity-30"><ArrowUp size={14}/></button>
                        <button onClick={() => i < items.length - 1 && moveItem(i, i + 1)} disabled={isCorrect || i === items.length - 1} className="hover:text-white disabled:opacity-30"><ArrowDown size={14}/></button>
                    </div>
                    <span className="text-sm">{item}</span>
                </div>
            ))}
            {isCorrect && (
                <div className="mt-4 p-4 bg-emerald-900/30 border border-emerald-500 rounded text-center text-emerald-400 font-bold animate-pop-in">
                    Sequence Verified. Zig-Zag Pattern Established.
                </div>
            )}
        </div>
    )
}

const OverviewQuiz = () => {
    const questions = [
        { id: 1, text: "1) There are three main stages as the salmon develops from egg to mature adult. This kind of fish also experiences three transformations in appearance during the cycle, moving from eggs to fry to smolt and ultimately to adult salmon.", comment: "Too much detail & not complete (no mention of habitat).", correct: false },
        { id: 2, text: "2) Overall, it takes a total of close to 10 years for salmons to develop into its fully mature form. The development process consists of 3 main stages, starting with salmon eggs in the upper river where water flows slowly and ending with the formation of adult salmon.", comment: "Too much detail & not complete (no mention of habitat).", correct: false },
        { id: 3, text: "3) It is clear that they grow enormously in size when reaching adulthood, and also it takes up to ten years for them to return to their birthplace to breed.", comment: "Does not give a clear, complete picture. Suggests salmon just travels.", correct: false },
        { id: 4, text: "4) Overall, this natural, 6-staged process happens in three different environments and takes up to 10 years to complete.", comment: "Not a 6-staged process.", correct: false },
        { id: 5, text: "5) Overall, salmon fish life cycle consists of two main stages, one in the river when it is young and one in the ocean when it comes of age. The link between the two stages is called the estuary stage that starts in the river and goes to the ocean to reach adult life.", comment: "More than two stages & too much detail.", correct: false },
        { id: 6, text: "6) Overall, there are three stages in the life cycle of the large fish.", comment: "Too brief. Needs info about habitat.", correct: false },
    ];

    const [revealed, setRevealed] = useState<number | null>(null);

    return (
        <div className="space-y-4">
            <p className="text-slate-400 text-sm mb-4">Click each statement to see the examiner's critique.</p>
            {questions.map((q) => (
                <div key={q.id} className="bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
                    <button 
                        onClick={() => setRevealed(revealed === q.id ? null : q.id)}
                        className={`w-full text-left p-4 text-sm font-medium transition-colors hover:bg-slate-800 ${revealed === q.id ? 'bg-slate-800 text-white' : 'text-slate-300'}`}
                    >
                        {q.text}
                    </button>
                    {revealed === q.id && (
                        <div className="p-4 bg-indigo-900/20 border-t border-slate-700 text-indigo-300 text-xs font-bold animate-fade-in">
                            EXAMINER COMMENT: {q.comment}
                        </div>
                    )}
                </div>
            ))}
            <div className="mt-6 p-4 bg-emerald-900/20 border border-emerald-500/50 rounded-xl">
                <h4 className="text-emerald-400 font-bold text-sm mb-2">Improved Overview (Sentence 6):</h4>
                <p className="text-slate-200 italic">"Overall, there are three stages in the life cycle of the salmon, and each takes place in a different habitat / environment."</p>
            </div>
        </div>
    );
};

const UmbrellaSorter = () => {
    const items = [
        { id: 1, text: "Crushing", type: "Process" },
        { id: 2, text: "Drying", type: "Process" },
        { id: 3, text: "Evaporating", type: "Process" },
        { id: 4, text: "Farming", type: "Stage" },
        { id: 5, text: "Growing", type: "Step" },
        { id: 6, text: "Harvesting", type: "Step" },
        { id: 7, text: "Processing", type: "Stage" },
        { id: 8, text: "Purifying", type: "Process" },
        { id: 9, text: "Separating", type: "Process" }
    ];
    
    // Simple conceptual drill
    const [revealed, setRevealed] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-3 justify-center">
                {items.map(item => (
                    <div key={item.id} className={`px-4 py-2 rounded border border-slate-700 bg-slate-900 text-sm transition-all duration-500 ${revealed && (item.text === "Farming" || item.text === "Processing") ? "bg-emerald-900/50 border-emerald-500 text-emerald-300 scale-110" : "text-slate-400 opacity-60"}`}>
                        {item.text}
                    </div>
                ))}
            </div>
            <div className="text-center">
                <p className="text-sm text-slate-400 mb-4">Which two words are the "Umbrella Terms" (Main Stages)?</p>
                <button onClick={() => setRevealed(!revealed)} className="px-6 py-2 bg-indigo-600 rounded-full text-xs font-bold uppercase tracking-widest text-white hover:bg-indigo-500 transition-colors">
                    {revealed ? "Reset" : "Reveal Answer"}
                </button>
            </div>
            {revealed && (
                <div className="p-4 bg-slate-800 rounded border-l-4 border-emerald-500 animate-fade-in-up">
                    <p className="text-sm text-slate-300"><strong>Answer:</strong> Farming (Growing/Harvesting) & Processing (Crushing to Drying).</p>
                </div>
            )}
        </div>
    )
}

// --- MASTERCLASS COMPONENT ---

interface NexusMasterclassProps {
  onBack: () => void;
}

const NexusMasterclass: React.FC<NexusMasterclassProps> = ({ onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setAnimate(false);
    setTimeout(() => setAnimate(true), 50);
  }, [currentSlide]);

  const slides = [
    // --- PG 1 ---
    {
      title: "PG 1: Common Problems",
      headline: "GRAMMAR & STRUCTURE",
      icon: <AlertTriangle size={64} className="text-amber-500" />,
      content: (
        <div className="space-y-8">
           <div className="bg-slate-900/50 p-6 rounded-2xl border-l-4 border-amber-500">
               <h3 className="text-xl font-bold text-amber-500 mb-4">1. There is / There are</h3>
               <p className="text-slate-300 leading-relaxed mb-4">
                   Used to say something exists. Be careful not to list minor details like a picture description.
               </p>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                   <div className="p-4 bg-red-950/20 rounded border border-red-900/50">
                       <span className="text-red-400 font-bold block mb-1">Incorrect Focus:</span>
                       "There were some trees on the island." (Just listing)
                   </div>
                   <div className="p-4 bg-emerald-950/20 rounded border border-emerald-900/50">
                       <span className="text-emerald-400 font-bold block mb-1">Correct Context:</span>
                       "Before development, there were only trees..." (Contextual)
                   </div>
               </div>
           </div>

           <div className="bg-slate-900/50 p-6 rounded-2xl border-l-4 border-indigo-500">
               <h3 className="text-xl font-bold text-indigo-500 mb-4">2. The Passive Voice</h3>
               <p className="text-slate-300 leading-relaxed mb-4">
                   Maps use passive because the builder (subject) is unknown/unimportant.
                   <br/>Form: <strong>be + past participle</strong>
               </p>
               <div className="space-y-2 font-mono text-sm text-slate-400">
                   <p>Active: They built a restaurant.</p>
                   <p className="text-white">Passive: A restaurant <span className="text-indigo-400">was built</span>.</p>
               </div>
           </div>
        </div>
      )
    },

    // --- PG 2 ---
    {
        title: "PG 2: Tenses & Logic",
        headline: "THINKING IN TIME",
        icon: <Clock size={64} className="text-blue-500" />,
        content: (
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
                        <h4 className="font-bold text-slate-200 mb-4">Transforming Your Thinking</h4>
                        <p className="text-slate-400 text-sm mb-4">Don't just ask "What can I see?". Ask:</p>
                        <ul className="space-y-2 text-sm text-indigo-300">
                            <li>• What did it look like before?</li>
                            <li>• What has changed?</li>
                            <li>• What has been added/removed?</li>
                            <li>• What has been extended?</li>
                        </ul>
                    </div>
                    <div className="bg-white text-slate-900 p-6 rounded-xl shadow-lg transform rotate-1">
                        <h4 className="font-bold text-indigo-900 mb-2">Comparison Strategy</h4>
                        <div className="text-xs space-y-4">
                            <div className="p-2 bg-red-50 border-l-2 border-red-500">
                                <strong>Bad:</strong> Listing Map 1 features, then Map 2 features separately.
                            </div>
                            <div className="p-2 bg-green-50 border-l-2 border-green-500">
                                <strong>Good:</strong> Summarising changes. "Two blocks have been built so tourists can stay..."
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    },

    // --- PG 3 ---
    {
        title: "PG 3: Cohesion & Overview",
        headline: "AVOIDING TEMPLATES",
        icon: <Link size={64} className="text-purple-500" />,
        content: (
            <div className="space-y-8">
                <div className="bg-slate-900 p-6 rounded-2xl">
                    <h3 className="text-lg font-bold text-white mb-2">The "Template" Trap</h3>
                    <p className="text-slate-400 text-sm mb-4">Avoid rote learning cohesive devices like <em>"Firstly... On the contrary... Lastly"</em>.</p>
                    
                    <div className="p-4 bg-black rounded border border-slate-800 font-serif text-slate-300 text-sm leading-relaxed">
                        <span className="text-red-400 underline decoration-wavy">Firstly</span>, they preserved all of the trees. <span className="text-red-400 underline decoration-wavy">On the contrary</span>, they built a new pier. A vehicle path runs to the reception. <span className="text-red-400 underline decoration-wavy">Lastly</span>, there is a spectacular beach.
                    </div>
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl">
                    <h3 className="text-lg font-bold text-white mb-2">Overview Precision</h3>
                    <p className="text-slate-400 text-sm mb-4">Don't include details. Use <strong>Umbrella Terms</strong>.</p>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="p-3 bg-slate-800 rounded">
                            <span className="text-red-400 font-bold">Too Detailed:</span><br/>
                            "A restaurant, houses, footpath and vehicle track were built."
                        </div>
                        <div className="p-3 bg-slate-800 rounded">
                            <span className="text-emerald-400 font-bold">Umbrella Term:</span><br/>
                            "Changes were made to provide <strong>tourist facilities</strong>."
                        </div>
                    </div>
                </div>
            </div>
        )
    },

    // --- PG 4 ---
    {
        title: "PG 4: Exercise - Subjectivity",
        headline: "DETECTING BIAS",
        icon: <EyeOff size={64} className="text-red-500" />,
        content: (
            <div className="space-y-6">
                <div className="text-center mb-4">
                    <h3 className="text-2xl font-bold text-white">Objective Language Drill</h3>
                    <p className="text-slate-400">Task 1 must be factual. Click words in the text below that express a <strong>personal opinion</strong> instead of fact.</p>
                </div>
                
                <TextHighlighter 
                    text="After the advanced development, the island became well established and well civilised. The remarkable number of buildings, restaurants, reception, pier, accommodations, beach and greeneries have enhanced the island's beauty in very enormous ways. It could be said that these facilities will amuse the tourists. They must enjoy sailing and delight in eating in the restaurant as well as swimming."
                    targets={["advanced", "well", "civilised", "remarkable", "enhanced", "beauty", "enormous", "amuse", "must", "enjoy", "delight"]}
                />
            </div>
        )
    },

    // --- PG 5 ---
    {
        title: "PG 5: Solutions - Subjectivity",
        headline: "OBJECTIVE CORRECTION",
        icon: <CheckCircle2 size={64} className="text-emerald-500" />,
        content: (
            <div className="space-y-8">
                <div className="bg-slate-900 p-6 rounded-xl border border-emerald-500/30">
                    <h3 className="text-emerald-400 font-bold mb-4 uppercase tracking-widest text-sm">The Objective Rewrite</h3>
                    <div className="text-slate-300 font-serif leading-relaxed text-lg">
                        After the <span className="line-through text-red-500 opacity-50">advanced</span> development, the island became <span className="bg-emerald-900/50 text-emerald-300 px-1">a tourist destination</span>. The <span className="line-through text-red-500 opacity-50">remarkable</span> new buildings, which include a restaurant, reception and accommodation, have <span className="bg-emerald-900/50 text-emerald-300 px-1">changed the island significantly</span>. Tourists <span className="bg-emerald-900/50 text-emerald-300 px-1">can now go</span> sailing and <span className="bg-emerald-900/50 text-emerald-300 px-1">eat</span> in the restaurant as well as swimming.
                    </div>
                </div>
            </div>
        )
    },

    // --- PG 6 & 7 ---
    {
        title: "PG 6-7: Cohesion Audit",
        headline: "ERROR ANALYSIS",
        icon: <GitMerge size={64} className="text-pink-500" />,
        content: (
            <div className="space-y-6">
                <div className="bg-white text-slate-800 p-6 rounded-xl shadow-lg font-serif">
                    <p className="mb-4"><strong className="text-red-600">A) Firstly</strong>, they preserved all of the trees on the island. <strong className="text-red-600">B) On the contrary</strong>, they built a new beautiful pier where ships can land. A vehicle path runs from the pier to the reception which is located centrally. A huge pretty restaurant lies behind the reception. Houses are wonderfully constructed to the right and left of the reception with a footpath connecting them. <strong className="text-red-600">C) Lastly</strong>, there is a spectacular beach with a safe swimming area.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-900 border-l-4 border-red-500 rounded">
                        <div className="text-red-400 font-bold mb-1">A) Firstly</div>
                        <div className="text-xs text-slate-400">Used for steps in a process (e.g. recipe), not generally for describing static map features.</div>
                    </div>
                    <div className="p-4 bg-slate-900 border-l-4 border-red-500 rounded">
                        <div className="text-red-400 font-bold mb-1">B) On the contrary</div>
                        <div className="text-xs text-slate-400">Used to correct a mistaken idea ("It wasn't hot. On the contrary, it was freezing"). Incorrect here.</div>
                    </div>
                    <div className="p-4 bg-slate-900 border-l-4 border-red-500 rounded">
                        <div className="text-red-400 font-bold mb-1">C) Lastly</div>
                        <div className="text-xs text-slate-400">Implies the final step of a sequence. The beach isn't the "end" of the island.</div>
                    </div>
                </div>
            </div>
        )
    },

    // --- PG 10 ---
    {
        title: "PG 10: Model Answer Construction",
        headline: "GAP FILL CHALLENGE",
        icon: <PenTool size={64} className="text-teal-500" />,
        content: (
            <div className="space-y-6">
                <div className="bg-teal-950/20 p-4 rounded-lg border border-teal-500/30 mb-4">
                    <h4 className="text-teal-400 font-bold text-sm mb-1">Task: My Model Answer</h4>
                    <p className="text-xs text-slate-400">Fill in the gaps with the correct verb form (Tense + Voice).</p>
                </div>
                
                <GapFill 
                    textWithGaps="The simple past is used to describe the island before: Overall, most development [gap] (take place) on... Prior to development, this relatively small island [gap] (be) uninhabited. In terms of natural features, [gap] (there/be) a beach area... Perfect tenses link past to present: A small number of tourist amenities [gap] (build), while the eastern part [gap] (leave) in its natural state."
                    answers={["took place", "was", "there was", "have been built", "has been left"]}
                    hints={["past", "past", "past", "present perfect passive", "present perfect passive"]}
                />
            </div>
        )
    },

    // --- PG 11 ---
    {
        title: "PG 11: Logical Organisation",
        headline: "STRUCTURING YOUR REPORT",
        icon: <ListOrdered size={64} className="text-indigo-500" />,
        content: (
            <div className="space-y-8">
                <div className="bg-slate-900 p-8 rounded-xl border border-slate-700 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Layout size={120} />
                    </div>
                    <h3 className="text-white font-bold mb-6">Structuring Signals</h3>
                    <ul className="space-y-4 text-slate-300 font-serif">
                        <li className="flex items-center gap-3"><ChevronRight className="text-indigo-500"/> The two maps...</li>
                        <li className="flex items-center gap-3"><ChevronRight className="text-indigo-500"/> Overall...</li>
                        <li className="flex items-center gap-3"><ChevronRight className="text-indigo-500"/> Prior to development...</li>
                        <li className="flex items-center gap-3"><ChevronRight className="text-indigo-500"/> Following construction...</li>
                    </ul>
                </div>
                
                <div className="p-4 bg-indigo-900/20 border border-indigo-500/30 rounded-xl text-center">
                    <p className="text-indigo-300 font-bold mb-2">Key Idea: Signposting Topics</p>
                    <p className="text-sm text-slate-400">"In terms of access..." / "Regarding accommodation..."</p>
                </div>
            </div>
        )
    },

    // --- PDF PAGE 1 ---
    {
        title: "8.3: My Model Answer",
        headline: "SPORTS CENTRE MODEL",
        icon: <Trophy size={64} className="text-yellow-500" />,
        content: (
            <div className="space-y-6">
                <div className="bg-slate-900 p-6 rounded-xl border-l-4 border-yellow-500">
                    <h3 className="text-yellow-400 font-bold mb-4">Model Answer</h3>
                    <div className="text-slate-300 text-sm leading-relaxed space-y-4 font-serif">
                        <p>The plans show a university sports centre as it is now and the new layout following its redevelopment. Overall, while some outdoor facilities will be lost, the new centre will be significantly larger and will cater for a wider range of sports.</p>
                        <p>The sports centre currently consists of a relatively small central building with an outdoor court on each side. The building houses a 25-metre pool, with a seating area and changing room, and there is a gym to the rear and a reception area to the front.</p>
                        <p>Following the renovations, only the central pool and its facilities will remain the same. The building will be expanded to the east and west removing the outdoor courts and making way for more indoor facilities. These include a leisure pool on the western side, which will be slightly larger than the existing one and will have its own changing room, and on the eastern side, a new sports hall, and two dance studios. The current gym will be lengthened so that it is double its current size. The reception area will also be widened making it more spacious. On arrival, visitors to the new centre will benefit from a third changing room, a sports shop and a café, all located around the reception area.</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="bg-slate-800 p-3 rounded border border-slate-700">
                        <span className="text-emerald-400 font-bold block">to house</span>
                        to provide space for something
                    </div>
                    <div className="bg-slate-800 p-3 rounded border border-slate-700">
                        <span className="text-emerald-400 font-bold block">to cater for</span>
                        to provide facilities for
                    </div>
                </div>
            </div>
        )
    },

    // --- PDF PAGE 2 ---
    {
        title: "Points to Notice",
        headline: "ANALYSIS & HOMEWORK",
        icon: <Search size={64} className="text-sky-500" />,
        content: (
            <div className="space-y-8">
                <div className="bg-slate-900 p-6 rounded-xl">
                    <h3 className="text-white font-bold mb-4">Points to Notice</h3>
                    <ul className="text-sm text-slate-400 space-y-2 list-disc pl-4">
                        <li>Key features in overview 'prove' the overview statement.</li>
                        <li>Used "On arrival, visitors to the new centre..." to vary language.</li>
                        <li>Only referred to location when it was key information.</li>
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                    <h3 className="text-indigo-900 font-bold mb-4 uppercase tracking-widest text-sm">Self-Check: Your Answer</h3>
                    <Checklist items={[
                        "Did you include: New centre will be bigger?",
                        "Did you include: Wider range of facilities?",
                        "Did you include: Outdoor facilities gone?",
                        "Did you avoid minor details in the overview?",
                        "Is your first body paragraph shorter than the second?"
                    ]} />
                </div>
                
                <div className="bg-cyan-900/20 p-4 rounded-xl border border-cyan-500/30 flex items-center gap-4">
                    <div className="p-3 bg-cyan-900 rounded-full text-cyan-400"><Fish size={24} /></div>
                    <div>
                        <h4 className="text-cyan-400 font-bold text-sm">Upcoming: Process Tasks</h4>
                        <p className="text-xs text-slate-400">Next lesson involves the Salmon Life Cycle.</p>
                    </div>
                </div>
            </div>
        )
    },

    // --- PDF PAGE 3 ---
    {
        title: "Homework: Writing",
        headline: "PROCESS TASK DRILL",
        icon: <PenTool size={64} className="text-indigo-500" />,
        content: (
            <div className="h-full flex flex-col">
                <p className="text-slate-400 mb-4 text-center">Summarise the information by selecting and reporting the main features, and make comparisons where relevant. (Write at least 150 words)</p>
                <div className="flex-1">
                    <WriterConsole />
                </div>
            </div>
        )
    },

    // --- PDF PAGE 4 ---
    {
        title: "Practice: Gap Fill",
        headline: "RECREATE THE MODEL",
        icon: <Edit3 size={64} className="text-purple-500" />,
        content: (
            <div className="space-y-6">
                <p className="text-sm text-slate-400">Fill in the gaps to recreate the model. Add articles, prepositions, and linking words.</p>
                <GapFill 
                    textWithGaps="Following [gap] renovations, only [gap] central pool and its facilities [gap] remain the same. The building [gap] be expanded [gap] the east [gap] west removing [gap] outdoor courts."
                    answers={["the", "the", "will", "will", "to", "and", "the"]}
                    hints={["article", "article", "future", "future", "prep", "conj", "article"]}
                />
                <GapFill 
                    textWithGaps="These include a leisure pool on the [gap] side, which will be slightly [gap] than the existing one and will have its [gap] changing room."
                    answers={["western", "larger", "own"]}
                    hints={["direction", "comp. adj", "possessive"]}
                />
            </div>
        )
    },

    // --- PDF PAGE 5 ---
    {
        title: "Model Answer Key",
        headline: "FULL TEXT REVEAL",
        icon: <BookOpen size={64} className="text-emerald-500" />,
        content: (
            <div className="bg-slate-900 p-8 rounded-xl border border-emerald-500/20 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <CheckCircle2 size={120} />
                </div>
                <div className="text-slate-300 font-serif leading-loose text-sm space-y-4 relative z-10">
                    <p>The plans show a university sports centre as it is now and the new layout following its redevelopment. Overall, while some outdoor facilities will be <strong className="text-emerald-400">lost</strong>, the new centre will be significantly larger and will cater for a wider range of sports.</p>
                    <p>Following the renovations, only the central pool and its facilities will remain the same. The building will be expanded to the east and west removing the outdoor courts and making way for more indoor facilities. These include a leisure pool on the western side, which will be slightly larger than the existing one and will have its own changing room...</p>
                    <p>The current gym will be <strong className="text-emerald-400">lengthened</strong> so that it is double its current size. The reception area will also be <strong className="text-emerald-400">widened</strong>, making it more spacious. <strong className="text-emerald-400">On arrival</strong>, visitors to the new centre will benefit from a third changing room, a sports shop and a café, all located around the reception area.</p>
                </div>
            </div>
        )
    },

    // --- NEW: PDF PAGE 1 (SALMON) ---
    {
        title: "9.3 Model Answer & Improving",
        headline: "SALMON LIFE CYCLE",
        icon: <RefreshCcw size={64} className="text-cyan-500" />,
        content: (
            <div className="space-y-8">
                <div className="bg-white p-4 rounded-xl shadow-lg">
                    <DiagramSalmon />
                </div>
                
                <div className="bg-slate-900 p-6 rounded-xl border border-cyan-500/30">
                    <h3 className="text-cyan-400 font-bold mb-4">Task Analysis</h3>
                    <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                        The question introduces it as <em>"a species of large fish called the salmon"</em>. You don't need to copy this introduction unless it's a rare species.
                    </p>
                    <div className="p-4 bg-slate-800 rounded border border-slate-700">
                        <span className="text-yellow-400 font-bold block text-xs uppercase mb-1">Observation</span>
                        <strong>Arrows:</strong> These can show movement or change. Here they show movement between different habitats (River ↔ Sea).
                    </div>
                </div>
            </div>
        )
    },

    // --- NEW: PDF PAGE 2-4 (ANALYSIS) ---
    {
        title: "Analyzing Details",
        headline: "PAYING ATTENTION",
        icon: <Scan size={64} className="text-indigo-500" />,
        content: (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
                        <h4 className="text-white font-bold mb-2">1. The Key</h4>
                        <p className="text-slate-400 text-xs">The box provides extra info (sizes, names). Note the inverted commas ('fry', 'smolt') - these are technical terms.</p>
                    </div>
                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
                        <h4 className="text-white font-bold mb-2">2. Comparisons</h4>
                        <p className="text-slate-400 text-xs">Look for "where relevant". Compare environments (fast/slow), fish sizes (bigger/longer), or time periods.</p>
                    </div>
                </div>

                <div className="bg-indigo-900/20 p-6 rounded-xl border border-indigo-500/30">
                    <h4 className="text-indigo-400 font-bold mb-4 uppercase text-xs tracking-widest">Identify 4 Key Features</h4>
                    <ul className="grid grid-cols-2 gap-4 text-sm text-slate-300">
                        <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Changes in Habitat</li>
                        <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Physical Appearance</li>
                        <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Time Taken</li>
                        <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Size and Name</li>
                    </ul>
                </div>
            </div>
        )
    },

    // --- NEW: PDF PAGE 10-11 (OVERVIEW) ---
    {
        title: "The Overview",
        headline: "CRITIQUE & CORRECT",
        icon: <Target size={64} className="text-red-500" />,
        content: (
            <div className="space-y-6">
                <p className="text-slate-400 text-sm">Which overview statement is best? Click to see the examiner's feedback.</p>
                <OverviewQuiz />
            </div>
        )
    },

    // --- NEW: PDF PAGE 5 (MODEL) ---
    {
        title: "Model Answer",
        headline: "FULL TEXT ANALYSIS",
        icon: <BookOpen size={64} className="text-emerald-500" />,
        content: (
            <div className="bg-slate-900 p-8 rounded-xl border border-emerald-500/20 shadow-2xl relative overflow-hidden h-full overflow-y-auto">
                <div className="text-slate-300 font-serif leading-loose text-sm space-y-4">
                    <p>The diagram shows the different stages in the life cycle of a salmon. Overall, the cycle takes almost ten years and comprises three main stages, each of which takes place in a different aquatic environment.</p>
                    <p>The salmon begins life as an egg, in the slow-moving waters of the upper river, sheltered by reeds and small stones. Over a period of five to six months, the eggs hatch into very small fish known as ‘fry’, which can grow up to eight centimetres in length. The fry then move to the faster flowing water of the lower river, where they remain for a period of four years and continue to grow. During this phase, they can double or triple in size, reaching 12 to 15 centimetres, and are now referred to as ‘smolt’.</p>
                    <p>At the end of this stage, the smolt leave the river for the open sea, where they will spend the next five years of their life. It is in this salt-water environment that the fish develops its characteristic shape and colouring and reaches its full length of 70 to 76 centimetres, almost ten times its original size. Finally, the adult salmon will return to the slow-moving river to lay its eggs, and the cycle will begin again.</p>
                </div>
                <div className="mt-6 pt-6 border-t border-slate-700">
                    <h4 className="text-emerald-400 font-bold text-xs uppercase mb-2">Points to Notice</h4>
                    <ul className="text-xs text-slate-400 list-disc pl-4 space-y-1">
                        <li>Used inverted commas for 'fry' and 'smolt' only on first mention.</li>
                        <li>Varied tenses: simple present, modals (can grow), passive (are referred to), future (will spend).</li>
                        <li>Grouped stages logically: Stages 1-2 in Para 1, Stage 3 in Para 2.</li>
                    </ul>
                </div>
            </div>
        )
    },

    // --- NEW: PDF PAGE 5 (COHESION) ---
    {
        title: "Coherence & Cohesion",
        headline: "AVOID MECHANICAL LINKS",
        icon: <GitMerge size={64} className="text-pink-500" />,
        content: (
            <div className="space-y-8">
                <div className="bg-red-950/20 p-6 rounded-xl border border-red-900/50">
                    <h3 className="text-red-400 font-bold mb-4">Mechanical Linking (Band 6)</h3>
                    <p className="text-slate-300 font-serif leading-relaxed text-sm">
                        <span className="text-red-400 font-bold">First</span>, the salmon begins life... <span className="text-red-400 font-bold">Next</span>, the eggs hatch... <span className="text-red-400 font-bold">Then</span>, the fry move... <span className="text-red-400 font-bold">After this</span>, they can double... <span className="text-red-400 font-bold">Following this</span>, the smolt leaves... <span className="text-red-400 font-bold">Finally</span>, the adult salmon returns.
                    </p>
                </div>
                <div className="bg-emerald-950/20 p-6 rounded-xl border border-emerald-900/50">
                    <h3 className="text-emerald-400 font-bold mb-4">Natural Flow (Band 8+)</h3>
                    <p className="text-slate-300 font-serif leading-relaxed text-sm">
                        "The salmon begins life... Over a period of five months... The fry then move... During this phase... At the end of this stage..."
                    </p>
                </div>
                <p className="text-center text-xs text-slate-500">Vary the position of your linkers. Don't start every sentence with one.</p>
            </div>
        )
    },

    // --- NEW: PDF PAGE 6 (SHORT ANSWERS) ---
    {
        title: "Improving Short Answers",
        headline: "EXPANDING CONTENT",
        icon: <TrendingDown size={64} className="text-orange-500" />,
        content: (
            <div className="space-y-6">
                <div className="bg-white text-slate-800 p-6 rounded-xl shadow-lg font-serif text-sm">
                    <p className="mb-4">The diagrams show the process through which a kind of fish called the salmon grows into an adult. The lifecycle of the salmon has 3 main stages and takes place in 3 different locations.</p>
                    <p>The cycle begins when salmon eggs are laid among the reeds... (141 words)</p>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                    <div className="bg-slate-900 p-4 rounded border border-orange-500/30">
                        <h4 className="text-orange-400 font-bold text-xs uppercase mb-2">Problem: Too Concise</h4>
                        <p className="text-slate-300 text-xs">"The fry become smolt." -> Needs expansion. What happens? How big do they get?</p>
                    </div>
                    <div className="bg-slate-900 p-4 rounded border border-orange-500/30">
                        <h4 className="text-orange-400 font-bold text-xs uppercase mb-2">Checklist</h4>
                        <ul className="text-slate-400 text-xs list-disc pl-4">
                            <li>Did you miss key features?</li>
                            <li>Did you highlight them enough?</li>
                            <li>Did you make comparisons?</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    },

    // --- NEW: PDF PAGE 12-13 (GAP FILL) ---
    {
        title: "Gap Fill Challenge",
        headline: "RECONSTRUCT THE MODEL",
        icon: <Edit3 size={64} className="text-teal-500" />,
        content: (
            <div className="space-y-6">
                <p className="text-sm text-slate-400">Complete the sentences from the Band 9 model answer.</p>
                <GapFill 
                    textWithGaps="The salmon [gap] life as an egg... The eggs [gap] into very small fish [gap] as 'fry'... The fry then [gap] to the faster flowing water... where they [gap] for a period of four years."
                    answers={["begins", "hatch", "known", "move", "remain"]}
                    hints={["verb", "verb", "verb", "verb", "verb"]}
                />
                <GapFill 
                    textWithGaps="During this phase, they can [gap] or [gap] in size... At the end of this stage, the smolt [gap] the river for the open sea."
                    answers={["double", "triple", "leave"]}
                    hints={["quantifier", "quantifier", "verb"]}
                />
            </div>
        )
    },

    // --- NEW: PDF PAGE 15-17 (IMPROVED ANSWER) ---
    {
        title: "Final Result",
        headline: "IMPROVED ANSWER",
        icon: <CheckCircle2 size={64} className="text-emerald-500" />,
        content: (
            <div className="bg-slate-900 p-8 rounded-xl border border-emerald-500/20 shadow-2xl relative overflow-hidden h-full overflow-y-auto">
                <div className="text-slate-300 font-serif leading-loose text-sm space-y-4">
                    <p>The diagrams show the process through which a kind of fish called the salmon grows into an adult. The lifecycle of the salmon <strong className="text-emerald-400">lasts almost ten years and has three main stages, each taking place in a different location.</strong></p>
                    <p>The cycle begins when salmon eggs are laid among the reeds and the small stones of the upper river. <strong className="text-emerald-400">After around five to six months in the slower moving waters,</strong> these eggs turn into fry, which are 3-8 cm in length and begin to move to <strong className="text-emerald-400">the</strong> lower river where <strong className="text-emerald-400">the</strong> water flow is <strong className="text-emerald-400">faster.</strong></p>
                    <p><strong className="text-emerald-400">The fry live there for four years growing bigger and changing into what are called</strong> smolt, measuring 12-15 cm in length, after which they migrate to <strong className="text-emerald-400">the</strong> open sea. <strong className="text-emerald-400">They live in this new environment for approximately five years developing into</strong> adult salmon <strong className="text-emerald-400">and reaching their full size</strong> (70-76 cm). The adult salmon then begins its journey back to <strong className="text-emerald-400">the</strong> slow-moving upper river, where it lays eggs and the process starts over again. (167 words)</p>
                </div>
                <div className="mt-4 text-center text-xs text-emerald-500 font-bold uppercase tracking-widest">
                    Improvements Highlighted
                </div>
            </div>
        )
    },

    // --- NEW: SUGAR 1 - PROCESS INTRO (PG 1) ---
    {
        title: "10.1: Process Tasks",
        headline: "TRENDS VS STAGES",
        icon: <Sprout size={64} className="text-lime-500" />,
        content: (
            <div className="space-y-8">
                <div className="bg-white p-4 rounded-xl shadow-lg relative overflow-hidden">
                    <DiagramSugar />
                </div>
                
                <div className="bg-slate-900 p-6 rounded-xl border-l-4 border-lime-500">
                    <h3 className="text-lime-400 font-bold mb-4">Core Concept: No Trends</h3>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        Manufacturing processes have <strong>stages</strong>, not trends. A trend requires a starting point and an end point in data (e.g. 1990 to 2000). A process has steps.
                    </p>
                    <div className="p-4 bg-red-950/20 border border-red-500/50 rounded-lg text-sm">
                        <span className="text-red-400 font-bold block mb-1">Incorrect Overview:</span>
                        "The process consists of seven steps of various time length, starting by farming sugar canes and ending by dry sugar."
                    </div>
                </div>
            </div>
        )
    },

    // --- NEW: SUGAR 2 - ANALYSIS (PG 1) ---
    {
        title: "Detailed Observation",
        headline: "CRITICAL ANALYSIS",
        icon: <Scan size={64} className="text-teal-500" />,
        content: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
                    <h4 className="text-white font-bold mb-4">Points to Notice</h4>
                    <ul className="text-sm text-slate-400 space-y-2 list-disc pl-4">
                        <li><strong>Time:</strong> Only given in Step 1 (12-18 months). Don't invent times for other steps.</li>
                        <li><strong>Plurals:</strong> 'Sugar canes' (individual) vs 'Sugar cane' (crop).</li>
                        <li><strong>Arrows:</strong> Two ways of harvesting (machines vs hand).</li>
                    </ul>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
                    <h4 className="text-white font-bold mb-4">Vocabulary Check</h4>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between border-b border-slate-800 pb-2">
                            <span className="text-slate-400">Limestone Filter</span>
                            <span className="text-teal-400 font-mono">Purifying</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-2">
                            <span className="text-slate-400">Centrifuge</span>
                            <span className="text-teal-400 font-mono">Noun (Machine)</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">Juice -> Syrup</span>
                            <span className="text-teal-400 font-mono">Evaporating</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    },

    // --- NEW: SUGAR 3 - UMBRELLA TERMS (PG 2) ---
    {
        title: "Identifying Stages",
        headline: "UMBRELLA TERMS",
        icon: <Umbrella size={64} className="text-indigo-500" />,
        content: (
            <div className="space-y-8">
                <div className="text-center">
                    <p className="text-slate-400 mb-6">Group the specific steps into broader "Main Stages".</p>
                    <UmbrellaSorter />
                </div>
                <div className="bg-indigo-900/20 p-6 rounded-xl border border-indigo-500/30 text-center">
                    <h4 className="text-indigo-400 font-bold mb-2 uppercase text-xs tracking-widest">Why Group?</h4>
                    <p className="text-sm text-slate-300">
                        "The diagram shows the steps involved in the production of sugar. There are two main stages: farming the cane and processing the juice."
                    </p>
                </div>
            </div>
        )
    },

    // --- NEW: SUGAR 4 - LANGUAGE (PG 6) ---
    {
        title: "10.2: Language Mechanics",
        headline: "VERBS & PASSIVES",
        icon: <Filter size={64} className="text-fuchsia-500" />,
        content: (
            <div className="space-y-8">
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
                    <h4 className="text-fuchsia-400 font-bold mb-4">Comprise vs Consist</h4>
                    <div className="space-y-4 text-sm text-slate-300">
                        <div className="p-3 bg-slate-800 rounded">
                            <strong>Comprise</strong> + Noun <br/>
                            <span className="text-slate-500 italic">"The process comprises two stages."</span>
                        </div>
                        <div className="p-3 bg-slate-800 rounded">
                            <strong>Consist of</strong> + Noun/Ing <br/>
                            <span className="text-slate-500 italic">"This consists of growing and harvesting..."</span>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
                    <h4 className="text-fuchsia-400 font-bold mb-4">Passive Voice Rule</h4>
                    <p className="text-sm text-slate-400 mb-4">Use passive when the action is more important than the person doing it.</p>
                    <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                        <div className="text-red-400">Step 1) Growing</div>
                        <div className="text-emerald-400">The sugar cane is grown.</div>
                    </div>
                </div>
            </div>
        )
    },

    // --- NEW: SUGAR 5 - EXERCISE 1 (PG 8) ---
    {
        title: "Grammar Drill",
        headline: "NOUN TO VERB",
        icon: <RefreshCcw size={64} className="text-orange-500" />,
        content: (
            <div className="space-y-6">
                <p className="text-sm text-slate-400">Change the label (Noun) into a full passive sentence (Verb).</p>
                <GapFill 
                    textWithGaps="1) Harvesting the crop -> The crop [gap]. 2) Crushing the plants -> The plants [gap]. 3) Extracting the juice -> The juice [gap]."
                    answers={["is harvested", "are crushed", "is extracted"]}
                    hints={["passive", "passive", "passive"]}
                />
                <GapFill 
                    textWithGaps="4) Purifying the juice -> The juice [gap]. 5) Spinning the syrup -> The syrup [gap]."
                    answers={["is purified", "is spun"]}
                    hints={["passive", "passive"]}
                />
            </div>
        )
    },

    // --- NEW: SUGAR 6 - EXERCISE 2 (PG 8) ---
    {
        title: "Sentence Structure",
        headline: "ORDERING WORDS",
        icon: <ListOrdered size={64} className="text-sky-500" />,
        content: (
            <div className="space-y-6">
                <p className="text-sm text-slate-400">Reconstruct the sentences. Pay attention to 'to + infinitive' for purpose.</p>
                <div className="space-y-4">
                    <WordScramble 
                        words={["produce", "to", "are", "Seeds", "the", "crop", "planted"]}
                        solution="Seeds are planted to produce the crop"
                    />
                    <WordScramble 
                        words={["crushed", "plants", "The", "to", "are", "extract", "juice", "the"]}
                        solution="The plants are crushed to extract the juice"
                    />
                </div>
            </div>
        )
    },

    // --- NEW: SUGAR 7 - COMPLEX SYNTAX (PG 11) ---
    {
        title: "Advanced Grammar",
        headline: "COMBINING SENTENCES",
        icon: <GitMerge size={64} className="text-purple-500" />,
        content: (
            <div className="space-y-8">
                <div className="bg-slate-900 p-6 rounded-xl border border-purple-500/30">
                    <h3 className="text-purple-400 font-bold mb-4">Relative Clauses</h3>
                    <p className="text-slate-300 text-sm mb-4">Avoid repetition by linking result with process.</p>
                    <GapFill 
                        textWithGaps="The juice is passed through a filter, [gap] purifies it. (Relative) / The juice is passed through a filter, [gap] it. (Reduced)"
                        answers={["which", "purifying"]}
                        hints={["relative pronoun", "ing form"]}
                    />
                </div>

                <div className="bg-slate-900 p-6 rounded-xl border border-purple-500/30">
                    <h3 className="text-purple-400 font-bold mb-4">Time Connectors</h3>
                    <p className="text-slate-300 text-sm mb-4">Use 'Once' or 'When' with present perfect passive.</p>
                    <GapFill 
                        textWithGaps="[gap] the crop has been harvested, it is taken to the factory. [gap] the juice has been purified, it is heated."
                        answers={["Once", "After"]}
                        hints={["Connector", "Connector"]}
                    />
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
                 
                 <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`p-2 rounded-full transition-colors text-teal-400 hover:text-teal-300 hover:bg-slate-800 ${isMenuOpen ? 'bg-slate-800' : ''}`}
                    title="Sector Map"
                 >
                    <Grid size={24} />
                 </button>

                 <div>
                     <h1 className="text-xs font-mono text-slate-500 uppercase tracking-[0.3em]">Nexus Masterclass</h1>
                     <div className="text-white font-bold text-lg">LESSON 7-10: MAPS & PROCESSES</div>
                 </div>

                 {isMenuOpen && (
                    <>
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
                                            <span className="opacity-50 text-[10px] uppercase">Page {i + 1}</span>
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
                 <span className="font-bold text-sm uppercase tracking-wider">Previous Page</span>
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
                 <span className="font-black text-sm uppercase tracking-wider">{currentSlide === slides.length - 1 ? 'Complete Masterclass' : 'Next Page'}</span>
                 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
             </button>
        </footer>
    </div>
  );
};

export default NexusMasterclass;
