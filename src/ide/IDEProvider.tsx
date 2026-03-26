import { createContext, useState, useMemo, useCallback, type ReactNode } from 'react';
import { themes, defaultThemeId, type IDETheme } from '../themes';
import { VirtualFileSystem } from '../terminal/VirtualFileSystem';
import { portfolioFs } from '../content/fileSystem';

export type SidebarPanel = 'explorer' | 'search' | 'extensions' | 'chat';
export type BottomPanel = 'terminal' | 'problems' | 'output';

export interface IDEContextValue {
  theme: IDETheme;
  setThemeId: (id: string) => void;
  font: string;
  setFont: (font: string) => void;
  openTabs: string[];
  activeFile: string | null;
  openFile: (path: string) => void;
  closeTab: (path: string) => void;
  sidebarPanel: SidebarPanel;
  setSidebarPanel: (panel: SidebarPanel) => void;
  bottomPanel: BottomPanel;
  setBottomPanel: (panel: BottomPanel) => void;
  vfs: VirtualFileSystem;
}

export const IDEContext = createContext<IDEContextValue | null>(null);

interface IDEProviderProps {
  children: ReactNode;
}

export function IDEProvider({ children }: IDEProviderProps) {
  const [themeId, setThemeIdState] = useState(defaultThemeId);
  const [font, setFont] = useState('JetBrains Mono');
  const [openTabs, setOpenTabs] = useState<string[]>([]);
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [sidebarPanel, setSidebarPanel] = useState<SidebarPanel>('explorer');
  const [bottomPanel, setBottomPanel] = useState<BottomPanel>('terminal');

  const vfs = useMemo(() => new VirtualFileSystem(portfolioFs), []);

  const theme = themes[themeId] ?? themes[defaultThemeId];

  const setThemeId = useCallback((id: string) => {
    if (themes[id]) {
      setThemeIdState(id);
    }
  }, []);

  const openFile = useCallback((path: string) => {
    setOpenTabs((prev) => {
      if (prev.includes(path)) return prev;
      return [...prev, path];
    });
    setActiveFile(path);
  }, []);

  const closeTab = useCallback((path: string) => {
    setOpenTabs((prev) => {
      const next = prev.filter((t) => t !== path);
      return next;
    });
    setActiveFile((prev) => {
      if (prev !== path) return prev;
      // Find a new active file from the remaining tabs
      const currentTabs = openTabs.filter((t) => t !== path);
      if (currentTabs.length === 0) return null;
      const closedIndex = openTabs.indexOf(path);
      // Prefer the tab to the left, or the first remaining tab
      const newIndex = Math.min(closedIndex, currentTabs.length - 1);
      return currentTabs[newIndex] ?? null;
    });
  }, [openTabs]);

  const value = useMemo<IDEContextValue>(
    () => ({
      theme,
      setThemeId,
      font,
      setFont,
      openTabs,
      activeFile,
      openFile,
      closeTab,
      sidebarPanel,
      setSidebarPanel,
      bottomPanel,
      setBottomPanel,
      vfs,
    }),
    [
      theme,
      setThemeId,
      font,
      openTabs,
      activeFile,
      openFile,
      closeTab,
      sidebarPanel,
      bottomPanel,
      vfs,
    ],
  );

  return <IDEContext.Provider value={value}>{children}</IDEContext.Provider>;
}
