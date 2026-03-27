import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect } from 'react';
import { IDEProvider } from '../IDEProvider';
import { PreviewPane } from '../editor/PreviewPane';
import { useIDE } from '../useIDE';

function PreviewPaneWithFile({
  path,
  content,
  language,
}: {
  path: string;
  content: string;
  language: string;
}) {
  const { openFile } = useIDE();
  useEffect(() => {
    openFile(path);
  }, []);
  return <PreviewPane path={path} content={content} language={language} />;
}

function PreviewPaneWithPreview({
  path,
  content,
  language,
}: {
  path: string;
  content: string;
  language: string;
}) {
  const { openFile, togglePreview } = useIDE();
  useEffect(() => {
    openFile(path);
    togglePreview(path);
  }, []);
  return <PreviewPane path={path} content={content} language={language} />;
}

const projectSource = `
export const project = {
  name: 'Test Project',
  description: 'A test project description',
  tech: ['React', 'TypeScript'],
  url: 'https://example.com',
};
`;

describe('PreviewPane', () => {
  it('shows source view by default', () => {
    render(
      <IDEProvider>
        <PreviewPaneWithFile
          path="/src/projects/test.tsx"
          content={projectSource}
          language="typescript"
        />
      </IDEProvider>,
    );
    const sourceView = screen.getByTestId('source-view');
    expect(sourceView).toBeInTheDocument();
    expect(sourceView.className).not.toContain('hidden');
  });

  it('shows preview view when preview mode is toggled', () => {
    render(
      <IDEProvider>
        <PreviewPaneWithPreview
          path="/src/projects/test.tsx"
          content={projectSource}
          language="typescript"
        />
      </IDEProvider>,
    );
    const sourceView = screen.getByTestId('source-view');
    expect(sourceView.className).toContain('hidden');

    const previewView = screen.getByTestId('preview-view');
    expect(previewView.className).toContain('visible');
  });

  it('renders project data correctly in preview', () => {
    render(
      <IDEProvider>
        <PreviewPaneWithPreview
          path="/src/projects/test.tsx"
          content={projectSource}
          language="typescript"
        />
      </IDEProvider>,
    );
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('A test project description')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('View Project')).toBeInTheDocument();
  });

  it('does not render preview view for non-previewable files', () => {
    render(
      <IDEProvider>
        <PreviewPaneWithFile
          path="/src/about.ts"
          content="export const about = {};"
          language="typescript"
        />
      </IDEProvider>,
    );
    expect(screen.queryByTestId('preview-view')).not.toBeInTheDocument();
  });
});
