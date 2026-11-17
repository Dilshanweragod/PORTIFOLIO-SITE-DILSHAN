export type BehanceCategory =
  | 'All'
  | 'Digital Marketing & Social'
  | 'UI/UX & Websites'
  | 'Branding & Graphic Design'
  | 'Packaging & Print';

export interface BehanceWorkItem {
  id: string;
  title: string;
  discipline: Exclude<BehanceCategory, 'All'>;
  year: string;
  scope: string;
  summary: string;
  objectives: string;
  responsibilities: string[];
  toolsUsed: string[];
  imageUrl: string;
  behanceUrl: string;
}

export const BEHANCE_PROFILE_URL = 'https://www.behance.net/dilshanweragoda';

export const behanceWorks: BehanceWorkItem[] = [
  {
    id: 'bh-multi-brand-social-growth',
    title: 'Multi-Brand Social & Video Campaign Direction',
    discipline: 'Digital Marketing & Social',
    year: '2024',
    scope: 'Paid Social · Short-Form Reels · 50K+ Avg Reach',
    summary:
      'Integrated campaign visuals, paid Meta creative variations, and vertical video storytelling developed across consumer, lifestyle, and corporate brand collaborations.',
    objectives:
      'Drive measurable audience retention and engagement growth across social feeds through cohesive visual hooks and platform-native formatting.',
    responsibilities: [
      'Creative direction & campaign visual system planning',
      'Short-form Reels editing, pacing, and key visual adaptation',
      'Meta Ads creative testing & engagement growth strategy'
    ],
    toolsUsed: ['Meta Ads Manager', 'CapCut', 'Premiere Pro', 'Photoshop'],
    imageUrl: '/assets/extracted/work_collage_clean.webp',
    behanceUrl: BEHANCE_PROFILE_URL
  },
  {
    id: 'bh-cineverse-app',
    title: 'CineVerse Mobile Streaming UI',
    discipline: 'UI/UX & Websites',
    year: '2024',
    scope: '15+ Mobile Flows · Dark UI System',
    summary:
      'Mobile-first cinema streaming experience featuring dynamic poster backdrops, offline playback, and subscription modals.',
    objectives:
      'Streamline discovery-to-playback flows on dark OLED mobile screens while maximizing content artwork visibility.',
    responsibilities: [
      'End-to-end wireframing and mobile information architecture',
      'Dark-mode design tokens, typography hierarchy, and UI components',
      'Interactive conversion modals and responsive states'
    ],
    toolsUsed: ['Figma', 'Photoshop', 'Illustrator'],
    imageUrl: '/assets/extracted/brochure_thumb.webp',
    behanceUrl: BEHANCE_PROFILE_URL
  },
  {
    id: 'bh-pixelforge-web',
    title: 'PixelForge AAA Gaming Platform',
    discipline: 'UI/UX & Websites',
    year: '2024',
    scope: 'Desktop Web Store · Merch & Media',
    summary:
      'High-contrast gaming catalog, accessory storefront, and editorial news layout engineered for wide-screen immersion.',
    objectives:
      'Unify game discovery, e-commerce merchandising, and editorial coverage into one responsive desktop web experience.',
    responsibilities: [
      'High-contrast storefront UI system and merchandising cards',
      'Responsive grid hierarchy and promotional banner composition',
      'Developer-ready component specs'
    ],
    toolsUsed: ['Figma', 'Photoshop', 'After Effects'],
    imageUrl: '/assets/extracted/behance_pixelforge.webp',
    behanceUrl: BEHANCE_PROFILE_URL
  },
  {
    id: 'bh-wora-identity',
    title: 'WORA Streetwear Identity & Apparel',
    discipline: 'Branding & Graphic Design',
    year: '2024',
    scope: 'Wordmark · Woven Labels · Packaging',
    summary:
      'Connected custom logotype, garment hang-tag specifications, tonal chest embroidery, and matte unboxing suite.',
    objectives:
      'Build an unmistakable streetwear emblem and cohesive tactile apparel identity across woven garments and packaging.',
    responsibilities: [
      'Custom logotype construction and brand guidelines',
      'Woven neck label and swing-tag production specs',
      'Merchandise mockups and brand launch visuals'
    ],
    toolsUsed: ['Illustrator', 'Photoshop', 'InDesign'],
    imageUrl: '/assets/extracted/wora_thumb.webp',
    behanceUrl: BEHANCE_PROFILE_URL
  },
  {
    id: 'bh-savor-packaging',
    title: 'SAVOR & Artisanal Gourmet Packaging',
    discipline: 'Packaging & Print',
    year: '2023',
    scope: 'Die-lines · 3D Retail Mockups',
    summary:
      'Tactile craft pouch, glass bottle, and sustainable bamboo sleeve packaging family designed for specialty retail shelves.',
    objectives:
      'Elevate retail shelf presence using structured die-lines, natural material finishes, and clear SKU hierarchy.',
    responsibilities: [
      'Structural packaging die-line layout and label hierarchy',
      'Botanical vector iconography and typography pairing',
      '3D retail visualization for stakeholder sign-off'
    ],
    toolsUsed: ['Illustrator', 'Photoshop', 'InDesign'],
    imageUrl: '/assets/extracted/packaging_thumb.webp',
    behanceUrl: BEHANCE_PROFILE_URL
  },
  {
    id: 'bh-sapphires-editorial',
    title: 'The Sapphires of Ceylon Monograph',
    discipline: 'Packaging & Print',
    year: '2023',
    scope: 'Editorial Spreads · Hardcover Print',
    summary:
      'Multi-spread fine gemstone catalog celebrating Sri Lankan sapphire origins, facet grading, and heritage jewelry houses.',
    objectives:
      'Translate luxury gemstone heritage into an authoritative coffee-table publication with refined grid pacing.',
    responsibilities: [
      'Multi-page editorial grid architecture and typography',
      'CMYK print pre-press setup and color proofing',
      'Macro gemstone layout retouching'
    ],
    toolsUsed: ['InDesign', 'Photoshop', 'Illustrator'],
    imageUrl: '/assets/extracted/book_design_thumb.webp',
    behanceUrl: BEHANCE_PROFILE_URL
  },
  {
    id: 'bh-ceylon-craft-tags',
    title: 'Artisanal Ceylon Brand Tag System',
    discipline: 'Branding & Graphic Design',
    year: '2023',
    scope: 'Custom Die-Cuts · Gold Foil Plates',
    summary:
      'Curated series of embossed, foil-stamped, and linen-corded product hang tags for Sri Lankan tea, spice, and craft labels.',
    objectives:
      'Craft distinctive boutique hang-tag systems suitable for metallic foil stamping and tactile export packaging.',
    responsibilities: [
      'Vector crest design and foil-plate separation preparation',
      'Material & finish specification for print vendors',
      'Brand family consistency across product SKUs'
    ],
    toolsUsed: ['Illustrator', 'InDesign', 'Photoshop'],
    imageUrl: '/assets/extracted/behance_ceylon_tags.webp',
    behanceUrl: BEHANCE_PROFILE_URL
  }
];
