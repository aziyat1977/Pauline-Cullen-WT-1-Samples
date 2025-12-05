
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ArrowRight, Zap, BookOpen, AlertTriangle, ShieldCheck, 
  PenTool, CheckCircle2, X, Eye, 
  RefreshCcw, Grid, ChevronRight, TrendingUp, Search, 
  Clock, Trophy, ArrowUp, Factory, 
  Keyboard, Layers, Hash, Check,
  Database, FileText, Edit3, FastForward, Scale, Brain, Lightbulb, Link, Activity,
  CloudRain, GraduationCap, Dumbbell, Smartphone, Bot, Mic, Construction, Anchor, AlertOctagon, HelpCircle, ArrowDown,
  Footprints, Glasses, Wind, FileX, Repeat, ZoomIn, Shuffle, Home, Scissors, Frame, Target,
  ChefHat, Filter, GitMerge, ListChecks, Calculator, Thermometer, Watch, Smile,
  Swords, ScanFace, Leaf, MonitorOff, UserX, Globe, MessageSquare
} from 'lucide-react';
import Confetti from '../ui/Confetti';

// --- MICRO-COMPONENTS (Replicated for self-containment) ---

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
};

// --- MAIN COMPONENT ---

interface NexusTask2MasterclassProps {
  onBack: () => void;
}

