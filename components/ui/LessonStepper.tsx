import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, Zap } from 'lucide-react';

interface Step {
  title: string;
  content: React.ReactNode;
}

interface LessonStepperProps {
  steps: Step[];
  onComplete?: () => void;
  colorTheme?: string;
}

const LessonStepper: React.FC<LessonStepperProps> = ({ steps, onComplete, colorTheme = 'indigo' }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleNext = () => {
    if (animating) return;
    if (currentStep < steps.length - 1) {
      setAnimating(true);
      setTimeout(() => {
          setCurrentStep(prev => prev + 1);
          setAnimating(false);
      }, 300); // Wait for exit animation
    } else {
      if (onComplete) onComplete();
    }
  };

  const handlePrev = () => {
    if (animating) return;
    if (currentStep > 0) {
      setAnimating(true);
      setTimeout(() => {
          setCurrentStep(prev => prev - 1);
          setAnimating(false);
      }, 300);
    }
  };

  const getColorClass = (type: 'bg' | 'text' | 'border' | 'shadow' | 'ring') => {
    const map: Record<string, string> = {
      'bg-indigo': 'bg-indigo-600', 'text-indigo': 'text-indigo-600', 'border-indigo': 'border-indigo-600', 'shadow-indigo': 'shadow-indigo-500/40', 'ring-indigo': 'ring-indigo-200',
      'bg-emerald': 'bg-emerald-600', 'text-emerald': 'text-emerald-600', 'border-emerald': 'border-emerald-600', 'shadow-emerald': 'shadow-emerald-500/40', 'ring-emerald': 'ring-emerald-200',
      'bg-amber': 'bg-amber-600', 'text-amber': 'text-amber-600', 'border-amber': 'border-amber-600', 'shadow-amber': 'shadow-amber-500/40', 'ring-amber': 'ring-amber-200',
      'bg-blue': 'bg-blue-600', 'text-blue': 'text-blue-600', 'border-blue': 'border-blue-600', 'shadow-blue': 'shadow-blue-500/40', 'ring-blue': 'ring-blue-200',
      'bg-purple': 'bg-purple-600', 'text-purple': 'text-purple-600', 'border-purple': 'border-purple-600', 'shadow-purple': 'shadow-purple-500/40', 'ring-purple': 'ring-purple-200',
    };
    const key = `${type}-${colorTheme}`;
    return map[key] || map[`${type}-indigo`];
  };

  return (
    <div className="min-h-[85vh] flex flex-col relative pb-40">
      {/* Glowing Progress Line */}
      <div className="fixed top-[85px] left-0 right-0 h-1.5 bg-gray-100 dark:bg-gray-800 z-30">
        <div 
          className={`h-full transition-all duration-700 ease-out ${getColorClass('bg')} shadow-[0_0_15px_currentColor] relative overflow-hidden`}
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        >
            <div className="absolute inset-0 bg-white/30 animate-[slide-in-right_1s_infinite]"></div>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex justify-center mt-8 mb-4">
         <div className="flex items-center gap-2 bg-white/50 dark:bg-black/20 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/20 shadow-sm animate-fade-in-up">
            <div className={`w-2 h-2 rounded-full ${getColorClass('bg')} animate-pulse`}></div>
            <span className="text-gray-500 dark:text-gray-400 font-bold text-xs uppercase tracking-[0.2em] font-heading">
                Step {currentStep + 1} of {steps.length}
            </span>
         </div>
      </div>

      {/* Content Area - Animated Transition */}
      <div 
        key={currentStep} 
        className={`flex-grow flex flex-col justify-center px-4 md:px-0 transition-all duration-300 ease-in-out ${animating ? 'opacity-0 translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100 animate-fade-in-up'}`}
      >
        {steps[currentStep].content}
      </div>

      {/* Navigation Footer - Floating Island Design */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-6 pointer-events-none flex justify-center">
        <div className="w-full max-w-2xl pointer-events-auto">
             <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-3 rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700 flex justify-between items-center gap-4 transition-all hover:scale-[1.01] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)]">
                
                <button
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className={`
                    w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300
                    ${currentStep === 0 
                        ? 'opacity-20 cursor-not-allowed bg-gray-100 dark:bg-slate-800 text-gray-400' 
                        : 'bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-white shadow-sm hover:shadow-md active:scale-95'}
                    `}
                >
                    <ArrowLeft size={24} />
                </button>

                <div className="flex-grow flex flex-col items-center justify-center hidden sm:flex">
                     <span className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Current Task</span>
                     <span className="text-sm font-bold text-gray-800 dark:text-white truncate max-w-[200px]">{steps[currentStep].title}</span>
                </div>

                <button
                    onClick={handleNext}
                    className={`
                    flex-grow sm:flex-grow-0 group flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 active:scale-95
                    ${currentStep === steps.length - 1 
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-slate-900/20' 
                        : `${getColorClass('bg')} text-white ${getColorClass('shadow')} hover:brightness-110`}
                    `}
                >
                    <span>{currentStep === steps.length - 1 ? 'Finish' : 'Next'}</span>
                    <div className={`
                    p-1 rounded-full bg-white/20 transition-transform group-hover:translate-x-1
                    `}>
                    {currentStep === steps.length - 1 ? <CheckCircle size={20} /> : <ArrowRight size={20} />}
                    </div>
                </button>

             </div>
        </div>
      </div>
    </div>
  );
};

export default LessonStepper;