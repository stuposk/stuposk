// Vytvorí novú stránku pre adresáta: npm run share -- "Názov" "Meno adresáta"
// Slug má náhodnú príponu, aby sa nedal uhádnuť.
import { writeFileSync, existsSync } from 'node:fs';
import { randomBytes } from 'node:crypto';

const [title = 'Bez názvu', recipient = ''] = process.argv.slice(2);
const slug = title.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
const id = `${slug}-${randomBytes(4).toString('hex')}`;
const file = `src/content/pre/${id}.md`;
if (existsSync(file)) throw new Error(`${file} už existuje`);

writeFileSync(file, `---
title: ${JSON.stringify(title)}
${recipient ? `recipient: ${JSON.stringify(recipient)}\n` : ''}description: ""
date: ${new Date().toISOString().slice(0, 10)}
---

Sem napíš obsah v Markdowne.
`);
console.log(`Vytvorené: ${file}\nLink:      https://michalstupak.com/pre/${id}`);
