import type { SkillData } from './previewRegistry';
import styles from './Preview.module.css';

interface SkillPreviewProps {
  data: SkillData[];
}

export function SkillPreview({ data }: SkillPreviewProps) {
  const grouped = data.reduce<Record<string, SkillData[]>>((acc, skill) => {
    const cat = skill.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <div data-testid="skill-preview">
      {Object.entries(grouped).map(([category, skills]) => (
        <div key={category}>
          <div className={styles.sectionLabel}>{category}</div>
          <div className={styles.skillGrid}>
            {skills.map((skill) => (
              <div key={skill.name} className={styles.skillCard}>
                <span className={styles.skillName}>{skill.name}</span>
                <div className={styles.proficiency}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={`${styles.profDot} ${i < skill.proficiency ? styles.filled : ''}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
