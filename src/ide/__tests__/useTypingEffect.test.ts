import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTypingEffect } from '../sidebar/useTypingEffect';

describe('useTypingEffect', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns empty string when text is empty', () => {
    const { result } = renderHook(() => useTypingEffect('', 30));
    expect(result.current.displayedText).toBe('');
    expect(result.current.isTyping).toBe(false);
  });

  it('reveals text word by word over time', () => {
    const { result } = renderHook(() => useTypingEffect('hello world foo', 30));

    expect(result.current.displayedText).toBe('hello');
    expect(result.current.isTyping).toBe(true);

    act(() => { vi.advanceTimersByTime(30); });
    expect(result.current.displayedText).toBe('hello world');

    act(() => { vi.advanceTimersByTime(30); });
    expect(result.current.displayedText).toBe('hello world foo');
    expect(result.current.isTyping).toBe(false);
  });

  it('resets when text changes', () => {
    const { result, rerender } = renderHook(
      ({ text }) => useTypingEffect(text, 30),
      { initialProps: { text: 'aaa bbb' } },
    );

    act(() => { vi.advanceTimersByTime(30); });
    expect(result.current.displayedText).toBe('aaa bbb');

    rerender({ text: 'ccc ddd eee' });
    expect(result.current.displayedText).toBe('ccc');
    expect(result.current.isTyping).toBe(true);
  });

  it('cleans up interval on unmount', () => {
    const clearSpy = vi.spyOn(globalThis, 'clearInterval');
    const { unmount } = renderHook(() => useTypingEffect('hello world', 30));
    unmount();
    expect(clearSpy).toHaveBeenCalled();
    clearSpy.mockRestore();
  });
});
