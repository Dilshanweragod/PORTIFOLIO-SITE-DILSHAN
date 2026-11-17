export interface ExperienceItem {
  period: string;
  startYear: string;
  endYear: string;
  location: string;
  role: string;
  company: string;
  logoUrl?: string;
  description: string;
}

export interface EducationItem {
  period: string;
  startYear: string;
  endYear: string;
  location: string;
  degree: string;
  institution: string;
}

export interface ToolItem {
  name: string;
  abbr?: string;
  iconType: 'ae' | 'id' | 'figma' | 'pr' | 'wp' | 'ai' | 'ps' | 'capcut' | 'meta' | 'analytics';
  color: string;
  specialty: string;
}

export const experiences: ExperienceItem[] = [
  {
    period: '2018 - Present',
    startYear: '2018',
    endYear: 'Present',
    location: 'Colombo, Sri Lanka',
    company: 'Freelance & Brand Collaborations',
    role: 'Creative Director & Digital Strategist',
    description:
      'Partnered with 150+ local and international brands to build cohesive brand identities, packaging systems, and performance-driven digital campaigns—combining commercial photography, short-form videography, and Meta/Google ad strategy to achieve 50K+ average video views and up to 60% engagement growth.'
  },
  {
    period: '2022 - Present',
    startYear: '2022',
    endYear: 'Present',
    location: 'Colombo, Sri Lanka',
    company: 'DETZ Global (Pvt) Ltd.',
    logoUrl: '/assets/extracted/clients/logos/detz_global.svg',
    role: 'Co-Director | Digital Design & IT',
    description:
      'Leading multidisciplinary digital design, web UI/UX architecture, and growth marketing initiatives across client retainers. Directing visual production pipelines, brand launches, and social media storytelling tailored for scalable audience reach and measurable conversion impact.'
  },
  {
    period: '2021 - 2024',
    startYear: '2021',
    endYear: '2024',
    location: 'Colombo, Sri Lanka',
    company: 'Kingsport Global Logistic',
    role: 'Digital Designer & Creative Content Specialist',
    description:
      'Spearheaded corporate visual identity, promotional print collateral, photography, and multi-channel video campaigns. Elevated brand visibility across digital touchpoints through structured content calendars, motion graphics, and high-retention visual storytelling.'
  }
];

export const education: EducationItem[] = [
  {
    period: '2023 - 2025',
    startYear: '2023',
    endYear: '2025',
    location: 'London, UK',
    degree: 'BSc (Hons) Cyber Security and Digital Forensics',
    institution: 'University / Higher Education'
  },
  {
    period: '2021 - 2023',
    startYear: '2021',
    endYear: '2023',
    location: 'London, UK',
    degree: 'Higher Diploma / Professional Studies',
    institution: 'Pearson College London'
  }
];

export const approaches = [
  'Branding',
  'Photography',
  'Production',
  'Social Media'
];

export interface MilestoneStat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  context: string;
  detail: string;
}

export const keyMilestones: MilestoneStat[] = [
  {
    id: 'milestone-clients',
    label: 'Brand Collaborations',
    value: 150,
    suffix: '+',
    context: 'Direct Partnerships',
    detail: 'Partnered with 150+ regional and global brands across retail, hospitality, tech, and e-commerce.'
  },
  {
    id: 'milestone-reach',
    label: 'Average Video Views',
    value: 50,
    suffix: 'K+',
    context: 'Campaign Reach',
    detail: 'Short-form Reels, TikTok, and YouTube video productions delivering viral engagement and conversions.'
  },
  {
    id: 'milestone-engagement',
    label: 'Engagement Rate Lift',
    value: 60,
    suffix: '%',
    context: 'Growth Metrics',
    detail: 'Average organic engagement and retention growth achieved across managed digital channels.'
  },
  {
    id: 'milestone-experience',
    label: 'Years Industry Practice',
    value: 7,
    suffix: '+',
    context: 'Creative Direction',
    detail: 'Multi-disciplinary practice spanning commercial photography, branding, UI/UX, and performance ads.'
  }
];

export const toolsList: ToolItem[] = [
  { name: 'After Effects', abbr: 'Ae', iconType: 'ae', color: '#9999FF', specialty: 'Motion & Visual Effects' },
  { name: 'InDesign', abbr: 'Id', iconType: 'id', color: '#FF3366', specialty: 'Editorial & Print Layout' },
  { name: 'Figma', iconType: 'figma', color: '#00D2D3', specialty: 'UI/UX & Design Systems' },
  { name: 'Premiere Pro', abbr: 'Pr', iconType: 'pr', color: '#9999FF', specialty: 'Commercial Video Editing' },
  { name: 'WordPress', iconType: 'wp', color: '#21759B', specialty: 'Web & CMS Development' },
  { name: 'Illustrator', abbr: 'Ai', iconType: 'ai', color: '#FF9A00', specialty: 'Vector Logos & Packaging' },
  { name: 'Photoshop', abbr: 'Ps', iconType: 'ps', color: '#31A8FF', specialty: 'Retouching & Key Visuals' },
  { name: 'CapCut', iconType: 'capcut', color: '#FFFFFF', specialty: 'Short-Form Reels & Cuts' },
  { name: 'Meta', iconType: 'meta', color: '#0668E1', specialty: 'Paid Social & Funnel Ads' },
  { name: 'Google', iconType: 'analytics', color: '#4285F4', specialty: 'Search, Ads & Workspace Platform' },
  { name: 'DaVinci Resolve', abbr: 'Dv', iconType: 'pr', color: '#E52E2E', specialty: 'Color Grading & Post-Production' }
];

export const aboutStats = [
  { value: 7, suffix: '+', label: 'Years Experience' },
  { value: 100, suffix: '+', label: 'Projects Done' },
  { value: 90, suffix: '%', label: 'Happy Clients' }
];
