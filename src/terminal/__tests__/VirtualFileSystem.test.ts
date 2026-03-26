import { describe, it, expect, beforeEach } from 'vitest';
import { VirtualFileSystem } from '../VirtualFileSystem';
import type { VirtualDirectory } from '../VirtualFileSystem';

const mockFs: VirtualDirectory = {
  name: 'src',
  children: [
    { name: 'about.ts', content: 'export const me = {};', originalContent: 'export const me = {};', language: 'typescript' },
    {
      name: 'projects',
      children: [
        { name: 'alpha.tsx', content: '<Alpha />', originalContent: '<Alpha />', language: 'typescriptreact' },
      ],
    },
  ],
};

describe('VirtualFileSystem', () => {
  let vfs: VirtualFileSystem;

  beforeEach(() => {
    vfs = new VirtualFileSystem(mockFs);
  });

  it('starts at root directory', () => {
    expect(vfs.cwd()).toBe('/src');
  });

  it('lists files and directories at current path', () => {
    const entries = vfs.ls();
    expect(entries.map(e => e.name)).toEqual(['about.ts', 'projects']);
  });

  it('changes directory with relative path', () => {
    vfs.cd('projects');
    expect(vfs.cwd()).toBe('/src/projects');
  });

  it('changes directory with absolute path', () => {
    vfs.cd('/src/projects');
    expect(vfs.cwd()).toBe('/src/projects');
  });

  it('navigates up with ..', () => {
    vfs.cd('projects');
    vfs.cd('..');
    expect(vfs.cwd()).toBe('/src');
  });

  it('reads file content by path', () => {
    const file = vfs.readFile('about.ts');
    expect(file?.content).toBe('export const me = {};');
  });

  it('reads file content by nested path', () => {
    const file = vfs.readFile('projects/alpha.tsx');
    expect(file?.content).toBe('<Alpha />');
  });

  it('returns null for non-existent file', () => {
    expect(vfs.readFile('nonexistent.ts')).toBeNull();
  });

  it('throws on cd to non-existent directory', () => {
    expect(() => vfs.cd('nonexistent')).toThrow();
  });

  it('throws on cd to a file', () => {
    expect(() => vfs.cd('about.ts')).toThrow();
  });

  it('resolves path to get file by absolute path', () => {
    const file = vfs.readFile('/src/projects/alpha.tsx');
    expect(file?.content).toBe('<Alpha />');
  });

  it('lists entries at a given path without changing cwd', () => {
    const entries = vfs.ls('projects');
    expect(entries.map(e => e.name)).toEqual(['alpha.tsx']);
    expect(vfs.cwd()).toBe('/src');
  });

  it('returns flat list of all files', () => {
    const allFiles = vfs.allFiles();
    expect(allFiles).toHaveLength(2);
    expect(allFiles.map(f => f.path)).toContain('/src/about.ts');
    expect(allFiles.map(f => f.path)).toContain('/src/projects/alpha.tsx');
  });
});
