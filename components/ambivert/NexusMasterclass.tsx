
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Zap, Target, BookOpen, AlertTriangle, ShieldCheck, PenTool, CheckCircle2, X, FileWarning, EyeOff, Link, Hammer, Layers, RefreshCcw, ListOrdered, Bug, GitMerge, Timer, Scan, Highlighter, Layout, Split, Move, Quote, Map, BarChart2, PieChart, Table, MousePointer2, Activity, Menu, Grid, RotateCcw, ChevronRight, Hash, TrendingUp, Search, Umbrella, Edit3, Check, Clock, TrendingDown, ClipboardCheck, ArrowDown, Headphones } from 'lucide-react';
import ChartDualView from '../features/ChartDualView';
import InteractiveMap from '../features/InteractiveMap';
import ChartHousing from '../features/ChartHousing';
import Chart3D from '../features/Chart3D';
import ChartCoffee from '../features/ChartCoffee';
import ChartFish from '../features/ChartFish';

// --- MICRO-COMPONENTS FOR INTERACTIVITY ---

const GapFill = ({ textWithGaps, answers }: { textWithGaps: string, answers: string[] }) => {
    // textWithGaps format: "Some text [gap] more text."
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
                                className={`bg-slate-800 border-b-2 border-indigo-500/50 text-indigo-300 px-2 py-0 w-32 focus:outline-none focus:border-indigo-400 text-center transition-colors ${showAnswers && inputs[i].toLowerCase().trim() === answers[i].toLowerCase() ? 'text-emerald-400 border-emerald-500' : ''}`}
                            />
                            {showAnswers && (
                                <div className="absolute top-full left-0 w-full text-[10px] text-emerald-500 font-sans font-bold text-center bg-slate-900 z-10 border border-emerald-900 rounded shadow-xl mt-1">
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

const VocabSorter = () => {
    const categories = [
        "BUILDING MATERIALS", "FURNITURE", "PARTS OF A BUILDING", 
        "EXTERNAL FEATURES", "FACILITIES", "TYPES OF BUILDINGS", "NATURAL FEATURES"
    ];
    
    const initialWords = [
        { id: 1, text: "shed", cat: "TYPES OF BUILDINGS" },
        { id: 2, text: "stairway", cat: "PARTS OF A BUILDING" },
        { id: 3, text: "concrete", cat: "BUILDING MATERIALS" },
        { id: 4, text: "footpath", cat: "EXTERNAL FEATURES" },
        { id: 5, text: "toilets", cat: "FACILITIES" },
        { id: 6, text: "roof", cat: "PARTS OF A BUILDING" },
        { id: 7, text: "cupboard", cat: "FURNITURE" },
        { id: 8, text: "cafe", cat: "FACILITIES" },
        { id: 9, text: "corridor", cat: "PARTS OF A BUILDING" },
        { id: 10, text: "stone", cat: "BUILDING MATERIALS" },
        { id: 11, text: "entrance", cat: "PARTS OF A BUILDING" },
        { id: 12, text: "table", cat: "FURNITURE" },
        { id: 13, text: "chair", cat: "FURNITURE" },
        { id: 14, text: "vegetation", cat: "NATURAL FEATURES" },
        { id: 15, text: "desk", cat: "FURNITURE" },
        { id: 16, text: "driveway", cat: "EXTERNAL FEATURES" },
        { id: 17, text: "block of flats", cat: "TYPES OF BUILDINGS" },
        { id: 18, text: "beach", cat: "NATURAL FEATURES" },
        { id: 19, text: "wood", cat: "BUILDING MATERIALS" },
        { id: 20, text: "changing rooms", cat: "FACILITIES" },
        { id: 21, text: "garden", cat: "EXTERNAL FEATURES" },
        { id: 22, text: "lake", cat: "NATURAL FEATURES" },
        { id: 23, text: "cliff", cat: "NATURAL FEATURES" },
        { id: 24, text: "hut", cat: "TYPES OF BUILDINGS" },
        { id: 25, text: "car park", cat: "EXTERNAL FEATURES" },
        { id: 26, text: "glass", cat: "BUILDING MATERIALS" },
        { id: 27, text: "restaurant", cat: "FACILITIES" },
    ];

    const [words, setWords] = useState(initialWords);
    const [selectedWord, setSelectedWord] = useState<number | null>(null);
    const [assignments, setAssignments] = useState<Record<string, number[]>>({}); // Category -> Word IDs

    const handleWordClick = (id: number) => {
        setSelectedWord(id);
    };

    const handleCategoryClick = (cat: string) => {
        if (selectedWord === null) return;
        
        // Correct check?
        const word = words.find(w => w.id === selectedWord);
        if (word) {
            setAssignments(prev => ({
                ...prev,
                [cat]: [...(prev[cat] || []), word.id]
            }));
            setWords(prev => prev.filter(w => w.id !== selectedWord));
            setSelectedWord(null);
        }
    };

    const isCorrect = (cat: string, id: number) => {
        const word = initialWords.find(w => w.id === id);
        return word?.cat === cat;
    };

    return (
        <div className="space-y-6">
            {/* Word Bank */}
            <div className="flex flex-wrap gap-2 min-h-[100px] p-4 bg-slate-900 rounded-xl border border-slate-700">
                {words.map(w => (
                    <button
                        key={w.id}
                        onClick={() => handleWordClick(w.id)}
                        className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${selectedWord === w.id ? 'bg-indigo-500 text-white shadow-lg scale-110 ring-2 ring-indigo-300' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                    >
                        {w.text}
                    </button>
                ))}
                {words.length === 0 && <div className="text-slate-500 text-sm italic w-full text-center py-2">All items sorted!</div>}
            </div>

            {/* Categories */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map(cat => (
                    <div 
                        key={cat}
                        onClick={() => handleCategoryClick(cat)}
                        className={`p-3 rounded-lg border-2 border-dashed transition-colors min-h-[120px] relative ${selectedWord ? 'border-indigo-500/50 bg-indigo-900/10 cursor-pointer hover:bg-indigo-900/30' : 'border-slate-700 bg-slate-900/50'}`}
                    >
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-2">{cat}</h4>
                        <div className="flex flex-wrap gap-1">
                            {assignments[cat]?.map(id => {
                                const word = initialWords.find(w => w.id === id);
                                const correct = isCorrect(cat, id);
                                return (
                                    <span key={id} className={`px-2 py-0.5 rounded text-[10px] font-bold ${correct ? 'bg-emerald-900/50 text-emerald-400 border border-emerald-500/30' : 'bg-red-900/50 text-red-400 border border-red-500/30'}`}>
                                        {word?.text}
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Interactive Text Error Spotter
const TextErrorSpotter = ({ text, errors }: { text: string, errors: { id: number, match: string, correction: string, note: string }[] }) => {
    const [activeError, setActiveError] = useState<number | null>(null);

    return (
        <div className="bg-[#1e1e24] p-6 rounded-lg border-l-4 border-red-500 shadow-xl leading-8 text-slate-300 font-serif text-lg">
            {text.split('__').map((segment, i) => {
                const err = errors.find(e => e.match === segment);
                if (err) {
                    return (
                        <span key={i} className="relative inline-block mx-1">
                            <button
                                onClick={() => setActiveError(err.id)}
                                className={`px-1 rounded border-b-2 transition-all ${activeError === err.id ? 'bg-red-900/50 border-red-400 text-white' : 'border-red-500/50 text-red-200 hover:bg-red-900/20'}`}
                            >
                                {segment}
                            </button>
                            {activeError === err.id && (
                                <div className="absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-slate-900 border border-red-500 rounded p-3 shadow-xl animate-pop-in">
                                    <div className="text-xs font-bold text-red-400 mb-1">PROBLEM:</div>
                                    <div className="text-xs text-slate-300 mb-2">{err.note}</div>
                                    <div className="text-xs font-bold text-emerald-400">FIX: {err.correction}</div>
                                </div>
                            )}
                        </span>
                    )
                }
                return <span key={i}>{segment}</span>
            })}
        </div>
    )
}

const AnnotatedFishChart = ({ focus }: { focus: 'all' | 'chicken' | 'beef' | 'lamb_fish' }) => {
    const opacity = (target: string) => focus === 'all' || focus === target ? 1 : 0.2;
    const stroke = (target: string) => focus === 'all' || focus === target ? 3 : 1;

    return (
        <div className="relative w-full aspect-video bg-white rounded-xl shadow-lg p-6 border-4 border-slate-200">
            <div className="absolute top-2 left-4 text-xs font-bold text-slate-400">Grams / person / week</div>
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                {[0, 25, 50, 75, 100].map(y => <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#f1f5f9" strokeWidth="1" />)}
                
                <path d="M 0 50 L 20 45 L 40 30 L 60 25 L 80 20 L 100 10" fill="none" stroke="#22c55e" strokeWidth={stroke('chicken')} opacity={opacity('chicken')} />
                <path d="M 0 20 L 20 30 L 40 25 L 60 40 L 80 50 L 100 60" fill="none" stroke="#ef4444" strokeWidth={stroke('beef')} opacity={opacity('beef')} />
                <path d="M 0 50 L 20 55 L 40 60 L 60 70 L 80 75 L 100 80" fill="none" stroke="#3b82f6" strokeWidth={stroke('lamb_fish')} opacity={opacity('lamb_fish')} />
                <path d="M 0 80 L 100 82" fill="none" stroke="#f97316" strokeWidth={stroke('lamb_fish')} opacity={opacity('lamb_fish')} />
            </svg>
            <div className="absolute bottom-2 left-6 right-6 flex justify-between text-[8px] text-slate-500 font-mono">
                <span>1979</span><span>1984</span><span>1989</span><span>1994</span><span>1999</span><span>2004</span>
            </div>
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

  useEffect(() => {
    setAnimate(false);
    setTimeout(() => setAnimate(true), 50);
  }, [currentSlide]);

  const slides = [
    // --- PDF PAGE 1 ---
    {
      title: "PDF PG 1: CONSUMPTION TRENDS",
      headline: "LISTENING TASK",
      icon: <Headphones size={64} className="text-indigo-500" />,
      content: (
        <div className="space-y-8">
           <div className="flex flex-col md:flex-row gap-8 items-center">
               <div className="w-full md:w-1/2">
                   <ChartFish />
                   <p className="text-[10px] text-slate-500 mt-2 text-center font-mono">FIG 1.1: FISH & MEAT CONSUMPTION (1979-2004)</p>
               </div>
               <div className="w-full md:w-1/2">
                   <div className="bg-indigo-950/30 p-4 border-l-4 border-indigo-500 mb-4">
                       <h4 className="text-indigo-400 font-bold mb-1">Instructions</h4>
                       <p className="text-sm text-slate-300">Read the model answer logic below and complete the missing data points based on the graph.</p>
                   </div>
                   <GapFill 
                     textWithGaps="The [gap] shows the weekly consumption of fish and three [gap] meat in one European country from 1979 to 2004. Although there [gap], overall, people in this country [gap] more meat [gap], and the [gap] was to move [gap] beef and lamb as chicken became [gap] food in this category."
                     answers={["line graph", "types of", "were fluctuations", "consistently ate", "than fish", "general trend", "away from", "dominant"]}
                   />
               </div>
           </div>
        </div>
      )
    },

    // --- PDF PAGE 2 ---
    {
        title: "PDF PG 2: MODEL ANSWER",
        headline: "BAND 9 MODEL ANALYSIS",
        icon: <CheckCircle2 size={64} className="text-emerald-500" />,
        content: (
            <div className="space-y-8">
                <div className="bg-slate-900 p-8 rounded-2xl border border-emerald-500/20 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Quote size={100} />
                    </div>
                    <h3 className="text-emerald-400 font-bold mb-6 uppercase tracking-widest text-sm border-b border-emerald-900/50 pb-2">Full Response</h3>
                    <div className="space-y-6 text-slate-300 font-serif leading-loose text-lg">
                        <p><span className="text-white font-bold bg-emerald-900/50 px-1">The line graph shows variations</span> in the weekly consumption of fish and three types of meat in one European country from 1979 to 2004. Although there <span className="text-emerald-400 border-b border-emerald-500/50">were fluctuations</span>, overall, people in this country consistently ate more meat than fish, and the <span className="text-emerald-400 border-b border-emerald-500/50">general trend</span> was to move away from beef and lamb as chicken became the dominant food.</p>
                        
                        <p>In the first decade, beef was consumed in significantly higher quantities than the other foods listed. Despite an <span className="text-emerald-400 border-b border-emerald-500/50">initial sharp fall</span> to approximately 175 grams, it then recovered reaching a high of close to 240 grams per week. However, from 1989 onwards, beef consumption <span className="text-emerald-400 border-b border-emerald-500/50">fell almost continually</span>, and by 2004 had almost halved.</p>
                        
                        <p>In contrast, chicken <span className="text-emerald-400 border-b border-emerald-500/50">climbed from</span> less than 150 grams in 1979 and <span className="text-emerald-400 border-b border-emerald-500/50">took the lead</span> from around 1990 onwards. Interestingly, the increases in chicken <span className="text-emerald-400 border-b border-emerald-500/50">corresponded with the declines</span> in beef and lamb.</p>
                    </div>
                </div>
            </div>
        )
    },

    // --- PDF PAGE 3 ---
    {
        title: "PDF PG 3: LESSON 7 - MAPS",
        headline: "MODULE OVERVIEW: MAPS",
        icon: <Map size={64} className="text-blue-500" />,
        content: (
            <div className="flex flex-col items-center justify-center h-full py-12">
                <div className="bg-blue-950/20 p-12 rounded-full mb-8 border border-blue-500/20 animate-pulse">
                    <Map size={80} className="text-blue-400" />
                </div>
                <h2 className="text-4xl font-black text-white mb-2">LESSON 7: MAP TASKS</h2>
                <div className="h-1 w-24 bg-blue-500 rounded-full mb-8"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                    {[
                        { id: "7.1", text: "How map tasks are different" },
                        { id: "7.2", text: "Common problems in map tasks" },
                        { id: "7.3", text: "My model answer" }
                    ].map(item => (
                        <div key={item.id} className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-blue-500 transition-all cursor-default group">
                            <span className="block text-blue-500 font-mono text-xs mb-2 group-hover:text-blue-400">SECTION {item.id}</span>
                            <span className="text-slate-300 font-bold group-hover:text-white">{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        )
    },

    // --- PDF PAGE 4 ---
    {
        title: "PDF PG 4: MAP FUNDAMENTALS",
        headline: "LANGUAGE & VOCABULARY",
        icon: <BookOpen size={64} className="text-amber-500" />,
        content: (
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="bg-slate-900 p-6 rounded-xl border-l-4 border-amber-500">
                            <h4 className="text-amber-500 font-bold mb-2 flex items-center gap-2"><Clock size={16}/> Tenses & Voice</h4>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Unlike charts (active voice), map tasks often use the <strong>Passive Voice</strong>.
                                <br/><br/>
                                <span className="text-slate-500 italic">"The coffee was sold..."</span> (Chart)<br/>
                                <span className="text-white font-bold">"The school was constructed..."</span> (Map)
                            </p>
                        </div>
                        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                            <h4 className="text-white font-bold mb-4">Umbrella Terms</h4>
                            <ul className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                                <li>• Natural features</li>
                                <li>• Outdoor spaces</li>
                                <li>• Types of Buildings</li>
                                <li>• Facilities</li>
                                <li>• Parts of a building</li>
                                <li>• Transport</li>
                            </ul>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-lg transform rotate-1">
                        <InteractiveMap />
                        <p className="text-center text-slate-500 text-[10px] mt-2 font-mono">FIG 4.1: ISLAND BEFORE CONSTRUCTION</p>
                    </div>
                </div>
            </div>
        )
    },

    // --- PDF PAGE 5 ---
    {
        title: "PDF PG 5: KEY FEATURES",
        headline: "READING THE MAP",
        icon: <Scan size={64} className="text-purple-500" />,
        content: (
            <div className="space-y-8">
                <div className="flex justify-center gap-4 mb-8">
                    <div className="bg-slate-800 px-6 py-3 rounded-lg border border-slate-700 text-xs font-mono text-slate-300 flex items-center gap-3">
                        <div className="w-12 h-1 bg-slate-500 relative"><div className="absolute -top-1 w-px h-3 bg-white left-0"></div><div className="absolute -top-1 w-px h-3 bg-white right-0"></div></div>
                        SCALE: 100m
                    </div>
                    <div className="bg-slate-800 px-6 py-3 rounded-lg border border-slate-700 text-xs font-mono text-slate-300 flex items-center gap-3">
                        <Move size={16} /> COMPASS: N/S/E/W
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-purple-950/20 p-6 rounded-xl border border-purple-500/30">
                        <h3 className="text-purple-400 font-bold mb-4 uppercase tracking-widest text-sm">Target Features</h3>
                        <ul className="space-y-3 text-slate-300 text-sm">
                            <li className="flex items-center gap-2"><Check size={14} className="text-purple-500"/> Features <strong>added</strong> (new buildings)</li>
                            <li className="flex items-center gap-2"><Check size={14} className="text-purple-500"/> Features <strong>removed</strong> (trees cleared)</li>
                            <li className="flex items-center gap-2"><Check size={14} className="text-purple-500"/> Features <strong>expanded</strong> (made bigger)</li>
                            <li className="flex items-center gap-2"><Check size={14} className="text-purple-500"/> Features <strong>converted</strong> (changed use)</li>
                        </ul>
                    </div>
                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                        <h3 className="text-slate-400 font-bold mb-4 uppercase tracking-widest text-sm">Passive Verbs</h3>
                        <div className="flex flex-wrap gap-2">
                            {['was constructed', 'were demolished', 'has been erected', 'was converted', 'were chopped down'].map((v, i) => (
                                <span key={i} className="px-3 py-1 bg-slate-800 text-purple-300 rounded-full text-xs font-bold border border-slate-700">{v}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    },

    // --- PDF PAGE 6 ---
    {
        title: "PDF PG 6: AFTER DEVELOPMENT",
        headline: "ANALYZING CHANGES",
        icon: <Search size={64} className="text-teal-500" />,
        content: (
            <div className="space-y-8">
                <div className="bg-white p-6 rounded-xl shadow-2xl relative">
                    <InteractiveMap />
                    
                    {/* Annotations Overlay Simulation */}
                    <div className="absolute top-1/4 left-1/4">
                        <div className="relative group">
                            <div className="w-4 h-4 rounded-full bg-teal-500 animate-ping absolute"></div>
                            <div className="w-4 h-4 rounded-full bg-teal-500 relative border-2 border-white"></div>
                            <div className="absolute left-6 top-0 bg-black/80 text-teal-300 text-[10px] px-2 py-1 rounded w-32 opacity-0 group-hover:opacity-100 transition-opacity">
                                Accomodation Cluster (West)
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-1/3 right-1/3">
                        <div className="relative group">
                            <div className="w-4 h-4 rounded-full bg-amber-500 animate-ping absolute"></div>
                            <div className="w-4 h-4 rounded-full bg-amber-500 relative border-2 border-white"></div>
                            <div className="absolute left-6 top-0 bg-black/80 text-amber-300 text-[10px] px-2 py-1 rounded w-32 opacity-0 group-hover:opacity-100 transition-opacity">
                                Central Amenities (Restaurant)
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="flex justify-center gap-4 text-xs text-slate-400 font-mono uppercase">
                    <span>Key Areas:</span>
                    <span className="text-white">Accommodation</span>
                    <span className="text-white">Amenities</span>
                    <span className="text-white">Leisure</span>
                </div>
            </div>
        )
    },

    // --- PDF PAGE 7 ---
    {
        title: "PDF PG 7: ORGANISATION",
        headline: "STRUCTURAL LOGIC",
        icon: <Layout size={64} className="text-pink-500" />,
        content: (
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-red-950/20 p-6 rounded-xl border border-red-500/30">
                        <div className="flex items-center gap-2 text-red-500 font-bold mb-4">
                            <X size={20} /> THE LIST METHOD
                        </div>
                        <h4 className="text-white font-bold mb-2">By Compass Point</h4>
                        <div className="text-xs text-slate-400 leading-relaxed">
                            "In the North there is X. In the South there is Y. In the East there is Z..."
                            <br/><br/>
                            <span className="text-red-400">Result:</span> Creates a boring list. Fails to group related information (e.g. all housing).
                        </div>
                    </div>

                    <div className="bg-emerald-950/20 p-6 rounded-xl border border-emerald-500/30">
                        <div className="flex items-center gap-2 text-emerald-500 font-bold mb-4">
                            <Check size={20} /> THE GROUPING METHOD
                        </div>
                        <h4 className="text-white font-bold mb-2">By Time / Category</h4>
                        <div className="text-xs text-slate-400 leading-relaxed">
                            <strong>Para 1:</strong> The island Before + What was kept (Trees).<br/>
                            <strong>Para 2:</strong> The island After + All new construction grouped by function (Housing, Services).
                            <br/><br/>
                            <span className="text-emerald-400">Result:</span> Clear comparison. Logical flow.
                        </div>
                    </div>
                </div>
            </div>
        )
    },

    // --- PDF PAGE 8 ---
    {
        title: "PDF PG 8: VOCABULARY LAB",
        headline: "CATEGORIZATION DRILL",
        icon: <Grid size={64} className="text-indigo-500" />,
        content: (
            <div className="space-y-6">
                <div className="bg-indigo-950/20 p-4 rounded-lg border border-indigo-500/30 text-center">
                    <p className="text-indigo-300 text-sm">Drag or click the words to assign them to the correct <strong>Umbrella Term</strong>.</p>
                </div>
                <VocabSorter />
            </div>
        )
    },

    // --- PDF PAGE 9 ---
    {
        title: "PDF PG 9: ANSWER KEY",
        headline: "VERIFICATION",
        icon: <ClipboardCheck size={64} className="text-slate-400" />,
        content: (
            <div className="bg-white text-slate-900 p-8 rounded-xl shadow-2xl overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-100 border-b-2 border-slate-300">
                            <th className="p-2 font-bold">NATURAL FEATURES</th>
                            <th className="p-2 font-bold">PARTS OF BUILDING</th>
                            <th className="p-2 font-bold">TYPES OF BUILDINGS</th>
                            <th className="p-2 font-bold">EXTERNAL FEATURES</th>
                            <th className="p-2 font-bold">MATERIALS</th>
                            <th className="p-2 font-bold">FURNITURE</th>
                        </tr>
                    </thead>
                    <tbody className="align-top">
                        <tr>
                            <td className="p-2">
                                lake<br/>cliff<br/>beach<br/>vegetation
                            </td>
                            <td className="p-2">
                                entrance<br/>corridor<br/>roof<br/>stairway
                            </td>
                            <td className="p-2">
                                shed<br/>hut<br/>block of flats
                            </td>
                            <td className="p-2">
                                garden<br/>driveway<br/>footpath<br/>car park
                            </td>
                            <td className="p-2">
                                glass<br/>concrete<br/>stone<br/>wood
                            </td>
                            <td className="p-2">
                                desk<br/>cupboard<br/>chair<br/>table
                            </td>
                        </tr>
                    </tbody>
                </table>
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
                     <div className="text-white font-bold text-lg">PDF INTEGRATION PROTOCOLS</div>
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
