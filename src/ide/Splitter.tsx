import { useCallback, useRef } from 'react';
import styles from './Splitter.module.css';

interface SplitterProps {
  direction: 'horizontal' | 'vertical';
  onResize: (delta: number) => void;
}

export function Splitter({ direction, onResize }: SplitterProps) {
  const startPos = useRef(0);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      startPos.current = direction === 'horizontal' ? e.clientX : e.clientY;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const currentPos =
          direction === 'horizontal' ? moveEvent.clientX : moveEvent.clientY;
        const delta = currentPos - startPos.current;
        onResize(delta);
        startPos.current = currentPos;
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [direction, onResize],
  );

  return (
    <div
      className={`${styles.splitter} ${styles[direction]}`}
      data-testid="splitter"
      onMouseDown={handleMouseDown}
    />
  );
}
