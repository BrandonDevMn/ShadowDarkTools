// Injected at deploy time by the GitHub Actions workflow via sed.
// Shows the literal placeholder string during local development —
// that's fine since version display is only meaningful in production.
const APP_VERSION = 'DEPLOY_DATETIME_PLACEHOLDER';

// Canonical deployed URL — used by the Share button
const SHARE_URL = 'https://brandondevmn.github.io/ShadowDarkTools';

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

import { checkForUpdates } from './service-worker-registration.js';

/**
 * Renders the settings page content into the given container.
 *
 * Accepts an optional onDismiss callback invoked when the Done button is
 * tapped. Row order follows iOS Settings conventions: navigation rows
 * (links) first, info rows (version) in the middle, action rows at the bottom.
 *
 * Returns true on success, false if container is not a valid Element.
 *
 * @param {Element|null|undefined} container
 * @param {{ onDismiss?: function(): void }} [options]
 * @returns {boolean}
 */
export function renderSettingsPage(container, { onDismiss = () => {} } = {}) {
  if (!container || !(container instanceof Element)) {
    return false;
  }

  // Header row: large title on the left, Done button on the right
  const header = document.createElement('div');
  header.className = 'page-header';

  const title = document.createElement('h1');
  title.className = 'page-title';
  title.textContent = 'Settings';

  const doneButton = document.createElement('button');
  doneButton.type = 'button';
  doneButton.className = 'page-header__done-button';
  doneButton.textContent = 'Done';
  doneButton.addEventListener('click', onDismiss);

  header.appendChild(title);
  header.appendChild(doneButton);
  container.appendChild(header);

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
  updateButton.type = 'button';
  updateButton.className = 'settings__action-button settings__update-button';
  updateButton.textContent = 'Check for Update';
  updateButton.addEventListener('click', () => handleUpdateCheck(updateButton));

  updateRow.appendChild(updateButton);
  section.appendChild(updateRow);

  container.appendChild(section);

  return true;
}

/**
 * Drives the Check for Update button through its states.
 *
 * Disabled + "Checking…" while the check runs. Shows "Already up to date"
 * for 2 s then resets, or "No connection — tap to retry" on network failure.
 * If a new SW is found the page reloads automatically via the controllerchange
 * listener and the button never needs to reset.
 *
 * updateCheckFn and timerFn are injectable for tests.
 *
 * @param {HTMLButtonElement} button
 * @param {function(): Promise} [updateCheckFn]
 * @param {function(number): Promise} [timerFn]
 * @returns {Promise<void>}
 */
export async function handleUpdateCheck(
  button,
  updateCheckFn = checkForUpdates,
  timerFn = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
) {
  button.disabled = true;
  button.textContent = 'Checking…';

  try {
    await updateCheckFn();
    button.textContent = 'Already up to date';
    await timerFn(2000);
  } catch {
    button.textContent = 'No connection — tap to retry';
    button.disabled = false;
    return;
  }

  button.textContent = 'Check for Update';
  button.disabled = false;
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
