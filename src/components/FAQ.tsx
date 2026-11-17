import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle, ArrowRight } from 'lucide-react';
import { faqItems, FaqCategory } from '../data/faq';
import { filterFaqItems } from '../utils/portfolioLogic';

const faqCategories: FaqCategory[] = ['All', 'Workflow', 'Pricing', 'Availability'];

export const FAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>('All');
  const [openId, setOpenId] = useState<string>(faqItems[0].id);

  const visibleItems = filterFaqItems(faqItems, activeCategory);

  const handleCategoryChange = (cat: FaqCategory) => {
    setActiveCategory(cat);
    const nextItems = filterFaqItems(faqItems, cat);
    if (nextItems.length > 0 && !nextItems.some((item) => item.id === openId)) {
      setOpenId(nextItems[0].id);
    }
  };

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  return (
    <section
      id="faq"
      className="relative w-full bg-black py-24 lg:py-28 overflow-hidden border-t border-neutral-900/60"
    >
      {/* Ambient Background Glow */}
      <div
        className="absolute top-20 -left-36 w-80 h-80 bg-[#FF6A00]/8 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading & Category Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF6A00] mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Clarity Before Kickoff</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-poppins uppercase tracking-wider">
              FREQUENTLY ASKED
            </h2>
            <div className="w-24 sm:w-28 h-0.5 bg-white mt-3" />
          </motion.div>

          <div
            className="flex flex-wrap items-center gap-2"
            role="tablist"
            aria-label="Filter frequently asked questions"
          >
            {faqCategories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide transition-all whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] ${
                    isActive
                      ? 'bg-[#FF6A00] text-black shadow-lg shadow-[#FF6A00]/20'
                      : 'bg-[#0E0E0E] text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Accessible Accordion List */}
        <div className="space-y-4">
          {visibleItems.map((item, idx) => {
            const isOpen = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            const buttonId = `faq-button-${item.id}`;

            return (
              <div
                key={item.id}
                className={`rounded-[20px] border transition-colors duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#0C0C0C] border-[#FF6A00]/60 shadow-[0_10px_30px_rgba(255,106,0,0.08)]'
                    : 'bg-[#0A0A0A] border-neutral-900 hover:border-neutral-700'
                }`}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-5 sm:px-7 py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FF6A00]"
                  >
                    <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                      <span className="text-[11px] font-mono text-[#FF6A00] font-bold shrink-0 mt-0.5 sm:mt-0">
                        0{idx + 1}
                      </span>
                      <div className="min-w-0">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">
                          {item.category}
                        </span>
                        <span className="text-sm sm:text-base font-semibold text-white font-poppins leading-snug block">
                          {item.question}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? 'bg-[#FF6A00] border-[#FF6A00] text-black'
                          : 'bg-[#111111] border-neutral-800 text-neutral-400'
                      }`}
                      aria-hidden="true"
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.24 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-7 pb-6 pl-12 sm:pl-14 text-xs sm:text-sm text-neutral-400 font-lato leading-relaxed border-t border-neutral-900/80 pt-4">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Streamlined Contact Prompt */}
        <div className="mt-10 p-5 sm:p-6 rounded-[24px] bg-[#0A0A0A] border border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-white font-poppins">
              Need a custom quote or monthly retainer availability?
            </p>
            <p className="text-xs text-neutral-400 font-lato mt-0.5">
              Share your deliverables below and receive a tailored scope response within 24 hours.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#FF6A00] hover:bg-[#ff7a1a] text-black font-bold text-xs uppercase tracking-wider transition-colors whitespace-nowrap shrink-0"
          >
            <span>Request a Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
