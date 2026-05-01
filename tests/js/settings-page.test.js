import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('../../app/js/service-worker-registration.js', () => ({
  registerServiceWorker: vi.fn().mockResolvedValue(true),
  checkForUpdates:       vi.fn().mockResolvedValue(undefined),
}));

import { renderSettingsPage, handleShare, handleUpdateCheck } from '../../app/js/settings-page.js';
import { checkForUpdates } from '../../app/js/service-worker-registration.js';

// ── renderSettingsPage ───────────────────────────────────────────────────────

describe('renderSettingsPage', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    vi.clearAllMocks();
  });

  // ── Structure ───────────────────────────────────────────────────────────

  it('returns true when given a valid container', () => {
    expect(renderSettingsPage(container)).toBe(true);
  });

  it('renders a page title element', () => {
    renderSettingsPage(container);
    expect(container.querySelector('.page-title')).not.toBeNull();
  });

  it('page title text is "Settings"', () => {
    renderSettingsPage(container);
    expect(container.querySelector('.page-title').textContent).toBe('Settings');
  });

  it('page header is the first child of the container', () => {
    renderSettingsPage(container);
    expect(container.firstElementChild.classList.contains('page-header')).toBe(true);
  });

  it('renders a settings section element', () => {
    renderSettingsPage(container);
    expect(container.querySelector('.settings')).not.toBeNull();
  });

  // ── Page header / Done button ───────────────────────────────────────────

  it('renders a page-header element', () => {
    renderSettingsPage(container);
    expect(container.querySelector('.page-header')).not.toBeNull();
  });

  it('renders a Done button inside the header', () => {
    renderSettingsPage(container);
    expect(container.querySelector('.page-header__done-button')).not.toBeNull();
  });

  it('Done button text is "Done"', () => {
    renderSettingsPage(container);
    expect(container.querySelector('.page-header__done-button').textContent).toBe('Done');
  });

  it('clicking Done button calls onDismiss', () => {
    const onDismiss = vi.fn();
    renderSettingsPage(container, { onDismiss });
    container.querySelector('.page-header__done-button').click();
    expect(onDismiss).toHaveBeenCalled();
  });

  it('does not throw when Done button is clicked with no callback provided', () => {
    renderSettingsPage(container);
    expect(() => container.querySelector('.page-header__done-button').click()).not.toThrow();
  });

  // ── External link rows ──────────────────────────────────────────────────

  it('renders two link rows', () => {
    renderSettingsPage(container);
    expect(container.querySelectorAll('.settings__link').length).toBe(2);
  });

  it('Code link has the correct href', () => {
    renderSettingsPage(container);
    const links = container.querySelectorAll('.settings__link');
    expect(links[0].href).toContain('github.com/BrandonDevMn/ShadowDarkTools');
  });

  it('Code link label text is "Code"', () => {
    renderSettingsPage(container);
    const links = container.querySelectorAll('.settings__link');
    expect(links[0].querySelector('.settings__link-label').textContent).toBe('Code');
  });

  it('Shadowdark Makers link has the correct href', () => {
    renderSettingsPage(container);
    const links = container.querySelectorAll('.settings__link');
    expect(links[1].href).toContain('thearcanelibrary.com');
  });

  it('Shadowdark Makers link label text is "Shadowdark Makers"', () => {
    renderSettingsPage(container);
    const links = container.querySelectorAll('.settings__link');
    expect(links[1].querySelector('.settings__link-label').textContent).toBe('Shadowdark Makers');
  });

  it('links open in a new tab', () => {
    renderSettingsPage(container);
    container.querySelectorAll('.settings__link').forEach((link) => {
      expect(link.target).toBe('_blank');
    });
  });

  it('links have rel="noopener noreferrer"', () => {
    renderSettingsPage(container);
    container.querySelectorAll('.settings__link').forEach((link) => {
      expect(link.rel).toContain('noopener');
      expect(link.rel).toContain('noreferrer');
    });
  });

  // ── Version row ─────────────────────────────────────────────────────────

  it('renders a version value element', () => {
    renderSettingsPage(container);
    expect(container.querySelector('.settings__version')).not.toBeNull();
  });

  it('renders a version label element', () => {
    renderSettingsPage(container);
    expect(container.querySelector('.settings__label')).not.toBeNull();
  });

  it('version label text is "Version"', () => {
    renderSettingsPage(container);
    expect(container.querySelector('.settings__label').textContent).toBe('Version');
  });

  it('version value is non-empty', () => {
    renderSettingsPage(container);
    const version = container.querySelector('.settings__version').textContent;
    expect(version.length).toBeGreaterThan(0);
  });

  // ── Share button ────────────────────────────────────────────────────────

  it('renders a Share App button', () => {
    renderSettingsPage(container);
    const buttons = Array.from(container.querySelectorAll('.settings__action-button'));
    const shareBtn = buttons.find((b) => b.textContent === 'Share App');
    expect(shareBtn).not.toBeUndefined();
  });

  // ── Check for Update button ─────────────────────────────────────────────

  it('renders a Check for Update button', () => {
    renderSettingsPage(container);
    expect(container.querySelector('.settings__update-button')).not.toBeNull();
  });

  it('Check for Update button initial text is "Check for Update"', () => {
    renderSettingsPage(container);
    expect(container.querySelector('.settings__update-button').textContent).toBe('Check for Update');
  });

  it('Check for Update button is not disabled on render', () => {
    renderSettingsPage(container);
    expect(container.querySelector('.settings__update-button').disabled).toBe(false);
  });

  // ── Invalid container ───────────────────────────────────────────────────

  it('returns false when container is null', () => {
    expect(renderSettingsPage(null)).toBe(false);
  });

  it('returns false when container is undefined', () => {
    expect(renderSettingsPage(undefined)).toBe(false);
  });

  it('returns false when container is not an Element', () => {
    expect(renderSettingsPage('div')).toBe(false);
  });
});

