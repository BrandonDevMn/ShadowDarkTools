/**
 * Registers the app's service worker for offline caching.
 *
 * Accepts an optional navigatorRef so tests can inject a mock without
 * touching the real global navigator. In production the default is used.
 *
 * Resolves to true on success. Resolves to false — never rejects — when
 * the browser lacks service worker support or when registration fails.
 * Both cases are non-fatal: the app works fine without offline support.
 *
 * @param {object} [navigatorRef=navigator] - The navigator object to use.
 * @returns {Promise<boolean>}
 */
export function registerServiceWorker(navigatorRef = navigator) {
  // Older browsers (and some privacy-focused configs) don't support service workers
  if (!('serviceWorker' in navigatorRef)) {
    return Promise.resolve(false);
  }

  return navigatorRef.serviceWorker
    // Relative path so the SW registers correctly under any subdirectory
    // (e.g. /ShadowDarkTools/ on GitHub Pages)
    .register('./service-worker.js')
    .then(() => true)
    .catch(() => false);
}
