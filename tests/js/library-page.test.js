import { describe, it, expect, beforeEach } from 'vitest';
import { renderLibraryPage } from '../../app/js/library-page.js';

describe('renderLibraryPage', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
  });

  // ── Happy path ──────────────────────────────────────────────────────────

  it('returns true when given a valid container', () => {
    expect(renderLibraryPage(container)).toBe(true);
  });

  it('renders a page title element', () => {
    renderLibraryPage(container);
    expect(container.querySelector('.page-title')).not.toBeNull();
  });

  it('page title text is "Library"', () => {
    renderLibraryPage(container);
    expect(container.querySelector('.page-title').textContent).toBe('Library');
  });

  it('renders a placeholder element', () => {
    renderLibraryPage(container);
    expect(container.querySelector('.page-placeholder')).not.toBeNull();
  });

  it('placeholder text is "todo"', () => {
    renderLibraryPage(container);
    expect(container.querySelector('.page-placeholder').textContent).toBe('todo');
  });

  // ── Invalid container ───────────────────────────────────────────────────

  it('returns false when container is null', () => {
    expect(renderLibraryPage(null)).toBe(false);
  });

  it('returns false when container is undefined', () => {
    expect(renderLibraryPage(undefined)).toBe(false);
  });

  it('returns false when container is not an Element', () => {
    expect(renderLibraryPage('#page-library')).toBe(false);
  });
});
