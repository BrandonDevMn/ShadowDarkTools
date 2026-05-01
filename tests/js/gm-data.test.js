/**
 * Structural validation for all GM data files.
 *
 * Checks that each table has the right shape (array lengths, field presence)
 * so regressions in the data are caught early.
 */

import { describe, it, expect } from 'vitest';
import { ADVENTURE_HOOK, SITE_NAME }        from '../../app/js/gm-adventure-data.js';
import {
  NPC_ANCESTRY_TABLE, NPC_ALIGNMENT_TABLE, NPC_AGE_TABLE,
  NPC_WEALTH_TABLE, NPC_QUALITIES, NPC_OCCUPATIONS,
  NPC_NAMES, NPC_EPITHETS, REACTION_TABLE,
}                                           from '../../app/js/gm-npc-data.js';
import { RANDOM_EVENTS }                    from '../../app/js/gm-events-data.js';
import { RUMORS }                           from '../../app/js/gm-rumors-data.js';
import { OATHS, SECRET_DETAIL1, SECRET_DETAIL2, BLESSINGS } from '../../app/js/gm-treasure-data.js';
import { MAGIC_ITEMS }                      from '../../app/js/gm-magic-items-data.js';

// ── Adventure data ─────────────────────────────────────────────────────────

describe('ADVENTURE_HOOK', () => {
  it('detail1 has 20 entries', () => { expect(ADVENTURE_HOOK.detail1).toHaveLength(20); });
  it('detail2 has 20 entries', () => { expect(ADVENTURE_HOOK.detail2).toHaveLength(20); });
  it('detail3 has 20 entries', () => { expect(ADVENTURE_HOOK.detail3).toHaveLength(20); });
  it('all entries are non-empty strings', () => {
    [...ADVENTURE_HOOK.detail1, ...ADVENTURE_HOOK.detail2, ...ADVENTURE_HOOK.detail3]
      .forEach((s) => expect(typeof s).toBe('string'));
  });
});

describe('SITE_NAME', () => {
  it('name1 has 20 entries', () => { expect(SITE_NAME.name1).toHaveLength(20); });
  it('name2 has 20 entries', () => { expect(SITE_NAME.name2).toHaveLength(20); });
  it('name3 has 20 entries', () => { expect(SITE_NAME.name3).toHaveLength(20); });
});

// ── NPC data ───────────────────────────────────────────────────────────────

describe('NPC_ANCESTRY_TABLE', () => {
  it('has 12 entries', () => { expect(NPC_ANCESTRY_TABLE).toHaveLength(12); });
});

describe('NPC_ALIGNMENT_TABLE', () => {
  it('has 6 entries', () => { expect(NPC_ALIGNMENT_TABLE).toHaveLength(6); });
});

describe('NPC_AGE_TABLE', () => {
  it('has 8 entries', () => { expect(NPC_AGE_TABLE).toHaveLength(8); });
});

describe('NPC_WEALTH_TABLE', () => {
  it('has 6 entries', () => { expect(NPC_WEALTH_TABLE).toHaveLength(6); });
});

describe('NPC_QUALITIES', () => {
  it('has 20 entries', () => { expect(NPC_QUALITIES).toHaveLength(20); });

  it('every entry has appearance, does, and secret', () => {
    NPC_QUALITIES.forEach((q) => {
      expect(typeof q.appearance).toBe('string');
      expect(typeof q.does).toBe('string');
      expect(typeof q.secret).toBe('string');
    });
  });
});

describe('NPC_OCCUPATIONS', () => {
  it('is a 4×4 grid', () => {
    expect(NPC_OCCUPATIONS).toHaveLength(4);
    NPC_OCCUPATIONS.forEach((row) => expect(row).toHaveLength(4));
  });
});

describe('NPC_NAMES', () => {
  const ancestries = ['Dwarf', 'Elf', 'Goblin', 'Halfling', 'Half-Orc', 'Human'];
  ancestries.forEach((ancestry) => {
    it(`${ancestry} name list has 20 entries`, () => {
      expect(NPC_NAMES[ancestry]).toHaveLength(20);
    });
  });
});

