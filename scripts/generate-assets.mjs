import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PDFDocument, PDFName, PDFString, StandardFonts, rgb } from 'pdf-lib';
import pngToIco from 'png-to-ico';
import sharp from 'sharp';
import { profile, site } from '../src/content/portfolio.ts';
import { buildResumeModel } from './content-output.mjs';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, '..');
const sourceDirectory = path.join(projectRoot, 'assets', 'source');
const publicDirectory = path.join(projectRoot, 'public');
const temporaryDirectory = path.join(projectRoot, '.asset-generation-temp');
const resume = buildResumeModel();

const colors = {
  background: site.themeColor,
  foreground: '#11110f',
  accent: '#4338a8',
  muted: '#68665f',
};

await Promise.all([
  mkdir(path.join(publicDirectory, 'brand'), { recursive: true }),
  mkdir(path.join(publicDirectory, 'documents'), { recursive: true }),
  mkdir(path.join(publicDirectory, 'icons'), { recursive: true }),
  mkdir(path.join(publicDirectory, 'media'), { recursive: true }),
  mkdir(path.join(publicDirectory, 'social'), { recursive: true }),
  mkdir(temporaryDirectory, { recursive: true }),
]);

const monogramSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-labelledby="title">
  <title id="title">PR monogram</title>
  <rect width="64" height="64" fill="${colors.foreground}"/>
  <text x="32" y="40" fill="${colors.background}" font-family="Arial, Helvetica, sans-serif" font-size="27" font-weight="700" text-anchor="middle" letter-spacing="-2">PR</text>
</svg>
`.trim();

const faviconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-labelledby="title">
  <title id="title">${profile.name} favicon</title>
  <rect width="64" height="64" fill="${colors.accent}"/>
  <text x="32" y="45" fill="#ffffff" font-family="Arial Narrow, Arial, Helvetica, sans-serif" font-size="44" font-weight="700" text-anchor="middle">P</text>
</svg>
`.trim();

const socialCardSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="title desc">
  <title id="title">${site.name} social card</title>
  <desc id="desc">${profile.roles.join(', ')}</desc>
  <rect width="1200" height="630" fill="${colors.background}"/>
  <line x1="54" y1="82" x2="1146" y2="82" stroke="${colors.foreground}" stroke-width="2"/>
  <line x1="54" y1="548" x2="1146" y2="548" stroke="${colors.foreground}" stroke-width="2"/>
  <rect x="54" y="30" width="52" height="52" fill="${colors.foreground}"/>
  <text x="80" y="66" fill="${colors.background}" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" text-anchor="middle" letter-spacing="-1">PR</text>
  <text x="130" y="65" fill="${colors.foreground}" font-family="Arial, Helvetica, sans-serif" font-size="25" font-weight="700">${profile.name}</text>
  <text x="54" y="220" fill="${colors.foreground}" font-family="Arial Narrow, Arial, Helvetica, sans-serif" font-size="92" font-weight="900" letter-spacing="-3">PRODUCT TO MARKET.</text>
  <text x="54" y="310" fill="${colors.foreground}" font-family="Arial Narrow, Arial, Helvetica, sans-serif" font-size="92" font-weight="900" letter-spacing="-3">DESIGN TO CODE.</text>
  <rect x="54" y="385" width="350" height="6" fill="${colors.accent}"/>
  <text x="54" y="459" fill="${colors.foreground}" font-family="Arial, Helvetica, sans-serif" font-size="34">${profile.roles.join(' · ')}</text>
  <text x="54" y="590" fill="${colors.muted}" font-family="Arial, Helvetica, sans-serif" font-size="24">${profile.location}</text>
  <text x="1146" y="590" fill="${colors.accent}" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" text-anchor="end">${new URL(site.origin).host}</text>
