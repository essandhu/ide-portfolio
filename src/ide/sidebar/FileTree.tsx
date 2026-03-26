import { useState, useCallback } from 'react';
import { useIDE } from '../useIDE';
import { portfolioFs } from '../../content/fileSystem';
import { isFile, isDirectory } from '../../terminal/VirtualFileSystem';
import type { VirtualFile, VirtualDirectory } from '../../terminal/VirtualFileSystem';
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
