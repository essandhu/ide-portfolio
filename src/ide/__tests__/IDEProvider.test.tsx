import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { IDEProvider, WELCOME_TAB } from '../IDEProvider';
import { useIDE } from '../useIDE';
import type { ReactNode } from 'react';

const wrapper = ({ children }: { children: ReactNode }) => (
  <IDEProvider>{children}</IDEProvider>
);

describe('IDEProvider', () => {
  it('provides default theme', () => {
    const { result } = renderHook(() => useIDE(), { wrapper });
    expect(result.current.theme.id).toBe('vscode-dark');
  });

  it('switches theme to a valid theme id', () => {
    const { result } = renderHook(() => useIDE(), { wrapper });
    // Re-setting same theme should still work
    act(() => result.current.setThemeId('vscode-dark'));
    expect(result.current.theme.id).toBe('vscode-dark');
  });

  it('keeps current theme when setting an unknown theme id', () => {
    const { result } = renderHook(() => useIDE(), { wrapper });
    act(() => result.current.setThemeId('nonexistent-theme'));
    expect(result.current.theme.id).toBe('vscode-dark');
  });

  it('tracks open tabs', () => {
    const { result } = renderHook(() => useIDE(), { wrapper });
    act(() => result.current.openFile('/src/about.ts'));
    expect(result.current.openTabs).toContain('/src/about.ts');
    expect(result.current.activeFile).toBe('/src/about.ts');
  });

  it('does not duplicate tabs when opening same file twice', () => {
    const { result } = renderHook(() => useIDE(), { wrapper });
    act(() => result.current.openFile('/src/about.ts'));
    act(() => result.current.openFile('/src/about.ts'));
    expect(result.current.openTabs.filter((t) => t === '/src/about.ts')).toHaveLength(1);
  });

  it('closes a tab', () => {
    const { result } = renderHook(() => useIDE(), { wrapper });
    act(() => result.current.openFile('/src/about.ts'));
    act(() => result.current.closeTab('/src/about.ts'));
    expect(result.current.openTabs).not.toContain('/src/about.ts');
  });

  it('sets activeFile to null when closing the only open tab', () => {
    const { result } = renderHook(() => useIDE(), { wrapper });
    act(() => result.current.openFile('/src/about.ts'));
    act(() => result.current.closeTab('/src/about.ts'));
    expect(result.current.activeFile).toBeNull();
  });

  it('switches active file to next tab when closing the active tab', () => {
    const { result } = renderHook(() => useIDE(), { wrapper });
    act(() => result.current.openFile('/src/about.ts'));
    act(() => result.current.openFile('/src/skills.ts'));
    act(() => result.current.closeTab('/src/skills.ts'));
    expect(result.current.activeFile).toBe('/src/about.ts');
  });

  it('tracks active sidebar panel', () => {
    const { result } = renderHook(() => useIDE(), { wrapper });
    expect(result.current.sidebarPanel).toBe('portfolio');
    act(() => result.current.setSidebarPanel('chat'));
    expect(result.current.sidebarPanel).toBe('chat');
  });

  it('switches font', () => {
    const { result } = renderHook(() => useIDE(), { wrapper });
    act(() => result.current.setFont('Fira Code'));
    expect(result.current.font).toBe('Fira Code');
  });

  it('provides a VFS instance', () => {
    const { result } = renderHook(() => useIDE(), { wrapper });
    expect(result.current.vfs).toBeDefined();
    expect(result.current.vfs.cwd()).toBe('/src');
  });

  it('tracks bottom panel', () => {
    const { result } = renderHook(() => useIDE(), { wrapper });
    expect(result.current.bottomPanel).toBe('terminal');
    act(() => result.current.setBottomPanel('problems'));
    expect(result.current.bottomPanel).toBe('problems');
  });

  it('sidebarVisible defaults to true', () => {
    const { result } = renderHook(() => useIDE(), { wrapper });
    expect(result.current.sidebarVisible).toBe(true);
  });

  it('toggleSidebar flips sidebarVisible', () => {
    const { result } = renderHook(() => useIDE(), { wrapper });
    act(() => result.current.toggleSidebar());
    expect(result.current.sidebarVisible).toBe(false);
    act(() => result.current.toggleSidebar());
    expect(result.current.sidebarVisible).toBe(true);
  });

  it('quickOpenVisible defaults to false', () => {
    const { result } = renderHook(() => useIDE(), { wrapper });
    expect(result.current.quickOpenVisible).toBe(false);
  });

  it('previewMode defaults to empty object', () => {
    const { result } = renderHook(() => useIDE(), { wrapper });
    expect(result.current.previewMode).toEqual({});
  });

  it('togglePreview sets per-file state', () => {
    const { result } = renderHook(() => useIDE(), { wrapper });
    act(() => result.current.togglePreview('/src/about.ts'));
    expect(result.current.previewMode['/src/about.ts']).toBe(true);
    act(() => result.current.togglePreview('/src/about.ts'));
    expect(result.current.previewMode['/src/about.ts']).toBe(false);
  });

  it('recentFiles defaults to empty', () => {
    const { result } = renderHook(() => useIDE(), { wrapper });
    expect(result.current.recentFiles).toEqual([]);
  });

  it('openFile adds to recentFiles', () => {
    const { result } = renderHook(() => useIDE(), { wrapper });
    act(() => result.current.openFile('/src/about.ts'));
    expect(result.current.recentFiles).toContain('/src/about.ts');
  });

  it('openWelcome adds __welcome__ to tabs', () => {
    const { result } = renderHook(() => useIDE(), { wrapper });
    act(() => result.current.openWelcome());
    expect(result.current.openTabs).toContain(WELCOME_TAB);
    expect(result.current.activeFile).toBe(WELCOME_TAB);
  });
});
