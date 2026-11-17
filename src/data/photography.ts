export type PhotographyCategory =
  | 'All'
  | 'Film'
  | 'TV'
  | 'Ceremony'
  | 'Birthdays'
  | 'Fashion'
  | 'Corporate';

export type PhotographyAspect = 'landscape' | 'portrait' | 'collage' | 'square';

export interface PhotographyProject {
  id: string;
  title: string;
  category: Exclude<PhotographyCategory, 'All'>;
  categoryLabel: string;
  year: string;
  photoCount: string;
  client: string;
  imageUrl: string;
  aspect: PhotographyAspect;
  focalPosition: 'center' | 'top' | 'upper';
  isCategoryCover?: boolean;
  facebookUrl: string;
  summary: string;
  highlights: string[];
}

export interface PhotographyAlbumItem {
  title: string;
  itemCount: number | null;
}

export interface PhotographyArchiveGroup {
  id: Exclude<PhotographyCategory, 'All'>;
  label: string;
  title: string;
  subtitle: string;
  albums: PhotographyAlbumItem[];
}

export const PHOTOGRAPHY_FACEBOOK_URL = 'https://www.facebook.com/dilshanweragoda.photogr';

export const photographyCategories: { id: PhotographyCategory; label: string }[] = [
  { id: 'All', label: 'All Disciplines' },
  { id: 'Film', label: 'Film & Media' },
  { id: 'TV', label: 'TV, Radio & Stage' },
  { id: 'Ceremony', label: 'Graduations & Ceremonies' },
  { id: 'Birthdays', label: 'Birthdays & Portraits' },
  { id: 'Fashion', label: 'Fashion & Modeling' },
  { id: 'Corporate', label: 'Corporate & Commercial' }
];

