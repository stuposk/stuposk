import type { APIRoute } from 'astro';
import { getPosts, toMarkdown } from '../../lib/content';

export async function getStaticPaths() {
  return (await getPosts()).map((post) => ({ params: { slug: post.id }, props: { post } }));
}

export const GET: APIRoute = ({ props, site }) =>
  new Response(toMarkdown(props.post, new URL(`/blog/${props.post.id}`, site)), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
