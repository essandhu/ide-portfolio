export type ChatAction =
  | { action: 'openFile'; path: string }
  | { action: 'togglePreview'; path: string }
  | { action: 'focusPanel'; panel: string }
  | { action: 'setTheme'; themeId: string }
  | { action: 'openWelcome' };

export function parseActions(response: string): { text: string; actions: ChatAction[] } {
  const actions: ChatAction[] = [];
  const pattern = /%%ACTION%%(.*?)%%END%%/g;
  let match;
  let text = response;
  while ((match = pattern.exec(response)) !== null) {
    text = text.replace(match[0], '');
    try {
      const parsed = JSON.parse(match[1]);
      if (parsed && parsed.action) {
        actions.push(parsed as ChatAction);
      }
    } catch { /* skip malformed */ }
  }
  return { text: text.trim(), actions };
}
