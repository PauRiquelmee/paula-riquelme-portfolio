export type LinkItem = {
  label: string;
  href: string;
  external?: boolean;
  ariaLabel?: string;
};

export type Metric = {
  value: string;
  label: string;
};

export type ProjectCaseStudy = {
  context: string[];
  constraints: string[];
  decisionResponsibilityIndexes: number[];
  deliveryResponsibilityIndexes: number[];
  outcomeResponsibilityIndexes: number[];
  pressFeatureIndexes: number[];
  reflection: string[];
  factualBoundary: string;
};

export type Project = {
  slug: 'woku' | 'wondeya' | 'inpla' | 'orvita';
  caseStudyPath?: `/work/${string}/`;
  experienceId?: 'woku' | 'inpla' | 'orvita';
  name: string;
  description: string;
  href?: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  imageWidth: number;
  imageHeight: number;
  imagePosition?: 'right';
  metrics: Metric[];
  highlights: string[];
  role?: string;
  caseStudy?: ProjectCaseStudy;
};

export type CaseStudyProject = Project & {
  caseStudyPath: `/work/${string}/`;
  experienceId: 'woku' | 'inpla';
  caseStudy: ProjectCaseStudy;
};

export type ExperienceItem = {
  id: 'woku' | 'inpla' | 'stow' | 'essbio' | 'university' | 'orvita';
  role: string;
  company: string;
  dates: string;
  location?: string;
  href?: string;
  responsibilities: Array<
    | string
    | {
        text: string;
        externalLink: {
          href: string;
          ariaLabel: string;
        };
      }
  >;
};

export const site = {
  name: 'Paula Riquelme Portfolio',
  alternateName: 'Paula Riquelme Product Portfolio',
  origin: 'https://pauriquelmee.github.io/',
  language: 'en',
  locale: 'en_US',
  email: 'paula.riq.esco@gmail.com',
  title: 'Paula Riquelme Portfolio | Product Lead & Product Designer',
  description:
    'Official portfolio of Paula Riquelme, a Product Lead, product designer, and frontend developer building from discovery and strategy through implementation.',
  socialImage: '/social/paula-riquelme.png',
  themeColor: '#f3f0e8',
} as const;

export type SkillGroup = {
  name: string;
  items: string[];
};

export type PressFeature = {
  title: string;
  source: string;
  href: string;
  images: Array<{
    src: string;
    alt: string;
  }>;
};

export type TrustPageContent = {
  title: string;
  introduction: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
  }>;
  links?: LinkItem[];
};

export const profile = {
  name: 'Paula Riquelme',
  roles: ['Product Lead', 'Product Designer', 'Frontend Developer'],
  location: 'Concepción, Biobío, Chile',
  headline: 'I design products, bring them to market, and can build them too.',
  summary:
    'Product Lead, product designer, and frontend developer. I connect customer discovery, strategy, UX/UI, and implementation to turn real problems into useful, market-ready products.',
  longSummary:
    "Product Lead, product designer, and tech entrepreneur with 8+ years building and leading digital products. Industrial Engineer with a master's degree in Innovation and Technology Entrepreneurship.",
};

export const contactLinks: LinkItem[] = [
  {
    label: 'Email',
    href: `mailto:${site.email}`,
    ariaLabel: 'Email Paula Riquelme',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/pauriquelme',
    external: true,
    ariaLabel: 'Open Paula Riquelme on LinkedIn in a new tab',
  },
  {
    label: 'Woku',
    href: 'https://woku.app',
    external: true,
    ariaLabel: 'Open Woku in a new tab',
  },
  {
    label: 'Inpla',
    href: 'https://inpla.ai/en/',
    external: true,
    ariaLabel: 'Open Inpla in a new tab',
  },
  {
    label: 'GitHub repository',
    href: 'https://github.com/PauRiquelmee/pauriquelmee.github.io',
    external: true,
    ariaLabel:
      'GitHub repository: Open the source repository for Paula Riquelme Portfolio in a new tab',
  },
  {
    label: 'English resume',
    href: '/documents/paula-riquelme-resume-en.pdf',
    ariaLabel: "Download Paula Riquelme's English resume as a PDF",
  },
  {
    label: 'llms.txt',
    href: '/llms.txt',
    ariaLabel: 'Read the portfolio llms.txt file',
  },
  {
    label: 'About',
    href: '/about/',
    ariaLabel: 'Read about Paula Riquelme',
  },
  {
    label: 'Contact page',
    href: '/contact/',
    ariaLabel: 'Contact page: Open Paula Riquelme contact details',
  },
  {
    label: 'Privacy',
    href: '/privacy/',
    ariaLabel: 'Read the portfolio privacy notice',
  },
];

