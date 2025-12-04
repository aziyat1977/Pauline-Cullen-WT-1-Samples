import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import { VocabItem } from '../../types';

const FlipCard: React.FC<VocabItem> = ({ term, def, ex }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div 
      className="h-56 w-full cursor-pointer perspective-1000 group"
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${flipped ? 'rotate-y-180' : ''}`}>
        {/* Front */}
        <div className="absolute w-full h-full bg-white border-2 border-indigo-50 rounded-2xl p-6 shadow-sm backface-hidden flex flex-col items-center justify-center text-center hover:shadow-xl hover:border-indigo-200 transition-all hover:-translate-y-1">
          <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
             <Zap className="text-indigo-600" size={24} />
          </div>
          <h5 className="font-bold text-gray-800 text-xl">{term}</h5>
          <p className="text-indigo-300 text-xs font-semibold mt-4 uppercase tracking-wider">Tap to Reveal</p>
        </div>
        
        {/* Back */}
        <div className="absolute w-full h-full bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-2xl p-6 shadow-xl rotate-y-180 backface-hidden flex flex-col items-center justify-center text-center">
          <p className="font-medium text-lg mb-4 leading-snug">{def}</p>
          <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg w-full">
            <p className="text-xs text-indigo-100 italic">"{ex}"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;