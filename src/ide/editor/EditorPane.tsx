import { useIDE } from '../useIDE';
import { WELCOME_TAB } from '../IDEProvider';
import { PreviewPane } from './PreviewPane';
import { WelcomeTab } from '../welcome/WelcomeTab';
import styles from './EditorPane.module.css';

export function EditorPane() {
  const { activeFile, vfs } = useIDE();

  if (!activeFile) {
    return (
      <div className={styles.placeholder}>
        <p>Open a file from the sidebar to get started</p>
      </div>
    );
  }

  if (activeFile === WELCOME_TAB) {
    return <WelcomeTab />;
  }

  const file = vfs.readFile(activeFile);

  return (
    <div className={styles.editorContainer} data-testid="editor-container">
      <PreviewPane
        path={activeFile}
        content={file?.content ?? ''}
        language={file?.language ?? 'plaintext'}
      />
    </div>
  );
}
