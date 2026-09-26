import Capabilities from '@/components/sections/capabilities';
import Contact from '@/components/sections/contact';
import Experience from '@/components/sections/experience';
import Hero from '@/components/sections/hero';
import RecognitionPress from '@/components/sections/recognition-press';
import SelectedWork from '@/components/sections/selected-work';
import SiteHeader from '@/components/sections/site-header';
import { contactLinks, profile, projects, site } from '@/content/portfolio';
import { siteUrl } from '@/lib/paths';

const personStructuredData = {
  '@type': 'Person',
  '@id': new URL('#paula-riquelme', siteUrl).toString(),
  name: profile.name,
  jobTitle: profile.roles.join(', '),
  description: profile.summary,
  email: `mailto:${site.email}`,
  homeLocation: {
    '@type': 'Place',
    name: profile.location,
  },
  url: siteUrl.toString(),
  sameAs: [
    contactLinks.find((link) => link.label === 'LinkedIn')!.href,
    ...projects.flatMap((project) => (project.href ? [project.href] : [])),
  ],
};

const websiteStructuredData = {
  '@type': 'WebSite',
  '@id': new URL('#website', siteUrl).toString(),
  name: site.name,
  alternateName: site.alternateName,
  description: site.description,
  url: siteUrl.toString(),
  inLanguage: site.language,
  author: { '@id': new URL('#paula-riquelme', siteUrl).toString() },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [websiteStructuredData, personStructuredData],
};

const Home = () => {
  return (
    <>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <div id="top">
        <SiteHeader />
        <main id="content">
          <Hero />
          <SelectedWork />
          <Experience />
          <Capabilities />
          <RecognitionPress />
        </main>
        <Contact />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />
    </>
  );
};

export default Home;
