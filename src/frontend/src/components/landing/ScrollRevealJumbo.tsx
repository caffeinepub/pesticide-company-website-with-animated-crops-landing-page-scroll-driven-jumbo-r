import { useScrollProgress } from '../../hooks/useScrollProgress';
import { useRef } from 'react';

export default function ScrollRevealJumbo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(containerRef);

  const opacity = Math.min(progress * 2, 1);
  const scale = 0.8 + progress * 0.2;
  const translateY = (1 - progress) * 100;

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh] bg-gradient-to-b from-background to-muted/50"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div
          className="text-center px-4 transition-all duration-300"
          style={{
            opacity,
            transform: `scale(${scale}) translateY(${translateY}px)`,
          }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <img
                src="/assets/generated/product-jumbo-packshot.dim_800x800.png"
                alt="Jumbo Product"
                className="w-64 h-64 md:w-96 md:h-96 mx-auto object-contain drop-shadow-2xl"
              />
            </div>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-primary">
              Jumbo
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              High-end pressure switch technology for precision agriculture. Digital display for instant, reliable pressure value readout.
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-sm md:text-base">
              <div className="px-6 py-3 bg-primary/10 rounded-full">
                <span className="font-semibold">Range:</span> 0.3 - 4 bar
              </div>
              <div className="px-6 py-3 bg-primary/10 rounded-full">
                <span className="font-semibold">Certified</span>
              </div>
              <div className="px-6 py-3 bg-primary/10 rounded-full">
                <span className="font-semibold">Digital Display</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
