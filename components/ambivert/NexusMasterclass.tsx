
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Zap, Target, BookOpen, AlertTriangle, ShieldCheck, PenTool, CheckCircle2, X, FileWarning, EyeOff, Link, Hammer, Layers, RefreshCcw, ListOrdered, Bug, GitMerge, Timer, Scan, Highlighter, Layout, Split, Move, Quote, Map, BarChart2, PieChart, Table, MousePointer2, Activity, Menu, Grid, RotateCcw, ChevronRight, Hash, TrendingUp, Search, Umbrella, Edit3, Check, Clock, TrendingDown, ClipboardCheck, ArrowDown, Headphones } from 'lucide-react';
import ChartDualView from '../features/ChartDualView';
import InteractiveMap from '../features/InteractiveMap';
import MapSports from '../features/MapSports';
import ChartHousing from '../features/ChartHousing';
import Chart3D from '../features/Chart3D';
import ChartCoffee from '../features/ChartCoffee';
import ChartFish from '../features/ChartFish';

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
    
    // Simple split by space, retaining punctuation attached
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
                    // Check if word matches a target (strip punctuation)
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
                <p className="text-xs text-slate-400 font-mono">Click words that show personal opinion / subjectivity.</p>
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
    // pairs = [{ term: "western", def: "in the west" }]
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
    // --- PAGE 1 ---
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
               
               <div className="mt-6 p-4 bg-slate-800 rounded-lg">
                   <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Quick Check: Correct the sentence</p>
                   <p className="text-slate-300 italic mb-2">"There has built a restaurant in the centre."</p>
                   <div className="text-emerald-400 font-bold">Answer: A restaurant has been built...</div>
               </div>
           </div>
        </div>
      )
    },

    // --- PAGE 2 ---
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
                <div className="bg-amber-950/30 p-6 rounded-xl border border-amber-600/30 text-center">
                    <Quote className="mx-auto text-amber-500 mb-2" size={24} />
                    <p className="text-amber-200 italic">"Writing is thinking we can see. Change your thinking to change your writing."</p>
                </div>
            </div>
        )
    },

    // --- PAGE 3 ---
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
                    
                    <div className="mt-4 flex gap-2 items-start">
                        <AlertTriangle className="text-red-500 shrink-0" size={16} />
                        <p className="text-xs text-red-300">
                            <strong>Problem:</strong> "On the contrary" is for opposing ideas, not just difference. "Lastly" implies a sequence of arguments, not spatial features.
                        </p>
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

    // --- PAGE 4 ---
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

    // --- PAGE 5 ---
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
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-400">
                    <div className="p-3 border border-slate-700 rounded">
                        <strong>Change 1:</strong><br/>"Well civilised" → "A tourist destination" (Fact)
                    </div>
                    <div className="p-3 border border-slate-700 rounded">
                        <strong>Change 2:</strong><br/>"Enormous ways" → "Significantly" (Academic quantifier)
                    </div>
                    <div className="p-3 border border-slate-700 rounded">
                        <strong>Change 3:</strong><br/>"Will amuse/delight" → "Can now go..." (Possibility, not emotion)
                    </div>
                </div>
            </div>
        )
    },

    // --- PAGE 6 & 7 ---
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

    // --- PAGE 8 & 9 (Answers) merged into previous logical flow --- 
    // Skipped explicit "Page 8/9" slide as it's the answer key to 6/7 provided above.

    // --- PAGE 10 ---
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

    // --- PAGE 11 ---
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

    // --- PAGE 12 ---
    {
        title: "PG 12: Sports Centre Task",
        headline: "NEW TASK ANALYSIS",
        icon: <Map size={64} className="text-slate-200" />,
        content: (
            <div className="space-y-6">
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-bold text-white mb-2 text-center">University Sports Centre</h2>
                    <p className="text-slate-400 text-sm mb-6">Summarise the information by selecting and reporting the main features.</p>
                    
                    <div className="w-full max-w-2xl bg-white p-4 rounded-xl shadow-2xl">
                        <MapSports />
                        <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-mono uppercase">
                            <span>Map A: Present</span>
                            <span>Map B: Future Plans</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    },

    // --- PAGE 13 ---
    {
        title: "PG 13: Sports Centre Exercises",
        headline: "APPLIED PRACTICE",
        icon: <Edit3 size={64} className="text-orange-500" />,
        content: (
            <div className="h-[500px] overflow-y-auto pr-4 space-y-12">
                
                {/* Q1 */}
                <section>
                    <h3 className="text-orange-400 font-bold mb-4 sticky top-0 bg-slate-950 py-2 z-10 border-b border-slate-800">Q1: Grammar Gap Fill</h3>
                    <div className="bg-slate-900 p-4 rounded-xl">
                        <GapFill 
                            textWithGaps="The two maps show an island both before and after it [gap] (develop) as a tourist destination. Overall, most development [gap] (take place) on the western areas... where amenities [gap] (build)."
                            answers={["was developed", "took place", "were built"]}
                            hints={["passive", "past", "passive"]}
                        />
                    </div>
                </section>

                {/* Q2 */}
                <section>
                    <h3 className="text-orange-400 font-bold mb-4 sticky top-0 bg-slate-950 py-2 z-10 border-b border-slate-800">Q2: Vocabulary Match</h3>
                    <VocabMatcher 
                        pairs={[
                            { term: "western", def: "in the west" },
                            { term: "uninhabited", def: "no one was living there" },
                            { term: "natural features", def: "features produced by nature" },
                            { term: "dense", def: "close together, thick" },
                            { term: "sympathetic", def: "showing an understanding of" },
                            { term: "single-storey", def: "having one level" }
                        ]}
                    />
                </section>

                {/* Q3 */}
                <section>
                    <h3 className="text-orange-400 font-bold mb-4 sticky top-0 bg-slate-950 py-2 z-10 border-b border-slate-800">Q3: Paragraph Completion</h3>
                    <div className="bg-slate-900 p-4 rounded-xl text-sm leading-loose text-slate-300">
                        <GapFill 
                            textWithGaps="The two maps show an island... Overall, most development took place on the [gap] and [gap] areas of the island, where a small number of tourist [gap] have been built."
                            answers={["western", "central", "amenities"]}
                        />
                    </div>
                </section>
            </div>
        )
    },

    // --- PAGE 14 & 15 (Answers) ---
    {
        title: "PG 14-15: Model Answers",
        headline: "FINAL VERIFICATION",
        icon: <ClipboardCheck size={64} className="text-emerald-500" />,
        content: (
            <div className="space-y-8">
                <div className="bg-slate-900 p-8 rounded-2xl border border-emerald-500/20 shadow-2xl">
                    <h3 className="text-emerald-400 font-bold mb-6 border-b border-emerald-900/50 pb-2">Full Model Response</h3>
                    <div className="text-slate-300 font-serif leading-loose text-sm space-y-4">
                        <p>The two maps show an island both before and after it <span className="text-emerald-400 font-bold">was developed</span> as a tourist destination. Overall, most development <span className="text-emerald-400 font-bold">took place</span> on the western and central areas of the island, where a small number of tourist amenities <span className="text-emerald-400 font-bold">have been built</span>, while the eastern coast <span className="text-emerald-400 font-bold">has been left</span> in its natural state.</p>
                        
                        <p>Prior to development, this relatively small island <span className="text-emerald-400 font-bold">was uninhabited</span>. In terms of its natural features, <span className="text-emerald-400 font-bold">there was</span> a beach area on the west coast, and some vegetation, which <span className="text-emerald-400 font-bold">was</span> more dense on the eastern part. As part of the development programme, this vegetation <span className="text-emerald-400 font-bold">has largely been retained</span>.</p>
                        
                        <p>Following construction, although the island is now more developed, the style of the buildings is generally <span className="text-emerald-400 font-bold">sympathetic</span> to the natural environment.</p>
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
                     <div className="text-white font-bold text-lg">LESSON 7: MAP TASKS & BEYOND</div>
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
