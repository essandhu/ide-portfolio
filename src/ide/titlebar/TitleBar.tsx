import styles from './TitleBar.module.css';

export function TitleBar() {
  return (
    <div className={styles.titlebar} data-testid="titlebar">
      <div className={styles.windowControls}>
        <span className={`${styles.dot} ${styles.close}`} />
        <span className={`${styles.dot} ${styles.minimize}`} />
        <span className={`${styles.dot} ${styles.maximize}`} />
      </div>
      <div className={styles.title}>IDE Portfolio</div>
      <div className={styles.spacer} />
    </div>
  );
}
