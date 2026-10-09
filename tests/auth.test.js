process.env.SESSION_SECRET = 'test-secret-test-secret-1234';
const test = require('node:test');
const assert = require('node:assert/strict');
const { hashPassword, verifyPassword, sign, readToken, sameOrigin } = require('../lib/auth');

test('password hash verifies only the right password', () => {
  const h = hashPassword('correct horse battery');
  assert.ok(!h.includes('$'), 'hash must not contain $ (env-file safe)');
  assert.equal(verifyPassword('correct horse battery', h), true);
  assert.equal(verifyPassword('wrong', h), false);
  assert.equal(verifyPassword('x', ''), false);
  assert.equal(verifyPassword('x', 'garbage'), false);
});

test('two hashes of the same password differ (random salt)', () => {
  assert.notEqual(hashPassword('same-password-1'), hashPassword('same-password-1'));
});

test('session token round-trips and rejects tampering/expiry', () => {
  const good = sign({ email: 'a@b.c', exp: Date.now() + 60000 });
  assert.equal(readToken(good).email, 'a@b.c');
  const [body, sig] = good.split('.');
  const forged = Buffer.from(JSON.stringify({ email: 'evil@x.y', exp: Date.now() + 60000 })).toString('base64url');
  assert.equal(readToken(`${forged}.${sig}`), null);
  assert.equal(readToken(`${body}.AAAA`), null);
  assert.equal(readToken(sign({ email: 'a@b.c', exp: Date.now() - 1 })), null);
  assert.equal(readToken(''), null);
  assert.equal(readToken(undefined), null);
});

test('token signed with another secret is rejected', () => {
  const token = sign({ email: 'a@b.c', exp: Date.now() + 60000 });
  process.env.SESSION_SECRET = 'a-completely-different-secret-9999';
  assert.equal(readToken(token), null);
  process.env.SESSION_SECRET = 'test-secret-test-secret-1234';
});

test('missing SESSION_SECRET means nobody is logged in (no crash)', () => {
  const token = sign({ email: 'a@b.c', exp: Date.now() + 60000 });
  delete process.env.SESSION_SECRET;
  assert.equal(readToken(token), null);
  process.env.SESSION_SECRET = 'test-secret-test-secret-1234';
});

test('sameOrigin blocks foreign Origin headers', () => {
  assert.equal(sameOrigin({ headers: { host: 'site.com' } }), true);
  assert.equal(sameOrigin({ headers: { host: 'site.com', origin: 'https://site.com' } }), true);
  assert.equal(sameOrigin({ headers: { host: 'site.com', origin: 'https://evil.com' } }), false);
  assert.equal(sameOrigin({ headers: { host: 'site.com', origin: 'not a url' } }), false);
});
