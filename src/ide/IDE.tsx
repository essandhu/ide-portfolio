import { TitleBar } from './titlebar/TitleBar';
import { ActivityBar } from './activitybar/ActivityBar';
import { StatusBar } from './statusbar/StatusBar';
import styles from './IDE.module.css';

export function IDE() {
  return (
    <div className={styles.ide}>
      <TitleBar />
      <div className={styles.main}>
        <ActivityBar />
        <div className={styles.sidebar} data-testid="sidebar">
          {/* SidePanel will go here */}
        </div>
        <div className={styles.editorArea} data-testid="editor-area">
          {/* TabBar, Breadcrumbs, EditorPane will go here */}
        </div>
      </div>
      <div className={styles.panelArea} data-testid="panel-area">
        {/* Terminal, Problems, Output will go here */}
      </div>
      <StatusBar />
    </div>
  );
}
