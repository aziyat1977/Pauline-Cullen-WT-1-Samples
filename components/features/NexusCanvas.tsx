
import React, { useEffect, useRef } from 'react';

interface NexusCanvasProps {
  mode: 'focus' | 'flux';
}

const NexusCanvas: React.FC<NexusCanvasProps> = ({ mode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    
    // Configuration based on mode
    const isFlux = mode === 'flux';
    const primaryColor = isFlux ? {r: 20, g: 184, b: 166} : {r: 99, g: 102, b: 241}; // Teal vs Indigo
    const particleCount = w < 768 ? 60 : 120; // Increased density
    const connectionDist = 140;
    const mouseDist = 300;

    let particles: Particle[] = [];
    // Initialize mouse off-screen
    const mouse = { x: -1000, y: -1000 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;
      phase: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        // Flux mode is faster/chaotic, Focus is slow/ordered
        const speed = isFlux ? 1.5 : 0.6;
        this.vx = (Math.random() - 0.5) * speed;
        this.vy = (Math.random() - 0.5) * speed;
        this.size = Math.random() * 2.5 + 0.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
        this.phase = Math.random() * Math.PI * 2; // Independent pulse phase
      }

      update() {
        this.phase += 0.03;
        
        // Mouse Interaction Physics
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseDist) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            // Easing function for smoother force application
            const force = (mouseDist - distance) / mouseDist;
            const directionX = forceDirectionX * force * this.density;
            const directionY = forceDirectionY * force * this.density;
            
            if (isFlux) {
                // Flux mode: Repulsion / Chaos
                this.x -= directionX * 2;
                this.y -= directionY * 2;
            } else {
                // Focus mode: Gentle Attraction / Order
                this.x += directionX * 0.5;
                this.y += directionY * 0.5;
            }
        }

        // Natural Movement
        this.x += this.vx;
        this.y += this.vy;

        // Boundary Wrap (Infinite Canvas)
        if (this.x < -50) this.x = w + 50;
        if (this.x > w + 50) this.x = -50;
        if (this.y < -50) this.y = h + 50;
        if (this.y > h + 50) this.y = -50;
      }

      draw() {
        if (!ctx) return;
        // Breathing effect on opacity
        const alpha = (Math.sin(this.phase) * 0.5 + 0.5) * 0.5 + 0.2;
        ctx.fillStyle = `rgba(${primaryColor.r}, ${primaryColor.g}, ${primaryColor.b}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
        particles = [];
        for (let i = 0; i < particleCount; i++) particles.push(new Particle());
    };

    const animate = () => {
        ctx.clearRect(0, 0, w, h);
        
        // Draw Particles & Connections
        for (let i = 0; i < particles.length; i++) {
            let p1 = particles[i];
            p1.update();
            p1.draw();

            // Connect nearby particles
            for (let j = i; j < particles.length; j++) {
                let p2 = particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDist) {
                    ctx.beginPath();
                    // Alpha based on distance
                    const opacity = 1 - (dist / connectionDist);
                    ctx.strokeStyle = `rgba(${primaryColor.r}, ${primaryColor.g}, ${primaryColor.b}, ${opacity * 0.3})`;
                    ctx.lineWidth = opacity * 0.8; 
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    };

    init();
    const animId = requestAnimationFrame(animate);

    const handleResize = () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        init();
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
        cancelAnimationFrame(animId);
    };
  }, [mode]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-60 pointer-events-none transition-all duration-1000 ease-in-out" />;
};

export default NexusCanvas;
