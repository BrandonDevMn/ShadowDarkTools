import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../app/js/spells-list.js', () => ({
  renderSpellsList: vi.fn().mockReturnValue(true),
}));

vi.mock('../../app/js/ancestries-data.js', () => ({
  ANCESTRIES: [
    { name: 'Human',   description: 'Ambitious folk.',   traitName: 'Ambitious', traitDescription: 'Extra background roll.' },
    { name: 'Elf',     description: 'Long-lived seers.', traitName: 'Farsight',  traitDescription: '+1 to ranged or spellcasting.' },
  ],
}));

vi.mock('../../app/js/classes-data.js', () => ({
  CLASSES: [
    {
      name: 'Fighter', description: 'Martial master.', hitDie: 'd8',
      armor: 'All armor', weapons: 'All weapons',
      abilities: [{ name: 'Grit', description: 'Succeed on one check per day.' }],
    },
  ],
}));

vi.mock('../../app/js/backgrounds-data.js', () => ({
  BACKGROUNDS: [
    { roll: 1, name: 'Urchin', description: 'City streets background.' },
    { roll: 2, name: 'Wanted', description: 'Bounty on your head.'   },
  ],
}));

vi.mock('../../app/js/equipment-data.js', () => ({
  EQUIPMENT: [
    { category: 'weapon', name: 'Dagger', cost: '1 gp', damage: '1d4', range: 'Close', notes: 'Finesse' },
    { category: 'armor',  name: 'Leather', cost: '10 gp', armorClass: '11+DEX', notes: 'Light' },
    { category: 'gear',   name: 'Torch', cost: '1 cp', notes: '1 hour light' },
  ],
}));

import {
  renderSpellsSection,
  renderAncestriesSection,
  renderClassesSection,
  renderAbilityScoresSection,
  renderBackgroundsSection,
  renderAlignmentsSection,
  renderLanguagesSection,
  renderEquipmentSection,
} from '../../app/js/library-sections.js';
import { renderSpellsList } from '../../app/js/spells-list.js';

describe('renderSpellsSection', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    vi.clearAllMocks();
  });

  it('calls renderSpellsList with the container', () => {
    renderSpellsSection(container);
    expect(renderSpellsList).toHaveBeenCalledWith(container);
  });

  it('returns the result of renderSpellsList', () => {
    expect(renderSpellsSection(container)).toBe(true);
  });
});

describe('renderAncestriesSection', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
  });

  it('renders a reference list', () => {
    renderAncestriesSection(container);
    expect(container.querySelector('.reference-list')).not.toBeNull();
  });

  it('renders a card for each ancestry', () => {
    renderAncestriesSection(container);
    expect(container.querySelectorAll('.reference-card').length).toBe(2);
  });

  it('shows ancestry names', () => {
    renderAncestriesSection(container);
    const names = Array.from(container.querySelectorAll('.reference-card__name')).map((n) => n.textContent);
    expect(names).toContain('Human');
    expect(names).toContain('Elf');
  });

  it('shows trait names as meta', () => {
    renderAncestriesSection(container);
    const metas = Array.from(container.querySelectorAll('.reference-card__meta')).map((m) => m.textContent);
    expect(metas).toContain('Ambitious');
  });

  it('shows trait descriptions', () => {
    renderAncestriesSection(container);
    const descs = Array.from(container.querySelectorAll('.reference-card__description')).map((d) => d.textContent);
    expect(descs).toContain('Extra background roll.');
  });
});

describe('renderClassesSection', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
  });

  it('renders a reference list', () => {
    renderClassesSection(container);
    expect(container.querySelector('.reference-list')).not.toBeNull();
  });

  it('renders a card for each class', () => {
    renderClassesSection(container);
    expect(container.querySelectorAll('.reference-card').length).toBe(1);
  });

  it('shows class name', () => {
    renderClassesSection(container);
    expect(container.querySelector('.reference-card__name').textContent).toBe('Fighter');
  });

  it('shows hit die in meta', () => {
    renderClassesSection(container);
    expect(container.querySelector('.reference-card__meta').textContent).toContain('d8');
  });

  it('renders class abilities', () => {
    renderClassesSection(container);
    expect(container.querySelector('.reference-card__ability')).not.toBeNull();
  });

  it('shows ability name', () => {
    renderClassesSection(container);
    expect(container.querySelector('.reference-card__ability-name').textContent).toContain('Grit');
  });
});

