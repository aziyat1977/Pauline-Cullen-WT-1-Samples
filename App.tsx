import React, { useState } from 'react';
import { 
  BookOpen, Star, RefreshCw, Trophy, Layout, 
  Info, Award, ArrowRight
} from 'lucide-react';
import Chart3D from './components/features/Chart3D';
import FlipCard from './components/features/FlipCard';
import GamifiedQuiz from './components/features/GamifiedQuiz';
import SentenceBuilder from './components/features/SentenceBuilder';
import { VOCAB_LIST, QUIZ_A, QUIZ_B, STEPS } from './constants';
import { AppState } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({ xp: 0, completedSections: [] });
  const [show3D, setShow3D] = useState(true);

  const addXp = (amount: number, sectionId: string) => {
    if (!state.completedSections.includes(sectionId)) {
      setState(prev => ({
        xp: prev.xp + amount,
        completedSections: [...prev.completedSections, sectionId]
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 pb-20">
      
      {/* Gamification Header */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg shadow-sm z-50 border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200">
              I7
            </div>
            <span className="font-bold text-gray-800 hidden sm:block tracking-tight text-lg">IELTS Mastery</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end">
               <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Progress</span>
               <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1.5">
                 <div className="h-full bg-indigo-500 transition-all duration-1000 ease-out rounded-full" style={{ width: `${Math.min(state.xp, 100)}%` }}></div>
               </div>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
               <Star className="text-yellow-400 fill-current animate-spin-slow" size={18} />
               <span className="font-bold text-indigo-900 text-sm">{state.xp} XP</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-28 space-y-20">
        
        {/* Intro Hero */}
        <section className="text-center space-y-6 animate-fade-in-up py-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wide mb-2">
            Academic Task 1
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">
            Data Response <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Masterclass</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
             Learn to analyze, structure, and report on visual data with precision. 
             Based on the Band 9 approach.
          </p>
        </section>

        {/* Visuals Section */}
        <section className="grid lg:grid-cols-12 gap-8 items-start animate-fade-in-up delay-100">
           <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between mb-2 px-1">
                 <h2 className="text-lg font-bold flex items-center gap-2 text-gray-700"><Layout size={18}/> Visual Data Source</h2>
                 <button 
                   onClick={() => setShow3D(!show3D)}
                   className="text-xs text-indigo-500 font-medium hover:text-indigo-700 flex items-center gap-1 transition-colors"
                 >
                   <RefreshCw size={12}/> Switch View
                 </button>
              </div>
              
              {show3D ? (
                <Chart3D />
              ) : (
                <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 text-center min-h-[400px] flex items-center justify-center">
                  <p className="text-gray-400 italic">Static Reference View</p>
                </div>
              )}
           </div>

           <div className="lg:col-span-5 flex flex-col h-full gap-6">
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex-grow">
                  <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-xl mb-8">
                    <h3 className="font-bold text-orange-800 mb-2 flex items-center gap-2">
                      <Info size={18}/> The Mission
                    </h3>
                    <p className="text-orange-900/80 text-sm leading-relaxed">
                      "Your job is to report <strong>what you see</strong>, not explain <strong>why</strong> it happened. Stick to the data provided."
                    </p>
                  </div>
                  
                  <h4 className="font-bold text-gray-400 text-xs uppercase tracking-widest mb-4">Key Features</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl transition-all hover:bg-white hover:shadow-md cursor-default border border-transparent hover:border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-white border border-gray-100 text-gray-600 flex items-center justify-center font-bold shadow-sm">1</div>
                        <div>
                          <p className="font-bold text-gray-800">Trend</p>
                          <p className="text-xs text-gray-500 font-medium">Inverse: More candles = Less time</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl transition-all hover:bg-white hover:shadow-md cursor-default border border-transparent hover:border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-white border border-gray-100 text-gray-600 flex items-center justify-center font-bold shadow-sm">2</div>
                        <div>
                          <p className="font-bold text-gray-800">Peak</p>
                          <p className="text-xs text-gray-500 font-medium">1 Candle setup was consistently highest</p>
                        </div>
                    </div>
                  </div>
              </div>
           </div>
        </section>

        {/* Vocabulary Deck */}
        <section>
          <div className="flex items-center gap-3 mb-8">
             <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600"><BookOpen size={24}/></div>
             <h2 className="text-2xl font-bold text-gray-900">Essential Vocabulary</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VOCAB_LIST.map((item, idx) => (
              <FlipCard key={idx} {...item} />
            ))}
          </div>
        </section>

        {/* Introduction Builder */}
        <section className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden relative">
           <div className="absolute -top-24 -right-24 w-96 h-96 bg-gray-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
           <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
           
           <div className="relative z-10 mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Structure & Strategy</h2>
              <p className="text-gray-500">Master the art of the introduction.</p>
           </div>
           
           <div className="grid lg:grid-cols-2 gap-12 relative z-10">
             <div>
               <h3 className="font-bold text-gray-700 mb-6 flex items-center gap-2"><Award size={18} className="text-indigo-500"/> Exercise: Sentence Scramble</h3>
               <SentenceBuilder />
             </div>
             
             <div className="space-y-6">
               <h3 className="font-bold text-gray-700 mb-6 flex items-center gap-2"><Layout size={18} className="text-indigo-500"/> The Formula</h3>
               <div className="space-y-4">
                 {STEPS.map((item) => (
                   <div key={item.step} className="flex items-center gap-5 p-4 bg-white rounded-2xl border border-gray-100 hover:border-indigo-100 hover:shadow-lg transition-all group cursor-default">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-sm">{item.step}</div>
                      <div>
                        <p className="font-bold text-gray-800 text-lg">{item.text}</p>
                        <p className="text-sm text-gray-400 font-medium">{item.sub}</p>
                      </div>
                   </div>
                 ))}
               </div>
             </div>
           </div>
        </section>

        {/* Quizzes */}
        <div className="grid lg:grid-cols-2 gap-8">
          <section className="flex flex-col">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800"><Trophy className="text-yellow-500"/> Vocab & Grammar</h2>
            <div className="flex-grow">
               <GamifiedQuiz questions={QUIZ_A} title="Vocab & Grammar" onComplete={() => addXp(50, 'quizA')} />
            </div>
          </section>
          
          <section className="flex flex-col">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800"><Award className="text-indigo-500"/> Task Achievement</h2>
            <div className="flex-grow">
               <GamifiedQuiz questions={QUIZ_B} title="Analysis Strategy" onComplete={() => addXp(50, 'quizB')} />
            </div>
          </section>
        </div>

        {/* Overview Strategy - The "Step Back" */}
        <section className="bg-slate-900 text-white rounded-[2.5rem] p-8 lg:p-16 relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600 rounded-full filter blur-[100px] opacity-30 -mr-20 -mt-20"></div>
           <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600 rounded-full filter blur-[100px] opacity-30 -ml-20 -mb-20"></div>

           <div className="relative z-10 text-center max-w-3xl mx-auto space-y-10">
              <div>
                <h2 className="text-4xl font-bold mb-6">The "Step Back" Technique</h2>
                <p className="text-slate-300 text-xl leading-relaxed font-light">
                  Imagine standing 3 meters away from the chart. <br/>
                  You can't see the specific numbers anymore, only the <span className="text-white font-semibold border-b-2 border-indigo-500">shapes</span> and <span className="text-white font-semibold border-b-2 border-purple-500">movements</span>.
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6 text-left">
                <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors group">
                   <ArrowRight className="text-indigo-400 mb-4 rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={40} />
                   <h4 className="font-bold text-2xl mb-2">The Trend</h4>
                   <p className="text-slate-400 leading-relaxed">As we go right (add candles), the bars drop consistently.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors group">
                   <Trophy className="text-purple-400 mb-4 group-hover:scale-110 transition-transform" size={40} />
                   <h4 className="font-bold text-2xl mb-2">The Extremes</h4>
                   <p className="text-slate-400 leading-relaxed">1 Candle is clearly the highest. 3 Candles is the lowest.</p>
                </div>
              </div>
           </div>
        </section>

        {/* Model Answer */}
        <section className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100">
           <div className="p-10 lg:p-16">
             <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12 border-b border-gray-100 pb-8">
               <div className="bg-green-100 p-4 rounded-2xl w-fit">
                 <Award className="text-green-600" size={40} />
               </div>
               <div>
                 <h2 className="text-3xl font-bold text-gray-900">Band 9 Model Report</h2>
                 <p className="text-green-600 font-semibold mt-1">Written by an expert examiner</p>
               </div>
             </div>

             <div className="prose prose-lg text-gray-600 max-w-none space-y-8 leading-loose">
               <p className="bg-gray-50 p-6 rounded-2xl border-l-4 border-gray-300 hover:bg-gray-100 transition-colors">
                 The bar chart illustrates the duration of three separate flights, measured in seconds, under three distinct conditions: with one, two, and three candles lit. An average flight time is also provided for each category.
               </p>
               <p className="bg-indigo-50 p-6 rounded-2xl border-l-4 border-indigo-500 hover:bg-indigo-100 transition-colors">
                 <span className="font-bold text-indigo-700 text-xs uppercase tracking-widest block mb-2">The Overview</span>
                 Overall, there is a clear inverse relationship between the number of candles used and the duration of the flight. The longest flight times were recorded when only a single candle was lit, while the addition of subsequent candles resulted in consistently shorter durations across all trials.
               </p>
               <p className="hover:bg-gray-50 p-6 rounded-2xl transition-colors">
                 Looking first at the results for the single-candle setup, the flight times were at their peak. Flight #2 achieved the longest duration on the chart at just over 15 seconds, followed closely by Flight #3 and the average, both hovering around 15 seconds. Flight #1 was slightly shorter, recording a time of approximately 14 seconds.
               </p>
               <p className="hover:bg-gray-50 p-6 rounded-2xl transition-colors">
                 When a second candle was introduced, a noticeable decrease in flight time occurred. The average duration dropped to roughly 13 seconds, with individual flights ranging between 12.5 and 13.5 seconds. This downward trend continued with the three-candle setup, where the shortest times were observed. Flight #3 recorded the lowest duration of the entire experiment at 10 seconds, while the average for this group fell to just above 10 seconds, significantly lower than the 15-second average seen in the first category.
               </p>
             </div>
           </div>
        </section>

        <footer className="text-center py-12 text-gray-400 text-sm border-t border-gray-100">
           <p>© 2024 Interactive IELTS Prep • Educational Use Only</p>
        </footer>

      </main>
    </div>
  );
};

export default App;