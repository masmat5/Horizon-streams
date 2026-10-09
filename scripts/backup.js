// Usage: npm run backup   -> writes backups/posts-YYYY-MM-DD-HHMM.json (all posts incl. drafts)
// Run it from a Hostinger cron job (hPanel > Advanced > Cron Jobs) to keep daily copies.
require('./loadEnv');
const fs = require('fs');
const path = require('path');
const { exportAll } = require('../lib/posts');
const { getPool } = require('../lib/db');

(async () => {
  const posts = await exportAll();
  const dir = process.env.BACKUP_DIR || path.join(process.cwd(), 'backups');
  fs.mkdirSync(dir, { recursive: true });
  const stamp = new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-');
  const file = path.join(dir, `posts-${stamp}.json`);
  fs.writeFileSync(file, JSON.stringify({ exportedAt: new Date().toISOString(), posts }, null, 2));
  // keep the 30 newest backups
  const old = fs.readdirSync(dir).filter((f) => /^posts-.*\.json$/.test(f)).sort().reverse().slice(30);
  old.forEach((f) => fs.unlinkSync(path.join(dir, f)));
  console.log(`Backed up ${posts.length} posts -> ${file}`);
})()
  .catch((e) => { console.error('Backup failed:', e.message); process.exitCode = 1; })
  .finally(() => getPool().end());
