import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IDEProvider } from '../IDEProvider';
import { ChatPanel } from '../sidebar/ChatPanel';

describe('ChatPanel', () => {
  it('renders the chat input', () => {
    render(
      <IDEProvider>
        <ChatPanel />
      </IDEProvider>,
    );
    expect(screen.getByPlaceholderText(/ask me/i)).toBeInTheDocument();
  });

  it('renders the send button', () => {
    render(
      <IDEProvider>
        <ChatPanel />
      </IDEProvider>,
    );
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  it('displays a response when user sends a message', async () => {
    render(
      <IDEProvider>
        <ChatPanel />
      </IDEProvider>,
    );
    const input = screen.getByPlaceholderText(/ask me/i);
    await userEvent.type(input, 'Tell me about your projects');
    await userEvent.click(screen.getByRole('button', { name: /send/i }));
    // Should show the user message and a response
    expect(screen.getByText('Tell me about your projects')).toBeInTheDocument();
    // Response should contain something about projects (from fallback chat responses)
    expect(screen.getByTestId('chat-messages').textContent).toContain('project');
  });

  it('clears input after sending', async () => {
    render(
      <IDEProvider>
        <ChatPanel />
      </IDEProvider>,
    );
    const input = screen.getByPlaceholderText(/ask me/i) as HTMLInputElement;
    await userEvent.type(input, 'hello');
    await userEvent.click(screen.getByRole('button', { name: /send/i }));
    expect(input.value).toBe('');
  });
});
