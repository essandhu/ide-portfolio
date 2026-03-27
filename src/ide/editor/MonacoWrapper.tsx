import Editor, { type Monaco } from '@monaco-editor/react';
import { useCallback, useEffect, useRef } from 'react';
import { useIDE } from '../useIDE';
import type { Diagnostic } from '../IDEProvider';

interface MonacoWrapperProps {
  path: string;
  value: string;
  language: string;
}

export default function MonacoWrapper({ path, value, language }: MonacoWrapperProps) {
  const { theme, font, setDiagnostics } = useIDE();
  const monacoRef = useRef<Monaco | null>(null);

  const handleMount = useCallback(
    (_editor: unknown, monaco: Monaco) => {
      monacoRef.current = monaco;

      const updateDiagnostics = () => {
        const allMarkers = monaco.editor.getModelMarkers({});
        const mapped: Diagnostic[] = allMarkers.map((m: { resource: { path: string }; startLineNumber: number; startColumn: number; message: string; severity: number }) => ({
          file: m.resource.path,
          line: m.startLineNumber,
          column: m.startColumn,
          message: m.message,
          severity: m.severity === 8 ? 'error' as const : m.severity === 4 ? 'warning' as const : 'info' as const,
        }));
        setDiagnostics(mapped);
      };

      monaco.editor.onDidChangeMarkers(() => {
        updateDiagnostics();
      });

      // Initial check after a short delay for language service startup
      setTimeout(updateDiagnostics, 1000);
    },
    [setDiagnostics],
  );

  useEffect(() => {
    if (monacoRef.current) {
      monacoRef.current.editor.defineTheme(theme.id, theme.monacoTheme);
      monacoRef.current.editor.setTheme(theme.id);
    }
  }, [theme]);

  return (
    <Editor
      path={path}
      defaultValue={value}
      language={language}
      theme={theme.id}
      options={{
        fontFamily: font,
        fontSize: 14,
        lineNumbers: 'on',
        minimap: { enabled: true },
        scrollBeyondLastLine: false,
        readOnly: false,
        automaticLayout: true,
      }}
      beforeMount={(monaco) => {
        monaco.editor.defineTheme(theme.id, theme.monacoTheme);
      }}
      onMount={handleMount}
    />
  );
}
