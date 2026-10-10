import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// Neverejné stránky pre konkrétneho adresáta (/pre/<slug>). Nie sú v sitemap ani v zozname, majú noindex.
const pre = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pre' }),
  schema: z.object({
    title: z.string(),
    recipient: z.string().optional(),
    description: z.string().optional(),
    date: z.coerce.date(),
  }),
});

export const collections = { blog, pre };
