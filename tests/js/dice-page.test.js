import { describe, it, expect, beforeEach } from 'vitest';
import { renderDicePage } from '../../app/js/dice-page.js';

describe('renderDicePage', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
  });

  // ── Happy path ──────────────────────────────────────────────────────────

  it('returns true when given a valid container', () => {
    expect(renderDicePage(container)).toBe(true);
  });

  it('renders a page title element', () => {
    renderDicePage(container);
    expect(container.querySelector('.page-title')).not.toBeNull();
  });

  it('page title text is "Dice"', () => {
    renderDicePage(container);
    expect(container.querySelector('.page-title').textContent).toBe('Dice');
  });

  it('renders a placeholder element', () => {
    renderDicePage(container);
    expect(container.querySelector('.page-placeholder')).not.toBeNull();
  });

  it('placeholder text is "todo"', () => {
    renderDicePage(container);
    expect(container.querySelector('.page-placeholder').textContent).toBe('todo');
  });

  // ── Invalid container ───────────────────────────────────────────────────

  it('returns false when container is null', () => {
    expect(renderDicePage(null)).toBe(false);
  });

  it('returns false when container is undefined', () => {
    expect(renderDicePage(undefined)).toBe(false);
  });

  it('returns false when container is not an Element', () => {
    expect(renderDicePage('#page-dice')).toBe(false);
  });
});