export const photographyProjects: PhotographyProject[] = [
  {
    id: 'mariya-film-release',
    title: 'Mariya ("මාරියා - The Ocean") — Film Release Press & Media Show',
    category: 'Film',
    categoryLabel: 'Film & Media Events',
    year: '2024',
    photoCount: '172 Photos',
    client: 'Aruna Jayawardana Cinema Release',
    imageUrl: '/assets/photography/film-mariya-release.webp',
    aspect: 'landscape',
    focalPosition: 'upper',
    isCategoryCover: true,
    facebookUrl: PHOTOGRAPHY_FACEBOOK_URL,
    summary:
      'Official red-carpet press briefing and national television media coverage for the feature film Mariya, capturing lead cast interviews before broadcast networks.',
    highlights: ['National TV Press Wall', '172-Frame Album', 'Cinema Launch Coverage']
  },
  {
    id: 'raaz-film-muhurat-festival',
    title: 'RAAZ Film Muhurat Festival — Cast & Premiere Launch',
    category: 'Film',
    categoryLabel: 'Film & Media Events',
    year: '2024',
    photoCount: '60 Photos',
    client: 'Ashok Film Production & Shane Aarya',
    imageUrl: '/assets/photography/film-raaz-muhurat.webp',
    aspect: 'landscape',
    focalPosition: 'upper',
    facebookUrl: PHOTOGRAPHY_FACEBOOK_URL,
    summary:
      'Muhurat festival portraits and production unveiling for RAAZ, featuring principal cast in traditional attire framed against the official premiere backdrop.',
    highlights: ['Movie Muhurat Launch', 'Cast Portraiture', 'Official Event Unit']
  },
  {
    id: 'sirasa-tv-fm-stage',
    title: 'Sirasa TV / FM & DBC Stage — Live Media Broadcast Coverage',
    category: 'TV',
    categoryLabel: 'TV, Radio & Stage Shows',
    year: '2024',
    photoCount: '50 Photos',
    client: 'Sirasa TV / FM, TV1 & National Broadcast Networks',
    imageUrl: '/assets/photography/tv-sirasa-stage-dbc.webp',
    aspect: 'landscape',
    focalPosition: 'upper',
    isCategoryCover: true,
    facebookUrl: PHOTOGRAPHY_FACEBOOK_URL,
    summary:
      'Live stage, radio, and television broadcast documentation spanning DBC podium addresses, Sirasa TV/FM specials, Monara TV Chat & Tune, and concert coverage.',
    highlights: ['Live Broadcast Stage', 'Speaker Candid Framing', 'Low-Light Event Control']
  },
  {
    id: 'momentum-26-batch-celebration',
    title: "Momentum '26 — Sri Dharmaloka College Batch Event",
    category: 'Ceremony',
    categoryLabel: 'Graduations & Ceremonies',
    year: '2024',
    photoCount: '340 Photos',
    client: 'Sri Dharmaloka College 23 O/L & 26 A/L Batch',
    imageUrl: '/assets/photography/ceremony-momentum-26.webp',
    aspect: 'landscape',
    focalPosition: 'center',
    isCategoryCover: true,
    facebookUrl: PHOTOGRAPHY_FACEBOOK_URL,
    summary:
      "Full-evening documentation of Sri Dharmaloka College's Momentum '26 batch celebration, from the King & Queen crowning stage and live concert to bespoke commemorative details.",
    highlights: ['340-Photo Event Album', 'Stage & Crowning Coverage', 'Detail Craftsmanship']
  },
  {
    id: 'convocation-graduates-excellence',
    title: 'University Convocation — Academic Milestone Portraits',
    category: 'Ceremony',
    categoryLabel: 'Graduations & Ceremonies',
    year: '2024',
    photoCount: '19 Photos',
    client: 'University Convocation Honorees',
    imageUrl: '/assets/photography/ceremony-university-convocation.webp',
    aspect: 'collage',
    focalPosition: 'center',
    facebookUrl: PHOTOGRAPHY_FACEBOOK_URL,
    summary:
      'Outdoor natural-light graduation portraits celebrating academic regalia, ceremonial garlands, floral bouquets, and proud milestone family keepsakes.',
    highlights: ['Ceremonial Regalia', 'Soft Natural Bokeh', 'Graduand Editorial']
  },
  {
    id: 'purple-lotus-studio-portrait',
    title: 'Heritage Purple Lotus Saree — Studio Portrait Session',
    category: 'Birthdays',
    categoryLabel: 'Birthdays & Portraits',
    year: '2024',
    photoCount: '11 Photos',
    client: 'Studio Heritage Portrait',
    imageUrl: '/assets/photography/portrait-purple-lotus-saree.webp',
    aspect: 'portrait',
    focalPosition: 'upper',
    isCategoryCover: true,
    facebookUrl: PHOTOGRAPHY_FACEBOOK_URL,
    summary:
      'Controlled key-light studio portrait celebrating hand-painted purple lotus saree drapery, pearlescent accents, and clean chromatic harmony against a studio backdrop.',
    highlights: ['Controlled Studio Lighting', 'Hand-Painted Saree Focus', 'Editorial Portraiture']
  },
  {
    id: 'daranee-denipitiya-enchanted-forest',
    title: 'Daranee Denipitiya — Enchanted Forest Birthday Shoot',
    category: 'Birthdays',
    categoryLabel: 'Birthdays & Portraits',
    year: '2024',
    photoCount: '20 Photos',
    client: 'Daranee Denipitiya',
    imageUrl: '/assets/photography/birthday-daranee-forest.webp',
    aspect: 'collage',
    focalPosition: 'center',
    facebookUrl: PHOTOGRAPHY_FACEBOOK_URL,
    summary:
      'Storybook woodland birthday session featuring a vintage ivory lace gown, floral halo headpiece, crimson rose accent, and tranquil forest stream reflections.',
    highlights: ['Deep Forest Greenery', 'Stream Reflection Framing', 'Fairytale Styling']
  },
  {
    id: 'golden-sands-ocean-birthday',
    title: 'Golden Sands Ocean Birthday — Beachside Session',
    category: 'Birthdays',
    categoryLabel: 'Birthdays & Portraits',
    year: '2024',
    photoCount: '16 Photos',
    client: 'Kandana Coastal Portrait',
    imageUrl: '/assets/photography/birthday-golden-sands-beach.webp',
    aspect: 'collage',
    focalPosition: 'center',
    facebookUrl: PHOTOGRAPHY_FACEBOOK_URL,
    summary:
      'Breezy shoreline birthday session where ocean waves meet golden sand, pairing pastel blue styling with timeless monochrome portraits along the coast.',
    highlights: ['Ocean Shoreline Frame', 'Color & Monochrome Mix', 'Golden Hour Breeze']
  },
  {
    id: 'first-birthday-joyous-chapters',
    title: 'Milestone 1st Birthday — Joyous Childhood Chapters',
    category: 'Birthdays',
    categoryLabel: 'Birthdays & Portraits',
    year: '2024',
    photoCount: '30 Photos',
    client: 'Private Family Celebration',
    imageUrl: '/assets/photography/birthday-first-milestone.webp',
    aspect: 'collage',
    focalPosition: 'center',
    facebookUrl: PHOTOGRAPHY_FACEBOOK_URL,
    summary:
      'Candid outdoor toddler portraiture paired with a custom blue bear tiered birthday cake, preserving genuine laughter and playful milestone expressions.',
    highlights: ['Custom Bear Cake Set', 'Fast Candid Capture', 'Warm Family Keepsake']
  },
  {
    id: 'manhunt-sri-lanka-fashion',
    title: 'Manhunt International Sri Lanka — Pageant & Editorial Fashion',
    category: 'Fashion',
    categoryLabel: 'Fashion & Modeling',
    year: '2025',
    photoCount: '54 Photos',
    client: 'Manhunt International Sri Lanka & The Walk Model Academy',
    imageUrl: '/assets/photography/fashion-manhunt-sri-lanka.webp',
    aspect: 'portrait',
    focalPosition: 'upper',
    isCategoryCover: true,
    facebookUrl: PHOTOGRAPHY_FACEBOOK_URL,
    summary:
      'National pageant First Runner-Up portraiture showcasing tailored teal velvet suiting, official Manhunt International sashes, trophy honours, and Walk Model Academy editorial sessions.',
    highlights: ['Pageant Winner Portraits', 'Tailored Editorial Styling', 'Runway Archive']
  },
  {
    id: 'redwood-cabins-eco-hospitality',
    title: 'Redwood Cabins — Eco Boutique Resort Architecture',
    category: 'Corporate',
    categoryLabel: 'Corporate & Commercial',
    year: '2024',
    photoCount: 'Resort Feature',
    client: 'Redwood Cabins Eco-Resort',
    imageUrl: '/assets/photography/corporate-redwood-cabins.webp',
    aspect: 'square',
    focalPosition: 'center',
    isCategoryCover: true,
    facebookUrl: PHOTOGRAPHY_FACEBOOK_URL,
    summary:
      'Architectural and commercial hospitality showcase highlighting geometric timber A-frame cabins, rustic stairways, and lush tropical foliage in warm ambient light.',
    highlights: ['A-Frame Architecture', 'Tropical Framing', 'Commercial Hospitality']
  }
];

