import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useIDE } from '../useIDE';
import styles from './SearchPanel.module.css';

interface SearchResult {
  filePath: string;
  fileName: string;
  matches: { lineNumber: number; lineText: string }[];
}

function highlightMatch(text: string, query: string): React.ReactNode[] {
  if (!query) return [text];
  const lower = text.toLowerCase();
  const qLower = query.toLowerCase();
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let idx = lower.indexOf(qLower);
  let key = 0;

  while (idx !== -1) {
    if (idx > lastIndex) {
      parts.push(text.slice(lastIndex, idx));
    }
    parts.push(<mark key={key++}>{text.slice(idx, idx + query.length)}</mark>);
    lastIndex = idx + query.length;
    idx = lower.indexOf(qLower, lastIndex);
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export function SearchPanel() {
  const { vfs, openFile } = useIDE();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDebouncedQuery(query);
    }, 200);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query]);

  const allFiles = useMemo(() => vfs.allFiles(), [vfs]);

  const searchFiles = useCallback(
    (q: string): SearchResult[] => {
      if (!q.trim()) return [];
      const qLower = q.toLowerCase();
      const results: SearchResult[] = [];

      for (const entry of allFiles) {
        const lines = entry.file.content.split('\n');
        const matches: { lineNumber: number; lineText: string }[] = [];

        for (let i = 0; i < lines.length; i++) {
          if (lines[i].toLowerCase().includes(qLower)) {
            matches.push({ lineNumber: i + 1, lineText: lines[i] });
          }
        }

        if (matches.length > 0) {
          const parts = entry.path.split('/');
          results.push({
            filePath: entry.path,
            fileName: parts.pop() ?? entry.path,
            matches,
          });
        }
      }

      return results;
    },
    [allFiles],
  );

  const results = useMemo(
    () => searchFiles(debouncedQuery),
    [debouncedQuery, searchFiles],
  );

  const showNoResults = debouncedQuery.trim().length > 0 && results.length === 0;

  return (
    <div className={styles.panel}>
      <div className={styles.header}>SEARCH</div>
      <input
        className={styles.input}
        placeholder="Search portfolio..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <div className={styles.results} data-testid="search-results">
        {results.map(result => (
          <div key={result.filePath} className={styles.fileGroup}>
            <div
              className={styles.fileName}
              onClick={() => openFile(result.filePath)}
            >
              {result.fileName}
            </div>
            {result.matches.map((match, i) => (
              <div
                key={i}
                className={styles.matchLine}
                onClick={() => openFile(result.filePath)}
              >
                <span className={styles.lineNumber}>{match.lineNumber}</span>
                <span className={styles.matchText}>
                  {highlightMatch(match.lineText, debouncedQuery)}
                </span>
              </div>
            ))}
          </div>
        ))}
        {showNoResults && (
          <div className={styles.noResults}>No results found</div>
        )}
      </div>
    </div>
  );
}
