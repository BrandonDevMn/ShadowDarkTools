/**
 * Render functions for character-related Library sections:
 * Titles, Deities, and Random Character Generation.
 */

import { makeReferenceCard, makeSectionHeader, makeTable, makeReferenceList, makeParagraph } from './library-helpers.js';

// ── Titles ─────────────────────────────────────────────────────────────────

const TITLE_TABLES = [
  {
    className: 'Fighter',
    rows: [
      ['1–2',  'Squire',    'Knave',       'Warrior'],
      ['3–4',  'Cavalier',  'Bandit',      'Barbarian'],
      ['5–6',  'Knight',    'Slayer',      'Battlerager'],
      ['7–8',  'Thane',     'Reaver',      'Warchief'],
      ['9–10', 'Lord/Lady', 'Warlord',     'Chieftain'],
    ],
  },
  {
    className: 'Priest',
    rows: [
      ['1–2',  'Acolyte',  'Initiate',     'Seeker'],
      ['3–4',  'Crusader', 'Zealot',       'Invoker'],
      ['5–6',  'Templar',  'Cultist',      'Haruspex'],
      ['7–8',  'Champion', 'Scourge',      'Mystic'],
      ['9–10', 'Paladin',  'Chaos Knight', 'Oracle'],
    ],
  },
  {
    className: 'Thief',
    rows: [
      ['1–2',  'Footpad',   'Thug',      'Robber'],
      ['3–4',  'Burglar',   'Cutthroat', 'Outlaw'],
      ['5–6',  'Rook',      'Shadow',    'Rogue'],
      ['7–8',  'Underboss', 'Assassin',  'Renegade'],
      ['9–10', 'Boss',      'Wraith',    'Bandit King/Queen'],
    ],
  },
  {
    className: 'Wizard',
    rows: [
      ['1–2',  'Apprentice', 'Adept',         'Shaman'],
      ['3–4',  'Conjurer',   'Channeler',      'Seer'],
      ['5–6',  'Arcanist',   'Witch/Warlock',  'Warden'],
      ['7–8',  'Mage',       'Diabolist',      'Sage'],
      ['9–10', 'Archmage',   'Sorcerer',       'Druid'],
    ],
  },
];

export function renderTitlesSection(container) {
  container.appendChild(makeParagraph('As you gain levels your title changes to reflect increased fame (or infamy). Titles are based on class, alignment, and level band.'));

  TITLE_TABLES.forEach(({ className, rows }) => {
    container.appendChild(makeSectionHeader(className));
    container.appendChild(makeTable(['Level', 'Lawful', 'Chaotic', 'Neutral'], rows));
  });
}

// ── Deities ────────────────────────────────────────────────────────────────

const DEITIES = [
  {
    group: 'The Four Lords',
    entries: [
      { name: 'Saint Terragnis', alignment: 'Lawful',  description: 'Patron of lawful humans. A legendary knight who ascended to godhood — the embodiment of righteousness and justice.' },
      { name: 'Gede',            alignment: 'Neutral', description: 'God of feasts, mirth, and the wilds. Usually peaceful; primal storms rage when her anger rises. Many elves and halflings worship her.' },
      { name: 'Madeera the Covenant', alignment: 'Lawful', description: 'The first manifestation of Law. She carries every law of reality — the Covenant — written on her skin in precise symbols.' },
      { name: 'Ord',             alignment: 'Neutral', description: 'Ord the Unbending, the Wise, the Secret-Keeper. God of magic, knowledge, secrets, and equilibrium.' },
    ],
  },
  {
    group: 'The Dark Trio',
    entries: [
      { name: 'Memnon',          alignment: 'Chaotic', description: 'The first manifestation of Chaos. Madeera\'s twin — a red-maned, leonine being whose ultimate ambition is to rend the Covenant from his sister\'s skin.' },
      { name: 'Ramlaat',         alignment: 'Chaotic', description: 'The Pillager, the Barbaric, the Horde. Many orcs worship him and live by the Blood Rite prophecy.' },
      { name: 'Shune the Vile',  alignment: 'Chaotic', description: 'Whispers arcane secrets to sorcerers and witches. Schemes to displace Ord and control the vast flow of magic.' },
    ],
  },
  {
    group: 'The Lost',
    entries: [
      { name: 'The Lost (×2)', alignment: '?', description: 'Two of The Nine are lost to the ages, their names expunged from history. Their whispered legend lives on in ancient texts and forgotten places.' },
    ],
  },
];

