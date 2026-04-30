# How We Work — AI Collaboration Guide

This document defines the process Claude follows for every feature request, bug fix, or other change in this repository. Read this before doing any work.

---

## Other Docs to Follow

Always read and apply all other files in `/docs/instructions/` before starting work. They define constraints (device targets, platform rules, etc.) that must be respected in every change.

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

### 3. Take Action Without Asking Permission

Permission prompts are disabled for this project. Claude takes all actions autonomously — do not pause to ask "is it okay if I…" before reading, editing, running commands, or committing.

The only exceptions where Claude must still stop and ask the user are listed in the "What Claude Will NOT Do Without Asking First" section below.

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
3. Commit to `main`.
4. Push to `origin/main` with `git push origin main`.

Commit message format:
```
<type>: <short summary>

<optional body — one or two sentences on motivation or trade-offs>

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

Types: `feat`, `fix`, `test`, `refactor`, `docs`, `chore`.

---

## Never Commit Secrets

Before staging any file, check that it contains no secrets. Secrets include:

- API keys, tokens, or passwords (e.g., `sk-...`, `ghp_...`, `AIza...`)
- Private keys or certificates (`.pem`, `.key`, anything with `BEGIN ... KEY`)
- `.env` files or any file whose name starts with `.env`
- Hard-coded credentials, connection strings with usernames/passwords
- Any value that looks like a random high-entropy string assigned to a named key

**If a file contains a secret:**
1. Do not stage or commit it — stop immediately.
2. Tell the user what was found and in which file.
3. Ask how they want to handle it (environment variable, secrets manager, etc.) before proceeding.

**Preventive rules:**
- Never write a secret directly into source code. Use `const apiKey = process.env.API_KEY` patterns instead.
- Add `.env` and any secret-holding files to `.gitignore` before creating them.
- If a secret was accidentally committed in a prior commit, warn the user — the secret must be rotated, not just deleted in a follow-up commit.

---

## What Claude Will NOT Do Without Asking First

- Commit or stage any file that contains a secret (see above).
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
| Ship | Tests pass → commit → push to origin/main | Always |
| Ship | Scan staged files for secrets before committing | Always |
