const fs = require('fs');
const path = require('path');
const { db } = require('./db');
const { cleanContent } = require('./sanitize');

const CATEGORIES = ['Streaming Tips', 'Server Update', 'How To', 'News'];

const iso = (d) => (d instanceof Date ? d.toISOString() : new Date(d).toISOString());

// DB row -> plain JSON (getServerSideProps cannot serialize Date objects)
function mapRow(r) {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    category: r.category,
    excerpt: r.excerpt,
    content: r.content,
    image: r.image,
    author: r.author,
    status: r.status,
    publishedAt: iso(r.published_at),
    updatedAt: iso(r.updated_at),
  };
}

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}

// Validates and normalises admin input. Throws Error with a user-facing message.
function cleanInput(body) {
  const title = String(body.title || '').trim();
  if (!title) throw new Error('Title is required');
  if (title.length > 255) throw new Error('Title is too long (max 255)');

  const slug = slugify(body.slug || title);
  if (!slug) throw new Error('Slug could not be created from the title');

  const category = CATEGORIES.includes(body.category) ? body.category : 'News';
  const excerpt = String(body.excerpt || '').trim().slice(0, 600);
  const content = cleanContent(body.content);
  if (!content.trim()) throw new Error('Post content is required');

  const image = String(body.image || '').trim();
  if (image && !/^(https?:\/\/|\/uploads\/)/i.test(image)) throw new Error('Image must be an http(s) URL or an uploaded file');
  if (image.length > 500) throw new Error('Image URL is too long');

  const author = String(body.author || 'HorizonStream IPTV Team').trim().slice(0, 120) || 'HorizonStream IPTV Team';
  const status = body.status === 'draft' ? 'draft' : 'published';

  const when = body.publishedAt ? new Date(body.publishedAt) : new Date();
  if (Number.isNaN(when.getTime())) throw new Error('Invalid publish date');

  return { slug, title, category, excerpt, content, image, author, status, publishedAt: when };
}

// ---------- public reads (only live posts: published and not scheduled for later)
async function listPublished({ search = '', limit = 60 } = {}) {
  const pool = await db();
  const params = [new Date()];
  let where = "status = 'published' AND published_at <= ?";
  const q = String(search || '').trim().slice(0, 80);
  if (q) {
    where += ' AND (title LIKE ? OR excerpt LIKE ? OR content LIKE ?)';
    const like = `%${q.replace(/[\\%_]/g, '\\$&')}%`;
    params.push(like, like, like);
  }
  params.push(Number(limit));
  const [rows] = await pool.query(`SELECT * FROM posts WHERE ${where} ORDER BY published_at DESC, id DESC LIMIT ?`, params);
  return rows.map(mapRow);
}

async function getPublishedBySlug(slug) {
  const pool = await db();
  const [rows] = await pool.query("SELECT * FROM posts WHERE slug = ? AND status = 'published' AND published_at <= ? LIMIT 1", [slug, new Date()]);
  return rows[0] ? mapRow(rows[0]) : null;
}

// ---------- admin
async function listAll() {
  const pool = await db();
  const [rows] = await pool.query('SELECT * FROM posts ORDER BY published_at DESC, id DESC');
  return rows.map(mapRow);
}

async function getById(id) {
  const pool = await db();
  const [rows] = await pool.query('SELECT * FROM posts WHERE id = ? LIMIT 1', [Number(id)]);
  return rows[0] ? mapRow(rows[0]) : null;
}

async function uniqueSlug(pool, slug, exceptId = 0) {
  let candidate = slug;
  for (let n = 2; n < 100; n += 1) {
    const [rows] = await pool.query('SELECT id FROM posts WHERE slug = ? AND id <> ? LIMIT 1', [candidate, exceptId]);
    if (!rows.length) return candidate;
    candidate = `${slug}-${n}`;
  }
  throw new Error('Could not find a free slug');
}

async function create(body) {
  const pool = await db();
  const p = cleanInput(body);
  p.slug = await uniqueSlug(pool, p.slug);
  const [res] = await pool.query(
    'INSERT INTO posts (slug, title, category, excerpt, content, image, author, status, published_at, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
    [p.slug, p.title, p.category, p.excerpt, p.content, p.image, p.author, p.status, p.publishedAt, new Date(), new Date()]
  );
  return getById(res.insertId);
}

async function update(id, body) {
  const pool = await db();
  const p = cleanInput(body);
  p.slug = await uniqueSlug(pool, p.slug, Number(id));
  const [res] = await pool.query(
    'UPDATE posts SET slug=?, title=?, category=?, excerpt=?, content=?, image=?, author=?, status=?, published_at=?, updated_at=? WHERE id=?',
    [p.slug, p.title, p.category, p.excerpt, p.content, p.image, p.author, p.status, p.publishedAt, new Date(), Number(id)]
  );
  if (!res.affectedRows) return null;
  return getById(id);
}

async function remove(id) {
  const pool = await db();
  const [res] = await pool.query('DELETE FROM posts WHERE id = ?', [Number(id)]);
  return res.affectedRows > 0;
}

async function count() {
  const pool = await db();
  const [[row]] = await pool.query('SELECT COUNT(*) AS n FROM posts');
  return row.n;
}

// Imports the starter posts that used to be hardcoded in the site (only if table is empty).
async function seedStarterPosts() {
  if ((await count()) > 0) return 0;
  const file = path.join(process.cwd(), 'scripts', 'seed-posts.json');
  const rows = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (const r of rows) {
    // eslint-disable-next-line no-await-in-loop
    await create({ ...r, publishedAt: r.published_at, status: 'published' });
  }
  return rows.length;
}

module.exports = {
  CATEGORIES, listPublished, getPublishedBySlug, listAll, getById, create, update, remove, count, seedStarterPosts,
};
