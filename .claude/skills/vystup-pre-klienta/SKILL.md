---
name: vystup-pre-klienta
description: Pripraví výstup pre klienta alebo partnera ako stránku na michalstupak.com/pre/… (návrh spolupráce, ponuka, zhrnutie stretnutia, analýza, odporúčanie, plán). Použi vždy, keď Michal chce niekomu poslať link na výstup, napísať ponuku alebo zhrnutie pre konkrétneho človeka či firmu, alebo spomenie „stránku pre adresáta“, „/pre“ či „výstup pre zákazníka“.
---

# Výstup pre klienta (`/pre/…`)

Výstupy sú súčasťou **/kolega** (kolega.cloud). Stránka, PDF aj `.md` export nesú značku „powered by /kolega“ automaticky, do textu ju nepíš.

Výsledkom je jedna stránka na `https://michalstupak.com/pre/<slug>`, ktorej link Michal pošle mailom. Adresát si ju prečíta v prehliadači a cez bočný panel si ju stiahne ako `.md` alebo PDF, prípadne ju otvorí v Claude či ChatGPT a pokračuje tam. Píš preto tak, aby text dával zmysel **aj bez Michala a aj pre cudzí AI model**.

## Postup

1. **Ujasni si zadanie.** Ak to nie je jasné z kontextu, zisti od Michala:
   - komu to je (meno, firma, rola). Najprv pozri `npm run -s shares` a `src/content/klienti/`, či klient už existuje a čo mu už išlo; nadväzuj na predchádzajúce výstupy a neopakuj ich,
   - či si tykajú alebo vykajú,
   - čo má adresát po prečítaní urobiť (jeden konkrétny ďalší krok),
   - aké čísla, termíny a podklady sú k dispozícii. **Nič si nevymýšľaj:** chýbajúce údaje označ `doplň: …` a povedz o nich Michalovi.
2. **Vytvor súbor:** `npm run share -- "Názov" "Jana Nováková"` (alebo id existujúceho klienta, napr. `jana-novakova`). Skript vypíše cestu k súboru a link. Nového klienta založí v `src/content/klienti/<id>.yaml`; doplň v ňom `pre` (tvar po „Pripravené pre …“, napr. „Janu Novákovú“), `company` a `email`.
3. **Doplň frontmatter:**
   ```yaml
   title: "Návrh spolupráce: AI asistent pre HR"   # konkrétny, nie „Ponuka“
   client: jana-novakova                            # id klienta; meno sa vezme z klienta
   # recipient: "celý tím ACME"                     # len ak chceš prepísať meno z klienta
   description: "Jedna veta: čo navrhujem a prečo." # podnadpis, aj prvý riadok v .md
   date: 2026-10-10
   status: návrh            # návrh | na pripomienky | finálne
   version: "1.0"           # pri každej zmene po odoslaní zvýš (1.1, 2.0)
   validUntil: 2026-11-10   # len pri ponukách s cenou
   sentAt: 2026-10-10       # doplň, keď Michal link odošle
   sentTo: [jana@acme.sk]   # komu išiel (na web sa nevypisuje)
   ```
   Výstupy s rovnakým `client` sa na stránke navzájom prelinkujú v bloku „Ďalšie výstupy pre …“ a v `.md` exporte v sekcii „Súvisiace výstupy“.
4. **Napíš obsah** podľa štruktúry nižšie.
5. **Over:** `npm run build` musí prejsť. Potom skontroluj stránku `/pre/<slug>`, jej Markdown na `/pre/<slug>.md` a náhľad tlače (PDF).
6. **Odovzdaj Michalovi:** link, návrh krátkeho mailu (šablóna nižšie) a zoznam vecí označených `doplň`.

## Štruktúra dokumentu

Každá sekcia je nadpis `##`, lebo z nich sa skladá obsah v bočnom paneli. `###` používaj len zriedka. Sekcie, ktoré nemajú čo povedať, vynechaj.

