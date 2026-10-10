// Vytvorí nový výstup pre klienta:
//   npm run share -- "Názov" "Jana Nováková"      (klient podľa mena; ak neexistuje, vytvorí sa)
//   npm run share -- "Názov" jana-novakova         (klient podľa id súboru v src/content/klienti)
// Slug výstupu má náhodnú príponu, aby sa nedal uhádnuť.
import { writeFileSync, existsSync } from 'node:fs';
import { randomBytes } from 'node:crypto';

const slugify = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const [title = 'Bez názvu', who = ''] = process.argv.slice(2);

let clientId = '';
if (who) {
  clientId = slugify(who);
  const clientFile = `src/content/klienti/${clientId}.yaml`;
  if (!existsSync(clientFile)) {
    writeFileSync(clientFile, `name: ${JSON.stringify(who)}\npre: ${JSON.stringify(who)} # TODO: tvar po „Pripravené pre …“ (napr. Janu Novákovú)\n# company: ""\n# email: ""\n`);
    console.log(`Nový klient: ${clientFile} (doplň tvar mena a firmu)`);
  }
}

const id = `${slugify(title).slice(0, 40)}-${randomBytes(4).toString('hex')}`;
const file = `src/content/pre/${id}.md`;
if (existsSync(file)) throw new Error(`${file} už existuje`);
const today = new Date().toISOString().slice(0, 10);

writeFileSync(file, `---
title: ${JSON.stringify(title)}
${clientId ? `client: ${clientId}\n` : ''}description: ""
date: ${today}
status: návrh
version: "1.0"
# sentAt: ${today}
# sentTo: []
---

Sem napíš obsah v Markdowne.
`);
console.log(`Vytvorené: ${file}\nLink:      https://michalstupak.com/pre/${id}`);
