import { useState, useCallback } from 'react';
import { sendChatMessage } from '../../ai/chatClient';
import { parseActions } from '../../ai/chatActions';
import type { ChatAction } from '../../ai/chatActions';
import { useIDE } from '../useIDE';
import type { SidebarPanel } from '../IDEProvider';
import styles from './ChatPanel.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const STARTER_PROMPTS = [
  "What are Erick's strongest skills?",
  'Show me recent projects',
  'Tell me about his experience',
  'Is Erick available for new roles?',
];

function executeAction(
  act: ChatAction,
  ctx: {
    openFile: (path: string) => void;
    togglePreview: (path: string) => void;
    setSidebarPanel: (panel: SidebarPanel) => void;
    setThemeId: (id: string) => void;
    openWelcome: () => void;
  },
) {
  switch (act.action) {
    case 'openFile':
      ctx.openFile(act.path);
      break;
    case 'togglePreview':
      ctx.togglePreview(act.path);
      break;
    case 'focusPanel':
      ctx.setSidebarPanel(act.panel as SidebarPanel);
      break;
    case 'setTheme':
      ctx.setThemeId(act.themeId);
      break;
    case 'openWelcome':
      ctx.openWelcome();
      break;
  }
}

export function ChatPanel() {
  const { openFile, togglePreview, setSidebarPanel, setThemeId, openWelcome } = useIDE();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = useCallback(
    async (text?: string) => {
      const trimmed = (text ?? input).trim();
      if (!trimmed || loading) return;

      const userMessage: Message = { role: 'user', content: trimmed };
      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setLoading(true);

      try {
        const response = await sendChatMessage(trimmed);
        const { text: cleanText, actions } = parseActions(response.text);
        const assistantMessage: Message = { role: 'assistant', content: cleanText };
        setMessages((prev) => [...prev, assistantMessage]);

        for (const act of actions) {
          executeAction(act, { openFile, togglePreview, setSidebarPanel, setThemeId, openWelcome });
        }
      } finally {
        setLoading(false);
      }
    },
    [input, loading, openFile, togglePreview, setSidebarPanel, setThemeId, openWelcome],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  return (
    <div className={styles.chat}>
      <h3 className={styles.title}>
        <span className={styles.titleRow}>
          <span className={styles.sparkle}>&#10024;</span>
          <span>COPILOT</span>
        </span>
      </h3>
      <div className={styles.messages} data-testid="chat-messages">
        {messages.length === 0 && (
          <div className={styles.starterArea}>
            <p className={styles.starterHeader}>Not sure where to start? Ask me anything.</p>
            <div className={styles.chips}>
              {STARTER_PROMPTS.map((prompt) => (
                <button key={prompt} className={styles.chip} onClick={() => handleSend(prompt)}>
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`${styles.message} ${msg.role === 'user' ? styles.user : styles.assistant}`}
          >
            <span className={styles.role}>{msg.role === 'user' ? 'You' : 'Copilot'}</span>
            <p className={styles.content}>{msg.content}</p>
          </div>
        ))}
        {loading && (
          <div className={`${styles.message} ${styles.assistant}`}>
            <span className={styles.role}>Copilot</span>
            <p className={styles.thinking}>Copilot is thinking...</p>
          </div>
        )}
      </div>
      <div className={styles.inputArea}>
        <input
          type="text"
          className={styles.input}
          placeholder="Ask me about projects, skills, experience..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button className={styles.sendButton} onClick={() => handleSend()} disabled={loading} aria-label="Send">
          &uarr;
        </button>
      </div>
    </div>
  );
}
