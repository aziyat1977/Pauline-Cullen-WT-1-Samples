

import React, { useState, useEffect } from 'react';
import { Sun, Moon, ArrowLeft, Zap, Gamepad2, Terminal, ChevronRight, X, ArrowRight, CheckCircle, RefreshCw } from 'lucide-react';
import Chart3D from '../features/Chart3D';
import ChartHousing from '../features/ChartHousing';
import ChartTransport from '../features/ChartTransport';
import { ZenBarChart, ZenHousingChart, ConceptNode, ReflectionPrompt } from '../introvert/ZenComponents';
import DataSlayer from '../features/DataSlayer';
import WriterConsole from '../features/WriterConsole';
import LogicGate from '../features/LogicGate';
import { VOCAB_LIST, HOUSING_VOCAB_LIST, TRANSPORT_VOCAB_LIST, QUIZ_A, HOUSING_QUIZ_A, TRANSPORT_QUIZ_A, CHART_DATA, HOUSING_CHART_DATA, TRANSPORT_CHART_DATA } from '../../constants';
import SentenceBuilder from '../features/SentenceBuilder';
import { useSuperAI } from '../../hooks/useSuperAI';
import NexusAvatar from '../features/NexusAvatar';

interface FluxLessonProps {
  moduleId: string;
  onBack: () => void;
  onExit: () => void;
  onNext: () => void;
  onPrev: () => void;
  isLast: boolean;
  isFirst: boolean;
}

type Mode = 'solar' | 'lunar';

