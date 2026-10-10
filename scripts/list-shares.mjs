// Prehľad výstupov podľa klientov: npm run shares [-- id-klienta]
// Číta priamo súbory, nič nezverejňuje.
import { readdirSync, readFileSync, existsSync } from 'node:fs';

const front = (txt) => {
  const m = txt.match(/^---\n([\s\S]*?)\n---/);
  const out = {};
  for (const line of (m ? m[1] : txt).split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) out[kv[1]] = kv[2].replace(/^["']|["']$/g, '').replace(/\s+#.*$/, '');
  }
  return out;
};
const dir = 'src/content/pre', cdir = 'src/content/klienti';
const clients = Object.fromEntries((existsSync(cdir) ? readdirSync(cdir) : []).filter((f) => f.endsWith('.yaml')).map((f) => [f.replace(/\.yaml$/, ''), front(readFileSync(`${cdir}/${f}`, 'utf8'))]));
const docs = readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => ({ id: f.replace(/\.md$/, ''), ...front(readFileSync(`${dir}/${f}`, 'utf8')) }));
const only = process.argv[2];

const groups = {};
for (const d of docs) (groups[d.client || '(bez klienta)'] ??= []).push(d);
for (const [cid, list] of Object.entries(groups).sort()) {
  if (only && cid !== only) continue;
  const c = clients[cid];
  console.log(`\n${c ? `${c.name}${c.company ? ` · ${c.company}` : ''}${c.email ? ` <${c.email}>` : ''}` : cid}  [${cid}]`);
  for (const d of list.sort((a, b) => (b.date || '').localeCompare(a.date || ''))) {
    const sent = d.sentAt ? `odoslané ${d.sentAt}${d.sentTo ? ` → ${d.sentTo}` : ''}` : 'neodoslané';
    console.log(`  ${d.date}  ${(d.status || '').padEnd(15)} ${d.title}\n             https://michalstupak.com/pre/${d.id}  (${sent})`);
  }
}
