/**
 * Structural validation for gm-dungeon-data.js.
 */

import { describe, it, expect } from 'vitest';
import {
  SITE_SIZES, SITE_TYPES, DANGER_LEVELS, ROOM_CONTENTS,
  TRAPS, HAZARDS, CREATURE_ACTIVITY, STARTING_DISTANCES,
} from '../../app/js/gm-dungeon-data.js';

describe('SITE_SIZES', () => {
  it('has entries covering d6 rolls 1–6 without gaps', () => {
    const covered = new Set();
    SITE_SIZES.forEach(({ min, max }) => {
      for (let r = min; r <= max; r++) covered.add(r);
    });
    for (let r = 1; r <= 6; r++) expect(covered.has(r)).toBe(true);
  });

  it('every entry has a label and dice count', () => {
    SITE_SIZES.forEach((s) => {
      expect(typeof s.label).toBe('string');
      expect(typeof s.dice).toBe('number');
      expect(s.dice).toBeGreaterThan(0);
    });
  });
});

describe('SITE_TYPES', () => {
  it('has 6 entries', () => { expect(SITE_TYPES).toHaveLength(6); });
  it('all entries are non-empty strings', () => {
    SITE_TYPES.forEach((t) => expect(t.length).toBeGreaterThan(0));
  });
});

describe('DANGER_LEVELS', () => {
  it('has 6 entries', () => { expect(DANGER_LEVELS).toHaveLength(6); });
  it('includes Unsafe, Risky, and Deadly', () => {
    expect(DANGER_LEVELS).toContain('Unsafe');
    expect(DANGER_LEVELS).toContain('Risky');
    expect(DANGER_LEVELS).toContain('Deadly');
  });
});

describe('ROOM_CONTENTS', () => {
  it('covers d10 rolls 1–10 without gaps', () => {
    const covered = new Set();
    ROOM_CONTENTS.forEach(({ min, max }) => {
      for (let r = min; r <= max; r++) covered.add(r);
    });
    for (let r = 1; r <= 10; r++) expect(covered.has(r)).toBe(true);
  });

  it('every entry has a label', () => {
    ROOM_CONTENTS.forEach((r) => expect(r.label.length).toBeGreaterThan(0));
  });
});

describe('TRAPS', () => {
  it('has 12 entries', () => { expect(TRAPS).toHaveLength(12); });

  it('every entry has name, trigger, and effect', () => {
    TRAPS.forEach((t) => {
      expect(typeof t.name).toBe('string');
      expect(typeof t.trigger).toBe('string');
      expect(typeof t.effect).toBe('string');
    });
  });
});

describe('HAZARDS', () => {
  it('has movement, damage, and weaken categories', () => {
    expect(HAZARDS.movement).toBeDefined();
    expect(HAZARDS.damage).toBeDefined();
    expect(HAZARDS.weaken).toBeDefined();
  });

  it('each category has 12 entries', () => {
    expect(HAZARDS.movement).toHaveLength(12);
    expect(HAZARDS.damage).toHaveLength(12);
    expect(HAZARDS.weaken).toHaveLength(12);
  });

  it('every hazard is a non-empty string', () => {
    [...HAZARDS.movement, ...HAZARDS.damage, ...HAZARDS.weaken]
      .forEach((h) => expect(h.length).toBeGreaterThan(0));
  });
});

describe('CREATURE_ACTIVITY', () => {
  it('covers 2d6 range 2–12', () => {
    const min = Math.min(...CREATURE_ACTIVITY.map((r) => r.min));
    const max = Math.max(...CREATURE_ACTIVITY.map((r) => r.max));
    expect(min).toBeLessThanOrEqual(2);
    expect(max).toBeGreaterThanOrEqual(12);
  });
});

describe('STARTING_DISTANCES', () => {
  it('has 6 entries', () => { expect(STARTING_DISTANCES).toHaveLength(6); });
  it('includes Close, Near, and Far', () => {
    expect(STARTING_DISTANCES).toContain('Close');
    expect(STARTING_DISTANCES).toContain('Near');
    expect(STARTING_DISTANCES).toContain('Far');
  });
});
