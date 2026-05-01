import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

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
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
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

  it('renders a library-nav with a "Generate a Character" row', () => {
    renderGeneratePage(container);
    const labels = Array.from(container.querySelectorAll('.library-nav__row-label')).map((el) => el.textContent);
    expect(labels).toContain('Generate a Character');
  });

  it('no back button shown on the menu', () => {
    renderGeneratePage(container);
    expect(container.querySelector('.library-back-btn')).toBeNull();
  });

  it('does not call generateCharacter on initial load', () => {
    renderGeneratePage(container);
    expect(generateCharacter).not.toHaveBeenCalled();
  });

  // ── Level 2: landing screen ─────────────────────────────────────────────

  it('clicking the row shows the landing screen', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    expect(container.querySelector('.page-title').textContent).toBe('Generate a Character');
  });

  it('landing screen shows a Generate button', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    expect(container.querySelector('.generate-btn')).not.toBeNull();
    expect(container.querySelector('.generate-btn').textContent).toBe('Generate');
  });

  it('landing screen shows a back button reading "‹ Generate"', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    expect(container.querySelector('.library-back-btn').textContent).toBe('‹ Generate');
  });

  it('landing screen does not call generateCharacter', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    expect(generateCharacter).not.toHaveBeenCalled();
  });

  // ── Level 3: rolling animation ──────────────────────────────────────────

  it('clicking Generate shows Rolling... title', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    container.querySelector('.generate-btn').click();
    expect(container.querySelector('.page-title').textContent).toBe('Rolling...');
  });

  it('clicking Generate shows the die graphic', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    container.querySelector('.generate-btn').click();
    expect(container.querySelector('.generate-die')).not.toBeNull();
  });

  it('die graphic shows 6 pips', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    container.querySelector('.generate-btn').click();
    expect(container.querySelectorAll('.generate-die__pip').length).toBe(6);
  });

  it('does not call generateCharacter immediately when rolling starts', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    container.querySelector('.generate-btn').click();
    expect(generateCharacter).not.toHaveBeenCalled();
  });

  it('rolling screen shows a back button', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    container.querySelector('.generate-btn').click();
    expect(container.querySelector('.library-back-btn')).not.toBeNull();
  });

  // ── Level 4: character sheet (after animation) ──────────────────────────

  it('after 1 second the character sheet is shown', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    container.querySelector('.generate-btn').click();
    vi.advanceTimersByTime(1000);
    expect(container.querySelector('.character-sheet')).not.toBeNull();
  });

  it('generateCharacter is called once after the animation completes', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    container.querySelector('.generate-btn').click();
    vi.advanceTimersByTime(1000);
    expect(generateCharacter).toHaveBeenCalledOnce();
  });

  it('character sheet shows the character name as page title', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    container.querySelector('.generate-btn').click();
    vi.advanceTimersByTime(1000);
    expect(container.querySelector('.page-title').textContent).toBe('Aldric');
  });

  it('character sheet shows the Re-roll button', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    container.querySelector('.generate-btn').click();
    vi.advanceTimersByTime(1000);
    expect(container.querySelector('.generate-reroll-btn')).not.toBeNull();
  });

  it('character sheet shows HP', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    container.querySelector('.generate-btn').click();
    vi.advanceTimersByTime(1000);
    expect(container.querySelector('.character-sheet__hp-value').textContent).toBe('9');
  });

  it('character sheet back button reads "‹ Generate"', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    container.querySelector('.generate-btn').click();
    vi.advanceTimersByTime(1000);
    expect(container.querySelector('.library-back-btn').textContent).toBe('‹ Generate');
  });

  it('die graphic is gone after 1 second', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    container.querySelector('.generate-btn').click();
    vi.advanceTimersByTime(1000);
    expect(container.querySelector('.generate-die')).toBeNull();
  });

  // ── Re-roll ─────────────────────────────────────────────────────────────

  it('Re-roll shows the die again', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    container.querySelector('.generate-btn').click();
    vi.advanceTimersByTime(1000);
    container.querySelector('.generate-reroll-btn').click();
    expect(container.querySelector('.generate-die')).not.toBeNull();
  });

  it('Re-roll calls generateCharacter a second time after animation', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    container.querySelector('.generate-btn').click();
    vi.advanceTimersByTime(1000);
    container.querySelector('.generate-reroll-btn').click();
    vi.advanceTimersByTime(1000);
    expect(generateCharacter).toHaveBeenCalledTimes(2);
  });

  // ── Back navigation ─────────────────────────────────────────────────────

  it('back on landing returns to the menu', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    container.querySelector('.library-back-btn').click();
    expect(container.querySelector('.page-title').textContent).toBe('Generate');
  });

  it('back on landing removes the Generate button', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    container.querySelector('.library-back-btn').click();
    expect(container.querySelector('.generate-btn')).toBeNull();
  });

  it('back during rolling cancels the animation and shows landing', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    container.querySelector('.generate-btn').click();
    container.querySelector('.library-back-btn').click();
    expect(container.querySelector('.page-title').textContent).toBe('Generate a Character');
  });

  it('after cancelling roll, advancing time does not call generateCharacter', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    container.querySelector('.generate-btn').click();
    container.querySelector('.library-back-btn').click();
    vi.advanceTimersByTime(1000);
    expect(generateCharacter).not.toHaveBeenCalled();
  });

  it('back on character sheet returns to landing screen', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    container.querySelector('.generate-btn').click();
    vi.advanceTimersByTime(1000);
    container.querySelector('.library-back-btn').click();
    expect(container.querySelector('.generate-btn')).not.toBeNull();
    expect(container.querySelector('.page-title').textContent).toBe('Generate a Character');
  });
});
