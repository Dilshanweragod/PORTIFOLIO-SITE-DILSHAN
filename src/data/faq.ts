export type FaqCategory = 'All' | 'Workflow' | 'Pricing' | 'Availability';

export interface FaqItem {
  id: string;
  category: Exclude<FaqCategory, 'All'>;
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    id: 'faq-workflow',
    category: 'Workflow',
    question: 'What does your end-to-end creative workflow look like?',
    answer:
      'Every project follows four clear stages: (1) Discovery & Creative Brief to align on audience, competitors, and visual direction; (2) Concept & Moodboard presentation; (3) Design, Photography, Video, or UI Production with milestone check-ins; and (4) Structured Revisions and Master File Handoff ready for print, digital, or development.'
  },
  {
    id: 'faq-pricing',
    category: 'Pricing',
    question: 'How is pricing structured—fixed rates, custom quotes, or retainers?',
    answer:
      'Because every brand deliverable differs in depth, I work primarily through custom project-based quotes tailored to your exact scope and timeline, alongside flexible monthly creative retainers for growing teams needing ongoing graphic design, social reels, photography, and ad campaign management.'
  },
  {
    id: 'faq-availability',
    category: 'Availability',
    question: 'Are you currently available for new projects and international clients?',
    answer:
      'Yes—I am actively taking on new brand identity, packaging, UI/UX, and monthly content retainers. Based in Colombo, Sri Lanka (UTC+5:30), I partner seamlessly with local businesses for on-site photo/video shoots as well as remote clients across the UK, Middle East, Asia-Pacific, and Europe.'
  },
  {
    id: 'faq-turnaround',
    category: 'Workflow',
    question: 'How long do projects typically take from kickoff to final delivery?',
    answer:
      'Social campaign kits and product retouching typically turn around in 5–10 business days. Full brand identities, multi-SKU packaging suites, and web/app UI/UX systems generally take 3–6 weeks depending on the number of deliverables and review cadence.'
  },
  {
    id: 'faq-revisions',
    category: 'Pricing',
    question: 'How are revisions handled and what files do I receive on completion?',
    answer:
      'Each milestone includes structured feedback and refinement rounds so you never feel rushed at sign-off. Once approved, you receive full organized deliverables—print-ready CMYK PDFs with die-lines, vector AI/SVG logos, Figma component systems, or color-graded video masters.'
  },
  {
    id: 'faq-retainer-onboarding',
    category: 'Availability',
    question: 'What should I include when reaching out to start a brief or retainer?',
    answer:
      'Share your brand or company name, the core discipline needed (e.g., Brand Identity, Packaging, UI/UX, or Monthly Content Retainer), target launch window, and any reference links. You will receive a clear scope breakdown and kickoff schedule within 24 hours.'
  }
];
