import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const MOCK_CHAR = {
  name: 'Aldric',
  ancestry: 'Human',
  class: 'Fighter',
  level: 1,
  alignment: 'Lawful',
  hitDie: 'd8',
  hp: 9,
  ac: 10,
  gold: 45,
  gearSlots: 12,
  armor: 'All armor and shields',
  weapons: 'All weapons',
  classAbilities: [
    { name: 'Hauler',         description: 'Add your Constitution modifier to gear slots.' },
    { name: 'Weapon Mastery', description: 'Choose a weapon type; +1 to attack and damage.' },
    { name: 'Grit',           description: 'Choose STR or DEX — advantage on those checks.' },
  ],
  stats: {
    str: { score: 15, mod: 2 },
    dex: { score: 10, mod: 0 },
    con: { score: 13, mod: 1 },
    int: { score: 8,  mod: -1 },
    wis: { score: 12, mod: 1 },
    cha: { score: 7,  mod: -1 },
  },
  background: { roll: 11, name: 'Mercenary', description: 'You sold your sword to whoever paid. Start with a mercenary contract and a brand mark.' },
  talents: ['+1 to melee and ranged attacks'],
  deity: null,
  spells: [
    { class: 'wizard', tier: 1, name: 'Magic Missile', range: 'Far', duration: 'Instant', description: 'Three darts deal 1d4 damage each.' },
  ],
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
    // Mock Web Share API
    Object.defineProperty(navigator, 'share', {
      value: vi.fn().mockResolvedValue(undefined),
      configurable: true,
      writable: true,
    });
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

  // ── Level 2: rolling animation ─────────────────────────────────────────

  it('clicking the row immediately shows Rolling... title', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    expect(container.querySelector('.page-title').textContent).toBe('Rolling...');
  });

  it('clicking the row shows the die graphic', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    expect(container.querySelector('.generate-die')).not.toBeNull();
  });

  it('die graphic shows 6 pips', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    expect(container.querySelectorAll('.generate-die__pip').length).toBe(6);
  });

  it('does not call generateCharacter immediately when rolling starts', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    expect(generateCharacter).not.toHaveBeenCalled();
  });

  it('rolling screen shows a back button reading "‹ Generate"', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    expect(container.querySelector('.library-back-btn').textContent).toBe('‹ Generate');
  });

  // ── Level 3: character sheet (after animation) ─────────────────────────

  it('after 1 second the character sheet is shown', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    vi.advanceTimersByTime(1000);
    expect(container.querySelector('.character-sheet')).not.toBeNull();
  });

  it('generateCharacter is called once after the animation completes', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    vi.advanceTimersByTime(1000);
    expect(generateCharacter).toHaveBeenCalledOnce();
  });

  it('character sheet shows the character name as page title', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    vi.advanceTimersByTime(1000);
    expect(container.querySelector('.page-title').textContent).toBe('Aldric');
  });

  it('character sheet shows the Re-roll button', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    vi.advanceTimersByTime(1000);
    expect(container.querySelector('.generate-reroll-btn')).not.toBeNull();
  });

  it('character sheet shows HP as current/max', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    vi.advanceTimersByTime(1000);
    expect(container.querySelector('.character-sheet__hp-value').textContent).toBe('9/9');
  });

  it('character sheet shows gold', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    vi.advanceTimersByTime(1000);
    const values = Array.from(container.querySelectorAll('.character-sheet__hp-value'));
    expect(values.some((el) => el.textContent === '45 gp')).toBe(true);
  });

  it('character sheet shows AC', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    vi.advanceTimersByTime(1000);
    const values = Array.from(container.querySelectorAll('.character-sheet__hp-value'));
    expect(values.some((el) => el.textContent === '10')).toBe(true);
  });

  it('character sheet shows gear slots', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    vi.advanceTimersByTime(1000);
    const values = Array.from(container.querySelectorAll('.character-sheet__hp-value'));
    expect(values.some((el) => el.textContent === '12')).toBe(true);
  });

  it('AC stat shows a formula line', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    vi.advanceTimersByTime(1000);
    const formulas = Array.from(container.querySelectorAll('.character-sheet__hp-formula')).map((el) => el.textContent);
    expect(formulas.some((f) => f.includes('DEX'))).toBe(true);
  });

  it('gear slots stat shows a formula line', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    vi.advanceTimersByTime(1000);
    const formulas = Array.from(container.querySelectorAll('.character-sheet__hp-formula')).map((el) => el.textContent);
    expect(formulas.some((f) => f.includes('STR'))).toBe(true);
  });

  it('character sheet shows a proficiencies card', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    vi.advanceTimersByTime(1000);
    const cardNames = Array.from(container.querySelectorAll('.reference-card__name')).map((el) => el.textContent);
    expect(cardNames).toContain('Proficiencies');
  });

  it('proficiencies card lists armor and weapons', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    vi.advanceTimersByTime(1000);
    const cards = Array.from(container.querySelectorAll('.reference-card'));
    const profCard = cards.find((c) => c.querySelector('.reference-card__name')?.textContent === 'Proficiencies');
    expect(profCard).toBeDefined();
    const desc = profCard.querySelector('.reference-card__description').textContent;
    expect(desc).toContain('All armor and shields');
    expect(desc).toContain('All weapons');
  });

  it('character sheet renders a card for each class ability', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    vi.advanceTimersByTime(1000);
    const cardNames = Array.from(container.querySelectorAll('.reference-card__name')).map((el) => el.textContent);
    expect(cardNames).toContain('Hauler');
    expect(cardNames).toContain('Weapon Mastery');
    expect(cardNames).toContain('Grit');
  });

  it('class ability cards are labelled "Class Feature"', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    vi.advanceTimersByTime(1000);
    const metas = Array.from(container.querySelectorAll('.reference-card__meta')).map((el) => el.textContent);
    expect(metas.filter((m) => m === 'Class Feature').length).toBe(3);
  });

  it('character sheet renders a card for each spell', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    vi.advanceTimersByTime(1000);
    const cardNames = Array.from(container.querySelectorAll('.reference-card__name')).map((el) => el.textContent);
    expect(cardNames).toContain('Magic Missile');
  });

  it('spell card shows meta line with class label and tier', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    vi.advanceTimersByTime(1000);
    const metas = Array.from(container.querySelectorAll('.reference-card__meta')).map((el) => el.textContent);
    expect(metas.some((m) => m.includes('Wizard') && m.includes('T1'))).toBe(true);
  });

  it('spell card shows description', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    vi.advanceTimersByTime(1000);
    const descs = Array.from(container.querySelectorAll('.reference-card__description')).map((el) => el.textContent);
    expect(descs.some((d) => d.includes('Three darts'))).toBe(true);
  });

  it('character sheet back button reads "‹ Generate"', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    vi.advanceTimersByTime(1000);
    expect(container.querySelector('.library-back-btn').textContent).toBe('‹ Generate');
  });

  it('die graphic is gone after 1 second', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    vi.advanceTimersByTime(1000);
    expect(container.querySelector('.generate-die')).toBeNull();
  });

  // ── Re-roll ─────────────────────────────────────────────────────────────

  it('Re-roll shows the die again', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    vi.advanceTimersByTime(1000);
    container.querySelector('.generate-reroll-btn').click();
    expect(container.querySelector('.generate-die')).not.toBeNull();
  });

  it('Re-roll calls generateCharacter a second time after animation', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    vi.advanceTimersByTime(1000);
    container.querySelector('.generate-reroll-btn').click();
    vi.advanceTimersByTime(1000);
    expect(generateCharacter).toHaveBeenCalledTimes(2);
  });

  // ── Back navigation ─────────────────────────────────────────────────────

  it('back during rolling returns to the menu', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    container.querySelector('.library-back-btn').click();
    expect(container.querySelector('.page-title').textContent).toBe('Generate');
  });

  it('after cancelling roll, advancing time does not call generateCharacter', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    container.querySelector('.library-back-btn').click();
    vi.advanceTimersByTime(1000);
    expect(generateCharacter).not.toHaveBeenCalled();
  });

  // ── Export ──────────────────────────────────────────────────────────────

  it('export button appears on the character sheet', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    vi.advanceTimersByTime(1000);
    expect(container.querySelector('.character-export-btn')).not.toBeNull();
  });

  it('export button is not shown on the menu', () => {
    renderGeneratePage(container);
    expect(container.querySelector('.character-export-btn')).toBeNull();
  });

  it('export button is not shown during rolling', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    expect(container.querySelector('.character-export-btn')).toBeNull();
  });

  it('export button and back button are in a .character-header row', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    vi.advanceTimersByTime(1000);
    const header = container.querySelector('.character-header');
    expect(header).not.toBeNull();
    expect(header.querySelector('.library-back-btn')).not.toBeNull();
    expect(header.querySelector('.character-export-btn')).not.toBeNull();
  });

  it('clicking export calls navigator.share', async () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    vi.advanceTimersByTime(1000);
    container.querySelector('.character-export-btn').click();
    await vi.runAllTimersAsync();
    expect(navigator.share).toHaveBeenCalled();
  });

  it('exported text includes the character name and identity on one line', async () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    vi.advanceTimersByTime(1000);
    container.querySelector('.character-export-btn').click();
    await vi.runAllTimersAsync();
    const [{ text }] = navigator.share.mock.calls[0];
    expect(text).toContain('Aldric · Human Fighter');
  });

  // ── Inventory in export ─────────────────────────────────────────────────

  it('exported text includes an Inventory section', async () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    vi.advanceTimersByTime(1000);
    container.querySelector('.character-export-btn').click();
    await vi.runAllTimersAsync();
    const [{ text }] = navigator.share.mock.calls[0];
    expect(text).toContain('Inventory');
  });

  it('exported inventory contains items with x1 quantity', async () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    vi.advanceTimersByTime(1000);
    container.querySelector('.character-export-btn').click();
    await vi.runAllTimersAsync();
    const [{ text }] = navigator.share.mock.calls[0];
    expect(text).toMatch(/x1/);
  });

  it('back on character sheet returns to the menu', () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    vi.advanceTimersByTime(1000);
    container.querySelector('.library-back-btn').click();
    expect(container.querySelector('.page-title').textContent).toBe('Generate');
    expect(container.querySelector('.library-nav')).not.toBeNull();
  });
});
