import { requireAdmin } from '../../../../lib/auth';
import { getById, update, remove } from '../../../../lib/posts';

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;
  const { id } = req.query;
  if (!/^\d+$/.test(String(id))) return res.status(400).json({ error: 'Bad id' });

  try {
    if (req.method === 'GET') {
      const post = await getById(id);
      return post ? res.status(200).json({ post }) : res.status(404).json({ error: 'Post not found' });
    }
    if (req.method === 'PUT') {
      const post = await update(id, req.body || {});
      return post ? res.status(200).json({ post }) : res.status(404).json({ error: 'Post not found' });
    }
    if (req.method === 'DELETE') {
      return (await remove(id)) ? res.status(200).json({ ok: true }) : res.status(404).json({ error: 'Post not found' });
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}