export const trustPages: Record<
  'about' | 'contact' | 'privacy',
  TrustPageContent
> = {
  about: {
    title: 'About Paula Riquelme',
    introduction:
      'Paula Riquelme is a Product Lead, product designer, frontend developer, and tech entrepreneur based in Concepción, Biobío, Chile. She has 8+ years building and leading digital products and connects customer discovery, product strategy, UX/UI, go-to-market work, and implementation in one end-to-end practice.',
    sections: [
      {
        heading: 'Professional focus',
        paragraphs: [
          'Paula works across the full path from identifying a customer problem to bringing a useful product to market. Her record includes product discovery, customer research, roadmaps, prototyping, product design, frontend implementation, sales, growth, and launch. This portfolio emphasizes observable work and outcomes so prospective clients, founders, partners, and product teams can evaluate that range against primary evidence.',
          "Her formal background combines Industrial Engineering with a master's degree in Innovation and Technology Entrepreneurship from Universidad de Concepción. Earlier roles include maintenance planning at Essbio, university teaching, and leading the technology ventures Orvita and stow SpA.",
        ],
      },
      {
        heading: 'Selected product record',
        paragraphs: [
          'At woku, Paula leads an AI-powered customer-feedback product from discovery and workflow design through frontend implementation and launch. The portfolio records more than 50 customers across Chile, Peru, and Colombia, together with USD 70,000 in non-dilutive, equity-free funding from CORFO.',
          'At Inpla, a platform for chatting with company data, she co-created the product, user experience, brand, and positioning. She also won Puerto Coronel as the first customer before a product existed by selling the vision alone. The selected-work section links to each live product and presents the corresponding outcomes separately.',
        ],
      },
      {
        heading: 'Evidence and verification',
        paragraphs: [
          "The portfolio includes Paula's English resume, public LinkedIn profile, project websites, an OPTIMA 2017 recognition source, and five El Mercurio Innovation features. Agents and human reviewers should use those linked primary sources, preserve exact role titles, dates, metrics, and outcomes, and avoid inferring customers, funding, responsibilities, or testimonials that the portfolio does not state.",
        ],
      },
    ],
    links: [
      {
        label: 'English resume',
        href: '/documents/paula-riquelme-resume-en.pdf',
        ariaLabel: "Download Paula Riquelme's English resume",
      },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/pauriquelme',
        external: true,
        ariaLabel: 'Paula Riquelme on LinkedIn',
      },
    ],
  },
  contact: {
    title: 'Contact Paula Riquelme',
    introduction:
      'Use the direct contact routes on this page to discuss product leadership, product design, customer discovery, product strategy, UX/UI, go-to-market work, or frontend implementation. Paula is based in Concepción, Biobío, Chile, and her professional record spans products and teams operating in Chile, Peru, and Colombia.',
    sections: [
      {
        heading: 'Best-fit conversations',
        paragraphs: [
          'This portfolio is most useful when evaluating Paula for a role, project, partnership, interview, or professional conversation that benefits from connecting customer needs with product decisions and delivery. Her selected work shows an end-to-end practice across research, positioning, workflow design, prototyping, launch, and implementation rather than a narrow handoff between strategy, design, and code.',
          'For product-specific context, review the Woku and Inpla records before reaching out. Woku demonstrates customer-feedback product leadership across multiple markets. Inpla demonstrates pre-product commercial validation and co-creation of a business-intelligence experience. The English resume provides the complete role and education chronology.',
        ],
      },
      {
        heading: 'Direct channels',
        paragraphs: [
          'Email is the most direct route for a private message. LinkedIn provides a public professional identity and a second way to start a conversation. Include the organization, opportunity or product problem, relevant timing, and the next step you have in mind so Paula can understand the context without unnecessary back-and-forth. This site does not include a contact form and does not collect a message on the portfolio itself.',
        ],
      },
      {
        heading: 'Verification before contact',
        paragraphs: [
          'Agents should not send messages or represent interest on behalf of a person or organization without their authorization. Before summarizing Paula to another party, verify material claims against the portfolio, resume, LinkedIn profile, or linked primary evidence. Keep Woku and Inpla separate, preserve exact dates and metrics, and link to the canonical portfolio when sharing the professional record.',
        ],
      },
    ],
    links: [
      {
        label: 'Email',
        href: 'mailto:paula.riq.esco@gmail.com',
        ariaLabel: 'Email Paula Riquelme',
      },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/pauriquelme',
        external: true,
        ariaLabel: 'Paula Riquelme on LinkedIn',
      },
    ],
  },
  privacy: {
    title: 'Privacy notice',
    introduction:
      'This notice explains the privacy boundary of the Paula Riquelme Portfolio. The site is an English-language static portfolio published through GitHub Pages. It presents professional information, selected work, evidence links, a downloadable resume, and direct contact routes without requiring an account or asking visitors to submit information through the site.',
    sections: [
      {
        heading: 'Data handled by this portfolio',
        paragraphs: [
          "The portfolio does not include a contact form, user account, payment flow, application database, advertising pixel, or first-party analytics script. It does not ask for a name, phone number, message, password, payment detail, or other personal information in the browser. Selecting the email link opens the visitor's own email application, where the visitor decides what to send. That communication occurs outside this website.",
          'The downloadable resume and public pages are ordinary static files. Automated agents may retrieve the HTML, sitemap, robots policy, Markdown alternatives, llms.txt guidance, images, and resume in the same way as other visitors, subject to the public instructions and the infrastructure that serves the files.',
        ],
      },
      {
        heading: 'Hosting and external services',
        paragraphs: [
          'GitHub Pages hosts and delivers the portfolio. Like other web hosts, GitHub may process technical request information such as an IP address, requested URL, browser information, and timestamps under its own terms and privacy practices. This portfolio does not control that infrastructure processing. Links to LinkedIn, Woku, Inpla, press sources, and other external websites leave this domain, and each destination applies its own privacy terms.',
        ],
      },
      {
        heading: 'Contact and updates',
        paragraphs: [
          'Questions about the content of this notice can be sent to paula.riq.esco@gmail.com. The notice may be updated when the portfolio adds a new service, changes its hosting, or changes how visitors can communicate. Material changes should be reflected on this page so people and agents can evaluate the current data boundary from a stable public URL.',
        ],
      },
    ],
    links: [
      {
        label: 'Email privacy question',
        href: 'mailto:paula.riq.esco@gmail.com',
        ariaLabel: 'Email Paula Riquelme about privacy',
      },
      {
        label: 'GitHub privacy statement',
        href: 'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement',
        external: true,
        ariaLabel: 'Read the GitHub general privacy statement',
      },
    ],
  },
};

