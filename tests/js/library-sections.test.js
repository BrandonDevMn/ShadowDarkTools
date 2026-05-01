import { describe, it, expect, vi } from 'vitest';

vi.mock('../../app/js/spells-data.js', () => ({
  SPELLS: [
    { class: 'wizard', tier: 1, name: 'Alarm',          range: 'Close', duration: '1 day',     description: 'Touch object to set alarm.' },
    { class: 'wizard', tier: 1, name: 'Magic Missile',  range: 'Far',   duration: 'Instant',   description: '1d4+1 force damage.' },
    { class: 'priest', tier: 1, name: 'Cure Wounds',    range: 'Touch', duration: 'Instant',   description: 'Restore 1d6 HP.' },
    { class: 'priest', tier: 1, name: 'Light',          range: 'Near',  duration: '1 hour',    description: 'Object glows.' },
    { class: 'wizard', tier: 1, name: 'Light',          range: 'Near',  duration: '1 hour',    description: 'Object glows (wizard).' },
  ],
}));

vi.mock('../../app/js/ancestries-data.js', () => ({
  ANCESTRIES: [
    { name: 'Human', description: 'Ambitious folk.', traitName: 'Ambitious', traitDescription: 'Extra background roll.' },
    { name: 'Elf',   description: 'Long-lived seers.', traitName: 'Farsight',  traitDescription: '+1 to ranged or spellcasting.' },
  ],
}));

vi.mock('../../app/js/classes-data.js', () => ({
  CLASSES: [
    { name: 'Fighter', description: 'Martial master.', hitDie: 'd8', armor: 'All armor', weapons: 'All weapons',
      abilities: [{ name: 'Grit', description: 'Succeed on one check per day.' }] },
    { name: 'Wizard', description: 'Arcane scholar.', hitDie: 'd4', armor: 'None', weapons: 'Staves, daggers',
      abilities: [{ name: 'Magic Items', description: 'Can use all magic items.' }] },
  ],
}));

vi.mock('../../app/js/backgrounds-data.js', () => ({
  BACKGROUNDS: [
    { roll: 1,  name: 'Urchin',  description: 'City streets background.' },
    { roll: 2,  name: 'Wanted',  description: 'Bounty on your head.'     },
    { roll: 11, name: 'Scholar', description: 'Scholarly pursuits.'       },
  ],
}));

vi.mock('../../app/js/equipment-data.js', () => ({
  EQUIPMENT: [
    { category: 'weapon', name: 'Dagger',  cost: '1 gp',  damage: '1d4', range: 'Close', notes: 'Finesse'        },
    { category: 'armor',  name: 'Leather', cost: '10 gp', armorClass: '11+DEX',          notes: 'Light'          },
    { category: 'gear',   name: 'Torch',   cost: '1 cp',                                  notes: '1 hour of light' },
  ],
}));

import {
  spellsSection,
  ancestriesSection,
  classesSection,
  abilityScoresSection,
  backgroundsSection,
  alignmentsSection,
  languagesSection,
  equipmentSection,
  SECTIONS,
} from '../../app/js/library-sections.js';

function makeContainer() {
  return document.createElement('div');
}

// ── Shared descriptor shape tests ──────────────────────────────────────────

const PLAYER_SECTIONS = [
  spellsSection, ancestriesSection, classesSection, abilityScoresSection,
  backgroundsSection, alignmentsSection, languagesSection, equipmentSection,
];

PLAYER_SECTIONS.forEach((section) => {
  describe(`${section.label} descriptor shape`, () => {
    it('has an id string', () => { expect(typeof section.id).toBe('string'); });
    it('has a label string', () => { expect(typeof section.label).toBe('string'); });
    it('has a non-empty items array', () => {
      expect(Array.isArray(section.items)).toBe(true);
      expect(section.items.length).toBeGreaterThan(0);
    });
    it('items are sorted alphabetically', () => {
      const labels = section.items.map((i) => i.label);
      expect(labels).toEqual([...labels].sort((a, b) => a.localeCompare(b)));
    });
    it('each item has id and label strings', () => {
      section.items.forEach((item) => {
        expect(typeof item.id).toBe('string');
        expect(typeof item.label).toBe('string');
      });
    });
    it('renderDetail is a function', () => { expect(typeof section.renderDetail).toBe('function'); });
    it('renderDetail does nothing for unknown id', () => {
      const c = makeContainer();
      expect(() => section.renderDetail(c, '__unknown__')).not.toThrow();
    });
  });
});

