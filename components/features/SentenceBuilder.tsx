import React, { useState, useEffect } from 'react';
import { CheckCircle, RotateCcw } from 'lucide-react';

interface SentenceBuilderProps {
  sentence: string[];
}

const SentenceBuilder: React.FC<SentenceBuilderProps> = ({ sentence }) => {
  const [pool, setPool] = useState<string[]>([]);
  const [built, setBuilt] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
     // Shuffle on mount
     setPool([...sentence].sort(() => Math.random() - 0.5));
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentence]);

  const handleAdd = (word: string, index: number) => {
    const newBuilt = [...built, word];
    setBuilt(newBuilt);
    const newPool = [...pool];
    newPool.splice(index, 1);
    setPool(newPool);
  };

  const handleRemove = (word: string, index: number) => {
    setPool([...pool, word]);
    const newBuilt = [...built];
    newBuilt.splice(index, 1);
    setBuilt(newBuilt);
  };
  
  const reset = () => {
      setBuilt([]);
      setPool([...sentence].sort(() => Math.random() - 0.5));
      setIsSuccess(false);
  }

  useEffect(() => {
    if (built.join(" ") === sentence.join(" ")) {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
  }, [built, sentence]);

  return (
    <div className="bg-indigo-50/50 p-6 lg:p-8 rounded-2xl border border-indigo-100 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold text-indigo-900">Construct the introduction:</h4>
        <button onClick={reset} className="text-xs text-indigo-400 hover:text-indigo-600 flex items-center gap-1">
            <RotateCcw size={12}/> Reset
        </button>
      </div>
      
      {/* Drop Zone */}
      <div className={`min-h-[100px] bg-white rounded-xl border-2 border-dashed p-6 flex flex-wrap gap-2 mb-6 transition-all duration-300 ${isSuccess ? 'border-green-400 bg-green-50 shadow-inner' : 'border-indigo-200'}`}>
        {built.length === 0 && <span className="text-gray-300 italic font-medium select-none">Tap words below to build sentence...</span>}
        {built.map((word, idx) => (
          <button 
            key={idx} 
            onClick={() => handleRemove(word, idx)}
            className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg shadow-md text-sm hover:bg-red-500 transition-colors animate-pop-in font-medium"
          >
            {word}
          </button>
        ))}
      </div>

      {/* Word Pool */}
      <div className="flex flex-wrap gap-2 justify-center content-start flex-grow">
        {pool.map((word, idx) => (
          <button
            key={idx}
            onClick={() => handleAdd(word, idx)}
            className="px-3 py-1.5 bg-white border border-indigo-100 text-indigo-700 rounded-lg shadow-sm hover:scale-105 hover:shadow-md transition-all text-sm font-medium"
          >
            {word}
          </button>
        ))}
      </div>

      <div className={`mt-6 text-center transition-all duration-500 ${isSuccess ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold shadow-sm">
          <CheckCircle size={18} className="fill-current text-green-500 bg-white rounded-full"/> Perfect Structure!
        </div>
      </div>
    </div>
  );
};

export default SentenceBuilder;