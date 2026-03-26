import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IDEProvider } from '../IDEProvider';
import { Extensions } from '../sidebar/Extensions';

describe('Extensions', () => {
  it('renders a list of installed extensions', () => {
    render(
      <IDEProvider>
        <Extensions />
      </IDEProvider>,
    );
    expect(screen.getByTestId('extensions-list')).toBeInTheDocument();
  });

  it('displays at least 3 extensions', () => {
    render(
      <IDEProvider>
        <Extensions />
      </IDEProvider>,
    );
    const items = screen.getAllByTestId('extension-item');
    expect(items.length).toBeGreaterThanOrEqual(3);
  });

  it('each extension has a name and publisher', () => {
    render(
      <IDEProvider>
        <Extensions />
      </IDEProvider>,
    );
    const items = screen.getAllByTestId('extension-item');
    for (const item of items) {
      expect(item.querySelector('[data-testid="extension-name"]')).toBeTruthy();
      expect(item.querySelector('[data-testid="extension-publisher"]')).toBeTruthy();
    }
  });
});
