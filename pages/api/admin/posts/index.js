import { requireAdmin } from '../../../../lib/auth';
import { listAll, create } from '../../../../lib/posts';

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;
  try {
    if (req.method === 'GET') return res.status(200).json({ posts: await listAll() });
    if (req.method === 'POST') {
      const post = await create(req.body || {});
      return res.status(201).json({ post });
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}
