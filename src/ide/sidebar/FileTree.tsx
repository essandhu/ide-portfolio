import { useState, useCallback } from 'react';
import { useIDE } from '../useIDE';
import { portfolioFs } from '../../content/fileSystem';
import { isFile, isDirectory } from '../../terminal/VirtualFileSystem';
import type { VirtualFile, VirtualDirectory } from '../../terminal/VirtualFileSystem';
import { getPreviewType } from '../editor/previews/previewRegistry';
import styles from './FileTree.module.css';

function getFileIcon(name: string): string {
  if (name.endsWith('.tsx')) return '⚛';
  if (name.endsWith('.ts')) return 'TS';
  if (name.endsWith('.md')) return 'M↓';
  if (name.endsWith('.json')) return '{}';
  return '📄';
}

function getDirIcon(expanded: boolean): string {
  return expanded ? '📂' : '📁';
}

interface FileNodeProps {
  node: VirtualFile | VirtualDirectory;
  path: string;
  depth: number;
}

function FileNode({ node, path, depth }: FileNodeProps) {
  const { openFile } = useIDE();
  const [expanded, setExpanded] = useState(false);

  const handleClick = useCallback(() => {
    if (isFile(node)) {
      openFile(path);
    } else {
      setExpanded((prev) => !prev);
    }
  }, [node, path, openFile]);

  if (isFile(node)) {
    const hasPreview = !!getPreviewType(path);
    return (
      <div
        className={styles.entry}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={handleClick}
        role="button"
        tabIndex={0}
      >
        <span className={styles.icon} data-testid={`icon-${node.name}`}>
          {getFileIcon(node.name)}
        </span>
        <span className={styles.name}>{node.name}</span>
        {hasPreview && (
          <span className={styles.previewBadge} data-testid="preview-badge" title="Preview available">
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M7 0C3.5 0 0.5 2.5 0 5c0.5 2.5 3.5 5 7 5s6.5-2.5 7-5c-0.5-2.5-3.5-5-7-5zm0 8.5C4.5 8.5 2.5 7 2 5c0.5-2 2.5-3.5 5-3.5S11.5 3 12 5c-0.5 2-2.5 3.5-5 3.5zm0-6a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm0 4a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" fill="currentColor"/>
            </svg>
          </span>
        )}
      </div>
    );
  }

  return (
    <div>
      <div
        className={styles.entry}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={handleClick}
        role="button"
        tabIndex={0}
      >
        <span className={styles.icon}>{getDirIcon(expanded)}</span>
        <span className={styles.name}>{node.name}</span>
      </div>
      {expanded &&
        isDirectory(node) &&
        node.children.map((child) => {
          const childPath = `${path}/${child.name}`;
          return (
            <FileNode
              key={child.name}
              node={child}
              path={childPath}
              depth={depth + 1}
            />
          );
        })}
    </div>
  );
}

export function FileTree() {
  return (
    <div className={styles.fileTree}>
      {portfolioFs.children.map((child) => {
        const childPath = `/${portfolioFs.name}/${child.name}`;
        return (
          <FileNode
            key={child.name}
            node={child}
            path={childPath}
            depth={0}
          />
        );
      })}
    </div>
  );
}
