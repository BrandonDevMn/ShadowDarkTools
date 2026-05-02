/**
 * Table group definitions for each GM generator.
 *
 * Each export returns [{ label, render() => Element }].
 * Consumed by the "Table" segment on every generator result screen.
 */

import {
  makeTable, makeReferenceCard, makeReferenceList, makeSectionHeader,
} from './library-helpers.js';
import { ADVENTURE_HOOK, SITE_NAME } from './gm-adventure-data.js';
import {
  NPC_QUALITIES, NPC_ANCESTRY_TABLE, NPC_ALIGNMENT_TABLE,
  NPC_AGE_TABLE, NPC_WEALTH_TABLE, NPC_OCCUPATIONS, NPC_EPITHETS, REACTION_TABLE,
} from './gm-npc-data.js';
import { RANDOM_EVENTS } from './gm-events-data.js';
import { RUMORS } from './gm-rumors-data.js';
import { OATHS, SECRET_DETAIL1, SECRET_DETAIL2, BLESSINGS } from './gm-treasure-data.js';
import { MAGIC_ITEMS } from './gm-magic-items-data.js';
import {
  SITE_SIZES, SITE_TYPES, DANGER_LEVELS,
  ROOM_CONTENTS, TRAPS, HAZARDS, CREATURE_ACTIVITY,
} from './gm-dungeon-data.js';
import {
  HEX_TERRAIN_TABLE, NEW_HEX_TABLE, HEX_DANGER_TABLE,
  POINTS_OF_INTEREST, CATACLYSM_TABLE, SETTLEMENT_NAMES,
} from './gm-overland-data.js';
import { ENCOUNTER_TABLES, TERRAIN_NAMES } from './gm-encounter-data.js';

// ── Helpers ────────────────────────────────────────────────────────────────

function rng(min, max) {
  return min === max ? String(min) : `${min}–${max}`;
}

function d100(min, max) {
  const p = (n) => String(n).padStart(2, '0');
  return min === max ? p(min) : `${p(min)}–${p(max)}`;
}

/** Collapse a flat array into [{min, max, val}] run-length entries. */
function flatToRanges(arr) {
  const out = [];
  arr.forEach((val, i) => {
    const roll = i + 1;
    if (out.length && out[out.length - 1].val === val) {
      out[out.length - 1].max = roll;
    } else {
      out.push({ min: roll, max: roll, val });
    }
  });
  return out;
}

/** Wrap elements in a plain div so render() always returns a single Element. */
function box(...children) {
  const d = document.createElement('div');
  children.forEach((c) => d.appendChild(c));
  return d;
}

// ── Adventure Hook ─────────────────────────────────────────────────────────

export function adventureHookTableGroups() {
  return [
    {
      label: 'Adventure Hook',
      render() {
        return box(makeTable(
          ['d20', 'Detail 1', 'Detail 2', 'Detail 3'],
          ADVENTURE_HOOK.detail1.map((d1, i) => [
            String(i + 1), d1, ADVENTURE_HOOK.detail2[i], ADVENTURE_HOOK.detail3[i],
          ]),
        ));
      },
    },
    {
      label: 'Site Name',
      render() {
        return box(makeTable(
          ['d20', 'Name 1', 'Name 2', 'Name 3'],
          SITE_NAME.name1.map((n1, i) => [
            String(i + 1), n1, SITE_NAME.name2[i], SITE_NAME.name3[i],
          ]),
        ));
      },
    },
  ];
}

// ── NPC ─────────────────────────────────────────────────────────────────────

export function npcTableGroups() {
  return [
    {
      label: 'Qualities',
      render() {
        return box(makeTable(
          ['d20', 'Appearance', 'Does', 'Secret'],
          NPC_QUALITIES.map((q, i) => [String(i + 1), q.appearance, q.does, q.secret]),
        ));
      },
    },
    {
      label: 'Identity',
      render() {
        const row = (name, arr) => [
          name,
          `d${arr.length}`,
          flatToRanges(arr).map((r) => `${rng(r.min, r.max)} ${r.val}`).join(' · '),
        ];
        return box(makeTable(
          ['Table', 'Die', 'Options'],
          [
            row('Ancestry',  NPC_ANCESTRY_TABLE),
            row('Alignment', NPC_ALIGNMENT_TABLE),
            row('Age',       NPC_AGE_TABLE),
            row('Wealth',    NPC_WEALTH_TABLE),
          ],
        ));
      },
    },
    {
      label: 'Occupation',
      render() {
        return box(makeTable(
          ['d4,d4', '1', '2', '3', '4'],
          NPC_OCCUPATIONS.map((cols, i) => [String(i + 1), ...cols]),
        ));
      },
    },
    {
      label: 'Epithet',
      render() {
        return box(makeTable(
          ['d4,d4', '1', '2', '3', '4'],
          NPC_EPITHETS.map((cols, i) => [String(i + 1), ...cols]),
        ));
      },
    },
    {
      label: 'Reaction',
      render() {
        return box(makeTable(
          ['2d6 + CHA', 'Attitude'],
          REACTION_TABLE.map((r) => [rng(r.min, r.max), r.attitude]),
        ));
      },
    },
  ];
}

// ── Random Encounter ─────────────────────────────────────────────────────────

export function encounterTableGroups() {
  return [...TERRAIN_NAMES].sort((a, b) => a.localeCompare(b)).map((terrain) => ({
    label: terrain,
    render() {
      return box(makeTable(['d100', 'Encounter'], ENCOUNTER_TABLES[terrain]));
    },
  }));
}

// ── Random Event ─────────────────────────────────────────────────────────────

