import type { CommandRegistry, Command } from '../CommandRegistry';

const ls: Command = {
  name: 'ls',
  description: 'List directory contents',
  execute: (args, context) => {
    try {
      const entries = context.vfs.ls(args[0]);
      const formatted = entries
        .map((e) => (e.type === 'directory' ? `${e.name}/` : e.name))
        .join('  ');
      return { text: formatted };
    } catch (err) {
      return { text: (err as Error).message, isError: true };
    }
  },
};

const cd: Command = {
  name: 'cd',
  description: 'Change directory',
  execute: (args, context) => {
    try {
      context.vfs.cd(args[0] || '/');
      return { text: '' };
    } catch (err) {
      return { text: (err as Error).message, isError: true };
    }
  },
};

const cat: Command = {
  name: 'cat',
  description: 'Print file contents',
  execute: (args, context) => {
    if (!args[0]) {
      return { text: 'cat: missing file operand', isError: true };
    }

    const file = context.vfs.readFile(args[0]);
    if (!file) {
      return { text: `cat: ${args[0]}: No such file or directory`, isError: true };
    }

    return { text: file.content };
  },
};

const pwd: Command = {
  name: 'pwd',
  description: 'Print working directory',
  execute: (_args, context) => {
    return { text: context.vfs.cwd() };
  },
};

export function registerFilesystemCommands(registry: CommandRegistry): void {
  registry.register(ls);
  registry.register(cd);
  registry.register(cat);
  registry.register(pwd);
}
