/**
 * Boot screen — fullscreen overlay shown on every cold start.
 *
 * Stays visible for at least minDurationMs while the optional updateCheck
 * promise settles. If the update check finds a new SW and triggers a reload
 * the page restarts behind the screen. If not, the screen fades out.
 *
 * All DOM and timer dependencies are injectable so tests run without real
 * timers or layout.
 *
 * @param {object} [options]
 * @param {number}   [options.minDurationMs=2000]
 * @param {number}   [options.fadeOutMs=350]
 * @param {Promise}  [options.updateCheck]
 * @param {Document} [options.docRef=document]
 * @param {function(number): Promise} [options.timerFn]
 * @returns {Promise<void>}
 */
export function showBootScreen({
  minDurationMs = 2000,
  fadeOutMs     = 350,
  updateCheck   = Promise.resolve(),
  docRef        = document,
  timerFn       = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
} = {}) {
  const overlay = docRef.createElement('div');
  overlay.className = 'boot-screen';
  overlay.setAttribute('aria-hidden', 'true');

  const content = docRef.createElement('div');
  content.className = 'boot-screen__content';

  const iconWrap = docRef.createElement('div');
  iconWrap.className = 'boot-screen__icon-wrap';

  const icon = docRef.createElement('img');
  icon.className = 'boot-screen__icon';
  icon.src = './icons/apple-touch-icon.png';
  icon.alt = '';

  const tagline = docRef.createElement('p');
  tagline.className = 'boot-screen__tagline';
  tagline.textContent = 'lighting torches…';

  iconWrap.appendChild(icon);
  content.appendChild(iconWrap);
  content.appendChild(tagline);
  overlay.appendChild(content);
  docRef.body.appendChild(overlay);

  return Promise.all([timerFn(minDurationMs), updateCheck])
    .then(() => {
      overlay.classList.add('boot-screen--exit');
      return timerFn(fadeOutMs);
    })
    .then(() => overlay.remove());
}
