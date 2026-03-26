import { describe, it, expect } from 'vitest';
import { computeDiffDecorations } from '../editor/DiffDecorations';

describe('computeDiffDecorations', () => {
  it('returns empty array when content matches original', () => {
    const result = computeDiffDecorations('hello\nworld', 'hello\nworld');
    expect(result).toEqual([]);
  });

  it('marks lines beyond original length as added', () => {
    const result = computeDiffDecorations('hello\nworld\nnew line', 'hello\nworld');
    expect(result).toContainEqual(
      expect.objectContaining({
        range: expect.objectContaining({ startLineNumber: 3, endLineNumber: 3 }),
        options: expect.objectContaining({
          linesDecorationsClassName: expect.stringContaining('added'),
        }),
      }),
    );
  });

  it('marks modified lines with blue gutter', () => {
    const result = computeDiffDecorations('hello\nchanged', 'hello\nworld');
    expect(result).toContainEqual(
      expect.objectContaining({
        range: expect.objectContaining({ startLineNumber: 2 }),
        options: expect.objectContaining({
          linesDecorationsClassName: expect.stringContaining('modified'),
        }),
      }),
    );
  });

  it('handles empty original (first line modified, rest added)', () => {
    const result = computeDiffDecorations('hello\nworld', '');
    // Line 1: '' vs 'hello' -> modified; Line 2: beyond original -> added
    expect(result).toHaveLength(2);
    expect(result[0].options.linesDecorationsClassName).toContain('modified');
    expect(result[1].options.linesDecorationsClassName).toContain('added');
  });

  it('handles content shorter than original (deleted lines not decorated)', () => {
    const result = computeDiffDecorations('hello', 'hello\nworld');
    // Only existing lines can have decorations; deleted lines aren't in current content
    expect(result).toEqual([]);
  });

  it('returns correct line numbers for multiple changes', () => {
    const original = 'line1\nline2\nline3';
    const current = 'line1\nmodified\nline3\nnew line';
    const result = computeDiffDecorations(current, original);
    // line2 -> modified (line 2)
    expect(result).toContainEqual(
      expect.objectContaining({
        range: expect.objectContaining({ startLineNumber: 2 }),
        options: expect.objectContaining({
          linesDecorationsClassName: expect.stringContaining('modified'),
        }),
      }),
    );
    // new line (line 4) is added
    expect(result).toContainEqual(
      expect.objectContaining({
        range: expect.objectContaining({ startLineNumber: 4 }),
        options: expect.objectContaining({
          linesDecorationsClassName: expect.stringContaining('added'),
        }),
      }),
    );
  });
});
