import { describe, it, expect } from 'vitest';
import { profile } from '../../config/profile';
import { chatResponses, getChatResponse } from '../chatResponses';

describe('Chat responses', () => {
  it('exports a map of questions to responses', () => {
    expect(typeof chatResponses).toBe('object');
    expect(Object.keys(chatResponses).length).toBeGreaterThan(0);
  });

  it('each response is a non-empty string', () => {
    for (const [question, response] of Object.entries(chatResponses)) {
      expect(typeof response).toBe('string');
      expect(response.length, `Empty response for "${question}"`).toBeGreaterThan(0);
    }
  });

  it('getChatResponse returns a matching response for a known keyword', () => {
    // Should match something about "projects" or "experience" or "skills"
    const result = getChatResponse('Tell me about your projects');
    expect(result).not.toBeNull();
    expect(typeof result).toBe('string');
  });

  it('getChatResponse returns a fallback for unknown input', () => {
    const result = getChatResponse('xyzzy random gibberish 12345');
    expect(result).not.toBeNull();
    expect(typeof result).toBe('string');
  });

  it('getChatResponse is case-insensitive', () => {
    const lower = getChatResponse('projects');
    const upper = getChatResponse('PROJECTS');
    expect(lower).toBe(upper);
  });
});

describe('chatResponses uses profile config', () => {
  it('experience response contains current company', () => {
    const response = getChatResponse('experience');
    expect(response).toContain(profile.experience[0].company);
  });

  it('contact response contains email', () => {
    const response = getChatResponse('contact');
    expect(response).toContain(profile.contact.email);
  });

  it('skills response contains first skill name', () => {
    const response = getChatResponse('skills');
    expect(response).toContain(profile.skills[0]?.name);
  });

  it('projects response contains first project name', () => {
    const response = getChatResponse('projects');
    expect(response).toContain(profile.projects[0]?.name);
  });
});
