import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IDEProvider } from '../IDEProvider';
import { ChatPanel } from '../sidebar/ChatPanel';

vi.mock('../../ai/chatClient', () => ({
  sendChatMessage: vi.fn().mockResolvedValue({ text: 'AI response', fallback: false }),
}));

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
    // Should show the user message
    expect(screen.getByText('Tell me about your projects')).toBeInTheDocument();
    // Should show the AI response
    await waitFor(() => {
      expect(screen.getByText('AI response')).toBeInTheDocument();
    });
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

  it('shows typing indicator while waiting for response', async () => {
    const { sendChatMessage } = await import('../../ai/chatClient');
    (sendChatMessage as ReturnType<typeof vi.fn>).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ text: 'AI response', fallback: false }), 100))
    );

    render(<IDEProvider><ChatPanel /></IDEProvider>);

    const input = screen.getByPlaceholderText(/ask me/i);
    await userEvent.type(input, 'hello');
    await userEvent.click(screen.getByRole('button', { name: /send/i }));

    expect(screen.getByText(/thinking/i)).toBeInTheDocument();
  });
});
