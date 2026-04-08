export const STORAGE_KEYS = {
  form: 'roadmap-calculator-form',
  result: 'roadmap-calculation-result'
};

export function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // no-op if storage is blocked
  }
}
