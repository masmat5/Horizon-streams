import { handle } from '../../../../lib/api';
import { requireAdmin } from '../../../../lib/auth';
import { getById, update, remove } from '../../../../lib/posts';

export default handle(['GET', 'PUT', 'DELETE'], async (req, res) => {
  if (!requireAdmin(req, res)) return undefined;
  const { id } = req.query;
  if (!/^\d{1,10}$/.test(String(id))) return res.status(400).json({ error: 'Bad id' });

  if (req.method === 'GET') {
    const post = await getById(id);
    return post ? res.status(200).json({ post }) : res.status(404).json({ error: 'Post not found' });
  }
  if (req.method === 'PUT') {
    const post = await update(id, req.body || {});
    return post ? res.status(200).json({ post }) : res.status(404).json({ error: 'Post not found' });
  }
  return (await remove(id)) ? res.status(200).json({ ok: true }) : res.status(404).json({ error: 'Post not found' });
});
