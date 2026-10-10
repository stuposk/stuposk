import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { toMarkdown } from '../../lib/content';

export async function getStaticPaths() {
  return (await getCollection('pre')).map((doc) => ({ params: { slug: doc.id }, props: { doc } }));
}

export const GET: APIRoute = ({ props, site }) =>
  new Response(toMarkdown(props.doc, new URL(`/pre/${props.doc.id}`, site)), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
