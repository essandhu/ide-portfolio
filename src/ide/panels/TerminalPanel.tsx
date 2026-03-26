import styles from './TerminalPanel.module.css';

export function TerminalPanel() {
  return (
    <div className={styles.terminal} data-testid="terminal-container">
      <div className={styles.welcome}>
        Welcome to IDE Portfolio. Type &apos;help&apos; for available commands.
      </div>
      <div className={styles.xtermContainer} data-testid="xterm-mount">
        {/* xterm.js will mount here at runtime via useEffect */}
      </div>
    </div>
  );
}
