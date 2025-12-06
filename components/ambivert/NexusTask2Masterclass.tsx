
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ArrowRight, Zap, BookOpen, AlertTriangle, ShieldCheck, 
  PenTool, CheckCircle2, X, Eye, 
  RefreshCcw, Grid, ChevronRight, TrendingUp, Search, 
  Clock, Trophy, ArrowUp, Factory, 
  Keyboard, Layers, Hash, Check,
  Database, FileText, Edit3, FastForward, Scale, Brain, Lightbulb, Link, Activity,
  AlertOctagon, HelpCircle, ArrowDown
} from 'lucide-react';
import Confetti from '../ui/Confetti';

interface NexusTask2MasterclassProps { onBack: () => void; }

const NexusTask2Masterclass: React.FC<NexusTask2MasterclassProps> = ({ onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [confetti, setConfetti] = useState(false);

  const slides = [
    { title: "Logic Protocol", content: <div className="text-center"><h2 className="text-4xl font-bold text-white mb-4">Task 2 Logic</h2><p className="text-slate-400">Argument construction is key.</p></div> },
    { title: "Planning", content: <div className="text-center"><h2 className="text-3xl text-white mb-4">The Planning Phase</h2><p className="text-slate-400">Never skip planning.</p></div> },
    { title: "Complete", content: <div className="text-center"><h2 className="text-4xl font-bold text-white mb-4">Module Complete</h2><button onClick={() => setConfetti(true)} className="px-6 py-2 bg-emerald-600 text-white rounded-full">Finish</button></div> }
  ];

  const handleNext = () => {
      if (currentSlide < slides.length - 1) setCurrentSlide(prev => prev + 1);
  };

  const handlePrev = () => {
      if (currentSlide > 0) setCurrentSlide(prev => prev - 1);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans flex flex-col">
        {confetti && <Confetti active={true} />}
        
        <header className="p-4 border-b border-slate-800 flex justify-between items-center">
            <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white">
                <ArrowLeft size={20} /> Back
            </button>
            <div className="text-white font-bold">Task 2 Masterclass</div>
        </header>

        <main className="flex-1 flex flex-col justify-center items-center p-8">
            <div className="max-w-4xl w-full bg-slate-900 p-12 rounded-3xl border border-slate-800 shadow-2xl">
                {slides[currentSlide].content}
            </div>
        </main>

        <footer className="p-4 border-t border-slate-800 flex justify-between">
            <button onClick={handlePrev} disabled={currentSlide === 0} className="px-6 py-2 bg-slate-800 rounded text-white disabled:opacity-50">Previous</button>
            <button onClick={handleNext} disabled={currentSlide === slides.length - 1} className="px-6 py-2 bg-indigo-600 rounded text-white disabled:opacity-50">Next</button>
        </footer>
    </div>
  );
};

export default NexusTask2Masterclass;
