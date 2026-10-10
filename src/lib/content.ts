import { getCollection, type CollectionEntry } from 'astro:content';

export const getPosts = async () =>
  (await getCollection('blog', (p) => !p.data.draft)).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

export const readingTime = (body = '') => Math.max(1, Math.round(body.trim().split(/\s+/).length / 200));

export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
export const humanDate = (d: Date) => new Intl.DateTimeFormat('sk-SK', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);

// Markdown verzia pre AI: hlavička s meta údajmi + pôvodné telo.
interface MdOpts {
  kolega?: boolean;
  recipient?: string;
  version?: { n: number; latest: number };
  related?: { title: string; href: string; date: Date }[];
}
export const toMarkdown = (entry: { data: Record<string, any>; body?: string }, url: URL, opts: MdOpts = {}) => {
  const d = entry.data;
  const v = opts.version;
  const meta = [
    `Autor: Michal Stupák (hello@michalstupak.com)`,
    `Dátum: ${isoDate(d.date)}`,
    opts.recipient && `Pre: ${opts.recipient}`,
    d.status && `Stav: ${d.status}${v ? ` (v${v.n}${v.n < v.latest ? `, existuje novšia v${v.latest}` : ''})` : ''}`,
    d.changes && `Zmeny vo v${v?.n}: ${d.changes}`,
    d.validUntil && `Platí do: ${isoDate(d.validUntil)}`,
    `Zdroj: ${url.href}`,
  ].filter(Boolean);
  const related = opts.related?.length
    ? `\n\n## Súvisiace výstupy\n\n${opts.related.map((r) => `- [${r.title}](${r.href}) (${isoDate(r.date)})`).join('\n')}`
    : '';
  const footer = opts.kolega ? `\n\n---\n\n_Powered by [/kolega](https://kolega.cloud)_\n` : '\n';
  return `# ${d.title}\n\n${d.description ? `> ${d.description}\n\n` : ''}${meta.join('  \n')}\n\n---\n\n${(entry.body ?? '').trim()}${related}${footer}`;
};

// Výstupy pre adresátov zoskupené podľa id (zložky), s verziami a súvisiacimi výstupmi pre tých istých ľudí.
export type Version = CollectionEntry<'pre'> & { n: number };
export interface Share { id: string; versions: Version[]; latest: Version; recipient?: string; related: Share[] }

export const getShares = async (): Promise<Share[]> => {
  const people = new Map((await getCollection('ludia')).map((p) => [p.id.toLowerCase(), p.data]));
  const groups = new Map<string, Version[]>();
  for (const e of await getCollection('pre')) {
    const [id, file] = e.id.split('/');
    const n = Number(file?.replace(/^v/, ''));
    if (!id || !Number.isInteger(n)) continue;
    groups.set(id, [...(groups.get(id) ?? []), Object.assign(e, { n })]);
  }
  const shares: Share[] = [...groups].map(([id, versions]) => {
    versions.sort((a, b) => a.n - b.n);
    const latest = versions[versions.length - 1];
    const names = latest.data.to.map((m) => { const p = people.get(m.toLowerCase()); return p?.pre ?? p?.name ?? m.split('@')[0]; });
    const recipient = latest.data.recipient ?? (names.length ? new Intl.ListFormat('sk', { type: 'conjunction' }).format(names) : undefined);
    return { id, versions, latest, recipient, related: [] };
  });
  shares.sort((a, b) => b.latest.data.date.valueOf() - a.latest.data.date.valueOf());
  // súvisiace = výstupy, ktoré dostali všetci adresáti tohto výstupu (aby sa nikomu neukázalo cudzie)
  const lc = (xs: string[]) => xs.map((x) => x.toLowerCase());
  for (const s of shares) {
    const mine = lc(s.latest.data.to);
    if (!mine.length) continue;
    s.related = shares.filter((o) => o !== s && mine.every((m) => lc(o.latest.data.to).includes(m)));
  }
  return shares;
};
