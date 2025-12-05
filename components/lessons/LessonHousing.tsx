import React, { useState } from 'react';
import { RefreshCw, ArrowRight } from 'lucide-react';
import ChartHousing from '../features/ChartHousing';
import FlipCard from '../features/FlipCard';
import GamifiedQuiz from '../features/GamifiedQuiz';
import SentenceBuilder from '../features/SentenceBuilder';
import LessonStepper from '../ui/LessonStepper';
import { HOUSING_VOCAB_LIST, HOUSING_QUIZ_A, HOUSING_QUIZ_B } from '../../constants';

interface LessonHousingProps {
  onAddXp: (amount: number, sectionId: string) => void;
}

const LessonHousing: React.FC<LessonHousingProps> = ({ onAddXp }) => {
  const [showImage, setShowImage] = useState(true);
  const sentence = ["The", "bar", "chart", "compares", "housing", "tenure", "in", "England", "and", "Wales."];

  const steps = [
    {
      title: "Intro",
      content: (
        <section className="text-center flex flex-col items-center justify-center h-full space-y-4">
          <div className="inline-block px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100">
            Trends Over Time
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">
            The<br/>
            <span className="text-blue-600">Crossover</span>
          </h1>
        </section>
      )
    },
    {
      title: "Chart",
      content: (
        <div className="max-w-4xl mx-auto w-full">
           <div className="flex justify-end mb-2">
             <button onClick={() => setShowImage(!showImage)} className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors flex items-center gap-2">
                <RefreshCw size={10}/> {showImage ? "2D" : "3D"}
              </button>
           </div>
           {showImage ? <ChartHousing /> : (
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
        <div className="max-w-xl mx-auto p-8 bg-blue-50 rounded-[2rem] border border-blue-100 text-center space-y-4 shadow-lg">
           <div className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Key Feature 1</div>
           <div className="text-3xl font-black text-blue-900">The Crossover</div>
           <div className="text-lg text-blue-700/80 font-medium">1971: The moment lines crossed at 50%.</div>
        </div>
      )
    },
    {
      title: "Feature 2",
      content: (
        <div className="max-w-xl mx-auto p-8 bg-green-50 rounded-[2rem] border border-green-100 text-center space-y-4 shadow-lg">
           <div className="text-[10px] font-bold uppercase tracking-widest text-green-600">Key Feature 2</div>
           <div className="text-3xl font-black text-green-900">Inverse Trends</div>
           <div className="text-lg text-green-700/80 font-medium">Owning rose, while Renting fell consistently.</div>
        </div>
      )
    },
    ...HOUSING_VOCAB_LIST.map((item) => ({
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
          <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-blue-50">
             <SentenceBuilder sentence={sentence} />
          </div>
        </div>
      )
    },
    {
      title: "Quiz A",
      content: <div className="max-w-2xl mx-auto w-full"><GamifiedQuiz questions={HOUSING_QUIZ_A} title="Vocab" onComplete={() => onAddXp(50, 'quizC')} /></div>
    },
    {
      title: "Strategy Intro",
      content: (
         <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-5xl font-black text-slate-900">Visualizing Change</h2>
            <p className="text-3xl text-slate-500 font-light leading-relaxed">
              Don't read the numbers.<br/><span className="text-blue-600 font-bold">Follow the colors.</span>
            </p>
         </div>
      )
    },
    {
      title: "Strategy 1",
      content: (
         <div className="bg-blue-900 text-white p-10 rounded-[2rem] text-center max-w-xl mx-auto shadow-2xl">
            <ArrowRight className="text-cyan-400 mb-6 mx-auto" size={48} />
            <h4 className="font-black text-3xl mb-4">Intersection</h4>
            <p className="text-blue-100 text-xl font-light">Around 1971, ownership overtook renting.</p>
         </div>
      )
    },
    {
      title: "Strategy 2",
      content: (
         <div className="bg-blue-900 text-white p-10 rounded-[2rem] text-center max-w-xl mx-auto shadow-2xl">
            <RefreshCw className="text-blue-300 mb-6 mx-auto" size={48} />
            <h4 className="font-black text-3xl mb-4">Mirror Image</h4>
            <p className="text-blue-100 text-xl font-light">1918 and 2011 are almost perfect opposites.</p>
         </div>
      )
    },
    {
      title: "Model Intro",
      content: (
        <div className="max-w-3xl mx-auto text-center space-y-6">
           <h2 className="text-5xl font-black text-slate-900">The Report</h2>
           <p className="text-2xl text-slate-500 font-light">Breaking down the narrative.</p>
        </div>
      )
    },
    {
      title: "Model: Intro",
      content: (
        <div className="max-w-2xl mx-auto">
           <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 ml-4">Introduction</div>
           <p className="bg-white p-8 rounded-[2rem] shadow-xl text-xl text-slate-700 leading-relaxed font-light border-l-4 border-gray-300">
             The bar chart compares the percentage of households in owned versus rented accommodation in England and Wales between 1918 and 2011.
           </p>
        </div>
      )
    },
    {
      title: "Model: Overview",
      content: (
        <div className="max-w-2xl mx-auto">
           <div className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-3 ml-4">Overview</div>
           <p className="bg-blue-50 p-8 rounded-[2rem] shadow-xl text-xl text-slate-800 leading-relaxed font-light border-l-4 border-blue-500">
             Overall, there is a clear <span className="font-bold text-blue-600">inverse relationship</span>. While renting showed a downward trend, home ownership steadily increased.
           </p>
        </div>
      )
    },
    {
      title: "Model: Details 1",
      content: (
        <div className="max-w-2xl mx-auto">
           <div className="text-[10px] font-bold uppercase tracking-widest text-green-600 mb-3 ml-4">Details: Renting</div>
           <p className="bg-green-50 p-8 rounded-[2rem] shadow-xl text-xl text-slate-800 leading-relaxed font-light border-l-4 border-green-500">
             In 1918, rented accommodation was the dominant tenure, accounting for roughly 77% of households. However, this figure experienced a steady decline, dropping to 50% by 1971 and reaching a low of 31% in 2001.
           </p>
        </div>
      )
    },
    {
      title: "Model: Details 2",
      content: (
        <div className="max-w-2xl mx-auto">
           <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 mb-3 ml-4">Details: Owning</div>
           <p className="bg-indigo-50 p-8 rounded-[2rem] shadow-xl text-xl text-slate-800 leading-relaxed font-light border-l-4 border-indigo-500">
             Conversely, home ownership began at a low of 23% but saw a consistent rise. It overtook renting in 1971 and peaked at 69% in 2001, before dipping slightly to 64% in 2011.
           </p>
        </div>
      )
    },
    {
      title: "Quiz B",
      content: <div className="max-w-2xl mx-auto w-full"><GamifiedQuiz questions={HOUSING_QUIZ_B} title="Analysis" onComplete={() => onAddXp(50, 'quizD')} /></div>
    }
  ];

  return <LessonStepper steps={steps} colorTheme="blue" chartComponent={<ChartHousing />} />;
};

export default LessonHousing;