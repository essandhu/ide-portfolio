import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IDEProvider } from '../IDEProvider';
import { StatusBar } from '../statusbar/StatusBar';

function renderStatusBar() {
  return render(
    <IDEProvider>
      <StatusBar />
    </IDEProvider>,
  );
}

describe('StatusBar', () => {
  beforeEach(() => {
    try { localStorage.removeItem('ide-portfolio:tipDismissed'); } catch { /* noop */ }
    vi.restoreAllMocks();
  });

  it('shows keyboard tip on first visit', () => {
    renderStatusBar();
    expect(screen.getByTestId('status-tip')).toBeInTheDocument();
    expect(screen.getByText(/Ctrl\+P/)).toBeInTheDocument();
  });

  it('dismisses tip when close button is clicked', async () => {
    renderStatusBar();
    const closeBtn = screen.getByTestId('tip-dismiss');
    await userEvent.click(closeBtn);
    expect(screen.queryByTestId('status-tip')).not.toBeInTheDocument();
  });

  it('does not show tip if previously dismissed', async () => {
    // happy-dom localStorage is non-functional, so we verify via the dismiss flow:
    // render, dismiss, re-render with persistence mock
    const persistence = await import('../persistence');
    vi.spyOn(persistence, 'loadPreference').mockImplementation((key: string) => {
      if (key === 'tipDismissed') return 'true';
      return undefined;
    });
    renderStatusBar();
    expect(screen.queryByTestId('status-tip')).not.toBeInTheDocument();
  });
});
