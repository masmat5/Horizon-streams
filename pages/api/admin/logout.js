import { endSession } from '../../../lib/auth';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  endSession(res);
  return res.status(200).json({ ok: true });
}
