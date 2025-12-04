import React, { useState } from 'react';
import { RefreshCw, Globe, Table } from 'lucide-react';
import ChartDualView from '../features/ChartDualView';
import FlipCard from '../features/FlipCard';
import GamifiedQuiz from '../features/GamifiedQuiz';
import SentenceBuilder from '../features/SentenceBuilder';
import LessonStepper from '../ui/LessonStepper';
import { DEGRADATION_VOCAB_LIST, DEGRADATION_QUIZ_A, DEGRADATION_QUIZ_B } from '../../constants';

interface LessonDegradationProps {
  onAddXp: (amount: number, sectionId: string) => void;
}

const LessonDegradation: React.FC<LessonDegradationProps> = ({ onAddXp }) => {
  const [showInteractive, setShowInteractive] = useState(true);
  const sentence = ["The", "pie", "chart", "illustrates", "causes", "of", "worldwide", "land", "degradation", "while", "the", "table", "shows", "regional", "figures."];

  const steps = [
    {
      title: "Intro",
      content: (
        <section className="text-center flex flex-col items-center justify-center h-full space-y-4">
          <div className="inline-block px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest border border-emerald-100">
            Mixed Charts
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">
            Global &<br/>
            <span className="text-emerald-600">Regional</span>
          </h1>
        </section>
      )
    },
    {
      title: "Chart",
      content: (
        <div className="max-w-4xl mx-auto w-full">
           <div className="flex justify-end mb-2">
             <button onClick={() => setShowInteractive(!showInteractive)} className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full hover:bg-emerald-100 transition-colors flex items-center gap-2">
                <RefreshCw size={10}/> {showInteractive ? "Static" : "Interactive"}
              </button>
           </div>
           {showInteractive ? <ChartDualView /> : (
              <div className="bg-white p-12 rounded-[2rem] shadow-xl border border-gray-100 text-center min-h-[300px] flex items-center justify-center">
                <p className="text-slate-300 font-bold text-xl">Static View</p>
              </div>
           )}
        </div>
      )
    },
    {
      title: "Feature 1",
      content: (
        <div className="max-w-xl mx-auto p-8 bg-emerald-50 rounded-[2rem] border border-emerald-100 text-center space-y-4 shadow-lg">
           <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-800">Key Feature 1</div>
           <div className="text-3xl font-black text-emerald-900">Balanced Pie</div>
           <div className="text-lg text-emerald-700/80 font-medium">The 3 main causes are roughly equal (~30% each).</div>
        </div>
      )
    },
    {
      title: "Feature 2",
      content: (
        <div className="max-w-xl mx-auto p-8 bg-amber-50 rounded-[2rem] border border-amber-100 text-center space-y-4 shadow-lg">
           <div className="text-[10px] font-bold uppercase tracking-widest text-amber-800">Key Feature 2</div>
           <div className="text-3xl font-black text-amber-900">Unbalanced Table</div>
           <div className="text-lg text-amber-700/80 font-medium">Region 2 (23%) is severe; Region 1 (5%) is mild.</div>
        </div>
      )
    },
    ...DEGRADATION_VOCAB_LIST.map((item) => ({
      title: "Vocabulary",
      content: (
        <div className="w-full flex items-center justify-center px-4">
          <FlipCard {...item} large />
        </div>
      )
    })),
    {
      title: "Builder",
      content: (
        <div className="max-w-3xl mx-auto w-full">
          <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-emerald-50">
             <SentenceBuilder sentence={sentence} />
          </div>
        </div>
      )
    },
    {
      title: "Quiz A",
      content: <div className="max-w-2xl mx-auto w-full"><GamifiedQuiz questions={DEGRADATION_QUIZ_A} title="Vocab" onComplete={() => onAddXp(50, 'quizI')} /></div>
    },
    {
      title: "Strategy Intro",
      content: (
         <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-5xl font-black text-slate-900">Macro vs Micro</h2>
            <p className="text-3xl text-slate-500 font-light leading-relaxed">
              Ignore the 0.2%.<br/><span className="text-emerald-600 font-bold">Focus on the Big Picture.</span>
            </p>
         </div>
      )
    },
    {
      title: "Strategy 1",
      content: (
         <div className="bg-stone-800 text-white p-10 rounded-[2rem] text-center max-w-xl mx-auto shadow-2xl">
            <Globe className="text-emerald-400 mb-6 mx-auto" size={48} />
            <h4 className="font-black text-3xl mb-4">Global Mix</h4>
            <p className="text-stone-300 text-xl font-light">The three main causes are fairly evenly distributed.</p>
         </div>
      )
    },
    {
      title: "Strategy 2",
      content: (
         <div className="bg-stone-800 text-white p-10 rounded-[2rem] text-center max-w-xl mx-auto shadow-2xl">
            <Table className="text-emerald-400 mb-6 mx-auto" size={48} />
            <h4 className="font-black text-3xl mb-4">Regional Extremes</h4>
            <p className="text-stone-300 text-xl font-light">Region 2 is severely affected.<br/>Region 1 is barely touched.</p>
         </div>
      )
    },
    {
      title: "Model Para 1",
      content: (
        <div className="max-w-2xl mx-auto">
           <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-3 ml-4">Overview</div>
           <p className="bg-emerald-50 p-8 rounded-[2rem] shadow-xl text-xl text-slate-800 leading-relaxed font-light border-l-4 border-emerald-500">
             Overall, worldwide land degradation is driven by three main factors which contribute fairly evenly to the problem.
           </p>
        </div>
      )
    },
    {
      title: "Quiz B",
      content: <div className="max-w-2xl mx-auto w-full"><GamifiedQuiz questions={DEGRADATION_QUIZ_B} title="Analysis" onComplete={() => onAddXp(50, 'quizJ')} /></div>
    }
  ];

  return <LessonStepper steps={steps} colorTheme="emerald" />;
};

export default LessonDegradation;