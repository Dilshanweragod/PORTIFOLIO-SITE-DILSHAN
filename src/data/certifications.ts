export type IssuerId = 'hootsuite' | 'linkedin' | 'google';

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issuerId: IssuerId;
  programUrl: string;
  focusAreas: string[];
  summary: string;
}

export const certifications: CertificationItem[] = [
  {
    id: 'cert-hootsuite-smm',
    title: 'Social Media Marketing Professional Certificate',
    issuer: 'Hootsuite',
    issuerId: 'hootsuite',
    programUrl: 'https://education.hootsuite.com/',
    focusAreas: ['Social Strategy', 'Content Optimization', 'Community Engagement'],
    summary:
      'Comprehensive credential validating multi-platform social strategy, publishing cadence, social listening, and paid social campaign execution.'
  },
  {
    id: 'cert-linkedin-smm-strategy',
    title: 'Social Media Marketing: Strategy and Optimization',
    issuer: 'LinkedIn',
    issuerId: 'linkedin',
    programUrl: 'https://www.linkedin.com/learning/',
    focusAreas: ['Audience Personas', 'Editorial Calendars', 'Performance Benchmarks'],
    summary:
      'Focused specialization in crafting platform-specific content ecosystems, audience growth funnels, and engagement optimization.'
  },
  {
    id: 'cert-google-ai',
    title: 'Google AI Professional Certificate',
    issuer: 'Google',
    issuerId: 'google',
    programUrl: 'https://grow.google/certificates/',
    focusAreas: ['Prompt Engineering', 'AI Workflows', 'Strategic Productivity'],
    summary:
      'Practical mastery of generative AI workflows for creative brainstorming, marketing research synthesis, content iteration, and productivity.'
  },
  {
    id: 'cert-google-ads-search',
    title: 'Google Ads Search Certification',
    issuer: 'Google',
    issuerId: 'google',
    programUrl: 'https://skillshop.withgoogle.com/',
    focusAreas: ['Search Campaigns', 'Keyword Bidding', 'ROAS & Quality Score'],
    summary:
      'Verified expertise in building, scaling, and auditing high-intent Google Search campaigns aligned to measurable acquisition goals.'
  },
  {
    id: 'cert-google-dm-ecommerce',
    title: 'Digital Marketing & E-commerce Certificate',
    issuer: 'Google',
    issuerId: 'google',
    programUrl: 'https://grow.google/certificates/digital-marketing-ecommerce/',
    focusAreas: ['SEO & SEM', 'Email Funnels', 'Analytics & E-commerce'],
    summary:
      'End-to-end foundation across customer acquisition funnels, organic search visibility, analytics attribution, and online store growth.'
  }
];
