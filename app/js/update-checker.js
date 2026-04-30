// Possible outcomes of checkForUpdate — imported by settings-page.js
// so it can drive button label changes without its own string constants.
export const UPDATE_STATUS = {
  // A new service worker installed and activated — caller should reload
  UPDATED: 'updated',
  // update() ran but no new worker appeared within the timeout
  UP_TO_DATE: 'up-to-date',
  // No SW support, getRegistration threw, or the installing worker went redundant
  ERROR: 'error',
};

/**
 * Asks the active service worker to check for a new version.
 *
 * How the SW update lifecycle works (why we listen for events):
 *   registration.update() triggers the browser to re-fetch the SW script.
 *   If the new script differs byte-for-byte from the cached copy, the browser
 *   fires "updatefound" on the registration and starts installing the new SW.
 *   Once the new SW finishes installing it transitions through:
 *     installing → waiting → activating → activated
 *   We resolve UPDATED when "activated" fires, which means the new cache is
 *   ready and a page reload will pick up the new version.
 *
 * @param {() => Promise<ServiceWorkerRegistration>|null} getRegistration
 *   Injectable so tests can provide a fake registration without a real SW.
 *   Defaults to the live navigator.serviceWorker.ready promise.
 * @param {number} timeoutMs
 *   How long to wait for "updatefound" before giving up and returning
 *   UP_TO_DATE. Ten seconds is plenty for a tiny app shell over any connection.
 * @returns {Promise<string>} One of the UPDATE_STATUS values.
 */
export async function checkForUpdate(
  getRegistration = () => navigator.serviceWorker?.ready,
  timeoutMs = 10_000,
) {
  // No service worker support (e.g. local file:// or test environment)
  const registrationPromise = getRegistration();
  if (!registrationPromise) return UPDATE_STATUS.ERROR;

  let registration;
  try {
    registration = await registrationPromise;
  } catch {
    // getRegistration() promise rejected — treat as not-connected
    return UPDATE_STATUS.ERROR;
  }

  return new Promise((resolve) => {
    // Safety valve: if the browser never fires "updatefound" (already current,
    // or no network), resolve as up-to-date rather than hanging forever.
    const timeoutId = setTimeout(() => resolve(UPDATE_STATUS.UP_TO_DATE), timeoutMs);

    registration.addEventListener('updatefound', () => {
      clearTimeout(timeoutId);

      const installingWorker = registration.installing;

      // Edge case: updatefound fired but .installing is already null
      // (browser already advanced the state machine past installing)
      if (!installingWorker) {
        resolve(UPDATE_STATUS.UP_TO_DATE);
        return;
      }

      installingWorker.addEventListener('statechange', () => {
        if (installingWorker.state === 'activated') {
          resolve(UPDATE_STATUS.UPDATED);
        } else if (installingWorker.state === 'redundant') {
          // Another update superseded this one, or install failed
          resolve(UPDATE_STATUS.ERROR);
        }
        // Other intermediate states (installing, waiting, activating) keep waiting
      });
    });

    // Kick off the actual network fetch of the SW script.
    // If the network is down or the fetch fails, reject — catch and surface as ERROR.
    registration.update().catch(() => {
      clearTimeout(timeoutId);
      resolve(UPDATE_STATUS.ERROR);
    });
  });
}
