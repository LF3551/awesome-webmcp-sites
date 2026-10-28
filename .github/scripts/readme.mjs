export const ENTRY = /^- \[([^\]]+)\]\((https:\/\/[^)\s]+)\) - (.+)$/;
export const SKIP_SECTIONS = new Set(['Contents', 'Why list your site', 'Add your site', 'Check your site', 'FAQ', 'Contributing']);

export function parseEntries(text) {
  const out = [];
  let section = '';
  text.split('\n').forEach((line, i) => {
    const h = line.match(/^## (.+)$/);
    if (h) {
      section = h[1].trim();
      return;
    }
    const m = line.match(ENTRY);
    if (m) out.push({ line, name: m[1], url: m[2], desc: m[3], section, index: i });
  });
  return out;
}

export const hostOf = (url) => new URL(url).hostname.replace(/^www\./, '').toLowerCase();
export const normalizeUrl = (u) => u.trim().toLowerCase().replace(/^http:\/\//, 'https://').replace(/\/+$/, '');
