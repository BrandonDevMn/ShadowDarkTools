import { describe, it, expect } from 'vitest';
import { EQUIPMENT } from '../../app/js/equipment-data.js';

describe('EQUIPMENT', () => {
  const VALID_CATEGORIES = ['weapon', 'armor', 'gear'];

  it('is an array', () => {
    expect(Array.isArray(EQUIPMENT)).toBe(true);
  });

  it('contains entries', () => {
    expect(EQUIPMENT.length).toBeGreaterThan(0);
  });

  it('every entry has a valid category', () => {
    EQUIPMENT.forEach((item) => {
      expect(VALID_CATEGORIES).toContain(item.category);
    });
  });

  it('every entry has a non-empty name', () => {
    EQUIPMENT.forEach((item) => {
      expect(typeof item.name).toBe('string');
      expect(item.name.length).toBeGreaterThan(0);
    });
  });

  it('every entry has a non-empty cost', () => {
    EQUIPMENT.forEach((item) => {
      expect(typeof item.cost).toBe('string');
      expect(item.cost.length).toBeGreaterThan(0);
    });
  });

  it('weapon entries have damage and range', () => {
    EQUIPMENT.filter((item) => item.category === 'weapon').forEach((weapon) => {
      expect(typeof weapon.damage).toBe('string');
      expect(weapon.damage.length).toBeGreaterThan(0);
      expect(typeof weapon.range).toBe('string');
      expect(weapon.range.length).toBeGreaterThan(0);
    });
  });

  it('armor entries have an armorClass field', () => {
    EQUIPMENT.filter((item) => item.category === 'armor').forEach((armor) => {
      expect(typeof armor.armorClass).toBe('string');
      expect(armor.armorClass.length).toBeGreaterThan(0);
    });
  });

  it('has at least one weapon', () => {
    expect(EQUIPMENT.some((item) => item.category === 'weapon')).toBe(true);
  });

  it('has at least one armor item', () => {
    expect(EQUIPMENT.some((item) => item.category === 'armor')).toBe(true);
  });

  it('has at least one gear item', () => {
    expect(EQUIPMENT.some((item) => item.category === 'gear')).toBe(true);
  });
});
