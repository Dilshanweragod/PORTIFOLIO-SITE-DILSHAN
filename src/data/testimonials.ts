export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  brandLogo: string;
  rating: number;
  quote: string;
  service: string;
  date?: string;
  verifiedLabel?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'imagine-bird',
    name: 'Isuru Thissera',
    role: 'Owner',
    company: 'Imagine bird',
    brandLogo: '/assets/extracted/clients/logos/imagine_bird.svg',
    rating: 5,
    quote:
      'From the first consultation to the final photos, Dilshan Weragoda Photography impressed me at every step. His keen eye for creative vision, and friendly professionalism make him a photographer you can trust completely.',
    service: 'Photography & Creative Vision',
    date: 'August 4, 2025',
  },
  {
    id: 'Splendor Centre for Language and Music',
    name: 'Deemana Perera',
    role: 'owner',
    company: 'Splendor Centre for Language & Music',
    brandLogo: '/assets/extracted/clients/logos/splendor_centre.svg',
    rating: 5,
    quote:
      'Pasindu delivers excellence from start to finish. His ability to capture moments with precision and artistry is unmatched, and his professionalism makes the process seamless. Truly worth recommending to anyone seeking quality work.',
    service: 'Photography & Event Artistry',
    date: 'August 6, 2025',
  },
  {
    id: 'gemsco-jewellers',
    name: 'Sadun Thissera',
    role: 'owner',
    company: 'Gemsco Jewellers',
    brandLogo: '/assets/extracted/clients/logos/gemsco_jewellers.jpg',
    rating: 5,
    quote:
      'Working with Pasindu was an absolute pleasure. His skill, creativity, and professionalism exceeded all expectations, and the results were nothing short of stunning. I highly recommend him to anyone who wants exceptional Dilshan Weragoda photography',
    service: 'Commercial Photography',
    date: 'August 8, 2025',
  },
  {
    id: 'wora-apparel',
    name: 'Dilshan',
    role: 'Founder & Creative Lead',
    company: 'WORA Clothing',
    brandLogo: '/assets/extracted/clients/logos/wora_wear.png',
    rating: 5,
    quote:
      'Pasindu translated our "Wear Your Identity" vision into an unmistakable connected wordmark, luxury unboxing packaging, and a cohesive streetwear visual system that immediately set WORA apart.',
    service: 'Branding & Apparel Design'
  },
  {
    id: 'ceylon-tastes',
    name: 'Dilani Perera',
    role: 'Head of Marketing',
    company: 'Ceylon Tastes',
    brandLogo: '/assets/extracted/clients/logos/ceylon-tastes.png',
    rating: 5,
    quote:
      'From botanical superfood pouch architecture to shelf-ready color coding and photorealistic renders, every packaging deliverable balanced regulatory clarity with unmistakable retail appeal.',
    service: 'Packaging & Visual Identity'
  },

  {
    id: 'skyridge',
    name: 'Dhananjaya Udara',
    role: 'Owner',
    company: 'Skyridge',
    brandLogo: '/assets/extracted/clients/logos/skyridge.png',
    rating: 5,
    quote:
      'Pasindu brought structure and energy to our entire digital rollout—pairing bold outdoor visual storytelling with targeted Meta campaigns that kept our audience consistently growing.',
    service: 'Brand Identity & Social Media'
  },
  {
    id: 'redwood-cabins',
    name: 'Dhananjaya Udara',
    role: 'Owner',
    company: 'Redwood Cabins',
    brandLogo: '/assets/extracted/clients/logos/redwood_cabins.png',
    rating: 5,
    quote:
      'Pasindu handled our Reels, social media posts, and digital marketing with real creative flair. His short-form videos captured the cozy atmosphere of Redwood Cabins and helped boost our reach and direct bookings.',
    service: 'Reels, Social Posts & Digital Marketing'
  },
  {
    id: 'detz-global',
    name: 'Nirod Sandeepa',
    role: 'Owner',
    company: 'DETZ Global',
    brandLogo: '/assets/extracted/clients/logos/detz_global.svg',
    rating: 5,
    quote:
      'Serving as our Head of Digital Marketing at DETZ Global, Pasindu led digital growth and multi-channel campaigns across numerous partner companies. His strategic leadership, adaptability, and consistent delivery across diverse client projects made him an invaluable pillar of our agency.',
    service: 'Head of Digital Marketing & Multi-Brand Campaigns'
  }
];
