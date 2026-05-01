import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('../../app/js/gm-encounter-data.js', () => ({
  TERRAIN_NAMES: ['Arctic', 'Cave', 'Forest'],
  ENCOUNTER_TABLES: {
    Arctic: [['01', 'An albino kraken in a mountain of ice'], ['02-03', '2d20 cannibalistic bandits']],
    Cave:   [['01', 'A pool of black water'], ['02-03', '1d4 cave spiders']],
    Forest: [['01', 'A peaceful clearing'], ['02-03', 'Suspicious druids']],
  },
}));

import {
  renderRunningTheGameSection,
  renderMonstersSection,
  renderMagicItemsSection,
  renderTreasureSection,
  renderNpcsAndReactionsSection,
  renderAdventureGeneratorSection,
  renderOverlandTravelSection,
  renderEncounterTablesSection,
  renderRandomEventsSection,
  renderRumorsSection,
  renderSettlementsSection,
} from '../../app/js/library-sections-gm.js';

function makeContainer() {
  return document.createElement('div');
}

describe('renderRunningTheGameSection', () => {
  let container;
  beforeEach(() => { container = makeContainer(); renderRunningTheGameSection(container); });

  it('renders Difficulty Classes header', () => {
    const headers = Array.from(container.querySelectorAll('.reference-section-header')).map((h) => h.textContent);
    expect(headers).toContain('Difficulty Classes');
  });

  it('renders Traps table', () => {
    expect(container.textContent).toContain('Traps');
    expect(container.textContent).toContain('Crossbow');
  });

  it('renders Hazards table', () => {
    expect(container.textContent).toContain('Hazards');
    expect(container.textContent).toContain('Quicksand');
  });

  it('renders XP table', () => {
    expect(container.textContent).toContain('Poor');
    expect(container.textContent).toContain('Legendary');
  });

  it('renders optional modes', () => {
    expect(container.textContent).toContain('Hunter Mode');
    expect(container.textContent).toContain('Pulp Mode');
  });
});

describe('renderMonstersSection', () => {
  let container;
  beforeEach(() => { container = makeContainer(); renderMonstersSection(container); });

  it('renders stat block format section', () => {
    const headers = Array.from(container.querySelectorAll('.reference-section-header')).map((h) => h.textContent);
    expect(headers).toContain('Stat Block Format');
  });

  it('renders combat roles', () => {
    expect(container.textContent).toContain('Mook');
    expect(container.textContent).toContain('Legendary');
  });

  it('renders monster generator table', () => {
    expect(container.textContent).toContain('Monster Generator');
    expect(container.textContent).toContain('Beastlike');
  });

  it('renders mutations table', () => {
    expect(container.textContent).toContain('Mutations');
  });
});

describe('renderMagicItemsSection', () => {
  let container;
  beforeEach(() => { container = makeContainer(); renderMagicItemsSection(container); });

  it('renders design principles', () => {
    expect(container.textContent).toContain('Design Principles');
  });

  it('renders qualities table', () => {
    expect(container.textContent).toContain('Qualities Table');
  });

  it('renders item type table', () => {
    expect(container.textContent).toContain('Item Type');
    expect(container.textContent).toContain('Potion');
  });
});

describe('renderTreasureSection', () => {
  let container;
  beforeEach(() => { container = makeContainer(); renderTreasureSection(container); });

  it('renders XP quality table', () => {
    expect(container.textContent).toContain('Fabulous');
    expect(container.textContent).toContain('3');
  });

  it('renders boons section', () => {
    expect(container.textContent).toContain('Boons');
    expect(container.textContent).toContain('Oaths');
    expect(container.textContent).toContain('Secrets');
  });

  it('renders sample blessings', () => {
    expect(container.textContent).toContain('Wraithsight');
  });
});

describe('renderNpcsAndReactionsSection', () => {
  let container;
  beforeEach(() => { container = makeContainer(); renderNpcsAndReactionsSection(container); });

  it('renders reaction check table', () => {
    expect(container.textContent).toContain('Hostile');
    expect(container.textContent).toContain('Friendly');
  });

  it('renders NPC qualities table', () => {
    expect(container.textContent).toContain('NPC Qualities');
    expect(container.textContent).toContain('Balding');
  });

  it('renders occupation table', () => {
    expect(container.textContent).toContain('Gravedigger');
  });
});

