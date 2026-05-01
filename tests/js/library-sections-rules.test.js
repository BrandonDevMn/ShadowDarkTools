import { describe, it, expect, beforeEach } from 'vitest';

import {
  renderCoreMechanicSection,
  renderCombatSection,
  renderAdvancementSection,
  renderSpellcastingSection,
  renderLightAndDarknessSection,
  renderRestingSection,
  renderDeathAndDyingSection,
  renderStealthAndSurpriseSection,
  renderLuckTokensSection,
} from '../../app/js/library-sections-rules.js';

function makeContainer() {
  return document.createElement('div');
}

describe('renderCoreMechanicSection', () => {
  it('renders section headers', () => {
    const c = makeContainer();
    renderCoreMechanicSection(c);
    const headers = Array.from(c.querySelectorAll('.reference-section-header')).map((h) => h.textContent);
    expect(headers).toContain('Difficulty Classes');
    expect(headers).toContain('Distances');
  });

  it('renders DC 9 Easy in the table', () => {
    const c = makeContainer();
    renderCoreMechanicSection(c);
    expect(c.textContent).toContain('Easy');
    expect(c.textContent).toContain('9');
  });

  it('renders the Near distance', () => {
    const c = makeContainer();
    renderCoreMechanicSection(c);
    expect(c.textContent).toContain('Near');
  });

  it('renders advantage and disadvantage cards', () => {
    const c = makeContainer();
    renderCoreMechanicSection(c);
    const names = Array.from(c.querySelectorAll('.reference-card__name')).map((n) => n.textContent);
    expect(names).toContain('Advantage');
    expect(names).toContain('Disadvantage');
  });
});

describe('renderCombatSection', () => {
  let container;
  beforeEach(() => { container = makeContainer(); renderCombatSection(container); });

  it('renders a reference list', () => {
    expect(container.querySelector('.reference-list')).not.toBeNull();
  });

  it('renders an Initiative card', () => {
    const names = Array.from(container.querySelectorAll('.reference-card__name')).map((n) => n.textContent);
    expect(names).toContain('Initiative');
  });

  it('renders Critical Hit card', () => {
    const names = Array.from(container.querySelectorAll('.reference-card__name')).map((n) => n.textContent);
    expect(names).toContain('Critical Hit');
  });

  it('renders Movement section', () => {
    const headers = Array.from(container.querySelectorAll('.reference-section-header')).map((h) => h.textContent);
    expect(headers).toContain('Movement');
  });
});

describe('renderAdvancementSection', () => {
  let container;
  beforeEach(() => { container = makeContainer(); renderAdvancementSection(container); });

  it('renders the Level Advancement Table header', () => {
    const headers = Array.from(container.querySelectorAll('.reference-section-header')).map((h) => h.textContent);
    expect(headers).toContain('Level Advancement Table');
  });

  it('renders 10 level rows in the table', () => {
    const rows = container.querySelectorAll('tbody tr');
    expect(rows.length).toBeGreaterThanOrEqual(10);
  });

  it('shows XP to level up for level 1', () => {
    expect(container.textContent).toContain('10 XP');
  });
});

describe('renderSpellcastingSection', () => {
  let container;
  beforeEach(() => { container = makeContainer(); renderSpellcastingSection(container); });

  it('renders wizard casting card', () => {
    const names = Array.from(container.querySelectorAll('.reference-card__name')).map((n) => n.textContent);
    expect(names.some((n) => n.includes('Wizard'))).toBe(true);
  });

  it('renders mishap table headers', () => {
    const headers = Array.from(container.querySelectorAll('.reference-section-header')).map((h) => h.textContent);
    expect(headers.some((h) => h.includes('Mishap'))).toBe(true);
  });

  it('includes all three mishap tiers', () => {
    const text = container.textContent;
    expect(text).toContain('Tier 1');
    expect(text).toContain('Tier 3');
    expect(text).toContain('Tier 5');
  });

  it('shows the penance sacrifice value table', () => {
    expect(container.textContent).toContain('Penance');
    expect(container.textContent).toContain('5 gp');
  });
});

describe('renderLightAndDarknessSection', () => {
  let container;
  beforeEach(() => { container = makeContainer(); renderLightAndDarknessSection(container); });

  it('renders the light sources table', () => {
    expect(container.querySelector('table')).not.toBeNull();
  });

  it('shows Torch in the table', () => {
    expect(container.textContent).toContain('Torch');
  });

  it('renders Total Darkness section', () => {
    const headers = Array.from(container.querySelectorAll('.reference-section-header')).map((h) => h.textContent);
    expect(headers).toContain('Total Darkness');
  });

  it('renders Light Mishaps table', () => {
    expect(container.textContent).toContain('Light Mishaps');
    expect(container.textContent).toContain('Dud');
  });
});

describe('renderRestingSection', () => {
  let container;
  beforeEach(() => { container = makeContainer(); renderRestingSection(container); });

  it('renders a Resting card', () => {
    const names = Array.from(container.querySelectorAll('.reference-card__name')).map((n) => n.textContent);
    expect(names).toContain('Resting');
  });

  it('renders danger level table', () => {
    expect(container.textContent).toContain('Unsafe');
    expect(container.textContent).toContain('Risky');
    expect(container.textContent).toContain('Deadly');
  });
});

describe('renderDeathAndDyingSection', () => {
  let container;
  beforeEach(() => { container = makeContainer(); renderDeathAndDyingSection(container); });

  it('renders Going to 0 HP card', () => {
    const names = Array.from(container.querySelectorAll('.reference-card__name')).map((n) => n.textContent);
    expect(names.some((n) => n.includes('0 HP'))).toBe(true);
  });

  it('renders Stabilize card', () => {
    const names = Array.from(container.querySelectorAll('.reference-card__name')).map((n) => n.textContent);
    expect(names).toContain('Stabilize');
  });

  it('renders optional modes', () => {
    expect(container.textContent).toContain('Deadly Mode');
    expect(container.textContent).toContain('Fatality Mode');
  });
});

describe('renderStealthAndSurpriseSection', () => {
  let container;
  beforeEach(() => { container = makeContainer(); renderStealthAndSurpriseSection(container); });

  it('renders a Hiding card', () => {
    const names = Array.from(container.querySelectorAll('.reference-card__name')).map((n) => n.textContent);
    expect(names).toContain('Hiding');
  });

  it('renders a Surprise card', () => {
    const names = Array.from(container.querySelectorAll('.reference-card__name')).map((n) => n.textContent);
    expect(names).toContain('Surprise');
  });
});

describe('renderLuckTokensSection', () => {
  let container;
  beforeEach(() => { container = makeContainer(); renderLuckTokensSection(container); });

  it('renders luck token cards', () => {
    expect(container.querySelector('.reference-card')).not.toBeNull();
  });

  it('shows how to earn luck tokens', () => {
    const names = Array.from(container.querySelectorAll('.reference-card__name')).map((n) => n.textContent);
    expect(names.some((n) => n.includes('Earning'))).toBe(true);
  });

  it('shows heroic and grim modes', () => {
    expect(container.textContent).toContain('Heroic');
    expect(container.textContent).toContain('Grim');
  });
});
