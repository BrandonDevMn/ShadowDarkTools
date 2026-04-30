import { describe, it, expect } from 'vitest';
import { SPELLS } from '../../app/js/spells-data.js';

describe('SPELLS', () => {
  it('is an array', () => {
    expect(Array.isArray(SPELLS)).toBe(true);
  });

  it('contains entries', () => {
    expect(SPELLS.length).toBeGreaterThan(0);
  });

  it('has at least one wizard spell', () => {
    expect(SPELLS.some((s) => s.class === 'wizard')).toBe(true);
  });

  it('has at least one priest spell', () => {
    expect(SPELLS.some((s) => s.class === 'priest')).toBe(true);
  });

  it('every spell has a non-empty name', () => {
    SPELLS.forEach((s) => {
      expect(typeof s.name).toBe('string');
      expect(s.name.length).toBeGreaterThan(0);
    });
  });

  it('every spell class is "wizard" or "priest"', () => {
    SPELLS.forEach((s) => {
      expect(['wizard', 'priest']).toContain(s.class);
    });
  });

  it('every spell tier is an integer between 1 and 5', () => {
    SPELLS.forEach((s) => {
      expect(Number.isInteger(s.tier)).toBe(true);
      expect(s.tier).toBeGreaterThanOrEqual(1);
      expect(s.tier).toBeLessThanOrEqual(5);
    });
  });

  it('every spell has a non-empty range', () => {
    SPELLS.forEach((s) => {
      expect(typeof s.range).toBe('string');
      expect(s.range.length).toBeGreaterThan(0);
    });
  });

  it('every spell has a non-empty duration', () => {
    SPELLS.forEach((s) => {
      expect(typeof s.duration).toBe('string');
      expect(s.duration.length).toBeGreaterThan(0);
    });
  });

  it('every spell has a non-empty description', () => {
    SPELLS.forEach((s) => {
      expect(typeof s.description).toBe('string');
      expect(s.description.length).toBeGreaterThan(0);
    });
  });

  it('has wizard spells for all tiers 1 through 5', () => {
    const wizardTiers = new Set(SPELLS.filter((s) => s.class === 'wizard').map((s) => s.tier));
    [1, 2, 3, 4, 5].forEach((tier) => expect(wizardTiers.has(tier)).toBe(true));
  });

  it('has priest spells for all tiers 1 through 5', () => {
    const priestTiers = new Set(SPELLS.filter((s) => s.class === 'priest').map((s) => s.tier));
    [1, 2, 3, 4, 5].forEach((tier) => expect(priestTiers.has(tier)).toBe(true));
  });
});
