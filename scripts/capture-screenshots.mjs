import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const previewUrl = 'http://127.0.0.1:4173/';
const server = spawn(process.execPath, ['scripts/serve-out.mjs'], {
  cwd: process.cwd(),
  stdio: 'ignore',
});
const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'narrow-mobile', width: 320, height: 844 },
];
const evidenceRoutes = [
  { name: 'woku-case-study', path: 'work/woku/' },
  { name: 'wondeya-case-study', path: 'work/wondeya/' },
  { name: 'inpla-case-study', path: 'work/inpla/' },
  { name: 'agent-readiness-about', path: 'about/' },
  {
    name: 'agent-readiness-404',
    path: 'agent-readiness-path-that-does-not-exist',
    desktopOnly: true,
  },
];

const waitForServer = async () => {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(previewUrl);
      if (response.ok) return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
  throw new Error('The static preview did not become available.');
};

let browser;

const revealPage = async (page) => {
  const height = await page.evaluate(
    () => document.documentElement.scrollHeight,
  );
  for (let y = 0; y < height; y += 700) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(80);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(180);
};

try {
  await waitForServer();
  await mkdir('docs/screenshots', { recursive: true });
  browser = await chromium.launch({ headless: true });

  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    await page.goto(previewUrl, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(550);
    await page.screenshot({
      path: `docs/screenshots/${viewport.name}.png`,
      fullPage: false,
    });

    if (viewport.name === 'desktop' || viewport.name === 'mobile') {
      await revealPage(page);
      await page.screenshot({
        path: `docs/screenshots/${viewport.name}-full.png`,
        fullPage: true,
      });
    }

    if (viewport.name === 'mobile') {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.getByRole('button', { name: 'Open navigation' }).click();
      await page.getByRole('dialog', { name: 'Navigation' }).waitFor();
      await page.mouse.move(200, 800);
      await page.waitForTimeout(350);
      await page.screenshot({
        path: 'docs/screenshots/mobile-menu.png',
        fullPage: false,
      });
    }
    await context.close();
  }

  for (const route of evidenceRoutes) {
    for (const viewport of viewports.filter(
      ({ name }) =>
        name === 'desktop' || (!route.desktopOnly && name === 'mobile'),
    )) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        deviceScaleFactor: 1,
      });
      const page = await context.newPage();
      await page.goto(new URL(route.path, previewUrl).toString(), {
        waitUntil: 'load',
      });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(350);
      await revealPage(page);
      await page.screenshot({
        path: `docs/screenshots/${route.name}-${viewport.name}.png`,
        fullPage: route.name.includes('case-study'),
      });
      await context.close();
    }
  }

  console.log(
    'Captured responsive home, menu, case study, trust, and 404 screenshots.',
  );
} finally {
  if (browser) await browser.close();
  server.kill('SIGTERM');
}
