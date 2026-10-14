// Built-in product catalogs, parsed into validated products with formula prices.
import { GENERAL, SUPERNATURAL } from './general.js';
import { ENHANCEMENT, APPEARANCE } from './body.js';
import { MAGIC, TECHNOLOGY } from './items.js';
import { rarityForPower } from '../pricing.js';
import { slug } from '../util.js';

const TYPE_CODE = { c: 'consumable', p: 'permanent', e: 'equipment', s: 'service' };
const DUR_CODE = { i: 'instant', s: 'scene', d: 'day', w: 'week', '-': 'permanent' };

export const THEMES = {
    general: { label: 'General Adventure', icon: '🧭', data: GENERAL,
        keywords: ['general', 'adventure', 'adventurer', 'rpg', 'misc', 'miscellaneous', 'everything', 'variety', 'all kinds', 'default'] },
    supernatural: { label: 'Supernatural Abilities', icon: '👻', data: SUPERNATURAL,
        keywords: ['supernatural', 'superpower', 'superpowers', 'super power', 'psychic', 'psionic', 'paranormal', 'telekinesis', 'telepathy', 'ghost', 'spirit', 'occult', 'esper', 'mutant'] },
    enhancement: { label: 'Personal Enhancements', icon: '🧬', data: ENHANCEMENT,
        keywords: ['enhancement', 'enhancements', 'personal enhancement', 'self improvement', 'self-improvement', 'stats', 'attributes', 'physical', 'strength', 'skills', 'body upgrade', 'upgrades'] },
    appearance: { label: 'Appearance Changes', icon: '🦋', data: APPEARANCE,
        keywords: ['appearance', 'looks', 'beauty', 'cosmetic', 'cosmetics', 'makeover', 'fashion', 'glamour', 'body modification', 'transformation', 'style'] },
    magic: { label: 'Magical Items', icon: '🪄', data: MAGIC,
        keywords: ['magic', 'magical', 'spell', 'spells', 'wizard', 'witch', 'sorcery', 'enchanted', 'enchantment', 'arcane', 'potion', 'potions', 'artifact', 'artifacts', 'fantasy'] },
    technology: { label: 'Technology', icon: '🤖', data: TECHNOLOGY,
        keywords: ['technology', 'tech', 'sci-fi', 'scifi', 'science fiction', 'cyberpunk', 'cybernetic', 'cybernetics', 'gadget', 'gadgets', 'futuristic', 'robot', 'robots', 'hacking', 'implants'] },
};

function parseLine(line, theme) {
    const f = line.split('|').map(s => s.trim());
    if (f.length < 11) return null;
    const [icon, name, t, d, power, utility, uses, tags, description, effect, family, flags = ''] = f;
    const type = TYPE_CODE[t];
    const p = Number(power);
    return {
        key: `${theme}:${slug(name)}`,
        icon, name, type,
        duration: type === 'permanent' || type === 'equipment' ? 'permanent' : DUR_CODE[d],
        power: p, utility: Number(utility), uses: Number(uses) || 1,
        rarity: rarityForPower(p),
        realityAltering: flags.includes('R'),
        tags: tags.split(',').map(s => s.trim()).filter(Boolean),
        category: theme, theme, description, effect,
        family: slug(family || name),
        source: 'catalog',
    };
}

let cache = null;
/** Raw (unpriced) catalog products, keyed by theme. Prices are computed later by the shop. */
export function catalog() {
    if (cache) return cache;
    cache = {};
    for (const [theme, def] of Object.entries(THEMES)) {
        cache[theme] = def.data.split('\n').map(l => l.trim()).filter(Boolean).map(l => parseLine(l, theme)).filter(Boolean);
        // tier = position within family (weak → strong)
        const fam = {};
        for (const p of cache[theme].sort((a, b) => a.power - b.power)) {
            fam[p.family] = (fam[p.family] || 0) + 1;
            p.tier = fam[p.family];
        }
    }
    return cache;
}

export function allCatalogProducts() {
    return Object.values(catalog()).flat();
}

/** Map free text to the best matching built-in theme id (or null). */
export function matchTheme(text) {
    const t = ` ${String(text || '').toLowerCase()} `;
    let best = null, bestScore = 0;
    for (const [id, def] of Object.entries(THEMES)) {
        let score = 0;
        for (const k of def.keywords) if (t.includes(` ${k} `) || t.includes(` ${k},`) || t.includes(` ${k}.`) || t.includes(` ${k}s `)) score += k.length > 6 ? 2 : 1;
        if (t.includes(def.label.toLowerCase())) score += 3;
        if (score > bestScore) { best = id; bestScore = score; }
    }
    return best;
}

/** Tags associated with free text (used for custom themes without AI). */
export function tagsForText(text) {
    const t = String(text || '').toLowerCase();
    const tags = new Set();
    for (const p of allCatalogProducts()) for (const tag of p.tags) if (tag.length > 3 && t.includes(tag)) tags.add(tag);
    return [...tags];
}
