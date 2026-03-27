import type { ProjectData } from './previewRegistry';
import styles from './Preview.module.css';

interface ProjectPreviewProps {
  data: ProjectData;
}

export function ProjectPreview({ data }: ProjectPreviewProps) {
  return (
    <div data-testid="project-preview">
      <div className={styles.previewHeader}>
        <h2 className={styles.previewTitle}>{data.name}</h2>
        <p className={styles.previewTagline}>{data.description}</p>
      </div>

      {data.tech.length > 0 && (
        <>
          <div className={styles.sectionLabel}>Technologies</div>
          <div className={styles.tagRow}>
            {data.tech.map((t) => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>
        </>
      )}

      {data.url && (
        <div className={styles.linkRow}>
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkBtn}
          >
            View Project
          </a>
        </div>
      )}
    </div>
  );
}
