import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import {
  ArrowDown,
  ArrowUpRight,
  Briefcase,
  Download,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import {
  experiences,
  education,
  approaches,
  aboutStats
} from '../data/experience';
import { heroSocialLinks } from '../data/socials';
import { SocialIcon } from './SocialIcon';
import { ToolsSection } from './ToolsSection';
import { publicAssetUrl } from '../utils/publicAsset';

// Helper component for count-up numbers in stats with instant mount/reduced-motion support
const CountUpStat: React.FC<{ end: number; suffix: string; label: string }> = ({
  end,
  suffix,
  label
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 'some' });
  const [count, setCount] = useState(end);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    let rafId = 0;
    const duration = 900;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    setCount(0);
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, end]);

  return (
    <div ref={ref} className="flex flex-col">
      <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#FF6A00] font-poppins tracking-tight tabular-nums flex items-baseline">
        <span>{count}</span>
        <span className="text-[#FF6A00] ml-0.5">{suffix}</span>
      </div>
      <div className="text-[11px] sm:text-xs text-neutral-400 mt-0.5 font-space tracking-wide">
        {label}
      </div>
    </div>
  );
};

interface HomeProps {
  onOpenResume?: () => void;
  onOpenToolsModal?: () => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenResume, onOpenToolsModal }) => {

  return (
    <section
      id="home"
      className="relative isolate w-full bg-black overflow-hidden pt-24 pb-20 sm:pb-28 lg:pt-32"
    >
      {/* 1. Ambient Glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-25"
        style={{
          backgroundImage: `radial-gradient(ellipse at 85% 20%, rgba(255, 106, 0, 0.16) 0%, transparent 55%),
                            radial-gradient(ellipse at 15% 65%, rgba(255, 255, 255, 0.04) 0%, transparent 60%)`
        }}
      />

      {/* 3. Floating Geometric Glass Crystals & Shards */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        {/* Shard Group 1: Top Right */}
        <svg
          className="hidden sm:block absolute -top-10 -right-10 w-[600px] h-[550px] animate-shard-1 opacity-60"
          viewBox="0 0 600 550"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="home-shard-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#252525" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#080808" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="home-shard-stroke-orange" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6A00" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <polygon
            points="380,40 540,160 460,340 280,240"
            fill="url(#home-shard-grad-1)"
            stroke="url(#home-shard-stroke-orange)"
            strokeWidth="1.2"
          />
          <polygon
            points="240,110 370,190 320,310 190,220"
            fill="#0F0F0F"
            fillOpacity="0.5"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="0.8"
          />
        </svg>

        {/* Shard Group 2: Center Ambient */}
        <svg
          className="hidden sm:block absolute top-1/3 left-1/4 w-[450px] h-[400px] animate-shard-2 opacity-35"
          viewBox="0 0 450 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <polygon
            points="120,60 310,130 250,290 80,210"
            fill="#121212"
            fillOpacity="0.6"
            stroke="rgba(255,255,255,0.09)"
            strokeWidth="1"
          />
          <polygon
            points="290,140 410,210 360,320 260,280"
            fill="#181818"
            fillOpacity="0.4"
            stroke="rgba(255,106,0,0.3)"
            strokeWidth="0.8"
          />
        </svg>

        {/* Shard Group 3: Bottom Left Ambient */}
        <svg
          className="hidden sm:block absolute bottom-10 -left-10 w-[550px] h-[450px] animate-shard-3 opacity-45"
          viewBox="0 0 550 450"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <polygon
            points="180,90 420,180 340,410 110,320"
            fill="#0D0D0D"
            fillOpacity="0.7"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1.2"
          />
        </svg>
      </div>

      {/* TOP HERO & BIO: 1440px 12-Column Grid Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column (cols 1-5): B&W Portrait inside Arch Card */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            {/* Arch-shaped Dark Card (#0A0A0A, 1px #222 border) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative z-10 w-full max-w-sm sm:max-w-md rounded-t-[140px] rounded-b-[36px] p-2 bg-gradient-to-b from-[#141414] via-[#0D0D0D] to-[#0A0A0A] border border-[#222222] shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden group"
            >
              <div className="relative w-full aspect-[3/4] rounded-t-[136px] rounded-b-[30px] overflow-hidden bg-neutral-950">
                <img
                  src={publicAssetUrl('/assets/extracted/portrait.png')}
                  alt="Pasindu Dilshan (Dilshan Weragoda) portrait — Digital Marketing Specialist & Creative Strategist"
                  width={810}
                  height={1360}
                  fetchPriority="high"
                  decoding="sync"
                  className="w-full h-full object-cover object-top grayscale contrast-110 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent opacity-85" />

                {/* Clean Attribution Plate */}
                <div className="absolute bottom-5 left-5 right-5 p-3.5 rounded-2xl bg-[#0A0A0A]/90 backdrop-blur-md border border-[#222222] flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-widest text-[#FF6A00] font-semibold font-mono truncate">
                      Digital Marketing &amp; Creative Lead
                    </p>
                    <p className="text-xs font-bold text-white font-poppins truncate">
                      Pasindu Dilshan
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 shrink-0">
                    Colombo, LK
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column (cols 6-12): All left-aligned to one vertical line */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 min-w-0">
            {/* 1. Identity & Positioning */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="space-y-1.5"
            >
              <p className="text-xs sm:text-sm uppercase tracking-widest text-[#FF6A00] font-mono font-semibold">
                Digital Marketing Specialist &amp; Creative Strategist
              </p>
              <p className="text-base sm:text-lg lg:text-xl font-semibold tracking-wide text-neutral-200 font-poppins">
                Pasindu Dilshan <span className="text-xs text-neutral-400 font-normal">· Dilshan Weragoda</span>
              </p>
            </motion.div>

            {/* 2. Headline in Poppins — immediate visible LCP with clean flat wrapping */}
            <h1 className="font-poppins font-extrabold tracking-tight text-2xl sm:text-5xl md:text-[3.25rem] xl:text-[3.75rem] leading-[1.15] text-white max-w-full">
              Strategy. <span className="text-[#9A9A9A]">Design. Visuals.</span>
              <br />
              Digital Growth.
            </h1>

            {/* 3. Compelling Professional Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="text-neutral-400 font-space text-sm sm:text-base leading-relaxed max-w-xl"
            >
              Helping brands scale with{' '}
              <strong className="text-white font-semibold">
                data-driven digital marketing, search &amp; Meta advertising, graphic design, video editing, and commercial photography
              </strong>{' '}
              — uniting creative storytelling, SEO visibility, and AI-powered production workflows.
            </motion.p>

            {/* 4. Stats Row with Thin Vertical Dividers and Count-Up */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
              className="grid grid-cols-3 gap-3 sm:gap-6 py-4 px-4 sm:px-6 rounded-2xl bg-[#0A0A0A] border border-[#1A1A1A] w-full max-w-lg"
            >
              {aboutStats.map((stat, idx) => (
                <div
                  key={stat.label}
                  className={idx < 2 ? 'border-r border-[#1A1A1A] pr-3 sm:pr-6' : ''}
                >
                  <CountUpStat end={stat.value} suffix={stat.suffix} label={stat.label} />
                </div>
              ))}
            </motion.div>

            {/* 5. Primary CTAs (View My Work, Download CV, Hire Me) & Circular Socials */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              <a
                href="#behance"
                className="px-6 py-3 rounded-full bg-[#FF6A00] text-black font-bold text-xs uppercase tracking-wider hover:bg-white transition-all duration-300 shadow-lg shadow-[#FF6A00]/25 active:scale-95 flex items-center gap-2 whitespace-nowrap"
              >
                <span>View My Work</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={() => onOpenResume?.()}
                className="px-5 py-3 rounded-full bg-[#111111] hover:bg-[#1A1A1A] text-white hover:text-[#FF6A00] border border-[#262626] hover:border-[#FF6A00] transition-all duration-300 text-xs font-semibold uppercase tracking-wider active:scale-95 flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Download CV</span>
              </button>

              <a
                href="#contact"
                className="px-5 py-3 rounded-full bg-[#0A0A0A] hover:bg-[#161616] text-neutral-200 hover:text-white border border-[#222222] hover:border-neutral-600 transition-all duration-300 text-xs font-semibold uppercase tracking-wider active:scale-95 whitespace-nowrap"
              >
                Hire Me
              </a>

              {/* Personal Profile + Behance Circular Social Icons */}
              <div className="flex flex-wrap items-center gap-2.5 sm:ml-1">
                {heroSocialLinks.map((s) => (
                  <a
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.ariaLabel}
                    title={s.ariaLabel}
                    className="w-10 h-10 rounded-full border border-[#222222] bg-[#0A0A0A] flex items-center justify-center text-neutral-400 hover:text-[#FF6A00] hover:border-[#FF6A00] hover:shadow-[0_0_15px_rgba(255,106,0,0.4)] transition-all duration-300 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00]"
                  >
                    <SocialIcon platform={s.platform} className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CONTINUOUS HOME SECTION: Below-The-Fold Experience, Studies & Tools */}
      <div id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-16 sm:pt-24 scroll-mt-24">
        {/* Section Subheading inside About */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#FF6A00] font-mono mb-2">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>About Me · Background &amp; Expertise</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-poppins tracking-tight">
            Marketing Strategy Meets Creative Craft
          </h2>
          <div className="w-24 sm:w-28 h-0.5 bg-white mt-3" />
          <p className="mt-4 max-w-3xl text-sm sm:text-base text-neutral-400 font-lato leading-relaxed">
            I bridge performance marketing and visual storytelling — combining digital marketing strategy, social media growth, Google Search &amp; Meta advertising, graphic design, commercial photography, video production, and AI-powered creative workflows to build brands that stand out and convert.
          </p>
          <p className="mt-3 text-xs font-mono text-neutral-300 leading-relaxed">
            Digital Marketing · Social Media Strategy · Search Advertising · Creative Direction · Video Production · Visual Storytelling · AI Workflows
          </p>
        </div>

        {/* Two-Column Row for Experience and Studies/Approach/Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Professional Experience (Left side, cols 1-7) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="flex items-center gap-2 text-white font-poppins font-bold text-lg tracking-wide border-b border-[#1A1A1A] pb-3">
              <Briefcase className="w-4 h-4 text-[#FF6A00]" aria-hidden="true" />
              <span>Professional Experience</span>
            </h3>

            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <div
                  key={i}
                  className="group relative pl-4 border-l border-[#222222] hover:border-[#FF6A00] transition-colors"
                >
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-[#FF6A00] font-bold text-xs sm:text-sm font-mono tracking-tight">
                      {exp.period}
                    </span>
                    <span className="text-neutral-600 text-[11px]">•</span>
                    <span className="text-neutral-400 font-semibold text-xs tracking-tight">
                      {exp.location}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mt-1">
                    {exp.logoUrl && (
                      <div className="h-7 px-2 rounded-md bg-black border border-[#222222] flex items-center justify-center shrink-0">
                        <img
                          src={publicAssetUrl(exp.logoUrl)}
                          alt={`${exp.company} logo`}
                          className="h-4 w-auto object-contain"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <h4 className="text-white font-bold text-sm sm:text-base font-poppins">
                      {exp.company}
                    </h4>
                  </div>
                  <p className="text-[#FF6A00]/90 text-xs font-medium mt-0.5">{exp.role}</p>
                  <p className="text-neutral-400 text-xs sm:text-sm mt-1.5 leading-relaxed font-space">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Studies and My Approach (Right side, cols 8-12) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Studies */}
            <div className="space-y-3">
              <h3 className="flex items-center gap-2 text-white font-poppins font-bold text-base tracking-wide border-b border-[#1A1A1A] pb-3">
                <GraduationCap className="w-4 h-4 text-[#FF6A00]" aria-hidden="true" />
                <span>Studies</span>
              </h3>
              <div className="space-y-4">
                {education.map((edu, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-[#FF6A00] font-bold text-xs font-mono">
                        {edu.startYear} – {edu.endYear}
                      </span>
                      <span className="text-neutral-400 text-xs">{edu.location}</span>
                    </div>
                    <p className="text-neutral-200 text-xs sm:text-sm font-semibold leading-snug">
                      {edu.degree}
                    </p>
                    <p className="text-neutral-400 text-[11px]">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* My Approach */}
            <div className="space-y-3 pt-2">
              <h3 className="text-white font-poppins font-bold text-sm tracking-wide">
                My approach
              </h3>
              <ul className="grid grid-cols-2 gap-2 text-xs text-neutral-300">
                {approaches.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-12">
          <ToolsSection onOpenToolsModal={onOpenToolsModal} />
        </div>

        {/* Tilted Portfolio Collage Strip */}
        <div className="mt-16 pt-10 border-t border-[#1A1A1A]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#FF6A00] font-mono">
                Visual Showcase
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-poppins">
                Curated Snapshot of Creative Work
              </h3>
            </div>
            <a
              href="#behance"
              className="mt-3 sm:mt-0 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-[#FF6A00] flex items-center gap-1 group"
            >
              <span>Explore Behance Grid</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-2xl overflow-hidden border border-[#1A1A1A] bg-neutral-950 p-2 sm:p-4 group shadow-2xl"
          >
            {/* Fixed aspect ratio prevents collapsed card height prior to image paint */}
            <div className="relative aspect-[1780/558] w-full overflow-hidden rounded-xl bg-black">
              <img
                src={publicAssetUrl('/assets/extracted/work_collage_clean.webp')}
                alt="Dilshan Weragoda Creative Portfolio Collage featuring branding, UI/UX, and packaging work"
                width={1780}
                height={558}
                decoding="async"
                className="w-full h-full object-cover transform group-hover:scale-[1.02] transition-transform duration-700"
                loading="eager"
              />
            </div>
            <div className="mt-3 sm:mt-4 px-2 pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs sm:text-sm text-neutral-300 font-medium">
                150+ Brands • 50K+ Video Reach • Identity, Packaging &amp; Motion
              </span>
              <a
                href="#behance"
                className="px-4 py-2 rounded-full bg-[#FF6A00] text-black font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
              >
                View Works
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator to Services */}
        <div className="mt-12 flex justify-between items-center text-xs text-neutral-400 font-mono">
          <a
            href="#services"
            className="inline-flex items-center gap-2 hover:text-[#FF6A00] transition-colors group cursor-pointer"
          >
            <span>DISCOVER SERVICES</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
          </a>
          <span className="hidden sm:inline-block">COLOMBO • SRI LANKA</span>
        </div>
      </div>
    </section>
  );
};
