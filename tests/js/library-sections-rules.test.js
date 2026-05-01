import { describe, it, expect, beforeEach } from 'vitest';

import {
  coreMechanicSection,
  combatSection,
  advancementSection,
  spellcastingSection,
  lightAndDarknessSection,
  restingSection,
  deathAndDyingSection,
  stealthAndSurpriseSection,
  luckTokensSection,
} from '../../app/js/library-sections-rules.js';

function sorted(items) {
  const labels = items.map((i) => i.label);
  return [...labels].sort((a, b) => a.localeCompare(b));
}

function makeContainer() {
  return document.createElement('div');
}

// ── Shared descriptor shape tests ──────────────────────────────────────────

const SECTIONS = [
  coreMechanicSection, combatSection, advancementSection, spellcastingSection,
  lightAndDarknessSection, restingSection, deathAndDyingSection,
  stealthAndSurpriseSection, luckTokensSection,
];

SECTIONS.forEach((section) => {
  describe(`${section.label} descriptor shape`, () => {
    it('has an id string', () => { expect(typeof section.id).toBe('string'); });
    it('has a label string', () => { expect(typeof section.label).toBe('string'); });
    it('has a non-empty items array', () => {
      expect(Array.isArray(section.items)).toBe(true);
      expect(section.items.length).toBeGreaterThan(0);
    });
    it('items are sorted alphabetically', () => {
      expect(section.items.map((i) => i.label)).toEqual(sorted(section.items));
    });
    it('each item has id and label strings', () => {
      section.items.forEach((item) => {
        expect(typeof item.id).toBe('string');
        expect(typeof item.label).toBe('string');
      });
    });
    it('renderDetail is a function', () => {
      expect(typeof section.renderDetail).toBe('function');
    });
    it('renderDetail does nothing for unknown itemId', () => {
      const c = makeContainer();
      expect(() => section.renderDetail(c, 'nonexistent-id')).not.toThrow();
    });
  });
});

// ── coreMechanicSection ────────────────────────────────────────────────────

describe('coreMechanicSection', () => {
  it('has id "core-mechanic"', () => { expect(coreMechanicSection.id).toBe('core-mechanic'); });

  it('includes Difficulty Classes item', () => {
    expect(coreMechanicSection.items.some((i) => i.label === 'Difficulty Classes')).toBe(true);
  });

  it('includes Distances item', () => {
    expect(coreMechanicSection.items.some((i) => i.label === 'Distances')).toBe(true);
  });

  describe('renderDetail', () => {
    it('difficulty-classes renders table with Easy', () => {
      const c = makeContainer();
      coreMechanicSection.renderDetail(c, 'difficulty-classes');
      expect(c.querySelector('table')).not.toBeNull();
      expect(c.textContent).toContain('Easy');
    });

    it('distances renders Near distance', () => {
      const c = makeContainer();
      coreMechanicSection.renderDetail(c, 'distances');
      expect(c.textContent).toContain('Near');
    });

    it('advantage-disadvantage renders Advantage card', () => {
      const c = makeContainer();
      coreMechanicSection.renderDetail(c, 'advantage-disadvantage');
      const names = Array.from(c.querySelectorAll('.reference-card__name')).map((n) => n.textContent);
      expect(names).toContain('Advantage');
      expect(names).toContain('Disadvantage');
    });

    it('natural-rolls renders Natural 20 card', () => {
      const c = makeContainer();
      coreMechanicSection.renderDetail(c, 'natural-rolls');
      const names = Array.from(c.querySelectorAll('.reference-card__name')).map((n) => n.textContent);
      expect(names).toContain('Natural 20');
    });
  });
});

// ── combatSection ──────────────────────────────────────────────────────────