// ── SECTIONS export ────────────────────────────────────────────────────────

describe('SECTIONS', () => {
  it('is an array', () => { expect(Array.isArray(SECTIONS)).toBe(true); });

  it('has 31 entries', () => { expect(SECTIONS.length).toBe(31); });

  it('is sorted alphabetically by label', () => {
    const labels = SECTIONS.map((s) => s.label);
    expect(labels).toEqual([...labels].sort((a, b) => a.localeCompare(b)));
  });

  it('contains spellsSection', () => {
    expect(SECTIONS.some((s) => s.id === 'spells')).toBe(true);
  });

  it('contains all 8 player sections', () => {
    const ids = SECTIONS.map((s) => s.id);
    ['spells', 'ancestries', 'classes', 'ability-scores', 'backgrounds',
     'alignments', 'languages', 'equipment'].forEach((id) => {
      expect(ids).toContain(id);
    });
  });
});

// ── spellsSection ──────────────────────────────────────────────────────────

describe('spellsSection', () => {
  it('has id "spells"', () => { expect(spellsSection.id).toBe('spells'); });

  it('has 5 items (one per mocked spell)', () => {
    expect(spellsSection.items.length).toBe(5);
  });

  it('items have sublabels with class and tier', () => {
    const alarm = spellsSection.items.find((i) => i.label === 'Alarm');
    expect(alarm.sublabel).toBe('Wizard T1');
  });

  it('duplicate spell name (Light) gets class-prefixed id', () => {
    const ids = spellsSection.items.map((i) => i.id);
    expect(ids).toContain('wizard-light');
    expect(ids).toContain('priest-light');
  });

  it('items sorted: Alarm before Light before Magic Missile', () => {
    const labels = spellsSection.items.map((i) => i.label);
    expect(labels.indexOf('Alarm')).toBeLessThan(labels.indexOf('Light'));
    expect(labels.indexOf('Light')).toBeLessThan(labels.indexOf('Magic Missile'));
  });

  it('both Light spells present and sorted by sublabel (Priest T1 before Wizard T1)', () => {
    const lights = spellsSection.items.filter((i) => i.label === 'Light');
    expect(lights.length).toBe(2);
    expect(lights[0].sublabel).toBe('Priest T1');
    expect(lights[1].sublabel).toBe('Wizard T1');
  });

  describe('renderDetail', () => {
    it('renders a reference card for wizard-alarm', () => {
      const c = makeContainer();
      spellsSection.renderDetail(c, 'wizard-alarm');
      expect(c.querySelector('.reference-card')).not.toBeNull();
      expect(c.querySelector('.reference-card__name').textContent).toBe('Alarm');
    });

    it('meta includes class, tier, range, duration', () => {
      const c = makeContainer();
      spellsSection.renderDetail(c, 'wizard-alarm');
      const meta = c.querySelector('.reference-card__meta').textContent;
      expect(meta).toContain('Wizard');
      expect(meta).toContain('T1');
      expect(meta).toContain('Close');
      expect(meta).toContain('1 day');
    });

    it('renders spell description', () => {
      const c = makeContainer();
      spellsSection.renderDetail(c, 'priest-cure-wounds');
      expect(c.textContent).toContain('Restore 1d6 HP');
    });

    it('renders nothing for unknown spell id', () => {
      const c = makeContainer();
      spellsSection.renderDetail(c, 'wizard-fireball');
      expect(c.querySelector('.reference-card')).toBeNull();
    });
  });
});

// ── ancestriesSection ──────────────────────────────────────────────────────

