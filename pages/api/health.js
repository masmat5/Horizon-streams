import { db } from '../../lib/db';

// For uptime monitors (UptimeRobot, Hostinger alerts...): 200 = site + database are up, 503 = database problem.
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    const pool = await db();
    await pool.query('SELECT 1');
    return res.status(200).json({ ok: true, db: true, time: new Date().toISOString() });
  } catch (err) {
    console.error('[health] database check failed:', err.message);
    return res.status(503).json({ ok: false, db: false });
  }
}
