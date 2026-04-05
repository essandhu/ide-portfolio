export interface Skill {
  name: string;
  category: 'language' | 'framework' | 'tool' | 'platform';
  proficiency: number; // 1-5
}

export interface ExperienceRole {
  company: string;
  title: string;
  period: string;
  location: string;
  responsibilities: string[];
  achievements: string[];
}

export interface Project {
  name: string;
  description: string;
  tech: string[];
  url?: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
}

export interface Contact {
  email: string;
  github: string;
  linkedin: string;
  website: string;
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  bio: string;
  interests: string[];
  contact: Contact;
  skills: Skill[];
  education: Education[];
  certifications: string[];
  experience: ExperienceRole[];
  projects: Project[];
  githubRepoUrl: string;
}

export const profile: Profile = {
  name: 'Erick Sandhu',
  title: 'Software Developer',
  location: 'Irving, TX',
  bio: 'Software developer with experience building and scaling component libraries, design systems, and full-stack applications. Currently pursuing an M.S. in Computer Science at UT Austin while contributing to open-source tooling. Passionate about developer experience, accessible UI, and shipping software that solves real problems.',
  interests: [
    'Open Source',
    'Design Systems',
    'Developer Tooling',
    'AI-Assisted Development',
    'Autonomous Systems',
    'Visual Regression Testing',
  ],
  contact: {
    email: 'essandhu22@gmail.com',
    github: 'https://github.com/essandhu',
    linkedin: 'https://linkedin.com/in/erick-sandhu',
    website: 'https://ericksandhu.dev',
  },
  skills: [
    // Languages
    { name: 'TypeScript', category: 'language', proficiency: 5 },
    { name: 'JavaScript', category: 'language', proficiency: 5 },
    { name: 'HTML/CSS', category: 'language', proficiency: 5 },
    { name: 'Python', category: 'language', proficiency: 4 },
    { name: 'Java', category: 'language', proficiency: 3 },
    { name: 'SQL', category: 'language', proficiency: 4 },
    { name: 'PHP', category: 'language', proficiency: 3 },
    { name: 'C#', category: 'language', proficiency: 3 },
    { name: 'Go', category: 'language', proficiency: 3 },

    // Frameworks
    { name: 'React', category: 'framework', proficiency: 5 },
    { name: 'Next.js', category: 'framework', proficiency: 4 },
    { name: 'Tailwind CSS', category: 'framework', proficiency: 5 },
    { name: 'Radix Primitives', category: 'framework', proficiency: 4 },
    { name: 'Node.js', category: 'framework', proficiency: 4 },
    { name: 'Express', category: 'framework', proficiency: 4 },
    { name: 'Vite', category: 'framework', proficiency: 4 },
    { name: 'Vitest', category: 'framework', proficiency: 4 },
    { name: 'Playwright', category: 'framework', proficiency: 4 },
    { name: 'OpenCV', category: 'framework', proficiency: 3 },
    { name: 'FastAPI', category: 'framework', proficiency: 3 },

    // Tools
    { name: 'Git', category: 'tool', proficiency: 5 },
    { name: 'Docker', category: 'tool', proficiency: 4 },
    { name: 'CI/CD', category: 'tool', proficiency: 4 },
    { name: 'REST APIs', category: 'tool', proficiency: 5 },
    { name: 'Claude Code', category: 'tool', proficiency: 4 },
    { name: 'GitHub Actions', category: 'tool', proficiency: 4 },
    { name: 'gRPC', category: 'tool', proficiency: 3 },

    // Platforms
    { name: 'PostgreSQL', category: 'platform', proficiency: 4 },
    { name: 'MongoDB', category: 'platform', proficiency: 4 },
    { name: 'Redis', category: 'platform', proficiency: 3 },
    { name: 'Google Cloud', category: 'platform', proficiency: 3 },
    { name: 'Kafka', category: 'platform', proficiency: 3 },
  ],
  education: [
    {
      institution: 'UT Austin',
      degree: 'M.S. Computer Science (Online)',
      period: 'Aug 2025 – Present',
    },
    {
      institution: 'UT Dallas',
      degree: 'B.S. Computer Science',
      period: 'Aug 2020 – May 2024',
    },
  ],
  certifications: ['Google Cloud Developer Certification'],
  experience: [
    {
      company: 'Paycom',
      title: 'Software Developer',
      period: 'Nov 2024 – Mar 2026',
      location: 'Irving, TX',
      responsibilities: [
        'Triaged bugs, maintenance tasks, and feature requests across the component library; provided architecture guidance to internal teams on SPA setup, front-end patterns, and cross-browser support.',
        'Built full-stack data management modules (PHP, C#, MVC) with REST API controllers and database bundles; deployed services in Docker containers and shipped on weekly release cycles with design, product, and QA.',
      ],
      achievements: [
        'Migrated a 100+ component UI library off Material UI v4, reducing bundle size by ~40% and eliminating the JSS runtime dependency across dozens of product teams.',
        'Architected a design token system (brand, semantic, and component tiers) via theme providers, cutting component development time by ~25% and unifying consistency across multiple codebases.',
      ],
    },
  ],
  projects: [
    {
      name: 'SynapseOMS',
      description:
        'Self-hosted order management system for traders working across equities and crypto. Four-service distributed architecture (Go gateway, Python risk engine, Python ML scorer, React dashboard) connected by Kafka and backed by PostgreSQL and Redis. Features sub-10ms gRPC pre-trade risk checks (VaR, concentration, Greeks), ML-scored venue selection via XGBoost, real-time WebSocket streaming, pluggable exchange adapters (Alpaca, Binance), and AI-powered execution analysis via Claude. All data stays on the user\'s machine with Argon2id + AES-256-GCM credential encryption at rest.',
      tech: ['Go', 'Python', 'React', 'TypeScript', 'Kafka', 'PostgreSQL', 'Redis', 'gRPC', 'XGBoost', 'Docker'],
      url: 'https://github.com/essandhu/SynapseOMS',
    },
    {
      name: 'Sentinel',
      description:
        'Open-source CLI tool for visual regression testing: captures screenshots, diffs against baselines using pixel, SSIM, and ML-based classification, and detects design drift against Figma/Sketch sources across Chromium, Firefox, and WebKit. Includes a bundled local dashboard, GitHub Action for CI with PR comments and status checks, VS Code extension for in-editor diff review, and a watch mode for local development.',
      tech: ['TypeScript', 'Playwright', 'GitHub Actions', 'VS Code Extension API', 'ML Classification'],
      url: 'https://github.com/essandhu/Sentinel',
    },
    {
      name: 'Notch',
      description:
        'AI-powered web app for synchronized timestamped note-taking alongside embedded video. Notes highlight in sync with video playback, with AI transcription and note generation producing timestamped summaries. Fully responsive with cloud storage, full-text search, tagging, and export to Markdown, PDF, JSON, and CSV.',
      tech: ['React', 'TypeScript', 'AI Transcription', 'Cloud Storage'],
      url: 'https://notchnotes.net',
    },
    {
      name: 'Aurora UI',
      description:
        'Open-source React component library with 40 accessible components published as tree-shakeable npm packages. Features a three-tier design token API (primitive, semantic, component-scoped) with theme switching via a single DOM attribute. Built on Radix Primitives for ARIA/WCAG compliance with dual ESM/CJS builds.',
      tech: ['React', 'TypeScript', 'Radix Primitives', 'Vite', 'Vitest', 'vitest-axe'],
      url: 'https://github.com/essandhu/aurora-ui',
    },
    {
      name: 'RTX Drone Showcase',
      description:
        "UTD Senior Design Capstone — won first place in RTX's collegiate drone competition. Owned full production of autonomous UAV/UGV navigation with ArUco marker detection (OpenCV) and custom pursuit algorithms, making effective tradeoffs between detection accuracy and real-time performance. Executed against a 9-month Agile roadmap with weekly sprints.",
      tech: ['Python', 'OpenCV', 'ArUco Markers', 'Autonomous Navigation', 'Agile'],
    },
  ],
  githubRepoUrl: 'https://github.com/essandhu/ide-portfolio',
};

// Shared path helpers — used by fileSystem, WelcomeTab, CommandPalette, etc.
const toKebab = (s: string) => s.toLowerCase().replace(/\s+/g, '-');

export const projectPath = (i: number) =>
  `/src/projects/${toKebab(profile.projects[i]?.name ?? 'project')}.tsx`;

export const experiencePath = (i: number) =>
  `/src/experience/${toKebab(profile.experience[i]?.company ?? 'role')}.md`;
