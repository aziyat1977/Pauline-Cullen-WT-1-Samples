
import React, { useState, useEffect } from 'react';
import { Sun, Moon, ArrowLeft, Zap, Gamepad2, Terminal, ChevronRight } from 'lucide-react';
import Chart3D from '../features/Chart3D';
import ChartHousing from '../features/ChartHousing';
import ChartTransport from '../features/ChartTransport';
import { ZenBarChart, ZenHousingChart, ConceptNode, ReflectionPrompt } from '../introvert/ZenComponents';
import DataSlayer from '../features/DataSlayer';
import WriterConsole from '../features/WriterConsole';
import LogicGate from '../features/LogicGate';
import { VOCAB_LIST, HOUSING_VOCAB_LIST, TRANSPORT_VOCAB_LIST, QUIZ_A, HOUSING_QUIZ_A, TRANSPORT_QUIZ_A } from '../../constants';
import SentenceBuilder from '../features/SentenceBuilder';
import { useSuperAI } from '../../hooks/useSuperAI';
import NexusAvatar from '../features/NexusAvatar';

interface FluxLessonProps {
  moduleId: string;
  onBack: () => void;
}

type Mode = 'solar' | 'lunar';

const FluxLesson: React.FC<FluxLessonProps> = ({ moduleId, onBack }) => {
  const [mode, setMode] = useState<Mode>('solar');
  const [loading, setLoading] = useState(false);
  const { track } = useSuperAI();

  // Track lesson entry - 'neutral' outcome for navigation events
  useEffect(() => {
      track(`ENTER_MODULE_${moduleId.toUpperCase()}`, { type: 'general', result: 'neutral' });
  }, []);

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
            sentence: ["The", "chart", "shows", "the", "duration", "of", "three", "separate", "flight", "trials."]
        };
        case 'housing': return { 
            title: 'Housing Tenure', 
            chart3D: <ChartHousing />, 
            chartZen: <ZenHousingChart />,
            vocab: HOUSING_VOCAB_LIST,
            quiz: HOUSING_QUIZ_A,
            sentence: ["The", "bar", "chart", "compares", "housing", "tenure", "in", "England", "and", "Wales."]
        };
        default: return { 
            title: 'Transport Emissions', 
            chart3D: <ChartTransport />, 
            chartZen: <div className="p-8 border border-dashed border-stone-700 text-stone-500 font-mono text-center">DATA SET TOO COMPLEX FOR REDUCTION</div>,
            vocab: TRANSPORT_VOCAB_LIST,
            quiz: TRANSPORT_QUIZ_A,
            sentence: ["The", "chart", "compares", "average", "CO2", "emissions", "for", "different", "modes", "of", "transport."]
        };
    }
  };

  const content = getContent();

  // Surgical Tracking Wrappers
  const handleQuizAnswer = (questionId: number, isCorrect: boolean) => {
      // Determine what concept this question tests (mock logic for demo)
      // indices 0-3: Vocab, 4-6: Trends, 7-9: Comparison
      let type: 'vocabulary' | 'trends' | 'comparisons' = 'vocabulary';
      if (questionId > 3) type = 'trends';
      if (questionId > 6) type = 'comparisons';

      track(`QUIZ_ANSWER_${questionId}`, { 
          type: type, 
          result: isCorrect ? 'success' : 'failure' 
      });
  };

  // Track hover/focus on Chart
  const handleChartInteraction = () => {
      track('CHART_ANALYSIS', { type: 'visualization', result: 'success' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${mode === 'solar' ? 'bg-slate-50 text-slate-900' : 'bg-[#0c0c0e] text-slate-400'}`}>
        
        {/* 3D AVATAR COMPANION */}
        <NexusAvatar />

        {/* Navigation Bar */}
        <nav className={`fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 backdrop-blur-md border-b transition-colors duration-700 ${mode === 'solar' ? 'bg-white/80 border-slate-200' : 'bg-[#0f0f11]/80 border-slate-800'}`}>
            <button onClick={onBack} className={`p-2 rounded-full transition-colors flex items-center gap-2 ${mode === 'solar' ? 'hover:bg-slate-200' : 'hover:bg-slate-800'}`}>
                <ArrowLeft size={20} /> <span className="text-xs font-bold uppercase hidden sm:inline">Return to Nexus</span>
            </button>
            
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

        <div className="pt-28 px-6 pb-32 max-w-6xl mx-auto">
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

                         <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-slate-100">
                             <h3 className="font-black text-slate-800 text-lg mb-4 flex items-center justify-between">
                                 Speed Quiz <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">Timed</span>
                             </h3>
                             <div className="space-y-3">
                                {content.quiz.slice(0, 3).map((q, i) => (
                                    <button 
                                        key={i} 
                                        className="group w-full text-left p-4 rounded-xl border-2 border-slate-100 hover:border-indigo-500 cursor-pointer transition-all hover:shadow-md"
                                        onClick={() => {
                                            const isCorrect = i === q.correct; // Mock logic
                                            handleQuizAnswer(i, isCorrect);
                                            alert(isCorrect ? "Correct" : "Incorrect");
                                        }}
                                    >
                                        <p className="font-bold text-slate-700 text-sm mb-2 group-hover:text-indigo-600 transition-colors">{q.q}</p>
                                        <div className="flex justify-end">
                                            <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-500 transform group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </button>
                                ))}
                             </div>
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
        </div>
    </div>
  );
};

export default FluxLesson;
