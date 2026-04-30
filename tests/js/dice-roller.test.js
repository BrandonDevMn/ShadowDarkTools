import { describe, it, expect, vi, afterEach } from 'vitest';
import { rollDie, DICE_TYPES } from '../../app/js/dice-roller.js';

describe('DICE_TYPES', () => {
  it('contains all dice including coin (2) and d100', () => {
    expect(DICE_TYPES).toEqual([2, 4, 6, 8, 10, 12, 20, 100]);
  });
});

describe('rollDie', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ── Boundary values via mocked Math.random ──────────────────────────────

  it('returns 1 when Math.random returns 0 (minimum roll)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    expect(rollDie(6)).toBe(1);
  });

  it('returns the maximum face value when Math.random is just below 1', () => {
    // Math.floor(0.9999 * 6) + 1 = Math.floor(5.9994) + 1 = 5 + 1 = 6
    vi.spyOn(Math, 'random').mockReturnValue(0.9999);
    expect(rollDie(6)).toBe(6);
  });

  it('returns the correct value for a d20 minimum roll', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    expect(rollDie(20)).toBe(1);
  });

  it('returns 20 on a d20 when Math.random is just below 1', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.9999);
    expect(rollDie(20)).toBe(20);
  });

  it('returns 100 on a d100 when Math.random is just below 1', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.9999);
    expect(rollDie(100)).toBe(100);
  });

  it('returns the correct mid-range value', () => {
    // Math.floor(0.5 * 8) + 1 = 4 + 1 = 5
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    expect(rollDie(8)).toBe(5);
  });

  // ── Result is always an integer within [1, sides] ───────────────────────

  it('always returns an integer', () => {
    for (let i = 0; i < 50; i++) {
      expect(Number.isInteger(rollDie(20))).toBe(true);
    }
  });

  it('never returns less than 1', () => {
    for (let i = 0; i < 50; i++) {
      expect(rollDie(6)).toBeGreaterThanOrEqual(1);
    }
  });

  it('never returns more than sides', () => {
    for (let i = 0; i < 50; i++) {
      expect(rollDie(6)).toBeLessThanOrEqual(6);
    }
  });
});
