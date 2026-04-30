import { renderHelloWorld } from './hello-world.js';
import { registerServiceWorker } from './service-worker-registration.js';

/**
 * Bootstraps the app.
 *
 * Rendering runs first (synchronous) so the UI appears before any async work.
 * Service worker registration follows (async, non-blocking) so a slow SW
 * install never delays what the user sees.
 *
 * Exported so tests can call it directly instead of simulating DOM events.
 */
export function initializeApp() {
  const appContainer = document.getElementById('app');
  renderHelloWorld(appContainer);
  registerServiceWorker();
}

// ES module scripts are deferred by default, so the DOM is ready by the time
// this line runs — but DOMContentLoaded has not yet fired. Listening for it
// keeps the wiring explicit and avoids relying on execution-order assumptions.
document.addEventListener('DOMContentLoaded', initializeApp);
