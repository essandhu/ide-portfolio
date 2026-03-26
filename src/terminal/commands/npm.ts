import type { CommandRegistry, Command } from '../CommandRegistry';

const scripts: Record<string, () => string> = {
  projects: () => {
    const projects = [
      { name: 'IDE Portfolio', description: 'VS Code replica portfolio site', tech: 'React, TypeScript, Monaco' },
      { name: 'Project Alpha', description: 'Full-stack SaaS application', tech: 'Next.js, PostgreSQL, Stripe' },
      { name: 'Project Beta', description: 'Real-time collaboration tool', tech: 'React, WebSockets, Redis' },
    ];

    return projects
      .map((p) => `  ${p.name}\n    ${p.description}\n    Tech: ${p.tech}`)
      .join('\n\n');
  },
};

const npm: Command = {
  name: 'npm',
  description: 'NPM commands (run projects)',
  execute: (args) => {
    const subcommand = args[0];

    if (!subcommand) {
      return {
        text: 'usage: npm <command>\n\nAvailable commands: run',
        isError: true,
      };
    }

    if (subcommand !== 'run') {
      return {
        text: `npm: '${subcommand}' is not a supported command. Try 'npm run'.`,
        isError: true,
      };
    }

    const scriptName = args[1];

    if (!scriptName) {
      const available = Object.keys(scripts).join('\n  ');
      return {
        text: `Available scripts:\n  ${available}`,
      };
    }

    const scriptFn = scripts[scriptName];
    if (!scriptFn) {
      return {
        text: `npm ERR! Missing script: "${scriptName}"\n\nAvailable scripts:\n  ${Object.keys(scripts).join('\n  ')}`,
        isError: true,
      };
    }

    return { text: scriptFn() };
  },
};

export function registerNpmCommands(registry: CommandRegistry): void {
  registry.register(npm);
}
