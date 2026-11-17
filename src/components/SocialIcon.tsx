import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { SocialPlatform } from '../data/socials';

interface SocialIconProps {
  platform: SocialPlatform;
  className?: string;
}

export const SocialIcon: React.FC<SocialIconProps> = ({ platform, className = 'w-4 h-4' }) => {
  switch (platform) {
    case 'facebook':
      return <Facebook className={className} aria-hidden="true" />;
    case 'instagram':
      return <Instagram className={className} aria-hidden="true" />;
    case 'linkedin':
      return <Linkedin className={className} aria-hidden="true" />;
    case 'behance':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
          className={className}
          aria-hidden="true"
        >
          <path d="M2 6h5.5c2 0 3.3.9 3.3 2.7 0 1.1-.5 1.9-1.4 2.3 1.2.5 1.9 1.5 1.9 2.9 0 2-1.5 3.1-3.7 3.1H2V6zm2.3 2v2.2h2.8c.9 0 1.4-.4 1.4-1.1S8 8 7.1 8H4.3zm0 4.1v2.9h3c1 0 1.6-.5 1.6-1.45 0-.95-.6-1.45-1.6-1.45h-3zM15 7.2h5.2v1.4H15V7.2zm2.6 2.4c-2.6 0-4.4 1.8-4.4 4.3 0 2.6 1.7 4.2 4.5 4.2 1.9 0 3.3-.9 3.9-2.4h-2.1c-.3.6-.9.9-1.7.9-1.2 0-2-.7-2.2-1.9h6.2c.1-.3.1-.6.1-.9 0-2.5-1.6-4.2-4.3-4.2zm-2.1 3.5c.2-1 .9-1.7 2-1.7s1.8.7 1.9 1.7h-3.9z" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      );
  }
};
