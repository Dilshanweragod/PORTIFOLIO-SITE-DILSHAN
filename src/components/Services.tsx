import React from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  Share2,
  Search,
  Target,
  Megaphone,
  PenTool,
  Video,
  Camera,
  ArrowRight
} from 'lucide-react';
import { services } from '../data/services';

const iconMap = {
  TrendingUp,
  Share2,
  Search,
  Target,
  Megaphone,
  PenTool,
  Video,
  Camera
};

interface ServicesProps {
  onSelectService?: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const handleRequestClick = (e: React.MouseEvent<HTMLAnchorElement>, serviceTitle: string) => {
    if (onSelectService) {
      e.preventDefault();
      onSelectService(serviceTitle);
    }
  };

  return (
    <section
      id="services"
      className="scroll-mt-20 relative w-full bg-black py-24 lg:py-32 overflow-hidden border-t border-neutral-900/60"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF6A00]/5 rounded-full blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-mono uppercase tracking-widest text-[#FF6A00] mb-2">
              8 Core Disciplines
            </p>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-poppins tracking-tight">
              Services &amp; Capabilities
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-400 font-lato">
              Full-funnel digital marketing strategy unified with high-craft brand design, video production, and commercial photography.
            </p>
          </motion.div>
        </div>

        {/* 4x2 Desktop Grid of 8 Requested Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.iconName];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.25) }}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-[22px] bg-[#0A0A0A] border border-neutral-900 hover:border-[#FF6A00]/60 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_14px_32px_rgba(255,106,0,0.1)]"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-[#FF6A00] mb-5 group-hover:border-[#FF6A00]/40 transition-colors">
                    <Icon className="w-6 h-6 stroke-[1.6]" aria-hidden="true" />
                  </div>

                  <h3 className="text-lg font-bold text-[#FF6A00] font-poppins mb-2.5 leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-lato">
                    {service.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-neutral-900/80 space-y-2">
                    <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-mono font-medium block">
                      Key Deliverables
                    </span>
                    <ul className="space-y-1.5 text-xs text-neutral-300">
                      {service.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="leading-snug flex items-start gap-2">
                          <span aria-hidden="true" className="text-[#FF6A00] font-bold">
                            ·
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-900/60">
                  <a
                    href="#contact"
                    onClick={(e) => handleRequestClick(e, service.title)}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 group-hover:text-white transition-colors focus:outline-none focus-visible:text-[#FF6A00]"
                  >
                    <span>Inquire Service</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#FF6A00] transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Consultation Callout */}
        <div className="mt-14 p-6 sm:p-8 rounded-[24px] bg-gradient-to-r from-[#0C0C0C] via-[#111111] to-[#0C0C0C] border border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white font-poppins">
              Looking for an integrated growth &amp; creative retainer?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-lato">
              Combine paid search, Meta ads, commercial shoots, and brand design under unified creative direction.
            </p>
          </div>
          <a
            href="#contact"
            onClick={(e) => handleRequestClick(e, 'Full Creative Retainer')}
            className="self-start sm:self-auto px-6 py-3 rounded-full bg-[#FF6A00] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#ff7a1a] transition-colors whitespace-nowrap shadow-lg shadow-[#FF6A00]/20"
          >
            Schedule Consultation
          </a>
        </div>
      </div>
    </section>
  );
};
