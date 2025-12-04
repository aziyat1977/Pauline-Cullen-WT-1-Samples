import React, { useState, useRef, MouseEvent } from 'react';
import { Zap } from 'lucide-react';
import { VocabItem } from '../../types';

interface FlipCardProps extends VocabItem {
  large?: boolean;
}

const FlipCard: React.FC<FlipCardProps> = ({ term, def, ex, large = false }) => {
  const [flipped, setFlipped] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || flipped) return; 
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rotateY = ((mouseX - width / 2) / width) * 15; 
    const rotateX = ((height / 2 - mouseY) / height) * 15;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({ x: (mouseX / width) * 100, y: (mouseY / height) * 100, opacity: 0.4 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div 
      ref={cardRef}
      className={`${large ? 'h-[400px] w-full max-w-xl mx-auto' : 'h-56 w-full'} cursor-pointer perspective-1000 group z-10`}
      onClick={() => setFlipped(!flipped)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className={`relative w-full h-full transition-all duration-700 cubic-bezier(0.2, 0.8, 0.2, 1) transform-style-3d`}
        style={{
          transform: flipped 
            ? `rotateY(180deg)` 
            : `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${rotate.x !== 0 ? 1.02 : 1})`
        }}
      >
        {/* Front */}
        <div className="absolute w-full h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-[2rem] p-6 shadow-xl backface-hidden flex flex-col items-center justify-center text-center transition-all overflow-hidden">
          
          {/* Glare Effect */}
          <div 
             className="absolute inset-0 pointer-events-none transition-opacity duration-300"
             style={{
                 background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 50%)`,
                 opacity: glare.opacity
             }}
          ></div>
          
          <div className={`${large ? 'w-20 h-20 mb-6' : 'w-12 h-12 mb-3'} bg-indigo-50 dark:bg-indigo-900/50 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500`}>
             <Zap className="text-indigo-600 dark:text-indigo-300 fill-current" size={large ? 32 : 20} />
          </div>
          <h5 className={`${large ? 'text-5xl md:text-6xl' : 'text-xl'} font-black text-gray-800 dark:text-white tracking-tighter leading-none drop-shadow-sm`}>{term}</h5>
          <p className="text-indigo-400 dark:text-indigo-300 text-[10px] font-bold mt-6 uppercase tracking-widest border border-indigo-100 dark:border-indigo-800/50 px-3 py-1 rounded-full bg-white/50 dark:bg-black/20 backdrop-blur-sm group-hover:bg-indigo-500 group-hover:text-white transition-colors">Tap to Flip</p>
        </div>
        
        {/* Back */}
        <div className="absolute w-full h-full bg-gradient-to-br from-indigo-600 to-indigo-900 dark:from-indigo-900 dark:to-slate-900 text-white rounded-[2rem] p-8 shadow-2xl rotate-y-180 backface-hidden flex flex-col items-center justify-center text-center border border-white/10">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <p className={`${large ? 'text-2xl md:text-3xl' : 'text-base'} font-bold mb-6 leading-snug drop-shadow-md relative z-10`}>{def}</p>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl w-full border border-white/10 shadow-inner relative z-10 transform translate-z-10">
            <p className={`${large ? 'text-lg' : 'text-xs'} text-indigo-50 italic font-medium`}>"{ex}"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;