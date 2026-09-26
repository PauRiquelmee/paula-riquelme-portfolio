import type { Metadata } from 'next';
import {
  getProjectExperience,
  profile,
  type CaseStudyProject,
  site,
} from '@/content/portfolio';
import { siteUrl } from '@/lib/paths';

export const getProjectMetadata = (project: CaseStudyProject): Metadata => {
  const projectExperience = getProjectExperience(project);
  const title = `${project.name} case study | ${site.name}`;
  const description = `${project.description}. ${profile.name}'s documented role: ${projectExperience.role}.`;

  return {
    title,
    description,
    alternates: { canonical: project.caseStudyPath },
    openGraph: {
      type: 'article',
      locale: site.locale,
      url: project.caseStudyPath,
      siteName: site.name,
      title,
      description,
      images: [
        {
          url: new URL(site.socialImage.slice(1), siteUrl),
          width: 1200,
          height: 630,
          alt: `${project.name} case study by ${profile.name}.`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [new URL(site.socialImage.slice(1), siteUrl)],
    },
  };
};
