import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { requireAdmin } from '../../../lib/auth';

export const config = { api: { bodyParser: false } };

const MAX_BYTES = 5 * 1024 * 1024;

// Decide the file type from its first bytes, never from the client-supplied name.
function detectExt(b) {
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return 'jpg';
  if (b.slice(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return 'png';
  if (b.slice(0, 4).toString() === 'RIFF' && b.slice(8, 12).toString() === 'WEBP') return 'webp';
  if (b.slice(0, 3).toString() === 'GIF') return 'gif';
  return null;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!requireAdmin(req, res)) return;

  const chunks = [];
  let size = 0;
  try {
    for await (const chunk of req) {
      size += chunk.length;
      if (size > MAX_BYTES) return res.status(413).json({ error: 'Image is larger than 5 MB' });
      chunks.push(chunk);
    }
  } catch {
    return res.status(400).json({ error: 'Upload failed' });
  }

  const data = Buffer.concat(chunks);
  const ext = data.length > 12 ? detectExt(data) : null;
  if (!ext) return res.status(400).json({ error: 'Only JPG, PNG, WEBP or GIF images are allowed' });

  const dir = process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads');
  fs.mkdirSync(dir, { recursive: true });
  const name = `${Date.now()}-${crypto.randomBytes(5).toString('hex')}.${ext}`;
  fs.writeFileSync(path.join(dir, name), data);
  return res.status(201).json({ url: `/uploads/${name}` });
}
