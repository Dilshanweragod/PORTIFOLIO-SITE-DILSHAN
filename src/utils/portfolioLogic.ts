import { ClientBrand } from '../data/clients';
import { BehanceCategory, BehanceWorkItem } from '../data/behance';
import { TechToolItem, ToolCategory } from '../data/tools';
import { FaqCategory, FaqItem } from '../data/faq';
import {
  PhotographyAspect,
  PhotographyCategory,
  PhotographyProject,
  PhotographyArchiveGroup
} from '../data/photography';

export type ClientGroupFilter = 'all' | 'collab' | 'promo';

/**
 * Filter clients by collaboration group
 */
export function filterClients(clients: ClientBrand[], group: ClientGroupFilter): ClientBrand[] {
  if (group === 'all') return clients;
  return clients.filter((c) => c.category === group);
}

/**
 * Filter Behance showcase items by creative discipline
 */
export function filterBehanceItems(items: BehanceWorkItem[], category: BehanceCategory): BehanceWorkItem[] {
  if (category === 'All') return items;
  return items.filter((item) => item.discipline === category);
}

/**
 * Filter Tools & Technologies by category
 */
export function filterTechTools(tools: TechToolItem[], category: ToolCategory): TechToolItem[] {
  if (category === 'All') return tools;
  return tools.filter((tool) => tool.category === category);
}

/**
 * Filter FAQ items by category
 */
export function filterFaqItems(items: FaqItem[], category: FaqCategory): FaqItem[] {
  if (category === 'All') return items;
  return items.filter((item) => item.category === category);
}

/**
 * Count up easing calculator
 */
export function calculateCountUpValue(target: number, progress: number): number {
  const eased = 1 - Math.pow(1 - progress, 3);
  return Math.round(eased * target);
}

/**
 * Map a service title, ID, or project category to the corresponding Contact form select value
 */
export function mapServiceToContactOption(input: string): string {
  const normalized = input.trim().toLowerCase();

  if (normalized.includes('search engine') || normalized.includes('seo')) {
    return 'Search Engine Optimization';
  }
  if (normalized.includes('google ads') || normalized.includes('search advertising')) {
    return 'Google Ads & Search Advertising';
  }
  if (normalized.includes('meta ads') || normalized.includes('meta advertising')) {
    return 'Meta Advertising';
  }
  if (normalized.includes('social media') || normalized.includes('social')) {
    return 'Social Media Management';
  }
  if (normalized.includes('digital marketing') || normalized === 'digital-marketing') {
    return 'Digital Marketing Strategy';
  }
  if (normalized.includes('packaging')) {
    return 'Product Packaging';
  }
  if (normalized.includes('photography')) {
    return 'Photography';
  }
  if (normalized.includes('videography') || normalized.includes('video editing')) {
    return 'Videography';
  }
  if (normalized.includes('ui') || normalized.includes('ux') || normalized.includes('website')) {
    return 'Website & UI UX Design';
  }
  if (normalized.includes('retainer') || normalized.includes('consultation')) {
    return 'Full Creative Retainer';
  }
  if (
    normalized.includes('graphic') ||
    normalized.includes('branding') ||
    normalized.includes('book') ||
    normalized.includes('print')
  ) {
    return 'Graphic Design';
  }

  return 'Digital Marketing Strategy';
}

export interface ContactFormData {
  fullName: string;
  email: string;
  service: string;
  budget?: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof ContactFormData, string>>;
}

/**
 * Validates the contact form fields
 */
