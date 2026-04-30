import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../app/js/spells-data.js', () => ({
  SPELLS: [
    { class: 'wizard', tier: 1, name: 'Magic Missile', range: 'Far',   duration: 'Instant', description: 'Unerring bolts.' },
    { class: 'wizard', tier: 1, name: 'Sleep',         range: 'Near',  duration: '1 minute', description: 'Creatures slumber.' },
    { class: 'wizard', tier: 3, name: 'Fireball',      range: 'Far',   duration: 'Instant', description: 'Blazing explosion.' },
    { class: 'priest', tier: 1, name: 'Cure Wounds',   range: 'Touch', duration: 'Instant', description: 'Restores HP.' },
    { class: 'priest', tier: 2, name: 'Hold Person',   range: 'Near',  duration: 'Focus',   description: 'Paralyzes humanoid.' },
  ],
}));

import { renderSpellsList } from '../../app/js/spells-list.js';

describe('renderSpellsList', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
  });

  // ── Structure ───────────────────────────────────────────────────────────

  it('returns true when given a valid container', () => {
    expect(renderSpellsList(container)).toBe(true);
  });

  it('renders a filter row', () => {
    renderSpellsList(container);
    expect(container.querySelector('.spells-filter')).not.toBeNull();
  });

  it('renders a Wizard filter button', () => {
    renderSpellsList(container);
    const btns = container.querySelectorAll('.spells-filter__btn');
    const labels = Array.from(btns).map((b) => b.textContent);
    expect(labels).toContain('Wizard');
  });

  it('renders a Priest filter button', () => {
    renderSpellsList(container);
    const btns = container.querySelectorAll('.spells-filter__btn');
    const labels = Array.from(btns).map((b) => b.textContent);
    expect(labels).toContain('Priest');
  });

  it('renders a spell list area', () => {
    renderSpellsList(container);
    expect(container.querySelector('.spells-list')).not.toBeNull();
  });

  // ── Default filter (wizard) ─────────────────────────────────────────────

  it('wizard filter button is active by default', () => {
    renderSpellsList(container);
    const wizardBtn = Array.from(container.querySelectorAll('.spells-filter__btn'))
      .find((b) => b.dataset.filter === 'wizard');
    expect(wizardBtn.classList.contains('spells-filter__btn--active')).toBe(true);
  });

  it('priest filter button is not active by default', () => {
    renderSpellsList(container);
    const priestBtn = Array.from(container.querySelectorAll('.spells-filter__btn'))
      .find((b) => b.dataset.filter === 'priest');
    expect(priestBtn.classList.contains('spells-filter__btn--active')).toBe(false);
  });

  it('shows wizard spells by default', () => {
    renderSpellsList(container);
    const names = Array.from(container.querySelectorAll('.spell-card__name')).map((n) => n.textContent);
    expect(names).toContain('Magic Missile');
  });

  it('does not show priest spells by default', () => {
    renderSpellsList(container);
    const names = Array.from(container.querySelectorAll('.spell-card__name')).map((n) => n.textContent);
    expect(names).not.toContain('Cure Wounds');
  });

  // ── Filter switching ────────────────────────────────────────────────────

  it('clicking Priest shows priest spells', () => {
    renderSpellsList(container);
    container.querySelector('[data-filter="priest"]').click();
    const names = Array.from(container.querySelectorAll('.spell-card__name')).map((n) => n.textContent);
    expect(names).toContain('Cure Wounds');
  });

  it('clicking Priest hides wizard spells', () => {
    renderSpellsList(container);
    container.querySelector('[data-filter="priest"]').click();
    const names = Array.from(container.querySelectorAll('.spell-card__name')).map((n) => n.textContent);
    expect(names).not.toContain('Magic Missile');
  });

  it('clicking Wizard after Priest restores wizard spells', () => {
    renderSpellsList(container);
    container.querySelector('[data-filter="priest"]').click();
    container.querySelector('[data-filter="wizard"]').click();
    const names = Array.from(container.querySelectorAll('.spell-card__name')).map((n) => n.textContent);
    expect(names).toContain('Magic Missile');
  });

  it('clicking Priest makes priest button active', () => {
    renderSpellsList(container);
    container.querySelector('[data-filter="priest"]').click();
    const priestBtn = container.querySelector('[data-filter="priest"]');
    expect(priestBtn.classList.contains('spells-filter__btn--active')).toBe(true);
  });

  it('clicking Priest makes wizard button inactive', () => {
    renderSpellsList(container);
    container.querySelector('[data-filter="priest"]').click();
    const wizardBtn = container.querySelector('[data-filter="wizard"]');
    expect(wizardBtn.classList.contains('spells-filter__btn--active')).toBe(false);
  });

  // ── Tier headers ────────────────────────────────────────────────────────

  it('renders tier headers for the active filter', () => {
    renderSpellsList(container);
    const headers = Array.from(container.querySelectorAll('.spells-tier-header'))
      .map((h) => h.textContent);
    expect(headers).toContain('Tier 1');
    expect(headers).toContain('Tier 3');
  });

  it('tiers appear in ascending order', () => {
    renderSpellsList(container);
    const tiers = Array.from(container.querySelectorAll('.spells-tier-header'))
      .map((h) => parseInt(h.textContent.replace('Tier ', ''), 10));
    expect(tiers).toEqual([...tiers].sort((a, b) => a - b));
  });

  // ── Spell card content ──────────────────────────────────────────────────

  it('each spell card shows a name', () => {
    renderSpellsList(container);
    container.querySelectorAll('.spell-card').forEach((card) => {
      expect(card.querySelector('.spell-card__name')).not.toBeNull();
    });
  });

  it('each spell card shows range and duration in the meta line', () => {
    renderSpellsList(container);
    const meta = container.querySelector('.spell-card__meta').textContent;
    expect(meta).toContain('Far');
    expect(meta).toContain('Instant');
  });

  it('each spell card shows a description', () => {
    renderSpellsList(container);
    container.querySelectorAll('.spell-card').forEach((card) => {
      expect(card.querySelector('.spell-card__description')).not.toBeNull();
    });
  });

  // ── Invalid container ───────────────────────────────────────────────────

  it('returns false when container is null', () => {
    expect(renderSpellsList(null)).toBe(false);
  });

  it('returns false when container is undefined', () => {
    expect(renderSpellsList(undefined)).toBe(false);
  });

  it('returns false when container is not an Element', () => {
    expect(renderSpellsList('#page-library')).toBe(false);
  });
});
