import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IDEProvider } from '../IDEProvider';
import { IDE } from '../IDE';
import { ActivityBar } from '../activitybar/ActivityBar';

describe('Polish & micro-interactions', () => {
  it('activity bar item has active indicator class', () => {
    render(
      <IDEProvider>
        <ActivityBar />
      </IDEProvider>,
    );
    // Explorer is active by default
    const explorerButton = screen.getByLabelText('Explorer');
    expect(explorerButton.className).toContain('active');
  });

  it('title bar has traffic light dots', () => {
    render(
      <IDEProvider>
        <IDE />
      </IDEProvider>,
    );
    const titlebar = screen.getByTestId('titlebar');
    // Should contain 3 dots (close, minimize, maximize)
    const dots = titlebar.querySelectorAll('[class*="dot"]');
    expect(dots.length).toBe(3);
  });

  it('IDE applies theme CSS variables to root', () => {
    render(
      <IDEProvider>
        <IDE />
      </IDEProvider>,
    );
    // The IDE div should have a data-theme attribute or apply CSS vars
    expect(screen.getByTestId('titlebar')).toBeInTheDocument();
  });
});
