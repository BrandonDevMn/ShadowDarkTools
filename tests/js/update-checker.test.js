import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { checkForUpdate, UPDATE_STATUS } from '../../app/js/update-checker.js';

// Helpers — build lightweight fakes for the parts of the SW registration API
// that checkForUpdate touches: the registration object, and installing workers.

/**
 * Creates a fake ServiceWorkerRegistration that:
 *   - exposes addEventListener so checkForUpdate can attach "updatefound"
 *   - exposes an `update` spy you can resolve or reject
 *   - exposes a `fireUpdateFound(worker)` helper to simulate the browser
 *     discovering a new SW script
 */
function makeRegistration({ updateRejects = false } = {}) {
  const listeners = {};

  const registration = {
    installing: null,

    addEventListener(event, handler) {
      listeners[event] = listeners[event] || [];
      listeners[event].push(handler);
    },

    update: vi.fn().mockImplementation(() =>
      updateRejects ? Promise.reject(new Error('network')) : Promise.resolve()
    ),

    // Test helper — simulates the browser firing "updatefound" after update()
    fireUpdateFound(worker) {
      registration.installing = worker;
      (listeners['updatefound'] || []).forEach((h) => h());
    },
  };

  return registration;
}

/**
 * Creates a fake ServiceWorker (the installing worker) that:
 *   - exposes addEventListener so checkForUpdate can watch "statechange"
 *   - exposes a `setState(s)` helper to simulate the browser advancing state
 */
function makeWorker(initialState = 'installing') {
  const listeners = {};
  const worker = {
    state: initialState,

    addEventListener(event, handler) {
      listeners[event] = listeners[event] || [];
      listeners[event].push(handler);
    },

    setState(newState) {
      worker.state = newState;
      (listeners['statechange'] || []).forEach((h) => h());
    },
  };
  return worker;
}

// Flush the microtask queue so that awaited Promises inside checkForUpdate
// (i.e. `await registrationPromise`) settle before we fire SW events.
// Two rounds cover the await + the update().catch() chain registration.
async function flushMicrotasks() {
  await Promise.resolve();
  await Promise.resolve();
}

// ── getRegistration returns null (no SW support) ────────────────────────────

describe('checkForUpdate — no SW support', () => {
  it('returns ERROR when getRegistration returns null', async () => {
    const result = await checkForUpdate(() => null);
    expect(result).toBe(UPDATE_STATUS.ERROR);
  });
});

// ── getRegistration promise rejects ─────────────────────────────────────────

describe('checkForUpdate — registration promise rejects', () => {
  it('returns ERROR when the registration promise rejects', async () => {
    const result = await checkForUpdate(() => Promise.reject(new Error('no SW')));
    expect(result).toBe(UPDATE_STATUS.ERROR);
  });
});

// ── registration.update() rejects (network down) ────────────────────────────

describe('checkForUpdate — update() rejects', () => {
  it('returns ERROR when update() rejects', async () => {
    const reg = makeRegistration({ updateRejects: true });
    const result = await checkForUpdate(() => Promise.resolve(reg));
    expect(result).toBe(UPDATE_STATUS.ERROR);
  });
});

// ── No "updatefound" within timeout ─────────────────────────────────────────

describe('checkForUpdate — timeout (already up to date)', () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it('returns UP_TO_DATE when no updatefound fires within the timeout', async () => {
    const reg = makeRegistration();
    const promise = checkForUpdate(() => Promise.resolve(reg), 5_000);

    // Let `await registrationPromise` inside checkForUpdate settle so that
    // the timeout and event listeners are registered before we advance the clock.
    await flushMicrotasks();

    // Advance past the timeout
    vi.advanceTimersByTime(5_001);

    const result = await promise;
    expect(result).toBe(UPDATE_STATUS.UP_TO_DATE);
  });
});

// ── updatefound fires, new worker reaches "activated" ───────────────────────

describe('checkForUpdate — new version found and activated', () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it('returns UPDATED when the installing worker reaches activated', async () => {
    const reg = makeRegistration();
    const worker = makeWorker('installing');

    const promise = checkForUpdate(() => Promise.resolve(reg), 10_000);

    // Let registration setup settle before firing the SW event
    await flushMicrotasks();

    reg.fireUpdateFound(worker);
    await flushMicrotasks();

    worker.setState('activated');

    const result = await promise;
    expect(result).toBe(UPDATE_STATUS.UPDATED);
  });
});

// ── updatefound fires, worker goes redundant (install failed) ────────────────

describe('checkForUpdate — new worker goes redundant', () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it('returns ERROR when the installing worker becomes redundant', async () => {
    const reg = makeRegistration();
    const worker = makeWorker('installing');

    const promise = checkForUpdate(() => Promise.resolve(reg), 10_000);

    await flushMicrotasks();

    reg.fireUpdateFound(worker);
    await flushMicrotasks();

    worker.setState('redundant');

    const result = await promise;
    expect(result).toBe(UPDATE_STATUS.ERROR);
  });
});

// ── updatefound fires, but registration.installing is already null ───────────

describe('checkForUpdate — updatefound with null installing', () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it('returns UP_TO_DATE when installing is null at updatefound time', async () => {
    const reg = makeRegistration();

    const promise = checkForUpdate(() => Promise.resolve(reg), 10_000);

    await flushMicrotasks();

    // Fire updatefound without providing an installing worker
    reg.fireUpdateFound(null);

    const result = await promise;
    expect(result).toBe(UPDATE_STATUS.UP_TO_DATE);
  });
});
