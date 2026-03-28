import { createContext, useState, useMemo, useCallback, useEffect, type ReactNode } from 'react';
import { themes, defaultThemeId, type IDETheme } from '../themes';
import { VirtualFileSystem } from '../terminal/VirtualFileSystem';
import { portfolioFs } from '../content/fileSystem';
import { loadRecentFiles, saveRecentFiles, loadPreference, savePreference } from './persistence';
import { profile, projectPath, experiencePath } from '../config/profile';

export type SidebarPanel = 'explorer' | 'search' | 'outline' | 'portfolio' | 'chat';
export type BottomPanel = 'terminal' | 'problems' | 'output';

export const WELCOME_TAB = '__welcome__';

export interface Diagnostic {
  file: string;
  line: number;
  column: number;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

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
  diagnostics: Diagnostic[];
  setDiagnostics: (diagnostics: Diagnostic[]) => void;
  sidebarVisible: boolean;
  toggleSidebar: () => void;
  previewMode: Record<string, boolean>;
  togglePreview: (path: string) => void;
  isPreviewable: (path: string) => boolean;
  recentFiles: string[];
  quickOpenVisible: boolean;
  setQuickOpenVisible: (v: boolean) => void;
  paletteOpen: boolean;
  setPaletteOpen: (v: boolean) => void;
  openWelcome: () => void;
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
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [previewMode, setPreviewMode] = useState<Record<string, boolean>>({});
  const [recentFiles, setRecentFiles] = useState<string[]>(() => loadRecentFiles());
  const [quickOpenVisible, setQuickOpenVisible] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

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
    if (!path.startsWith('__')) {
      setRecentFiles(prev => {
        const next = [path, ...prev.filter(f => f !== path)].slice(0, 5);
        saveRecentFiles(next);
        return next;
      });
    }
  }, []);

  const toggleSidebar = useCallback(() => setSidebarVisible(prev => !prev), []);

  const togglePreview = useCallback((path: string) => {
    setPreviewMode(prev => ({ ...prev, [path]: !prev[path] }));
  }, []);

  const PREVIEWABLE_PATHS = [
    '/src/about.ts', '/src/skills.ts', '/src/contact.ts',
    ...profile.projects.map((_, i) => projectPath(i)),
    ...profile.experience.map((_, i) => experiencePath(i)),
  ];

  const isPreviewable = useCallback((path: string) => {
    return PREVIEWABLE_PATHS.includes(path);
  }, []);

  const openWelcome = useCallback(() => {
    setOpenTabs(prev => {
      if (prev.includes(WELCOME_TAB)) return prev;
      return [...prev, WELCOME_TAB];
    });
    setActiveFile(WELCOME_TAB);
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

  useEffect(() => {
    const hasVisited = loadPreference('hasVisited');
    if (hasVisited === undefined) {
      // Either storage is unavailable or user has never visited.
      // Try to persist the flag — if it sticks, open welcome.
      savePreference('hasVisited', 'true');
      const check = loadPreference('hasVisited');
      if (check === 'true') {
        openWelcome();
      }
    }
  }, []);

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
      diagnostics,
      setDiagnostics,
      sidebarVisible,
      toggleSidebar,
      previewMode,
      togglePreview,
      isPreviewable,
      recentFiles,
      quickOpenVisible,
      setQuickOpenVisible,
      paletteOpen,
      setPaletteOpen,
      openWelcome,
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
      diagnostics,
      sidebarVisible,
      toggleSidebar,
      previewMode,
      togglePreview,
      isPreviewable,
      recentFiles,
      quickOpenVisible,
      paletteOpen,
      openWelcome,
    ],
  );

  return <IDEContext.Provider value={value}>{children}</IDEContext.Provider>;
}
