
import React, { useEffect, useRef } from 'react';

interface NexusCanvasProps {
  mode: 'focus' | 'flux';
}

const NexusCanvas: React.FC<NexusCanvasProps> = ({ mode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const isFlux = mode === 'flux';
    const color = isFlux ? '20, 184, 166' : '99, 102, 241'; // Teal vs Indigo
    const speedMult = isFlux ? 1.5 : 0.5;
    const connectionDist = isFlux ? 150 : 200;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * speedMult;
        this.vy = (Math.random() - 0.5) * speedMult;
        this.size = Math.random() * (isFlux ? 2 : 3) + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > w) this.vx = -this.vx;
        if (this.y < 0 || this.y > h) this.vy = -this.vy;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(${color}, 0.5)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    const particleCount = w < 768 ? 40 : 80;

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    const draw = () => {
        ctx.clearRect(0, 0, w, h);
        
        particles.forEach((p, i) => {
            p.update();
            p.draw();

            for (let j = i; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx*dx + dy*dy);

                if (dist < connectionDist) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(${color}, ${1 - dist/connectionDist})`;
                    ctx.lineWidth = isFlux ? 0.5 : 1;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(draw);
    };

    const animId = requestAnimationFrame(draw);

    const handleResize = () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animId);
    };
  }, [mode]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-30 pointer-events-none transition-opacity duration-1000" />;
};

export default NexusCanvas;
