import { describe, it, expect, vi } from 'vitest';
import { registerServiceWorker, checkForUpdates } from '../../app/js/service-worker-registration.js';

// ── Helpers ──────────────────────────────────────────────────────────────────

function makeNav(registerResult = {}) {
  return {
    serviceWorker: {
      register: vi.fn().mockResolvedValue(registerResult),
      addEventListener: vi.fn(),
    },
  };
}

function makeDoc(initialState = 'visible') {
  const listeners = {};
  const doc = {
    visibilityState: initialState,
    addEventListener: vi.fn((event, fn) => { listeners[event] = fn; }),
  };
  doc._trigger = (event, newState) => {
    doc.visibilityState = newState;
    if (listeners[event]) listeners[event]();
  };
  return doc;
}

function makeLocation() {
  return { reload: vi.fn() };
}

// ── Not supported ─────────────────────────────────────────────────────────────

describe('registerServiceWorker — not supported', () => {
  it('resolves to false when the navigator has no serviceWorker property', async () => {
    const result = await registerServiceWorker({});
    expect(result).toBe(false);
  });
});

// ── Registration ──────────────────────────────────────────────────────────────

describe('registerServiceWorker — registration', () => {
  it('resolves to true when registration succeeds', async () => {
    const nav = makeNav();
    const result = await registerServiceWorker(nav, makeDoc(), makeLocation());
    expect(result).toBe(true);
  });

  it('calls register with the relative SW path and updateViaCache none', async () => {
    const nav = makeNav();
    await registerServiceWorker(nav, makeDoc(), makeLocation());
    expect(nav.serviceWorker.register).toHaveBeenCalledWith(
      './service-worker.js',
      { updateViaCache: 'none' },
    );
  });

  it('resolves to false when registration rejects', async () => {
    const nav = {
      serviceWorker: {
        register: vi.fn().mockRejectedValue(new Error('SW file not found')),
        addEventListener: vi.fn(),
      },
    };
    const result = await registerServiceWorker(nav, makeDoc(), makeLocation());
    expect(result).toBe(false);
  });
});

// ── visibilitychange (auto-update check) ─────────────────────────────────────

describe('registerServiceWorker — visibilitychange', () => {
  it('attaches a visibilitychange listener to the document', async () => {
    const doc = makeDoc();
    await registerServiceWorker(makeNav(), doc, makeLocation());
    expect(doc.addEventListener).toHaveBeenCalledWith('visibilitychange', expect.any(Function));
  });

  it('calls registration.update() when document becomes visible', async () => {
    const doc = makeDoc('hidden');
    const registration = { update: vi.fn() };
    const nav = makeNav(registration);
    await registerServiceWorker(nav, doc, makeLocation());

    doc._trigger('visibilitychange', 'visible');
    expect(registration.update).toHaveBeenCalledOnce();
  });

  it('does not call registration.update() when document becomes hidden', async () => {
    const doc = makeDoc('visible');
    const registration = { update: vi.fn() };
    const nav = makeNav(registration);
    await registerServiceWorker(nav, doc, makeLocation());

    doc._trigger('visibilitychange', 'hidden');
    expect(registration.update).not.toHaveBeenCalled();
  });
});

// ── controllerchange (reload on new SW) ──────────────────────────────────────

describe('registerServiceWorker — controllerchange', () => {
  it('attaches a controllerchange listener to navigator.serviceWorker', async () => {
    const nav = makeNav();
    await registerServiceWorker(nav, makeDoc(), makeLocation());
    expect(nav.serviceWorker.addEventListener).toHaveBeenCalledWith(
      'controllerchange',
      expect.any(Function),
    );
  });

  it('calls location.reload() when controllerchange fires', async () => {
    const loc = makeLocation();
    const nav = makeNav();
    await registerServiceWorker(nav, makeDoc(), loc);

    const [, handler] = nav.serviceWorker.addEventListener.mock.calls.find(
      ([event]) => event === 'controllerchange',
    );
    handler();
    expect(loc.reload).toHaveBeenCalledOnce();
  });

  it('calls location.reload() only once even if controllerchange fires multiple times', async () => {
    const loc = makeLocation();
    const nav = makeNav();
    await registerServiceWorker(nav, makeDoc(), loc);

    const [, handler] = nav.serviceWorker.addEventListener.mock.calls.find(
      ([event]) => event === 'controllerchange',
    );
    handler();
    handler();
    handler();
    expect(loc.reload).toHaveBeenCalledOnce();
  });
});

// ── checkForUpdates ───────────────────────────────────────────────────────────

describe('checkForUpdates', () => {
  it('does nothing when serviceWorker is not in navigator', async () => {
    await expect(checkForUpdates({})).resolves.toBeUndefined();
  });

  it('calls getRegistration with no arguments', async () => {
    const getReg = vi.fn().mockResolvedValue(null);
    await checkForUpdates({ serviceWorker: { getRegistration: getReg } });
    expect(getReg).toHaveBeenCalledWith();
  });

  it('calls reg.update() when a registration exists', async () => {
    const updateFn = vi.fn().mockResolvedValue(undefined);
    const getReg = vi.fn().mockResolvedValue({ update: updateFn });
    await checkForUpdates({ serviceWorker: { getRegistration: getReg } });
    expect(updateFn).toHaveBeenCalledOnce();
  });

  it('does not throw when getRegistration returns undefined (first install)', async () => {
    const getReg = vi.fn().mockResolvedValue(undefined);
    await expect(
      checkForUpdates({ serviceWorker: { getRegistration: getReg } }),
    ).resolves.toBeUndefined();
  });
});
