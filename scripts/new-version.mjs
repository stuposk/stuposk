// Nová verzia výstupu na tom istom linku:  npm run share:v -- <id> "čo sa zmenilo"
// Skopíruje najnovšiu vN.md do v(N+1).md, nastaví dátum, stav návrh a popis zmien.
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';

const [id, changes = ''] = process.argv.slice(2);
const dir = `src/content/pre/${id}`;
if (!id || !existsSync(dir)) throw new Error(`Výstup "${id}" neexistuje (pozri npm run shares)`);
const n = Math.max(...readdirSync(dir).map((f) => Number(f.match(/^v(\d+)\.md$/)?.[1] ?? 0)));
const today = new Date().toISOString().slice(0, 10);

let src = readFileSync(`${dir}/v${n}.md`, 'utf8');
const set = (key, value) => {
  const re = new RegExp(`^#?\\s*${key}:.*$`, 'm');
  src = re.test(src) ? src.replace(re, value) : src.replace(/^---\n/, `---\n${value}\n`);
};
set('date', `date: ${today}`);
set('status', 'status: návrh');
set('changes', `changes: ${JSON.stringify(changes || 'TODO: čo sa zmenilo')}`);
set('sentAt', `# sentAt: ${today}`);
writeFileSync(`${dir}/v${n + 1}.md`, src);
console.log(`Vytvorené: ${dir}/v${n + 1}.md\nLink (stále rovnaký): https://michalstupak.com/pre/${id}\nStaršia verzia:       https://michalstupak.com/pre/${id}/v${n}`);
