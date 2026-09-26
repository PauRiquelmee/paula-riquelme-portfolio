import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { projects } from '@/content/portfolio';
import ProjectCard from '.';

describe('ProjectCard', () => {
  it('prioritizes the case study and keeps the project website safe', () => {
    render(<ProjectCard project={projects[0]} />);

    expect(screen.getByRole('heading', { name: 'Woku' })).toBeVisible();
    expect(screen.getByText('CEO & Co-founder / Product Lead')).toBeVisible();
    expect(screen.getByText('50+')).toBeVisible();
    expect(screen.getByAltText(/Woku website showing/i)).toBeVisible();
    expect(
      screen.getByRole('link', { name: 'View case study: Woku' }),
    ).toHaveAttribute('href', '/work/woku/');
    expect(
      screen.getByRole('link', { name: 'Visit website for Woku' }),
    ).toHaveAttribute('rel', 'noreferrer noopener');
    expect(
      screen.getByRole('link', { name: 'Visit website for Woku' }),
    ).toHaveAttribute('target', '_blank');
    expect(screen.queryByText(/Live preview/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders evidence-only work without unavailable actions', () => {
    const orvita = projects.find((project) => project.slug === 'orvita')!;

    render(<ProjectCard project={orvita} />);

    expect(screen.getByRole('heading', { name: 'Orvita' })).toBeVisible();
    expect(screen.getByText('USD 7K')).toBeVisible();
    expect(
      screen.getByAltText(/Orvita digital tourism venture/i),
    ).toHaveAttribute(
      'src',
      expect.stringContaining('%2Fmedia%2Forvita.a.gif'),
    );
    expect(
      screen.queryByRole('link', { name: 'View case study: Orvita' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: 'Visit website for Orvita' }),
    ).not.toBeInTheDocument();
  });
});
