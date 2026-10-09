const fs = require('fs');
const path = require('path');
const { db } = require('./db');
const { cleanContent } = require('./sanitize');
const { ValidationError } = require('./errors');
const { cached, clearCache } = require('./cache');

const CATEGORIES = ['Streaming Tips', 'Server Update', 'How To', 'News'];
const PUBLIC_TTL = 60 * 1000; // public reads may be up to 1 minute stale
const LIST_COLUMNS = 'id, slug, title, category, excerpt, image, author, status, published_at, updated_at'; // no body: keeps list queries light

const iso = (d) => (d instanceof Date ? d.toISOString() : new Date(d).toISOString());

// DB row -> plain JSON (getServerSideProps cannot serialize Date or undefined)
function mapRow(r) {
  const post = {
    id: r.id,
    slug: r.slug,
    title: r.title,
    category: r.category,
    excerpt: r.excerpt,
    image: r.image,
    author: r.author,
    status: r.status,
    publishedAt: iso(r.published_at),
    updatedAt: iso(r.updated_at),
  };
  if (r.content !== undefined) post.content = r.content;
  return post;
}

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}

// Validates and normalises admin input. Throws ValidationError with a user-facing message.
function cleanInput(body) {
  const title = String(body.title || '').trim();
  if (!title) throw new ValidationError('Title is required');
  if (title.length > 255) throw new ValidationError('Title is too long (max 255)');

  const slug = slugify(body.slug || title);
  if (!slug) throw new ValidationError('Slug could not be created from the title');

  const category = CATEGORIES.includes(body.category) ? body.category : 'News';
  const excerpt = String(body.excerpt || '').trim().slice(0, 600);
  const content = cleanContent(body.content);
  if (!content.trim()) throw new ValidationError('Post content is required');

  const image = String(body.image || '').trim();
  if (image && !/^(https?:\/\/|\/uploads\/)/i.test(image)) throw new ValidationError('Image must be an http(s) URL or an uploaded file');
  if (image.length > 500) throw new ValidationError('Image URL is too long');

  const author = String(body.author || 'HorizonStream IPTV Team').trim().slice(0, 120) || 'HorizonStream IPTV Team';
  const status = body.status === 'draft' ? 'draft' : 'published';

  const when = body.publishedAt ? new Date(body.publishedAt) : new Date();
  if (Number.isNaN(when.getTime())) throw new ValidationError('Invalid publish date');
  when.setMilliseconds(0); // DATETIME has 1-second precision and rounds UP: a post stamped 'now' would look future-dated

  return { slug, title, category, excerpt, content, image, author, status, publishedAt: when };
}

const clampPage = (n) => Math.max(1, Math.min(Number.parseInt(n, 10) || 1, 10000));

// ---------- public reads (only live posts: published and not scheduled for later) ----------
async function listPublished({ search = '', page = 1, perPage = 10 } = {}) {
  const q = String(search || '').trim().slice(0, 80);
  const pg = clampPage(page);
  const size = Math.max(1, Math.min(Number(perPage) || 10, 50));
  return cached(`list:${q}:${pg}:${size}`, PUBLIC_TTL, async () => {
    const pool = await db();
    const params = [new Date()];
    let where = "status = 'published' AND published_at <= ?";
    if (q) {
      where += ' AND (title LIKE ? OR excerpt LIKE ? OR content LIKE ?)';
      const like = `%${q.replace(/[\\%_]/g, '\\$&')}%`;
      params.push(like, like, like);
    }
    const [[{ total }]] = await pool.query(`SELECT COUNT(*) AS total FROM posts WHERE ${where}`, params);
    const totalPages = Math.max(1, Math.ceil(total / size));
    const current = Math.min(pg, totalPages);
    const [rows] = await pool.query(
      `SELECT ${LIST_COLUMNS} FROM posts WHERE ${where} ORDER BY published_at DESC, id DESC LIMIT ? OFFSET ?`,
      [...params, size, (current - 1) * size]
    );
    return { posts: rows.map(mapRow), total, totalPages, page: current };
  });
}

