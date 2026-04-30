/**
 * Renders the Generate tab content into the given container.
 *
 * Returns true on success, false if container is not a valid Element.
 *
 * @param {Element|null|undefined} container
 * @returns {boolean}
 */
export function renderGeneratePage(container) {
  if (!container || !(container instanceof Element)) {
    return false;
  }

  const title = document.createElement('h1');
  title.className = 'page-title';
  title.textContent = 'Generate';
  container.appendChild(title);

  const placeholder = document.createElement('p');
  placeholder.className = 'page-placeholder';
  placeholder.textContent = 'todo';
  container.appendChild(placeholder);

  return true;
}
