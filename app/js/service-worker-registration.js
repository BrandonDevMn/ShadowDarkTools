/**
 * Registers the app's service worker for offline caching and auto-updates.
 *
 * Auto-update strategy (Option 1 + 2):
 *   - The SW itself calls skipWaiting() on install, so any new SW takes
 *     control immediately rather than waiting for all tabs to close.
 *   - visibilitychange fires every time the user reopens the app on iOS
 *     home screen. We call registration.update() there so a fresh SW check
 *     happens on every re-engagement with no user action required.
 *   - controllerchange fires when the new SW takes control. We reload once
 *     so the page loads the updated app shell from the new cache.
 *
 * Accepts optional injectable refs so tests can verify behavior without
 * touching real browser globals.
 *
 * Resolves to true on success. Resolves to false — never rejects — when
 * the browser lacks service worker support or when registration fails.
 *
 * @param {object} [navigatorRef=navigator]
 * @param {object} [docRef=document]
 * @param {object} [locationRef=location]
 * @returns {Promise<boolean>}
 */
export function registerServiceWorker(
  navigatorRef = navigator,
  docRef = document,
  locationRef = location,
) {
  if (!('serviceWorker' in navigatorRef)) {
    return Promise.resolve(false);
  }

  return navigatorRef.serviceWorker
    .register('./service-worker.js', { updateViaCache: 'none' })
    .then((registration) => {
      // On iOS, reopening a home screen PWA fires visibilitychange.
      // Calling update() here triggers a network fetch of service-worker.js —
      // if the file changed the new SW installs and skipWaiting() fires.
      docRef.addEventListener('visibilitychange', () => {
        if (docRef.visibilityState === 'visible') {
          registration.update();
        }
      });

      // Once the new SW calls skipWaiting() + clients.claim(), controllerchange
      // fires. Reload once so the page is served from the new cache.
      let reloading = false;
      navigatorRef.serviceWorker.addEventListener('controllerchange', () => {
        if (!reloading) {
          reloading = true;
          locationRef.reload();
        }
      });

      return true;
    })
    .catch(() => false);
}
