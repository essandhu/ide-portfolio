import { useState, useCallback, useEffect } from 'react';
import { useIDE } from './useIDE';
import { TitleBar } from './titlebar/TitleBar';
import { MenuBar } from './menubar/MenuBar';
import { ActivityBar } from './activitybar/ActivityBar';
import { StatusBar } from './statusbar/StatusBar';
import { FileTree } from './sidebar/FileTree';
import { ChatPanel } from './sidebar/ChatPanel';
import { TabBar } from './editor/TabBar';
import { Breadcrumbs } from './editor/Breadcrumbs';
import { EditorPane } from './editor/EditorPane';
import { PanelArea } from './panels/PanelArea';
import { CommandPalette } from './CommandPalette';
import { QuickOpen } from './quickopen/QuickOpen';
import { SearchPanel } from './sidebar/SearchPanel';
import { OutlinePanel } from './sidebar/OutlinePanel';
import { PortfolioPanel } from './sidebar/PortfolioPanel';
import { Splitter } from './Splitter';
import styles from './IDE.module.css';

export function IDE() {
  const {
    theme,
    sidebarPanel,
    sidebarVisible,
    toggleSidebar,
    activeFile,
    closeTab,
    togglePreview,
    isPreviewable,
    quickOpenVisible,
    setQuickOpenVisible,
  } = useIDE();
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

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;

      if (mod && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
        return;
      }

      if (mod && !e.shiftKey && e.key === 'p') {
        e.preventDefault();
        setQuickOpenVisible(!quickOpenVisible);
        return;
      }

      if (mod && !e.shiftKey && e.key === 'b') {
        e.preventDefault();
        toggleSidebar();
        return;
      }

      if (mod && e.shiftKey && (e.key === 'V' || e.key === 'v')) {
        e.preventDefault();
        if (activeFile && isPreviewable(activeFile)) {
          togglePreview(activeFile);
        }
        return;
      }

      if (mod && !e.shiftKey && e.key === 'w') {
        e.preventDefault();
        if (activeFile) {
          closeTab(activeFile);
        }
        return;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quickOpenVisible, activeFile, toggleSidebar, togglePreview, isPreviewable, closeTab, setQuickOpenVisible]);

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
        return <SearchPanel />;
      case 'outline':
        return <OutlinePanel />;
      case 'portfolio':
        return <PortfolioPanel />;
      case 'chat':
        return <ChatPanel />;
      default:
        return <FileTree />;
    }
  };

  return (
    <div className={styles.ide}>
      <TitleBar />
      <MenuBar />
      <div className={styles.main}>
        <ActivityBar />
        {sidebarVisible && (
          <>
            <div
              className={styles.sidebar}
              data-testid="sidebar"
              style={{ width: `${sidebarWidth}px` }}
            >
              {renderSidebar()}
            </div>
            <Splitter direction="horizontal" onResize={handleSidebarResize} />
          </>
        )}
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
      {quickOpenVisible && <QuickOpen onClose={() => setQuickOpenVisible(false)} />}
    </div>
  );
}
