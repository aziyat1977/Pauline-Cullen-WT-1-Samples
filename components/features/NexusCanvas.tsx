
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

    const particles: Particle[] = [];
    const particleCount = Math.min(100, Math.floor((w * h) / 15000)); // Responsive density
    const connectionDistance = 150;
    let mouse = { x: -1000, y: -1000 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      depth: number; // Simulate Z-axis for parallax

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.depth = Math.random() * 2 + 0.5; // 0.5 to 2.5
        this.size = Math.random() * 1.5 + 0.5;
      }

      update() {
        this.x += this.vx * this.depth;
        this.y += this.vy * this.depth;

        // Bounce
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;

        // Mouse Repel
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 200) {
            const force = (200 - dist) / 200;
            this.x -= (dx / dist) * force * 2 * this.depth;
            this.y -= (dy / dist) * force * 2 * this.depth;
        }
      }

      draw() {
        if (!ctx) return;
        const opacity = (this.depth - 0.5) / 2; // Closer = brighter
        ctx.fillStyle = `rgba(45, 212, 191, ${opacity * 0.5})`; // Teal
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * this.depth, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Init
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    const draw = () => {
        // Trail effect
        ctx.fillStyle = 'rgba(2, 6, 23, 0.1)'; // Dark slate with trail
        ctx.fillRect(0, 0, w, h);

        particles.forEach((p, i) => {
            p.update();
            p.draw();

            // Connections (Neural Pathways)
            for (let j = i; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDistance) {
                    const alpha = (1 - dist / connectionDistance) * 0.15;
                    ctx.strokeStyle = `rgba(45, 212, 191, ${alpha})`;
                    ctx.lineWidth = 0.5 * p.depth;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });

        // Scanline overlay
        const time = Date.now() * 0.0005;
        const scanY = (time * 100) % h;
        ctx.fillStyle = 'rgba(45, 212, 191, 0.03)';
        ctx.fillRect(0, scanY, w, 2);

        requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-100 pointer-events-none mix-blend-screen" />;
};

export default NexusCanvas;
