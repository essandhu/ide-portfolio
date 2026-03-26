import { describe, it, expect, beforeEach } from 'vitest';
import { CommandInterpreter } from '../CommandInterpreter';
import { VirtualFileSystem } from '../VirtualFileSystem';
import { registerMiscCommands } from '../commands/misc';
import { registerFilesystemCommands } from '../commands/filesystem';
import { registerGitCommands } from '../commands/git';
import { registerNpmCommands } from '../commands/npm';
import type { VirtualDirectory } from '../VirtualFileSystem';

const mockFs: VirtualDirectory = {
  name: 'src',
  children: [
    { name: 'about.ts', content: 'export const me = {};', originalContent: 'export const me = {};', language: 'typescript' },
  ],
};

describe('Misc commands', () => {
  let interpreter: CommandInterpreter;
  let vfs: VirtualFileSystem;

  beforeEach(() => {
    vfs = new VirtualFileSystem(mockFs);
    interpreter = new CommandInterpreter(vfs);
    registerMiscCommands(interpreter.getRegistry());
  });

  describe('help', () => {
    it('lists all registered commands', () => {
      // Register other commands so help has something to list
      registerFilesystemCommands(interpreter.getRegistry());
      registerGitCommands(interpreter.getRegistry());
      registerNpmCommands(interpreter.getRegistry());

      const result = interpreter.execute('help');
      expect(result.isError).toBeFalsy();
      expect(result.text).toContain('help');
      expect(result.text).toContain('ls');
      expect(result.text).toContain('git');
      expect(result.text).toContain('npm');
    });

    it('shows command descriptions', () => {
      const result = interpreter.execute('help');
      // help itself should be listed with a description
      expect(result.text).toContain('help');
    });
  });

  describe('clear', () => {
    it('returns a special clear signal', () => {
      const result = interpreter.execute('clear');
      expect(result.text).toBe('');
      expect(result.clear).toBe(true);
    });
  });

  describe('whoami', () => {
    it('returns name and title', () => {
      const result = interpreter.execute('whoami');
      expect(result.isError).toBeFalsy();
      expect(result.text.length).toBeGreaterThan(0);
    });
  });

  describe('theme', () => {
    it('returns error when no theme name given', () => {
      const result = interpreter.execute('theme');
      expect(result.isError).toBe(true);
    });

    it('returns success message for valid theme name', () => {
      const result = interpreter.execute('theme vscode-dark');
      expect(result.isError).toBeFalsy();
      expect(result.text).toContain('vscode-dark');
    });

    it('returns error for unknown theme', () => {
      const result = interpreter.execute('theme nonexistent');
      expect(result.isError).toBe(true);
    });
  });
});
