import { renderHomePage }      from './home-page.js';
import { renderDicePage }      from './dice-page.js';
import { renderGeneratePage }  from './generate-page.js';
import { renderLibraryPage }   from './library-page.js';
import { renderSettingsPage }  from './settings-page.js';
import { initializeTabBar }    from './tab-bar.js';
import { registerServiceWorker } from './service-worker-registration.js';

/**
 * Bootstraps the app — renders all pages, builds the tab bar, and
 * registers the service worker.
 *
 * Settings is not a tab. It is opened via the gear icon on the Home page
 * and dismissed via the Done button, overlaying whichever tab was active.
 *
 * Exported so tests can call it directly without simulating DOM events.
 */
export function initializeApp() {
  const homePageEl     = document.getElementById('page-home');
  const dicePageEl     = document.getElementById('page-dice');
  const generatePageEl = document.getElementById('page-generate');
  const libraryPageEl  = document.getElementById('page-library');
  const settingsPageEl = document.getElementById('page-settings');
  const tabBarEl       = document.getElementById('tab-bar');

  // Tab pages only — settings is managed separately
  const tabPages = [homePageEl, dicePageEl, generatePageEl, libraryPageEl];

  // Tracks the last active tab so closing settings restores the right page
  let activeTabId = 'home';

  renderHomePage(homePageEl, { onSettingsOpen: openSettings });
  renderDicePage(dicePageEl);
  renderGeneratePage(generatePageEl);
  renderLibraryPage(libraryPageEl);
  renderSettingsPage(settingsPageEl, { onDismiss: closeSettings });

  const tabBar = initializeTabBar(tabBarEl, switchToTab);

  // Start on the home tab
  switchToTab('home');

  // Register the service worker after the UI is visible so a slow SW
  // install never delays the first paint
  registerServiceWorker();

  /**
   * Shows the page matching tabId and hides all others (including settings).
   * Also updates the tab bar highlight to match.
   *
   * @param {string} tabId - Must match an id="page-{tabId}" element in the DOM.
   */
  function switchToTab(tabId) {
    tabPages.forEach((page) => { if (page) page.hidden = true; });
    if (settingsPageEl) settingsPageEl.hidden = true;

    const targetPage = document.getElementById(`page-${tabId}`);
    if (targetPage) targetPage.hidden = false;

    activeTabId = tabId;
    if (tabBar) tabBar.setActiveTab(tabId);
  }

  /** Hides all tab pages and reveals the settings page. */
  function openSettings() {
    tabPages.forEach((page) => { if (page) page.hidden = true; });
    if (settingsPageEl) settingsPageEl.hidden = false;
  }

  /** Hides settings and restores whichever tab was last active. */
  function closeSettings() {
    if (settingsPageEl) settingsPageEl.hidden = true;
    const targetPage = document.getElementById(`page-${activeTabId}`);
    if (targetPage) targetPage.hidden = false;
  }
}

// ES module scripts defer until after the DOM is parsed, so the DOM is
// ready by the time this runs — but we still listen for DOMContentLoaded
// to keep the wiring explicit and order-independent.
document.addEventListener('DOMContentLoaded', initializeApp);
