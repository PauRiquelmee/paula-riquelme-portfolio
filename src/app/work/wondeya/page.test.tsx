import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import WondeyaCaseStudyPage, { metadata } from './page';

describe('WondeyaCaseStudyPage', () => {
  it('presents the experimental work and its documented limitations', () => {
    render(<WondeyaCaseStudyPage />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Wondeya' }),
    ).toBeVisible();
    expect(screen.getByText('Co-founder')).toBeVisible();
    expect(screen.queryByText(/^Dates$/)).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Measured evidence' }),
    ).toBeVisible();
    expect(screen.getByText('116')).toBeVisible();
    expect(screen.getByText('124/124')).toBeVisible();
    expect(screen.getByText(/was not promoted to production/i)).toBeVisible();
    expect(
      screen.getByRole('link', { name: 'Visit Wondeya website' }),
    ).toHaveAttribute('href', 'https://wondeya.com');
    expect(metadata.alternates).toEqual({ canonical: '/work/wondeya/' });
    expect(metadata.openGraph).toMatchObject({ url: '/work/wondeya/' });
  });
});
