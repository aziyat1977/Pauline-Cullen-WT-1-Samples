
import React, { useEffect, useRef } from 'react';

const NexusCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const cols = Math.floor(w / 40);
    const rows = Math.floor(h / 40);
    const grid: number[] = Array(cols * rows).fill(0).map(() => Math.random());

    let frame = 0;

    const draw = () => {
      ctx.fillStyle = '#0f172a'; // Slate 900
      ctx.fillRect(0, 0, w, h);
      
      ctx.lineWidth = 1;

      for (let i = 0; i < grid.length; i++) {
         const x = (i % cols) * 40;
         const y = Math.floor(i / cols) * 40;
         
         // Dynamic pulse
         const val = grid[i];
         const pulse = Math.sin((frame * 0.05) + (x * 0.01) + (y * 0.01));
         
         if (pulse > 0.8) {
             ctx.strokeStyle = `rgba(45, 212, 191, ${pulse * 0.5})`; // Teal
             ctx.strokeRect(x + 2, y + 2, 36, 36);
             
             ctx.fillStyle = `rgba(45, 212, 191, ${pulse * 0.2})`;
             ctx.fillRect(x + 10, y + 10, 20, 20);
         } else {
             ctx.strokeStyle = `rgba(148, 163, 184, 0.05)`; // Slate 400 very faint
             ctx.strokeRect(x + 2, y + 2, 36, 36);
         }
      }

      // Scanline
      const scanY = (frame * 2) % h;
      ctx.fillStyle = 'rgba(45, 212, 191, 0.1)';
      ctx.fillRect(0, scanY, w, 2);

      frame++;
      requestAnimationFrame(draw);
    };

    const anim = requestAnimationFrame(draw);

    const handleResize = () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(anim);
    }
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-40 pointer-events-none" />;
};

export default NexusCanvas;
