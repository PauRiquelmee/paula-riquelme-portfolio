import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Contact from '.';

describe('Contact', () => {
  it('offers email, professional links, and the English resume', () => {
    render(<Contact />);

    expect(
      screen.getByRole('heading', {
        name: "Have a difficult product problem to solve? Let's talk.",
      }),
    ).toBeVisible();
    expect(
      screen.getByRole('link', { name: 'paula.riq.esco@gmail.com' }),
    ).toHaveAttribute('href', 'mailto:paula.riq.esco@gmail.com');
    expect(
      screen.getByRole('link', { name: /LinkedIn in a new tab/ }),
    ).toHaveAttribute('target', '_blank');
    expect(
      screen.getByRole('link', { name: 'Open Wondeya in a new tab' }),
    ).toHaveAttribute('href', 'https://wondeya.com');
    expect(
      screen.getByRole('link', {
        name: /Download Paula Riquelme's English resume/,
      }),
    ).toHaveAttribute('download');
    expect(
      screen.getByRole('link', {
        name: /GitHub repository: Open the source repository for Paula Riquelme Portfolio/,
      }),
    ).toHaveAttribute(
      'href',
      'https://github.com/PauRiquelmee/pauriquelmee.github.io',
    );
    expect(
      screen.getByRole('link', { name: 'Read about Paula Riquelme' }),
    ).toHaveAttribute('href', '/about/');
    expect(
      screen.getByRole('link', {
        name: 'Contact page: Open Paula Riquelme contact details',
      }),
    ).toHaveAttribute('href', '/contact/');
    expect(
      screen.getByRole('link', { name: 'Read the portfolio privacy notice' }),
    ).toHaveAttribute('href', '/privacy/');
  });
});
