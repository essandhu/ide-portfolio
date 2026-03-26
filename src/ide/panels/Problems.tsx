import { useIDE } from '../useIDE';
import styles from './Problems.module.css';

export function Problems() {
  const { diagnostics } = useIDE();

  return (
    <div className={styles.problems} data-testid="problems-container">
      <div className={styles.list}>
        {diagnostics.length === 0 ? (
          <p className={styles.empty}>No problems have been detected in the workspace.</p>
        ) : (
          diagnostics.map((d, i) => (
            <div key={i} className={`${styles.item} ${d.severity === 'error' ? styles.error : styles.warning}`}>
              <span className={styles.file}>{d.file}</span>
              <span className={styles.location}>[{d.line},{d.column}]</span>
              <span className={styles.message}>{d.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
