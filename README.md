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

## Blog

- Článok = `.md` v `src/content/blog/` s `title`, `description`, `date`, `tags: [ai, podnikanie]` (`draft: true` ho skryje).
- Listing `/blog` má filter podľa tém a vyhľadávanie; dá sa naň odkázať (`/blog?tag=ai`, `/blog?q=coworking`).
- Každý článok má aj Markdown verziu na `/blog/<slug>.md` a tlačidlá pre AI.
- `ukazka-*.md` sú ukážky, zmaž ich.

## Stránky pre adresáta (`/pre/…`)

Pošleš niekomu link mailom a on si obsah stiahne ako `.md` / PDF alebo ho otvorí rovno v Claude či ChatGPT.

```
npm run share -- "Návrh spolupráce" "Janu Novákovú"
# → src/content/pre/navrh-spoluprace-1a2b3c4d.md
# → https://michalstupak.com/pre/navrh-spoluprace-1a2b3c4d
```

- Adresa má náhodnú príponu, stránka má `noindex`, nie je v sitemap ani v žiadnom zozname.
- **Nie je to šifrované ani za heslom.** Kto má link, vidí obsah. A ak je repo verejné, obsah je viditeľný aj tam, takže citlivé veci sem nedávaj (alebo maj repo súkromné).
- PDF = tlačidlo „↓ PDF“ otvorí tlač prehliadača s čistým tlačovým štýlom („Uložiť ako PDF“).

### Skill pre Claude Code

`.claude/skills/vystup-pre-klienta/` obsahuje postup, štruktúru, pravidlá písania a šablónu mailu pre výstupy na `/pre/`. Stačí Claudovi povedať napr. „priprav návrh spolupráce pre Janu z firmy X“ a skill sa použije.

Stránky `/pre/` aj blogové články majú bočný panel s meta údajmi (stav, verzia, platnosť / dátum, čas čítania, témy), obsahom, ktorý zvýrazňuje aktuálnu sekciu, a exportom pre AI.
