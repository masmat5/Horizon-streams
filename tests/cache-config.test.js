const test = require('node:test');
const assert = require('node:assert/strict');
const { cached, clearCache } = require('../lib/cache');

test('cache serves repeats from memory, expires, and can be cleared', async () => {
  clearCache();
  let calls = 0;
  const load = async () => { calls += 1; return calls; };
  assert.equal(await cached('k', 50, load), 1);
  assert.equal(await cached('k', 50, load), 1);
  await new Promise((r) => setTimeout(r, 70));
  assert.equal(await cached('k', 50, load), 2);
  clearCache();
  assert.equal(await cached('k', 50, load), 3);
});

test('db config refuses to fall back to defaults in production', () => {
  const saved = { ...process.env };
  delete global.__hsPool;
  process.env.NODE_ENV = 'production';
  for (const k of ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME']) delete process.env[k];
  const { getPool } = require('../lib/db');
  assert.throws(() => getPool(), /Missing environment variables/);
  Object.assign(process.env, saved);
});

test('concurrent misses share one loader call (no thundering herd)', async () => {
  clearCache();
  let calls = 0;
  const load = async () => { calls += 1; await new Promise((r) => setTimeout(r, 30)); return 'v'; };
  const results = await Promise.all(Array.from({ length: 50 }, () => cached('herd', 1000, load)));
  assert.equal(calls, 1);
  assert.ok(results.every((r) => r === 'v'));
});

test('failures are not cached', async () => {
  clearCache();
  let calls = 0;
  const flaky = async () => { calls += 1; if (calls === 1) throw new Error('db down'); return 'ok'; };
  await assert.rejects(() => cached('flaky', 1000, flaky), /db down/);
  assert.equal(await cached('flaky', 1000, flaky), 'ok');
});
