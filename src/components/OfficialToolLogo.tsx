import React from 'react';
import {
  siDropbox,
  siFigma,
  siGmail,
  siGoogle,
  siGoogleads,
  siGoogledocs,
  siGooglegemini,
  siGooglemeet,
  siGooglesheets,
  siInkscape,
  siMeta,
  siObsstudio,
  siStreamlabs,
  siWordpress,
  siYoutube,
  siZoom,
  type SimpleIcon
} from 'simple-icons';

// Monochromatic/brand-color Simple Icons map
const simpleIconsMap: Record<string, SimpleIcon> = {
  dropbox: siDropbox,
  zoom: siZoom,
  inkscape: siInkscape,
  'obs-studio': siObsstudio,
  streamlabs: siStreamlabs,
  wordpress: siWordpress,
  meta: siMeta,
  'youtube-ads': siYoutube
};

interface OfficialToolLogoProps {
  toolId: string;
  className?: string;
}

export const OfficialToolLogo: React.FC<OfficialToolLogoProps> = ({
  toolId,
  className = 'w-7 h-7'
}) => {
  const normalizedId = toolId.toLowerCase().trim();

  // 1. Check for specific full-color official SVGs first
  switch (normalizedId) {
    // --- 1. DIGITAL MARKETING & ADVERTISING ---
    case 'google-ads':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          {/* Official Google Ads Angled Emblem */}
          <path
            d="M4.2 16.8L10.9 5.2a2.3 2.3 0 0 1 3.1-.8l.1.1a2.3 2.3 0 0 1 .8 3.1L8.2 19.2a2.3 2.3 0 0 1-3.1.8l-.1-.1a2.3 2.3 0 0 1-.8-3.1z"
            fill="#FBBC04"
          />
          <path
            d="M10.9 5.2l6.7 11.6a2.3 2.3 0 0 1-.8 3.1l-.1.1a2.3 2.3 0 0 1-3.1-.8L6.9 7.6a2.3 2.3 0 0 1 .8-3.1l.1-.1a2.3 2.3 0 0 1 3.1.8z"
            fill="#4285F4"
          />
          <circle cx="6.5" cy="18.2" r="2.6" fill="#34A853" />
        </svg>
      );

    case 'meta-ads':
    case 'meta-ads-manager':
      return (
        <svg viewBox="0 0 32 22" className={className} fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="metaAdsGrad" x1="2" y1="6" x2="30" y2="16" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0081FB" />
              <stop offset="50%" stopColor="#0064E0" />
              <stop offset="100%" stopColor="#1A9BFF" />
            </linearGradient>
          </defs>
          <path
            d="M16 10.6C13.8 6.6 11.4 4.2 8.3 4.2 4.8 4.2 2.8 7.2 2.8 11.2c0 4 2.2 6.6 5.6 6.6 2.8 0 5-2.8 7.6-7.2 2.6-4.4 4.8-6.4 7.7-6.4 3.5 0 5.5 3 5.5 7 0 4-2.2 6.6-5.6 6.6-2.8 0-5.3-3.2-7.6-7.2z"
            stroke="url(#metaAdsGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'linkedin-ads':
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
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

    case 'youtube-ads':
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <rect x="2" y="4.5" width="20" height="15" rx="4.5" fill="#FF0000" />
          <path d="M10 9l5.5 3-5.5 3V9z" fill="#FFFFFF" />
        </svg>
      );

    // --- 2. OFFICE SUITES & FILE MANAGEMENT ---
    case 'google-docs':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" fill="#4285F4" />
          <path d="M14 2v6h6L14 2z" fill="#A1C2FA" />
          <path d="M8 12h8M8 15h8M8 18h5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'google-sheets':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" fill="#0F9D58" />
          <path d="M14 2v6h6L14 2z" fill="#87CEAC" />
          {/* Spreadsheet table grid */}
          <rect x="7.5" y="11" width="9" height="7.5" rx="0.5" fill="#FFFFFF" fillOpacity="0.2" stroke="#FFFFFF" strokeWidth="1.2" />
          <path d="M12 11v7.5M7.5 14.5h9" stroke="#FFFFFF" strokeWidth="1.2" />
        </svg>
      );

    case 'microsoft-word':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <rect x="3" y="3.5" width="13" height="17" rx="2" fill="#185ABD" />
          <path d="M9 7l1.8 7.5L13 7h2l-2.8 10h-2L8.5 9.5 7 17H5L2.2 7h2l1.8 7.5L7.8 7H9z" fill="#FFFFFF" />
          <rect x="11" y="5.5" width="10" height="13" rx="1.5" fill="#2B579A" fillOpacity="0.85" stroke="#41A5EE" strokeWidth="0.8" />
          <path d="M13.5 9h5M13.5 12h5M13.5 15h3.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case 'microsoft-excel':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <rect x="3" y="3.5" width="13" height="17" rx="2" fill="#107C41" />
          <path d="M4.5 7.5l3.2 4.5-3.2 4.5h2.2l2.1-3.2 2.1 3.2h2.2l-3.2-4.5 3.2-4.5H11l-2.1 3.2-2.1-3.2H4.5z" fill="#FFFFFF" />
          <rect x="11" y="5.5" width="10" height="13" rx="1.5" fill="#185C37" fillOpacity="0.85" stroke="#33C481" strokeWidth="0.8" />
          <path d="M11 9.5h10M11 13.5h10M15.5 5.5v13" stroke="#FFFFFF" strokeWidth="0.9" />
        </svg>
      );

    case 'microsoft-powerpoint':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <rect x="3" y="3.5" width="13" height="17" rx="2" fill="#C43E1C" />
          <path d="M5.5 7.5h4a2.8 2.8 0 0 1 0 5.6H7.8v3.4H5.5V7.5zm2.3 3.8h1.7a1 1 0 0 0 0-2H7.8v2z" fill="#FFFFFF" />
          <rect x="11" y="5.5" width="10" height="13" rx="1.5" fill="#9E3014" fillOpacity="0.85" stroke="#FF8C6B" strokeWidth="0.8" />
          <circle cx="16" cy="12" r="3.2" stroke="#FFFFFF" strokeWidth="1.2" fill="none" />
          <path d="M16 8.8v3.2h3.2" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case 'adobe-acrobat':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#FA0F00" />
          {/* Official Acrobat 3-loop signature ribbon */}
          <path
            d="M13.9 14.8c-.8-1.5-1.9-3.4-2.8-5.3.6-1.7 1.1-3.2 1.1-4.2 0-.8-.3-1.3-.9-1.3-.8 0-1.2.7-1.4 1.8-.2 1.3.1 3.2.9 5.2-1.7 2.4-3.8 4.7-5.5 5.9-1.2.8-1.7 1.5-1.7 2.2 0 .9.8 1.4 1.8 1.4 1.4 0 3-1.1 4.7-3.2 2.1.8 4.4 1.3 6.3 1.3 1.6 0 2.2-.6 2.2-1.4 0-1.1-1.3-1.8-3.7-2.4zm-7.6 3.9c-.6 0-.9-.3-.9-.7 0-.5.5-1 1.2-1.7 1.2-.9 2.5-2.2 3.6-3.7-.8 2.8-2.5 5.1-3.9 6.1zm5-11.8c.1-.6.3-.9.5-.9.2 0 .3.2.3.6 0 .7-.4 1.8-.8 3-1.4-.4-1.7-1.7-.0-2.7zm-1.8 8.1c.7 1.3 1.5 2.7 2.1 3.8-1.4-.4-3.1-.7-4.6-1.1 1.1-1 2.2-2.2 3.2-3.7z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'draw-io':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="4.5" fill="#F08705" />
          <rect x="5" y="5" width="5.5" height="5.5" rx="1" fill="#FFFFFF" />
          <rect x="13.5" y="13.5" width="5.5" height="5.5" rx="1" fill="#FFFFFF" />
          <path d="M10.5 7.7h4v5.8" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    case 'google-workspace':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <rect x="3" y="3" width="8" height="8" rx="2" fill="#4285F4" />
          <rect x="13" y="3" width="8" height="8" rx="2" fill="#EA4335" />
          <rect x="3" y="13" width="8" height="8" rx="2" fill="#FBBC05" />
          <rect x="13" y="13" width="8" height="8" rx="2" fill="#34A853" />
        </svg>
      );

    case 'microsoft-office':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          {/* Microsoft 365 Hexagonal Ribbon Fold */}
          <path d="M14.5 2.5L5.5 5.8v12.4l9 3.3 4-2.8V5.3l-4-2.8z" fill="#D83B01" />
          <path d="M14.5 2.5v19l4-2.8V5.3l-4-2.8z" fill="#EA3E00" />
          <path d="M10 8.5h4.5v7H10z" fill="#FFFFFF" fillOpacity="0.25" />
          <path d="M5.5 5.8l9 3.2v7l-9 3.2V5.8z" fill="#FF5521" />
        </svg>
      );

    case 'dropbox':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#0061FF" aria-hidden="true">
          <path d="M6 3.5L12 7.3 6 11.1 0 7.3 6 3.5zm12 0l6 3.8-6 3.8-6-3.8 6-3.8zM0 14.7l6-3.8 6 3.8-6 3.8-6-3.8zm24 0l-6-3.8-6 3.8 6 3.8 6-3.8zM6 19.8l6-3.8 6 3.8-6 3.8-6-3.8z" />
        </svg>
      );

    // --- 3. COMMUNICATION TOOLS ---
    case 'microsoft-teams':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <rect x="2.5" y="3.5" width="13" height="17" rx="2.5" fill="#464EB8" />
          <path d="M6 7.5h6M9 7.5V17" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="17.5" cy="8" r="2.5" fill="#7B83EB" />
          <path d="M15 12h5a2 2 0 0 1 2 2v3h-7v-3a2 2 0 0 1 0-2z" fill="#505AC9" />
        </svg>
      );

    case 'outlook':
    case 'microsoft-outlook':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <rect x="2.5" y="3.5" width="13" height="17" rx="2.5" fill="#0078D4" />
          <circle cx="9" cy="12" r="3.2" stroke="#FFFFFF" strokeWidth="2.2" />
          <rect x="11" y="6" width="10" height="12" rx="1.5" fill="#2899F5" fillOpacity="0.85" stroke="#50B6FF" strokeWidth="0.8" />
          <path d="M11 8l5 4 5-4" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'gmail':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <path d="M2.5 6.5A2.5 2.5 0 0 1 5 4h14a2.5 2.5 0 0 1 2.5 2.5v11a2.5 2.5 0 0 1-2.5 2.5H5a2.5 2.5 0 0 1-2.5-2.5v-11z" fill="#FFFFFF" fillOpacity="0.05" />
          <path d="M2.5 6.5v11c0 .7.4 1.3 1 1.6V9l8.5 6 8.5-6v10.1c.6-.3 1-.9 1-1.6v-11c0-1.4-1.6-2.2-2.7-1.4L12 11.2 3.2 4.1C2.1 3.3.5 4.1.5 5.5v1z" fill="#EA4335" />
          <path d="M2.5 6.5l9.5 7 9.5-7V5a1 1 0 0 0-1-1H3.5a1 1 0 0 0-1 1v1.5z" fill="#4285F4" fillOpacity="0.9" />
          <path d="M20.5 19.1c.6-.3 1-.9 1-1.6V9l-4 3v8h2c.4 0 .7-.4 1-.9z" fill="#34A853" />
          <path d="M3.5 19.1c-.6-.3-1-.9-1-1.6V9l4 3v8h-2c-.4 0-.7-.4-1-.9z" fill="#FBBC05" />
        </svg>
      );

    case 'google-meet':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <rect x="2.5" y="5.5" width="13" height="13" rx="3" fill="#00AC47" />
          <path d="M15.5 10l5-3.5v11l-5-3.5v-4z" fill="#1A73E8" />
          <path d="M2.5 8.5h13v7h-13z" fill="#FFBA00" fillOpacity="0.25" />
          <circle cx="9" cy="12" r="2.5" fill="#FFFFFF" />
        </svg>
      );

    case 'zoom':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#2D8CFF" />
          <path d="M6 8.5A1.5 1.5 0 0 1 7.5 7h6A1.5 1.5 0 0 1 15 8.5v7A1.5 1.5 0 0 1 13.5 17h-6A1.5 1.5 0 0 1 6 15.5v-7z" fill="#FFFFFF" />
          <path d="M15 10.5l4-2.5v8l-4-2.5v-3z" fill="#FFFFFF" />
        </svg>
      );

    // --- 4. DESIGN & GRAPHIC TOOLS ---
    case 'adobe-photoshop':
      return (
        <div className={`${className} rounded-lg bg-[#001E36] border border-[#31A8FF]/60 flex items-center justify-center font-bold text-[#31A8FF] text-xs font-mono shadow-sm`}>
          Ps
        </div>
      );

    case 'adobe-illustrator':
      return (
        <div className={`${className} rounded-lg bg-[#330000] border border-[#FF9A00]/60 flex items-center justify-center font-bold text-[#FF9A00] text-xs font-mono shadow-sm`}>
          Ai
        </div>
      );

    case 'adobe-indesign':
      return (
        <div className={`${className} rounded-lg bg-[#2D0017] border border-[#FF3366]/60 flex items-center justify-center font-bold text-[#FF3366] text-xs font-mono shadow-sm`}>
          Id
        </div>
      );

    case 'adobe-after-effects':
      return (
        <div className={`${className} rounded-lg bg-[#00005B] border border-[#9999FF]/60 flex items-center justify-center font-bold text-[#9999FF] text-xs font-mono shadow-sm`}>
          Ae
        </div>
      );

    case 'adobe-express':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="adobeExpGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8922EB" />
              <stop offset="50%" stopColor="#DA1F26" />
              <stop offset="100%" stopColor="#FF9A00" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#1C1C1E" stroke="#333333" strokeWidth="0.8" />
          <path
            d="M6 17.5L11.5 6h1L18 17.5h-2.5l-1.5-3.3h-4L8.5 17.5H6zm4.3-5.3h2.4L11.5 9.8l-1.2 2.4z"
            fill="url(#adobeExpGrad)"
          />
        </svg>
      );

    case 'adobe-creative-cloud':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="adobeCcGrad" x1="2" y1="6" x2="22" y2="18" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FA0F00" />
              <stop offset="35%" stopColor="#D5226D" />
              <stop offset="70%" stopColor="#9C27B0" />
              <stop offset="100%" stopColor="#2196F3" />
            </linearGradient>
          </defs>
          <path
            d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"
            stroke="url(#adobeCcGrad)"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      );

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

    case 'canva':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="canvaGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00C4CC" />
              <stop offset="100%" stopColor="#7D2AE8" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="10.5" fill="url(#canvaGrad)" />
          <path
            d="M15.5 8.5c-1.8-1-4.2-.6-5.5.9-1.5 1.7-1.5 4.5 0 6.2 1.3 1.5 3.7 1.9 5.5.9.6-.3.9-.9.6-1.5-.3-.6-.9-.8-1.5-.5-1.2.6-2.8.3-3.7-.7-1-1.1-1-3 0-4.1.9-1 2.5-1.3 3.7-.7.6.3 1.2.1 1.5-.5.3-.6 0-1.2-.6-1.5z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'inkscape':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#FFFFFF" aria-hidden="true">
          <path d="M2.2 12.8L12 2.5l9.8 10.3c.7.7.2 2-.8 2H3c-1 0-1.5-1.3-.8-2zm9.8-7.3L5.4 12.8h13.2L12 5.5zm-5 10.5c-.8 0-1.5.7-1.5 1.5S6.2 19 7 19s1.5-.7 1.5-1.5-.7-1.5-1.5-1.5zm10 0c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5z" />
        </svg>
      );

    // --- 5. VIDEO EDITING TOOLS ---
    case 'adobe-premiere-pro':
      return (
        <div className={`${className} rounded-lg bg-[#00005B] border border-[#EA77FF]/60 flex items-center justify-center font-bold text-[#EA77FF] text-xs font-mono shadow-sm`}>
          Pr
        </div>
      );

    case 'davinci-resolve':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="11" fill="#141416" stroke="#27272A" strokeWidth="0.8" />
          {/* Official DaVinci Resolve 3-blade color grading wheel */}
          <path d="M12 12 L12 3 A9 9 0 0 1 19.8 16.5 Z" fill="#E52E2E" />
          <path d="M12 12 L19.8 16.5 A9 9 0 0 1 4.2 16.5 Z" fill="#34A853" />
          <path d="M12 12 L4.2 16.5 A9 9 0 0 1 12 3 Z" fill="#2E6BE5" />
          <circle cx="12" cy="12" r="4.2" fill="#141416" stroke="#27272A" strokeWidth="0.8" />
          <circle cx="12" cy="12" r="2.2" fill="#FFFFFF" />
        </svg>
      );

    case 'capcut':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <rect x="1" y="1" width="22" height="22" rx="5.5" fill="#FFFFFF" />
          <path
            d="M5.6 10.2V8.2c0-.7.5-1.2 1.2-1.2h5.8l5.6 8.8"
            stroke="#111111"
            strokeWidth="2.15"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M12.6 17l5.6-8.8" stroke="#FFFFFF" strokeWidth="3.8" strokeLinecap="round" />
          <path
            d="M5.6 13.8v2c0 .7.5 1.2 1.2 1.2h5.8l5.6-8.8"
            stroke="#111111"
            strokeWidth="2.15"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    // --- 6. LIVE STREAMING TOOLS ---
    case 'prism-live-studio':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#221330" stroke="#7A22A1" strokeWidth="0.8" />
          {/* Triangular optical prism with dispersion */}
          <path d="M12 5L4 18h16L12 5z" fill="#FEE500" />
          <path d="M12 5L16 18h4L12 5z" fill="#00E5FF" fillOpacity="0.85" />
          <path d="M12 5L8 18H4L12 5z" fill="#FF007A" fillOpacity="0.85" />
        </svg>
      );

    case 'obs-studio':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#FFFFFF" aria-hidden="true">
          <circle cx="12" cy="12" r="10.5" fill="#18181B" stroke="#3F3F46" strokeWidth="0.9" />
          {/* OBS Studio 3-pinwheel icon */}
          <path d="M12 6a6 6 0 0 0-4.8 2.4l2.1 1.2A3.6 3.6 0 0 1 12 8.4V6zm-5.2 4.4a6 6 0 0 0 .8 5.3l1.8-1.5a3.6 3.6 0 0 1-.5-2.7l-2.1-1.1zm8.8 1.9l-2.1 1.2a3.6 3.6 0 0 1-3.2 1.8v2.4a6 6 0 0 0 5.3-5.4z" />
        </svg>
      );

    case 'streamlabs':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#0E2E20" stroke="#31B44B" strokeWidth="0.8" />
          <circle cx="9" cy="10" r="2.5" fill="#31B44B" />
          <circle cx="9" cy="10" r="1.1" fill="#FFFFFF" />
          <path d="M14 8c1.5 0 2.5 1 2.5 2.5s-1 2.5-2.5 2.5H8v3h8c3 0 5-2 5-5s-2-5-5-5h-2v2h2z" fill="#31B44B" />
        </svg>
      );

    // --- 7. AI & WRITING ASSISTANTS ---
    case 'chatgpt':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10.5" fill="#10A37F" />
          <path
            d="M12 6.2c1.6 0 2.9 1 3.4 2.4a3.6 3.6 0 0 1 2.2 5 3.6 3.6 0 0 1-2.5 4.2 3.6 3.6 0 0 1-6.2 0A3.6 3.6 0 0 1 6.4 13.6a3.6 3.6 0 0 1 2.2-5C9.1 7.2 10.4 6.2 12 6.2z"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          <circle cx="12" cy="12" r="2.1" stroke="#FFFFFF" strokeWidth="1.4" />
        </svg>
      );

    case 'deepseek':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#0B1A30" stroke="#1E6FFF" strokeWidth="0.8" />
          {/* DeepSeek leaping blue whale */}
          <path
            d="M4.5 14.5c2-1 4.5-.8 6.5.2 2 1 4.5 1.2 6.5.3 1.5-.7 2.5-2 3-3.5-1.2.3-2.5.2-3.6-.3-1.8-.8-3.9-.9-5.8-.2-1.8.7-3.7.8-5.5.2-.8-.3-1.2 1-1.1 1.8.2.8.8 1.4 1.5 1.5z"
            fill="#1E6FFF"
          />
          <circle cx="18" cy="9.5" r="1" fill="#FFFFFF" />
        </svg>
      );

    case 'google-gemini':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="geminiSpark" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4285F4" />
              <stop offset="55%" stopColor="#9B72CB" />
              <stop offset="100%" stopColor="#D96570" />
            </linearGradient>
          </defs>
          <path
            d="M12 2c.7 5.2 4.8 9.3 10 10-5.2.7-9.3 4.8-10 10-.7-5.2-4.8-9.3-10-10 5.2-.7 9.3-4.8 10-10z"
            fill="url(#geminiSpark)"
          />
        </svg>
      );

    case 'grammarly':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10.5" fill="#15C39A" />
          {/* Grammarly G circular arrow */}
          <path
            d="M15.5 10.5A4.5 4.5 0 1 0 16 14.5h-4"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    // --- 8. WEB DEVELOPMENT & CMS ---
    case 'wordpress':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
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

    // --- 9. DIGITAL PLATFORMS ---
    case 'meta':
      return (
        <svg viewBox="0 0 32 22" className={className} fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="metaLoop" x1="2" y1="6" x2="30" y2="16" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0081FB" />
              <stop offset="50%" stopColor="#0064E0" />
              <stop offset="100%" stopColor="#1A9BFF" />
            </linearGradient>
          </defs>
          <path
            d="M16 10.6C13.8 6.6 11.4 4.2 8.3 4.2 4.8 4.2 2.8 7.2 2.8 11.2c0 4 2.2 6.6 5.6 6.6 2.8 0 5-2.8 7.6-7.2 2.6-4.4 4.8-6.4 7.7-6.4 3.5 0 5.5 3 5.5 7 0 4-2.2 6.6-5.6 6.6-2.8 0-5.3-3.2-7.6-7.2z"
            stroke="url(#metaLoop)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'google':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.25 21.36 7.34 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.25 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.93 6.72-4.93z"
          />
        </svg>
      );

    case 'google-analytics':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <rect x="2.5" y="13.5" width="4.8" height="8" rx="2.4" fill="#F9AB00" />
          <rect x="9.6" y="7.5" width="4.8" height="14" rx="2.4" fill="#E37400" />
          <rect x="16.7" y="2.5" width="4.8" height="19" rx="2.4" fill="#E37400" />
          <circle cx="4.9" cy="8" r="2.4" fill="#F9AB00" />
        </svg>
      );

    default:
      break;
  }

  // 2. Check Simple Icons fallback for any monochromatic icon with valid 0 0 24 24 viewBox
  const simpleIcon = simpleIconsMap[normalizedId];
  if (simpleIcon) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill={`#${simpleIcon.hex}`}
        aria-hidden="true"
      >
        <path d={simpleIcon.path} />
      </svg>
    );
  }

  // 3. Clean fallback
  return (
    <div
      className={`${className} rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-300 font-mono`}
    >
      {toolId.slice(0, 2).toUpperCase()}
    </div>
  );
};
