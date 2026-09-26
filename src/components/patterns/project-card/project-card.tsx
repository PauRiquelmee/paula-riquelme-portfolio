import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import AnimatedProjectMedia from '@/components/foundations/animated-project-media';
import { getProjectExperience, type Project } from '@/content/portfolio';
import { withBasePath } from '@/lib/paths';

export type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const projectExperience = project.experienceId
    ? getProjectExperience({
        name: project.name,
        experienceId: project.experienceId,
      })
    : null;

  return (
    <article
      className="project-card flex min-w-0 flex-col bg-paper p-4 md:p-[clamp(1.25rem,2.5vw,2.5rem)] data-[project=woku]:bg-paper-bright"
      data-project={project.name.toLowerCase()}
    >
      <div className="project-card-heading grid gap-6 min-[1088px]:min-h-40 min-[1088px]:grid-cols-[0.75fr_1.25fr]">
        <div>
          <h3 className="font-display text-[3.5rem] font-bold leading-[0.82] tracking-[-0.04em] uppercase md:text-[clamp(3.5rem,7vw,7rem)]">
            {project.name}
          </h3>
          {projectExperience ? (
            <p className="project-role mt-3.5 text-xs font-bold tracking-[0.13em] text-accent uppercase">
              {projectExperience.role}
            </p>
          ) : null}
        </div>
        <p className="project-description max-w-[29rem] text-base text-muted">
          {project.description}
        </p>
      </div>
      <AnimatedProjectMedia>
        <Image
          className="h-full w-full object-cover saturate-[0.88] transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]"
          src={withBasePath(project.image)}
          alt={project.imageAlt}
          width={project.imageWidth}
          height={project.imageHeight}
        />
        <figcaption className="absolute right-0 bottom-0 max-w-3/4 bg-ink px-3 py-2 text-xs leading-5 tracking-[0.04em] text-paper-bright">
          {project.imageCaption}
        </figcaption>
      </AnimatedProjectMedia>
      {project.metrics.length > 0 ? (
        <dl
          className={`project-metrics grid grid-rows-[auto_auto] border-y border-line ${
            project.metrics.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
          }`}
        >
          {project.metrics.map((metric) => (
            <div
              className="row-span-2 grid grid-rows-subgrid border-r border-line py-5 pr-2 not-first:pl-2 last:border-r-0 md:pr-4 md:not-first:pl-4"
              key={`${project.name}-${metric.label}`}
            >
              <dt className="min-h-[2.7em] text-xs leading-[1.35] tracking-[0.08em] text-muted uppercase">
                {metric.label}
              </dt>
              <dd className="mt-1 font-display text-[clamp(1.5rem,8vw,1.7rem)] font-bold leading-none uppercase min-[1088px]:text-[clamp(1.7rem,2.3vw,2.5rem)] min-[1088px]:whitespace-nowrap">
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
      <ul className="project-outcomes my-7 grid list-none gap-3 text-sm text-muted">
        {project.highlights.map((highlight) => (
          <li
            className="relative pl-5 before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-1.5 before:bg-accent"
            key={highlight}
          >
            {highlight}
          </li>
        ))}
      </ul>
      {project.caseStudyPath || project.href ? (
        <div className="project-actions mt-auto flex flex-wrap items-center gap-3">
          {project.caseStudyPath ? (
            <a
              className="button"
              href={withBasePath(project.caseStudyPath)}
              aria-label={`View case study: ${project.name}`}
            >
              View case study
            </a>
          ) : null}
          {project.href ? (
            <a
              className="external-action inline-flex min-h-12 items-center gap-2 text-xs font-bold tracking-[0.055em] uppercase hover:text-accent"
              href={project.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Visit website for ${project.name}`}
            >
              Visit website
              <ExternalLink aria-hidden="true" size={17} strokeWidth={1.7} />
            </a>
          ) : null}
        </div>
      ) : null}
    </article>
  );
};

export default ProjectCard;
