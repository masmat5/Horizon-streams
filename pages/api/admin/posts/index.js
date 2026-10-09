import { handle } from '../../../../lib/api';
import { requireAdmin } from '../../../../lib/auth';
import { listAdmin, create } from '../../../../lib/posts';

export default handle(['GET', 'POST'], async (req, res) => {
  if (!requireAdmin(req, res)) return undefined;
  if (req.method === 'GET') return res.status(200).json(await listAdmin({ page: req.query.page }));
  const post = await create(req.body || {});
  return res.status(201).json({ post });
});
