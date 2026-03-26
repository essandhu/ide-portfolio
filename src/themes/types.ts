import type { editor } from 'monaco-editor';

export interface IDETheme {
  id: string;
  name: string;
  type: 'dark' | 'light';
  cssVars: Record<string, string>;
  monacoTheme: editor.IStandaloneThemeData;
  terminalTheme?: Record<string, string>;
}
