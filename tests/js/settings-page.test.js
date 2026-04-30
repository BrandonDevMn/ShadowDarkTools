import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock update-checker before importing settings-page so we control what
// checkForUpdate returns without spinning up a real service worker.
vi.mock('../../app/js/update-checker.js', () => ({
  checkForUpdate: vi.fn(),
  UPDATE_STATUS: {
    UPDATED:      'updated',
    UP_TO_DATE:   'up-to-date',
    ERROR:        'error',
  },
}));

import { renderSettingsPage, handleUpdateCheck, handleShare } from '../../app/js/settings-page.js';
import { checkForUpdate, UPDATE_STATUS } from '../../app/js/update-checker.js';

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

  it('page title is the first child of the container', () => {
    renderSettingsPage(container);
    expect(container.firstElementChild.classList.contains('page-title')).toBe(true);
  });

  it('renders a settings section element', () => {
    renderSettingsPage(container);
    expect(container.querySelector('.settings')).not.toBeNull();
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

  it('update button initial text is "Check for Update"', () => {
    renderSettingsPage(container);
    expect(container.querySelector('.settings__update-button').textContent).toBe('Check for Update');
  });

  it('update button is not disabled on render', () => {
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
  let reloadFn;

  beforeEach(() => {
    button = document.createElement('button');
    button.textContent = 'Check for Update';
    reloadFn = vi.fn();
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // ── Checking state ──────────────────────────────────────────────────────

  it('disables the button immediately', async () => {
    checkForUpdate.mockResolvedValue(UPDATE_STATUS.UP_TO_DATE);
    const promise = handleUpdateCheck(button, reloadFn);
    expect(button.disabled).toBe(true);
    await promise;
  });

  it('sets button text to "Checking…" immediately', async () => {
    checkForUpdate.mockResolvedValue(UPDATE_STATUS.UP_TO_DATE);
    const promise = handleUpdateCheck(button, reloadFn);
    expect(button.textContent).toBe('Checking…');
    await promise;
  });

  // ── UPDATED path ────────────────────────────────────────────────────────

  it('shows "Updated! Reloading…" when status is UPDATED', async () => {
    checkForUpdate.mockResolvedValue(UPDATE_STATUS.UPDATED);
    await handleUpdateCheck(button, reloadFn);
    expect(button.textContent).toBe('Updated! Reloading…');
  });

  it('does not call reloadFn immediately — waits 1 s', async () => {
    checkForUpdate.mockResolvedValue(UPDATE_STATUS.UPDATED);
    await handleUpdateCheck(button, reloadFn);
    expect(reloadFn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1_000);
    expect(reloadFn).toHaveBeenCalledOnce();
  });

  it('button stays disabled after UPDATED', async () => {
    checkForUpdate.mockResolvedValue(UPDATE_STATUS.UPDATED);
    await handleUpdateCheck(button, reloadFn);
    expect(button.disabled).toBe(true);
  });

  // ── UP_TO_DATE path ─────────────────────────────────────────────────────

  it('shows "Already up to date" when status is UP_TO_DATE', async () => {
    checkForUpdate.mockResolvedValue(UPDATE_STATUS.UP_TO_DATE);
    await handleUpdateCheck(button, reloadFn);
    expect(button.textContent).toBe('Already up to date');
  });

  it('resets button text after 2 s when UP_TO_DATE', async () => {
    checkForUpdate.mockResolvedValue(UPDATE_STATUS.UP_TO_DATE);
    await handleUpdateCheck(button, reloadFn);
    vi.advanceTimersByTime(2_000);
    expect(button.textContent).toBe('Check for Update');
    expect(button.disabled).toBe(false);
  });

  it('does not call reloadFn when UP_TO_DATE', async () => {
    checkForUpdate.mockResolvedValue(UPDATE_STATUS.UP_TO_DATE);
    await handleUpdateCheck(button, reloadFn);
    vi.advanceTimersByTime(2_000);
    expect(reloadFn).not.toHaveBeenCalled();
  });

  // ── ERROR path ──────────────────────────────────────────────────────────

  it('shows retry message when status is ERROR', async () => {
    checkForUpdate.mockResolvedValue(UPDATE_STATUS.ERROR);
    await handleUpdateCheck(button, reloadFn);
    expect(button.textContent).toBe('No connection — tap to retry');
  });

  it('re-enables the button after ERROR so user can retry', async () => {
    checkForUpdate.mockResolvedValue(UPDATE_STATUS.ERROR);
    await handleUpdateCheck(button, reloadFn);
    expect(button.disabled).toBe(false);
  });

  it('does not call reloadFn when ERROR', async () => {
    checkForUpdate.mockResolvedValue(UPDATE_STATUS.ERROR);
    await handleUpdateCheck(button, reloadFn);
    expect(reloadFn).not.toHaveBeenCalled();
  });
});