</svg>
`.trim();

await Promise.all([
  writeFile(
    path.join(publicDirectory, 'brand', 'pr-monogram.svg'),
    monogramSvg,
  ),
  writeFile(
    path.join(publicDirectory, 'brand', 'social-card.svg'),
    socialCardSvg,
  ),
]);

const renderFavicon = async (size, outputPath) => {
  await sharp(Buffer.from(faviconSvg))
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(outputPath);
};

const faviconSizes = [16, 32, 48];
const faviconPaths = [];

for (const size of faviconSizes) {
  const outputPath = path.join(temporaryDirectory, `favicon-${size}.png`);
  faviconPaths.push(outputPath);
  await renderFavicon(size, outputPath);
}

await Promise.all([
  writeFile(path.join(publicDirectory, 'brand', 'favicon.svg'), faviconSvg),
  renderFavicon(192, path.join(publicDirectory, 'icons', 'icon-192.png')),
  renderFavicon(512, path.join(publicDirectory, 'icons', 'icon-512.png')),
  renderFavicon(180, path.join(publicDirectory, 'apple-touch-icon.png')),
  sharp(Buffer.from(socialCardSvg))
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDirectory, 'social', 'paula-riquelme.png')),
]);

await writeFile(
  path.join(publicDirectory, 'favicon.ico'),
  await pngToIco(faviconPaths),
);

const imageJobs = [
  {
    input: 'woku-site-current.png',
    output: 'woku-project.webp',
    transform: (image) =>
      image
        .extract({ left: 0, top: 0, width: 1600, height: 680 })
        .resize(1600, 900, { fit: 'cover', position: 'left top' }),
  },
  {
    input: 'wondeya-site-current.png',
    output: 'wondeya-project.webp',
    transform: (image) =>
      image
        .extract({ left: 0, top: 0, width: 1600, height: 680 })
        .resize(1600, 900, { fit: 'cover', position: 'top' }),
  },
  {
    input: 'woku.png',
    output: 'woku-evidence.webp',
    transform: (image) =>
      image.extract({ left: 20, top: 18, width: 540, height: 460 }),
  },
  {
    input: 'inpla.png',
    output: 'inpla-project.webp',
    transform: (image) =>
      image.extract({ left: 32, top: 28, width: 1088, height: 720 }),
  },
  {
    input: 'inpla-hero-official.webp',
    output: 'inpla-website.webp',
    transform: (image) =>
      image.resize({ width: 1600, withoutEnlargement: true }),
  },
  {
    input: 'verano1.png',
    output: 'summer-recommendations-01.webp',
    transform: (image) =>
      image.resize({ width: 1200, withoutEnlargement: true }),
  },
  {
    input: 'verano2.png',
    output: 'summer-recommendations-02.webp',
    transform: (image) =>
      image.resize({ width: 1080, withoutEnlargement: true }),
  },
  {
    input: 'fracaso.png',
    output: 'startup-closure-feature.webp',
    transform: (image) =>
      image.extract({ left: 0, top: 0, width: 1103, height: 1240 }),
  },
  {
    input: 'madeinnconce.png',
    output: 'made-inn-conce-2024.webp',
    transform: (image) =>
      image.resize({ width: 1200, withoutEnlargement: true }),
  },
  {
    input: 'optima2017.jpeg',
    output: 'optima-2017.webp',
    transform: (image) =>
      image.resize({ width: 549, withoutEnlargement: true }),
  },
];

for (const job of imageJobs) {
  const image = sharp(path.join(sourceDirectory, job.input)).flatten({
    background: '#ffffff',
  });
  await job
    .transform(image)
    .webp({ quality: 88, smartSubsample: true })
    .toFile(path.join(publicDirectory, 'media', job.output));
}

const pdf = await PDFDocument.create();
const documentDate = new Date('2026-08-29T00:00:00.000Z');
pdf.setTitle(`${resume.name} - English Resume`);
pdf.setAuthor(resume.name);
pdf.setSubject(resume.roles.join(', '));
pdf.setKeywords([
  'product leadership',
  'product design',
  'frontend development',
]);
pdf.setLanguage('en-US');
pdf.setCreationDate(documentDate);
pdf.setModificationDate(documentDate);
pdf.catalog.set(PDFName.of('Lang'), PDFString.of('en-US'));

const regularFont = await pdf.embedFont(StandardFonts.Helvetica);
const boldFont = await pdf.embedFont(StandardFonts.HelveticaBold);
const pageSize = [595.28, 841.89];
const margin = 44;
const contentWidth = pageSize[0] - margin * 2;

const wrapText = (text, font, size, maxWidth) => {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
      line = candidate;
    } else {
      if (line) lines.push(line);
      line = word;
    }
  }

  if (line) lines.push(line);
  return lines;
};

const createPage = () => {
  const page = pdf.addPage(pageSize);
  page.drawLine({
    start: { x: margin, y: pageSize[1] - 34 },
    end: { x: pageSize[0] - margin, y: pageSize[1] - 34 },
    thickness: 1,
    color: rgb(0.07, 0.07, 0.06),
  });
  return page;
};

const drawWrapped = (page, text, options) => {
  const {
    x = margin,
    y,
    size = 9,
    font = regularFont,
    color = rgb(0.07, 0.07, 0.06),
    lineHeight = size * 1.35,
    maxWidth = contentWidth,
  } = options;
  const lines = wrapText(text, font, size, maxWidth);
  lines.forEach((line, index) => {
    page.drawText(line, { x, y: y - index * lineHeight, size, font, color });
  });
  return y - lines.length * lineHeight;
};

const drawSectionTitle = (page, title, y) => {
  page.drawText(title.toUpperCase(), {
    x: margin,
    y,
    size: 8,
    font: boldFont,
    color: rgb(0.26, 0.22, 0.66),
    characterSpacing: 1.2,
  });
  return y - 17;
};

const drawRole = (page, role, company, dates, location, bullets, y) => {
  y = drawWrapped(page, `${role} | ${company}`, {
    y,
    size: 11,
    font: boldFont,
    lineHeight: 13,
  });
  y = drawWrapped(page, location ? `${dates} | ${location}` : dates, {
    y: y + 1,
    size: 8.3,
    color: rgb(0.4, 0.39, 0.36),
    lineHeight: 11,
  });
  for (const bullet of bullets) {
    y = drawWrapped(page, `• ${bullet}`, {
      x: margin + 8,
      y: y - 1,
      size: 8.4,
      lineHeight: 10.8,
      maxWidth: contentWidth - 8,
    });
  }
  return y - 8;
};

const drawDocumentHeader = (page, subtitle, nameSize = 18) => {
  page.drawText(resume.name.toUpperCase(), {
    x: margin,
    y: 770,
    size: nameSize,
    font: boldFont,
    color: rgb(0.07, 0.07, 0.06),
  });
  page.drawText(subtitle.toUpperCase(), {
    x: margin,
    y: 748,
    size: 9.5,
    font: boldFont,
    color: rgb(0.26, 0.22, 0.66),
  });
};

let page = createPage();
page.drawText(resume.name.toUpperCase(), {
  x: margin,
  y: 770,
  size: 27,
  font: boldFont,
  color: rgb(0.07, 0.07, 0.06),
});
page.drawText(resume.roles.join(' · ').toUpperCase(), {
  x: margin,
  y: 746,
  size: 10.5,
  font: boldFont,
  color: rgb(0.26, 0.22, 0.66),
});
page.drawText(
  `${resume.location}  |  ${resume.email}  |  linkedin.com/in/pauriquelme`,
  {
    x: margin,
    y: 727,
    size: 8.3,
    font: regularFont,
    color: rgb(0.4, 0.39, 0.36),
  },
);

let y = drawSectionTitle(page, 'Profile', 697);
y = drawWrapped(page, resume.summary, { y, size: 9.1, lineHeight: 12.3 }) - 10;

y = drawSectionTitle(page, 'Core skills', y);
for (const group of resume.skills) {
  y = drawWrapped(page, `${group.name}: ${group.items.join(', ')}.`, {
    y: y - 2,
    size: 8.6,
    lineHeight: 11.3,
  });
}
y -= 10;

y = drawSectionTitle(page, 'Selected experience', y);
for (const item of resume.experience.slice(0, 2)) {
  y = drawRole(
    page,
    item.role,
    item.company,
    item.dates,
    item.location,
    item.responsibilities,
    y,
  );
}

page = createPage();
drawDocumentHeader(page, 'Experience, education and evidence');
y = 714;
for (const item of resume.experience.slice(2)) {
  y = drawRole(
    page,
    item.role,
    item.company,
    item.dates,
    item.location,
    item.responsibilities,
    y,
  );
}
y = drawSectionTitle(page, 'Education', y);
for (const item of resume.education) {
  y = drawWrapped(page, `${item.degree} | ${item.institution}, ${item.year}`, {
    y: y - 3,
    size: 9.2,
    font: boldFont,
    lineHeight: 12,
  });
}

y -= 16;
y = drawSectionTitle(page, 'Recognition', y);
y = drawWrapped(page, resume.recognition.title, {
  y,
  size: 10.5,
  font: boldFont,
  lineHeight: 13,
});
y =
  drawWrapped(
    page,
    `${resume.recognition.description} ${resume.recognition.outcome}`,
    { y: y - 1, size: 8.7, lineHeight: 11.5 },
  ) - 10;
y = drawSectionTitle(page, 'Press', y);
y = drawWrapped(
  page,
  `${resume.pressFeatures.length} El Mercurio Innovation features: ${resume.pressFeatures.map((feature) => feature.title).join('; ')}.`,
  { y, size: 8.7, lineHeight: 11.5 },
);
y = drawWrapped(page, `Portfolio: ${resume.links.portfolio}`, {
  y: y - 5,
  size: 8.5,
  font: boldFont,
  lineHeight: 11,
});
y =
  drawWrapped(
    page,
    `${resume.projects
      .filter((project) => project.href)
      .map((project) => `${project.name}: ${project.href}`)
      .join('  |  ')}  |  Methodology: ${resume.links.methodology}`,
    { y: y - 2, size: 8.5, lineHeight: 11 },
  ) - 10;
y = drawSectionTitle(page, 'Languages', y);
drawWrapped(page, resume.language, {
  y,
  size: 8.8,
  lineHeight: 11,
});

for (const [index, resumePage] of pdf.getPages().entries()) {
  resumePage.drawText(`${index + 1} / ${pdf.getPageCount()}`, {
    x: pageSize[0] - margin - 24,
    y: 22,
    size: 7.5,
    font: regularFont,
    color: rgb(0.4, 0.39, 0.36),
  });
}

await writeFile(
  path.join(publicDirectory, 'documents', 'paula-riquelme-resume-en.pdf'),
  await pdf.save({ useObjectStreams: true }),
);

await rm(temporaryDirectory, { recursive: true, force: true });
console.log(`Generated ${imageJobs.length + 8} production assets.`);
