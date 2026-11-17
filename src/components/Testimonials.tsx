import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Quote, Star, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { testimonials, Testimonial } from '../data/testimonials';
import { publicAssetUrl } from '../utils/publicAsset';

export const Testimonials: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = testimonials.length;

  // Autoplay 6s timer, paused on hover, focus, or reduced-motion preference
  useEffect(() => {
    if (isPaused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % total);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, total]);

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % total);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  const getVisibleItems = (): Testimonial[] => {
    const items: Testimonial[] = [];
    for (let i = 0; i < 3; i++) {
      items.push(testimonials[(startIndex + i) % total]);
    }
    return items;
  };

  const visibleItems = getVisibleItems();

  return (
    <section
      id="testimonials"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      className="relative w-full bg-black py-24 lg:py-32 overflow-hidden border-t border-neutral-900/60"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title Header with Underline and Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-poppins uppercase tracking-wider">
              CLIENT ENDORSEMENTS
            </h2>
            <div className="w-24 sm:w-28 h-0.5 bg-white mt-3" />
            <p className="text-sm sm:text-base text-neutral-400 font-lato mt-4">
              What brands say about working with me.
            </p>
          </motion.div>

          {/* Carousel Arrows & Indicator */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              className="p-3 rounded-full bg-[#0A0A0A] hover:bg-[#1A1A1A] text-neutral-300 hover:text-[#FF6A00] border border-[#1A1A1A] hover:border-[#FF6A00]/50 transition-all active:scale-95 shadow-md cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1.5 px-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setStartIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  aria-pressed={idx === startIndex}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === startIndex
                      ? 'w-6 bg-[#FF6A00]'
                      : 'w-2 bg-neutral-800 hover:bg-neutral-600'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="p-3 rounded-full bg-[#0A0A0A] hover:bg-[#1A1A1A] text-neutral-300 hover:text-[#FF6A00] border border-[#1A1A1A] hover:border-[#FF6A00]/50 transition-all active:scale-95 shadow-md cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Grid (3 desktop, 2 tablet, 1 mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {visibleItems.map((item, idx) => {
            const isDesktopOnly = idx === 2;
            const isTabletOnly = idx === 1;

            return (
              <motion.div
                key={`${item.id}-${startIndex}-${idx}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className={`rounded-[24px] bg-[#0A0A0A] border border-[#1A1A1A] p-6 sm:p-8 flex flex-col justify-between hover:border-[#FF6A00]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(255,106,0,0.12)] ${
                  isDesktopOnly ? 'hidden lg:flex' : isTabletOnly ? 'hidden md:flex' : 'flex'
                }`}
              >
                {/* Top: Orange Quote Icon & 5-Star Rating */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-full bg-[#FF6A00]/10 border border-[#FF6A00]/25 flex items-center justify-center text-[#FF6A00]">
                      <Quote className="w-5 h-5 fill-[#FF6A00]" />
                    </div>
                    <div className="flex items-center gap-1" aria-label={`${item.rating} out of 5 stars`}>
                      {[...Array(item.rating)].map((_, starIdx) => (
                        <Star
                          key={starIdx}
                          className="w-4 h-4 fill-[#FF6A00] text-[#FF6A00]"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 mb-3">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-[#FF6A00]/90">
                      {item.service}
                    </p>
                    {item.date && (
                      <span className="text-[10px] font-mono text-neutral-400 shrink-0">
                        {item.date}
                      </span>
                    )}
                  </div>

                  {/* Quote Body */}
                  <blockquote className="text-neutral-300 font-space text-sm sm:text-base leading-relaxed mb-6 italic">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                </div>

                {/* Bottom: Client Logo, Name & Role/Brand */}
                <div className="pt-5 border-t border-[#1A1A1A] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-[#121212] border border-[#222222] p-1.5 flex items-center justify-center shrink-0 overflow-hidden">
                      <img
                        src={publicAssetUrl(item.brandLogo)}
                        alt={`${item.company} logo`}
                        className="max-h-full max-w-full object-contain filter brightness-110"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-white font-poppins leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-xs text-neutral-400 font-lato truncate">
                        {item.verifiedLabel ? (
                          <span className="text-[#FF6A00]">{item.verifiedLabel}</span>
                        ) : (
                          <>
                            {item.role} • <span className="text-[#FF6A00]">{item.company}</span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom stats line: "90% Customer Satisfaction" */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 py-4 px-6 rounded-full bg-[#0A0A0A] border border-[#1A1A1A] max-w-md mx-auto text-center"
        >
          <Award className="w-5 h-5 text-[#FF6A00] shrink-0" />
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-neutral-300 font-poppins">
            <strong className="text-[#FF6A00] font-extrabold text-base sm:text-lg mr-1.5 tabular-nums">90%</strong>
            Customer Satisfaction Across 100+ Projects
          </span>
        </motion.div>
      </div>
    </section>
  );
};
