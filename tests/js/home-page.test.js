import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock hello-world before importing home-page so the dependency is stubbed
vi.mock('../../app/js/hello-world.js', () => ({
  renderHelloWorld: vi.fn().mockReturnValue(true),
}));

import { renderHomePage } from '../../app/js/home-page.js';
import { renderHelloWorld } from '../../app/js/hello-world.js';

describe('renderHomePage', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    vi.clearAllMocks();
  });

  // ── Happy path ──────────────────────────────────────────────────────────

  it('returns true when given a valid container', () => {
    expect(renderHomePage(container)).toBe(true);
  });

  it('calls renderHelloWorld with the container', () => {
    renderHomePage(container);
    expect(renderHelloWorld).toHaveBeenCalledWith(container);
  });

  it('returns whatever renderHelloWorld returns', () => {
    renderHelloWorld.mockReturnValueOnce(false);
    expect(renderHomePage(container)).toBe(false);
  });

  // ── Invalid container ───────────────────────────────────────────────────

  it('returns false when container is null', () => {
    expect(renderHomePage(null)).toBe(false);
  });

  it('returns false when container is undefined', () => {
    expect(renderHomePage(undefined)).toBe(false);
  });

  it('returns false when container is not an Element', () => {
    expect(renderHomePage('#page-home')).toBe(false);
  });

  it('does not call renderHelloWorld when container is invalid', () => {
    renderHomePage(null);
    expect(renderHelloWorld).not.toHaveBeenCalled();
  });
});
