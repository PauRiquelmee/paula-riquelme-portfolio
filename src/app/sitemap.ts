import type { MetadataRoute } from 'next';
import { projects, type CaseStudyProject } from '@/content/portfolio';
import { siteUrl } from '@/lib/paths';

export const dynamic = 'force-static';

const sitemap = (): MetadataRoute.Sitemap => {
  return [
    { path: '', priority: 1 },
    ...projects
      .filter(
        (project): project is CaseStudyProject =>
          project.caseStudyPath !== undefined &&
          project.caseStudy !== undefined,
      )
      .map((project) => ({
        path: project.caseStudyPath.slice(1),
        priority: 0.9,
      })),
    { path: 'about/', priority: 0.8 },
    { path: 'contact/', priority: 0.8 },
    { path: 'privacy/', priority: 0.6 },
  ].map(({ path, priority }) => ({
    url: new URL(path, siteUrl).toString(),
    changeFrequency: 'yearly',
    priority,
  }));
};

export default sitemap;
