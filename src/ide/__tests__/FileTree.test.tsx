import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IDEProvider } from '../IDEProvider';
import { FileTree } from '../sidebar/FileTree';
import { useIDE } from '../useIDE';
import { projectPath } from '../../config/profile';

const renderFileTree = () =>
  render(
    <IDEProvider>
      <FileTree />
    </IDEProvider>,
  );

describe('FileTree', () => {
  it('renders top-level files and directories', () => {
    renderFileTree();
    expect(screen.getByText('about.ts')).toBeInTheDocument();
    expect(screen.getByText('projects')).toBeInTheDocument();
    expect(screen.getByText('experience')).toBeInTheDocument();
  });

  it('expands a directory on click', async () => {
    renderFileTree();
    const firstProjectFile = projectPath(0).split('/').pop()!;
    await userEvent.click(screen.getByText('projects'));
    expect(screen.getByText(firstProjectFile)).toBeInTheDocument();
  });

  it('collapses a directory on second click', async () => {
    renderFileTree();
    const firstProjectFile = projectPath(0).split('/').pop()!;
    await userEvent.click(screen.getByText('projects'));
    expect(screen.getByText(firstProjectFile)).toBeInTheDocument();
    await userEvent.click(screen.getByText('projects'));
    expect(screen.queryByText(firstProjectFile)).not.toBeInTheDocument();
  });

  it('opens a file in editor on click', async () => {
    const TestHarness = () => {
      const { activeFile } = useIDE();
      return (
        <>
          <FileTree />
          <div data-testid="active">{activeFile}</div>
        </>
      );
    };
    render(
      <IDEProvider>
        <TestHarness />
      </IDEProvider>,
    );
    await userEvent.click(screen.getByText('about.ts'));
    expect(screen.getByTestId('active')).toHaveTextContent('/src/about.ts');
  });

  it('shows file type icons', () => {
    renderFileTree();
    expect(screen.getByTestId('icon-about.ts')).toBeInTheDocument();
  });
});
