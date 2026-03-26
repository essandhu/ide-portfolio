import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IDEProvider } from '../IDEProvider';
import { Problems } from '../panels/Problems';

describe('Problems panel', () => {
  it('renders zero errors and zero warnings initially', () => {
    render(
      <IDEProvider>
        <Problems />
      </IDEProvider>,
    );
    expect(screen.getByText(/0 errors/i)).toBeInTheDocument();
    expect(screen.getByText(/0 warnings/i)).toBeInTheDocument();
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
