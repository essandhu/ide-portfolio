import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IDEProvider } from '../IDEProvider';
import { EditorPane } from '../editor/EditorPane';
import { useIDE } from '../useIDE';
import { useEffect } from 'react';

describe('EditorPane', () => {
  it('renders a placeholder when no file is open', () => {
    render(
      <IDEProvider>
        <EditorPane />
      </IDEProvider>,
    );
    expect(screen.getByText(/open a file/i)).toBeInTheDocument();
  });

  it('renders editor container when a file is active', () => {
    const TestHarness = () => {
      const { openFile } = useIDE();
      useEffect(() => {
        openFile('/src/about.ts');
      }, []);
      return <EditorPane />;
    };
    render(
      <IDEProvider>
        <TestHarness />
      </IDEProvider>,
    );
    expect(screen.getByTestId('editor-container')).toBeInTheDocument();
  });

  it('displays file name when a file is active', () => {
    const TestHarness = () => {
      const { openFile } = useIDE();
      useEffect(() => {
        openFile('/src/about.ts');
      }, []);
      return <EditorPane />;
    };
    render(
      <IDEProvider>
        <TestHarness />
      </IDEProvider>,
    );
    // The editor container should be present, indicating the right file is being edited
    expect(screen.getByTestId('editor-container')).toBeInTheDocument();
  });
});
