import { describe, it, expect } from 'vitest';
import { BACKGROUNDS } from '../../app/js/backgrounds-data.js';

describe('BACKGROUNDS', () => {
  it('is an array', () => {
    expect(Array.isArray(BACKGROUNDS)).toBe(true);
  });

  it('contains exactly 20 entries (one per d20 face)', () => {
    expect(BACKGROUNDS.length).toBe(20);
  });

  it('every entry has a roll between 1 and 20', () => {
    BACKGROUNDS.forEach((bg) => {
      expect(Number.isInteger(bg.roll)).toBe(true);
      expect(bg.roll).toBeGreaterThanOrEqual(1);
      expect(bg.roll).toBeLessThanOrEqual(20);
    });
  });

  it('roll values are unique', () => {
    const rolls = BACKGROUNDS.map((bg) => bg.roll);
    const unique = new Set(rolls);
    expect(unique.size).toBe(20);
  });

  it('covers every roll from 1 to 20', () => {
    const rolls = new Set(BACKGROUNDS.map((bg) => bg.roll));
    for (let i = 1; i <= 20; i++) {
      expect(rolls.has(i)).toBe(true);
    }
  });

  it('every entry has a non-empty name', () => {
    BACKGROUNDS.forEach((bg) => {
      expect(typeof bg.name).toBe('string');
      expect(bg.name.length).toBeGreaterThan(0);
    });
  });

  it('every entry has a non-empty description', () => {
    BACKGROUNDS.forEach((bg) => {
      expect(typeof bg.description).toBe('string');
      expect(bg.description.length).toBeGreaterThan(0);
    });
  });
});
