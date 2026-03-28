# IDE Portfolio

A software engineering portfolio built as an interactive VS Code-style IDE. Browse projects, experience, and skills through a familiar code editor interface.

**Live site:** [ericksandhu.dev](https://ericksandhu.dev)

## Features

- Monaco editor with syntax highlighting and file browsing
- Integrated terminal with simulated commands
- AI chat assistant for navigating portfolio content
- Multiple color themes
- Command palette and fuzzy file search
- Responsive sidebar with file tree, search, and outline panels

## Navigating the Portfolio

**Preview mode** — Files under `projects/`, `experience/`, and `skills.ts` support a rich preview. Click the preview toggle in the tab bar or press `Ctrl+Shift+V` to switch between source code and a formatted view.

**Quick open** — Press `Ctrl+P` to fuzzy-search any file by name. Use `Ctrl+Shift+P` to open the command palette for themes, fonts, and quick actions.

**Sidebar panels** — The activity bar on the left gives access to the file explorer, full-text search, document outline, a portfolio overview, and an AI chat assistant you can ask questions about the portfolio.

**Terminal** — The integrated terminal supports commands like `ls`, `cat`, `git log` (shows career history as commits), `whoami`, `theme <name>`, and `help`.

**Keyboard shortcuts**

| Action | Shortcut |
|--------|----------|
| Quick Open | `Ctrl+P` |
| Command Palette | `Ctrl+Shift+P` |
| Toggle Preview | `Ctrl+Shift+V` |
| Toggle Sidebar | `Ctrl+B` |
| Close Tab | `Ctrl+W` |

## Tech Stack

- React 19, TypeScript, Vite
- Monaco Editor
- xterm.js
- Vitest + React Testing Library

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build |
| `npm run test` | Run tests in watch mode |
| `npm run test:run` | Run tests once |
| `npm run lint` | Lint with ESLint |
