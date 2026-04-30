# Mobile Web App — AI Instructions

Build mobile-optimized web apps targeting **iPhone XS Max on iOS 17**, deployable via **GitHub Pages**.

---

## Target Device

| Property | Value |
|---|---|
| Device | iPhone XS Max |
| OS | iOS 17 |
| Screen | 6.5", 2688×1242px physical |
| CSS viewport | 414×896px (logical pixels) |
| Device pixel ratio | 3× |
| Browser | Safari (Mobile WebKit) |

---

## Required HTML Shell

Every page must include this exact head setup:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

  <!-- Safari Add to Home Screen -->
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="App Name" />

  <!-- Icons for home screen -->
  <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />

  <title>App Name</title>
</head>
```

- `viewport-fit=cover` is mandatory — it extends content under the notch and home indicator.
- `apple-mobile-web-app-capable` enables full-screen mode when launched from the home screen.
- `black-translucent` status bar lets your content render behind the notch area.

---

## Safe Area Insets

Always account for the notch (top) and home indicator (bottom):

```css
:root {
  --safe-top: env(safe-area-inset-top);       /* ~44px portrait */
  --safe-bottom: env(safe-area-inset-bottom); /* ~34px portrait */
  --safe-left: env(safe-area-inset-left);     /* ~44px landscape */
  --safe-right: env(safe-area-inset-right);   /* ~44px landscape */
}

.app-shell {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
```

Fixed bottom bars (nav, toolbars) must include the bottom inset:

```css
.bottom-bar {
  position: fixed;
  bottom: 0;
  padding-bottom: env(safe-area-inset-bottom);
}
```

---

## Viewport Height

Never use `100vh` — in Mobile Safari it includes the browser chrome and overflows the visible area.

Use dynamic viewport units instead (supported in Safari 16+ / iOS 16+):

```css
/* Preferred */
height: 100dvh; /* dynamic — adjusts as toolbar shows/hides */

/* Fallback if needed */
height: 100svh; /* small viewport — always excludes toolbar */
```

---

## Safari / WebKit Rules

**Input font size** — always 16px or larger on inputs to prevent Safari's auto-zoom:

```css
input, textarea, select {
  font-size: 16px;
}
```

**Overscroll** — prevent rubber-band bounce on the body if unwanted:

```css
body {
  overscroll-behavior: none;
}
```

**Backdrop filter** — always include the `-webkit-` prefix:

```css
.glass {
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
}
```

**Avoid `position: fixed` for scrolling elements** — it can jitter during Safari's toolbar collapse animation. Use `position: sticky` where possible.

**Touch targets** — minimum 44×44px for all tappable elements (Apple HIG requirement).

**Tap highlight** — remove the default gray flash:

```css
* {
  -webkit-tap-highlight-color: transparent;
}
```

---

## GitHub Pages Constraints

GitHub Pages serves **static files only** — no server-side runtime.

**Allowed:**
- Plain HTML, CSS, vanilla JavaScript
- Static site generators that output flat HTML (Jekyll, Eleventy, Hugo, Astro in static mode)
- Client-side routing with hash-based URLs (`#/route`)
- Fetching data from external APIs at runtime

**Avoid:**
- Server-side rendering (Next.js SSR, Nuxt SSR, Express, etc.)
- Any Node.js/Python/Ruby runtime at request time
- Databases or server-side sessions
- URL rewrites or redirects (no `.htaccess`, no `vercel.json` rewrites)

**SPA routing** — if using client-side routing without hashes, create a `404.html` that redirects to `index.html` and restores the path via sessionStorage. Hash routing (`/#/page`) is simpler and works out of the box.

**Base URL** — GitHub Pages serves from `https://username.github.io/repo-name/`. Set the base path in any build tool config and use relative paths for assets.

**Jekyll** — GitHub Pages runs Jekyll by default. Add a `.nojekyll` file to the repo root if you are not using Jekyll (prevents it from processing your files and ignoring `_` prefixed folders).

---

## File Structure (recommended)

```
/
├── index.html
├── .nojekyll          # disable Jekyll processing
├── icons/
│   └── apple-touch-icon.png   # 180×180px
├── css/
│   └── style.css
└── js/
    └── app.js
```

---

## Checklist Before Ship

- [ ] `viewport-fit=cover` in viewport meta
- [ ] `apple-mobile-web-app-capable` and status bar meta tags present
- [ ] `apple-touch-icon` (180×180px) linked
- [ ] All fixed/sticky elements respect `env(safe-area-inset-*)` 
- [ ] No `100vh` usage — replaced with `100dvh`
- [ ] All inputs have `font-size: 16px` or larger
- [ ] Touch targets are at least 44×44px
- [ ] Tested in Safari on iOS (not just Chrome DevTools emulation)
- [ ] App launches correctly from home screen (full-screen, no URL bar)
- [ ] Assets use relative paths compatible with GitHub Pages base URL
- [ ] `.nojekyll` present if not using Jekyll
