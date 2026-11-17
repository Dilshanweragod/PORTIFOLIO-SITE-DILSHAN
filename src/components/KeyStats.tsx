import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { keyMilestones, MilestoneStat } from '../data/experience';
import { calculateCountUpValue } from '../utils/portfolioLogic';

interface AnimatedStatCardProps {
  stat: MilestoneStat;
  index: number;
  shouldAnimate: boolean;
}

const AnimatedStatCard: React.FC<AnimatedStatCardProps> = ({
  stat,
  index,
  shouldAnimate
}) => {
  const [displayValue, setDisplayValue] = useState<number>(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return stat.value;
    }
    return 0;
  });
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (!shouldAnimate || hasStartedRef.current) return;
    hasStartedRef.current = true;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayValue(stat.value);
      return;
    }

    let rafId = 0;
    const duration = 1200 + index * 120;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      setDisplayValue(calculateCountUpValue(stat.value, progress));

      if (progress < 1) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        setDisplayValue(stat.value);
      }
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [shouldAnimate, stat.value, index]);

  const indexLabel = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      className="group relative rounded-[24px] bg-[#0A0A0A] border border-[#1A1A1A] hover:border-[#FF6A00]/60 p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_36px_rgba(255,106,0,0.1)]"
    >
      <div>
        {/* Clean unboxed editorial metadata */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-500">
          <span className="text-[#FF6A00] font-semibold tabular-nums">{indexLabel}</span>
          <span aria-hidden="true">·</span>
          <span>{stat.context}</span>
        </div>

        {/* Animated Count-Up Number */}
        <div
          className="mt-5 text-4xl sm:text-5xl font-black text-[#FF6A00] font-poppins tracking-tight tabular-nums flex items-baseline"
          aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
        >
          <span>{displayValue}</span>
          <span className="ml-0.5 text-[#FF6A00]">{stat.suffix}</span>
        </div>

        {/* Metric Title */}
        <h3 className="mt-2.5 text-lg font-bold text-white font-poppins tracking-tight group-hover:text-white transition-colors">
          {stat.label}
        </h3>

        {/* Context Description */}
        <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-lato leading-relaxed">
          {stat.detail}
        </p>
      </div>

      {/* Subtle hairline bottom accent bar */}
      <div className="mt-6 pt-4 border-t border-[#1A1A1A] flex items-center justify-between text-[11px] font-mono text-neutral-500">
        <span>Verified Track Record</span>
        <span className="h-[2px] w-12 origin-right scale-x-50 bg-neutral-800 group-hover:scale-x-100 group-hover:bg-[#FF6A00] transition-transform duration-300" />
      </div>
    </motion.article>
  );
};

export const KeyStats: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, amount: 0.15 });

  return (
    <section
      id="stats"
      aria-labelledby="stats-heading"
      className="relative w-full bg-black py-20 lg:py-28 overflow-hidden border-t border-neutral-900/60 scroll-mt-24"
    >
      {/* Subtle Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[340px] bg-[#FF6A00]/6 rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-[#FF6A00] mb-2">
              Career Milestones
            </p>
            <h2
              id="stats-heading"
              className="text-3xl sm:text-5xl font-extrabold text-white font-poppins tracking-tight text-balance"
            >
              Impact By The Numbers
            </h2>
            <div className="w-24 sm:w-28 h-0.5 bg-white mt-3" />
            <p className="mt-4 text-sm sm:text-base text-neutral-400 font-lato leading-relaxed">
              Consistent creative execution across brand identities, commercial photography, video production, and growth campaigns.
            </p>
          </motion.div>

          <a
            href="#contact"
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#0A0A0A] hover:bg-[#141414] text-white hover:text-[#FF6A00] border border-[#222222] hover:border-[#FF6A00] transition-all duration-300 text-xs font-semibold uppercase tracking-wider whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00]"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 4-Column Responsive Key Statistics Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {keyMilestones.map((stat, idx) => (
            <AnimatedStatCard
              key={stat.id}
              stat={stat}
              index={idx}
              shouldAnimate={isInView}
            />
          ))}
        </div>

        {/* Quiet Discipline Strip */}
        <div className="mt-10 pt-6 border-t border-neutral-900/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-500 font-mono">
          <div className="flex flex-wrap items-center gap-2">
            <span>Brand Identity</span>
            <span aria-hidden="true">·</span>
            <span>Commercial Photography</span>
            <span aria-hidden="true">·</span>
            <span>Video Production</span>
            <span aria-hidden="true">·</span>
            <span>Digital Marketing</span>
          </div>
          <span className="text-neutral-400">Colombo, Sri Lanka · Worldwide Collaborations</span>
        </div>
      </div>
    </section>
  );
};
