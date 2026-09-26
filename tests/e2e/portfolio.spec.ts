import { expect, test } from '@playwright/test';

const productionPath = '/';

test.beforeEach(async ({ page }) => {
  await page.goto('./');
});

test('renders the English portfolio and primary navigation', async ({
  page,
}) => {
  await expect(page).toHaveTitle(
    'Paula Riquelme Portfolio | Product Lead & Product Designer',
  );
  await expect(
    page.getByRole('heading', {
      name: 'I design products, bring them to market, and can build them too.',
    }),
  ).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Woku' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Inpla' })).toBeVisible();
  await expect(
    page.getByText('USD 70,000', { exact: false }).first(),
  ).toBeVisible();
  await expect(
    page.getByText('Puerto Coronel', { exact: false }).first(),
  ).toBeVisible();

  if ((await page.viewportSize())!.width >= 1088) {
    await page.getByRole('link', { name: 'Experience', exact: true }).click();
    await expect(page).toHaveURL(/#experience$/);
    await expect(
      page.getByRole('heading', { name: 'Experience' }),
    ).toBeInViewport();
  }

  await expect(page.locator('a[href="/en"], a[href="/es"]')).toHaveCount(0);
  await expect(page.getByText(/language selector/i)).toHaveCount(0);
});

test('supports accessible mobile navigation', async ({ page }) => {
  test.skip(
    (await page.viewportSize())!.width >= 1088,
    'Mobile navigation only',
  );

  const trigger = page.getByRole('button', { name: 'Open navigation' });
  await trigger.click();
  await expect(page.getByRole('dialog', { name: 'Navigation' })).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'English resume' }),
  ).toHaveAttribute('download', '');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', { name: 'Navigation' })).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('links project cards only to verified case studies and websites', async ({
  page,
}) => {
  await expect(page.getByText(/Live preview/i)).toHaveCount(0);
  await expect(page.getByRole('dialog')).toHaveCount(0);

  for (const [project, path, website] of [
    ['Woku', '/work/woku/', 'https://woku.app'],
    ['Wondeya', '/work/wondeya/', 'https://wondeya.com'],
    ['Inpla', '/work/inpla/', 'https://inpla.ai/en/'],
  ] as const) {
    await expect(
      page.getByRole('link', { name: `View case study: ${project}` }),
    ).toHaveAttribute('href', path);
    const externalLink = page.getByRole('link', {
      name: `Visit website for ${project}`,
    });
    await expect(externalLink).toHaveAttribute('href', website);
    await expect(externalLink).toHaveAttribute('target', '_blank');
    await expect(externalLink).toHaveAttribute('rel', 'noreferrer noopener');
  }

  await expect(
    page.getByRole('link', { name: 'View case study: Orvita' }),
  ).toHaveCount(0);
  await expect(
    page.getByRole('link', { name: 'Visit website for Orvita' }),
  ).toHaveCount(0);
});

test('publishes complete canonical case study routes', async ({ page }) => {
  for (const [path, project, signalHeading] of [
    ['/work/woku/', 'Woku', 'Customer and market signal'],
    ['/work/wondeya/', 'Wondeya', 'Measured evidence'],
    ['/work/inpla/', 'Inpla', 'Customer and market signal'],
  ] as const) {
    const response = await page.request.get(path);
    expect(response.status(), path).toBe(200);
    await page.goto(path);

    await expect(
      page.getByRole('heading', { level: 1, name: project }),
    ).toBeVisible();
    for (const heading of [
      'Project overview',
      'Context and problem',
      "Paula's role and responsibilities",
      'Constraints and initial conditions',
      signalHeading,
      'Product and design decisions',
      'Implementation and delivery',
      'Outcomes and measurable evidence',
      'Supporting media and external evidence',
      'Reflection and key lesson',
    ]) {
      await expect(page.getByRole('heading', { name: heading })).toBeAttached();
    }
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://pauriquelmee.github.io${path}`,
    );
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
      'content',
      'article',
    );
    expect(
      await page.locator('script[type="application/ld+json"]').textContent(),
    ).toContain('"@type":"Article"');
    await expect(
      page.getByRole('link', { name: 'Return to selected work' }),
    ).toHaveAttribute('href', '/#work');
  }
});

