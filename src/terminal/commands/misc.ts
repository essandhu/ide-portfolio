import type { CommandRegistry, Command } from '../CommandRegistry';
import { themes } from '../../themes';

const clear: Command = {
  name: 'clear',
  description: 'Clear terminal screen',
  execute: () => {
    return { text: '', clear: true };
  },
};

const whoami: Command = {
  name: 'whoami',
  description: 'Display user identity',
  execute: () => {
    return { text: 'Erick — Software Engineer' };
  },
};

const theme: Command = {
  name: 'theme',
  description: 'Switch IDE theme',
  execute: (args) => {
    const themeName = args[0];

    if (!themeName) {
      const available = Object.keys(themes).join(', ');
      return {
        text: `usage: theme <name>\n\nAvailable themes: ${available}`,
        isError: true,
      };
    }

    if (!themes[themeName]) {
      const available = Object.keys(themes).join(', ');
      return {
        text: `theme: '${themeName}' not found.\n\nAvailable themes: ${available}`,
        isError: true,
      };
    }

    return {
      text: `Theme switched to ${themeName}`,
    };
  },
};

export function registerMiscCommands(registry: CommandRegistry): void {
  // Register help with a dynamic execute that reads from registry
  const helpCommand: Command = {
    name: 'help',
    description: 'List all available commands',
    execute: () => {
      const commands = registry.all();
      const lines = commands
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((cmd) => `  ${cmd.name.padEnd(12)} ${cmd.description}`);
      return { text: `Available commands:\n${lines.join('\n')}` };
    },
  };

  registry.register(helpCommand);
  registry.register(clear);
  registry.register(whoami);
  registry.register(theme);
}
