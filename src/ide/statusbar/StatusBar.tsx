import { useIDE } from '../useIDE';
import styles from './StatusBar.module.css';

export function StatusBar() {
  const { theme, font } = useIDE();

  return (
    <div className={styles.statusbar} data-testid="statusbar">
      <div className={styles.left}>
        <span className={styles.branch}>⎇ main</span>
        <span className={styles.item}>0 errors</span>
        <span className={styles.item}>0 warnings</span>
      </div>
      <div className={styles.right}>
        <span className={styles.item}>{font}</span>
        <span className={styles.item}>{theme.name}</span>
      </div>
    </div>
  );
}
