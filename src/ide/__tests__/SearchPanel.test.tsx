import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IDEProvider } from '../IDEProvider';
import { SearchPanel } from '../sidebar/SearchPanel';

function renderSearchPanel() {
  return render(
    <IDEProvider>
      <SearchPanel />
    </IDEProvider>,
  );
}

describe('SearchPanel', () => {
  it('renders search input', () => {
    renderSearchPanel();
    expect(screen.getByPlaceholderText('Search portfolio...')).toBeInTheDocument();
  });

  it('shows results when typing a matching query', async () => {
    renderSearchPanel();
    const input = screen.getByPlaceholderText('Search portfolio...');
    await userEvent.type(input, 'export');
    // Wait for debounce
    await new Promise(r => setTimeout(r, 300));
    const results = screen.getByTestId('search-results');
    expect(results.children.length).toBeGreaterThan(0);
  });

  it('shows no results message for non-matching query', async () => {
    renderSearchPanel();
    const input = screen.getByPlaceholderText('Search portfolio...');
    await userEvent.type(input, 'zzzzzzzznotfound');
    await new Promise(r => setTimeout(r, 300));
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('highlights matching text with mark tag', async () => {
    renderSearchPanel();
    const input = screen.getByPlaceholderText('Search portfolio...');
    await userEvent.type(input, 'export');
    await new Promise(r => setTimeout(r, 300));
    const marks = screen.getByTestId('search-results').querySelectorAll('mark');
    expect(marks.length).toBeGreaterThan(0);
  });
});
