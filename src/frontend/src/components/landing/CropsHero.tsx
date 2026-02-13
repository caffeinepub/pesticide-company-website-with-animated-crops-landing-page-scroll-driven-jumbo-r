import { useEffect, useRef } from 'react';

export default function CropsHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Load background image
    const bgImage = new Image();
    bgImage.src = '/assets/generated/landing-hero-field.dim_1920x1080.png';

    // Crop elements for animation
    const crops: Array<{
      x: number;
      y: number;
      height: number;
      phase: number;
      speed: number;
      amplitude: number;
    }> = [];

    // Initialize crop positions
    for (let i = 0; i < 80; i++) {
      crops.push({
        x: Math.random() * canvas.width,
        y: canvas.height * 0.4 + Math.random() * canvas.height * 0.4,
        height: 40 + Math.random() * 60,
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 1.5,
        amplitude: 2 + Math.random() * 4,
      });
    }

    let time = 0;

    const animate = () => {
      if (!ctx || !canvas) return;

      time += 0.016;

      // Draw background
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (bgImage.complete) {
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
      }

      // Draw animated crops
      crops.forEach((crop) => {
        const sway = Math.sin(time * crop.speed + crop.phase) * crop.amplitude;
        
        ctx.save();
        ctx.translate(crop.x, crop.y);
        
        // Draw crop stem with sway
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(sway / 2, -crop.height / 2, sway, -crop.height);
        ctx.strokeStyle = `oklch(0.45 0.08 130)`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw crop head
        ctx.beginPath();
        ctx.arc(sway, -crop.height, 4, 0, Math.PI * 2);
        ctx.fillStyle = `oklch(0.55 0.12 110)`;
        ctx.fill();

        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    bgImage.onload = () => {
      animate();
    };

    // Start animation even if image hasn't loaded
    if (bgImage.complete) {
      animate();
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ imageRendering: 'auto' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
            Cultivating Excellence
          </h1>
          <p className="text-xl md:text-2xl text-white/90 drop-shadow-md">
            Premium pesticide solutions for modern agriculture
          </p>
        </div>
      </div>
    </section>
  );
}
