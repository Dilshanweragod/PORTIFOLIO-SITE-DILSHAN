import test from 'node:test';
import assert from 'node:assert/strict';
import { publicAssetUrl } from './publicAsset';
import fs from 'node:fs';
import path from 'node:path';
import {
  filterClients,
  filterBehanceItems,
  filterTechTools,
  filterPhotographyProjects,
  filterPhotographyArchive,
  getPhotographyCategoryCounts,
  getPhotographyOverviewCards,
  getPhotographyArchiveTotals,
  partitionPhotographyOverviewRows,
  partitionPhotographyByOrientation,
  getPhotographyFrameClasses,
  mapServiceToContactOption,
  buildMailtoHref,
  validateContactForm,
  calculateScrollProgress
} from './portfolioLogic';
import { collaborationBrands, promotionalBrands } from '../data/clients';
import { behanceWorks, BEHANCE_PROFILE_URL } from '../data/behance';
import { techTools, toolCategories } from '../data/tools';
import { certifications } from '../data/certifications';
import { services } from '../data/services';
import {
  photographyProjects,
  photographyArchiveGroups,
  PHOTOGRAPHY_FACEBOOK_URL
} from '../data/photography';
import { heroSocialLinks, socialChannelGroups, SOCIAL_URLS } from '../data/socials';
import {
  GMAIL_SCOPES,
  encodeBase64UrlUtf8,
  decodeBase64UrlUtf8,
  buildRfc2822Email,
  extractEmailHeader
} from '../services/gmailApi';

