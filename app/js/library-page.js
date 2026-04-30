import { renderSpellsList } from './spells-list.js';

/**
 * Renders the Library tab content into the given container.
 *
 * Returns true on success, false if container is not a valid Element.
 *
 * @param {Element|null|undefined} container
 * @returns {boolean}
 */
export function renderLibraryPage(container) {
  if (!container || !(container instanceof Element)) {
    return false;
  }

  const title = document.createElement('h1');
  title.className = 'page-title';
  title.textContent = 'Library';
  container.appendChild(title);

  renderSpellsList(container);
  return true;
}
