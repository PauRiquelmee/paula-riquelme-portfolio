# Architecture

## Project constraints

This repository produces an English-only portfolio for Paula Riquelme. The primary experience lives at `/`, with selected work spanning Woku, Wondeya, Inpla, and Orvita; Woku and Inpla have dedicated case studies, while About, Contact, and Privacy provide focused trust pages. The site must export to static files, run at the root of Paula's GitHub Pages user site, avoid server-only features, minimize browser JavaScript, and preserve the canonical professional facts in `src/content`.

The implementation uses strict TypeScript, Tailwind CSS, Base UI, Motion for React, Vitest, React Testing Library, user-event, jest-dom, and Playwright. It does not use another foundational component library, animation library, backend, API route, database, or multilingual routing.

## Architectural decisions

- Use the Next.js App Router because the brief requires it and its Server Components can render static HTML at build time.
- Use `output: "export"`, `trailingSlash: true`, and unoptimized Next images so `next build` emits the deployable `out` directory.
- Keep route and section content server-rendered by default. Mark only Motion providers, motion primitives, and mobile navigation as client components.
- Store canonical content as typed plain data. Components render this data but do not own resume facts.
- Use Base UI for buttons and dialogs. Semantic content and ordinary anchor navigation stay native HTML.
- Wrap each reusable component in its own folder with a colocated test and a default export from `index.ts`.
- Use a small number of compositions instead of broad abstraction layers. This keeps a one-page portfolio maintainable without hiding the design.

## Folder structure

```text
src/
  app/                    Next.js route, metadata routes, layout, and global styles
  components/
    foundations/          Base UI wrappers and low-level visual primitives
    patterns/             Reusable compositions such as project and press cards
    sections/             Page-level Hero, Work, Experience, Skills, Recognition, Contact
  content/                Typed canonical resume and portfolio content
  lib/                    URL, asset-path, and metadata helpers
  styles/                 Shared non-route style utilities when needed
  test/                   Global test setup and test-only helpers
docs/                     Architecture and implementation evidence
public/                   Static identity, resume, and optimized media assets
scripts/                  Architecture and documentation validators
tests/e2e/                Playwright flows
```

## Component categories

`foundations` own meaningful project-specific Base UI wrappers and preserve prop forwarding, refs, state attributes, keyboard behavior, and accessibility. Self-contained interaction patterns may import Base UI directly when an additional wrapper would add no semantic, accessibility, behavioral, or styling value. Sections and routes may not import Base UI directly.

`patterns` combine foundations and semantic HTML into reusable units such as project cards, case study records, experience entries, and press links.

`sections` compose patterns and content for one major page region. A section may not import another section.

Route files compose sections and global providers. Content and library modules never import React components.

## Dependency direction

```text
app -> sections -> patterns -> foundations -> Base UI
                 -> content
                 -> lib

lib -> content
content -> typed data only
```

Imports must enter component folders through `index.ts`. Broad component barrels are prohibited. This keeps boundaries explicit and prevents circular dependencies.

Each production TSX file contains exactly one named React component. Idiomatic JSX inside array callbacks and conditional expressions belongs to that component and is allowed. Named secondary components remain separate files, while non-visual helpers belong in regular TS modules.

## Base UI strategy

Base UI is installed as `@base-ui/react`. The foundation Button owns actionable button behavior, while the self-contained mobile navigation pattern imports Dialog directly because a second wrapper would add no project-specific value. Wrappers accept the underlying Base UI types and preserve supported props, refs, state attributes, and accessible behavior. Dialog composition uses Base UI's `render` API for its native button controls and semantic navigation links. Focus trapping, Escape handling, and focus restoration remain Base UI responsibilities.

Native anchors remain appropriate for static in-page and external navigation. Static headings, articles, lists, and grids do not receive unnecessary interactive wrappers.

## Motion strategy

A small client-side provider wraps the page in `LazyMotion` and `<MotionConfig reducedMotion="user">`. Motion components use `m` from `motion/react`. The hero rule receives one restrained entrance sequence, project media receives reveal feedback, and mobile navigation uses a short transform and opacity transition. `AnimatePresence` is reserved for real exit transitions.

Content remains visible in server-rendered HTML. Motion does not gate meaningful content before hydration. Reduced-motion tests verify that large transforms are removed or replaced with opacity-only feedback.

## Static export strategy

`next.config.ts` enables `output: "export"`, `trailingSlash: true`, and `images.unoptimized: true`. The build emits `out`. A post-build script places `.nojekyll` in `out`.

No component uses cookies, headers, draft mode, server actions, rewrites, redirects, or runtime route handlers. Metadata routes must be statically generated or represented by public files when static export constraints require it. The export includes a custom `404.html`; GitHub Pages serves it with a real 404 status for unknown paths.

## GitHub Pages root hosting

The repository is named `pauriquelmee.github.io`, so production is served directly from `/` without `basePath` or `assetPrefix`. `src/lib/paths.ts` provides one tested helper that normalizes public asset URLs to root-relative paths.

The canonical production origin is `https://pauriquelmee.github.io/`. Metadata, sitemap, robots, manifest, JSON-LD, resume links, screenshots, icons, and social cards use the user-site root.

## Content architecture

All professional facts live in `src/content/portfolio.ts` with explicit TypeScript types. Experience, education, skills, metrics, case study framing, recognition, press, contact links, and trust-page content are separate exported records. Server components, metadata, JSON-LD, route helpers, social assets, the PDF resume, `llms.txt`, and `index.md` derive from that source. Deterministic generation tests detect factual drift, including the exact Woku date.

