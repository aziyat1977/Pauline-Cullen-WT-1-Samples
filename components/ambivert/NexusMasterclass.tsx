import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Zap, Target, BookOpen, AlertTriangle, ShieldCheck, PenTool, CheckCircle2, X } from 'lucide-react';

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
        title: "SECTOR 3: DATA HIERARCHY",
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
        title: "SECTOR 4: LEXICAL PRECISION",
        headline: "THE PEACOCK EFFECT",
        icon: <PenTool size={64} className="text-fuchsia-500" />,
        content: (
            <div className="space-y-8">
                <p className="text-2xl font-light text-slate-300">
                    Many students memorize "fancy" words to impress the examiner, like a peacock showing feathers.
                    <br/><span className="text-fuchsia-400 font-bold">This destroys your score if the meaning is wrong.</span>
                </p>

                <div className="space-y-4">
                    <div className="bg-slate-900 p-6 border-l-4 border-red-500 flex items-center justify-between group hover:bg-red-950/10 transition-colors">
                        <div>
                            <div className="text-xs font-mono text-red-500 mb-1">USER INPUT (BAND 6 ERROR)</div>
                            <p className="text-xl text-slate-300 group-hover:text-white transition-colors">"Prices experienced a <span className="line-through decoration-red-500 decoration-2">wild fluctuation</span>."</p>
                        </div>
                        <AlertTriangle className="text-red-500 opacity-50 group-hover:opacity-100" />
                    </div>

                    <div className="bg-slate-900 p-6 border-l-4 border-fuchsia-500 flex items-center justify-between group hover:bg-fuchsia-950/10 transition-colors">
                        <div>
                            <div className="text-xs font-mono text-fuchsia-500 mb-1">NEXUS CORRECTION (BAND 9)</div>
                            <p className="text-xl text-slate-300 group-hover:text-white transition-colors">"Prices <span className="text-fuchsia-400 font-bold">fluctuated significantly</span>."</p>
                        </div>
                        <CheckCircle2 className="text-fuchsia-500 opacity-50 group-hover:opacity-100" />
                    </div>

                    <div className="bg-slate-900 p-6 border-l-4 border-red-500 flex items-center justify-between group hover:bg-red-950/10 transition-colors">
                         <div>
                            <div className="text-xs font-mono text-red-500 mb-1">USER INPUT (PRECISION ERROR)</div>
                            <p className="text-xl text-slate-300 group-hover:text-white transition-colors">"A new <span className="line-through decoration-red-500 decoration-2">mall</span> will be added."</p>
                        </div>
                         <AlertTriangle className="text-red-500 opacity-50 group-hover:opacity-100" />
                    </div>
                     <div className="bg-slate-900 p-6 border-l-4 border-fuchsia-500 flex items-center justify-between group hover:bg-fuchsia-950/10 transition-colors">
                         <div>
                            <div className="text-xs font-mono text-fuchsia-500 mb-1">NEXUS CORRECTION (CONTEXTUAL)</div>
                            <p className="text-xl text-slate-300 group-hover:text-white transition-colors">"A new <span className="text-fuchsia-400 font-bold">shopping centre</span> will be constructed."</p>
                            <p className="text-xs text-slate-500 mt-1 italic">(Mall implies specific US context; Shopping Centre is neutral/academic)</p>
                        </div>
                         <CheckCircle2 className="text-fuchsia-500 opacity-50 group-hover:opacity-100" />
                    </div>
                </div>
            </div>
        )
    },
    {
        title: "SECTOR 5: TACTICAL SUMMARY",
        headline: "PROTOCOL CHECKLIST",
        icon: <ShieldCheck size={64} className="text-teal-500" />,
        content: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-6">
                     <h3 className="font-mono text-teal-500 text-sm uppercase tracking-widest border-b border-teal-900 pb-2">Do: Band 7+</h3>
                     <ul className="space-y-4">
                         {["Select the main features", "Highlight key features", "Make comparisons (where relevant)", "Present a clear overview"].map((item, i) => (
                             <li key={i} className="flex items-center gap-4 text-white text-lg">
                                 <CheckCircle2 size={24} className="text-teal-500 shrink-0" /> {item}
                             </li>
                         ))}
                     </ul>
                 </div>

                 <div className="space-y-6">
                     <h3 className="font-mono text-red-500 text-sm uppercase tracking-widest border-b border-red-900 pb-2">Don't: Band 6 Trap</h3>
                     <ul className="space-y-4">
                         {["List every number", "Include irrelevant details", "Use 'peacock' vocabulary", "Forget the overview"].map((item, i) => (
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