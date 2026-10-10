import type { APIRoute } from 'astro';
import { getShares, shareMarkdown } from '../../../lib/share-md';
import type { Share, Version } from '../../../lib/content';

export async function getStaticPaths() {
  return (await getShares()).flatMap((share) => share.versions.map((entry) => ({ params: { slug: share.id, v: `v${entry.n}` }, props: { share, entry } })));
}

export const GET: APIRoute = ({ props, site }) => {
  const { share, entry } = props as { share: Share; entry: Version };
  return shareMarkdown(share, entry, site!);
};
