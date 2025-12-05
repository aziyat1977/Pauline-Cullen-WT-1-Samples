
import React, { useState, useEffect } from 'react';
import { PenTool, Save, Trash2, maximize, FileText, Check } from 'lucide-react';

const WriterConsole: React.FC = () => {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({ words: 0, sentences: 0, complexity: 0 });
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const sentences = text.split(/[.!?]+/).filter(Boolean).length;
    
    // Simulate complexity calculation
    const longWords = text.split(/\s+/).filter(w => w.length > 6).length;
    const complexity = words > 0 ? Math.round((longWords / words) * 100) : 0;

    setStats({ words, sentences, complexity });
    
    // Trigger "Analysis" effect on pause
    const timeout = setTimeout(() => {
        if (text.length > 10) setAnalyzing(true);
        setTimeout(() => setAnalyzing(false), 1500);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [text]);

  const keywords = ['increase', 'decrease', 'fluctuate', 'peak', 'plateau', 'conversely', 'however', 'significant'];

  const highlightText = (input: string) => {
     // Simple highlighter for display purposes (not editable in this simple version, using overlay trick)
     return input.split(' ').map((word, i) => {
         const clean = word.replace(/[^a-zA-Z]/g, '').toLowerCase();
         if (keywords.includes(clean)) {
             return <span key={i} className="text-indigo-400 border-b border-indigo-500/50">{word} </span>
         }
         return <span key={i}>{word} </span>
     })
  };

  return (
    <div className="w-full bg-[#0c0c0e] border border-[#292524] rounded-sm flex flex-col h-[600px] shadow-2xl relative overflow-hidden font-mono">
       
       {/* Top Bar */}
       <div className="flex items-center justify-between px-6 py-3 border-b border-[#292524] bg-[#0f0f11]">
          <div className="flex items-center gap-3">
              <FileText size={14} className="text-[#57534e]" />
              <span className="text-xs text-[#78716c] uppercase tracking-widest">W_TASK_1_BUFFER</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] text-[#57534e]">
              <span className={analyzing ? "text-indigo-500 animate-pulse" : ""}>{analyzing ? "ANALYZING SYNTAX..." : "IDLE"}</span>
              <div className="h-2 w-2 rounded-full bg-green-900">
                  <div className={`h-full w-full rounded-full bg-green-500 ${analyzing ? 'animate-ping' : ''}`}></div>
              </div>
          </div>
       </div>

       {/* Editor Area */}
       <div className="flex-1 relative flex">
           {/* Line Numbers */}
           <div className="w-12 bg-[#0c0c0e] border-r border-[#292524] py-6 flex flex-col items-end px-3 text-[#292524] text-xs select-none">
               {[...Array(20)].map((_, i) => <div key={i}>{i+1}</div>)}
           </div>
           
           <textarea 
              className="flex-1 bg-transparent text-[#a8a29e] p-6 resize-none focus:outline-none leading-relaxed font-light z-10"
              placeholder="// Begin your report analysis here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              spellCheck={false}
           />
           
           {/* Highlight Overlay (Simulated) */}
           {/* In a real production app, this would be a proper rich text editor. For simplicity, we keep it transparent or minimal */}
       </div>

       {/* Analysis Sidebar (Visual) */}
       <div className="absolute top-12 right-6 w-48 pointer-events-none opacity-50 hidden md:block">
           <div className="border-l border-[#292524] pl-4 space-y-4">
               <div>
                   <div className="text-[9px] text-[#57534e] uppercase mb-1">Lexical Density</div>
                   <div className="h-1 bg-[#292524] w-full">
                       <div className="h-full bg-indigo-900 transition-all duration-1000" style={{ width: `${Math.min(stats.complexity * 2, 100)}%` }}></div>
                   </div>
               </div>
               <div>
                   <div className="text-[9px] text-[#57534e] uppercase mb-1">Structure</div>
                   <div className="text-xs text-[#44403c] flex gap-1">
                       {[...Array(5)].map((_, i) => (
                           <div key={i} className={`h-3 w-3 rounded-full ${i < stats.sentences ? 'bg-indigo-900' : 'bg-[#1c1917]'}`}></div>
                       ))}
                   </div>
               </div>
           </div>
       </div>

       {/* Footer Stats */}
       <div className="h-12 border-t border-[#292524] bg-[#0f0f11] flex items-center justify-between px-6">
           <div className="flex gap-6 text-xs text-[#78716c]">
               <span>WORDS: <span className="text-[#d6d3d1]">{stats.words}</span></span>
               <span>SENTENCES: <span className="text-[#d6d3d1]">{stats.sentences}</span></span>
           </div>
           <div className="flex gap-2">
               <button onClick={() => setText('')} className="p-2 hover:bg-[#292524] rounded text-[#57534e] hover:text-red-400 transition-colors" title="Clear Buffer">
                   <Trash2 size={14} />
               </button>
               <button className="p-2 hover:bg-[#292524] rounded text-[#57534e] hover:text-indigo-400 transition-colors" title="Save to Memory">
                   <Save size={14} />
               </button>
           </div>
       </div>
    </div>
  );
};

export default WriterConsole;
