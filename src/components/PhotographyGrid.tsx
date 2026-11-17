import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import {
  Camera,
  ExternalLink,
  ArrowUpRight,
  Sparkles,
  Maximize2,
  FolderOpen,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import {
  photographyProjects,
  photographyCategories,
  photographyArchiveGroups,
  PhotographyCategory,
  PhotographyProject,
  PHOTOGRAPHY_FACEBOOK_URL
} from '../data/photography';
import {
  filterPhotographyProjects,
  filterPhotographyArchive,
  getPhotographyCategoryCounts,
  getPhotographyOverviewCards,
  getPhotographyArchiveTotals,
  partitionPhotographyOverviewRows,
  getPhotographyFrameClasses
} from '../utils/portfolioLogic';
import { SocialIcon } from './SocialIcon';
import { SOCIAL_URLS } from '../data/socials';
import { LazyImage } from './LazyImage';
import { publicAssetUrl } from '../utils/publicAsset';

interface PhotographyGridProps {
  onInquire?: (service: string) => void;
}

interface PhotoCardProps {
  project: PhotographyProject;
  index: number;
  isAllView: boolean;
  frameContext: 'overview-wide' | 'overview-editorial' | 'category';
  aspectOverride?: string;
  onInspect: (project: PhotographyProject) => void;
  onOpenCategory?: (category: Exclude<PhotographyCategory, 'All'>) => void;
  onInquire?: (service: string) => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({
  project,
  index,
  isAllView,
  frameContext,
  aspectOverride,
  onInspect,
  onOpenCategory,
  onInquire
}) => {
  const [imageError, setImageError] = useState(false);
  const { containerClass, objectPositionClass } = getPhotographyFrameClasses(
    project.aspect,
    project.focalPosition,
    frameContext
  );
  const resolvedAspect = aspectOverride ?? containerClass;
  const archiveGroup = photographyArchiveGroups.find((g) => g.id === project.category);
  const totalGroupPhotos = archiveGroup
    ? archiveGroup.albums.reduce((sum, album) => sum + (album.itemCount ?? 0), 0)
    : 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.38, delay: index * 0.05 }}
      className="group rounded-2xl bg-[#0A0A0A] border border-neutral-900 hover:border-[#FF6A00]/60 transition-colors duration-300 overflow-hidden flex flex-col justify-between shadow-2xl"
    >
      <div>
        {/* Unobstructed Full-Bleed Image Frame */}
        <button
          type="button"
          onClick={() => onInspect(project)}
          aria-label={`Inspect ${project.title}`}
          className={`relative block ${resolvedAspect} w-full bg-[#060606] overflow-hidden border-b border-neutral-900 cursor-zoom-in text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00]`}
        >
          {imageError ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-neutral-950 to-neutral-900">
              <Camera className="w-7 h-7 text-[#FF6A00] mb-2" />
              <span className="text-xs font-poppins font-semibold text-neutral-300">
                {project.title}
              </span>
            </div>
          ) : (
            <LazyImage
              src={project.imageUrl}
              alt={project.title}
              referrerPolicy="no-referrer"
              fallback={
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-neutral-950 to-neutral-900">
                  <Camera className="w-7 h-7 text-[#FF6A00] mb-2" />
                  <span className="text-xs font-poppins font-semibold text-neutral-300">
                    {project.title}
                  </span>
                </div>
              }
              className={`w-full h-full object-cover ${objectPositionClass} group-hover:scale-[1.03] transition-transform duration-500`}
            />
          )}

          {/* Subtle corner zoom cue only on hover/focus */}
          <span
            aria-hidden="true"
            className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-sm border border-white/10 text-[10px] font-mono uppercase tracking-wider text-white opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"
          >
            <Maximize2 className="w-3 h-3 text-[#FF6A00]" />
            <span>Preview</span>
          </span>
        </button>

        {/* Clean Unboxed Metadata & Copy Below Image */}
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 text-[11px] font-mono mb-2">
            <span className="text-[#FF6A00] truncate">
              {isAllView && archiveGroup
                ? `${archiveGroup.albums.length} Albums · ${totalGroupPhotos.toLocaleString()} Frames`
                : `${project.categoryLabel} · ${project.photoCount}`}
            </span>
          </div>

          <h4 className="text-base sm:text-lg font-bold text-white font-poppins group-hover:text-[#FF6A00] transition-colors leading-snug">
            {isAllView ? project.categoryLabel : project.title}
          </h4>

          <p className="mt-1 text-xs font-mono text-neutral-400 truncate">{project.client}</p>

          <p className="mt-2.5 text-xs sm:text-sm text-neutral-400 font-lato leading-relaxed line-clamp-2">
            {project.summary}
          </p>

          <p className="mt-3.5 text-[11px] font-mono text-neutral-400 leading-relaxed">
            {project.highlights.join(' · ')}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-neutral-900/90 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        {isAllView && onOpenCategory ? (
          <button
            type="button"
            onClick={() => onOpenCategory(project.category)}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF6A00] hover:underline font-mono whitespace-nowrap cursor-pointer"
          >
            <span>Open Category</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onInspect(project)}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF6A00] hover:underline font-mono whitespace-nowrap cursor-pointer"
          >
            <span>Open Full Frame</span>
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        )}

        <button
          type="button"
          onClick={() => onInquire?.('Commercial Photography')}
          className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
        >
          Inquire Similar
        </button>
      </div>
    </motion.article>
  );
};

