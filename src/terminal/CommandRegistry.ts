import type { VirtualFileSystem } from './VirtualFileSystem';

export interface CommandOutput {
  text: string;
  isError?: boolean;
  clear?: boolean;
}

export interface CommandContext {
  vfs: VirtualFileSystem;
}

export interface Command {
  name: string;
  description: string;
  execute: (args: string[], context: CommandContext) => CommandOutput;
}

export class CommandRegistry {
  private commands = new Map<string, Command>();

  register(cmd: Command): void {
    this.commands.set(cmd.name, cmd);
  }

  get(name: string): Command | undefined {
    return this.commands.get(name);
  }

  all(): Command[] {
    return Array.from(this.commands.values());
  }
}
