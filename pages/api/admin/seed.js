import { handle } from '../../../lib/api';
import { requireAdmin } from '../../../lib/auth';
import { seedStarterPosts } from '../../../lib/posts';

export default handle(['POST'], async (req, res) => {
  if (!requireAdmin(req, res)) return undefined;
  return res.status(200).json({ imported: await seedStarterPosts() });
});
