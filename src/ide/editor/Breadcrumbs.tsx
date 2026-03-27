import { useIDE } from '../useIDE';
import { WELCOME_TAB } from '../IDEProvider';
import { getPreviewType } from './previews/previewRegistry';
import styles from './Breadcrumbs.module.css';

export function Breadcrumbs() {
  const { activeFile, previewMode } = useIDE();

  const isWelcome = activeFile === WELCOME_TAB;
  const segments = activeFile && !isWelcome
    ? activeFile.split('/').filter((s) => s !== '')
    : [];

  const isPreviewing = activeFile && !!previewMode[activeFile] && !!getPreviewType(activeFile);

  return (
    <div className={styles.breadcrumbs} data-testid="breadcrumbs">
      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;
        const label = isLast && isPreviewing ? `${segment} (Preview)` : segment;
        return (
          <span key={index} className={styles.segment}>
            {index > 0 && <span className={styles.separator}>›</span>}
            <span className={styles.label}>{label}</span>
          </span>
        );
      })}
    </div>
  );
}
