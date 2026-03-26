import type { VirtualDirectory, VirtualFile } from '../terminal/VirtualFileSystem';

const aboutTs: VirtualFile = {
  name: 'about.ts',
  content: `interface Person {
  name: string;
  title: string;
  location: string;
  bio: string;
  interests: string[];
}

export const erick: Person = {
  name: 'Erick',
  title: 'Full-Stack Software Engineer',
  location: 'United States',
  bio: \`Passionate engineer who loves building elegant, user-facing products.
Focused on TypeScript, React, and cloud-native architectures.
Always exploring new tools and pushing the boundaries of web development.\`,
  interests: [
    'Developer Experience',
    'Design Systems',
    'AI-Assisted Development',
    'Open Source',
  ],
};`,
  originalContent: `interface Person {
  name: string;
  title: string;
  location: string;
  bio: string;
  interests: string[];
}

export const erick: Person = {
  name: 'Erick',
  title: 'Full-Stack Software Engineer',
  location: 'United States',
  bio: \`Passionate engineer who loves building elegant, user-facing products.
Focused on TypeScript, React, and cloud-native architectures.
Always exploring new tools and pushing the boundaries of web development.\`,
  interests: [
    'Developer Experience',
    'Design Systems',
    'AI-Assisted Development',
    'Open Source',
  ],
};`,
  language: 'typescript',
};

const skillsTs: VirtualFile = {
  name: 'skills.ts',
  content: `interface Skill {
  name: string;
  category: 'language' | 'framework' | 'tool' | 'platform';
  proficiency: number; // 1-5
}

export const skills: Skill[] = [
  { name: 'TypeScript', category: 'language', proficiency: 5 },
  { name: 'JavaScript', category: 'language', proficiency: 5 },
  { name: 'Python', category: 'language', proficiency: 4 },
  { name: 'React', category: 'framework', proficiency: 5 },
  { name: 'Node.js', category: 'framework', proficiency: 4 },
  { name: 'Next.js', category: 'framework', proficiency: 4 },
  { name: 'Vite', category: 'tool', proficiency: 4 },
  { name: 'Docker', category: 'tool', proficiency: 3 },
  { name: 'Git', category: 'tool', proficiency: 5 },
  { name: 'AWS', category: 'platform', proficiency: 3 },
  { name: 'Vercel', category: 'platform', proficiency: 4 },
];`,
  originalContent: `interface Skill {
  name: string;
  category: 'language' | 'framework' | 'tool' | 'platform';
  proficiency: number; // 1-5
}

export const skills: Skill[] = [
  { name: 'TypeScript', category: 'language', proficiency: 5 },
  { name: 'JavaScript', category: 'language', proficiency: 5 },
  { name: 'Python', category: 'language', proficiency: 4 },
  { name: 'React', category: 'framework', proficiency: 5 },
  { name: 'Node.js', category: 'framework', proficiency: 4 },
  { name: 'Next.js', category: 'framework', proficiency: 4 },
  { name: 'Vite', category: 'tool', proficiency: 4 },
  { name: 'Docker', category: 'tool', proficiency: 3 },
  { name: 'Git', category: 'tool', proficiency: 5 },
  { name: 'AWS', category: 'platform', proficiency: 3 },
  { name: 'Vercel', category: 'platform', proficiency: 4 },
];`,
  language: 'typescript',
};

const contactTs: VirtualFile = {
  name: 'contact.ts',
  content: `interface ContactInfo {
  email: string;
  github: string;
  linkedin: string;
  website: string;
}

export const contact: ContactInfo = {
  email: 'hello@erick.dev',
  github: 'https://github.com/erick',
  linkedin: 'https://linkedin.com/in/erick',
  website: 'https://erick.dev',
};`,
  originalContent: `interface ContactInfo {
  email: string;
  github: string;
  linkedin: string;
  website: string;
}

export const contact: ContactInfo = {
  email: 'hello@erick.dev',
  github: 'https://github.com/erick',
  linkedin: 'https://linkedin.com/in/erick',
  website: 'https://erick.dev',
};`,
  language: 'typescript',
};

const projectAlpha: VirtualFile = {
  name: 'project-alpha.tsx',
  content: `interface ProjectProps {
  name: string;
  description: string;
  tech: string[];
  url?: string;
}

export const ProjectAlpha = (): ProjectProps => ({
  name: 'IDE Portfolio',
  description: 'A browser-based VS Code replica serving as a personal portfolio.',
  tech: ['React', 'TypeScript', 'Monaco Editor', 'xterm.js'],
  url: 'https://github.com/erick/ide-portfolio',
});`,
  originalContent: `interface ProjectProps {
  name: string;
  description: string;
  tech: string[];
  url?: string;
}

export const ProjectAlpha = (): ProjectProps => ({
  name: 'IDE Portfolio',
  description: 'A browser-based VS Code replica serving as a personal portfolio.',
  tech: ['React', 'TypeScript', 'Monaco Editor', 'xterm.js'],
  url: 'https://github.com/erick/ide-portfolio',
});`,
  language: 'typescriptreact',
};

