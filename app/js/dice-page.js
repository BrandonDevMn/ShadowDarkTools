import { rollDie, DICE_TYPES } from './dice-roller.js';

// Dice whose button label or result text differs from the default d{sides}/number pattern.
// All other dice follow the defaults automatically — no entry needed here.
const DIE_OVERRIDES = {
  // A d2 is displayed as a coin flip: button reads "Coin", result reads "Heads" or "Tails"
  2: {
    buttonLabel: 'Coin',
    formatResult: (roll) => (roll === 1 ? 'Heads' : 'Tails'),
  },
};

/**
 * Renders the Dice tab into the given container.
 *
 * Layout (top to bottom):
 *   • Large page title
 *   • Result display — shows the rolled value and which die was used,
 *     or a prompt before the first roll
 *   • 4 × 2 grid of die buttons (Coin, d4–d20, d100)
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

  // Large value — em-dash until first roll, then the number or word
  const resultValue = document.createElement('span');
  resultValue.className = 'dice-result__value';
  resultValue.textContent = '—';

  // Smaller label — names the die after rolling, or shows an initial prompt
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
    const override     = DIE_OVERRIDES[sides];
    const buttonLabel  = override?.buttonLabel ?? `d${sides}`;

    const button = document.createElement('button');
    button.className = 'dice-button';
    button.type = 'button';
    button.textContent = buttonLabel;
    button.dataset.sides = String(sides);

    button.addEventListener('click', () => {
      const roll         = rollDie(sides);
      const displayValue = override?.formatResult?.(roll) ?? String(roll);
      resultValue.textContent = displayValue;
      resultLabel.textContent = buttonLabel;
    });

    grid.appendChild(button);
  });

  container.appendChild(grid);
  return true;
}