export const projects: Project[] = [
  {
    slug: 'woku',
    caseStudyPath: '/work/woku/',
    experienceId: 'woku',
    name: 'Woku',
    description: 'AI-powered customer-feedback platform',
    href: 'https://woku.app',
    image: '/media/woku-project.webp',
    imageAlt: 'Woku website showing its customer-retention proposition.',
    imageCaption: 'Current Woku website, captured in September 2026.',
    imageWidth: 1600,
    imageHeight: 900,
    imagePosition: 'right',
    metrics: [
      { value: '50+', label: 'customers' },
      { value: '3', label: 'countries: Chile, Peru, and Colombia' },
      { value: 'USD 70K', label: 'non-dilutive CORFO funding' },
    ],
    highlights: [
      'Leads end-to-end strategy and execution for an AI-powered customer feedback platform, from discovery and workflow design through frontend implementation and launch.',
      'Translates customer needs into features for rapid feedback capture, NPS and forms, AI-assisted analysis, alerts, and WhatsApp and API integrations.',
      'Connects product, UX/UI, growth, sales, and implementation to keep the roadmap aligned with business outcomes and real customer workflows.',
    ],
    caseStudy: {
      context: [
        'The verified portfolio record frames Woku as an AI-powered customer-feedback platform. Paula connects customer discovery and real workflows with product strategy, UX/UI, go-to-market work, and implementation.',
        'The current product brings rapid feedback capture, NPS, forms, AI-assisted analysis, alerts, and WhatsApp and API integrations into one product record.',
      ],
      constraints: [
        'The documented role crosses product, design, growth, sales, frontend implementation, and launch. Decisions therefore had to stay connected to both customer workflows and business outcomes rather than move through isolated handoffs.',
        'The public record does not state a single original research study, launch date, conversion result, or revenue figure, so this case study does not infer any of them.',
      ],
      decisionResponsibilityIndexes: [1, 2],
      deliveryResponsibilityIndexes: [0, 2],
      outcomeResponsibilityIndexes: [3, 4],
      pressFeatureIndexes: [0],
      reflection: [
        'The evidence supports a practical lesson: discovery, roadmap choices, workflow design, launch, and implementation remain more useful when they are evaluated against the same customer and business context.',
        'This is a lesson drawn from the documented scope and outcomes, not a claim that Paula alone produced every company result.',
      ],
      factualBoundary:
        "This case study names Paula's documented contributions and lists company outcomes separately. It does not infer undisclosed research findings, revenue, conversion, or sole ownership of team results.",
    },
  },
  {
    slug: 'wondeya',
    role: 'Co-founder',
    name: 'Wondeya',
    description: 'Conversational landing pages',
    href: 'https://wondeya.com',
    image: '/media/wondeya-project.webp',
    imageAlt:
      'Wondeya landing page showing its conversational assistant for visitor questions.',
    imageCaption: 'Current Wondeya landing page, captured in September 2026.',
    imageWidth: 1600,
    imageHeight: 900,
    metrics: [],
    highlights: [
      'Built a conversational engine that combines knowledge retrieval, a typed content catalog, and server-resolved business resources.',
      'Prototyped and evaluated a typed routing path that uses a structured model for routing and a generative model for grounded copy.',
      'Preserved the original engine as a traceable fallback for follow-ups, uncertainty, errors, and missing material.',
    ],
  },
  {
    slug: 'inpla',
    caseStudyPath: '/work/inpla/',
    experienceId: 'inpla',
    name: 'Inpla',
    description: 'Platform for chatting with company data',
    href: 'https://inpla.ai/en/',
    image: '/media/inpla-website.webp',
    imageAlt:
      'Inpla product interface showing an AI conversation beside a monthly revenue dashboard.',
    imageCaption:
      'Official Inpla product interface from inpla.ai, accessed in August 2026.',
    imageWidth: 1600,
    imageHeight: 1370,
    metrics: [
      { value: '01', label: 'first customer: Puerto Coronel' },
      { value: 'Pre-product', label: 'commercial validation' },
    ],
    highlights: [
      'Won the first customer, Puerto Coronel, before a product existed by selling the vision alone.',
      'Co-created the product, user experience, brand, and positioning.',
      'Helped shape a platform that allows companies to chat with their data.',
    ],
    caseStudy: {
      context: [
        'Inpla is documented as a platform that allows companies to chat with their data. The product record connects an AI conversation with business information and visual reporting.',
        "The portfolio evidence focuses on the earliest commercial signal and Paula's contribution to turning that signal into a product, experience, brand, and position.",
      ],
      constraints: [
        'Puerto Coronel became the first customer before a product existed. The initial condition was therefore commercial validation of a vision, not optimization of an established interface or mature product.',
        'The verified record does not publish research transcripts, implementation dates, adoption metrics, revenue, or conversion rates, so none are added here.',
      ],
      decisionResponsibilityIndexes: [1, 2],
      deliveryResponsibilityIndexes: [1, 2],
      outcomeResponsibilityIndexes: [0],
      pressFeatureIndexes: [2],
      reflection: [
        'The documented sequence shows that product design can begin before a finished interface: positioning a credible vision, earning a first customer, and then co-creating the product are connected parts of reducing product risk.',
        "The company outcome and Paula's individual work remain distinct. The record credits her with winning the first customer and co-creating the product, user experience, brand, and positioning.",
      ],
      factualBoundary:
        "This case study names Paula's documented contributions and lists the company outcome separately. It does not infer undisclosed customer research, technical ownership, revenue, adoption, or sole ownership of team results.",
    },
  },
  {
    slug: 'orvita',
    experienceId: 'orvita',
    role: 'Founder & CEO',
    name: 'Orvita',
    description: 'Digital tourism venture for personalized route planning',
    image: '/media/orvita.a.gif',
    imageAlt:
      'Orvita digital tourism venture interface with a route search field and city map.',
    imageCaption: 'Orvita digital tourism venture interface.',
    imageWidth: 1024,
    imageHeight: 768,
    metrics: [
      { value: 'USD 7K', label: 'non-dilutive ICHIO funding' },
      { value: 'OPTIMA 2017', label: 'Best Undergraduate Paper' },
    ],
    highlights: [
      'Received USD 7,000 in non-dilutive funding from the Chilean Institute for Operations Research, ICHIO.',
      'Earned the Best Undergraduate Paper recognition at the OPTIMA 2017 Congress.',
      'Led strategy and product development for a digital tourism venture.',
    ],
  },
];

