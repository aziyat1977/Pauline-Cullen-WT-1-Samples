
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Eye, Target, CheckCircle2, ChevronRight, 
  BarChart2, Map, RefreshCcw, PieChart, Layers, 
  Calendar, Zap, Activity, Globe, Database, ListChecks,
  AlertTriangle, Brain, Check, X as XIcon, HelpCircle
} from 'lucide-react';

interface DrillItem {
  q: string;
  a: string;
  hint?: string;
}

interface VisualSection {
  id: number;
  title: string;
  context: string;
  icon: React.ReactNode;
  introDrills: DrillItem[];
  overviewDrills: DrillItem[];
}

interface TestQuestion {
  id: number;
  q: string;
  options: string[];
  correct: number;
}

const VISUAL_DATA: VisualSection[] = [
  {
    id: 1,
    title: "Line Graph",
    context: "Consumption of Spreads (Butter, Margarine, Low-fat) | 1981–2007",
    icon: <Activity size={24} />,
    introDrills: [
      { q: "Synonym Match: Replace 'shows' and 'consumption'.", a: "Shows: Illustrates / Depicts. Consumption: Intake / Amount consumed." },
      { q: "Grammar: 'The graph (compare/compares) the quantity...'", a: "Compares (Singular subject)." },
      { q: "Prepositions: 'Changes ___ consumption ___ 1981 ___ 2007.'", a: "in ... from ... to" },
      { q: "Rewrite using 'how much'.", a: "The graph illustrates how much butter, margarine, and low-fat spreads were consumed..." },
      { q: "Correct the error: 'The line graph display the eating of...'", a: "The line graph displays the consumption of..." }
    ],
    overviewDrills: [
      { q: "Trend Spotting: Butter went down. Low-fat went up. Margarine?", a: "Margarine likely fluctuated or had a less dramatic trend." },
      { q: "Complete: 'Overall, butter consumption declined, _____ low-fat spreads rose.'", a: "whereas / while" },
      { q: "True or False: Mention butter fell to 50g in the overview.", a: "FALSE. No specific numbers in the overview." }
    ]
  },
  {
    id: 2,
    title: "Bar Chart",
    context: "Sport Participation (Men vs. Women) | 2015",
    icon: <BarChart2 size={24} />,
    introDrills: [
      { q: "Paraphrase 'Men and women'.", a: "Males and females / The two genders." },
      { q: "Unscramble: participation rates / The bar chart / of / depicts / in five sports / males and females.", a: "The bar chart depicts participation rates of males and females in five sports." },
      { q: "Tense Check (2015): 'The chart (show) that men (participate)...'", a: "The chart SHOWS (Present) that men PARTICIPATED (Past)." }
    ],
    overviewDrills: [
      { q: "What should you identify first?", a: "The sport with the highest participation overall." },
      { q: "Complete: 'Overall, men participated more in _____, whereas women preferred _____.'", a: "(Identify the dominant categories for each gender)." }
    ]
  },
  {
    id: 3,
    title: "Table",
    context: "Underground Railways (City, Date Opened, Length, Passengers)",
    icon: <Database size={24} />,
    introDrills: [
      { q: "Summarize columns (Date, Length, Passengers) into a noun phrase.", a: "Data regarding the age, size, and passenger capacity..." },
      { q: "Why is 'The chart shows...' wrong?", a: "Because it is a TABLE, not a chart." },
      { q: "Paraphrase: 'gives information about'.", a: "Provides data on / Highlights details concerning." }
    ],
    overviewDrills: [
      { q: "Superlatives: What three things must you identify?", a: "The Oldest, the Longest, and the Busiest systems." },
      { q: "Compare London (Oldest) and Tokyo (Busiest).", a: "'While the London Underground is the oldest system, the Tokyo system serves the highest number of passengers.'" }
    ]
  },
  {
    id: 4,
    title: "Pie Chart",
    context: "Electricity Production (France vs. Germany) | 2009",
    icon: <PieChart size={24} />,
    introDrills: [
      { q: "Two charts provided. 'The pie chart...' or 'The pie charts...'?", a: "The pie charts (Plural)." },
      { q: "Paraphrase 'Electricity Production'.", a: "Electricity generation / Energy output." }
    ],
    overviewDrills: [
      { q: "France is 70% Nuclear, Germany is 20%. What is the Main Feature?", a: "France's heavy reliance on Nuclear power compared to Germany." },
      { q: "Complete: 'France relies heavily on one source, while Germany has a _____ mix.'", a: "diverse / balanced" }
    ]
  },
  {
    id: 5,
    title: "Process (Man-Made)",
    context: "Recycling Glass Bottles",
    icon: <RefreshCcw size={24} />,
    introDrills: [
      { q: "Instead of 'shows changes', use this verb phrase:", a: "Illustrates the process of... / Demonstrates how..." },
      { q: "Passive Voice: 'They collect the bottles.'", a: "The bottles ARE COLLECTED." }
    ],
    overviewDrills: [
      { q: "What should you count for the overview?", a: "The total number of stages/steps." },
      { q: "Is recycling usually Linear or Cyclical?", a: "Cyclical (it loops back)." }
    ]
  },
  {
    id: 6,
    title: "Map (Spatial)",
    context: "Stokeford Village (1930 vs 2010)",
    icon: <Map size={24} />,
    introDrills: [
      { q: "Paraphrase '1930 and 2010'.", a: "Over an 80-year period / Between 1930 and 2010." },
      { q: "Noun phrase: 'The maps illustrate the _____ of Stokeford.'", a: "development / transformation / urbanization" }
    ],
    overviewDrills: [
      { q: "Identify the main vibe change (e.g., Rural to...?)", a: "Rural to Residential / Urban." },
      { q: "Complete: 'The village transformed from a rural area into a _____.'", a: "modern residential suburb / town." }
    ]
  },
  {
    id: 7,
    title: "Mixed Charts",
    context: "Reasons for Travel (Bar) + Transport Mode (Pie)",
    icon: <Layers size={24} />,
    introDrills: [
      { q: "True or False: Write two separate introductions.", a: "FALSE. Combine them into one single paragraph." },
      { q: "Paraphrase 'Reasons for travel'.", a: "Purposes of travel / Why people travel." }
    ],
    overviewDrills: [
      { q: "Structure of overview for mixed charts?", a: "Identify trend of Chart 1 + Connector ('while') + Trend of Chart 2." }
    ]
  },
  {
    id: 8,
    title: "Life Cycle",
    context: "Life Cycle of the Silkworm",
    icon: <Globe size={24} />,
    introDrills: [
      { q: "Active or Passive voice for the animal? ('The larva eats')", a: "ACTIVE VOICE. (Passive is for man-made)." },
      { q: "Paraphrase 'Stages of life'.", a: "Developmental stages / Life cycle." }
    ],
    overviewDrills: [
      { q: "Complete: 'The process lasts for approximately [Time] and consists of...'", a: "...[Number] main stages." },
      { q: "How does the cycle end/begin?", a: "It is circular; the adult lays eggs to begin anew." }
    ]
  },
  {
    id: 9,
    title: "Stacked Bar",
    context: "Olympic Medals by Country",
    icon: <BarChart2 size={24} className="rotate-90" />,
    introDrills: [
      { q: "How do you describe the 'stacks'?", a: "...broken down by medal type." },
      { q: "Paraphrase 'Medal counts'.", a: "Total number of medals won / Medal tally." }
    ],
    overviewDrills: [
      { q: "First thing to look for?", a: "The TOTAL height of the bars (Overall winner)." },
      { q: "Complete: 'Overall, Country A _____ the event.'", a: "dominated / led" }
    ]
  },
  {
    id: 10,
    title: "Future",
    context: "Population Projections (2000-2050)",
    icon: <Calendar size={24} />,
    introDrills: [
      { q: "Use a verb for the future: 'The graph shows current data and _____ future trends.'", a: "projects / forecasts / predicts" },
      { q: "Paraphrase 'Predictions'.", a: "Forecasts / Estimates / Projections." }
    ],
    overviewDrills: [
      { q: "What is the 'Crossover' point?", a: "The year when India overtakes China." },
      { q: "Vocab: 'India is expected to continue its _____ trajectory.'", a: "upward" }
    ]
  }
];

