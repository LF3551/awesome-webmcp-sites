# Contribution guidelines

Add your site in two minutes. If it passes the automatic check, the pull request is merged without waiting for a person.

## What belongs here

A live website whose page registers WebMCP tools **when it loads**, either with `document.modelContext.registerTool()` (or `provideContext()`), or with a `toolname` attribute on a form. Demos, playgrounds and open-source sites are welcome too, in their own section.

## How the check works

1. A browser opens the URL you submit, with a small shim for `document.modelContext` installed before any page script runs.
2. Every tool the page registers is recorded. The pull request is accepted when at least one tool or `toolname` form is found.
3. The same check runs weekly on every listed site. A site that stops registering tools is reported in an issue and removed after review.

Tools that appear only after a click, on another page or behind a login are not seen. Submit a page where at least one tool registers on load, for example your home page or a tool page.

## How to add a site

1. Pick the section that fits and keep entries in alphabetical order.
2. Add exactly one line, using this format, in a pull request that changes only `README.md`:

   ```markdown
   - [Site name](https://example.com/page) - What an agent can do there, in one sentence.
   ```

3. Use a plain `https://` URL without tracking parameters. One entry per site.
4. Describe what the tools do, not how great the site is. The description starts with a capital letter and ends with a period.
5. If you built or own the site, say so in the pull request description.

The automatic merge needs a GitHub account that is at least 30 days old. Other pull requests wait for a manual review.

## Reporting problems

A site that moved, changed its tools or was shut down: open an issue or send a pull request that fixes the line.

## Local checks

```bash
npm ci
node --test .github/scripts/validate-pr.test.mjs
npx awesome-lint
```

To try the browser check yourself: `npx playwright-core install chromium && node .github/scripts/detect.mjs https://your-site.example/`.
