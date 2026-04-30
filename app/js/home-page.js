import { renderHomeFeed } from './home-feed.js';

// SVG gear icon — same path as the former tab-bar settings icon
const SETTINGS_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M19.43 12.97c.04-.32.07-.64.07-.97s-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07.97l-2.11 1.66c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.58 1.69-.98l2.49 1.01c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
</svg>`;

/**
 * Renders the home tab content into the given container.
 *
 * Accepts an optional onSettingsOpen callback invoked when the gear button
 * is tapped. The header always renders; passing no callback is safe — the
 * button fires a no-op.
 *
 * Returns true on success, false if container is not a valid Element.
 *
 * @param {Element|null|undefined} container
 * @param {{ onSettingsOpen?: function(): void }} [options]
 * @returns {boolean}
 */
export function renderHomePage(container, { onSettingsOpen = () => {} } = {}) {
  if (!container || !(container instanceof Element)) {
    return false;
  }

  // Header row: large title on the left, gear button on the right
  const header = document.createElement('div');
  header.className = 'page-header';

  const title = document.createElement('h1');
  title.className = 'page-title';
  title.textContent = 'Home';

  const gearButton = document.createElement('button');
  gearButton.type = 'button';
  gearButton.className = 'page-header__settings-button';
  gearButton.setAttribute('aria-label', 'Settings');
  gearButton.innerHTML = SETTINGS_ICON;
  gearButton.addEventListener('click', onSettingsOpen);

  header.appendChild(title);
  header.appendChild(gearButton);
  container.appendChild(header);

  renderHomeFeed(container);
  return true;
}
