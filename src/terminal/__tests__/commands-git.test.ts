import { describe, it, expect, beforeEach } from 'vitest';
import { CommandInterpreter } from '../CommandInterpreter';
import { VirtualFileSystem } from '../VirtualFileSystem';
import { registerGitCommands } from '../commands/git';
import { profile } from '../../config/profile';
import type { VirtualDirectory } from '../VirtualFileSystem';

const mockFs: VirtualDirectory = {
  name: 'src',
  children: [
    { name: 'about.ts', content: 'export const me = {};', originalContent: 'export const me = {};', language: 'typescript' },
  ],
};

describe('Git commands', () => {
  let interpreter: CommandInterpreter;
  let vfs: VirtualFileSystem;

  beforeEach(() => {
    vfs = new VirtualFileSystem(mockFs);
    interpreter = new CommandInterpreter(vfs);
    registerGitCommands(interpreter.getRegistry());
  });

  describe('git log', () => {
    it('returns formatted career history entries', () => {
      const result = interpreter.execute('git log');
      expect(result.isError).toBeFalsy();
      expect(result.text).toContain('commit');
      expect(result.text).toContain('Author:');
      expect(result.text).toContain('Date:');
    });

    it('contains log entries matching experience count', () => {
      const result = interpreter.execute('git log');
      const commitCount = (result.text.match(/commit [a-f0-9]+/g) || []).length;
      expect(commitCount).toBe(profile.experience.length);
    });
  });

  describe('git status', () => {
    it('returns portfolio branch status', () => {
      const result = interpreter.execute('git status');
      expect(result.isError).toBeFalsy();
      expect(result.text).toContain('branch');
    });

    it('mentions the current branch name', () => {
      const result = interpreter.execute('git status');
      expect(result.text).toContain('main');
    });
  });

  describe('git (unknown subcommand)', () => {
    it('returns error for unknown git subcommand', () => {
      const result = interpreter.execute('git push');
      expect(result.isError).toBe(true);
    });

    it('returns error when git is called with no args', () => {
      const result = interpreter.execute('git');
      expect(result.isError).toBe(true);
    });
  });
});
