// Injected at deploy time by the GitHub Actions workflow via sed.
// Shows the literal placeholder string during local development —
// that's fine since version display is only meaningful in production.
const APP_VERSION = 'DEPLOY_DATETIME_PLACEHOLDER';

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

  const section = document.createElement('div');
  section.className = 'settings';

  const heading = document.createElement('h2');
  heading.className = 'settings__heading';
  heading.textContent = 'Settings';

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
  section.appendChild(heading);
  section.appendChild(versionRow);
  container.appendChild(section);

  return true;
}
