import { getShares, toMarkdown, type Share, type Version } from './content';

export const shareMarkdown = (share: Share, entry: Version, site: URL) =>
  new Response(
    toMarkdown(entry, new URL(entry.n === share.latest.n ? `/pre/${share.id}` : `/pre/${share.id}/v${entry.n}`, site), {
      kolega: true,
      recipient: share.recipient,
      version: { n: entry.n, latest: share.latest.n },
      related: share.related.map((r) => ({ title: r.latest.data.title, href: new URL(`/pre/${r.id}.md`, site).href, date: r.latest.data.date })),
    }),
    { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } },
  );

export { getShares };
