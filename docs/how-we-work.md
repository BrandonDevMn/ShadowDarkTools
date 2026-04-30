# How We Work — AI Collaboration Guide

This document defines the process Claude follows for every feature request, bug fix, or other change in this repository. Read this before doing any work.

---

## Other Docs to Follow

Always read and apply all other files in `/docs/` before starting work. They define constraints (device targets, platform rules, etc.) that must be respected in every change.

---

## Step-by-Step Process

### 1. Understand the Request

Before touching any code, state clearly:
- **What** is being built or fixed
- **Why** (the user's goal, not just the surface request)
- **Which docs rules apply** (e.g., mobile-web-app.md constraints)

If anything is ambiguous, ask one focused question before proceeding. Do not ask multiple questions at once.

### 2. Communicate Before Acting

Before each significant action, say what it is and why in one sentence. Examples:
- "Reading `js/app.js` to understand the current character sheet structure before adding the new field."
- "Creating `js/equipment-list.js` as a separate file to keep equipment logic isolated from character logic."

Never go silent for more than one action in a row.

### 3. Minimize Permission Prompts

Prefer approaches that avoid needing user approval:
- Favor reading files, editing files, and running tests — these are pre-approved.
- Avoid shell commands that require new permissions unless there is no alternative.
- When a shell command is necessary, group related commands into one call so there is one prompt instead of many.
- Pre-configure allowed commands in `.claude/settings.json` when a pattern will recur (e.g., `git`, `npm test`).

### 4. Implement the Change

Follow these rules for all code:

**File organization — many small files over few large ones**
- Each file has one clear responsibility.
- If a file grows past ~150 lines, consider splitting it.
- Group related files in a named folder (e.g., `js/character/`, `js/equipment/`).

**Naming — optimize for readability**
- File names: lowercase, hyphen-separated, descriptive nouns (`character-stats.js`, not `cs.js` or `charStats.js`).
- Folder names: lowercase, hyphen-separated (`spell-slots/`, not `spellSlots/`).
- Variable and prop names: full words, no abbreviations (`characterLevel` not `charLvl`).
- Boolean names: start with `is`, `has`, or `can` (`isWeaponEquipped`, `hasSpellsRemaining`).
- Functions: verb phrases that say what they do (`calculateArmorClass`, `renderSpellList`).

**Comments — explain the why, not the what**
- Add a comment on every function explaining its purpose and any non-obvious behavior.
- Comment any magic numbers, game-rule references, or constraints that are not self-evident.
- Comment branches that handle edge cases (e.g., "// Shadowdark uses d20 for all checks, no modifier cap").
- Do not comment obvious things like `// increment counter`.

**Platform rules**
- Apply all constraints in `mobile-web-app.md` (safe area insets, `100dvh`, 44px touch targets, 16px input font size, etc.).
- No server-side code — static files only (GitHub Pages).

### 5. Write Unit Tests

After implementing, add or update unit tests so that **branch coverage stays at or above 80%**.

- Place test files alongside the code they test or in a parallel `tests/` folder with matching names (`js/character/stats.js` → `tests/character/stats.test.js`).
- Test the happy path and the important edge cases for every branch.
- Name each test as a plain-English sentence: `"returns 0 armor class when no armor is equipped"`.
- Run the tests and confirm they pass before moving on.

### 6. Verify

Before declaring done:
- [ ] All new and existing tests pass.
- [ ] Branch coverage is at or above 80%.
- [ ] The feature or fix works as described.
- [ ] No `100vh`, bare `position: fixed`, or other mobile-web-app.md violations were introduced.
- [ ] File names, variable names, and comments follow the rules above.

### 7. Commit and Merge to Main

When everything above is verified:

1. Stage only the files relevant to the change (never `git add -A` blindly).
2. Write a commit message that explains **why** the change was made, not just what changed.
3. Merge to `main`.

Commit message format:
```
<type>: <short summary>

<optional body — one or two sentences on motivation or trade-offs>

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

Types: `feat`, `fix`, `test`, `refactor`, `docs`, `chore`.

---

## What Claude Will NOT Do Without Asking First

- Delete files or folders.
- Force-push or reset branches.
- Push to a remote repository.
- Run commands that install or remove packages (will ask once to confirm the package list).
- Create a pull request.

---

## Quick Reference Card

| Phase | Action | Rule |
|---|---|---|
| Start | Read all `/docs/` files | Always |
| Start | State what + why | Always |
| Code | One responsibility per file | Always |
| Code | Descriptive names, full words | Always |
| Code | Comment the why | Always |
| Code | Follow mobile-web-app.md | Always |
| Test | 80% branch coverage | Always |
| Ship | Tests pass → commit → merge to main | Always |
