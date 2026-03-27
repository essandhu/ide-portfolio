import { useIDE } from '../useIDE';
import { WELCOME_TAB } from '../IDEProvider';
import { getPreviewType } from './previews/previewRegistry';
import { PreviewToggle } from './PreviewToggle';
import styles from './TabBar.module.css';

function getFileName(path: string): string {
  if (path === WELCOME_TAB) return 'Welcome';
  return path.split('/').pop() ?? path;
}

function getDotClass(path: string): string | null {
  if (path === WELCOME_TAB) return styles.dotWelcome;
  if (path.endsWith('.ts') || path.endsWith('.tsx')) return styles.dotTs;
  if (path.endsWith('.md')) return styles.dotMd;
  return null;
}

export function TabBar() {
  const { openTabs, activeFile, openFile, closeTab, previewMode } = useIDE();

  return (
    <div className={styles.tabbar} data-testid="tabbar">
      {openTabs.map((tab) => {
        const dotClass = getDotClass(tab);
        const isPreviewing = !!previewMode[tab] && !!getPreviewType(tab);
        const fileName = getFileName(tab);
        return (
          <div
            key={tab}
            className={`${styles.tab} ${activeFile === tab ? styles.active : ''}`}
            data-active={activeFile === tab ? 'true' : 'false'}
            onClick={() => openFile(tab)}
            role="button"
            tabIndex={0}
          >
            {dotClass && <span className={`${styles.dot} ${dotClass}`} />}
            <span className={styles.name}>
              {fileName}{isPreviewing ? ' (Preview)' : ''}
            </span>
            <button
              className={styles.close}
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab);
              }}
              aria-label="Close tab"
            >
              ×
            </button>
          </div>
        );
      })}
      {activeFile !== WELCOME_TAB && <PreviewToggle />}
    </div>
  );
}
