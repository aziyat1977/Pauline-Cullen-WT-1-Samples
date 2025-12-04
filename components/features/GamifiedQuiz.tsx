import React, { useState } from 'react';
import { CheckCircle, XCircle, Zap, Trophy, ArrowRight, RefreshCw } from 'lucide-react';
import { QuizQuestion } from '../../types';
import Confetti from '../ui/Confetti';

interface GamifiedQuizProps {
  questions: QuizQuestion[];
  title: string;
  onComplete: (score: number) => void;
}

const GamifiedQuiz: React.FC<GamifiedQuizProps> = ({ questions, title, onComplete }) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [streak, setStreak] = useState(0);
  const [shake, setShake] = useState(false);

  const handleSelect = (optIdx: number) => {
    const isCorrect = optIdx === questions[currentQ].correct;
    
    if (isCorrect) {
      setStreak(s => s + 1);
    } else {
      setStreak(0);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
    
    setAnswers(prev => ({ ...prev, [currentQ]: optIdx }));
    
    // Auto advance after short delay
    if (currentQ < questions.length - 1) {
      setTimeout(() => setCurrentQ(c => c + 1), 1200);
    } else {
      setTimeout(() => {
        setShowResult(true);
        onComplete(calculateScore());
      }, 1200);
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correct) score++;
    });
    return score;
  };

  const calculateScoreCheck = (idx: number, optIdx: number) => {
      return answers[idx] === optIdx;
  }

  if (showResult) {
    const score = calculateScore();
    const percent = Math.round((score / questions.length) * 100);
    return (
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-10 md:p-20 rounded-[3rem] text-white text-center animate-fade-in-up shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col items-center justify-center border border-white/20">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500 opacity-20 rounded-full -mr-20 -mt-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-900 opacity-30 rounded-full -ml-10 -mb-10 blur-3xl"></div>

        <Confetti active={percent > 70} />
        
        <div className="bg-white/20 p-8 rounded-full w-40 h-40 flex items-center justify-center mx-auto mb-8 backdrop-blur-md shadow-2xl border border-white/30 animate-pop-in relative z-10">
           <Trophy className="text-yellow-300 drop-shadow-[0_0_15px_rgba(253,224,71,0.5)]" size={80} />
        </div>
        
        <h3 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-indigo-100">Quiz Complete!</h3>
        <div className="text-9xl font-black mb-6 tracking-tighter text-white drop-shadow-xl">{percent}%</div>
        <p className="text-indigo-100 mb-12 text-2xl font-medium tracking-wide">You mastered {score} out of {questions.length} concepts.</p>
        
        <button 
          onClick={() => { setShowResult(false); setAnswers({}); setCurrentQ(0); setStreak(0); }}
          className="bg-white text-indigo-700 px-12 py-5 rounded-full font-black text-lg shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto relative z-10 group"
        >
          <RefreshCw size={24} className="group-hover:rotate-180 transition-transform duration-500"/> Try Again
        </button>
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div className={`bg-white dark:bg-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/50 dark:border-slate-700 relative overflow-hidden h-full flex flex-col transition-transform duration-100 ${shake ? 'animate-shake border-red-400' : ''}`}>
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gray-100 dark:bg-slate-700">
        <div 
          className="h-full bg-indigo-500 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]"
          style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="flex justify-between items-center mb-8 mt-4">
        <span className="font-bold text-gray-400 dark:text-gray-500 text-xs uppercase tracking-[0.2em]">Question {currentQ + 1} / {questions.length}</span>
        {streak > 1 && (
          <span className="flex items-center text-orange-500 dark:text-orange-400 font-black animate-pop-in bg-orange-50 dark:bg-orange-900/30 px-4 py-1.5 rounded-full text-sm border border-orange-100 dark:border-orange-800">
            <Zap size={16} className="mr-2 fill-current animate-pulse"/> {streak} STREAK
          </span>
        )}
      </div>

      <div key={currentQ} className="animate-fade-in-up">
        <h3 className="text-3xl md:text-4xl font-black text-gray-800 dark:text-white mb-12 min-h-[8rem] leading-tight">{q.q}</h3>

        <div className="grid gap-4 mt-auto">
            {q.options.map((opt, idx) => {
            const isSelected = calculateScoreCheck(currentQ, idx);
            const isCorrect = idx === q.correct;
            const isAnswered = answers[currentQ] !== undefined;
            
            let btnClass = "p-6 text-left rounded-3xl border-2 transition-all duration-300 group relative overflow-hidden font-bold text-lg md:text-xl transform";
            
            if (isSelected) {
                btnClass = isCorrect 
                ? "bg-green-50 dark:bg-green-900/30 border-green-500 text-green-800 dark:text-green-300 shadow-lg scale-[1.02] z-10"
                : "bg-red-50 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-300 shadow-md";
            } else if (isAnswered && isCorrect) {
                // Show correct answer if wrong one selected
                btnClass = "bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 opacity-60";
            } else if (isAnswered) {
                btnClass = "bg-gray-50 dark:bg-slate-800 border-gray-100 dark:border-slate-700 text-gray-400 dark:text-gray-600 opacity-40";
            } else {
                btnClass = "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-200 dark:hover:border-indigo-700 hover:scale-[1.01] hover:shadow-md active:scale-[0.98]";
            }

            return (
                <button
                key={idx}
                onClick={() => !isAnswered && handleSelect(idx)}
                className={btnClass}
                disabled={isAnswered}
                style={{ transitionDelay: `${idx * 50}ms` }}
                >
                <div className="flex justify-between items-center relative z-10">
                    <span>{opt}</span>
                    {isSelected && (isCorrect 
                        ? <CheckCircle size={28} className="text-green-600 dark:text-green-400 animate-pop-in drop-shadow-sm"/> 
                        : <XCircle size={28} className="text-red-600 dark:text-red-400 animate-pop-in drop-shadow-sm"/>
                    )}
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