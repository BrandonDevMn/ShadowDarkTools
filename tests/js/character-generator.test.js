import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('../../app/js/ancestries-data.js', () => ({
  ANCESTRIES: [
    { name: 'Human',    traitName: 'Ambitious', traitDescription: 'Extra talent roll at 1st level.' },
    { name: 'Elf',      traitName: 'Farsight',  traitDescription: '+1 to ranged or spellcasting.' },
    { name: 'Dwarf',    traitName: 'Stout',     traitDescription: '+2 HP, advantage on HD rolls.' },
    { name: 'Halfling', traitName: 'Stealthy',  traitDescription: 'Invisible once per day.' },
    { name: 'Half-Orc', traitName: 'Mighty',    traitDescription: '+1 melee attack and damage.' },
    { name: 'Goblin',   traitName: 'Keen Senses', traitDescription: 'Cannot be surprised.' },
  ],
}));

vi.mock('../../app/js/classes-data.js', () => ({
  CLASSES: [
    { name: 'Fighter', hitDie: 'd8', armor: 'All armor',  weapons: 'All weapons',     abilities: [] },
    { name: 'Priest',  hitDie: 'd6', armor: 'All armor',  weapons: 'Club, mace, etc', abilities: [] },
    { name: 'Thief',   hitDie: 'd4', armor: 'Leather',    weapons: 'Dagger, etc',     abilities: [] },
    { name: 'Wizard',  hitDie: 'd4', armor: 'None',       weapons: 'Daggers, staves', abilities: [] },
  ],
}));

vi.mock('../../app/js/backgrounds-data.js', () => ({
  BACKGROUNDS: Array.from({ length: 20 }, (_, i) => ({
    roll: i + 1,
    name: `Background ${i + 1}`,
    description: `Description for background ${i + 1}.`,
  })),
}));

import { generateCharacter, statMod, fmtMod } from '../../app/js/character-generator.js';

// ── statMod ────────────────────────────────────────────────────────────────

describe('statMod', () => {
  it('score 1–3 → -4',  () => { expect(statMod(1)).toBe(-4); expect(statMod(3)).toBe(-4); });
  it('score 4–5 → -3',  () => { expect(statMod(4)).toBe(-3); expect(statMod(5)).toBe(-3); });
  it('score 6–7 → -2',  () => { expect(statMod(6)).toBe(-2); });
  it('score 8–9 → -1',  () => { expect(statMod(8)).toBe(-1); });
  it('score 10–11 → 0', () => { expect(statMod(10)).toBe(0); expect(statMod(11)).toBe(0); });
  it('score 12–13 → 1', () => { expect(statMod(12)).toBe(1); });
  it('score 14–15 → 2', () => { expect(statMod(14)).toBe(2); });
  it('score 16–17 → 3', () => { expect(statMod(16)).toBe(3); });
  it('score 18+ → 4',   () => { expect(statMod(18)).toBe(4); expect(statMod(20)).toBe(4); });
});

// ── fmtMod ─────────────────────────────────────────────────────────────────

describe('fmtMod', () => {
  it('positive mod shows + prefix',  () => { expect(fmtMod(2)).toBe('+2'); });
  it('zero shows +0',                () => { expect(fmtMod(0)).toBe('+0'); });
  it('negative mod shows - prefix',  () => { expect(fmtMod(-2)).toBe('-2'); });
});

// ── generateCharacter shape ────────────────────────────────────────────────

