import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
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

// Ľudia, ktorým posielaš výstupy. Kľúč = e-mail. Súbor src/content/ludia.yaml.
const ludia = defineCollection({
  loader: file('src/content/ludia.yaml'),
  schema: z.object({
    name: z.string(),            // Jana Nováková
    pre: z.string().optional(),  // tvar po „Pripravené pre …“: Janu Novákovú
    company: z.string().optional(),
  }),
});

// Výstupy pre adresátov: src/content/pre/<id>/v1.md, v2.md, …
// /pre/<id> ukazuje vždy najnovšiu verziu, staršie sú na /pre/<id>/v1.
// Nie sú v sitemap ani v zozname, majú noindex.
const pre = defineCollection({
  loader: glob({ pattern: '**/v[0-9]*.md', base: './src/content/pre' }),
  schema: z.object({
    title: z.string(),
    to: z.array(z.string().email()).default([]), // komu (e-maily); na web sa nevypisujú
    recipient: z.string().optional(),            // prepíše meno odvodené z `to`
    description: z.string().optional(),
    date: z.coerce.date(),
    status: z.enum(['návrh', 'na pripomienky', 'finálne']).default('návrh'),
    changes: z.string().optional(),              // čo sa zmenilo oproti predchádzajúcej verzii
    validUntil: z.coerce.date().optional(),
    sentAt: z.coerce.date().optional(),          // kedy si túto verziu poslal
  }),
});

export const collections = { blog, pre, ludia };
