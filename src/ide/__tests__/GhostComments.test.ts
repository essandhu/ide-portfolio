import { describe, it, expect } from 'vitest';
import { createGhostDecorations } from '../editor/GhostComments';
import type { GhostComment } from '../../terminal/VirtualFileSystem';

describe('createGhostDecorations', () => {
  it('creates decorations for each ghost comment', () => {
    const comments: GhostComment[] = [
      { line: 3, text: '// Design decision: typed exports for safety' },
      { line: 7, text: '// This enables autocomplete in the portfolio' },
    ];
    const decorations = createGhostDecorations(comments);
    expect(decorations).toHaveLength(2);
    expect(decorations[0].range.startLineNumber).toBe(3);
    expect(decorations[0].options.after?.content).toContain('Design decision');
    expect(decorations[0].options.after?.inlineClassName).toContain('ghost');
  });

  it('returns empty array for no comments', () => {
    const decorations = createGhostDecorations([]);
    expect(decorations).toEqual([]);
  });

  it('includes delay as CSS custom property in inlineClassName when delay is set', () => {
    const comments: GhostComment[] = [
      { line: 1, text: '// comment', delay: 2000 },
    ];
    const decorations = createGhostDecorations(comments);
    expect(decorations[0].options.after?.inlineClassName).toContain('ghost');
  });

  it('preserves line numbers from comments', () => {
    const comments: GhostComment[] = [
      { line: 10, text: '// Line ten' },
      { line: 25, text: '// Line twenty-five' },
    ];
    const decorations = createGhostDecorations(comments);
    expect(decorations[0].range.startLineNumber).toBe(10);
    expect(decorations[1].range.startLineNumber).toBe(25);
  });
});
