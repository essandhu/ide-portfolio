import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IDEProvider } from '../IDEProvider';
import { QuickOpen } from '../quickopen/QuickOpen';

function renderQuickOpen(onClose = () => {}) {
  return render(
    <IDEProvider>
      <div style={{ position: 'relative' }}>
        <QuickOpen onClose={onClose} />
      </div>
    </IDEProvider>,
  );
}

describe('QuickOpen', () => {
  it('renders input with placeholder', () => {
    renderQuickOpen();
    expect(screen.getByPlaceholderText('Go to File...')).toBeInTheDocument();
  });

  it('shows file results', () => {
    renderQuickOpen();
    const results = screen.getByTestId('quickopen-results');
    expect(results.children.length).toBeGreaterThan(0);
  });

  it('filters results when typing', async () => {
    renderQuickOpen();
    const input = screen.getByPlaceholderText('Go to File...');
    const resultsBefore = screen.getByTestId('quickopen-results').children.length;
    await userEvent.type(input, 'about');
    const resultsAfter = screen.getByTestId('quickopen-results').children.length;
    expect(resultsAfter).toBeLessThan(resultsBefore);
  });

  it('calls onClose when Escape is pressed', async () => {
    const onClose = { called: false };
    renderQuickOpen(() => { onClose.called = true; });
    await userEvent.keyboard('{Escape}');
    expect(onClose.called).toBe(true);
  });
});
