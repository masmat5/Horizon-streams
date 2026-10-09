const test = require('node:test');
const assert = require('node:assert/strict');
const { cleanInput, slugify } = require('../lib/posts');
const { ValidationError } = require('../lib/errors');

const ok = { title: 'My First Post!', content: '<p>Hello</p>' };

test('slugify', () => {
  assert.equal(slugify('Best IPTV 2026: Top 5!'), 'best-iptv-2026-top-5');
  assert.equal(slugify('  --Cafe  Creme--'), 'cafe-creme');
  assert.equal(slugify('!!!'), '');
});

test('valid input is normalised', () => {
  const p = cleanInput(ok);
  assert.equal(p.slug, 'my-first-post');
  assert.equal(p.category, 'News');
  assert.equal(p.status, 'published');
  assert.ok(p.publishedAt instanceof Date);
});

test('rejects bad input with ValidationError', () => {
  const bad = [
    {}, { title: '   ', content: '<p>x</p>' }, { title: 'a'.repeat(256), content: '<p>x</p>' },
    { title: 'T', content: '' }, { title: 'T', content: '<script>x</script>' },
    { ...ok, image: 'javascript:alert(1)' }, { ...ok, image: 'ftp://x/y.png' },
    { ...ok, publishedAt: 'not-a-date' }, { title: '!!!', content: '<p>x</p>' },
  ];
  for (const b of bad) assert.throws(() => cleanInput(b), ValidationError, JSON.stringify(b));
});

test('accepts uploaded and https images, unknown category falls back', () => {
  assert.equal(cleanInput({ ...ok, image: '/uploads/a.png' }).image, '/uploads/a.png');
  assert.equal(cleanInput({ ...ok, image: 'https://x.com/a.jpg' }).image, 'https://x.com/a.jpg');
  assert.equal(cleanInput({ ...ok, category: 'Hacked' }).category, 'News');
  assert.equal(cleanInput({ ...ok, status: 'draft' }).status, 'draft');
});

test('empty rich-text editor output is rejected, text-less image posts are allowed', () => {
  assert.throws(() => cleanInput({ title: 'T', content: '<p></p>' }), ValidationError);
  assert.throws(() => cleanInput({ title: 'T', content: '<p>&nbsp;</p><p> </p>' }), ValidationError);
  assert.ok(cleanInput({ title: 'T', content: '<p><img src="/uploads/a.png" alt=""></p>' }));
});

test('summary is generated from the post when left empty', () => {
  const long = '<p>' + 'word '.repeat(80) + '</p>';
  const p = cleanInput({ title: 'T', content: long });
  assert.ok(p.excerpt.length > 100 && p.excerpt.length <= 160, p.excerpt.length);
  assert.ok(p.excerpt.endsWith('…'));
  assert.equal(cleanInput({ title: 'T', content: '<p>Short post</p>' }).excerpt, 'Short post');
  assert.equal(cleanInput({ title: 'T', content: '<p>x</p>', excerpt: 'Mine' }).excerpt, 'Mine');
});