const projectBeta: VirtualFile = {
  name: 'project-beta.tsx',
  content: `interface ProjectProps {
  name: string;
  description: string;
  tech: string[];
  url?: string;
}

export const ProjectBeta = (): ProjectProps => ({
  name: 'Cloud Dashboard',
  description: 'Real-time infrastructure monitoring with interactive charts and alerts.',
  tech: ['Next.js', 'TypeScript', 'D3.js', 'WebSocket'],
  url: 'https://github.com/erick/cloud-dashboard',
});`,
  originalContent: `interface ProjectProps {
  name: string;
  description: string;
  tech: string[];
  url?: string;
}

export const ProjectBeta = (): ProjectProps => ({
  name: 'Cloud Dashboard',
  description: 'Real-time infrastructure monitoring with interactive charts and alerts.',
  tech: ['Next.js', 'TypeScript', 'D3.js', 'WebSocket'],
  url: 'https://github.com/erick/cloud-dashboard',
});`,
  language: 'typescriptreact',
};

const projectsIndex: VirtualFile = {
  name: 'index.ts',
  content: `export { ProjectAlpha } from './project-alpha';
export { ProjectBeta } from './project-beta';`,
  originalContent: `export { ProjectAlpha } from './project-alpha';
export { ProjectBeta } from './project-beta';`,
  language: 'typescript',
};

const currentRole: VirtualFile = {
  name: 'current-role.md',
  content: `# Senior Software Engineer — Acme Corp

**2022 – Present** | Remote

## Responsibilities

- Lead frontend architecture for the core product platform
- Mentor junior engineers through code reviews and pair programming
- Design and implement CI/CD pipelines reducing deploy time by 60%
- Build accessible, performant React component library used across 5 teams

## Key Achievements

- Migrated legacy jQuery app to React + TypeScript (6-month project)
- Reduced bundle size by 40% through code splitting and tree shaking
- Established testing culture: coverage went from 15% to 85%`,
  originalContent: `# Software Engineer — Acme Corp

**2022 – Present** | Remote

## Responsibilities

- Contribute to frontend development of the core product
- Participate in code reviews
- Help maintain CI/CD pipelines
- Build React components

## Key Achievements

- Assisted with React migration
- Helped reduce bundle size
- Wrote tests for new features`,
  language: 'markdown',
};

const previousRole: VirtualFile = {
  name: 'previous-role.md',
  content: `# Software Engineer — StartupXYZ

**2020 – 2022** | San Francisco, CA

## Responsibilities

- Built full-stack features using React, Node.js, and PostgreSQL
- Owned the authentication and authorization system
- Created internal tooling that saved 20 hours/week of manual work

## Key Achievements

- Designed and shipped OAuth2 integration with 3 identity providers
- Built real-time notification system using WebSocket
- Led migration from REST to GraphQL for the mobile API`,
  originalContent: `# Software Engineer — StartupXYZ

**2020 – 2022** | San Francisco, CA

## Responsibilities

- Built full-stack features using React, Node.js, and PostgreSQL
- Owned the authentication and authorization system
- Created internal tooling that saved 20 hours/week of manual work

## Key Achievements

- Designed and shipped OAuth2 integration with 3 identity providers
- Built real-time notification system using WebSocket
- Led migration from REST to GraphQL for the mobile API`,
  language: 'markdown',
};

const readmeMd: VirtualFile = {
  name: 'README.md',
  content: `# IDE Portfolio

Welcome to my interactive portfolio! This is a browser-based VS Code replica
where the "files" are my portfolio content.

## Navigation

- **File Tree**: Browse files in the sidebar
- **Terminal**: Try commands like \`help\`, \`ls\`, \`git log\`
- **Editor**: Click any file to view with syntax highlighting

## Quick Start

\`\`\`bash
$ help          # See all commands
$ ls            # Browse files
$ cat about.ts  # View about info
$ git log       # Career timeline
\`\`\`

## Built With

TypeScript, React, Monaco Editor, xterm.js`,
  originalContent: `# IDE Portfolio

Welcome to my interactive portfolio! This is a browser-based VS Code replica
where the "files" are my portfolio content.

## Navigation

- **File Tree**: Browse files in the sidebar
- **Terminal**: Try commands like \`help\`, \`ls\`, \`git log\`
- **Editor**: Click any file to view with syntax highlighting

## Quick Start

\`\`\`bash
$ help          # See all commands
$ ls            # Browse files
$ cat about.ts  # View about info
$ git log       # Career timeline
\`\`\`

## Built With

TypeScript, React, Monaco Editor, xterm.js`,
  language: 'markdown',
};

export const portfolioFs: VirtualDirectory = {
  name: 'src',
  children: [
    aboutTs,
    skillsTs,
    contactTs,
    {
      name: 'projects',
      children: [projectAlpha, projectBeta, projectsIndex],
    },
    {
      name: 'experience',
      children: [currentRole, previousRole],
    },
    readmeMd,
  ],
};
