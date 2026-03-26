import { useIDE } from '../useIDE';
import type { SidebarPanel } from '../IDEProvider';
import styles from './ActivityBar.module.css';

interface ActivityItem {
  id: SidebarPanel;
  label: string;
  icon: string;
}

const items: ActivityItem[] = [
  { id: 'explorer', label: 'Explorer', icon: '📁' },
  { id: 'search', label: 'Search', icon: '🔍' },
  { id: 'extensions', label: 'Extensions', icon: '🧩' },
  { id: 'chat', label: 'Chat', icon: '💬' },
];

export function ActivityBar() {
  const { sidebarPanel, setSidebarPanel } = useIDE();

  return (
    <div className={styles.activitybar} data-testid="activitybar">
      {items.map((item) => (
        <button
          key={item.id}
          className={`${styles.item} ${sidebarPanel === item.id ? styles.active : ''}`}
          onClick={() => setSidebarPanel(item.id)}
          title={item.label}
          aria-label={item.label}
        >
          <span className={styles.icon}>{item.icon}</span>
        </button>
      ))}
    </div>
  );
}
