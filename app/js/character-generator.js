/**
 * Random character generator — pure logic, no DOM.
 *
 * generateCharacter() returns a plain object with all fields needed to
 * render a level 1 character sheet. All randomness goes through rollDie()
 * so tests can mock Math.random.
 */

import { ANCESTRIES }  from './ancestries-data.js';
import { CLASSES }     from './classes-data.js';
import { BACKGROUNDS } from './backgrounds-data.js';
import { SPELLS }      from './spells-data.js';

// ── Dice ──────────────────────────────────────────────────────────────────

function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

// ── Stat modifier ─────────────────────────────────────────────────────────

export function statMod(score) {
  if (score <= 3)  return -4;
  if (score <= 5)  return -3;
  if (score <= 7)  return -2;
  if (score <= 9)  return -1;
  if (score <= 11) return 0;
  if (score <= 13) return 1;
  if (score <= 15) return 2;
  if (score <= 17) return 3;
  return 4;
}

export function fmtMod(mod) {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

// ── Stats ─────────────────────────────────────────────────────────────────

function rollStats() {
  let scores;
  do {
    scores = [
      rollDie(6) + rollDie(6) + rollDie(6),
      rollDie(6) + rollDie(6) + rollDie(6),
      rollDie(6) + rollDie(6) + rollDie(6),
      rollDie(6) + rollDie(6) + rollDie(6),
      rollDie(6) + rollDie(6) + rollDie(6),
      rollDie(6) + rollDie(6) + rollDie(6),
    ];
  } while (scores.every((s) => s < 14));

  const [str, dex, con, int_, wis, cha] = scores;
  return {
    str: { score: str, mod: statMod(str) },
    dex: { score: dex, mod: statMod(dex) },
    con: { score: con, mod: statMod(con) },
    int: { score: int_, mod: statMod(int_) },
    wis: { score: wis, mod: statMod(wis) },
    cha: { score: cha, mod: statMod(cha) },
  };
}

// ── Ancestry ──────────────────────────────────────────────────────────────

// d12 table from the rules
const ANCESTRY_TABLE = [
  'Human', 'Human', 'Human', 'Human',   // 1–4
  'Elf', 'Elf',                          // 5–6
  'Dwarf', 'Dwarf',                      // 7–8
  'Halfling', 'Halfling',                // 9–10
  'Half-Orc',                            // 11
  'Goblin',                              // 12
];

// ── Class ─────────────────────────────────────────────────────────────────

const CLASS_TABLE = ['Fighter', 'Priest', 'Thief', 'Wizard'];

// ── Alignment ─────────────────────────────────────────────────────────────

function rollAlignment() {
  const r = rollDie(6);
  if (r <= 3) return 'Lawful';
  if (r <= 5) return 'Neutral';
  return 'Chaotic';
}

// ── Deity ─────────────────────────────────────────────────────────────────

// d8 table from the rules
const DEITY_TABLE = [
  'Saint Terragnis', 'Saint Terragnis',  // 1–2
  'Gede',                                 // 3
  'Madeera the Covenant',                 // 4
  'Ord',                                  // 5
  'Memnon',                               // 6
  'Shune the Vile',                       // 7
  'Ramlaat',                              // 8
];

// ── Spells ────────────────────────────────────────────────────────────────

// Priest d6 table (6 = reroll)
const PRIEST_SPELL_TABLE = [
  'Light', 'Cure Wounds', 'Holy Weapon', 'Protection From Evil', 'Shield of Faith',
];

// Wizard d12 table
const WIZARD_SPELL_TABLE = [
  'Alarm', 'Burning Hands', 'Charm Person', 'Detect Magic', 'Feather Fall',
  'Floating Disk', 'Hold Portal', 'Light', 'Mage Armor', 'Magic Missile',
  'Protection From Evil', 'Sleep',
];

function rollPriestSpells(count) {
  const names = [];
  while (names.length < count) {
    const r = rollDie(6);
    if (r === 6) continue;                          // reroll
    const name = PRIEST_SPELL_TABLE[r - 1];
    if (!names.includes(name)) names.push(name);
  }
  return names.map((name) => SPELLS.find((s) => s.class === 'priest' && s.name === name)).filter(Boolean);
}

function rollWizardSpells(count) {
  const names = [];
  while (names.length < count) {
    const name = WIZARD_SPELL_TABLE[rollDie(12) - 1];
    if (!names.includes(name)) names.push(name);
  }
  return names.map((name) => SPELLS.find((s) => s.class === 'wizard' && s.name === name)).filter(Boolean);
}

// ── HP ────────────────────────────────────────────────────────────────────

const HIT_DIE = { Fighter: 8, Priest: 6, Thief: 4, Wizard: 4 };

function rollHP(className, conMod, isDwarf) {
  const sides = HIT_DIE[className];
  let roll = isDwarf
    ? Math.max(rollDie(sides), rollDie(sides))   // Dwarf rolls with advantage
    : rollDie(sides);
  const bonus = isDwarf ? conMod + 2 : conMod;   // Dwarf Stout: +2 HP
  return Math.max(1, roll + bonus);
}

// ── Talents ───────────────────────────────────────────────────────────────

const TALENT_TABLES = {
  Fighter: [
    [2,    'Gain Weapon Mastery with one additional weapon type'],
    [6,    '+1 to melee and ranged attacks'],
    [9,    '+2 to Strength, Dexterity, or Constitution'],
    [11,   'Choose one armor type — you get +1 AC from it'],
    [12,   'Choose a talent or +2 points to distribute to stats'],
  ],
  Priest: [
    [2,    'Gain advantage on casting one spell you know'],
    [6,    '+1 to melee or ranged attacks'],
    [9,    '+1 to priest spellcasting checks'],
    [11,   '+2 to Strength or Wisdom'],
    [12,   'Choose a talent or +2 points to distribute to stats'],
  ],
  Thief: [
    [2,    'Gain advantage on initiative rolls'],
    [5,    'Backstab deals +1 dice of damage'],
    [9,    '+2 to Strength, Dexterity, or Charisma'],
    [11,   '+1 to melee and ranged attacks'],
    [12,   'Choose a talent or +2 points to distribute to stats'],
  ],
  Wizard: [
    [2,    'Make 1 random magic item of a type you choose'],
    [7,    '+2 to Intelligence or +1 to wizard spellcasting checks'],
    [9,    'Gain advantage on casting one spell you know'],
    [11,   'Learn one additional wizard spell of any tier you know'],
    [12,   'Choose a talent or +2 points to distribute to stats'],
  ],
};

function resolveTalent(className, total) {
  const rows = TALENT_TABLES[className];
  for (const [max, text] of rows) {
    if (total <= max) return text;
  }
  return rows[rows.length - 1][1];
}

function rollTalent(className) {
  return resolveTalent(className, rollDie(6) + rollDie(6));
}

// ── Languages ─────────────────────────────────────────────────────────────

const COMMON_LANGS = ['Dwarvish', 'Elvish', 'Giant', 'Goblin', 'Merran', 'Orcish', 'Reptilian', 'Sylvan', 'Thanian'];
const PRIEST_RARE_LANGS = ['Celestial', 'Diabolic', 'Primordial'];
const WIZARD_RARE_LANGS = ['Celestial', 'Diabolic', 'Draconic', 'Primordial'];

function rollCommonLang(known) {
  let lang;
  do {
    const r = rollDie(10);
    if (r === 10) continue;                         // "reroll" result on the table
    lang = COMMON_LANGS[r - 1];
  } while (known.includes(lang));
  return lang;
}

function rollRareLang(pool, known) {
  let lang;
  do { lang = pool[rollDie(pool.length) - 1]; } while (known.includes(lang));
  return lang;
}

function rollLanguages(className) {
  const langs = ['Common'];
  if (className === 'Wizard') {
    langs.push(rollCommonLang(langs));
    langs.push(rollCommonLang(langs));
    langs.push(rollRareLang(WIZARD_RARE_LANGS, langs));
    langs.push(rollRareLang(WIZARD_RARE_LANGS, langs));
  } else if (className === 'Priest') {
    langs.push(rollRareLang(PRIEST_RARE_LANGS, langs));
  }
  return langs;
}

// ── Names ─────────────────────────────────────────────────────────────────

const NAMES = {
  Human:    ['Aldric', 'Brand', 'Cael', 'Edric', 'Finn', 'Lysa', 'Mira', 'Nora', 'Serah', 'Thorn'],
  Elf:      ['Aerith', 'Arwen', 'Caladrel', 'Elowen', 'Faelar', 'Liriel', 'Nimue', 'Orin', 'Sylvar', 'Thalion'],
  Dwarf:    ['Agna', 'Brek', 'Brecca', 'Dorn', 'Greta', 'Hauk', 'Marta', 'Thorgrim', 'Ulf', 'Vilda'],
  Halfling: ['Bessa', 'Cob', 'Della', 'Finn', 'Lila', 'Merry', 'Ned', 'Pip', 'Rosie', 'Tam'],
  'Half-Orc': ['Bruk', 'Drek', 'Grak', 'Kord', 'Morg', 'Nala', 'Ruga', 'Torq', 'Vasha', 'Zula'],
  Goblin:   ['Bix', 'Grix', 'Krek', 'Nix', 'Nub', 'Skrak', 'Splat', 'Wix', 'Yiz', 'Zipp'],
};

function rollName(ancestry) {
  const list = NAMES[ancestry] ?? NAMES['Human'];
  return list[rollDie(list.length) - 1];
}

// ── Main export ───────────────────────────────────────────────────────────

export function generateCharacter() {
  const stats     = rollStats();
  const ancestry  = ANCESTRY_TABLE[rollDie(12) - 1];
  const className = CLASS_TABLE[rollDie(4) - 1];
  const isDwarf   = ancestry === 'Dwarf';

  const ancestryData = ANCESTRIES.find((a) => a.name === ancestry);
  const classData    = CLASSES.find((c) => c.name === className);
  const background   = BACKGROUNDS[rollDie(20) - 1];

  const alignment  = rollAlignment();
  const hp         = rollHP(className, stats.con.mod, isDwarf);
  const gold       = (rollDie(6) + rollDie(6) + rollDie(6)) * 5;
  const ac         = 10 + stats.dex.mod;
  // Fighters' Hauler ability adds CON mod (if positive) to gear slots
  const gearSlots  = 10 + stats.str.mod + (className === 'Fighter' ? Math.max(0, stats.con.mod) : 0);
  const name      = rollName(ancestry);
  const languages = rollLanguages(className);

  // Humans get an extra talent roll (Ambitious trait)
  const talentCount = ancestry === 'Human' ? 2 : 1;
  const talents = Array.from({ length: talentCount }, () => rollTalent(className));

  let deity  = null;
  let spells = [];
  if (className === 'Priest') {
    deity  = DEITY_TABLE[rollDie(8) - 1];
    spells = rollPriestSpells(2);
  } else if (className === 'Wizard') {
    spells = rollWizardSpells(3);
  }

  return {
    name,
    ancestry,
    ancestryTrait: ancestryData
      ? { name: ancestryData.traitName, description: ancestryData.traitDescription }
      : null,
    class:          className,
    hitDie:         `d${HIT_DIE[className]}`,
    level:          1,
    alignment,
    hp,
    ac,
    gold,
    gearSlots,
    armor:          classData?.armor ?? '',
    weapons:        classData?.weapons ?? '',
    classAbilities: classData?.abilities ?? [],
    stats,
    background: { roll: background.roll, name: background.name, description: background.description },
    talents,
    deity,
    spells,
    languages,
  };
}
