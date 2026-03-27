import type { CommandRegistry, Command } from '../CommandRegistry';
import { profile } from '../../config/profile';

const careerHistory = [
  {
    hash: 'a3f8c2d',
    date: profile.experience.current.period,
    author: profile.name,
    message: `feat: ${profile.experience.current.title.toLowerCase()} @ ${profile.experience.current.company}`,
    body: profile.experience.current.responsibilities[0] ?? '',
  },
  {
    hash: 'b7e1a4f',
    date: profile.experience.previous.period,
    author: profile.name,
    message: `feat: ${profile.experience.previous.title.toLowerCase()} @ ${profile.experience.previous.company}`,
    body: profile.experience.previous.responsibilities[0] ?? '',
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
