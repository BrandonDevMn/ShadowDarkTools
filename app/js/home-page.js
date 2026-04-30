import { renderHelloWorld } from './hello-world.js';

/**
 * Renders the home tab content into the given container.
 *
 * Prepends the iOS-style large page title, then delegates to renderHelloWorld
 * for the placeholder body content. As real home content is added, it goes
 * below the title here.
 *
 * Returns true on success, false if container is not a valid Element.
 *
 * @param {Element|null|undefined} container
 * @returns {boolean}
 */
export function renderHomePage(container) {
  if (!container || !(container instanceof Element)) {
    return false;
  }

  const title = document.createElement('h1');
  title.className = 'page-title';
  title.textContent = 'Home';
  container.appendChild(title);

  renderHelloWorld(container);
  return true;
}
