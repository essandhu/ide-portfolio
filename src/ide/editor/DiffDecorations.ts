export interface DiffDecoration {
  range: {
    startLineNumber: number;
    endLineNumber: number;
    startColumn: number;
    endColumn: number;
  };
  options: {
    isWholeLine: boolean;
    linesDecorationsClassName: string;
  };
}

export function computeDiffDecorations(
  current: string,
  original: string,
): DiffDecoration[] {
  const currentLines = current.split('\n');
  const originalLines = original.split('\n');
  const decorations: DiffDecoration[] = [];

  for (let i = 0; i < currentLines.length; i++) {
    const lineNumber = i + 1;

    if (i >= originalLines.length) {
      // Line doesn't exist in original — it's added
      decorations.push({
        range: {
          startLineNumber: lineNumber,
          endLineNumber: lineNumber,
          startColumn: 1,
          endColumn: 1,
        },
        options: {
          isWholeLine: true,
          linesDecorationsClassName: 'diff-gutter-added',
        },
      });
    } else if (currentLines[i] !== originalLines[i]) {
      // Line exists in both but differs — it's modified
      decorations.push({
        range: {
          startLineNumber: lineNumber,
          endLineNumber: lineNumber,
          startColumn: 1,
          endColumn: 1,
        },
        options: {
          isWholeLine: true,
          linesDecorationsClassName: 'diff-gutter-modified',
        },
      });
    }
  }

  return decorations;
}
