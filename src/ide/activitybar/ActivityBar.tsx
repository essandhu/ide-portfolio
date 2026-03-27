import { Files, Search, ListTree, Briefcase, MessageSquare } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useIDE } from '../useIDE';
import type { SidebarPanel } from '../IDEProvider';
import styles from './ActivityBar.module.css';

interface ActivityItem {
  id: SidebarPanel;
  label: string;
  icon: LucideIcon;
}

const items: ActivityItem[] = [
  { id: 'explorer', label: 'Explorer', icon: Files },
  { id: 'search', label: 'Search', icon: Search },
  { id: 'outline', label: 'Outline', icon: ListTree },
  { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
  { id: 'chat', label: 'Chat', icon: MessageSquare },
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
          <item.icon size={24} strokeWidth={1.5} />
        </button>
      ))}
    </div>
  );
}
