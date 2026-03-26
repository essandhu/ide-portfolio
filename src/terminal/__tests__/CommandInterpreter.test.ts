import { describe, it, expect, beforeEach } from 'vitest';
import { CommandInterpreter } from '../CommandInterpreter';
import { CommandRegistry } from '../CommandRegistry';
import { VirtualFileSystem } from '../VirtualFileSystem';
import type { VirtualDirectory } from '../VirtualFileSystem';

const mockFs: VirtualDirectory = {
  name: 'src',
  children: [
    { name: 'about.ts', content: 'hello', originalContent: 'hello', language: 'typescript' },
  ],
};

describe('CommandRegistry', () => {
  it('registers and retrieves a command', () => {
    const registry = new CommandRegistry();
    registry.register({
      name: 'echo',
      description: 'Echoes input',
      execute: (args) => ({ text: args.join(' ') }),
    });
    expect(registry.get('echo')).toBeDefined();
    expect(registry.get('echo')!.name).toBe('echo');
  });

  it('returns undefined for unknown command', () => {
    const registry = new CommandRegistry();
    expect(registry.get('nope')).toBeUndefined();
  });

  it('lists all registered commands', () => {
    const registry = new CommandRegistry();
    registry.register({ name: 'a', description: 'A', execute: () => ({ text: '' }) });
    registry.register({ name: 'b', description: 'B', execute: () => ({ text: '' }) });
    expect(registry.all().map(c => c.name)).toEqual(['a', 'b']);
  });
});

describe('CommandInterpreter', () => {
  let interpreter: CommandInterpreter;

  beforeEach(() => {
    const vfs = new VirtualFileSystem(mockFs);
    interpreter = new CommandInterpreter(vfs);
  });

  it('parses a simple command with no args', () => {
    const parsed = interpreter.parse('help');
    expect(parsed).toEqual({ command: 'help', args: [] });
  });

  it('parses a command with arguments', () => {
    const parsed = interpreter.parse('ls projects');
    expect(parsed).toEqual({ command: 'ls', args: ['projects'] });
  });

  it('parses multi-word commands like npm run projects', () => {
    const parsed = interpreter.parse('npm run projects');
    expect(parsed).toEqual({ command: 'npm', args: ['run', 'projects'] });
  });

  it('parses git subcommands', () => {
    const parsed = interpreter.parse('git log');
    expect(parsed).toEqual({ command: 'git', args: ['log'] });
  });

  it('trims whitespace', () => {
    const parsed = interpreter.parse('  ls   projects  ');
    expect(parsed).toEqual({ command: 'ls', args: ['projects'] });
  });

  it('returns error output for empty input', () => {
    const result = interpreter.execute('');
    expect(result.text).toBe('');
  });

  it('returns error for unknown command', () => {
    const result = interpreter.execute('foobar');
    expect(result.isError).toBe(true);
    expect(result.text).toContain('command not found');
  });
});
