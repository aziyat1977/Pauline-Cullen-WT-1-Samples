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
        <section className="text-center flex flex-col items-center justify-center min-h-[50vh] space-y-8">
          <div className="inline-block px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest border border-blue-100">
            Trends Over Time
          </div>
          <h1 className="text-7xl md:text-9xl font-black text-slate-900 tracking-tighter leading-none">
            The<br/>
            <span className="text-blue-600">Crossover</span>
          </h1>
        </section>
      )
    },
    {
      title: "Chart",
      content: (
        <div className="max-w-5xl mx-auto w-full">
           <div className="flex justify-end mb-4">
             <button onClick={() => setShowImage(!showImage)} className="text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors flex items-center gap-2">
                <RefreshCw size={12}/> {showImage ? "2D" : "3D"}
              </button>
           </div>
           {showImage ? <ChartHousing /> : (
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
           <div className="text-5xl font-black text-blue-900">The Crossover</div>
           <div className="text-2xl text-blue-700/80 font-medium">1971: The moment lines crossed at 50%.</div>
        </div>
      )
    },
    {
      title: "Feature 2",
      content: (
        <div className="max-w-2xl mx-auto p-12 bg-green-50 rounded-[3rem] border border-green-100 text-center space-y-6 shadow-lg">
           <div className="text-sm font-bold uppercase tracking-widest text-green-600">Key Feature 2</div>
           <div className="text-5xl font-black text-green-900">Inverse Trends</div>
           <div className="text-2xl text-green-700/80 font-medium">Owning rose, while Renting fell consistently.</div>
        </div>
      )
    },
    ...HOUSING_VOCAB_LIST.map((item) => ({
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
          <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-blue-50">
             <SentenceBuilder sentence={sentence} />
          </div>
        </div>
      )
    },
    {
      title: "Quiz A",
      content: <div className="max-w-3xl mx-auto h-[650px] w-full"><GamifiedQuiz questions={HOUSING_QUIZ_A} title="Vocab" onComplete={() => onAddXp(50, 'quizC')} /></div>
    },
    {
      title: "Strategy Intro",
      content: (
         <div className="text-center max-w-4xl mx-auto space-y-8">
            <h2 className="text-7xl font-black text-slate-900">Visualizing Change</h2>
            <p className="text-4xl text-slate-500 font-light leading-relaxed">
              Don't read the numbers.<br/><span className="text-blue-600 font-bold">Follow the colors.</span>
            </p>
         </div>
      )
    },
    {
      title: "Strategy 1",
      content: (
         <div className="bg-blue-900 text-white p-16 rounded-[3rem] text-center max-w-2xl mx-auto shadow-2xl">
            <ArrowRight className="text-cyan-400 mb-8 mx-auto" size={64} />
            <h4 className="font-black text-5xl mb-6">Intersection</h4>
            <p className="text-blue-100 text-2xl font-light">Around 1971, ownership overtook renting.</p>
         </div>
      )
    },
    {
      title: "Strategy 2",
      content: (
         <div className="bg-blue-900 text-white p-16 rounded-[3rem] text-center max-w-2xl mx-auto shadow-2xl">
            <RefreshCw className="text-blue-300 mb-8 mx-auto" size={64} />
            <h4 className="font-black text-5xl mb-6">Mirror Image</h4>
            <p className="text-blue-100 text-2xl font-light">1918 and 2011 are almost perfect opposites.</p>
         </div>
      )
    },
    {
      title: "Model Intro",
      content: (
        <div className="max-w-4xl mx-auto text-center space-y-8">
           <h2 className="text-6xl font-black text-slate-900">The Report</h2>
           <p className="text-3xl text-slate-500 font-light">Breaking down the narrative.</p>
        </div>
      )
    },
    {
      title: "Model Para 1",
      content: (
        <div className="max-w-3xl mx-auto">
           <div className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-4 ml-4">Overview</div>
           <p className="bg-blue-50 p-12 rounded-[2.5rem] shadow-xl text-3xl text-slate-800 leading-relaxed font-light border-l-8 border-blue-500">
             Overall, there is a clear <span className="font-bold text-blue-600">inverse relationship</span>. While renting showed a downward trend, home ownership steadily increased.
           </p>
        </div>
      )
    },
    {
      title: "Quiz B",
      content: <div className="max-w-3xl mx-auto h-[650px] w-full"><GamifiedQuiz questions={HOUSING_QUIZ_B} title="Analysis" onComplete={() => onAddXp(50, 'quizD')} /></div>
    }
  ];

  return <LessonStepper steps={steps} colorTheme="blue" />;
};

export default LessonHousing;