test('serves the resume and static media from the production root', async ({
  page,
}) => {
  expect(new URL(page.url()).pathname).toBe(productionPath);

  const resume = page.getByRole('link', {
    name: "Download Paula Riquelme's English resume as a PDF",
  });
  await expect(resume).toHaveAttribute(
    'href',
    `${productionPath}documents/paula-riquelme-resume-en.pdf`,
  );
  await expect(resume).toHaveAttribute('download', '');

  const assetUrls = await page
    .locator(
      "img[src], script[src], link[rel='stylesheet'], link[rel='manifest']",
    )
    .evaluateAll((elements) =>
      elements.map((element) => {
        const source =
          element.getAttribute('src') ?? element.getAttribute('href');
        return new URL(source!, window.location.href).toString();
      }),
    );

  for (const assetUrl of [...new Set(assetUrls)]) {
    expect(new URL(assetUrl).origin).toBe(new URL(page.url()).origin);
    expect(new URL(assetUrl).pathname).toMatch(/^\//);
    const response = await page.request.get(assetUrl);
    expect(response.status(), assetUrl).toBe(200);
  }

  for (const assetPath of [
    '/media/woku-project.webp',
    '/media/wondeya-project.webp',
    '/media/orvita.a.gif',
  ]) {
    const response = await page.request.get(assetPath);
    expect(response.status(), assetPath).toBe(200);
  }

  const resumeResponse = await page.request.get(
    `${productionPath}documents/paula-riquelme-resume-en.pdf`,
  );
  expect(resumeResponse.status()).toBe(200);
  expect(resumeResponse.headers()['content-type']).toContain('application/pdf');

  const llmsLink = page.getByRole('link', {
    name: 'Read the portfolio llms.txt file',
  });
  await expect(llmsLink).toHaveAttribute('href', `${productionPath}llms.txt`);
  await expect(page.locator('link[rel="describedby"]')).toHaveAttribute(
    'href',
    'https://pauriquelmee.github.io/llms.txt',
  );
  await expect(
    page.locator('link[rel="alternate"][type="text/markdown"]'),
  ).toHaveAttribute('href', 'https://pauriquelmee.github.io/index.md');

  const llmsResponse = await page.request.get(`${productionPath}llms.txt`);
  expect(llmsResponse.status()).toBe(200);
  expect(llmsResponse.headers()['content-type']).toContain('text/plain');
  const llmsText = await llmsResponse.text();
  expect(llmsText).toContain('# Paula Riquelme Portfolio');
  expect(llmsText).toContain('## When to use this portfolio');
  expect(llmsText).toContain('## How agents should use it');
  expect(llmsText).toContain('https://inpla.ai/en/');
});

test('publishes substantive trust pages and lists them in the sitemap', async ({
  page,
}) => {
  for (const [path, heading] of [
    ['/about/', 'About Paula Riquelme'],
    ['/contact/', 'Contact Paula Riquelme'],
    ['/privacy/', 'Privacy notice'],
  ] as const) {
    const response = await page.request.get(path);
    expect(response.status(), path).toBe(200);

    await page.goto(path);
    await expect(page.getByRole('heading', { name: heading })).toBeVisible();
    const visibleText = await page.locator('main').innerText();
    expect(visibleText.length, path).toBeGreaterThanOrEqual(500);
    await expect(
      page.getByRole('link', { name: 'Paula Riquelme Portfolio home' }),
    ).toHaveAttribute('href', '/');
  }

  const sitemapResponse = await page.request.get('/sitemap.xml');
  expect(sitemapResponse.status()).toBe(200);
  const sitemapText = await sitemapResponse.text();
  expect(sitemapText).toContain('https://pauriquelmee.github.io/about/');
  expect(sitemapText).toContain('https://pauriquelmee.github.io/contact/');
  expect(sitemapText).toContain('https://pauriquelmee.github.io/privacy/');
  expect(sitemapText).toContain('https://pauriquelmee.github.io/work/woku/');
  expect(sitemapText).toContain('https://pauriquelmee.github.io/work/wondeya/');
  expect(sitemapText).toContain('https://pauriquelmee.github.io/work/inpla/');
});

test('serves a recoverable 404 and Markdown recovery document', async ({
  page,
}) => {
  const missingResponse = await page.request.get(
    '/agent-readiness-path-that-does-not-exist',
    { headers: { Accept: 'text/markdown' } },
  );
  expect(missingResponse.status()).toBe(404);
  const missingBody = await missingResponse.text();
  expect(missingBody).toContain('Page not found');
  expect(missingBody).toContain('/sitemap.xml');
  expect(missingBody).toContain('/llms.txt');
  expect(missingBody).toContain('/404.md');

  const markdownResponse = await page.request.get('/404.md');
  expect(markdownResponse.status()).toBe(200);
  expect(markdownResponse.headers()['content-type']).toContain('text/markdown');
  expect(await markdownResponse.text()).toContain(
    '[Agent instructions](https://pauriquelmee.github.io/llms.txt)',
  );
});

test('publishes a canonical Markdown alternative for agents', async ({
  page,
}) => {
  const response = await page.request.get('/index.md');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('text/markdown');
  const markdown = await response.text();
  expect(markdown).toContain('# Paula Riquelme Portfolio');
  expect(markdown).toContain('## Selected work');
  expect(markdown).toContain('## Contact');
});

test('keeps project, LinkedIn, recognition, and press links safe', async ({
  page,
}) => {
  await expect(
    page.getByRole('link', { name: 'Visit website for Woku' }),
  ).toHaveAttribute('rel', 'noreferrer noopener');
  await expect(
    page.getByRole('link', {
      name: 'Open Paula Riquelme on LinkedIn in a new tab',
    }),
  ).toHaveAttribute('href', 'https://www.linkedin.com/in/pauriquelme');
  const repositoryLink = page.getByRole('link', {
    name: 'GitHub repository: Open the source repository for Paula Riquelme Portfolio in a new tab',
  });
  await expect(repositoryLink).toHaveAttribute(
    'href',
    'https://github.com/PauRiquelmee/pauriquelmee.github.io',
  );
  await expect(repositoryLink).toHaveAttribute('target', '_blank');
  await expect(repositoryLink).toHaveAttribute('rel', 'noreferrer noopener');
  if ((await page.viewportSize())!.width <= 768) {
    expect((await repositoryLink.boundingBox())!.height).toBeGreaterThanOrEqual(
      44,
    );
  }
  await expect(
    page.getByRole('link', { name: 'Best Undergraduate Paper | OPTIMA 2017' }),
  ).toHaveAttribute('target', '_blank');
  await expect(page.locator('.press-title')).toHaveCount(5);
  await expect(page.locator('.press-title').first()).toHaveAttribute(
    'rel',
    'noreferrer noopener',
  );
});

test('contains complete core resume content and English metadata', async ({
  page,
}) => {
  for (const company of [
    'woku',
    'Inpla',
    'stow SpA',
    'Essbio',
    'Universidad de Concepción',
    'Orvita',
  ]) {
    await expect(
      page.getByText(company, { exact: true }).first(),
    ).toBeAttached();
  }

  await expect(page.locator('html[lang="en"]')).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://pauriquelmee.github.io/',
  );
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
    'content',
    'en_US',
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    'content',
    'summary_large_image',
  );
  expect(
    await page.locator('script[type="application/ld+json"]').textContent(),
  ).toContain('https://www.linkedin.com/in/pauriquelme');
});

