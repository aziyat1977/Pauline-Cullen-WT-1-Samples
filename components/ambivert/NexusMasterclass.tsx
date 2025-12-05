
import React, { useState, useEffect, useCallback } from 'react';
import { 
  ArrowLeft, ArrowRight, Zap, BookOpen, AlertTriangle, ShieldCheck, 
  PenTool, CheckCircle2, X, Eye, 
  RefreshCcw, ListOrdered, GitMerge,  
  Move, Map, BarChart2, MousePointer2, 
  Grid, ChevronRight, TrendingUp, Search, 
  Clock, TrendingDown, ArrowDown, 
  Trophy, Fish, ArrowUp, Factory, 
  Keyboard, Anchor, Layers, Activity,
  Split, Hash, Check,
  Database, FileText, Edit3, FastForward
} from 'lucide-react';
import Confetti from '../ui/Confetti';
import MapSports from '../features/MapSports';
import DiagramSalmon from '../features/DiagramSalmon';
import ChartTransport from '../features/ChartTransport';
import ChartTea from '../features/ChartTea';

// --- MICRO-COMPONENTS ---

const TypewriterText = ({ text, speed = 15, onComplete }: { text: string, speed?: number, onComplete?: () => void }) => {
    const [displayed, setDisplayed] = useState('');
    
    useEffect(() => {
        setDisplayed('');
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayed(prev => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
                if (onComplete) onComplete();
            }
        }, speed);
        return () => clearInterval(timer);
    }, [text, speed, onComplete]);

    return <span className="font-mono text-emerald-400 leading-relaxed">{displayed}<span className="animate-pulse text-emerald-600">_</span></span>;
};

const GapFill = ({ textWithGaps, answers, hints = [] }: { textWithGaps: string, answers: string[], hints?: string[] }) => {
    const parts = textWithGaps.split(/\[gap\]/g);
    const [inputs, setInputs] = useState<string[]>(Array(parts.length - 1).fill(''));
    const [status, setStatus] = useState<'idle' | 'success'>('idle');

    useEffect(() => {
        const isComplete = inputs.every((val, i) => val.toLowerCase().trim() === answers[i].toLowerCase());
        if (isComplete && status !== 'success') {
            setStatus('success');
        }
    }, [inputs, answers, status]);

    return (
        <div className={`p-6 rounded-xl border transition-all duration-500 ${status === 'success' ? 'bg-emerald-950/30 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]' : 'bg-slate-900/50 border-slate-700 shadow-inner'}`}>
            <div className="font-serif text-lg leading-loose text-slate-300">
                {parts.map((part, i) => (
                    <React.Fragment key={i}>
                        {part}
                        {i < parts.length - 1 && (
                            <span className="relative inline-block mx-1 group align-baseline">
                                <input 
                                    type="text" 
                                    value={inputs[i]}
                                    onChange={(e) => {
                                        const newInputs = [...inputs];
                                        newInputs[i] = e.target.value;
                                        setInputs(newInputs);
                                    }}
                                    className={`bg-slate-800 border-b-2 px-2 py-0 min-w-[100px] focus:outline-none text-center transition-all font-sans ${
                                        inputs[i].toLowerCase().trim() === answers[i].toLowerCase() 
                                        ? 'text-emerald-400 border-emerald-500 font-bold bg-emerald-900/20' 
                                        : 'text-indigo-300 border-indigo-500/50 focus:border-indigo-400 focus:bg-slate-700'
                                    }`}
                                    disabled={status === 'success'}
                                />
                                {status !== 'success' && hints[i] && (
                                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-[10px] text-slate-400 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-slate-700 z-10">
                                        Hint: {hints[i]}
                                    </span>
                                )}
                            </span>
                        )}
                    </React.Fragment>
                ))}
            </div>
            {status === 'success' && (
                <div className="mt-6 flex items-center justify-center gap-2 text-emerald-400 font-bold animate-pop-in bg-emerald-950/50 py-2 rounded-lg border border-emerald-900/50">
                    <CheckCircle2 size={18} /> Neural Sequence Verified.
                </div>
            )}
        </div>
    );
};

