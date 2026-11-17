export type ToolCategory =
  | 'All'
  | 'Digital Marketing & Advertising'
  | 'Office Suites & File Management'
  | 'Communication Tools'
  | 'Design & Graphic Tools'
  | 'Video Editing Tools'
  | 'Live Streaming Tools'
  | 'AI & Writing Assistants'
  | 'Web Development & CMS'
  | 'Digital Platforms';

export type KnowledgeSource = 'Certification-Backed' | 'Practical Experience' | 'Certified & Practical';

export interface TechToolItem {
  id: string;
  name: string;
  category: Exclude<ToolCategory, 'All'>;
  description: string;
  officialUrl: string;
  knowledgeType: KnowledgeSource;
  proficiency: string;
  brandColor: string;
}

export const toolCategories: ToolCategory[] = [
  'All',
  'Digital Marketing & Advertising',
  'Office Suites & File Management',
  'Communication Tools',
  'Design & Graphic Tools',
  'Video Editing Tools',
  'Live Streaming Tools',
  'AI & Writing Assistants',
  'Web Development & CMS',
  'Digital Platforms'
];

export const techTools: TechToolItem[] = [
  // 1. Digital Marketing & Advertising (4 tools)
  {
    id: 'google-ads',
    name: 'Google Ads',
    category: 'Digital Marketing & Advertising',
    description: 'Search, Display, and Performance Max campaign structuring, bidding optimization, and negative keyword control.',
    officialUrl: 'https://ads.google.com/',
    knowledgeType: 'Certified & Practical',
    proficiency: 'Search Campaign Architecture',
    brandColor: '#4285F4'
  },
  {
    id: 'meta-ads',
    name: 'Meta Ads',
    category: 'Digital Marketing & Advertising',
    description: 'Full-funnel Facebook & Instagram ad sets, custom & lookalike retargeting, creative testing, and ROAS scaling.',
    officialUrl: 'https://www.facebook.com/business/tools/ads-manager',
    knowledgeType: 'Practical Experience',
    proficiency: 'Paid Social Growth & ROAS',
    brandColor: '#0082FB'
  },
  {
    id: 'linkedin-ads',
    name: 'LinkedIn Ads',
    category: 'Digital Marketing & Advertising',
    description: 'B2B persona targeting, sponsored content distribution, and matched audience lead generation for decision-makers.',
    officialUrl: 'https://business.linkedin.com/marketing-solutions/ads',
    knowledgeType: 'Practical Experience',
    proficiency: 'B2B Audience Targeting',
    brandColor: '#0A66C2'
  },
  {
    id: 'youtube-ads',
    name: 'YouTube Ads',
    category: 'Digital Marketing & Advertising',
    description: 'Skippable and bumper video ad campaigns targeting high-intent viewership, consideration, and brand recall.',
    officialUrl: 'https://ads.google.com/home/campaigns/video-ads/',
    knowledgeType: 'Practical Experience',
    proficiency: 'Video Ad Placement & Reach',
    brandColor: '#FF0000'
  },

  // 2. Office Suites & File Management (10 tools)
  {
    id: 'google-docs',
    name: 'Google Docs',
    category: 'Office Suites & File Management',
    description: 'Collaborative cloud document editing, briefs, content strategy drafts, and client proposals.',
    officialUrl: 'https://workspace.google.com/products/docs/',
    knowledgeType: 'Practical Experience',
    proficiency: 'Cloud Collaboration Docs',
    brandColor: '#4285F4'
  },
  {
    id: 'google-sheets',
    name: 'Google Sheets',
    category: 'Office Suites & File Management',
    description: 'Data analytics tracking, campaign budget forecasting, editorial scheduling, and performance metrics.',
    officialUrl: 'https://workspace.google.com/products/sheets/',
    knowledgeType: 'Practical Experience',
    proficiency: 'Spreadsheets & Analytics',
    brandColor: '#34A853'
  },
  {
    id: 'microsoft-word',
    name: 'Microsoft Word',
    category: 'Office Suites & File Management',
    description: 'Professional document authoring, contracts, agreements, and structured reports.',
    officialUrl: 'https://www.microsoft.com/en-us/microsoft-365/word',
    knowledgeType: 'Practical Experience',
    proficiency: 'Word Processing & Reports',
    brandColor: '#2B579A'
  },
  {
    id: 'microsoft-excel',
    name: 'Microsoft Excel',
    category: 'Office Suites & File Management',
    description: 'Advanced financial modeling, client data tracking, and quantitative campaign audits.',
    officialUrl: 'https://www.microsoft.com/en-us/microsoft-365/excel',
    knowledgeType: 'Practical Experience',
    proficiency: 'Spreadsheet Modeling',
    brandColor: '#217346'
  },
  {
    id: 'microsoft-powerpoint',
    name: 'Microsoft PowerPoint',
    category: 'Office Suites & File Management',
    description: 'High-impact client pitch decks, visual presentations, and strategic proposal delivery.',
    officialUrl: 'https://www.microsoft.com/en-us/microsoft-365/powerpoint',
    knowledgeType: 'Practical Experience',
    proficiency: 'Strategic Pitch Decks',
    brandColor: '#B7472A'
  },
  {
    id: 'adobe-acrobat',
    name: 'Adobe Acrobat',
    category: 'Office Suites & File Management',
    description: 'PDF creation, editorial proofing, interactive forms, and secure document sharing.',
    officialUrl: 'https://www.adobe.com/acrobat.html',
    knowledgeType: 'Practical Experience',
    proficiency: 'PDF Workflow & Proofing',
    brandColor: '#EC1C24'
  },
  {
    id: 'draw-io',
    name: 'Draw.io',
    category: 'Office Suites & File Management',
    description: 'Visual workflow diagrams, marketing funnels, sitemaps, and architecture blueprints.',
    officialUrl: 'https://app.diagrams.net/',
    knowledgeType: 'Practical Experience',
    proficiency: 'Funnel & Workflow Mapping',
    brandColor: '#F08705'
  },
  {
    id: 'google-workspace',
    name: 'Google Workspace',
    category: 'Office Suites & File Management',
    description: 'Integrated cloud communication, Gmail business email, Drive storage, and team productivity.',
    officialUrl: 'https://workspace.google.com/',
    knowledgeType: 'Practical Experience',
    proficiency: 'Cloud Productivity Ecosystem',
    brandColor: '#34A853'
  },
  {
    id: 'microsoft-office',
    name: 'Microsoft Office',
    category: 'Office Suites & File Management',
    description: 'Comprehensive productivity suite for document management, spreadsheets, and professional presentations.',
    officialUrl: 'https://www.microsoft.com/en-us/microsoft-365',
    knowledgeType: 'Practical Experience',
    proficiency: 'Enterprise Productivity Suite',
    brandColor: '#D83B01'
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    category: 'Office Suites & File Management',
    description: 'Secure cloud file storage, high-resolution media asset sharing, and client deliverables transfer.',
    officialUrl: 'https://www.dropbox.com/',
    knowledgeType: 'Practical Experience',
    proficiency: 'Cloud Media Storage',
    brandColor: '#0061FF'
  },

  // 3. Communication Tools (5 tools)
  {
    id: 'microsoft-teams',
    name: 'Microsoft Teams',
    category: 'Communication Tools',
    description: 'Enterprise video conferencing, channel collaboration, and stakeholder communication.',
    officialUrl: 'https://www.microsoft.com/en-us/microsoft-365/microsoft-teams/group-chat-software',
    knowledgeType: 'Practical Experience',
    proficiency: 'Enterprise Collaboration',
    brandColor: '#6264A7'
  },
  {
    id: 'outlook',
    name: 'Microsoft Outlook',
    category: 'Communication Tools',
    description: 'Professional email communication, calendar management, and client scheduling.',
    officialUrl: 'https://outlook.live.com/',
    knowledgeType: 'Practical Experience',
    proficiency: 'Email & Calendar Ops',
    brandColor: '#0078D4'
  },
  {
    id: 'gmail',
    name: 'Gmail',
    category: 'Communication Tools',
    description: 'Direct client communication, Gmail API integration, and campaign dispatch coordination.',
    officialUrl: 'https://mail.google.com/',
    knowledgeType: 'Practical Experience',
    proficiency: 'Client Communications',
    brandColor: '#EA4335'
  },
  {
    id: 'google-meet',
    name: 'Google Meet',
    category: 'Communication Tools',
    description: 'Virtual client consultations, discovery calls, and campaign review presentations.',
    officialUrl: 'https://meet.google.com/',
    knowledgeType: 'Practical Experience',
    proficiency: 'Video Consultations',
    brandColor: '#00832D'
  },
  {
    id: 'zoom',
    name: 'Zoom',
    category: 'Communication Tools',
    description: 'High-definition video meetings, strategy workshops, and remote team syncs.',
    officialUrl: 'https://zoom.us/',
    knowledgeType: 'Practical Experience',
    proficiency: 'Virtual Strategy Sessions',
    brandColor: '#2D8CFF'
  },

  // 4. Design & Graphic Tools (9 tools)
  {
    id: 'adobe-photoshop',
    name: 'Adobe Photoshop',
    category: 'Design & Graphic Tools',
    description: 'Commercial photo retouching, color grading, key visual compositing, and campaign artwork mastery.',
    officialUrl: 'https://www.adobe.com/products/photoshop.html',
    knowledgeType: 'Practical Experience',
    proficiency: 'Retouching & Key Visuals',
    brandColor: '#31A8FF'
  },
  {
    id: 'adobe-illustrator',
    name: 'Adobe Illustrator',
    category: 'Design & Graphic Tools',
    description: 'Precision vector brand marks, typography systems, packaging die-lines, and scalable print graphics.',
    officialUrl: 'https://www.adobe.com/products/illustrator.html',
    knowledgeType: 'Practical Experience',
    proficiency: 'Logos & Packaging Die-Lines',
    brandColor: '#FF9A00'
  },
  {
    id: 'adobe-indesign',
    name: 'Adobe InDesign',
    category: 'Design & Graphic Tools',
    description: 'Editorial layouts, print-ready publications, brochures, and corporate lookbooks.',
    officialUrl: 'https://www.adobe.com/products/indesign.html',
    knowledgeType: 'Practical Experience',
    proficiency: 'Editorial & Print Layout',
    brandColor: '#FF3366'
  },
  {
    id: 'adobe-after-effects',
    name: 'Adobe After Effects',
    category: 'Design & Graphic Tools',
    description: 'Motion graphics, compositing, title animations, and visual effects for branded video content.',
    officialUrl: 'https://www.adobe.com/products/aftereffects.html',
    knowledgeType: 'Practical Experience',
    proficiency: 'Motion & Visual Effects',
    brandColor: '#9999FF'
  },
  {
    id: 'adobe-express',
    name: 'Adobe Express',
    category: 'Design & Graphic Tools',
    description: 'Rapid social media graphics creation and template-driven visual content production.',
    officialUrl: 'https://www.adobe.com/express/',
    knowledgeType: 'Practical Experience',
    proficiency: 'Rapid Social Assets',
    brandColor: '#FF4500'
  },
  {
    id: 'adobe-creative-cloud',
    name: 'Adobe Creative Cloud',
    category: 'Design & Graphic Tools',
    description: 'Ecosystem integration across professional media apps, font libraries, and cloud storage.',
    officialUrl: 'https://www.adobe.com/creativecloud.html',
    knowledgeType: 'Practical Experience',
    proficiency: 'Professional Media Ecosystem',
    brandColor: '#DA1F26'
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'Design & Graphic Tools',
    description: 'Interface design, collaborative prototyping, design systems, and responsive layouts.',
    officialUrl: 'https://www.figma.com/',
    knowledgeType: 'Practical Experience',
    proficiency: 'UI/UX & Design Systems',
    brandColor: '#A259FF'
  },
  {
    id: 'canva',
    name: 'Canva',
    category: 'Design & Graphic Tools',
    description: 'Rapid brand-kit social templates and collaborative visual systems empowering fast client turnaround.',
    officialUrl: 'https://www.canva.com/',
    knowledgeType: 'Practical Experience',
    proficiency: 'Scalable Social Kits',
    brandColor: '#00C4CC'
  },
  {
    id: 'inkscape',
    name: 'Inkscape',
    category: 'Design & Graphic Tools',
    description: 'Open-source vector illustration, SVG editing, and graphical design work.',
    officialUrl: 'https://inkscape.org/',
    knowledgeType: 'Practical Experience',
    proficiency: 'Vector & SVG Graphics',
    brandColor: '#000000'
  },

  // 5. Video Editing Tools (3 tools)
  {
    id: 'adobe-premiere-pro',
    name: 'Adobe Premiere Pro',
    category: 'Video Editing Tools',
    description: 'Commercial narrative editing, pacing, audio mastering, and cinematic color workflows.',
    officialUrl: 'https://www.adobe.com/products/premiere.html',
    knowledgeType: 'Practical Experience',
    proficiency: 'Commercial Video Editing',
    brandColor: '#9999FF'
  },
  {
    id: 'davinci-resolve',
    name: 'DaVinci Resolve',
    category: 'Video Editing Tools',
    description: 'Professional color grading, cinematic post-production, node-based grading, and Fairlight audio.',
    officialUrl: 'https://www.blackmagicdesign.com/products/davinciresolve',
    knowledgeType: 'Practical Experience',
    proficiency: 'Cinematic Color & Editing',
    brandColor: '#1B1B1B'
  },
  {
    id: 'capcut',
    name: 'CapCut',
    category: 'Video Editing Tools',
    description: 'Dynamic vertical social reels, kinetic captions, and punchy transitions built for mobile retention.',
    officialUrl: 'https://www.capcut.com/',
    knowledgeType: 'Practical Experience',
    proficiency: 'Short-Form Reels Production',
    brandColor: '#FFFFFF'
  },

  // 6. Live Streaming Tools (3 tools)
  {
    id: 'prism-live-studio',
    name: 'Prism Live Studio',
    category: 'Live Streaming Tools',
    description: 'Multi-platform live streaming to Facebook, YouTube, and Instagram with professional overlays.',
    officialUrl: 'https://prismlive.com/',
    knowledgeType: 'Practical Experience',
    proficiency: 'Multi-Platform Mobile Live',
    brandColor: '#4A154B'
  },
  {
    id: 'obs-studio',
    name: 'OBS Studio',
    category: 'Live Streaming Tools',
    description: 'Advanced desktop live streaming, video capture, scene composition, and broadcast production.',
    officialUrl: 'https://obsproject.com/',
    knowledgeType: 'Practical Experience',
    proficiency: 'Professional Broadcast Production',
    brandColor: '#333333'
  },
  {
    id: 'streamlabs',
    name: 'Streamlabs',
    category: 'Live Streaming Tools',
    description: 'Stream broadcasting software equipped with engagement widgets, alerts, and custom layouts.',
    officialUrl: 'https://streamlabs.com/',
    knowledgeType: 'Practical Experience',
    proficiency: 'Interactive Live Streaming',
    brandColor: '#31B44B'
  },

  // 7. AI & Writing Assistants (4 tools)
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: 'AI & Writing Assistants',
    description: 'Structured content outlines, audience persona brainstorming, and rapid creative brief refinement.',
    officialUrl: 'https://chatgpt.com/',
    knowledgeType: 'Practical Experience',
    proficiency: 'Content & Prompt Systems',
    brandColor: '#10A37F'
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    category: 'AI & Writing Assistants',
    description: 'Advanced reasoning models for technical research, data analysis, and copywriting acceleration.',
    officialUrl: 'https://www.deepseek.com/',
    knowledgeType: 'Practical Experience',
    proficiency: 'Advanced Reasoning & Copy',
    brandColor: '#4D6BFE'
  },
  {
    id: 'google-gemini',
    name: 'Google Gemini',
    category: 'AI & Writing Assistants',
    description: 'Campaign ideation, multi-channel copy drafting, market research synthesis, and workflow acceleration.',
    officialUrl: 'https://gemini.google.com/',
    knowledgeType: 'Certified & Practical',
    proficiency: 'AI Strategy & Ideation',
    brandColor: '#4E8DF5'
  },
  {
    id: 'grammarly',
    name: 'Grammarly',
    category: 'AI & Writing Assistants',
    description: 'Professional copywriting refinement, tone adjustment, clarity enhancement, and grammar polishing.',
    officialUrl: 'https://www.grammarly.com/',
    knowledgeType: 'Practical Experience',
    proficiency: 'Copy Polishing & Tone',
    brandColor: '#15C39A'
  },

  // 8. Web Development & CMS (1 tool)
  {
    id: 'wordpress',
    name: 'WordPress',
    category: 'Web Development & CMS',
    description: 'Website publishing, custom WordPress CMS architecture, and marketing site maintenance.',
    officialUrl: 'https://wordpress.org/',
    knowledgeType: 'Practical Experience',
    proficiency: 'Web & CMS Publishing',
    brandColor: '#21759B'
  },

  // 9. Digital Platforms (2 tools)
  {
    id: 'meta',
    name: 'Meta',
    category: 'Digital Platforms',
    description: 'Comprehensive social ecosystem spanning Facebook, Instagram, WhatsApp, and Meta business platform tools.',
    officialUrl: 'https://about.meta.com/',
    knowledgeType: 'Practical Experience',
    proficiency: 'Social Platform Strategy',
    brandColor: '#0866FF'
  },
  {
    id: 'google',
    name: 'Google',
    category: 'Digital Platforms',
    description: 'Global Google ecosystem encompassing Search engine optimization, Cloud ecosystem, and digital web infrastructure.',
    officialUrl: 'https://about.google/',
    knowledgeType: 'Certified & Practical',
    proficiency: 'Search & Ecosystem Integration',
    brandColor: '#4285F4'
  }
];
