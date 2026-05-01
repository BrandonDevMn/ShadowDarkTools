import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../app/js/gm-encounter-data.js', () => ({
  TERRAIN_NAMES: ['Arctic', 'Cave', 'Forest'],
  ENCOUNTER_TABLES: {
    Arctic: [['01', 'An albino kraken in a mountain of ice'], ['02-03', '2d20 cannibalistic bandits']],
    Cave:   [['01', 'A pool of black water'], ['02-03', '1d4 cave spiders']],
    Forest: [['01', 'A peaceful clearing'],   ['02-03', 'Suspicious druids']],
  },
}));

import {
  runningTheGameSection,
  monstersSection,
  magicItemsSection,
  treasureSection,
  npcsAndReactionsSection,
  adventureGeneratorSection,
  overlandTravelSection,
  encounterTablesSection,
  randomEventsSection,
  rumorsSection,
  settlementsSection,
} from '../../app/js/library-sections-gm.js';

function makeContainer() {
  return document.createElement('div');
}

// ── Shared descriptor shape tests ──────────────────────────────────────────

const SECTIONS = [
  runningTheGameSection, monstersSection, magicItemsSection, treasureSection,
  npcsAndReactionsSection, adventureGeneratorSection, overlandTravelSection,
  encounterTablesSection, randomEventsSection, rumorsSection, settlementsSection,
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

  it('includes Traps item', () => {
    expect(runningTheGameSection.items.some((i) => i.label === 'Traps')).toBe(true);
  });

  describe('renderDetail', () => {
    it('traps renders Crossbow entry', () => {
      const c = makeContainer();
      runningTheGameSection.renderDetail(c, 'traps');
      expect(c.textContent).toContain('Crossbow');
    });

    it('hazards renders Quicksand entry', () => {
      const c = makeContainer();
      runningTheGameSection.renderDetail(c, 'hazards');
      expect(c.textContent).toContain('Quicksand');
    });

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

  it('includes Sample Blessings item', () => {
    expect(treasureSection.items.some((i) => i.label === 'Sample Blessings')).toBe(true);
  });

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

    it('sample-blessings renders Wraithsight', () => {
      const c = makeContainer();
      treasureSection.renderDetail(c, 'sample-blessings');
      expect(c.textContent).toContain('Wraithsight');
    });
  });
});

// ── npcsAndReactionsSection ────────────────────────────────────────────────

describe('npcsAndReactionsSection', () => {
  it('has id "npcs-and-reactions"', () => { expect(npcsAndReactionsSection.id).toBe('npcs-and-reactions'); });

  it('includes Reaction Check item', () => {
    expect(npcsAndReactionsSection.items.some((i) => i.label === 'Reaction Check')).toBe(true);
  });

  describe('renderDetail', () => {
    it('reaction-check renders Hostile entry', () => {
      const c = makeContainer();
      npcsAndReactionsSection.renderDetail(c, 'reaction-check');
      expect(c.textContent).toContain('Hostile');
      expect(c.textContent).toContain('Friendly');
    });

    it('npc-qualities renders qualities table', () => {
      const c = makeContainer();
      npcsAndReactionsSection.renderDetail(c, 'npc-qualities');
      expect(c.textContent).toContain('Balding');
    });
  });
});

// ── adventureGeneratorSection ──────────────────────────────────────────────

describe('adventureGeneratorSection', () => {
  it('has id "adventure-generator"', () => { expect(adventureGeneratorSection.id).toBe('adventure-generator'); });

  it('has 2 items', () => { expect(adventureGeneratorSection.items.length).toBe(2); });

  describe('renderDetail', () => {
    it('adventure-hooks renders generator table', () => {
      const c = makeContainer();
      adventureGeneratorSection.renderDetail(c, 'adventure-hooks');
      expect(c.textContent).toContain('Rescue the');
    });

    it('site-names renders site name table', () => {
      const c = makeContainer();
      adventureGeneratorSection.renderDetail(c, 'site-names');
      expect(c.textContent).toContain('Mines of the');
    });
  });
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

    it('hex-tables renders hex danger level table', () => {
      const c = makeContainer();
      overlandTravelSection.renderDetail(c, 'hex-tables');
      expect(c.textContent).toContain('Safe');
      expect(c.textContent).toContain('Deadly');
    });

    it('downtime renders carousing entry', () => {
      const c = makeContainer();
      overlandTravelSection.renderDetail(c, 'downtime');
      expect(c.textContent).toContain('Carousing');
    });
  });
});

// ── encounterTablesSection ─────────────────────────────────────────────────

describe('encounterTablesSection', () => {
  it('has id "encounter-tables"', () => { expect(encounterTablesSection.id).toBe('encounter-tables'); });

  it('items match TERRAIN_NAMES (mocked: Arctic, Cave, Forest)', () => {
    const labels = encounterTablesSection.items.map((i) => i.label);
    expect(labels).toContain('Arctic');
    expect(labels).toContain('Cave');
    expect(labels).toContain('Forest');
  });

  it('items are sorted alphabetically', () => {
    const labels = encounterTablesSection.items.map((i) => i.label);
    expect(labels).toEqual([...labels].sort((a, b) => a.localeCompare(b)));
  });

  describe('renderDetail', () => {
    it('Arctic terrain renders encounter table', () => {
      const c = makeContainer();
      encounterTablesSection.renderDetail(c, 'Arctic');
      expect(c.querySelector('table')).not.toBeNull();
      expect(c.textContent).toContain('kraken');
    });

    it('unknown terrain renders nothing', () => {
      const c = makeContainer();
      encounterTablesSection.renderDetail(c, 'Volcano');
      expect(c.querySelector('table')).toBeNull();
    });
  });
});

// ── randomEventsSection ────────────────────────────────────────────────────

describe('randomEventsSection', () => {
  it('has id "random-events"', () => { expect(randomEventsSection.id).toBe('random-events'); });

  it('has 50 items', () => { expect(randomEventsSection.items.length).toBe(50); });

  it('each item has a sublabel with a roll range', () => {
    randomEventsSection.items.forEach((item) => {
      expect(item.sublabel).toMatch(/^d100:/);
    });
  });

  describe('renderDetail', () => {
    it('renders a reference card for a known item', () => {
      const firstItem = randomEventsSection.items[0];
      const c = makeContainer();
      randomEventsSection.renderDetail(c, firstItem.id);
      expect(c.querySelector('.reference-card')).not.toBeNull();
    });
  });
});

// ── rumorsSection ──────────────────────────────────────────────────────────

describe('rumorsSection', () => {
  it('has id "rumors"', () => { expect(rumorsSection.id).toBe('rumors'); });

  it('has 50 items', () => { expect(rumorsSection.items.length).toBe(50); });

  describe('renderDetail', () => {
    it('renders a reference card for a known item', () => {
      const firstItem = rumorsSection.items[0];
      const c = makeContainer();
      rumorsSection.renderDetail(c, firstItem.id);
      expect(c.querySelector('.reference-card')).not.toBeNull();
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