async function recentPosts(limit = 4, exceptId = 0) {
  return cached(`recent:${limit}:${exceptId}`, PUBLIC_TTL, async () => {
    const pool = await db();
    const [rows] = await pool.query(
      `SELECT ${LIST_COLUMNS} FROM posts WHERE status = 'published' AND published_at <= ? AND id <> ? ORDER BY published_at DESC, id DESC LIMIT ?`,
      [new Date(), Number(exceptId), Number(limit)]
    );
    return rows.map(mapRow);
  });
}

// ISO strings of the first day of each month that has posts (newest first)
async function archiveMonths(limit = 8) {
  return cached(`archives:${limit}`, PUBLIC_TTL, async () => {
    const pool = await db();
    const [rows] = await pool.query(
      "SELECT DATE_FORMAT(published_at, '%Y-%m-01T00:00:00.000Z') AS m FROM posts WHERE status = 'published' AND published_at <= ? GROUP BY m ORDER BY m DESC LIMIT ?",
      [new Date(), Number(limit)]
    );
    return rows.map((r) => r.m);
  });
}

async function getPublishedBySlug(slug) {
  const key = String(slug || '').slice(0, 190);
  return cached(`slug:${key}`, PUBLIC_TTL, async () => {
    const pool = await db();
    const [rows] = await pool.query("SELECT * FROM posts WHERE slug = ? AND status = 'published' AND published_at <= ? LIMIT 1", [key, new Date()]);
    return rows[0] ? mapRow(rows[0]) : null;
  }, 10 * 1000); // misses are remembered only briefly so a just-published post never 404s for long
}

async function listSlugs() {
  const pool = await db();
  const [rows] = await pool.query("SELECT slug, updated_at FROM posts WHERE status = 'published' AND published_at <= ? ORDER BY published_at DESC LIMIT 5000", [new Date()]);
  return rows.map((r) => ({ slug: r.slug, updatedAt: iso(r.updated_at) }));
}

// ---------- admin ----------
async function listAdmin({ page = 1, perPage = 20 } = {}) {
  const pool = await db();
  const size = Math.max(1, Math.min(Number(perPage) || 20, 100));
  const [[{ total }]] = await pool.query('SELECT COUNT(*) AS total FROM posts');
  const totalPages = Math.max(1, Math.ceil(total / size));
  const current = Math.min(clampPage(page), totalPages);
  const [rows] = await pool.query(`SELECT ${LIST_COLUMNS} FROM posts ORDER BY published_at DESC, id DESC LIMIT ? OFFSET ?`, [size, (current - 1) * size]);
  return { posts: rows.map(mapRow), total, totalPages, page: current };
}

// Everything incl. bodies, for backups
async function exportAll() {
  const pool = await db();
  const [rows] = await pool.query('SELECT * FROM posts ORDER BY id');
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
  throw new ValidationError('Could not find a free slug, please change the title');
}

async function create(body) {
  const pool = await db();
  const p = cleanInput(body);
  p.slug = await uniqueSlug(pool, p.slug);
  const now = new Date();
  const [res] = await pool.query(
    'INSERT INTO posts (slug, title, category, excerpt, content, image, author, status, published_at, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
    [p.slug, p.title, p.category, p.excerpt, p.content, p.image, p.author, p.status, p.publishedAt, now, now]
  );
  clearCache();
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
  clearCache();
  if (!res.affectedRows) return null;
  return getById(id);
}

async function remove(id) {
  const pool = await db();
  const [res] = await pool.query('DELETE FROM posts WHERE id = ?', [Number(id)]);
  clearCache();
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

// Restores posts from a backup file (matched by slug: existing posts are updated, missing ones created).
async function restoreFromBackup(posts) {
  const pool = await db();
  let created = 0;
  let updated = 0;
  for (const post of posts) {
    // eslint-disable-next-line no-await-in-loop
    const [rows] = await pool.query('SELECT id FROM posts WHERE slug = ? LIMIT 1', [post.slug]);
    if (rows[0]) {
      // eslint-disable-next-line no-await-in-loop
      await update(rows[0].id, post);
      updated += 1;
    } else {
      // eslint-disable-next-line no-await-in-loop
      await create(post);
      created += 1;
    }
  }
  return { created, updated };
}

module.exports = {
  CATEGORIES, slugify, cleanInput,
  listPublished, recentPosts, archiveMonths, getPublishedBySlug, listSlugs,
  listAdmin, exportAll, getById, create, update, remove, count, seedStarterPosts, restoreFromBackup,
};
