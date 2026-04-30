import { describe, it, expect, vi, beforeEach } from 'vitest';

// Capture the switchToTab callback passed to initializeTabBar so tests
// can simulate tab presses without clicking real DOM buttons
let capturedSwitchToTab;

// Capture the settings open/dismiss callbacks passed by initializeApp
let capturedOnSettingsOpen;
let capturedOnDismiss;

vi.mock('../../app/js/home-page.js', () => ({
  renderHomePage: vi.fn().mockImplementation((_container, { onSettingsOpen } = {}) => {
    capturedOnSettingsOpen = onSettingsOpen;
    return true;
  }),
}));

vi.mock('../../app/js/dice-page.js', () => ({
  renderDicePage: vi.fn().mockReturnValue(true),
}));

vi.mock('../../app/js/generate-page.js', () => ({
  renderGeneratePage: vi.fn().mockReturnValue(true),
}));

vi.mock('../../app/js/library-page.js', () => ({
  renderLibraryPage: vi.fn().mockReturnValue(true),
}));

vi.mock('../../app/js/settings-page.js', () => ({
  renderSettingsPage: vi.fn().mockImplementation((_container, { onDismiss } = {}) => {
    capturedOnDismiss = onDismiss;
    return true;
  }),
}));

vi.mock('../../app/js/tab-bar.js', () => ({
  initializeTabBar: vi.fn().mockImplementation((_container, onTabSelect) => {
    capturedSwitchToTab = onTabSelect;
    return { setActiveTab: vi.fn() };
  }),
}));

vi.mock('../../app/js/service-worker-registration.js', () => ({
  registerServiceWorker: vi.fn().mockResolvedValue(true),
}));

import { initializeApp }      from '../../app/js/app.js';
import { renderHomePage }     from '../../app/js/home-page.js';
import { renderDicePage }     from '../../app/js/dice-page.js';
import { renderGeneratePage } from '../../app/js/generate-page.js';
import { renderLibraryPage }  from '../../app/js/library-page.js';
import { renderSettingsPage } from '../../app/js/settings-page.js';
import { initializeTabBar }   from '../../app/js/tab-bar.js';
import { registerServiceWorker } from '../../app/js/service-worker-registration.js';

// Minimal DOM that mirrors index.html's structure
const FIXTURE = `
  <div class="app-shell">
    <main class="page-container">
      <div id="page-home"     hidden></div>
      <div id="page-dice"     hidden></div>
      <div id="page-generate" hidden></div>
      <div id="page-library"  hidden></div>
      <div id="page-settings" hidden></div>
    </main>
    <nav id="tab-bar"></nav>
  </div>
`;

describe('initializeApp', () => {
  beforeEach(() => {
    document.body.innerHTML = FIXTURE;
    vi.clearAllMocks();
    capturedSwitchToTab = null;
    capturedOnSettingsOpen = null;
    capturedOnDismiss = null;
  });

  // ── Page rendering ──────────────────────────────────────────────────────

  it('calls renderHomePage with the home page element and onSettingsOpen callback', () => {
    initializeApp();
    expect(renderHomePage).toHaveBeenCalledWith(
      document.getElementById('page-home'),
      expect.objectContaining({ onSettingsOpen: expect.any(Function) })
    );
  });

  it('calls renderDicePage with the dice page element', () => {
    initializeApp();
    expect(renderDicePage).toHaveBeenCalledWith(document.getElementById('page-dice'));
  });

  it('calls renderGeneratePage with the generate page element', () => {
    initializeApp();
    expect(renderGeneratePage).toHaveBeenCalledWith(document.getElementById('page-generate'));
  });

  it('calls renderLibraryPage with the library page element', () => {
    initializeApp();
    expect(renderLibraryPage).toHaveBeenCalledWith(document.getElementById('page-library'));
  });

  it('calls renderSettingsPage with the settings page element and onDismiss callback', () => {
    initializeApp();
    expect(renderSettingsPage).toHaveBeenCalledWith(
      document.getElementById('page-settings'),
      expect.objectContaining({ onDismiss: expect.any(Function) })
    );
  });

  // ── Tab bar ─────────────────────────────────────────────────────────────

  it('calls initializeTabBar with the tab bar element and a function', () => {
    initializeApp();
    expect(initializeTabBar).toHaveBeenCalledWith(
      document.getElementById('tab-bar'),
      expect.any(Function)
    );
  });

  // ── Initial tab state ───────────────────────────────────────────────────

  it('shows the home page on startup', () => {
    initializeApp();
    expect(document.getElementById('page-home').hidden).toBe(false);
  });

  it('hides the dice page on startup', () => {
    initializeApp();
    expect(document.getElementById('page-dice').hidden).toBe(true);
  });

  it('hides the generate page on startup', () => {
    initializeApp();
    expect(document.getElementById('page-generate').hidden).toBe(true);
  });

  it('hides the library page on startup', () => {
    initializeApp();
    expect(document.getElementById('page-library').hidden).toBe(true);
  });

  it('hides the settings page on startup', () => {
    initializeApp();
    expect(document.getElementById('page-settings').hidden).toBe(true);
  });

  // ── Tab switching ───────────────────────────────────────────────────────

  it('switching to dice shows dice and hides all others', () => {
    initializeApp();
    capturedSwitchToTab('dice');
    expect(document.getElementById('page-dice').hidden).toBe(false);
    expect(document.getElementById('page-home').hidden).toBe(true);
    expect(document.getElementById('page-settings').hidden).toBe(true);
  });

  it('switching to generate shows generate and hides all others', () => {
    initializeApp();
    capturedSwitchToTab('generate');
    expect(document.getElementById('page-generate').hidden).toBe(false);
    expect(document.getElementById('page-home').hidden).toBe(true);
    expect(document.getElementById('page-settings').hidden).toBe(true);
  });

  it('switching to library shows library and hides all others', () => {
    initializeApp();
    capturedSwitchToTab('library');
    expect(document.getElementById('page-library').hidden).toBe(false);
    expect(document.getElementById('page-home').hidden).toBe(true);
    expect(document.getElementById('page-settings').hidden).toBe(true);
  });

  // ── Settings open / close ───────────────────────────────────────────────

  it('opening settings hides home and shows settings', () => {
    initializeApp();
    capturedOnSettingsOpen();
    expect(document.getElementById('page-settings').hidden).toBe(false);
    expect(document.getElementById('page-home').hidden).toBe(true);
  });

  it('closing settings hides settings and restores home (default active tab)', () => {
    initializeApp();
    capturedOnSettingsOpen();
    capturedOnDismiss();
    expect(document.getElementById('page-settings').hidden).toBe(true);
    expect(document.getElementById('page-home').hidden).toBe(false);
  });

  it('closing settings restores the last active tab, not always home', () => {
    initializeApp();
    capturedSwitchToTab('dice');
    capturedOnSettingsOpen();
    capturedOnDismiss();
    expect(document.getElementById('page-settings').hidden).toBe(true);
    expect(document.getElementById('page-dice').hidden).toBe(false);
    expect(document.getElementById('page-home').hidden).toBe(true);
  });

  // ── Service worker ──────────────────────────────────────────────────────

  it('calls registerServiceWorker', () => {
    initializeApp();
    expect(registerServiceWorker).toHaveBeenCalled();
  });
});
