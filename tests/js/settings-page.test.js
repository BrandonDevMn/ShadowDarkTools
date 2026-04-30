import { describe, it, expect, beforeEach } from 'vitest';
import { renderSettingsPage } from '../../app/js/settings-page.js';

describe('renderSettingsPage', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
  });

  // ── Happy path ──────────────────────────────────────────────────────────

  it('returns true when given a valid container', () => {
    expect(renderSettingsPage(container)).toBe(true);
  });

  it('renders a settings section element', () => {
    renderSettingsPage(container);
    expect(container.querySelector('.settings')).not.toBeNull();
  });

  it('renders a heading', () => {
    renderSettingsPage(container);
    expect(container.querySelector('.settings__heading')).not.toBeNull();
  });

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
