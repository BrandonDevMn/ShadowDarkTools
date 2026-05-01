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

const MOCK_HOOK = { hook: 'Rescue the Goblet Of the evil wizard', site: 'Mines of the Cursed Flame' };
const MOCK_NPC  = {
  name: 'Hesta', ancestry: 'Human', alignment: 'Lawful', age: 'Adult',
  wealth: 'Standard', appearance: 'Balding', does: 'Spits', secret: 'Hiding a fugitive',
  occupation: 'Gravedigger', epithet: 'The Gray', reaction: 'Neutral', reactionRoll: 9,
};
const MOCK_ENCOUNTER = { terrain: 'Forest', roll: 42, encounter: 'Wolves in the trees' };
const MOCK_EVENT     = { roll: 1, event: 'A fissure opens' };
const MOCK_RUMOR     = { roll: 1, rumor: 'An armored beast rampages' };
const MOCK_OATH      = { oath: 'The duke will help you' };
const MOCK_SECRET    = { secret: 'The True Name of The king' };
const MOCK_BLESSING  = { name: 'Wraithsight', description: 'See invisible creatures' };
const MOCK_ITEM      = { name: 'Amulet of Vitality', description: 'CON becomes 18 (+4)' };
const MOCK_DUNGEON   = {
  size: 'Small', type: 'Cave', dangerLevel: 'Risky',
  rooms: [
    { number: 1, roll: 2, label: 'Empty',        isObjective: false, detail: null },
    { number: 2, roll: 5, label: 'Solo Monster', isObjective: false, detail: 'Near · Hunting' },
    { number: 3, roll: 9, label: 'Treasure',     isObjective: true,  detail: null },
  ],
};

vi.mock('../../app/js/gm-generators.js', () => ({
  generateAdventureHook: vi.fn(() => ({ ...MOCK_HOOK })),
  generateNPC:           vi.fn(() => ({ ...MOCK_NPC })),
  generateEncounter:     vi.fn((terrain) => ({ ...MOCK_ENCOUNTER, terrain })),
  getTerrainNames:       vi.fn(() => ['Arctic', 'Forest']),
  generateRandomEvent:   vi.fn(() => ({ ...MOCK_EVENT })),
  generateRumor:         vi.fn(() => ({ ...MOCK_RUMOR })),
  generateOath:          vi.fn(() => ({ ...MOCK_OATH })),
  generateSecret:        vi.fn(() => ({ ...MOCK_SECRET })),
  generateBlessing:      vi.fn(() => ({ ...MOCK_BLESSING })),
  generateMagicItem:     vi.fn(() => ({ ...MOCK_ITEM })),
  generateDungeon:       vi.fn(() => ({
    size: MOCK_DUNGEON.size, type: MOCK_DUNGEON.type,
    dangerLevel: MOCK_DUNGEON.dangerLevel,
    rooms: MOCK_DUNGEON.rooms.map((r) => ({ ...r })),
  })),
  generateMarch:         vi.fn(() => ({
    terrain: 'Forest/Jungle', danger: 'Risky', hasPOI: true,
    poi: { location: 'Village', development: 'Abandoned', cataclysm: null, settlementName: 'Lastwatch' },
  })),
  getOverlandTerrains:   vi.fn(() => ['Desert/Arctic', 'Swamp', 'Grassland', 'Forest/Jungle']),
  getOverlandDangerLevels: vi.fn(() => ['Safe', 'Unsafe', 'Risky', 'Deadly']),
}));

