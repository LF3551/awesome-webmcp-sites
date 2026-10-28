// Runtime WebMCP check: loads the page in headless Chromium with a recording shim for
// document.modelContext, so any site that feature-detects the API registers its real tools.
// Tools registered only after user interaction or on other pages are not seen.
import { chromium } from 'playwright-core';
import { lookup } from 'node:dns/promises';
import { isIP } from 'node:net';

const PRIVATE = /^(10\.|127\.|0\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|::1$|fc|fd|fe80)/i;
export const isPrivateAddress = (ip) => PRIVATE.test(ip);

// Public sites only: the verifier must never reach local or cloud-internal addresses.
async function assertPublic(url) {
  if (process.env.ALLOW_PRIVATE === '1') return;
  const { hostname, protocol } = new URL(url);
  if (protocol !== 'https:') throw new Error('only https URLs are checked');
  const addrs = isIP(hostname) ? [{ address: hostname }] : await lookup(hostname, { all: true });
  if (addrs.some((a) => isPrivateAddress(a.address))) throw new Error('address is not public');
}

const SHIM = `(() => {
  const captured = [];
  const add = (t) => { if (t && typeof t.name === 'string') captured.push({ name: t.name, description: String(t.description || '').slice(0, 200) }); };
  const mc = {
    registerTool(tool) { add(tool); return Promise.resolve(); },
    unregisterTool() {},
    provideContext(ctx) { for (const t of (ctx && ctx.tools) || []) add(t); },
    clearContext() {},
    getTools() { return captured.slice(); },
    addEventListener() {}, removeEventListener() {}, dispatchEvent() { return true; },
  };
  const define = (target) => { try { Object.defineProperty(target, 'modelContext', { value: mc, configurable: true }); } catch (e) {} };
  define(document);
  define(navigator);
  window.__webmcpCaptured = captured;
})();`;

export function launchOptions() {
  const executablePath = process.env.CHROME_PATH || undefined;
  return { headless: true, ...(executablePath ? { executablePath } : {}) };
}

export async function detectWith(browser, url) {
  const result = { url, finalUrl: url, status: 0, title: '', description: '', tools: [], forms: [], ok: false, error: null };
  const context = await browser.newContext({ userAgent: 'awesome-webmcp-sites-verifier (+https://github.com/LF3551/awesome-webmcp-sites)' });
  try {
    await assertPublic(url);
    await context.addInitScript(SHIM);
    await context.route('**/*', async (route) => {
      try {
        const h = new URL(route.request().url()).hostname;
        if (isIP(h) && isPrivateAddress(h) && process.env.ALLOW_PRIVATE !== '1') return route.abort();
      } catch {}
      return route.continue();
    });
    const page = await context.newPage();
    const res = await page.goto(url, { waitUntil: 'load', timeout: 30_000 });
    result.status = res ? res.status() : 0;
    await page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
    await page.waitForTimeout(2_000);
    result.finalUrl = page.url();
    result.title = (await page.title().catch(() => '')).slice(0, 120);
    result.description = await page.$eval('meta[name="description"], meta[property="og:description"]', (m) => m.getAttribute('content') || '').then((d) => d.slice(0, 300)).catch(() => '');
    result.tools = await page.evaluate(() => window.__webmcpCaptured || []);
    result.forms = await page.$$eval('form[toolname]', (els) => els.map((f) => ({ name: f.getAttribute('toolname'), description: (f.getAttribute('tooldescription') || '').slice(0, 200) })));
    result.ok = result.status > 0 && result.status < 400 && result.tools.length + result.forms.length > 0;
  } catch (e) {
    result.error = String(e.message || e).split('\n')[0].slice(0, 100);
  } finally {
    await context.close();
  }
  return result;
}

export async function detect(url) {
  const browser = await chromium.launch(launchOptions());
  try {
    return await detectWith(browser, url);
  } finally {
    await browser.close();
  }
}

if (process.argv[1] && process.argv[1].endsWith('detect.mjs')) {
  const urls = process.argv.slice(2);
  const browser = await chromium.launch(launchOptions());
  for (const u of urls) console.log(JSON.stringify(await detectWith(browser, u)));
  await browser.close();
}
