# michalstupak.com

Osobná stránka a blog. Astro, bez client-side JS.

```
npm install
npm run dev      # lokálne
npm run build    # výstup do dist/
```

## Čo upraviť

- `src/data/site.ts` – texty, odbornosti, projekty, odkazy (LinkedIn, Instagram, Inovia, Cancel) a timeline. Hľadaj `TODO`.
- `public/logo.svg` a `public/favicon.svg` – nahraď skutočným STP logom (štvorec).
- `public/og.png` – 1200×630 obrázok pre zdieľanie na sociálnych sieťach.
- Nový článok: súbor `.md` v `src/content/blog/` s `title`, `description`, `date` (`draft: true` ho skryje).

RSS: `/rss.xml`, sitemap sa generuje pri builde.