describe('combatSection', () => {
  it('has id "combat"', () => { expect(combatSection.id).toBe('combat'); });

  it('includes Initiative item', () => {
    expect(combatSection.items.some((i) => i.label === 'Initiative')).toBe(true);
  });

  it('includes Climbing item (movement)', () => {
    expect(combatSection.items.some((i) => i.label === 'Climbing')).toBe(true);
  });

  it('initiative item has a sublabel', () => {
    const item = combatSection.items.find((i) => i.label === 'Initiative');
    expect(item.sublabel).toBeTruthy();
  });

  describe('renderDetail', () => {
    it('initiative renders Initiative card', () => {
      const c = makeContainer();
      combatSection.renderDetail(c, 'initiative');
      const names = Array.from(c.querySelectorAll('.reference-card__name')).map((n) => n.textContent);
      expect(names).toContain('Initiative');
    });

    it('critical-hit renders Critical Hit card', () => {
      const c = makeContainer();
      combatSection.renderDetail(c, 'critical-hit');
      const names = Array.from(c.querySelectorAll('.reference-card__name')).map((n) => n.textContent);
      expect(names).toContain('Critical Hit');
    });

    it('climbing renders Climbing card', () => {
      const c = makeContainer();
      combatSection.renderDetail(c, 'climbing');
      expect(c.textContent).toContain('Climbing');
    });
  });
});

// ── advancementSection ─────────────────────────────────────────────────────

describe('advancementSection', () => {
  it('has id "advancement"', () => { expect(advancementSection.id).toBe('advancement'); });

  it('includes Level Advancement Table item', () => {
    expect(advancementSection.items.some((i) => i.label === 'Level Advancement Table')).toBe(true);
  });

  describe('renderDetail', () => {
    it('level-advancement-table renders 10 level rows', () => {
      const c = makeContainer();
      advancementSection.renderDetail(c, 'level-advancement-table');
      expect(c.querySelectorAll('tbody tr').length).toBeGreaterThanOrEqual(10);
    });

    it('xp-requirements renders XP text', () => {
      const c = makeContainer();
      advancementSection.renderDetail(c, 'xp-requirements');
      expect(c.textContent).toContain('XP');
    });
  });
});

// ── spellcastingSection ────────────────────────────────────────────────────

describe('spellcastingSection', () => {
  it('has id "spellcasting"', () => { expect(spellcastingSection.id).toBe('spellcasting'); });

  it('includes Casting Rules item', () => {
    expect(spellcastingSection.items.some((i) => i.label === 'Casting Rules')).toBe(true);
  });

  it('includes Wizard Mishaps T1–2 item', () => {
    expect(spellcastingSection.items.some((i) => i.label.includes('T1'))).toBe(true);
  });

  describe('renderDetail', () => {
    it('casting-rules renders wizard casting card', () => {
      const c = makeContainer();
      spellcastingSection.renderDetail(c, 'casting-rules');
      const names = Array.from(c.querySelectorAll('.reference-card__name')).map((n) => n.textContent);
      expect(names.some((n) => n.includes('Wizard'))).toBe(true);
    });

    it('wizard-mishaps-t1-2 renders mishap table', () => {
      const c = makeContainer();
      spellcastingSection.renderDetail(c, 'wizard-mishaps-t1-2');
      expect(c.querySelector('table')).not.toBeNull();
      expect(c.textContent).toContain('Devastation');
    });

    it('wizard-mishaps-t5 renders tier 5 effects', () => {
      const c = makeContainer();
      spellcastingSection.renderDetail(c, 'wizard-mishaps-t5');
      expect(c.textContent).toContain('Shred');
    });

    it('priest-penance renders sacrifice value table', () => {
      const c = makeContainer();
      spellcastingSection.renderDetail(c, 'priest-penance');
      expect(c.textContent).toContain('5 gp');
    });
  });
});

// ── lightAndDarknessSection ────────────────────────────────────────────────

describe('lightAndDarknessSection', () => {
  it('has id "light-and-darkness"', () => { expect(lightAndDarknessSection.id).toBe('light-and-darkness'); });

  describe('renderDetail', () => {
    it('light-sources renders Torch in table', () => {
      const c = makeContainer();
      lightAndDarknessSection.renderDetail(c, 'light-sources');
      expect(c.textContent).toContain('Torch');
    });

    it('total-darkness renders paragraph about disadvantage', () => {
      const c = makeContainer();
      lightAndDarknessSection.renderDetail(c, 'total-darkness');
      expect(c.textContent).toContain('disadvantage');
    });

    it('light-mishaps renders d6 mishap table', () => {
      const c = makeContainer();
      lightAndDarknessSection.renderDetail(c, 'light-mishaps');
      expect(c.textContent).toContain('Dud');
    });
  });
});

