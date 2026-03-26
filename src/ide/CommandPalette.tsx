import { useState, useCallback, useEffect, useRef } from 'react';
import { useIDE } from './useIDE';
import { themes } from '../themes';
import styles from './CommandPalette.module.css';

interface PaletteCommand {
  id: string;
  label: string;
  action: () => void;
}

interface CommandPaletteProps {
  open?: boolean;
  onClose?: () => void;
}

export function CommandPalette({ open = false, onClose }: CommandPaletteProps) {
  const { setThemeId, setFont, openFile } = useIDE();
  const [filter, setFilter] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: PaletteCommand[] = [
    ...Object.values(themes).map((t) => ({
      id: `theme:${t.id}`,
      label: `Theme: ${t.name}`,
      action: () => {
        setThemeId(t.id);
        onClose?.();
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
        onClose?.();
      },
    })),
    {
      id: 'file:about',
      label: 'Open about.ts',
      action: () => {
        openFile('/src/about.ts');
        onClose?.();
      },
    },
    {
      id: 'file:skills',
      label: 'Open skills.ts',
      action: () => {
        openFile('/src/skills.ts');
        onClose?.();
      },
    },
    {
      id: 'file:readme',
      label: 'Open README.md',
      action: () => {
        openFile('/src/README.md');
        onClose?.();
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
        onClose?.();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
    if (!open) {
      setFilter('');
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className={styles.overlay} data-testid="command-palette">
      <div className={styles.palette} onKeyDown={handleKeyDown}>
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          placeholder="Type a command..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
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
    </div>
  );
}
