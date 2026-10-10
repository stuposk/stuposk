import { getCollection, type CollectionEntry } from 'astro:content';

export const getPosts = async () =>
  (await getCollection('blog', (p) => !p.data.draft)).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

export const readingTime = (body = '') => Math.max(1, Math.round(body.trim().split(/\s+/).length / 200));

export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
export const humanDate = (d: Date) => new Intl.DateTimeFormat('sk-SK', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);

// Markdown verzia pre AI: frontmatter-free hlavička + pôvodné telo.
export const toMarkdown = (entry: CollectionEntry<'blog'> | CollectionEntry<'pre'>, url: URL, opts: { kolega?: boolean } = {}) => {
  const d = entry.data as { title: string; description?: string; date: Date; recipient?: string; status?: string; version?: string; validUntil?: Date };
  const meta = [
    `Autor: Michal Stupák (hello@michalstupak.com)`,
    `Dátum: ${isoDate(d.date)}`,
    d.recipient && `Pre: ${d.recipient}`,
    d.status && `Stav: ${d.status}${d.version ? ` (v${d.version})` : ''}`,
    d.validUntil && `Platí do: ${isoDate(d.validUntil)}`,
    `Zdroj: ${url.href}`,
  ].filter(Boolean);
  const footer = opts.kolega ? `\n\n---\n\n_Powered by [/kolega](https://kolega.cloud)_\n` : '\n';
  return `# ${d.title}\n\n${d.description ? `> ${d.description}\n\n` : ''}${meta.join('  \n')}\n\n---\n\n${(entry.body ?? '').trim()}${footer}`;
};
