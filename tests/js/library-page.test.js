import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../app/js/library-sections.js', () => {
  // Inline — vi.mock factories are hoisted and cannot reference outer variables
  const ids = [
    'ability-scores', 'advancement', 'adventure-generator', 'alignments',
    'ancestries', 'backgrounds', 'classes', 'combat', 'core-mechanic',
    'death-and-dying', 'deities', 'encounter-tables', 'equipment',
    'languages', 'light-and-darkness', 'luck-tokens', 'magic-items',
    'monsters', 'npcs-and-reactions', 'overland-travel',
    'random-character-generation', 'random-events', 'resting', 'rumors',
    'running-the-game', 'settlements', 'spellcasting', 'spells',
    'stealth-and-surprise', 'titles', 'treasure',
  ];
  const sections = ids.map((id) => ({
    id,
    label: id.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    items: [
      { id: 'item-a', label: 'Alpha Item' },
      { id: 'item-b', label: 'Beta Item', sublabel: 'Sub B' },
    ],
    renderDetail: vi.fn(),
  }));
  return { SECTIONS: sections };
});

// 31 section IDs — must match what library-sections.js exports
const ALL_IDS = [
  'ability-scores', 'advancement', 'adventure-generator', 'alignments',
  'ancestries', 'backgrounds', 'classes', 'combat', 'core-mechanic',
  'death-and-dying', 'deities', 'encounter-tables', 'equipment',
  'languages', 'light-and-darkness', 'luck-tokens', 'magic-items',
  'monsters', 'npcs-and-reactions', 'overland-travel',
  'random-character-generation', 'random-events', 'resting', 'rumors',
  'running-the-game', 'settlements', 'spellcasting', 'spells',
  'stealth-and-surprise', 'titles', 'treasure',
];

import { renderLibraryPage } from '../../app/js/library-page.js';
import { SECTIONS }          from '../../app/js/library-sections.js';

