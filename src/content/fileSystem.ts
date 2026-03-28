import type { VirtualDirectory, VirtualFile } from '../terminal/VirtualFileSystem';
import { profile } from '../config/profile';

const aboutTs: VirtualFile = {
  name: 'about.ts',
  content: `interface Person {
  name: string;
  title: string;
  location: string;
  bio: string;
  interests: string[];
}

export const ${profile.name.toLowerCase().replace(/\s+/g, '_')}: Person = {
  name: '${profile.name}',
  title: '${profile.title}',
  location: '${profile.location}',
  bio: \`${profile.bio}\`,
  interests: [
${profile.interests.map((i) => `    '${i}',`).join('\n')}
  ],
};`,
  originalContent: `interface Person {
  name: string;
  title: string;
  location: string;
  bio: string;
  interests: string[];
}

export const ${profile.name.toLowerCase().replace(/\s+/g, '_')}: Person = {
  name: '${profile.name}',
  title: '${profile.title}',
  location: '${profile.location}',
  bio: \`${profile.bio}\`,
  interests: [
${profile.interests.map((i) => `    '${i}',`).join('\n')}
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
${profile.skills.map((s) => `  { name: '${s.name}', category: '${s.category}', proficiency: ${s.proficiency} },`).join('\n')}
];`,
  originalContent: `interface Skill {
  name: string;
  category: 'language' | 'framework' | 'tool' | 'platform';
  proficiency: number; // 1-5
}

export const skills: Skill[] = [
${profile.skills.map((s) => `  { name: '${s.name}', category: '${s.category}', proficiency: ${s.proficiency} },`).join('\n')}
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
  email: '${profile.contact.email}',
  github: '${profile.contact.github}',
  linkedin: '${profile.contact.linkedin}',
  website: '${profile.contact.website}',
};`,
  originalContent: `interface ContactInfo {
  email: string;
  github: string;
  linkedin: string;
  website: string;
}

export const contact: ContactInfo = {
  email: '${profile.contact.email}',
  github: '${profile.contact.github}',
  linkedin: '${profile.contact.linkedin}',
  website: '${profile.contact.website}',
};`,
  language: 'typescript',
};

const toKebab = (s: string) => s.toLowerCase().replace(/\s+/g, '-');
const toPascal = (s: string) => s.replace(/(?:^|\s)\w/g, (c) => c.trim().toUpperCase()).replace(/\s+/g, '');

const projectFiles: VirtualFile[] = profile.projects.map((p) => {
  const kebab = toKebab(p.name);
  const pascal = toPascal(p.name);
  const body = `interface ProjectProps {
  name: string;
  description: string;
  tech: string[];
  url?: string;
}

export const ${pascal} = (): ProjectProps => ({
  name: '${p.name}',
  description: "${p.description.replace(/"/g, '\\"')}",
  tech: [${p.tech.map((t) => `'${t}'`).join(', ')}],
  url: '${p.url ?? ''}',
});`;
  return {
    name: `${kebab}.tsx`,
    content: body,
    originalContent: body,
    language: 'typescriptreact' as const,
  };
});

const projectsIndex: VirtualFile = {
  name: 'index.ts',
  content: profile.projects.map((p) => `export { ${toPascal(p.name)} } from './${toKebab(p.name)}';`).join('\n'),
  originalContent: profile.projects.map((p) => `export { ${toPascal(p.name)} } from './${toKebab(p.name)}';`).join('\n'),
  language: 'typescript',
};

const experienceFiles: VirtualFile[] = profile.experience.map((role) => ({
  name: `${toKebab(role.company)}.md`,
  content: `# ${role.title} — ${role.company}\n\n**${role.period}** | ${role.location}\n\n## Responsibilities\n\n${role.responsibilities.map((r) => `- ${r}`).join('\n')}\n\n## Key Achievements\n\n${role.achievements.map((a) => `- ${a}`).join('\n')}`,
  originalContent: `# ${role.title} — ${role.company}\n\n**${role.period}** | ${role.location}\n\n## Responsibilities\n\n${role.responsibilities.map((r) => `- ${r}`).join('\n')}\n\n## Key Achievements\n\n${role.achievements.map((a) => `- ${a}`).join('\n')}`,
  language: 'markdown' as const,
}));

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
      children: [...projectFiles, projectsIndex],
    },
    {
      name: 'experience',
      children: experienceFiles,
    },
    readmeMd,
  ],
};
