import { describe, it, expect, beforeEach } from 'vitest';

import {
  renderTitlesSection,
  renderDeitiesSection,
  renderRandomCharacterGenerationSection,
} from '../../app/js/library-sections-character.js';

function makeContainer() {
  return document.createElement('div');
}

describe('renderTitlesSection', () => {
  let container;
  beforeEach(() => { container = makeContainer(); renderTitlesSection(container); });

  it('renders a header for each class', () => {
    const headers = Array.from(container.querySelectorAll('.reference-section-header')).map((h) => h.textContent);
    expect(headers).toContain('Fighter');
    expect(headers).toContain('Priest');
    expect(headers).toContain('Thief');
    expect(headers).toContain('Wizard');
  });

  it('renders four title tables', () => {
    expect(container.querySelectorAll('table').length).toBe(4);
  });

  it('shows correct fighter titles', () => {
    expect(container.textContent).toContain('Squire');
    expect(container.textContent).toContain('Lord/Lady');
  });

  it('shows correct wizard titles', () => {
    expect(container.textContent).toContain('Apprentice');
    expect(container.textContent).toContain('Archmage');
  });
});

describe('renderDeitiesSection', () => {
  let container;
  beforeEach(() => { container = makeContainer(); renderDeitiesSection(container); });

  it('renders group headers', () => {
    const headers = Array.from(container.querySelectorAll('.reference-section-header')).map((h) => h.textContent);
    expect(headers).toContain('The Four Lords');
    expect(headers).toContain('The Dark Trio');
  });

  it('renders Saint Terragnis as a card', () => {
    const names = Array.from(container.querySelectorAll('.reference-card__name')).map((n) => n.textContent);
    expect(names).toContain('Saint Terragnis');
  });

  it('renders all seven named deities', () => {
    expect(container.textContent).toContain('Gede');
    expect(container.textContent).toContain('Madeera the Covenant');
    expect(container.textContent).toContain('Ord');
    expect(container.textContent).toContain('Memnon');
    expect(container.textContent).toContain('Ramlaat');
    expect(container.textContent).toContain('Shune the Vile');
  });

  it('shows alignment for each deity', () => {
    const metas = Array.from(container.querySelectorAll('.reference-card__meta')).map((m) => m.textContent);
    expect(metas).toContain('Lawful');
    expect(metas).toContain('Chaotic');
    expect(metas).toContain('Neutral');
  });

  it('renders the random deity table', () => {
    expect(container.textContent).toContain('Random Deity');
  });
});

describe('renderRandomCharacterGenerationSection', () => {
  let container;
  beforeEach(() => { container = makeContainer(); renderRandomCharacterGenerationSection(container); });

  it('renders ancestry table', () => {
    const headers = Array.from(container.querySelectorAll('.reference-section-header')).map((h) => h.textContent);
    expect(headers.some((h) => h.includes('Ancestry'))).toBe(true);
  });

  it('renders class table', () => {
    expect(container.textContent).toContain('Fighter');
    expect(container.textContent).toContain('Wizard');
  });

  it('renders alignment table', () => {
    expect(container.textContent).toContain('Lawful');
    expect(container.textContent).toContain('Chaotic');
  });

  it('renders starting spells tables for priest and wizard', () => {
    const headers = Array.from(container.querySelectorAll('.reference-section-header')).map((h) => h.textContent);
    expect(headers.some((h) => h.includes('Priest'))).toBe(true);
    expect(headers.some((h) => h.includes('Wizard'))).toBe(true);
  });

  it('renders 0-level gear table', () => {
    const headers = Array.from(container.querySelectorAll('.reference-section-header')).map((h) => h.textContent);
    expect(headers.some((h) => h.includes('Gear'))).toBe(true);
    expect(container.textContent).toContain('Torch');
  });
});
