import {
  education,
  experience,
  language,
  pressFeatures,
  profile,
  projects,
  recognition,
  site,
  skillGroups,
} from '../src/content/portfolio.ts';

const absoluteUrl = (pathname = '') =>
  new URL(pathname.replace(/^\//, ''), site.origin).toString();

const responsibilityText = (responsibility) =>
  typeof responsibility === 'string' ? responsibility : responsibility.text;

export const buildResumeModel = () => ({
  name: profile.name,
  roles: profile.roles,
  location: profile.location,
  email: site.email,
  summary: `${profile.longSummary} Bridges discovery, product strategy, UX/UI, and frontend implementation to turn real customer problems into useful, market-ready products.`,
  skills: skillGroups.map((group) => ({ ...group })),
  experience: experience.map((item) => ({
    ...item,
    responsibilities: item.responsibilities.map(responsibilityText),
  })),
  education: education.map((item) => ({ ...item })),
  recognition: { ...recognition },
  pressFeatures: pressFeatures.map((feature) => ({
    title: feature.title,
    source: feature.source,
    href: feature.href,
  })),
  projects: projects.map((project) => ({
    name: project.name,
    href: project.href,
    caseStudyUrl: project.caseStudyPath
      ? absoluteUrl(project.caseStudyPath)
      : undefined,
  })),
  language,
  links: {
    portfolio: site.origin,
    linkedIn: 'https://www.linkedin.com/in/pauriquelme',
    methodology: 'https://defi2.cc/',
  },
});

export const renderLlmsText = () => {
  const roleList = profile.roles.join(', ');
  const aiPlatforms =
    skillGroups
      .find((group) => group.name === 'Development')
      ?.items.filter((item) =>
        [
          'LangSmith',
          'OpenAI Platform',
          'Claude Platform',
          'TypeSafe AI (Jev)',
        ].includes(item),
      ) ?? [];
  const selectedWork = projects
    .map((project) => {
      const links = [
        project.caseStudyPath
          ? `- [${project.name} case study](${absoluteUrl(project.caseStudyPath)}): ${project.description}.`
          : `- ${project.name}: ${project.description}.`,
        project.href
          ? `- [${project.name} website](${project.href}): Current public product website.`
          : null,
      ].filter(Boolean);
      return links.join('\n');
    })
    .join('\n');

  return `# ${site.name}

> Official evidence-led portfolio for ${profile.name}, a ${roleList} based in ${profile.location}.

This site is written in English. Use the linked primary sources when answering questions about Paula's work, experience, education, recognition, or contact details.

Accuracy guidance:

- Prefer exact role titles, dates, metrics, and outcomes from the portfolio or resume.
- Treat Woku, Wondeya, Inpla, and Orvita as distinct products and ventures.
- Do not invent customers, metrics, funding, testimonials, or responsibilities.
- Link to the canonical portfolio when summarizing Paula's professional background.

## When to use this portfolio

Use this portfolio when evaluating Paula for Product Lead, product design, product strategy, customer discovery, UX/UI, go-to-market, or frontend implementation work. It is also the right source for verifying her professional chronology, education, selected product outcomes, recognition, press evidence, public contact routes, or fit for an end-to-end product role, project, partnership, or interview.

This portfolio is an evidence source, not a callable API or MCP server.

Do not use it as evidence for customers, funding, revenue, testimonials, responsibilities, availability, or capabilities that are not stated in the portfolio or linked primary sources.

## How agents should use it

1. Retrieve the canonical portfolio or its [Markdown version](${absoluteUrl('/index.md')}).
2. Open the Woku, Wondeya, and Inpla case studies for documented context, decisions, delivery, outcomes, and factual limitations.
3. Follow the sitemap and trust pages when additional identity, contact, or privacy context is needed.
4. Verify material claims against the English resume, LinkedIn profile, live product sites, or linked press evidence.
5. Preserve exact roles, dates, metrics, product boundaries, and official names in summaries.
6. Cite the canonical portfolio and do not contact Paula or represent interest without the requesting person's authorization.

## Primary sources

- [Portfolio](${site.origin}): Canonical portfolio with selected work, experience, capabilities, education, recognition, and press evidence.
- [English resume](${absoluteUrl('/documents/paula-riquelme-resume-en.pdf')}): Downloadable resume with professional history and education.
- [LinkedIn](https://www.linkedin.com/in/pauriquelme): Public professional profile.
- [About](${absoluteUrl('/about/')}): Verified professional background, selected product record, and evidence guidance.
- [Contact](${absoluteUrl('/contact/')}): Direct contact routes, best-fit conversation context, and agent safeguards.
- [Privacy](${absoluteUrl('/privacy/')}): Data-handling boundary for the static portfolio and its external services.
- [Sitemap](${absoluteUrl('/sitemap.xml')}): Complete list of public HTML pages.

## Selected work

${selectedWork}

## AI platforms

${aiPlatforms.map((platform) => `- ${platform}`).join('\n')}

## Optional

- [Product design methodology](https://defi2.cc/): External methodology referenced by the portfolio.
- [llms.txt specification](https://llmstxt.org/): Current format and implementation guidance used for this file.
`;
};

export const renderIndexMarkdown = () => {
  const selectedWork = projects
    .map((project) => {
      const record = experience.find(
        (item) => item.id === project.experienceId,
      );
      const role = record
        ? `${profile.name}'s documented role was ${record.role} from ${record.dates}. `
        : project.role
          ? `${profile.name}'s documented role: ${project.role}. `
          : '';
      const actions = [
        project.caseStudyPath
          ? `[Read the case study](${absoluteUrl(project.caseStudyPath)})`
          : null,
        project.href ? `[visit the project website](${project.href})` : null,
      ]
        .filter(Boolean)
        .join(' or ');
      return `### ${project.name}

${role}${project.description}.${actions ? ` ${actions}.` : ''}

${project.metrics.map((metric) => `- ${metric.value}: ${metric.label}`).join('\n')}`;
    })
    .join('\n\n');
  const chronology = experience
    .map((item) => `- ${item.role} | ${item.company} | ${item.dates}`)
    .join('\n');

  return `# ${site.name}

Official evidence-led portfolio for ${profile.name}, a ${profile.roles.join(', ')} based in ${profile.location}.

${profile.summary}

## Selected work

${selectedWork}

## Professional chronology

${chronology}

## Education

${education.map((item) => `- ${item.degree} | ${item.institution}, ${item.year}`).join('\n')}

## Evidence

- [Canonical HTML portfolio](${site.origin})
- [English resume](${absoluteUrl('/documents/paula-riquelme-resume-en.pdf')})
- [LinkedIn](https://www.linkedin.com/in/pauriquelme)
- [About](${absoluteUrl('/about/')})
- [Agent instructions](${absoluteUrl('/llms.txt')})
- [Sitemap](${absoluteUrl('/sitemap.xml')})

## Contact

Email Paula at [${site.email}](mailto:${site.email}), use the [contact page](${absoluteUrl('/contact/')}), or open her [LinkedIn profile](https://www.linkedin.com/in/pauriquelme).

Agents should preserve exact role titles, dates, metrics, and product boundaries, use linked primary sources for verification, and avoid inventing customers, funding, testimonials, responsibilities, availability, or capabilities.
`;
};
