import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#behance' },
    { name: 'Photography', href: '#photography' },
    { name: 'Credentials', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/85 backdrop-blur-md border-b border-neutral-900/80 py-3.5 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] rounded-lg p-1 shrink-0"
          aria-label="Pasindu Dilshan Homepage"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#111111] border border-neutral-800 group-hover:border-[#FF6A00] transition-colors duration-300">
            <span className="font-bold text-base tracking-tighter text-white font-poppins">
              P<span className="text-[#FF6A00]">D</span>
            </span>
          </div>
          <div className="hidden sm:flex lg:hidden xl:flex flex-col">
            <span className="text-xs font-semibold tracking-wider uppercase text-neutral-200 whitespace-nowrap">
              Pasindu Dilshan
            </span>
            <span className="text-[10px] text-neutral-400 tracking-tight whitespace-nowrap">
              Digital Marketing &amp; Creative Lead
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-[#0A0A0A]/75 border border-neutral-900 rounded-full px-2.5 xl:px-3 py-1.5 backdrop-blur-sm"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                aria-current={isActive ? 'location' : undefined}
                className={`relative px-2 xl:px-2.5 py-1.5 text-[11px] xl:text-xs font-medium tracking-wide uppercase transition-colors rounded-full whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-neutral-800/80 -z-10" />
                )}
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right Action: Hire Me */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF6A00] text-black font-semibold text-xs uppercase tracking-wider overflow-hidden shadow-[0_0_20px_rgba(255,106,0,0.35)] hover:shadow-[0_0_30px_rgba(255,106,0,0.6)] hover:bg-[#ff7a1a] transition-all duration-300 active:scale-95 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>Hire Me</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile & Tablet Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <a
            href="#contact"
            className="px-3.5 py-2 rounded-full bg-[#FF6A00] text-black font-bold text-[11px] uppercase tracking-wide whitespace-nowrap"
          >
            Hire
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Fullscreen Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[66px] z-40 bg-black/98 backdrop-blur-2xl flex flex-col justify-between px-6 py-8 lg:hidden border-t border-neutral-900 overflow-y-auto">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-3">
            <span className="text-[11px] uppercase tracking-widest text-[#FF6A00] font-semibold">
              Navigation Menu
            </span>
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl font-bold py-2.5 border-b border-neutral-900/60 transition-colors flex items-center justify-between ${
                    isActive ? 'text-[#FF6A00]' : 'text-neutral-200 hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-5 h-5 opacity-40" />
                </a>
              );
            })}
          </nav>

          <div className="flex flex-col gap-4 pt-6 border-t border-neutral-900">
            <div className="text-xs text-neutral-400">
              <p>Colombo, Sri Lanka</p>
              <p className="text-white font-medium">dpasindu487@gmail.com</p>
            </div>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3.5 rounded-full bg-[#FF6A00] text-black font-bold text-sm uppercase tracking-wider shadow-lg shadow-[#FF6A00]/20"
            >
              Start A Project — Hire Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
