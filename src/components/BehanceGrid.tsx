import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowUpRight,
  ExternalLink,
  Layers,
  Camera,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { behanceWorks, BehanceCategory, BehanceWorkItem, BEHANCE_PROFILE_URL } from '../data/behance';
import { photographyProjects, PhotographyProject } from '../data/photography';
import {
  filterBehanceItems,
  partitionPhotographyByOrientation,
  getPhotographyFrameClasses
} from '../utils/portfolioLogic';
import { LazyImage } from './LazyImage';
import { publicAssetUrl } from '../utils/publicAsset';

interface BehanceGridProps {
  onInquireStyle?: (discipline: string) => void;
}

export type PortfolioCategory = BehanceCategory | 'Photography';

const portfolioCategories: PortfolioCategory[] = [
  'All',
  'Digital Marketing & Social',
  'UI/UX & Websites',
  'Branding & Graphic Design',
  'Packaging & Print',
  'Photography'
];

type LightboxItem =
  | { kind: 'behance'; data: BehanceWorkItem }
  | { kind: 'photography'; data: PhotographyProject };

export const BehanceGrid: React.FC<BehanceGridProps> = ({ onInquireStyle }) => {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('All');
  const [selectedLightbox, setSelectedLightbox] = useState<LightboxItem | null>(null);

  const visibleItems =
    activeCategory === 'Photography' ? [] : filterBehanceItems(behanceWorks, activeCategory);
  const { horizontalFrames, portraitFrames } = partitionPhotographyByOrientation(photographyProjects);

  const activeList: LightboxItem[] =
    activeCategory === 'Photography'
      ? photographyProjects.map((data) => ({ kind: 'photography', data }))
      : visibleItems.map((data) => ({ kind: 'behance', data }));

  const navigateLightbox = useCallback(
    (direction: -1 | 1) => {
      if (!selectedLightbox || activeList.length <= 1) return;
      const idx = activeList.findIndex((entry) => entry.data.id === selectedLightbox.data.id);
      if (idx === -1) return;
      const nextIdx = (idx + direction + activeList.length) % activeList.length;
      setSelectedLightbox(activeList[nextIdx]);
    },
    [selectedLightbox, activeList]
  );

  useEffect(() => {
    if (!selectedLightbox) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedLightbox(null);
      } else if (event.key === 'ArrowLeft') {
        navigateLightbox(-1);
      } else if (event.key === 'ArrowRight') {
        navigateLightbox(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedLightbox, navigateLightbox]);

  const getCategoryCount = (cat: PortfolioCategory) => {
    if (cat === 'Photography') return photographyProjects.length;
    if (cat === 'All') return behanceWorks.length;
    return behanceWorks.filter((item) => item.discipline === cat).length;
  };

  const renderPhotographyCard = (
    project: PhotographyProject,
    idx: number,
    aspectOverride: string
  ) => {
    const { objectPositionClass } = getPhotographyFrameClasses(
      project.aspect,
      project.focalPosition,
      'category'
    );

    return (
      <motion.article
        key={project.id}
        layout
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.4, delay: idx * 0.05 }}
        exit={{ opacity: 0, scale: 0.97 }}
        className="group rounded-[22px] bg-[#0A0A0A] border border-neutral-900 hover:border-[#FF6A00]/60 transition-colors duration-300 overflow-hidden flex flex-col justify-between shadow-2xl"
      >
        <div>
          <button
            type="button"
            onClick={() => setSelectedLightbox({ kind: 'photography', data: project })}
            aria-label={`Preview ${project.title}`}
            className={`relative block ${aspectOverride} w-full bg-[#060606] overflow-hidden border-b border-neutral-900 cursor-zoom-in text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00]`}
          >
            <LazyImage
              src={project.imageUrl}
              alt={project.title}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover ${objectPositionClass} group-hover:scale-[1.03] transition-transform duration-500`}
            />
            <span
              aria-hidden="true"
              className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-sm border border-white/10 text-[10px] font-mono uppercase tracking-wider text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
            >
              <Maximize2 className="w-3 h-3 text-[#FF6A00]" />
              <span>Preview</span>
            </span>
          </button>

          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-2 text-[11px] font-mono mb-2">
              <span className="text-[#FF6A00] truncate">
                {project.categoryLabel} · {project.photoCount}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white font-poppins group-hover:text-[#FF6A00] transition-colors leading-snug">
              {project.title}
            </h3>
            <p className="mt-1 text-xs font-mono text-neutral-400 truncate">{project.client}</p>
            <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-lato leading-relaxed line-clamp-2">
              {project.summary}
            </p>
          </div>
        </div>

        <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-neutral-900/90 flex items-center justify-between gap-3">
          <a
            href={project.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF6A00] hover:underline font-mono whitespace-nowrap"
          >
            <span>View on Facebook</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={() => onInquireStyle?.('Commercial Photography')}
            className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            Inquire Similar
          </button>
        </div>
      </motion.article>
    );
  };

  return (
    <section
      id="behance"
      className="scroll-mt-20 relative w-full bg-black py-24 lg:py-28 overflow-hidden border-t border-neutral-900/60"
    >
      {/* Subtle Ambient Glow */}
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#FF6A00]/8 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header & External Behance Profile CTA */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF6A00] mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>@dilshanweragoda · Visual Archive</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-poppins uppercase tracking-wider">
              PORTFOLIO WORK GRID
            </h2>
            <div className="w-24 sm:w-28 h-0.5 bg-white mt-3" />
            <p className="mt-4 text-sm sm:text-base text-neutral-400 font-lato leading-relaxed">
              Curated shots across mobile interfaces, gaming web stores, connected apparel marks, packaging die-lines, tactile print collateral, and official commercial photography projects.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="flex flex-wrap items-center gap-3 shrink-0"
          >
            <a
              href={BEHANCE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#FF6A00] hover:bg-[#ff7a1a] text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_24px_rgba(255,106,0,0.3)] hover:shadow-[0_0_32px_rgba(255,106,0,0.5)] transition-all duration-300 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span className="font-black text-sm leading-none">Bē</span>
              <span>Follow on Behance</span>
              <ExternalLink className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>

        {/* Portfolio & Discipline Filter Tabs */}
        <div
          className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10"
          role="tablist"
          aria-label="Filter portfolio work grid by discipline"
        >
          {portfolioCategories.map((cat) => {
            const isActive = activeCategory === cat;
            const count = getCategoryCount(cat);

            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-300 flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] ${
                  isActive
                    ? 'bg-[#FF6A00] text-black shadow-lg shadow-[#FF6A00]/25'
                    : cat === 'Photography'
                    ? 'bg-[#150F0A] text-[#FF8533] hover:text-white border border-[#FF6A00]/40 hover:border-[#FF6A00]'
                    : 'bg-[#0E0E0E] text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {cat === 'Photography' && (
                  <Camera className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-[#FF6A00]'}`} />
                )}
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 rounded-full font-mono tabular-nums ${
                    isActive ? 'bg-black/20 text-black' : 'bg-neutral-800 text-neutral-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Category Notification Banner when Photography is active */}
        {activeCategory === 'Photography' && (
          <div className="mb-8 p-4 rounded-xl bg-[#0F0A05] border border-[#FF6A00]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-xs text-neutral-300">
              <Camera className="w-4 h-4 text-[#FF6A00] shrink-0" />
              <span>
                Displaying <strong className="text-white">{photographyProjects.length} Photography Projects</strong> arranged by orientation. Click any photograph to inspect full-screen.
              </span>
            </div>
            <a
              href="#photography"
              className="text-xs font-mono uppercase tracking-wider text-[#FF6A00] hover:underline flex items-center gap-1 shrink-0"
            >
              <span>Browse by Discipline</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Card Showcase Grid with Scroll-Reveal Motion */}
        {activeCategory === 'Photography' ? (
          <div className="space-y-10">
            {/* Landscape, Event Collages & Architectural (9 works -> exact 3x3 grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <AnimatePresence mode="popLayout">
                {horizontalFrames.map((project, idx) =>
                  renderPhotographyCard(project, idx, 'aspect-[4/3]')
                )}
              </AnimatePresence>
            </div>

            {/* Vertical Studio & Fashion Portraits (2 works -> symmetrical 2-col 4:5 portrait pair) */}
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-5">
                Editorial &amp; Studio Portraits <span className="text-[#FF6A00]">({portraitFrames.length})</span>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                <AnimatePresence mode="popLayout">
                  {portraitFrames.map((project, idx) =>
                    renderPhotographyCard(project, idx + horizontalFrames.length, 'aspect-[4/5]')
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 ${
              visibleItems.length === 1
                ? 'lg:grid-cols-2'
                : visibleItems.length === 2
                ? 'lg:grid-cols-2'
                : 'lg:grid-cols-3'
            }`}
          >
            <AnimatePresence mode="popLayout">
              {visibleItems.map((item, idx) => (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="group rounded-[22px] bg-[#0A0A0A] border border-neutral-900 hover:border-[#FF6A00]/60 transition-colors duration-300 overflow-hidden flex flex-col justify-between shadow-2xl"
                >
                  <div>
                    <button
                      type="button"
                      onClick={() => setSelectedLightbox({ kind: 'behance', data: item })}
                      aria-label={`Preview ${item.title}`}
                      className="relative block aspect-[16/10] w-full bg-[#060606] overflow-hidden border-b border-neutral-900 cursor-zoom-in text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00]"
                    >
                      <LazyImage
                        src={item.imageUrl}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-sm border border-white/10 text-[10px] font-mono uppercase tracking-wider text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                      >
                        <Maximize2 className="w-3 h-3 text-[#FF6A00]" />
                        <span>Preview</span>
                      </span>
                    </button>

                    <div className="p-5 sm:p-6">
                      <div className="flex items-center gap-2 text-[11px] font-mono mb-2">
                        <span className="text-[#FF6A00] truncate">
                          {item.discipline} · {item.scope}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white font-poppins group-hover:text-[#FF6A00] transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-lato leading-relaxed line-clamp-2">
                        {item.summary}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-neutral-900/90 flex items-center justify-between gap-3">
                    <a
                      href={item.behanceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF6A00] hover:underline font-mono whitespace-nowrap"
                    >
                      <span>View on Behance</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={() => onInquireStyle?.(item.discipline)}
                      className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Inquire Similar
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Unified Full-Screen Lightbox Modal for Both Behance & Photography Works */}
      {selectedLightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedLightbox.data.title}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedLightbox(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[11px] font-mono uppercase tracking-wider text-[#FF6A00] truncate">
                  {selectedLightbox.kind === 'photography'
                    ? `${selectedLightbox.data.categoryLabel} · ${selectedLightbox.data.client} · ${selectedLightbox.data.photoCount}`
                    : `${selectedLightbox.data.discipline} · ${selectedLightbox.data.scope}`}
                </p>
                <h3 className="text-sm sm:text-lg font-bold text-white font-poppins truncate">
                  {selectedLightbox.data.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {activeList.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => navigateLightbox(-1)}
                      aria-label="Previous work"
                      className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 hover:text-white cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateLightbox(1)}
                      aria-label="Next work"
                      className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 hover:text-white cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedLightbox(null)}
                  aria-label="Close lightbox"
                  className="inline-flex items-center gap-1.5 text-neutral-200 hover:text-white text-xs font-mono uppercase tracking-wider px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-xl cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Close [ESC]</span>
                </button>
              </div>
            </div>

            <div className="w-full flex items-center justify-center rounded-2xl bg-[#050505] border border-neutral-800/80 p-2 sm:p-3 overflow-hidden">
              <img
                src={publicAssetUrl(selectedLightbox.data.imageUrl)}
                alt={selectedLightbox.data.title}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto max-w-full rounded-xl object-contain"
              />
            </div>

            <div className="w-full flex flex-col gap-3 pt-1">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="max-w-3xl space-y-1.5">
                  <p className="text-xs sm:text-sm text-neutral-300 font-lato leading-relaxed">
                    {selectedLightbox.data.summary}
                  </p>
                  {selectedLightbox.kind === 'behance' && (
                    <div className="space-y-1.5 pt-1 text-xs font-lato text-neutral-400">
                      <p>
                        <strong className="text-neutral-200 font-semibold">Objective: </strong>
                        {selectedLightbox.data.objectives}
                      </p>
                      <p>
                        <strong className="text-neutral-200 font-semibold">Responsibilities: </strong>
                        {selectedLightbox.data.responsibilities.join(' · ')}
                      </p>
                      <p className="font-mono text-[11px] text-[#FF8533]">
                        Tools: {selectedLightbox.data.toolsUsed.join(' · ')}
                      </p>
                    </div>
                  )}
                </div>

                <a
                  href={
                    selectedLightbox.kind === 'photography'
                      ? selectedLightbox.data.facebookUrl
                      : selectedLightbox.data.behanceUrl
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF6A00] hover:underline font-mono shrink-0"
                >
                  <span>
                    {selectedLightbox.kind === 'photography'
                      ? 'View Full Album on Facebook'
                      : 'View Full Project on Behance'}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
