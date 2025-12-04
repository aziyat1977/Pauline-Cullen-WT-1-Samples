import React, { useState } from 'react';
import { CheckCircle, XCircle, Zap, Trophy, ArrowRight } from 'lucide-react';
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

  const handleSelect = (optIdx: number) => {
    const isCorrect = optIdx === questions[currentQ].correct;
    if (isCorrect) setStreak(s => s + 1);
    else setStreak(0);
    
    setAnswers(prev => ({ ...prev, [currentQ]: optIdx }));
    
    // Auto advance after short delay
    if (currentQ < questions.length - 1) {
      setTimeout(() => setCurrentQ(c => c + 1), 800);
    } else {
      setTimeout(() => {
        setShowResult(true);
        onComplete(calculateScore());
      }, 800);
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
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-10 rounded-3xl text-white text-center animate-fade-in shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-900 opacity-20 rounded-full -ml-10 -mb-10 blur-2xl"></div>

        <Confetti active={percent > 70} />
        <div className="bg-white/20 p-4 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 backdrop-blur-md">
           <Trophy className="text-yellow-300 animate-bounce" size={48} />
        </div>
        <h3 className="text-3xl font-bold mb-2">Quiz Complete!</h3>
        <div className="text-7xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-indigo-200">{percent}%</div>
        <p className="text-indigo-100 mb-8 text-lg">You mastered {score} out of {questions.length} concepts.</p>
        <button 
          onClick={() => { setShowResult(false); setAnswers({}); setCurrentQ(0); setStreak(0); }}
          className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold shadow-xl hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
        >
          Try Again <ArrowRight size={18}/>
        </button>
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden h-full flex flex-col">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100">
        <div 
          className="h-full bg-indigo-500 transition-all duration-500 ease-out"
          style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="flex justify-between items-center mb-8 mt-2">
        <span className="font-bold text-gray-400 text-xs uppercase tracking-widest">Question {currentQ + 1} of {questions.length}</span>
        {streak > 1 && (
          <span className="flex items-center text-orange-500 font-bold animate-pulse bg-orange-50 px-3 py-1 rounded-full text-xs">
            <Zap size={14} className="mr-1 fill-current"/> {streak} Streak!
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-8 min-h-[4rem]">{q.q}</h3>

      <div className="grid gap-3 mt-auto">
        {q.options.map((opt, idx) => {
          const isSelected = calculateScoreCheck(currentQ, idx);
          const isCorrect = idx === q.correct;
          const isAnswered = answers[currentQ] !== undefined;
          
          let btnClass = "p-5 text-left rounded-2xl border-2 transition-all duration-200 hover:bg-indigo-50 hover:border-indigo-200 group relative overflow-hidden font-medium text-gray-600";
          
          if (isSelected) {
            btnClass = isCorrect 
              ? "p-5 text-left rounded-2xl border-2 bg-green-50 border-green-500 text-green-800 shadow-sm"
              : "p-5 text-left rounded-2xl border-2 bg-red-50 border-red-500 text-red-800 shadow-sm";
          } else if (isAnswered && isCorrect) {
             // Show correct answer if wrong one selected
             btnClass = "p-5 text-left rounded-2xl border-2 bg-green-50 border-green-200 text-green-700 opacity-70";
          }

          return (
            <button
              key={idx}
              onClick={() => !isAnswered && handleSelect(idx)}
              className={btnClass}
              disabled={isAnswered}
            >
              <div className="flex justify-between items-center relative z-10">
                <span>{opt}</span>
                {isSelected && (isCorrect ? <CheckCircle size={20} className="text-green-600"/> : <XCircle size={20} className="text-red-600"/>)}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GamifiedQuiz;