export const experience: ExperienceItem[] = [
  {
    id: 'woku',
    role: 'CEO & Co-founder / Product Lead',
    company: 'woku',
    dates: 'September 2023 - August 2026',
    location: 'Chile',
    href: 'https://woku.app',
    responsibilities: [
      'Leads end-to-end strategy and execution for an AI-powered customer feedback platform, from discovery and workflow design through frontend implementation and launch.',
      'Translates customer needs into features for rapid feedback capture, NPS and forms, AI-assisted analysis, alerts, and WhatsApp and API integrations.',
      'Connects product, UX/UI, growth, sales, and implementation to keep the roadmap aligned with business outcomes and real customer workflows.',
      'Won more than 50 customers across Chile, Peru, and Colombia.',
      'Secured USD 70,000 in non-dilutive, equity-free funding from CORFO.',
    ],
  },
  {
    id: 'inpla',
    role: 'Co-founder & Brand Artisan, Product Design',
    company: 'Inpla',
    dates: 'May 2025 - January 2026',
    location: 'Chile',
    href: 'https://inpla.ai/en/',
    responsibilities: [
      'Won the first customer, Puerto Coronel, before a product existed by selling the vision alone.',
      'Co-created the product, user experience, brand, and positioning.',
      'Helped shape a platform that allows companies to chat with their data.',
    ],
  },
  {
    id: 'stow',
    role: 'CEO & Co-founder',
    company: 'stow SpA',
    dates: 'October 2020 - December 2022',
    location: 'Concepción, Chile',
    responsibilities: [
      'Built a Chilean technology startup from concept to market.',
      'Contributed directly across product strategy, design, development, sales, and operations.',
      "Selected for the third cohort of Start-Up Chile's BUILD program in 2022.",
      'Received USD 10,000 in non-dilutive, equity-free funding from Start-Up Chile.',
    ],
  },
  {
    id: 'essbio',
    role: 'Maintenance Planning Engineer',
    company: 'Essbio',
    dates: 'May 2019 - July 2021',
    location: 'Concepción, Chile',
    responsibilities: [
      "Led an innovation process with 30 technicians to improve the company's maintenance processes.",
      {
        text: "Used Carlos Osorio's (defi)2 innovation methodology.",
        externalLink: {
          href: 'https://defi2.cc/',
          ariaLabel:
            "Used Carlos Osorio's (defi)2 innovation methodology. Opens in a new tab",
        },
      },
      'Created data models and decision-support visualizations for maintenance planning.',
    ],
  },
  {
    id: 'university',
    role: 'Lecturer',
    company: 'Universidad de Concepción',
    dates: '2023',
    responsibilities: [
      'Taught Business Management.',
      'Coached students in Project Formulation and Evaluation.',
    ],
  },
  {
    id: 'orvita',
    role: 'Founder & CEO',
    company: 'Orvita',
    dates: '2018 - 2019',
    responsibilities: [
      'Led strategy and product development for a digital tourism venture.',
      'Developed the venture using funding obtained after the OPTIMA 2017 recognition.',
    ],
  },
];

