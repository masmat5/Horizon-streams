// Usage: npm run restore -- backups/posts-2026-10-09-1200.json
// Posts are matched by slug: existing ones are updated, missing ones are created. Nothing is deleted.
require('./loadEnv');
const fs = require('fs');
const { restoreFromBackup } = require('../lib/posts');
const { getPool } = require('../lib/db');

const file = process.argv[2];
if (!file || !fs.existsSync(file)) {
  console.error('Usage: npm run restore -- <backup-file.json>');
  process.exit(1);
}

(async () => {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (!Array.isArray(data.posts)) throw new Error('Not a valid backup file (no "posts" list)');
  const r = await restoreFromBackup(data.posts.map((p) => ({ ...p, publishedAt: p.publishedAt })));
  console.log(`Restored: ${r.created} created, ${r.updated} updated.`);
})()
  .catch((e) => { console.error('Restore failed:', e.message); process.exitCode = 1; })
  .finally(() => getPool().end());
