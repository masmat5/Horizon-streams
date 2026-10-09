// Shared by pages (browser + server). No Node-only imports here.
export const CATEGORIES = {
  'Streaming Tips': '#7c3aed',
  'Server Update': '#06b6d4',
  'How To': '#f59e0b',
  News: '#4ade80',
};

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// ISO string -> "October 8, 2026" (UTC, so server and browser always agree)
export function formatDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

// ISO string -> "October 2026"
export function monthLabel(iso) {
  const d = new Date(iso);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}
