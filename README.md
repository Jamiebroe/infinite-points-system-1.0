# Infinite Points — The System

A private, chat-aware **System** extension for [SillyTavern](https://sillytavern.app/): a floating
interface that rewards your roleplay with Points, runs a Shop that rotates once a day, keeps an
inventory of abilities you actually bought, and **remembers what you like** so every rotation feels
hand-picked.

Nothing here touches SillyTavern's core files. Install it as a normal third-party extension, open a
chat, and the System wakes up.

---

## Contents

- [What it does](#what-it-does)
- [Installation](#installation)
- [First five minutes](#first-five-minutes)
- [The interface](#the-interface)
- [Talking to the System in chat](#talking-to-the-system-in-chat)
- [How Points are earned](#how-points-are-earned)
- [The daily Shop](#the-daily-shop)
- [Shop Memory](#shop-memory)
- [Pricing](#pricing)
- [AI features (optional)](#ai-features-optional)
- [Where your data lives](#where-your-data-lives)
- [Troubleshooting](#troubleshooting)
- [For developers](#for-developers)

---

## What it does

| | |
|---|---|
| **Automatic rewards** | Qualifying events in the story pay Points. Every event is paid **at most once** — regenerating, editing, reloading or re-reading a message never double-pays. |
| **Daily Shop** | A new selection of products every day at a time you choose, in your timezone. |
| **Inventory** | Anything you buy stays yours forever, even after the Shop rotates. Permanent abilities, equipment, consumables and services. |
| **Shop Memory** | Remembers your purchases, your tastes, the Shop's purpose, what you couldn't afford, and every past rotation — and never resets it during a rotation. |
| **Chat aware** | Each chat has its own progression by default. Switching chats loads that chat's System automatically. |
| **AI aware** | Purchased abilities and active effects are described to the AI, so the story treats them as real. Works alongside World Info and Author's Note. |
| **Private** | The System interface is visible only to you. The assistant never buys anything and can be muted. |

---

## Installation

### Option A — install from GitHub (easiest)

1. Open SillyTavern.
2. Click the **Extensions** icon (the plug/puzzle piece) in the top bar.
3. Click **Install extension**.
4. Paste this repository's URL, for example
   `https://github.com/your-name/SillyTavern-InfinitePoints`
   and confirm.
5. Wait for the message that the extension was installed, then **reload the page** (F5).

### Option B — install by hand

1. Download this repository as a ZIP and unpack it.
2. Copy the whole folder into your SillyTavern installation:
   - Standard install: `SillyTavern/data/<your-user-handle>/extensions/SillyTavern-InfinitePoints/`
   - Docker / "install for all users": `SillyTavern/public/scripts/extensions/third-party/SillyTavern-InfinitePoints/`
3. Reload SillyTavern (F5).

> The folder must contain `manifest.json` and `index.js` directly at its top level. If you end up
> with a folder inside a folder, move the inner folder up one level.

### Option C — hosted SillyTavern

This extension only uses supported client-side extension APIs, so it works on hosted installs that
allow third-party extensions. If the host blocks extension installation, ask the operator to install
it into `third-party`.

**No build step, no dependencies, no server plugin.** It is plain ES modules.

---

## First five minutes

1. Open any chat and send a message. A small floating **◈ System** button appears near the bottom right.
2. Click it. The panel opens on the **Points** tab. Your balance starts at 0 and the current chat is
   recorded as a baseline, so old history is *not* paid retroactively.
3. Keep roleplaying. When something notable happens in the story, a notification appears and your
   balance goes up.
4. Open the **Shop** tab. You have today's products, with prices, rarity and stock.
5. Buy something affordable. It moves into **Inventory** and the AI is told you own it.
6. Wait for the next daily reset (the countdown is in the panel footer) or press **Refresh** to see a
   new selection.

If you want Points for events that already happened before installing, open **Points → Quick actions
→ Scan chat history**.

---

## The interface

A draggable floating button opens a panel with eight tabs. The panel is a fixed drawer, so the chat
and its input stay usable the whole time.

| Tab | What it shows |
|---|---|
| **Points** | Balance, rank, today's earnings, live effects, next achievement, shop snapshot, quick actions and the private assistant. |
| **Shop** | Today's rotation, the Shop's purpose, filters, wishlist, recommendations, banned terms and the price formula. |
| **Inventory** | Permanent abilities, equipment, consumables, services, running effects, purchase history. |
| **Statistics** | Totals, earnings per day, category breakdown, per-character histories, memory and economy summaries. |
| **Achievements** | Unlocked and locked badges with progress, plus milestones. |
| **History** | Notification log, every detected event (with manual correction), and the complete transaction ledger. |
| **Shop Memory** | Everything the Shop remembers, fully editable. |
| **Settings** | Every rule: categories, intensity, milestones, economy, rotation, AI, assistant, theme, backups. |

**Shortcuts and controls**

- **Ctrl + Shift + S** — open or close the panel.
- **Esc** — close the panel.
- **Drag** the floating button anywhere; the position is remembered.
- The **▾** button collapses the panel to just its header; **✕** closes it.
- Everything is responsive: on a phone the panel becomes a bottom sheet.

**Themes**: six built-in palettes (Void, Azure, Crimson, Emerald, Gold, Daylight) plus an accent
colour override, in **Settings → Interface**. Animations can be turned off, and the OS
"reduce motion" preference is respected automatically.

---

## Talking to the System in chat

You can change the Shop just by writing to it. The System is deliberately strict about what counts as
a command, so ordinary roleplay is never mistaken for one.

A message is treated as a command **only** when it is written by *you*, is **outside quotation
marks**, explicitly addresses the System/Shop, and contains a recognised instruction.

**These work:**

```
[System: change the shop to supernatural abilities]
((OOC: switch the shop to technology please))
System, set the shop theme to magical items.
*walks in* [Shop: I want the shop to sell appearance changes]
[System: don't sell weapons anymore]
[System: allow weapons again]
[System: more telepathy, less combat]
[System: refresh the shop]
[System: open my inventory]
```

**These are ignored** (they are just roleplay):

```
I walk into the shop and look around.
"System, change the shop to technology," the merchant joked.
Maybe the shop should sell magic items, I think to myself.
The system of government changed overnight.
I want a magic sword.
```

Significant changes — the Shop's purpose, bans, a refresh — always ask you to confirm first, and the
answer is remembered as the new purpose until you change it again.

Ordinary narration is still *listened* to quietly: lines like *"I wish I had a grappling hook"* become
soft interest hints in **Shop Memory**, which nudge product selection. They never change anything on
their own.

---

## How Points are earned

Events are detected in both your messages and the character's messages.

- **Keyword rules** (default, offline and free): each category has its own keywords. `defeat*`
  matches *defeated*/*defeats*; `a * b` allows up to three words between; `re:pattern` is a raw
  regular expression. Negated sentences ("he *almost* defeated the dragon") are ignored.
- **AI analysis** (optional): a model reads each new message and picks the categories that genuinely
  happened. AI results are validated against your categories and the Points always come from your
  rules — never from the model.
- **Manual**: add or correct events by hand in **History**.

Default categories: Combat Victory, Goal Accomplished, Discovery, Social Bond, Training & Growth,
Survival & Escape, Reward & Loot, Romantic Moment (disabled by default). All editable.

**Intensity** multiplies a reward when a trigger word appears in the same sentence ("massive",
"legendary", …). **Milestones** pay a one-time bonus at a lifetime total or event count and can also
unlock a discounted Shop offer.

**Never double-paid.** Each reward is keyed to the message position and category, with a content
fingerprint on top. Regenerate, edit, swipe, reload, or copy a message and the ledger stays correct.
Swiping a message away revokes its reward; swiping back restores it. Deleting a message revokes
(configurable). The ledger always sums to your balance.

---

## The daily Shop

- Rotates **once per day** at a time you choose, in a timezone you choose (`local` = your browser).
- A rotation contains a mix of **affordable, moderate and aspirational** products, common through
  premium, with limited stock on some items, permanent products that never expire, and one daily
  special offer at a discount.
- The countdown to the next rotation is always visible in the panel footer.
- **Refreshing never removes anything you own.** Purchased items stay in your Inventory forever.
- **Manual refresh** is limited per day (default: 1) and can cost Points; it always asks for
  confirmation and explains what is *not* affected.
- The same rotation is restored after a page reload, a chat switch, or closing the browser — it only
  changes at the next scheduled reset.

The Shop's purpose is yours to set: general adventure, supernatural abilities, personal
enhancements, appearance changes, magical items, technology, or any free-text theme you invent.

---

## Shop Memory

The Shop behaves like a marketplace that knows you, not a random list.

It remembers:

- every product you bought, viewed, ignored or wish-listed, and how often
- the tags and categories you respond to, with a score you can edit
- the **Shop purpose** you established, and its history
- terms you banned and categories you locked
- items you wanted but could not afford (they get another chance later)
- every past rotation, so today's stock is never identical to yesterday's
- generated products, so the same ones are not produced twice
- setting notes that keep products fitting your world
- soft interest hints from ordinary narration

It also supports a **wishlist**: star any product, and the System tells you when it comes back.

**Your controls** (all in the **Shop Memory** tab):

- edit, lock or delete any remembered preference
- lock preferred categories so they always appear
- add or lift bans
- forget individual products
- clear purchase-based learning (owned items, Points and wishlist untouched)
- export and import Shop Memory on its own
- reset Shop Memory completely — **this never touches your balance, inventory, achievements or ledger**

Shop Memory can be stored per chat (default), per character, or globally — separately from
progression, so you can share tastes between chats without sharing progress.

---

## Pricing

Prices are **computed**, not invented:

```
price = 10 × power^1.7 × rarity × duration × type × (0.75 + utility×0.05) × uses^0.85
        × 2.5 (reality-altering) × economy multipliers
```

- **Rarity**: common ×1.0, uncommon ×1.6, rare ×2.8, premium ×5.0
- **Duration**: instant ×0.45, one scene ×0.7, one day ×1.0, one week ×1.8, permanent ×4.0
- **Type**: consumable ×1.0, equipment ×0.8, service ×0.9, permanent upgrade ×1.0

Consequences you can rely on: stronger versions cost more than weaker ones, temporary effects cost
less than permanent ones, reality-altering products need a serious investment, and **your current
balance never influences a price**. Prices stay fixed for the whole rotation unless you explicitly
change the economy settings and confirm.

AI-generated products are validated (type, duration, rarity consistency, banned text, sanity) and
**re-priced by the formula**. A suggested price from the model is ignored; it is only logged when it
disagrees wildly.

**Settings → Fair and balanced pricing** lets you choose a difficulty (Relaxed → Brutal), an earning
rate and a price multiplier, and shows you what a cheap consumable, a mid-tier upgrade, a powerful
ability and a reality-altering effect currently cost.

---

## AI features (optional)

The extension is fully usable without any AI. When you want it, configure a source in
**Settings → AI**:

- **Main API** — uses whichever model SillyTavern is already talking to.
- **Connection profile** — pick a profile from the Connection Manager extension (needs it installed).

What the AI can do:

1. **Analyse events** (Settings → Event detection → *AI analysis* or *Keywords first, AI to confirm*).
2. **Generate Shop products** (Settings → Daily shop → *Use the AI to generate contextual products*),
   using the current chat, the character card, active World Info entries and your Shop Memory.
3. **Interpret a free-text Shop purpose** into a name and tags.
4. **Rephrase the assistant's commentary** (Settings → Private shop assistant).

What it can never do:

- change your balance, inventory or ledger
- invent categories or prices
- appear in the story, or buy anything

If an AI call fails, **your saved data is untouched**: keyword rules take over, and you can add
events manually from the History tab. Nothing is lost.

**The private assistant** (name and personality configurable: neutral, professional, mysterious,
playful, mischievous) comments on new stock, rare products, discounts and milestones. Only you can
see or hear it. It can be muted completely.

---

## Where your data lives

| Data | Default location | Survives refresh? |
|---|---|---|
| Points, ledger, events, inventory, achievements, effects | the chat file (`chatMetadata`) | yes |
| Shop Memory, current rotation | the chat file (`chatMetadata`) | yes |
| Categories, shop settings, economy, theme | extension settings | yes |
| Local backups | browser IndexedDB | yes |

- **Per chat by default.** Each chat has independent progression. Switch chats and the correct data
  loads automatically. You can opt into per-character or global sharing in **Settings → General**
  (progression and Shop Memory separately).
- **Backups**: every save also writes a snapshot into the browser's IndexedDB. If a save is
  interrupted, the System notices on the next load and recovers the newer copy.
- **Export / import**: **Settings → Backups** exports everything (progression, inventory, ledger,
  Shop Memory and settings) as one JSON file, or Shop Memory on its own. **History** also exports the
  ledger as CSV and the event list as JSON.

> Exports are plain JSON produced in your browser. Nothing is sent anywhere by this extension, except
> the AI calls you explicitly enable.

---

## Troubleshooting

**The floating button is missing.**
Reload the page. If it is still missing, open the browser console (F12) and look for
`[infinite_points]`. Make sure the folder contains `manifest.json` and `index.js` at its top level,
and that **Settings → Interface → Show the floating button** is on. **Ctrl+Shift+S** also opens it.

**No Points are being awarded.**
Open a chat (a character must be selected). New messages only — old history is baselined on purpose;
use **Points → Quick actions → Scan chat history** for that. Check **Settings → Event detection**:
detection enabled, and the right scan options on. The **History** tab shows exactly what was detected
and why; the ledger shows every Point.

**Points went down.**
That is intentional. Editing a message so the event disappears, or deleting the message, revokes its
reward. Swipe it back or restore the text and it is restored. You can turn deletion revocation off in
**Settings → Event detection**.

**The Shop shows the same products after a reload.**
That is correct: a rotation is fixed for its whole day. The footer countdown shows when it changes.
**Refresh** replaces it immediately (within your daily limit).

**The Shop is not following my purpose.**
Set it from the **Shop** tab, or write `[System: change the shop to <theme>]` in chat, and confirm the
prompt. The purpose persists until you change it. Banned terms and locked categories are respected on
top of it.

**I bought something and it is not in the Inventory.**
The Shop tab shows *Owned* instead of *Buy* once you have it. Check the **Inventory** tab; consumables
you have fully used disappear from it (they are consumed, not lost).

**The AI restock failed.**
The toast explains why and your data is unchanged. The built-in catalog keeps working. Check
**Settings → AI** (source and profile) and try again.

**I want to start this chat over.**
**Settings → Danger zone → Clear this chat's progression**. Shop Memory is kept; use the Shop Memory
tab to reset that too. Export first if you are unsure.

---

## For developers

The codebase splits clean, testable logic from the browser layer:

```
index.js                 entry point: SillyTavern events, interface wiring, actions
manifest.json            extension manifest
style.css                all styling (CSS variables per theme)
src/
  util.js                hashing, deterministic RNG, small helpers
  st.js                  the only module that talks to SillyTavern's API
  defaults.js content.js initial settings, categories, achievements, themes
  time.js                timezone-aware daily rotation maths
  detect.js              keyword event detection (negation-aware)
  commands.js            natural-language Shop command parsing
  pricing.js             the pricing formula
  validate.js            untrusted product validation
  model.js               balance, ledger, events, milestones, achievements
  memory.js              Shop Memory (pure)
  shop.js                deterministic rotation engine
  inventory.js           purchases, stacking, effects
  catalog/               built-in products per theme
  storage.js backup.js   persistence, backups, import/export
  sync.js                chat <-> progression reconciliation
  core.js                engine state, sync loop, AI context injection
  market.js              rotation lifecycle, purchases, purpose changes, assistant
  ai.js                  optional AI calls
  context.js             the System status sent to the AI
  ui/
    dom.js controls.js notify.js shell.js assistant.js
    viewmodel.js         every number the interface shows (pure, tested)
    tabs/                one module per tab
tests/                   node:test suites (see below)
scripts/                 development checks
```

**Run the tests**

```bash
npm install     # only needed for the DOM-based tests (jsdom)
npm test
```

Suites:

| File | Covers |
|---|---|
| `pricing.test.mjs` | formula monotonicity, duration/rarity ordering, validation, JSON extraction |
| `time.test.mjs` | timezone handling, DST-safe resets, day keys |
| `sync.test.mjs` | award-once, regeneration, edits, deletion, baselining, fingerprints |
| `shop.test.mjs` | deterministic rotations, price bands, restrictions, per-day variety |
| `inventory.test.mjs` | idempotent purchases, stacking, effects, stock, memory isolation |
| `commands.test.mjs` | command recognition vs. ordinary roleplay, theme matching |
| `viewmodel.test.mjs` | every interface number: ranks, bands, filters, editor validation |
| `ui.test.mjs` | real DOM rendering of the shell, notifications and all eight tabs |
| `integration.test.mjs` | the real extension booted against a fake SillyTavern: rewards, dedupe, purchases, chat switching, rotation resets, refresh safety, chat commands, World Info, memory reset, reload persistence, export/import |

**Other checks**

```bash
npm run check        # every module imports cleanly + CSS/class cross-check + no unused imports
```

**Design rules**

- Nothing modifies SillyTavern's core files; only documented extension APIs are used.
- Every balance change goes through the ledger, so it always sums to the balance.
- Prices depend only on a product's attributes and your economy settings.
- Shop Memory and progression are separate objects; clearing one never affects the other.
- The engine never trusts AI output: products are validated and re-priced, and AI event results may
  only reference categories you defined.

---

## License

MIT — see [LICENSE](LICENSE).

Infinite Points is a private, fictional interface for roleplay. It does not handle real money and has
no connection to any in-game economy outside your own chat.




