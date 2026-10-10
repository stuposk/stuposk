import type { APIRoute } from 'astro';
import { getShares, shareMarkdown } from '../../lib/share-md';
import type { Share } from '../../lib/content';

export async function getStaticPaths() {
  return (await getShares()).map((share) => ({ params: { slug: share.id }, props: { share } }));
}

export const GET: APIRoute = ({ props, site }) => {
  const { share } = props as { share: Share };
  return shareMarkdown(share, share.latest, site!);
};