export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your name (at least 2 characters)';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address';
  }

  if (!data.service || data.service.trim() === '') {
    errors.service = 'Please select a service';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Please provide project details (at least 10 characters)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Build a pre-filled mailto link for direct inquiry dispatch
 */
export function buildMailtoHref(recipientEmail: string, data: ContactFormData): string {
  const subject = encodeURIComponent(
    `Project Inquiry: ${data.service || 'Creative Collaboration'} — ${data.fullName.trim()}`
  );
  const bodyLines = [
    `Name: ${data.fullName.trim()}`,
    `Email: ${data.email.trim()}`,
    `Service: ${data.service}`,
    `Estimated Budget: ${data.budget || 'Not specified'}`,
    '',
    'Project Details:',
    data.message.trim()
  ];
  const body = encodeURIComponent(bodyLines.join('\n'));
  return `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
}

/**
 * Computes normalized vertical scroll progress in [0, 1]
 */
export function calculateScrollProgress(
  scrollY: number,
  scrollHeight: number,
  innerHeight: number
): number {
  const maxScroll = scrollHeight - innerHeight;
  if (maxScroll <= 0) return 0;
  return Math.min(1, Math.max(0, scrollY / maxScroll));
}

/**
 * Filter Photography projects by category
 */
export function filterPhotographyProjects(
  projects: PhotographyProject[],
  category: PhotographyCategory
): PhotographyProject[] {
  if (category === 'All') return projects;
  return projects.filter((p) => p.category === category);
}

/**
 * Get count of photography projects per category
 */
export function getPhotographyCategoryCounts(
  projects: PhotographyProject[]
): Record<PhotographyCategory, number> {
  const counts: Record<PhotographyCategory, number> = {
    All: projects.length,
    Film: 0,
    TV: 0,
    Ceremony: 0,
    Birthdays: 0,
    Fashion: 0,
    Corporate: 0
  };

  for (const project of projects) {
    if (counts[project.category] !== undefined) {
      counts[project.category]++;
    }
  }

  return counts;
}

/**
 * Filter complete photography album archive groups by discipline
 */
export function filterPhotographyArchive(
  groups: PhotographyArchiveGroup[],
  category: PhotographyCategory
): PhotographyArchiveGroup[] {
  if (category === 'All') return groups;
  return groups.filter((group) => group.id === category);
}

/**
 * Select exactly one signature photo project per discipline for the "All" overview grid
 */
export function getPhotographyOverviewCards(
  projects: PhotographyProject[]
): PhotographyProject[] {
  const disciplineOrder: Exclude<PhotographyCategory, 'All'>[] = [
    'Film',
    'TV',
    'Ceremony',
    'Birthdays',
    'Fashion',
    'Corporate'
  ];

  const selected: PhotographyProject[] = [];
  for (const discipline of disciplineOrder) {
    const match =
      projects.find((p) => p.category === discipline && p.isCategoryCover) ??
      projects.find((p) => p.category === discipline);
    if (match) {
      selected.push(match);
    }
  }
  return selected;
}

/**
 * Group overview photography cards into harmonious widescreen (3:2) vs editorial/portrait (4:5) rows
 */
export function partitionPhotographyOverviewRows(cards: PhotographyProject[]): {
  widescreenRow: PhotographyProject[];
  editorialRow: PhotographyProject[];
} {
  const widescreenRow = cards.filter((c) => c.aspect === 'landscape');
  const editorialRow = cards.filter((c) => c.aspect !== 'landscape');
  return { widescreenRow, editorialRow };
}

/**
 * Separate photography collection into horizontal/square frames vs tall studio portraits
 */
export function partitionPhotographyByOrientation(projects: PhotographyProject[]): {
  horizontalFrames: PhotographyProject[];
  portraitFrames: PhotographyProject[];
} {
  return {
    horizontalFrames: projects.filter((p) => p.aspect !== 'portrait'),
    portraitFrames: projects.filter((p) => p.aspect === 'portrait')
  };
}

/**
 * Map a photography project's natural aspect & focal setting to Tailwind container and object-position classes
 */
export function getPhotographyFrameClasses(
  aspect: PhotographyAspect,
  focalPosition: PhotographyProject['focalPosition'],
  context: 'overview-wide' | 'overview-editorial' | 'category' | 'split'
): { containerClass: string; objectPositionClass: string } {
  let objectPositionClass = 'object-center';
  if (focalPosition === 'top') {
    objectPositionClass = 'object-top';
  } else if (focalPosition === 'upper') {
    objectPositionClass = 'object-[50%_15%]';
  }

  if (context === 'overview-wide') {
    return { containerClass: 'aspect-[3/2]', objectPositionClass };
  }
  if (context === 'overview-editorial') {
    return { containerClass: 'aspect-[4/5]', objectPositionClass };
  }
  if (context === 'split') {
    if (aspect === 'portrait') {
      return { containerClass: 'aspect-[3/4]', objectPositionClass };
    }
    if (aspect === 'square') {
      return { containerClass: 'aspect-square', objectPositionClass };
    }
    return { containerClass: 'aspect-[3/2]', objectPositionClass };
  }

  switch (aspect) {
    case 'portrait':
      return { containerClass: 'aspect-[4/5]', objectPositionClass };
    case 'collage':
      return { containerClass: 'aspect-[6/5]', objectPositionClass };
    case 'square':
      return { containerClass: 'aspect-square', objectPositionClass };
    case 'landscape':
    default:
      return { containerClass: 'aspect-[4/3]', objectPositionClass };
  }
}

/**
 * Compute aggregate album and photo counts across archive groups
 */
export function getPhotographyArchiveTotals(groups: PhotographyArchiveGroup[]): {
  disciplines: number;
  albums: number;
  photos: number;
} {
  let albums = 0;
  let photos = 0;
  for (const group of groups) {
    albums += group.albums.length;
    for (const album of group.albums) {
      photos += album.itemCount ?? 0;
    }
  }
  return {
    disciplines: groups.length,
    albums,
    photos
  };
}
