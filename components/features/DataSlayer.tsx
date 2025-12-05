
import React, { useState, useEffect, useRef } from 'react';
import { Target, Zap, AlertCircle, Trophy, Play } from 'lucide-react';

interface TargetItem {
  id: number;
  val: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 'data' | 'distractor';
}

const DataSlayer: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [targets, setTargets] = useState<TargetItem[]>([]);
  const [objective, setObjective] = useState<'highest' | 'lowest' | 'even'>('highest');
  const [feedback, setFeedback] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();

  const spawnTarget = () => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    
    const id = Date.now() + Math.random();
    const val = Math.floor(Math.random() * 100);
    const type = Math.random() > 0.8 ? 'distractor' : 'data'; // 20% chance of 'virus' or bad data
    
    setTargets(prev => [...prev, {
        id, val, 
        x: Math.random() * (width - 60), 
        y: Math.random() * (height - 60),
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        type
    }]);
  };

  const startGame = () => {
    setPlaying(true);
    setScore(0);
    setTimeLeft(30);
    setTargets([]);
    setObjective('highest');
  };

  // Game Loop
  useEffect(() => {
    if (!playing) return;
    
    const update = () => {
       if (!containerRef.current) return;
       const { width, height } = containerRef.current.getBoundingClientRect();

       setTargets(prev => prev.map(t => {
           let nx = t.x + t.vx;
           let ny = t.y + t.vy;

           if (nx <= 0 || nx >= width - 60) t.vx *= -1;
           if (ny <= 0 || ny >= height - 60) t.vy *= -1;

           return { ...t, x: nx, y: ny };
       }));

       // Randomly spawn
       if (Math.random() < 0.05) spawnTarget();

       requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);
    return () => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
  }, [playing]);

  // Timer
  useEffect(() => {
      if (!playing) return;
      const interval = setInterval(() => {
          setTimeLeft(t => {
              if (t <= 1) {
                  setPlaying(false);
                  return 0;
              }
              // Switch objective occasionally
              if (t % 10 === 0) {
                  const objectives: ('highest'|'lowest'|'even')[] = ['highest', 'lowest', 'even'];
                  setObjective(objectives[Math.floor(Math.random() * 3)]);
              }
              return t - 1;
          });
      }, 1000);
      return () => clearInterval(interval);
  }, [playing]);

  const handleClick = (t: TargetItem) => {
      // Logic Check
      const allVals = targets.map(t => t.val);
      let isValid = false;

      if (t.type === 'distractor') {
          setScore(s => Math.max(0, s - 50));
          setFeedback("AVOID RED!");
          setTargets(prev => prev.filter(item => item.id !== t.id));
          return;
      }

      if (objective === 'highest') {
          const max = Math.max(...allVals);
          if (t.val >= max - 5) isValid = true; // Forgive slightly
      } else if (objective === 'lowest') {
          const min = Math.min(...allVals);
          if (t.val <= min + 5) isValid = true;
      } else if (objective === 'even') {
          if (t.val % 2 === 0) isValid = true;
      }

      if (isValid) {
          setScore(s => s + 100);
          setFeedback("NICE!");
          // Particle effect could go here
      } else {
          setScore(s => Math.max(0, s - 20));
          setFeedback("MISS!");
      }
      
      setTargets(prev => prev.filter(item => item.id !== t.id));
      setTimeout(() => setFeedback(null), 500);
  };

  return (
    <div className="w-full h-[500px] bg-slate-900 rounded-3xl overflow-hidden relative border-4 border-amber-400/30 shadow-[0_0_50px_rgba(251,191,36,0.1)] group select-none">
        
        {/* HUD */}
        <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start z-20 pointer-events-none">
            <div className="bg-slate-900/80 backdrop-blur border border-amber-500/50 px-4 py-2 rounded-xl text-amber-400 font-black font-mono text-xl flex items-center gap-3">
                <Trophy size={20} /> {score}
            </div>
            <div className="flex flex-col items-center">
                 <div className="bg-slate-900/80 backdrop-blur border border-white/20 px-6 py-2 rounded-xl text-white font-black text-lg animate-pulse">
                     TARGET: {objective.toUpperCase()}
                 </div>
                 {feedback && <div className="mt-2 text-2xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pop-in">{feedback}</div>}
            </div>
            <div className={`bg-slate-900/80 backdrop-blur border px-4 py-2 rounded-xl font-black font-mono text-xl ${timeLeft < 10 ? 'text-red-500 border-red-500 animate-pulse' : 'text-blue-400 border-blue-500'}`}>
                {timeLeft}s
            </div>
        </div>

        {/* Start Screen */}
        {!playing && (
            <div className="absolute inset-0 z-30 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8">
                <Target size={64} className="text-amber-400 mb-6" />
                <h2 className="text-4xl font-black text-white mb-2 italic tracking-tighter">DATA SLAYER</h2>
                <p className="text-slate-400 mb-8 max-w-md">Reflex training. Identify data points matching the protocol (Highest, Lowest, Even) before they vanish. Avoid red distractors.</p>
                <button 
                    onClick={startGame}
                    className="group relative px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black text-xl rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(245,158,11,0.4)] flex items-center gap-3"
                >
                   <Play size={24} className="fill-current" /> INITIALIZE
                </button>
                {score > 0 && <div className="mt-6 text-slate-500 font-mono">LAST RUN: {score} XP</div>}
            </div>
        )}

        {/* Game Area */}
        <div ref={containerRef} className="absolute inset-0 z-10 cursor-crosshair">
            {targets.map(t => (
                <button
                    key={t.id}
                    onMouseDown={() => handleClick(t)}
                    className={`absolute w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shadow-lg border-2 transition-transform active:scale-90 ${
                        t.type === 'distractor' 
                        ? 'bg-red-500 text-white border-red-300 animate-pulse' 
                        : 'bg-slate-800 text-amber-400 border-amber-400/50 hover:bg-slate-700'
                    }`}
                    style={{ left: t.x, top: t.y }}
                >
                    {t.type === 'distractor' ? <AlertCircle size={20}/> : t.val}
                </button>
            ))}
        </div>

        {/* CRT Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%] opacity-40"></div>
    </div>
  );
};

export default DataSlayer;
