import { describe, it, expect } from 'vitest';
import { vscodeDark } from '../vscode-dark';
import type { IDETheme } from '../types';

describe('VS Code Dark theme', () => {
  it('has all required CSS variable keys', () => {
    const requiredKeys = [
      '--bg-titlebar',
      '--bg-activitybar',
      '--bg-sidebar',
      '--bg-editor',
      '--bg-panel',
      '--bg-statusbar',
      '--bg-tab-active',
      '--bg-tab-inactive',
      '--fg-primary',
      '--fg-secondary',
      '--fg-muted',
      '--accent',
      '--border',
      '--bg-hover',
      '--bg-selection',
      '--terminal-cursor',
    ];
    for (const key of requiredKeys) {
      expect(vscodeDark.cssVars).toHaveProperty(key);
    }
  });

  it('has a valid monaco theme definition', () => {
    expect(vscodeDark.monacoTheme.base).toBe('vs-dark');
    expect(vscodeDark.monacoTheme.inherit).toBe(true);
    expect(vscodeDark.monacoTheme.rules).toBeDefined();
    expect(vscodeDark.monacoTheme.colors).toBeDefined();
  });

  it('has required metadata', () => {
    expect(vscodeDark.id).toBe('vscode-dark');
    expect(vscodeDark.name).toBe('VS Code Dark');
    expect(vscodeDark.type).toBe('dark');
  });
});
