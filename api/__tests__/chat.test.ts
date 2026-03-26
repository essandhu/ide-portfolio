import { describe, it, expect } from 'vitest';
import { handleChatRequest } from '../chat';

describe('chat edge function', () => {
  it('returns 400 for missing message', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' },
    });
    const res = await handleChatRequest(req);
    expect(res.status).toBe(400);
  });

  it('returns 400 for empty message', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: '' }),
      headers: { 'Content-Type': 'application/json' },
    });
    const res = await handleChatRequest(req);
    expect(res.status).toBe(400);
  });

  it('returns 405 for non-POST methods', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'GET',
    });
    const res = await handleChatRequest(req);
    expect(res.status).toBe(405);
  });

  it('returns a fallback response when no API key is set', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: 'Tell me about your projects' }),
      headers: { 'Content-Type': 'application/json' },
    });
    const res = await handleChatRequest(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.response).toBeDefined();
    expect(typeof data.response).toBe('string');
    expect(data.fallback).toBe(true);
  });
});
