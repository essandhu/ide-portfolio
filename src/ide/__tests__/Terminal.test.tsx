import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
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
});
