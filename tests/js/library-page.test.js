import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../app/js/spells-list.js', () => ({
  renderSpellsList: vi.fn().mockReturnValue(true),
}));

import { renderLibraryPage } from '../../app/js/library-page.js';
import { renderSpellsList }  from '../../app/js/spells-list.js';

describe('renderLibraryPage', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    vi.clearAllMocks();
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

  it('calls renderSpellsList with the container', () => {
    renderLibraryPage(container);
    expect(renderSpellsList).toHaveBeenCalledWith(container);
  });

  it('does not render a placeholder element', () => {
    renderLibraryPage(container);
    expect(container.querySelector('.page-placeholder')).toBeNull();
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

  it('does not call renderSpellsList when container is invalid', () => {
    renderLibraryPage(null);
    expect(renderSpellsList).not.toHaveBeenCalled();
  });
});
