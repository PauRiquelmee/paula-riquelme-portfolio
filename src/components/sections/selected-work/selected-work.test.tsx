import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SelectedWork from '.';

describe('SelectedWork', () => {
  it('features the four projects in the curated order', () => {
    render(<SelectedWork />);

    expect(
      screen.getByRole('heading', { name: 'Selected work' }),
    ).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Woku' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Wondeya' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Inpla' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Orvita' })).toBeVisible();
    expect(screen.getByText('Co-founder')).toBeVisible();
    expect(screen.getByText('Founder & CEO')).toBeVisible();
    expect(
      screen
        .getAllByRole('heading', { level: 3 })
        .map((heading) => heading.textContent),
    ).toEqual(['Woku', 'Wondeya', 'Inpla', 'Orvita']);
    expect(
      screen.getByRole('link', { name: 'View case study: Woku' }),
    ).toHaveAttribute('href', '/work/woku/');
    expect(
      screen.getByRole('link', { name: 'View case study: Inpla' }),
    ).toHaveAttribute('href', '/work/inpla/');
    expect(
      screen.getByRole('link', { name: 'Visit website for Wondeya' }),
    ).toHaveAttribute('href', 'https://wondeya.com');
    expect(
      screen.queryByRole('link', { name: 'View case study: Wondeya' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: 'Visit website for Orvita' }),
    ).not.toBeInTheDocument();
    expect(screen.getAllByText('Visit website')).toHaveLength(3);
    expect(screen.queryByText(/Live preview/i)).not.toBeInTheDocument();
  });
});
