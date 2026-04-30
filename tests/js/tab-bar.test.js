import { describe, it, expect, vi, beforeEach } from 'vitest';
import { initializeTabBar } from '../../app/js/tab-bar.js';

describe('initializeTabBar', () => {
  let container;
  let onTabSelect;

  beforeEach(() => {
    container = document.createElement('nav');
    onTabSelect = vi.fn();
  });

  // ── Invalid container ───────────────────────────────────────────────────

  it('returns null when container is null', () => {
    expect(initializeTabBar(null, onTabSelect)).toBeNull();
  });

  it('returns null when container is undefined', () => {
    expect(initializeTabBar(undefined, onTabSelect)).toBeNull();
  });

  it('returns null when container is not an Element', () => {
    expect(initializeTabBar('#tab-bar', onTabSelect)).toBeNull();
  });

  // ── Tab rendering ───────────────────────────────────────────────────────

  it('renders a button for each defined tab', () => {
    initializeTabBar(container, onTabSelect);
    expect(container.querySelectorAll('.tab-bar__tab').length).toBe(5);
  });

  it('renders a home tab', () => {
    initializeTabBar(container, onTabSelect);
    expect(container.querySelector('[data-tab-id="home"]')).not.toBeNull();
  });

  it('renders a dice tab', () => {
    initializeTabBar(container, onTabSelect);
    expect(container.querySelector('[data-tab-id="dice"]')).not.toBeNull();
  });

  it('renders a generate tab', () => {
    initializeTabBar(container, onTabSelect);
    expect(container.querySelector('[data-tab-id="generate"]')).not.toBeNull();
  });

  it('renders an info tab', () => {
    initializeTabBar(container, onTabSelect);
    expect(container.querySelector('[data-tab-id="info"]')).not.toBeNull();
  });

  it('renders a settings tab', () => {
    initializeTabBar(container, onTabSelect);
    expect(container.querySelector('[data-tab-id="settings"]')).not.toBeNull();
  });

  it('each tab has an aria-label', () => {
    initializeTabBar(container, onTabSelect);
    container.querySelectorAll('.tab-bar__tab').forEach((btn) => {
      expect(btn.getAttribute('aria-label')).toBeTruthy();
    });
  });

  // ── Click handling ──────────────────────────────────────────────────────

  it('calls onTabSelect with "home" when the home tab is clicked', () => {
    initializeTabBar(container, onTabSelect);
    container.querySelector('[data-tab-id="home"]').click();
    expect(onTabSelect).toHaveBeenCalledWith('home');
  });

  it('calls onTabSelect with "dice" when the dice tab is clicked', () => {
    initializeTabBar(container, onTabSelect);
    container.querySelector('[data-tab-id="dice"]').click();
    expect(onTabSelect).toHaveBeenCalledWith('dice');
  });

  it('calls onTabSelect with "generate" when the generate tab is clicked', () => {
    initializeTabBar(container, onTabSelect);
    container.querySelector('[data-tab-id="generate"]').click();
    expect(onTabSelect).toHaveBeenCalledWith('generate');
  });

  it('calls onTabSelect with "info" when the info tab is clicked', () => {
    initializeTabBar(container, onTabSelect);
    container.querySelector('[data-tab-id="info"]').click();
    expect(onTabSelect).toHaveBeenCalledWith('info');
  });

  it('calls onTabSelect with "settings" when the settings tab is clicked', () => {
    initializeTabBar(container, onTabSelect);
    container.querySelector('[data-tab-id="settings"]').click();
    expect(onTabSelect).toHaveBeenCalledWith('settings');
  });

  // ── setActiveTab ────────────────────────────────────────────────────────

  it('returns an object with a setActiveTab method', () => {
    const tabBar = initializeTabBar(container, onTabSelect);
    expect(typeof tabBar.setActiveTab).toBe('function');
  });

  it('setActiveTab adds the active class to the correct tab', () => {
    const tabBar = initializeTabBar(container, onTabSelect);
    tabBar.setActiveTab('dice');
    expect(container.querySelector('[data-tab-id="dice"]')
      .classList.contains('tab-bar__tab--active')).toBe(true);
  });

  it('setActiveTab removes the active class from all other tabs', () => {
    const tabBar = initializeTabBar(container, onTabSelect);
    tabBar.setActiveTab('dice');
    ['home', 'generate', 'info', 'settings'].forEach((id) => {
      expect(container.querySelector(`[data-tab-id="${id}"]`)
        .classList.contains('tab-bar__tab--active')).toBe(false);
    });
  });

  it('setActiveTab updates aria-selected correctly', () => {
    const tabBar = initializeTabBar(container, onTabSelect);
    tabBar.setActiveTab('home');
    expect(container.querySelector('[data-tab-id="home"]')
      .getAttribute('aria-selected')).toBe('true');
    expect(container.querySelector('[data-tab-id="settings"]')
      .getAttribute('aria-selected')).toBe('false');
  });

  it('switching active tab removes active class from the previously active tab', () => {
    const tabBar = initializeTabBar(container, onTabSelect);
    tabBar.setActiveTab('home');
    tabBar.setActiveTab('settings');
    expect(container.querySelector('[data-tab-id="home"]')
      .classList.contains('tab-bar__tab--active')).toBe(false);
  });
});
