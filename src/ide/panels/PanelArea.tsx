import { useIDE } from '../useIDE';
import type { BottomPanel } from '../IDEProvider';
import { TerminalPanel } from './TerminalPanel';
import { Problems } from './Problems';
import styles from './PanelArea.module.css';

const tabs: { id: BottomPanel; label: string }[] = [
  { id: 'terminal', label: 'Terminal' },
  { id: 'problems', label: 'Problems' },
];

export function PanelArea() {
  const { bottomPanel, setBottomPanel } = useIDE();

  return (
    <div className={styles.panelArea}>
      <div className={styles.tabHeaders}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${bottomPanel === tab.id ? styles.active : ''}`}
            data-active={bottomPanel === tab.id ? 'true' : 'false'}
            onClick={() => setBottomPanel(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.content}>
        {bottomPanel === 'terminal' && (
          <div data-testid="terminal-panel">
            <TerminalPanel />
          </div>
        )}
        {bottomPanel === 'problems' && (
          <div data-testid="problems-panel">
            <Problems />
          </div>
        )}
      </div>
    </div>
  );
}
