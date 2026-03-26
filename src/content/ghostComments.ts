import type { GhostComment } from '../terminal/VirtualFileSystem';

export const ghostComments: Record<string, GhostComment[]> = {
  '/src/about.ts': [
    {
      line: 1,
      text: '// AI: Consider adding a "yearsOfExperience" field to the Person interface',
      delay: 1500,
    },
    {
      line: 12,
      text: '// AI: Nice use of template literals for the bio — keeps it readable',
      delay: 3000,
    },
    {
      line: 20,
      text: '// AI: You might want to add "Performance Engineering" to interests',
      delay: 5000,
    },
  ],
  '/src/skills.ts': [
    {
      line: 1,
      text: '// AI: The Skill interface is clean — consider adding "years" for context',
      delay: 2000,
    },
    {
      line: 8,
      text: '// AI: Impressive TypeScript proficiency! The code quality shows it',
      delay: 4000,
    },
  ],
  '/src/contact.ts': [
    {
      line: 9,
      text: '// AI: All contact links are well-structured — ready for the sidebar widget',
      delay: 2000,
    },
  ],
  '/src/projects/project-alpha.tsx': [
    {
      line: 8,
      text: '// AI: Meta! A portfolio project that describes itself',
      delay: 1000,
    },
    {
      line: 11,
      text: '// AI: Solid tech stack choice — Monaco gives real IDE feel',
      delay: 3500,
    },
  ],
  '/src/experience/current-role.md': [
    {
      line: 3,
      text: '<!-- AI: The diff view shows your career growth — nice touch -->',
      delay: 2000,
    },
    {
      line: 13,
      text: '<!-- AI: 15% to 85% coverage is a compelling metric — keep it prominent -->',
      delay: 4500,
    },
  ],
};
