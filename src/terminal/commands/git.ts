import type { CommandRegistry, Command } from '../CommandRegistry';
import { profile } from '../../config/profile';

const hashes = ['a3f8c2d', 'b7e1a4f', 'c9d2b5e', 'd1e3f6a', 'e2f4a7b'];
const careerHistory = profile.experience.map((role, i) => ({
  hash: hashes[i % hashes.length],
  date: role.period,
  author: profile.name,
  message: `feat: ${role.title.toLowerCase()} @ ${role.company}`,
  body: role.responsibilities[0] ?? '',
}));

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
