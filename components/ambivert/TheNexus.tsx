
import React, { useState, useEffect } from 'react';
import { Menu, Moon, Sun, Layers, Network, Zap, Cpu, X, Swords, Fish, Coffee, Factory, RefreshCcw, Map, BookOpenCheck, Lock, BrainCircuit, Activity, Target } from 'lucide-react';
import FluxLesson from './FluxLesson';
import NexusCanvas from '../features/NexusCanvas';
import CoreInterface from './CoreInterface';
import NexusAvatar from '../features/NexusAvatar';
import NexusMasterclass from './NexusMasterclass';
import NexusIntroOverview from './NexusIntroOverview';
import { useSuperAI } from '../../hooks/useSuperAI';
import GamifiedQuiz from '../features/GamifiedQuiz';
import { KAHOOT_QUIZ_1, KAHOOT_QUIZ_2, KAHOOT_QUIZ_3, KAHOOT_QUIZ_4, KAHOOT_QUIZ_5, KAHOOT_QUIZ_6, KAHOOT_QUIZ_7, KAHOOT_QUIZ_8, KAHOOT_QUIZ_9, KAHOOT_QUIZ_10 } from '../../constants';

interface TheNexusProps {
  onExit: () => void;
  onOpenMenu?: () => void;
}

type EnergyMode = 'focus' | 'flux';

