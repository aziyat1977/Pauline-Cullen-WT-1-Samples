
import React, { useState, useEffect } from 'react';
import { ArrowRight, Share2, Check } from 'lucide-react';

interface Node {
  id: string;
  label: string;
  type: 'subject' | 'verb' | 'object' | 'adverb';
  x: number;
  y: number;
}

const LogicGate: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([
      { id: 'n1', label: 'The Chart', type: 'subject', x: 50, y: 100 },
      { id: 'n2', label: 'Illustrates', type: 'verb', x: 250, y: 50 },
      { id: 'n3', label: 'Shows', type: 'verb', x: 250, y: 150 },
      { id: 'n4', label: 'Changes', type: 'object', x: 450, y: 100 },
      { id: 'n5', label: 'Drastically', type: 'adverb', x: 650, y: 100 },
  ]);

  const [connections, setConnections] = useState<[string, string][]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);

  const handleNodeClick = (id: string) => {
      if (selected === null) {
          setSelected(id);
      } else {
          if (selected !== id) {
              setConnections(prev => [...prev, [selected, id]]);
              // Check for solution sequence: n1 -> n2 -> n4 -> n5
              validate();
          }
          setSelected(null);
      }
  };

  const validate = () => {
      // Dummy validation for demo
      setTimeout(() => {
          if (connections.length >= 3) setSolved(true);
      }, 500);
  };

  const reset = () => {
      setConnections([]);
      setSolved(false);
      setSelected(null);
  }

  return (
    <div className="w-full h-[300px] bg-[#1c1917] border border-[#292524] relative overflow-hidden select-none">
        
        <div className="absolute top-4 left-4 z-20">
             <div className="text-[10px] text-[#57534e] uppercase tracking-widest font-mono mb-1">Logic Gate Array</div>
             <div className="text-sm text-[#a8a29e]">Connect: Subject → Verb → Object → Modifier</div>
        </div>
        
        <button onClick={reset} className="absolute top-4 right-4 z-20 text-[10px] text-[#57534e] hover:text-[#a8a29e] border border-[#292524] px-2 py-1">RESET SEQUENCE</button>

        {solved && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#0c0c0e]/80 backdrop-blur-sm animate-fade-in">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-green-900/50 flex items-center justify-center text-green-400 mb-2 border border-green-800">
                        <Check size={24} />
                    </div>
                    <span className="text-green-500 font-mono text-xs tracking-widest uppercase">Logic Flow Verified</span>
                </div>
            </div>
        )}

        <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {connections.map(([start, end], i) => {
                const sNode = nodes.find(n => n.id === start);
                const eNode = nodes.find(n => n.id === end);
                if (!sNode || !eNode) return null;
                return (
                    <line 
                        key={i} 
                        x1={sNode.x + 40} y1={sNode.y + 15} 
                        x2={eNode.x + 40} y2={eNode.y + 15} 
                        stroke="#57534e" 
                        strokeWidth="2" 
                    />
                );
            })}
        </svg>

        {nodes.map(node => (
            <button
                key={node.id}
                onClick={() => handleNodeClick(node.id)}
                className={`absolute w-32 py-2 px-3 rounded border transition-all duration-300 flex items-center justify-between group ${
                    selected === node.id 
                    ? 'bg-[#292524] border-[#a8a29e] text-[#e7e5e4] shadow-[0_0_15px_rgba(168,162,158,0.2)]' 
                    : 'bg-[#0c0c0e] border-[#292524] text-[#78716c] hover:border-[#57534e]'
                }`}
                style={{ left: node.x, top: node.y }}
            >
                <div className="flex flex-col items-start">
                    <span className="text-[9px] uppercase font-mono text-[#44403c] group-hover:text-[#57534e]">{node.type}</span>
                    <span className="font-medium text-xs">{node.label}</span>
                </div>
                <div className={`w-2 h-2 rounded-full ${selected === node.id ? 'bg-[#a8a29e]' : 'bg-[#292524]'}`}></div>
            </button>
        ))}
    </div>
  );
};

export default LogicGate;
