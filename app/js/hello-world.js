/**
 * Builds an h1 heading and appends it to the given container element.
 *
 * Returns true on success. Returns false — without throwing — when container
 * is missing or is not a DOM Element, so the caller can detect a wiring
 * error without a try/catch at every call site.
 *
 * @param {Element|null|undefined} container - The DOM element to mount into.
 * @returns {boolean}
 */
export function renderHelloWorld(container) {
  // Reject anything that isn't a real DOM element — null, undefined, strings,
  // plain objects, etc. all fail this check cleanly.
  if (!container || !(container instanceof Element)) {
    return false;
  }

  const heading = document.createElement('h1');
  heading.className = 'hello-world-heading';
  heading.textContent = 'Hello, World!';

  container.appendChild(heading);

  return true;
}
