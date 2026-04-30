// Injected at deploy time by the GitHub Actions workflow via sed.
// Shows the literal placeholder string during local development —
// that's fine since version display is only meaningful in production.
const APP_VERSION = 'DEPLOY_DATETIME_PLACEHOLDER';

// Canonical deployed URL — used by the Share button
const SHARE_URL = 'https://brandondevmn.github.io/ShadowDarkTools';

import { checkForUpdate, UPDATE_STATUS } from './update-checker.js';

// External links shown in the settings list. Adding a new link only
// requires adding an entry here — renderSettingsPage loops over these.
const EXTERNAL_LINKS = [
  {
    label: 'Code',
    url: 'https://github.com/BrandonDevMn/ShadowDarkTools',
  },
  {
    label: 'Shadowdark Makers',
    url: 'https://www.thearcanelibrary.com/',
  },
];

/**
 * Renders the settings tab content into the given container.
 *
 * Row order follows iOS Settings conventions: navigation rows (links)
 * first, info rows (version) in the middle, action rows at the bottom.
 *
 * Returns true on success, false if container is not a valid Element.
 *
 * @param {Element|null|undefined} container
 * @returns {boolean}
 */
export function renderSettingsPage(container) {
  if (!container || !(container instanceof Element)) {
    return false;
  }

  // iOS-style large page title
  const title = document.createElement('h1');
  title.className = 'page-title';
  title.textContent = 'Settings';
  container.appendChild(title);

  const section = document.createElement('div');
  section.className = 'settings';

  // ── External link rows ──────────────────────────────────────────────────

  EXTERNAL_LINKS.forEach(({ label, url }) => {
    const link = document.createElement('a');
    // Reuse .settings__row for spacing/border; .settings__link overrides
    // anchor defaults (colour, underline) so it blends with non-link rows
    link.className = 'settings__row settings__link';
    link.href = url;
    link.target = '_blank';
    // noopener prevents the new tab from accessing window.opener;
    // noreferrer also omits the Referer header for privacy
    link.rel = 'noopener noreferrer';

    const linkLabel = document.createElement('span');
    linkLabel.className = 'settings__link-label';
    linkLabel.textContent = label;

    // ↗ visually signals "opens externally" without needing an icon asset
    const indicator = document.createElement('span');
    indicator.className = 'settings__link-indicator';
    indicator.textContent = '↗';
    indicator.setAttribute('aria-hidden', 'true');

    link.appendChild(linkLabel);
    link.appendChild(indicator);
    section.appendChild(link);
  });

  // ── Version row ─────────────────────────────────────────────────────────

  const versionRow = document.createElement('div');
  versionRow.className = 'settings__row';

  const versionLabel = document.createElement('span');
  versionLabel.className = 'settings__label';
  versionLabel.textContent = 'Version';

  const versionValue = document.createElement('span');
  versionValue.className = 'settings__version';
  versionValue.textContent = APP_VERSION;

  versionRow.appendChild(versionLabel);
  versionRow.appendChild(versionValue);
  section.appendChild(versionRow);

  // ── Share row ───────────────────────────────────────────────────────────

  const shareRow = document.createElement('div');
  shareRow.className = 'settings__row';

  const shareButton = document.createElement('button');
  shareButton.className = 'settings__action-button';
  shareButton.textContent = 'Share App';
  shareButton.addEventListener('click', () => handleShare());

  shareRow.appendChild(shareButton);
  section.appendChild(shareRow);

  // ── Check for Update row ────────────────────────────────────────────────

  const updateRow = document.createElement('div');
  updateRow.className = 'settings__row';

  const updateButton = document.createElement('button');
  updateButton.className = 'settings__action-button settings__update-button';
  updateButton.textContent = 'Check for Update';
  updateButton.addEventListener('click', () => handleUpdateCheck(updateButton));

  updateRow.appendChild(updateButton);
  section.appendChild(updateRow);
  container.appendChild(section);

  return true;
}

/**
 * Invokes the native Web Share API to let the user share the app URL.
 *
 * Returns a string describing the outcome so callers (and tests) can
 * react without inspecting thrown errors:
 *   'shared'      — user completed the share
 *   'dismissed'   — user cancelled the share sheet (AbortError)
 *   'unavailable' — Web Share API not present (desktop / old browser)
 *   'error'       — navigator.share threw an unexpected error
 *
 * @param {string} shareUrl - The URL to share. Defaults to the deployed app.
 * @param {Navigator} navigatorRef - Injectable for tests; defaults to window.navigator.
 * @returns {Promise<'shared'|'dismissed'|'unavailable'|'error'>}
 */
export async function handleShare(
  shareUrl = SHARE_URL,
  navigatorRef = navigator,
) {
  if (!navigatorRef.share) {
    return 'unavailable';
  }

  try {
    await navigatorRef.share({ title: 'ShadowDark Tools', url: shareUrl });
    return 'shared';
  } catch (error) {
    // AbortError is thrown when the user dismisses the share sheet —
    // that is a normal user action, not a failure
    if (error.name === 'AbortError') return 'dismissed';
    return 'error';
  }
}

/**
 * Handles a tap on the "Check for Update" button.
 *
 * Drives button state through the update lifecycle so the user always sees
 * meaningful feedback rather than a frozen button or a silent reload.
 *
 * @param {HTMLButtonElement} button - The button to update during the check.
 * @param {() => void} reloadFn - Injectable so tests can spy without reloading.
 */
export async function handleUpdateCheck(
  button,
  reloadFn = () => window.location.reload(),
) {
  button.disabled = true;
  button.textContent = 'Checking…';

  const status = await checkForUpdate();

  if (status === UPDATE_STATUS.UPDATED) {
    // New SW activated — reload to swap in the fresh cache
    button.textContent = 'Updated! Reloading…';
    setTimeout(() => reloadFn(), 1_000);
    return;
  }

  if (status === UPDATE_STATUS.UP_TO_DATE) {
    button.textContent = 'Already up to date';
    // Reset after 2 s so user can tap again later
    setTimeout(() => {
      button.textContent = 'Check for Update';
      button.disabled = false;
    }, 2_000);
    return;
  }

  // ERROR — no network, no SW, or install failed
  button.textContent = 'No connection — tap to retry';
  button.disabled = false;
}
