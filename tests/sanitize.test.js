const test = require('node:test');
const assert = require('node:assert/strict');
const { cleanContent } = require('../lib/sanitize');

test('strips scripts, event handlers and javascript: links', () => {
  const out = cleanContent('<p onclick="x()">Hi</p><script>alert(1)</script><a href="javascript:alert(1)">l</a><img src=x onerror=alert(2)>');
  assert.ok(!/script|onclick|onerror|javascript:/i.test(out), out);
  assert.ok(out.includes('<p>Hi</p>'));
});

test('keeps normal formatting and makes external links safe', () => {
  const out = cleanContent('<h2>T</h2><ul><li><strong>a</strong></li></ul><a href="https://x.com">x</a>');
  assert.ok(out.includes('<h2>T</h2>') && out.includes('<strong>a</strong>'));
  assert.ok(out.includes('rel="noopener noreferrer"') && out.includes('target="_blank"'));
});

test('drops iframes, forms and styles', () => {
  const out = cleanContent('<iframe src="https://evil"></iframe><form><input></form><style>*{}</style><p style="x">a</p>');
  assert.ok(!/iframe|<form|<input|<style|style=/i.test(out), out);
});

test('handles empty and nullish input', () => {
  assert.equal(cleanContent(null), '');
  assert.equal(cleanContent(undefined), '');
});

test('removes empty paragraphs but keeps picture paragraphs', () => {
  assert.equal(cleanContent('<p>Hi</p><p></p><p> </p>'), '<p>Hi</p>');
  assert.ok(cleanContent('<p><img src="/uploads/a.png"></p>').includes('<img'));
});
