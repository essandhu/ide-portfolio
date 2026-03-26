import { describe, it, expect, beforeEach } from 'vitest';
import { savePreference, loadPreference } from '../persistence';

function createMockStorage(): { getItem: (key: string) => string | null; setItem: (key: string, value: string) => void } {
  const store = new Map<string, string>();
  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => store.set(key, value),
  };
}

describe('persistence', () => {
  it('saves theme preference', () => {
    const storage = createMockStorage();
    savePreference('theme', 'monokai-pro', storage);
    expect(loadPreference('theme', undefined, storage)).toBe('monokai-pro');
  });

  it('saves font preference', () => {
    const storage = createMockStorage();
    savePreference('font', 'Fira Code', storage);
    expect(loadPreference('font', undefined, storage)).toBe('Fira Code');
  });

  it('returns default when nothing saved', () => {
    const storage = createMockStorage();
    expect(loadPreference('theme', 'vscode-dark', storage)).toBe('vscode-dark');
  });

  it('returns undefined when nothing saved and no default', () => {
    const storage = createMockStorage();
    expect(loadPreference('theme', undefined, storage)).toBeUndefined();
  });

  it('overwrites previous value', () => {
    const storage = createMockStorage();
    savePreference('theme', 'monokai-pro', storage);
    savePreference('theme', 'github-light', storage);
    expect(loadPreference('theme', undefined, storage)).toBe('github-light');
  });
});
