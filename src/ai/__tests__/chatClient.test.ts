import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendChatMessage } from '../chatClient';

describe('sendChatMessage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns response from successful API call', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ response: 'Hello from AI', fallback: false }),
    }));

    const result = await sendChatMessage('hello');
    expect(result.text).toBe('Hello from AI');
    expect(result.fallback).toBe(false);
  });

  it('returns fallback response on rate limit (429)', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      json: () => Promise.resolve({ response: 'Fallback answer', fallback: true, rateLimited: true }),
    }));

    const result = await sendChatMessage('hello');
    expect(result.text).toBe('Fallback answer');
    expect(result.fallback).toBe(true);
  });

  it('falls back to local keyword matching on network error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')));

    const result = await sendChatMessage('tell me about your projects');
    expect(result.text).toBeDefined();
    expect(result.text.length).toBeGreaterThan(0);
    expect(result.fallback).toBe(true);
  });

  it('falls back to local keyword matching on non-429 error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve({ error: 'Internal server error' }),
    }));

    const result = await sendChatMessage('hello');
    expect(result.fallback).toBe(true);
  });

  it('sends message and systemPrompt in request body', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ response: 'AI response', fallback: false }),
    });
    vi.stubGlobal('fetch', mockFetch);

    await sendChatMessage('hello');

    expect(mockFetch).toHaveBeenCalledWith('/api/chat', expect.objectContaining({
      method: 'POST',
      body: expect.any(String),
    }));

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.message).toBe('hello');
    expect(body.systemPrompt).toBeDefined();
    expect(body.systemPrompt.length).toBeGreaterThan(100);
  });
});
