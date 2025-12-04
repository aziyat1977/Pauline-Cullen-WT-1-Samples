
import React, { useState } from 'react';
import { ArrowLeft, BrainCircuit, Database, Layers, Network, BookOpen, Fingerprint, Menu } from 'lucide-react';
import DeepDiveLesson from './DeepDiveLesson';

interface SanctuaryProps {
  onExit: () => void;
  onOpenMenu?: () => void;
}

const Sanctuary: React.FC<SanctuaryProps> = ({ onExit, onOpenMenu }) => {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  // Introvert-optimized Module List
  // Focus: Mastery, Autonomy, Depth
  const deepModules = [
    { 
        id: 'flight', 
        title: 'Bar Chart Dynamics', 
        desc: 'Analyzing inverse relationships and peak values in flight data.',
        icon: <Database size={18} />
    },
    { 
        id: 'housing', 
        title: 'Temporal Shifts', 
        desc: 'Understanding intersection points in longitudinal data.',
        icon: <Layers size={18} />
    },
    { 
        id: 'transport', 
        title: 'Comparative Analysis', 
        desc: 'Deconstructing magnitude differences across transport modes.',
        icon: <Network size={18} />
    },
    { 
        id: 'maps', 
        title: 'Spatial Transformation', 
        desc: 'Mapping the evolution of infrastructure over time.',
        icon: <Fingerprint size={18} />
    }
  ];

  if (activeModule) {
      return (
          <DeepDiveLesson 
            moduleId={activeModule} 
            onBack={() => setActiveModule(null)} 
          />
      );
  }

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-[#a8a29e] font-sans selection:bg-[#3f3f46] selection:text-white">
        {/* Ambient Neural Background */}
        <div className="fixed inset-0 opacity-10 pointer-events-none" 
             style={{ 
                 backgroundImage: 'radial-gradient(circle at 50% 50%, #292524 1px, transparent 1px)', 
                 backgroundSize: '40px 40px' 
             }}>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
            {/* Header */}
            <header className="mb-20 flex justify-between items-start">
                <div className="flex items-center gap-6">
                    {onOpenMenu && (
                        <button 
                            onClick={onOpenMenu}
                            className="text-[#57534e] hover:text-[#d6d3d1] transition-colors p-2 -ml-2 rounded-lg hover:bg-[#292524]"
                            title="Open Menu"
                        >
                            <Menu size={20} />
                        </button>
                    )}
                    <button 
                        onClick={onExit}
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#57534e] hover:text-[#d6d3d1] transition-colors group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Return to Surface
                    </button>
                </div>
                <div className="flex items-center gap-3 text-[#1c1917] bg-[#44403c] px-4 py-1.5 rounded-full">
                     <BrainCircuit size={16} className="text-[#a8a29e]" />
                     <span className="text-[10px] font-bold text-[#d6d3d1] tracking-[0.2em] uppercase">Deep Focus Protocol</span>
                </div>
            </header>

            {/* Manifesto */}
            <section className="mb-24 space-y-6 animate-fade-in-up">
                <h1 className="text-4xl md:text-5xl font-serif text-[#e7e5e4] tracking-tight leading-tight">
                    The Archive.
                </h1>
                <p className="text-lg md:text-xl font-light leading-relaxed max-w-2xl text-[#78716c]">
                    Welcome to a space designed for <span className="text-[#d6d3d1] font-medium border-b border-[#44403c]">retention</span>, not reaction. 
                    Here, there are no timers, no leaderboards, and no noise. 
                    Just data, patterns, and the silence required to master them.
                </p>
            </section>

            {/* Module Grid - Minimalist */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#292524] border border-[#292524] rounded-lg overflow-hidden shadow-2xl">
                {deepModules.map((mod, idx) => (
                    <button 
                        key={mod.id}
                        onClick={() => setActiveModule(mod.id)}
                        className="bg-[#1c1917] p-8 text-left hover:bg-[#27272a] transition-colors duration-500 group relative"
                    >
                        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-[#57534e]">
                            <ArrowLeft size={20} className="rotate-180" />
                        </div>

                        <div className="w-10 h-10 mb-6 rounded-full bg-[#292524] flex items-center justify-center text-[#78716c] group-hover:text-[#e7e5e4] transition-colors">
                            {mod.icon}
                        </div>
                        
                        <div className="space-y-2">
                            <span className="text-[10px] font-mono text-[#57534e] uppercase">File 0{idx + 1}</span>
                            <h3 className="text-xl font-medium text-[#d6d3d1] group-hover:text-white transition-colors font-serif">{mod.title}</h3>
                            <p className="text-sm text-[#78716c] leading-relaxed pr-4">{mod.desc}</p>
                        </div>
                    </button>
                ))}
            </section>
            
            <footer className="mt-24 text-center">
                <p className="text-[10px] text-[#44403c] font-mono">
                    NEURAL PATHWAY OPTIMIZATION: ACTIVE
                </p>
            </footer>
        </div>
    </div>
  );
};

export default Sanctuary;
