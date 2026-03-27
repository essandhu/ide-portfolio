import { Suspense, lazy } from 'react';
import { useIDE } from '../useIDE';
import {
  getPreviewType,
  parseProjectData,
  parseSkillsData,
  parseRoleData,
} from './previews/previewRegistry';
import { ProjectPreview } from './previews/ProjectPreview';
import { SkillPreview } from './previews/SkillPreview';
import { RolePreview } from './previews/RolePreview';
import styles from './previews/Preview.module.css';
import editorStyles from './EditorPane.module.css';

const MonacoEditor = lazy(() => import('./MonacoWrapper'));

interface PreviewPaneProps {
  path: string;
  content: string;
  language: string;
}

export function PreviewPane({ path, content, language }: PreviewPaneProps) {
  const { previewMode } = useIDE();
  const isPreviewing = !!previewMode[path];
  const previewType = getPreviewType(path);

  const renderPreview = () => {
    if (!previewType) return null;
    switch (previewType) {
      case 'project':
        return <ProjectPreview data={parseProjectData(content)} />;
      case 'skills':
        return <SkillPreview data={parseSkillsData(content)} />;
      case 'role':
        return <RolePreview data={parseRoleData(content)} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.previewContainer} data-testid="preview-pane">
      <div
        className={`${styles.sourceView} ${isPreviewing ? styles.hidden : ''}`}
        data-testid="source-view"
      >
        <Suspense fallback={<div className={editorStyles.loading}>Loading editor...</div>}>
          <MonacoEditor path={path} value={content} language={language} />
        </Suspense>
      </div>
      {previewType && (
        <div
          className={`${styles.previewView} ${isPreviewing ? styles.visible : ''}`}
          data-testid="preview-view"
        >
          {renderPreview()}
        </div>
      )}
    </div>
  );
}
