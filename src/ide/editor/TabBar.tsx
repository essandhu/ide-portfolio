import { useIDE } from '../useIDE';
import styles from './TabBar.module.css';

function getFileName(path: string): string {
  return path.split('/').pop() ?? path;
}

export function TabBar() {
  const { openTabs, activeFile, openFile, closeTab } = useIDE();

  return (
    <div className={styles.tabbar} data-testid="tabbar">
      {openTabs.map((tab) => (
        <div
          key={tab}
          className={`${styles.tab} ${activeFile === tab ? styles.active : ''}`}
          data-active={activeFile === tab ? 'true' : 'false'}
          onClick={() => openFile(tab)}
          role="button"
          tabIndex={0}
        >
          <span className={styles.name}>{getFileName(tab)}</span>
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
      ))}
    </div>
  );
}
