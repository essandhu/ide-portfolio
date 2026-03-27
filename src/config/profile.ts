export interface Skill {
  name: string;
  category: 'language' | 'framework' | 'tool' | 'platform';
  proficiency: number; // 1-5
}

export interface ExperienceRole {
  company: string;
  title: string;
  period: string;
  location: string;
  responsibilities: string[];
  achievements: string[];
}

export interface Project {
  name: string;
  description: string;
  tech: string[];
  url?: string;
}

export interface Contact {
  email: string;
  github: string;
  linkedin: string;
  website: string;
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  bio: string;
  interests: string[];
  contact: Contact;
  skills: Skill[];
  experience: {
    current: ExperienceRole;
    previous: ExperienceRole;
  };
  projects: Project[];
  githubRepoUrl: string;
}

export const profile: Profile = {
  name: 'Erick',
  title: 'YOUR_TITLE',
  location: 'United States',
  bio: 'YOUR_BIO',
  interests: ['YOUR_INTEREST_1', 'YOUR_INTEREST_2'],
  contact: {
    email: 'YOUR_EMAIL',
    github: 'YOUR_GITHUB_URL',
    linkedin: 'YOUR_LINKEDIN_URL',
    website: 'YOUR_WEBSITE_URL',
  },
  skills: [
    { name: 'YOUR_SKILL', category: 'language', proficiency: 3 },
  ],
  experience: {
    current: {
      company: 'YOUR_CURRENT_COMPANY',
      title: 'YOUR_CURRENT_TITLE',
      period: 'YOUR_CURRENT_PERIOD',
      location: 'YOUR_CURRENT_LOCATION',
      responsibilities: ['YOUR_CURRENT_RESPONSIBILITY'],
      achievements: ['YOUR_CURRENT_ACHIEVEMENT'],
    },
    previous: {
      company: 'YOUR_PREVIOUS_COMPANY',
      title: 'YOUR_PREVIOUS_TITLE',
      period: 'YOUR_PREVIOUS_PERIOD',
      location: 'YOUR_PREVIOUS_LOCATION',
      responsibilities: ['YOUR_PREVIOUS_RESPONSIBILITY'],
      achievements: ['YOUR_PREVIOUS_ACHIEVEMENT'],
    },
  },
  projects: [
    {
      name: 'YOUR_PROJECT_NAME',
      description: 'YOUR_PROJECT_DESCRIPTION',
      tech: ['YOUR_TECH'],
      url: 'YOUR_PROJECT_URL',
    },
  ],
  githubRepoUrl: 'YOUR_GITHUB_REPO_URL',
};
