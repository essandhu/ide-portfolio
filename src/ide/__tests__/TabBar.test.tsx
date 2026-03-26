import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IDEProvider } from '../IDEProvider';
import { TabBar } from '../editor/TabBar';
import { useIDE } from '../useIDE';
import { useEffect } from 'react';

function WithOpenFiles({ files, children }: { files: string[]; children: React.ReactNode }) {
  const { openFile } = useIDE();
  useEffect(() => {
    files.forEach((f) => openFile(f));
  }, []);
  return <>{children}</>;
}

const renderTabBar = (files: string[]) =>
  render(
    <IDEProvider>
      <WithOpenFiles files={files}>
        <TabBar />
      </WithOpenFiles>
    </IDEProvider>,
  );

describe('TabBar', () => {
  it('renders open tabs', () => {
    renderTabBar(['/src/about.ts', '/src/skills.ts']);
    expect(screen.getByText('about.ts')).toBeInTheDocument();
    expect(screen.getByText('skills.ts')).toBeInTheDocument();
  });

  it('highlights the active tab', () => {
    renderTabBar(['/src/about.ts', '/src/skills.ts']);
    // Last opened file is active
    const activeTab = screen.getByText('skills.ts').closest('[data-active]');
    expect(activeTab?.getAttribute('data-active')).toBe('true');
  });

  it('switches active file when clicking a tab', async () => {
    const Harness = () => {
      const { activeFile, openFile } = useIDE();
      useEffect(() => {
        openFile('/src/about.ts');
        openFile('/src/skills.ts');
      }, []);
      return (
        <>
          <TabBar />
          <div data-testid="active">{activeFile}</div>
        </>
      );
    };
    render(
      <IDEProvider>
        <Harness />
      </IDEProvider>,
    );
    await userEvent.click(screen.getByText('about.ts'));
    expect(screen.getByTestId('active')).toHaveTextContent('/src/about.ts');
  });

  it('close button removes a tab', async () => {
    renderTabBar(['/src/about.ts', '/src/skills.ts']);
    const closeButtons = screen.getAllByLabelText('Close tab');
    await userEvent.click(closeButtons[0]);
    expect(screen.queryByText('about.ts')).not.toBeInTheDocument();
  });

  it('shows nothing when no tabs are open', () => {
    render(
      <IDEProvider>
        <TabBar />
      </IDEProvider>,
    );
    expect(screen.getByTestId('tabbar').children).toHaveLength(0);
  });
});
