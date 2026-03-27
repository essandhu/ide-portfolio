import styles from './TitleBar.module.css';

export const Logo = () => (
  <div className={styles.logo} data-testid="logo">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.5 3L1.5 8L5.5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.5 3L14.5 8L10.5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="9" y1="2" x2="7" y2="14" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  </div>
);
