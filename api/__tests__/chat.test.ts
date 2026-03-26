import { describe, it, expect, beforeEach } from 'vitest';
import { handleChatRequest, checkRateLimit, resetRateLimits } from '../chat';

describe('chat edge function', () => {
  beforeEach(() => {
    resetRateLimits();
  });
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

  it('returns 429 after exceeding rate limit', async () => {
    // Exhaust the rate limit (10 requests)
    for (let i = 0; i < 10; i++) {
      const req = new Request('http://localhost/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message: `message ${i}` }),
        headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '1.2.3.4' },
      });
      const res = await handleChatRequest(req);
      expect(res.status).toBe(200);
    }

    // 11th request should be rate limited
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: 'one more' }),
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '1.2.3.4' },
    });
    const res = await handleChatRequest(req);
    expect(res.status).toBe(429);
    const data = await res.json();
    expect(data.rateLimited).toBe(true);
    expect(data.fallback).toBe(true);
    expect(data.response).toBeDefined();
  });

  it('rate limits independently per IP', async () => {
    // Exhaust limit for IP A
    for (let i = 0; i < 10; i++) {
      const req = new Request('http://localhost/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message: `msg ${i}` }),
        headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '10.0.0.1' },
      });
      await handleChatRequest(req);
    }

    // IP B should still work
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: 'hello' }),
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '10.0.0.2' },
    });
    const res = await handleChatRequest(req);
    expect(res.status).toBe(200);
  });

  it('accepts systemPrompt field without error', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        message: 'hello',
        systemPrompt: 'You are a test assistant.',
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const res = await handleChatRequest(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.response).toBeDefined();
  });

  describe('checkRateLimit', () => {
    it('allows requests under the limit', () => {
      expect(checkRateLimit('test-key')).toBe(true);
      expect(checkRateLimit('test-key')).toBe(true);
    });

    it('blocks after exceeding limit', () => {
      for (let i = 0; i < 10; i++) {
        checkRateLimit('block-key');
      }
      expect(checkRateLimit('block-key')).toBe(false);
    });
  });
});
