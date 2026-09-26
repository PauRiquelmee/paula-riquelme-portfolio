import { readFile } from 'node:fs/promises';
import { PDFDocument } from 'pdf-lib';
import { describe, expect, it } from 'vitest';
import {
  experience,
  profile,
  projects,
  site,
} from '../src/content/portfolio.ts';
import {
  buildResumeModel,
  renderIndexMarkdown,
  renderLlmsText,
} from './content-output.mjs';

describe('generated portfolio content', () => {
  it('derives agent-readable files from canonical facts', async () => {
    const llms = renderLlmsText();
    const markdown = renderIndexMarkdown();

    expect(llms).toContain(`# ${site.name}`);
    expect(llms).toContain(profile.roles.join(', '));
    expect(llms).toContain(`${site.origin}work/woku/`);
    expect(markdown).toContain(experience[0].dates);
    expect(markdown).toContain(projects[2].caseStudyPath);
    expect(markdown).toContain('### Wondeya');
    expect(markdown).toContain('### Orvita');
    expect(markdown).toContain(projects[1].caseStudyPath);
    expect(markdown).not.toContain('work/orvita');
    expect(llms).not.toContain('September 2023 - Present');
    expect(markdown).not.toContain('September 2023 - Present');

    expect(await readFile('public/llms.txt', 'utf8')).toBe(llms);
    expect(await readFile('public/index.md', 'utf8')).toBe(markdown);
  });

  it('builds the resume model from the same typed chronology', () => {
    const resume = buildResumeModel();

    expect(resume.name).toBe(profile.name);
    expect(resume.roles).toEqual(profile.roles);
    expect(resume.location).toBe(profile.location);
    expect(resume.experience[0]).toMatchObject({
      company: 'woku',
      dates: 'September 2023 - August 2026',
    });
    expect(resume.projects.map((project) => project.href)).toEqual(
      projects.map((project) => project.href),
    );
  });

  it('publishes the English resume as a single-page PDF', async () => {
    const pdf = await PDFDocument.load(
      new Uint8Array(
        await readFile('public/documents/paula-riquelme-resume-en.pdf'),
      ),
    );

    expect(pdf.getPageCount()).toBe(1);
  });

  it('keeps the English resume in a single-column reading order', async () => {
    const assetGenerator = await readFile(
      'scripts/generate-assets.mjs',
      'utf8',
    );

    expect(assetGenerator).not.toContain('Additional experience');
  });
});
