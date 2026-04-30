import { describe, it, expect, vi, beforeEach } from 'vitest';

// Capture the switchToTab callback passed to initializeTabBar so tests
// can simulate tab presses without clicking real DOM buttons
let capturedSwitchToTab;

vi.mock('../../app/js/home-page.js', () => ({
  renderHomePage: vi.fn().mockReturnValue(true),
}));

vi.mock('../../app/js/dice-page.js', () => ({
  renderDicePage: vi.fn().mockReturnValue(true),
}));

vi.mock('../../app/js/generate-page.js', () => ({
  renderGeneratePage: vi.fn().mockReturnValue(true),
}));

vi.mock('../../app/js/info-page.js', () => ({
  renderInfoPage: vi.fn().mockReturnValue(true),
}));

vi.mock('../../app/js/settings-page.js', () => ({
  renderSettingsPage: vi.fn().mockReturnValue(true),
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
import { renderInfoPage }     from '../../app/js/info-page.js';
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
      <div id="page-info"     hidden></div>
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
  });

  // ── Page rendering ──────────────────────────────────────────────────────

  it('calls renderHomePage with the home page element', () => {
    initializeApp();
    expect(renderHomePage).toHaveBeenCalledWith(document.getElementById('page-home'));
  });

  it('calls renderDicePage with the dice page element', () => {
    initializeApp();
    expect(renderDicePage).toHaveBeenCalledWith(document.getElementById('page-dice'));
  });

  it('calls renderGeneratePage with the generate page element', () => {
    initializeApp();
    expect(renderGeneratePage).toHaveBeenCalledWith(document.getElementById('page-generate'));
  });

  it('calls renderInfoPage with the info page element', () => {
    initializeApp();
    expect(renderInfoPage).toHaveBeenCalledWith(document.getElementById('page-info'));
  });

  it('calls renderSettingsPage with the settings page element', () => {
    initializeApp();
    expect(renderSettingsPage).toHaveBeenCalledWith(document.getElementById('page-settings'));
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

  it('hides the info page on startup', () => {
    initializeApp();
    expect(document.getElementById('page-info').hidden).toBe(true);
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

  it('switching to info shows info and hides all others', () => {
    initializeApp();
    capturedSwitchToTab('info');
    expect(document.getElementById('page-info').hidden).toBe(false);
    expect(document.getElementById('page-home').hidden).toBe(true);
    expect(document.getElementById('page-settings').hidden).toBe(true);
  });

  it('switching to settings shows settings and hides home', () => {
    initializeApp();
    capturedSwitchToTab('settings');
    expect(document.getElementById('page-settings').hidden).toBe(false);
    expect(document.getElementById('page-home').hidden).toBe(true);
  });

  it('switching back to home shows home and hides settings', () => {
    initializeApp();
    capturedSwitchToTab('settings');
    capturedSwitchToTab('home');
    expect(document.getElementById('page-home').hidden).toBe(false);
    expect(document.getElementById('page-settings').hidden).toBe(true);
  });

  // ── Service worker ──────────────────────────────────────────────────────

  it('calls registerServiceWorker', () => {
    initializeApp();
    expect(registerServiceWorker).toHaveBeenCalled();
  });
});
