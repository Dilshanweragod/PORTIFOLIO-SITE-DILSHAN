import React, { useEffect, useState } from 'react';
import { calculateScrollProgress } from '../utils/portfolioLogic';

export const ScrollProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const updateProgress = () => {
      rafId = 0;
      const doc = document.documentElement;
      const next = calculateScrollProgress(window.scrollY, doc.scrollHeight, window.innerHeight);
      setProgress(next);
    };

    const scheduleUpdate = () => {
      if (rafId !== 0) return;
      rafId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(scheduleUpdate)
        : null;
    resizeObserver?.observe(document.documentElement);

    return () => {
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      resizeObserver?.disconnect();
    };
  }, []);

  const percentage = Math.round(progress * 100);

  return (
    <div
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percentage}
      className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-neutral-900/60 pointer-events-none"
    >
      <div
        data-testid="scroll-progress-fill"
        className="h-full w-full origin-left bg-gradient-to-r from-[#FF6A00] via-[#FF8533] to-[#FF6A00] shadow-[0_0_12px_rgba(255,106,0,0.65)] will-change-transform"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
};