const PRECISION_TEST_DATA: TestQuestion[] = [
  {
    id: 1,
    q: "What is the primary function of the Introduction in Task 1?",
    options: [
      "To express your personal opinion on the data",
      "To list every single country and percentage",
      "To paraphrase the question (What, Where, When)",
      "To explain the reasons why the changes occurred"
    ],
    correct: 2
  },
  {
    id: 2,
    q: "Which element must NEVER appear in the Overview paragraph?",
    options: [
      "General trends",
      "Specific data points (numbers)",
      "Comparisons between categories",
      "The word 'Overall'"
    ],
    correct: 1
  },
  {
    id: 3,
    q: "Select the best synonym for 'shows' in an introduction.",
    options: [
      "Speaks about",
      "Illustrates",
      "Explains",
      "Tells us"
    ],
    correct: 1
  },
  {
    id: 4,
    q: "Identify the correct preposition: 'Sales increased ___ 20%.' (indicating the margin of change, not the end point).",
    options: [
      "at",
      "to",
      "by",
      "of"
    ],
    correct: 2
  },
  {
    id: 5,
    q: "Which sentence correctly uses the Passive Voice for a Process diagram?",
    options: [
      "The machine crushes the glass.",
      "The glass crushes in the machine.",
      "The glass is crushed by the machine.",
      "The machine is crushing the glass."
    ],
    correct: 2
  },
  {
    id: 6,
    q: "When describing a Map, how should you refer to locations?",
    options: [
      "On the left / On the right",
      "Up / Down",
      "In the North / South / East / West",
      "Near the top / Near the bottom"
    ],
    correct: 2
  },
  {
    id: 7,
    q: "Which verb describes a rapid downward trend?",
    options: [
      "Plummeted",
      "Soared",
      "Fluctuated",
      "Stabilized"
    ],
    correct: 0
  },
  {
    id: 8,
    q: "In a Mixed Chart task (e.g., Pie + Table), how do you structure the Overview?",
    options: [
      "Write two separate overview paragraphs",
      "Combine the main features of both visuals into one paragraph",
      "Ignore the smaller chart",
      "Describe all the numbers in the table first"
    ],
    correct: 1
  },
  {
    id: 9,
    q: "What is the 'Key Feature' to look for in a Pie Chart?",
    options: [
      "The smallest slice",
      "The title of the chart",
      "The largest segment or dominant proportion",
      "The color of the segments"
    ],
    correct: 2
  },
  {
    id: 10,
    q: "Is it appropriate to give your opinion or explain 'why' in Task 1?",
    options: [
      "Yes, always",
      "No, you must only report the facts presented",
      "Only if the data is boring",
      "Yes, in the conclusion"
    ],
    correct: 1
  }
];