export function renderDeitiesSection(container) {
  container.appendChild(makeParagraph('The many gods of the universe are the personifications of Law, Chaos, and Neutrality. Priests must choose one god to serve faithfully.'));

  DEITIES.forEach(({ group, entries }) => {
    container.appendChild(makeSectionHeader(group));
    const list = makeReferenceList();
    entries.forEach(({ name, alignment, description }) => {
      list.appendChild(makeReferenceCard(name, alignment, description));
    });
    container.appendChild(list);
  });

  container.appendChild(makeSectionHeader('Random Deity (d8)'));
  container.appendChild(makeTable(
    ['d8', 'Deity'],
    [
      ['1–2', 'Saint Terragnis'],
      ['3',   'Gede'],
      ['4',   'Madeera the Covenant'],
      ['5',   'Ord'],
      ['6',   'Memnon'],
      ['7',   'Shune the Vile'],
      ['8',   'Ramlaat'],
    ]
  ));
}

// ── Random Character Generation ────────────────────────────────────────────

export function renderRandomCharacterGenerationSection(container) {
  container.appendChild(makeParagraph('Roll to randomly generate a 0-level or 1st-level character. Roll stats, background, and class talents as normal.'));

  container.appendChild(makeSectionHeader('Ancestry (d12)'));
  container.appendChild(makeTable(
    ['d12', 'Ancestry'],
    [
      ['1–4',  'Human'],
      ['5–6',  'Elf'],
      ['7–8',  'Dwarf'],
      ['9–10', 'Halfling'],
      ['11',   'Half-orc'],
      ['12',   'Goblin'],
    ]
  ));

  container.appendChild(makeSectionHeader('Class (d4)'));
  container.appendChild(makeTable(
    ['d4', 'Class'],
    [['1', 'Fighter'], ['2', 'Priest'], ['3', 'Thief'], ['4', 'Wizard']]
  ));

  container.appendChild(makeSectionHeader('Alignment (d6)'));
  container.appendChild(makeTable(
    ['d6', 'Alignment'],
    [['1–3', 'Lawful'], ['4–5', 'Neutral'], ['6', 'Chaotic']]
  ));

  container.appendChild(makeSectionHeader('Deity — Priests Only (d8)'));
  container.appendChild(makeTable(
    ['d8', 'Deity'],
    [
      ['1–2', 'Saint Terragnis'],
      ['3',   'Gede'],
      ['4',   'Madeera the Covenant'],
      ['5',   'Ord'],
      ['6',   'Memnon'],
      ['7',   'Shune the Vile'],
      ['8',   'Ramlaat'],
    ]
  ));

  container.appendChild(makeSectionHeader('Starting Spells — Priest (d6)'));
  container.appendChild(makeTable(
    ['d6', 'Spell'],
    [
      ['1', 'Light'],
      ['2', 'Cure Wounds'],
      ['3', 'Holy Weapon'],
      ['4', 'Protection From Evil'],
      ['5', 'Shield of Faith'],
      ['6', 'Reroll'],
    ]
  ));

  container.appendChild(makeSectionHeader('Starting Spells — Wizard (d12)'));
  container.appendChild(makeTable(
    ['d12', 'Spell'],
    [
      ['1',  'Alarm'],
      ['2',  'Burning Hands'],
      ['3',  'Charm Person'],
      ['4',  'Detect Magic'],
      ['5',  'Feather Fall'],
      ['6',  'Floating Disk'],
      ['7',  'Hold Portal'],
      ['8',  'Light'],
      ['9',  'Mage Armor'],
      ['10', 'Magic Missile'],
      ['11', 'Protection From Evil'],
      ['12', 'Sleep'],
    ]
  ));

  container.appendChild(makeSectionHeader('Common Languages (d10)'));
  container.appendChild(makeTable(
    ['d10', 'Language'],
    [
      ['1',  'Dwarvish'], ['2',  'Elvish'],    ['3',  'Giant'],
      ['4',  'Goblin'],   ['5',  'Merran'],    ['6',  'Orcish'],
      ['7',  'Reptilian'],['8',  'Sylvan'],    ['9',  'Thanian'],
      ['10', 'Reroll'],
    ]
  ));

  container.appendChild(makeSectionHeader('Rare Languages (d4) — Priests & Wizards'));
  container.appendChild(makeTable(
    ['d4', 'Language'],
    [
      ['1', 'Celestial'],
      ['2', 'Diabolic'],
      ['3', 'Draconic (priest: reroll)'],
      ['4', 'Primordial'],
    ]
  ));

  container.appendChild(makeSectionHeader('0-Level Starting Gear (d12, roll 1d4 items)'));
  container.appendChild(makeTable(
    ['d12', 'Gear'],
    [
      ['1',  'Torch'],         ['2',  'Dagger'],
      ['3',  'Pole'],          ['4',  'Shortbow and 5 arrows'],
      ['5',  'Rope, 60\''],    ['6',  'Oil, flask'],
      ['7',  'Crowbar'],       ['8',  'Iron spikes (10)'],
      ['9',  'Flint and steel'],['10', 'Grappling hook'],
      ['11', 'Club'],          ['12', 'Caltrops (one bag)'],
    ]
  ));
}
