import { describe, it, expect } from 'vitest';
import { ANCESTRIES } from '../../app/js/ancestries-data.js';

describe('ANCESTRIES', () => {
  it('is an array', () => {
    expect(Array.isArray(ANCESTRIES)).toBe(true);
  });

  it('contains entries', () => {
    expect(ANCESTRIES.length).toBeGreaterThan(0);
  });

  it('every entry has a non-empty name', () => {
    ANCESTRIES.forEach((a) => {
      expect(typeof a.name).toBe('string');
      expect(a.name.length).toBeGreaterThan(0);
    });
  });

  it('every entry has a non-empty description', () => {
    ANCESTRIES.forEach((a) => {
      expect(typeof a.description).toBe('string');
      expect(a.description.length).toBeGreaterThan(0);
    });
  });

  it('every entry has a non-empty traitName', () => {
    ANCESTRIES.forEach((a) => {
      expect(typeof a.traitName).toBe('string');
      expect(a.traitName.length).toBeGreaterThan(0);
    });
  });

  it('every entry has a non-empty traitDescription', () => {
    ANCESTRIES.forEach((a) => {
      expect(typeof a.traitDescription).toBe('string');
      expect(a.traitDescription.length).toBeGreaterThan(0);
    });
  });

  it('includes Human', () => {
    expect(ANCESTRIES.some((a) => a.name === 'Human')).toBe(true);
  });

  it('includes Elf', () => {
    expect(ANCESTRIES.some((a) => a.name === 'Elf')).toBe(true);
  });

  it('includes Dwarf', () => {
    expect(ANCESTRIES.some((a) => a.name === 'Dwarf')).toBe(true);
  });

  it('includes Halfling', () => {
    expect(ANCESTRIES.some((a) => a.name === 'Halfling')).toBe(true);
  });
});
