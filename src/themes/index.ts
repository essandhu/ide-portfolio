import { vscodeDark } from './vscode-dark';
import type { IDETheme } from './types';

export const themes: Record<string, IDETheme> = {
  'vscode-dark': vscodeDark,
};

export const defaultThemeId = 'vscode-dark';
export type { IDETheme };
