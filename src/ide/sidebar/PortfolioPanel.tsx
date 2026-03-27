import { useState, useRef, useCallback, useEffect } from 'react';
import { useIDE } from '../useIDE';
import { loadPreference, savePreference } from '../persistence';
import { profile } from '../../config/profile';
import styles from './PortfolioPanel.module.css';

interface LeafItem {
  label: string;
  path: string;
  dot: string;
  tooltip: string;
}

interface PortfolioSection {
  name: string;
  items: LeafItem[];
}

const portfolioSections: PortfolioSection[] = [
  {
    name: 'Projects',
    items: [
      {
        label: profile.projects[0]?.name ?? 'Project',
        path: '/src/projects/project-alpha.tsx',
        dot: '#3b8eea',
        tooltip: profile.projects[0]?.description ?? '',
      },
      {
        label: profile.projects[1]?.name ?? 'Project',
        path: '/src/projects/project-beta.tsx',
        dot: '#3b8eea',
        tooltip: profile.projects[1]?.description ?? '',
      },
    ],
  },
  {
    name: 'Experience',
    items: [
      {
        label: `${profile.experience.current.company} \u00b7 ${profile.experience.current.title}`,
        path: '/src/experience/current-role.md',
        dot: '#4ec9b0',
        tooltip: `${profile.experience.current.period} \u00b7 ${profile.experience.current.location}`,
      },
      {
        label: `${profile.experience.previous.company} \u00b7 ${profile.experience.previous.title}`,
        path: '/src/experience/previous-role.md',
        dot: '#4ec9b0',
        tooltip: `${profile.experience.previous.period} \u00b7 ${profile.experience.previous.location}`,
      },
    ],
  },
  {
    name: 'Skills',
    items: [
      {
        label: 'All Skills',
        path: '/src/skills.ts',
        dot: '#c586c0',
        tooltip: '11 technologies across 4 categories',
      },
    ],
  },
  {
    name: 'Contact',
    items: [
      {
        label: 'Contact Info',
        path: '/src/contact.ts',
        dot: '#c586c0',
        tooltip: 'Email, GitHub, LinkedIn, website',
      },
    ],
  },
];

export { portfolioSections };

function LeafItemComponent({
  item,
  isActive,
  onClick,
}: {
  item: LeafItem;
  isActive: boolean;
  onClick: () => void;
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = useCallback(() => {
    timerRef.current = setTimeout(() => setShowTooltip(true), 400);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowTooltip(false);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      className={`${styles.leaf} ${isActive ? styles.active : ''}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid="portfolio-leaf"
    >
      <span className={styles.dot} style={{ backgroundColor: item.dot }} />
      <span className={styles.leafLabel}>{item.label}</span>
      {showTooltip && (
        <div className={styles.tooltip} data-testid="portfolio-tooltip">
          {item.tooltip}
        </div>
      )}
    </div>
  );
}

export function PortfolioPanel() {
  const { activeFile, openFile } = useIDE();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [showHint, setShowHint] = useState(() => {
    return loadPreference('portfolioHintDismissed') !== 'true';
  });

  const toggleSection = useCallback(
    (name: string) => {
      if (showHint) {
        setShowHint(false);
        savePreference('portfolioHintDismissed', 'true');
      }
      setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
    },
    [showHint],
  );

  return (
    <div className={styles.portfolio} data-testid="portfolio-panel">
      <div className={styles.header}>PORTFOLIO</div>
      {showHint && (
        <div className={styles.hint}>Click any section to explore</div>
      )}
      <div className={styles.sections}>
        {portfolioSections.map((section) => (
          <div key={section.name}>
            <div
              className={styles.sectionHeader}
              onClick={() => toggleSection(section.name)}
              data-testid="portfolio-section"
            >
              <span className={styles.chevron}>
                {expanded[section.name] ? '▾' : '▸'}
              </span>
              {section.name}
            </div>
            {expanded[section.name] &&
              section.items.map((item) => (
                <LeafItemComponent
                  key={item.path}
                  item={item}
                  isActive={activeFile === item.path}
                  onClick={() => openFile(item.path)}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
