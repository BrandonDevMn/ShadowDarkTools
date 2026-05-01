import { describe, it, expect, vi, beforeEach } from 'vitest';
import { showBootScreen } from '../../app/js/boot-screen.js';

// Resolves instantly regardless of ms — skips real delays in tests
const instant = () => Promise.resolve();

// Returns a timerFn that holds until release() is called
function holdable() {
  let release;
  const timer = () => new Promise((r) => { release = r; });
  return { timer, release: () => release && release() };
}

describe('showBootScreen', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  // ── DOM structure ───────────────────────────────────────────────────────

  it('appends a .boot-screen element to body while pending', () => {
    const { timer, release } = holdable();
    showBootScreen({ timerFn: timer });
    expect(document.body.querySelector('.boot-screen')).not.toBeNull();
    release();
  });

  it('boot screen has aria-hidden="true"', () => {
    const { timer, release } = holdable();
    showBootScreen({ timerFn: timer });
    expect(document.body.querySelector('.boot-screen').getAttribute('aria-hidden')).toBe('true');
    release();
  });

  it('contains a .boot-screen__icon-wrap', () => {
    const { timer, release } = holdable();
    showBootScreen({ timerFn: timer });
    expect(document.body.querySelector('.boot-screen__icon-wrap')).not.toBeNull();
    release();
  });

  it('contains a .boot-screen__icon img', () => {
    const { timer, release } = holdable();
    showBootScreen({ timerFn: timer });
    expect(document.body.querySelector('.boot-screen__icon')).not.toBeNull();
    release();
  });

  it('icon src points to apple-touch-icon.png', () => {
    const { timer, release } = holdable();
    showBootScreen({ timerFn: timer });
    expect(document.body.querySelector('.boot-screen__icon').src).toContain('apple-touch-icon.png');
    release();
  });

  it('contains a .boot-screen__tagline paragraph', () => {
    const { timer, release } = holdable();
    showBootScreen({ timerFn: timer });
    expect(document.body.querySelector('.boot-screen__tagline')).not.toBeNull();
    release();
  });

  it('tagline text includes "lighting torches"', () => {
    const { timer, release } = holdable();
    showBootScreen({ timerFn: timer });
    expect(document.body.querySelector('.boot-screen__tagline').textContent).toContain('lighting torches');
    release();
  });

  // ── Fade-out and removal ────────────────────────────────────────────────

  it('adds .boot-screen--exit before removing', async () => {
    let exitSeen = false;
    let overlay;
    let calls = 0;

    const trackingTimer = () => {
      calls++;
      if (calls === 1) {
        overlay = document.body.querySelector('.boot-screen');
        return Promise.resolve();
      }
      exitSeen = overlay.classList.contains('boot-screen--exit');
      return Promise.resolve();
    };

    await showBootScreen({ timerFn: trackingTimer });
    expect(exitSeen).toBe(true);
  });

  it('removes the overlay from the DOM after resolving', async () => {
    await showBootScreen({ timerFn: instant });
    expect(document.body.querySelector('.boot-screen')).toBeNull();
  });

  it('returns a Promise', () => {
    const result = showBootScreen({ timerFn: instant });
    expect(result).toBeInstanceOf(Promise);
    return result;
  });

  // ── Update check integration ────────────────────────────────────────────

  it('waits for updateCheck before resolving', async () => {
    let resolveUpdate;
    const updateCheck = new Promise((r) => { resolveUpdate = r; });
    let done = false;

    const boot = showBootScreen({ timerFn: instant, updateCheck }).then(() => { done = true; });

    await Promise.resolve(); // flush microtasks
    expect(done).toBe(false);

    resolveUpdate();
    await boot;
    expect(done).toBe(true);
  });

  it('calls timerFn for both the min duration and fade-out', async () => {
    const timerFn = vi.fn().mockReturnValue(Promise.resolve());
    await showBootScreen({ timerFn, updateCheck: Promise.resolve() });
    expect(timerFn).toHaveBeenCalledTimes(2);
  });
});
