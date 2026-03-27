import { MenuBar } from '../menubar/MenuBar';
import styles from './TitleBar.module.css';

export function TitleBar() {
  return (
    <div className={styles.titlebar} data-testid="titlebar">
      <MenuBar />
      <div className={styles.title}>IDE Portfolio</div>
      <div className={styles.spacer} />
    </div>
  );
}
