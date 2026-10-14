// Development helper: cross-check the classes used by the interface against style.css.
//   node scripts/check-css.mjs
// Classes built dynamically from data (rarity, band, notification kind, ...) are matched by family,
// and CSS custom properties (--ipi-*) are ignored.
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const IGNORE = new Set(['ipi-root']);

async function walk(dir, out = []) {
    for (const e of await readdir(join(root, dir), { withFileTypes: true })) {
        const p = join(dir, e.name);
        if (e.isDirectory()) await walk(p, out);
        else if (e.name.endsWith('.js')) out.push(p);
    }
    return out;
}

const jsFiles = [...await walk('src'), 'index.js'];
const css = await readFile(join(root, 'style.css'), 'utf8');

let js = '';
for (const f of jsFiles) js += await readFile(join(root, f), 'utf8');

const used = new Set();
const dynamicPrefixes = new Set();
for (const m of js.matchAll(/\bipi-[a-z0-9-]+/gi)) used.add(m[0]);
// `ipi-badge--${kind}` → every `ipi-badge--*` class counts as used
for (const m of js.matchAll(/(ipi-[a-z0-9-]+?)--\$\{/gi)) dynamicPrefixes.add(m[1]);

const isVar = name => /^ipi-(accent|accent2|bg|panel|text|muted|line|good|warn|bad|radius|radius-sm|shadow|font|fab-size)$/.test(name);

const defined = new Set([...css.matchAll(/\.(ipi-[a-z0-9-]+)/gi)].map(m => m[1]));

const missing = [...used]
    .filter(c => !defined.has(c))
    .filter(c => !isVar(c))
    .filter(c => !c.endsWith('--'))
    .filter(c => !IGNORE.has(c))
    .sort();

const unused = [...defined]
    .filter(c => !used.has(c))
    .filter(c => ![...dynamicPrefixes].some(p => c.startsWith(`${p}--`)))
    .sort();

console.log(`${jsFiles.length} modules · ${used.size} classes used · ${defined.size} defined`);
if (missing.length) console.log(`\nUSED BUT NOT STYLED (${missing.length}):\n  ${missing.join('\n  ')}`);
if (unused.length) console.log(`\nSTYLED BUT NEVER USED (${unused.length}):\n  ${unused.join('\n  ')}`);
if (!missing.length && !unused.length) console.log('style.css matches the interface exactly.');
if (missing.length) process.exit(1);

