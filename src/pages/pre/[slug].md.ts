import type { APIRoute } from 'astro';
import { getShares, toMarkdown, type Share } from '../../lib/content';

export async function getStaticPaths() {
  return (await getShares()).map((share) => ({ params: { slug: share.doc.id }, props: { share } }));
}

export const GET: APIRoute = ({ props, site }) => {
  const { doc, recipient, related } = props.share as Share;
  return new Response(toMarkdown(doc, new URL(`/pre/${doc.id}`, site), { kolega: true, recipient, related }), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
