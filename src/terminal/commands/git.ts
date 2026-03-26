import type { CommandRegistry, Command } from '../CommandRegistry';

const careerHistory = [
  {
    hash: 'a3f8c2d',
    date: '2024-Present',
    author: 'Erick',
    message: 'feat: senior software engineer @ Current Company',
    body: 'Leading frontend architecture, building design systems, mentoring junior devs.',
  },
  {
    hash: 'b7e1a4f',
    date: '2022-2024',
    author: 'Erick',
    message: 'feat: software engineer @ Previous Company',
    body: 'Full-stack development with React, Node.js, and TypeScript.',
  },
  {
    hash: 'c9d2b5e',
    date: '2020-2022',
    author: 'Erick',
    message: 'feat: junior developer @ First Company',
    body: 'Built internal tools and customer-facing web applications.',
  },
];

const gitLog: Command = {
  name: 'git',
  description: 'Git commands (log, status)',
  execute: (args) => {
    const subcommand = args[0];

    if (!subcommand) {
      return {
        text: 'usage: git <command>\n\nAvailable commands: log, status',
        isError: true,
      };
    }

    if (subcommand === 'log') {
      const entries = careerHistory
        .map(
          (entry) =>
            `commit ${entry.hash}\nAuthor: ${entry.author}\nDate:   ${entry.date}\n\n    ${entry.message}\n    ${entry.body}`,
        )
        .join('\n\n');
      return { text: entries };
    }

    if (subcommand === 'status') {
      return {
        text: `On branch main\nYour branch is up to date with 'origin/main'.\n\nnothing to commit, portfolio clean`,
      };
    }

    return {
      text: `git: '${subcommand}' is not a git command. See 'git --help'.`,
      isError: true,
    };
  },
};

export function registerGitCommands(registry: CommandRegistry): void {
  registry.register(gitLog);
}
