
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ArrowRight, Zap, BookOpen, AlertTriangle, ShieldCheck, 
  PenTool, CheckCircle2, X, Eye, 
  RefreshCcw, Grid, ChevronRight, TrendingUp, Search, 
  Clock, Trophy, ArrowUp, Factory, 
  Keyboard, Layers, Hash, Check,
  Database, FileText, Edit3, FastForward, Scale, Brain, Lightbulb, Link, Activity
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
      id: "1.2", title: "Diagnostic", icon: <AlertTriangle size={48} className="text-red-500" />,
      content: (
        <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white">The Band 6 Trap</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl border border-red-500/30 bg-red-950/20">
                    <h4 className="text-red-400 font-bold mb-2 uppercase text-xs tracking-widest flex items-center gap-2"><X size={14}/> Band 6 Descriptor</h4>
                    <p className="text-slate-300 italic text-sm">"Addresses all parts of the task although some parts may be more fully covered than others."</p>
                    <p className="text-slate-400 mt-4 text-xs font-mono">// RESULT: UNEVEN ARGUMENT</p>
                </div>
                <div className="p-6 rounded-xl border border-emerald-500/30 bg-emerald-950/20">
                    <h4 className="text-emerald-400 font-bold mb-2 uppercase text-xs tracking-widest flex items-center gap-2"><Check size={14}/> Band 7 Descriptor</h4>
                    <p className="text-slate-300 italic text-sm">"Presents a clear position throughout the response."</p>
                    <p className="text-slate-400 mt-4 text-xs font-mono">// RESULT: CONSISTENT STANCE</p>
                </div>
            </div>
            <div className="p-4 bg-slate-900 rounded border border-slate-800 text-center text-slate-400 text-sm">
                <strong className="text-white">Insight:</strong> You cannot get Band 7 if you figure out your opinion halfway through the essay.
            </div>
        </div>
      )
    },
    {
      id: "1.3", title: "Planning Myth", icon: <Clock size={48} className="text-indigo-500" />,
      content: (
        <div className="space-y-8">
            <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
                <h3 className="text-2xl font-bold text-white">The "No Time" Fallacy</h3>
            </div>
            <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 relative overflow-hidden group hover:border-indigo-500/30 transition-colors">
                <div className="absolute top-0 right-0 p-4 opacity-10"><Brain size={100}/></div>
                <p className="text-xl text-slate-300 leading-relaxed font-serif relative z-10">
                    "If you believe that you cannot afford to spend more time planning, then you need to be sure you can afford to keep retaking the test."
                </p>
                <div className="mt-4 text-xs font-mono text-indigo-400 uppercase tracking-widest">— Pauline Cullen</div>
            </div>
            <p className="text-slate-400 text-sm max-w-lg">
                Writing without planning is simply <span className="text-white font-bold">transcribing a disorganized thought process</span>. The examiner grades the text, not your thoughts.
            </p>
        </div>
      )
    },
    {
      id: "1.4", title: "The Builder", icon: <Factory size={48} className="text-orange-500" />,
      content: (
        <div className="flex flex-col h-full space-y-6">
            <h3 className="text-2xl font-bold text-orange-400">The Master Builder</h3>
            <div className="flex-1 bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col justify-center gap-6">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-red-900/20 text-red-400 rounded">Student</div>
                    <p className="text-slate-300 text-sm italic">"Aren't words like 'Firstly' and 'In addition' clichés? Shouldn't I avoid them?"</p>
                </div>
                <div className="flex items-start gap-4 flex-row-reverse text-right">
                    <div className="p-2 bg-emerald-900/20 text-emerald-400 rounded">Master</div>
                    <p className="text-slate-300 text-sm italic">"A builder never says: 'I won't use a hammer, everyone uses hammers, it's such a cliché.'"</p>
                </div>
            </div>
            <div className="text-center text-xs font-mono text-orange-500">
                PROTOCOL: USE THE TOOLS. DON'T REINVENT THEM.
            </div>
        </div>
      )
    },
    {
      id: "1.5", title: "Sector Mastery", icon: <Trophy size={48} className="text-yellow-500" />,
      content: (
        <div className="flex flex-col items-center justify-center h-full space-y-8 text-center">
            <h2 className="text-4xl font-black text-white">FOUNDATION SECURED</h2>
            <div className="w-32 h-32 bg-yellow-500/10 rounded-full flex items-center justify-center border-4 border-yellow-500 shadow-[0_0_50px_rgba(234,179,8,0.4)] animate-pulse">
                <ShieldCheck size={64} className="text-yellow-500" />
            </div>
            <p className="text-slate-400 max-w-md">
                Diagnostic complete. You have accepted the necessity of planning and the validity of standard linking tools.
            </p>
            <button onClick={triggerReward} className="px-8 py-3 bg-yellow-600 hover:bg-yellow-500 text-black font-black uppercase tracking-widest rounded-full transition-all hover:scale-105 shadow-lg shadow-yellow-600/20">
                Claim Reward
            </button>
        </div>
      )
    },

    // === SECTOR 2: COHERENCE ===
    {
        id: "2.1", title: "Flow Test", icon: <BookOpen size={48} className="text-blue-500" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Coherence vs. Reading</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-64">
                    <div className="bg-slate-900 p-4 rounded border border-slate-700 hover:border-red-500 transition-colors group cursor-pointer">
                        <div className="text-xs text-slate-500 uppercase mb-2 font-bold group-hover:text-red-400">Text A (Implicit)</div>
                        <p className="text-xs text-slate-300 leading-relaxed">"Fossils are found on land. Some are water animals. Ichythosaurs looked like dolphins. Turtles are harder to tell."</p>
                        <div className="mt-4 text-[10px] text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">DIAGNOSIS: FORCES READER TO GUESS LINKS</div>
                    </div>
                    <div className="bg-slate-900 p-4 rounded border border-slate-700 hover:border-emerald-500 transition-colors group cursor-pointer">
                        <div className="text-xs text-slate-500 uppercase mb-2 font-bold group-hover:text-emerald-400">Text B (Explicit)</div>
                        <p className="text-xs text-slate-300 leading-relaxed">"Fossils are found on land. <span className="text-emerald-400">However</span>, some are water animals. <span className="text-emerald-400">For example</span>, Ichythosaurs looked like dolphins."</p>
                        <div className="mt-4 text-[10px] text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">DIAGNOSIS: GUIDES THE READER</div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: "2.2", title: "Workforce Gap", icon: <Link size={48} className="text-pink-500" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-pink-400">The Broken Chain</h3>
                <div className="bg-slate-900 p-6 rounded-xl border border-pink-500/30 font-serif text-lg leading-loose text-slate-300">
                    <span className="bg-slate-800 px-1 rounded">People work longer hours.</span>
                    <span className="mx-2 text-red-500 font-bold text-xs">...</span>
                    <span className="bg-slate-800 px-1 rounded">They have job security fears.</span>
                </div>
                <div className="p-4 bg-red-900/10 border border-red-500/20 rounded text-sm text-red-300">
                    <strong>Problem:</strong> Is this a result? A cause? An addition? The reader shouldn't have to guess.
                </div>
                <div className="flex gap-2 justify-center">
                    {["Because", "Therefore", "In addition"].map((word, i) => (
                        <button key={i} className="px-3 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-500 transition-colors">{word}</button>
                    ))}
                </div>
            </div>
        )
    },
    {
        id: "2.3", title: "Referencing", icon: <Zap size={48} className="text-yellow-400" />,
        content: (
            <div className="space-y-8">
                <h3 className="text-2xl font-bold text-yellow-400">The "This" Fix</h3>
                <p className="text-slate-400">Native speakers often omit linking words. They use <span className="text-white font-bold">Referencing</span> instead.</p>
                
                <div className="bg-slate-900 p-6 rounded-xl border-l-4 border-yellow-500">
                    <p className="text-lg text-slate-300 font-serif">
                        "Companies are automating jobs. <span className="text-yellow-400 font-bold">This trend</span> is causing anxiety."
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900 border border-slate-700 rounded text-center">
                        <div className="text-xs text-slate-500 uppercase mb-1">Bad</div>
                        <div className="text-red-400">"This is causing..."</div>
                        <div className="text-[9px] text-slate-600 mt-1">(Vague)</div>
                    </div>
                    <div className="p-4 bg-slate-900 border border-slate-700 rounded text-center">
                        <div className="text-xs text-slate-500 uppercase mb-1">Good</div>
                        <div className="text-emerald-400">"This trend is causing..."</div>
                        <div className="text-[9px] text-slate-600 mt-1">(Specific Summary Noun)</div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: "2.4", title: "Linking Drill", icon: <Edit3 size={48} className="text-teal-500" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-teal-400">Cohesion Injection</h3>
                <p className="text-sm text-slate-400">Insert the correct cohesive device or reference.</p>
                <GapFill 
                    textWithGaps="Pollution is rising. [gap], the government is introducing a carbon tax. [gap] policy has been controversial."
                    answers={["consequently", "this"]}
                    hints={["result linker", "reference word"]}
                />
            </div>
        )
    },
    {
        id: "2.5", title: "Sector Mastery", icon: <CheckCircle2 size={48} className="text-white" />,
        content: (
            <div className="flex flex-col items-center justify-center h-full space-y-8 text-center">
                <h2 className="text-4xl font-black text-white">COHERENCE SECURED</h2>
                <div className="w-32 h-32 bg-teal-500/10 rounded-full flex items-center justify-center border-4 border-teal-500 shadow-[0_0_50px_rgba(20,184,166,0.4)] animate-spin-slow">
                    <Link size={64} className="text-teal-500" />
                </div>
                <p className="text-slate-400 max-w-md">
                    You have mastered the dual tools of explicit linking words and subtle referencing.
                </p>
                <button onClick={triggerReward} className="px-8 py-3 bg-teal-600 hover:bg-teal-500 text-black font-black uppercase tracking-widest rounded-full transition-all hover:scale-105 shadow-lg shadow-teal-600/20">
                    Sync Progress
                </button>
            </div>
        )
    },

    // === SECTOR 3: ARGUMENTATION ===
    {
        id: "3.1", title: "Argument Anatomy", icon: <Scale size={48} className="text-purple-500" />,
        content: (
            <div className="space-y-8">
                <h3 className="text-2xl font-bold text-white">The Formula</h3>
                <div className="p-6 bg-slate-900 border border-slate-700 rounded-xl text-center shadow-2xl">
                    <div className="text-3xl font-mono text-purple-400 tracking-wider">C + P = A</div>
                    <div className="mt-4 text-sm text-slate-400">
                        <span className="text-white font-bold">Conclusion</span> + <span className="text-white font-bold">Premises</span> (Reasons) = <span className="text-purple-400 font-bold">Argument</span>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="p-3 bg-purple-900/10 border border-purple-500/20 rounded flex justify-between items-center">
                        <span className="text-xs uppercase text-purple-400">Conclusion</span>
                        <span className="text-sm text-slate-300">"We should eat fruit."</span>
                    </div>
                    <div className="p-3 bg-blue-900/10 border border-blue-500/20 rounded flex justify-between items-center">
                        <span className="text-xs uppercase text-blue-400">Premise 1</span>
                        <span className="text-sm text-slate-300">"Fruit has Vitamin C."</span>
                    </div>
                    <div className="p-3 bg-blue-900/10 border border-blue-500/20 rounded flex justify-between items-center">
                        <span className="text-xs uppercase text-blue-400">Premise 2</span>
                        <span className="text-sm text-slate-300">"Vitamin C is healthy."</span>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: "3.2", title: "Validity Lab", icon: <AlertTriangle size={48} className="text-red-500" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-red-400">The "BBC" Trap</h3>
                <div className="p-6 bg-slate-900 border-l-4 border-red-500 shadow-xl">
                    <p className="text-lg italic text-slate-300 font-serif">
                        "We should eat fruit. For example, a recent BBC documentary showed that 85% of people love apples."
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-3"><X size={16} className="text-red-500"/> Does NOT explain <em>why</em> we should eat fruit.</div>
                    <div className="flex items-center gap-3"><X size={16} className="text-red-500"/> "Invented facts" lower your score.</div>
                    <div className="flex items-center gap-3"><CheckCircle2 size={16} className="text-emerald-500"/> Use logical reasons, not fake statistics.</div>
                </div>
            </div>
        )
    },
    {
        id: "3.3", title: "Logic Quiz", icon: <Brain size={48} className="text-cyan-500" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-cyan-400">Valid or Invalid?</h3>
                <div className="space-y-4">
                    {[
                        { q: "It is cloudy, so it might rain.", a: true },
                        { q: "Many people hate sports because there are no gyms.", a: false },
                        { q: "Phones distract drivers, so they should be banned while driving.", a: true }
                    ].map((item, i) => (
                        <div key={i} className="p-4 bg-slate-900 border border-slate-700 rounded flex justify-between items-center group hover:bg-slate-800 transition-colors">
                            <span className="text-xs text-slate-300 w-2/3">{item.q}</span>
                            <div className="flex gap-2">
                                <button className={`px-3 py-1 rounded text-[10px] font-bold ${item.a ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-500'}`}>VALID</button>
                                <button className={`px-3 py-1 rounded text-[10px] font-bold ${!item.a ? 'bg-red-600 text-white' : 'bg-slate-700 text-slate-500'}`}>INVALID</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    },
    {
        id: "3.4", title: "Hedging", icon: <ShieldCheck size={48} className="text-emerald-500" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-emerald-400">The Art of Hedging</h3>
                <p className="text-sm text-slate-400">Avoid absolute statements. Band 9 writers use caution.</p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-red-900/10 border border-red-500/20 rounded">
                        <div className="text-xs text-red-400 uppercase mb-2">Absolute (Dangerous)</div>
                        <p className="text-sm text-slate-300">"Playing video games <strong>causes</strong> violence."</p>
                    </div>
                    <div className="p-4 bg-emerald-900/10 border border-emerald-500/20 rounded">
                        <div className="text-xs text-emerald-400 uppercase mb-2">Hedged (Safe)</div>
                        <p className="text-sm text-slate-300">"Playing video games <strong>can lead to</strong> aggressive behavior."</p>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="text-xs text-slate-500 mb-2 font-mono">REWRITE THE SENTENCE:</div>
                    <WordScramble 
                        words={["tend", "Children", "copy", "to", "parents", "their"]}
                        solution="Children tend to copy their parents"
                    />
                </div>
            </div>
        )
    },
    {
        id: "3.5", title: "Sector Mastery", icon: <Lightbulb size={48} className="text-white" />,
        content: (
            <div className="flex flex-col items-center justify-center h-full space-y-8 text-center">
                <h2 className="text-4xl font-black text-white">LOGIC SECURED</h2>
                <div className="w-32 h-32 bg-purple-500/10 rounded-full flex items-center justify-center border-4 border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.4)] animate-pulse">
                    <Brain size={64} className="text-purple-500" />
                </div>
                <p className="text-slate-400 max-w-md">
                    Argumentation protocols updated. You can now build valid, hedged claims without resorting to invented evidence.
                </p>
                <button onClick={triggerReward} className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-black uppercase tracking-widest rounded-full transition-all hover:scale-105 shadow-lg shadow-purple-600/20">
                    Finalize Module
                </button>
            </div>
        )
    },

    // === SECTOR 4: EXECUTION ===
    {
        id: "4.1", title: "Circle Drill", icon: <RefreshCcw size={48} className="text-slate-300" />,
        content: (
            <div className="space-y-8">
                <h3 className="text-2xl font-bold text-white">Homework Protocol</h3>
                <div className="bg-slate-900 p-8 rounded-xl border border-slate-700 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5"><Activity size={100}/></div>
                    <ol className="list-decimal space-y-4 text-slate-300 pl-4 relative z-10">
                        <li>Take a previous essay.</li>
                        <li>Circle every connecting word (<em>However, Furthermore</em>).</li>
                        <li><strong>Check:</strong> Are there >2 sentences without a circle?</li>
                        <li>If <strong className="text-emerald-400">YES</strong>, did you use Referencing?</li>
                        <li>If <strong className="text-red-400">NO</strong>, you are practicing Band 6 Coherence. <span className="bg-red-900/50 text-red-200 px-2 py-1 rounded text-xs font-bold">FIX IT.</span></li>
                    </ol>
                </div>
            </div>
        )
    },
    {
        id: "4.2", title: "Analysis", icon: <Search size={48} className="text-indigo-400" />,
        content: (
            <div className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-white">Band 9 Paragraph Scan</h3>
                    <div className="text-xs font-mono text-emerald-400 bg-emerald-900/20 px-2 py-1 rounded border border-emerald-500/30">SCANNING...</div>
                </div>
                <div className="flex-1 bg-slate-900 rounded-xl p-1 border border-slate-800 overflow-hidden">
                    <div className="h-full overflow-y-auto p-4 custom-scrollbar">
                         <p className="text-sm text-slate-400 mb-4 font-mono">FIND: [connectors] [referencing] [hedging]</p>
                         <div className="font-serif text-lg leading-loose text-slate-300">
                             "Ideally, everyone would have access to free healthcare. <span className="bg-indigo-900/50 text-indigo-300 px-1 rounded border border-indigo-500/30">However</span>, <span className="bg-yellow-900/50 text-yellow-300 px-1 rounded border border-yellow-500/30">this ideal</span> is often difficult to achieve due to funding constraints. <span className="bg-indigo-900/50 text-indigo-300 px-1 rounded border border-indigo-500/30">Consequently</span>, governments <span className="bg-emerald-900/50 text-emerald-300 px-1 rounded border border-emerald-500/30">tend to</span> prioritize emergency services."
                         </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: "4.3", title: "Synthesis", icon: <CheckCircle2 size={48} className="text-white" />,
        content: (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                <h2 className="text-5xl font-black text-white">SYSTEM COMPLETE</h2>
                <div className="w-40 h-40 bg-gradient-to-tr from-indigo-500 to-emerald-600 rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(16,185,129,0.4)] animate-spin-slow">
                    <div className="w-36 h-36 bg-[#050505] rounded-full flex items-center justify-center">
                        <Trophy size={64} className="text-white" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                    <div className="p-4 bg-slate-900 border border-slate-800 rounded">
                        <div className="text-xs text-slate-500 uppercase">Logic</div>
                        <div className="text-emerald-500 font-bold">VERIFIED</div>
                    </div>
                    <div className="p-4 bg-slate-900 border border-slate-800 rounded">
                        <div className="text-xs text-slate-500 uppercase">Coherence</div>
                        <div className="text-emerald-500 font-bold">OPTIMIZED</div>
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
  const sectorColor = slide.id.startsWith("1") ? "amber" : slide.id.startsWith("2") ? "teal" : slide.id.startsWith("3") ? "purple" : "indigo";
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
                     <h1 className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] mb-1">Logic Protocol</h1>
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
                             const sCol = s.id.startsWith("1") ? "amber" : s.id.startsWith("2") ? "teal" : s.id.startsWith("3") ? "purple" : "indigo";
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
