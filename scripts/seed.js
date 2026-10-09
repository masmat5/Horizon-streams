// Usage: npm run seed   (imports the 9 starter posts, only when the posts table is empty)
const fs = require('fs');
const path = require('path');

// load .env.local / .env the same way Next.js does
for (const f of ['.env.local', '.env']) {
  const file = path.join(process.cwd(), f);
  if (!fs.existsSync(file)) continue;
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const { seedStarterPosts } = require('../lib/posts');
const { getPool } = require('../lib/db');

seedStarterPosts()
  .then((n) => console.log(n ? `Imported ${n} posts.` : 'Posts table is not empty - nothing imported.'))
  .catch((e) => { console.error(e.message); process.exitCode = 1; })
  .finally(() => getPool().end());
