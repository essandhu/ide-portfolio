import styles from './TitleBar.module.css';

export const Logo = () => (
  <div className={styles.logo} data-testid="logo">
    <svg width="16" height="16" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="6" fill="#1e1e2e"/>
      <text x="16" y="21.5" textAnchor="middle" fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif" fontSize="15" fontWeight="700" letterSpacing="1" fill="#ffffff">ES</text>
    </svg>
  </div>
);
