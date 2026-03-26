import { vscodeDark } from './vscode-dark';
import { monokaiPro } from './monokai-pro';
import { oneDarkPro } from './one-dark-pro';
import { githubLight } from './github-light';
import type { IDETheme } from './types';

export const themes: Record<string, IDETheme> = {
  'vscode-dark': vscodeDark,
  'monokai-pro': monokaiPro,
  'one-dark-pro': oneDarkPro,
  'github-light': githubLight,
};

export const defaultThemeId = 'vscode-dark';
export type { IDETheme };
