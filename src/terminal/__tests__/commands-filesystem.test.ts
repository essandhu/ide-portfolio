import { describe, it, expect, beforeEach } from 'vitest';
import { CommandInterpreter } from '../CommandInterpreter';
import { VirtualFileSystem } from '../VirtualFileSystem';
import { registerFilesystemCommands } from '../commands/filesystem';
import type { VirtualDirectory } from '../VirtualFileSystem';

const mockFs: VirtualDirectory = {
  name: 'src',
  children: [
    { name: 'about.ts', content: 'export const me = {};', originalContent: 'export const me = {};', language: 'typescript' },
    { name: 'README.md', content: '# Hello', originalContent: '# Hello', language: 'markdown' },
    {
      name: 'projects',
      children: [
        { name: 'alpha.tsx', content: '<Alpha />', originalContent: '<Alpha />', language: 'typescriptreact' },
      ],
    },
  ],
};

describe('Filesystem commands', () => {
  let interpreter: CommandInterpreter;
  let vfs: VirtualFileSystem;

  beforeEach(() => {
    vfs = new VirtualFileSystem(mockFs);
    interpreter = new CommandInterpreter(vfs);
    registerFilesystemCommands(interpreter.getRegistry());
  });

  describe('ls', () => {
    it('lists files and directories at current path', () => {
      const result = interpreter.execute('ls');
      expect(result.text).toContain('about.ts');
      expect(result.text).toContain('projects');
      expect(result.text).toContain('README.md');
    });

    it('lists files at a given path', () => {
      const result = interpreter.execute('ls projects');
      expect(result.text).toContain('alpha.tsx');
    });

    it('returns error for non-existent path', () => {
      const result = interpreter.execute('ls nonexistent');
      expect(result.isError).toBe(true);
    });
  });

  describe('cd', () => {
    it('changes directory', () => {
      interpreter.execute('cd projects');
      const result = interpreter.execute('pwd');
      expect(result.text).toContain('/src/projects');
    });

    it('returns error for non-existent directory', () => {
      const result = interpreter.execute('cd nonexistent');
      expect(result.isError).toBe(true);
    });

    it('navigates up with ..', () => {
      interpreter.execute('cd projects');
      interpreter.execute('cd ..');
      const result = interpreter.execute('pwd');
      expect(result.text).toContain('/src');
    });
  });

  describe('cat', () => {
    it('prints file content', () => {
      const result = interpreter.execute('cat about.ts');
      expect(result.text).toContain('export const me = {};');
    });

    it('prints file from nested path', () => {
      const result = interpreter.execute('cat projects/alpha.tsx');
      expect(result.text).toContain('<Alpha />');
    });

    it('returns error for non-existent file', () => {
      const result = interpreter.execute('cat nonexistent.ts');
      expect(result.isError).toBe(true);
    });

    it('returns error when no filename given', () => {
      const result = interpreter.execute('cat');
      expect(result.isError).toBe(true);
    });
  });

  describe('pwd', () => {
    it('prints current directory', () => {
      const result = interpreter.execute('pwd');
      expect(result.text).toContain('/src');
    });
  });
});
