import { useIDE } from '../useIDE';
import { getPreviewType } from './previews/previewRegistry';
import styles from './TabBar.module.css';

export function PreviewToggle() {
  const { activeFile, previewMode, togglePreview } = useIDE();
  if (!activeFile || !getPreviewType(activeFile)) return null;
  const isPreviewing = !!previewMode[activeFile];

  return (
    <button
      className={`${styles.previewBtn} ${isPreviewing ? styles.previewActive : ''}`}
      onClick={() => togglePreview(activeFile)}
      title={isPreviewing ? 'Show source' : 'Show preview'}
      data-testid="preview-toggle"
    >
      <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
        <rect x="0.5" y="0.5" width="6" height="13" rx="1" stroke="currentColor" />
        <rect x="9.5" y="0.5" width="6" height="13" rx="1" stroke="currentColor" />
      </svg>
      <span>{isPreviewing ? 'Source' : 'Preview'}</span>
    </button>
  );
}
