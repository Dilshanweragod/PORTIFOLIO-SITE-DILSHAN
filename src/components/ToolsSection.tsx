import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Layers, X } from 'lucide-react';
import { ToolItem } from '../data/experience';
import { techTools, TechToolItem } from '../data/tools';
import { OfficialToolLogo } from './OfficialToolLogo';

const featuredToolIds = [
  'adobe-after-effects',
  'adobe-indesign',
  'figma',
  'adobe-premiere-pro',
  'wordpress',
  'adobe-illustrator',
  'adobe-photoshop',
  'capcut',
  'meta',
  'google',
  'davinci-resolve',
  'google-ads',
  'meta-ads',
  'canva',
  'chatgpt',
  'obs-studio'
];

const featuredTools = featuredToolIds
  .map((id) => techTools.find((tool) => tool.id === id))
  .filter((tool): tool is TechToolItem => Boolean(tool));

// Vector brand logos for all 10 core tools
export const ToolBrandLogo: React.FC<{ tool: ToolItem }> = ({ tool }) => {
  switch (tool.iconType) {
    case 'figma':
      return (
        <svg viewBox="0 0 38 57" className="w-5 h-5" fill="none" aria-hidden="true">
          <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
          <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
          <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
          <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
          <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
        </svg>
      );
    case 'wp':
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="11" fill="#21759B" />
          <circle cx="12" cy="12" r="9.1" stroke="#FFFFFF" strokeWidth="1.2" />
          <path
            d="M5.4 8.6h2.8M6.5 8.6l2.8 8.3 2.4-6.4"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.1 8.6h2.8M11.3 8.6l2.9 8.3 2.3-6.6c.3-.8.1-1.6-.5-1.8"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'meta':
      return (
        <svg viewBox="0 0 32 22" className="w-7 h-6" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="toolsMetaGrad" x1="2" y1="6" x2="30" y2="16" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0082FB" />
              <stop offset="50%" stopColor="#0064E0" />
              <stop offset="100%" stopColor="#1A9BFF" />
            </linearGradient>
          </defs>
          <path
            d="M16 10.6C13.8 6.6 11.4 4.2 8.3 4.2 4.8 4.2 2.8 7.2 2.8 11.2c0 4 2.2 6.6 5.6 6.6 2.8 0 5-2.8 7.6-7.2 2.6-4.4 4.8-6.4 7.7-6.4 3.5 0 5.5 3 5.5 7 0 4-2.2 6.6-5.6 6.6-2.8 0-5.3-3.2-7.6-7.2z"
            stroke="url(#toolsMetaGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'capcut':
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="22" height="22" rx="5.5" fill="#FFFFFF" />
          <path
            d="M5.6 10.2V8.2c0-.7.5-1.2 1.2-1.2h5.8l5.6 8.8"
            stroke="#111111"
            strokeWidth="2.15"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.6 13.8v2c0 .7.5 1.2 1.2 1.2h5.8l5.6-8.8"
            stroke="#111111"
            strokeWidth="2.15"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'analytics':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
          <rect x="2" y="13" width="5" height="8" rx="2" fill="#F9AB00" />
          <rect x="9.5" y="7" width="5" height="14" rx="2" fill="#E37400" />
          <rect x="17" y="2" width="5" height="19" rx="2" fill="#E37400" />
          <circle cx="4.5" cy="8" r="2.5" fill="#F9AB00" />
        </svg>
      );
    case 'ae':
      return (
        <div className="w-7 h-7 rounded-lg bg-[#00005B] border border-[#9999FF]/50 flex items-center justify-center font-bold text-[#9999FF] text-xs font-mono shadow-sm">
          Ae
        </div>
      );
    case 'id':
      return (
        <div className="w-7 h-7 rounded-lg bg-[#2D0017] border border-[#FF3366]/50 flex items-center justify-center font-bold text-[#FF3366] text-xs font-mono shadow-sm">
          Id
        </div>
      );
    case 'pr':
      return (
        <div className="w-7 h-7 rounded-lg bg-[#00005B] border border-[#EA77FF]/50 flex items-center justify-center font-bold text-[#EA77FF] text-xs font-mono shadow-sm">
          Pr
        </div>
      );
    case 'ai':
      return (
        <div className="w-7 h-7 rounded-lg bg-[#330000] border border-[#FF9A00]/50 flex items-center justify-center font-bold text-[#FF9A00] text-xs font-mono shadow-sm">
          Ai
        </div>
      );
    case 'ps':
      return (
        <div className="w-7 h-7 rounded-lg bg-[#001E36] border border-[#31A8FF]/50 flex items-center justify-center font-bold text-[#31A8FF] text-xs font-mono shadow-sm">
          Ps
        </div>
      );
    default:
      return (
        <span className="text-[10px] font-bold text-neutral-300">
          {tool.name.slice(0, 2)}
        </span>
      );
  }
};

interface ToolLogoCardProps {
  tool: TechToolItem;
  isSelected: boolean;
  onSelect: (tool: TechToolItem) => void;
  isDuplicate?: boolean;
}

