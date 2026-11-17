import React from 'react';
import { motion } from 'motion/react';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';
import { certifications, IssuerId } from '../data/certifications';

const IssuerEmblem: React.FC<{ issuerId: IssuerId }> = ({ issuerId }) => {
  switch (issuerId) {
    case 'hootsuite':
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#143059" stroke="#3B6EA5" strokeWidth="1.2" />
          <circle cx="9.2" cy="11.2" r="2.6" fill="#FFFFFF" />
          <circle cx="14.8" cy="11.2" r="2.6" fill="#FFFFFF" />
          <circle cx="9.2" cy="11.2" r="1.1" fill="#143059" />
          <circle cx="14.8" cy="11.2" r="1.1" fill="#143059" />
          <path d="M12 13.5l-1.3 2.2h2.6L12 13.5z" fill="#FF9A00" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="4.5" fill="#0A66C2" />
          <path
            d="M7.5 10v6.5M7.5 7.2v.2M11 16.5V10m0 2c.6-1.3 1.7-2 3-2 2 0 3 1.3 3 3.5v3"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'google':
    default:
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" aria-hidden="true">
          <path
            d="M21.8 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.5c-.2 1.2-1 2.3-2 3v2.5h3.3c1.9-1.8 3-4.4 3-7.4z"
            fill="#4285F4"
          />
          <path
            d="M12 22c2.7 0 5-.9 6.7-2.4l-3.3-2.5c-.9.6-2.1 1-3.4 1-2.6 0-4.9-1.8-5.7-4.2H2.9v2.6C4.6 19.8 8 22 12 22z"
            fill="#34A853"
          />
          <path
            d="M6.3 13.9c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9V7.5H2.9C2.3 8.8 2 10.4 2 12s.3 3.2.9 4.5l3.4-2.6z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.9-2.9C17 2.9 14.7 2 12 2 8 2 4.6 4.2 2.9 7.5l3.4 2.6c.8-2.4 3.1-4.2 5.7-4.2z"
            fill="#EA4335"
          />
        </svg>
      );
  }
};

export const Certifications: React.FC = () => {
  return (
    <section
      id="certifications"
      className="scroll-mt-20 relative w-full bg-black py-24 lg:py-28 overflow-hidden border-t border-neutral-900/60"
    >
      <div
        className="absolute -bottom-24 -left-32 w-96 h-96 bg-[#FF6A00]/6 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF6A00] mb-3">
              <Award className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Verified Credentials &amp; Specializations</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-poppins tracking-tight">
              Certifications &amp; Development
            </h2>
            <div className="w-24 sm:w-28 h-0.5 bg-white mt-3" />
            <p className="mt-4 text-sm sm:text-base text-neutral-400 font-lato leading-relaxed">
              Industry credentials across paid search advertising, social media strategy, digital marketing ecosystems, and applied generative AI workflows.
            </p>
          </motion.div>

          <div className="text-xs font-mono text-neutral-400 inline-flex items-center gap-2 shrink-0">
            <ShieldCheck className="w-4 h-4 text-[#FF6A00]" aria-hidden="true" />
            <span>{certifications.length} Core Industry Certificates</span>
          </div>
        </div>

        {/* 5 Authentic Certification Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => (
            <motion.article
              key={cert.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="group rounded-2xl bg-[#0A0A0A] border border-neutral-900 hover:border-[#FF6A00]/60 transition-all duration-200 p-6 sm:p-7 flex flex-col justify-between gap-6"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#111111] border border-neutral-800 flex items-center justify-center shrink-0">
                    <IssuerEmblem issuerId={cert.issuerId} />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF6A00] pt-1">
                    {cert.issuer}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-bold text-white font-poppins leading-snug group-hover:text-[#FF6A00] transition-colors">
                  {cert.title}
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm text-neutral-400 font-lato leading-relaxed">
                  {cert.summary}
                </p>

                <p className="mt-4 text-[11px] font-mono text-neutral-300 leading-relaxed">
                  {cert.focusAreas.join(' · ')}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-900 flex items-center justify-between gap-3">
                <span className="text-[11px] font-mono text-neutral-400">
                  Issuing Organization: {cert.issuer}
                </span>
                <a
                  href={cert.programUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${cert.title} — ${cert.issuer} program page`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF6A00] hover:underline font-mono whitespace-nowrap shrink-0"
                >
                  <span>Program Info</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
