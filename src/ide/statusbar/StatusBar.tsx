import { useState } from 'react';
import { useIDE } from '../useIDE';
import { getPreviewType } from '../editor/previews/previewRegistry';
import { loadPreference, savePreference } from '../persistence';
import styles from './StatusBar.module.css';

export function StatusBar() {
  const { theme, font, diagnostics, activeFile, previewMode } = useIDE();
  const [showTip, setShowTip] = useState(() => loadPreference('tipDismissed') !== 'true');

  const errorCount = diagnostics.filter((d) => d.severity === 'error').length;
  const warningCount = diagnostics.filter((d) => d.severity === 'warning').length;
  const isPreviewing = activeFile && !!previewMode[activeFile] && !!getPreviewType(activeFile);

  const dismissTip = () => {
    setShowTip(false);
    savePreference('tipDismissed', 'true');
  };

  return (
    <div className={styles.statusbar} data-testid="statusbar">
      <div className={styles.left}>
        <span className={styles.branch}>⎇ main</span>
        <span className={styles.item}>{errorCount} error{errorCount !== 1 ? 's' : ''}</span>
        <span className={styles.item}>{warningCount} warning{warningCount !== 1 ? 's' : ''}</span>
      </div>
      {showTip && (
        <div className={styles.tip} data-testid="status-tip">
          <span className={styles.tipText}>Ctrl+P to search files &middot; Ctrl+Shift+V to preview</span>
          <button className={styles.tipDismiss} onClick={dismissTip} data-testid="tip-dismiss" aria-label="Dismiss tip">&times;</button>
        </div>
      )}
      <div className={styles.right}>
        <span className={styles.item}>{isPreviewing ? 'Preview' : font}</span>
        <span className={styles.item}>{theme.name}</span>
      </div>
    </div>
  );
}
