export type SocialPlatform = 'facebook' | 'instagram' | 'linkedin' | 'behance' | 'tiktok';

export interface SocialChannelItem {
  id: string;
  platform: SocialPlatform;
  label: string;
  shortLabel: string;
  ariaLabel: string;
  href: string;
}

export interface SocialChannelGroup {
  id: 'photo-video' | 'design-marketing' | 'personal';
  title: string;
  items: SocialChannelItem[];
}

export const SOCIAL_URLS = {
  photographyFacebook: 'https://www.facebook.com/dilshanweragoda.photogr',
  photographyInstagram:
    'https://www.instagram.com/__dilshan__weragoda__?obrf=MWV2aHozZXRiZ2p3NA%3D%3D&utm_source=qr',
  behance: 'https://www.behance.net/dilshanweragoda',
  linkedin: 'https://www.linkedin.com/in/dilshan-weragoda/',
  tiktok: 'https://www.tiktok.com/@dilshanweragoda?_r=1&_t=ZS-9BQiGxbsAJ4',
  personalFacebook: 'https://www.facebook.com/dilshan.weragoda.48',
  personalInstagram:
    'https://www.instagram.com/__dilshan__weragoda__?obrf=MWV2aHozZXRiZ2p3NA%3D%3D&utm_source=qr'
} as const;

const personalProfileItems: SocialChannelItem[] = [
  {
    id: 'personal-linkedin',
    platform: 'linkedin',
    label: 'LinkedIn',
    shortLabel: 'LinkedIn',
    ariaLabel: 'Personal LinkedIn Profile',
    href: SOCIAL_URLS.linkedin
  },
  {
    id: 'personal-tiktok',
    platform: 'tiktok',
    label: 'TikTok',
    shortLabel: 'TikTok',
    ariaLabel: 'Personal TikTok Profile',
    href: SOCIAL_URLS.tiktok
  },
  {
    id: 'personal-fb',
    platform: 'facebook',
    label: 'Facebook',
    shortLabel: 'Facebook',
    ariaLabel: 'Personal Facebook Profile',
    href: SOCIAL_URLS.personalFacebook
  },
  {
    id: 'personal-ig',
    platform: 'instagram',
    label: 'Instagram',
    shortLabel: 'Instagram',
    ariaLabel: 'Personal Instagram Profile',
    href: SOCIAL_URLS.personalInstagram
  }
];

// Personal Profile circular icons + Behance shown in the Hero section
export const heroSocialLinks: SocialChannelItem[] = [
  ...personalProfileItems,
  {
    id: 'hero-behance',
    platform: 'behance',
    label: 'Behance',
    shortLabel: 'Behance',
    ariaLabel: 'Behance Portfolio',
    href: SOCIAL_URLS.behance
  }
];

// Categorized channel groups shown in Contact and Footer
export const socialChannelGroups: SocialChannelGroup[] = [
  {
    id: 'photo-video',
    title: 'Photography & Videography',
    items: [
      {
        id: 'photo-fb',
        platform: 'facebook',
        label: 'Facebook Page',
        shortLabel: 'Facebook',
        ariaLabel: 'Photography & Videography Facebook Page',
        href: SOCIAL_URLS.photographyFacebook
      },
      {
        id: 'photo-ig',
        platform: 'instagram',
        label: 'Instagram',
        shortLabel: 'Instagram',
        ariaLabel: 'Photography & Videography Instagram Profile',
        href: SOCIAL_URLS.photographyInstagram
      }
    ]
  },
  {
    id: 'design-marketing',
    title: 'Graphic Design & Digital Marketing',
    items: [
      {
        id: 'design-behance',
        platform: 'behance',
        label: 'Behance Portfolio',
        shortLabel: 'Behance',
        ariaLabel: 'Graphic Design & Digital Marketing Behance Portfolio',
        href: SOCIAL_URLS.behance
      }
    ]
  },
  {
    id: 'personal',
    title: 'Personal Profile',
    items: personalProfileItems
  }
];
