const STORAGE_PREFIX = 'ide-portfolio:';

interface Storage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

function getStorage(): Storage | null {
  try {
    // Test if localStorage is available and functional
    const test = '__storage_test__';
    window.localStorage.setItem(test, test);
    window.localStorage.removeItem(test);
    return window.localStorage;
  } catch {
    return null;
  }
}

export function savePreference(key: string, value: string, storage?: Storage): void {
  const store = storage ?? getStorage();
  if (store) {
    store.setItem(`${STORAGE_PREFIX}${key}`, value);
  }
}

export function loadPreference(key: string, defaultValue?: string, storage?: Storage): string | undefined {
  const store = storage ?? getStorage();
  if (store) {
    const value = store.getItem(`${STORAGE_PREFIX}${key}`);
    return value ?? defaultValue;
  }
  return defaultValue;
}

export function loadRecentFiles(storage?: Storage): string[] {
  const store = storage ?? getStorage();
  if (store) {
    const raw = store.getItem(`${STORAGE_PREFIX}recentFiles`);
    if (raw) {
      try { return JSON.parse(raw); } catch { return []; }
    }
  }
  return [];
}

export function saveRecentFiles(files: string[], storage?: Storage): void {
  const store = storage ?? getStorage();
  if (store) {
    store.setItem(`${STORAGE_PREFIX}recentFiles`, JSON.stringify(files));
  }
}
