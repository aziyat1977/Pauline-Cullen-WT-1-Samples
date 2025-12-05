

import React, { useState } from 'react';
import { ArrowLeft, Menu, Activity, Moon, Sun, Layers, Network, Zap, Brain, Cpu, Radio, X, Swords, Trophy, Play } from 'lucide-react';
import FluxLesson from './FluxLesson';
import NexusCanvas from '../features/NexusCanvas';
import CoreInterface from './CoreInterface';
import NexusAvatar from '../features/NexusAvatar';
import { useSuperAI } from '../../hooks/useSuperAI';
import GamifiedQuiz from '../features/GamifiedQuiz';
import { KAHOOT_QUIZ_1, KAHOOT_QUIZ_2, KAHOOT_QUIZ_3, KAHOOT_QUIZ_4, KAHOOT_QUIZ_5, KAHOOT_QUIZ_6, KAHOOT_QUIZ_7, KAHOOT_QUIZ_8, KAHOOT_QUIZ_9, KAHOOT_QUIZ_10 } from '../../constants';

interface TheNexusProps {
  onExit: () => void;
  onOpenMenu?: () => void;
}

const TheNexus: React.FC<TheNexusProps> = ({ onExit, onOpenMenu }) => {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [surgicalDrill, setSurgicalDrill] = useState<any | null>(null);
  const [activeArenaQuiz, setActiveArenaQuiz] = useState<number | null>(null);
  
  // Connect to C.O.R.E.
  const { track } = useSuperAI();
  
  React.useEffect(() => {
      track('ENTER_NEXUS', { type: 'general', result: 'neutral' });
  }, []);

  const modules = [
    { 
        id: 'flight', 
        title: 'Flight Data', 
        solarDesc: 'Fast-paced data identification training.',
        lunarDesc: 'Deep structural analysis and logic.',
        icon: <Activity size={20} />
    },
    { 
        id: 'housing', 
        title: 'Tenure Trends', 
        solarDesc: 'Interactive demographic shifting.',
        lunarDesc: 'Sociological trend deconstruction.',
        icon: <Layers size={20} />
    },
    { 
        id: 'transport', 
        title: 'Emission Stats', 
        solarDesc: 'Rapid magnitude comparison.',
        lunarDesc: 'Environmental impact logic mapping.',
        icon: <Network size={20} />
    }
  ];

  const arenaQuizzes = [
      { id: 1, title: 'Trend Velocity', data: KAHOOT_QUIZ_1 },
      { id: 2, title: 'Comparatives', data: KAHOOT_QUIZ_2 },
      { id: 3, title: 'Spatial Logic', data: KAHOOT_QUIZ_3 },
      { id: 4, title: 'Grammar Core', data: KAHOOT_QUIZ_4 },
      { id: 5, title: 'Process Flow', data: KAHOOT_QUIZ_5 },
      { id: 6, title: 'Lexical Power', data: KAHOOT_QUIZ_6 },
      { id: 7, title: 'Data Select', data: KAHOOT_QUIZ_7 },
      { id: 8, title: 'Cohesion', data: KAHOOT_QUIZ_8 },
      { id: 9, title: 'Overview Logic', data: KAHOOT_QUIZ_9 },
      { id: 10, title: 'Error Correction', data: KAHOOT_QUIZ_10 },
  ];

  // Advanced Navigation Logic
  const handleNextModule = () => {
    const currentIndex = modules.findIndex(m => m.id === activeModuleId);
    if (currentIndex >= 0 && currentIndex < modules.length - 1) {
        setActiveModuleId(modules[currentIndex + 1].id);
    } else {
        setActiveModuleId(null); // Loop back to Hub if at end
    }
  };

  const handlePrevModule = () => {
    const currentIndex = modules.findIndex(m => m.id === activeModuleId);
    if (currentIndex > 0) {
        setActiveModuleId(modules[currentIndex - 1].id);
    } else {
        setActiveModuleId(null); // Return to Hub if at start
    }
  };

  if (activeModuleId) {
      return (
        <FluxLesson 
            moduleId={activeModuleId} 
            onBack={() => setActiveModuleId(null)} 
            onExit={onExit}
            onNext={handleNextModule}
            onPrev={handlePrevModule}
            isFirst={modules.findIndex(m => m.id === activeModuleId) === 0}
            isLast={modules.findIndex(m => m.id === activeModuleId) === modules.length - 1}
        />
      );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-teal-500 selection:text-white relative overflow-hidden">
        {/* Animated Background */}
        <NexusCanvas />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_90%)] pointer-events-none z-0"></div>
        
        {/* 3D AI COMPANION */}
        <NexusAvatar />

        {/* Surgical Drill Modal */}
        {surgicalDrill && (
            <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
                <div className="max-w-2xl w-full bg-[#020617] border-2 border-red-500/50 rounded-sm p-12 relative shadow-[0_0_100px_rgba(239,68,68,0.2)]">
                    <button 
                        onClick={() => setSurgicalDrill(null)}
                        className="absolute top-4 right-4 text-slate-500 hover:text-white"
                    >
                        <X size={24} />
                    </button>
                    
                    <div className="mb-8 border-b border-red-900/30 pb-4">
                        <div className="flex items-center gap-3 text-red-500 font-bold font-mono text-sm tracking-widest uppercase mb-2">
                             <Activity size={16} /> Surgical Intervention Active
                        </div>
                        <h2 className="text-3xl font-black text-white">{surgicalDrill.diagnosis}</h2>
                        <p className="text-slate-400 mt-2 font-mono text-xs">DRILL_TYPE: {surgicalDrill.drill_type}</p>
                    </div>

                    <div className="mb-8">
                        <p className="text-xl font-medium text-slate-200 leading-relaxed">{surgicalDrill.question}</p>
                    </div>

                    <div className="grid gap-3 mb-8">
                        {surgicalDrill.options?.map((opt: string, i: number) => (
                            <button 
                                key={i}
                                onClick={() => {
                                    const isCorrect = i === surgicalDrill.correctIndex;
                                    track(isCorrect ? 'DRILL_SUCCESS' : 'DRILL_FAILURE', { type: 'general', result: isCorrect ? 'success' : 'failure' });
                                    if (isCorrect) {
                                        alert("CORRECTION APPLIED. NEURAL MAP UPDATED.");
                                        setSurgicalDrill(null);
                                    } else {
                                        alert("INCORRECT. FOCUS.");
                                    }
                                }}
                                className="p-4 bg-slate-900 hover:bg-red-900/20 border border-slate-800 hover:border-red-500/50 text-left transition-all text-slate-300 hover:text-red-300 group"
                            >
                                <span className="font-mono text-xs text-slate-500 mr-3 group-hover:text-red-500">[{String.fromCharCode(65+i)}]</span>
                                {opt}
                            </button>
                        ))}
                    </div>

                    <div className="text-[10px] text-slate-600 font-mono text-center">
                        FAILING TO COMPLETE THIS DRILL WILL RESULT IN LOCKED MODULES.
                    </div>
                </div>
            </div>
        )}

        {/* ARENA QUIZ MODAL */}
        {activeArenaQuiz && (
            <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
                <div className="w-full max-w-4xl relative">
                     <button 
                        onClick={() => setActiveArenaQuiz(null)}
                        className="absolute -top-12 right-0 text-white hover:text-red-400 transition-colors flex items-center gap-2"
                     >
                         <span className="text-xs font-mono uppercase tracking-widest">Abort Protocol</span> <X size={24} />
                     </button>
                     <GamifiedQuiz 
                        questions={arenaQuizzes.find(q => q.id === activeArenaQuiz)?.data || []} 
                        title={`ARENA PROTOCOL ${activeArenaQuiz}`}
                        onComplete={(score) => {
                             track('ARENA_COMPLETE', { type: 'general', result: score > 10 ? 'success' : 'failure' });
                        }} 
                     />
                </div>
            </div>
        )}

        <div className="max-w-7xl mx-auto px-6 py-8 relative z-10 flex flex-col min-h-screen">
            {/* Header */}
            <header className="flex justify-between items-start mb-12 border-b border-slate-800/50 pb-6">
                <div className="flex flex-col gap-4">
                     <div className="flex items-center gap-6">
                        {onOpenMenu && (
                            <button onClick={onOpenMenu} className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg">
                                <Menu size={24} />
                            </button>
                        )}
                        <button onClick={onExit} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-teal-400 transition-colors group">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            System Exit
                        </button>
                    </div>
                    <div className="animate-fade-in-up">
                        <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-1">
                            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 animate-pulse-glow">NEXUS</span>
                        </h1>
                        <p className="text-sm font-mono text-teal-500/60 uppercase tracking-widest flex items-center gap-2">
                            <Radio size={12} className="animate-pulse" /> Neural Bridge Active
                        </p>
                    </div>
                </div>

                <div className="hidden md:flex gap-4">
                    <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg backdrop-blur-sm w-40">
                        <div className="flex justify-between text-[10px] text-slate-500 uppercase tracking-wider mb-2">
                             <span>Cognitive Load</span>
                             <Cpu size={12} />
                        </div>
                        <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                             <div className="h-full bg-teal-500 w-[45%] animate-[pulse_3s_infinite]"></div>
                        </div>
                        <div className="mt-2 text-xs font-mono text-teal-400">OPTIMAL</div>
                    </div>
                </div>
            </header>

            {/* C.O.R.E. HUD */}
            <div className="mb-12 animate-fade-in-up">
                <CoreInterface onStartChallenge={setSurgicalDrill} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                {/* Modules Grid */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 content-start animate-fade-in-up stagger-1">
                    {modules.map((mod, idx) => (
                        <div 
                            key={mod.id} 
                            className="group relative bg-slate-900/40 border border-slate-800 rounded-sm overflow-hidden hover:border-teal-500/30 transition-all duration-500 flex flex-col backdrop-blur-sm"
                        >
                            <div className="p-6 border-b border-slate-800 group-hover:bg-slate-800/30 transition-colors">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 bg-slate-950 rounded flex items-center justify-center text-teal-500 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] border border-slate-800">
                                        {mod.icon}
                                    </div>
                                    <span className="font-mono text-[9px] text-slate-600 bg-slate-950 px-2 py-1 rounded border border-slate-800">SEC_0{idx+1}</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-200 mb-1 group-hover:text-white transition-colors">{mod.title}</h3>
                            </div>

                            <div className="flex-1 flex flex-col divide-y divide-slate-800">
                                <button 
                                    onClick={() => setActiveModuleId(mod.id)}
                                    className="flex-1 p-6 hover:bg-amber-500/5 transition-all text-left flex flex-col justify-center group/solar relative overflow-hidden"
                                >
                                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-amber-500 opacity-0 group-hover/solar:opacity-100 transition-all"></div>
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-2 text-amber-500 font-bold text-[10px] uppercase tracking-wider">
                                            <Sun size={12} /> Solar / Active
                                        </div>
                                        <Zap size={14} className="text-amber-500 opacity-0 group-hover/solar:opacity-100 transform translate-x-2 group-hover/solar:translate-x-0 transition-all" />
                                    </div>
                                    <p className="text-xs text-slate-500 group-hover/solar:text-slate-300 transition-colors">{mod.solarDesc}</p>
                                </button>

                                <button 
                                    onClick={() => setActiveModuleId(mod.id)}
                                    className="flex-1 p-6 hover:bg-indigo-500/5 transition-all text-left flex flex-col justify-center group/lunar relative overflow-hidden"
                                >
                                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-indigo-500 opacity-0 group-hover/lunar:opacity-100 transition-all"></div>
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-2 text-indigo-400 font-bold text-[10px] uppercase tracking-wider">
                                            <Moon size={12} /> Lunar / Deep
                                        </div>
                                        <Brain size={14} className="text-indigo-400 opacity-0 group-hover/lunar:opacity-100 transform translate-x-2 group-hover/lunar:translate-x-0 transition-all" />
                                    </div>
                                    <p className="text-xs text-slate-500 group-hover/lunar:text-slate-300 transition-colors">{mod.lunarDesc}</p>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ARENA: Kahoot Quizzes */}
                <div className="lg:col-span-4 bg-slate-900/40 border border-slate-800 rounded-sm p-6 backdrop-blur-sm animate-fade-in-up stagger-2 flex flex-col">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                        <Swords className="text-red-500" size={20} />
                        <div>
                            <h3 className="font-bold text-white text-lg">NEXUS ARENA</h3>
                            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Rapid Fire Drills</div>
                        </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto pr-2 space-y-2 max-h-[400px] no-scrollbar">
                        {arenaQuizzes.map((quiz) => (
                             <button 
                                key={quiz.id}
                                onClick={() => setActiveArenaQuiz(quiz.id)}
                                className="w-full flex items-center justify-between p-3 bg-slate-950 border border-slate-800 hover:border-red-500/50 hover:bg-red-900/10 rounded transition-all group"
                             >
                                 <div className="flex items-center gap-3">
                                     <div className="w-6 h-6 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-[10px] font-mono text-slate-500 group-hover:text-red-400 transition-colors">
                                         {quiz.id}
                                     </div>
                                     <div className="text-left">
                                         <div className="text-sm font-bold text-slate-300 group-hover:text-white">{quiz.title}</div>
                                         <div className="text-[10px] text-slate-600">15 Questions • Speed</div>
                                     </div>
                                 </div>
                                 <Play size={14} className="text-slate-600 group-hover:text-red-500 transition-colors" />
                             </button>
                        ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-800 text-[10px] text-slate-500 text-center font-mono">
                        <Trophy size={12} className="inline mr-2 text-yellow-600" />
                        COMPLETE ALL PROTOCOLS FOR RANK UP
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/50 flex justify-between items-center text-[10px] font-mono text-slate-600">
                 <div>SERVER: NEXUS-PRIME // LATENCY: 12ms</div>
                 <div className="flex gap-4">
                     <span>BUILD: v2.5.0</span>
                     <span className="text-teal-500/50">SECURE CONNECTION</span>
                 </div>
            </div>
        </div>
    </div>
  );
};

export default TheNexus;
