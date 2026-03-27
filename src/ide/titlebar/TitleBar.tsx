import { useIDE } from '../useIDE';
import { Logo } from './Logo';
import { MenuBar } from '../menubar/MenuBar';
import { QuickOpen } from '../quickopen/QuickOpen';
import { CommandPalette } from '../CommandPalette';
import styles from './TitleBar.module.css';

export function TitleBar() {
  const { quickOpenVisible, setQuickOpenVisible, paletteOpen, setPaletteOpen } = useIDE();

  const isOverlayActive = quickOpenVisible || paletteOpen;

  const closeAll = () => {
    setQuickOpenVisible(false);
    setPaletteOpen(false);
  };

  const renderContent = () => {
    if (paletteOpen) {
      return <CommandPalette onClose={closeAll} />;
    }
    if (quickOpenVisible) {
      return <QuickOpen onClose={closeAll} />;
    }
    return (
      <button
        className={styles.titleSearch}
        data-testid="title-search-trigger"
        onClick={() => setQuickOpenVisible(true)}
      >
        IDE Portfolio — Search
      </button>
    );
  };

  return (
    <div className={styles.titlebar} data-testid="titlebar">
      <Logo />
      <MenuBar />
      <div className={styles.searchWrapper}>
        {renderContent()}
      </div>
      <div className={styles.spacer} />
      {isOverlayActive && (
        <div
          className={styles.backdrop}
          onClick={closeAll}
        />
      )}
    </div>
  );
}