const FluxLesson: React.FC<FluxLessonProps> = ({ moduleId, onBack, onExit, onNext, onPrev, isLast, isFirst }) => {
  const [mode, setMode] = useState<Mode>('solar');
  const [loading, setLoading] = useState(false);
  
  // Speed Quiz State
  const [miniQuizIndex, setMiniQuizIndex] = useState(0);
  const [miniQuizFeedback, setMiniQuizFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [miniQuizComplete, setMiniQuizComplete] = useState(false);

  const { track } = useSuperAI();

  // Track lesson entry - 'neutral' outcome for navigation events
  useEffect(() => {
      track(`ENTER_MODULE_${moduleId.toUpperCase()}`, { type: 'general', result: 'neutral' });
      // Reset quiz on module change
      setMiniQuizIndex(0);
      setMiniQuizFeedback(null);
      setMiniQuizComplete(false);
  }, [moduleId, track]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onBack();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  const toggleMode = () => {
    setLoading(true);
    track('TOGGLE_MODE', { type: 'general', result: 'neutral' });
    setTimeout(() => {
        setMode(prev => prev === 'solar' ? 'lunar' : 'solar');
        setLoading(false);
    }, 800);
  };

  const getContent = () => {
    switch(moduleId) {
        case 'flight': return { 
            title: 'Flight Duration', 
            chart3D: <Chart3D />, 
            chartZen: <ZenBarChart />,
            vocab: VOCAB_LIST,
            quiz: QUIZ_A,
            sentence: ["The", "chart", "shows", "the", "duration", "of", "three", "separate", "flight", "trials."],
            rawData: CHART_DATA
        };
        case 'housing': return { 
            title: 'Housing Tenure', 
            chart3D: <ChartHousing />, 
            chartZen: <ZenHousingChart />,
            vocab: HOUSING_VOCAB_LIST,
            quiz: HOUSING_QUIZ_A,
            sentence: ["The", "bar", "chart", "compares", "housing", "tenure", "in", "England", "and", "Wales."],
            rawData: HOUSING_CHART_DATA
        };
        default: return { 
            title: 'Transport Emissions', 
            chart3D: <ChartTransport />, 
            chartZen: <div className="p-8 border border-dashed border-stone-700 text-stone-500 font-mono text-center">DATA SET TOO COMPLEX FOR REDUCTION</div>,
            vocab: TRANSPORT_VOCAB_LIST,
            quiz: TRANSPORT_QUIZ_A,
            sentence: ["The", "chart", "compares", "average", "CO2", "emissions", "for", "different", "modes", "of", "transport."],
            rawData: TRANSPORT_CHART_DATA
        };
    }
  };

  const content = getContent();

  // Mini Quiz Logic
  const miniQuizQuestions = content.quiz.slice(0, 3);
  const currentMiniQ = miniQuizQuestions[miniQuizIndex];

  const handleMiniQuizAnswer = (optIndex: number) => {
      if (miniQuizFeedback) return; // Prevent double taps
      
      const isCorrect = optIndex === currentMiniQ.correct;
      setMiniQuizFeedback(isCorrect ? 'correct' : 'incorrect');

      track(`SPEED_QUIZ_${moduleId}_${miniQuizIndex}`, { 
          type: 'vocabulary', 
          result: isCorrect ? 'success' : 'failure' 
      });

      setTimeout(() => {
          setMiniQuizFeedback(null);
          if (miniQuizIndex < miniQuizQuestions.length - 1) {
              setMiniQuizIndex(prev => prev + 1);
          } else {
              setMiniQuizComplete(true);
              track(`SPEED_QUIZ_${moduleId}_COMPLETE`, { type: 'general', result: 'success' });
          }
      }, 1000);
  };

  const handleChartInteraction = () => {
      track('CHART_ANALYSIS', { type: 'visualization', result: 'success' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${mode === 'solar' ? 'bg-slate-50 text-slate-900' : 'bg-[#0c0c0e] text-slate-400'}`}>
        
        {/* 3D AVATAR COMPANION */}
        <NexusAvatar contextData={content.rawData} contextTitle={content.title} />

        {/* Navigation Bar */}
        <nav className={`fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 backdrop-blur-md border-b transition-colors duration-700 ${mode === 'solar' ? 'bg-white/80 border-slate-200' : 'bg-[#0f0f11]/80 border-slate-800'}`}>
            
            <div className="flex items-center gap-2">
                <button onClick={onBack} className={`p-2 rounded-full transition-colors flex items-center gap-2 ${mode === 'solar' ? 'hover:bg-slate-200 text-slate-600' : 'hover:bg-slate-800 text-slate-400'}`} title="Back to Nexus Hub">
                    <ArrowLeft size={20} /> <span className="text-xs font-bold uppercase hidden sm:inline">Back</span>
                </button>
                <div className={`h-4 w-px mx-2 ${mode === 'solar' ? 'bg-slate-300' : 'bg-slate-700'}`}></div>
                <button onClick={onExit} className={`p-2 rounded-full transition-colors flex items-center gap-2 group ${mode === 'solar' ? 'hover:bg-red-50 text-slate-500 hover:text-red-500' : 'hover:bg-red-900/20 text-slate-500 hover:text-red-400'}`} title="Exit Simulation">
                    <X size={20} className="group-hover:scale-110 transition-transform"/> <span className="text-xs font-bold uppercase hidden sm:inline">Exit</span>
                </button>
            </div>
            
            <div className="flex items-center gap-4">
                <span className={`font-mono text-[10px] uppercase tracking-widest hidden sm:inline ${mode === 'solar' ? 'text-amber-600' : 'text-indigo-400'}`}>
                    {mode === 'solar' ? '>> SOLAR PROTOCOL' : '>> LUNAR PROTOCOL'}
                </span>
                <button 
                    onClick={toggleMode}
                    className={`relative w-20 h-9 rounded-full transition-all duration-700 shadow-inner flex items-center px-1 border-2 ${mode === 'solar' ? 'bg-amber-100 border-amber-300' : 'bg-indigo-950 border-indigo-900'}`}
                >
                    <div className={`w-6 h-6 rounded-full shadow-lg transform transition-transform duration-700 cubic-bezier(0.68, -0.55, 0.27, 1.55) flex items-center justify-center ${mode === 'solar' ? 'translate-x-10 bg-amber-500 text-white' : 'translate-x-0 bg-indigo-400 text-black'}`}>
                        {mode === 'solar' ? <Sun size={14} /> : <Moon size={14} />}
                    </div>
                </button>
            </div>
        </nav>

        {/* Loading Overlay */}
        <div className={`fixed inset-0 z-40 bg-black flex items-center justify-center transition-all duration-700 pointer-events-none ${loading ? 'opacity-100' : 'opacity-0'}`}>
             <div className="flex flex-col items-center gap-6">
                 <div className="relative">
                    <div className="w-16 h-16 border-4 border-slate-800 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-teal-500 rounded-full animate-spin"></div>
                 </div>
                 <div className="font-mono text-teal-500 text-xs uppercase tracking-[0.3em] animate-pulse">
                     {mode === 'solar' ? 'CALIBRATING...' : 'DEEPENING...'}
                 </div>
             </div>
        </div>

        <div className="pt-28 px-6 pb-40 max-w-6xl mx-auto min-h-[calc(100vh-100px)] flex flex-col">
            <header className="mb-16 text-center animate-fade-in-up">
                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border ${mode === 'solar' ? 'bg-amber-50 text-amber-600 border-amber-200 shadow-amber-100 shadow-lg' : 'bg-indigo-900/10 text-indigo-400 border-indigo-500/20'}`}>
                    {mode === 'solar' ? <><Gamepad2 size={14} /> Active Learning</> : <><Terminal size={14} /> Analytical Mode</>}
                </div>
                <h1 className={`text-6xl md:text-8xl font-black tracking-tighter mb-4 ${mode === 'solar' ? 'text-slate-900' : 'text-slate-200 font-serif'}`}>{content.title}</h1>
            </header>

            {mode === 'solar' ? (
                // SOLAR MODE
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in-up">
                    <div className="lg:col-span-8 space-y-8">
                        <div 
                            className="bg-white p-2 rounded-[2.5rem] shadow-2xl shadow-indigo-100 border border-slate-100 relative overflow-hidden group"
                            onMouseEnter={handleChartInteraction}
                        >
                             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500"></div>
                             <div className="p-6">
                                <h3 className="font-black text-slate-800 text-2xl mb-6 flex items-center gap-2">
                                    <Zap size={24} className="text-amber-500 fill-current" /> Visualization
                                </h3>
                                {content.chart3D}
                             </div>
                        </div>

                        <div className="bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
                             <h3 className="font-black text-white text-2xl mb-6 italic flex items-center gap-2 relative z-10">
                                 <Gamepad2 size={24} className="text-amber-400" /> REFLEX_TRAINER
                             </h3>
                             <DataSlayer />
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-8">
                         <div className="bg-gradient-to-b from-indigo-500 to-indigo-600 p-1 rounded-[2rem] shadow-xl">
                            <div className="bg-white rounded-[1.8rem] p-6 h-full">
                                <h3 className="font-black text-indigo-900 text-lg mb-4">Structure Builder</h3>
                                <SentenceBuilder sentence={content.sentence} />
                            </div>
                         </div>

                         {/* SIDEBAR SPEED QUIZ - REPAIRED */}
                         <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-slate-100 relative overflow-hidden">
                             <h3 className="font-black text-slate-800 text-lg mb-4 flex items-center justify-between">
                                 Speed Quiz <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full flex items-center gap-1"><Zap size={10} className="fill-current"/>Timed</span>
                             </h3>
                             
                             {!miniQuizComplete ? (
                                <div className="animate-fade-in">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                                            Question {miniQuizIndex + 1} / {miniQuizQuestions.length}
                                        </span>
                                    </div>
                                    
                                    <p className="font-bold text-slate-800 text-sm mb-6 min-h-[3rem] leading-relaxed">
                                        {currentMiniQ.q}
                                    </p>
                                    
                                    <div className="space-y-2">
                                        {currentMiniQ.options.map((opt, i) => {
                                            let btnClass = "w-full text-left p-3 rounded-xl border-2 text-xs font-bold transition-all ";
                                            
                                            if (miniQuizFeedback) {
                                                if (i === currentMiniQ.correct) {
                                                    btnClass += "bg-green-500 border-green-600 text-white shadow-md";
                                                } else {
                                                    btnClass += "bg-slate-50 border-slate-100 text-slate-300 opacity-40";
                                                }
                                            } else {
                                                btnClass += "bg-white border-slate-100 hover:border-indigo-500 hover:text-indigo-600 text-slate-600 hover:shadow-md";
                                            }

                                            return (
                                                <button 
                                                    key={i} 
                                                    onClick={() => handleMiniQuizAnswer(i)}
                                                    disabled={!!miniQuizFeedback}
                                                    className={btnClass}
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <span>{opt}</span>
                                                        {miniQuizFeedback && i === currentMiniQ.correct && <CheckCircle size={14} />}
                                                    </div>
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                             ) : (
                                <div className="text-center py-8 animate-pop-in">
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-100">
                                        <CheckCircle size={32} />
                                    </div>
                                    <h4 className="font-black text-slate-800 text-xl mb-2">Protocol Complete!</h4>
                                    <p className="text-slate-400 text-xs mb-6">Neural pathway strengthened.</p>
                                    <button 
                                        onClick={() => { setMiniQuizIndex(0); setMiniQuizComplete(false); }}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold hover:bg-indigo-100 transition-colors"
                                    >
                                        <RefreshCw size={12} /> Restart Drill
                                    </button>
                                </div>
                             )}
                         </div>
                    </div>
                </div>
            ) : (
                // LUNAR MODE
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-fade-in-up">
                    <div className="lg:col-span-7 space-y-16">
                         <div onMouseEnter={handleChartInteraction}>
                            <div className="flex items-center gap-4 mb-6 border-b border-slate-800 pb-4">
                                <span className="font-mono text-xs text-indigo-400">FIG_01</span>
                                <h3 className="font-serif text-2xl text-slate-200">Data Abstraction</h3>
                            </div>
                            <div className="bg-[#0f0f11] p-8 border border-slate-800 rounded-sm">
                                {content.chartZen}
                            </div>
                         </div>

                         <div>
                            <div className="flex items-center gap-4 mb-6 border-b border-slate-800 pb-4">
                                <span className="font-mono text-xs text-indigo-400">INPUT_01</span>
                                <h3 className="font-serif text-2xl text-slate-200">Synthesis Terminal</h3>
                            </div>
                            <WriterConsole />
                         </div>
                    </div>

                    <div className="lg:col-span-5 space-y-16">
                         <div>
                            <div className="flex items-center gap-4 mb-6 border-b border-slate-800 pb-4">
                                <span className="font-mono text-xs text-indigo-400">LOGIC_01</span>
                                <h3 className="font-serif text-2xl text-slate-200">Grammar Logic Gate</h3>
                            </div>
                            <LogicGate />
                         </div>

                         <div>
                            <div className="flex items-center gap-4 mb-6 border-b border-slate-800 pb-4">
                                <span className="font-mono text-xs text-indigo-400">REF_01</span>
                                <h3 className="font-serif text-2xl text-slate-200">Lexicon</h3>
                            </div>
                            <div className="space-y-4">
                                {content.vocab.slice(0, 4).map((v, i) => (
                                    <ConceptNode key={i} term={v.term} def={v.def} />
                                ))}
                            </div>
                         </div>

                         <div className="pt-8 border-t border-slate-800">
                             <ReflectionPrompt question="Identify the singular most impactful trend variation. Disregard noise." />
                         </div>
                    </div>
                </div>
            )}
            
            {/* Footer Navigation */}
            <div className={`mt-auto pt-12 border-t flex justify-between items-center transition-colors duration-700 ${mode === 'solar' ? 'border-slate-200 text-slate-600' : 'border-slate-800 text-slate-400'}`}>
                <button 
                    onClick={onPrev}
                    className={`flex items-center gap-3 group px-4 py-2 rounded-lg transition-all ${mode === 'solar' ? 'hover:bg-slate-100' : 'hover:bg-slate-900'}`}
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <div className="text-left">
                        <div className="text-[10px] uppercase font-bold tracking-widest opacity-60">Previous</div>
                        <div className="font-bold text-sm group-hover:underline">Back / Hub</div>
                    </div>
                </button>

                <div className="hidden md:flex gap-1">
                    <div className={`w-2 h-2 rounded-full ${mode === 'solar' ? 'bg-slate-300' : 'bg-slate-700'}`}></div>
                    <div className={`w-2 h-2 rounded-full ${mode === 'solar' ? 'bg-slate-300' : 'bg-slate-700'}`}></div>
                    <div className={`w-2 h-2 rounded-full ${mode === 'solar' ? 'bg-slate-900' : 'bg-slate-400'}`}></div>
                </div>

                <button 
                    onClick={onNext}
                    className={`flex items-center gap-3 group px-4 py-2 rounded-lg transition-all ${mode === 'solar' ? 'hover:bg-slate-100' : 'hover:bg-slate-900'}`}
                >
                    <div className="text-right">
                        <div className="text-[10px] uppercase font-bold tracking-widest opacity-60">Next</div>
                        <div className="font-bold text-sm group-hover:underline">{isLast ? 'Complete' : 'Next Module'}</div>
                    </div>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    </div>
  );
};

export default FluxLesson;
