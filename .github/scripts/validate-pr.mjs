// Entry validation for pull requests. PR content is data only; no PR code is executed.
// Subcommands: `parse` (text checks, runs with a read-only token) and `finalize` (combines with the browser check).
import { appendFileSync, writeFileSync } from 'node:fs';
import { ENTRY, SKIP_SECTIONS, hostOf, normalizeUrl, parseEntries } from './readme.mjs';

const PROMO = /\b(best|#1|number one|ultimate|revolutionary|leading|amazing|fastest|cheapest|coupon|discount|free trial)\b/i;
const TRACKING = /[?&](utm_[a-z]+|ref|ref_src|aff|affiliate|via|fbclid|gclid)=/i;
const SAFE_URL = /^https:\/\/[A-Za-z0-9.-]+(?::\d+)?(?:\/[A-Za-z0-9._~!$&'()*+,;=:@%/-]*)?$/;

function patchLines(patch) {
  const added = [];
  const removed = [];
  for (const l of patch.split('\n')) {
    if (l.startsWith('+')) added.push(l.slice(1));
    else if (l.startsWith('-')) removed.push(l.slice(1));
  }
  return { added, removed };
}

// `patch` is the PR's own diff against its merge base, so a branch that is behind main is not penalised.
export function analyze(base, head, patch) {
  const checks = [];
  const add = (ok, label) => checks.push({ ok, label });
  const { added, removed } = patchLines(patch);
  add(removed.length === 0 && added.length === 1, 'Exactly one line added and nothing removed or changed');
  const m = added.length === 1 ? added[0].match(ENTRY) : null;
  add(Boolean(m), 'Line uses the format `- [Name](https://url) - Description.`');
  if (!m) return { checks, entry: null };

  const [, name, url, desc] = m;
  const entry = { name, url, desc };
  const baseEntries = parseEntries(base);
  const headEntries = parseEntries(head);

  add(SAFE_URL.test(url), 'URL is a plain https address');
  add(!TRACKING.test(url), 'URL has no tracking or affiliate parameters');
  let host = '';
  try {
    host = hostOf(url);
  } catch {}
  add(!baseEntries.some((e) => normalizeUrl(e.url) === normalizeUrl(url) || (host && hostOf(e.url) === host)), 'Site is not already in the list');
  add(/^[A-Z]/.test(desc) && desc.endsWith('.'), 'Description starts with a capital letter and ends with a period');
  add(desc.length >= 20 && desc.length <= 220, 'Description is 20 to 220 characters');
  add(!desc.toLowerCase().startsWith(name.toLowerCase()), 'Description does not start with the site name');
  add(!PROMO.test(desc), 'Description has no promotional wording');

  const target = headEntries.find((e) => e.line === added[0]);
  const section = target?.section;
  const allowed = new Set(baseEntries.map((e) => e.section).filter((s) => !SKIP_SECTIONS.has(s)));
  add(Boolean(section) && allowed.has(section), `Placed in an existing section (${section || 'none'})`);
  if (section && allowed.has(section)) {
    const mates = headEntries.filter((e) => e.section === section);
    const pos = mates.indexOf(target);
    const key = (e) => e.name.toLowerCase();
    add((pos === 0 || key(mates[pos - 1]) <= key(target)) && (pos === mates.length - 1 || key(target) <= key(mates[pos + 1])), 'In alphabetical order inside the section');
  }
  return { checks, entry };
}

// Turns browser detection output into check rows.
export function detectionChecks(d) {
  if (!d) return [{ ok: false, label: 'Browser check did not run' }];
  const names = [...d.tools.map((t) => t.name), ...d.forms.map((f) => f.name)];
  return [
    { ok: d.status > 0 && d.status < 400, label: `Page loads (HTTP ${d.status || 'no response'})` },
    { ok: names.length > 0, label: names.length ? `Registers ${names.length} WebMCP tool(s) on load: ${names.slice(0, 6).join(', ')}` : 'Registers at least one WebMCP tool on load' },
  ];
}

async function gh(path) {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, Accept: 'application/vnd.github+json', 'User-Agent': 'awesome-webmcp-sites-bot' },
  });
  if (!res.ok) throw new Error(`${path} -> ${res.status}`);
  return res.json();
}

async function fileAt(repo, ref, path) {
  const j = await gh(`/repos/${repo}/contents/${path}?ref=${ref}`);
  return Buffer.from(j.content, 'base64').toString('utf8');
}

const out = (k, v) => appendFileSync(process.env.GITHUB_OUTPUT, `${k}=${v}\n`);

async function parse() {
  const { REPO, PR_NUMBER } = process.env;
  const pr = await gh(`/repos/${REPO}/pulls/${PR_NUMBER}`);
  const files = await gh(`/repos/${REPO}/pulls/${PR_NUMBER}/files?per_page=100`);
  const checks = [{ ok: files.length === 1 && files[0].filename === 'README.md' && files[0].status === 'modified', label: 'Only README.md is changed' }];
  let url = '';
  if (checks[0].ok) {
    const base = await fileAt(REPO, pr.base.sha, 'README.md');
    const head = await fileAt(pr.head.repo.full_name, pr.head.sha, 'README.md');
    const res = analyze(base, head, files[0].patch || '');
    checks.push(...res.checks);
    if (res.entry && SAFE_URL.test(res.entry.url)) url = res.entry.url;
  }
  const user = await gh(`/users/${pr.user.login}`);
  const ageDays = (Date.now() - new Date(user.created_at)) / 86_400_000;
  checks.push({ ok: ageDays >= 30, label: 'Author account is older than 30 days' });
  out('url', checks.every((c) => c.ok) ? url : '');
  out('text', JSON.stringify(checks));
}

function finalize() {
  const text = JSON.parse(process.env.TEXT_RESULT || '[]');
  let detect = null;
  try {
    detect = JSON.parse(process.env.DETECT_RESULT || 'null');
  } catch {}
  const textOk = text.every((c) => c.ok);
  const checks = textOk ? [...text, ...detectionChecks(detect)] : text;
  const ok = checks.every((c) => c.ok);
  const rows = checks.map((c) => `| ${c.ok ? 'Pass' : 'Fail'} | ${c.label} |`).join('\n');
  const verdict = ok
    ? 'All checks passed. This pull request will be merged automatically once the required CI checks are green.'
    : 'Some checks need attention. Fix the failed rows and push again, or wait for the maintainer to review it manually.';
  writeFileSync('report.md', `Automated entry check\n\n| Result | Check |\n| --- | --- |\n${rows}\n\n${verdict}\n`);
  out('ok', ok);
}

if (process.argv[1] && process.argv[1].endsWith('validate-pr.mjs')) {
  const cmd = process.argv[2];
  const run = cmd === 'finalize' ? async () => finalize() : parse;
  run().catch((e) => {
    console.error(e);
    writeFileSync('report.md', 'Automated entry check could not run; the maintainer will review this pull request.\n');
    out('ok', false);
    if (cmd === 'parse') out('url', '');
  });
}
