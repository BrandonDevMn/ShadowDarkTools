import { describe, it, expect, vi } from 'vitest';
import { registerServiceWorker } from '../../app/js/service-worker-registration.js';

describe('registerServiceWorker', () => {
  // ── Not supported ───────────────────────────────────────────────────────

  it('resolves to false when the navigator has no serviceWorker property', async () => {
    // Passing a plain empty object simulates a browser without SW support —
    // 'serviceWorker' in {} is false, so the early-exit branch fires.
    const result = await registerServiceWorker({});
    expect(result).toBe(false);
  });

  // ── Supported and successful ────────────────────────────────────────────

  it('resolves to true when registration succeeds', async () => {
    const mockNavigator = {
      serviceWorker: {
        register: vi.fn().mockResolvedValue({ scope: '/' }),
      },
    };

    const result = await registerServiceWorker(mockNavigator);
    expect(result).toBe(true);
  });

  it('calls navigator.serviceWorker.register with the relative SW path and updateViaCache none', async () => {
    // Relative path keeps registration correct under any subdirectory.
    // updateViaCache:'none' ensures the browser never serves the SW script
    // from its HTTP cache, so new deploys are detected on every page load.
    const mockRegister = vi.fn().mockResolvedValue({});
    await registerServiceWorker({ serviceWorker: { register: mockRegister } });
    expect(mockRegister).toHaveBeenCalledWith('./service-worker.js', { updateViaCache: 'none' });
  });

  // ── Supported but registration throws ──────────────────────────────────

  it('resolves to false when registration rejects', async () => {
    // Registration can fail when the SW file is not found or has a syntax error.
    // The app should degrade gracefully rather than crash.
    const mockNavigator = {
      serviceWorker: {
        register: vi.fn().mockRejectedValue(new Error('SW file not found')),
      },
    };

    const result = await registerServiceWorker(mockNavigator);
    expect(result).toBe(false);
  });
});
