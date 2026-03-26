import { useState, useCallback } from 'react';
import { useIDE } from '../useIDE';
import { themes } from '../../themes';
import styles from './ThemePicker.module.css';

export function ThemePicker() {
  const { theme, setThemeId } = useIDE();
  const [open, setOpen] = useState(false);

  const handleSelect = useCallback(
    (id: string) => {
      setThemeId(id);
      setOpen(false);
    },
    [setThemeId],
  );

  return (
    <div className={styles.picker}>
      <button
        className={styles.button}
        data-testid="theme-picker-button"
        onClick={() => setOpen((prev) => !prev)}
      >
        {theme.name}
      </button>
      {open && (
        <div className={styles.dropdown}>
          {Object.values(themes).map((t) => (
            <button
              key={t.id}
              className={`${styles.option} ${t.id === theme.id ? styles.active : ''}`}
              onClick={() => handleSelect(t.id)}
            >
              {t.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
