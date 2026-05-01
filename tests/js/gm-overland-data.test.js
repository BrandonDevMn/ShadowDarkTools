/**
 * Structural validation for gm-overland-data.js.
 */

import { describe, it, expect } from 'vitest';
import {
  TERRAIN_ORDER, HEX_TERRAIN_TABLE, NEW_HEX_TABLE,
  HEX_DANGER_TABLE, POINTS_OF_INTEREST, CATACLYSM_TABLE,
  SETTLEMENT_NAMES,
} from '../../app/js/gm-overland-data.js';

describe('TERRAIN_ORDER', () => {
  it('has 7 entries', () => { expect(TERRAIN_ORDER).toHaveLength(7); });
  it('all entries are non-empty strings', () => {
    TERRAIN_ORDER.forEach((t) => expect(t.length).toBeGreaterThan(0));
  });
});

describe('HEX_TERRAIN_TABLE', () => {
  it('covers 2d6 range 2–12 without gaps', () => {
    const covered = new Set();
    HEX_TERRAIN_TABLE.forEach(({ min, max }) => {
      for (let r = min; r <= max; r++) covered.add(r);
    });
    for (let r = 2; r <= 12; r++) expect(covered.has(r)).toBe(true);
  });

  it('every terrain in the table exists in TERRAIN_ORDER', () => {
    HEX_TERRAIN_TABLE.forEach(({ terrain }) => {
      expect(TERRAIN_ORDER).toContain(terrain);
    });
  });
});

describe('NEW_HEX_TABLE', () => {
  it('covers 2d6 range 2–12', () => {
    const covered = new Set();
    NEW_HEX_TABLE.forEach(({ min, max }) => {
      for (let r = min; r <= max; r++) covered.add(r);
    });
    for (let r = 2; r <= 12; r++) expect(covered.has(r)).toBe(true);
  });

  it('has exactly one fresh-roll entry', () => {
    expect(NEW_HEX_TABLE.filter((r) => r.fresh).length).toBe(1);
  });
});

describe('HEX_DANGER_TABLE', () => {
  it('covers d6 range 1–6', () => {
    const covered = new Set();
    HEX_DANGER_TABLE.forEach(({ min, max }) => {
      for (let r = min; r <= max; r++) covered.add(r);
    });
    for (let r = 1; r <= 6; r++) expect(covered.has(r)).toBe(true);
  });

  it('includes Safe, Unsafe, Risky, Deadly', () => {
    const levels = HEX_DANGER_TABLE.map((r) => r.level);
    expect(levels).toContain('Safe');
    expect(levels).toContain('Unsafe');
    expect(levels).toContain('Risky');
    expect(levels).toContain('Deadly');
  });
});

describe('POINTS_OF_INTEREST', () => {
  it('covers d20 range 1–20', () => {
    const covered = new Set();
    POINTS_OF_INTEREST.forEach(({ min, max }) => {
      for (let r = min; r <= max; r++) covered.add(r);
    });
    for (let r = 1; r <= 20; r++) expect(covered.has(r)).toBe(true);
  });

  it('every entry has location and development', () => {
    POINTS_OF_INTEREST.forEach((p) => {
      expect(typeof p.location).toBe('string');
      expect(typeof p.development).toBe('string');
    });
  });

  it('exactly one entry is marked isCataclysm', () => {
    expect(POINTS_OF_INTEREST.filter((p) => p.isCataclysm)).toHaveLength(1);
  });
});

describe('CATACLYSM_TABLE', () => {
  it('has 8 entries', () => { expect(CATACLYSM_TABLE).toHaveLength(8); });
});

describe('SETTLEMENT_NAMES', () => {
  it('has Village, Town, and City/metropolis tiers', () => {
    expect(SETTLEMENT_NAMES['Village']).toBeDefined();
    expect(SETTLEMENT_NAMES['Town']).toBeDefined();
    expect(SETTLEMENT_NAMES['City/metropolis']).toBeDefined();
  });

  it('each tier has 8 names', () => {
    expect(SETTLEMENT_NAMES['Village']).toHaveLength(8);
    expect(SETTLEMENT_NAMES['Town']).toHaveLength(8);
    expect(SETTLEMENT_NAMES['City/metropolis']).toHaveLength(8);
  });
});
