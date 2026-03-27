import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IDEProvider } from '../IDEProvider';
import { PortfolioPanel } from '../sidebar/PortfolioPanel';
import { profile } from '../../config/profile';

function renderPortfolioPanel() {
  return render(
    <IDEProvider>
      <PortfolioPanel />
    </IDEProvider>,
  );
}

describe('PortfolioPanel', () => {
  beforeEach(() => {
    try { localStorage.removeItem('ide-portfolio:portfolioHintDismissed'); } catch { /* noop */ }
    try { localStorage.removeItem('ide-portfolio:hasVisited'); } catch { /* noop */ }
  });

  it('renders portfolio sections', () => {
    renderPortfolioPanel();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('shows project items when section is expanded', async () => {
    renderPortfolioPanel();
    const projectsHeader = screen.getByText('Projects');
    await userEvent.click(projectsHeader);
    expect(screen.getByText(profile.projects[0]?.name ?? 'Project')).toBeInTheDocument();
    expect(screen.getByText(profile.projects[1]?.name ?? 'Project')).toBeInTheDocument();
  });

  it('shows first-visit hint', () => {
    try { localStorage.removeItem('ide-portfolio:portfolioHintDismissed'); } catch { /* noop */ }
    try { localStorage.removeItem('ide-portfolio:hasVisited'); } catch { /* noop */ }
    renderPortfolioPanel();
    expect(screen.getByText('Click any section to explore')).toBeInTheDocument();
  });

  it('dismisses hint after clicking a section', async () => {
    try { localStorage.removeItem('ide-portfolio:portfolioHintDismissed'); } catch { /* noop */ }
    try { localStorage.removeItem('ide-portfolio:hasVisited'); } catch { /* noop */ }
    renderPortfolioPanel();
    expect(screen.getByText('Click any section to explore')).toBeInTheDocument();
    const projectsHeader = screen.getByText('Projects');
    await userEvent.click(projectsHeader);
    expect(screen.queryByText('Click any section to explore')).not.toBeInTheDocument();
  });
});
