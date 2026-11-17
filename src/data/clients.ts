export interface ClientBrand {
  id: string;
  name: string;
  category: 'collab' | 'promo';
  logoUrl: string;
  url?: string;
  type?: string;
  collaborationNote?: string;
}

export const collaborationBrands: ClientBrand[] = [
  {
    id: 'nanamaruya',
    name: 'Nanamaruya',
    category: 'collab',
    logoUrl: '/assets/extracted/clients/logos/nanmaruya.png',
    type: 'Fashion & Apparel',
    collaborationNote: 'Brand campaigns, lookbook photography, and social media visual direction.'
  },
  {
    id: 'ceylon-tastes',
    name: 'Ceylon Tastes',
    category: 'collab',
    logoUrl: '/assets/extracted/clients/logos/ceylon-tastes.png',
    type: 'Organic & Gourmet Food',
    collaborationNote: 'Product packaging design, superfood pouch architecture, and retail visuals.'
  },
  {
    id: 'dilshan-weragoda-photography',
    name: 'Dilshan Weragoda Photography',
    category: 'collab',
    logoUrl: '/assets/extracted/clients/logos/dilshan_weragoda.png',
    type: 'Visual Arts & Media',
    collaborationNote: 'Commercial photography production, studio portraiture, and color grading.'
  },
  {
    id: 'charuka-perera-photography',
    name: 'Charuka Perera Photography',
    category: 'collab',
    logoUrl: '/assets/extracted/clients/logos/charuka_perera.png',
    type: 'Creative Photography',
    collaborationNote: 'Visual brand identity, creative shoot collaborations, and post-production.'
  },
  {
    id: 'skyridge',
    name: 'Skyridge',
    category: 'collab',
    logoUrl: '/assets/extracted/clients/logos/skyridge.png',
    type: 'Outdoor & Adventure',
    collaborationNote: 'Brand positioning, digital marketing campaigns, and adventure reel production.'
  },
  {
    id: 'naruse',
    name: 'Naruse',
    category: 'collab',
    logoUrl: '/assets/extracted/clients/logos/naruse.png',
    type: 'Education & Language',
    collaborationNote: 'Digital presence, social campaign creatives, and brand visual guidelines.'
  },
  {
    id: 'styra',
    name: 'Styra',
    category: 'collab',
    logoUrl: '/assets/extracted/clients/logos/styra.png',
    type: 'Minimalist Fashion',
    collaborationNote: 'Minimalist brand direction, product shoots, and e-commerce promotional assets.'
  },
  {
    id: 'wora-digital-solution',
    name: 'W.O.R.A Digital Solution',
    category: 'collab',
    logoUrl: '/assets/extracted/clients/logos/wora_digital.png',
    type: 'Technology & IT',
    collaborationNote: 'UI/UX design systems, web platform interfaces, and corporate branding.'
  },
  {
    id: 'wora-clothing',
    name: 'WORA Clothing',
    category: 'collab',
    logoUrl: '/assets/extracted/clients/logos/wora_wear.png',
    type: 'Streetwear Brand',
    collaborationNote: 'Connected wordmark identity, apparel labels, unboxing boxes, and launch visuals.'
  },
  {
    id: 'imagine-bird',
    name: 'Imagine bird',
    category: 'collab',
    logoUrl: '/assets/extracted/clients/logos/imagine_bird.svg',
    type: 'Creative Studio & Visual Arts',
    collaborationNote: 'Commercial photography, creative direction, and brand storytelling visuals.'
  },
  {
    id: 'splendor-centre',
    name: 'Splendor Centre for Language and Music',
    category: 'collab',
    logoUrl: '/assets/extracted/clients/logos/splendor_centre.svg',
    type: 'Language & Music Academy',
    collaborationNote: 'Event photography, brand collateral, and creative campaign visual coverage.'
  },
  {
    id: 'gemsco-jewellers',
    name: 'Gemsco Jewellers',
    category: 'collab',
    logoUrl: '/assets/extracted/clients/logos/gemsco_jewellers.jpg',
    type: 'Fine Gemstones & Jewelry',
    collaborationNote: 'Luxury product photography, gemstone visual showcase, and promotional creatives.'
  },
  {
    id: 'redwood-cabins',
    name: 'Redwood Cabins',
    category: 'collab',
    logoUrl: '/assets/extracted/clients/logos/redwood_cabins.png',
    type: 'Eco Boutique Cabins & Hospitality',
    collaborationNote: 'Engaging Reels production, social media post creatives, and performance digital marketing.'
  },
  {
    id: 'detz-global',
    name: 'DETZ Global',
    category: 'collab',
    logoUrl: '/assets/extracted/clients/logos/detz_global.svg',
    type: 'Global Digital & Multi-Brand Agency',
    collaborationNote: 'Head of Digital Marketing directing campaigns and creative execution across multiple client companies.'
  }
];

