import fs from 'fs';
import path from 'path';

const TYPES = { jpg: 'image/jpeg', png: 'image/png', webp: 'image/webp', gif: 'image/gif' };

// Served via the /uploads/:name rewrite in next.config.js. Files added after
// `next build` are not picked up from /public, so uploads are streamed from here.
export default function handler(req, res) {
  const name = String(req.query.name || '');
  if (!/^[\w-]+\.(jpg|png|webp|gif)$/.test(name)) return res.status(404).end();

  const dir = process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads');
  const file = path.join(dir, name);
  if (!fs.existsSync(file)) return res.status(404).end();

  res.setHeader('Content-Type', TYPES[name.split('.').pop()]);
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  const stream = fs.createReadStream(file);
  stream.on('error', () => { if (!res.headersSent) res.status(500).end(); else res.destroy(); });
  return stream.pipe(res);
}
