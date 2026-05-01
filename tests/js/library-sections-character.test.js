import { describe, it, expect, beforeEach } from 'vitest';

import {
  titlesSection,
  deitiesSection,
  randomCharacterGenerationSection,
} from '../../app/js/library-sections-character.js';

function makeContainer() {
  return document.createElement('div');
}

// ── Shared descriptor shape tests ──────────────────────────────────────────

[titlesSection, deitiesSection, randomCharacterGenerationSection].forEach((section) => {
  describe(`${section.label} descriptor shape`, () => {
    it('has an id string', () => { expect(typeof section.id).toBe('string'); });
    it('has a label string', () => { expect(typeof section.label).toBe('string'); });
    it('items are sorted alphabetically', () => {
      const labels = section.items.map((i) => i.label);
      expect(labels).toEqual([...labels].sort((a, b) => a.localeCompare(b)));
    });
    it('renderDetail is a function', () => { expect(typeof section.renderDetail).toBe('function'); });
    it('renderDetail does nothing for unknown id', () => {
      const c = makeContainer();
      expect(() => section.renderDetail(c, 'nonexistent')).not.toThrow();
    });
  });
});

// ── titlesSection ──────────────────────────────────────────────────────────

describe('titlesSection', () => {
  it('has id "titles"', () => { expect(titlesSection.id).toBe('titles'); });

  it('has 4 items (one per class)', () => { expect(titlesSection.items.length).toBe(4); });

  it('includes Fighter, Priest, Thief, Wizard', () => {
    const labels = titlesSection.items.map((i) => i.label);
    expect(labels).toContain('Fighter');
    expect(labels).toContain('Priest');
    expect(labels).toContain('Thief');
    expect(labels).toContain('Wizard');
  });

  describe('renderDetail', () => {
    it('fighter renders fighter title table with Squire', () => {
      const c = makeContainer();
      titlesSection.renderDetail(c, 'fighter');
      expect(c.querySelector('table')).not.toBeNull();
      expect(c.textContent).toContain('Squire');
      expect(c.textContent).toContain('Lord/Lady');
    });

    it('wizard renders wizard title table with Apprentice', () => {
      const c = makeContainer();
      titlesSection.renderDetail(c, 'wizard');
      expect(c.textContent).toContain('Apprentice');
      expect(c.textContent).toContain('Archmage');
    });
  });
});

// ── deitiesSection ─────────────────────────────────────────────────────────

describe('deitiesSection', () => {
  it('has id "deities"', () => { expect(deitiesSection.id).toBe('deities'); });

  it('has 8 items', () => { expect(deitiesSection.items.length).toBe(8); });

  it('includes all named deities', () => {
    const labels = deitiesSection.items.map((i) => i.label);
    expect(labels).toContain('Saint Terragnis');
    expect(labels).toContain('Gede');
    expect(labels).toContain('Madeera the Covenant');
    expect(labels).toContain('Ord');
    expect(labels).toContain('Memnon');
    expect(labels).toContain('Ramlaat');
    expect(labels).toContain('Shune the Vile');
  });

  it('deity items include alignment sublabels', () => {
    const item = deitiesSection.items.find((i) => i.label === 'Saint Terragnis');
    expect(item.sublabel).toBe('Lawful');
  });

  describe('renderDetail', () => {
    it('saint-terragnis renders Saint Terragnis card', () => {
      const c = makeContainer();
      deitiesSection.renderDetail(c, 'saint-terragnis');
      const names = Array.from(c.querySelectorAll('.reference-card__name')).map((n) => n.textContent);
      expect(names).toContain('Saint Terragnis');
    });

    it('saint-terragnis card shows Lawful alignment meta', () => {
      const c = makeContainer();
      deitiesSection.renderDetail(c, 'saint-terragnis');
      const metas = Array.from(c.querySelectorAll('.reference-card__meta')).map((m) => m.textContent);
      expect(metas).toContain('Lawful');
    });

    it('shune-the-vile renders Shune the Vile card', () => {
      const c = makeContainer();
      deitiesSection.renderDetail(c, 'shune-the-vile');
      expect(c.textContent).toContain('Shune the Vile');
    });
  });
});

// ── randomCharacterGenerationSection ──────────────────────────────────────

describe('randomCharacterGenerationSection', () => {
  it('has id "random-character-generation"', () => {
    expect(randomCharacterGenerationSection.id).toBe('random-character-generation');
  });

  it('includes Ancestry item', () => {
    expect(randomCharacterGenerationSection.items.some((i) => i.label === 'Ancestry')).toBe(true);
  });

  it('includes Class item', () => {
    expect(randomCharacterGenerationSection.items.some((i) => i.label === 'Class')).toBe(true);
  });

  it('includes Starting Gear item', () => {
    expect(randomCharacterGenerationSection.items.some((i) => i.label === 'Starting Gear')).toBe(true);
  });

  describe('renderDetail', () => {
    it('ancestry renders ancestry table', () => {
      const c = makeContainer();
      randomCharacterGenerationSection.renderDetail(c, 'ancestry');
      expect(c.querySelector('table')).not.toBeNull();
      expect(c.textContent).toContain('Human');
    });

    it('class renders class table', () => {
      const c = makeContainer();
      randomCharacterGenerationSection.renderDetail(c, 'class');
      expect(c.textContent).toContain('Fighter');
      expect(c.textContent).toContain('Wizard');
    });

    it('starting-spells-priest renders priest spells table', () => {
      const c = makeContainer();
      randomCharacterGenerationSection.renderDetail(c, 'starting-spells-priest');
      expect(c.textContent).toContain('Cure Wounds');
    });

    it('starting-spells-wizard renders wizard spells table', () => {
      const c = makeContainer();
      randomCharacterGenerationSection.renderDetail(c, 'starting-spells-wizard');
      expect(c.textContent).toContain('Magic Missile');
    });

    it('starting-gear renders gear table with Torch', () => {
      const c = makeContainer();
      randomCharacterGenerationSection.renderDetail(c, 'starting-gear');
      expect(c.textContent).toContain('Torch');
    });

    it('alignment renders alignment table', () => {
      const c = makeContainer();
      randomCharacterGenerationSection.renderDetail(c, 'alignment');
      expect(c.textContent).toContain('Lawful');
      expect(c.textContent).toContain('Chaotic');
    });
  });
});
