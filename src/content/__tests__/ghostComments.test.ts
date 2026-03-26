import { describe, it, expect } from 'vitest';
import { ghostComments } from '../ghostComments';
import type { GhostComment } from '../../terminal/VirtualFileSystem';

describe('Ghost comments', () => {
  it('exports a map of file paths to ghost comment arrays', () => {
    expect(typeof ghostComments).toBe('object');
    expect(Object.keys(ghostComments).length).toBeGreaterThan(0);
  });

  it('each entry has valid GhostComment shape', () => {
    for (const [path, comments] of Object.entries(ghostComments)) {
      expect(Array.isArray(comments), `${path} should have an array of comments`).toBe(true);
      for (const comment of comments) {
        expect(typeof comment.line).toBe('number');
        expect(comment.line).toBeGreaterThan(0);
        expect(typeof comment.text).toBe('string');
        expect(comment.text.length).toBeGreaterThan(0);
        if (comment.delay !== undefined) {
          expect(typeof comment.delay).toBe('number');
          expect(comment.delay).toBeGreaterThanOrEqual(0);
        }
      }
    }
  });

  it('has comments for about.ts', () => {
    expect(ghostComments['/src/about.ts']).toBeDefined();
    expect(ghostComments['/src/about.ts'].length).toBeGreaterThan(0);
  });

  it('comments have staggered delays', () => {
    const aboutComments = ghostComments['/src/about.ts'];
    const delays = aboutComments
      .filter((c) => c.delay !== undefined)
      .map((c) => c.delay!);
    if (delays.length > 1) {
      // At least some delays should differ (staggered appearance)
      const unique = new Set(delays);
      expect(unique.size).toBeGreaterThan(1);
    }
  });
});
