export type PreviewType = 'project' | 'skills' | 'role';

export interface ProjectData {
  name: string;
  description: string;
  tech: string[];
  url?: string;
}

export interface SkillData {
  name: string;
  category: string;
  proficiency: number;
}

export interface RoleData {
  title: string;
  company: string;
  dateRange: string;
  location: string;
  responsibilities: string[];
  achievements: string[];
}

export function getPreviewType(path: string): PreviewType | null {
  if (path.includes('/projects/') && !path.endsWith('index.ts')) return 'project';
  if (path.endsWith('skills.ts')) return 'skills';
  if (path.includes('/experience/')) return 'role';
  return null;
}

export function parseProjectData(source: string): ProjectData {
  const nameMatch = source.match(/name:\s*['"]([^'"]+)['"]/);
  const descMatch = source.match(/description:\s*['"]([^'"]+)['"]/);
  const urlMatch = source.match(/url:\s*['"]([^'"]+)['"]/);
  const techMatch = source.match(/tech:\s*\[([\s\S]*?)\]/);
  const tech: string[] = [];
  if (techMatch) {
    const items = techMatch[1].matchAll(/['"]([^'"]+)['"]/g);
    for (const item of items) tech.push(item[1]);
  }
  return {
    name: nameMatch?.[1] ?? 'Untitled',
    description: descMatch?.[1] ?? '',
    tech,
    url: urlMatch?.[1],
  };
}

export function parseSkillsData(source: string): SkillData[] {
  const skills: SkillData[] = [];
  const pattern = /\{\s*name:\s*['"]([^'"]+)['"],\s*category:\s*['"]([^'"]+)['"],\s*proficiency:\s*(\d+)\s*\}/g;
  let match;
  while ((match = pattern.exec(source)) !== null) {
    skills.push({ name: match[1], category: match[2], proficiency: Number(match[3]) });
  }
  return skills;
}

export function parseRoleData(source: string): RoleData {
  const headerMatch = source.match(/^#\s+(.+?)\s*—\s*(.+)$/m);
  const dateMatch = source.match(/\*\*(.+?)\*\*\s*\|\s*(.+)/);
  const responsibilities: string[] = [];
  const achievements: string[] = [];
  const respSection = source.match(/## Responsibilities\n\n([\s\S]*?)(?=\n##|$)/);
  if (respSection) {
    const items = respSection[1].matchAll(/^- (.+)$/gm);
    for (const item of items) responsibilities.push(item[1]);
  }
  const achSection = source.match(/## Key Achievements\n\n([\s\S]*?)(?=\n##|$)/);
  if (achSection) {
    const items = achSection[1].matchAll(/^- (.+)$/gm);
    for (const item of items) achievements.push(item[1]);
  }
  return {
    title: headerMatch?.[1] ?? 'Unknown',
    company: headerMatch?.[2] ?? 'Unknown',
    dateRange: dateMatch?.[1] ?? '',
    location: dateMatch?.[2] ?? '',
    responsibilities,
    achievements,
  };
}
