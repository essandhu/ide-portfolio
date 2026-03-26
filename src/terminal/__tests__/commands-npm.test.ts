import { describe, it, expect, beforeEach } from 'vitest';
import { CommandInterpreter } from '../CommandInterpreter';
import { VirtualFileSystem } from '../VirtualFileSystem';
import { registerNpmCommands } from '../commands/npm';
import type { VirtualDirectory } from '../VirtualFileSystem';

const mockFs: VirtualDirectory = {
  name: 'src',
  children: [
    { name: 'about.ts', content: 'export const me = {};', originalContent: 'export const me = {};', language: 'typescript' },
  ],
};

describe('NPM commands', () => {
  let interpreter: CommandInterpreter;
  let vfs: VirtualFileSystem;

  beforeEach(() => {
    vfs = new VirtualFileSystem(mockFs);
    interpreter = new CommandInterpreter(vfs);
    registerNpmCommands(interpreter.getRegistry());
  });

  describe('npm run projects', () => {
    it('returns formatted project list', () => {
      const result = interpreter.execute('npm run projects');
      expect(result.isError).toBeFalsy();
      expect(result.text.length).toBeGreaterThan(0);
    });

    it('contains project names', () => {
      const result = interpreter.execute('npm run projects');
      // Should contain at least one recognizable project entry
      expect(result.text).toMatch(/\w+/);
    });
  });

  describe('npm run (no script)', () => {
    it('lists available scripts when called with no script name', () => {
      const result = interpreter.execute('npm run');
      expect(result.isError).toBeFalsy();
      expect(result.text).toContain('projects');
    });
  });

  describe('npm run (unknown script)', () => {
    it('returns error for unknown script', () => {
      const result = interpreter.execute('npm run nonexistent');
      expect(result.isError).toBe(true);
    });
  });

  describe('npm (unknown subcommand)', () => {
    it('returns error for unknown npm subcommand', () => {
      const result = interpreter.execute('npm install');
      expect(result.isError).toBe(true);
    });

    it('returns error when npm called with no args', () => {
      const result = interpreter.execute('npm');
      expect(result.isError).toBe(true);
    });
  });
});