interface SplitFeatureCardProps {
  project: PhotographyProject;
  onInspect: (project: PhotographyProject) => void;
  onInquire?: (service: string) => void;
}

const SplitFeatureCard: React.FC<SplitFeatureCardProps> = ({ project, onInspect, onInquire }) => {
  const [imageError, setImageError] = useState(false);
  const { containerClass, objectPositionClass } = getPhotographyFrameClasses(
    project.aspect,
    project.focalPosition,
    'split'
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.42 }}
      className="group rounded-2xl bg-[#0A0A0A] border border-neutral-900 hover:border-[#FF6A00]/60 transition-colors duration-300 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-stretch"
    >
      {/* Left Media Column sized to natural photo proportions */}
      <div
        className={`bg-[#060606] border-b lg:border-b-0 lg:border-r border-neutral-900 overflow-hidden ${
          project.aspect === 'portrait' || project.aspect === 'square' ? 'lg:col-span-4' : 'lg:col-span-7'
        }`}
      >
        <button
          type="button"
          onClick={() => onInspect(project)}
          aria-label={`Inspect ${project.title}`}
          className={`relative block w-full h-full ${containerClass} overflow-hidden cursor-zoom-in text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00]`}
        >
          {imageError ? (
            <div className="w-full h-full min-h-[280px] flex flex-col items-center justify-center p-6 text-center bg-neutral-950">
              <Camera className="w-8 h-8 text-[#FF6A00] mb-2" />
              <span className="text-sm font-poppins font-semibold text-neutral-300">
                {project.title}
              </span>
            </div>
          ) : (
            <LazyImage
              src={project.imageUrl}
              alt={project.title}
              referrerPolicy="no-referrer"
              fallback={
                <div className="w-full h-full min-h-[280px] flex flex-col items-center justify-center p-6 text-center bg-neutral-950">
                  <Camera className="w-8 h-8 text-[#FF6A00] mb-2" />
                  <span className="text-sm font-poppins font-semibold text-neutral-300">
                    {project.title}
                  </span>
                </div>
              }
              className={`w-full h-full object-cover ${objectPositionClass} group-hover:scale-[1.03] transition-transform duration-500`}
            />
          )}

          <span
            aria-hidden="true"
            className="absolute bottom-3.5 right-3.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-sm border border-white/10 text-[10px] font-mono uppercase tracking-wider text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
          >
            <Maximize2 className="w-3 h-3 text-[#FF6A00]" />
            <span>Preview</span>
          </span>
        </button>
      </div>

      {/* Right Editorial Story Column */}
      <div
        className={`p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6 ${
          project.aspect === 'portrait' || project.aspect === 'square' ? 'lg:col-span-8' : 'lg:col-span-5'
        }`}
      >
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-400 mb-3">
            <span className="text-[#FF6A00] font-semibold">{project.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{project.photoCount}</span>
          </div>

          <h4 className="text-xl sm:text-2xl font-bold text-white font-poppins leading-snug">
            {project.title}
          </h4>

          <p className="mt-2 text-xs font-mono uppercase tracking-wider text-neutral-400">
            Client · {project.client}
          </p>

          <p className="mt-4 text-sm sm:text-base text-neutral-300 font-lato leading-relaxed">
            {project.summary}
          </p>

          <div className="mt-6 pt-5 border-t border-neutral-900">
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-2">
              Session Highlights
            </span>
            <p className="text-xs sm:text-sm font-mono text-neutral-300">
              {project.highlights.join(' · ')}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-900 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onInspect(project)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF6A00] hover:bg-[#ff7a1a] text-black font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>View Full Frame</span>
            </button>

            <a
              href={project.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF6A00] hover:underline font-mono whitespace-nowrap"
            >
              <span>Facebook Album</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => onInquire?.('Commercial Photography')}
            className="text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            Inquire Similar
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export const PhotographyGrid: React.FC<PhotographyGridProps> = ({ onInquire }) => {
  const [activeCategory, setActiveCategory] = useState<PhotographyCategory>('All');
  const [selectedProject, setSelectedProject] = useState<PhotographyProject | null>(null);

  const isAllView = activeCategory === 'All';
  const overviewCards = getPhotographyOverviewCards(photographyProjects);
  const visibleProjects = isAllView
    ? overviewCards
    : filterPhotographyProjects(photographyProjects, activeCategory);
  const { widescreenRow, editorialRow } = partitionPhotographyOverviewRows(overviewCards);
  const visibleArchiveGroups = filterPhotographyArchive(photographyArchiveGroups, activeCategory);
  const categoryCounts = getPhotographyCategoryCounts(photographyProjects);
  const archiveTotals = getPhotographyArchiveTotals(photographyArchiveGroups);

  const navigateLightbox = useCallback(
    (direction: -1 | 1) => {
      if (!selectedProject || visibleProjects.length <= 1) return;
      const idx = visibleProjects.findIndex((p) => p.id === selectedProject.id);
      if (idx === -1) return;
      const nextIdx = (idx + direction + visibleProjects.length) % visibleProjects.length;
      setSelectedProject(visibleProjects[nextIdx]);
    },
    [selectedProject, visibleProjects]
  );

  useEffect(() => {
    if (!selectedProject) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
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
  }, [selectedProject, navigateLightbox]);

  const activeLightboxIndex = selectedProject
    ? visibleProjects.findIndex((p) => p.id === selectedProject.id)
    : -1;

  // Separate Birthdays & Portraits cleanly: featured studio portrait split + 3 collage contact sheets
  const birthdayFeaturedPortrait =
    activeCategory === 'Birthdays'
      ? visibleProjects.find((p) => p.aspect === 'portrait')
      : undefined;
  const birthdayCollages =
    activeCategory === 'Birthdays'
      ? visibleProjects.filter((p) => p.aspect !== 'portrait')
      : [];

  return (
    <section
      id="photography"
      className="scroll-mt-20 relative w-full bg-black py-24 lg:py-28 overflow-hidden border-t border-neutral-900/70"
    >
      {/* Subtle Ambient Glow */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 bg-[#FF6A00]/8 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#FF6A00]/6 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF6A00] mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>@dilshanweragoda.photogr · Visual Archive</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-poppins uppercase tracking-wider">
              PHOTOGRAPHY PORTFOLIO
            </h2>
            <div className="w-24 sm:w-28 h-0.5 bg-white mt-3" />
            <p className="mt-4 text-sm sm:text-base text-neutral-400 font-lato leading-relaxed">
              Premiere red carpets, live broadcast stages, university convocations, fashion pageants, and intimate portrait milestones photographed across Sri Lanka.
            </p>
            <p className="mt-3 text-xs font-mono uppercase tracking-wider text-neutral-400">
              <span className="text-neutral-200 font-semibold tabular-nums">
                {archiveTotals.disciplines} Disciplines
              </span>
              <span className="mx-2 text-[#FF6A00]">·</span>
              <span className="text-neutral-200 font-semibold tabular-nums">
                {archiveTotals.albums} Curated Albums
              </span>
              <span className="mx-2 text-[#FF6A00]">·</span>
              <span className="text-neutral-200 font-semibold tabular-nums">
                {archiveTotals.photos.toLocaleString()}+ Delivered Frames
              </span>
            </p>
          </motion.div>

          {/* Social CTA Links */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center lg:shrink-0"
          >
            <a
              href={PHOTOGRAPHY_FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Dilshan Weragoda Photography Facebook Page"
              className="group inline-flex w-full max-w-full items-center justify-center gap-2 px-4 py-3 sm:w-auto sm:gap-2.5 sm:px-6 sm:py-3.5 rounded-full bg-[#FF6A00] hover:bg-[#ff7a1a] text-center text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_24px_rgba(255,106,0,0.3)] hover:shadow-[0_0_32px_rgba(255,106,0,0.5)] transition-all duration-300 whitespace-normal sm:whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <SocialIcon platform="facebook" className="w-4 h-4 text-black" />
              <span className="min-w-0">Facebook Photography Page</span>
              <ExternalLink className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href={SOCIAL_URLS.photographyInstagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Dilshan Weragoda Photography Instagram"
              className="group inline-flex w-full max-w-full items-center justify-center gap-2 px-4 py-3 sm:w-auto sm:gap-2.5 sm:px-6 sm:py-3.5 rounded-full bg-[#0A0A0A] hover:bg-[#161616] text-center text-white hover:text-[#FF6A00] border border-[#222222] hover:border-[#FF6A00] font-bold text-xs uppercase tracking-wider transition-all duration-300 whitespace-normal sm:whitespace-nowrap shadow-[0_0_20px_rgba(0,0,0,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00]"
            >
              <SocialIcon platform="instagram" className="w-4 h-4 text-[#FF6A00]" />
              <span className="min-w-0">Instagram Gallery</span>
              <ExternalLink className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>

        {/* Discipline Filter Tabs */}
        <div
          className="flex flex-wrap items-center gap-2 mb-10 pb-6 border-b border-neutral-900"
          role="tablist"
          aria-label="Filter photography projects by discipline"
        >
          {photographyCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = cat.id === 'All' ? overviewCards.length : categoryCounts[cat.id] ?? 0;

            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-[11px] font-semibold tracking-wide uppercase transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] ${
                  isActive
                    ? 'bg-[#FF6A00] text-black shadow-lg shadow-[#FF6A00]/20'
                    : 'bg-[#0B0B0B] text-neutral-400 hover:text-white border border-neutral-800/90 hover:border-neutral-700'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] font-mono tabular-nums ${
                    isActive ? 'text-black/80 font-bold' : 'text-neutral-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Visual Showcase Body */}
        <div>
          <div className="flex items-baseline justify-between gap-4 mb-6">
            <h3 className="text-sm font-mono uppercase tracking-widest text-neutral-400">
              {isAllView ? 'Categories Overview' : 'Featured Visual Stories'}
              <span className="text-[#FF6A00] ml-2 tabular-nums">({visibleProjects.length})</span>
            </h3>
            <span className="hidden sm:inline text-xs font-mono text-neutral-400">
              {isAllView
                ? 'One curated signature frame per discipline · Click any photo to inspect full resolution'
                : 'Click any frame to open the full-screen lightbox'}
            </span>
          </div>

          {isAllView ? (
            /* ALL DISCIPLINES VIEW: Two Balanced Aspect-Harmonized 3-Column Rows */
            <div className="space-y-8">
              {/* Row 1: Widescreen Film, Broadcast & Ceremony (exact 3:2 framing) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
                {widescreenRow.map((project, idx) => (
                  <PhotoCard
                    key={project.id}
                    project={project}
                    index={idx}
                    isAllView
                    frameContext="overview-wide"
                    onInspect={setSelectedProject}
                    onOpenCategory={(cat) => setActiveCategory(cat)}
                    onInquire={onInquire}
                  />
                ))}
              </div>

              {/* Row 2: Studio Portrait, Fashion & Commercial Architecture (vertical 4:5 harmony) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
                {editorialRow.map((project, idx) => (
                  <PhotoCard
                    key={project.id}
                    project={project}
                    index={idx + widescreenRow.length}
                    isAllView
                    frameContext="overview-editorial"
                    onInspect={setSelectedProject}
                    onOpenCategory={(cat) => setActiveCategory(cat)}
                    onInquire={onInquire}
                  />
                ))}
              </div>
            </div>
          ) : visibleProjects.length === 1 ? (
            /* SINGLE-FEATURE CATEGORY (TV, Fashion, Corporate): Editorial Split Card */
            <SplitFeatureCard
              project={visibleProjects[0]}
              onInspect={setSelectedProject}
              onInquire={onInquire}
            />
          ) : activeCategory === 'Birthdays' && birthdayFeaturedPortrait ? (
            /* BIRTHDAYS & PORTRAITS: Featured Studio Portrait + 3 Clean 6:5 Collages */
            <div className="space-y-8">
              <SplitFeatureCard
                project={birthdayFeaturedPortrait}
                onInspect={setSelectedProject}
                onInquire={onInquire}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
                {birthdayCollages.map((project, idx) => (
                  <PhotoCard
                    key={project.id}
                    project={project}
                    index={idx}
                    isAllView={false}
                    frameContext="category"
                    aspectOverride="aspect-[6/5]"
                    onInspect={setSelectedProject}
                    onInquire={onInquire}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* 2-SHOOT CATEGORIES (Film, Ceremony): Balanced 2-Column Showcase */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {visibleProjects.map((project, idx) => (
                <PhotoCard
                  key={project.id}
                  project={project}
                  index={idx}
                  isAllView={false}
                  frameContext="category"
                  aspectOverride={activeCategory === 'Film' ? 'aspect-[3/2]' : 'aspect-[4/3]'}
                  onInspect={setSelectedProject}
                  onInquire={onInquire}
                />
              ))}
            </div>
          )}
        </div>

        {/* Category-Specific Album Directory (Shown only when a specific discipline tab is selected) */}
        {!isAllView && visibleArchiveGroups.length > 0 && (
          <div className="mt-14 pt-10 border-t border-neutral-900">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF6A00] mb-1.5">
                  <FolderOpen className="w-3.5 h-3.5" />
                  <span>Discipline Album Directory</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-poppins">
                  {visibleArchiveGroups[0].title}
                </h3>
              </div>
              <a
                href={PHOTOGRAPHY_FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#FF6A00] hover:underline shrink-0"
              >
                <span>Browse Full Albums on Facebook</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {visibleArchiveGroups.map((group) => {
              const groupPhotos = group.albums.reduce(
                (sum, album) => sum + (album.itemCount ?? 0),
                0
              );

              return (
                <div
                  key={group.id}
                  className="rounded-2xl bg-[#090909] border border-neutral-900 p-5 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-3 pb-4 border-b border-neutral-900">
                    <p className="text-xs sm:text-sm text-neutral-400 font-lato">{group.subtitle}</p>
                    <span className="text-xs font-mono text-[#FF6A00] shrink-0 tabular-nums">
                      {group.albums.length} albums · {groupPhotos.toLocaleString()} items
                    </span>
                  </div>

                  <ul className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-x-8">
                    {group.albums.map((album) => (
                      <li key={album.title} className="border-b border-neutral-900/70">
                        <a
                          href={PHOTOGRAPHY_FACEBOOK_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-3 flex items-center justify-between gap-3 text-xs sm:text-sm group/row hover:text-[#FF6A00] transition-colors"
                        >
                          <span className="text-neutral-200 group-hover/row:text-[#FF6A00] transition-colors truncate">
                            {album.title}
                          </span>
                          <span className="text-xs font-mono text-neutral-400 group-hover/row:text-neutral-200 shrink-0 tabular-nums inline-flex items-center gap-1.5">
                            <span>{album.itemCount ? `${album.itemCount} items` : 'View'}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover/row:opacity-100" />
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Callout Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#0A0A0A] border border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FF6A00]/10 border border-[#FF6A00]/30 flex items-center justify-center shrink-0 text-[#FF6A00]">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white font-poppins">
                Looking for Event Coverage, Commercial Shoots, or Portrait Retainers?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                From film premieres and live media shows to private milestone shoots, let&apos;s capture your story with precision.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => onInquire?.('Commercial Photography')}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#FF6A00] hover:bg-[#ff7a1a] text-black font-bold text-xs uppercase tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer shadow-lg shadow-[#FF6A00]/20"
            >
              Book Photography Shoot
            </button>
          </div>
        </div>
      </div>

      {/* Full-Screen Lightbox Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedProject.title}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Lightbox Header Bar */}
            <div className="w-full flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[11px] font-mono uppercase tracking-wider text-[#FF6A00] truncate">
                  {selectedProject.categoryLabel} · {selectedProject.client} · {selectedProject.photoCount}
                  {visibleProjects.length > 1 && activeLightboxIndex >= 0
                    ? ` · Frame ${activeLightboxIndex + 1} of ${visibleProjects.length}`
                    : ''}
                </p>
                <h3 className="text-sm sm:text-lg font-bold text-white font-poppins truncate">
                  {selectedProject.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {visibleProjects.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => navigateLightbox(-1)}
                      aria-label="Previous photograph"
                      className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 hover:text-white cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateLightbox(1)}
                      aria-label="Next photograph"
                      className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 hover:text-white cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close photograph lightbox"
                  className="inline-flex items-center gap-1.5 text-neutral-200 hover:text-white text-xs font-mono uppercase tracking-wider px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-xl cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Close [ESC]</span>
                </button>
              </div>
            </div>

            {/* Full Uncropped High-Resolution Image */}
            <div className="w-full flex items-center justify-center rounded-2xl bg-[#050505] border border-neutral-800/80 p-2 sm:p-3 overflow-hidden">
              <img
                src={publicAssetUrl(selectedProject.imageUrl)}
                alt={selectedProject.title}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto max-w-full rounded-xl object-contain"
              />
            </div>

            {/* Bottom Caption & Actions */}
            <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <p className="text-xs sm:text-sm text-neutral-400 font-lato max-w-2xl">
                {selectedProject.summary}
              </p>
              <a
                href={selectedProject.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF6A00] hover:underline font-mono shrink-0"
              >
                <span>View Full Album on Facebook</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
