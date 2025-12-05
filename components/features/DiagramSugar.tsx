
import React, { useState } from 'react';
import { ArrowDown, RefreshCcw } from 'lucide-react';
import { SUGAR_STEPS } from '../../constants';

const DiagramSugar: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 relative">
       <h3 className="text-center font-black text-xl text-slate-800 mb-8">Sugar Manufacturing Process</h3>
       
       <div className="relative max-w-md mx-auto">
           {/* Connecting Line */}
           <div className="absolute left-1/2 top-4 bottom-4 w-1 bg-slate-100 -translate-x-1/2 z-0"></div>

           <div className="space-y-6 relative z-10">
               {SUGAR_STEPS.map((step, i) => (
                   <div 
                      key={i}
                      className={`relative flex items-center gap-4 group cursor-pointer transition-all duration-300 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                      onMouseEnter={() => setActiveStep(i)}
                      onMouseLeave={() => setActiveStep(null)}
                   >
                       {/* Node */}
                       <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg border-4 transition-all duration-300 ${activeStep === i ? 'bg-amber-500 border-amber-200 text-white scale-110' : 'bg-white border-slate-100 text-slate-300'}`}>
                           {step.step}
                       </div>
                       
                       {/* Label Card */}
                       <div className={`flex-1 p-4 rounded-xl border-2 transition-all duration-300 ${activeStep === i ? 'bg-amber-50 border-amber-200 shadow-md -translate-y-1' : 'bg-white border-slate-50'}`}>
                           <h4 className={`font-bold text-sm ${activeStep === i ? 'text-amber-800' : 'text-slate-500'}`}>{step.label}</h4>
                           <p className="text-xs text-slate-400">{step.desc}</p>
                       </div>
                   </div>
               ))}
           </div>

           {/* Cyclic Indicator */}
           <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-slate-300 animate-spin-slow">
               <RefreshCcw size={24} />
           </div>
       </div>
    </div>
  );
};

export default DiagramSugar;