const TheNexus: React.FC<TheNexusProps> = ({ onExit, onOpenMenu }) => {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [surgicalDrill, setSurgicalDrill] = useState<any | null>(null);
  const [activeArenaQuiz, setActiveArenaQuiz] = useState<number | null>(null);
  const [energyMode, setEnergyMode] = useState<EnergyMode>('flux');
  const [bootSequence, setBootSequence] = useState(true);
  
  const { track } = useSuperAI();
  
  useEffect(() => {
      track('ENTER_NEXUS', { type: 'general', result: 'neutral' });
      const timer = setTimeout(() => setBootSequence(false), 1500);
      return () => clearTimeout(timer);
  }, []);

  const modules = [
    { 
        id: 'intro_overview',
        title: 'PRECISION PROTOCOL',
        solarDesc: 'Surgical intro accuracy drills.',
        lunarDesc: 'Pauline Cullen methodology.',
        icon: <Target size={20} />,
        locked: false
    },
    { 
        id: 'class', 
        title: 'MASTER CLASS', 
        solarDesc: 'Tactical theory & error elimination.',
        lunarDesc: 'Deep protocol structural analysis.',
        icon: <BookOpenCheck size={20} />,
        locked: false
    },
    { 
        id: 'flight', 
        title: 'Flight Data', 
        solarDesc: 'Rapid data identification training.',
        lunarDesc: 'Inverse logic & trend deconstruction.',
        icon: <Activity size={20} />,
        locked: false
    },
    { 
        id: 'housing', 
        title: 'Tenure Trends', 
        solarDesc: 'Demographic shift tracking.',
        lunarDesc: 'Intersection point analysis.',
        icon: <Layers size={20} />,
        locked: false
    },
    { 
        id: 'transport', 
        title: 'Emission Stats', 
        solarDesc: 'Magnitude comparison drills.',
        lunarDesc: 'Environmental impact logic mapping.',
        icon: <Network size={20} />,
        locked: false
    },
    { 
        id: 'fish', 
        title: 'Fish Consumption', 
        solarDesc: 'Multi-line trend tracking.',
        lunarDesc: 'Dietary shift correlation.',
        icon: <Fish size={20} />,
        locked: false
    },
    { 
        id: 'tea', 
        title: 'Tea Sales', 
        solarDesc: '5-Country fluctuation spotting.',
        lunarDesc: 'Complex variability logic.',
        icon: <Coffee size={20} />,
        locked: false
    },
    { 
        id: 'sugar', 
        title: 'Sugar Process', 
        solarDesc: 'Sequential flow identification.',
        lunarDesc: 'Manufacturing matrix breakdown.',
        icon: <Factory size={20} />,
        locked: false
    },
    { 
        id: 'salmon', 
        title: 'Salmon Life Cycle', 
        solarDesc: 'Cyclical biology active recall.',
        lunarDesc: 'Natural process descriptive logic.',
        icon: <RefreshCcw size={20} />,
        locked: false
    },
    { 
        id: 'sports', 
        title: 'Sports Centre', 
        solarDesc: 'Map comparison speed runs.',
        lunarDesc: 'Infrastructure redevelopment analysis.',
        icon: <Map size={20} />,
        locked: false
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

  if (activeModuleId === 'intro_overview') return <NexusIntroOverview onBack={() => setActiveModuleId(null)} />;
  if (activeModuleId === 'class') return <NexusMasterclass onBack={() => setActiveModuleId(null)} />;

  if (activeModuleId) {
      return (
        <FluxLesson 
            moduleId={activeModuleId} 
            onBack={() => setActiveModuleId(null)} 
            onExit={onExit}
            onNext={() => {}}
            onPrev={() => {}}
            isFirst={false}
            isLast={false}
        />
      );
  }

  // --- STYLE SYSTEM ---
  const isFlux = energyMode === 'flux';
  
  // Dynamic Theme Config
  const theme = {
      bg: isFlux ? 'bg-[#020617]' : 'bg-[#0f172a]',
      gridColor: isFlux ? 'rgba(20, 184, 166, 0.07)' : 'rgba(99, 102, 241, 0.05)',
      primary: isFlux ? 'text-teal-400' : 'text-indigo-400',
      border: isFlux ? 'border-teal-500/20' : 'border-indigo-500/20',
      glow: isFlux ? 'shadow-[0_0_30px_rgba(20,184,166,0.15)]' : 'shadow-[0_0_30px_rgba(99,102,241,0.05)]',
      cardBg: isFlux ? 'bg-[#0a0f1e]/80' : 'bg-[#1e1b4b]/20',
      accentGradient: isFlux ? 'from-teal-500 to-cyan-500' : 'from-indigo-500 to-violet-500',
  };

  return (
    <div className={`min-h-screen ${theme.bg} text-slate-200 font-sans relative overflow-hidden transition-colors duration-1000`}>
        
        {/* --- DYNAMIC BACKGROUND CANVAS --- */}
        <NexusCanvas mode={energyMode} />
        
        {/* --- GRID OVERLAY --- */}
        <div 
            className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-1000"
            style={{ 
                backgroundImage: `linear-gradient(${theme.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${theme.gridColor} 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                animation: isFlux ? 'grid-move 20s linear infinite' : 'none'
            }}
        ></div>
        
        {/* --- 3D INTERACTIVE AVATAR --- */}
        <NexusAvatar energyMode={energyMode} contextTitle={isFlux ? "Nexus Flux" : "Nexus Focus"} />

        {/* --- BOOT SEQUENCE OVERLAY --- */}
        {bootSequence && (
            <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center font-mono text-teal-500 text-xs">
                <div className="space-y-2">
                    <div className="animate-pulse">> INITIALIZING BRIDGE PROTOCOL...</div>
                    <div className="animate-pulse delay-100">> CALIBRATING NEURO-PLASTICITY...</div>
                    <div className="animate-pulse delay-200">> WELCOME, ARCHITECT.</div>
                </div>
            </div>
        )}

        {/* --- SURGICAL DRILL MODAL (HIGH PRIORITY) --- */}
        {surgicalDrill && (
            <div className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-xl flex items-center justify-center p-6 animate-fade-in-up">
                <div className="max-w-2xl w-full bg-[#050b1d] border-2 border-red-500/50 rounded-lg p-12 relative shadow-[0_0_100px_rgba(239,68,68,0.2)]">
                    <button onClick={() => setSurgicalDrill(null)} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X size={24} /></button>
                    <div className="mb-8 border-b border-red-900/30 pb-4">
                        <div className="text-red-500 font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                             <Zap size={12} className="fill-current animate-pulse"/> Neural Fracture Detected
                        </div>
                        <h2 className="text-3xl font-black text-white font-heading tracking-tight">{surgicalDrill.diagnosis}</h2>
                    </div>
                    <div className="mb-8"><p className="text-xl font-medium text-slate-200 leading-relaxed font-serif italic">"{surgicalDrill.question}"</p></div>
                    <div className="grid gap-3 mb-8">
                        {surgicalDrill.options?.map((opt: string, i: number) => (
                            <button key={i} onClick={() => {
                                const isCorrect = i === surgicalDrill.correctIndex;
                                track(isCorrect ? 'DRILL_SUCCESS' : 'DRILL_FAILURE', { type: 'general', result: isCorrect ? 'success' : 'failure' });
                                if (isCorrect) { alert("CORRECTION APPLIED. NEURAL MAP UPDATED."); setSurgicalDrill(null); } else { alert("INCORRECT. RE-CALIBRATE."); }
                            }} className="p-4 bg-slate-900 hover:bg-red-900/20 border border-slate-800 hover:border-red-500/50 text-left transition-all text-slate-300 hover:text-red-300 group font-mono text-sm flex items-center gap-4">
                                <span className="font-bold text-slate-500 group-hover:text-red-500">0{i+1}</span> {opt}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {/* --- MAIN INTERFACE --- */}
        <div className="max-w-7xl mx-auto px-6 py-8 relative z-10 flex flex-col min-h-screen">
            
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-white/5 pb-6 backdrop-blur-sm sticky top-0 z-40">
                <div className="flex items-center gap-6 mb-4 md:mb-0">
                    {onOpenMenu && <button onClick={onOpenMenu} className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"><Menu size={24} /></button>}
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Cpu size={14} className={theme.primary} />
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Ko'prik Interface v2.5</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter drop-shadow-lg font-heading">
                            THE <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.accentGradient} animate-pulse-glow`}>NEXUS</span>
                        </h1>
                    </div>
                </div>

                {/* BI-MODAL SWITCH */}
                <div className="flex bg-black/40 p-1 rounded-full border border-white/10 backdrop-blur-md">
                    <button 
                        onClick={() => setEnergyMode('focus')}
                        className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-500 ${!isFlux ? 'bg-indigo-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.5)]' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        <Moon size={14} /> Focus
                    </button>
                    <button 
                        onClick={() => setEnergyMode('flux')}
                        className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-500 ${isFlux ? 'bg-teal-600 text-white shadow-[0_0_20px_rgba(20,184,166,0.5)]' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        <Sun size={14} /> Flux
                    </button>
                </div>
            </header>

            {/* Core Status HUD */}
            <div className="mb-12">
                <CoreInterface onStartChallenge={setSurgicalDrill} energyMode={energyMode} />
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                
                {/* Modules Grid */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 content-start">
                    {modules.map((mod, idx) => (
                        <div 
                            key={mod.id} 
                            style={{ animationDelay: `${idx * 100}ms` }}
                            className={`group relative ${theme.cardBg} border backdrop-blur-md rounded-xl overflow-hidden flex flex-col transition-all duration-500 ${theme.glow} ${mod.locked ? 'opacity-50 grayscale' : ''} ${theme.border} hover:border-opacity-100 hover:-translate-y-1 animate-fade-in-up`}
                        >
                            <div className="p-6 border-b border-white/5">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-lg bg-black/40 ${isFlux ? 'text-teal-400 border border-teal-500/30' : 'text-indigo-400 border border-indigo-500/30'} transition-colors duration-500`}>
                                        {mod.locked ? <Lock size={20} /> : mod.icon}
                                    </div>
                                    <div className={`text-[9px] font-mono px-2 py-1 rounded border uppercase tracking-wider ${isFlux ? 'bg-teal-950/40 text-teal-400 border-teal-500/20' : 'bg-indigo-950/40 text-indigo-400 border-indigo-500/20'}`}>
                                        {isFlux ? 'Action' : 'Structure'}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold mb-1 text-slate-200 group-hover:text-white transition-colors font-heading">{mod.title}</h3>
                            </div>
                            
                            <button 
                                onClick={() => !mod.locked && setActiveModuleId(mod.id)} 
                                className="flex-1 p-6 hover:bg-white/5 transition-all text-left flex flex-col justify-center relative overflow-hidden group/btn" 
                                disabled={mod.locked}
                            >
                                <div className="relative z-10">
                                    <p className={`text-sm text-slate-400 transition-all duration-500 ${isFlux ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0 absolute'}`}>
                                        {mod.solarDesc}
                                    </p>
                                    <p className={`text-sm text-slate-400 transition-all duration-500 ${!isFlux ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0 absolute'}`}>
                                        {mod.lunarDesc}
                                    </p>
                                </div>
                                <div className={`absolute bottom-0 left-0 h-0.5 w-0 group-hover/btn:w-full transition-all duration-700 ${isFlux ? 'bg-teal-500' : 'bg-indigo-500'}`}></div>
                            </button>
                        </div>
                    ))}
                </div>

                {/* Sidebar: Adaptive Arena */}
                <div className={`lg:col-span-4 sticky top-28 h-fit transition-all duration-500 ${isFlux ? 'bg-[#0a0f1e]/80 border-teal-500/20' : 'bg-[#1e1b4b]/20 border-indigo-500/20'} border rounded-xl p-6 backdrop-blur-xl flex flex-col shadow-2xl overflow-hidden`}>
                    
                    {/* Decorative Header */}
                    <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4 relative z-10">
                        {isFlux ? <Swords className="text-teal-400" size={24} /> : <BookOpenCheck className="text-indigo-400" size={24} />}
                        <div>
                            <h3 className="font-bold text-white text-lg tracking-wide font-heading">{isFlux ? 'FLUX ARENA' : 'FOCUS DRILLS'}</h3>
                            <div className={`text-[10px] uppercase tracking-widest font-mono ${theme.primary}`}>
                                {isFlux ? 'Ranked Competitions' : 'Structural Validation'}
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex-1 space-y-2 relative z-10 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                        {arenaQuizzes.map((quiz) => (
                             <button 
                                key={quiz.id} 
                                onClick={() => setActiveArenaQuiz(quiz.id)} 
                                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all group relative overflow-hidden ${
                                    isFlux 
                                    ? 'bg-slate-900/50 border-slate-800 hover:border-teal-500/50 hover:bg-teal-900/10' 
                                    : 'bg-indigo-950/10 border-indigo-500/10 hover:border-indigo-500/50 hover:bg-indigo-900/20'
                                }`}
                             >
                                 <div className="flex items-center gap-3">
                                     <span className={`font-mono text-[10px] ${isFlux ? 'text-slate-600' : 'text-indigo-700'}`}>0{quiz.id}</span>
                                     <div className={`text-sm font-bold tracking-wide ${isFlux ? 'text-slate-300 group-hover:text-white' : 'text-slate-400 group-hover:text-indigo-100'}`}>{quiz.title}</div>
                                 </div>
                                 <div className={`opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0 ${theme.primary}`}>
                                    {isFlux ? "START" : "STUDY"}
                                 </div>
                             </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* --- ARENA QUIZ OVERLAY --- */}
        {activeArenaQuiz && (
            <div className="fixed inset-0 z-[100] bg-[#020617]/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in">
                <div className="w-full max-w-4xl relative">
                     <button onClick={() => setActiveArenaQuiz(null)} className="absolute -top-12 right-0 text-white hover:text-red-400 transition-colors flex items-center gap-2 font-bold uppercase tracking-wider font-mono text-xs"><X size={18} /> Abort</button>
                     <GamifiedQuiz questions={arenaQuizzes.find(q => q.id === activeArenaQuiz)?.data || []} title={`PROTOCOL ${activeArenaQuiz}`} onComplete={(score) => track('ARENA_COMPLETE', { type: 'general', result: score > 10 ? 'success' : 'failure' })} />
                </div>
            </div>
        )}
    </div>
  );
};

export default TheNexus;
