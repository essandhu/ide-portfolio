import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Splitter } from '../Splitter';

describe('Splitter', () => {
  it('renders the drag handle', () => {
    render(<Splitter direction="horizontal" onResize={() => {}} />);
    expect(screen.getByTestId('splitter')).toBeInTheDocument();
  });

  it('has the correct direction class', () => {
    render(<Splitter direction="vertical" onResize={() => {}} />);
    const splitter = screen.getByTestId('splitter');
    expect(splitter.className).toContain('vertical');
  });

  it('fires resize callback on mousedown + mousemove', () => {
    let lastDelta = 0;
    render(<Splitter direction="horizontal" onResize={(delta) => { lastDelta = delta; }} />);
    const splitter = screen.getByTestId('splitter');
    fireEvent.mouseDown(splitter, { clientX: 100, clientY: 0 });
    fireEvent.mouseMove(document, { clientX: 150, clientY: 0 });
    fireEvent.mouseUp(document);
    expect(lastDelta).toBe(50);
  });

  it('fires vertical resize based on clientY', () => {
    let lastDelta = 0;
    render(<Splitter direction="vertical" onResize={(delta) => { lastDelta = delta; }} />);
    const splitter = screen.getByTestId('splitter');
    fireEvent.mouseDown(splitter, { clientX: 0, clientY: 200 });
    fireEvent.mouseMove(document, { clientX: 0, clientY: 180 });
    fireEvent.mouseUp(document);
    expect(lastDelta).toBe(-20);
  });
});