export const photographyArchiveGroups: PhotographyArchiveGroup[] = [
  {
    id: 'Film',
    label: 'Film & Media',
    title: 'Film & Media Events',
    subtitle: 'Premieres, media shows and film launches',
    albums: [
      { title: '106 Movie Media Show', itemCount: 85 },
      { title: 'Eka Thami Meka Media Show', itemCount: 138 },
      { title: 'ඇත්තමයි මං ඔයාට ආදරෙයි – Special Screen', itemCount: 159 },
      { title: 'Sura Detuwo Movie Premiere', itemCount: 143 },
      { title: 'The Wife (Premiere & Screening)', itemCount: 197 },
      { title: 'Mariya Film Release', itemCount: 172 },
      { title: 'RAAZ Film Muhurat Festival', itemCount: 60 },
      { title: 'Ahasin Eha Movie', itemCount: 55 },
      { title: 'Sara Susum Movie', itemCount: 100 },
      { title: 'House Full Movie', itemCount: 157 },
      { title: 'Wife Movie', itemCount: 100 },
      { title: 'වරල් – Fin', itemCount: 75 }
    ]
  },
  {
    id: 'TV',
    label: 'TV, Radio & Stage',
    title: 'TV, Radio & Stage Shows',
    subtitle: 'Television, FM broadcasts and live stage coverage',
    albums: [
      { title: 'Sirasa TV / FM චමත්කාර රාත්‍රිය', itemCount: 50 },
      { title: 'Pecok Studio', itemCount: 116 },
      { title: '31 Night Monara TV', itemCount: 128 },
      { title: 'Chat & Tune Monara TV', itemCount: 340 },
      { title: 'Siyatha Tharu Piri Re', itemCount: 52 },
      { title: "FM Valentine's Special", itemCount: 84 },
      { title: 'Monkey Man Stage Event', itemCount: 68 }
    ]
  },
  {
    id: 'Ceremony',
    label: 'Graduations & Ceremonies',
    title: 'Graduations & Ceremonies',
    subtitle: 'Convocations, batch celebrations and official ceremonies',
    albums: [
      { title: "Momentum'26 – Dharmaloka College Batch Celebration", itemCount: 340 },
      { title: 'Convocation Graduates', itemCount: 19 },
      { title: 'Sahasra Graduation', itemCount: 36 },
      { title: 'University of Kelaniya – Diploma & Higher Diploma', itemCount: null },
      { title: 'Pinning Ceremony – Sri Jayawardenepura General Hospital', itemCount: null },
      { title: 'Prabhavi Graduation', itemCount: 14 },
      { title: 'Koshini Graduation', itemCount: 36 },
      { title: 'Divisional Secretariat Literary Festival', itemCount: 217 },
      { title: 'English Day Saegis', itemCount: 219 }
    ]
  },
  {
    id: 'Birthdays',
    label: 'Birthdays & Portraits',
    title: 'Birthdays & Portrait Sessions',
    subtitle: 'Milestone birthdays, studio portraits and couple sessions',
    albums: [
      { title: 'Daranee Denipitiya Birthday', itemCount: 20 },
      { title: 'Two Hearts, One Beautiful Bond', itemCount: null },
      { title: 'Yashodara Birthday', itemCount: 29 },
      { title: 'Ilochana Birthday', itemCount: 22 },
      { title: 'MIKEL Birthday', itemCount: 64 },
      { title: 'Himesh and Danuwan Birthday', itemCount: 84 },
      { title: 'Sithmi Edirisingha Birthday', itemCount: 3 },
      { title: 'Birthday (Yonal)', itemCount: 21 },
      { title: 'Tharushika & Lakkitha', itemCount: 16 },
      { title: 'First Birthday Milestone Shoot', itemCount: 30 },
      { title: 'Golden Sands Beach Birthday Shoot', itemCount: 16 },
      { title: 'Purple Lotus Saree Birthday Shoot', itemCount: 11 },
      { title: 'Studio Profile Portraits', itemCount: 1 }
    ]
  },
  {
    id: 'Fashion',
    label: 'Fashion & Modeling',
    title: 'Fashion & Modeling',
    subtitle: 'National pageants, model academies and editorial sessions',
    albums: [
      { title: 'The Walk Model Academy', itemCount: 437 },
      { title: 'Man of the Globe Colombo', itemCount: 145 },
      { title: 'Walk Model Academy Editorial', itemCount: 82 },
      { title: 'Manhunt Sri Lanka', itemCount: 54 },
      { title: 'Studio Fashion Series', itemCount: 8 }
    ]
  },
  {
    id: 'Corporate',
    label: 'Corporate & Commercial',
    title: 'Corporate & Commercial',
    subtitle: 'Campuses, hospitality, brand relaunches and commercial units',
    albums: [
      { title: 'Saegis Campus Commercial', itemCount: 269 },
      { title: 'KRISCHE Grand Relaunch', itemCount: 219 },
      { title: 'Corporate Facility Production Shoot', itemCount: 5 },
      { title: 'Brand Cover Photos Series', itemCount: 6 },
      { title: 'Commercial Videography Archive', itemCount: null }
    ]
  }
];
