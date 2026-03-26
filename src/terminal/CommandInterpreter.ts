import { CommandRegistry } from './CommandRegistry';
import type { CommandOutput } from './CommandRegistry';
import type { VirtualFileSystem } from './VirtualFileSystem';

export class CommandInterpreter {
  private registry: CommandRegistry;
  private vfs: VirtualFileSystem;

  constructor(vfs: VirtualFileSystem) {
    this.vfs = vfs;
    this.registry = new CommandRegistry();
  }

  parse(input: string): { command: string; args: string[] } {
    const parts = input.trim().split(/\s+/);
    return { command: parts[0], args: parts.slice(1) };
  }

  execute(input: string): CommandOutput {
    const trimmed = input.trim();
    if (!trimmed) return { text: '' };

    const { command, args } = this.parse(trimmed);
    const cmd = this.registry.get(command);
    if (!cmd) {
      return {
        text: `${command}: command not found. Type 'help' for available commands.`,
        isError: true,
      };
    }

    return cmd.execute(args, { vfs: this.vfs });
  }

  getRegistry(): CommandRegistry {
    return this.registry;
  }
}
