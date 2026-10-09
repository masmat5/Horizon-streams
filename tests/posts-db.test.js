// Integration tests against a REAL MySQL database. They only run when DB_NAME ends in "_test"
// so they can never touch real data. CI provides such a database; locally:
//   DB_NAME=horizonstream_test npm test
const test = require('node:test');
const assert = require('node:assert/strict');

const enabled = /_test$/.test(process.env.DB_NAME || '');
const opts = { skip: enabled ? false : 'set DB_NAME=<something>_test to run database tests' };

test('posts: create, list, paginate, schedule, search, update, delete', opts, async () => {
  const posts = require('../lib/posts');
  const { db, getPool } = require('../lib/db');
  const pool = await db();
  await pool.query('DELETE FROM posts');
  try {
    for (let i = 1; i <= 12; i += 1) {
      await posts.create({ title: `Post number ${i}`, content: `<p>Body ${i} firestick</p>`, publishedAt: new Date(Date.now() - i * 3600e3) });
    }
    await posts.create({ title: 'A draft', content: '<p>d</p>', status: 'draft' });
    await posts.create({ title: 'From the future', content: '<p>f</p>', publishedAt: new Date(Date.now() + 86400e3) });

    const p1 = await posts.listPublished({ page: 1, perPage: 5 });
    assert.equal(p1.total, 12, 'drafts and scheduled posts are hidden');
    assert.equal(p1.totalPages, 3);
    assert.equal(p1.posts.length, 5);
    assert.equal(p1.posts[0].title, 'Post number 1', 'newest first');
    assert.equal(p1.posts[0].content, undefined, 'list queries do not load bodies');
    const p3 = await posts.listPublished({ page: 3, perPage: 5 });
    assert.equal(p3.posts.length, 2);
    assert.equal((await posts.listPublished({ page: 999, perPage: 5 })).page, 3, 'page is clamped');

    assert.equal(await posts.getPublishedBySlug('a-draft'), null);
    assert.equal(await posts.getPublishedBySlug('from-the-future'), null);
    assert.ok(await posts.getPublishedBySlug('post-number-1'));

    assert.equal((await posts.listPublished({ search: 'number 7' })).total, 1);
    assert.equal((await posts.listPublished({ search: '%' })).total, 0, 'LIKE wildcards are escaped');
    assert.equal((await posts.listPublished({ search: "x'; DROP TABLE posts;--" })).total, 0);

    const dup = await posts.create({ title: 'Post number 1', content: '<p>again</p>' });
    assert.equal(dup.slug, 'post-number-1-2', 'duplicate slugs get a suffix');

    const edited = await posts.update(dup.id, { title: 'Renamed', content: '<p>new</p>' });
    assert.equal(edited.slug, 'renamed');
    assert.equal((await posts.getPublishedBySlug('renamed')).content, '<p>new</p>', 'cache is cleared on update');

    assert.equal(await posts.remove(dup.id), true);
    assert.equal(await posts.remove(dup.id), false);
    assert.equal(await posts.getPublishedBySlug('renamed'), null, 'cache is cleared on delete');

    const admin = await posts.listAdmin({ page: 1, perPage: 5 });
    assert.equal(admin.total, 14, 'admin sees drafts and scheduled too');

    const backup = await posts.exportAll();
    assert.equal(backup.length, 14);
    assert.ok(backup[0].content);

    const table = await posts.restoreFromBackup([{ ...backup[0], title: 'Restored title' }, { title: 'Brand new', content: '<p>n</p>' }]);
    assert.deepEqual(table, { created: 1, updated: 1 });
  } finally {
    await pool.query('DELETE FROM posts');
    await getPool().end();
    delete global.__hsPool;
    delete global.__hsSchema;
  }
});
