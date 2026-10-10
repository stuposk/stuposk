import { defineCollection, reference } from 'astro:content';
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

// Klienti / adresáti výstupov. Súbor src/content/klienti/<id>.yaml, id = názov súboru.
const klienti = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/klienti' }),
  schema: z.object({
    name: z.string(),                // Jana Nováková
    pre: z.string().optional(),      // tvar po „Pripravené pre …“: Janu Novákovú
    company: z.string().optional(),
    email: z.string().optional(),    // len pre teba, na web sa nevypisuje
  }),
});

// Neverejné stránky pre konkrétneho adresáta (/pre/<slug>). Nie sú v sitemap ani v zozname, majú noindex.
const pre = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pre' }),
  schema: z.object({
    title: z.string(),
    client: reference('klienti').optional(),
    recipient: z.string().optional(), // prepíše meno z klienta (napr. „celý tím ACME“)
    description: z.string().optional(),
    date: z.coerce.date(),
    status: z.enum(['návrh', 'na pripomienky', 'finálne']).default('návrh'),
    version: z.string().optional(),
    validUntil: z.coerce.date().optional(),
    sentAt: z.coerce.date().optional(),      // kedy si link poslal
    sentTo: z.array(z.string()).default([]), // komu (e-maily / mená), na web sa nevypisuje
  }),
});

export const collections = { blog, pre, klienti };
