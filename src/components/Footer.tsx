import React from 'react';
import { ArrowUp, ExternalLink } from 'lucide-react';
import { socialChannelGroups } from '../data/socials';
import { SocialIcon } from './SocialIcon';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#050505] border-t border-neutral-900 py-16 text-neutral-400 font-lato">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-900">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#111111] border border-neutral-800">
                <span className="font-bold text-base tracking-tighter text-white font-poppins">
                  P<span className="text-[#FF6A00]">D</span>
                </span>
              </div>
              <span className="text-base font-bold text-white font-poppins tracking-wider">
                PASINDU DILSHAN
              </span>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Digital Marketing Specialist, Creative Strategist, Graphic Designer, Video Editor, and Photographer based in Colombo, Sri Lanka.
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-mono text-neutral-400 uppercase block">Inquiries</span>
              <a
                href="mailto:dpasindu487@gmail.com"
                className="text-xs text-neutral-300 hover:text-[#FF6A00] transition-colors"
              >
                dpasindu487@gmail.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-white font-poppins">
              Navigation
            </h2>
            <ul className="grid grid-cols-2 gap-2 text-xs">
              {[
                { label: 'Home', href: '#home' },
                { label: 'About', href: '#about' },
                { label: 'Services', href: '#services' },
                { label: 'Portfolio', href: '#behance' },
                { label: 'Photography', href: '#photography' },
                { label: 'Credentials', href: '#certifications' },
                { label: 'Contact', href: '#contact' }
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-[#FF6A00] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-[#FF6A00] transition-colors group cursor-pointer"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Grouped Social Networks */}
          <div className="md:col-span-5 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-white font-poppins">
              Social &amp; Creative Channels
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socialChannelGroups.map((group) => (
                <div
                  key={group.id}
                  className={group.id === 'personal' ? 'sm:col-span-2 space-y-2' : 'space-y-2'}
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF6A00] block">
                    {group.title}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <a
                        key={item.id}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.ariaLabel}
                        className="inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 rounded-lg bg-[#111111] border border-neutral-800 hover:border-[#FF6A00] text-neutral-300 hover:text-white text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00]"
                      >
                        <SocialIcon platform={item.platform} className="w-3.5 h-3.5 text-[#FF6A00]" />
                        <span>{item.shortLabel}</span>
                        <ExternalLink className="w-2.5 h-2.5 text-neutral-400" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <p>© 2026 Dilshan Weragoda (Pasindu Dilshan Weragoda Arachchi). All rights reserved.</p>
          <p className="font-mono text-[11px]">Colombo, Sri Lanka • Global Remote</p>
        </div>
      </div>
    </footer>
  );
};
