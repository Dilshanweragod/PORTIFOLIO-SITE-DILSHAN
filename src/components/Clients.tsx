import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';
import { collaborationBrands, promotionalBrands, clientStats, ClientBrand } from '../data/clients';
import { ClientGroupFilter } from '../utils/portfolioLogic';
import { publicAssetUrl } from '../utils/publicAsset';

// Count-up helper for the bottom stats pill bar
const StatPillItem: React.FC<{ value: number; suffix: string; label: string; isLast?: boolean }> = ({
  value,
  suffix,
  label,
  isLast = false
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 'some' });
  const [count, setCount] = useState(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(value);
      return;
    }

    let rafId = 0;
    const duration = 950;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };

    setCount(0);
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, value]);

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center sm:items-start px-4 sm:px-8 py-3 ${
        !isLast ? 'border-b sm:border-b-0 sm:border-r border-neutral-800/80' : ''
      }`}
    >
      <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#FF6A00] font-poppins tracking-tight tabular-nums flex items-baseline">
        <span>{count}</span>
        <span className="text-[#FF6A00] ml-0.5">{suffix}</span>
      </div>
      <span className="text-[11px] sm:text-xs uppercase tracking-wider text-neutral-400 font-bold font-poppins mt-1 text-center sm:text-left">
        {label}
      </span>
    </div>
  );
};

// Uniform uncropped client logo tile inside marquee tracks
const ClientLogoCard: React.FC<{
  brand: ClientBrand;
  isSelected: boolean;
  onSelect: (brand: ClientBrand) => void;
  isDuplicate?: boolean;
}> = ({ brand, isSelected, onSelect, isDuplicate = false }) => {
  return (
    <button
      type="button"
      onClick={() => onSelect(brand)}
      tabIndex={isDuplicate ? -1 : 0}
      aria-hidden={isDuplicate ? true : undefined}
      aria-pressed={isDuplicate ? undefined : isSelected}
      aria-label={isDuplicate ? undefined : `${brand.name}${brand.type ? ` — ${brand.type}` : ''}`}
      className={`group relative w-[176px] sm:w-[210px] h-[94px] sm:h-[112px] p-3.5 sm:p-4 rounded-[16px] bg-[#0A0A0A] border transition-all duration-300 hover:-translate-y-1 flex items-center justify-center shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] ${
        isSelected
          ? 'border-[#FF6A00] shadow-[0_0_20px_rgba(255,106,0,0.4)] -translate-y-1'
          : 'border-[#1A1A1A] hover:border-[#FF6A00] hover:shadow-[0_0_20px_rgba(255,106,0,0.35)]'
      }`}
      title={`${brand.name}${brand.type ? ` — ${brand.type}` : ''}`}
    >
      <div className="w-full h-full flex items-center justify-center px-1.5 py-1">
        <img
          src={publicAssetUrl(brand.logoUrl)}
          alt={isDuplicate ? '' : `${brand.name} official logo`}
          className={`max-h-full max-w-full w-auto h-auto object-contain transition-all duration-300 ${
            isSelected
              ? 'grayscale-0 brightness-110 scale-105'
              : 'filter grayscale group-hover:grayscale-0 group-hover:brightness-110 group-hover:scale-105'
          }`}
          loading="eager"
        />
      </div>
    </button>
  );
};

interface ClientMarqueeRowProps {
  brands: ClientBrand[];
  direction: 'left' | 'right';
  selectedBrandId?: string;
  onSelect: (brand: ClientBrand) => void;
}

const ClientMarqueeRow: React.FC<ClientMarqueeRowProps> = ({
  brands,
  direction,
  selectedBrandId,
  onSelect
}) => {
  const trackClass =
    direction === 'left' ? 'animate-marquee-logos-left' : 'animate-marquee-logos-right';

  return (
    <div className="relative overflow-hidden py-1">
      {/* Left & Right Smooth Fade Scrims */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-20 bg-gradient-to-r from-black via-black/80 to-transparent z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-20 bg-gradient-to-l from-black via-black/80 to-transparent z-10"
        aria-hidden="true"
      />

      <div className={trackClass}>
        <div className="flex items-center gap-4 pr-4 shrink-0">
          {brands.map((brand) => (
            <ClientLogoCard
              key={brand.id}
              brand={brand}
              isSelected={selectedBrandId === brand.id}
              onSelect={onSelect}
            />
          ))}
        </div>
        <div className="flex items-center gap-4 pr-4 shrink-0" aria-hidden="true">
          {brands.map((brand) => (
            <ClientLogoCard
              key={`${brand.id}-dup`}
              brand={brand}
              isSelected={selectedBrandId === brand.id}
              onSelect={onSelect}
              isDuplicate
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface ClientsProps {
  onInquireBrand?: (service: string) => void;
}

export const Clients: React.FC<ClientsProps> = ({ onInquireBrand }) => {
  const [groupFilter, setGroupFilter] = useState<ClientGroupFilter>('all');
  const [selectedBrand, setSelectedBrand] = useState<ClientBrand | null>(null);

  const showCollab = groupFilter === 'all' || groupFilter === 'collab';
  const showPromo = groupFilter === 'all' || groupFilter === 'promo';

  const handleBrandClick = (brand: ClientBrand) => {
    setSelectedBrand((prev) => (prev?.id === brand.id ? null : brand));
  };

  return (
    <section id="clients" className="scroll-mt-20 relative w-full bg-black py-24 lg:py-32 overflow-hidden border-t border-neutral-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title Header + Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-poppins uppercase tracking-wider">
              CLIENTS
            </h2>
            <div className="w-24 sm:w-28 h-0.5 bg-white mt-3" />
          </motion.div>

          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter client groups">
            {[
              { id: 'all' as ClientGroupFilter, label: 'All Brands', count: collaborationBrands.length + promotionalBrands.length },
              { id: 'collab' as ClientGroupFilter, label: 'Collaboration', count: collaborationBrands.length },
              { id: 'promo' as ClientGroupFilter, label: 'Promotional', count: promotionalBrands.length }
            ].map((tab) => {
              const isActive = groupFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setGroupFilter(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#FF6A00] text-black shadow-lg shadow-[#FF6A00]/20'
                      : 'bg-[#0E0E0E] text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 rounded-full font-mono tabular-nums ${
                      isActive ? 'bg-black/20 text-black' : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Selected Brand Spotlight */}
        <AnimatePresence>
          {selectedBrand && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="mb-12 p-5 sm:p-6 rounded-[24px] bg-[#0A0A0A] border border-[#FF6A00]/50 shadow-[0_12px_35px_rgba(255,106,0,0.12)] flex flex-col sm:flex-row sm:items-center justify-between gap-5"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-20 h-14 rounded-xl bg-[#121212] border border-neutral-800 p-2 flex items-center justify-center shrink-0">
                  <img
                    src={publicAssetUrl(selectedBrand.logoUrl)}
                    alt={selectedBrand.name}
                    className="max-h-full max-w-full w-auto h-auto object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-[#FF6A00]">
                    <span>
                      {selectedBrand.category === 'collab'
                        ? 'Collaboration Marketing'
                        : 'Promotional Project'}
                    </span>
                    {selectedBrand.type && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-neutral-400">{selectedBrand.type}</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white font-poppins truncate">
                    {selectedBrand.name}
                  </h3>
                  {selectedBrand.collaborationNote && (
                    <p className="text-xs sm:text-sm text-neutral-400 font-lato mt-0.5">
                      {selectedBrand.collaborationNote}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => onInquireBrand?.('Digital Marketing')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FF6A00] hover:bg-[#ff7a1a] text-black font-bold text-xs uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>Inquire Similar</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedBrand(null)}
                  aria-label="Close brand details"
                  className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Group 1: 11 Collaboration Marketing Brands (Left Marquee) */}
        {showCollab && (
          <div className="mb-14">
            <div className="flex items-center justify-between gap-4 mb-5">
              <div className="flex items-center gap-2.5">
                <h3 className="text-sm sm:text-base font-extrabold text-white font-poppins tracking-wider uppercase">
                  COLLABORATION MARKETING BRANDS
                </h3>
                <span className="text-xs font-mono text-neutral-400 ml-1 tabular-nums">
                  ({collaborationBrands.length})
                </span>
              </div>
              <span className="hidden sm:inline text-[11px] font-mono text-neutral-400">
                Hover or click any brand
              </span>
            </div>

            <ClientMarqueeRow
              brands={collaborationBrands}
              direction="left"
              selectedBrandId={selectedBrand?.id}
              onSelect={handleBrandClick}
            />
          </div>
        )}

        {/* Group 2: 11 Promotional Projects Collab Brands (Right Marquee) */}
        {showPromo && (
          <div className="mb-20">
            <div className="flex items-center justify-between gap-4 mb-5">
              <div className="flex items-center gap-2.5">
                <h3 className="text-sm sm:text-base font-extrabold text-white font-poppins tracking-wider uppercase">
                  PROMOTIONAL PROJECTS COLLAB BRANDS
                </h3>
                <span className="text-xs font-mono text-neutral-400 ml-1 tabular-nums">
                  ({promotionalBrands.length})
                </span>
              </div>
              <span className="hidden sm:inline text-[11px] font-mono text-neutral-400">
                Hover or click any brand
              </span>
            </div>

            <ClientMarqueeRow
              brands={promotionalBrands}
              direction="right"
              selectedBrandId={selectedBrand?.id}
              onSelect={handleBrandClick}
            />
          </div>
        )}

        {/* ROUNDED STATS BAR */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-[32px] bg-gradient-to-r from-[#0A0A0A] via-[#111111] to-[#0A0A0A] border border-neutral-800/80 p-4 sm:p-6 shadow-2xl shadow-black/80"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-0">
            {clientStats.map((stat, idx) => (
              <StatPillItem
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                isLast={idx === clientStats.length - 1}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
