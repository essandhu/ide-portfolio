import { useIDE } from '../useIDE';
import { Logo } from './Logo';
import { MenuBar } from '../menubar/MenuBar';
import styles from './TitleBar.module.css';

export function TitleBar() {
  const { setQuickOpenVisible } = useIDE();

  return (
    <div className={styles.titlebar} data-testid="titlebar">
      <Logo />
      <MenuBar />
      <button
        className={styles.titleSearch}
        data-testid="title-search-trigger"
        onClick={() => setQuickOpenVisible(true)}
      >
        IDE Portfolio — Search
      </button>
      <div className={styles.spacer} />
    </div>
  );
}
