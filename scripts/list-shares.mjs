// Prehľad výstupov podľa ľudí:  npm run shares [-- jana@acme.sk]
// Číta priamo súbory, nič nezverejňuje.
import { readdirSync, readFileSync, existsSync } from 'node:fs';

const front = (txt) => {
  const m = txt.match(/^---\n([\s\S]*?)\n---/);
  const out = {};
  for (const line of (m ? m[1] : '').split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*?)\s*(#.*)?$/);
    if (kv) out[kv[1]] = kv[2].replace(/^["']|["']$/g, '');
  }
  out.to = (out.to || '').replace(/[[\]]/g, '').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
  return out;
};
const people = {};
let cur = null;
for (const line of (existsSync('src/content/ludia.yaml') ? readFileSync('src/content/ludia.yaml', 'utf8') : '').split('\n')) {
  const top = line.match(/^([^\s#][^:]*):\s*$/);
  if (top) { cur = top[1].toLowerCase(); people[cur] = {}; continue; }
  const kv = line.match(/^\s+(\w+):\s*(.*?)\s*(#.*)?$/);
  if (cur && kv) people[cur][kv[1]] = kv[2].replace(/^["']|["']$/g, '');
}

const root = 'src/content/pre';
const shares = readdirSync(root, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => {
  const versions = readdirSync(`${root}/${d.name}`).map((f) => f.match(/^v(\d+)\.md$/)?.[1]).filter(Boolean).map(Number).sort((a, b) => a - b)
    .map((n) => ({ n, ...front(readFileSync(`${root}/${d.name}/v${n}.md`, 'utf8')) }));
  return { id: d.name, versions, latest: versions.at(-1) };
}).filter((s) => s.latest);

const only = process.argv[2]?.toLowerCase();
const byPerson = {};
for (const s of shares) for (const e of s.latest.to.length ? s.latest.to : ['(bez adresáta)']) (byPerson[e] ??= []).push(s);
for (const [email, list] of Object.entries(byPerson).sort()) {
  if (only && email !== only) continue;
  const p = people[email];
  console.log(`\n${p?.name ? `${p.name}${p.company ? ` · ${p.company}` : ''} <${email}>` : email}`);
  for (const s of list.sort((a, b) => (b.latest.date || '').localeCompare(a.latest.date || ''))) {
    console.log(`  ${s.latest.title}  →  https://michalstupak.com/pre/${s.id}`);
    for (const v of [...s.versions].reverse()) {
      console.log(`     v${v.n}  ${v.date}  ${(v.status || '').padEnd(15)} ${v.sentAt ? `odoslané ${v.sentAt}` : 'neodoslané'}${v.changes && v.n > 1 ? `  · ${v.changes}` : ''}`);
    }
  }
}
