import React, { useState } from 'react';
import { RefreshCw, ArrowRight } from 'lucide-react';
import ChartCoffee from '../features/ChartCoffee';
import FlipCard from '../features/FlipCard';
import GamifiedQuiz from '../features/GamifiedQuiz';
import SentenceBuilder from '../features/SentenceBuilder';
import LessonStepper from '../ui/LessonStepper';
import { COFFEE_VOCAB_LIST, COFFEE_QUIZ_A, COFFEE_QUIZ_B } from '../../constants';

interface LessonCoffeeProps {
  onAddXp: (amount: number, sectionId: string) => void;
}

const LessonCoffee: React.FC<LessonCoffeeProps> = ({ onAddXp }) => {
  const [showInteractive, setShowInteractive] = useState(true);
  const sentence = ["The", "tables", "detail", "sales", "of", "Fairtrade-labelled", "coffee", "and", "bananas", "in", "five", "European", "countries."];

  const steps = [
    {
      title: "Intro",
      content: (
        <section className="text-center flex flex-col items-center justify-center min-h-[50vh] space-y-8">
          <div className="inline-block px-4 py-2 rounded-full bg-amber-50 text-amber-700 text-xs font-black uppercase tracking-widest border border-amber-100">
            Comparative Tables
          </div>
          <h1 className="text-7xl md:text-9xl font-black text-slate-900 tracking-tighter leading-none">
            Growth &<br/>
            <span className="text-amber-600">Decline</span>
          </h1>
        </section>
      )
    },
    {
      title: "Chart",
      content: (
        <div className="max-w-5xl mx-auto w-full">
           <div className="flex justify-end mb-4">
             <button onClick={() => setShowInteractive(!showInteractive)} className="text-xs font-bold text-amber-700 bg-amber-50 px-4 py-2 rounded-full hover:bg-amber-100 transition-colors flex items-center gap-2">
                <RefreshCw size={12}/> {showInteractive ? "Static" : "Interactive"}
              </button>
           </div>
           {showInteractive ? <ChartCoffee /> : (
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
        <div className="max-w-2xl mx-auto p-12 bg-amber-50 rounded-[3rem] border border-amber-100 text-center space-y-6 shadow-lg">
           <div className="text-sm font-bold uppercase tracking-widest text-amber-700">Key Feature 1</div>
           <div className="text-5xl font-black text-amber-900">Coffee Surge</div>
           <div className="text-2xl text-amber-800/80 font-medium">Sales rose in all 5 countries, especially the UK.</div>
        </div>
      )
    },
    {
      title: "Feature 2",
      content: (
        <div className="max-w-2xl mx-auto p-12 bg-yellow-50 rounded-[3rem] border border-yellow-100 text-center space-y-6 shadow-lg">
           <div className="text-sm font-bold uppercase tracking-widest text-yellow-700">Key Feature 2</div>
           <div className="text-5xl font-black text-yellow-900">Mixed Bananas</div>
           <div className="text-2xl text-yellow-800/80 font-medium">Switzerland boomed, but Sweden & Denmark fell.</div>
        </div>
      )
    },
    ...COFFEE_VOCAB_LIST.map((item) => ({
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
          <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-amber-50">
             <SentenceBuilder sentence={sentence} />
          </div>
        </div>
      )
    },
    {
      title: "Quiz A",
      content: <div className="max-w-3xl mx-auto h-[650px] w-full"><GamifiedQuiz questions={COFFEE_QUIZ_A} title="Vocab" onComplete={() => onAddXp(50, 'quizG')} /></div>
    },
    {
      title: "Strategy Intro",
      content: (
         <div className="text-center max-w-4xl mx-auto space-y-8">
            <h2 className="text-7xl font-black text-slate-900">Direction of Change</h2>
            <p className="text-4xl text-slate-500 font-light leading-relaxed">
              Don't check the millions.<br/><span className="text-amber-600 font-bold">Check the arrows.</span>
            </p>
         </div>
      )
    },
    {
      title: "Strategy 1",
      content: (
         <div className="bg-stone-800 text-white p-16 rounded-[3rem] text-center max-w-2xl mx-auto shadow-2xl">
            <ArrowRight className="text-amber-400 mb-8 mx-auto" size={64} />
            <h4 className="font-black text-5xl mb-6">Coffee: All Up</h4>
            <p className="text-stone-300 text-2xl font-light">Every single country bought more coffee in 2004.</p>
         </div>
      )
    },
    {
      title: "Model Para 1",
      content: (
        <div className="max-w-3xl mx-auto">
           <div className="text-sm font-bold uppercase tracking-widest text-amber-600 mb-4 ml-4">Overview</div>
           <p className="bg-amber-50 p-12 rounded-[2.5rem] shadow-xl text-3xl text-slate-800 leading-relaxed font-light border-l-8 border-amber-500">
             Overall, sales of Fairtrade coffee increased in all five nations. In contrast, the market for Fairtrade bananas was more varied.
           </p>
        </div>
      )
    },
    {
      title: "Quiz B",
      content: <div className="max-w-3xl mx-auto h-[650px] w-full"><GamifiedQuiz questions={COFFEE_QUIZ_B} title="Analysis" onComplete={() => onAddXp(50, 'quizH')} /></div>
    }
  ];

  return <LessonStepper steps={steps} colorTheme="amber" />;
};

export default LessonCoffee;