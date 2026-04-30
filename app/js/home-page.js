import { renderHelloWorld } from './hello-world.js';

/**
 * Renders the home tab content into the given container.
 *
 * Currently delegates to renderHelloWorld. As the app grows, this is the
 * place to add home-specific layout around the hello world placeholder
 * before it gets replaced with real content.
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

  return renderHelloWorld(container);
}