// ── handleShare ──────────────────────────────────────────────────────────────

describe('handleShare', () => {
  it('returns "unavailable" when navigator.share is not present', async () => {
    const result = await handleShare('https://example.com', {});
    expect(result).toBe('unavailable');
  });

  it('calls navigator.share with the correct url and title', async () => {
    const shareFn = vi.fn().mockResolvedValue(undefined);
    await handleShare('https://example.com', { share: shareFn });
    expect(shareFn).toHaveBeenCalledWith({
      title: 'ShadowDark Tools',
      url: 'https://example.com',
    });
  });

  it('returns "shared" when navigator.share resolves', async () => {
    const shareFn = vi.fn().mockResolvedValue(undefined);
    const result = await handleShare('https://example.com', { share: shareFn });
    expect(result).toBe('shared');
  });

  it('returns "dismissed" when navigator.share rejects with AbortError', async () => {
    const abortError = Object.assign(new Error('dismissed'), { name: 'AbortError' });
    const shareFn = vi.fn().mockRejectedValue(abortError);
    const result = await handleShare('https://example.com', { share: shareFn });
    expect(result).toBe('dismissed');
  });

  it('returns "error" when navigator.share rejects with an unexpected error', async () => {
    const shareFn = vi.fn().mockRejectedValue(new Error('something broke'));
    const result = await handleShare('https://example.com', { share: shareFn });
    expect(result).toBe('error');
  });
});

// ── handleUpdateCheck ────────────────────────────────────────────────────────

describe('handleUpdateCheck', () => {
  let button;
  const instant = () => Promise.resolve();

  beforeEach(() => {
    button = document.createElement('button');
    button.textContent = 'Check for Update';
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // ── Checking state ──────────────────────────────────────────────────────

  it('disables the button immediately', async () => {
    const updateFn = vi.fn().mockResolvedValue(undefined);
    const promise = handleUpdateCheck(button, updateFn, instant);
    expect(button.disabled).toBe(true);
    await promise;
  });

  it('sets button text to "Checking…" immediately', async () => {
    const updateFn = vi.fn().mockResolvedValue(undefined);
    const promise = handleUpdateCheck(button, updateFn, instant);
    expect(button.textContent).toBe('Checking…');
    await promise;
  });

  // ── No update found ─────────────────────────────────────────────────────

  it('shows "Already up to date" when updateCheckFn resolves', async () => {
    let resolveTimer;
    const holdTimer = () => new Promise((r) => { resolveTimer = r; });
    const updateFn = vi.fn().mockResolvedValue(undefined);

    const promise = handleUpdateCheck(button, updateFn, holdTimer);
    // setTimeout(0) drains all pending microtasks before continuing
    await new Promise((r) => setTimeout(r, 0));
    expect(button.textContent).toBe('Already up to date');
    resolveTimer();
    await promise;
  });

  it('resets text to "Check for Update" after the timer', async () => {
    const updateFn = vi.fn().mockResolvedValue(undefined);
    await handleUpdateCheck(button, updateFn, instant);
    expect(button.textContent).toBe('Check for Update');
  });

  it('re-enables the button after the timer', async () => {
    const updateFn = vi.fn().mockResolvedValue(undefined);
    await handleUpdateCheck(button, updateFn, instant);
    expect(button.disabled).toBe(false);
  });

  it('calls the injected updateCheckFn', async () => {
    const updateFn = vi.fn().mockResolvedValue(undefined);
    await handleUpdateCheck(button, updateFn, instant);
    expect(updateFn).toHaveBeenCalledOnce();
  });

  // ── Network error ───────────────────────────────────────────────────────

  it('shows retry message when updateCheckFn rejects', async () => {
    const updateFn = vi.fn().mockRejectedValue(new Error('offline'));
    await handleUpdateCheck(button, updateFn, instant);
    expect(button.textContent).toBe('No connection — tap to retry');
  });

  it('re-enables the button on error so the user can retry', async () => {
    const updateFn = vi.fn().mockRejectedValue(new Error('offline'));
    await handleUpdateCheck(button, updateFn, instant);
    expect(button.disabled).toBe(false);
  });

  it('does not reset text after an error (keeps the retry message)', async () => {
    const updateFn = vi.fn().mockRejectedValue(new Error('offline'));
    await handleUpdateCheck(button, updateFn, instant);
    expect(button.textContent).not.toBe('Check for Update');
  });
});