export const promotionalBrands: ClientBrand[] = [
  {
    id: 'shoppes',
    name: 'Shoppes',
    category: 'promo',
    logoUrl: '/assets/extracted/clients/logos/shoppes.png',
    type: 'E-Commerce Retail',
    collaborationNote: 'Promotional campaign visuals and high-converting digital ad assets.'
  },
  {
    id: 'monara-tv',
    name: 'Monara TV',
    category: 'promo',
    logoUrl: '/assets/extracted/clients/logos/swarnavahini-tv.png',
    type: 'Media Broadcast',
    collaborationNote: 'Broadcast promotional creatives and multi-format digital campaign assets.'
  },
  {
    id: 'shree-fm',
    name: 'Shree FM (Lankawama Ekai)',
    category: 'promo',
    logoUrl: '/assets/extracted/clients/logos/lakhanda_fm.png',
    type: 'Radio Broadcast',
    collaborationNote: 'Promotional visual collateral and cross-platform audience campaign assets.'
  },
  {
    id: 'university-sjp',
    name: 'University of Sri Jayewardenepura',
    category: 'promo',
    logoUrl: '/assets/extracted/clients/logos/university_seal.png',
    type: 'Academic Institution',
    collaborationNote: 'Event branding, editorial print materials, and promotional campaign coverage.'
  },
  {
    id: 'astra',
    name: 'Astra',
    category: 'promo',
    logoUrl: '/assets/extracted/clients/logos/astra.png',
    type: 'Consumer Goods & FMCG',
    collaborationNote: 'FMCG promotional campaign visuals and digital audience engagement assets.'
  },
  {
    id: 'swarnavahini',
    name: 'Swarnavahini',
    category: 'promo',
    logoUrl: '/assets/extracted/clients/logos/swarnavahini.png',
    type: 'Broadcast Television',
    collaborationNote: 'Television campaign graphics, social promos, and broadcast visual support.'
  },
  {
    id: 'raja-jewellers',
    name: 'Raja Jewellers',
    category: 'promo',
    logoUrl: '/assets/extracted/clients/logos/raja_jewellers.png',
    type: 'Luxury Gold & Jewelry',
    collaborationNote: 'Luxury campaign creative assets, fine detail visual direction, and digital promos.'
  },
  {
    id: 'barista',
    name: 'Barista',
    category: 'promo',
    logoUrl: '/assets/extracted/clients/logos/barista.png',
    type: 'Artisan Coffee Roastery',
    collaborationNote: 'Seasonal promotional visuals, beverage storytelling, and digital campaign content.'
  },
  {
    id: 'viva',
    name: 'Viva',
    category: 'promo',
    logoUrl: '/assets/extracted/clients/logos/viva.png',
    type: 'Nutritional Drinks',
    collaborationNote: 'Consumer promotional artwork and campaign visual adaptation across channels.'
  },
  {
    id: 'atlas',
    name: 'Atlas',
    category: 'promo',
    logoUrl: '/assets/extracted/clients/logos/atlas.png',
    type: 'Stationery & Educational',
    collaborationNote: 'Back-to-school and promotional visual assets for retail & digital reach.'
  },
  {
    id: 'ictfromabc',
    name: 'ICT From ABC',
    category: 'promo',
    logoUrl: '/assets/extracted/clients/logos/ictfromabc.png',
    type: 'Digital Learning',
    collaborationNote: 'Educational campaign branding, social media graphics, and promotional videos.'
  }
];

export const clientStats = [
  { value: 7, suffix: '+', label: 'Experiences' },
  { value: 100, suffix: '+', label: 'Projects Done' },
  { value: 20, suffix: '+', label: 'Collab Projects Done' },
  { value: 90, suffix: '%', label: 'Customer Satisfaction' }
];
