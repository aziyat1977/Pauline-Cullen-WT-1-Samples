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
        <section className="text-center flex flex-col items-center justify-center h-full space-y-4">
          <div className="inline-block px-3 py-1.5 rounded-full bg-purple-50 text-purple-600 text-[10px] font-black uppercase tracking-widest border border-purple-100">
            Comparative Data
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">
            Compare &<br/>
            <span className="text-purple-600">Contrast</span>
          </h1>
        </section>
      )
    },
    {
      title: "Chart",
      content: (
        <div className="max-w-4xl mx-auto w-full">
           <div className="flex justify-end mb-2">
             <button onClick={() => setShowInteractive(!showInteractive)} className="text-[10px] font-bold text-purple-600 bg-purple-50 px-3 py-1.5 rounded-full hover:bg-purple-100 transition-colors flex items-center gap-2">
                <RefreshCw size={10}/> {showInteractive ? "Static" : "Interactive"}
              </button>
           </div>
           {showInteractive ? <ChartTransport /> : (
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
           <div className="text-3xl font-black text-blue-900">The Polluter</div>
           <div className="text-lg text-blue-700/80 font-medium">Planes (244g) dwarf everything else.</div>
        </div>
      )
    },
    {
      title: "Feature 2",
      content: (
        <div className="max-w-xl mx-auto p-8 bg-green-50 rounded-[2rem] border border-green-100 text-center space-y-4 shadow-lg">
           <div className="text-[10px] font-bold uppercase tracking-widest text-green-600">Key Feature 2</div>
           <div className="text-3xl font-black text-green-900">Efficiency</div>
           <div className="text-lg text-green-700/80 font-medium">Trams are cleanest despite carrying the most people.</div>
        </div>
      )
    },
    ...TRANSPORT_VOCAB_LIST.map((item) => ({
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
          <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-purple-50">
             <SentenceBuilder sentence={sentence} />
          </div>
        </div>
      )
    },
    {
      title: "Quiz A",
      content: <div className="max-w-2xl mx-auto w-full"><GamifiedQuiz questions={TRANSPORT_QUIZ_A} title="Vocab" onComplete={() => onAddXp(50, 'quizE')} /></div>
    },
    {
      title: "Strategy Intro",
      content: (
         <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-5xl font-black text-slate-900">Comparing Magnitude</h2>
            <p className="text-3xl text-slate-500 font-light leading-relaxed">
              Don't read the exact grams.<br/><span className="text-purple-600 font-bold">Check the length.</span>
            </p>
         </div>
      )
    },
    {
      title: "Strategy 1",
      content: (
         <div className="bg-purple-900 text-white p-10 rounded-[2rem] text-center max-w-xl mx-auto shadow-2xl">
            <ArrowRight className="text-fuchsia-400 mb-6 mx-auto" size={48} />
            <h4 className="font-black text-3xl mb-4">Extremes</h4>
            <p className="text-purple-100 text-xl font-light">Walking is 0.<br/>Planes are huge (244).</p>
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
             The bar chart compares the carbon emissions per passenger-kilometre for various modes of transport, alongside their average occupancy rates.
           </p>
        </div>
      )
    },
    {
      title: "Model: Overview",
      content: (
        <div className="max-w-2xl mx-auto">
           <div className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-3 ml-4">Overview</div>
           <p className="bg-purple-50 p-8 rounded-[2rem] shadow-xl text-xl text-slate-800 leading-relaxed font-light border-l-4 border-purple-500">
             Overall, air travel generates the highest emissions by a significant margin, whereas non-motorized transport produces none.
           </p>
        </div>
      )
    },
    {
      title: "Model: Details 1",
      content: (
        <div className="max-w-2xl mx-auto">
           <div className="text-[10px] font-bold uppercase tracking-widest text-blue-500 mb-3 ml-4">Details: High Emitters</div>
           <p className="bg-blue-50 p-8 rounded-[2rem] shadow-xl text-xl text-slate-800 leading-relaxed font-light border-l-4 border-blue-500">
             Air travel is by far the most polluting mode, emitting 244g of CO2 per passenger-kilometre, despite a relatively high occupancy of 88 passengers. Cars and scooters follow, emitting 107g and 81g respectively.
           </p>
        </div>
      )
    },
    {
      title: "Model: Details 2",
      content: (
        <div className="max-w-2xl mx-auto">
           <div className="text-[10px] font-bold uppercase tracking-widest text-green-600 mb-3 ml-4">Details: Low Emitters</div>
           <p className="bg-green-50 p-8 rounded-[2rem] shadow-xl text-xl text-slate-800 leading-relaxed font-light border-l-4 border-green-500">
             At the other end of the scale, buses and trams are significantly greener, emitting 56g and 28g respectively. Notably, walking and cycling are carbon-neutral, producing zero emissions.
           </p>
        </div>
      )
    },
    {
      title: "Quiz B",
      content: <div className="max-w-2xl mx-auto w-full"><GamifiedQuiz questions={TRANSPORT_QUIZ_B} title="Analysis" onComplete={() => onAddXp(50, 'quizF')} /></div>
    }
  ];

  return <LessonStepper steps={steps} colorTheme="purple" chartComponent={<ChartTransport />} />;
};

export default LessonTransport;