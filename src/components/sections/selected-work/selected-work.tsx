import ProjectCard from '@/components/patterns/project-card';
import { projects } from '@/content/portfolio';

const SelectedWork = () => {
  return (
    <section
      id="work"
      className="section selected-work"
      aria-labelledby="work-title"
    >
      <div className="section-heading section-heading-row">
        <h2 id="work-title">Selected work</h2>
        <p>
          Four ventures across customer feedback, conversational web
          experiences, company data, and tourism.
        </p>
      </div>
      <div className="project-grid grid gap-px border border-ink bg-ink md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
};

export default SelectedWork;
