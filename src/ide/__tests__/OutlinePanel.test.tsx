import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IDEProvider } from '../IDEProvider';
import { OutlinePanel } from '../sidebar/OutlinePanel';
import { useIDE } from '../useIDE';
import { useEffect } from 'react';
import { profile, projectPath } from '../../config/profile';

function OpenFileHelper({ path }: { path: string }) {
  const { openFile } = useIDE();
  useEffect(() => {
    openFile(path);
  }, []);
  return null;
}

function renderOutlinePanel(filePath?: string) {
  return render(
    <IDEProvider skipWelcome>
      {filePath && <OpenFileHelper path={filePath} />}
      <OutlinePanel />
    </IDEProvider>,
  );
}

describe('OutlinePanel', () => {
  it('shows empty state when no file is open', () => {
    renderOutlinePanel();
    expect(screen.getByText('No symbols found in document.')).toBeInTheDocument();
  });

  it('shows semantic outline for a project file', () => {
    renderOutlinePanel(projectPath(0));
    const projectName = profile.projects[0]?.name ?? 'Project Alpha';
    expect(screen.getByText(projectName)).toBeInTheDocument();
    expect(screen.getByText(/Stack/)).toBeInTheDocument();
  });

  it('shows semantic outline for skills file', () => {
    renderOutlinePanel('/src/skills.ts');
    const categories = [...new Set(profile.skills.map((s) => s.category))];
    for (const cat of categories) {
      expect(screen.getByText(new RegExp(cat))).toBeInTheDocument();
    }
  });
});
