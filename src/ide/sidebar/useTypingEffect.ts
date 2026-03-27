import { useState, useEffect, useRef } from 'react';

interface TypingEffectResult {
  displayedText: string;
  isTyping: boolean;
}

export const useTypingEffect = (text: string, msPerWord: number = 30): TypingEffectResult => {
  const [wordIndex, setWordIndex] = useState(1);
  const wordsRef = useRef<string[]>(text ? text.split(/\s+/) : []);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Keep wordsRef in sync eagerly so the current render always has fresh words
  wordsRef.current = text ? text.split(/\s+/) : [];

  useEffect(() => {
    if (!text) {
      setWordIndex(0);
      return;
    }

    setWordIndex(1);

    intervalRef.current = setInterval(() => {
      setWordIndex((prev) => {
        const next = prev + 1;
        if (next >= wordsRef.current.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return wordsRef.current.length;
        }
        return next;
      });
    }, msPerWord);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, msPerWord]);

  const displayedText = wordsRef.current.slice(0, wordIndex).join(' ');
  const isTyping = text !== '' && wordIndex < wordsRef.current.length;

  return { displayedText, isTyping };
};
