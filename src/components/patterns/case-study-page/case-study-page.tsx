import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import {
  getProjectExperience,
  pressFeatures,
  profile,
  type CaseStudyProject,
  site,
} from '@/content/portfolio';
import { siteUrl, withBasePath } from '@/lib/paths';

export type CaseStudyPageProps = {
  project: CaseStudyProject;
};

const sectionClassName =
  'case-study-section grid gap-5 border-t border-ink py-10 md:grid-cols-[minmax(14rem,0.75fr)_minmax(0,1.25fr)] md:gap-x-[clamp(2rem,6vw,7rem)] md:py-[clamp(3rem,6vw,6rem)] [&_h2]:font-display [&_h2]:text-[clamp(1.75rem,3vw,3rem)] [&_h2]:font-bold [&_h2]:leading-none [&_h2]:uppercase [&_h2]:text-balance [&_p]:max-w-[68ch] [&_p]:text-base [&_p]:text-muted [&_p+p]:mt-4 [&_ul]:grid [&_ul]:max-w-[68ch] [&_ul]:list-none [&_ul]:gap-3 [&_li]:border-l [&_li]:border-line [&_li]:pl-4 [&_li]:text-sm [&_li]:leading-6 [&_li]:text-muted';

const CaseStudyPage = ({ project }: CaseStudyPageProps) => {
  const projectExperience = project.experienceId
    ? getProjectExperience({
        name: project.name,
        experienceId: project.experienceId,
      })
    : null;
  const responsibilities =
    project.caseStudy.responsibilities ??
    projectExperience?.responsibilities.map((item) =>
      typeof item === 'string' ? item : item.text,
    ) ??
    [];
  const projectRole = project.role ?? projectExperience?.role;
  const evidence = project.caseStudy.pressFeatureIndexes.map(
    (index) => pressFeatures[index],
  );
  const metricColumnsClassName =
    project.metrics.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3';
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${project.name} case study`,
    description: project.description,
    image: new URL(project.image.slice(1), siteUrl).toString(),
    mainEntityOfPage: new URL(
      project.caseStudyPath.slice(1),
      siteUrl,
    ).toString(),
    author: {
      '@type': 'Person',
      name: profile.name,
      url: site.origin,
    },
    inLanguage: site.language,
  };

  return (
    <div className="case-study-shell min-h-svh bg-paper text-ink">
      <header className="case-study-header sticky top-0 z-40 flex min-h-16 items-center justify-between border-b border-ink bg-[rgb(243_240_232/94%)] px-[var(--page-gutter)] backdrop-blur-[14px] md:min-h-18">
        <a
          className="inline-flex items-center gap-3 font-display text-base font-bold tracking-[0.02em] uppercase no-underline hover:text-accent"
          href={withBasePath('/')}
          aria-label="Paula Riquelme Portfolio home"
        >
          <Image
            src={withBasePath('/brand/pr-monogram.svg')}
            alt=""
            width={32}
            height={32}
          />
          <span>{profile.name}</span>
        </a>
        <a
          className="inline-flex min-h-12 items-center border-l border-line px-4 text-xs font-semibold tracking-[0.055em] uppercase no-underline hover:bg-ink hover:text-paper-bright"
          href={withBasePath('/#work')}
        >
          Selected work
        </a>
      </header>
      <main
        className="mx-auto w-full max-w-[var(--max-width)] px-[var(--page-gutter)] pt-[clamp(3rem,7vw,7rem)] pb-[var(--section-space)]"
        aria-labelledby="case-study-title"
      >
        <header className="case-study-hero grid gap-8 border-t border-ink pt-4 pb-[clamp(3rem,8vw,8rem)] lg:grid-cols-[minmax(0,1.5fr)_minmax(18rem,0.5fr)] lg:items-end">
          <div>
            <h1
              className="max-w-[10ch] font-display text-[clamp(5rem,15vw,13rem)] font-bold leading-[0.76] tracking-[-0.045em] uppercase"
              id="case-study-title"
            >
              {project.name}
            </h1>
          </div>
          <dl className="grid border-t border-ink">
            <div className="grid grid-cols-[5rem_1fr] gap-4 border-b border-line py-3 text-sm">
              <dt className="text-xs font-bold tracking-[0.08em] text-muted uppercase">
                Role
              </dt>
              <dd>{projectRole}</dd>
            </div>
            {projectExperience ? (
              <div className="grid grid-cols-[5rem_1fr] gap-4 border-b border-line py-3 text-sm">
                <dt className="text-xs font-bold tracking-[0.08em] text-muted uppercase">
                  Dates
                </dt>
                <dd>{projectExperience.dates}</dd>
              </div>
            ) : null}
            {projectExperience?.location ? (
              <div className="grid grid-cols-[5rem_1fr] gap-4 border-b border-line py-3 text-sm">
                <dt className="text-xs font-bold tracking-[0.08em] text-muted uppercase">
                  Location
                </dt>
                <dd>{projectExperience.location}</dd>
              </div>
            ) : null}
          </dl>
        </header>
        <section className={sectionClassName} aria-labelledby="overview-title">
          <h2 id="overview-title">Project overview</h2>
          <div>
            <p>{project.description}.</p>
            <p>{project.caseStudy.factualBoundary}</p>
          </div>
        </section>
        <section className={sectionClassName} aria-labelledby="context-title">
          <h2 id="context-title">Context and problem</h2>
          <div>
            {project.caseStudy.context.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
        <section className={sectionClassName} aria-labelledby="role-title">
          <h2 id="role-title">{"Paula's role and responsibilities"}</h2>
          <ul>
            {responsibilities.map((responsibility) => (
              <li key={responsibility}>{responsibility}</li>
            ))}
          </ul>
        </section>
        <section
          className={sectionClassName}
          aria-labelledby="constraints-title"
        >
          <h2 id="constraints-title">Constraints and initial conditions</h2>
          <div>
            {project.caseStudy.constraints.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
        <section className={sectionClassName} aria-labelledby="signal-title">
          <h2 id="signal-title">
            {project.caseStudy.signalTitle ?? 'Customer and market signal'}
          </h2>
          <dl
            className={`case-study-metrics grid gap-px border border-ink bg-ink sm:grid-cols-2 ${metricColumnsClassName}`}
          >
            {project.metrics.map((metric) => (
              <div className="bg-paper p-5" key={metric.label}>
                <dd className="font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-none uppercase">
                  {metric.value}
                </dd>
                <dt className="mt-3 text-xs tracking-[0.08em] text-muted uppercase">
                  {metric.label}
                </dt>
              </div>
            ))}
          </dl>
        </section>
        <section className={sectionClassName} aria-labelledby="decisions-title">
          <h2 id="decisions-title">Product and design decisions</h2>
          <ul>
            {project.caseStudy.decisionResponsibilityIndexes.map((index) => (
              <li key={responsibilities[index]}>{responsibilities[index]}</li>
            ))}
          </ul>
        </section>
        <section className={sectionClassName} aria-labelledby="delivery-title">
          <h2 id="delivery-title">Implementation and delivery</h2>
          <ul>
            {project.caseStudy.deliveryResponsibilityIndexes.map((index) => (
              <li key={responsibilities[index]}>{responsibilities[index]}</li>
            ))}
          </ul>
        </section>
        <section className={sectionClassName} aria-labelledby="outcomes-title">
          <h2 id="outcomes-title">Outcomes and measurable evidence</h2>
          <ul>
            {project.caseStudy.outcomeResponsibilityIndexes.map((index) => (
              <li key={responsibilities[index]}>{responsibilities[index]}</li>
            ))}
          </ul>
        </section>
        <section
          className={`${sectionClassName} case-study-evidence`}
          aria-labelledby="evidence-title"
        >
          <h2 id="evidence-title">Supporting media and external evidence</h2>
          <div className="grid gap-6">
            <figure className="border border-ink bg-accent-dark">
              <Image
                className="aspect-[16/10] w-full object-cover"
                src={withBasePath(project.image)}
                alt={project.imageAlt}
                width={project.imageWidth}
                height={project.imageHeight}
              />
              <figcaption className="bg-ink p-3 text-xs leading-5 tracking-[0.04em] text-paper-bright">
                {project.imageCaption}
              </figcaption>
            </figure>
            <ul className="grid gap-0 border-t border-ink">
              <li>
                <a
                  className="inline-flex min-h-12 items-center gap-2 text-sm font-bold text-ink uppercase hover:text-accent"
                  href={project.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Current {project.name} website
                  <ExternalLink
                    aria-hidden="true"
                    size={16}
                    strokeWidth={1.7}
                  />
                </a>
              </li>
              {evidence.map((feature) => (
                <li key={feature.title}>
                  <a
                    className="inline-flex min-h-12 items-center gap-2 text-sm font-bold text-ink hover:text-accent"
                    href={feature.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {feature.title}
                    <ExternalLink
                      aria-hidden="true"
                      size={16}
                      strokeWidth={1.7}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section
          className={sectionClassName}
          aria-labelledby="reflection-title"
        >
          <h2 id="reflection-title">Reflection and key lesson</h2>
          <div>
            {project.caseStudy.reflection.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
        <nav
          className="case-study-actions mt-[clamp(3rem,7vw,7rem)] grid border-y border-ink sm:flex sm:flex-wrap [&_a]:inline-flex [&_a]:min-h-12 [&_a]:items-center [&_a]:gap-2 [&_a]:border-b [&_a]:border-ink [&_a]:px-4 [&_a]:py-3 [&_a]:text-xs [&_a]:font-bold [&_a]:tracking-[0.055em] [&_a]:uppercase [&_a]:no-underline [&_a]:hover:bg-ink [&_a]:hover:text-white sm:[&_a]:border-r sm:[&_a]:border-b-0 [&_a:first-child]:bg-accent [&_a:first-child]:text-white"
          aria-label={`${project.name} case study actions`}
        >
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Visit ${project.name} website`}
          >
            Visit project website
            <ExternalLink aria-hidden="true" size={17} strokeWidth={1.7} />
          </a>
          <a href={withBasePath('/#work')}>Return to selected work</a>
          <a href={withBasePath('/#contact')}>Contact Paula</a>
        </nav>
      </main>
      <footer className="case-study-footer border-t border-ink bg-ink px-[var(--page-gutter)] py-4 text-paper-bright">
        <p className="mx-auto w-full max-w-[var(--max-width)] text-xs font-bold tracking-[0.13em] uppercase">
          {site.name} · {profile.location}
        </p>
      </footer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />
    </div>
  );
};

export default CaseStudyPage;
