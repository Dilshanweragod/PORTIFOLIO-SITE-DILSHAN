import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Home } from './components/Home';
import { Services } from './components/Services';
import { BehanceGrid } from './components/BehanceGrid';
import { PhotographyGrid } from './components/PhotographyGrid';
import { Certifications } from './components/Certifications';
import { Clients } from './components/Clients';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { ResumeModal } from './components/ResumeModal';
import { ToolsModal } from './components/ToolsModal';
import { mapServiceToContactOption } from './utils/portfolioLogic';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [resumeOpen, setResumeOpen] = useState(false);
  const [toolsModalOpen, setToolsModalOpen] = useState(false);
  const [serviceSelection, setServiceSelection] = useState<{
    service: string;
    nonce: number;
  } | null>(null);

  // Track active section for navigation highlighting
  useEffect(() => {
    const sectionIds = [
      'home',
      'about',
      'services',
      'behance',
      'photography',
      'certifications',
      'tools',
      'clients',
      'testimonials',
      'contact'
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const element = document.getElementById(sectionIds[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRequestService = useCallback((serviceOrCategory: string) => {
    const mapped = mapServiceToContactOption(serviceOrCategory);
    setServiceSelection({ service: mapped, nonce: Date.now() });
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#FF6A00] selection:text-black">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:rounded-full focus:bg-[#FF6A00] focus:text-black focus:font-bold focus:text-xs focus:uppercase focus:tracking-wider focus:shadow-xl focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Top Fixed Orange Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Sticky Blurred Header */}
      <Navbar activeSection={activeSection} />

      {/* Main Sections */}
      <main id="main-content" tabIndex={-1}>
        <Home
          onOpenResume={() => setResumeOpen(true)}
          onOpenToolsModal={() => setToolsModalOpen(true)}
        />
        <Services onSelectService={handleRequestService} />
        <BehanceGrid onInquireStyle={handleRequestService} />
        <PhotographyGrid onInquire={handleRequestService} />
        <Certifications />
        <Clients onInquireBrand={handleRequestService} />
        <Testimonials />
        <Contact preselectedService={serviceSelection} />
      </main>

      {/* Curriculum Vitae Preview / Download Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />

      {/* Full Tools & Technologies Popup Modal */}
      <ToolsModal isOpen={toolsModalOpen} onClose={() => setToolsModalOpen(false)} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
