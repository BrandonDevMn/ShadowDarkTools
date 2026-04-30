import { rollDie, DICE_TYPES } from './dice-roller.js';

/**
 * Renders the Dice tab into the given container.
 *
 * Layout (top to bottom):
 *   • Large page title
 *   • Result display — shows the rolled number and which die was used,
 *     or a prompt before the first roll
 *   • 3 × 2 grid of die buttons (d4 through d20)
 *
 * Returns true on success, false if container is not a valid Element.
 *
 * @param {Element|null|undefined} container
 * @returns {boolean}
 */
export function renderDicePage(container) {
  if (!container || !(container instanceof Element)) {
    return false;
  }

  const title = document.createElement('h1');
  title.className = 'page-title';
  title.textContent = 'Dice';
  container.appendChild(title);

  // ── Result display ────────────────────────────────────────────────────

  const resultArea = document.createElement('div');
  resultArea.className = 'dice-result';

  // Large number — starts as an em-dash until the first roll
  const resultValue = document.createElement('span');
  resultValue.className = 'dice-result__value';
  resultValue.textContent = '—';

  // Smaller label — names the die after rolling, or shows a prompt
  const resultLabel = document.createElement('span');
  resultLabel.className = 'dice-result__label';
  resultLabel.textContent = 'tap a die to roll';

  resultArea.appendChild(resultValue);
  resultArea.appendChild(resultLabel);
  container.appendChild(resultArea);

  // ── Dice button grid ──────────────────────────────────────────────────

  const grid = document.createElement('div');
  grid.className = 'dice-grid';

  DICE_TYPES.forEach((sides) => {
    const button = document.createElement('button');
    button.className = 'dice-button';
    button.type = 'button';
    button.textContent = `d${sides}`;
    button.dataset.sides = String(sides);

    button.addEventListener('click', () => {
      const roll = rollDie(sides);
      resultValue.textContent = String(roll);
      resultLabel.textContent = `d${sides}`;
    });

    grid.appendChild(button);
  });

  container.appendChild(grid);
  return true;
}
