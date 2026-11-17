import React, { useEffect, useState } from 'react';
import { Award, Cpu, ExternalLink, Layers, X } from 'lucide-react';
import { techTools, toolCategories, ToolCategory } from '../data/tools';
import { filterTechTools } from '../utils/portfolioLogic';
import { OfficialToolLogo } from './OfficialToolLogo';

interface ToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ToolsModal: React.FC<ToolsModalProps> = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState<ToolCategory>('All');

  useEffect(() => {
    if (!isOpen) return;

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const visibleTools = filterTechTools(techTools, activeCategory);

  const getCategoryCount = (category: ToolCategory) => {
    if (category === 'All') return techTools.length;
    return techTools.filter((t) => t.category === category).length;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tools-modal-heading"
      data-testid="tools-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        data-testid="tools-modal-panel"
        className="relative w-full max-w-5xl max-h-[90vh] flex flex-col rounded-2xl bg-[#0A0A0A] border border-neutral-800 shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pinned Top Header & Close (X) Button */}
        <div className="shrink-0 px-5 sm:px-8 pt-5 pb-4 border-b border-neutral-800/90 bg-[#0A0A0A] flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#FF6A00] mb-1.5">
              <Cpu className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Marketing, Analytics, Creative &amp; AI Stack</span>
            </div>
            <h2
              id="tools-modal-heading"
              className="text-xl sm:text-3xl font-extrabold text-white font-poppins tracking-tight"
            >
              Tools &amp; Technologies
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-neutral-400 font-lato max-w-2xl">
              Full production stack paired with certification-backed expertise across SEO, analytics, paid advertising, social media, creative suites, and AI workflows.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Tools and Technologies modal"
            title="Close (Esc)"
            className="shrink-0 w-10 h-10 rounded-full bg-[#141414] hover:bg-[#FF6A00] border border-neutral-700 hover:border-[#FF6A00] text-neutral-200 hover:text-black flex items-center justify-center transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00]"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Category Filter Tabs & Legend */}
        <div className="shrink-0 px-5 sm:px-8 py-3.5 border-b border-neutral-900 bg-[#0D0D0D] flex flex-col gap-3">
          <div
            className="flex flex-wrap items-center gap-2"
            role="tablist"
            aria-label="Filter tools and technologies by category"
          >
            {toolCategories.map((category) => {
              const isActive = activeCategory === category;
              const count = getCategoryCount(category);
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] ${
                    isActive
                      ? 'bg-[#FF6A00] text-black font-bold shadow-md shadow-[#FF6A00]/20'
                      : 'bg-[#121212] text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`text-[10px] font-mono tabular-nums ${
                      isActive ? 'text-black/80 font-bold' : 'text-neutral-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-neutral-400">
            <span className="inline-flex items-center gap-1.5 text-neutral-300">
              <Award className="w-3.5 h-3.5 text-[#FF6A00]" aria-hidden="true" />
              <span>Certified &amp; Practical</span>
            </span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span className="inline-flex items-center gap-1.5 text-neutral-400">
              <Layers className="w-3.5 h-3.5 text-neutral-500" aria-hidden="true" />
              <span>Practical Production</span>
            </span>
          </div>
        </div>

        {/* Scrollable Organized Grid */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleTools.map((tool) => (
              <a
                key={tool.id}
                href={tool.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${tool.name} — ${tool.proficiency}. Open official site`}
                className="group p-4 sm:p-5 rounded-2xl bg-[#101010] border border-neutral-800/90 hover:border-[#FF6A00]/70 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between gap-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00]"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-[#161616] border border-neutral-800 group-hover:border-[#FF6A00]/40 flex items-center justify-center shrink-0 transition-colors">
                        <OfficialToolLogo toolId={tool.id} className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-white font-poppins group-hover:text-[#FF6A00] transition-colors truncate">
                          {tool.name}
                        </h3>
                        <p className="text-[11px] font-mono text-neutral-400 truncate">
                          {tool.category}
                        </p>
                      </div>
                    </div>

                    <ExternalLink
                      className="w-3.5 h-3.5 text-neutral-600 group-hover:text-[#FF6A00] shrink-0 transition-colors mt-1"
                      aria-hidden="true"
                    />
                  </div>

                  <p className="mt-3 text-xs text-neutral-400 font-lato leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-neutral-800/80 flex items-center justify-between gap-2 text-[11px] font-mono">
                  <span className="text-neutral-300 truncate">{tool.proficiency}</span>
                  <span
                    className={
                      tool.knowledgeType === 'Practical Experience'
                        ? 'text-neutral-500 shrink-0'
                        : 'text-[#FF6A00] shrink-0 inline-flex items-center gap-1'
                    }
                  >
                    {tool.knowledgeType !== 'Practical Experience' && (
                      <Award className="w-3 h-3" aria-hidden="true" />
                    )}
                    <span>{tool.knowledgeType}</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
