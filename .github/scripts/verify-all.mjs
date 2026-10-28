// Weekly check of every listed site: loads each page in a browser and confirms tools are still registered.
import { readFileSync, writeFileSync, appendFileSync } from 'node:fs';
import { chromium } from 'playwright-core';
import { detectWith, launchOptions } from './detect.mjs';
import { parseEntries } from './readme.mjs';

const entries = parseEntries(readFileSync('README.md', 'utf8')).filter((e) => !['Contents', 'FAQ'].includes(e.section));
const browser = await chromium.launch(launchOptions());
const results = [];
let next = 0;

async function worker() {
  while (next < entries.length) {
    const e = entries[next++];
    let r = await detectWith(browser, e.url);
    if (!r.ok) r = await detectWith(browser, e.url);
    results.push({ entry: e, result: r });
  }
}
await Promise.all(Array.from({ length: 4 }, worker));
await browser.close();

const failed = results.filter((x) => !x.result.ok).sort((a, b) => a.entry.name.localeCompare(b.entry.name));
const lines = failed.map((x) => `- [${x.entry.name}](${x.entry.url}) - ${x.result.error || `HTTP ${x.result.status}, no WebMCP tools registered on load`}`);
writeFileSync('report.md', `${failed.length} of ${entries.length} listed sites did not register WebMCP tools on load in this run. Check each one and remove or fix the entry.\n\n${lines.join('\n')}\n`);
if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `failed=${failed.length}\n`);
console.log(`${entries.length - failed.length}/${entries.length} sites verified`);
