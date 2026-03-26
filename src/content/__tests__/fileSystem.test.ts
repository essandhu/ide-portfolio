import { describe, it, expect } from 'vitest';
import { portfolioFs } from '../fileSystem';
import { VirtualFileSystem } from '../../terminal/VirtualFileSystem';

describe('Portfolio file system', () => {
  it('has a root directory named src', () => {
    expect(portfolioFs.name).toBe('src');
  });

  it('contains about.ts with valid TypeScript exporting a Person type', () => {
    const vfs = new VirtualFileSystem(portfolioFs);
    const file = vfs.readFile('about.ts');
    expect(file).not.toBeNull();
    expect(file!.language).toBe('typescript');
    expect(file!.content).toContain('interface Person');
    expect(file!.content).toContain('export const');
  });

  it('contains skills.ts with skills data', () => {
    const vfs = new VirtualFileSystem(portfolioFs);
    const file = vfs.readFile('skills.ts');
    expect(file).not.toBeNull();
    expect(file!.language).toBe('typescript');
    expect(file!.content).toContain('Skill');
  });

  it('contains project files', () => {
    const vfs = new VirtualFileSystem(portfolioFs);
    const entries = vfs.ls('projects');
    expect(entries.length).toBeGreaterThanOrEqual(2);
  });

  it('contains experience files as markdown', () => {
    const vfs = new VirtualFileSystem(portfolioFs);
    const file = vfs.readFile('experience/current-role.md');
    expect(file).not.toBeNull();
    expect(file!.language).toBe('markdown');
  });

  it('has originalContent different from content for experience files (enables diff)', () => {
    const vfs = new VirtualFileSystem(portfolioFs);
    const file = vfs.readFile('experience/current-role.md');
    expect(file!.content).not.toBe(file!.originalContent);
  });

  it('contains contact.ts with contact info', () => {
    const vfs = new VirtualFileSystem(portfolioFs);
    const file = vfs.readFile('contact.ts');
    expect(file).not.toBeNull();
    expect(file!.language).toBe('typescript');
    expect(file!.content).toContain('export const');
  });

  it('contains README.md', () => {
    const vfs = new VirtualFileSystem(portfolioFs);
    const file = vfs.readFile('README.md');
    expect(file).not.toBeNull();
    expect(file!.language).toBe('markdown');
  });

  it('all TypeScript files are syntactically valid (balanced braces)', () => {
    const vfs = new VirtualFileSystem(portfolioFs);
    const tsFiles = vfs.allFiles().filter(
      (f) => f.file.language === 'typescript' || f.file.language === 'typescriptreact'
    );
    expect(tsFiles.length).toBeGreaterThan(0);
    for (const { file, path } of tsFiles) {
      const opens = (file.content.match(/{/g) || []).length;
      const closes = (file.content.match(/}/g) || []).length;
      expect(opens, `Unbalanced braces in ${path}`).toBe(closes);
    }
  });

  it('all files have non-empty content', () => {
    const vfs = new VirtualFileSystem(portfolioFs);
    const allFiles = vfs.allFiles();
    for (const { file, path } of allFiles) {
      expect(file.content.length, `Empty content in ${path}`).toBeGreaterThan(0);
    }
  });

  it('projects have index.ts barrel export', () => {
    const vfs = new VirtualFileSystem(portfolioFs);
    const file = vfs.readFile('projects/index.ts');
    expect(file).not.toBeNull();
    expect(file!.content).toContain('export');
  });
});
