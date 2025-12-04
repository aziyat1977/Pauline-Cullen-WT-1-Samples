import React, { useState, useEffect } from 'react';
import { Star, Menu, X, BarChart2, Home, Layout, Coffee, Globe, Map, Moon, Sun, ArrowLeft, Trophy, Zap, Activity, BookOpen, ChevronRight } from 'lucide-react';
import { AppState } from './types';
import LessonFlight from './components/lessons/LessonFlight';
import LessonHousing from './components/lessons/LessonHousing';
import LessonTransport from './components/lessons/LessonTransport';
import LessonCoffee from './components/lessons/LessonCoffee';
import LessonDegradation from './components/lessons/LessonDegradation';
import LessonMaps from './components/lessons/LessonMaps';
import ReactiveBackground from './components/ui/ReactiveBackground';

type LessonId = 'flight' | 'housing' | 'transport' | 'coffee' | 'degradation' | 'maps';
type ViewState = 'dashboard' | 'lesson';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({ xp: 0, completedSections: [] });
  const [view, setView] = useState<ViewState>('dashboard');
  const [activeLesson, setActiveLesson] = useState<LessonId>('flight');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Apply Theme to HTML
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const addXp = (amount: number, sectionId: string) => {
    if (!state.completedSections.includes(sectionId)) {
      setState(prev => ({
        xp: prev.xp + amount,
        completedSections: [...prev.completedSections, sectionId]
      }));
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const lessons = [
    { id: 'flight', title: 'Task 1 Basics', subtitle: 'Flight Duration Analysis', icon: <BarChart2 size={24} />, color: 'bg-indigo-500', shadow: 'shadow-indigo-500/40', progress: 0 },
    { id: 'housing', title: 'Time Trends', subtitle: 'Housing Tenure Changes', icon: <Home size={24} />, color: 'bg-blue-500', shadow: 'shadow-blue-500/40', progress: 0 },
    { id: 'transport', title: 'Comparisons', subtitle: 'Transport CO₂ Data', icon: <Layout size={24} />, color: 'bg-purple-500', shadow: 'shadow-purple-500/40', progress: 0 },
    { id: 'coffee', title: 'Tables', subtitle: 'Sales Performance', icon: <Coffee size={24} />, color: 'bg-amber-500', shadow: 'shadow-amber-500/40', progress: 0 },
    { id: 'degradation', title: 'Multi-Chart', subtitle: 'Land Degradation', icon: <Globe size={24} />, color: 'bg-emerald-500', shadow: 'shadow-emerald-500/40', progress: 0 },
    { id: 'maps', title: 'Process Maps', subtitle: 'Island Development', icon: <Map size={24} />, color: 'bg-cyan-500', shadow: 'shadow-cyan-500/40', progress: 0 },
  ] as const;

  const handleStartLesson = (id: LessonId) => {
    setActiveLesson(id);
    setView('lesson');
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className={`min-h-screen font-sans text-gray-800 dark:text-slate-100 transition-colors duration-500 relative overflow-x-hidden selection:bg-indigo-500 selection:text-white`}>
      
      {/* 1. Reactive Background Layer */}
      <ReactiveBackground theme={theme} />
      
      {/* 2. Gradient Underlay (Subtle fallback/depth) */}
      <div className={`fixed inset-0 pointer-events-none z-[-1] bg-gradient-to-br opacity-50 transition-colors duration-1000 ${theme === 'dark' ? 'from-slate-900 via-purple-900/10 to-slate-900' : 'from-indigo-50/50 via-white to-purple-50/50'}`}></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl z-50 border-b border-white/20 dark:border-white/5 px-6 py-4 transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            {view === 'lesson' && (
              <button 
                onClick={() => setView('dashboard')}
                className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-transform hover:-translate-x-1"
                aria-label="Back to Dashboard"
              >
                <ArrowLeft size={24} />
              </button>
            )}
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 transition-all active:scale-95 lg:hidden"
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>

            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setView('dashboard')}>
              <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/30 transform transition-transform group-hover:rotate-12 group-hover:scale-110">
                I7
              </div>
              <span className="font-heading font-bold text-gray-800 dark:text-white hidden sm:block tracking-tight text-xl group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">IELTS Mastery</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-white/50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 hover:scale-110 transition-all shadow-sm backdrop-blur-sm group"
            >
              {theme === 'light' ? <Moon size={20} className="text-slate-600 group-hover:text-indigo-600" /> : <Sun size={20} className="text-yellow-400 group-hover:rotate-90 transition-transform" />}
            </button>

            <div className="hidden md:flex flex-col items-end">
               <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">Rank Progress</span>
               <div className="w-32 h-1.5 bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden mt-1 shadow-inner">
                 <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse-glow" style={{ width: `${Math.min(state.xp / 10, 100)}%`, transition: 'width 1s ease-out' }}></div>
               </div>
            </div>
            
            <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 px-4 py-2 rounded-full border border-gray-100 dark:border-slate-700 shadow-sm backdrop-blur-sm group cursor-default hover:scale-105 transition-transform hover:shadow-md">
               <Star className="text-yellow-400 fill-current group-hover:rotate-180 transition-transform duration-700 filter drop-shadow-sm" size={20} />
               <span className="font-bold text-indigo-900 dark:text-indigo-200 text-base">{state.xp} XP</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Side Menu (Mobile) */}
      {isMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in" onClick={() => setIsMenuOpen(false)} />
          <div className="fixed top-[85px] left-4 bottom-4 w-80 bg-white/95 dark:bg-slate-900/95 shadow-2xl z-40 overflow-y-auto rounded-3xl border border-white/20 dark:border-slate-800 animate-slide-in-right p-2">
             <div className="p-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 px-2">Modules</h3>
                <div className="space-y-2">
                  {lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => handleStartLesson(lesson.id as LessonId)}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all group"
                    >
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md ${lesson.color} group-hover:scale-110 transition-transform`}>
                          {lesson.icon}
                       </div>
                       <div className="text-left">
                          <span className="block font-bold text-sm text-slate-800 dark:text-slate-200">{lesson.title}</span>
                       </div>
                    </button>
                  ))}
                </div>
             </div>
          </div>
        </>
      )}

      <main className="max-w-7xl mx-auto px-4 md:px-6 pt-32 pb-20 relative z-10">
        
        {/* VIEW: DASHBOARD */}
        {view === 'dashboard' && (
          <div className="animate-fade-in-up">
            {/* Hero Section */}
            <div className="mb-20 text-center space-y-8 relative">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50/80 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 font-bold text-xs uppercase tracking-widest border border-indigo-100 dark:border-indigo-500/30 backdrop-blur-sm animate-pop-in">
                 <Zap size={14} className="fill-current"/> Interactive Learning v2.0
               </div>
               <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-white mb-4 leading-tight">
                 Master IELTS<br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 dark:from-indigo-400 dark:via-purple-400 dark:to-indigo-400 bg-[length:200%_auto] animate-float">Data Response</span>
               </h1>
               <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
                 Dive into 3D visualizations, interactive quizzes, and gamified progress tracking.
               </p>
               
               {state.xp > 0 && (
                 <div className="animate-slide-in-left inline-block mt-4 px-6 py-2 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full font-medium text-sm border border-green-200 dark:border-green-800">
                    Welcome back! You're on a roll. 🚀
                 </div>
               )}
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
              {[
                { label: 'Total XP', value: state.xp, sub: 'Points earned', icon: <Activity size={24}/>, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30' },
                { label: 'Mastery', value: `${Math.round((state.completedSections.length / 12) * 100)}%`, sub: 'Course completion', icon: <Trophy size={24}/>, color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900/30' },
                { label: 'Current Rank', value: 'Analyst', sub: 'Keep learning', icon: <BookOpen size={24}/>, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' }
              ].map((stat, i) => (
                <div key={i} className={`glass-panel p-8 rounded-3xl shadow-xl hover:translate-y-[-5px] transition-all duration-300 stagger-${i+1} animate-fade-in-up hover:shadow-2xl group`}>
                   <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                        {stat.icon}
                      </div>
                      <h3 className="font-bold text-lg text-slate-700 dark:text-slate-200">{stat.label}</h3>
                   </div>
                   <p className="text-4xl font-black text-slate-900 dark:text-white mb-2">{stat.value}</p>
                   <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">{stat.sub}</p>
                </div>
              ))}
            </div>

            {/* Module Grid */}
            <h3 className="text-2xl font-bold mb-8 px-2 text-slate-800 dark:text-white flex items-center gap-3">
              <div className="w-2 h-8 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div> Available Modules
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {lessons.map((lesson, idx) => (
                <div 
                  key={lesson.id}
                  onClick={() => handleStartLesson(lesson.id as LessonId)}
                  className="group relative bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 cursor-pointer overflow-hidden border border-gray-100 dark:border-slate-700 animate-fade-in-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Background decoration */}
                  <div className={`absolute -top-10 -right-10 w-40 h-40 ${lesson.color} opacity-5 rounded-full transition-all group-hover:scale-150 group-hover:opacity-10 blur-3xl`}></div>
                  
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className={`w-16 h-16 rounded-2xl ${lesson.color} flex items-center justify-center text-white shadow-lg ${lesson.shadow} transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-300`}>
                      {lesson.icon}
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-gray-100 dark:border-slate-700 flex items-center justify-center group-hover:border-indigo-500 transition-colors">
                      <ChevronRight size={16} className="text-gray-300 group-hover:text-indigo-500 transition-colors" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{lesson.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">{lesson.subtitle}</p>
                  
                  <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-700/50 flex items-center justify-between">
                     <span className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-indigo-500 transition-colors">Start Now</span>
                     <div className="w-20 h-1.5 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className={`h-full ${lesson.color} w-0 group-hover:w-full transition-all duration-700 ease-out`}></div>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: LESSON */}
        {view === 'lesson' && (
          <div key={activeLesson} className="animate-fade-in-up">
            {activeLesson === 'flight' && <LessonFlight onAddXp={addXp} />}
            {activeLesson === 'housing' && <LessonHousing onAddXp={addXp} />}
            {activeLesson === 'transport' && <LessonTransport onAddXp={addXp} />}
            {activeLesson === 'coffee' && <LessonCoffee onAddXp={addXp} />}
            {activeLesson === 'degradation' && <LessonDegradation onAddXp={addXp} />}
            {activeLesson === 'maps' && <LessonMaps onAddXp={addXp} />}
          </div>
        )}

      </main>
    </div>
  );
};

export default App;