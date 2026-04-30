import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock dependencies before importing app.js so Vitest hoists these stubs
// above the static imports — same behaviour as Jest's jest.mock() hoisting.
vi.mock('../../app/js/hello-world.js', () => ({
  renderHelloWorld: vi.fn().mockReturnValue(true),
}));

vi.mock('../../app/js/service-worker-registration.js', () => ({
  registerServiceWorker: vi.fn().mockResolvedValue(true),
}));

import { initializeApp } from '../../app/js/app.js';
import { renderHelloWorld } from '../../app/js/hello-world.js';
import { registerServiceWorker } from '../../app/js/service-worker-registration.js';

describe('initializeApp', () => {
  beforeEach(() => {
    // Provide a fresh DOM with the expected #app element before each test
    document.body.innerHTML = '<div id="app"></div>';
    vi.clearAllMocks();
  });

  // ── Rendering ───────────────────────────────────────────────────────────

  it('calls renderHelloWorld with the #app element', () => {
    initializeApp();
    const appContainer = document.getElementById('app');
    expect(renderHelloWorld).toHaveBeenCalledWith(appContainer);
  });

  it('calls renderHelloWorld exactly once', () => {
    initializeApp();
    expect(renderHelloWorld).toHaveBeenCalledTimes(1);
  });

  // ── Service worker ──────────────────────────────────────────────────────

  it('calls registerServiceWorker', () => {
    initializeApp();
    expect(registerServiceWorker).toHaveBeenCalled();
  });

  // ── Missing #app element ────────────────────────────────────────────────

  it('still calls renderHelloWorld with null when #app is absent', () => {
    // If the element is missing, getElementById returns null.
    // renderHelloWorld handles null gracefully — initializeApp should not crash.
    document.body.innerHTML = '';
    initializeApp();
    expect(renderHelloWorld).toHaveBeenCalledWith(null);
  });
});