export const getProjectExperience = (project: {
  name: string;
  experienceId: ExperienceItem['id'];
}) => {
  const record = experience.find((item) => item.id === project.experienceId);
  if (!record)
    throw new Error(`Missing experience record for ${project.name}.`);
  return record;
};

export const getCaseStudyProject = (
  slug: CaseStudyProject['slug'],
): CaseStudyProject => {
  const project = projects.find((item) => item.slug === slug);
  if (!project?.caseStudyPath || !project.experienceId || !project.caseStudy) {
    throw new Error(`Missing case study for ${slug}.`);
  }
  return project as CaseStudyProject;
};

export const skillGroups: SkillGroup[] = [
  {
    name: 'Product',
    items: [
      'Product strategy',
      'Product discovery',
      'Customer research',
      'Roadmaps',
      'UX/UI',
      'Prototyping',
      'Go-to-market',
      'Agile delivery',
    ],
  },
  {
    name: 'Design',
    items: [
      'Figma: advanced',
      'Adobe Illustrator: advanced',
      'Adobe Premiere Pro: advanced',
    ],
  },
  {
    name: 'Development',
    items: [
      'TypeScript',
      'Tailwind CSS',
      'Next.js',
      'Vite',
      'AI-assisted development with Claude Code, Codex, and Kimi',
      'Working knowledge of MongoDB, NestJS, AWS, and Azure',
    ],
  },
];

