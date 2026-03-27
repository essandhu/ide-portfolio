import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IDEProvider } from '../IDEProvider';
import { MenuBar } from '../menubar/MenuBar';

const renderMenuBar = () =>
  render(
    <IDEProvider>
      <MenuBar />
    </IDEProvider>,
  );

describe('MenuBar', () => {
  it('renders all 4 menu labels', () => {
    renderMenuBar();
    expect(screen.getByText('File')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('View')).toBeInTheDocument();
    expect(screen.getByText('Help')).toBeInTheDocument();
  });

  it('opens File menu showing Welcome and Close Tab items', async () => {
    renderMenuBar();
    await userEvent.click(screen.getByText('File'));
    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByText('Close Tab')).toBeInTheDocument();
  });

  it('closes menu when clicking same label again', async () => {
    renderMenuBar();
    await userEvent.click(screen.getByText('File'));
    expect(screen.getByText('Welcome')).toBeInTheDocument();
    await userEvent.click(screen.getByText('File'));
    expect(screen.queryByText('Welcome')).not.toBeInTheDocument();
  });

  it('switches menus when clicking a different label', async () => {
    renderMenuBar();
    await userEvent.click(screen.getByText('File'));
    expect(screen.getByText('Welcome')).toBeInTheDocument();
    await userEvent.click(screen.getByText('Edit'));
    expect(screen.queryByText('Welcome')).not.toBeInTheDocument();
    expect(screen.getByText('Find')).toBeInTheDocument();
  });

  it('closes menu when Escape is pressed', async () => {
    renderMenuBar();
    await userEvent.click(screen.getByText('File'));
    expect(screen.getByText('Welcome')).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByText('Welcome')).not.toBeInTheDocument();
  });

  it('marks disabled items with data-disabled attribute', async () => {
    renderMenuBar();
    await userEvent.click(screen.getByText('File'));
    const newFileItem = screen.getByText('New File');
    expect(newFileItem.closest('[data-disabled="true"]')).toBeInTheDocument();
  });

  it('shows theme names in View > Theme submenu on hover', async () => {
    renderMenuBar();
    await userEvent.click(screen.getByText('View'));
    const themeItem = screen.getByText('Theme');
    await userEvent.hover(themeItem);
    expect(screen.getByText('VS Code Dark')).toBeInTheDocument();
    expect(screen.getByText('Monokai Pro')).toBeInTheDocument();
    expect(screen.getByText('One Dark Pro')).toBeInTheDocument();
    expect(screen.getByText('GitHub Light')).toBeInTheDocument();
  });
});
