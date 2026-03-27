import type { RoleData } from './previewRegistry';
import styles from './Preview.module.css';

interface RolePreviewProps {
  data: RoleData;
}

export function RolePreview({ data }: RolePreviewProps) {
  return (
    <div data-testid="role-preview">
      <div className={styles.previewHeader}>
        <h2 className={styles.previewTitle}>{data.title}</h2>
        <p className={styles.previewTagline}>{data.company}</p>
      </div>

      <div className={styles.statRow}>
        {data.dateRange && (
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Duration</div>
            <div className={styles.statValue}>{data.dateRange}</div>
          </div>
        )}
        {data.location && (
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Location</div>
            <div className={styles.statValue}>{data.location}</div>
          </div>
        )}
      </div>

      {data.responsibilities.length > 0 && (
        <>
          <div className={styles.sectionLabel}>Responsibilities</div>
          <ul className={styles.highlightList}>
            {data.responsibilities.map((item, i) => (
              <li key={i} className={styles.highlightItem}>
                <span className={styles.bullet}>&#9679;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      {data.achievements.length > 0 && (
        <>
          <div className={styles.sectionLabel}>Key Achievements</div>
          <ul className={styles.highlightList}>
            {data.achievements.map((item, i) => (
              <li key={i} className={styles.highlightItem}>
                <span className={styles.bullet}>&#9679;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