export function randomEventTableGroups() {
  return [{
    label: 'Random Events',
    render() {
      return box(makeTable(
        ['d100', 'Event'],
        RANDOM_EVENTS.map(([min, max, text]) => [d100(min, max), text]),
      ));
    },
  }];
}

// ── Rumor ──────────────────────────────────────────────────────────────────

export function rumorTableGroups() {
  return [{
    label: 'Rumors',
    render() {
      return box(makeTable(
        ['d100', 'Rumor'],
        RUMORS.map(([min, max, text]) => [d100(min, max), text]),
      ));
    },
  }];
}

// ── Oath ──────────────────────────────────────────────────────────────────

export function oathTableGroups() {
  return [{
    label: 'Oaths',
    render() {
      return box(makeTable(
        ['d8', 'Oath'],
        OATHS.map((oath, i) => [String(i + 1), oath]),
      ));
    },
  }];
}

// ── Secret ─────────────────────────────────────────────────────────────────

export function secretTableGroups() {
  return [{
    label: 'Secrets',
    render() {
      return box(makeTable(
        ['d12', 'Detail 1', 'Detail 2'],
        SECRET_DETAIL1.map((d1, i) => [String(i + 1), d1, SECRET_DETAIL2[i]]),
      ));
    },
  }];
}

// ── Blessing ──────────────────────────────────────────────────────────────

export function blessingTableGroups() {
  return [{
    label: 'Blessings',
    render() {
      return box(makeTable(
        ['d12', 'Blessing', 'Effect'],
        BLESSINGS.map((b, i) => [String(i + 1), b.name, b.description]),
      ));
    },
  }];
}

// ── Magic Item ────────────────────────────────────────────────────────────

export function magicItemTableGroups() {
  return [{
    label: 'Magic Items',
    render() {
      const list = makeReferenceList();
      MAGIC_ITEMS.forEach((item) => list.appendChild(makeReferenceCard(item.name, null, item.description)));
      return list;
    },
  }];
}

// ── Dungeon ───────────────────────────────────────────────────────────────

export function dungeonTableGroups() {
  return [
    {
      label: 'Room Contents',
      render() {
        return box(makeTable(
          ['d10', 'Contents'],
          ROOM_CONTENTS.map((r) => [rng(r.min, r.max), r.label]),
        ));
      },
    },
    {
      label: 'Traps',
      render() {
        return box(makeTable(
          ['d12', 'Trap', 'Trigger', 'Effect'],
          TRAPS.map((t, i) => [String(i + 1), t.name, t.trigger, t.effect]),
        ));
      },
    },
    {
      label: 'Hazards',
      render() {
        return box(makeTable(
          ['d12', 'Movement', 'Damage', 'Weaken'],
          HAZARDS.movement.map((m, i) => [
            String(i + 1), m, HAZARDS.damage[i], HAZARDS.weaken[i],
          ]),
        ));
      },
    },
    {
      label: 'Site Setup',
      render() {
        return box(
          makeSectionHeader('Site Size'),
          makeTable(
            ['d6', 'Size', 'Dice'],
            SITE_SIZES.map((s) => [rng(s.min, s.max), s.label, `${s.dice}d10`]),
          ),
          makeSectionHeader('Site Type'),
          makeTable(
            ['d6', 'Type'],
            flatToRanges(SITE_TYPES).map((r) => [rng(r.min, r.max), r.val]),
          ),
          makeSectionHeader('Danger Level'),
          makeTable(
            ['d6', 'Danger'],
            flatToRanges(DANGER_LEVELS).map((r) => [rng(r.min, r.max), r.val]),
          ),
        );
      },
    },
    {
      label: 'Creature Activity',
      render() {
        return box(makeTable(
          ['2d6', 'Activity'],
          CREATURE_ACTIVITY.map((r) => [rng(r.min, r.max), r.activity]),
        ));
      },
    },
  ];
}

// ── Overworld March ───────────────────────────────────────────────────────

export function marchTableGroups() {
  return [
    {
      label: 'New Hex',
      render() {
        return box(makeTable(
          ['2d6', 'Result'],
          NEW_HEX_TABLE.map((r) => [
            rng(r.min, r.max),
            r.fresh
              ? 'Roll new hex terrain'
              : r.steps === 0 ? 'Same terrain' : `Current terrain +${r.steps} step${r.steps !== 1 ? 's' : ''}`,
          ]),
        ));
      },
    },
    {
      label: 'Hex Terrain',
      render() {
        return box(makeTable(
          ['2d6', 'Terrain'],
          HEX_TERRAIN_TABLE.map((r) => [rng(r.min, r.max), r.terrain]),
        ));
      },
    },
    {
      label: 'Danger Level',
      render() {
        return box(makeTable(
          ['d6', 'Level'],
          HEX_DANGER_TABLE.map((r) => [rng(r.min, r.max), r.level]),
        ));
      },
    },
    {
      label: 'Points of Interest',
      render() {
        return box(makeTable(
          ['d20', 'Location', 'Development'],
          POINTS_OF_INTEREST.map((r) => [rng(r.min, r.max), r.location, r.development]),
        ));
      },
    },
    {
      label: 'Cataclysm',
      render() {
        return box(makeTable(
          ['d8', 'Type'],
          CATACLYSM_TABLE.map((c, i) => [String(i + 1), c]),
        ));
      },
    },
    {
      label: 'Settlement Names',
      render() {
        const tiers = Object.keys(SETTLEMENT_NAMES);
        return box(makeTable(
          ['d8', ...tiers],
          SETTLEMENT_NAMES[tiers[0]].map((_, i) => [
            String(i + 1),
            ...tiers.map((t) => SETTLEMENT_NAMES[t][i]),
          ]),
        ));
      },
    },
  ];
}
