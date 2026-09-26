import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { getCaseStudyProject } from '@/content/portfolio';
import CaseStudyPage from '.';

describe('CaseStudyPage', () => {
  it('renders canonical evidence and separates internal from external actions', () => {
    render(<CaseStudyPage project={getCaseStudyProject('woku')} />);

    expect(screen.getByRole('main')).toHaveAccessibleName('Woku');
    expect(screen.getByText('50+')).toBeVisible();
    expect(screen.getByAltText(/Woku website showing/i)).toBeVisible();
    expect(
      screen.getByRole('link', { name: 'Visit Woku website' }),
    ).toHaveAttribute('target', '_blank');
    expect(
      screen.getByRole('link', { name: 'Return to selected work' }),
    ).not.toHaveAttribute('target');
    expect(screen.getByText(/documented contributions/i)).toBeVisible();
  });

  it('matches the desktop metric grid to the available evidence', () => {
    const { container } = render(
      <CaseStudyPage project={getCaseStudyProject('inpla')} />,
    );

    expect(container.querySelector('.case-study-metrics')).toHaveClass(
      'lg:grid-cols-2',
    );
  });

  it('states the project description once in the overview', () => {
    const project = getCaseStudyProject('woku');
    render(<CaseStudyPage project={project} />);

    expect(
      screen.getAllByText((_, element) =>
        Boolean(
          element?.tagName === 'P' &&
          element.textContent?.startsWith(project.description),
        ),
      ),
    ).toHaveLength(1);
  });
});
