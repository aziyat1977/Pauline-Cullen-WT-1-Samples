import React, { useEffect } from 'react';
import { ArrowUp, BookOpen, Quote, X } from 'lucide-react';
import { ZenBarChart, ZenHousingChart, ConceptNode, ReflectionPrompt } from './ZenComponents';
import { VOCAB_LIST, HOUSING_VOCAB_LIST, TRANSPORT_VOCAB_LIST, MAP_VOCAB_LIST } from '../../constants';

interface DeepDiveLessonProps {
  moduleId: string;
  onBack: () => void;
}

const DeepDiveLesson: React.FC<DeepDiveLessonProps> = ({ moduleId, onBack }) => {
  
  // Scroll to top on mount
  useEffect(() => {
      window.scrollTo(0,0);
  }, []);

  const getContent = () => {
      switch(moduleId) {
          case 'flight':
              return {
                  title: "Duration Analysis",
                  subtitle: "The relationship between conditions and outcomes.",
                  vocab: VOCAB_LIST,
                  chart: <ZenBarChart />,
                  insight: "In static data analysis, look for the 'Inverse Trend'. As one variable (candles) increases, the dependent variable (time) decreases. This is a systemic pattern, not a random fluctuation."
              };
          case 'housing':
              return {
                  title: "Temporal Shifts",
                  subtitle: "Tracking long-term societal changes.",
                  vocab: HOUSING_VOCAB_LIST,
                  chart: <ZenHousingChart />,
                  insight: "The crucial moment isn't the start or end, but the intersection. When two lines cross, it signifies a paradigm shift in the data—a reversal of the status quo."
              };
          default: 
              return {
                  title: "Data Analysis",
                  subtitle: "Pattern recognition protocols.",
                  vocab: TRANSPORT_VOCAB_LIST,
                  chart: <div className="h-40 flex items-center justify-center border border-dashed border-[#44403c] text-[#57534e] font-mono">DATA VISUALIZATION UNAVAILABLE</div>,
                  insight: "Focus on the extremes. The highest value and the lowest value often tell 80% of the story."
              }
      }
  }

  const content = getContent();

  return (
    <div className="min-h-screen bg-[#1c1917] text-[#a8a29e] pb-32 animate-fade-in-up">
        {/* Progress Line (Left) */}
        <div className="fixed left-6 top-0 bottom-0 w-px bg-[#292524] hidden md:block"></div>

        <div className="max-w-3xl mx-auto px-6 md:pl-20 py-20">
            {/* Nav */}
            <button onClick={onBack} className="fixed top-8 right-8 p-3 bg-[#292524] rounded-full text-[#78716c] hover:text-white hover:bg-[#44403c] transition-all z-50">
                <X size={20} />
            </button>

            {/* Part 1: Immersion */}
            <section className="mb-24">
                <span className="font-mono text-[10px] text-[#57534e] uppercase tracking-[0.2em] mb-4 block">File: {moduleId.toUpperCase()}</span>
                <h1 className="text-4xl md:text-6xl font-serif text-[#e7e5e4] mb-6 leading-tight">
                    {content.title}
                </h1>
                <p className="text-xl font-light text-[#78716c] border-l border-[#44403c] pl-6">
                    {content.subtitle}
                </p>
            </section>

            {/* Part 2: Observation (The Chart) */}
            <section className="mb-24">
                <h2 className="text-sm font-bold text-[#d6d3d1] uppercase tracking-widest mb-8 flex items-center gap-2">
                    <BookOpen size={14} /> Observation
                </h2>
                <div className="bg-[#0c0c0e] p-8 rounded-sm shadow-2xl border border-[#292524]">
                    {content.chart}
                    <div className="mt-6 text-xs font-mono text-[#44403c] leading-relaxed">
                        FIG 1.1 - RAW DATA VISUALIZATION. <br/>
                        NOTE THE VARIANCE BETWEEN CATEGORIES.
                    </div>
                </div>
            </section>

            {/* Part 3: Deep Processing (Reading) */}
            <section className="mb-24">
                 <h2 className="text-sm font-bold text-[#d6d3d1] uppercase tracking-widest mb-8">
                     Core Insight
                </h2>
                <div className="prose prose-invert prose-lg">
                    <p className="text-[#a8a29e] leading-loose font-light">
                        {content.insight}
                    </p>
                    <p className="text-[#a8a29e] leading-loose font-light mt-4">
                        When writing a report, avoid "listing" (writing numbers mechanically). Instead, engage in "synthesizing". Group the data by behavior. Which items behave similarly? Which is the outlier? This creates a narrative structure that is easier to follow.
                    </p>
                </div>
            </section>

            {/* Part 4: The Lexicon (Vocab) */}
            <section className="mb-24">
                 <h2 className="text-sm font-bold text-[#d6d3d1] uppercase tracking-widest mb-8">
                     The Lexicon
                </h2>
                <div className="space-y-6">
                    {content.vocab.slice(0, 5).map((item, i) => (
                        <ConceptNode key={i} {...item} />
                    ))}
                </div>
            </section>

            {/* Part 5: Reflection (No Quiz) */}
            <section className="mb-24">
                <ReflectionPrompt question="If you had to describe the main trend of this chart to someone without showing them the image, what single sentence would you use?" />
            </section>

            {/* Footer */}
            <div className="text-center pt-12 border-t border-[#292524]">
                <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-[#44403c] hover:text-[#78716c] transition-colors flex flex-col items-center gap-2 mx-auto">
                    <ArrowUp size={16} />
                    <span className="text-[10px] font-mono uppercase">Return to Top</span>
                </button>
            </div>
        </div>
    </div>
  );
};

export default DeepDiveLesson;