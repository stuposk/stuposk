// Nový výstup:  npm run share -- "Názov" jana@acme.sk [peter@acme.sk …]
// Vytvorí src/content/pre/<id>/v1.md a nových ľudí doplní do src/content/ludia.yaml.
// Id má náhodnú príponu, aby sa link nedal uhádnuť.
import { writeFileSync, mkdirSync, readFileSync, appendFileSync } from 'node:fs';
import { randomBytes } from 'node:crypto';

const slugify = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const [title = 'Bez názvu', ...to] = process.argv.slice(2);
const emails = to.map((e) => e.trim().toLowerCase());
for (const e of emails) if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) throw new Error(`Neplatný e-mail: ${e}`);

const peopleFile = 'src/content/ludia.yaml';
const known = readFileSync(peopleFile, 'utf8');
for (const e of emails) {
  if (known.toLowerCase().includes(`\n${e}:`) || known.toLowerCase().startsWith(`${e}:`)) continue;
  appendFileSync(peopleFile, `\n${e}:\n  name: ${JSON.stringify(e.split('@')[0])} # TODO: meno\n  # pre: "" # tvar po „Pripravené pre …“\n  # company: ""\n`);
  console.log(`Nový človek v ${peopleFile}: ${e} (doplň meno)`);
}

const id = `${slugify(title).slice(0, 40)}-${randomBytes(4).toString('hex')}`;
mkdirSync(`src/content/pre/${id}`, { recursive: true });
const file = `src/content/pre/${id}/v1.md`;
const today = new Date().toISOString().slice(0, 10);
writeFileSync(file, `---
title: ${JSON.stringify(title)}
to: [${emails.join(', ')}]
description: ""
date: ${today}
status: návrh
# validUntil: ${today}
# sentAt: ${today}
---

Sem napíš obsah v Markdowne.
`);
console.log(`Vytvorené: ${file}\nLink:      https://michalstupak.com/pre/${id}`);
