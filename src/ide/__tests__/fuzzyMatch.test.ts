import { describe, it, expect } from 'vitest';
import { fuzzyMatchFiles } from '../quickopen/fuzzyMatch';

describe('fuzzyMatchFiles', () => {
  const files = [
    'src/about.ts',
    'src/skills.ts',
    'src/contact.ts',
    'src/projects/project-alpha.tsx',
    'src/projects/project-beta.tsx',
  ];

  it('returns all files when query is empty', () => {
    expect(fuzzyMatchFiles('', files)).toEqual(files);
  });

  it('ranks exact filename match first', () => {
    const result = fuzzyMatchFiles('about.ts', files);
    expect(result[0]).toBe('src/about.ts');
  });

  it('matches partial filename', () => {
    const result = fuzzyMatchFiles('skill', files);
    expect(result).toContain('src/skills.ts');
  });

  it('returns empty array when nothing matches', () => {
    const result = fuzzyMatchFiles('zzzzz', files);
    expect(result).toEqual([]);
  });

  it('is case insensitive', () => {
    const result = fuzzyMatchFiles('ABOUT', files);
    expect(result).toContain('src/about.ts');
  });
});
