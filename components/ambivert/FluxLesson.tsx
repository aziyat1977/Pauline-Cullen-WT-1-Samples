
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Chart3D from '../features/Chart3D';
import ChartHousing from '../features/ChartHousing';
import ChartTransport from '../features/ChartTransport';
import ChartFish from '../features/ChartFish';
import ChartTea from '../features/ChartTea';
import DiagramSugar from '../features/DiagramSugar';
import DiagramSalmon from '../features/DiagramSalmon';
import MapSports from '../features/MapSports';
import FlipCard from '../features/FlipCard';
import GamifiedQuiz from '../features/GamifiedQuiz';
import SentenceBuilder from '../features/SentenceBuilder';
import LessonStepper from '../ui/LessonStepper';
import { 
    VOCAB_LIST, HOUSING_VOCAB_LIST, TRANSPORT_VOCAB_LIST, 
    FISH_VOCAB, TEA_VOCAB, SUGAR_VOCAB, SALMON_VOCAB, SPORTS_VOCAB,
    QUIZ_A, HOUSING_QUIZ_A, TRANSPORT_QUIZ_A, 
    FISH_QUIZ, TEA_QUIZ, SUGAR_QUIZ, SALMON_QUIZ, SPORTS_QUIZ
} from '../../constants';
import NexusAvatar from '../features/NexusAvatar';

interface FluxLessonProps {
  moduleId: string;
  onBack: () => void;
  onExit: () => void;
  onNext: () => void;
  onPrev: () => void;
  isLast: boolean;
  isFirst: boolean;
}

const FluxLesson: React.FC<FluxLessonProps> = ({ moduleId, onBack, onNext, onPrev, isLast, isFirst }) => {
  
  const getModuleConfig = () => {
      switch(moduleId) {
          case 'flight': return { title: 'Flight Duration', chart: <Chart3D />, vocab: VOCAB_LIST, quiz: QUIZ_A, sentence: ["The", "chart", "shows", "duration", "of", "flights."] };
          case 'housing': return { title: 'Housing Tenure', chart: <ChartHousing />, vocab: HOUSING_VOCAB_LIST, quiz: HOUSING_QUIZ_A, sentence: ["The", "chart", "compares", "housing", "trends."] };
          case 'transport': return { title: 'Transport Emissions', chart: <ChartTransport />, vocab: TRANSPORT_VOCAB_LIST, quiz: TRANSPORT_QUIZ_A, sentence: ["Planes", "emit", "the", "most", "carbon."] };
          case 'fish': return { title: 'Fish Consumption', chart: <ChartFish />, vocab: FISH_VOCAB, quiz: FISH_QUIZ, sentence: ["Chicken", "consumption", "rose", "significantly."] };
          case 'tea': return { title: 'Tea Sales', chart: <ChartTea />, vocab: TEA_VOCAB, quiz: TEA_QUIZ, sentence: ["Sales", "fluctuated", "over", "the", "period."] };
          case 'sugar': return { title: 'Sugar Process', chart: <DiagramSugar />, vocab: SUGAR_VOCAB, quiz: SUGAR_QUIZ, sentence: ["Sugar", "is", "produced", "from", "cane."] };
          case 'salmon': return { title: 'Salmon Life Cycle', chart: <DiagramSalmon />, vocab: SALMON_VOCAB, quiz: SALMON_QUIZ, sentence: ["Salmon", "migrate", "to", "the", "ocean."] };
          case 'sports': return { title: 'Sports Centre', chart: <MapSports />, vocab: SPORTS_VOCAB, quiz: SPORTS_QUIZ, sentence: ["The", "gym", "was", "extended", "eastward."] };
          default: return null;
      }
  };

  const config = getModuleConfig();

  if (!config) return <div className="text-white p-10">Module Not Found</div>;

  const steps = [
      {
          title: "Visualization",
          content: (
              <div className="w-full max-w-4xl mx-auto">
                  <h2 className="text-3xl font-bold text-white mb-6 text-center">{config.title}</h2>
                  <div className="bg-slate-900 p-4 rounded-3xl border border-slate-700 shadow-2xl">
                      {config.chart}
                  </div>
              </div>
          )
      },
      ...config.vocab.map(v => ({
          title: "Vocabulary",
          content: <div className="w-full flex justify-center"><FlipCard {...v} large /></div>
      })),
      {
          title: "Structure",
          content: (
              <div className="w-full max-w-3xl mx-auto">
                  <SentenceBuilder sentence={config.sentence} />
              </div>
          )
      },
      {
          title: "Verification",
          content: (
              <div className="w-full max-w-2xl mx-auto">
                  <GamifiedQuiz questions={config.quiz} title="Knowledge Check" onComplete={() => {}} />
              </div>
          )
      }
  ];

  return (
    <div className="h-screen flex flex-col bg-[#0f172a]">
        <NexusAvatar />
        <div className="flex-none p-4 flex justify-between items-center bg-slate-900 border-b border-slate-800">
            <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                <ArrowLeft size={20} /> Back to Nexus
            </button>
            <div className="flex gap-4">
                <button onClick={onPrev} disabled={isFirst} className="px-4 py-2 bg-slate-800 rounded disabled:opacity-50 text-white">Prev Module</button>
                <button onClick={onNext} disabled={isLast} className="px-4 py-2 bg-indigo-600 rounded disabled:opacity-50 text-white">Next Module</button>
            </div>
        </div>
        <div className="flex-1 overflow-hidden relative">
            <LessonStepper steps={steps} colorTheme="teal" chartComponent={config.chart} />
        </div>
    </div>
  );
};

export default FluxLesson;
