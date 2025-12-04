import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';

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
    // Reset any internal scroll
    const el = document.getElementById('step-content');
    if (el) el.scrollTop = 0;
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
    <div className="h-full flex flex-col relative w-full overflow-hidden">
      {/* Glowing Progress Line - Absolute Top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 dark:bg-gray-800 z-30">
        <div 
          className={`h-full transition-all duration-700 ease-out ${getColorClass('bg')} shadow-[0_0_10px_currentColor] relative overflow-hidden`}
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        >
            <div className="absolute inset-0 bg-white/30 animate-[slide-in-right_1s_infinite]"></div>
        </div>
      </div>

      {/* Step Indicator Header */}
      <div className="shrink-0 flex justify-center py-4 z-20">
         <div className="flex items-center gap-2 bg-white/50 dark:bg-black/20 px-3 py-1 rounded-full backdrop-blur-md border border-white/20 shadow-sm animate-fade-in-up">
            <div className={`w-1.5 h-1.5 rounded-full ${getColorClass('bg')} animate-pulse`}></div>
            <span className="text-gray-500 dark:text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em] font-heading">
                Step {currentStep + 1} of {steps.length}
            </span>
         </div>
      </div>

      {/* Content Area - Filling available space */}
      <div 
        id="step-content"
        className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col justify-center items-center w-full px-4 relative z-10"
      >
        <div 
           key={currentStep} 
           className={`w-full max-w-7xl mx-auto flex flex-col items-center justify-center transition-all duration-300 ease-in-out py-2 ${animating ? 'opacity-0 translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100 animate-fade-in-up'}`}
        >
          {steps[currentStep].content}
        </div>
      </div>

      {/* Navigation Footer - Fixed/Shrink at bottom */}
      <div className="shrink-0 p-4 pb-6 flex justify-center z-40 bg-transparent">
        <div className="w-full max-w-lg">
             <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-2 rounded-2xl shadow-xl border border-white/20 dark:border-slate-700 flex justify-between items-center gap-3 transition-all hover:shadow-2xl">
                
                <button
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className={`
                    w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
                    ${currentStep === 0 
                        ? 'opacity-20 cursor-not-allowed bg-gray-100 dark:bg-slate-800 text-gray-400' 
                        : 'bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-white shadow-sm hover:shadow-md active:scale-95'}
                    `}
                >
                    <ArrowLeft size={20} />
                </button>

                <div className="flex-grow flex flex-col items-center justify-center hidden sm:flex">
                     <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Current Task</span>
                     <span className="text-xs font-bold text-gray-800 dark:text-white truncate max-w-[150px]">{steps[currentStep].title}</span>
                </div>

                <button
                    onClick={handleNext}
                    className={`
                    flex-grow sm:flex-grow-0 group flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all duration-300 active:scale-95
                    ${currentStep === steps.length - 1 
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-slate-900/20' 
                        : `${getColorClass('bg')} text-white ${getColorClass('shadow')} hover:brightness-110`}
                    `}
                >
                    <span>{currentStep === steps.length - 1 ? 'Finish' : 'Next'}</span>
                    <div className={`
                    p-0.5 rounded-full bg-white/20 transition-transform group-hover:translate-x-1
                    `}>
                    {currentStep === steps.length - 1 ? <CheckCircle size={16} /> : <ArrowRight size={16} />}
                    </div>
                </button>

             </div>
        </div>
      </div>
    </div>
  );
};

export default LessonStepper;