/**
 * GM generator functions — pure logic, no DOM.
 *
 * All randomness goes through rollDie() so tests can mock Math.random.
 * Each function returns a plain object describing the generated result.
 */

import { ADVENTURE_HOOK, SITE_NAME }                           from './gm-adventure-data.js';
import {
  NPC_ANCESTRY_TABLE, NPC_ALIGNMENT_TABLE, NPC_AGE_TABLE,
  NPC_WEALTH_TABLE, NPC_QUALITIES, NPC_OCCUPATIONS,
  NPC_NAMES, NPC_EPITHETS, REACTION_TABLE,
}                                                              from './gm-npc-data.js';
import { RANDOM_EVENTS }                                       from './gm-events-data.js';
import { RUMORS }                                              from './gm-rumors-data.js';
import { OATHS, SECRET_DETAIL1, SECRET_DETAIL2, BLESSINGS }   from './gm-treasure-data.js';
import { MAGIC_ITEMS }                                         from './gm-magic-items-data.js';
import { ENCOUNTER_TABLES }                                    from './gm-encounter-data.js';

// ── Dice ──────────────────────────────────────────────────────────────────

function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

// ── d100 resolver ─────────────────────────────────────────────────────────

/**
 * Look up a roll (1–100) against a table of [min, max, text] entries.
 * "00" on a d100 is treated as 100.
 */
function resolveD100(table, roll) {
  for (const [min, max, text] of table) {
    if (roll >= min && roll <= max) return text;
  }
  return table[table.length - 1][2];
}

// ── Adventure Hook ────────────────────────────────────────────────────────

/**
 * Generates a random adventure hook (three-part sentence) and site name
 * (three-part name) using two independent sets of d20 rolls.
 */
export function generateAdventureHook() {
  // Each column is rolled independently per the rules; die size matches table length
  const hook = [
    ADVENTURE_HOOK.detail1[rollDie(ADVENTURE_HOOK.detail1.length) - 1],
    ADVENTURE_HOOK.detail2[rollDie(ADVENTURE_HOOK.detail2.length) - 1],
    ADVENTURE_HOOK.detail3[rollDie(ADVENTURE_HOOK.detail3.length) - 1],
  ].join(' ');

  const site = [
    SITE_NAME.name1[rollDie(SITE_NAME.name1.length) - 1],
    SITE_NAME.name2[rollDie(SITE_NAME.name2.length) - 1],
    SITE_NAME.name3[rollDie(SITE_NAME.name3.length) - 1],
  ].join(' ');

  return { hook, site };
}

// ── NPC ───────────────────────────────────────────────────────────────────

/**
 * Generates a random NPC with ancestry, name, alignment, age, wealth,
 * one quality set (appearance/does/secret), occupation, epithet, and
 * an unmodified 2d6 reaction roll.
 */
export function generateNPC() {
  const ancestry   = NPC_ANCESTRY_TABLE[rollDie(NPC_ANCESTRY_TABLE.length) - 1];
  const alignment  = NPC_ALIGNMENT_TABLE[rollDie(NPC_ALIGNMENT_TABLE.length) - 1];
  const age        = NPC_AGE_TABLE[rollDie(NPC_AGE_TABLE.length) - 1];
  const wealth     = NPC_WEALTH_TABLE[rollDie(NPC_WEALTH_TABLE.length) - 1];
  const quality    = NPC_QUALITIES[rollDie(NPC_QUALITIES.length) - 1];
  const occupation = NPC_OCCUPATIONS[rollDie(NPC_OCCUPATIONS.length) - 1][rollDie(NPC_OCCUPATIONS[0].length) - 1];
  const epithet    = NPC_EPITHETS[rollDie(NPC_EPITHETS.length) - 1][rollDie(NPC_EPITHETS[0].length) - 1];
  const nameList   = NPC_NAMES[ancestry] ?? NPC_NAMES['Human'];
  const name       = nameList[rollDie(nameList.length) - 1];

  // Reaction is 2d6 (no CHA modifier — players apply that when interacting)
  const reactionRoll = rollDie(6) + rollDie(6);
  const reaction     = REACTION_TABLE.find((r) => reactionRoll >= r.min && reactionRoll <= r.max)?.attitude ?? 'Neutral';

  return {
    name,
    ancestry,
    alignment,
    age,
    wealth,
    appearance:  quality.appearance,
    does:        quality.does,
    secret:      quality.secret,
    occupation,
    epithet,
    reaction,
    reactionRoll,
  };
}

// ── Random Encounter ──────────────────────────────────────────────────────

/**
 * Returns a sorted list of all terrain names available for encounter rolls.
 */
export function getTerrainNames() {
  return Object.keys(ENCOUNTER_TABLES).sort();
}

/**
 * Rolls a d100 encounter for the given terrain type.
 * Returns null if the terrain name is not found.
 */
export function generateEncounter(terrain) {
  const table = ENCOUNTER_TABLES[terrain];
  if (!table) return null;

  const roll    = rollDie(100);
  const entry   = table.find(([range]) => {
    if (range.includes('-')) {
      const [lo, hi] = range.split('-').map(Number);
      return roll >= lo && roll <= hi;
    }
    // Single value — "00" means 100
    const val = range === '00' ? 100 : Number(range);
    return roll === val;
  });

  return {
    terrain,
    roll,
    encounter: entry ? entry[1] : 'No encounter',
  };
}

// ── Random Event ──────────────────────────────────────────────────────────

/**
 * Rolls a d100 random event.
 */
export function generateRandomEvent() {
  const roll = rollDie(100);
  return { roll, event: resolveD100(RANDOM_EVENTS, roll) };
}

// ── Rumor ─────────────────────────────────────────────────────────────────

/**
 * Rolls a d100 rumor.
 */
export function generateRumor() {
  const roll = rollDie(100);
  return { roll, rumor: resolveD100(RUMORS, roll) };
}

// ── Boons ─────────────────────────────────────────────────────────────────

/**
 * Rolls a random oath (d8).
 */
export function generateOath() {
  return { oath: OATHS[rollDie(OATHS.length) - 1] };
}

/**
 * Rolls a random secret (two independent rolls, one per column).
 */
export function generateSecret() {
  const detail1 = SECRET_DETAIL1[rollDie(SECRET_DETAIL1.length) - 1];
  const detail2 = SECRET_DETAIL2[rollDie(SECRET_DETAIL2.length) - 1];
  return { secret: `${detail1} ${detail2}` };
}

/**
 * Rolls a random blessing.
 */
export function generateBlessing() {
  return { ...BLESSINGS[rollDie(BLESSINGS.length) - 1] };
}

// ── Magic Item ────────────────────────────────────────────────────────────

/**
 * Picks a random named magic item from the full list.
 */
export function generateMagicItem() {
  return { ...MAGIC_ITEMS[rollDie(MAGIC_ITEMS.length) - 1] };
}
