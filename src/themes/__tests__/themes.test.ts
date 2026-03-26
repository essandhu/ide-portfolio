import { describe, it, expect } from 'vitest';
import { themes } from '../index';
import type { IDETheme } from '../types';

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

describe('Theme system', () => {
  it('has at least 4 themes registered', () => {
    expect(Object.keys(themes).length).toBeGreaterThanOrEqual(4);
  });

  for (const [id, theme] of Object.entries(themes)) {
    describe(`${theme.name} (${id})`, () => {
      it('has all required CSS variable keys', () => {
        for (const key of requiredKeys) {
          expect(theme.cssVars, `Missing ${key}`).toHaveProperty(key);
        }
      });

      it('has a valid monaco theme definition', () => {
        expect(['vs', 'vs-dark', 'hc-black', 'hc-light']).toContain(theme.monacoTheme.base);
        expect(theme.monacoTheme.inherit).toBe(true);
        expect(theme.monacoTheme.rules).toBeDefined();
        expect(theme.monacoTheme.colors).toBeDefined();
      });

      it('has required metadata', () => {
        expect(theme.id).toBe(id);
        expect(theme.name.length).toBeGreaterThan(0);
        expect(['dark', 'light']).toContain(theme.type);
      });
    });
  }
});
