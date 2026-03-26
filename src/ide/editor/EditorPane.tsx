import { Suspense, lazy } from 'react';
import { useIDE } from '../useIDE';
import styles from './EditorPane.module.css';

const MonacoEditor = lazy(() => import('./MonacoWrapper'));

export function EditorPane() {
  const { activeFile, vfs } = useIDE();

  if (!activeFile) {
    return (
      <div className={styles.placeholder}>
        <p>Open a file from the sidebar to get started</p>
      </div>
    );
  }

  const file = vfs.readFile(activeFile);

  return (
    <div className={styles.editorContainer} data-testid="editor-container">
      <Suspense fallback={<div className={styles.loading}>Loading editor...</div>}>
        <MonacoEditor
          path={activeFile}
          value={file?.content ?? ''}
          language={file?.language ?? 'plaintext'}
        />
      </Suspense>
    </div>
  );
}
