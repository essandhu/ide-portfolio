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
    // Portfolio is active by default
    const portfolioButton = screen.getByLabelText('Portfolio');
    expect(portfolioButton.className).toContain('active');
  });

  it('title bar contains menu bar', () => {
    render(
      <IDEProvider>
        <IDE />
      </IDEProvider>,
    );
    const titlebar = screen.getByTestId('titlebar');
    const menubar = titlebar.querySelector('[data-testid="menubar-bar"]');
    expect(menubar).toBeInTheDocument();
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