describe('ancestriesSection', () => {
  it('has id "ancestries"', () => { expect(ancestriesSection.id).toBe('ancestries'); });

  it('has 2 items (one per mocked ancestry)', () => {
    expect(ancestriesSection.items.length).toBe(2);
  });

  it('items have sublabels with trait names', () => {
    const human = ancestriesSection.items.find((i) => i.label === 'Human');
    expect(human.sublabel).toBe('Ambitious');
  });

  describe('renderDetail', () => {
    it('renders a reference card for human', () => {
      const c = makeContainer();
      ancestriesSection.renderDetail(c, 'human');
      expect(c.querySelector('.reference-card')).not.toBeNull();
      expect(c.querySelector('.reference-card__name').textContent).toBe('Human');
    });

    it('renders trait description', () => {
      const c = makeContainer();
      ancestriesSection.renderDetail(c, 'human');
      expect(c.textContent).toContain('Extra background roll.');
    });

    it('elf renders elf card', () => {
      const c = makeContainer();
      ancestriesSection.renderDetail(c, 'elf');
      expect(c.textContent).toContain('Farsight');
    });
  });
});

// ── classesSection ─────────────────────────────────────────────────────────

describe('classesSection', () => {
  it('has id "classes"', () => { expect(classesSection.id).toBe('classes'); });

  it('has 2 items (one per mocked class)', () => {
    expect(classesSection.items.length).toBe(2);
  });

  it('items have sublabels with hit die', () => {
    const fighter = classesSection.items.find((i) => i.label === 'Fighter');
    expect(fighter.sublabel).toBe('HD d8');
  });

  describe('renderDetail', () => {
    it('renders Fighter card with name', () => {
      const c = makeContainer();
      classesSection.renderDetail(c, 'fighter');
      expect(c.querySelector('.reference-card__name').textContent).toBe('Fighter');
    });

    it('meta includes hit die and armor', () => {
      const c = makeContainer();
      classesSection.renderDetail(c, 'fighter');
      const meta = c.querySelector('.reference-card__meta').textContent;
      expect(meta).toContain('d8');
      expect(meta).toContain('All armor');
    });

    it('renders class abilities', () => {
      const c = makeContainer();
      classesSection.renderDetail(c, 'fighter');
      expect(c.querySelector('.reference-card__ability-name').textContent).toContain('Grit');
    });
  });
});

// ── abilityScoresSection ───────────────────────────────────────────────────

describe('abilityScoresSection', () => {
  it('has id "ability-scores"', () => { expect(abilityScoresSection.id).toBe('ability-scores'); });

  it('has 6 items', () => { expect(abilityScoresSection.items.length).toBe(6); });

  it('includes all 6 ability score ids', () => {
    const ids = abilityScoresSection.items.map((i) => i.id);
    ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach((id) => {
      expect(ids).toContain(id);
    });
  });

  it('items do not have sublabels', () => {
    abilityScoresSection.items.forEach((item) => {
      expect(item.sublabel).toBeUndefined();
    });
  });

  describe('renderDetail', () => {
    it('renders Strength card', () => {
      const c = makeContainer();
      abilityScoresSection.renderDetail(c, 'str');
      expect(c.textContent).toContain('Strength');
    });

    it('renders Charisma card', () => {
      const c = makeContainer();
      abilityScoresSection.renderDetail(c, 'cha');
      expect(c.textContent).toContain('Charisma');
    });

    it('card includes a description', () => {
      const c = makeContainer();
      abilityScoresSection.renderDetail(c, 'wis');
      expect(c.querySelector('.reference-card__description')).not.toBeNull();
    });
  });
});

// ── backgroundsSection ─────────────────────────────────────────────────────

describe('backgroundsSection', () => {
  it('has id "backgrounds"', () => { expect(backgroundsSection.id).toBe('backgrounds'); });

  it('has 3 items (one per mocked background)', () => {
    expect(backgroundsSection.items.length).toBe(3);
  });

  it('items have sublabels with roll number', () => {
    const urchin = backgroundsSection.items.find((i) => i.label === 'Urchin');
    expect(urchin.sublabel).toBe('d20: 1');
  });

  it('items are sorted alphabetically (Scholar before Urchin before Wanted)', () => {
    const labels = backgroundsSection.items.map((i) => i.label);
    expect(labels.indexOf('Scholar')).toBeLessThan(labels.indexOf('Urchin'));
    expect(labels.indexOf('Urchin')).toBeLessThan(labels.indexOf('Wanted'));
  });

  describe('renderDetail', () => {
    it('renders Urchin card with roll in name', () => {
      const c = makeContainer();
      backgroundsSection.renderDetail(c, 'urchin');
      expect(c.querySelector('.reference-card__name').textContent).toContain('Urchin');
    });

    it('renders background description', () => {
      const c = makeContainer();
      backgroundsSection.renderDetail(c, 'urchin');
      expect(c.textContent).toContain('City streets');
    });
  });
});

