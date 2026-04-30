# ShadowDark Toolkit — App Goals

## What This Is

A **Shadowdark RPG companion toolkit** for players and Game Masters.
It lives on your phone's home screen, works offline, and puts the most-needed
tools a step away during a live session — no page loads, no login, no fuss.

---

## Target Platform

| Property | Value |
|---|---|
| Device | iPhone Pro Max |
| OS | iOS 17 |
| Browser / install method | Safari "Add to Home Screen" (PWA) |
| Deployment | GitHub Pages (static files only) |
| Backend | None — ever |

This is a **Progressive Web App (PWA)**. It must pass the Safari add-to-home-screen
checklist (see `docs/instructions/mobile-web-app.md`) and function fully offline
after the first load.

---

## Technical Constraints

**What we can use:**
- Vanilla HTML, CSS, and JavaScript — the default and preferred stack
- Static site generators that output flat files with no server runtime
  (e.g., Eleventy, Hugo, Astro in static mode)
- Client-side JavaScript libraries loaded from a CDN or bundled at build time
- Browser APIs: LocalStorage, IndexedDB, Service Workers, Web Crypto

**What we cannot use:**
- Any server-side runtime (Node, Python, Ruby, etc.) at request time
- A database or API backend
- Server-side rendering
- Anything that requires a build-time secret or environment variable at runtime
- URL rewrites or dynamic routing that requires server config

**Deployment rule:** If it cannot be dropped into a GitHub Pages repo and served
as static files, we do not use it.

---

## Who Uses This

### Player
Sitting at the table with a phone, needs quick access to:
- Their character's stats, gear, and spells during play
- Dice rolls for checks they make frequently
- Rules reminders for things they forget (e.g., death timer, spellcasting outcomes)

### Game Master
Running the session, needs quick access to:
- Random generators to improvise on the fly (names, encounters, treasure, rooms)
- Light/torch timer to enforce the real-time torch mechanic accurately
- Monster stat look-ups
- Rules reminders

---

## Feature Areas

Features are organized by who benefits most, but most tools are useful to both roles.

### Reference (Player + GM)
Quick-access rules summaries — not a full rulebook, just the things people forget:
- Core mechanic and DC table
- Death and dying procedure
- Spellcasting outcomes (success, fail, crit fail by class)
- Light source durations
- Armor class by armor type
- Weapon damage dice

### Character Tools (Player)
- **Character sheet** — ability scores, HP, gear slots used/total, spells known
- **Spells tracker** — mark spells as cast (lost until rest) and recover on rest
- **Gear tracker** — inventory with slot counts, torch/oil quantities

### Dice Roller (Player + GM)
- Standard dice: d4, d6, d8, d10, d12, d20, d100
- Common compound rolls: 3d6, 2d6 (talent), 1d4+CON (death timer)
- Advantage/disadvantage mode (roll 2d20, show both, highlight result)

### Torch Timer (Player + GM)
The real-time torch mechanic is the heart of Shadowdark tension.
- Start / pause / stop a countdown for torches and lanterns
- Support multiple simultaneous light sources (party may have more than one)
- Visual and audio alert when a torch is about to expire
- Quick-add buttons for torch (60 min) and lantern (60 min per oil flask)

### Random Generators (GM)
Fast improvisational tools for when the GM needs something right now:
- **NPC name generator** — Shadowdark-flavored fantasy names
- **Encounter generator** — monster type and number scaled to party level
- **Treasure generator** — coins, gems, and magic items by hoard tier
- **Room/dungeon dressing** — quick flavor for an empty room
- **Spell scroll generator** — random spell and tier for found scrolls

### Talent Roller (Player + GM)
- Select class, roll 2d6, display the result from the class talent table
- Let the player choose between options when the result offers a choice

---

## Design Principles

1. **One tap to the tool.** No feature should require more than two taps from the home screen.
2. **Works offline.** Service Worker caches all assets. The app is fully functional with no signal.
3. **Session-safe state.** Any in-progress tracker (torch timer, spell slots, HP) survives
   the screen locking or the browser being backgrounded.
4. **No accounts, no sync.** State is stored in LocalStorage or IndexedDB on the device only.
5. **Fast and native-feeling.** Animations respect `prefers-reduced-motion`. Touch targets
   are minimum 44×44px. No hover-only interactions.

---

## Out of Scope (for now)

- Multi-player / shared sessions across devices
- Campaign notes or journaling
- Full bestiary (too much content to maintain as static data)
- Custom homebrew content management
- Any feature that requires a server or user accounts
