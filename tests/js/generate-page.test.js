import { describe, it, expect, vi, beforeEach } from 'vitest';

const MOCK_CHAR = {
  name: 'Aldric',
  ancestry: 'Human',
  class: 'Fighter',
  level: 1,
  alignment: 'Lawful',
  hitDie: 'd8',
  hp: 9,
  stats: {
    str: { score: 15, mod: 2 },
    dex: { score: 10, mod: 0 },
    con: { score: 13, mod: 1 },
    int: { score: 8,  mod: -1 },
    wis: { score: 12, mod: 1 },
    cha: { score: 7,  mod: -1 },
  },
  background: { roll: 11, name: 'Mercenary', description: 'You sold your sword to whoever paid.' },
  talents: ['+1 to melee and ranged attacks'],
  deity: null,
  spells: [],
  languages: ['Common'],
  ancestryTrait: { name: 'Ambitious', description: 'Extra talent roll at 1st level.' },
};

vi.mock('../../app/js/character-generator.js', () => ({
  generateCharacter: vi.fn(() => structuredClone(MOCK_CHAR)),
  fmtMod: (mod) => (mod >= 0 ? `+${mod}` : `${mod}`),
}));

import { renderGeneratePage } from '../../app/js/generate-page.js';
import { generateCharacter }  from '../../app/js/character-generator.js';

describe('renderGeneratePage', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    vi.clearAllMocks();
  });

  // ── Invalid container ───────────────────────────────────────────────────

  it('returns false when container is null',      () => { expect(renderGeneratePage(null)).toBe(false); });
  it('returns false when container is undefined', () => { expect(renderGeneratePage(undefined)).toBe(false); });
  it('returns false when container is a string',  () => { expect(renderGeneratePage('#generate')).toBe(false); });

  // ── Level 1: menu ───────────────────────────────────────────────────────

  it('returns true for a valid container', () => {
    expect(renderGeneratePage(container)).toBe(true);
  });

  it('renders a "Generate" page title', () => {
    renderGeneratePage(container);
    expect(container.querySelector('.page-title').textContent).toBe('Generate');
  });

  it('renders a library-nav element', () => {
    renderGeneratePage(container);
    expect(container.querySelector('.library-nav')).not.toBeNull();
  });

  it('renders a "Generate a Character" row', () => {
    renderGeneratePage(container);
    const labels = Array.from(container.querySelectorAll('.library-nav__row-label')).map((el) => el.textContent);
    expect(labels).toContain('Generate a Character');
  });

  it('does not call generateCharacter on initial load', () => {
    renderGeneratePage(container);
    expect(generateCharacter).not.toHaveBeenCalled();
  });

  it('does not show a back button on the menu', () => {
    renderGeneratePage(container);
    expect(container.querySelector('.library-back-btn')).toBeNull();
  });

  // ── Level 2: character sheet ────────────────────────────────────────────

  it('clicking the row calls generateCharacter', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    expect(generateCharacter).toHaveBeenCalledOnce();
  });

  it('clicking the row removes the menu', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    expect(container.querySelector('.library-nav')).toBeNull();
  });

  it('character sheet shows the character name as page title', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    expect(container.querySelector('.page-title').textContent).toBe('Aldric');
  });

  it('character sheet shows a back button reading "‹ Generate"', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    expect(container.querySelector('.library-back-btn').textContent).toBe('‹ Generate');
  });

  it('character sheet shows a re-roll button', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    expect(container.querySelector('.generate-reroll-btn')).not.toBeNull();
  });

  it('character sheet renders ancestry and class', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    expect(container.textContent).toContain('Human');
    expect(container.textContent).toContain('Fighter');
  });

  it('character sheet renders HP', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    expect(container.querySelector('.character-sheet__hp-value').textContent).toBe('9');
  });

  it('character sheet renders all 6 stat boxes', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    expect(container.querySelectorAll('.character-sheet__stat').length).toBe(6);
  });

  it('stat labels include STR and WIS', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    const labels = Array.from(container.querySelectorAll('.character-sheet__stat-label')).map((el) => el.textContent);
    expect(labels).toContain('STR');
    expect(labels).toContain('WIS');
  });

  it('stat modifiers are shown with sign', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    const mods = Array.from(container.querySelectorAll('.character-sheet__stat-mod')).map((el) => el.textContent);
    expect(mods).toContain('+2');
    expect(mods).toContain('-1');
  });

  it('character sheet shows background name', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    expect(container.textContent).toContain('Mercenary');
  });

  it('character sheet shows talent', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    expect(container.textContent).toContain('+1 to melee and ranged attacks');
  });

  it('character sheet shows ancestry trait', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    expect(container.textContent).toContain('Ambitious');
  });

  it('character sheet shows languages', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    expect(container.textContent).toContain('Common');
  });

  // ── Spells (priest mock) ────────────────────────────────────────────────

  it('spell names appear when character has spells', () => {
    generateCharacter.mockReturnValueOnce({
      ...structuredClone(MOCK_CHAR),
      class: 'Priest',
      spells: ['Cure Wounds', 'Light'],
      deity: 'Saint Terragnis',
    });
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    expect(container.textContent).toContain('Cure Wounds');
    expect(container.textContent).toContain('Light');
  });

  it('deity appears in meta when character is a priest', () => {
    generateCharacter.mockReturnValueOnce({
      ...structuredClone(MOCK_CHAR),
      class: 'Priest',
      spells: ['Cure Wounds', 'Light'],
      deity: 'Saint Terragnis',
    });
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    expect(container.textContent).toContain('Saint Terragnis');
  });

  // ── Multiple talents (Human) ────────────────────────────────────────────

  it('two talent cards rendered for human', () => {
    generateCharacter.mockReturnValueOnce({
      ...structuredClone(MOCK_CHAR),
      ancestry: 'Human',
      talents: ['+1 to melee and ranged attacks', '+2 to Strength, Dexterity, or Constitution'],
    });
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    expect(container.textContent).toContain('Talent 1');
    expect(container.textContent).toContain('Talent 2');
  });

  // ── Re-roll button ──────────────────────────────────────────────────────

  it('re-roll button calls generateCharacter again', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    container.querySelector('.generate-reroll-btn').click();
    expect(generateCharacter).toHaveBeenCalledTimes(2);
  });

  it('re-roll renders a new character sheet', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    container.querySelector('.generate-reroll-btn').click();
    expect(container.querySelector('.character-sheet')).not.toBeNull();
  });

  // ── Back navigation ─────────────────────────────────────────────────────

  it('back button restores the menu', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    container.querySelector('.library-back-btn').click();
    expect(container.querySelector('.library-nav')).not.toBeNull();
  });

  it('back button removes the character sheet', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    container.querySelector('.library-back-btn').click();
    expect(container.querySelector('.character-sheet')).toBeNull();
  });

  it('back button restores "Generate" title', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    container.querySelector('.library-back-btn').click();
    expect(container.querySelector('.page-title').textContent).toBe('Generate');
  });
});
