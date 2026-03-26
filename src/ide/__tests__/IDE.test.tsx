import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IDEProvider } from '../IDEProvider';
import { IDE } from '../IDE';

const renderIDE = () =>
  render(
    <IDEProvider>
      <IDE />
    </IDEProvider>,
  );

describe('IDE shell', () => {
  it('renders the title bar', () => {
    renderIDE();
    expect(screen.getByTestId('titlebar')).toBeInTheDocument();
  });

  it('renders the activity bar with explorer icon', () => {
    renderIDE();
    expect(screen.getByTestId('activitybar')).toBeInTheDocument();
  });

  it('renders the status bar with branch name', () => {
    renderIDE();
    expect(screen.getByTestId('statusbar')).toBeInTheDocument();
    expect(screen.getByText(/main/)).toBeInTheDocument();
  });

  it('renders the sidebar area', () => {
    renderIDE();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('renders the editor area', () => {
    renderIDE();
    expect(screen.getByTestId('editor-area')).toBeInTheDocument();
  });

  it('renders the panel area', () => {
    renderIDE();
    expect(screen.getByTestId('panel-area')).toBeInTheDocument();
  });
});
