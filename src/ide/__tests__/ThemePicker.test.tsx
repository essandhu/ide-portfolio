import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IDEProvider } from '../IDEProvider';
import { ThemePicker } from '../statusbar/ThemePicker';
import { useIDE } from '../useIDE';

describe('ThemePicker', () => {
  it('opens dropdown on click', async () => {
    render(
      <IDEProvider>
        <ThemePicker />
      </IDEProvider>,
    );
    await userEvent.click(screen.getByTestId('theme-picker-button'));
    expect(screen.getByText('Monokai Pro')).toBeInTheDocument();
  });

  it('switches theme on selection', async () => {
    const TestHarness = () => {
      const { theme } = useIDE();
      return (
        <>
          <ThemePicker />
          <div data-testid="current">{theme.id}</div>
        </>
      );
    };
    render(
      <IDEProvider>
        <TestHarness />
      </IDEProvider>,
    );
    await userEvent.click(screen.getByTestId('theme-picker-button'));
    await userEvent.click(screen.getByText('Monokai Pro'));
    expect(screen.getByTestId('current')).toHaveTextContent('monokai-pro');
  });

  it('closes dropdown after selection', async () => {
    render(
      <IDEProvider>
        <ThemePicker />
      </IDEProvider>,
    );
    await userEvent.click(screen.getByTestId('theme-picker-button'));
    await userEvent.click(screen.getByText('Monokai Pro'));
    expect(screen.queryByText('One Dark Pro')).not.toBeInTheDocument();
  });
});
