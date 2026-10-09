// Usage: npm run seed   (imports the 9 starter posts, only when the posts table is empty)
require('./loadEnv');
const { seedStarterPosts } = require('../lib/posts');
const { getPool } = require('../lib/db');

seedStarterPosts()
  .then((n) => console.log(n ? `Imported ${n} posts.` : 'Posts table is not empty - nothing imported.'))
  .catch((e) => { console.error(e.message); process.exitCode = 1; })
  .finally(() => getPool().end());