test('keeps the Essbio link quiet and the desktop role register balanced', async ({
  page,
}) => {
  const essbioEntry = page
    .locator('.experience-entry')
    .filter({ hasText: 'Essbio' });
  const methodologyLink = essbioEntry.getByRole('link', {
    name: "Used Carlos Osorio's (defi)2 innovation methodology. Opens in a new tab",
  });
  const referenceResponsibility = essbioEntry
    .locator('.experience-responsibilities li')
    .first();

  const [linkStyle, referenceStyle] = await Promise.all([
    methodologyLink.evaluate((element) => ({
      color: getComputedStyle(element).color,
      fontWeight: getComputedStyle(element).fontWeight,
    })),
    referenceResponsibility.evaluate((element) => ({
      color: getComputedStyle(element).color,
      fontWeight: getComputedStyle(element).fontWeight,
    })),
  ]);

  expect(linkStyle).toEqual(referenceStyle);

  if ((await page.viewportSize())!.width >= 1088) {
    await methodologyLink.hover();
    await expect
      .poll(() =>
        methodologyLink.evaluate((element) => getComputedStyle(element).color),
      )
      .not.toBe(referenceStyle.color);

    const roleDividers = await page
      .locator('.role-register span')
      .evaluateAll((elements) =>
        elements.map((element) => getComputedStyle(element).borderLeftWidth),
      );
    expect(roleDividers).toEqual(['1px', '1px', '1px']);
    await expect(page.locator('.role-register')).toHaveCSS(
      'border-right-width',
      '1px',
    );
  } else {
    const roleDividers = await page
      .locator('.role-register span')
      .evaluateAll((elements) =>
        elements.map((element) => getComputedStyle(element).borderLeftWidth),
      );
    expect(roleDividers).toEqual(['0px', '0px', '0px']);
  }
});

