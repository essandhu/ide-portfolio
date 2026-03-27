import { describe, it, expect } from 'vitest';
import { parseActions } from '../chatActions';

describe('parseActions', () => {
  it('extracts a single action from response text', () => {
    const response = 'Here is your file.%%ACTION%%{"action":"openFile","path":"/src/about.ts"}%%END%%';
    const result = parseActions(response);
    expect(result.text).toBe('Here is your file.');
    expect(result.actions).toEqual([{ action: 'openFile', path: '/src/about.ts' }]);
  });

  it('returns text unchanged when there are no actions', () => {
    const response = 'Just a normal response with no actions.';
    const result = parseActions(response);
    expect(result.text).toBe('Just a normal response with no actions.');
    expect(result.actions).toEqual([]);
  });

  it('handles malformed JSON gracefully', () => {
    const response = 'Some text%%ACTION%%{broken json%%END%% more text';
    const result = parseActions(response);
    expect(result.actions).toEqual([]);
    expect(result.text).toBe('Some text more text');
  });

  it('extracts multiple actions', () => {
    const response =
      'Opening files.%%ACTION%%{"action":"openFile","path":"/src/a.ts"}%%END%% %%ACTION%%{"action":"setTheme","themeId":"monokai-pro"}%%END%%';
    const result = parseActions(response);
    expect(result.text).toBe('Opening files.');
    expect(result.actions).toHaveLength(2);
    expect(result.actions[0]).toEqual({ action: 'openFile', path: '/src/a.ts' });
    expect(result.actions[1]).toEqual({ action: 'setTheme', themeId: 'monokai-pro' });
  });
});
