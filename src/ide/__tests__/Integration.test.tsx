import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('../../ai/chatClient', () => ({
  sendChatMessage: vi.fn().mockResolvedValue({ text: 'AI response', fallback: false }),
}));

// We need to control persistence behavior for welcome-tab tests.
// The IDEProvider checks loadPreference('hasVisited') to decide whether to
// show the welcome tab. In happy-dom, localStorage is non-functional, so we
// mock the persistence module to simulate first-visit vs return-visit.
const mockLoadPreference = vi.fn<(key: string, defaultValue?: string) => string | undefined>();
const mockSavePreference = vi.fn();
const mockLoadRecentFiles = vi.fn<() => string[]>().mockReturnValue([]);
const mockSaveRecentFiles = vi.fn();

vi.mock('../persistence', () => ({
  loadPreference: (...args: unknown[]) => mockLoadPreference(args[0] as string, args[1] as string | undefined),
  savePreference: (...args: unknown[]) => mockSavePreference(...args),
  loadRecentFiles: () => mockLoadRecentFiles(),
  saveRecentFiles: (...args: unknown[]) => mockSaveRecentFiles(...args),
}));

// Import after mocks are set up
import { IDEProvider } from '../IDEProvider';
import { IDE } from '../IDE';

const renderIDE = () =>
  render(
    <IDEProvider>
      <IDE />
    </IDEProvider>,
  );

describe('Feature integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLoadRecentFiles.mockReturnValue([]);
  });

  it('Welcome tab always opens', () => {
    mockLoadPreference.mockReturnValue(undefined);

    renderIDE();
    expect(screen.getByTestId('welcome-tab')).toBeInTheDocument();
    expect(screen.getByText('Read resume')).toBeInTheDocument();
  });

  it('menu bar is visible with all four menus', () => {
    mockLoadPreference.mockReturnValue(undefined);

    renderIDE();
    expect(screen.getByTestId('menubar-bar')).toBeInTheDocument();
    expect(screen.getByText('File')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('View')).toBeInTheDocument();
    expect(screen.getByText('Help')).toBeInTheDocument();
  });

  it('activity bar has five icons including outline and portfolio', () => {
    mockLoadPreference.mockReturnValue(undefined);

    renderIDE();
    expect(screen.getByLabelText('Explorer')).toBeInTheDocument();
    expect(screen.getByLabelText('Search')).toBeInTheDocument();
    expect(screen.getByLabelText('Outline')).toBeInTheDocument();
    expect(screen.getByLabelText('Portfolio')).toBeInTheDocument();
    expect(screen.getByLabelText('Chat')).toBeInTheDocument();
  });

  it('Copilot chat shows starter prompts', async () => {
    mockLoadPreference.mockReturnValue(undefined);

    renderIDE();
    // Click the Chat activity bar icon
    await userEvent.click(screen.getByLabelText('Chat'));
    expect(screen.getByText(/Not sure where to start/)).toBeInTheDocument();
  });
});
