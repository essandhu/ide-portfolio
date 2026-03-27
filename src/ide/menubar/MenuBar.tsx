import { useState, useEffect, useCallback, useRef } from 'react';
import { useIDE } from '../useIDE';
import { themes } from '../../themes';
import { Menu } from './Menu';
import type { MenuDefinition } from './menuData';
import { profile } from '../../config/profile';
import styles from './MenuBar.module.css';

const GITHUB_REPO_URL = profile.githubRepoUrl;

export const MenuBar = () => {
  const {
    activeFile,
    closeTab,
    openWelcome,
    openFile,
    setSidebarPanel,
    toggleSidebar,
    togglePreview,
    isPreviewable,
    theme,
    setThemeId,
    recentFiles,
    sidebarVisible,
    setQuickOpenVisible,
  } = useIDE();

  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const menus: MenuDefinition[] = [
    {
      label: 'File',
      items: [
        { id: 'file-new', label: 'New File', disabled: true },
        { id: 'file-div-1', label: '', divider: true },
        {
          id: 'file-recent',
          label: 'Open Recent',
          submenu: recentFiles.slice(0, 3).map((f) => ({
            id: `recent-${f}`,
            label: f.split('/').pop() ?? f,
            action: () => openFile(f),
          })),
        },
        { id: 'file-div-2', label: '', divider: true },
        { id: 'file-welcome', label: 'Welcome', action: openWelcome },
        { id: 'file-div-3', label: '', divider: true },
        {
          id: 'file-close',
          label: 'Close Tab',
          shortcut: '\u2318W',
          action: () => {
            if (activeFile) closeTab(activeFile);
          },
        },
      ],
    },
    {
      label: 'Edit',
      items: [
        { id: 'edit-find', label: 'Find', shortcut: '\u2318F', action: () => setSidebarPanel('search') },
        { id: 'edit-div-1', label: '', divider: true },
        { id: 'edit-copy', label: 'Copy', shortcut: '\u2318C', action: () => document.execCommand('copy') },
        { id: 'edit-select-all', label: 'Select All', shortcut: '\u2318A', action: () => document.execCommand('selectAll') },
      ],
    },
    {
      label: 'View',
      items: [
        {
          id: 'view-explorer',
          label: 'Explorer',
          shortcut: '\u2318\u21E7E',
          action: () => setSidebarPanel('explorer'),
        },
        {
          id: 'view-outline',
          label: 'Outline',
          action: () => setSidebarPanel('outline' as 'explorer'),
        },
        {
          id: 'view-portfolio',
          label: 'Portfolio',
          action: () => setSidebarPanel('portfolio' as 'explorer'),
        },
        { id: 'view-div-1', label: '', divider: true },
        {
          id: 'view-preview',
          label: 'Preview',
          shortcut: '\u2318\u21E7V',
          disabled: !activeFile || !isPreviewable(activeFile),
          action: () => {
            if (activeFile && isPreviewable(activeFile)) {
              togglePreview(activeFile);
            }
          },
        },
        { id: 'view-div-2', label: '', divider: true },
        {
          id: 'view-toggle-sidebar',
          label: 'Toggle Sidebar',
          shortcut: '\u2318B',
          action: toggleSidebar,
        },
        { id: 'view-div-3', label: '', divider: true },
        {
          id: 'view-theme',
          label: 'Theme',
          submenu: Object.values(themes).map((t) => ({
            id: `theme-${t.id}`,
            label: t.name,
            checked: t.id === theme.id,
            action: () => setThemeId(t.id),
          })),
        },
      ],
    },
    {
      label: 'Help',
      items: [
        { id: 'help-welcome', label: 'Welcome', action: openWelcome },
        { id: 'help-div-1', label: '', divider: true },
        {
          id: 'help-about',
          label: 'About this portfolio',
          action: () => openFile('/README.md'),
        },
        {
          id: 'help-source',
          label: 'View source on GitHub',
          action: () => window.open(GITHUB_REPO_URL, '_blank'),
        },
        { id: 'help-div-2', label: '', divider: true },
        {
          id: 'help-shortcuts',
          label: 'Keyboard shortcuts',
          shortcut: '\u2318K',
          action: () => setQuickOpenVisible(true),
        },
      ],
    },
  ];

  const handleLabelClick = useCallback(
    (index: number) => {
      setOpenMenuIndex((prev) => (prev === index ? null : index));
    },
    [],
  );

  const handleClose = useCallback(() => {
    setOpenMenuIndex(null);
  }, []);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpenMenuIndex(null);
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, []);

  return (
    <div className={styles.menuBar} ref={barRef} data-testid="menubar-bar">
      {menus.map((menu, index) => (
        <div key={menu.label} className={styles.menuLabelWrapper}>
          <div
            className={`${styles.menuLabel} ${openMenuIndex === index ? styles.menuLabelActive : ''}`}
            onClick={() => handleLabelClick(index)}
          >
            {menu.label}
          </div>
          {openMenuIndex === index && (
            <Menu items={menu.items} onClose={handleClose} />
          )}
        </div>
      ))}
    </div>
  );
};
