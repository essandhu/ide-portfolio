import { getChatResponse } from '../content/chatResponses';
import { buildSystemPrompt } from './systemPrompt';

export interface ChatResponse {
  text: string;
  fallback: boolean;
}

let cachedPrompt: string | null = null;

const getSystemPrompt = (): string => {
  if (!cachedPrompt) {
    cachedPrompt = buildSystemPrompt();
  }
  return cachedPrompt;
};

export const sendChatMessage = async (message: string): Promise<ChatResponse> => {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, systemPrompt: getSystemPrompt() }),
    });

    const data = await res.json();

    if (res.ok) {
      return { text: data.response, fallback: data.fallback ?? false };
    }

    if (res.status === 429) {
      return { text: data.response, fallback: true };
    }

    return { text: getChatResponse(message), fallback: true };
  } catch {
    return { text: getChatResponse(message), fallback: true };
  }
};
