const responses: Record<string, string> = {
  projects: `I've worked on several exciting projects! Check out the projects/ directory for details. Highlights include:

- **IDE Portfolio**: This very site — a browser-based VS Code replica built with React, TypeScript, and Monaco Editor.
- **Cloud Dashboard**: Real-time infrastructure monitoring with interactive charts.

Try \`npm run projects\` in the terminal for a quick overview!`,

  skills: `My core skills span the full stack:

- **Languages**: TypeScript (expert), JavaScript, Python
- **Frontend**: React, Next.js, CSS/Design Systems
- **Backend**: Node.js, PostgreSQL, GraphQL
- **Tools**: Git, Docker, Vite, Vitest
- **Platforms**: AWS, Vercel

Check \`cat skills.ts\` in the terminal for the full list!`,

  experience: `I've been building software professionally since 2020:

- **Senior Engineer @ Acme Corp** (2022–Present): Leading frontend architecture, mentoring engineers, and driving testing culture.
- **Software Engineer @ StartupXYZ** (2020–2022): Full-stack development, auth systems, and API design.

Open the experience/ folder in the file tree to see the details — the diff view shows my career growth!`,

  about: `I'm a full-stack software engineer passionate about building elegant, user-facing products. I focus on TypeScript, React, and cloud-native architectures.

Run \`cat about.ts\` in the terminal or click about.ts in the file tree to learn more!`,

  contact: `You can reach me through:

- **Email**: hello@erick.dev
- **GitHub**: github.com/erick
- **LinkedIn**: linkedin.com/in/erick
- **Website**: erick.dev

Or check \`cat contact.ts\` in the terminal!`,

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
