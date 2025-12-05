
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Zap, Target, BookOpen, AlertTriangle, ShieldCheck, PenTool, CheckCircle2, X, FileWarning, EyeOff, Link, Hammer, Layers, RefreshCcw, ListOrdered, Bug, GitMerge } from 'lucide-react';

interface NexusMasterclassProps {
  onBack: () => void;
}

const NexusMasterclass: React.FC<NexusMasterclassProps> = ({ onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animate, setAnimate] = useState(true);

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
    }
  ];

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans relative overflow-hidden flex flex-col">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-indigo-500 to-fuchsia-500"></div>

        {/* Header */}
        <header className="px-8 py-6 flex justify-between items-center relative z-10 border-b border-slate-800">
             <div className="flex items-center gap-4">
                 <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white">
                     <ArrowLeft size={24} />
                 </button>
                 <div>
                     <h1 className="text-xs font-mono text-slate-500 uppercase tracking-[0.3em]">Nexus Masterclass</h1>
                     <div className="text-white font-bold text-lg">DATA RESPONSE PROTOCOLS</div>
                 </div>
             </div>
             <div className="flex items-center gap-2">
                 {slides.map((_, i) => (
                     <div key={i} className={`h-1.5 w-8 rounded-full transition-all duration-500 ${i === currentSlide ? 'bg-white shadow-[0_0_10px_white]' : 'bg-slate-800'}`}></div>
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
