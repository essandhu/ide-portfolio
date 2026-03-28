import { describe, it, expect } from 'vitest';
import {
  getPreviewType,
  parseProjectData,
  parseSkillsData,
  parseRoleData,
} from '../editor/previews/previewRegistry';
import { projectPath, experiencePath } from '../../config/profile';

describe('getPreviewType', () => {
  it('returns "project" for project file paths', () => {
    expect(getPreviewType(projectPath(0))).toBe('project');
  });

  it('returns "skills" for skills.ts', () => {
    expect(getPreviewType('/src/skills.ts')).toBe('skills');
  });

  it('returns "role" for experience paths', () => {
    expect(getPreviewType(experiencePath(0))).toBe('role');
  });

  it('returns null for non-previewable paths', () => {
    expect(getPreviewType('/src/about.ts')).toBeNull();
    expect(getPreviewType('/src/contact.ts')).toBeNull();
  });
});

describe('parseProjectData', () => {
  it('extracts project name, description, tech, and url', () => {
    const source = `
      export const project = {
        name: 'My Project',
        description: 'A cool project',
        tech: ['React', 'TypeScript', 'Node.js'],
        url: 'https://example.com',
      };
    `;
    const data = parseProjectData(source);
    expect(data.name).toBe('My Project');
    expect(data.description).toBe('A cool project');
    expect(data.tech).toEqual(['React', 'TypeScript', 'Node.js']);
    expect(data.url).toBe('https://example.com');
  });

  it('returns defaults for missing fields', () => {
    const data = parseProjectData('export const x = {};');
    expect(data.name).toBe('Untitled');
    expect(data.description).toBe('');
    expect(data.tech).toEqual([]);
    expect(data.url).toBeUndefined();
  });
});

describe('parseSkillsData', () => {
  it('extracts skill entries from source', () => {
    const source = `
      export const skills = [
        { name: 'React', category: 'Frontend', proficiency: 5 },
        { name: 'Node.js', category: 'Backend', proficiency: 4 },
      ];
    `;
    const skills = parseSkillsData(source);
    expect(skills).toHaveLength(2);
    expect(skills[0]).toEqual({ name: 'React', category: 'Frontend', proficiency: 5 });
    expect(skills[1]).toEqual({ name: 'Node.js', category: 'Backend', proficiency: 4 });
  });

  it('returns empty array when no skills found', () => {
    expect(parseSkillsData('export const x = {};')).toEqual([]);
  });
});

describe('parseRoleData', () => {
  it('extracts role information from markdown', () => {
    const source = `# Senior Engineer — Acme Corp

**Jan 2022 - Present** | Remote

## Responsibilities

- Led frontend architecture
- Mentored junior developers

## Key Achievements

- Reduced bundle size by 40%
- Shipped v2.0 on time`;
    const data = parseRoleData(source);
    expect(data.title).toBe('Senior Engineer');
    expect(data.company).toBe('Acme Corp');
    expect(data.dateRange).toBe('Jan 2022 - Present');
    expect(data.location).toBe('Remote');
    expect(data.responsibilities).toEqual([
      'Led frontend architecture',
      'Mentored junior developers',
    ]);
    expect(data.achievements).toEqual([
      'Reduced bundle size by 40%',
      'Shipped v2.0 on time',
    ]);
  });

  it('returns defaults for empty source', () => {
    const data = parseRoleData('');
    expect(data.title).toBe('Unknown');
    expect(data.company).toBe('Unknown');
    expect(data.responsibilities).toEqual([]);
    expect(data.achievements).toEqual([]);
  });
});