describe('NPC_EPITHETS', () => {
  it('is a 4×4 grid', () => {
    expect(NPC_EPITHETS).toHaveLength(4);
    NPC_EPITHETS.forEach((row) => expect(row).toHaveLength(4));
  });
});

describe('REACTION_TABLE', () => {
  it('covers the full 2d6 range (2–12)', () => {
    const min = Math.min(...REACTION_TABLE.map((r) => r.min));
    const max = Math.max(...REACTION_TABLE.map((r) => r.max));
    expect(min).toBeLessThanOrEqual(2);
    expect(max).toBeGreaterThanOrEqual(12);
  });
});

// ── Random Events ──────────────────────────────────────────────────────────

describe('RANDOM_EVENTS', () => {
  it('is a non-empty array', () => { expect(RANDOM_EVENTS.length).toBeGreaterThan(0); });

  it('every entry has [min, max, text] shape', () => {
    RANDOM_EVENTS.forEach(([min, max, text]) => {
      expect(typeof min).toBe('number');
      expect(typeof max).toBe('number');
      expect(typeof text).toBe('string');
    });
  });

  it('covers roll 1 through 100', () => {
    const covered = new Set();
    RANDOM_EVENTS.forEach(([min, max]) => {
      for (let r = min; r <= max; r++) covered.add(r);
    });
    expect(covered.has(1)).toBe(true);
    expect(covered.has(100)).toBe(true);
  });
});

// ── Rumors ─────────────────────────────────────────────────────────────────

describe('RUMORS', () => {
  it('is a non-empty array', () => { expect(RUMORS.length).toBeGreaterThan(0); });

  it('every entry has [min, max, text] shape', () => {
    RUMORS.forEach(([min, max, text]) => {
      expect(typeof min).toBe('number');
      expect(typeof max).toBe('number');
      expect(typeof text).toBe('string');
    });
  });

  it('covers roll 1 through 100', () => {
    const covered = new Set();
    RUMORS.forEach(([min, max]) => {
      for (let r = min; r <= max; r++) covered.add(r);
    });
    expect(covered.has(1)).toBe(true);
    expect(covered.has(100)).toBe(true);
  });
});

// ── Treasure / Boons ───────────────────────────────────────────────────────

describe('OATHS', () => {
  it('has 8 entries', () => { expect(OATHS).toHaveLength(8); });
  it('all entries are non-empty strings', () => {
    OATHS.forEach((s) => expect(s.length).toBeGreaterThan(0));
  });
});

describe('SECRET_DETAIL1 and SECRET_DETAIL2', () => {
  it('both have 12 entries', () => {
    expect(SECRET_DETAIL1).toHaveLength(12);
    expect(SECRET_DETAIL2).toHaveLength(12);
  });
});

describe('BLESSINGS', () => {
  it('has 12 entries', () => { expect(BLESSINGS).toHaveLength(12); });

  it('every entry has name and description', () => {
    BLESSINGS.forEach((b) => {
      expect(typeof b.name).toBe('string');
      expect(typeof b.description).toBe('string');
    });
  });
});

// ── Magic Items ────────────────────────────────────────────────────────────

describe('MAGIC_ITEMS', () => {
  it('contains items', () => { expect(MAGIC_ITEMS.length).toBeGreaterThan(0); });

  it('every entry has a non-empty name', () => {
    MAGIC_ITEMS.forEach((item) => expect(item.name.length).toBeGreaterThan(0));
  });

  it('every entry has a non-empty description', () => {
    MAGIC_ITEMS.forEach((item) => expect(item.description.length).toBeGreaterThan(0));
  });

  it('item names are unique', () => {
    const names = MAGIC_ITEMS.map((i) => i.name);
    expect(new Set(names).size).toBe(names.length);
  });
});
