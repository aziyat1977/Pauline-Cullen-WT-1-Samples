import React, { useState } from 'react';
import { RefreshCw, Info, Award, ArrowRight, Trophy } from 'lucide-react';
import Chart3D from '../features/Chart3D';
import FlipCard from '../features/FlipCard';
import GamifiedQuiz from '../features/GamifiedQuiz';
import SentenceBuilder from '../features/SentenceBuilder';
import LessonStepper from '../ui/LessonStepper';
import { VOCAB_LIST, QUIZ_A, QUIZ_B } from '../../constants';

interface LessonFlightProps {
  onAddXp: (amount: number, sectionId: string) => void;
}

const LessonFlight: React.FC<LessonFlightProps> = ({ onAddXp }) => {
  const [show3D, setShow3D] = useState(true);
  const sentence = ["The", "chart", "shows", "the", "duration", "of", "three", "separate", "flight", "trials."];

  const steps = [
    {
      title: "Intro",
      content: (
        <section className="text-center flex flex-col items-center justify-center h-full space-y-4">
          <div className="inline-block px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest border border-indigo-100">
            Task 1 Mastery
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">
            Data<br/>
            <span className="text-indigo-600">Response</span>
          </h1>
        </section>
      )
    },
    {
      title: "Chart",
      content: (
        <div className="max-w-4xl mx-auto w-full">
           <div className="flex justify-end mb-2">
             <button onClick={() => setShow3D(!show3D)} className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full hover:bg-indigo-100 transition-colors flex items-center gap-2">
                <RefreshCw size={10}/> {show3D ? "2D" : "3D"}
              </button>
           </div>
           {show3D ? <Chart3D /> : (
              <div className="bg-white p-12 rounded-[2rem] shadow-xl border border-gray-100 text-center min-h-[300px] flex items-center justify-center">
                <p className="text-slate-300 font-bold text-xl">Static View Placeholder</p>
              </div>
           )}
        </div>
      )
    },
    {
      title: "Mission",
      content: (
        <div className="max-w-3xl mx-auto text-center space-y-8">
           <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto text-orange-600">
               <Info size={32} />
            </div>
            <h3 className="text-4xl font-black text-slate-800 tracking-tight">Your Objective</h3>
            <p className="text-2xl text-slate-500 leading-normal font-light">
              "Report <strong>what you see</strong>.<br/>Not <strong>why</strong> it happened."
            </p>
        </div>
      )
    },
    {
      title: "Feature 1",
      content: (
        <div className="max-w-xl mx-auto p-8 bg-slate-50 rounded-[2rem] border border-slate-100 text-center space-y-4 shadow-lg">
           <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Key Feature 1</div>
           <div className="text-3xl font-black text-slate-800">Inverse Trend</div>
           <div className="text-lg text-slate-500 font-medium">More candles = Less time</div>
        </div>
      )
    },
    {
      title: "Feature 2",
      content: (
        <div className="max-w-xl mx-auto p-8 bg-indigo-50 rounded-[2rem] border border-indigo-100 text-center space-y-4 shadow-lg">
           <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Key Feature 2</div>
           <div className="text-3xl font-black text-indigo-900">Peak Value</div>
           <div className="text-lg text-indigo-600 font-medium">1 Candle = Highest duration</div>
        </div>
      )
    },
    // Spread vocabulary items into individual full-page cards
    ...VOCAB_LIST.map((item) => ({
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
          <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-indigo-50">
             <SentenceBuilder sentence={sentence} />
          </div>
        </div>
      )
    },
    {
      title: "Quiz A",
      content: <div className="max-w-2xl mx-auto w-full"><GamifiedQuiz questions={QUIZ_A} title="Vocab" onComplete={() => onAddXp(50, 'quizA')} /></div>
    },
    {
      title: "Strategy Intro",
      content: (
         <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-5xl font-black text-slate-900">The "Step Back"</h2>
            <p className="text-3xl text-slate-500 font-light leading-relaxed">
              Stand back 3 meters.<br/>Ignore the numbers.<br/><span className="text-indigo-600 font-bold">See the shape.</span>
            </p>
         </div>
      )
    },
    {
      title: "Strategy 1",
      content: (
         <div className="bg-slate-900 text-white p-10 rounded-[2rem] text-center max-w-xl mx-auto shadow-2xl">
            <ArrowRight className="text-indigo-400 mb-6 mx-auto" size={48} />
            <h4 className="font-black text-3xl mb-4">The Trend</h4>
            <p className="text-indigo-100 text-xl font-light">As we add candles, the bars drop consistently.</p>
         </div>
      )
    },
    {
      title: "Strategy 2",
      content: (
         <div className="bg-slate-900 text-white p-10 rounded-[2rem] text-center max-w-xl mx-auto shadow-2xl">
            <Trophy className="text-purple-400 mb-6 mx-auto" size={48} />
            <h4 className="font-black text-3xl mb-4">The Extremes</h4>
            <p className="text-purple-100 text-xl font-light">1 Candle is highest.<br/>3 Candles is lowest.</p>
         </div>
      )
    },
    {
      title: "Model Intro",
      content: (
        <div className="max-w-3xl mx-auto text-center space-y-6">
           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 mb-2">
             <Award size={32} />
           </div>
           <h2 className="text-5xl font-black text-slate-900">Band 9 Report</h2>
           <p className="text-2xl text-slate-500 font-light">A breakdown of a perfect answer.</p>
        </div>
      )
    },
    {
      title: "Model: Intro",
      content: (
        <div className="max-w-2xl mx-auto">
           <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 ml-4">Introduction</div>
           <p className="bg-white p-8 rounded-[2rem] shadow-xl text-xl text-slate-700 leading-relaxed font-light border-l-4 border-gray-300">
             The bar chart illustrates the duration of three separate flights, measured in seconds, under three distinct conditions: with one, two, and three candles lit.
           </p>
        </div>
      )
    },
    {
      title: "Model: Overview",
      content: (
        <div className="max-w-2xl mx-auto">
           <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-3 ml-4">Overview</div>
           <p className="bg-indigo-50 p-8 rounded-[2rem] shadow-xl text-xl text-slate-800 leading-relaxed font-light border-l-4 border-indigo-500">
             Overall, there is a clear <span className="font-bold text-indigo-600">inverse relationship</span> between the number of candles used and the duration of the flight.
           </p>
        </div>
      )
    },
    {
      title: "Model: Details 1",
      content: (
        <div className="max-w-2xl mx-auto">
           <div className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-3 ml-4">Details: Highs</div>
           <p className="bg-purple-50 p-8 rounded-[2rem] shadow-xl text-xl text-slate-800 leading-relaxed font-light border-l-4 border-purple-500">
             Regarding the specific durations, the longest flights were recorded with a single candle, averaging 14.7 seconds. Individual trials ranged from 14.1 to 15.2 seconds.
           </p>
        </div>
      )
    },
    {
      title: "Model: Details 2",
      content: (
        <div className="max-w-2xl mx-auto">
           <div className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-3 ml-4">Details: Lows</div>
           <p className="bg-blue-50 p-8 rounded-[2rem] shadow-xl text-xl text-slate-800 leading-relaxed font-light border-l-4 border-blue-500">
             In contrast, adding a second candle reduced the average to 12.9 seconds. This trend continued with three candles, where the pulse plummeted to an average of 10.5 seconds.
           </p>
        </div>
      )
    },
    {
      title: "Quiz B",
      content: <div className="max-w-2xl mx-auto w-full"><GamifiedQuiz questions={QUIZ_B} title="Analysis" onComplete={() => onAddXp(50, 'quizB')} /></div>
    }
  ];

  return <LessonStepper steps={steps} colorTheme="indigo" chartComponent={<Chart3D />} />;
};

export default LessonFlight;