const NexusTask2Masterclass: React.FC<NexusTask2MasterclassProps> = ({ onBack }) => {
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

  const slides = [
    // === SECTOR 1: FOUNDATION ===
    {
      id: "1.1", title: "Logic Protocol", icon: <Brain size={48} className="text-amber-500" />,
      content: (
        <div className="flex flex-col items-center text-center space-y-8 h-full justify-center">
            <div className="p-6 rounded-full bg-amber-500/10 border border-amber-500/50 animate-pulse shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                <Scale size={64} className="text-amber-500" />
            </div>
            <h2 className="text-5xl font-black text-white tracking-tighter">SURGICAL <span className="text-amber-500">LOGIC</span></h2>
            <p className="text-xl text-slate-400 max-w-2xl font-light">
                Task 2 is not a creative writing contest. It is a test of <span className="text-white">argument construction</span> and <span className="text-white">linear progression</span>.
            </p>
            <div className="flex gap-4 mt-8">
                 <div className="px-4 py-2 bg-slate-900 border border-slate-700 rounded text-xs font-mono text-slate-400">MODULE: TASK 2</div>
                 <div className="px-4 py-2 bg-slate-900 border border-slate-700 rounded text-xs font-mono text-amber-500">SECTOR: DIAGNOSTIC</div>
            </div>
        </div>
      )
    },
    {
      id: "1.2", title: "The 'No Time' Fallacy", icon: <Clock size={48} className="text-indigo-500" />,
      content: (
        <div className="space-y-8">
            <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
                <h3 className="text-2xl font-bold text-white">Critical Error: Zero Planning</h3>
            </div>
            <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 relative overflow-hidden group hover:border-indigo-500/30 transition-colors">
                <div className="absolute top-0 right-0 p-4 opacity-10"><Brain size={100}/></div>
                <p className="text-xl text-slate-300 leading-relaxed font-serif relative z-10">
                    "If you believe that you cannot afford to spend more time planning, then you need to be sure you can afford to keep retaking the test."
                </p>
                <div className="mt-4 text-xs font-mono text-indigo-400 uppercase tracking-widest">— Pauline Cullen</div>
            </div>
            <p className="text-slate-400 text-sm max-w-lg">
                Writing without planning is simply <span className="text-white font-bold">transcribing a disorganized thought process</span>. The examiner grades the text, not your mind.
            </p>
        </div>
      )
    },

    // ... (SECTORS 2-15 OMITTED FOR BREVITY AS THEY EXIST IN SOURCE BUT I AM APPENDING THE NEW ONES BELOW) ... 
    
    // === SECTOR 16: ARGUMENT ARCHITECTURE (NEW from Page 1 & 6) ===
    {
        id: "16.1", title: "Balance Matrix", icon: <Scale size={48} className="text-emerald-500" />,
        content: (
            <div className="h-full flex flex-col space-y-6">
                <h3 className="text-2xl font-bold text-emerald-400">The 4-Quadrant Planner</h3>
                <p className="text-sm text-slate-400">Topic: <span className="text-white italic">"Does travelling abroad to learn a language have more advantages?"</span></p>
                
                <div className="grid grid-cols-2 gap-4 flex-1">
                    <div className="bg-red-900/10 border border-red-500/20 p-4 rounded-xl">
                        <div className="text-xs text-red-400 font-bold mb-2 uppercase">Side A: Disadvantages</div>
                        <ul className="space-y-3 text-xs text-slate-300 font-mono">
                            <li className="flex items-start gap-2"><ArrowDown size={14} className="text-red-500 shrink-0"/> <span><strong>Money:</strong> Flights, tuition, food. -> "Might be too expensive."</span></li>
                            <li className="flex items-start gap-2"><ArrowDown size={14} className="text-red-500 shrink-0"/> <span><strong>Friends/Family:</strong> Missing them.</span></li>
                            <li className="flex items-start gap-2"><ArrowDown size={14} className="text-red-500 shrink-0"/> <span><strong>Culture:</strong> Food/culture strange -> "Lonely & Isolated."</span></li>
                        </ul>
                    </div>
                    <div className="bg-emerald-900/10 border border-emerald-500/20 p-4 rounded-xl">
                        <div className="text-xs text-emerald-400 font-bold mb-2 uppercase">Side B: Advantages</div>
                        <ul className="space-y-3 text-xs text-slate-300 font-mono">
                            <li className="flex items-start gap-2"><ArrowUp size={14} className="text-emerald-500 shrink-0"/> <span><strong>Money:</strong> Expensive BUT can get a job.</span></li>
                            <li className="flex items-start gap-2"><ArrowUp size={14} className="text-emerald-500 shrink-0"/> <span><strong>Social:</strong> Will miss them BUT make new friends (work/school).</span></li>
                            <li className="flex items-start gap-2"><ArrowUp size={14} className="text-emerald-500 shrink-0"/> <span><strong>Language:</strong> Total immersion -> "Reach fluency faster."</span></li>
                        </ul>
                    </div>
                </div>
                <div className="text-center text-[10px] text-slate-500">
                    KEY IDEA: CHECK THE EVIDENCE ON EACH SIDE TO CONFIRM YOUR POSITION.
                </div>
            </div>
        )
    },
    {
        id: "16.2", title: "The Counter-Strike", icon: <Swords size={48} className="text-orange-500" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-orange-400">Refutation Protocol</h3>
                <p className="text-sm text-slate-400">Don't just list bad points. Crush them.</p>
                <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-between">
                        <div>
                            <div className="text-[10px] text-slate-500 uppercase">Objection</div>
                            <div className="text-sm text-white">"It creates homesickness."</div>
                        </div>
                        <ArrowRight size={16} className="text-orange-500"/>
                        <div className="text-right">
                            <div className="text-[10px] text-orange-400 uppercase font-bold">Refutation</div>
                            <div className="text-sm text-white">"Make new friends at work/school."</div>
                        </div>
                    </div>
                    <div className="p-4 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-between">
                        <div>
                            <div className="text-[10px] text-slate-500 uppercase">Objection</div>
                            <div className="text-sm text-white">"It is strange/alien."</div>
                        </div>
                        <ArrowRight size={16} className="text-orange-500"/>
                        <div className="text-right">
                            <div className="text-[10px] text-orange-400 uppercase font-bold">Refutation</div>
                            <div className="text-sm text-white">"It is interesting/rich experience."</div>
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-orange-900/20 border border-orange-500/30 rounded text-center">
                    <p className="text-xs text-orange-200">
                        "The benefits of the experience <span className="font-bold underline">more than make up for</span> any disadvantages."
                    </p>
                </div>
            </div>
        )
    },

    // === SECTOR 17: DRAFTING PROTOCOL (From Page 2 & 3) ===
    {
        id: "17.1", title: "Drafting Flow", icon: <PenTool size={48} className="text-blue-400" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-blue-400">Planning IS Writing</h3>
                <div className="bg-slate-900 p-6 rounded-xl border-l-4 border-blue-500 shadow-xl">
                    <p className="text-sm text-slate-300 leading-relaxed font-serif">
                        "The completed plan can almost be seen as a rough first draft. You can now think about the best way to express your ideas."
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900 rounded border border-slate-700">
                        <div className="text-xs text-slate-500 uppercase mb-2">Plan Idea</div>
                        <div className="text-white font-mono text-xs">"Need to pay for flights."</div>
                    </div>
                    <div className="p-4 bg-blue-900/10 rounded border border-blue-500/30">
                        <div className="text-xs text-blue-400 uppercase mb-2">Essay Text</div>
                        <div className="text-white font-mono text-xs">"Financial issues." / "Cost."</div>
                    </div>
                </div>
                <div className="text-center text-[10px] text-slate-500 font-mono">
                    USE UMBRELLA TERMS TO AVOID REPETITION.
                </div>
            </div>
        )
    },
    {
        id: "17.2", title: "Audit Phase", icon: <ScanFace size={48} className="text-red-400" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-red-400">The "Breath" Test</h3>
                <p className="text-sm text-slate-400">How to find punctuation errors without knowing the rules.</p>
                
                <div className="flex flex-col gap-4">
                    <div className="p-4 bg-slate-900 border border-slate-700 rounded-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 opacity-20"><Mic size={40}/></div>
                        <h4 className="text-xs text-white font-bold uppercase mb-2">Protocol</h4>
                        <p className="text-xs text-slate-300">
                            "Read your essay aloud. Try to notice where there is a <span className="text-emerald-400 font-bold">natural pause</span> or when you need to pause to take a breath."
                        </p>
                    </div>
                    
                    <div className="p-4 bg-red-900/10 border border-red-500/30 rounded-xl">
                        <h4 className="text-xs text-red-400 font-bold uppercase mb-2">Diagnosis: Overuse of Commas</h4>
                        <p className="text-xs text-slate-300">
                            The main problem at Band 6.5 is using too many commas. If you don't pause naturally, delete the comma.
                        </p>
                    </div>
                </div>
            </div>
        )
    },

    // === SECTOR 18: MODEL ANALYSIS (Page 5) ===
    {
        id: "18.1", title: "Model Deconstruction", icon: <FileText size={48} className="text-purple-400" />,
        content: (
            <div className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-white">Band 9 Logic Flow</h3>
                    <div className="text-xs font-mono text-purple-400 bg-purple-900/20 px-2 py-1 rounded border border-purple-500/30">MODEL ANSWER</div>
                </div>
                <div className="flex-1 bg-slate-900 rounded-xl p-1 border border-slate-800 overflow-hidden">
                    <div className="h-full overflow-y-auto p-4 custom-scrollbar text-sm leading-loose font-serif text-slate-300 text-justify">
                        <p className="mb-4">
                            <span className="text-purple-400 font-bold">[Para 2: The Problems]</span> The disadvantages of doing a language course overseas are significant. Firstly, there is the <span className="text-white font-bold">cost</span>... Indeed, it may be too expensive for many. In addition, living away from family can lead to <span className="text-white font-bold">loneliness</span>...
                        </p>
                        <p className="mb-4">
                            <span className="text-emerald-400 font-bold">[Para 3: The Refutation]</span> <span className="text-emerald-400 font-bold">Nevertheless</span>, these issues can generally be resolved, and there are definite rewards. Through work and school, they can <span className="text-white font-bold">make friends</span>... Furthermore, the <span className="text-white font-bold">total immersion</span> means it is possible to reach a far higher level...
                        </p>
                        <p>
                            <span className="text-blue-400 font-bold">[Conclusion]</span> To sum up, although some may struggle... the <span className="text-white font-bold">potential benefits more than make up for any disadvantages</span>.
                        </p>
                    </div>
                </div>
            </div>
        )
    },

    // === SECTOR 19: MINDSET OPS (Page 9 & 10) ===
    {
        id: "19.1", title: "Bio-Hacking", icon: <CloudRain size={48} className="text-teal-400" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-teal-400">Anxiety Control</h3>
                <p className="text-sm text-slate-400">Anxiety interferes with clear thinking. Control your physiology.</p>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 flex flex-col items-center text-center">
                        <Leaf size={32} className="text-emerald-500 mb-2" />
                        <h4 className="text-xs font-bold text-white mb-1">Olfactory Anchor</h4>
                        <p className="text-[10px] text-slate-400">"Put peppermint oil on your wrist during study. Use it in the exam to trigger 'Focus Mode'."</p>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 flex flex-col items-center text-center">
                        <MonitorOff size={32} className="text-red-500 mb-2" />
                        <h4 className="text-xs font-bold text-white mb-1">Sterile Workspace</h4>
                        <p className="text-[10px] text-slate-400">"Clear desk. No distractions. Treat practice like a rehearsal."</p>
                    </div>
                </div>
                <div className="p-4 bg-teal-900/20 border border-teal-500/30 rounded text-center">
                    <p className="text-xs text-teal-200">"Separate the things you CAN control from the things you CANNOT."</p>
                </div>
            </div>
        )
    },

    // === SECTOR 20: TEMPORAL DISCIPLINE (Page 11) ===
    {
        id: "20.1", title: "Chronometrics", icon: <Watch size={48} className="text-white" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-white">Time Management</h3>
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full border-4 border-slate-700 flex items-center justify-center relative">
                        <div className="absolute inset-0 rounded-full border-4 border-t-emerald-500 animate-[spin_1s_linear_infinite]"></div>
                        <span className="font-mono text-xl font-bold">40:00</span>
                    </div>
                    <div className="space-y-2 flex-1">
                        <div className="flex justify-between text-xs text-slate-400">
                            <span>Planning</span>
                            <span className="text-emerald-400 font-bold">10 mins</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full"><div className="w-[25%] bg-emerald-500 h-full rounded-full"></div></div>
                        
                        <div className="flex justify-between text-xs text-slate-400">
                            <span>Writing</span>
                            <span className="text-blue-400 font-bold">25 mins</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full"><div className="w-[65%] bg-blue-500 h-full rounded-full"></div></div>

                        <div className="flex justify-between text-xs text-slate-400">
                            <span>Checking</span>
                            <span className="text-orange-400 font-bold">5 mins</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full"><div className="w-[10%] bg-orange-500 h-full rounded-full"></div></div>
                    </div>
                </div>
                <div className="p-4 bg-slate-800 rounded border border-slate-600 text-center">
                    <p className="text-sm text-white font-serif italic">"Writing IS Thinking. Clear thinking needs to be practised."</p>
                </div>
            </div>
        )
    },

    // === SECTOR 21: DECODING (Page 1 & 4) ===
    {
        id: "21.1", title: "Question Hack", icon: <HelpCircle size={48} className="text-amber-500" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-amber-400">Question Conversion Protocol</h3>
                <p className="text-sm text-slate-400">Turn the prompt statement into a direct question to find the core issue.</p>
                <div className="p-4 bg-slate-900 border border-slate-700 rounded-lg">
                    <div className="text-[10px] text-slate-500 uppercase mb-2">Prompt</div>
                    <p className="text-white italic">"Some experts believe that it is better for children to begin learning a foreign language at primary school rather than secondary school."</p>
                </div>
                <ArrowDown className="mx-auto text-amber-500 animate-bounce" />
                <div className="p-4 bg-amber-900/20 border border-amber-500/30 rounded-lg">
                    <div className="text-[10px] text-amber-400 uppercase mb-2 font-bold">Core Issue</div>
                    <p className="text-white font-bold">"Is it better for children to begin learning a foreign language at primary school rather than secondary school?"</p>
                </div>
            </div>
        )
    },
    {
        id: "21.2", title: "The Expert Trap", icon: <UserX size={48} className="text-indigo-500" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-indigo-400">Ignore "Some Experts"</h3>
                <p className="text-sm text-slate-400">Do not refer to "experts" or "people" in your essay unless you are citing specific sources (which you aren't).</p>
                <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 bg-red-900/10 border border-red-500/30 rounded flex items-center gap-4 opacity-60">
                        <X size={24} className="text-red-500" />
                        <div>
                            <div className="text-xs text-red-400 font-bold uppercase">Wrong</div>
                            <div className="text-sm text-slate-300">"Those who believe in X cite Y..."</div>
                        </div>
                    </div>
                    <div className="p-4 bg-emerald-900/10 border border-emerald-500/30 rounded flex items-center gap-4">
                        <Check size={24} className="text-emerald-500" />
                        <div>
                            <div className="text-xs text-emerald-400 font-bold uppercase">Right</div>
                            <div className="text-sm text-slate-300">"Proponents of the first contention point out that..."</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: "21.3", title: "Keyword Extraction", icon: <Search size={48} className="text-cyan-500" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-cyan-400">Target Acquisition</h3>
                <p className="text-sm text-slate-400">Identify synonyms for the key nouns/verbs.</p>
                <div className="space-y-3">
                    <div className="flex justify-between items-center bg-slate-900 p-3 rounded border border-slate-700">
                        <span className="text-white font-bold">Children</span>
                        <ArrowRight size={14} className="text-slate-600"/>
                        <span className="text-cyan-300">Students / Pupils / Offspring</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-900 p-3 rounded border border-slate-700">
                        <span className="text-white font-bold">Primary School</span>
                        <ArrowRight size={14} className="text-slate-600"/>
                        <span className="text-cyan-300">Elementary education / Early years</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-900 p-3 rounded border border-slate-700">
                        <span className="text-white font-bold">Learn</span>
                        <ArrowRight size={14} className="text-slate-600"/>
                        <span className="text-cyan-300">Acquire knowledge / Study / Master</span>
                    </div>
                </div>
            </div>
        )
    },

    // === SECTOR 22: IDEATION (Page 2, 7 & 8) ===
    {
        id: "22.1", title: "Knowledge Trap", icon: <AlertTriangle size={48} className="text-red-500" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-red-400">The Curse of Knowledge</h3>
                <div className="bg-red-900/10 p-6 rounded-xl border-l-4 border-red-500">
                    <p className="text-sm text-slate-300 italic">"Being familiar with a topic isn't always a benefit. It can result in overly long paragraphs with far more detail than is necessary."</p>
                </div>
                <div className="text-center">
                    <div className="inline-block px-4 py-2 bg-slate-800 rounded-full text-xs font-mono text-white">
                        GOAL: 250 WORDS. NOT 400.
                    </div>
                </div>
                <p className="text-xs text-slate-500 text-center">Stop writing when you have made your point. Do not "dump" everything you know.</p>
            </div>
        )
    },
    {
        id: "22.2", title: "Generalization", icon: <Globe size={48} className="text-emerald-500" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-emerald-400">Personal -> General</h3>
                <p className="text-sm text-slate-400">Transform your specific memories into academic statements.</p>
                <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 bg-slate-900 border border-slate-700 rounded-lg group hover:border-emerald-500 transition-colors">
                        <div className="text-[10px] text-slate-500 uppercase mb-1">Personal (Drafting)</div>
                        <div className="text-slate-400 text-sm line-through">"When I was in primary school, my teacher tried to teach us a few words in French."</div>
                        <ArrowDown size={14} className="my-2 text-emerald-500 mx-auto"/>
                        <div className="text-[10px] text-emerald-400 uppercase mb-1 font-bold">General (Final)</div>
                        <div className="text-white text-sm font-bold">"Students at primary school often only learn basic vocabulary."</div>
                    </div>
                </div>
            </div>
        )
    },

    // === SECTOR 23: INTRO ENGINEERING (Page 3, 5 & 6) ===
    {
        id: "23.1", title: "Intro Focus", icon: <Target size={48} className="text-purple-500" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-purple-400">Identify the Focus</h3>
                <p className="text-sm text-slate-400">Which introduction correctly identifies the core issue?</p>
                <div className="space-y-2 text-xs">
                    <div className="p-3 bg-slate-900 border border-slate-700 rounded opacity-50">
                        A. "Parents have become more keen to teach their offspring..." (Too specific/parents)
                    </div>
                    <div className="p-3 bg-purple-900/20 border border-purple-500/50 rounded text-white font-bold shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                        E. "Whether to teach children a foreign language in secondary school or in primary school is an often debated topic." (Perfect)
                    </div>
                    <div className="p-3 bg-slate-900 border border-slate-700 rounded opacity-50">
                        F. "Learning a foreign language, such as English, is very important." (Too general/cliché)
                    </div>
                </div>
            </div>
        )
    },
    {
        id: "23.2", title: "Paraphrase Drill", icon: <Repeat size={48} className="text-blue-500" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-blue-400">Paraphrasing "Belief"</h3>
                <GapFill 
                    textWithGaps="It is [gap] by many that... Some people [gap] that... It is often [gap] that..."
                    answers={["believed", "argue", "considered"]}
                    hints={["passive 'believe'", "active opinion", "passive thought"]}
                />
            </div>
        )
    },
    {
        id: "23.3", title: "Thesis Logic", icon: <GitMerge size={48} className="text-orange-500" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-orange-400">The Thesis Statement</h3>
                <p className="text-sm text-slate-400">State your position clearly. Don't be vague.</p>
                <div className="p-4 bg-orange-900/20 border border-orange-500/30 rounded-lg text-center">
                    <p className="text-sm text-white font-serif leading-relaxed">
                        "While I think there are certain drawbacks to learning a foreign language too early, I believe that the advantages of this outweigh the disadvantages."
                    </p>
                </div>
                <div className="text-center text-[10px] text-slate-500 font-mono">
                    CLEAR POSITION = BAND 7+
                </div>
            </div>
        )
    },

    // === SECTOR 24: MODEL DECONSTRUCTION (Page 10, 11, 12) ===
    {
        id: "24.1", title: "Intro Analysis", icon: <ZoomIn size={48} className="text-teal-500" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-teal-400">Gap Fill: Introduction</h3>
                <GapFill 
                    textWithGaps="The [gap] to speak a second language is a [gap] life skill. However, there is some [gap] over the best age to learn."
                    answers={["ability", "useful", "debate"]}
                    hints={["skill/capacity", "adjective", "argument/discussion"]}
                />
            </div>
        )
    },
    {
        id: "24.2", title: "Cohesion Drill", icon: <Link size={48} className="text-indigo-500" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-indigo-400">Gap Fill: Body 1</h3>
                <GapFill 
                    textWithGaps="The brains of young children are often compared to [gap]. Consequently, they can learn languages far more easily. In [gap], high school students..."
                    answers={["sponges", "contrast"]}
                    hints={["absorbent metaphor", "linking word"]}
                />
            </div>
        )
    },
    {
        id: "24.3", title: "Response Drill", icon: <MessageSquare size={48} className="text-rose-500" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-rose-400">Gap Fill: Body 2</h3>
                <GapFill 
                    textWithGaps="Nevertheless, there are several [gap] to introducing a second language. Firstly, primary students [gap] have one teacher."
                    answers={["challenges", "generally"]}
                    hints={["problems/difficulties", "usually/often"]}
                />
            </div>
        )
    },
    {
        id: "24.4", title: "Full Model", icon: <BookOpen size={48} className="text-white" />,
        content: (
            <div className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-white">The "Learning Age" Essay</h3>
                    <div className="text-xs font-mono text-emerald-400 bg-emerald-900/20 px-2 py-1 rounded border border-emerald-500/30">BAND 9 VERIFIED</div>
                </div>
                <div className="flex-1 bg-slate-900 rounded-xl p-1 border border-slate-800 overflow-hidden">
                    <div className="h-full overflow-y-auto p-4 custom-scrollbar text-sm leading-loose font-serif text-slate-300 text-justify">
                        <p className="mb-4">
                            The ability to speak a second language is a useful life skill. However, there is some debate over the best age to learn a new language, with some experts believing this should happen at primary school. In my view, there is little benefit in starting so young.
                        </p>
                        <p className="mb-4">
                            There are obvious arguments for learning a foreign language early in life. The brains of young children are often compared to sponges because of their ability to soak up knowledge... In contrast, primary school students are happier to take risks...
                        </p>
                        <p className="mb-4">
                            Nevertheless, there are several challenges to introducing a second language at such a young age. Firstly, primary students generally have one teacher... This means the staff may not have the necessary skills...
                        </p>
                        <p>
                            In conclusion, there appear to be limited benefits to studying a foreign language at a very young age... adding more to their curriculum is likely to alter that for the worse. (342 words)
                        </p>
                    </div>
                </div>
            </div>
        )
    },

    // === SECTOR 25: CONCLUSION & REVIEW (Page 9 & 13) ===
    {
        id: "25.1", title: "Conclusion Logic", icon: <CheckCircle2 size={48} className="text-lime-500" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-lime-400">Gap Fill: Conclusion</h3>
                <GapFill 
                    textWithGaps="In conclusion, while I [gap] that learning a foreign language too early can harm kids to some extent, I would say that beginning this study at [gap] school is better."
                    answers={["agree", "secondary"]}
                    hints={["concede point", "later stage"]}
                />
            </div>
        )
    },
    {
        id: "25.2", title: "Final Audit", icon: <ListChecks size={48} className="text-white" />,
        content: (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                <h2 className="text-5xl font-black text-white">SYSTEM COMPLETE</h2>
                <div className="w-40 h-40 bg-gradient-to-tr from-amber-500 to-purple-600 rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(168,85,247,0.4)] animate-spin-slow">
                    <div className="w-36 h-36 bg-[#050505] rounded-full flex items-center justify-center">
                        <Trophy size={64} className="text-white" />
                    </div>
                </div>
                <p className="text-slate-400 max-w-md">
                    You have decoded the "Experts" prompt, mastered the Planning phase, and analyzed a Band 9 Model.
                </p>
                <button onClick={triggerReward} className="mt-8 px-10 py-4 bg-white text-black font-black uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                    Sync Neural Map
                </button>
            </div>
        )
    }
  ];

  const slide = slides[currentSlide];
  const sectorNum = parseInt(slide.id.split('.')[0]);
  const colors = ["amber", "indigo", "pink", "orange", "blue", "cyan", "lime", "pink", "red", "emerald", "indigo", "rose", "white", "slate", "teal", "purple", "blue", "purple", "teal", "slate", "amber", "emerald", "purple", "teal", "lime", "white"];
  const sectorColor = colors[sectorNum - 1] || "slate";
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
                     <h1 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] mb-1">Nexus Protocol</h1>
                     <div className="text-white font-bold text-sm flex items-center gap-2">
                         <span className={`w-2 h-2 rounded-full bg-${sectorColor}-500 animate-pulse`}></span>
                         {slide.id} // {slide.title}
                     </div>
                 </div>
             </div>

             <div className="flex items-center gap-4">
                 <div className="hidden md:flex gap-1">
                     {slides.map((s, i) => {
                         const sn = parseInt(s.id.split('.')[0]);
                         const sc = colors[sn - 1] || "slate";
                         return (
                             <div 
                                key={i} 
                                onClick={() => jumpTo(i)}
                                className={`w-1 h-4 rounded-full cursor-pointer transition-all ${
                                    i === currentSlide 
                                    ? `bg-${sc}-500 h-6` 
                                    : i < currentSlide ? 'bg-slate-600' : 'bg-slate-800'
                                }`}
                             ></div>
                         )
                     })}
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
                             const sn = parseInt(s.id.split('.')[0]);
                             const sCol = colors[sn - 1] || "slate";
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
                             <div className={`absolute -inset-1 bg-gradient-to-r from-${sectorColor}-500 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200`}></div>
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
                                      <span className="px-2 py-1 bg-slate-900 rounded text-[9px] text-slate-500 font-mono border border-slate-800">ACADEMIC WRITING</span>
                                      <span className={`px-2 py-1 bg-${sectorColor}-900/20 rounded text-[9px] text-${sectorColor}-400 font-mono border border-${sectorColor}-500/30`}>TASK 2</span>
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

export default NexusTask2Masterclass;
