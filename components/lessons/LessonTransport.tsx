import React, { useState } from 'react';
import { RefreshCw, ArrowRight, Trophy } from 'lucide-react';
import ChartTransport from '../features/ChartTransport';
import FlipCard from '../features/FlipCard';
import GamifiedQuiz from '../features/GamifiedQuiz';
import SentenceBuilder from '../features/SentenceBuilder';
import LessonStepper from '../ui/LessonStepper';
import { TRANSPORT_VOCAB_LIST, TRANSPORT_QUIZ_A, TRANSPORT_QUIZ_B } from '../../constants';

interface LessonTransportProps {
  onAddXp: (amount: number, sectionId: string) => void;
}

const LessonTransport: React.FC<LessonTransportProps> = ({ onAddXp }) => {
  const [showInteractive, setShowInteractive] = useState(true);
  const sentence = ["The", "chart", "compares", "average", "CO2", "emissions", "for", "different", "modes", "of", "transport."];

  const steps = [
    {
      title: "Intro",
      content: (
        <section className="text-center flex flex-col items-center justify-center min-h-[50vh] space-y-8">
          <div className="inline-block px-4 py-2 rounded-full bg-purple-50 text-purple-600 text-xs font-black uppercase tracking-widest border border-purple-100">
            Comparative Data
          </div>
          <h1 className="text-7xl md:text-9xl font-black text-slate-900 tracking-tighter leading-none">
            Compare &<br/>
            <span className="text-purple-600">Contrast</span>
          </h1>
        </section>
      )
    },
    {
      title: "Chart",
      content: (
        <div className="max-w-5xl mx-auto w-full">
           <div className="flex justify-end mb-4">
             <button onClick={() => setShowInteractive(!showInteractive)} className="text-xs font-bold text-purple-600 bg-purple-50 px-4 py-2 rounded-full hover:bg-purple-100 transition-colors flex items-center gap-2">
                <RefreshCw size={12}/> {showInteractive ? "Static" : "Interactive"}
              </button>
           </div>
           {showInteractive ? <ChartTransport /> : (
              <div className="bg-white p-20 rounded-[3rem] shadow-xl border border-gray-100 text-center min-h-[500px] flex items-center justify-center">
                <p className="text-slate-300 font-bold text-2xl">Static View</p>
              </div>
           )}
        </div>
      )
    },
    {
      title: "Feature 1",
      content: (
        <div className="max-w-2xl mx-auto p-12 bg-blue-50 rounded-[3rem] border border-blue-100 text-center space-y-6 shadow-lg">
           <div className="text-sm font-bold uppercase tracking-widest text-blue-400">Key Feature 1</div>
           <div className="text-5xl font-black text-blue-900">The Polluter</div>
           <div className="text-2xl text-blue-700/80 font-medium">Planes (244g) dwarf everything else.</div>
        </div>
      )
    },
    {
      title: "Feature 2",
      content: (
        <div className="max-w-2xl mx-auto p-12 bg-green-50 rounded-[3rem] border border-green-100 text-center space-y-6 shadow-lg">
           <div className="text-sm font-bold uppercase tracking-widest text-green-600">Key Feature 2</div>
           <div className="text-5xl font-black text-green-900">Efficiency</div>
           <div className="text-2xl text-green-700/80 font-medium">Trams are cleanest despite carrying the most people.</div>
        </div>
      )
    },
    ...TRANSPORT_VOCAB_LIST.map((item) => ({
      title: "Vocabulary",
      content: (
        <div className="w-full flex items-center justify-center">
          <FlipCard {...item} large />
        </div>
      )
    })),
    {
      title: "Builder",
      content: (
        <div className="max-w-4xl mx-auto w-full">
          <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-purple-50">
             <SentenceBuilder sentence={sentence} />
          </div>
        </div>
      )
    },
    {
      title: "Quiz A",
      content: <div className="max-w-3xl mx-auto h-[650px] w-full"><GamifiedQuiz questions={TRANSPORT_QUIZ_A} title="Vocab" onComplete={() => onAddXp(50, 'quizE')} /></div>
    },
    {
      title: "Strategy Intro",
      content: (
         <div className="text-center max-w-4xl mx-auto space-y-8">
            <h2 className="text-7xl font-black text-slate-900">Comparing Magnitude</h2>
            <p className="text-4xl text-slate-500 font-light leading-relaxed">
              Don't read the exact grams.<br/><span className="text-purple-600 font-bold">Check the length.</span>
            </p>
         </div>
      )
    },
    {
      title: "Strategy 1",
      content: (
         <div className="bg-purple-900 text-white p-16 rounded-[3rem] text-center max-w-2xl mx-auto shadow-2xl">
            <ArrowRight className="text-fuchsia-400 mb-8 mx-auto" size={64} />
            <h4 className="font-black text-5xl mb-6">Extremes</h4>
            <p className="text-purple-100 text-2xl font-light">Walking is 0.<br/>Planes are huge (244).</p>
         </div>
      )
    },
    {
      title: "Model Para 1",
      content: (
        <div className="max-w-3xl mx-auto">
           <div className="text-sm font-bold uppercase tracking-widest text-purple-400 mb-4 ml-4">Overview</div>
           <p className="bg-purple-50 p-12 rounded-[2.5rem] shadow-xl text-3xl text-slate-800 leading-relaxed font-light border-l-8 border-purple-500">
             Overall, air travel generates the highest emissions by a significant margin, whereas non-motorized transport produces none.
           </p>
        </div>
      )
    },
    {
      title: "Quiz B",
      content: <div className="max-w-3xl mx-auto h-[650px] w-full"><GamifiedQuiz questions={TRANSPORT_QUIZ_B} title="Analysis" onComplete={() => onAddXp(50, 'quizF')} /></div>
    }
  ];

  return <LessonStepper steps={steps} colorTheme="purple" />;
};

export default LessonTransport;