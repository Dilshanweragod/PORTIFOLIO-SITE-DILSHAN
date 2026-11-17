export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName:
    | 'TrendingUp'
    | 'Share2'
    | 'Search'
    | 'Target'
    | 'Megaphone'
    | 'PenTool'
    | 'Video'
    | 'Camera';
  deliverables: string[];
}

export const services: ServiceItem[] = [
  {
    id: 'digital-marketing-strategy',
    title: 'Digital Marketing Strategy',
    description:
      'Full-funnel growth blueprints aligning audience research, channel mix, and measurable ROI targets.',
    iconName: 'TrendingUp',
    deliverables: [
      'Go-to-Market & Funnel Architecture',
      'Audience & Competitor Benchmarking',
      'Cross-Channel Campaign Planning',
      'GA4 & Looker Studio Attribution'
    ]
  },
  {
    id: 'social-media-management',
    title: 'Social Media Management',
    description:
      'Consistent brand voice, structured publishing calendars, and community growth across key social channels.',
    iconName: 'Share2',
    deliverables: [
      'Monthly Editorial Content Calendars',
      'Platform-Native Reels, Carousels & Stories',
      'Hootsuite & Native Scheduling Workflows',
      'Engagement & Audience Retention Tracking'
    ]
  },
  {
    id: 'search-engine-optimization',
    title: 'Search Engine Optimization',
    description:
      'Technical, on-page, and structured data optimization built to earn sustainable organic visibility.',
    iconName: 'Search',
    deliverables: [
      'Keyword Intent & Content Gap Audits',
      'On-Page Meta, Heading & Alt Structure',
      'Search Console Indexing & Core Web Vitals',
      'Schema.org Structured Data Markup'
    ]
  },
  {
    id: 'google-ads-search',
    title: 'Google Ads & Search Advertising',
    description:
      'High-intent Search campaigns engineered for qualified leads, clean keyword control, and efficient CPA.',
    iconName: 'Target',
    deliverables: [
      'Keyword Planner Research & Match Strategy',
      'Compelling Responsive Search Ad Copy',
      'Smart Bidding & Negative Keyword Hygiene',
      'Google Tag Manager Conversion Tracking'
    ]
  },
  {
    id: 'meta-advertising',
    title: 'Meta Advertising',
    description:
      'Scroll-stopping creative testing paired with precision Facebook & Instagram retargeting funnels.',
    iconName: 'Megaphone',
    deliverables: [
      'Awareness, Traffic & Conversion Funnels',
      'Custom & Lookalike Audience Segmentation',
      'High-CTR Static, Carousel & Reels Creatives',
      'Meta Pixel Tracking & ROAS Optimization'
    ]
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    description:
      'Distinctive visual identities, packaging systems, and marketing collateral that command immediate recall.',
    iconName: 'PenTool',
    deliverables: [
      'Brand Identity & Custom Logo Systems',
      'Product Packaging & Retail Die-Lines',
      'Print Collateral, Books & Merchandise',
      'Social Campaign Visual Toolkits'
    ]
  },
  {
    id: 'video-editing-content',
    title: 'Video Editing & Content Creation',
    description:
      'Story-driven commercial edits and short-form social videos designed to maximize watch time and action.',
    iconName: 'Video',
    deliverables: [
      'Brand Commercials & Promotional Films',
      'High-Retention TikTok & Instagram Reels',
      'Motion Graphics, Sound & Color Grading',
      'Scripted Storyboards & AI-Assisted Hooks'
    ]
  },
  {
    id: 'photography-visual-content',
    title: 'Photography & Visual Content',
    description:
      'Event coverage, editorial portraits, broadcast stages, and commercial shoots framed with artistic precision.',
    iconName: 'Camera',
    deliverables: [
      'Film Premieres, Broadcast & Stage Coverage',
      'Editorial Fashion, Pageant & Portraits',
      'Corporate, Hospitality & Product Shoots',
      'Precision Retouching & Color Mastering'
    ]
  }
];
