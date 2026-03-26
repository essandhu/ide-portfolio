import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IDEProvider } from '../IDEProvider';
import { Problems } from '../panels/Problems';

describe('Problems panel', () => {
  it('shows empty message when no diagnostics', () => {
    render(
      <IDEProvider>
        <Problems />
      </IDEProvider>,
    );
    expect(screen.getByText(/no problems/i)).toBeInTheDocument();
  });

  it('renders the problems container', () => {
    render(
      <IDEProvider>
        <Problems />
      </IDEProvider>,
    );
    expect(screen.getByTestId('problems-container')).toBeInTheDocument();
  });
});
