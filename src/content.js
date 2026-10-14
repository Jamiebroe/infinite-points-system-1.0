// Default reward rules, achievements and UI color themes.

export const DEFAULT_CATEGORIES = [
    { id: 'combat', name: 'Combat Victory', icon: '⚔️', enabled: true, points: 30, cooldown: 2, tags: 'combat,strength',
        keywords: 'defeated, defeats, vanquish*, slain, slew, knocked * out, won the fight, wins the fight, victory over, overpowered, conquered' },
    { id: 'quest', name: 'Goal Accomplished', icon: '🏆', enabled: true, points: 50, cooldown: 3, tags: 'progress',
        keywords: 'quest complete*, mission complete*, mission accomplished, task complete*, objective complete*, goal reached, finally succeeded, pulled it off' },
    { id: 'discovery', name: 'Discovery', icon: '🔍', enabled: true, points: 20, cooldown: 2, tags: 'knowledge,perception',
        keywords: 'discovered, uncovered, found a hidden, secret passage, hidden room, unearthed, ancient relic, realized the truth, deciphered' },
    { id: 'bond', name: 'Social Bond', icon: '🤝', enabled: true, points: 15, cooldown: 3, tags: 'social,charisma',
        keywords: 'befriended, trusts you, earned * trust, formed an alliance, became friends, swore loyalty, promised to help, forgave' },
    { id: 'training', name: 'Training & Growth', icon: '📈', enabled: true, points: 15, cooldown: 3, tags: 'training,skill',
        keywords: 'trained, practiced, mastered, learned a new, leveled up, level up, breakthrough, honed * skill*' },
    { id: 'survival', name: 'Survival & Escape', icon: '🛡️', enabled: true, points: 25, cooldown: 3, tags: 'survival,defense',
        keywords: 'escaped, narrowly avoided, survived, dodged, barely made it, got away, evaded, fled safely' },
    { id: 'loot', name: 'Reward & Loot', icon: '💰', enabled: true, points: 15, cooldown: 2, tags: 'wealth,luck',
        keywords: 'treasure, loot*, bounty, gold coins, chest full, paid you, reward of, jackpot' },
    { id: 'romance', name: 'Romantic Moment', icon: '💞', enabled: false, points: 15, cooldown: 4, tags: 'social,romance',
        keywords: 'kissed, embraced, held hands, blushed, confessed * feelings, date night' },
];

export const DEFAULT_INTENSITY = [
    { id: 'minor', label: 'Minor', mult: 0.75, words: 'slightly, a little, minor, barely, small' },
    { id: 'major', label: 'Major', mult: 1.5, words: 'massive, incredible, overwhelming, decisive, spectacular, huge, enormous, brutal' },
    { id: 'epic', label: 'Epic', mult: 2, words: 'legendary, impossible, unprecedented, godlike, world-shaking, cataclysmic' },
];

export const DEFAULT_MILESTONES = [
    { id: 'm_life_500', name: '500 lifetime Points', kind: 'lifetime', threshold: 500, bonus: 50, enabled: true },
    { id: 'm_life_2500', name: '2,500 lifetime Points', kind: 'lifetime', threshold: 2500, bonus: 200, enabled: true },
    { id: 'm_life_10000', name: '10,000 lifetime Points', kind: 'lifetime', threshold: 10000, bonus: 750, enabled: true },
    { id: 'm_ev_10', name: '10 events', kind: 'events', threshold: 10, bonus: 40, enabled: true },
    { id: 'm_ev_50', name: '50 events', kind: 'events', threshold: 50, bonus: 150, enabled: true },
    { id: 'm_ev_200', name: '200 events', kind: 'events', threshold: 200, bonus: 500, enabled: true },
];

/** `cond` is a key evaluated in state.js – never code. */
export const ACHIEVEMENTS = [
    { id: 'a_first_event', icon: '✨', name: 'Awakening', desc: 'Earn your first System Points.', cond: 'events', n: 1 },
    { id: 'a_events_25', icon: '🔥', name: 'Momentum', desc: 'Trigger 25 events.', cond: 'events', n: 25 },
    { id: 'a_events_100', icon: '🌋', name: 'Unstoppable', desc: 'Trigger 100 events.', cond: 'events', n: 100 },
    { id: 'a_first_buy', icon: '🛒', name: 'First Purchase', desc: 'Buy anything from the Shop.', cond: 'purchases', n: 1 },
    { id: 'a_buy_10', icon: '🛍️', name: 'Valued Customer', desc: 'Make 10 purchases.', cond: 'purchases', n: 10 },
    { id: 'a_perm_1', icon: '💠', name: 'Evolved', desc: 'Own a permanent upgrade.', cond: 'permanents', n: 1 },
    { id: 'a_perm_5', icon: '🧬', name: 'Transcendent', desc: 'Own 5 permanent upgrades.', cond: 'permanents', n: 5 },
    { id: 'a_rare', icon: '💎', name: 'Connoisseur', desc: 'Buy a rare or premium product.', cond: 'rareBuy', n: 1 },
    { id: 'a_premium', icon: '👑', name: 'Premium Member', desc: 'Buy a premium product.', cond: 'premiumBuy', n: 1 },
    { id: 'a_life_1000', icon: '📊', name: 'Thousandfold', desc: 'Earn 1,000 lifetime Points.', cond: 'lifetime', n: 1000 },
    { id: 'a_life_10000', icon: '🌌', name: 'Infinite Potential', desc: 'Earn 10,000 lifetime Points.', cond: 'lifetime', n: 10000 },
    { id: 'a_saver', icon: '🏦', name: 'Hoarder', desc: 'Hold 2,000 Points at once.', cond: 'balance', n: 2000 },
    { id: 'a_cats_5', icon: '🎭', name: 'Versatile', desc: 'Trigger 5 different event categories.', cond: 'categories', n: 5 },
    { id: 'a_wish', icon: '⭐', name: 'Wish Granted', desc: 'Buy an item from your wishlist.', cond: 'wishBuy', n: 1 },
];

export const COLOR_THEMES = {
    void: { label: 'Void', accent: '#c77dff', accent2: '#5ee7ff', bg: '#09060f', panel: '#150f22', text: '#f1e9ff', muted: '#9f8fbf' },
    azure: { label: 'Azure', accent: '#4fa3ff', accent2: '#8a5cff', bg: '#0b1020', panel: '#121a33', text: '#e6ecff', muted: '#8a97c2' },
    crimson: { label: 'Crimson', accent: '#ff4f6d', accent2: '#ff9f43', bg: '#14080c', panel: '#221018', text: '#ffe9ee', muted: '#c08a98' },
    emerald: { label: 'Emerald', accent: '#2fe39b', accent2: '#2fb3e3', bg: '#07130f', panel: '#0e2119', text: '#e5fff4', muted: '#87b8a3' },
    gold: { label: 'Gold', accent: '#ffcc4d', accent2: '#ff7a3d', bg: '#14100a', panel: '#221b10', text: '#fff6e0', muted: '#bfa77a' },
    light: { label: 'Daylight', accent: '#5b5bf0', accent2: '#e0529c', bg: '#f4f5fb', panel: '#ffffff', text: '#1d1f33', muted: '#6b6f8f' },
};
