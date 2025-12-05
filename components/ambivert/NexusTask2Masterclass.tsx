
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ArrowRight, Zap, BookOpen, AlertTriangle, ShieldCheck, 
  PenTool, CheckCircle2, X, Eye, 
  RefreshCcw, Grid, ChevronRight, TrendingUp, Search, 
  Clock, Trophy, ArrowUp, Factory, 
  Keyboard, Layers, Hash, Check,
  Database, FileText, Edit3, FastForward, Scale, Brain, Lightbulb, Link, Activity,
  CloudRain, GraduationCap, Dumbbell, Smartphone, Bot, Mic, Construction, Anchor, AlertOctagon, HelpCircle, ArrowDown,
  Footprints, Glasses, Wind, FileX, Repeat, ZoomIn, Shuffle
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
        id: "2.2", title: "Referencing", icon: <Zap size={48} className="text-yellow-400" />,
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

    // === SECTOR 3: REASONING CORE ===
    {
        id: "3.1", title: "The 'Why' Gap", icon: <HelpCircle size={48} className="text-pink-500" />,
        content: (
            <div className="space-y-8">
                <h3 className="text-2xl font-bold text-white">The "Why" Vacuum</h3>
                <div className="p-6 bg-slate-900 border-l-4 border-pink-500 shadow-xl">
                    <p className="text-lg italic text-slate-300 font-serif mb-4">
                        "The government should encourage everyone to eat more fruit."
                    </p>
                    <div className="text-sm text-pink-400 font-bold bg-pink-900/20 p-2 rounded inline-block">
                        DIAGNOSIS: UNFOUNDED CLAIM
                    </div>
                </div>
                <p className="text-slate-400 text-sm">
                    Making a point is not enough. You must provide a reason for believing it. 
                    The reader needs to know <span className="text-white font-bold">how you know this</span> or <span className="text-white font-bold">why you believe it</span>.
                </p>
                <div className="flex gap-2 items-center text-xs text-slate-500 font-mono">
                    <AlertTriangle size={12} /> BAND 6: Confusing arguments vs Clear reasoning
                </div>
            </div>
        )
    },
    {
        id: "3.2", title: "Evidence Trap", icon: <Mic size={48} className="text-red-500" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-red-400">The "BBC" Trap</h3>
                <div className="p-6 bg-slate-900 border border-slate-700 rounded-xl">
                    <p className="text-md text-slate-300 font-serif mb-4">
                        "The government should encourage everyone to eat more fruit. <span className="text-red-400">For example, a BBC documentary showed that 85% of people eat fruit.</span>"
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-4 text-sm text-slate-400">
                    <div className="flex items-start gap-3 p-3 bg-red-900/10 border border-red-500/20 rounded">
                        <X size={16} className="text-red-500 mt-1 shrink-0"/> 
                        <span>It presents a clearly invented fact.</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-red-900/10 border border-red-500/20 rounded">
                        <X size={16} className="text-red-500 mt-1 shrink-0"/> 
                        <span>It does NOT explain the previous point or help us believe it.</span>
                    </div>
                    <div className="flex items-center justify-center p-3 text-emerald-400 font-bold bg-emerald-900/10 border border-emerald-500/20 rounded">
                        Valid arguments are logically connected.
                    </div>
                </div>
            </div>
        )
    },
    {
        id: "3.3", title: "Validity Audit", icon: <CheckCircle2 size={48} className="text-emerald-500" />,
        content: (
            <div className="space-y-4 h-full flex flex-col">
                <h3 className="text-xl font-bold text-emerald-400 mb-2">Audit The Logic</h3>
                <p className="text-xs text-slate-400">Identify valid arguments (logical connection) vs invalid (missing link).</p>
                <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                    {[
                        { q: "It is very cloudy, so there could be a storm soon.", a: true, reason: "Cloudy -> Storm is logical." },
                        { q: "Student's results will increase when they have a peaceful place to study.", a: false, reason: "What about teachers/books? Too big a leap." },
                        { q: "Mountain gorillas are an endangered species, so they could be extinct soon.", a: true, reason: "Endangered -> Extinction is logical." },
                        { q: "Many people dislike sport because there are not many sports facilities.", a: false, reason: "Is that the only reason? Unlikely." },
                        { q: "Phones distract drivers, so they should be illegal when driving.", a: true, reason: "Distraction -> Danger -> Illegal is logical." },
                        { q: "Robots will replace humans in most jobs because there are jobs robots can't do.", a: false, reason: "Contradiction." }
                    ].map((item, i) => (
                        <div key={i} className="p-3 bg-slate-900 border border-slate-700 rounded group hover:border-indigo-500 transition-all">
                            <p className="text-xs text-slate-300 mb-3 font-serif">"{item.q}"</p>
                            <div className="flex justify-between items-center">
                                <div className="flex gap-2">
                                    <button 
                                        className="px-3 py-1 rounded text-[10px] font-bold bg-slate-800 text-slate-500 hover:bg-emerald-600 hover:text-white transition-colors focus:bg-emerald-600 focus:text-white"
                                        title="Click if valid"
                                    >
                                        VALID
                                    </button>
                                    <button 
                                        className="px-3 py-1 rounded text-[10px] font-bold bg-slate-800 text-slate-500 hover:bg-red-600 hover:text-white transition-colors focus:bg-red-600 focus:text-white"
                                        title="Click if invalid"
                                    >
                                        INVALID
                                    </button>
                                </div>
                                <span className="text-[10px] text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity text-right w-1/2">
                                    {item.reason}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    },
    {
        id: "3.4", title: "The Contradiction", icon: <Bot size={48} className="text-cyan-500" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-cyan-400">Logic Crash</h3>
                <div className="bg-slate-900 p-6 rounded-xl border border-red-500/30">
                    <p className="text-sm text-slate-300 leading-relaxed font-serif">
                        "Robots will eventually <span className="text-cyan-400 font-bold">replace humans</span> in most jobs. It is convenient... However, there are a wide range of jobs that <span className="text-red-400 font-bold">robots will never be able to do</span>."
                    </p>
                </div>
                <div className="flex items-center gap-4 text-sm text-red-300 bg-red-950/30 p-4 rounded border border-red-500/20">
                    <AlertTriangle size={20} />
                    <span>Fatal Error: You cannot argue X will happen if you also argue X is impossible.</span>
                </div>
                <div className="bg-emerald-950/20 p-4 rounded border border-emerald-500/20">
                    <div className="text-xs text-emerald-500 font-bold mb-2">THE FIX: CRITICAL THINKING</div>
                    <p className="text-xs text-slate-400">
                        "<span className="text-white font-bold">Some people believe</span> robots will replace humans... <span className="text-white font-bold">Nevertheless</span>, there are jobs robots will never do."
                    </p>
                </div>
            </div>
        )
    },
    {
        id: "3.5", title: "Bridging the Gap", icon: <Link size={48} className="text-indigo-400" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-indigo-400">The Logical Leap</h3>
                <div className="p-4 bg-slate-900 border-l-4 border-red-500">
                    <p className="text-sm text-slate-400">
                        "Students' results can increase if they have a peaceful place to study."
                    </p>
                    <span className="text-[10px] text-red-500 font-bold mt-1 block">TOO BIG A LEAP. EXPLAIN WHY.</span>
                </div>
                <div className="flex justify-center">
                    <ArrowDown size={24} className="text-slate-600 animate-bounce" />
                </div>
                <div className="p-4 bg-slate-900 border-l-4 border-emerald-500">
                    <p className="text-sm text-slate-300">
                        "The environment we study in is important. If there is too much noise, it can be very difficult to concentrate. <span className="text-emerald-400 font-bold">In fact, even making sure that students have a peaceful place to study can improve their results.</span>"
                    </p>
                </div>
            </div>
        )
    },

    // === SECTOR 4: LANGUAGE PRECISION ===
    {
        id: "4.1", title: "Precision Check", icon: <Activity size={48} className="text-orange-500" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-orange-400">Grammar vs. Clarity</h3>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
                    <p className="text-lg text-slate-300 font-serif italic">
                        "Primary level children are more sharp and their grasping power to learn something new is fast."
                    </p>
                </div>
                <div className="text-sm text-slate-400">
                    <span className="text-emerald-400 font-bold">Verdict:</span> Clear idea, but poor grammar.
                    <br/>
                    <span className="text-red-400 font-bold">Verdict:</span> "Hence, it is convenient for them to influence people for any service." -> <span className="text-white">Unintelligible.</span>
                </div>
                <div className="p-4 bg-orange-950/20 border border-orange-500/20 rounded text-center">
                    <p className="text-xs text-orange-300 font-mono">
                        PROTOCOL: IF GRAMMAR OBSCURES MEANING, BAND SCORE DROPS BELOW 6.
                    </p>
                </div>
            </div>
        )
    },
    {
        id: "4.2", title: "Extreme Hazard", icon: <AlertOctagon size={48} className="text-red-500" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-red-400">Catastrophic Language</h3>
                <p className="text-sm text-slate-400">Band 6.5 essays often feature "extreme" adjectives that don't fit.</p>
                
                <div className="bg-slate-900 p-4 border-l-4 border-red-500">
                    <p className="text-sm text-slate-300">"On the societal level, the results may be <span className="text-red-400 font-bold underline">catastrophic</span> if this is the case."</p>
                </div>

                <div className="p-4 bg-slate-800 rounded text-xs text-slate-400">
                    <strong className="text-white">Context:</strong> Buying the same things in different countries.
                    <br/><br/>
                    Is this a sudden event causing great destruction? <span className="text-red-400 font-bold">NO.</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-2 bg-red-900/10 rounded text-red-400 text-xs line-through decoration-red-500">Disastrous</div>
                    <div className="text-center p-2 bg-emerald-900/10 rounded text-emerald-400 text-xs font-bold">Problematic / Concerning</div>
                </div>
            </div>
        )
    },

    // === SECTOR 5: ARGUMENT PATTERNS ===
    {
        id: "5.1", title: "Pattern A: Add", icon: <Layers size={48} className="text-blue-400" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-blue-400">Arguing by Addition</h3>
                <p className="text-xs text-slate-400">Building a wall of reasons. Use specific signposts.</p>
                
                <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-slate-900 rounded border border-slate-700">
                        <span className="text-blue-500 font-black font-mono">01</span>
                        <div className="text-sm text-slate-300"><span className="text-blue-400 font-bold">Firstly</span>, the money can be used for roads...</div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-900 rounded border border-slate-700">
                        <span className="text-blue-500 font-black font-mono">02</span>
                        <div className="text-sm text-slate-300"><span className="text-blue-400 font-bold">Secondly</span>, existing infrastructure can be repaired.</div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-900 rounded border border-slate-700">
                        <span className="text-blue-500 font-black font-mono">03</span>
                        <div className="text-sm text-slate-300"><span className="text-blue-400 font-bold">Finally</span>, funds are needed for public salaries.</div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-900/20 rounded border border-blue-500/30">
                        <span className="text-blue-400 font-black font-mono">>></span>
                        <div className="text-sm text-white"><span className="text-blue-400 font-bold">Thus</span>, taxes help make the community safer.</div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: "5.2", title: "Pattern B: Emphasis", icon: <Zap size={48} className="text-yellow-500" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-yellow-400">Arguing by Emphasis</h3>
                <p className="text-xs text-slate-400">When one reason is more important than others.</p>
                
                <div className="bg-slate-900 p-6 rounded-xl border border-yellow-500/30 relative">
                    <div className="absolute top-2 right-2 text-yellow-500/20 font-black text-6xl">!</div>
                    <p className="text-sm text-slate-300 leading-loose">
                        "Money can be used for roads or hospitals. <span className="text-yellow-400 font-bold">More importantly</span>, these funds are needed to pay salaries. Thus, taxes <span className="text-yellow-400 font-bold">not only</span> help improve the community <span className="text-yellow-400 font-bold">but also</span> make it safer."
                    </p>
                </div>

                <div className="flex gap-2 justify-center text-xs font-mono text-slate-500">
                    <span>Moreover</span> • <span>Furthermore</span> • <span>Even more importantly</span>
                </div>
            </div>
        )
    },
    {
        id: "5.3", title: "Tone Analysis", icon: <Mic size={48} className="text-purple-400" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-purple-400">Tone: Essay vs News</h3>
                <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 bg-slate-900 border-l-4 border-slate-500 opacity-60">
                        <h4 className="text-xs uppercase text-slate-500 mb-1">Version 1 (Robotic)</h4>
                        <p className="text-xs text-slate-400">"Taxes are collected. Roads are built. Infrastructure is repaired. Salaries are paid."</p>
                        <div className="text-[9px] mt-2 text-slate-600">SOUNDS LIKE A LIST. HARD TO READ.</div>
                    </div>
                    <div className="p-4 bg-purple-900/10 border-l-4 border-purple-500">
                        <h4 className="text-xs uppercase text-purple-400 mb-1">Version 2 (Cohesive)</h4>
                        <p className="text-xs text-slate-300">"Taxes are collected <span className="text-purple-400">so that</span> roads can be built... <span className="text-purple-400">Furthermore</span>, funds are needed..."</p>
                        <div className="text-[9px] mt-2 text-purple-300">SOUNDS LIKE A BAND 9 ARGUMENT.</div>
                    </div>
                </div>
            </div>
        )
    },

    // === SECTOR 6: CHAIN REACTIONS ===
    {
        id: "6.1", title: "Domino Effect", icon: <Layers size={48} className="text-cyan-500" />,
        content: (
            <div className="flex flex-col h-full space-y-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-cyan-900/20 rounded-lg text-cyan-400"><Database size={24}/></div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Cause & Effect Chains</h3>
                        <p className="text-xs text-slate-400 font-mono">LOGICAL PROGRESSION</p>
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-center gap-2">
                    {[
                        { txt: "Lack of houses", col: "border-slate-600" },
                        { txt: "Increased homelessness", col: "border-cyan-700" },
                        { txt: "Problem for charities", col: "border-cyan-500" },
                        { txt: "Pressure on food/shelter", col: "border-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.3)]" }
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <div className={`w-full max-w-sm p-3 bg-slate-900 border-2 ${item.col} rounded-lg text-center text-slate-300 text-sm font-bold transition-transform hover:scale-105`}>
                                {item.txt}
                            </div>
                            {i < 3 && <div className="h-4 w-0.5 bg-slate-700 my-1"></div>}
                        </div>
                    ))}
                </div>
                
                <div className="text-center text-[10px] text-slate-500 font-mono">
                    USE: "This means that..." / "This causes..." / "As a result..." / "In turn..."
                </div>
            </div>
        )
    },
    {
        id: "6.2", title: "Speculation", icon: <Lightbulb size={48} className="text-yellow-300" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-yellow-300">Speculation Protocol</h3>
                <p className="text-sm text-slate-400">Do not state predictions as facts unless certain. Use modals.</p>
                
                <div className="grid grid-cols-1 gap-3">
                    <div className="p-4 bg-slate-900 rounded border border-slate-700 flex justify-between items-center">
                        <span className="text-sm text-slate-300">"The action <strong>already</strong> happens regularly."</span>
                        <span className="text-xs font-bold text-emerald-500 bg-emerald-900/20 px-2 py-1 rounded">Present Tense</span>
                    </div>
                    <div className="p-4 bg-slate-900 rounded border border-slate-700 flex justify-between items-center">
                        <span className="text-sm text-slate-300">"The action is <strong>possible</strong> in future."</span>
                        <span className="text-xs font-bold text-yellow-500 bg-yellow-900/20 px-2 py-1 rounded">Could / May / Might</span>
                    </div>
                    <div className="p-4 bg-slate-900 rounded border border-slate-700 flex justify-between items-center">
                        <span className="text-sm text-slate-300">"The action is <strong>definite</strong>."</span>
                        <span className="text-xs font-bold text-red-500 bg-red-900/20 px-2 py-1 rounded">Will</span>
                    </div>
                </div>
                <div className="bg-yellow-900/10 p-4 rounded text-center border border-yellow-500/20">
                    <p className="text-xs text-yellow-200">
                        "If the government built more housing, this <span className="font-bold underline">could</span> improve the situation." (Conditional)
                    </p>
                </div>
            </div>
        )
    },
    {
        id: "6.3", title: "Prediction Drill", icon: <FastForward size={48} className="text-indigo-400" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-indigo-400">Tense Check</h3>
                <p className="text-sm text-slate-400">Match the sentence to the meaning.</p>
                <GapFill 
                    textWithGaps="1. If the government helps, this [gap] solve the problem. (Definite) / 2. Homeless people [gap] free accommodation. (Regularly) / 3. Very few people [gap] be upset if taxes increased. (Possible)"
                    answers={["will", "are given", "would"]}
                    hints={["definite result", "present passive", "conditional"]}
                />
            </div>
        )
    },

    // === SECTOR 8: LOGIC TRAPS (NEW) ===
    {
        id: "8.1", title: "Assumption Jump", icon: <Footprints size={48} className="text-pink-500" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-pink-400">The "John" Fallacy</h3>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
                    <p className="text-lg text-slate-300 font-serif mb-4">
                        "John has arrived late for work every day this week. <span className="text-pink-400 font-bold bg-pink-900/20 px-1">Clearly, he is not committed to his job.</span>"
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900 border border-slate-700 rounded text-center">
                        <div className="text-xs text-slate-500 uppercase mb-2">Fact</div>
                        <div className="text-emerald-400 font-mono">LATE ARRIVAL</div>
                    </div>
                    <div className="p-4 bg-slate-900 border border-slate-700 rounded text-center">
                        <div className="text-xs text-slate-500 uppercase mb-2">Conclusion</div>
                        <div className="text-red-400 font-mono">LAZY / UNCOMMITTED</div>
                    </div>
                </div>
                <div className="p-4 bg-pink-900/20 border border-pink-500/20 rounded text-center text-sm text-pink-200">
                    <AlertTriangle size={16} className="inline mr-2" />
                    ERROR: JUMPING TO CONCLUSION. (Could be traffic, illness, family).
                </div>
            </div>
        )
    },
    {
        id: "8.2", title: "Perspective Drift", icon: <Glasses size={48} className="text-cyan-400" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-cyan-400">The "Driving" Error</h3>
                <p className="text-sm text-slate-400">Essay Topic: "People spend too much time travelling to work."</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-red-900/10 border border-red-500/30 rounded opacity-70">
                        <h4 className="text-xs uppercase text-red-400 mb-2 font-bold">Candidate's Draft</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                            "Fossil fuels are being depleted. By 2050 resources will be used up. Driving more means more carbon emissions."
                        </p>
                        <div className="mt-2 text-[10px] text-red-400 font-mono">PROBLEM: TOPIC WAS 'TRAVELLING', NOT 'DRIVING'.</div>
                    </div>
                    <div className="p-4 bg-emerald-900/10 border border-emerald-500/30 rounded">
                        <h4 className="text-xs uppercase text-emerald-400 mb-2 font-bold">Corrected Version</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                            "<span className="text-emerald-400 font-bold">In my country, the vast majority of people drive.</span> Therefore, spending more time travelling means they are driving more."
                        </p>
                        <div className="mt-2 text-[10px] text-emerald-400 font-mono">FIX: CLARIFY PERSPECTIVE ("In my country...").</div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: "8.3", title: "Butterfly Fallacy", icon: <Wind size={48} className="text-orange-400" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-orange-400">Trivial to Extreme</h3>
                <div className="flex flex-col items-center gap-4">
                    <div className="p-4 bg-slate-900 border border-slate-700 rounded-xl w-full text-center">
                        <p className="text-sm text-slate-300">"Buying a Zara handbag"</p>
                        <div className="text-[10px] text-slate-500 uppercase mt-1">TRIVIAL ACTION</div>
                    </div>
                    <ArrowDown size={24} className="text-slate-600" />
                    <div className="p-4 bg-slate-900 border border-slate-700 rounded-xl w-full text-center">
                        <p className="text-sm text-slate-300">"Saves money -> No need to fly to US"</p>
                        <div className="text-[10px] text-slate-500 uppercase mt-1">LOGICAL STEP?</div>
                    </div>
                    <ArrowDown size={24} className="text-slate-600" />
                    <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-xl w-full text-center shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                        <p className="text-lg font-bold text-red-400">"GLOBAL TOURISM COLLAPSE"</p>
                        <div className="text-[10px] text-red-300 uppercase mt-1">EXTREME CONCLUSION</div>
                    </div>
                </div>
            </div>
        )
    },

    // === SECTOR 9: EVIDENCE PROTOCOLS (NEW) ===
    {
        id: "9.1", title: "Template Stat", icon: <FileX size={48} className="text-red-500" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-red-400">The "Fake Stat" Trap</h3>
                <div className="bg-slate-900 p-6 rounded-xl border-l-4 border-red-500">
                    <p className="text-sm text-slate-300 leading-relaxed font-serif">
                        "To tackle this problem... corporate tax incentive. <span className="text-red-400 font-bold bg-red-900/20">For example, a similar initiative was launched by the United States government in San Francisco, which has resulted in Tesla's yearly corporate taxes to reduce by 35%.</span>"
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-2 text-sm text-slate-400">
                    <div className="flex items-center gap-2 text-red-300"><X size={14}/> <span>Clearly invented statistic.</span></div>
                    <div className="flex items-center gap-2 text-red-300"><X size={14}/> <span>"Template" style filling.</span></div>
                    <div className="flex items-center gap-2 text-red-300"><X size={14}/> <span>Does not explain the main idea.</span></div>
                </div>
                <div className="text-center text-xs text-slate-500 font-mono mt-4">
                    REAL EXAMPLES DO NOT NEED FAKE NUMBERS. THEY NEED LOGIC.
                </div>
            </div>
        )
    },
    {
        id: "9.2", title: "Echo Loop", icon: <Repeat size={48} className="text-purple-400" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-purple-400">Circular Examples</h3>
                <div className="flex flex-col gap-4">
                    <div className="p-4 bg-slate-900 rounded border border-slate-700">
                        <div className="text-xs text-slate-500 uppercase mb-1">Claim</div>
                        <p className="text-sm text-white">"If good transport is provided, people will use public transport."</p>
                    </div>
                    <div className="p-4 bg-purple-900/10 rounded border border-purple-500/30">
                        <div className="text-xs text-purple-400 uppercase mb-1">Bad Example</div>
                        <p className="text-sm text-purple-100">"For example, if fast metro trains are provided, people will go to school by metro."</p>
                    </div>
                </div>
                <div className="p-4 bg-emerald-900/10 rounded border border-emerald-500/30 mt-2">
                    <div className="text-xs text-emerald-400 uppercase mb-1">Correction</div>
                    <p className="text-sm text-emerald-100">"For example, cities like <span className="font-bold">London and Tokyo</span> see high usage because the network covers all major destinations."</p>
                </div>
            </div>
        )
    },
    {
        id: "9.3", title: "Macro/Micro", icon: <ZoomIn size={48} className="text-teal-400" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-teal-400">General Idea vs Specific Evidence</h3>
                <p className="text-sm text-slate-400">Sort the concepts.</p>
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <div className="text-xs font-bold text-slate-500 text-center uppercase">General (Idea)</div>
                        <div className="p-3 bg-slate-800 rounded text-center text-xs text-slate-300">Government collects taxes</div>
                        <div className="p-3 bg-slate-800 rounded text-center text-xs text-slate-300">Population exceeds housing</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-xs font-bold text-teal-500 text-center uppercase">Specific (Evidence)</div>
                        <div className="p-3 bg-teal-900/20 border border-teal-500/30 rounded text-center text-xs text-teal-200">Pay police/firefighter salaries</div>
                        <div className="p-3 bg-teal-900/20 border border-teal-500/30 rounded text-center text-xs text-teal-200">Increased homelessness</div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: "9.4", title: "The Pivot", icon: <Shuffle size={48} className="text-indigo-400" />,
        content: (
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-indigo-400">Reversing the Flow</h3>
                <p className="text-sm text-slate-400">You can structure arguments in two directions.</p>
                
                <div className="space-y-4">
                    <div className="p-4 bg-slate-900 border-l-4 border-indigo-500">
                        <div className="text-xs text-indigo-400 font-bold mb-1">Standard Flow</div>
                        <p className="text-sm text-white">"Taxes help improve the community. <span className="text-indigo-400 font-bold">For example</span>, the funds are used to pay salaries..."</p>
                        <div className="text-[10px] text-slate-500 mt-1 font-mono">IDEA -> EXAMPLE</div>
                    </div>
                    
                    <div className="flex justify-center"><RefreshCcw size={16} className="text-slate-600"/></div>

                    <div className="p-4 bg-slate-900 border-l-4 border-emerald-500">
                        <div className="text-xs text-emerald-400 font-bold mb-1">Reverse Flow</div>
                        <p className="text-sm text-white">"These funds are used to pay the salaries of government workers. <span className="text-emerald-400 font-bold">Thus</span>, taxes help improve the community..."</p>
                        <div className="text-[10px] text-slate-500 mt-1 font-mono">EVIDENCE -> CONCLUSION (THUS)</div>
                    </div>
                </div>
            </div>
        )
    },

    // === SECTOR 10: COMPLETION ===
    {
        id: "10.1", title: "Mastery Synthesis", icon: <CheckCircle2 size={48} className="text-white" />,
        content: (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                <h2 className="text-5xl font-black text-white">TASK 2 SECURED</h2>
                <div className="w-40 h-40 bg-gradient-to-tr from-indigo-500 to-emerald-600 rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(16,185,129,0.4)] animate-spin-slow">
                    <div className="w-36 h-36 bg-[#050505] rounded-full flex items-center justify-center">
                        <Trophy size={64} className="text-white" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                    <div className="p-4 bg-slate-900 border border-slate-800 rounded">
                        <div className="text-xs text-slate-500 uppercase">Reasoning</div>
                        <div className="text-emerald-500 font-bold">VALIDATED</div>
                    </div>
                    <div className="p-4 bg-slate-900 border border-slate-800 rounded">
                        <div className="text-xs text-slate-500 uppercase">Tone</div>
                        <div className="text-emerald-500 font-bold">ACADEMIC</div>
                    </div>
                    <div className="p-4 bg-slate-900 border border-slate-800 rounded">
                        <div className="text-xs text-slate-500 uppercase">Logic</div>
                        <div className="text-emerald-500 font-bold">SURGICAL</div>
                    </div>
                    <div className="p-4 bg-slate-900 border border-slate-800 rounded">
                        <div className="text-xs text-slate-500 uppercase">Evidence</div>
                        <div className="text-emerald-500 font-bold">PROOFED</div>
                    </div>
                </div>
                <button onClick={triggerReward} className="mt-8 px-10 py-4 bg-white text-black font-black uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                    Sync to Core
                </button>
            </div>
        )
    }
  ];

  const slide = slides[currentSlide];
  const sectorColor = slide.id.startsWith("1") ? "amber" : slide.id.startsWith("2") ? "teal" : slide.id.startsWith("3") ? "purple" : slide.id.startsWith("4") ? "orange" : slide.id.startsWith("5") ? "blue" : slide.id.startsWith("6") ? "cyan" : slide.id.startsWith("8") ? "pink" : slide.id.startsWith("9") ? "red" : "emerald";
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
                             const sCol = s.id.startsWith("1") ? "amber" : s.id.startsWith("2") ? "teal" : s.id.startsWith("3") ? "purple" : s.id.startsWith("4") ? "orange" : s.id.startsWith("5") ? "blue" : s.id.startsWith("6") ? "cyan" : s.id.startsWith("8") ? "pink" : s.id.startsWith("9") ? "red" : "emerald";
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
