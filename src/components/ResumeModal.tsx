import React, { useEffect } from 'react';
import {
  X,
  Download,
  Printer,
  Mail,
  MapPin,
  Phone,
  Award,
  Briefcase,
  GraduationCap,
  FileText,
  Wrench,
  Languages,
  ExternalLink
} from 'lucide-react';
import { cvData } from '../data/cv';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const buildPrintableCvHtml = () => {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${cvData.fullName} — Curriculum Vitae</title>
<style>
  body { font-family: Georgia, "Times New Roman", serif; color: #111111; max-width: 820px; margin: 32px auto; padding: 0 28px; line-height: 1.45; }
  header { text-align: center; margin-bottom: 16px; }
  h1 { font-size: 24px; margin: 0 0 6px; font-weight: 700; }
  .contact { font-size: 12px; color: #222222; }
  .contact a { color: #111111; text-decoration: none; border-bottom: 1px solid #999999; }
  h2 { font-size: 13px; text-transform: uppercase; letter-spacing: 0.04em; border-bottom: 1.5px solid #111111; padding-bottom: 3px; margin: 16px 0 8px; }
  .row { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
  .title { font-weight: 700; font-size: 13px; }
  .sub { font-style: italic; font-size: 12.5px; color: #222222; }
  .right { text-align: right; font-size: 12px; white-space: nowrap; }
  p, li { font-size: 12px; color: #1f2937; margin: 3px 0; }
  ul { margin: 4px 0 10px; padding-left: 18px; }
  .edu-item { margin-bottom: 8px; }
</style>
</head>
<body>
  <header>
    <h1>${cvData.fullName}</h1>
    <div class="contact">
      ${cvData.location} | <a href="mailto:${cvData.email}">${cvData.email}</a> | ${cvData.phone} | <a href="${cvData.linkedinUrl}">${cvData.linkedinLabel}</a> | <a href="${cvData.behanceUrl}">${cvData.behanceLabel}</a>
    </div>
  </header>

  <h2>Professional Summary</h2>
  <p>${cvData.summary}</p>

  <h2>Experience</h2>
  ${cvData.experiences
    .map(
      (exp) => `
      <div>
        <div class="row">
          <span class="title">${exp.role}</span>
          <span class="right">${exp.period}</span>
        </div>
        <div class="row">
          <span class="sub">${exp.company}</span>
          <span class="right sub">${exp.location}</span>
        </div>
        <ul>${exp.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
      </div>`
    )
    .join('')}

  <h2>Education</h2>
  ${cvData.education
    .map(
      (edu) => `
      <div class="edu-item">
        <div class="row">
          <span class="title">${edu.institution}</span>
          <span class="right">${edu.location}</span>
        </div>
        <div class="row">
          <span class="sub">${edu.credential}</span>
          <span class="right">${edu.year}</span>
        </div>
      </div>`
    )
    .join('')}

  <h2>Certifications</h2>
  <ul>${cvData.certifications.map((c) => `<li>${c}</li>`).join('')}</ul>

  <h2>Skills</h2>
  ${cvData.skills.map((group) => `<p><strong>${group.category}:</strong> ${group.skills}</p>`).join('')}

  <h2>Languages</h2>
  <ul>${cvData.languages.map((lang) => `<li>${lang}</li>`).join('')}</ul>
</body>
</html>`;
};

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
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

  const handleDownloadCv = () => {
    const html = buildPrintableCvHtml();
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Pasindu_Dilshan_Weragoda_Arachchi_CV.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Pasindu Dilshan Weragoda Arachchi Curriculum Vitae"
      data-testid="cv-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        data-testid="cv-modal-panel"
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-[#0A0A0A] border border-neutral-800 shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pinned Top Action Header */}
        <div className="shrink-0 px-5 sm:px-8 py-4 border-b border-neutral-800 bg-[#0A0A0A] flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-mono uppercase tracking-wider text-[#FF6A00]">
              Curriculum Vitae
            </p>
            <h2 className="text-lg sm:text-2xl font-bold text-white font-poppins truncate">
              {cvData.fullName}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleDownloadCv}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FF6A00] hover:bg-[#ff7a1a] text-black font-bold text-xs uppercase tracking-wider cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Download CV</span>
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs font-semibold cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00]"
            >
              <Printer className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Print PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close CV preview"
              title="Close (Esc)"
              className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-[#FF6A00] border border-neutral-700 hover:border-[#FF6A00] text-neutral-300 hover:text-black flex items-center justify-center transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00]"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Scrollable Full CV Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          {/* Contact & Links Strip */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pb-4 border-b border-neutral-800/80 text-xs text-neutral-300 font-mono">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#FF6A00]" aria-hidden="true" />
              <span>{cvData.location}</span>
            </span>
            <a
              href={`mailto:${cvData.email}`}
              className="inline-flex items-center gap-1.5 hover:text-[#FF6A00] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#FF6A00]" aria-hidden="true" />
              <span>{cvData.email}</span>
            </a>
            <a
              href="tel:+94719575360"
              className="inline-flex items-center gap-1.5 hover:text-[#FF6A00] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#FF6A00]" aria-hidden="true" />
              <span>{cvData.phone}</span>
            </a>
            <a
              href={cvData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#FF6A00] transition-colors"
            >
              <span>{cvData.linkedinLabel}</span>
              <ExternalLink className="w-3 h-3 text-neutral-500" aria-hidden="true" />
            </a>
            <a
              href={cvData.behanceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#FF6A00] transition-colors"
            >
              <span>{cvData.behanceLabel}</span>
              <ExternalLink className="w-3 h-3 text-neutral-500" aria-hidden="true" />
            </a>
          </div>

          {/* Professional Summary */}
          <section className="space-y-2">
            <h3 className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-poppins">
              <FileText className="w-4 h-4 text-[#FF6A00]" aria-hidden="true" />
              <span>Professional Summary</span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-lato leading-relaxed bg-[#111111] border border-neutral-900 rounded-xl p-4">
              {cvData.summary}
            </p>
          </section>

          {/* Experience */}
          <section className="space-y-3">
            <h3 className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-poppins">
              <Briefcase className="w-4 h-4 text-[#FF6A00]" aria-hidden="true" />
              <span>Experience</span>
            </h3>
            <div className="space-y-3.5">
              {cvData.experiences.map((exp) => (
                <div
                  key={`${exp.company}-${exp.period}`}
                  className="p-4 sm:p-5 rounded-xl bg-[#111111] border border-neutral-900 space-y-2.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white font-poppins">
                        {exp.role}
                      </h4>
                      <p className="text-xs font-medium text-neutral-300 italic">
                        {exp.company} · <span className="text-neutral-400 not-italic">{exp.location}</span>
                      </p>
                    </div>
                    <span className="text-xs font-mono text-[#FF6A00] shrink-0">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-1.5 pl-4 list-disc marker:text-[#FF6A00] text-xs sm:text-sm text-neutral-300 font-lato leading-relaxed">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Education & Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <section className="space-y-3">
              <h3 className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-poppins">
                <GraduationCap className="w-4 h-4 text-[#FF6A00]" aria-hidden="true" />
                <span>Education</span>
              </h3>
              <div className="space-y-3">
                {cvData.education.map((edu) => (
                  <div
                    key={edu.institution}
                    className="p-4 rounded-xl bg-[#111111] border border-neutral-900 space-y-1"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="text-sm font-bold text-white font-poppins">
                        {edu.institution}
                      </h4>
                      <span className="text-xs font-mono text-[#FF6A00] shrink-0">
                        {edu.year} · {edu.location}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">{edu.credential}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="space-y-5">
              <section className="space-y-3">
                <h3 className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-poppins">
                  <Award className="w-4 h-4 text-[#FF6A00]" aria-hidden="true" />
                  <span>Certifications</span>
                </h3>
                <ul className="space-y-2">
                  {cvData.certifications.map((cert) => (
                    <li
                      key={cert}
                      className="p-3 rounded-xl bg-[#111111] border border-neutral-900 text-xs sm:text-sm text-neutral-200 flex items-start gap-2"
                    >
                      <span className="text-[#FF6A00] font-bold" aria-hidden="true">•</span>
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="space-y-2.5">
                <h3 className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-poppins">
                  <Languages className="w-4 h-4 text-[#FF6A00]" aria-hidden="true" />
                  <span>Languages</span>
                </h3>
                <ul className="space-y-2">
                  {cvData.languages.map((lang) => (
                    <li
                      key={lang}
                      className="p-3 rounded-xl bg-[#111111] border border-neutral-900 text-xs sm:text-sm text-neutral-200 flex items-center gap-2"
                    >
                      <span className="text-[#FF6A00] font-bold" aria-hidden="true">•</span>
                      <span>{lang}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          {/* Skills */}
          <section className="space-y-3">
            <h3 className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-poppins">
              <Wrench className="w-4 h-4 text-[#FF6A00]" aria-hidden="true" />
              <span>Skills</span>
            </h3>
            <div className="space-y-3">
              {cvData.skills.map((group) => (
                <div
                  key={group.category}
                  className="p-4 rounded-xl bg-[#111111] border border-neutral-900 text-xs sm:text-sm text-neutral-300 font-lato leading-relaxed"
                >
                  <strong className="text-white font-semibold">{group.category}:</strong>{' '}
                  {group.skills}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
