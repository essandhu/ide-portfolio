import { useState, useCallback, useRef, useEffect } from 'react';
import { useIDE } from '../useIDE';
import { CommandInterpreter } from '../../terminal/CommandInterpreter';
import { registerFilesystemCommands } from '../../terminal/commands/filesystem';
import { registerGitCommands } from '../../terminal/commands/git';
import { registerNpmCommands } from '../../terminal/commands/npm';
import { registerMiscCommands } from '../../terminal/commands/misc';
import styles from './TerminalPanel.module.css';

interface TerminalLine {
  text: string;
  type: 'output' | 'error' | 'input' | 'welcome';
}

export function TerminalPanel() {
  const { vfs } = useIDE();
  const [lines, setLines] = useState<TerminalLine[]>([
    { text: 'Welcome to IDE Portfolio. Type \'help\' for available commands.', type: 'welcome' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const interpreterRef = useRef<CommandInterpreter | null>(null);
  if (!interpreterRef.current) {
    interpreterRef.current = new CommandInterpreter(vfs);
    const registry = interpreterRef.current.getRegistry();
    registerFilesystemCommands(registry);
    registerGitCommands(registry);
    registerNpmCommands(registry);
    registerMiscCommands(registry);
  }

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [lines]);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = useCallback(() => {
    const trimmed = input.trim();
    const prompt = `visitor@portfolio:${vfs.cwd()}$`;
    const inputLine: TerminalLine = { text: `${prompt} ${input}`, type: 'input' };

    if (!trimmed) {
      setLines((prev) => [...prev, inputLine]);
      setInput('');
      return;
    }

    const interpreter = interpreterRef.current!;
    const result = interpreter.execute(trimmed);

    if (result.clear) {
      setLines([]);
      setInput('');
      setHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);
      return;
    }

    const outputLines: TerminalLine[] = [inputLine];
    if (result.text) {
      outputLines.push({
        text: result.text,
        type: result.isError ? 'error' : 'output',
      });
    }

    setLines((prev) => [...prev, ...outputLines]);
    setInput('');
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);
  }, [input, vfs]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (history.length === 0) return;
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex === -1) return;
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    },
    [handleSubmit, history, historyIndex],
  );

  const prompt = `visitor@portfolio:${vfs.cwd()}$`;

  return (
    <div
      className={styles.terminal}
      data-testid="terminal-container"
      onClick={focusInput}
    >
      <div className={styles.scrollArea} ref={scrollRef}>
        {lines.map((line, i) => (
          <div
            key={i}
            className={`${styles.line} ${line.type === 'error' ? styles.error : ''} ${line.type === 'welcome' ? styles.welcome : ''}`}
          >
            {line.text}
          </div>
        ))}
        <div className={styles.inputLine}>
          <span className={styles.prompt}>{prompt}&nbsp;</span>
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
