import { renderHomePage }     from './home-page.js';
import { renderSettingsPage } from './settings-page.js';
import { initializeTabBar }   from './tab-bar.js';
import { registerServiceWorker } from './service-worker-registration.js';

/**
 * Bootstraps the app — renders all pages, builds the tab bar, and
 * registers the service worker.
 *
 * Pages start hidden (via the HTML `hidden` attribute). switchToTab()
 * reveals one page at a time and syncs the tab bar highlight.
 *
 * Exported so tests can call it directly without simulating DOM events.
 */
export function initializeApp() {
  const homePageEl     = document.getElementById('page-home');
  const settingsPageEl = document.getElementById('page-settings');
  const tabBarEl       = document.getElementById('tab-bar');

  // Render content into each page upfront so switching tabs is instant
  renderHomePage(homePageEl);
  renderSettingsPage(settingsPageEl);

  const tabBar = initializeTabBar(tabBarEl, switchToTab);

  // Start on the home tab
  switchToTab('home');

  // Register the service worker after the UI is visible so a slow SW
  // install never delays the first paint
  registerServiceWorker();

  /**
   * Shows the page matching tabId and hides all others.
   * Also updates the tab bar highlight to match.
   *
   * @param {string} tabId - Must match an id="page-{tabId}" element in the DOM.
   */
  function switchToTab(tabId) {
    [homePageEl, settingsPageEl].forEach((page) => {
      if (page) page.hidden = true;
    });

    const targetPage = document.getElementById(`page-${tabId}`);
    if (targetPage) targetPage.hidden = false;

    if (tabBar) tabBar.setActiveTab(tabId);
  }
}

// ES module scripts defer until after the DOM is parsed, so the DOM is
// ready by the time this runs — but we still listen for DOMContentLoaded
// to keep the wiring explicit and order-independent.
document.addEventListener('DOMContentLoaded', initializeApp);
