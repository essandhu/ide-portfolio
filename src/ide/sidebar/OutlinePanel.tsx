import { useState } from 'react';
import { useIDE } from '../useIDE';
import {
  getPreviewType,
  parseProjectData,
  parseSkillsData,
  parseRoleData,
} from '../editor/previews/previewRegistry';
import styles from './OutlinePanel.module.css';

interface OutlineNode {
  label: string;
  count?: number;
  children?: OutlineNode[];
}

function buildOutline(path: string, source: string): OutlineNode[] | null {
  const previewType = getPreviewType(path);
  if (!previewType) return null;

  if (previewType === 'project') {
    const data = parseProjectData(source);
    return [
      {
        label: data.name,
        children: [
          { label: 'Stack', count: data.tech.length },
          { label: 'Description' },
          ...(data.url ? [{ label: 'Links' }] : []),
        ],
      },
    ];
  }

  if (previewType === 'skills') {
    const skills = parseSkillsData(source);
    const byCategory: Record<string, number> = {};
    for (const skill of skills) {
      byCategory[skill.category] = (byCategory[skill.category] ?? 0) + 1;
    }
    return [
      {
        label: 'Skills',
        children: Object.entries(byCategory).map(([cat, count]) => ({
          label: cat,
          count,
        })),
      },
    ];
  }

  if (previewType === 'role') {
    const data = parseRoleData(source);
    return [
      {
        label: `${data.title} — ${data.company}`,
        children: [
          { label: 'Responsibilities', count: data.responsibilities.length },
          { label: 'Key Achievements', count: data.achievements.length },
        ],
      },
    ];
  }

  return null;
}

function TreeItem({ node, depth = 0 }: { node: OutlineNode; depth?: number }) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <>
      <div
        className={styles.treeItem}
        style={{ paddingLeft: `${8 + depth * 16}px` }}
        onClick={() => hasChildren && setExpanded(!expanded)}
        data-testid="outline-item"
      >
        <span className={styles.chevron}>
          {hasChildren ? (expanded ? '▾' : '▸') : ''}
        </span>
        <span className={styles.label}>{node.label}</span>
        {node.count !== undefined && (
          <span className={styles.count}>({node.count})</span>
        )}
      </div>
      {hasChildren && expanded && node.children!.map((child, i) => (
        <TreeItem key={i} node={child} depth={depth + 1} />
      ))}
    </>
  );
}

export function OutlinePanel() {
  const { activeFile, vfs } = useIDE();

  let outline: OutlineNode[] | null = null;
  if (activeFile) {
    const file = vfs.readFile(activeFile);
    if (file !== null) {
      outline = buildOutline(activeFile, file.content);
    }
  }

  return (
    <div className={styles.outline} data-testid="outline-panel">
      <div className={styles.header}>OUTLINE</div>
      {outline ? (
        <div className={styles.tree}>
          {outline.map((node, i) => (
            <TreeItem key={i} node={node} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>No symbols found in document.</div>
      )}
    </div>
  );
}