describe('renderLibraryPage', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    vi.clearAllMocks();
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

  // ── Level 1: section list ───────────────────────────────────────────────

  it('returns true when given a valid container', () => {
    expect(renderLibraryPage(container)).toBe(true);
  });

  it('renders a page title with text "Library"', () => {
    renderLibraryPage(container);
    expect(container.querySelector('.page-title').textContent).toBe('Library');
  });

  it('renders a library-nav element', () => {
    renderLibraryPage(container);
    expect(container.querySelector('.library-nav')).not.toBeNull();
  });

  it('renders a nav row for each section', () => {
    renderLibraryPage(container);
    expect(container.querySelectorAll('[data-section]').length).toBe(31);
  });

  it('renders a Spells section row', () => {
    renderLibraryPage(container);
    expect(container.querySelector('[data-section="spells"]')).not.toBeNull();
  });

  it('renders section rows with label text', () => {
    renderLibraryPage(container);
    const labels = Array.from(container.querySelectorAll('.library-nav__row-label')).map((el) => el.textContent);
    expect(labels).toContain('Spells');
    expect(labels).toContain('Ancestries');
    expect(labels).toContain('Monsters');
  });

  it('does not render a back button on the section list', () => {
    renderLibraryPage(container);
    expect(container.querySelector('.library-back-btn')).toBeNull();
  });

  it('does not call any renderDetail on initial load', () => {
    renderLibraryPage(container);
    SECTIONS.forEach((s) => expect(s.renderDetail).not.toHaveBeenCalled());
  });

  // ── Level 2: item list ──────────────────────────────────────────────────

  it('clicking a section row shows item rows', () => {
    renderLibraryPage(container);
    container.querySelector('[data-section="spells"]').click();
    expect(container.querySelectorAll('[data-item]').length).toBeGreaterThan(0);
  });

  it('clicking a section row removes the section list', () => {
    renderLibraryPage(container);
    container.querySelector('[data-section="spells"]').click();
    expect(container.querySelector('[data-section]')).toBeNull();
  });

  it('clicking a section row shows a back button', () => {
    renderLibraryPage(container);
    container.querySelector('[data-section="spells"]').click();
    expect(container.querySelector('.library-back-btn')).not.toBeNull();
  });

  it('back button at level 2 reads "‹ Library"', () => {
    renderLibraryPage(container);
    container.querySelector('[data-section="spells"]').click();
    expect(container.querySelector('.library-back-btn').textContent).toBe('‹ Library');
  });

  it('clicking a section row updates the page title to the section label', () => {
    renderLibraryPage(container);
    container.querySelector('[data-section="spells"]').click();
    expect(container.querySelector('.page-title').textContent).toBe('Spells');
  });

  it('item rows render their labels', () => {
    renderLibraryPage(container);
    container.querySelector('[data-section="spells"]').click();
    const labels = Array.from(container.querySelectorAll('.library-nav__row-label')).map((el) => el.textContent);
    expect(labels).toContain('Alpha Item');
  });

  it('item rows with sublabel render the sublabel', () => {
    renderLibraryPage(container);
    container.querySelector('[data-section="spells"]').click();
    const sublabels = Array.from(container.querySelectorAll('.library-nav__row-sublabel')).map((el) => el.textContent);
    expect(sublabels).toContain('Sub B');
  });

  it('does not call renderDetail at level 2', () => {
    renderLibraryPage(container);
    const section = SECTIONS.find((s) => s.id === 'spells');
    container.querySelector('[data-section="spells"]').click();
    expect(section.renderDetail).not.toHaveBeenCalled();
  });

  // ── Level 3: detail view ────────────────────────────────────────────────

  it('clicking an item at level 2 calls renderDetail with itemId', () => {
    renderLibraryPage(container);
    const section = SECTIONS.find((s) => s.id === 'spells');
    container.querySelector('[data-section="spells"]').click();
    container.querySelector('[data-item="item-a"]').click();
    expect(section.renderDetail).toHaveBeenCalledWith(container, 'item-a');
  });

  it('clicking an item removes the item list', () => {
    renderLibraryPage(container);
    container.querySelector('[data-section="spells"]').click();
    container.querySelector('[data-item="item-a"]').click();
    expect(container.querySelector('[data-item]')).toBeNull();
  });

  it('clicking an item updates the page title to the item label', () => {
    renderLibraryPage(container);
    container.querySelector('[data-section="spells"]').click();
    container.querySelector('[data-item="item-a"]').click();
    expect(container.querySelector('.page-title').textContent).toBe('Alpha Item');
  });

  it('back button at level 3 reads "‹ <section label>"', () => {
    renderLibraryPage(container);
    container.querySelector('[data-section="spells"]').click();
    container.querySelector('[data-item="item-a"]').click();
    expect(container.querySelector('.library-back-btn').textContent).toBe('‹ Spells');
  });

  // ── Back navigation ─────────────────────────────────────────────────────

  it('clicking back at level 2 restores the section list', () => {
    renderLibraryPage(container);
    container.querySelector('[data-section="spells"]').click();
    container.querySelector('.library-back-btn').click();
    expect(container.querySelectorAll('[data-section]').length).toBe(31);
  });

  it('clicking back at level 2 removes the back button', () => {
    renderLibraryPage(container);
    container.querySelector('[data-section="spells"]').click();
    container.querySelector('.library-back-btn').click();
    expect(container.querySelector('.library-back-btn')).toBeNull();
  });

  it('clicking back at level 2 restores the "Library" title', () => {
    renderLibraryPage(container);
    container.querySelector('[data-section="spells"]').click();
    container.querySelector('.library-back-btn').click();
    expect(container.querySelector('.page-title').textContent).toBe('Library');
  });

  it('clicking back at level 3 restores the item list', () => {
    renderLibraryPage(container);
    container.querySelector('[data-section="spells"]').click();
    container.querySelector('[data-item="item-a"]').click();
    container.querySelector('.library-back-btn').click();
    expect(container.querySelectorAll('[data-item]').length).toBeGreaterThan(0);
  });

  it('clicking back at level 3 shows "‹ Library" back button', () => {
    renderLibraryPage(container);
    container.querySelector('[data-section="spells"]').click();
    container.querySelector('[data-item="item-a"]').click();
    container.querySelector('.library-back-btn').click();
    expect(container.querySelector('.library-back-btn').textContent).toBe('‹ Library');
  });

  it('double back (level 3 → 2 → 1) restores section list', () => {
    renderLibraryPage(container);
    container.querySelector('[data-section="ancestries"]').click();
    container.querySelector('[data-item="item-a"]').click();
    container.querySelector('.library-back-btn').click(); // → level 2
    container.querySelector('.library-back-btn').click(); // → level 1
    expect(container.querySelectorAll('[data-section]').length).toBe(31);
    expect(container.querySelector('.library-back-btn')).toBeNull();
  });
});
