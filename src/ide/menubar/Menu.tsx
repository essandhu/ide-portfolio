import { useState, useEffect, useRef, useCallback } from 'react';
import type { MenuItem } from './menuData';
import styles from './MenuBar.module.css';

interface MenuProps {
  items: MenuItem[];
  onClose: () => void;
}

export const Menu = ({ items, onClose }: MenuProps) => {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [hoveredSubmenuId, setHoveredSubmenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const actionableItems = items.filter((item) => !item.divider);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          setFocusedIndex((prev) => {
            const next = prev + 1;
            return next >= actionableItems.length ? 0 : next;
          });
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          setFocusedIndex((prev) => {
            const next = prev - 1;
            return next < 0 ? actionableItems.length - 1 : next;
          });
          break;
        }
        case 'Enter': {
          e.preventDefault();
          const item = actionableItems[focusedIndex];
          if (item && !item.disabled && item.action) {
            item.action();
            onClose();
          }
          break;
        }
        case 'Escape': {
          e.preventDefault();
          onClose();
          break;
        }
      }
    },
    [actionableItems, focusedIndex, onClose],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    menuRef.current?.focus();
  }, []);

  const getFocusedId = () => {
    if (focusedIndex < 0 || focusedIndex >= actionableItems.length) return null;
    return actionableItems[focusedIndex].id;
  };

  const focusedId = getFocusedId();

  return (
    <div className={styles.dropdown} ref={menuRef} role="menu">
      {items.map((item) => {
        if (item.divider) {
          return <div key={item.id} className={styles.divider} role="separator" />;
        }

        const isFocused = focusedId === item.id;
        const hasSubmenu = item.submenu && item.submenu.length > 0;

        return (
          <div
            key={item.id}
            className={`${styles.menuItem} ${isFocused ? styles.focused : ''}`}
            data-disabled={item.disabled ? 'true' : undefined}
            role="menuitem"
            onMouseEnter={() => {
              if (hasSubmenu) setHoveredSubmenuId(item.id);
            }}
            onMouseLeave={() => {
              if (hasSubmenu) setHoveredSubmenuId(null);
            }}
            onClick={() => {
              if (!item.disabled && item.action) {
                item.action();
                onClose();
              }
            }}
          >
            <span className={styles.menuItemCheck}>
              {item.checked ? '\u2713' : ''}
            </span>
            <span className={styles.menuItemLabel}>{item.label}</span>
            {item.shortcut && (
              <span className={styles.menuItemShortcut}>{item.shortcut}</span>
            )}
            {hasSubmenu && <span className={styles.menuItemArrow}>{'\u25B6'}</span>}
            {hasSubmenu && hoveredSubmenuId === item.id && (
              <div className={styles.submenu} role="menu">
                {item.submenu!.map((sub) => (
                  <div
                    key={sub.id}
                    className={styles.menuItem}
                    data-disabled={sub.disabled ? 'true' : undefined}
                    role="menuitem"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!sub.disabled && sub.action) {
                        sub.action();
                        onClose();
                      }
                    }}
                  >
                    <span className={styles.menuItemCheck}>
                      {sub.checked ? '\u2713' : ''}
                    </span>
                    <span className={styles.menuItemLabel}>{sub.label}</span>
                    {sub.shortcut && (
                      <span className={styles.menuItemShortcut}>{sub.shortcut}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