## Styling strategy

Tailwind CSS 4 owns component layout and presentation through utilities placed in the relevant production TSX files. `globals.css` defines Tailwind theme tokens, the paper and ink document defaults, reset behavior, focus and selection, shared section and button contracts, mobile-dialog selectors, and complex reduced-motion selectors. Component-specific project, case study, experience, capability, recognition, press, contact, trust-page, and hero layouts do not live in a monolithic global stylesheet.

Informative metadata, captions, navigation, and actions remain at least 12 pixels. Supporting copy remains at least 14 pixels and body copy defaults to 16 pixels. The Playwright matrix verifies reflow and horizontal overflow at 1440 x 1000, 768 x 1024, 390 x 844, and 320 x 844.

The site does not invent testimonials, customer names, awards, dates, metrics, roles, funding sources, or capabilities. Press imagery and links are mapped explicitly to the supplied local files.

## Testing strategy

The component workflow is test-first: add a behavior test, run it and confirm the expected failure, implement the minimum behavior, run the relevant test, then refactor while green.

Vitest and React Testing Library cover semantic roles, names, project and external links, disabled controls, focus behavior, mobile navigation, Escape closing, focus restoration, case study structure, canonical generation, resume downloads, reduced motion, base paths, and English metadata. Coverage thresholds are 90 percent statements, lines, and functions, plus 85 percent branches for the component layer.

Playwright runs against the static export served at the production root. It covers navigation, mobile menu, case study routes and metadata, external links, resume download, LinkedIn, press links, content, static assets, minimum informative text sizes, and responsive overflow.

The custom architecture validator parses production TSX and folder structure. The single `Quality gate` CI job runs architecture and agent-document validation, formatting, lint, typecheck, coverage, one build, Playwright, and Lighthouse. Deployment depends on that job and cannot run independently after a failed check.

## Accessibility strategy

- Semantic landmarks and ordered heading levels.
- Skip link and visible `:focus-visible` treatments.
- Base UI focus trapping and restoration for mobile navigation.
- Descriptive accessible names for case study, project website, and external press links.
- `aria-current` only where state is real.
- Mobile touch targets of at least 44 pixels.
- WCAG AA foreground and surface contrast.
- Meaningful alt text for factual images and empty alt text only for purely decorative assets.
- Reduced-motion support at both Motion configuration and component-decision levels.
- No hover-only content or interaction.

## SEO strategy

Static metadata defines the exact English title and description, a production `metadataBase`, canonical URLs, Open Graph data, Twitter card data, robots directives, keywords, icons, and theme color. Static robots, sitemap, and manifest files use root-relative paths. A JSON-LD graph identifies both the named portfolio website and Paula as a Person, while the Person record uses LinkedIn, Woku, and Inpla for `sameAs`.

No alternate locale, `hreflang`, Spanish metadata, or localized route is generated.

## Asset generation strategy

Identity assets are deterministic. Source SVG files define the PR monogram, the white-P-on-indigo favicon, and the social card. Sharp rasterizes and optimizes favicon sizes, PWA icons, Apple touch icon, Open Graph image, Twitter image, and supplied Woku, Inpla, press, and recognition media. The favicon combines 16, 32, and 48 pixel images.

The static export also publishes `llms.txt` at the project root. It follows the current llms.txt Markdown structure, tells agents when and how to use the portfolio, links to canonical evidence, and is discoverable through both the footer and a `rel="describedby"` document link.

`index.md` provides a canonical Markdown representation advertised through `rel="alternate"`. `404.md` provides a concise recovery guide linked from the custom 404 page. GitHub Pages cannot vary the root response by the HTTP `Accept` header or add `Vary: Accept`, so full Accept Markdown content negotiation requires a different host or an edge proxy. The portfolio also has no callable product API, and the static host cannot provide a live Streamable HTTP MCP handshake. The project does not publish a static file that could be mistaken for either runtime protocol.

The English resume PDF is generated from canonical content using a deterministic PDF library and visually inspected before release. Source assets stay under `assets/source` when useful, while browser-ready output lives in `public`.

## Trade-offs

- Base UI and Motion add client code, but only button, navigation, and motion islands import them.
- Static export removes server-dependent features, which fits a portfolio and makes hosting simple.
- Next image optimization is disabled for GitHub Pages, so assets must be pre-optimized at build time.
- One-component-per-file increases file count but makes the requested boundaries mechanically enforceable.
- Local fonts would make builds fully offline, while `next/font` can offer optimized font loading. The implementation will prefer deterministic self-hosted font packages if they meet the visual direction.

## Rejected alternatives

- Vercel deployment: rejected because the requested production target is GitHub Pages.
- Pages Router: rejected because the brief requires App Router.
- A client-rendered single page application: rejected because static Server Components provide better initial HTML and less JavaScript.
- Radix UI, shadcn/ui, Headless UI, Material UI, and Chakra UI: rejected because Base UI is the required foundation.
- CSS animation libraries or custom entrance keyframes: rejected because Motion is the required animation system.
- MDX or a content management system: rejected because one canonical typed content module is simpler and more enforceable.
- Runtime product preview probing: rejected because cross-origin frame policies cannot be inspected reliably from a static browser client. Dedicated factual case studies and explicit website links are more honest than presenting a screenshot as a live product.
