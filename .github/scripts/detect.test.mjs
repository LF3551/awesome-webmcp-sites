import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { chromium } from 'playwright-core';
import { detectWith, isPrivateAddress, launchOptions } from './detect.mjs';

test('private addresses are recognised', () => {
  for (const ip of ['127.0.0.1', '10.1.2.3', '192.168.0.5', '172.20.1.1', '169.254.169.254', '::1', 'fd00::1']) assert.ok(isPrivateAddress(ip), ip);
  for (const ip of ['8.8.8.8', '172.32.0.1', '93.184.216.34']) assert.ok(!isPrivateAddress(ip), ip);
});

// Needs a local Chrome (CHROME_PATH) or Playwright's Chromium; run with RUN_BROWSER_TESTS=1.
test('browser captures registered tools and ignores plain pages', { skip: process.env.RUN_BROWSER_TESTS !== '1' }, async () => {
  process.env.ALLOW_PRIVATE = '1';
  const server = createServer((req, res) => {
    res.setHeader('content-type', 'text/html');
    if (req.url === '/tools') {
      res.end(`<script>if ('modelContext' in document) document.modelContext.registerTool({ name: 'search_items', description: 'Search', inputSchema: { type: 'object' }, execute: async () => 'ok' });</script><form toolname="contact" tooldescription="Send a message"></form>`);
    } else {
      res.end('<p>No tools here. document.modelContext.registerTool is only mentioned in text.</p>');
    }
  }).listen(0);
  const { port } = server.address();
  const browser = await chromium.launch(launchOptions());
  try {
    const hit = await detectWith(browser, `http://127.0.0.1:${port}/tools`);
    assert.deepEqual(hit.tools.map((t) => t.name), ['search_items']);
    assert.deepEqual(hit.forms.map((f) => f.name), ['contact']);
    assert.ok(hit.ok);
    const miss = await detectWith(browser, `http://127.0.0.1:${port}/`);
    assert.equal(miss.ok, false);
  } finally {
    await browser.close();
    server.close();
  }
});
