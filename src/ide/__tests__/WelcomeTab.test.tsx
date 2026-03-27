import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IDEProvider } from '../IDEProvider';
import { WelcomeTab } from '../welcome/WelcomeTab';

function renderWelcome() {
  return render(
    <IDEProvider>
      <WelcomeTab />
    </IDEProvider>,
  );
}

describe('WelcomeTab', () => {
  it('renders the header with name and role', () => {
    renderWelcome();
    expect(screen.getByText('Erick')).toBeInTheDocument();
    expect(screen.getByText('Full-Stack Software Engineer')).toBeInTheDocument();
  });

  it('renders four walkthrough rows', () => {
    renderWelcome();
    expect(screen.getByText('View projects')).toBeInTheDocument();
    expect(screen.getByText('Read resume')).toBeInTheDocument();
    expect(screen.getByText('Chat with Erick')).toBeInTheDocument();
    expect(screen.getByText('Get in touch')).toBeInTheDocument();
  });

  it('renders the RECENT section with default files', () => {
    renderWelcome();
    expect(screen.getByText('RECENT')).toBeInTheDocument();
    // Default recent files should show
    expect(screen.getByText('about.ts')).toBeInTheDocument();
    expect(screen.getByText('skills.ts')).toBeInTheDocument();
    expect(screen.getByText('project-alpha.tsx')).toBeInTheDocument();
  });

  it('renders the CONNECT section', () => {
    renderWelcome();
    expect(screen.getByText('CONNECT')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders the ABOUT THIS PORTFOLIO section', () => {
    renderWelcome();
    expect(screen.getByText('ABOUT THIS PORTFOLIO')).toBeInTheDocument();
    expect(screen.getByText("How it's built")).toBeInTheDocument();
    expect(screen.getByText('View source on GitHub')).toBeInTheDocument();
  });
});
