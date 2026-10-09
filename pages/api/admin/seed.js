import { requireAdmin } from '../../../lib/auth';
import { seedStarterPosts } from '../../../lib/posts';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!requireAdmin(req, res)) return;
  try {
    return res.status(200).json({ imported: await seedStarterPosts() });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