test('keeps desktop metrics aligned, on one line, and actions square', async ({
  page,
}) => {
  test.skip((await page.viewportSize())!.width < 1088, 'Desktop layout only');

  const preProduct = page
    .locator('[data-project="inpla"] .project-metrics dd')
    .filter({ hasText: 'Pre-product' });
  const lineCount = await preProduct.evaluate((element) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    return range.getClientRects().length;
  });

  expect(lineCount).toBe(1);

  const metricValueTopGroups = await page
    .locator('.project-metrics')
    .evaluateAll((elements) =>
      elements.map((element) =>
        [...element.querySelectorAll('dd')].map(
          (metric) => metric.getBoundingClientRect().top,
        ),
      ),
    );
  for (const metricValueTops of metricValueTopGroups) {
    expect(
      Math.max(...metricValueTops) - Math.min(...metricValueTops),
    ).toBeLessThanOrEqual(1);
  }

  await expect(
    page.getByRole('link', { name: 'View selected work' }),
  ).toHaveCSS('border-radius', '0px');
  await expect(
    page.getByRole('link', { name: 'Contact', exact: true }),
  ).toHaveCSS('border-radius', '0px');
});

test('aligns mobile metric values and hero actions', async ({ page }) => {
  test.skip((await page.viewportSize())!.width >= 1088, 'Mobile layout only');

  for (const project of ['woku', 'inpla']) {
    const valueTops = await page
      .locator(`[data-project="${project}"] .project-metrics dd`)
      .evaluateAll((elements) =>
        elements.map((element) => element.getBoundingClientRect().top),
      );

    expect(Math.max(...valueTops) - Math.min(...valueTops)).toBeLessThanOrEqual(
      1,
    );
  }

  const actionHeights = await page
    .locator('.hero-actions .button')
    .evaluateAll((elements) =>
      elements.map((element) => element.getBoundingClientRect().height),
    );
  expect(
    Math.max(...actionHeights) - Math.min(...actionHeights),
  ).toBeLessThanOrEqual(1);
});

test('keeps selected work on the shared vertical rhythm', async ({ page }) => {
  const spacing = await page.locator('.selected-work').evaluate((section) => {
    const heading = section.querySelector<HTMLElement>('.section-heading')!;
    const card = section.querySelector<HTMLElement>('.project-card')!;

    return {
      sectionPaddingTop: Number.parseFloat(
        getComputedStyle(section).paddingTop,
      ),
      headingMarginBottom: Number.parseFloat(
        getComputedStyle(heading).marginBottom,
      ),
      cardPaddingTop: Number.parseFloat(getComputedStyle(card).paddingTop),
    };
  });

  expect(spacing.sectionPaddingTop).toBeGreaterThanOrEqual(72);
  expect(spacing.headingMarginBottom).toBeGreaterThanOrEqual(40);
  expect(spacing.cardPaddingTop).toBeGreaterThanOrEqual(16);
});

test('reflows without horizontal overflow and keeps informative text legible', async ({
  page,
}) => {
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);

  const informativeSelectors = [
    '.project-role',
    '.project-media figcaption',
    '.project-metrics dt',
    '.experience-meta',
    '.contact-links a',
  ];
  for (const selector of informativeSelectors) {
    const sizes = await page
      .locator(selector)
      .evaluateAll((elements) =>
        elements.map((element) =>
          Number.parseFloat(getComputedStyle(element).fontSize),
        ),
      );
    expect(Math.min(...sizes), selector).toBeGreaterThanOrEqual(12);
  }

  const supportingSizes = await page
    .locator('.project-outcomes li, .experience-responsibilities li')
    .evaluateAll((elements) =>
      elements.map((element) =>
        Number.parseFloat(getComputedStyle(element).fontSize),
      ),
    );
  expect(Math.min(...supportingSizes)).toBeGreaterThanOrEqual(14);
});

test('fills the recognition card height with its evidence image', async ({
  page,
}) => {
  test.skip((await page.viewportSize())!.width < 1088, 'Desktop layout only');

  const featureBox = await page.locator('.recognition-feature').boundingBox();
  const imageBox = await page
    .locator('.recognition-feature > img')
    .boundingBox();

  expect(featureBox).not.toBeNull();
  expect(imageBox).not.toBeNull();
  expect(Math.abs(featureBox!.height - imageBox!.height)).toBeLessThanOrEqual(
    2,
  );
});

test('completes structural motion and removes spatial starts when requested', async ({
  page,
}) => {
  const media = page.locator('[data-project="woku"] .project-media');
  const initialTransform = await media.evaluate(
    (element) => getComputedStyle(element).transform,
  );
  expect(initialTransform).not.toBe('none');

  await media.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await expect(media).toHaveCSS('transform', 'none');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  const reducedMedia = page.locator('[data-project="woku"] .project-media');
  expect(
    Number(
      await reducedMedia.evaluate(
        (element) => getComputedStyle(element).opacity,
      ),
    ),
  ).toBe(1);
  await expect(reducedMedia).toHaveCSS('transform', 'none');
});
