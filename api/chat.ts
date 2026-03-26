import { getChatResponse } from '../src/content/chatResponses';

export async function handleChatRequest(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: { message?: string };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!body.message || body.message.trim() === '') {
    return new Response(JSON.stringify({ error: 'Message is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = typeof process !== 'undefined'
    ? process.env?.ANTHROPIC_API_KEY
    : undefined;

  // If no API key, use fallback pre-baked responses
  if (!apiKey) {
    const response = getChatResponse(body.message);
    return new Response(
      JSON.stringify({ response, fallback: true }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  // With API key, proxy to Claude Haiku
  try {
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 300,
        system: 'You are a helpful portfolio assistant. Answer questions about the portfolio owner concisely.',
        messages: [
          { role: 'user', content: body.message },
        ],
      }),
    });

    if (!anthropicRes.ok) {
      const response = getChatResponse(body.message);
      return new Response(
        JSON.stringify({ response, fallback: true }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    const data = await anthropicRes.json();
    const response = data.content?.[0]?.text ?? getChatResponse(body.message);

    return new Response(
      JSON.stringify({ response, fallback: false }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch {
    const response = getChatResponse(body.message);
    return new Response(
      JSON.stringify({ response, fallback: true }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}

// Vercel Edge Function export
export default async function handler(req: Request): Promise<Response> {
  return handleChatRequest(req);
}

export const config = {
  runtime: 'edge',
};
