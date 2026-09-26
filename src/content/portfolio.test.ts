import { describe, expect, it } from 'vitest';
import {
  contactLinks,
  education,
  experience,
  getProjectExperience,
  pressFeatures,
  projects,
  recognition,
  skillGroups,
  trustPages,
} from '@/content/portfolio';

describe('canonical portfolio content', () => {
  it('includes every resume role and education record', () => {
    expect(experience.map((item) => item.company)).toEqual([
      'woku',
      'Inpla',
      'stow SpA',
      'Essbio',
      'Universidad de Concepción',
      'Orvita',
    ]);
    expect(education).toHaveLength(2);
    expect(experience[0].dates).toBe('September 2023 - August 2026');
  });

  it('preserves the selected-work outcomes', () => {
    expect(projects.map((project) => project.slug)).toEqual([
      'woku',
      'wondeya',
      'inpla',
      'orvita',
    ]);
    expect(projects[0].metrics.map((metric) => metric.value)).toEqual([
      '50+',
      '3',
      'USD 70K',
    ]);
    expect(
      getProjectExperience({
        name: projects[2].name,
        experienceId: 'inpla',
      }).responsibilities.join(' '),
    ).toContain('Puerto Coronel');
    expect(projects[2]).toMatchObject({
      slug: 'inpla',
      caseStudyPath: '/work/inpla/',
      href: 'https://inpla.ai/en/',
      image: '/media/inpla-website.webp',
    });
    expect(projects.every((project) => 'previewStatus' in project)).toBe(false);
    expect(projects.every((project) => 'previewMessage' in project)).toBe(
      false,
    );
    expect(projects.find((project) => project.slug === 'orvita')).toMatchObject(
      {
        image: '/media/orvita.a.gif',
        role: 'Founder & CEO',
        metrics: [
          { value: 'USD 7K', label: 'non-dilutive ICHIO funding' },
          { value: 'OPTIMA 2017', label: 'Best Undergraduate Paper' },
        ],
      },
    );
    expect(
      projects.find((project) => project.slug === 'wondeya'),
    ).toMatchObject({
      caseStudyPath: '/work/wondeya/',
      role: 'Co-founder',
      metrics: [
        { value: '116', label: 'local responses measured' },
        { value: '124/124', label: 'complete traces verified' },
      ],
    });
  });

  it('contains all skill groups and five El Mercurio Innovation features', () => {
    expect(skillGroups.map((group) => group.name)).toEqual([
      'Product',
      'Design',
      'Development',
    ]);
    expect(pressFeatures).toHaveLength(5);
  });

  it('provides safe public links and an English resume', () => {
    expect(contactLinks.every((link) => link.href.length > 0)).toBe(true);
    expect(
      contactLinks.find((link) => link.label === 'English resume')?.href,
    ).toContain('paula-riquelme-resume-en.pdf');
    expect(contactLinks.find((link) => link.label === 'Inpla')?.href).toBe(
      'https://inpla.ai/en/',
    );
    expect(contactLinks.find((link) => link.label === 'llms.txt')?.href).toBe(
      '/llms.txt',
    );
    expect(
      contactLinks.find((link) => link.label === 'GitHub repository'),
    ).toMatchObject({
      href: 'https://github.com/PauRiquelmee/pauriquelmee.github.io',
      external: true,
      ariaLabel:
        'GitHub repository: Open the source repository for Paula Riquelme Portfolio in a new tab',
    });
    expect(recognition.title).toBe('Best Undergraduate Paper | OPTIMA 2017');
  });

  it('provides substantial English content for every trust page', () => {
    expect(Object.keys(trustPages)).toEqual(['about', 'contact', 'privacy']);

    for (const page of Object.values(trustPages)) {
      const visibleText = [
        page.title,
        page.introduction,
        ...page.sections.flatMap((section) => [
          section.heading,
          ...section.paragraphs,
        ]),
      ].join(' ');

      expect(visibleText.length).toBeGreaterThanOrEqual(500);
    }
  });
});
