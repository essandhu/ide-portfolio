import { useIDE } from '../useIDE';
import { Logo } from './Logo';
import { MenuBar } from '../menubar/MenuBar';
import { QuickOpen } from '../quickopen/QuickOpen';
import styles from './TitleBar.module.css';

export function TitleBar() {
  const { quickOpenVisible, setQuickOpenVisible } = useIDE();

  return (
    <div className={styles.titlebar} data-testid="titlebar">
      <Logo />
      <MenuBar />
      <div className={styles.searchWrapper}>
        {quickOpenVisible ? (
          <QuickOpen onClose={() => setQuickOpenVisible(false)} />
        ) : (
          <button
            className={styles.titleSearch}
            data-testid="title-search-trigger"
            onClick={() => setQuickOpenVisible(true)}
          >
            IDE Portfolio — Search
          </button>
        )}
      </div>
      <div className={styles.spacer} />
      {quickOpenVisible && (
        <div
          className={styles.backdrop}
          onClick={() => setQuickOpenVisible(false)}
        />
      )}
    </div>
  );
}
