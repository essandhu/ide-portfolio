import { useState, useCallback, useEffect, useRef } from 'react';
import { useIDE } from './useIDE';
import { themes } from '../themes';
import { profile } from '../config/profile';
import styles from './CommandPalette.module.css';

interface PaletteCommand {
  id: string;
  label: string;
  action: () => void;
}

interface CommandPaletteProps {
  onClose: () => void;
}

export function CommandPalette({ onClose }: CommandPaletteProps) {
  const { setThemeId, setFont, openFile } = useIDE();
  const [filter, setFilter] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: PaletteCommand[] = [
    ...Object.values(themes).map((t) => ({
      id: `theme:${t.id}`,
      label: `Theme: ${t.name}`,
      action: () => {
        setThemeId(t.id);
        onClose();
      },
    })),
    ...[
      'JetBrains Mono',
      'Fira Code',
      'Cascadia Code',
      'Source Code Pro',
      'Consolas',
    ].map((font) => ({
      id: `font:${font}`,
      label: `Font: ${font}`,
      action: () => {
        setFont(font);
        onClose();
      },
    })),
    {
      id: 'file:about',
      label: 'Open about.ts',
      action: () => {
        openFile('/src/about.ts');
        onClose();
      },
    },
    {
      id: 'file:skills',
      label: 'Open skills.ts',
      action: () => {
        openFile('/src/skills.ts');
        onClose();
      },
    },
    {
      id: 'file:readme',
      label: 'Open README.md',
      action: () => {
        openFile('/src/README.md');
        onClose();
      },
    },
    {
      id: 'portfolio:project-alpha',
      label: `Portfolio: ${profile.projects[0]?.name ?? 'Project'}`,
      action: () => {
        openFile('/src/projects/project-alpha.tsx');
        onClose();
      },
    },
    {
      id: 'portfolio:project-beta',
      label: `Portfolio: ${profile.projects[1]?.name ?? 'Project'}`,
      action: () => {
        openFile('/src/projects/project-beta.tsx');
        onClose();
      },
    },
    {
      id: 'portfolio:current-role',
      label: `Portfolio: ${profile.experience.current.company} \u00b7 ${profile.experience.current.title}`,
      action: () => {
        openFile('/src/experience/current-role.md');
        onClose();
      },
    },
    {
      id: 'portfolio:previous-role',
      label: `Portfolio: ${profile.experience.previous.company} \u00b7 ${profile.experience.previous.title}`,
      action: () => {
        openFile('/src/experience/previous-role.md');
        onClose();
      },
    },
    {
      id: 'portfolio:skills',
      label: 'Portfolio: All Skills',
      action: () => {
        openFile('/src/skills.ts');
        onClose();
      },
    },
    {
      id: 'portfolio:contact',
      label: 'Portfolio: Contact Info',
      action: () => {
        openFile('/src/contact.ts');
        onClose();
      },
    },
  ];

  const filtered = filter
    ? commands.filter((cmd) =>
        cmd.label.toLowerCase().includes(filter.toLowerCase()),
      )
    : commands;

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <input
        ref={inputRef}
        className={styles.input}
        type="text"
        placeholder="Type a command..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className={styles.dropdown} data-testid="command-palette">
        <div className={styles.list} data-testid="command-list">
          {filtered.map((cmd) => (
            <button
              key={cmd.id}
              className={styles.item}
              onClick={cmd.action}
            >
              {cmd.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
