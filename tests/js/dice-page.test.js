import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock dice-roller so clicks produce a known value and never touch Math.random
vi.mock('../../app/js/dice-roller.js', () => ({
  DICE_TYPES: [2, 4, 6, 8, 10, 12, 20, 100],
  rollDie: vi.fn().mockReturnValue(7),
}));

import { renderDicePage } from '../../app/js/dice-page.js';
import { rollDie } from '../../app/js/dice-roller.js';

describe('renderDicePage', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    vi.clearAllMocks();
    rollDie.mockReturnValue(7);
  });

  // ── Page structure ──────────────────────────────────────────────────────

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

  // ── Result display ──────────────────────────────────────────────────────

  it('renders a result area', () => {
    renderDicePage(container);
    expect(container.querySelector('.dice-result')).not.toBeNull();
  });

  it('result value starts as an em dash before any roll', () => {
    renderDicePage(container);
    expect(container.querySelector('.dice-result__value').textContent).toBe('—');
  });

  it('result label starts with a prompt before any roll', () => {
    renderDicePage(container);
    expect(container.querySelector('.dice-result__label').textContent).toBe('tap a die to roll');
  });

  // ── Dice button grid ────────────────────────────────────────────────────

  it('renders a button for each die type', () => {
    renderDicePage(container);
    expect(container.querySelectorAll('.dice-button').length).toBe(8);
  });

  it('renders buttons with the correct labels in order', () => {
    renderDicePage(container);
    const labels = Array.from(container.querySelectorAll('.dice-button'))
      .map((btn) => btn.textContent);
    expect(labels).toEqual(['Coin', 'd4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100']);
  });

  it('each button has a data-sides attribute matching its die', () => {
    renderDicePage(container);
    const sides = Array.from(container.querySelectorAll('.dice-button'))
      .map((btn) => btn.dataset.sides);
    expect(sides).toEqual(['2', '4', '6', '8', '10', '12', '20', '100']);
  });

  // ── Standard die click behaviour ────────────────────────────────────────

  it('clicking d6 calls rollDie with 6', () => {
    renderDicePage(container);
    container.querySelector('[data-sides="6"]').click();
    expect(rollDie).toHaveBeenCalledWith(6);
  });

  it('clicking d20 calls rollDie with 20', () => {
    renderDicePage(container);
    container.querySelector('[data-sides="20"]').click();
    expect(rollDie).toHaveBeenCalledWith(20);
  });

  it('clicking d100 calls rollDie with 100', () => {
    renderDicePage(container);
    container.querySelector('[data-sides="100"]').click();
    expect(rollDie).toHaveBeenCalledWith(100);
  });

  it('clicking a standard die updates the result value display', () => {
    renderDicePage(container);
    container.querySelector('[data-sides="12"]').click();
    // rollDie is mocked to return 7
    expect(container.querySelector('.dice-result__value').textContent).toBe('7');
  });

  it('clicking a standard die updates the result label to the die name', () => {
    renderDicePage(container);
    container.querySelector('[data-sides="12"]').click();
    expect(container.querySelector('.dice-result__label').textContent).toBe('d12');
  });

  // ── Coin (d2) click behaviour ───────────────────────────────────────────

  it('clicking Coin calls rollDie with 2', () => {
    renderDicePage(container);
    container.querySelector('[data-sides="2"]').click();
    expect(rollDie).toHaveBeenCalledWith(2);
  });

  it('clicking Coin shows "Heads" when roll is 1', () => {
    rollDie.mockReturnValueOnce(1);
    renderDicePage(container);
    container.querySelector('[data-sides="2"]').click();
    expect(container.querySelector('.dice-result__value').textContent).toBe('Heads');
  });

  it('clicking Coin shows "Tails" when roll is 2', () => {
    rollDie.mockReturnValueOnce(2);
    renderDicePage(container);
    container.querySelector('[data-sides="2"]').click();
    expect(container.querySelector('.dice-result__value').textContent).toBe('Tails');
  });

  it('clicking Coin sets the result label to "Coin" not "d2"', () => {
    renderDicePage(container);
    container.querySelector('[data-sides="2"]').click();
    expect(container.querySelector('.dice-result__label').textContent).toBe('Coin');
  });

  // ── Sequence ────────────────────────────────────────────────────────────

  it('rolling multiple dice in sequence keeps only the latest result', () => {
    rollDie.mockReturnValueOnce(3).mockReturnValueOnce(18);
    renderDicePage(container);
    container.querySelector('[data-sides="4"]').click();
    container.querySelector('[data-sides="20"]').click();
    expect(container.querySelector('.dice-result__value').textContent).toBe('18');
    expect(container.querySelector('.dice-result__label').textContent).toBe('d20');
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
