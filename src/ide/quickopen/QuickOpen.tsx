import { useState, useEffect, useRef, useMemo } from 'react';
import { useIDE } from '../useIDE';
import { fuzzyMatchFiles } from './fuzzyMatch';
import styles from './QuickOpen.module.css';

interface QuickOpenProps {
  onClose: () => void;
}

export function QuickOpen({ onClose }: QuickOpenProps) {
  const { vfs, openFile } = useIDE();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const allFilePaths = useMemo(
    () => vfs.allFiles().map(f => f.path),
    [vfs],
  );

  const filtered = useMemo(
    () => fuzzyMatchFiles(query, allFilePaths),
    [query, allFilePaths],
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filtered.length - 1));
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        openFile(filtered[selectedIndex]);
        onClose();
      }
      return;
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.container}>
        <input
          ref={inputRef}
          className={styles.input}
          placeholder="Go to File..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className={styles.results} data-testid="quickopen-results">
          {filtered.map((file, i) => {
            const parts = file.split('/');
            const fileName = parts.pop() ?? '';
            const dirPath = parts.join('/');
            return (
              <div
                key={file}
                className={`${styles.result} ${i === selectedIndex ? styles.resultSelected : ''}`}
                onClick={() => {
                  openFile(file);
                  onClose();
                }}
              >
                <span className={styles.fileName}>{fileName}</span>
                <span className={styles.filePath}>{dirPath}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
