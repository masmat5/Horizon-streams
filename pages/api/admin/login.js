import crypto from 'crypto';
import { handle } from '../../../lib/api';
import { verifyPassword, startSession, tooManyAttempts, recordFailure, clearFailures } from '../../../lib/auth';

const safeEqual = (a, b) => {
  const x = crypto.createHash('sha256').update(String(a)).digest();
  const y = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(x, y);
};

export default handle(['POST'], (req, res) => {
  if (tooManyAttempts(req)) return res.status(429).json({ error: 'Too many attempts. Try again in 15 minutes.' });

  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD_HASH) {
    console.error('[login] ADMIN_EMAIL / ADMIN_PASSWORD_HASH are not configured');
    return res.status(503).json({ error: 'Admin login is not configured on the server.' });
  }

  const { email = '', password = '' } = req.body || {};
  const emailOk = safeEqual(String(email).trim().toLowerCase(), String(process.env.ADMIN_EMAIL).trim().toLowerCase());
  const passOk = verifyPassword(password, process.env.ADMIN_PASSWORD_HASH);

  if (!emailOk || !passOk) {
    recordFailure(req);
    return res.status(401).json({ error: 'Wrong email or password' });
  }
  clearFailures(req);
  startSession(res, process.env.ADMIN_EMAIL);
  return res.status(200).json({ ok: true });
});
