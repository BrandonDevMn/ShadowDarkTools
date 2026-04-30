# ShadowDark Tools

A Shadowdark RPG companion toolkit for players and game masters — optimized as a Progressive Web App for iPhone, deployed via GitHub Pages.

## What It Does

Puts the most-used Shadowdark tools one tap away during a live session: rules reference, dice roller, torch timer, character tracker, and random generators. Works fully offline after the first load.

## Tech Stack

- Vanilla HTML, CSS, and JavaScript — no framework, no build step required
- Progressive Web App (PWA) — installable via Safari "Add to Home Screen" on iOS
- Vitest for unit testing
- GitHub Pages for hosting

## Project Structure

```
app/        — mobile web app source (HTML, CSS, JS)
tests/      — unit tests mirroring the app/ structure
docs/
  instructions/   — how we work, platform constraints
  rules/          — Shadowdark RPG rules reference
```

## Development

**Run tests:**
```bash
npm test
```

**Run tests with coverage report:**
```bash
npm run test:coverage
```

Branch coverage must stay at or above 80%.

## Deployment

Push to `origin/main`. GitHub Pages serves the `app/` folder directly — no build step needed.
