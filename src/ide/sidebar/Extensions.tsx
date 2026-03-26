import styles from './Extensions.module.css';

interface Extension {
  name: string;
  publisher: string;
  description: string;
  installs: string;
}

const extensions: Extension[] = [
  {
    name: 'TypeScript',
    publisher: 'Microsoft',
    description: 'JavaScript and TypeScript language features',
    installs: '42M',
  },
  {
    name: 'ESLint',
    publisher: 'Microsoft',
    description: 'Integrates ESLint into VS Code',
    installs: '32M',
  },
  {
    name: 'Prettier',
    publisher: 'Prettier',
    description: 'Code formatter using Prettier',
    installs: '28M',
  },
  {
    name: 'GitHub Copilot',
    publisher: 'GitHub',
    description: 'AI pair programmer',
    installs: '15M',
  },
  {
    name: 'Tailwind CSS IntelliSense',
    publisher: 'Tailwind Labs',
    description: 'Intelligent Tailwind CSS tooling',
    installs: '12M',
  },
];

export function Extensions() {
  return (
    <div className={styles.extensions} data-testid="extensions-list">
      <h3 className={styles.title}>EXTENSIONS: INSTALLED</h3>
      {extensions.map((ext) => (
        <div key={ext.name} className={styles.item} data-testid="extension-item">
          <div className={styles.header}>
            <span className={styles.icon}>🧩</span>
            <div>
              <div data-testid="extension-name" className={styles.name}>
                {ext.name}
              </div>
              <div data-testid="extension-publisher" className={styles.publisher}>
                {ext.publisher}
              </div>
            </div>
          </div>
          <p className={styles.description}>{ext.description}</p>
          <span className={styles.installs}>{ext.installs} installs</span>
        </div>
      ))}
    </div>
  );
}
