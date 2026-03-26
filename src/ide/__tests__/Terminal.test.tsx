import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IDEProvider } from '../IDEProvider';
import { TerminalPanel } from '../panels/TerminalPanel';

describe('TerminalPanel', () => {
  it('renders terminal container', () => {
    render(
      <IDEProvider>
        <TerminalPanel />
      </IDEProvider>,
    );
    expect(screen.getByTestId('terminal-container')).toBeInTheDocument();
  });

  it('displays a welcome message', () => {
    render(
      <IDEProvider>
        <TerminalPanel />
      </IDEProvider>,
    );
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  });

  it('renders a text input for commands', () => {
    render(
      <IDEProvider>
        <TerminalPanel />
      </IDEProvider>,
    );
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('executes a command and shows output', async () => {
    render(
      <IDEProvider>
        <TerminalPanel />
      </IDEProvider>,
    );
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'pwd{Enter}');
    expect(screen.getAllByText(/\/src/).length).toBeGreaterThanOrEqual(1);
  });

  it('shows error for unknown command', async () => {
    render(
      <IDEProvider>
        <TerminalPanel />
      </IDEProvider>,
    );
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'foobar{Enter}');
    expect(screen.getByText(/command not found/)).toBeInTheDocument();
  });

  it('displays prompt with current directory', () => {
    render(
      <IDEProvider>
        <TerminalPanel />
      </IDEProvider>,
    );
    expect(screen.getByText(/visitor@portfolio/)).toBeInTheDocument();
  });
});
