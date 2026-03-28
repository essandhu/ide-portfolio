import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IDEProvider } from '../IDEProvider';
import { WelcomeTab } from '../welcome/WelcomeTab';
import { profile, projectPath } from '../../config/profile';

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
    expect(screen.getByText(profile.name)).toBeInTheDocument();
    expect(screen.getByText(profile.title)).toBeInTheDocument();
  });

  it('renders walkthrough sections', () => {
    renderWelcome();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Read resume')).toBeInTheDocument();
    expect(screen.getByText(`Chat with ${profile.name}`)).toBeInTheDocument();
    expect(screen.getByText('Get in touch')).toBeInTheDocument();
  });

  it('renders individual project links', () => {
    renderWelcome();
    for (const project of profile.projects) {
      expect(screen.getByText(project.name)).toBeInTheDocument();
    }
  });

  it('renders the RECENT section with default files', () => {
    renderWelcome();
    expect(screen.getByText('RECENT')).toBeInTheDocument();
    // Default recent files should show
    expect(screen.getByText('about.ts')).toBeInTheDocument();
    expect(screen.getByText('skills.ts')).toBeInTheDocument();
    const firstProjectFile = projectPath(0).split('/').pop()!;
    expect(screen.getByText(firstProjectFile)).toBeInTheDocument();
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
