// Injected at deploy time by the GitHub Actions workflow via sed.
// Shows the literal placeholder string during local development —
// that's fine since version display is only meaningful in production.
const APP_VERSION = 'DEPLOY_DATETIME_PLACEHOLDER';

import { checkForUpdate, UPDATE_STATUS } from './update-checker.js';

/**
 * Renders the settings tab content into the given container.
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

  // iOS-style large page title — same pattern as home-page.js
  const title = document.createElement('h1');
  title.className = 'page-title';
  title.textContent = 'Settings';
  container.appendChild(title);

  const section = document.createElement('div');
  section.className = 'settings';

  // Version row — shows the UTC datetime of the last deploy
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

  // Update check row — button triggers a SW update poll
  const updateRow = document.createElement('div');
  updateRow.className = 'settings__row';

  const updateButton = document.createElement('button');
  updateButton.className = 'settings__update-button';
  updateButton.textContent = 'Check for Update';
  updateButton.addEventListener('click', () => handleUpdateCheck(updateButton));

  updateRow.appendChild(updateButton);
  section.appendChild(updateRow);
  container.appendChild(section);

  return true;
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
