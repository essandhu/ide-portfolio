import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IDEProvider } from '../IDEProvider';
import { CommandPalette } from '../CommandPalette';

describe('CommandPalette', () => {
  it('is hidden by default', () => {
    render(
      <IDEProvider>
        <CommandPalette />
      </IDEProvider>,
    );
    expect(screen.queryByTestId('command-palette')).not.toBeInTheDocument();
  });

  it('opens when open prop is true', () => {
    render(
      <IDEProvider>
        <CommandPalette open onClose={() => {}} />
      </IDEProvider>,
    );
    expect(screen.getByTestId('command-palette')).toBeInTheDocument();
  });

  it('shows a search input when open', () => {
    render(
      <IDEProvider>
        <CommandPalette open onClose={() => {}} />
      </IDEProvider>,
    );
    expect(screen.getByPlaceholderText(/type a command/i)).toBeInTheDocument();
  });

  it('filters commands by typing', async () => {
    render(
      <IDEProvider>
        <CommandPalette open onClose={() => {}} />
      </IDEProvider>,
    );
    const input = screen.getByPlaceholderText(/type a command/i);
    await userEvent.type(input, 'theme');
    // Should show theme-related commands
    expect(screen.getByTestId('command-list').children.length).toBeGreaterThan(0);
  });

  it('calls onClose when Escape is pressed', async () => {
    const onClose = { called: false };
    render(
      <IDEProvider>
        <CommandPalette open onClose={() => { onClose.called = true; }} />
      </IDEProvider>,
    );
    await userEvent.keyboard('{Escape}');
    expect(onClose.called).toBe(true);
  });
});
