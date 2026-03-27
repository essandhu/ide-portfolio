import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
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

  it('displays the COPILOT title', () => {
    render(
      <IDEProvider>
        <ChatPanel />
      </IDEProvider>,
    );
    expect(screen.getByText('COPILOT')).toBeInTheDocument();
  });

  it('shows starter chips when no messages', () => {
    render(
      <IDEProvider>
        <ChatPanel />
      </IDEProvider>,
    );
    expect(screen.getByText("What are Erick's strongest skills?")).toBeInTheDocument();
    expect(screen.getByText('Show me recent projects')).toBeInTheDocument();
    expect(screen.getByText('Tell me about his experience')).toBeInTheDocument();
    expect(screen.getByText('Is Erick available for new roles?')).toBeInTheDocument();
  });

  describe('with fake timers', () => {
    beforeEach(() => {
      vi.useFakeTimers({ shouldAdvanceTime: true });
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('hides starter chips after a message is sent', async () => {
      render(
        <IDEProvider>
          <ChatPanel />
        </IDEProvider>,
      );
      const input = screen.getByPlaceholderText(/ask me/i);
      await userEvent.type(input, 'hello');
      await userEvent.click(screen.getByRole('button', { name: /send/i }));

      await waitFor(() => {
        expect(screen.queryByText("What are Erick's strongest skills?")).not.toBeInTheDocument();
      });
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

      // Advance past the 800ms minimum thinking delay
      await act(async () => {
        vi.advanceTimersByTime(850);
      });

      // Advance past typing animation (2 words at 30ms each)
      await act(async () => {
        vi.advanceTimersByTime(200);
      });

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
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve({ text: 'AI response', fallback: false }), 100),
          ),
      );

      render(
        <IDEProvider>
          <ChatPanel />
        </IDEProvider>,
      );

      const input = screen.getByPlaceholderText(/ask me/i);
      await userEvent.type(input, 'hello');
      await userEvent.click(screen.getByRole('button', { name: /send/i }));

      expect(screen.getByText(/thinking/i)).toBeInTheDocument();
    });

    it('shows thinking indicator for at least 800ms even if API responds instantly', async () => {
      const { sendChatMessage } = await import('../../ai/chatClient');
      (sendChatMessage as ReturnType<typeof vi.fn>).mockResolvedValue({
        text: 'instant reply',
        fallback: false,
      });

      render(
        <IDEProvider>
          <ChatPanel />
        </IDEProvider>,
      );

      const input = screen.getByPlaceholderText(/ask me/i);
      await userEvent.type(input, 'hello');
      await userEvent.click(screen.getByRole('button', { name: /send/i }));

      // At 400ms the thinking indicator should still be visible
      await act(async () => {
        vi.advanceTimersByTime(400);
      });
      expect(screen.getByText(/thinking/i)).toBeInTheDocument();

      // At 850ms the thinking delay has passed, response should start appearing
      await act(async () => {
        vi.advanceTimersByTime(450);
      });
      expect(screen.queryByText(/thinking/i)).not.toBeInTheDocument();
    });

    it('disables input during typing animation', async () => {
      const { sendChatMessage } = await import('../../ai/chatClient');
      (sendChatMessage as ReturnType<typeof vi.fn>).mockResolvedValue({
        text: 'word1 word2 word3 word4 word5',
        fallback: false,
      });

      render(
        <IDEProvider>
          <ChatPanel />
        </IDEProvider>,
      );

      const input = screen.getByPlaceholderText(/ask me/i);
      await userEvent.type(input, 'hello');
      await userEvent.click(screen.getByRole('button', { name: /send/i }));

      // Advance past the 800ms thinking delay
      await act(async () => {
        vi.advanceTimersByTime(850);
      });

      // Now typing animation is in progress - input should still be disabled
      expect(input).toBeDisabled();

      // Advance past typing animation (5 words * 30ms = 150ms, plus buffer)
      await act(async () => {
        vi.advanceTimersByTime(300);
      });

      // After typing completes, input should be enabled
      await waitFor(() => {
        expect(input).not.toBeDisabled();
      });
    });
  });
});
