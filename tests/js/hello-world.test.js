import { describe, it, expect, beforeEach } from 'vitest';
import { renderHelloWorld } from '../../app/js/hello-world.js';

describe('renderHelloWorld', () => {
  let container;

  beforeEach(() => {
    // Fresh container for every test so appended children never leak between tests
    container = document.createElement('div');
  });

  // ── Happy path ──────────────────────────────────────────────────────────

  it('returns true when given a valid container element', () => {
    expect(renderHelloWorld(container)).toBe(true);
  });

  it('appends exactly one h1 element to the container', () => {
    renderHelloWorld(container);
    const headings = container.querySelectorAll('h1');
    expect(headings.length).toBe(1);
  });

  it('sets the h1 text to "Hello, World!"', () => {
    renderHelloWorld(container);
    expect(container.querySelector('h1').textContent).toBe('Hello, World!');
  });

  it('gives the h1 the hello-world-heading CSS class', () => {
    renderHelloWorld(container);
    expect(container.querySelector('h1').className).toBe('hello-world-heading');
  });

  // ── Invalid container — falsy ───────────────────────────────────────────

  it('returns false when container is null', () => {
    expect(renderHelloWorld(null)).toBe(false);
  });

  it('returns false when container is undefined', () => {
    expect(renderHelloWorld(undefined)).toBe(false);
  });

  it('returns false when container is 0', () => {
    expect(renderHelloWorld(0)).toBe(false);
  });

  // ── Invalid container — wrong type ──────────────────────────────────────

  it('returns false when container is a plain string', () => {
    expect(renderHelloWorld('#app')).toBe(false);
  });

  it('returns false when container is a plain object', () => {
    expect(renderHelloWorld({ id: 'app' })).toBe(false);
  });
});
