import { describe, it, expect, beforeEach } from 'vitest';
import { renderGeneratePage } from '../../app/js/generate-page.js';

describe('renderGeneratePage', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
  });

  // ── Happy path ──────────────────────────────────────────────────────────

  it('returns true when given a valid container', () => {
    expect(renderGeneratePage(container)).toBe(true);
  });

  it('renders a page title element', () => {
    renderGeneratePage(container);
    expect(container.querySelector('.page-title')).not.toBeNull();
  });

  it('page title text is "Generate"', () => {
    renderGeneratePage(container);
    expect(container.querySelector('.page-title').textContent).toBe('Generate');
  });

  it('renders a placeholder element', () => {
    renderGeneratePage(container);
    expect(container.querySelector('.page-placeholder')).not.toBeNull();
  });

  it('placeholder text is "todo"', () => {
    renderGeneratePage(container);
    expect(container.querySelector('.page-placeholder').textContent).toBe('todo');
  });

  // ── Invalid container ───────────────────────────────────────────────────

  it('returns false when container is null', () => {
    expect(renderGeneratePage(null)).toBe(false);
  });

  it('returns false when container is undefined', () => {
    expect(renderGeneratePage(undefined)).toBe(false);
  });

  it('returns false when container is not an Element', () => {
    expect(renderGeneratePage('#page-generate')).toBe(false);
  });
});