describe('renderAbilityScoresSection', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
  });

  it('renders a reference list', () => {
    renderAbilityScoresSection(container);
    expect(container.querySelector('.reference-list')).not.toBeNull();
  });

  it('renders all 6 ability score cards', () => {
    renderAbilityScoresSection(container);
    expect(container.querySelectorAll('.reference-card').length).toBe(6);
  });

  it('includes Strength', () => {
    renderAbilityScoresSection(container);
    const names = Array.from(container.querySelectorAll('.reference-card__name')).map((n) => n.textContent);
    expect(names.some((n) => n.includes('Strength'))).toBe(true);
  });

  it('includes Charisma', () => {
    renderAbilityScoresSection(container);
    const names = Array.from(container.querySelectorAll('.reference-card__name')).map((n) => n.textContent);
    expect(names.some((n) => n.includes('Charisma'))).toBe(true);
  });
});

describe('renderBackgroundsSection', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
  });

  it('renders a reference list', () => {
    renderBackgroundsSection(container);
    expect(container.querySelector('.reference-list')).not.toBeNull();
  });

  it('renders a card for each background', () => {
    renderBackgroundsSection(container);
    expect(container.querySelectorAll('.reference-card').length).toBe(2);
  });

  it('shows roll number in the card name', () => {
    renderBackgroundsSection(container);
    const names = Array.from(container.querySelectorAll('.reference-card__name')).map((n) => n.textContent);
    expect(names).toContain('1. Urchin');
  });

  it('renders an intro paragraph', () => {
    renderBackgroundsSection(container);
    expect(container.querySelector('.reference-card__description')).not.toBeNull();
  });
});

describe('renderAlignmentsSection', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
  });

  it('renders a reference list', () => {
    renderAlignmentsSection(container);
    expect(container.querySelector('.reference-list')).not.toBeNull();
  });

  it('renders exactly 3 alignment cards', () => {
    renderAlignmentsSection(container);
    expect(container.querySelectorAll('.reference-card').length).toBe(3);
  });

  it('includes Lawful, Neutral, Chaotic', () => {
    renderAlignmentsSection(container);
    const names = Array.from(container.querySelectorAll('.reference-card__name')).map((n) => n.textContent);
    expect(names).toContain('Lawful');
    expect(names).toContain('Neutral');
    expect(names).toContain('Chaotic');
  });
});

describe('renderLanguagesSection', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
  });

  it('renders a reference list', () => {
    renderLanguagesSection(container);
    expect(container.querySelector('.reference-list')).not.toBeNull();
  });

  it('renders multiple language cards', () => {
    renderLanguagesSection(container);
    expect(container.querySelectorAll('.reference-card').length).toBeGreaterThan(1);
  });

  it('includes Common', () => {
    renderLanguagesSection(container);
    const names = Array.from(container.querySelectorAll('.reference-card__name')).map((n) => n.textContent);
    expect(names).toContain('Common');
  });
});

describe('renderEquipmentSection', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
  });

  it('renders section headers for each category', () => {
    renderEquipmentSection(container);
    const headers = Array.from(container.querySelectorAll('.reference-section-header')).map((h) => h.textContent);
    expect(headers).toContain('Weapons');
    expect(headers).toContain('Armor');
    expect(headers).toContain('Gear');
  });

  it('renders a card for each equipment item', () => {
    renderEquipmentSection(container);
    expect(container.querySelectorAll('.reference-card').length).toBe(3);
  });

  it('weapon card shows damage in meta', () => {
    renderEquipmentSection(container);
    const metas = Array.from(container.querySelectorAll('.reference-card__meta')).map((m) => m.textContent);
    expect(metas.some((m) => m.includes('1d4'))).toBe(true);
  });

  it('armor card shows armorClass in meta', () => {
    renderEquipmentSection(container);
    const metas = Array.from(container.querySelectorAll('.reference-card__meta')).map((m) => m.textContent);
    expect(metas.some((m) => m.includes('11+DEX'))).toBe(true);
  });

  it('gear card shows cost in meta', () => {
    renderEquipmentSection(container);
    const metas = Array.from(container.querySelectorAll('.reference-card__meta')).map((m) => m.textContent);
    expect(metas.some((m) => m.includes('1 cp'))).toBe(true);
  });
});
