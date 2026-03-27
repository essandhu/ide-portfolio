import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IDEProvider } from '../IDEProvider';
import { OutlinePanel } from '../sidebar/OutlinePanel';
import { useIDE } from '../useIDE';
import { useEffect } from 'react';

function OpenFileHelper({ path }: { path: string }) {
  const { openFile } = useIDE();
  useEffect(() => {
    openFile(path);
  }, []);
  return null;
}

function renderOutlinePanel(filePath?: string) {
  return render(
    <IDEProvider>
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
    renderOutlinePanel('/src/projects/project-alpha.tsx');
    expect(screen.getByText('IDE Portfolio')).toBeInTheDocument();
    expect(screen.getByText(/Stack/)).toBeInTheDocument();
  });

  it('shows semantic outline for skills file', () => {
    renderOutlinePanel('/src/skills.ts');
    expect(screen.getByText(/language/)).toBeInTheDocument();
    expect(screen.getByText(/framework/)).toBeInTheDocument();
    expect(screen.getByText(/tool/)).toBeInTheDocument();
    expect(screen.getByText(/platform/)).toBeInTheDocument();
  });
});
