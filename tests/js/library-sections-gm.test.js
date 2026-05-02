import { describe, it, expect, beforeEach } from 'vitest';

import {
  runningTheGameSection,
  monstersSection,
  magicItemsSection,
  treasureSection,
  npcsAndReactionsSection,
  overlandTravelSection,
  settlementsSection,
} from '../../app/js/library-sections-gm.js';

function makeContainer() {
  return document.createElement('div');
}

// ── Shared descriptor shape tests ──────────────────────────────────────────

const SECTIONS = [
  runningTheGameSection, monstersSection, magicItemsSection, treasureSection,
  npcsAndReactionsSection, overlandTravelSection, settlementsSection,
];

SECTIONS.forEach((section) => {
  describe(`${section.label} descriptor shape`, () => {
    it('has a non-empty items array', () => {
      expect(Array.isArray(section.items)).toBe(true);
      expect(section.items.length).toBeGreaterThan(0);
    });
    it('items are sorted alphabetically', () => {
      const labels = section.items.map((i) => i.label);
      expect(labels).toEqual([...labels].sort((a, b) => a.localeCompare(b)));
    });
    it('renderDetail is a function', () => { expect(typeof section.renderDetail).toBe('function'); });
    it('renderDetail does nothing for unknown id', () => {
      const c = makeContainer();
      expect(() => section.renderDetail(c, '__unknown__')).not.toThrow();
    });
  });
});

// ── runningTheGameSection ──────────────────────────────────────────────────

describe('runningTheGameSection', () => {
  it('has id "running-the-game"', () => { expect(runningTheGameSection.id).toBe('running-the-game'); });

  describe('renderDetail', () => {
    it('awarding-xp renders XP quality table', () => {
      const c = makeContainer();
      runningTheGameSection.renderDetail(c, 'awarding-xp');
      expect(c.textContent).toContain('Poor');
      expect(c.textContent).toContain('Legendary');
    });

    it('optional-modes renders Hunter Mode card', () => {
      const c = makeContainer();
      runningTheGameSection.renderDetail(c, 'optional-modes');
      expect(c.textContent).toContain('Hunter Mode');
      expect(c.textContent).toContain('Pulp Mode');
    });
  });
});

// ── monstersSection ────────────────────────────────────────────────────────

describe('monstersSection', () => {
  it('has id "monsters"', () => { expect(monstersSection.id).toBe('monsters'); });

  it('includes Monster Generator item', () => {
    expect(monstersSection.items.some((i) => i.label === 'Monster Generator')).toBe(true);
  });

  describe('renderDetail', () => {
    it('stat-block renders stat block paragraph', () => {
      const c = makeContainer();
      monstersSection.renderDetail(c, 'stat-block');
      expect(c.textContent).toContain('AC');
      expect(c.textContent).toContain('HP');
    });

    it('combat-roles renders Mook card', () => {
      const c = makeContainer();
      monstersSection.renderDetail(c, 'combat-roles');
      expect(c.textContent).toContain('Mook');
      expect(c.textContent).toContain('Legendary');
    });

    it('monster-generator renders generator table with Beastlike', () => {
      const c = makeContainer();
      monstersSection.renderDetail(c, 'monster-generator');
      expect(c.textContent).toContain('Beastlike');
    });

    it('monster-mutations renders mutations table', () => {
      const c = makeContainer();
      monstersSection.renderDetail(c, 'monster-mutations');
      expect(c.textContent).toContain('Wings');
    });
  });
});

// ── magicItemsSection ──────────────────────────────────────────────────────

describe('magicItemsSection', () => {
  it('has id "magic-items"', () => { expect(magicItemsSection.id).toBe('magic-items'); });

  describe('renderDetail', () => {
    it('design-principles renders Unique card', () => {
      const c = makeContainer();
      magicItemsSection.renderDetail(c, 'design-principles');
      expect(c.textContent).toContain('Unique');
    });

    it('item-tables renders Qualities table', () => {
      const c = makeContainer();
      magicItemsSection.renderDetail(c, 'item-tables');
      expect(c.textContent).toContain('Qualities');
    });
  });
});

// ── treasureSection ────────────────────────────────────────────────────────

describe('treasureSection', () => {
  it('has id "treasure"', () => { expect(treasureSection.id).toBe('treasure'); });

  describe('renderDetail', () => {
    it('xp-for-treasure renders quality table', () => {
      const c = makeContainer();
      treasureSection.renderDetail(c, 'xp-for-treasure');
      expect(c.textContent).toContain('Fabulous');
    });

    it('boons renders Oaths card', () => {
      const c = makeContainer();
      treasureSection.renderDetail(c, 'boons');
      expect(c.textContent).toContain('Oaths');
    });
  });
});

// ── npcsAndReactionsSection ────────────────────────────────────────────────

describe('npcsAndReactionsSection', () => {
  it('has id "npcs-and-reactions"', () => { expect(npcsAndReactionsSection.id).toBe('npcs-and-reactions'); });
});

// ── overlandTravelSection ──────────────────────────────────────────────────

describe('overlandTravelSection', () => {
  it('has id "overland-travel"', () => { expect(overlandTravelSection.id).toBe('overland-travel'); });

  it('includes Travel Speeds item', () => {
    expect(overlandTravelSection.items.some((i) => i.label === 'Travel Speeds')).toBe(true);
  });

  describe('renderDetail', () => {
    it('travel-speeds renders travel table', () => {
      const c = makeContainer();
      overlandTravelSection.renderDetail(c, 'travel-speeds');
      expect(c.textContent).toContain('Walking');
      expect(c.textContent).toContain('Mounted');
    });

    it('downtime renders carousing entry', () => {
      const c = makeContainer();
      overlandTravelSection.renderDetail(c, 'downtime');
      expect(c.textContent).toContain('Carousing');
    });
  });
});

// ── settlementsSection ─────────────────────────────────────────────────────

describe('settlementsSection', () => {
  it('has id "settlements"', () => { expect(settlementsSection.id).toBe('settlements'); });

  it('includes Tavern Generator item', () => {
    expect(settlementsSection.items.some((i) => i.label === 'Tavern Generator')).toBe(true);
  });

  describe('renderDetail', () => {
    it('settlement-types renders type table', () => {
      const c = makeContainer();
      settlementsSection.renderDetail(c, 'settlement-types');
      expect(c.textContent).toContain('Village');
      expect(c.textContent).toContain('Metropolis');
    });

    it('tavern-generator renders tavern table', () => {
      const c = makeContainer();
      settlementsSection.renderDetail(c, 'tavern-generator');
      expect(c.textContent).toContain('Crimson Rat');
    });

    it('food-and-drinks renders food table', () => {
      const c = makeContainer();
      settlementsSection.renderDetail(c, 'food-and-drinks');
      expect(c.textContent).toContain('Boiled cabbage');
    });
  });
});