// ── restingSection ─────────────────────────────────────────────────────────

describe('restingSection', () => {
  it('has id "resting"', () => { expect(restingSection.id).toBe('resting'); });

  it('includes Resting item', () => {
    expect(restingSection.items.some((i) => i.label === 'Resting')).toBe(true);
  });

  describe('renderDetail', () => {
    it('resting renders Resting card', () => {
      const c = makeContainer();
      restingSection.renderDetail(c, 'resting');
      const names = Array.from(c.querySelectorAll('.reference-card__name')).map((n) => n.textContent);
      expect(names).toContain('Resting');
    });

    it('encounter-cadence renders danger level table', () => {
      const c = makeContainer();
      restingSection.renderDetail(c, 'encounter-cadence');
      expect(c.textContent).toContain('Unsafe');
      expect(c.textContent).toContain('Deadly');
    });
  });
});

// ── deathAndDyingSection ───────────────────────────────────────────────────

describe('deathAndDyingSection', () => {
  it('has id "death-and-dying"', () => { expect(deathAndDyingSection.id).toBe('death-and-dying'); });

  it('includes Going to 0 HP item', () => {
    expect(deathAndDyingSection.items.some((i) => i.label.includes('0 HP'))).toBe(true);
  });

  describe('renderDetail', () => {
    it('going-to-0-hp renders card', () => {
      const c = makeContainer();
      deathAndDyingSection.renderDetail(c, 'going-to-0-hp');
      expect(c.textContent).toContain('0 HP');
    });

    it('stabilize renders Stabilize card', () => {
      const c = makeContainer();
      deathAndDyingSection.renderDetail(c, 'stabilize');
      const names = Array.from(c.querySelectorAll('.reference-card__name')).map((n) => n.textContent);
      expect(names).toContain('Stabilize');
    });

    it('deadly-mode renders Deadly Mode card', () => {
      const c = makeContainer();
      deathAndDyingSection.renderDetail(c, 'deadly-mode');
      expect(c.textContent).toContain('Deadly Mode');
    });
  });
});

// ── stealthAndSurpriseSection ──────────────────────────────────────────────

describe('stealthAndSurpriseSection', () => {
  it('has id "stealth-and-surprise"', () => { expect(stealthAndSurpriseSection.id).toBe('stealth-and-surprise'); });

  it('has 4 items', () => { expect(stealthAndSurpriseSection.items.length).toBe(4); });

  describe('renderDetail', () => {
    it('hiding renders Hiding card', () => {
      const c = makeContainer();
      stealthAndSurpriseSection.renderDetail(c, 'hiding');
      const names = Array.from(c.querySelectorAll('.reference-card__name')).map((n) => n.textContent);
      expect(names).toContain('Hiding');
    });

    it('surprise renders Surprise card', () => {
      const c = makeContainer();
      stealthAndSurpriseSection.renderDetail(c, 'surprise');
      const names = Array.from(c.querySelectorAll('.reference-card__name')).map((n) => n.textContent);
      expect(names).toContain('Surprise');
    });
  });
});

// ── luckTokensSection ──────────────────────────────────────────────────────

describe('luckTokensSection', () => {
  it('has id "luck-tokens"', () => { expect(luckTokensSection.id).toBe('luck-tokens'); });

  it('includes Earning Luck Tokens item', () => {
    expect(luckTokensSection.items.some((i) => i.label === 'Earning Luck Tokens')).toBe(true);
  });

  describe('renderDetail', () => {
    it('earning-luck-tokens renders card', () => {
      const c = makeContainer();
      luckTokensSection.renderDetail(c, 'earning-luck-tokens');
      const names = Array.from(c.querySelectorAll('.reference-card__name')).map((n) => n.textContent);
      expect(names.some((n) => n.includes('Earning'))).toBe(true);
    });

    it('how-many-to-give renders Heroic and Grim cards', () => {
      const c = makeContainer();
      luckTokensSection.renderDetail(c, 'how-many-to-give');
      expect(c.textContent).toContain('Heroic');
      expect(c.textContent).toContain('Grim');
    });
  });
});
