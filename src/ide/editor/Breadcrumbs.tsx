import { useIDE } from '../useIDE';
import styles from './Breadcrumbs.module.css';

export function Breadcrumbs() {
  const { activeFile } = useIDE();

  const segments = activeFile
    ? activeFile.split('/').filter((s) => s !== '')
    : [];

  return (
    <div className={styles.breadcrumbs} data-testid="breadcrumbs">
      {segments.map((segment, index) => (
        <span key={index} className={styles.segment}>
          {index > 0 && <span className={styles.separator}>›</span>}
          <span className={styles.label}>{segment}</span>
        </span>
      ))}
    </div>
  );
}
