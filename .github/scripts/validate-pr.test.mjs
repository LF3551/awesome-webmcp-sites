import test from 'node:test';
import assert from 'node:assert/strict';
import { analyze, detectionChecks } from './validate-pr.mjs';

const base = [
  '## Contents',
  '- [Shops](#shops)',
  '',
  '## Shops',
  '',
  '- [Alpha Store](https://alpha.example/) - Search products and add them to the cart.',
  '- [Gamma Store](https://gamma.example/) - Compare prices across categories.',
  '',
  '## Travel',
  '',
  '- [Trip Planner](https://trips.example/) - Plan routes and list hotels.',
  '',
].join('\n');

const line = (name, url, desc) => `- [${name}](${url}) - ${desc}`;
const withLine = (l, at = 6) => {
  const a = base.split('\n');
  a.splice(at, 0, l);
  return a.join('\n');
};
const run = (l, at) => analyze(base, withLine(l, at), `@@\n+${l}`);
const ok = (r) => r.checks.every((c) => c.ok);
const failed = (r) => r.checks.filter((c) => !c.ok).map((c) => c.label);

test('valid alphabetical addition passes', () => {
  const r = run(line('Beta Store', 'https://beta.example/', 'Browse the catalogue and track orders.'));
  assert.ok(ok(r), failed(r).join('; '));
});

test('wrong order fails', () => {
  assert.ok(failed(run(line('Zeta Store', 'https://zeta.example/', 'Browse the catalogue and track orders.'))).some((l) => l.includes('alphabetical')));
});

test('same host in another path is a duplicate', () => {
  assert.ok(failed(run(line('Alpha Two', 'https://www.alpha.example/shop', 'Another page of the same store site.'))).includes('Site is not already in the list'));
});

test('http, tracking and promo wording fail', () => {
  const r = run(line('Beta', 'https://beta.example/?utm_source=x', 'The best store ever made for everyone.'));
  assert.ok(failed(r).includes('URL has no tracking or affiliate parameters'));
  assert.ok(failed(r).includes('Description has no promotional wording'));
});

test('two added lines or removed lines fail', () => {
  assert.ok(!ok(analyze(base, base, '@@\n+- [A](https://a.example) - One long enough description.\n+- [B](https://b.example) - Another long description.')));
  assert.ok(!ok(analyze(base, base, '@@\n-- [Alpha Store](https://alpha.example/) - Search products.')));
});

test('outside entry sections fails', () => {
  assert.ok(!ok(run(line('Beta Store', 'https://beta.example/', 'Browse the catalogue and track orders.'), 2)));
});

test('branch behind main passes when judged by its own patch', () => {
  const l = line('Beta Store', 'https://beta.example/', 'Browse the catalogue and track orders.');
  const newerBase = base.replace('## Travel', '- [Delta Store](https://delta.example/) - Fourth store for tests.\n\n## Travel');
  const r = analyze(newerBase, withLine(l), `@@\n+${l}`);
  assert.ok(ok(r), failed(r).join('; '));
});

test('detection rows', () => {
  assert.ok(detectionChecks({ status: 200, tools: [{ name: 'search' }], forms: [] }).every((c) => c.ok));
  assert.ok(!detectionChecks({ status: 200, tools: [], forms: [] }).every((c) => c.ok));
  assert.ok(!detectionChecks(null).every((c) => c.ok));
});
