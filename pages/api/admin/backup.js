import { handle } from '../../../lib/api';
import { requireAdmin } from '../../../lib/auth';
import { exportAll } from '../../../lib/posts';

// Downloads every post (drafts and scheduled included) as one JSON file.
export default handle(['GET'], async (req, res) => {
  if (!requireAdmin(req, res)) return undefined;
  const posts = await exportAll();
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="horizonstream-posts-${new Date().toISOString().slice(0, 10)}.json"`);
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).send(JSON.stringify({ exportedAt: new Date().toISOString(), posts }, null, 2));
});
