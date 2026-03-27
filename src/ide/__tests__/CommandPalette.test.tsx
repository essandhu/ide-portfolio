import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IDEProvider } from '../IDEProvider';
import { CommandPalette } from '../CommandPalette';

function renderPalette(onClose = () => {}) {
  return render(
    <IDEProvider>
      <div style={{ position: 'relative' }}>
        <CommandPalette onClose={onClose} />
      </div>
    </IDEProvider>,
  );
}

describe('CommandPalette', () => {
  it('renders the command palette', () => {
    renderPalette();
    expect(screen.getByTestId('command-palette')).toBeInTheDocument();
  });

  it('shows a search input', () => {
    renderPalette();
    expect(screen.getByPlaceholderText(/type a command/i)).toBeInTheDocument();
  });

  it('filters commands by typing', async () => {
    renderPalette();
    const input = screen.getByPlaceholderText(/type a command/i);
    await userEvent.type(input, 'theme');
    expect(screen.getByTestId('command-list').children.length).toBeGreaterThan(0);
  });

  it('calls onClose when Escape is pressed', async () => {
    const onClose = { called: false };
    renderPalette(() => { onClose.called = true; });
    await userEvent.keyboard('{Escape}');
    expect(onClose.called).toBe(true);
  });
});
