import { portfolioFs } from '../content/fileSystem';
import { VirtualFileSystem } from '../terminal/VirtualFileSystem';

export const buildSystemPrompt = (): string => {
  const vfs = new VirtualFileSystem(portfolioFs);
  const allFiles = vfs.allFiles();

  const fileContents = allFiles
    .map(({ path, file }) => `--- ${path} (${file.language}) ---\n${file.content}`)
    .join('\n\n');

  return `You are an AI pair programmer embedded in a portfolio IDE for the person described below. Answer questions about their work, skills, projects, and experience conversationally and concisely. Reference specific files and suggest terminal commands when relevant.

PORTFOLIO CONTENT:

${fileContents}`;
};
