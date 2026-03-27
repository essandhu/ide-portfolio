export function fuzzyMatchFiles(query: string, files: string[]): string[] {
  if (!query) return files;
  const lower = query.toLowerCase();
  return files
    .map(file => {
      const fileName = file.split('/').pop()?.toLowerCase() ?? '';
      const fileLower = file.toLowerCase();
      let score = 0;
      if (fileName === lower) score = 100;
      else if (fileName.startsWith(lower)) score = 80;
      else if (fileName.includes(lower)) score = 60;
      else if (fileLower.includes(lower)) score = 40;
      else {
        let qi = 0;
        for (const ch of fileLower) {
          if (qi < lower.length && ch === lower[qi]) qi++;
        }
        if (qi === lower.length) score = 20;
      }
      return { file, score };
    })
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(r => r.file);
}