const TextHighlighter = ({ text, targets }: { text: string, targets: string[] }) => {
    const [selected, setSelected] = useState<number[]>([]);
    const [showResult, setShowResult] = useState(false);
    
    // Split by spaces but keep punctuation attached to word for display, clean for check
    const words = text.split(/(\s+)/);

    const toggleWord = (index: number) => {
        if (showResult) return;
        // Don't select spaces
        if (!words[index].trim()) return;
        
        if (selected.includes(index)) {
            setSelected(prev => prev.filter(i => i !== index));
        } else {
            setSelected(prev => [...prev, index]);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-[#0f172a] text-slate-300 p-8 rounded-xl shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] border border-slate-800 font-serif text-lg leading-loose selection:bg-indigo-500/30 text-justify">
                {words.map((word, i) => {
                    const cleanWord = word.trim().replace(/[.,;:()]/g, '').toLowerCase();
                    // Check if this word is part of any target phrase or is a target itself
                    const isTarget = targets.some(t => {
                        const tClean = t.toLowerCase();
                        return cleanWord === tClean || (tClean.includes(' ') && tClean.includes(cleanWord));
                    });

                    // Simple check: does the cleaned word match any target exactly? 
                    // For more complex multi-word highlighting, we'd need more logic, keeping it simple for "surgical" single word/short phrase detection.
                    const isStrictTarget = targets.some(t => t.toLowerCase() === cleanWord);
                    
                    const isSelected = selected.includes(i);
                    const isCorrect = isSelected && isStrictTarget;
                    const isMissed = showResult && isStrictTarget && !isSelected;
                    const isWrong = showResult && isSelected && !isStrictTarget;

                    if (!word.trim()) return <span key={i}>{word}</span>;

                    return (
                        <span 
                            key={i}
                            onClick={() => toggleWord(i)}
                            className={`
                                transition-all duration-200 cursor-pointer rounded px-1 py-0.5 mx-[1px]
                                ${isSelected ? 'bg-indigo-600/50 text-white shadow-[0_0_10px_rgba(79,70,229,0.4)]' : 'hover:bg-slate-800 hover:text-white'}
                                ${isCorrect && showResult ? '!bg-emerald-500/50 !text-emerald-100 !shadow-[0_0_15px_rgba(16,185,129,0.4)]' : ''}
                                ${isWrong && showResult ? '!bg-red-500/50 !text-red-100 line-through decoration-red-400' : ''}
                                ${isMissed ? 'border-b-2 border-emerald-500 text-emerald-400' : ''}
                            `}
                        >
                            {word}
                        </span>
                    )
                })}
            </div>
            <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                <p className="text-xs text-slate-400 font-mono flex items-center gap-2"><MousePointer2 size={12}/> INTERACTION REQ: IDENTIFY KEY VOCABULARY</p>
                <button 
                    onClick={() => setShowResult(!showResult)} 
                    className={`px-6 py-2 text-white rounded-sm font-black text-[10px] uppercase tracking-[0.2em] transition-all ${showResult ? 'bg-slate-700' : 'bg-indigo-600 hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)]'}`}
                >
                    {showResult ? 'RESET SYSTEM' : 'RUN DIAGNOSTIC'}
                </button>
            </div>
        </div>
    )
}

const CategoryBucket = ({ title, items, color, onRemove }: { title: string, items: string[], color: string, onRemove: (item: string) => void }) => {
    return (
        <div className={`min-h-[160px] rounded-xl border-2 border-dashed ${color} bg-opacity-5 p-4 flex flex-col items-center transition-all hover:bg-opacity-10 bg-slate-900/30`}>
            <h4 className="font-black text-xs uppercase tracking-widest mb-4 opacity-80 text-white">{title}</h4>
            <div className="flex flex-wrap gap-2 justify-center w-full content-start">
                {items.map(item => (
                    <button 
                        key={item} 
                        onClick={() => onRemove(item)}
                        className="px-2 py-1 bg-slate-800 rounded text-[10px] text-white border border-slate-600 hover:bg-red-900/50 hover:border-red-500 transition-colors animate-pop-in shadow-sm flex items-center gap-1 group"
                    >
                        {item} <X size={8} className="opacity-0 group-hover:opacity-100"/>
                    </button>
                ))}
            </div>
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

    const handleSelect = (word: string) => {
        if (selected === word) setSelected(null);
        else setSelected(word);
    };
    
    const handlePlace = (category: 'time' | 'movement' | 'change') => {
        if (!selected) return;
        setCats(prev => ({ ...prev, [category]: [...prev[category], selected] }));
        setPool(prev => prev.filter(w => w !== selected));
        setSelected(null);
    }

    const handleRemove = (item: string, category: 'time' | 'movement' | 'change') => {
        setCats(prev => ({ ...prev, [category]: prev[category].filter(i => i !== item) }));
        setPool(prev => [...prev, item]);
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-2 p-6 bg-slate-900/80 rounded-xl min-h-[80px] border border-slate-700 shadow-inner items-center justify-center">
                {pool.length === 0 && <span className="text-emerald-500 font-bold animate-pulse flex items-center gap-2"><Check size={16}/> ALL UNITS SORTED</span>}
                {pool.map(word => (
                    <button 
                        key={word} 
                        onClick={() => handleSelect(word)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${selected === word ? 'bg-indigo-500 border-indigo-400 text-white scale-110 shadow-[0_0_15px_rgba(99,102,241,0.6)] z-10' : 'bg-slate-800 border-slate-600 text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                    >
                        {word}
                    </button>
                ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div onClick={() => handlePlace('time')} className="cursor-pointer group">
                    <CategoryBucket title="Time / Duration" items={cats.time} color="border-blue-500 text-blue-400" onRemove={(i) => handleRemove(i, 'time')} />
                </div>
                <div onClick={() => handlePlace('movement')} className="cursor-pointer group">
                    <CategoryBucket title="Movement" items={cats.movement} color="border-emerald-500 text-emerald-400" onRemove={(i) => handleRemove(i, 'movement')} />
                </div>
                <div onClick={() => handlePlace('change')} className="cursor-pointer group">
                    <CategoryBucket title="Physical Change" items={cats.change} color="border-amber-500 text-amber-400" onRemove={(i) => handleRemove(i, 'change')} />
                </div>
            </div>
        </div>
    )
}

const WordScramble = ({ words, solution }: { words: string[], solution: string }) => {
    const [currentOrder, setCurrentOrder] = useState<string[]>([]);
    const [available, setAvailable] = useState<string[]>(words);
    const [solved, setSolved] = useState(false);

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
        
        // Normalize for checking (ignore case/punctuation for simpler logic if needed, but here exact match)
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
        <div className={`p-6 rounded-xl border transition-all duration-500 ${solved ? 'bg-emerald-900/20 border-emerald-500/50' : 'bg-slate-900 border-slate-700'}`}>
            <div className={`min-h-[60px] bg-black/20 rounded-lg p-4 mb-6 flex flex-wrap gap-2 items-center justify-center border transition-colors ${solved ? 'border-emerald-500/30' : 'border-white/5'}`}>
                {currentOrder.map((w, i) => (
                    <button key={i} onClick={() => handleRemove(w)} disabled={solved} className="px-3 py-1.5 bg-indigo-600 text-white rounded-md shadow-lg text-sm font-medium hover:bg-red-500 transition-colors animate-pop-in">
                        {w}
                    </button>
                ))}
                {currentOrder.length === 0 && <span className="text-slate-600 italic text-xs uppercase tracking-widest">Awaiting Syntax Construction...</span>}
            </div>
            
            {solved ? (
                <div className="flex flex-col items-center gap-2 animate-fade-in-up">
                    <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-black shadow-[0_0_20px_rgba(16,185,129,0.5)] animate-bounce">
                        <CheckCircle2 size={24} />
                    </div>
                    <span className="text-emerald-400 font-bold text-sm uppercase tracking-widest">Syntax Validated</span>
                </div>
            ) : (
                <div className="flex flex-wrap gap-2 justify-center">
                    {available.map((w, i) => (
                        <button key={i} onClick={() => handleAdd(w)} className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded border border-slate-600 hover:border-indigo-400 hover:text-white transition-all text-sm shadow-sm hover:-translate-y-0.5">
                            {w}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

// --- MASTERCLASS COMPONENT ---

interface NexusMasterclassProps {
  onBack: () => void;
}

const NexusMasterclass: React.FC<NexusMasterclassProps> = ({ onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
      const handleKey = (e: KeyboardEvent) => {
          if (e.key === 'ArrowRight') nextSlide();
          if (e.key === 'ArrowLeft') prevSlide();
      };
      window.addEventListener('keydown', handleKey);
      return () => window.removeEventListener('keydown', handleKey);
  }, [currentSlide]);

  const triggerReward = () => {
      setConfetti(true);
      setTimeout(() => setConfetti(false), 3000);
  };

  const nextSlide = () => {
      if (currentSlide < slides.length - 1) {
          setAnimate(false);
          setTimeout(() => {
              setCurrentSlide(prev => prev + 1);
              setAnimate(true);
          }, 200);
      } else {
          setShake(true);
          setTimeout(() => setShake(false), 300);
      }
  };

  const prevSlide = () => {
      if (currentSlide > 0) {
          setAnimate(false);
          setTimeout(() => {
              setCurrentSlide(prev => prev - 1);
              setAnimate(true);
          }, 200);
      }
  };

  const jumpTo = (idx: number) => {
      setAnimate(false);
      setIsMenuOpen(false);
      setTimeout(() => {
          setCurrentSlide(idx);
          setAnimate(true);
      }, 200);
  };

  // --- CONTENT DEFINITION (5 SECTORS x 5 SLIDES = 25 TOTAL) ---
  const slides = [
    // === SECTOR 1: GRAMMAR PROTOCOLS ===
    {
      id: "1.1", title: "Core Protocol", icon: <ShieldCheck size={48} className="text-amber-500" />,
      content: (
        <div className="flex flex-col items-center text-center space-y-8 h-full justify-center">
            <div className="p-6 rounded-full bg-amber-500/10 border border-amber-500/50 animate-pulse shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                <AlertTriangle size={64} className="text-amber-500" />
            </div>
            <h2 className="text-5xl font-black text-white tracking-tighter">GRAMMAR <span className="text-amber-500">PROTOCOL</span></h2>
            <p className="text-xl text-slate-400 max-w-2xl font-light">
                Task 1 requires surgical accuracy. We must eliminate the "listing" habit and enforce complex sentence structures.
            </p>
            <div className="flex gap-4 mt-8">
                 <div className="px-4 py-2 bg-slate-900 border border-slate-700 rounded text-xs font-mono text-slate-400">STATUS: ACTIVE</div>
                 <div className="px-4 py-2 bg-slate-900 border border-slate-700 rounded text-xs font-mono text-amber-500">SECTOR: FOUNDATION</div>
            </div>
        </div>
      )
    },
    {
      id: "1.2", title: "Existence Error", icon: <X size={48} className="text-red-500" />,
      content: (
        <div className="space-y-8">
            <div className="bg-red-950/20 p-8 rounded-2xl border border-red-500/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><AlertTriangle size={100}/></div>
                <div className="flex items-center gap-4 mb-4 relative z-10">
                    <X size={32} className="text-red-500" />
                    <h3 className="text-2xl font-bold text-red-400">The "Listing" Trap</h3>
                </div>
                <p className="text-slate-300 text-lg leading-relaxed relative z-10 font-serif italic">
                    "There were some trees on the island. There is a hotel now."
                </p>
                <div className="mt-4 text-[10px] font-mono text-red-300 bg-red-900/40 p-2 rounded inline-block border border-red-500/20">
                    DIAGNOSIS: LOW BAND SCORE (Basic Enumeration)
                </div>
            </div>
            
            <div className="flex justify-center">
                <ArrowDown size={32} className="text-slate-600 animate-bounce" />
            </div>

            <div className="bg-emerald-950/20 p-8 rounded-2xl border border-emerald-500/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><CheckCircle2 size={100}/></div>
                <div className="flex items-center gap-4 mb-4 relative z-10">
                    <CheckCircle2 size={32} className="text-emerald-500" />
                    <h3 className="text-2xl font-bold text-emerald-400">Contextual Description</h3>
                </div>
                <p className="text-slate-300 text-lg leading-relaxed relative z-10 font-serif">
                    "Before development, the island was completely natural, featuring a dense area of trees in the north."
                </p>
            </div>
        </div>
      )
    },
    {
      id: "1.3", title: "Passive Theory", icon: <Factory size={48} className="text-indigo-500" />,
      content: (
        <div className="space-y-8">
            <h3 className="text-3xl font-black text-white">Passive Voice Mechanics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 opacity-50 hover:opacity-100 transition-opacity">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-2">Active Voice</h4>
                    <p className="text-xl text-slate-300">"They built a hotel."</p>
                    <p className="text-xs text-slate-500 mt-2 font-mono">// Focus: The builder (Irrelevant)</p>
                </div>
                <div className="bg-indigo-900/20 p-6 rounded-xl border border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-indigo-400 mb-2">Passive Voice</h4>
                    <p className="text-xl text-white">"A hotel <span className="text-indigo-400 font-bold bg-indigo-500/10 px-1 rounded">was built</span>."</p>
                    <p className="text-xs text-indigo-300 mt-2 font-mono">// Focus: The object (The change)</p>
                </div>
            </div>
            <div className="p-4 bg-slate-800 rounded-lg text-center font-mono text-xs text-slate-400 border border-slate-700">
                FORMULA: BE + PAST PARTICIPLE (V3)
            </div>
        </div>
      )
    },
    {
      id: "1.4", title: "Passive Drill", icon: <PenTool size={48} className="text-teal-500" />,
      content: (
        <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-teal-400">Transformation Drill</h3>
                <span className="text-xs font-mono text-slate-500">PROTOCOL: CONVERT TO PASSIVE</span>
            </div>
            <GapFill 
                textWithGaps="1. They constructed a pier. -> A pier [gap]. 2. They removed the trees. -> The trees [gap]. 3. They have extended the gym. -> The gym [gap]."
                answers={["was constructed", "were removed", "has been extended"]}
                hints={["past simple", "past simple plural", "present perfect"]}
            />
        </div>
      )
    },
    {
      id: "1.5", title: "Sector Mastery", icon: <Trophy size={48} className="text-yellow-500" />,
      content: (
        <div className="flex flex-col items-center justify-center h-full space-y-8 text-center">
            <h2 className="text-4xl font-black text-white">SECTOR 1 COMPLETE</h2>
            <div className="w-32 h-32 bg-yellow-500/10 rounded-full flex items-center justify-center border-4 border-yellow-500 shadow-[0_0_50px_rgba(234,179,8,0.4)] animate-pulse">
                <ShieldCheck size={64} className="text-yellow-500" />
            </div>
            <p className="text-slate-400 max-w-md">
                Grammar protocols calibrated. You have eliminated the "Listing Error" and activated "Passive Voice" logic.
            </p>
            <button onClick={triggerReward} className="px-8 py-3 bg-yellow-600 hover:bg-yellow-500 text-black font-black uppercase tracking-widest rounded-full transition-all hover:scale-105 shadow-lg shadow-yellow-600/20">
                Claim XP Reward
            </button>
        </div>
      )
    },

    // === SECTOR 2: MAP EVOLUTION ===
    {
        id: "2.1", title: "Visual Scan", icon: <Map size={48} className="text-blue-500" />,
        content: (
            <div className="space-y-4 h-full flex flex-col">
                <div className="flex justify-between items-end mb-2 shrink-0">
                    <div>
                        <h3 className="text-2xl font-bold text-white">Visual Reconnaissance</h3>
                        <p className="text-xs text-slate-400 font-mono">IDENTIFY SPATIAL CHANGES</p>
                    </div>
                    <div className="text-[10px] bg-blue-900/50 text-blue-300 px-2 py-1 rounded border border-blue-500/30">
                        TARGET: Sports Centre
                    </div>
                </div>
                <div className="bg-white p-2 rounded-xl shadow-2xl relative overflow-hidden flex-1 border-4 border-slate-700">
                    <MapSports />
                </div>
            </div>
        )
    },
    {
        id: "2.2", title: "Change Logic", icon: <Search size={48} className="text-indigo-500" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-indigo-400">Target Identification</h3>
                <p className="text-slate-400 text-sm">Select the sentences that accurately describe the changes seen in the map.</p>
                <div className="space-y-3">
                    {[
                        { t: "The outdoor courts have been demolished.", c: true },
                        { t: "A new pool has been built in the center.", c: false },
                        { t: "The gym has been extended to the east.", c: true },
                        { t: "A sports shop was added near the entrance.", c: true },
                        { t: "The reception has been removed.", c: false }
                    ].map((item, i) => (
                        <button 
                            key={i}
                            onClick={(e) => {
                                const btn = e.currentTarget;
                                if (item.c) {
                                    btn.className = "w-full text-left p-4 rounded-lg transition-all text-sm font-bold bg-emerald-600 border border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]";
                                    btn.innerHTML = `<span class="flex items-center gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg> ${item.t}</span>`;
                                } else {
                                    btn.className = "w-full text-left p-4 rounded-lg transition-all text-sm font-medium bg-red-900/50 border border-red-500 text-red-300 opacity-50 cursor-not-allowed";
                                }
                            }}
                            className="w-full text-left p-4 bg-slate-900 border border-slate-700 rounded-lg hover:bg-slate-800 transition-all text-slate-300 text-sm font-medium group"
                        >
                           <span className="group-hover:text-indigo-300 transition-colors">{item.t}</span>
                        </button>
                    ))}
                </div>
            </div>
        )
    },
    {
        id: "2.3", title: "Vocab Injection", icon: <Database size={48} className="text-purple-500" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-purple-400">Lexical Precision</h3>
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="p-4 bg-slate-900 border border-slate-700 rounded-lg group hover:border-purple-500 transition-colors">
                            <span className="text-[10px] text-slate-500 uppercase block mb-1">Make Bigger</span>
                            <div className="font-bold text-white text-lg group-hover:text-purple-400">Expand / Enlarge</div>
                        </div>
                        <div className="p-4 bg-slate-900 border border-slate-700 rounded-lg group hover:border-purple-500 transition-colors">
                            <span className="text-[10px] text-slate-500 uppercase block mb-1">Make Longer</span>
                            <div className="font-bold text-white text-lg group-hover:text-purple-400">Lengthen / Extend</div>
                        </div>
                        <div className="p-4 bg-slate-900 border border-slate-700 rounded-lg group hover:border-purple-500 transition-colors">
                            <span className="text-[10px] text-slate-500 uppercase block mb-1">Remove</span>
                            <div className="font-bold text-white text-lg group-hover:text-purple-400">Demolish / Knock down</div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center gap-4 border-l border-slate-800 pl-6">
                        <div className="text-xs text-slate-400 mb-2">Unscramble the Target Sentence:</div>
                        <WordScramble 
                            words={["gym", "The", "extended", "been", "has", "significantly"]}
                            solution="The gym has been extended significantly"
                        />
                    </div>
                </div>
            </div>
        )
    },
    {
        id: "2.4", title: "Model Deconstruction", icon: <FileText size={48} className="text-slate-400" />,
        content: (
            <div className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-white">Band 9 Structure Analysis</h3>
                    <div className="text-xs font-mono text-emerald-400 bg-emerald-900/20 px-2 py-1 rounded border border-emerald-500/30">VERIFIED</div>
                </div>
                <div className="flex-1 bg-slate-900 rounded-xl p-1 border border-slate-800 overflow-hidden">
                    <div className="h-full overflow-y-auto p-4 custom-scrollbar">
                         <TextHighlighter 
                            text="The plans show a university sports centre as it is now and the new layout following its redevelopment. Overall, while some outdoor facilities will be lost, the new centre will be significantly larger and will cater for a wider range of sports. Following the renovations, only the central pool and its facilities will remain the same. The building will be expanded to the east and west removing the outdoor courts and making way for more indoor facilities."
                            targets={["redevelopment", "lost", "larger", "cater", "remain", "expanded", "removing", "making way"]}
                        />
                    </div>
                </div>
            </div>
        )
    },
    {
        id: "2.5", title: "Gap Fill Challenge", icon: <Edit3 size={48} className="text-emerald-500" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-emerald-400">Reconstruct the Logic</h3>
                <p className="text-slate-400 text-sm">Fill in the missing vocabulary based on the map changes.</p>
                <GapFill 
                    textWithGaps="The reception area will also be [gap] making it more spacious. On [gap], visitors to the new centre will benefit from a third changing room, a sports shop and a café, all [gap] around the reception area."
                    answers={["widened", "arrival", "located"]}
                    hints={["verb (width)", "noun (time)", "verb (place)"]}
                />
            </div>
        )
    },

    // === SECTOR 3: PROCESS CYCLES ===
    {
        id: "3.1", title: "Process Init", icon: <RefreshCcw size={48} className="text-cyan-500" />,
        content: (
            <div className="flex flex-col items-center space-y-6 h-full justify-center">
                <div className="bg-cyan-500/10 p-6 rounded-full animate-pulse border border-cyan-500/50 shadow-[0_0_40px_rgba(6,182,212,0.2)]">
                    <Fish size={64} className="text-cyan-400" />
                </div>
                <h2 className="text-4xl font-black text-white text-center tracking-tight">BIOLOGICAL <span className="text-cyan-400">PROCESS</span></h2>
                <div className="max-w-xl text-center text-slate-400 leading-relaxed bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                    Unlike maps, processes are linear (or cyclical). Time connects the steps. 
                    <br/><span className="text-cyan-400 font-bold block mt-2">Key Tense: Present Simple (Active/Passive).</span>
                </div>
                <div className="w-full max-w-md">
                     <DiagramSalmon />
                </div>
            </div>
        )
    },
    {
        id: "3.2", title: "Sequencing", icon: <ListOrdered size={48} className="text-orange-500" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-orange-400">Logical Ordering</h3>
                <p className="text-sm text-slate-400 mb-4">The visual data is cyclical. Identify the start and flow.</p>
                <div className="space-y-2">
                    {["Eggs laid in upper river", "Eggs hatch into Fry", "Fry migrate to lower river", "Fry become Smolt", "Smolt migrate to Open Sea", "Adult Salmon return to spawn"].map((s, i) => (
                        <div key={i} className="flex items-center gap-4 bg-slate-900 p-4 rounded border border-slate-800 hover:border-orange-500/50 transition-colors group">
                            <span className="font-mono text-orange-500 text-xs font-bold bg-orange-900/20 px-2 py-1 rounded">STEP 0{i+1}</span>
                            <span className="text-slate-300 text-sm group-hover:text-white transition-colors">{s}</span>
                        </div>
                    ))}
                </div>
            </div>
        )
    },
    {
        id: "3.3", title: "Language of Time", icon: <Clock size={48} className="text-pink-500" />,
        content: (
            <div className="space-y-8">
                <h3 className="text-xl font-bold text-pink-400">Duration & Sequence Connectors</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-pink-500/50 transition-colors shadow-lg">
                        <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider border-b border-slate-700 pb-2">Duration</h4>
                        <ul className="text-xs text-slate-400 space-y-3 font-mono">
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-pink-500"></div>Over a period of...</li>
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-pink-500"></div>For approximately...</li>
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-pink-500"></div>Lasting for...</li>
                        </ul>
                    </div>
                    <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-pink-500/50 transition-colors shadow-lg">
                        <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider border-b border-slate-700 pb-2">Sequence</h4>
                        <ul className="text-xs text-slate-400 space-y-3 font-mono">
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-pink-500"></div>Following this...</li>
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-pink-500"></div>Subsequently...</li>
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-pink-500"></div>Once...</li>
                        </ul>
                    </div>
                </div>
                <div className="bg-pink-900/10 p-4 rounded-xl border border-pink-500/20">
                    <div className="text-xs text-pink-300 mb-2 font-bold">SENTENCE BUILDER:</div>
                    <WordScramble 
                        words={["period", "Over", "a", "months,", "of", "five", "hatch", "eggs", "the"]}
                        solution="Over a period of five months, the eggs hatch"
                    />
                </div>
            </div>
        )
    },
    {
        id: "3.4", title: "Verb Sorting", icon: <Split size={48} className="text-lime-500" />,
        content: (
            <div className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-lime-400">Categorization Protocol</h3>
                    <div className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded">INTERACTIVE</div>
                </div>
                <p className="text-sm text-slate-400 mb-6 border-l-2 border-lime-500 pl-3">
                    Sort the verbs into their correct functional groups. Click a word, then click the category bucket.
                </p>
                <div className="flex-1">
                    <VerbSorter />
                </div>
            </div>
        )
    },
    {
        id: "3.5", title: "Final Synthesis", icon: <GitMerge size={48} className="text-white" />,
        content: (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">Full Cycle Synthesis</h3>
                    <div className="text-[10px] text-emerald-400 border border-emerald-500 px-2 py-1 rounded shadow-[0_0_10px_rgba(16,185,129,0.3)]">BAND 9 MODEL</div>
                </div>
                <div className="bg-slate-900/80 p-8 rounded-xl border border-slate-700 font-serif leading-loose text-sm text-slate-300 relative shadow-inner">
                    <TypewriterText 
                        text="The cycle begins when salmon eggs are laid among the reeds. After around five to six months, these eggs turn into fry, which are 3-8 cm in length. The fry live in the lower river for four years, growing bigger and changing into smolt. They then migrate to the open sea, where they live for approximately five years, developing into adult salmon."
                        speed={20}
                    />
                </div>
                <div className="flex justify-center pt-4">
                    <button onClick={triggerReward} className="px-8 py-3 bg-white text-black font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                        Complete Protocol
                    </button>
                </div>
            </div>
        )
    },

    // === SECTOR 4: DATA COMPARISON (STATIC) ===
    {
        id: "4.1", title: "Static Data", icon: <BarChart2 size={48} className="text-purple-500" />,
        content: (
            <div className="h-full flex flex-col space-y-4">
                 <div className="flex justify-between items-end">
                    <div>
                        <h3 className="text-2xl font-bold text-white">Magnitude Comparison</h3>
                        <p className="text-xs text-slate-400 font-mono">IDENTIFY EXTREMES & RANKINGS</p>
                    </div>
                    <div className="text-[10px] bg-purple-900/50 text-purple-300 px-2 py-1 rounded border border-purple-500/30">
                        SRC: Transport Data
                    </div>
                </div>
                <div className="flex-1 bg-slate-900 rounded-xl p-4 border-4 border-slate-800 shadow-2xl overflow-hidden">
                    <ChartTransport />
                </div>
            </div>
        )
    },
    {
        id: "4.2", title: "Grouping Logic", icon: <Layers size={48} className="text-purple-400" />,
        content: (
            <div className="space-y-8">
                 <h3 className="text-xl font-bold text-purple-400">Structural Grouping</h3>
                 <p className="text-slate-400">Do not list items randomly. Create logical clusters.</p>
                 <div className="grid grid-cols-2 gap-8">
                     <div className="p-6 bg-slate-900 border border-slate-700 rounded-xl hover:border-purple-500 transition-colors">
                         <div className="text-purple-500 font-bold mb-4 uppercase tracking-widest text-xs border-b border-purple-500/30 pb-2">Group 1: The Polluters</div>
                         <ul className="space-y-2 text-sm text-slate-300">
                             <li className="flex items-center gap-2"><ArrowUp size={14} className="text-red-500"/> Planes (Highest)</li>
                             <li className="flex items-center gap-2"><ArrowUp size={14} className="text-orange-500"/> Cars (High)</li>
                         </ul>
                     </div>
                     <div className="p-6 bg-slate-900 border border-slate-700 rounded-xl hover:border-emerald-500 transition-colors">
                         <div className="text-emerald-500 font-bold mb-4 uppercase tracking-widest text-xs border-b border-emerald-500/30 pb-2">Group 2: Eco-Friendly</div>
                         <ul className="space-y-2 text-sm text-slate-300">
                             <li className="flex items-center gap-2"><ArrowDown size={14} className="text-emerald-500"/> Trams & Buses (Low)</li>
                             <li className="flex items-center gap-2"><Anchor size={14} className="text-emerald-300"/> Walking (Zero)</li>
                         </ul>
                     </div>
                 </div>
            </div>
        )
    },
    {
        id: "4.3", title: "Overview Paradox", icon: <Eye size={48} className="text-slate-200" />,
        content: (
            <div className="space-y-6 text-center">
                 <div className="inline-block p-4 rounded-full bg-red-500/10 border border-red-500 text-red-500 mb-4 animate-pulse">
                     <AlertTriangle size={32} />
                 </div>
                 <h3 className="text-3xl font-black text-white">THE OVERVIEW RULE</h3>
                 <p className="text-xl text-slate-300 font-light border-y border-slate-800 py-6">
                     "An overview must describe the <span className="text-purple-400 font-bold">general pattern</span>."
                     <br/><br/>
                     <span className="text-red-400 font-bold">NEVER</span> include specific numbers/data in the overview paragraph.
                 </p>
                 <div className="grid grid-cols-2 gap-4 text-left">
                     <div className="p-4 bg-red-900/10 border border-red-900/30 rounded text-slate-500 opacity-60">
                         <X size={16} className="inline mr-2"/> "Planes emit 244g of CO2."
                     </div>
                     <div className="p-4 bg-emerald-900/20 border border-emerald-500/50 rounded text-emerald-300">
                         <Check size={16} className="inline mr-2"/> "Air travel is the most polluting mode."
                     </div>
                 </div>
            </div>
        )
    },
    {
        id: "4.4", title: "Comparatives", icon: <Hash size={48} className="text-blue-400" />,
        content: (
            <div className="space-y-6">
                 <h3 className="text-xl font-bold text-blue-400">Comparative Structures</h3>
                 <GapFill 
                    textWithGaps="Planes produce [gap] as much CO2 as cars. Trams are [gap] cleaner than buses. Walking produces the [gap] emissions."
                    answers={["twice", "significantly", "lowest"]}
                    hints={["multiplier", "adverb of degree", "superlative"]}
                 />
                 <div className="mt-8 p-4 bg-slate-900 rounded border border-slate-800">
                     <h4 className="text-xs text-slate-500 uppercase mb-2">Power Vocabulary</h4>
                     <div className="flex flex-wrap gap-2">
                         {['A mere...', 'Overwhelmingly...', 'A fraction of...', 'Double that of...'].map((p,i) => (
                             <span key={i} className="px-2 py-1 bg-black rounded text-xs text-blue-300 font-mono">{p}</span>
                         ))}
                     </div>
                 </div>
            </div>
        )
    },
    {
        id: "4.5", title: "Data Selection", icon: <MousePointer2 size={48} className="text-white" />,
        content: (
            <div className="space-y-6">
                 <h3 className="text-xl font-bold text-white">Surgical Data Selection</h3>
                 <p className="text-sm text-slate-400">Only select key data points. Ignore the 'middle' noise.</p>
                 <div className="relative p-6 bg-slate-900 rounded-xl border border-slate-700 flex justify-center items-end h-64 gap-4">
                     {/* Interactive bars */}
                     {[10, 80, 45, 95, 20].map((h, i) => (
                         <div key={i} className="w-12 bg-slate-700 relative group cursor-pointer hover:bg-purple-500 transition-colors" style={{ height: `${h}%` }}>
                             <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                 {h}%
                             </div>
                             { (h > 90 || h < 20) && (
                                 <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_currentColor] animate-pulse"></div>
                             )}
                         </div>
                     ))}
                 </div>
                 <div className="text-center">
                     <p className="text-xs text-emerald-400 font-mono uppercase tracking-widest animate-pulse">
                         <CheckCircle2 size={12} className="inline mr-1"/> Key Features Marked
                     </p>
                 </div>
            </div>
        )
    },

    // === SECTOR 5: TREND ANALYSIS (DYNAMIC) ===
    {
        id: "5.1", title: "Trend Logic", icon: <TrendingUp size={48} className="text-amber-500" />,
        content: (
            <div className="h-full flex flex-col space-y-4">
                 <div className="flex justify-between items-end">
                    <div>
                        <h3 className="text-2xl font-bold text-white">Dynamic Trends</h3>
                        <p className="text-xs text-slate-400 font-mono">MOVEMENT OVER TIME</p>
                    </div>
                    <div className="text-[10px] bg-amber-900/50 text-amber-300 px-2 py-1 rounded border border-amber-500/30">
                        SRC: Tea Sales
                    </div>
                </div>
                <div className="flex-1 bg-slate-900 rounded-xl p-4 border-4 border-slate-800 shadow-2xl overflow-hidden">
                    <ChartTea />
                </div>
            </div>
        )
    },
    {
        id: "5.2", title: "Verbs of Motion", icon: <Activity size={48} className="text-amber-400" />,
        content: (
            <div className="space-y-6">
                 <h3 className="text-xl font-bold text-amber-400">Verbs of Motion</h3>
                 <div className="grid grid-cols-3 gap-4 text-center">
                     <div className="p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
                         <TrendingUp className="mx-auto text-emerald-500 mb-2" />
                         <div className="text-white font-bold">Rise</div>
                         <div className="text-[10px] text-slate-400">Increase, Climb, Grow</div>
                     </div>
                     <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                         <TrendingDown className="mx-auto text-red-500 mb-2" />
                         <div className="text-white font-bold">Fall</div>
                         <div className="text-[10px] text-slate-400">Decrease, Drop, Decline</div>
                     </div>
                     <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                         <Activity className="mx-auto text-blue-500 mb-2" />
                         <div className="text-white font-bold">Fluctuate</div>
                         <div className="text-[10px] text-slate-400">Vary, Oscillate</div>
                     </div>
                 </div>
                 <WordScramble 
                    words={["dramatically", "sales", "period", "The", "rose", "over", "the"]}
                    solution="The sales rose dramatically over the period"
                 />
            </div>
        )
    },
    {
        id: "5.3", title: "Prepositions", icon: <Anchor size={48} className="text-slate-300" />,
        content: (
            <div className="space-y-8">
                 <h3 className="text-xl font-bold text-white">Precision Prepositions</h3>
                 <div className="relative h-32 bg-slate-900 rounded border-b border-l border-slate-500">
                     {/* Visual Aid */}
                     <div className="absolute bottom-0 left-10 w-8 h-20 bg-slate-700 opacity-50"></div>
                     <div className="absolute bottom-0 left-32 w-8 h-32 bg-amber-500"></div>
                     
                     <div className="absolute left-44 top-1/2 -translate-y-1/2 text-xs text-slate-300 space-y-2">
                         <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Rose <strong>TO</strong> 80 (The end point)</div>
                         <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-500"></div> Rose <strong>BY</strong> 30 (The difference)</div>
                     </div>
                 </div>
                 <GapFill 
                    textWithGaps="Sales started [gap] 50. They increased [gap] 30, finishing [gap] 80."
                    answers={["at", "by", "at"]}
                    hints={["start point", "amount of change", "end point"]}
                 />
            </div>
        )
    },
    {
        id: "5.4", title: "Adverbs", icon: <FastForward size={48} className="text-teal-400" />,
        content: (
            <div className="space-y-6">
                 <h3 className="text-xl font-bold text-teal-400">Degree of Change</h3>
                 <div className="space-y-4">
                     <div className="flex items-center gap-4">
                         <div className="w-16 h-16 bg-slate-900 rounded flex items-center justify-center">
                             <TrendingUp size={32} className="text-emerald-500 rotate-45" />
                         </div>
                         <div>
                             <h4 className="text-white font-bold">Rapid / Significant / Sharp</h4>
                             <p className="text-xs text-slate-500">Big changes. "Sales rocketed."</p>
                         </div>
                     </div>
                     <div className="flex items-center gap-4">
                         <div className="w-16 h-16 bg-slate-900 rounded flex items-center justify-center">
                             <TrendingUp size={32} className="text-blue-500 rotate-12" />
                         </div>
                         <div>
                             <h4 className="text-white font-bold">Gradual / Steady / Moderate</h4>
                             <p className="text-xs text-slate-500">Slow, consistent changes.</p>
                         </div>
                     </div>
                     <div className="flex items-center gap-4">
                         <div className="w-16 h-16 bg-slate-900 rounded flex items-center justify-center">
                             <TrendingUp size={32} className="text-slate-500 rotate-3" />
                         </div>
                         <div>
                             <h4 className="text-white font-bold">Slight / Marginal / Negligible</h4>
                             <p className="text-xs text-slate-500">Tiny changes.</p>
                         </div>
                     </div>
                 </div>
            </div>
        )
    },
    {
        id: "5.5", title: "Mastery Synthesis", icon: <CheckCircle2 size={48} className="text-white" />,
        content: (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                <h2 className="text-5xl font-black text-white">NEXUS COMPLETE</h2>
                <div className="w-40 h-40 bg-gradient-to-tr from-amber-500 to-purple-600 rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(168,85,247,0.4)] animate-spin-slow">
                    <div className="w-36 h-36 bg-[#050505] rounded-full flex items-center justify-center">
                        <Trophy size={64} className="text-white" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                    <div className="p-4 bg-slate-900 border border-slate-800 rounded">
                        <div className="text-xs text-slate-500 uppercase">Grammar</div>
                        <div className="text-emerald-500 font-bold">OPTIMIZED</div>
                    </div>
                    <div className="p-4 bg-slate-900 border border-slate-800 rounded">
                        <div className="text-xs text-slate-500 uppercase">Vocab</div>
                        <div className="text-emerald-500 font-bold">EXPANDED</div>
                    </div>
                    <div className="p-4 bg-slate-900 border border-slate-800 rounded">
                        <div className="text-xs text-slate-500 uppercase">Analysis</div>
                        <div className="text-emerald-500 font-bold">SURGICAL</div>
                    </div>
                    <div className="p-4 bg-slate-900 border border-slate-800 rounded">
                        <div className="text-xs text-slate-500 uppercase">Speed</div>
                        <div className="text-emerald-500 font-bold">ENHANCED</div>
                    </div>
                </div>
                <button onClick={triggerReward} className="mt-8 px-10 py-4 bg-white text-black font-black uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                    Finalize & Sync
                </button>
            </div>
        )
    }
  ];

  const slide = slides[currentSlide];
  const sectorColor = slide.id.startsWith("1") ? "amber" : slide.id.startsWith("2") ? "indigo" : slide.id.startsWith("3") ? "cyan" : slide.id.startsWith("4") ? "purple" : "emerald";
  const progress = ((currentSlide + 1) / slides.length) * 100;

  return (
    <div className={`min-h-screen bg-[#050505] text-slate-200 font-sans relative overflow-hidden flex flex-col selection:bg-${sectorColor}-500 selection:text-white`}>
        
        {confetti && <Confetti active={true} />}

        {/* Ambient Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:40px_40px] pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505] pointer-events-none"></div>

        {/* Progress Line */}
        <div className="fixed top-0 left-0 w-full h-1 bg-slate-900 z-50">
            <div 
                className={`h-full transition-all duration-300 ease-out shadow-[0_0_10px_currentColor] bg-${sectorColor}-500`} 
                style={{ width: `${progress}%` }}
            ></div>
        </div>

        {/* Header */}
        <header className="px-6 py-4 flex justify-between items-center relative z-30 border-b border-slate-800/50 backdrop-blur-sm bg-[#050505]/80">
             <div className="flex items-center gap-4">
                 <button 
                    onClick={onBack} 
                    className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white group border border-transparent hover:border-slate-700"
                 >
                     <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                 </button>
                 <div className="h-8 w-px bg-slate-800"></div>
                 <div>
                     <h1 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] mb-1">Nexus Masterclass</h1>
                     <div className="text-white font-bold text-sm flex items-center gap-2">
                         <span className={`w-2 h-2 rounded-full bg-${sectorColor}-500 animate-pulse`}></span>
                         {slide.id} // {slide.title}
                     </div>
                 </div>
             </div>

             <div className="flex items-center gap-4">
                 <div className="hidden md:flex gap-1">
                     {slides.map((s, i) => (
                         <div 
                            key={i} 
                            onClick={() => jumpTo(i)}
                            className={`w-1 h-4 rounded-full cursor-pointer transition-all ${
                                i === currentSlide 
                                ? `bg-${sectorColor}-500 h-6` 
                                : i < currentSlide ? 'bg-slate-600' : 'bg-slate-800'
                            }`}
                         ></div>
                     ))}
                 </div>
                 <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                 >
                    <Grid size={20} />
                 </button>
             </div>
        </header>

        {/* Menu Overlay */}
        {isMenuOpen && (
            <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md flex justify-end" onClick={() => setIsMenuOpen(false)}>
                <div className="w-80 h-full bg-[#0a0a0a] border-l border-slate-800 p-4 overflow-y-auto animate-slide-in-right custom-scrollbar" onClick={e => e.stopPropagation()}>
                    <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
                        <span className="text-xs font-mono uppercase text-slate-500">Navigation Index</span>
                        <button onClick={() => setIsMenuOpen(false)}><X size={20} className="text-slate-400 hover:text-white" /></button>
                    </div>
                    <div className="space-y-1">
                        {slides.map((s, i) => {
                             const isActive = currentSlide === i;
                             const sCol = s.id.startsWith("1") ? "amber" : s.id.startsWith("2") ? "indigo" : s.id.startsWith("3") ? "cyan" : s.id.startsWith("4") ? "purple" : "emerald";
                             return (
                                <button
                                    key={i}
                                    onClick={() => jumpTo(i)}
                                    className={`w-full text-left p-3 rounded text-xs font-mono border-l-2 transition-all flex items-center ${
                                        isActive 
                                        ? `border-${sCol}-500 bg-white/5 text-white` 
                                        : 'border-transparent text-slate-500 hover:bg-white/5 hover:text-slate-300'
                                    }`}
                                >
                                    <span className={`mr-3 w-6 opacity-50 ${isActive ? `text-${sCol}-400` : ''}`}>{s.id}</span>
                                    {s.title}
                                </button>
                             )
                        })}
                    </div>
                </div>
            </div>
        )}

        {/* Main Content */}
        <main className={`flex-1 flex flex-col justify-center items-center relative z-10 w-full max-w-6xl mx-auto px-4 py-8 ${shake ? 'animate-shake' : ''}`}>
             <div className={`w-full transition-all duration-500 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 scale-95'}`}>
                 
                 {/* Slide Container */}
                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch min-h-[500px]">
                     {/* Left: Visual/Context */}
                     <div className="lg:col-span-4 flex flex-col">
                         <div className="relative group flex-1">
                             <div className={`absolute -inset-1 bg-gradient-to-r from-${sectorColor}-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200`}></div>
                             <div className="relative bg-[#0f0f11] border border-slate-800 rounded-xl p-8 flex flex-col items-center text-center shadow-2xl h-full justify-center">
                                 <div className={`mb-6 p-4 rounded-full bg-${sectorColor}-500/10 text-${sectorColor}-500 border border-${sectorColor}-500/20 shadow-[0_0_30px_rgba(0,0,0,0.5)]`}>
                                     {slide.icon}
                                 </div>
                                 <h2 className="text-3xl font-bold text-white mb-2">{slide.title}</h2>
                                 <div className="h-1 w-12 bg-slate-800 rounded-full my-4"></div>
                                 <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">
                                     Sector {slide.id.split('.')[0]} // Node {slide.id.split('.')[1]}
                                 </div>
                                 
                                 {/* Sector Tags */}
                                 <div className="flex flex-wrap justify-center gap-2 mt-auto">
                                      <span className="px-2 py-1 bg-slate-900 rounded text-[9px] text-slate-500 font-mono border border-slate-800">IELTS ACADEMIC</span>
                                      <span className={`px-2 py-1 bg-${sectorColor}-900/20 rounded text-[9px] text-${sectorColor}-400 font-mono border border-${sectorColor}-500/30`}>TASK 1</span>
                                 </div>
                             </div>
                         </div>
                     </div>

                     {/* Right: Interactive Module */}
                     <div className="lg:col-span-8">
                         <div className="bg-[#0f0f11]/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl h-full flex flex-col relative overflow-hidden">
                             {/* Decorative scanline */}
                             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50 animate-scan pointer-events-none"></div>
                             
                             <div className="flex-1 flex flex-col justify-center">
                                 {slide.content}
                             </div>
                         </div>
                     </div>
                 </div>

             </div>
        </main>

        {/* Footer Controls */}
        <footer className="px-6 py-6 border-t border-slate-800/50 bg-[#050505]/80 backdrop-blur-sm relative z-30 flex justify-between items-center">
             <button 
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="group flex items-center gap-3 px-6 py-3 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
             >
                 <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                 <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Previous</span>
             </button>

             <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-slate-600">
                 <Keyboard size={12} /> ARROW KEYS ENABLED
             </div>

             <button 
                onClick={nextSlide}
                className={`group flex items-center gap-3 px-8 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-lg ${
                    currentSlide === slides.length - 1 
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20' 
                    : `bg-${sectorColor}-600 hover:bg-${sectorColor}-500 text-white shadow-${sectorColor}-500/20 hover:shadow-${sectorColor}-500/40 hover:scale-105`
                }`}
            >
                 <span>{currentSlide === slides.length - 1 ? 'Finish Module' : 'Next Node'}</span>
                 {currentSlide === slides.length - 1 ? <Check size={16} /> : <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
             </button>
        </footer>
    </div>
  );
};

export default NexusMasterclass;
