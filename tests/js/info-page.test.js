import { describe, it, expect, beforeEach } from 'vitest';
import { renderInfoPage } from '../../app/js/info-page.js';

describe('renderInfoPage', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
  });

  // ── Happy path ──────────────────────────────────────────────────────────

  it('returns true when given a valid container', () => {
    expect(renderInfoPage(container)).toBe(true);
  });

  it('renders a page title element', () => {
    renderInfoPage(container);
    expect(container.querySelector('.page-title')).not.toBeNull();
  });

  it('page title text is "Info"', () => {
    renderInfoPage(container);
    expect(container.querySelector('.page-title').textContent).toBe('Info');
  });

  it('renders a placeholder element', () => {
    renderInfoPage(container);
    expect(container.querySelector('.page-placeholder')).not.toBeNull();
  });

  it('placeholder text is "todo"', () => {
    renderInfoPage(container);
    expect(container.querySelector('.page-placeholder').textContent).toBe('todo');
  });

  // ── Invalid container ───────────────────────────────────────────────────

  it('returns false when container is null', () => {
    expect(renderInfoPage(null)).toBe(false);
  });

  it('returns false when container is undefined', () => {
    expect(renderInfoPage(undefined)).toBe(false);
  });

  it('returns false when container is not an Element', () => {
    expect(renderInfoPage('#page-info')).toBe(false);
  });
});
