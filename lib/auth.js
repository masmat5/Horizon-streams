const crypto = require('crypto');

const COOKIE = 'hs_admin';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secret() {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 16) throw new Error('SESSION_SECRET must be set (16+ characters)');
  return s;
}

const b64 = (buf) => Buffer.from(buf).toString('base64url');

// ---- password hashing: "salt:hash" (hex scrypt, no '$' so .env files can't mangle it)
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(String(password), salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  const [salt, hash] = String(stored || '').split(':');
  if (!salt || !hash) return false;
  const given = crypto.scryptSync(String(password), salt, 64);
  const want = Buffer.from(hash, 'hex');
  return given.length === want.length && crypto.timingSafeEqual(given, want);
}

// ---- signed session cookie
function sign(payload) {
  const body = b64(JSON.stringify(payload));
  const sig = b64(crypto.createHmac('sha256', secret()).update(body).digest());
  return `${body}.${sig}`;
}

function readToken(token) {
  const [body, sig] = String(token || '').split('.');
  if (!body || !sig) return null;
  const want = crypto.createHmac('sha256', secret()).update(body).digest();
  const got = Buffer.from(sig, 'base64url');
  if (got.length !== want.length || !crypto.timingSafeEqual(got, want)) return null;
  try {
    const data = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    return data.exp > Date.now() ? data : null;
  } catch {
    return null;
  }
}

function parseCookies(header) {
  const out = {};
  String(header || '').split(';').forEach((part) => {
    const i = part.indexOf('=');
    if (i > 0) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  });
  return out;
}

function getSession(req) {
  return readToken(parseCookies(req.headers.cookie)[COOKIE]);
}

function cookieString(value, maxAge) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${COOKIE}=${value}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${secure}`;
}

function startSession(res, email) {
  res.setHeader('Set-Cookie', cookieString(sign({ email, exp: Date.now() + MAX_AGE * 1000 }), MAX_AGE));
}

function endSession(res) {
  res.setHeader('Set-Cookie', cookieString('', 0));
}

// Browsers send Origin on cross-site POSTs; reject any that is not this host.
function sameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return true;
  try {
    return new URL(origin).host === req.headers.host;
  } catch {
    return false;
  }
}

// API guard: returns the session, or answers 401/403 itself and returns null.
function requireAdmin(req, res) {
  if (req.method !== 'GET' && !sameOrigin(req)) {
    res.status(403).json({ error: 'Bad origin' });
    return null;
  }
  const session = getSession(req);
  if (!session) {
    res.status(401).json({ error: 'Not logged in' });
    return null;
  }
  return session;
}

// ---- login throttle: 5 failures per IP per 15 minutes (in memory)
const attempts = new Map();
function clientIp(req) {
  return String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
}
function tooManyAttempts(req) {
  const rec = attempts.get(clientIp(req));
  return !!rec && rec.until > Date.now() && rec.count >= 5;
}
function recordFailure(req) {
  const ip = clientIp(req);
  const rec = attempts.get(ip);
  if (!rec || rec.until <= Date.now()) attempts.set(ip, { count: 1, until: Date.now() + 15 * 60 * 1000 });
  else rec.count += 1;
}
function clearFailures(req) {
  attempts.delete(clientIp(req));
}

module.exports = {
  hashPassword, verifyPassword, getSession, startSession, endSession,
  requireAdmin, tooManyAttempts, recordFailure, clearFailures,
};
