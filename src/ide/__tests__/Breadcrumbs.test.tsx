import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IDEProvider } from '../IDEProvider';
import { Breadcrumbs } from '../editor/Breadcrumbs';
import { useIDE } from '../useIDE';
import { useEffect } from 'react';
import { projectPath } from '../../config/profile';

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
      <IDEProvider skipWelcome>
        <WithActiveFile file={projectPath(0)}>
          <Breadcrumbs />
        </WithActiveFile>
      </IDEProvider>,
    );
    expect(screen.getByText('src')).toBeInTheDocument();
    expect(screen.getByText('projects')).toBeInTheDocument();
    // Project files auto-preview, so the breadcrumb includes "(Preview)" suffix
    const fileName = projectPath(0).split('/').pop()!;
    expect(screen.getByText(new RegExp(`^${fileName}`))).toBeInTheDocument();
  });

  it('shows nothing when no file is active', () => {
    render(
      <IDEProvider skipWelcome>
        <Breadcrumbs />
      </IDEProvider>,
    );
    expect(screen.getByTestId('breadcrumbs').children).toHaveLength(0);
  });

  it('renders separator between segments', () => {
    render(
      <IDEProvider skipWelcome>
        <WithActiveFile file="/src/about.ts">
          <Breadcrumbs />
        </WithActiveFile>
      </IDEProvider>,
    );
    const separators = screen.getAllByText('›');
    expect(separators.length).toBeGreaterThan(0);
  });
});