test('filterClients separates collaboration and promotional brands', () => {
  const allClients = [...collaborationBrands, ...promotionalBrands];
  assert.equal(filterClients(allClients, 'all').length, 25);
  assert.equal(filterClients(allClients, 'collab').length, 14);
  assert.equal(filterClients(allClients, 'promo').length, 11);
  for (const client of allClients) {
    const filePath = path.join(process.cwd(), 'public', client.logoUrl.replace(/^\//, ''));
    assert.ok(fs.existsSync(filePath), `Missing client logo asset: ${client.logoUrl}`);
  }
});

test('filterBehanceItems filters curated Behance works across updated disciplines and links to profile', () => {
  assert.equal(BEHANCE_PROFILE_URL, 'https://www.behance.net/dilshanweragoda');
  assert.equal(filterBehanceItems(behanceWorks, 'All').length, 7);
  assert.equal(filterBehanceItems(behanceWorks, 'Digital Marketing & Social').length, 1);
  assert.equal(filterBehanceItems(behanceWorks, 'UI/UX & Websites').length, 2);
  assert.equal(filterBehanceItems(behanceWorks, 'Branding & Graphic Design').length, 2);
  assert.equal(filterBehanceItems(behanceWorks, 'Packaging & Print').length, 2);
  for (const item of behanceWorks) {
    assert.equal(item.behanceUrl, BEHANCE_PROFILE_URL);
    assert.ok(item.objectives.length > 15);
    assert.ok(item.responsibilities.length >= 2);
    assert.ok(item.toolsUsed.length >= 2);
    const filePath = path.join(process.cwd(), 'public', item.imageUrl.replace(/^\//, ''));
    assert.ok(fs.existsSync(filePath), `Missing Behance asset: ${item.imageUrl}`);
  }
});

test('mapServiceToContactOption maps service names and project categories cleanly', () => {
  assert.equal(mapServiceToContactOption('Digital Marketing Strategy'), 'Digital Marketing Strategy');
  assert.equal(mapServiceToContactOption('Social Media Management'), 'Social Media Management');
  assert.equal(mapServiceToContactOption('Search Engine Optimization'), 'Search Engine Optimization');
  assert.equal(mapServiceToContactOption('Google Ads & Search Advertising'), 'Google Ads & Search Advertising');
  assert.equal(mapServiceToContactOption('Meta Advertising'), 'Meta Advertising');
  assert.equal(mapServiceToContactOption('Graphic Design'), 'Graphic Design');
  assert.equal(mapServiceToContactOption('Video Editing & Content Creation'), 'Videography');
  assert.equal(mapServiceToContactOption('Photography & Visual Content'), 'Photography');
  assert.equal(mapServiceToContactOption('Commercial Photography'), 'Photography');
  assert.equal(mapServiceToContactOption('UI/UX & Websites'), 'Website & UI UX Design');
  assert.equal(mapServiceToContactOption('Packaging & Print'), 'Product Packaging');
  assert.equal(mapServiceToContactOption('Branding & Graphic Design'), 'Graphic Design');
  assert.equal(mapServiceToContactOption('Digital Marketing & Social'), 'Social Media Management');
  assert.equal(mapServiceToContactOption('Full Creative Retainer'), 'Full Creative Retainer');
});

test('validateContactForm checks required fields', () => {
  const emptyRes = validateContactForm({
    fullName: '',
    email: '',
    service: '',
    message: ''
  });
  assert.equal(emptyRes.isValid, false);
  assert.ok(emptyRes.errors.fullName);
  assert.ok(emptyRes.errors.email);
  assert.ok(emptyRes.errors.service);
  assert.ok(emptyRes.errors.message);

  const validRes = validateContactForm({
    fullName: 'Jane Doe',
    email: 'jane@example.com',
    service: 'Branding',
    message: 'Hello, we would love to collaborate on our new product branding.'
  });
  assert.equal(validRes.isValid, true);
  assert.equal(Object.keys(validRes.errors).length, 0);
});

test('buildMailtoHref encodes subject and project brief details cleanly', () => {
  const href = buildMailtoHref('dpasindu487@gmail.com', {
    fullName: 'Nishan Senanayake',
    email: 'nishan@wora.lk',
    service: 'Graphic Design',
    budget: '$1,000 - $3,000',
    message: 'Looking for a complete apparel identity system.'
  });
  assert.ok(href.startsWith('mailto:dpasindu487@gmail.com?subject='));
  assert.ok(href.includes('Graphic%20Design'));
  assert.ok(href.includes('Nishan%20Senanayake'));
});

test('social channels provide all 3 groups and personal + Behance hero links with direct URLs', () => {
  assert.equal(socialChannelGroups.length, 3);
  assert.equal(socialChannelGroups[0].id, 'photo-video');
  assert.equal(socialChannelGroups[0].items.length, 2);
  assert.equal(socialChannelGroups[1].id, 'design-marketing');
  assert.equal(socialChannelGroups[1].items.length, 1);
  assert.equal(socialChannelGroups[2].id, 'personal');
  assert.equal(socialChannelGroups[2].items.length, 4);

  assert.equal(heroSocialLinks.length, 5);
  assert.deepEqual(
    heroSocialLinks.map((item) => item.href),
    [
      SOCIAL_URLS.linkedin,
      SOCIAL_URLS.tiktok,
      SOCIAL_URLS.personalFacebook,
      SOCIAL_URLS.personalInstagram,
      SOCIAL_URLS.behance
    ]
  );

  for (const group of socialChannelGroups) {
    for (const item of group.items) {
      const parsedUrl = new URL(item.href);
      assert.equal(parsedUrl.protocol, 'https:');
      assert.notEqual(parsedUrl.hostname, 'google.com');
    }
  }
});

test('gmail helpers encode UTF-8 RFC2822 messages, extract headers, and include all configured scopes with strict URL whitelist', () => {
  assert.equal(GMAIL_SCOPES.length, 14);
  const allowedHostnames = ['mail.google.com', 'www.googleapis.com'];
  for (const scope of GMAIL_SCOPES) {
    const parsed = new URL(scope);
    assert.equal(parsed.protocol, 'https:');
    assert.ok(allowedHostnames.includes(parsed.hostname), `Untrusted scope hostname: ${parsed.hostname}`);
  }

  assert.ok(
    GMAIL_SCOPES.some((s) => {
      const u = new URL(s);
      return u.protocol === 'https:' && u.hostname === 'mail.google.com';
    })
  );
  assert.ok(
    GMAIL_SCOPES.some((s) => {
      const u = new URL(s);
      return u.protocol === 'https:' && u.hostname === 'www.googleapis.com' && u.pathname === '/auth/gmail.send';
    })
  );
  assert.ok(
    GMAIL_SCOPES.some((s) => {
      const u = new URL(s);
      return u.protocol === 'https:' && u.hostname === 'www.googleapis.com' && u.pathname === '/auth/gmail.readonly';
    })
  );

  const rawEmail = buildRfc2822Email({
    to: 'dpasindu487@gmail.com',
    subject: 'Portfolio Inquiry — Brand Identity ✨',
    replyTo: 'client@example.com',
    body: 'Hello Pasindu, we need packaging & social design.'
  });
  assert.ok(rawEmail.includes('To: dpasindu487@gmail.com'));
  assert.ok(rawEmail.includes('Reply-To: client@example.com'));

  const encoded = encodeBase64UrlUtf8(rawEmail);
  assert.ok(!encoded.includes('+'));
  assert.ok(!encoded.includes('/'));
  assert.ok(!encoded.includes('='));
  assert.equal(decodeBase64UrlUtf8(encoded), rawEmail);

  const headers = [
    { name: 'Subject', value: 'New Project' },
    { name: 'From', value: 'Client <client@example.com>' }
  ];
  assert.equal(extractEmailHeader(headers, 'subject'), 'New Project');
  assert.equal(extractEmailHeader(headers, 'FROM'), 'Client <client@example.com>');
  assert.equal(extractEmailHeader(headers, 'Date'), '');
});

test('calculateScrollProgress clamps vertical scroll ratio cleanly between 0 and 1', () => {
  assert.equal(calculateScrollProgress(0, 3000, 900), 0);
  assert.equal(calculateScrollProgress(1050, 3000, 900), 0.5);
  assert.equal(calculateScrollProgress(2100, 3000, 900), 1);
  assert.equal(calculateScrollProgress(2500, 3000, 900), 1);
  assert.equal(calculateScrollProgress(-20, 3000, 900), 0);
  assert.equal(calculateScrollProgress(100, 800, 900), 0);
});

test('photography projects map every discipline accurately to existing clean assets', () => {
  assert.equal(photographyProjects.length, 11);
  assert.equal(PHOTOGRAPHY_FACEBOOK_URL, 'https://www.facebook.com/dilshanweragoda.photogr');

  const byId = new Map(photographyProjects.map((p) => [p.id, p]));
  assert.equal(byId.get('mariya-film-release')?.imageUrl, '/assets/photography/film-mariya-release.webp');
  assert.equal(byId.get('raaz-film-muhurat-festival')?.imageUrl, '/assets/photography/film-raaz-muhurat.webp');
  assert.equal(byId.get('sirasa-tv-fm-stage')?.imageUrl, '/assets/photography/tv-sirasa-stage-dbc.webp');
  assert.equal(byId.get('momentum-26-batch-celebration')?.imageUrl, '/assets/photography/ceremony-momentum-26.webp');
  assert.equal(byId.get('convocation-graduates-excellence')?.imageUrl, '/assets/photography/ceremony-university-convocation.webp');
  assert.equal(byId.get('purple-lotus-studio-portrait')?.imageUrl, '/assets/photography/portrait-purple-lotus-saree.webp');
  assert.equal(byId.get('daranee-denipitiya-enchanted-forest')?.imageUrl, '/assets/photography/birthday-daranee-forest.webp');
  assert.equal(byId.get('golden-sands-ocean-birthday')?.imageUrl, '/assets/photography/birthday-golden-sands-beach.webp');
  assert.equal(byId.get('first-birthday-joyous-chapters')?.imageUrl, '/assets/photography/birthday-first-milestone.webp');
  assert.equal(byId.get('manhunt-sri-lanka-fashion')?.imageUrl, '/assets/photography/fashion-manhunt-sri-lanka.webp');
  assert.equal(byId.get('redwood-cabins-eco-hospitality')?.imageUrl, '/assets/photography/corporate-redwood-cabins.webp');

  for (const project of photographyProjects) {
    const filePath = path.join(process.cwd(), 'public', project.imageUrl.replace(/^\//, ''));
    assert.ok(fs.existsSync(filePath), `Missing photography asset on disk: ${project.imageUrl}`);
    assert.equal(project.facebookUrl, PHOTOGRAPHY_FACEBOOK_URL);
    assert.ok(project.summary.length > 20);
    assert.ok(project.highlights.length > 0);
  }
});

test('photography overview rows, orientation partitions, and frame classes preserve natural proportions', () => {
  const overview = getPhotographyOverviewCards(photographyProjects);
  assert.equal(overview.length, 6);
  assert.deepEqual(
    overview.map((p) => p.category),
    ['Film', 'TV', 'Ceremony', 'Birthdays', 'Fashion', 'Corporate']
  );

  const { widescreenRow, editorialRow } = partitionPhotographyOverviewRows(overview);
  assert.equal(widescreenRow.length, 3);
  assert.equal(editorialRow.length, 3);

  const { horizontalFrames, portraitFrames } = partitionPhotographyByOrientation(photographyProjects);
  assert.equal(horizontalFrames.length, 9);
  assert.equal(portraitFrames.length, 2);

  const portraitFrame = getPhotographyFrameClasses('portrait', 'upper', 'category');
  assert.equal(portraitFrame.containerClass, 'aspect-[4/5]');
  assert.equal(portraitFrame.objectPositionClass, 'object-[50%_15%]');

  const collageFrame = getPhotographyFrameClasses('collage', 'center', 'category');
  assert.equal(collageFrame.containerClass, 'aspect-[6/5]');
});

test('filterPhotographyProjects and archive totals work accurately across 6 disciplines', () => {
  const counts = getPhotographyCategoryCounts(photographyProjects);
  assert.equal(counts['All'], 11);
  assert.equal(counts['Film'], 2);
  assert.equal(counts['TV'], 1);
  assert.equal(counts['Ceremony'], 2);
  assert.equal(counts['Birthdays'], 4);
  assert.equal(counts['Fashion'], 1);
  assert.equal(counts['Corporate'], 1);

  assert.equal(filterPhotographyProjects(photographyProjects, 'All').length, 11);
  assert.equal(filterPhotographyProjects(photographyProjects, 'TV').length, 1);
  assert.equal(filterPhotographyArchive(photographyArchiveGroups, 'All').length, 6);
  assert.equal(filterPhotographyArchive(photographyArchiveGroups, 'Birthdays').length, 1);

  const totals = getPhotographyArchiveTotals(photographyArchiveGroups);
  assert.equal(totals.disciplines, 6);
  assert.equal(totals.albums, 51);
  assert.ok(totals.photos > 4000);
});

test('SEO meta tags, canonical URL, OpenGraph profile cards, and Schema.org @graph JSON-LD are valid and synced', () => {
  const html = fs.readFileSync(path.join(process.cwd(), 'index.html'), 'utf8');
  const metadata = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'metadata.json'), 'utf8')
  );
  const canonicalUrl = 'https://dilshanweragod.github.io/PORTIFOLIO-SITE/';

  assert.equal(metadata.name, 'Pasindu Dilshan Weragoda Arachchi - Portfolio');
  assert.ok(metadata.description.length >= 120 && metadata.description.length <= 165);
  assert.ok(html.includes(metadata.description));
  assert.ok(html.includes('rel="canonical"') && html.includes(`href="${canonicalUrl}"`));
  assert.ok(html.includes('property="og:type" content="profile"'));
  assert.ok(html.includes('property="og:title"'));
  assert.ok(html.includes('property="og:description"'));
  assert.ok(html.includes('property="og:image"'));
  assert.ok(html.includes('name="twitter:card" content="summary_large_image"'));
  assert.ok(html.includes('application/ld+json'));
  assert.ok(html.includes('"@graph"'));
  assert.ok(html.includes('"ProfilePage"'));
  assert.ok(html.includes('"Person"'));
  assert.ok(html.includes('"hasCredential"'));
  assert.ok(html.includes('"ProfessionalService"'));
  assert.ok(html.includes('"Search Engine Optimization"'));
});

test('public asset URLs include the GitHub Pages project base path', () => {
  assert.equal(
    publicAssetUrl('/assets/extracted/portrait.png', '/PORTIFOLIO-SITE/'),
    '/PORTIFOLIO-SITE/assets/extracted/portrait.png'
  );
  assert.equal(publicAssetUrl('favicon.svg', '/'), '/favicon.svg');
  assert.equal(
    publicAssetUrl('https://example.com/image.png', '/PORTIFOLIO-SITE/'),
    'https://example.com/image.png'
  );
});

test('Portfolio and Photography grid components and album titles omit visible year/date stamps', () => {
  const albumTitles = photographyArchiveGroups.flatMap((g) => g.albums.map((a) => a.title));
  assert.ok(!albumTitles.some((t) => /\b2024\b|\b2025\b/.test(t)));

  const photoGridSrc = fs.readFileSync(
    path.join(process.cwd(), 'src/components/PhotographyGrid.tsx'),
    'utf8'
  );
  const behanceGridSrc = fs.readFileSync(
    path.join(process.cwd(), 'src/components/BehanceGrid.tsx'),
    'utf8'
  );
  assert.ok(!photoGridSrc.includes('project.year'));
  assert.ok(!behanceGridSrc.includes('project.year'));
  assert.ok(!behanceGridSrc.includes('item.year'));
  assert.ok(!behanceGridSrc.includes('selectedLightbox.data.year'));
});

test('technical SEO files (robots.txt, sitemap.xml, favicon.svg) and semantic HTML protections exist', () => {
  const html = fs.readFileSync(path.join(process.cwd(), 'index.html'), 'utf8');
  const robots = fs.readFileSync(path.join(process.cwd(), 'public/robots.txt'), 'utf8');
  const sitemap = fs.readFileSync(path.join(process.cwd(), 'public/sitemap.xml'), 'utf8');
  const favicon = fs.readFileSync(path.join(process.cwd(), 'public/favicon.svg'), 'utf8');
  const homeSrc = fs.readFileSync(path.join(process.cwd(), 'src/components/Home.tsx'), 'utf8');
  const appSrc = fs.readFileSync(path.join(process.cwd(), 'src/App.tsx'), 'utf8');
  const baseUrl = 'https://dilshanweragod.github.io/PORTIFOLIO-SITE';

  assert.ok(html.includes('href="/favicon.svg"'));
  assert.ok(
    robots.includes('User-agent: *') &&
      robots.includes('Allow: /') &&
      robots.includes(`Sitemap: ${baseUrl}/sitemap.xml`)
  );
  assert.ok(sitemap.includes('<urlset') && sitemap.includes(`<loc>${baseUrl}/</loc>`));
  assert.ok(favicon.includes('<svg') && favicon.includes('#FF6A00'));
  assert.ok(appSrc.includes('href="#main-content"'));
  assert.ok(homeSrc.includes('/assets/extracted/work_collage_clean.webp'));
  // Ensure h1 appears cleanly before any h2 in Home.tsx
  assert.ok(homeSrc.indexOf('<h1') !== -1 && homeSrc.indexOf('<h1') < homeSrc.indexOf('<h2'));
});

test('tools, services, and certifications catalogs maintain complete authentic metadata', () => {
  assert.equal(services.length, 8);
  assert.equal(certifications.length, 5);
  assert.equal(toolCategories.length, 10);
  assert.equal(filterTechTools(techTools, 'All').length, 41);
  assert.equal(techTools.length, 41);

  // Exact 9 categories matching specifications
  assert.equal(filterTechTools(techTools, 'Digital Marketing & Advertising').length, 4);
  assert.equal(filterTechTools(techTools, 'Office Suites & File Management').length, 10);
  assert.equal(filterTechTools(techTools, 'Communication Tools').length, 5);
  assert.equal(filterTechTools(techTools, 'Design & Graphic Tools').length, 9);
  assert.equal(filterTechTools(techTools, 'Video Editing Tools').length, 3);
  assert.equal(filterTechTools(techTools, 'Live Streaming Tools').length, 3);
  assert.equal(filterTechTools(techTools, 'AI & Writing Assistants').length, 4);
  assert.equal(filterTechTools(techTools, 'Web Development & CMS').length, 1);
  assert.equal(filterTechTools(techTools, 'Digital Platforms').length, 2);

  for (const id of [
    'adobe-after-effects',
    'adobe-indesign',
    'figma',
    'wordpress',
    'google',
    'meta',
    'davinci-resolve',
    'google-ads',
    'meta-ads',
    'capcut'
  ]) {
    assert.ok(techTools.some((tool) => tool.id === id), `Expected ${id} in the tools catalog`);
  }

  for (const tool of techTools) {
    const parsedUrl = new URL(tool.officialUrl);
    assert.equal(parsedUrl.protocol, 'https:');
    assert.ok(tool.description.length > 20);
  }

  for (const cert of certifications) {
    const parsedUrl = new URL(cert.programUrl);
    assert.equal(parsedUrl.protocol, 'https:');
    assert.ok(cert.focusAreas.length >= 3);
  }
});

test('featured tools sit under Professional Experience and open the full ToolsModal', () => {
  const appSrc = fs.readFileSync(path.join(process.cwd(), 'src/App.tsx'), 'utf8');
  const homeSrc = fs.readFileSync(path.join(process.cwd(), 'src/components/Home.tsx'), 'utf8');
  const toolsSectionSrc = fs.readFileSync(path.join(process.cwd(), 'src/components/ToolsSection.tsx'), 'utf8');
  const toolsModalSrc = fs.readFileSync(path.join(process.cwd(), 'src/components/ToolsModal.tsx'), 'utf8');

  assert.equal(fs.existsSync(path.join(process.cwd(), 'src/components/ToolsShowcase.tsx')), false);
  assert.ok(!appSrc.includes('ToolsShowcase'));
  assert.ok(appSrc.includes('<ToolsModal'));
  assert.ok(!appSrc.includes('<ToolsSection'));
  assert.ok(homeSrc.includes('<ToolsSection'));
  assert.ok(homeSrc.includes('onOpenToolsModal'));
  assert.ok(toolsSectionSrc.includes('onOpenToolsModal'));
  assert.ok(toolsSectionSrc.includes('View All Tools &amp; Technologies'));
  assert.ok(toolsModalSrc.includes('role="dialog"'));
  assert.ok(toolsModalSrc.includes("event.key === 'Escape'"));
  assert.ok(toolsModalSrc.includes("document.body.style.overflow = 'hidden'"));
  assert.ok(toolsModalSrc.includes('onClick={onClose}'));
});

test('CV modal includes exact uploaded PDF CV details without leaking them onto Home page', async () => {
  const { cvData } = await import('../data/cv');
  const homeSrc = fs.readFileSync(path.join(process.cwd(), 'src/components/Home.tsx'), 'utf8');
  const resumeModalSrc = fs.readFileSync(
    path.join(process.cwd(), 'src/components/ResumeModal.tsx'),
    'utf8'
  );
  const contactSrc = fs.readFileSync(path.join(process.cwd(), 'src/components/Contact.tsx'), 'utf8');

  assert.equal(cvData.fullName, 'Pasindu Dilshan Weragoda Arachchi');
  assert.equal(cvData.phone, '+94 71 957 5360');
  assert.equal(cvData.experiences.length, 3);
  assert.equal(cvData.education.length, 2);
  assert.equal(cvData.certifications.length, 3);
  assert.equal(cvData.skills.length, 2);
  assert.deepEqual(cvData.languages, ['English (Advanced)']);

  assert.ok(resumeModalSrc.includes("from '../data/cv'"));
  assert.ok(resumeModalSrc.includes('tel:+94719575360'));
  assert.ok(contactSrc.includes('phone=94719575360'));
  assert.ok(contactSrc.includes('071 957 5360'));
  assert.ok(!homeSrc.includes("from '../data/cv'"));
  assert.ok(!homeSrc.includes('0704955558'));
  assert.ok(!homeSrc.includes('Kingston University'));
});

test('secure Google API key decryption module protects and reconstructs key successfully', async () => {
  const { getSecureGoogleApiKey } = await import('./secureKey');
  const apiKey = getSecureGoogleApiKey();
  assert.ok(apiKey.startsWith('AIzaSy'));
  assert.equal(apiKey.length, 39);
});