const ToolLogoCard: React.FC<ToolLogoCardProps> = ({ tool, isSelected, onSelect, isDuplicate = false }) => {
  return (
    <button
      type="button"
      onClick={() => onSelect(tool)}
      tabIndex={isDuplicate ? -1 : 0}
      aria-hidden={isDuplicate ? true : undefined}
      aria-pressed={isDuplicate ? undefined : isSelected}
      aria-label={isDuplicate ? undefined : `${tool.name} — ${tool.proficiency}`}
      className={`group relative w-[176px] sm:w-[210px] h-[94px] sm:h-[112px] p-3.5 sm:p-4 rounded-[16px] bg-[#0A0A0A] border transition-all duration-300 hover:-translate-y-1 flex flex-col items-center justify-center shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] ${
        isSelected
          ? 'border-[#FF6A00] shadow-[0_0_20px_rgba(255,106,0,0.4)] -translate-y-1 bg-[#121212]'
          : 'border-[#1A1A1A] hover:border-[#FF6A00] hover:shadow-[0_0_20px_rgba(255,106,0,0.35)]'
      }`}
      title={`${tool.name} — ${tool.proficiency}`}
    >
      <div className="w-8 h-8 flex items-center justify-center">
        <OfficialToolLogo toolId={tool.id} className="w-7 h-7" />
      </div>
      <span className="text-xs font-mono text-neutral-300 group-hover:text-white mt-2 truncate max-w-full text-center">
        {tool.name}
      </span>
    </button>
  );
};

interface ToolMarqueeRowProps {
  tools: TechToolItem[];
  direction: 'left' | 'right';
  selectedToolId?: string;
  onSelect: (tool: TechToolItem) => void;
}

const ToolMarqueeRow: React.FC<ToolMarqueeRowProps> = ({
  tools,
  direction,
  selectedToolId,
  onSelect
}) => {
  const trackClass =
    direction === 'left' ? 'animate-tools-logos-left' : 'animate-tools-logos-right';

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
          {tools.map((tool) => (
            <ToolLogoCard
              key={tool.id}
              tool={tool}
              isSelected={selectedToolId === tool.id}
              onSelect={onSelect}
            />
          ))}
        </div>
        <div className="flex items-center gap-4 pr-4 shrink-0" aria-hidden="true">
          {tools.map((tool) => (
            <ToolLogoCard
              key={`${tool.name}-dup`}
              tool={tool}
              isSelected={selectedToolId === tool.id}
              onSelect={onSelect}
              isDuplicate
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface ToolsSectionProps {
  onOpenToolsModal?: () => void;
}

export const ToolsSection: React.FC<ToolsSectionProps> = ({ onOpenToolsModal }) => {
  const [activeTool, setActiveTool] = useState<TechToolItem | null>(null);

  const handleToolClick = (tool: TechToolItem) => {
    setActiveTool((prev) => (prev?.id === tool.id ? null : tool));
  };

  return (
    <section id="tools" className="scroll-mt-24 relative w-full overflow-hidden">
      <div className="w-full relative z-10">
        {/* Title Header + View All Button */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-lg sm:text-xl font-extrabold text-white font-poppins uppercase tracking-wider">
              TOOLS I USE
            </h2>
            <div className="w-16 h-0.5 bg-white mt-2" />
            <p className="text-[11px] text-neutral-400 mt-2 font-mono">
              {activeTool ? `Selected: ${activeTool.name} — ${activeTool.proficiency}` : 'Digital marketing · Graphic design · Video editing · AI workflows'}
            </p>
          </motion.div>

          <div>
            <button
              type="button"
              onClick={() => onOpenToolsModal?.()}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#111111] hover:bg-[#1A1A1A] border border-[#262626] hover:border-[#FF6A00] text-neutral-200 hover:text-[#FF6A00] text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00]"
            >
              <Layers className="w-4 h-4 text-[#FF6A00]" aria-hidden="true" />
              <span>View All Tools &amp; Technologies</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Interactive Selected Tool Spotlight */}
        <AnimatePresence>
          {activeTool && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="mb-6 p-4 sm:p-5 rounded-[20px] bg-[#0A0A0A] border border-[#FF6A00]/50 shadow-[0_12px_35px_rgba(255,106,0,0.12)] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-14 h-14 rounded-xl bg-[#141414] border border-neutral-800 p-2.5 flex items-center justify-center shrink-0">
                  <OfficialToolLogo toolId={activeTool.id} className="w-8 h-8" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-[#FF6A00]">
                    <span>{activeTool.category}</span>
                    <span aria-hidden="true" className="text-neutral-600">·</span>
                    <span className="text-neutral-400">{activeTool.proficiency}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-poppins truncate">
                    {activeTool.name}
                  </h3>
                  <p className="text-xs text-neutral-400 font-lato mt-0.5 line-clamp-2">
                    {activeTool.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={activeTool.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FF6A00] hover:bg-[#ff7a1a] text-black font-bold text-xs uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>Official Tool</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setActiveTool(null)}
                  aria-label="Close tool details"
                  className="p-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div>
          <ToolMarqueeRow
            tools={featuredTools}
            direction="left"
            selectedToolId={activeTool?.id}
            onSelect={handleToolClick}
          />
        </div>
      </div>
    </section>
  );
};
