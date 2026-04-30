import { describe, it, expect } from 'vitest';
import { CLASSES } from '../../app/js/classes-data.js';

describe('CLASSES', () => {
  it('is an array', () => {
    expect(Array.isArray(CLASSES)).toBe(true);
  });

  it('contains entries', () => {
    expect(CLASSES.length).toBeGreaterThan(0);
  });

  it('every entry has a non-empty name', () => {
    CLASSES.forEach((c) => {
      expect(typeof c.name).toBe('string');
      expect(c.name.length).toBeGreaterThan(0);
    });
  });

  it('every entry has a non-empty description', () => {
    CLASSES.forEach((c) => {
      expect(typeof c.description).toBe('string');
      expect(c.description.length).toBeGreaterThan(0);
    });
  });

  it('every entry has a hitDie starting with d', () => {
    CLASSES.forEach((c) => {
      expect(typeof c.hitDie).toBe('string');
      expect(c.hitDie).toMatch(/^d\d+$/);
    });
  });

  it('every entry has a non-empty armor string', () => {
    CLASSES.forEach((c) => {
      expect(typeof c.armor).toBe('string');
      expect(c.armor.length).toBeGreaterThan(0);
    });
  });

  it('every entry has a non-empty weapons string', () => {
    CLASSES.forEach((c) => {
      expect(typeof c.weapons).toBe('string');
      expect(c.weapons.length).toBeGreaterThan(0);
    });
  });

  it('every entry has an abilities array with at least one entry', () => {
    CLASSES.forEach((c) => {
      expect(Array.isArray(c.abilities)).toBe(true);
      expect(c.abilities.length).toBeGreaterThan(0);
    });
  });

  it('every ability has a non-empty name and description', () => {
    CLASSES.forEach((c) => {
      c.abilities.forEach((ability) => {
        expect(typeof ability.name).toBe('string');
        expect(ability.name.length).toBeGreaterThan(0);
        expect(typeof ability.description).toBe('string');
        expect(ability.description.length).toBeGreaterThan(0);
      });
    });
  });

  it('includes Fighter', () => {
    expect(CLASSES.some((c) => c.name === 'Fighter')).toBe(true);
  });

  it('includes Wizard', () => {
    expect(CLASSES.some((c) => c.name === 'Wizard')).toBe(true);
  });

  it('includes Priest', () => {
    expect(CLASSES.some((c) => c.name === 'Priest')).toBe(true);
  });

  it('includes Thief', () => {
    expect(CLASSES.some((c) => c.name === 'Thief')).toBe(true);
  });
});
