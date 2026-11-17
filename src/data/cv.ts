export interface CvExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface CvEducationItem {
  institution: string;
  location: string;
  year: string;
  credential: string;
}

export interface CvSkillGroup {
  category: string;
  skills: string;
}

export interface CvProfileData {
  fullName: string;
  location: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  linkedinLabel: string;
  behanceUrl: string;
  behanceLabel: string;
  summary: string;
  experiences: CvExperienceItem[];
  education: CvEducationItem[];
  certifications: string[];
  skills: CvSkillGroup[];
  languages: string[];
}

export const cvData: CvProfileData = {
  fullName: 'Pasindu Dilshan Weragoda Arachchi',
  location: 'Kelaniya, Sri Lanka',
  email: 'dpasindu487@gmail.com',
  phone: '+94 71 957 5360',
  linkedinUrl: 'https://www.linkedin.com/in/dilshan-weragoda/',
  linkedinLabel: 'LinkedIn',
  behanceUrl: 'https://www.behance.net/dilshanweragoda',
  behanceLabel: 'behance.net',
  summary:
    'Digital Marketing Coordinator with proven experience managing social media platforms, executing content strategies, and optimizing campaigns for performance and reach. Skilled in short-form video creation, analytics tracking, content calendar management, and cross-platform brand communication. Proficient in Canva, Adobe Suite, and video editing software, with a track record of delivering measurable engagement, lead generation, and online growth results.',
  experiences: [
    {
      role: 'Digital Marketing Coordinator & Social Media Specialist',
      company: 'Freelance & Brand Collaborations',
      location: 'Sri Lanka',
      period: 'August 2019 – Present',
      bullets: [
        'Directed content strategy for 150+ brands across digital marketing, e-commerce, branding, and social media, increasing engagement by up to 60%.',
        'Produced and edited high-performing short-form videos for Instagram, TikTok, and YouTube, achieving an average reach of 50K+ views per video.',
        'Delivered photography and videography services for 20+ brand collaborations, producing 500+ commercial and digital marketing works across promotional campaigns and social media content.',
        "Supported branding and campaign initiatives, contributing to 30–50% growth in clients' online presence.",
        'Developed content calendars and audience targeting strategies to maintain consistent brand identity.'
      ]
    },
    {
      role: 'Digital Marketing Coordinator & Social Media Specialist',
      company: 'Detz Global',
      location: 'Sri Lanka',
      period: 'January 2022 – Present',
      bullets: [
        'Led digital marketing campaigns across social media, landing pages, and digital advertising channels, increasing engagement by 40% and online reach by 50%.',
        'Created social media creatives, promotional graphics, banners, and landing page visuals to support brand awareness and campaign messaging, enhancing brand consistency by 35%.',
        'Streamlined creative workflows and developed reusable visual asset systems to improve consistency and efficiency of marketing materials across digital platforms.'
      ]
    },
    {
      role: 'Digital Designer & Creative Content Specialist',
      company: 'Kingsport Global Logistics Management (Pvt) Ltd',
      location: 'Kelaniya, Sri Lanka',
      period: 'June 2021 – June 2025',
      bullets: [
        'Planned and executed multi-platform digital campaigns, generating 1,200+ qualified leads over four years.',
        'Created social media schedules, content calendars, and campaigns, resulting in 40% follower growth across all channels.',
        'Oversaw website updates, email marketing, CRM workflows, and digital documentation, improving operational efficiency by 20%.'
      ]
    }
  ],
  education: [
    {
      institution: 'Kingston University',
      location: 'UK',
      year: '2025',
      credential: 'BSc (Hons) Cyber Security and Digital Forensics (Top-Up). Second Upper Class Honours.'
    },
    {
      institution: 'Pearson College London',
      location: 'United Kingdom',
      year: '2023',
      credential: 'Level 5 Pearson BTEC Higher National Diploma in Computing (HND). Distinction / Top Performance.'
    }
  ],
  certifications: [
    'Digital Marketing Professional Certificate – Content Marketing Institute',
    'Social Media Marketing Professional Certificate – Hootsuite',
    'Fundamentals of Digital Marketing – Google'
  ],
  skills: [
    {
      category: 'Digital Marketing',
      skills:
        'Campaign Coordination (Organic & Paid), Social Media Management, KPI Tracking & Analytics Reporting, Content Planning & Content Calendar Management, PPC/Meta Ads, Audience Targeting & A/B Testing, Email Marketing, ROI Optimization, Conversion Rate Improvement, Short-Form Video Creation (Reels/TikTok), Basic SEO & Content Optimization, Branding & Visual Storytelling, Marketing Strategy'
    },
    {
      category: 'Creative & Design',
      skills:
        'Graphic Design (Canva, Adobe Photoshop, Illustrator), Video Editing (Premiere Pro, CapCut), Photography & Videography, Copywriting & Caption Writing, Creative Concept Development'
    }
  ],
  languages: ['English (Advanced)']
};