describe('generateCharacter return shape', () => {
  let char;

  beforeEach(() => { char = generateCharacter(); });

  it('returns an object', () => { expect(typeof char).toBe('object'); });

  it('has a non-empty name string', () => {
    expect(typeof char.name).toBe('string');
    expect(char.name.length).toBeGreaterThan(0);
  });

  it('ancestry is one of the 6 valid ancestries', () => {
    expect(['Human', 'Elf', 'Dwarf', 'Halfling', 'Half-Orc', 'Goblin']).toContain(char.ancestry);
  });

  it('class is one of the 4 valid classes', () => {
    expect(['Fighter', 'Priest', 'Thief', 'Wizard']).toContain(char.class);
  });

  it('level is 1', () => { expect(char.level).toBe(1); });

  it('alignment is Lawful, Neutral, or Chaotic', () => {
    expect(['Lawful', 'Neutral', 'Chaotic']).toContain(char.alignment);
  });

  it('hp is a positive integer', () => {
    expect(Number.isInteger(char.hp)).toBe(true);
    expect(char.hp).toBeGreaterThanOrEqual(1);
  });

  it('stats has all six keys', () => {
    ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach((key) => {
      expect(char.stats[key]).toBeDefined();
    });
  });

  it('each stat has score between 3 and 18', () => {
    ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach((key) => {
      expect(char.stats[key].score).toBeGreaterThanOrEqual(3);
      expect(char.stats[key].score).toBeLessThanOrEqual(18);
    });
  });

  it('stat mods match statMod(score)', () => {
    ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach((key) => {
      expect(char.stats[key].mod).toBe(statMod(char.stats[key].score));
    });
  });

  it('at least one stat is >= 14 (reroll rule)', () => {
    const scores = ['str', 'dex', 'con', 'int', 'wis', 'cha'].map((k) => char.stats[k].score);
    expect(scores.some((s) => s >= 14)).toBe(true);
  });

  it('background has name and description', () => {
    expect(typeof char.background.name).toBe('string');
    expect(typeof char.background.description).toBe('string');
  });

  it('languages array contains Common', () => {
    expect(char.languages).toContain('Common');
  });

  it('has an ancestryTrait with name and description', () => {
    expect(char.ancestryTrait).not.toBeNull();
    expect(typeof char.ancestryTrait.name).toBe('string');
    expect(typeof char.ancestryTrait.description).toBe('string');
  });

  it('talents is a non-empty array of strings', () => {
    expect(Array.isArray(char.talents)).toBe(true);
    expect(char.talents.length).toBeGreaterThanOrEqual(1);
    char.talents.forEach((t) => expect(typeof t).toBe('string'));
  });
});

// ── Class-specific behaviour ───────────────────────────────────────────────

describe('Priest character', () => {
  it('has exactly 2 starting spells', () => {
    const chars = Array.from({ length: 40 }, () => generateCharacter());
    const priests = chars.filter((c) => c.class === 'Priest');
    if (priests.length > 0) {
      priests.forEach((p) => expect(p.spells.length).toBe(2));
    }
  });
});

describe('Wizard character', () => {
  it('has exactly 3 starting spells', () => {
    const chars = Array.from({ length: 30 }, () => generateCharacter());
    const wizards = chars.filter((c) => c.class === 'Wizard');
    if (wizards.length > 0) {
      wizards.forEach((w) => expect(w.spells.length).toBe(3));
    }
  });

  it('has at least 3 extra languages', () => {
    const chars = Array.from({ length: 30 }, () => generateCharacter());
    const wizards = chars.filter((c) => c.class === 'Wizard');
    if (wizards.length > 0) {
      wizards.forEach((w) => expect(w.languages.length).toBeGreaterThanOrEqual(3));
    }
  });
});

describe('non-spellcaster character', () => {
  it('Fighter has empty spells array', () => {
    const chars = Array.from({ length: 30 }, () => generateCharacter());
    const fighters = chars.filter((c) => c.class === 'Fighter');
    if (fighters.length > 0) {
      fighters.forEach((f) => expect(f.spells).toHaveLength(0));
    }
  });

  it('Thief has empty spells array', () => {
    const chars = Array.from({ length: 30 }, () => generateCharacter());
    const thieves = chars.filter((c) => c.class === 'Thief');
    if (thieves.length > 0) {
      thieves.forEach((t) => expect(t.spells).toHaveLength(0));
    }
  });
});

describe('Human character', () => {
  it('has 2 talent rolls', () => {
    const chars = Array.from({ length: 30 }, () => generateCharacter());
    const humans = chars.filter((c) => c.ancestry === 'Human');
    if (humans.length > 0) {
      humans.forEach((h) => expect(h.talents.length).toBe(2));
    }
  });
});

describe('Dwarf character', () => {
  it('HP is at least 1', () => {
    const chars = Array.from({ length: 20 }, () => generateCharacter());
    const dwarves = chars.filter((c) => c.ancestry === 'Dwarf');
    if (dwarves.length > 0) {
      dwarves.forEach((d) => expect(d.hp).toBeGreaterThanOrEqual(1));
    }
  });
});

// ── Randomness distribution (smoke tests) ─────────────────────────────────

describe('distribution smoke tests over 100 rolls', () => {
  const chars = Array.from({ length: 100 }, () => generateCharacter());

  it('all 4 classes appear', () => {
    const classes = new Set(chars.map((c) => c.class));
    expect(classes.size).toBe(4);
  });

  it('multiple ancestries appear', () => {
    const ancestries = new Set(chars.map((c) => c.ancestry));
    expect(ancestries.size).toBeGreaterThanOrEqual(3);
  });

  it('all 3 alignments appear', () => {
    const alignments = new Set(chars.map((c) => c.alignment));
    expect(alignments.size).toBe(3);
  });

  it('spell names are distinct within each character', () => {
    chars.filter((c) => c.spells.length > 0).forEach((c) => {
      expect(new Set(c.spells).size).toBe(c.spells.length);
    });
  });
});
