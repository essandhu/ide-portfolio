import styles from './Problems.module.css';

export function Problems() {
  return (
    <div className={styles.problems} data-testid="problems-container">
      <div className={styles.summary}>
        <span>0 Errors</span>
        <span>0 Warnings</span>
      </div>
      <div className={styles.list}>
        <p className={styles.empty}>No problems have been detected in the workspace.</p>
      </div>
    </div>
  );
}
