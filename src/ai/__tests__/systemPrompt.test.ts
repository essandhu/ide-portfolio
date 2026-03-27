import { describe, it, expect } from 'vitest';
import { buildSystemPrompt } from '../systemPrompt';
import { profile } from '../../config/profile';

describe('buildSystemPrompt', () => {
  it('includes portfolio owner identity', () => {
    const prompt = buildSystemPrompt();
    expect(prompt).toContain('portfolio');
  });

  it('includes content from about.ts', () => {
    const prompt = buildSystemPrompt();
    expect(prompt).toContain(profile.name);
  });

  it('includes project information', () => {
    const prompt = buildSystemPrompt();
    expect(prompt).toContain('project');
  });

  it('includes experience information', () => {
    const prompt = buildSystemPrompt();
    expect(prompt).toContain('experience');
  });

  it('includes instructions for the AI role', () => {
    const prompt = buildSystemPrompt();
    expect(prompt).toContain('pair programmer');
  });
});
