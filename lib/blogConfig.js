// Shared by pages (browser + server). No Node-only imports here.
export const CATEGORIES = {
  'Streaming Tips': '#0f8a7a',
  'Server Update': '#3b6fd4',
  'How To': '#e8654a',
  News: '#b7791f',
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