export const education = [
  {
    degree: "Master's in Innovation and Technology Entrepreneurship",
    institution: 'Universidad de Concepción',
    year: '2023',
  },
  {
    degree: 'Industrial Engineering',
    institution: 'Universidad de Concepción',
    year: '2018',
  },
];

export const recognition = {
  title: 'Best Undergraduate Paper | OPTIMA 2017',
  description:
    "Developed an algorithm based on the traveling salesperson problem to recommend tourist routes according to a visitor's interests, available time, and budget. The work received the Best Undergraduate Paper award at the OPTIMA 2017 Congress.",
  outcome:
    'The recognition made it possible to obtain USD 7,000 in funding from the Chilean Institute for Operations Research, ICHIO, to develop Orvita.',
  href: 'https://assets.diarioconcepcion.cl/2017/12/Diario-Concepci%C3%B3n-10-12-2017.pdf',
  image: '/media/optima-2017.webp',
  imageAlt:
    "Diario Concepción article about Paula Riquelme's award-winning tourism route model at OPTIMA 2017.",
};

export const pressFeatures: PressFeature[] = [
  {
    title:
      'Woku, the Hualpén startup seeking to make rapid customer feedback easier',
    source: 'El Mercurio Innovation',
    href: 'https://www.linkedin.com/posts/juevesdeinnovaciaejn-internacionalizacion-ugcPost-7242352081439735809-5dJQ/',
    images: [
      {
        src: '/media/woku-evidence.webp',
        alt: 'El Mercurio Innovation feature about Woku, with Paula Riquelme and Diego Orrego above the article headline.',
      },
    ],
  },
  {
    title:
      'From podcasts to books: 10 entrepreneurs recommend content for the summer',
    source: 'El Mercurio Innovation',
    href: 'https://www.linkedin.com/posts/juevesdeinnovaciaejn-congresofuturo-arte-ugcPost-7282839605878358017-dJf1/',
    images: [
      {
        src: '/media/summer-recommendations-01.webp',
        alt: "Opening page of El Mercurio Innovation's summer recommendations feature with contributions from Chilean entrepreneurs.",
      },
      {
        src: '/media/summer-recommendations-02.webp',
        alt: "Second page of the summer recommendations feature, including Paula Riquelme's recommendation of Building a StoryBrand.",
      },
    ],
  },
  {
    title:
      'New startup that lets companies chat with their data signs Puerto Coronel',
    source: 'El Mercurio Innovation',
    href: 'https://www.linkedin.com/posts/innovaciaejn-emprendedores-tecnologaeda-ugcPost-7348780238723538946-WB-M/',
    images: [
      {
        src: '/media/inpla-project.webp',
        alt: "El Mercurio Innovation feature announcing Inpla's Puerto Coronel customer, with the founding team.",
      },
    ],
  },
  {
    title: 'What is it like to shut down a startup?',
    source: 'El Mercurio Innovation',
    href: 'https://www.linkedin.com/posts/juevesdeinnovaciaejn-startup-emprender-ugcPost-7211913946209886208-nLoJ/',
    images: [
      {
        src: '/media/startup-closure-feature.webp',
        alt: 'El Mercurio Innovation feature about startup closures, including a quote from Paula Riquelme.',
      },
    ],
  },
  {
    title: 'Made Inn Conce 2024: Four new startups from Biobío to watch',
    source: 'El Mercurio Innovation',
    href: 'https://www.linkedin.com/posts/juevesdeinnovacion-puertovaras-salmoneras-ugcPost-7196553065276080130-T_3e/',
    images: [
      {
        src: '/media/made-inn-conce-2024.webp',
        alt: 'El Mercurio Innovation feature on four Biobío startups, with Paula Riquelme and other founders at Made Inn Conce 2024.',
      },
    ],
  },
];

export const language = 'English: full professional proficiency.';
