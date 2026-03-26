import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IDEProvider } from '../IDEProvider';
import { Breadcrumbs } from '../editor/Breadcrumbs';
import { useIDE } from '../useIDE';
import { useEffect } from 'react';

function WithActiveFile({ file, children }: { file: string; children: React.ReactNode }) {
  const { openFile } = useIDE();
  useEffect(() => {
    openFile(file);
  }, []);
  return <>{children}</>;
}

describe('Breadcrumbs', () => {
  it('renders path segments for active file', () => {
    render(
      <IDEProvider>
        <WithActiveFile file="/src/projects/project-alpha.tsx">
          <Breadcrumbs />
        </WithActiveFile>
      </IDEProvider>,
    );
    expect(screen.getByText('src')).toBeInTheDocument();
    expect(screen.getByText('projects')).toBeInTheDocument();
    expect(screen.getByText('project-alpha.tsx')).toBeInTheDocument();
  });

  it('shows nothing when no file is active', () => {
    render(
      <IDEProvider>
        <Breadcrumbs />
      </IDEProvider>,
    );
    expect(screen.getByTestId('breadcrumbs').children).toHaveLength(0);
  });

  it('renders separator between segments', () => {
    render(
      <IDEProvider>
        <WithActiveFile file="/src/about.ts">
          <Breadcrumbs />
        </WithActiveFile>
      </IDEProvider>,
    );
    const separators = screen.getAllByText('›');
    expect(separators.length).toBeGreaterThan(0);
  });
});
