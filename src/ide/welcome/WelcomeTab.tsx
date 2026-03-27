import { useIDE } from '../useIDE';
import { FolderIcon, DocumentIcon, ChatIcon, EnvelopeIcon } from './welcomeIcons';
import styles from './WelcomeTab.module.css';

interface WalkthroughRow {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

export function WelcomeTab() {
  const { openFile, setSidebarPanel, recentFiles } = useIDE();

  const walkthroughRows: WalkthroughRow[] = [
    {
      icon: <FolderIcon />,
      title: 'View projects',
      description: 'React, TypeScript, WebGL and more',
      onClick: () => openFile('/src/projects/project-alpha.tsx'),
    },
    {
      icon: <DocumentIcon />,
      title: 'Read resume',
      description: 'Full career history and skills',
      onClick: () => openFile('/src/experience/current-role.md'),
    },
    {
      icon: <ChatIcon />,
      title: 'Chat with Erick',
      description: 'Ask anything, get direct answers',
      onClick: () => setSidebarPanel('chat'),
    },
    {
      icon: <EnvelopeIcon />,
      title: 'Get in touch',
      description: 'Open to new opportunities',
      onClick: () => openFile('/src/contact.ts'),
    },
  ];

  const defaultRecent = ['/src/about.ts', '/src/skills.ts', '/src/projects/project-alpha.tsx'];
  const displayRecent = recentFiles.length > 0 ? recentFiles.slice(0, 3) : defaultRecent;

  return (
    <div className={styles.welcome} data-testid="welcome-tab">
      <div className={styles.content}>
        <h1 className={styles.headerName}>Erick</h1>
        <p className={styles.headerRole}>Full-Stack Software Engineer</p>
        <div className={styles.divider} />
        <div className={styles.columns}>
          <div className={styles.left}>
            {walkthroughRows.map((row) => (
              <div key={row.title} className={styles.row} onClick={row.onClick} role="button" tabIndex={0}>
                <span className={styles.rowIcon}>{row.icon}</span>
                <div className={styles.rowText}>
                  <div className={styles.rowTitle}>{row.title}</div>
                  <div className={styles.rowDesc}>{row.description}</div>
                </div>
                <span className={styles.chevron}>&rsaquo;</span>
              </div>
            ))}
          </div>
          <div className={styles.right}>
            <div className={styles.sectionHeader}>RECENT</div>
            {displayRecent.map((file) => (
              <button key={file} className={styles.link} onClick={() => openFile(file)}>
                {file.split('/').pop()}
              </button>
            ))}

            <div className={styles.sectionHeader}>CONNECT</div>
            <a className={styles.link} href="https://github.com" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a className={styles.link} href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a className={styles.link} href="mailto:contact@example.com" target="_blank" rel="noopener noreferrer">
              Email
            </a>

            <div className={styles.sectionHeader}>ABOUT THIS PORTFOLIO</div>
            <button className={styles.link} onClick={() => openFile('/README.md')}>
              How it&apos;s built
            </button>
            <a className={styles.link} href="https://github.com" target="_blank" rel="noopener noreferrer">
              View source on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
