import { useState, useCallback, useEffect } from 'react';
import { useIDE } from './useIDE';
import { TitleBar } from './titlebar/TitleBar';
import { ActivityBar } from './activitybar/ActivityBar';
import { StatusBar } from './statusbar/StatusBar';
import { FileTree } from './sidebar/FileTree';
import { Extensions } from './sidebar/Extensions';
import { ChatPanel } from './sidebar/ChatPanel';
import { TabBar } from './editor/TabBar';
import { Breadcrumbs } from './editor/Breadcrumbs';
import { EditorPane } from './editor/EditorPane';
import { PanelArea } from './panels/PanelArea';
import { CommandPalette } from './CommandPalette';
import { Splitter } from './Splitter';
import styles from './IDE.module.css';

export function IDE() {
  const { theme, sidebarPanel } = useIDE();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [panelHeight, setPanelHeight] = useState(200);

  // Apply theme CSS variables to document root
  useEffect(() => {
    const root = document.documentElement;
    for (const [key, value] of Object.entries(theme.cssVars)) {
      root.style.setProperty(key, value);
    }
  }, [theme]);

  // Global keyboard shortcut for command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSidebarResize = useCallback((delta: number) => {
    setSidebarWidth((prev) => Math.max(150, Math.min(500, prev + delta)));
  }, []);

  const handlePanelResize = useCallback((delta: number) => {
    setPanelHeight((prev) => Math.max(100, Math.min(500, prev - delta)));
  }, []);

  const renderSidebar = () => {
    switch (sidebarPanel) {
      case 'explorer':
        return <FileTree />;
      case 'search':
        return (
          <div style={{ padding: '12px', color: 'var(--fg-muted)', fontSize: '13px' }}>
            <p style={{ marginBottom: '8px', fontWeight: 600, fontSize: '11px', letterSpacing: '0.5px' }}>SEARCH</p>
            <p>Search is not yet implemented. Try using the terminal:</p>
            <code style={{ display: 'block', marginTop: '8px', color: 'var(--fg-primary)' }}>cat about.ts</code>
          </div>
        );
      case 'extensions':
        return <Extensions />;
      case 'chat':
        return <ChatPanel />;
      default:
        return <FileTree />;
    }
  };

  return (
    <div className={styles.ide}>
      <TitleBar />
      <div className={styles.main}>
        <ActivityBar />
        <div
          className={styles.sidebar}
          data-testid="sidebar"
          style={{ width: `${sidebarWidth}px` }}
        >
          {renderSidebar()}
        </div>
        <Splitter direction="horizontal" onResize={handleSidebarResize} />
        <div className={styles.editorArea} data-testid="editor-area">
          <TabBar />
          <Breadcrumbs />
          <EditorPane />
        </div>
      </div>
      <Splitter direction="vertical" onResize={handlePanelResize} />
      <div
        className={styles.panelArea}
        data-testid="panel-area"
        style={{ height: `${panelHeight}px` }}
      >
        <PanelArea />
      </div>
      <StatusBar />
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
      />
    </div>
  );
}
