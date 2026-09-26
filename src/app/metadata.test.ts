import { describe, expect, it } from 'vitest';
import manifest from './manifest';
import robots from './robots';
import sitemap from './sitemap';
import { metadata, viewport } from './layout';
import { profile, site } from '@/content/portfolio';
import { siteUrl } from '@/lib/paths';

describe('portfolio metadata', () => {
  it('uses English canonical, Open Graph, and Twitter metadata', () => {
    expect(metadata.title).toBe(site.title);
    expect(metadata.description).toBe(site.description);
    expect(metadata.metadataBase).toEqual(siteUrl);
    expect(metadata.alternates).toEqual({ canonical: '/' });
    expect(metadata.openGraph).toMatchObject({
      locale: 'en_US',
      type: 'website',
      url: '/',
    });
    expect(metadata.twitter).toMatchObject({ card: 'summary_large_image' });
    expect(metadata.robots).toMatchObject({ index: true, follow: true });
    expect(metadata.applicationName).toBe(site.name);
    expect(metadata.authors).toEqual([{ name: profile.name, url: siteUrl }]);
    expect(viewport).toMatchObject({ themeColor: site.themeColor });
    expect(metadata.icons).not.toEqual(
      expect.objectContaining({
        icon: expect.arrayContaining([
          expect.objectContaining({
            url: expect.objectContaining({ pathname: '/favicon.ico' }),
          }),
        ]),
      }),
    );
  });

  it('publishes a production-aware manifest, robots policy, and sitemap', () => {
    expect(manifest().lang).toBe('en');
    expect(manifest().start_url).toBe('/');
    expect(robots().sitemap).toBe('https://pauriquelmee.github.io/sitemap.xml');
    expect(sitemap().map((entry) => entry.url)).toEqual([
      'https://pauriquelmee.github.io/',
      'https://pauriquelmee.github.io/work/woku/',
      'https://pauriquelmee.github.io/work/wondeya/',
      'https://pauriquelmee.github.io/work/inpla/',
      'https://pauriquelmee.github.io/about/',
      'https://pauriquelmee.github.io/contact/',
      'https://pauriquelmee.github.io/privacy/',
    ]);
  });
});
