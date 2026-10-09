// Loads .env.local / .env for CLI scripts, the same way Next.js does.
const fs = require('fs');
const path = require('path');

for (const f of ['.env.local', '.env']) {
  const file = path.join(process.cwd(), f);
  if (!fs.existsSync(file)) continue;
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