1. `## V skratke`: 2 až 4 vety. Čo navrhujem, koľko to stojí alebo trvá a čo potrebujem od adresáta. Kto prečíta len toto, musí vedieť dosť.
2. `## Kontext`: čo sme riešili a aký problém riešime, jeho slovami. Dátum stretnutia, ak bolo.
3. `## Návrh` (alebo `## Riešenie` / `## Zistenia`): jadro dokumentu. Konkrétne kroky, nie sľuby.
4. `## Rozsah a cena`: tabuľka (položka | rozsah | cena). Uveď, či je cena s DPH alebo bez, a čo v cene nie je.
5. `## Harmonogram`: fázy s trvaním alebo dátumami.
6. `## Predpoklady a riziká`: čo musí platiť a čo sa môže pokaziť. Krátko.
7. `## Ďalší krok`: jedna jasná akcia s termínom („Potvrď mi do piatka 17. 10., či ideme do pilotu.“).

Pri zhrnutí zo stretnutia použi namiesto 3 až 6 sekcie `## Na čom sme sa dohodli`, `## Úlohy` (tabuľka kto | čo | dokedy) a `## Otvorené otázky`.

## Ako písať

- **Hlas:** Michal, prvá osoba, priamo a ľudsky. Krátke vety, žiadna korporátna omáčka ani marketing („inovatívne riešenia na mieru“, „synergie“).
- **AI ako nástroj, nie ako téma.** Píš o výsledku pre klienta, nie o tom, aké je AI úžasné.
- **Konkrétne:** čísla, dátumy, mená, jednotky. Namiesto „rýchlo“ píš „do 2 týždňov“.
- **Samostatný text:** žiadne „ako sme sa bavili“ bez vysvetlenia čoho. Skratky pri prvom použití rozpíš. Text musí obstáť po skopírovaní do iného AI.
- **Informácie nedávaj len do obrázkov.** Všetko podstatné patrí do textu alebo tabuľky (kvôli .md a AI).
- **Formátovanie:** tabuľky na čísla a porovnania, číslované zoznamy na postupy, tučné len na skutočne kľúčové veci. Na začiatku dokumentu nepíš oslovenie ani podpis, ten pridá stránka sama.
- **Dĺžka:** čo najkratšia, ktorá ešte splní účel. Typicky 300 až 900 slov.

## Bezpečnosť

Stránka **nie je za heslom**. Má len nehádateľnú adresu, `noindex` a nie je v sitemap. Kto má link, vidí ju, a ak je repo verejné, obsah je viditeľný aj na GitHube. Preto:

- nedávaj sem heslá, prístupové údaje, rodné čísla, čísla účtov ani interné poznámky o klientovi,
- pri citlivých číslach sa Michala opýtaj, či ich chce mať na webe,
- keď výstup stratí platnosť, súbor zmaž (link potom vráti 404).

## Šablóna mailu

```
Predmet: {title}

Ahoj {meno},

posielam {čo to je}: {link}

V skratke: {1 až 2 vety z „V skratke“}.

Stránku si vieš stiahnuť ako PDF alebo Markdown, prípadne ju otvoriť rovno v Claude či ChatGPT a pokračovať tam.

{ďalší krok s termínom}

Michal
```

## Kontrolný zoznam pred odoslaním

- [ ] `title` je konkrétny, `client` je nastavený a klient má správny tvar `pre`, `status` a `version` sedia
- [ ] po odoslaní doplnené `sentAt` a `sentTo`
- [ ] „V skratke“ obstojí aj samostatne
- [ ] všetky čísla a termíny sú od Michala, nie vymyslené; nič neostalo označené `doplň`
- [ ] je tam presne jeden jasný ďalší krok s termínom
- [ ] žiadne citlivé údaje
- [ ] `npm run build` prešiel a stránka, `.md` aj PDF vyzerajú dobre
