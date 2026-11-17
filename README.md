# Pasindu Dilshan Weragoda Arachchi — Portfolio

Production web portfolio for **Pasindu Dilshan Weragoda Arachchi** — Photographer, Creative Lead, Graphic Designer, Videographer, and Digital Marketer based in Colombo, Sri Lanka.

## Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Run unit & structural SEO tests
npx --yes tsx --test src/utils/portfolioLogic.test.ts

# 3. Typecheck and build production bundle
npm run lint
npm run build

# 4. Run local dev server (port 3000) or preview production build
npm run dev
npm run preview
```

## Tech Stack & Architecture

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 with `#000000` canvas, `#0A0A0A` surfaces, and `#FF6A00` accent palette
- **Motion & Animations**: `motion` (Framer Motion v12) with viewport reveals and `prefers-reduced-motion` support
- **Typography**: Google Fonts — Poppins, Space Grotesk, Lato (`display=swap`)
- **Icons**: Lucide React + inline crisp SVG favicon (`/public/favicon.svg`)
- **Gmail Workspace Integration**: Client-side Firebase Google Auth + Gmail REST API (`src/services/gmailAuth.ts`, `src/services/gmailApi.ts`, `src/components/GmailWorkspacePanel.tsx`) with explicit confirmation modal before sends/drafts/trash
- **Modular Data Sources**:
  - `src/data/photography.ts`: 11 curated photography showcases across 6 disciplines (`Film`, `TV`, `Ceremony`, `Birthdays`, `Fashion`, `Corporate`) + 51 Facebook album links
  - `src/data/behance.ts`: 6 Behance works across `UI/UX`, `Branding`, `Packaging`, and `Print`
  - `src/data/clients.ts`: 14 Collaboration Marketing brands & 11 Promotional partners + summary metrics
  - `src/data/services.ts`: 6 core creative & digital marketing services
  - `src/data/experience.ts`: Career history, education, Creative Approach, and interactive 10-tool stack
  - `src/data/testimonials.ts`: 8 verified client endorsements
  - `src/data/socials.ts`: Official Photography, Behance, LinkedIn, TikTok, Facebook, and Instagram channels

## Performance & Technical SEO Features

- **Optimized WebP Imagery**: All photography frames, showcase collage, and Behance thumbnails served as compressed `.webp` assets (~92% payload reduction vs uncompressed PNGs), preserving `.png`/`.jpg` for OpenGraph crawlers and client logos.
- **Viewport-Driven Lazy Loading**: `src/components/LazyImage.tsx` defers grid image fetching with `IntersectionObserver` (`500px 0px` preload margin) and async decoding.
- **Metadata & Structured Data**: `index.html` ships SEO title/description, OpenGraph & Twitter `summary_large_image` cards, dynamic `canonical` / `og:url` resolution, and Schema.org `ProfessionalService` JSON-LD alongside `public/robots.txt` and `public/sitemap.xml`.
- **Cross-Browser & Accessibility**: Valid `H1 -> H2 -> H3 -> H4` heading hierarchy, keyboard skip link (`#main-content`), `scroll-padding-top`, Firefox `scrollbar-width` styling, vendor font smoothing, and `>= 4.5:1` readable label contrast.

## Pre-Handover Checklist

- [x] `npm run lint` (`tsc --noEmit`) passes with 0 errors
- [x] `npm run build` produces production bundle cleanly in `dist/`
- [x] Unit test suite (`src/utils/portfolioLogic.test.ts`) passes 100% including asset integrity, SEO metadata, and Gmail helpers
- [x] Zero console errors, uncaught exceptions, broken images, or horizontal scroll overflow across Desktop (`1440×900`, `1280×720`), Tablet (`1024×768`, `768×1024`), and Mobile (`390×844`)
- [x] Production `vite preview` server verified interactively in Chromium
- [x] Before final custom domain launch: update `public/robots.txt` (`Sitemap: https://yourdomain.com/sitemap.xml`) and `public/sitemap.xml` (`<loc>https://yourdomain.com/</loc>`) with your live domain host

## Measurable Optimization Acceptance Criteria

| Area | Target Criterion | Verification Method |
| --- | --- | --- |
| Build & Type Safety | 0 TypeScript errors (`tsc --noEmit`), clean Vite production build | `npm run lint && npm run build` |
| Automated Logic & SEO | 100% test pass rate across filters, Gmail encoding, assets, SEO files | `npx tsx --test src/utils/portfolioLogic.test.ts` |
| Image Weight Optimization | > 85% total asset footprint reduction across photography/portfolio grids | `du -sh` comparison before (`~27.1 MB`) & after (`~2.4 MB`) |
| Responsive Integrity | 0px horizontal overflow (`scrollWidth <= clientWidth`) at 390, 768, 1024, 1280, 1440px | Chromium `playwright-cli` evaluation across 5 viewports |
| Document Semantics | Single `<h1>`, strictly sequential heading nesting (0 skipped levels), active `<main>` skip link | Chromium DOM heading audit |
| Runtime Health | 0 console errors, 0 failed network requests, 0 broken `<img>` elements | Chromium console/network + image `naturalWidth > 0` check |

## Deployment Instructions

### Deploy to GitHub Pages
The GitHub Actions workflow builds and deploys this site to
[https://dilshanweragod.github.io/PORTIFOLIO-SITE/](https://dilshanweragod.github.io/PORTIFOLIO-SITE/)
whenever changes are pushed to `main`. The build automatically uses the repository's Pages base path.

### Deploy to Vercel
1. Push this repository to GitHub or GitLab.
2. Import the repository at [vercel.com/new](https://vercel.com/new) (Framework Preset: **Vite**, Build Command: `npm run build`, Output Directory: `dist`).

### Deploy to Netlify
1. Import the repository at [app.netlify.com](https://app.netlify.com).
2. Set Build Command to `npm run build` and Publish Directory to `dist`.
