// The six standard Shadowdark dice in ascending order.
// dice-page.js iterates this to build the button grid — adding a new die
// only requires adding its face count here.
export const DICE_TYPES = [4, 6, 8, 10, 12, 20];

/**
 * Returns a random integer in [1, sides] — simulates a single die roll.
 *
 * Uses Math.random() which is not cryptographically secure, but is
 * perfectly adequate for a tabletop dice roller.
 *
 * @param {number} sides - Number of faces on the die (e.g. 20 for a d20).
 * @returns {number} An integer from 1 to sides inclusive.
 */
export function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}
