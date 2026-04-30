import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock hello-world before importing home-page so the dependency is stubbed
vi.mock('../../app/js/hello-world.js', () => ({
  renderHelloWorld: vi.fn().mockReturnValue(true),
}));

import { renderHomePage } from '../../app/js/home-page.js';
import { renderHelloWorld } from '../../app/js/hello-world.js';

describe('renderHomePage', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    vi.clearAllMocks();
  });

  // ── Happy path ──────────────────────────────────────────────────────────

  it('returns true when given a valid container', () => {
    expect(renderHomePage(container)).toBe(true);
  });

  it('renders a page title element', () => {
    renderHomePage(container);
    expect(container.querySelector('.page-title')).not.toBeNull();
  });

  it('page title text is "Home"', () => {
    renderHomePage(container);
    expect(container.querySelector('.page-title').textContent).toBe('Home');
  });

  it('calls renderHelloWorld with the container', () => {
    renderHomePage(container);
    expect(renderHelloWorld).toHaveBeenCalledWith(container);
  });

  it('page header is the first child of the container', () => {
    renderHomePage(container);
    expect(container.firstElementChild.classList.contains('page-header')).toBe(true);
  });

  it('page header is rendered before hello-world content', () => {
    renderHomePage(container);
    const children = Array.from(container.children);
    const headerIndex = children.findIndex((el) => el.classList.contains('page-header'));
    expect(headerIndex).toBe(0);
  });

  // ── Page header ─────────────────────────────────────────────────────────

  it('renders a page-header element', () => {
    renderHomePage(container);
    expect(container.querySelector('.page-header')).not.toBeNull();
  });

  it('renders a settings gear button inside the header', () => {
    renderHomePage(container);
    expect(container.querySelector('.page-header__settings-button')).not.toBeNull();
  });

  it('gear button has aria-label "Settings"', () => {
    renderHomePage(container);
    expect(container.querySelector('.page-header__settings-button')
      .getAttribute('aria-label')).toBe('Settings');
  });

  it('clicking the gear button calls onSettingsOpen', () => {
    const onSettingsOpen = vi.fn();
    renderHomePage(container, { onSettingsOpen });
    container.querySelector('.page-header__settings-button').click();
    expect(onSettingsOpen).toHaveBeenCalled();
  });

  it('does not throw when gear button is clicked with no callback provided', () => {
    renderHomePage(container);
    expect(() => container.querySelector('.page-header__settings-button').click()).not.toThrow();
  });

  // ── Invalid container ───────────────────────────────────────────────────

  it('returns false when container is null', () => {
    expect(renderHomePage(null)).toBe(false);
  });

  it('returns false when container is undefined', () => {
    expect(renderHomePage(undefined)).toBe(false);
  });

  it('returns false when container is not an Element', () => {
    expect(renderHomePage('#page-home')).toBe(false);
  });

  it('does not call renderHelloWorld when container is invalid', () => {
    renderHomePage(null);
    expect(renderHelloWorld).not.toHaveBeenCalled();
  });
});
