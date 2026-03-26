import Editor from '@monaco-editor/react';
import { useIDE } from '../useIDE';

interface MonacoWrapperProps {
  path: string;
  value: string;
  language: string;
}

export default function MonacoWrapper({ path, value, language }: MonacoWrapperProps) {
  const { theme, font } = useIDE();

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
    />
  );
}
