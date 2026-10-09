const test = require('node:test');
const assert = require('node:assert/strict');
const { handle } = require('../lib/api');
const { ValidationError } = require('../lib/errors');

function mockRes() {
  const res = { headers: {}, headersSent: false };
  res.setHeader = (k, v) => { res.headers[k] = v; };
  res.status = (c) => { res.code = c; return res; };
  res.json = (b) => { res.body = b; res.headersSent = true; return res; };
  return res;
}

test('wrong method gives 405 with Allow header', async () => {
  const res = mockRes();
  await handle(['POST'], () => {})({ method: 'GET' }, res);
  assert.equal(res.code, 405);
  assert.equal(res.headers.Allow, 'POST');
});

test('ValidationError gives 400 with its message', async () => {
  const res = mockRes();
  await handle(['POST'], () => { throw new ValidationError('Title is required'); })({ method: 'POST' }, res);
  assert.equal(res.code, 400);
  assert.equal(res.body.error, 'Title is required');
});

test('unexpected error gives 500 and internals are not leaked', async () => {
  const res = mockRes();
  const log = console.error;
  console.error = () => {};
  await handle(['GET'], async () => { throw new Error('ER_ACCESS_DENIED for user root at localhost'); })({ method: 'GET', url: '/x' }, res);
  console.error = log;
  assert.equal(res.code, 500);
  assert.ok(!JSON.stringify(res.body).includes('root'));
});