const NexusIntroOverview: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeId, setActiveId] = useState(1);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'drill' | 'checklist' | 'test'>('drill');
  const [testAnswers, setTestAnswers] = useState<Record<number, number>>({});
  const [showTestAnswers, setShowTestAnswers] = useState(false);

  const activeSection = VISUAL_DATA.find(v => v.id === activeId) || VISUAL_DATA[0];

  const toggleReveal = (key: string) => {
    setRevealed(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTestSelect = (qId: number, optIdx: number) => {
    setTestAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    PRECISION_TEST_DATA.forEach(q => {
        if (testAnswers[q.id] === q.correct) score++;
    });
    return score;
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans flex flex-col relative overflow-hidden selection:bg-teal-500 selection:text-black">
      
      {/* Background FX */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(20,184,166,0.1),transparent_70%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:40px_40px] pointer-events-none opacity-20"></div>

      {/* Header */}
      <header className="px-6 py-4 flex flex-col md:flex-row justify-between items-center border-b border-teal-900/30 backdrop-blur-md sticky top-0 z-50 bg-[#020617]/80 gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button 
            onClick={onBack} 
            className="p-2 hover:bg-teal-900/20 rounded-lg text-teal-500 transition-all border border-transparent hover:border-teal-500/30"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="h-8 w-px bg-teal-900/50"></div>
          <div>
            <h1 className="text-[10px] font-mono text-teal-600 uppercase tracking-[0.3em] mb-1">Pauline Cullen Method</h1>
            <div className="text-white font-black text-xl tracking-tight flex items-center gap-2">
              <Target size={20} className="text-teal-400" /> PRECISION PROTOCOL
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <button 
                onClick={() => setActiveTab('drill')}
                className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider border transition-all whitespace-nowrap ${activeTab === 'drill' ? 'bg-teal-600 text-white border-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.4)]' : 'bg-transparent text-slate-500 border-slate-800 hover:text-white'}`}
            >
                Visual Drills
            </button>
            <button 
                onClick={() => setActiveTab('test')}
                className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider border transition-all whitespace-nowrap ${activeTab === 'test' ? 'bg-amber-600 text-white border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]' : 'bg-transparent text-slate-500 border-slate-800 hover:text-white'}`}
            >
                Precision Test
            </button>
            <button 
                onClick={() => setActiveTab('checklist')}
                className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider border transition-all whitespace-nowrap ${activeTab === 'checklist' ? 'bg-emerald-600 text-white border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-transparent text-slate-500 border-slate-800 hover:text-white'}`}
            >
                Checklist
            </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex overflow-hidden relative z-10">
        
        {/* CHECKLIST MODE */}
        {activeTab === 'checklist' && (
            <div className="w-full flex items-center justify-center p-8 animate-fade-in-up overflow-y-auto">
                <div className="max-w-2xl w-full bg-[#0a0f1e] border border-emerald-500/30 rounded-2xl p-8 shadow-[0_0_50px_rgba(16,185,129,0.1)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5"><ListChecks size={200} /></div>
                    
                    <h2 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
                        <CheckCircle2 className="text-emerald-500" size={32} /> Final Verification
                    </h2>
                    <p className="text-emerald-400/60 font-mono text-sm mb-8 border-b border-emerald-900/30 pb-4">
                        PROTOCOL: EXECUTE BEFORE DETAILS PARAGRAPH
                    </p>

                    <div className="space-y-4">
                        {[
                            "INTRO: Did you paraphrase 'What, Where, When'?",
                            "INTRO: Did you avoid listing every single category?",
                            "OVERVIEW: Did you start with 'Overall' or 'It is clear that'?",
                            "OVERVIEW: Did you remove ALL numbers? (Critical)",
                            "OVERVIEW: Did you identify the highest/lowest or main trend?"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/30 hover:border-emerald-500/50 transition-colors group cursor-pointer">
                                <div className="w-6 h-6 rounded-full border-2 border-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                                    <div className="w-2 h-2 bg-emerald-300 rounded-full opacity-0 group-hover:opacity-100"></div>
                                </div>
                                <span className="text-slate-300 group-hover:text-emerald-200 transition-colors font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {/* TEST MODE */}
        {activeTab === 'test' && (
            <div className="w-full h-full overflow-y-auto custom-scrollbar p-6 md:p-12 animate-fade-in-up">
                <div className="max-w-4xl mx-auto">
                    {/* Test Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-amber-900/30 pb-6 gap-4">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black text-white flex items-center gap-3">
                                <Zap size={32} className="text-amber-500" /> CALIBRATION TEST
                            </h2>
                            <p className="text-amber-500/60 font-mono text-xs mt-2 uppercase tracking-widest">Verify Neural Pathways // 10 Questions</p>
                        </div>
                        
                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <div className="text-[10px] text-slate-500 font-mono uppercase">Current Score</div>
                                <div className="text-2xl font-black text-amber-500">{calculateScore()} / 10</div>
                            </div>
                            <button 
                                onClick={() => setShowTestAnswers(!showTestAnswers)} 
                                className={`px-6 py-2 rounded-full border text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${showTestAnswers ? 'bg-amber-600 text-white border-amber-500' : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'}`}
                            >
                                {showTestAnswers ? <Eye size={14} /> : <HelpCircle size={14} />} 
                                {showTestAnswers ? 'Hide Answers' : 'Reveal Protocol'}
                            </button>
                        </div>
                    </div>

                    <div className="grid gap-6 pb-20">
                        {PRECISION_TEST_DATA.map((item, idx) => (
                            <div key={item.id} className="bg-[#0a0f1e] border border-amber-500/20 p-6 md:p-8 rounded-2xl relative overflow-hidden group hover:border-amber-500/40 transition-colors">
                                <div className="flex justify-between mb-4">
                                    <span className="text-[10px] font-mono text-amber-500/50 uppercase tracking-widest border border-amber-500/20 px-2 py-1 rounded">Query Sequence 0{idx+1}</span>
                                </div>
                                <h3 className="text-lg md:text-xl text-slate-200 font-medium mb-6 leading-relaxed">{item.q}</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {item.options.map((opt, oIdx) => {
                                        const isSelected = testAnswers[item.id] === oIdx;
                                        const isCorrect = item.correct === oIdx;
                                        const reveal = showTestAnswers || (isSelected && isCorrect) || (isSelected && !isCorrect && showTestAnswers); 
                                        
                                        let style = "border-slate-800 bg-slate-900/50 text-slate-400 hover:bg-slate-800 hover:text-white hover:border-slate-600";
                                        let icon = null;
                                        
                                        if (showTestAnswers) {
                                            if (isCorrect) style = "border-emerald-500 bg-emerald-950/40 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)]";
                                            else if (isSelected) style = "border-red-900/50 bg-red-950/20 text-red-400 opacity-50";
                                            else style = "border-slate-800 bg-slate-900/20 text-slate-600 opacity-50";
                                        } else if (isSelected) {
                                            if (isCorrect) {
                                                style = "border-emerald-500 bg-emerald-950/40 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]";
                                                icon = <Check size={16} className="text-emerald-500" />;
                                            } else {
                                                style = "border-red-500 bg-red-950/40 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.2)]";
                                                icon = <XIcon size={16} className="text-red-500" />;
                                            }
                                        }

                                        return (
                                            <button 
                                                key={oIdx}
                                                onClick={() => handleTestSelect(item.id, oIdx)}
                                                className={`p-4 text-left rounded-xl border transition-all text-sm font-medium flex items-center justify-between group/opt ${style}`}
                                                disabled={showTestAnswers}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className={`font-mono text-xs w-6 h-6 rounded flex items-center justify-center border ${isSelected || (showTestAnswers && isCorrect) ? 'border-current opacity-100' : 'border-slate-700 opacity-50 bg-black/20'}`}>
                                                        {['A','B','C','D'][oIdx]}
                                                    </span>
                                                    {opt}
                                                </div>
                                                {icon}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {/* DRILL MODE */}
        {activeTab === 'drill' && (
            <>
                {/* Sidebar Nav */}
                <nav className="w-64 bg-[#050b14] border-r border-teal-900/20 overflow-y-auto custom-scrollbar hidden md:block">
                <div className="p-4 space-y-1">
                    {VISUAL_DATA.map((v) => (
                    <button
                        key={v.id}
                        onClick={() => setActiveId(v.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all border ${
                        activeId === v.id 
                            ? 'bg-teal-950/40 border-teal-500/30 text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.1)]' 
                            : 'bg-transparent border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/5'
                        }`}
                    >
                        <div className={`p-1.5 rounded ${activeId === v.id ? 'bg-teal-500 text-black' : 'bg-slate-800'}`}>
                            {v.icon}
                        </div>
                        <div>
                            <div className="text-[10px] font-mono uppercase tracking-wider opacity-60">Visual 0{v.id}</div>
                            <div className="font-bold text-xs">{v.title}</div>
                        </div>
                        {activeId === v.id && <ChevronRight size={14} className="ml-auto" />}
                    </button>
                    ))}
                </div>
                </nav>

                {/* Main Visual Drill Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-12">
                    <div className="max-w-4xl mx-auto space-y-12 animate-fade-in-up" key={activeId}>
                        
                        {/* Context Header */}
                        <div className="border-b border-teal-900/30 pb-8">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-2 py-1 rounded bg-teal-900/30 border border-teal-500/20 text-teal-400 text-[10px] font-mono uppercase tracking-widest">
                                    Target Visual 0{activeSection.id}
                                </span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">{activeSection.title}</h2>
                            <p className="text-lg text-slate-400 font-light flex items-center gap-2">
                                <Eye size={16} className="text-teal-500" />
                                Context: <span className="text-teal-200">{activeSection.context}</span>
                            </p>
                        </div>

                        {/* Part A: Intro Drills */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold font-mono">A</div>
                                <h3 className="text-xl font-bold text-white">Introduction Accuracy</h3>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4">
                                {activeSection.introDrills.map((drill, idx) => (
                                    <DrillCard 
                                      key={`intro-${idx}`} 
                                      drill={drill} 
                                      idx={idx} 
                                      section="intro" 
                                      isOpen={!!revealed[`intro-${activeId}-${idx}`]} 
                                      onToggle={() => toggleReveal(`intro-${activeId}-${idx}`)} 
                                    />
                                ))}
                            </div>
                        </section>

                        {/* Part B: Overview Drills */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold font-mono">B</div>
                                <h3 className="text-xl font-bold text-white">Overview & Trends</h3>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4">
                                {activeSection.overviewDrills.map((drill, idx) => (
                                    <DrillCard 
                                      key={`over-${idx}`} 
                                      drill={drill} 
                                      idx={idx} 
                                      section="over" 
                                      isOpen={!!revealed[`over-${activeId}-${idx}`]} 
                                      onToggle={() => toggleReveal(`over-${activeId}-${idx}`)} 
                                    />
                                ))}
                            </div>
                        </section>

                    </div>
                </div>
            </>
        )}
      </main>
    </div>
  );
};

interface DrillCardProps {
  drill: DrillItem;
  idx: number;
  section: string;
  isOpen: boolean;
  onToggle: () => void;
}

const DrillCard: React.FC<DrillCardProps> = ({ drill, idx, section, isOpen, onToggle }) => {
    const isOverview = section === 'over';
    const accentColor = isOverview ? 'text-amber-400 border-amber-500/30 bg-amber-500/5' : 'text-indigo-400 border-indigo-500/30 bg-indigo-500/5';
    
    return (
        <div className={`relative group p-6 rounded-xl border bg-[#0a0f1e] transition-all duration-300 ${isOpen ? 'border-teal-500/40 shadow-[0_0_20px_rgba(20,184,166,0.1)]' : 'border-slate-800 hover:border-slate-700'}`}>
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1 block">Query 0{idx + 1}</span>
                    <p className="text-slate-200 font-medium text-lg leading-relaxed">{drill.q}</p>
                </div>
                <button 
                    onClick={onToggle}
                    className={`shrink-0 w-8 h-8 rounded flex items-center justify-center border transition-all ${isOpen ? 'bg-teal-500 border-teal-500 text-black rotate-180' : 'bg-transparent border-slate-700 text-slate-500 hover:text-white hover:border-slate-500'}`}
                >
                    <ChevronRight size={16} />
                </button>
            </div>

            <div className={`overflow-hidden transition-all duration-500 ease-out ${isOpen ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                <div className={`p-4 rounded-lg border flex items-start gap-3 ${accentColor}`}>
                    <Zap size={16} className="shrink-0 mt-1" />
                    <div className="font-mono text-sm leading-relaxed">
                        <span className="font-bold opacity-70 block text-[10px] uppercase tracking-wider mb-1">Correction / Answer</span>
                        {drill.a}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NexusIntroOverview;
