import { profile } from '../config/profile';

const categoryLabels: Record<string, string> = {
  language: 'Languages',
  framework: 'Frontend & Frameworks',
  tool: 'Tools',
  platform: 'Platforms',
};

function buildSkillsResponse(): string {
  const grouped: Record<string, string[]> = {};
  for (const skill of profile.skills) {
    const label = categoryLabels[skill.category] ?? skill.category;
    if (!grouped[label]) grouped[label] = [];
    grouped[label].push(skill.name);
  }
  const lines = Object.entries(grouped)
    .map(([label, names]) => `- **${label}**: ${names.join(', ')}`)
    .join('\n');
  return `My core skills span the full stack:\n\n${lines}\n\nCheck \`cat skills.ts\` in the terminal for the full list!`;
}

function buildProjectsResponse(): string {
  const lines = profile.projects
    .map((p) => `- **${p.name}**: ${p.description}`)
    .join('\n');
  return `I've worked on several exciting projects! Check out the projects/ directory for details. Highlights include:\n\n${lines}\n\nTry \`npm run projects\` in the terminal for a quick overview!`;
}

function buildExperienceResponse(): string {
  const { current, previous } = profile.experience;
  return `I've been building software professionally:

- **${current.title} @ ${current.company}** (${current.period}): ${current.responsibilities[0] ?? ''}
- **${previous.title} @ ${previous.company}** (${previous.period}): ${previous.responsibilities[0] ?? ''}

Open the experience/ folder in the file tree to see the details — the diff view shows my career growth!`;
}

function buildAboutResponse(): string {
  return `${profile.bio}

Run \`cat about.ts\` in the terminal or click about.ts in the file tree to learn more!`;
}

function buildContactResponse(): string {
  return `You can reach me through:

- **Email**: ${profile.contact.email}
- **GitHub**: ${profile.contact.github}
- **LinkedIn**: ${profile.contact.linkedin}
- **Website**: ${profile.contact.website}

Or check \`cat contact.ts\` in the terminal!`;
}

const responses: Record<string, string> = {
  projects: buildProjectsResponse(),

  skills: buildSkillsResponse(),

  experience: buildExperienceResponse(),

  about: buildAboutResponse(),

  contact: buildContactResponse(),

  hello: `Hello! Welcome to my IDE portfolio. I'm an AI assistant here to help you explore.

Try asking me about:
- My **projects** and what I've built
- My **skills** and tech stack
- My **experience** and career history
- How to **navigate** this portfolio

Or just explore the file tree and terminal!`,

  help: `Here are some things you can ask me about:

- **"Tell me about your projects"** — what I've built
- **"What are your skills?"** — tech stack overview
- **"Describe your experience"** — career history
- **"How do I contact you?"** — contact info
- **"How do I navigate?"** — tips for using this portfolio

You can also use the terminal! Try \`help\` for available commands.`,

  navigate: `Here's how to explore this portfolio:

1. **File Tree** (left sidebar): Click files to open them in the editor
2. **Terminal** (bottom panel): Type commands like \`ls\`, \`cat about.ts\`, \`git log\`
3. **Editor** (center): View files with syntax highlighting and ghost comments
4. **This Chat**: Ask me anything about my background!

Pro tip: Try \`help\` in the terminal to see all available commands.`,
};

const FALLBACK_RESPONSE = `That's an interesting question! I'm a pre-configured assistant for this portfolio, so I'm best at answering questions about:

- My **projects** and technical work
- My **skills** and expertise
- My **experience** and career path
- How to **navigate** this IDE portfolio

Try asking about one of those topics, or explore the file tree and terminal!`;

const keywords: [string[], string][] = Object.entries(responses).map(
  ([key, response]) => [[key], response],
);

// Add extra keyword mappings
keywords.push(
  [['project', 'built', 'portfolio', 'work'], responses.projects],
  [['skill', 'tech', 'stack', 'language', 'framework'], responses.skills],
  [['experience', 'career', 'job', 'role', 'company'], responses.experience],
  [['who', 'about', 'yourself', 'background', 'bio'], responses.about],
  [['contact', 'email', 'reach', 'hire', 'linkedin', 'github'], responses.contact],
  [['hi', 'hey', 'hello', 'greet', 'welcome'], responses.hello],
  [['help', 'how', 'what', 'guide', 'tutorial'], responses.help],
  [['navigate', 'explore', 'use', 'terminal', 'sidebar'], responses.navigate],
);

export function getChatResponse(input: string): string {
  const normalized = input.toLowerCase().trim();

  for (const [keys, response] of keywords) {
    if (keys.some((keyword) => normalized.includes(keyword))) {
      return response;
    }
  }

  return FALLBACK_RESPONSE;
}

export { responses as chatResponses };
