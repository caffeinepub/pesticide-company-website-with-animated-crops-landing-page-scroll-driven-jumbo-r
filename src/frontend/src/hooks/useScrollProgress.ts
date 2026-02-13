import { useEffect, useState, RefObject } from 'react';

export function useScrollProgress(containerRef: RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Calculate progress based on how much of the container has scrolled past the top
      const scrolled = -rect.top;
      const scrollableHeight = containerHeight - viewportHeight;

      if (scrollableHeight <= 0) {
        setProgress(0);
        return;
      }

      const rawProgress = scrolled / scrollableHeight;
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));
      setProgress(clampedProgress);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [containerRef]);

  return progress;
}