// ── alignmentsSection ──────────────────────────────────────────────────────

describe('alignmentsSection', () => {
  it('has id "alignments"', () => { expect(alignmentsSection.id).toBe('alignments'); });

  it('has 3 items', () => { expect(alignmentsSection.items.length).toBe(3); });

  it('includes Lawful, Neutral, Chaotic', () => {
    const labels = alignmentsSection.items.map((i) => i.label);
    expect(labels).toContain('Lawful');
    expect(labels).toContain('Neutral');
    expect(labels).toContain('Chaotic');
  });

  describe('renderDetail', () => {
    it('renders Lawful card', () => {
      const c = makeContainer();
      alignmentsSection.renderDetail(c, 'lawful');
      expect(c.querySelector('.reference-card__name').textContent).toBe('Lawful');
    });

    it('renders Chaotic description', () => {
      const c = makeContainer();
      alignmentsSection.renderDetail(c, 'chaotic');
      expect(c.textContent).toContain('destruction');
    });
  });
});

// ── languagesSection ───────────────────────────────────────────────────────

describe('languagesSection', () => {
  it('has id "languages"', () => { expect(languagesSection.id).toBe('languages'); });

  it('has 14 items', () => { expect(languagesSection.items.length).toBe(14); });

  it('items have Common or Rare sublabels', () => {
    languagesSection.items.forEach((item) => {
      expect(['Common', 'Rare']).toContain(item.sublabel);
    });
  });

  it('Common is marked Common', () => {
    const common = languagesSection.items.find((i) => i.id === 'common');
    expect(common.sublabel).toBe('Common');
  });

  it('Draconic is marked Rare', () => {
    const draconic = languagesSection.items.find((i) => i.id === 'draconic');
    expect(draconic.sublabel).toBe('Rare');
  });

  describe('renderDetail', () => {
    it('renders Common language card', () => {
      const c = makeContainer();
      languagesSection.renderDetail(c, 'common');
      expect(c.querySelector('.reference-card__name').textContent).toBe('Common');
    });

    it('meta shows sublabel (Common/Rare)', () => {
      const c = makeContainer();
      languagesSection.renderDetail(c, 'elvish');
      expect(c.querySelector('.reference-card__meta').textContent).toBe('Common');
    });

    it('renders language description', () => {
      const c = makeContainer();
      languagesSection.renderDetail(c, 'draconic');
      expect(c.textContent).toContain('dragons');
    });
  });
});

// ── equipmentSection ───────────────────────────────────────────────────────

describe('equipmentSection', () => {
  it('has id "equipment"', () => { expect(equipmentSection.id).toBe('equipment'); });

  it('has 3 items (Armor, Gear, Weapons)', () => {
    expect(equipmentSection.items.length).toBe(3);
    const labels = equipmentSection.items.map((i) => i.label);
    expect(labels).toContain('Armor');
    expect(labels).toContain('Gear');
    expect(labels).toContain('Weapons');
  });

  describe('renderDetail', () => {
    it('armor renders leather armor card', () => {
      const c = makeContainer();
      equipmentSection.renderDetail(c, 'armor');
      expect(c.textContent).toContain('Leather');
      expect(c.textContent).toContain('11+DEX');
    });

    it('weapons renders dagger card with damage', () => {
      const c = makeContainer();
      equipmentSection.renderDetail(c, 'weapons');
      expect(c.textContent).toContain('Dagger');
      expect(c.textContent).toContain('1d4');
    });

    it('gear renders torch card', () => {
      const c = makeContainer();
      equipmentSection.renderDetail(c, 'gear');
      expect(c.textContent).toContain('Torch');
    });

    it('gear card shows cost as meta', () => {
      const c = makeContainer();
      equipmentSection.renderDetail(c, 'gear');
      const metas = Array.from(c.querySelectorAll('.reference-card__meta')).map((m) => m.textContent);
      expect(metas.some((m) => m.includes('1 cp'))).toBe(true);
    });
  });
});
