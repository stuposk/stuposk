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

## Režimy a jazyky

- Prepínač v pravom dolnom rohu: **human** (default) / **dev**. Voľba sa pamätá v prehliadači, dá sa vynútiť aj cez `?mode=dev`.
- Obsah pre každý režim je v `src/components/HomeHuman.astro` a `HomeDev.astro`, dáta zdieľajú zo `src/data/site.ts`.
- **SK / EN:** `/` je slovenčina, `/en/` angličtina. Texty rozhrania sú v `src/i18n/ui.ts`; EN zatiaľ nie je preložená a padá späť na SK.
