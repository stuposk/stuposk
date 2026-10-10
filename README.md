# michalstupak.com

Osobná stránka a blog. Astro, statický web s minimom JavaScriptu.

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
npm run share -- "Návrh spolupráce" jana@acme.sk      # nový výstup → src/content/pre/<id>/v1.md
npm run share:v -- <id> "Pilot skrátený na 4 týždne"   # nová verzia na TOM ISTOM linku → v2.md
npm run shares                                        # prehľad: kto dostal čo, verzie, kedy odoslané
npm run shares -- jana@acme.sk                        # len jeden človek
```

- **Adresát = osoba podľa e-mailu** (`to: [jana@acme.sk]`). Mená a tvary mien sú v `src/content/ludia.yaml`.
- **Verzie:** `/pre/<id>` ukazuje vždy najnovšiu verziu. Staršie sú na `/pre/<id>/v1` s upozornením, že existuje novšia. V bočnom paneli je história verzií so zmenami.
- **Ďalšie výstupy pre teba:** v bočnom paneli aj v `.md` sa prelinkujú výstupy, ktoré dostali všetci adresáti daného výstupu. Pri spoločnom výstupe pre viac ľudí sa teda nikomu neukáže cudzí výstup.
- E-maily sa na web nevypisujú, ale sú v repozitári.
- Adresa má náhodnú príponu, stránka má `noindex`, nie je v sitemap ani v žiadnom zozname.
- **Nie je to šifrované ani za heslom.** Kto má link, vidí obsah (aj zoznam ďalších výstupov pre toho človeka). Ak je repo verejné, obsah je viditeľný aj tam, takže repo maj súkromné.
- PDF = tlačidlo „↓ PDF“ otvorí tlač prehliadača s čistým tlačovým štýlom („Uložiť ako PDF“).
- Výstupy nesú značku „powered by /kolega“ (stránka, PDF aj `.md`).

### Skill pre Claude Code

`.claude/skills/vystup-pre-klienta/` obsahuje postup, štruktúru, pravidlá písania a šablónu mailu pre výstupy na `/pre/`. Stačí Claudovi povedať napr. „priprav návrh spolupráce pre Janu z firmy X“ a skill sa použije.

Stránky `/pre/` aj blogové články majú bočný panel s meta údajmi (stav, verzia, platnosť / dátum, čas čítania, témy), obsahom, ktorý zvýrazňuje aktuálnu sekciu, a exportom pre AI.
