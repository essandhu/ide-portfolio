import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IDEProvider } from '../IDEProvider';
import { PanelArea } from '../panels/PanelArea';

const renderPanel = () =>
  render(
    <IDEProvider>
      <PanelArea />
    </IDEProvider>,
  );

describe('PanelArea', () => {
  it('renders tab headers for Terminal and Problems', () => {
    renderPanel();
    expect(screen.getByText('Terminal')).toBeInTheDocument();
    expect(screen.getByText('Problems')).toBeInTheDocument();
  });

  it('shows terminal content by default', () => {
    renderPanel();
    expect(screen.getByTestId('terminal-panel')).toBeInTheDocument();
  });

  it('switches to problems tab on click', async () => {
    renderPanel();
    await userEvent.click(screen.getByText('Problems'));
    expect(screen.getByTestId('problems-panel')).toBeInTheDocument();
  });

  it('highlights the active tab', () => {
    renderPanel();
    const terminalTab = screen.getByText('Terminal').closest('[data-active]');
    expect(terminalTab?.getAttribute('data-active')).toBe('true');
  });
});
