import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, XCircle, Zap, Trophy, RefreshCw, Timer } from 'lucide-react';
import { QuizQuestion } from '../../types';
import Confetti from '../ui/Confetti';

interface GamifiedQuizProps {
  questions: QuizQuestion[];
  title: string;
  onComplete: (score: number) => void;
}

interface ProcessedQuestion extends QuizQuestion {
  originalIndex: number; // To track back if needed
}

const GamifiedQuiz: React.FC<GamifiedQuizProps> = ({ questions, title, onComplete }) => {
  const [processedQuestions, setProcessedQuestions] = useState<ProcessedQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [streak, setStreak] = useState(0);
  const [shake, setShake] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20); // 20s per question for Kahoot style
  
  const isMounted = useRef(true);
  const timerRef = useRef<any>(null);
  const advanceTimeoutRef = useRef<any>(null);

  useEffect(() => {
      isMounted.current = true;
      return () => {
          isMounted.current = false;
          if (timerRef.current) clearInterval(timerRef.current);
          if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);
      };
  }, []);

  // Initialize and Shuffle Options
  useEffect(() => {
    if (!questions || questions.length === 0) return;

    const processed = questions.map((q, qIdx) => {
      // Create an array of indices [0, 1, 2, 3]
      const indices = q.options.map((_, i) => i);
      // Fisher-Yates Shuffle
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      
      return {
        ...q,
        options: indices.map(i => q.options[i]), // Reorder options based on shuffled indices
        correct: indices.indexOf(q.correct),     // Find where the correct answer moved to
        originalIndex: qIdx
      };
    });
    setProcessedQuestions(processed);
    setAnswers({});
    setCurrentQ(0);
    setStreak(0);
    setShowResult(false);
  }, [questions]);

  // Timer Logic
  useEffect(() => {
    if (showResult || processedQuestions.length === 0) return;
    
    setTimeLeft(20);
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      if (!isMounted.current) return;
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSelect(-1); // Time out
          return 20;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
        if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentQ, showResult, processedQuestions.length]);

  const handleSelect = (optIdx: number) => {
    if (!isMounted.current) return;

    const q = processedQuestions[currentQ];
    // Safety check in case of race conditions
    if (!q) return;

    const isCorrect = optIdx === q.correct;
    
    if (isCorrect) {
      setStreak(s => s + 1);
    } else {
      setStreak(0);
      setShake(true);
      setTimeout(() => { if(isMounted.current) setShake(false) }, 500);
    }
    
    setAnswers(prev => ({ ...prev, [currentQ]: optIdx }));
    
    // Auto advance
    if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);
    
    if (currentQ < processedQuestions.length - 1) {
      advanceTimeoutRef.current = setTimeout(() => {
          if (isMounted.current) setCurrentQ(c => c + 1);
      }, 1000); // 1s delay to see result
    } else {
      advanceTimeoutRef.current = setTimeout(() => {
        if (isMounted.current) {
            setShowResult(true);
            onComplete(calculateScore() + (isCorrect ? 1 : 0)); // Add current if correct
        }
      }, 1000);
    }
  };

  const calculateScore = () => {
    let score = 0;
    processedQuestions.forEach((q, idx) => {
      if (answers[idx] === q.correct) score++;
    });
    return score;
  };

  const restart = () => {
      // Re-shuffle on restart
      const processed = questions.map((q, qIdx) => {
        const indices = q.options.map((_, i) => i);
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        return {
            ...q,
            options: indices.map(i => q.options[i]),
            correct: indices.indexOf(q.correct),
            originalIndex: qIdx
        };
      });
      setProcessedQuestions(processed);
      setAnswers({});
      setCurrentQ(0);
      setStreak(0);
      setShowResult(false);
  };

  if (processedQuestions.length === 0) return (
      <div className="flex items-center justify-center p-8 text-white font-mono animate-pulse">
          Loading Neural Protocols...
      </div>
  );

  if (showResult) {
    const score = calculateScore();
    const percent = Math.round((score / questions.length) * 100);
    return (
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-[2rem] text-white text-center animate-fade-in-up shadow-2xl relative overflow-hidden flex flex-col items-center justify-center border border-white/20 w-full max-w-2xl mx-auto min-h-[400px]">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <Confetti active={percent > 70} />
        
        <div className="bg-white/20 p-6 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6 backdrop-blur-md shadow-2xl border border-white/30 animate-pop-in relative z-10">
           <Trophy className="text-yellow-300 drop-shadow-[0_0_15px_rgba(253,224,71,0.5)]" size={60} />
        </div>
        
        <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-indigo-100">Assessment Complete</h3>
        <div className="text-7xl font-black mb-4 tracking-tighter text-white drop-shadow-xl">{percent}%</div>
        <p className="text-indigo-100 mb-8 text-lg font-medium tracking-wide">Score: {score} / {questions.length}</p>
        
        <button 
          onClick={restart}
          className="bg-white text-indigo-700 px-8 py-3 rounded-full font-black text-base shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto relative z-10 group"
        >
          <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500"/> Re-Initialize
        </button>
      </div>
    );
  }

  const q = processedQuestions[currentQ];
  const isAnswered = answers[currentQ] !== undefined;

  return (
    <div className={`bg-white dark:bg-slate-800 p-6 md:p-8 rounded-[2rem] shadow-xl border border-white/50 dark:border-slate-700 relative overflow-hidden w-full flex flex-col transition-transform duration-100 ${shake ? 'animate-shake border-red-400' : ''}`}>
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100 dark:bg-slate-700">
        <div 
          className="h-full bg-indigo-500 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]"
          style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="flex justify-between items-center mb-6 mt-2">
        <div className="flex flex-col">
            <span className="font-bold text-gray-400 dark:text-gray-500 text-[10px] uppercase tracking-[0.2em]">{title} PROTOCOL</span>
            <span className="font-black text-indigo-600 dark:text-indigo-400 text-lg">Q{currentQ + 1} <span className="text-gray-300 dark:text-gray-600 text-sm">/ {questions.length}</span></span>
        </div>
        
        <div className="flex items-center gap-4">
             {/* Timer */}
            <div className={`flex items-center gap-1 font-mono font-bold text-sm ${timeLeft < 5 ? 'text-red-500 animate-pulse' : 'text-slate-400'}`}>
                <Timer size={14} /> {timeLeft}s
            </div>

            {streak > 1 && (
            <span className="flex items-center text-orange-500 dark:text-orange-400 font-black animate-pop-in bg-orange-50 dark:bg-orange-900/30 px-3 py-1 rounded-full text-xs border border-orange-100 dark:border-orange-800">
                <Zap size={12} className="mr-1 fill-current animate-pulse"/> {streak}
            </span>
            )}
        </div>
      </div>

      <div key={currentQ} className="animate-fade-in-up flex flex-col h-full">
        <h3 className="text-xl md:text-2xl font-black text-gray-800 dark:text-white mb-8 min-h-[5rem] leading-tight">{q.q}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-auto">
            {q.options.map((opt, idx) => {
            const isSelected = answers[currentQ] === idx;
            const isCorrect = idx === q.correct;
            
            let btnClass = "p-4 text-left rounded-2xl border-2 transition-all duration-300 group relative overflow-hidden font-bold text-sm md:text-base transform h-full flex items-center";
            
            if (isAnswered) {
                 if (isCorrect) {
                     btnClass += " bg-green-500 border-green-600 text-white shadow-md scale-[1.02] z-10";
                 } else if (isSelected) {
                     btnClass += " bg-red-500 border-red-600 text-white shadow-md opacity-50";
                 } else {
                     btnClass += " bg-gray-100 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-400 dark:text-gray-600 opacity-30";
                 }
            } else {
                 const colors = [
                     "border-indigo-100 hover:border-indigo-500 hover:bg-indigo-50 dark:border-slate-700 dark:hover:border-indigo-500 dark:hover:bg-slate-700",
                     "border-purple-100 hover:border-purple-500 hover:bg-purple-50 dark:border-slate-700 dark:hover:border-purple-500 dark:hover:bg-slate-700",
                     "border-pink-100 hover:border-pink-500 hover:bg-pink-50 dark:border-slate-700 dark:hover:border-pink-500 dark:hover:bg-slate-700",
                     "border-teal-100 hover:border-teal-500 hover:bg-teal-50 dark:border-slate-700 dark:hover:border-teal-500 dark:hover:bg-slate-700"
                 ];
                 btnClass += ` bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 ${colors[idx % 4]} hover:shadow-lg hover:-translate-y-1`;
            }

            return (
                <button
                key={idx}
                onClick={() => !isAnswered && handleSelect(idx)}
                className={btnClass}
                disabled={isAnswered}
                >
                    <div className="flex justify-between items-center w-full relative z-10">
                        <span>{opt}</span>
                        {isAnswered && isCorrect && <CheckCircle size={20} className="text-white animate-pop-in drop-shadow-sm"/>}
                        {isAnswered && isSelected && !isCorrect && <XCircle size={20} className="text-white animate-pop-in drop-shadow-sm"/>}
                    </div>
                </button>
            );
            })}
        </div>
      </div>
    </div>
  );
};

export default GamifiedQuiz;