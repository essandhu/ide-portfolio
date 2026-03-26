import { useState, useCallback } from 'react';
import { getChatResponse } from '../../content/chatResponses';
import styles from './ChatPanel.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: Message = { role: 'user', content: trimmed };
    const response = getChatResponse(trimmed);
    const assistantMessage: Message = { role: 'assistant', content: response };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput('');
  }, [input]);

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
      <h3 className={styles.title}>COPILOT CHAT</h3>
      <div className={styles.messages} data-testid="chat-messages">
        {messages.length === 0 && (
          <p className={styles.empty}>
            Ask me anything about this portfolio!
          </p>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`${styles.message} ${msg.role === 'user' ? styles.user : styles.assistant}`}
          >
            <span className={styles.role}>
              {msg.role === 'user' ? 'You' : 'Copilot'}
            </span>
            <p className={styles.content}>{msg.content}</p>
          </div>
        ))}
      </div>
      <div className={styles.inputArea}>
        <input
          type="text"
          className={styles.input}
          placeholder="Ask me about projects, skills, experience..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className={styles.sendButton}
          onClick={handleSend}
          aria-label="Send"
        >
          Send
        </button>
      </div>
    </div>
  );
}