import { renderGeneratePage } from '../../app/js/generate-page.js';
import { generateCharacter }  from '../../app/js/character-generator.js';
import {
  generateAdventureHook, generateNPC, generateEncounter,
  generateRandomEvent, generateRumor, generateOath,
  generateSecret, generateBlessing, generateMagicItem,
  generateDungeon, generateMarch,
} from '../../app/js/gm-generators.js';

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

  it('exported text starts with name then labeled identity fields', async () => {
    renderGeneratePage(container);
    container.querySelector('.library-nav__row').click();
    vi.advanceTimersByTime(1000);
    container.querySelector('.character-export-btn').click();
    await vi.runAllTimersAsync();
    const [{ text }] = navigator.share.mock.calls[0];
    expect(text).toContain('Aldric\nAncestry: Human\nClass: Fighter\nLevel: 1\nAlignment: Lawful');
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

  // ── GM Tools menu ─────────────────────────────────────────────────────────

  it('menu shows a Player Tools section heading', () => {
    renderGeneratePage(container);
    const headings = Array.from(container.querySelectorAll('.generate-section__heading')).map((h) => h.textContent);
    expect(headings).toContain('Player Tools');
  });

  it('menu shows a GM Tools section heading', () => {
    renderGeneratePage(container);
    const headings = Array.from(container.querySelectorAll('.generate-section__heading')).map((h) => h.textContent);
    expect(headings).toContain('GM Tools');
  });

  const GM_ROWS = [
    'Adventure Hook', 'NPC', 'Random Encounter', 'Random Event',
    'Rumor', 'Oath', 'Secret', 'Blessing', 'Magic Item', 'Dungeon', 'Overworld March',
  ];

  GM_ROWS.forEach((label) => {
    it(`menu shows a "${label}" row`, () => {
      renderGeneratePage(container);
      const labels = Array.from(container.querySelectorAll('.library-nav__row-label')).map((el) => el.textContent);
      expect(labels).toContain(label);
    });
  });

  // ── Adventure Hook ─────────────────────────────────────────────────────────

  it('clicking Adventure Hook shows rolling animation', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'Adventure Hook');
    expect(container.querySelector('.generate-die')).not.toBeNull();
  });

  it('after animation, Adventure Hook result shows page title', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'Adventure Hook');
    vi.advanceTimersByTime(1000);
    expect(container.querySelector('.page-title').textContent).toBe('Adventure Hook');
  });

  it('Adventure Hook result shows hook text', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'Adventure Hook');
    vi.advanceTimersByTime(1000);
    const descs = Array.from(container.querySelectorAll('.reference-card__description')).map((el) => el.textContent);
    expect(descs.some((d) => d.includes('Rescue the Goblet'))).toBe(true);
  });

  it('Adventure Hook result shows site name card', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'Adventure Hook');
    vi.advanceTimersByTime(1000);
    const names = Array.from(container.querySelectorAll('.reference-card__name')).map((el) => el.textContent);
    expect(names).toContain('Site Name');
  });

  // ── NPC ────────────────────────────────────────────────────────────────────

  it('after animation, NPC result shows NPC name as page title', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'NPC');
    vi.advanceTimersByTime(1000);
    expect(container.querySelector('.page-title').textContent).toBe('Hesta');
  });

  it('NPC result shows ancestry and alignment', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'NPC');
    vi.advanceTimersByTime(1000);
    const name = container.querySelector('.reference-card__name').textContent;
    expect(name).toContain('Human');
    expect(name).toContain('Lawful');
  });

  it('NPC result shows an Appearance card', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'NPC');
    vi.advanceTimersByTime(1000);
    const names = Array.from(container.querySelectorAll('.reference-card__name')).map((el) => el.textContent);
    expect(names).toContain('Appearance');
  });

  it('NPC result shows a Secret card', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'NPC');
    vi.advanceTimersByTime(1000);
    const names = Array.from(container.querySelectorAll('.reference-card__name')).map((el) => el.textContent);
    expect(names).toContain('Secret');
  });

  it('NPC result shows First Impression with reaction text', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'NPC');
    vi.advanceTimersByTime(1000);
    const cards = Array.from(container.querySelectorAll('.reference-card'));
    const reactionCard = cards.find((c) => c.querySelector('.reference-card__name')?.textContent === 'First Impression');
    expect(reactionCard).toBeDefined();
    expect(reactionCard.querySelector('.reference-card__description').textContent).toBe('Neutral');
  });

  // ── Random Encounter ───────────────────────────────────────────────────────

  it('clicking Random Encounter shows terrain picker, not rolling', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'Random Encounter');
    expect(container.querySelector('.page-title').textContent).toBe('Choose Terrain');
    expect(container.querySelector('.generate-die')).toBeNull();
  });

  it('terrain picker lists the available terrains', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'Random Encounter');
    const labels = Array.from(container.querySelectorAll('.library-nav__row-label')).map((el) => el.textContent);
    expect(labels).toContain('Arctic');
    expect(labels).toContain('Forest');
  });

  it('choosing a terrain starts the rolling animation', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'Random Encounter');
    container.querySelector('.library-nav__row').click(); // first terrain (Arctic)
    expect(container.querySelector('.generate-die')).not.toBeNull();
  });

  it('after animation, encounter result shows terrain in title', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'Random Encounter');
    container.querySelector('.library-nav__row').click();
    vi.advanceTimersByTime(1000);
    expect(container.querySelector('.page-title').textContent).toMatch(/Encounter:/);
  });

  it('encounter result shows encounter text', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'Random Encounter');
    container.querySelector('.library-nav__row').click();
    vi.advanceTimersByTime(1000);
    const descs = Array.from(container.querySelectorAll('.reference-card__description')).map((el) => el.textContent);
    expect(descs.some((d) => d.includes('Wolves in the trees'))).toBe(true);
  });

  // ── Single-card GM results ─────────────────────────────────────────────────

  const SINGLE_CARD_TOOLS = [
    { label: 'Random Event', expectedText: 'A fissure opens' },
    { label: 'Rumor',        expectedText: 'An armored beast rampages' },
    { label: 'Oath',         expectedText: 'The duke will help you' },
    { label: 'Secret',       expectedText: 'The True Name of The king' },
  ];

  SINGLE_CARD_TOOLS.forEach(({ label, expectedText }) => {
    it(`${label} result shows expected text after animation`, () => {
      renderGeneratePage(container);
      clickGMRow(container, label);
      vi.advanceTimersByTime(1000);
      const descs = Array.from(container.querySelectorAll('.reference-card__description')).map((el) => el.textContent);
      expect(descs.some((d) => d.includes(expectedText))).toBe(true);
    });
  });

  it('Blessing result shows blessing name and description', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'Blessing');
    vi.advanceTimersByTime(1000);
    const names = Array.from(container.querySelectorAll('.reference-card__name')).map((el) => el.textContent);
    expect(names).toContain('Wraithsight');
    const descs = Array.from(container.querySelectorAll('.reference-card__description')).map((el) => el.textContent);
    expect(descs.some((d) => d.includes('See invisible'))).toBe(true);
  });

  it('Magic Item result shows item name and description', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'Magic Item');
    vi.advanceTimersByTime(1000);
    const names = Array.from(container.querySelectorAll('.reference-card__name')).map((el) => el.textContent);
    expect(names).toContain('Amulet of Vitality');
    const descs = Array.from(container.querySelectorAll('.reference-card__description')).map((el) => el.textContent);
    expect(descs.some((d) => d.includes('CON becomes 18'))).toBe(true);
  });

  // ── Back navigation from GM results ───────────────────────────────────────

  it('back button on GM result returns to the menu', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'Random Event');
    vi.advanceTimersByTime(1000);
    container.querySelector('.library-back-btn').click();
    expect(container.querySelector('.page-title').textContent).toBe('Generate');
  });

  it('back button on terrain picker returns to the menu', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'Random Encounter');
    container.querySelector('.library-back-btn').click();
    expect(container.querySelector('.page-title').textContent).toBe('Generate');
  });

  // ── Dungeon ────────────────────────────────────────────────────────────────

  it('clicking Dungeon shows rolling animation', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'Dungeon');
    expect(container.querySelector('.generate-die')).not.toBeNull();
  });

  it('after animation, Dungeon page title is "Dungeon"', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'Dungeon');
    vi.advanceTimersByTime(1000);
    expect(container.querySelector('.page-title').textContent).toBe('Dungeon');
  });

  it('Dungeon result shows size and type in summary card', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'Dungeon');
    vi.advanceTimersByTime(1000);
    const names = Array.from(container.querySelectorAll('.reference-card__name')).map((el) => el.textContent);
    expect(names.some((n) => n.includes('Small') && n.includes('Cave'))).toBe(true);
  });

  it('Dungeon result shows danger level in summary card meta', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'Dungeon');
    vi.advanceTimersByTime(1000);
    const metas = Array.from(container.querySelectorAll('.reference-card__meta')).map((el) => el.textContent);
    expect(metas.some((m) => m.includes('Risky'))).toBe(true);
  });

  it('Dungeon result shows a card for each room', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'Dungeon');
    vi.advanceTimersByTime(1000);
    const names = Array.from(container.querySelectorAll('.reference-card__name')).map((el) => el.textContent);
    expect(names).toContain('Room 1');
    expect(names).toContain('Room 2');
    expect(names).toContain('Room 3');
  });

  it('objective room card meta contains ★', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'Dungeon');
    vi.advanceTimersByTime(1000);
    const metas = Array.from(container.querySelectorAll('.reference-card__meta')).map((el) => el.textContent);
    expect(metas.some((m) => m.includes('★'))).toBe(true);
  });

  it('room with detail shows description text', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'Dungeon');
    vi.advanceTimersByTime(1000);
    const descs = Array.from(container.querySelectorAll('.reference-card__description')).map((el) => el.textContent);
    expect(descs.some((d) => d.includes('Near · Hunting'))).toBe(true);
  });

  it('back button on Dungeon result returns to the menu', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'Dungeon');
    vi.advanceTimersByTime(1000);
    container.querySelector('.library-back-btn').click();
    expect(container.querySelector('.page-title').textContent).toBe('Generate');
  });

  it('Re-roll button on Dungeon result generates a new dungeon', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'Dungeon');
    vi.advanceTimersByTime(1000);
    container.querySelector('.character-export-btn').click(); // Re-roll btn
    expect(container.querySelector('.generate-die')).not.toBeNull();
    vi.advanceTimersByTime(1000);
    expect(generateDungeon).toHaveBeenCalledTimes(2);
  });

  // ── March ──────────────────────────────────────────────────────────────────

  it('clicking March shows picker with title "March", no rolling animation', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'Overworld March');
    expect(container.querySelector('.page-title').textContent).toBe('March');
    expect(container.querySelector('.generate-die')).toBeNull();
  });

  it('march picker shows a back button reading "‹ Generate"', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'Overworld March');
    expect(container.querySelector('.library-back-btn').textContent).toBe('‹ Generate');
  });

  it('march picker shows a terrain select with overland terrain options', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'Overworld March');
    const sel = container.querySelector('.march-select');
    expect(sel).not.toBeNull();
    const options = Array.from(sel.querySelectorAll('option')).map((o) => o.value);
    expect(options).toContain('Desert/Arctic');
    expect(options).toContain('Forest/Jungle');
  });

  it('march picker back button returns to the menu', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'Overworld March');
    container.querySelector('.library-back-btn').click();
    expect(container.querySelector('.page-title').textContent).toBe('Generate');
  });

  it('clicking "March →" starts the rolling animation', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'Overworld March');
    container.querySelector('.march-btn').click();
    expect(container.querySelector('.generate-die')).not.toBeNull();
  });

  it('after animation, march result page title is "New Hex"', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'Overworld March');
    container.querySelector('.march-btn').click();
    vi.advanceTimersByTime(1000);
    expect(container.querySelector('.page-title').textContent).toBe('New Hex');
  });

  it('march result shows new terrain as card name', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'Overworld March');
    container.querySelector('.march-btn').click();
    vi.advanceTimersByTime(1000);
    const names = Array.from(container.querySelectorAll('.reference-card__name')).map((el) => el.textContent);
    expect(names).toContain('Forest/Jungle');
  });

  it('march result shows danger as card meta', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'Overworld March');
    container.querySelector('.march-btn').click();
    vi.advanceTimersByTime(1000);
    const metas = Array.from(container.querySelectorAll('.reference-card__meta')).map((el) => el.textContent);
    expect(metas).toContain('Risky');
  });

  it('march result shows POI card when hasPOI is true', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'Overworld March');
    container.querySelector('.march-btn').click();
    vi.advanceTimersByTime(1000);
    const names = Array.from(container.querySelectorAll('.reference-card__name')).map((el) => el.textContent);
    expect(names).toContain('Point of Interest');
  });

  it('POI card meta shows settlement name when present', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'Overworld March');
    container.querySelector('.march-btn').click();
    vi.advanceTimersByTime(1000);
    const metas = Array.from(container.querySelectorAll('.reference-card__meta')).map((el) => el.textContent);
    expect(metas.some((m) => m.includes('Lastwatch'))).toBe(true);
  });

  it('POI card shows development text as description', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'Overworld March');
    container.querySelector('.march-btn').click();
    vi.advanceTimersByTime(1000);
    const descs = Array.from(container.querySelectorAll('.reference-card__description')).map((el) => el.textContent);
    expect(descs.some((d) => d.includes('Abandoned'))).toBe(true);
  });

  it('back button on march result goes to picker with new terrain pre-filled', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'Overworld March');
    container.querySelector('.march-btn').click();
    vi.advanceTimersByTime(1000);
    // Back on result should go to picker showing the NEW terrain (Forest/Jungle)
    container.querySelector('.library-back-btn').click();
    expect(container.querySelector('.page-title').textContent).toBe('March');
    const sel = container.querySelector('.march-select');
    expect(sel.value).toBe('Forest/Jungle');
  });

  it('re-roll on march result calls generateMarch again', () => {
    renderGeneratePage(container);
    clickGMRow(container, 'Overworld March');
    container.querySelector('.march-btn').click();
    vi.advanceTimersByTime(1000);
    container.querySelector('.character-export-btn').click(); // re-roll
    vi.advanceTimersByTime(1000);
    expect(generateMarch).toHaveBeenCalledTimes(2);
  });
});

// ── Helper ────────────────────────────────────────────────────────────────

/** Click the nav row in the GM Tools section that matches `label`. */
function clickGMRow(container, label) {
  const rows = Array.from(container.querySelectorAll('.library-nav__row'));
  const row  = rows.find((r) => r.querySelector('.library-nav__row-label')?.textContent === label);
  if (!row) throw new Error(`No row found with label "${label}"`);
  row.click();
}
