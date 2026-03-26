import type { GhostComment } from '../../terminal/VirtualFileSystem';

export interface GhostDecoration {
  range: {
    startLineNumber: number;
    endLineNumber: number;
    startColumn: number;
    endColumn: number;
  };
  options: {
    after?: {
      content: string;
      inlineClassName: string;
    };
    isWholeLine: boolean;
  };
}

export function createGhostDecorations(comments: GhostComment[]): GhostDecoration[] {
  return comments.map((comment) => {
    const delayClass = comment.delay !== undefined
      ? ` ghost-delay-${comment.delay}`
      : '';

    return {
      range: {
        startLineNumber: comment.line,
        endLineNumber: comment.line,
        startColumn: 1,
        endColumn: 1,
      },
      options: {
        after: {
          content: `  ${comment.text}`,
          inlineClassName: `ghost-comment${delayClass}`,
        },
        isWholeLine: true,
      },
    };
  });
}