describe('renderAdventureGeneratorSection', () => {
  let container;
  beforeEach(() => { container = makeContainer(); renderAdventureGeneratorSection(container); });

  it('renders adventure generator table', () => {
    expect(container.textContent).toContain('Adventure Generator');
    expect(container.textContent).toContain('Rescue the');
  });

  it('renders site name generator', () => {
    expect(container.textContent).toContain('Site Name');
    expect(container.textContent).toContain('Mines of the');
  });
});

describe('renderOverlandTravelSection', () => {
  let container;
  beforeEach(() => { container = makeContainer(); renderOverlandTravelSection(container); });

  it('renders travel per day table', () => {
    expect(container.textContent).toContain('Travel per Day');
    expect(container.textContent).toContain('Walking');
    expect(container.textContent).toContain('4 hours');
  });

  it('renders hex tables', () => {
    expect(container.textContent).toContain('Hex Terrain');
    expect(container.textContent).toContain('Points of Interest');
  });

  it('renders downtime section', () => {
    expect(container.textContent).toContain('Carousing');
  });
});

describe('renderEncounterTablesSection', () => {
  let container;
  beforeEach(() => { container = makeContainer(); renderEncounterTablesSection(container); });

  it('renders a terrain selector', () => {
    expect(container.querySelector('select')).not.toBeNull();
  });

  it('selector has terrain options from data', () => {
    const options = Array.from(container.querySelectorAll('option')).map((o) => o.textContent);
    expect(options).toContain('Arctic');
    expect(options).toContain('Forest');
  });

  it('shows a table after selecting a terrain', () => {
    const select = container.querySelector('select');
    select.value = 'Arctic';
    select.dispatchEvent(new Event('change'));
    expect(container.querySelector('table')).not.toBeNull();
  });

  it('shows encounter entries for selected terrain', () => {
    const select = container.querySelector('select');
    select.value = 'Arctic';
    select.dispatchEvent(new Event('change'));
    expect(container.textContent).toContain('albino kraken');
  });
});

describe('renderRandomEventsSection', () => {
  let container;
  beforeEach(() => { container = makeContainer(); renderRandomEventsSection(container); });

  it('renders a table with d100 header', () => {
    expect(container.querySelector('table')).not.toBeNull();
    expect(container.textContent).toContain('d100');
  });

  it('includes event entries', () => {
    expect(container.textContent).toContain('ground shakes');
  });

  it('has 50 table body rows', () => {
    expect(container.querySelectorAll('tbody tr').length).toBe(50);
  });
});

describe('renderRumorsSection', () => {
  let container;
  beforeEach(() => { container = makeContainer(); renderRumorsSection(container); });

  it('renders a table', () => {
    expect(container.querySelector('table')).not.toBeNull();
  });

  it('includes rumor entries', () => {
    expect(container.textContent).toContain('armored beast');
  });

  it('has 50 table body rows', () => {
    expect(container.querySelectorAll('tbody tr').length).toBe(50);
  });
});

describe('renderSettlementsSection', () => {
  let container;
  beforeEach(() => { container = makeContainer(); renderSettlementsSection(container); });

  it('renders settlement type table', () => {
    expect(container.textContent).toContain('Village');
    expect(container.textContent).toContain('Metropolis');
  });

  it('renders districts table', () => {
    expect(container.textContent).toContain('Slums');
    expect(container.textContent).toContain('Castle district');
  });

  it('renders tavern generator', () => {
    expect(container.textContent).toContain('Tavern Generator');
    expect(container.textContent).toContain('The Crimson Rat');
  });

  it('renders food table', () => {
    expect(container.textContent).toContain('Poor');
    expect(container.textContent).toContain('Boiled cabbage');
  });

  it('renders drinks table', () => {
    expect(container.textContent).toContain('Barnacle grog');
  });
});
