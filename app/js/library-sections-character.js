/**
 * Section descriptors for the 3 character-related Library sections:
 * Deities, Random Character Generation, and Titles.
 */

import { makeReferenceCard, makeSectionHeader, makeTable, makeReferenceList, makeParagraph } from './library-helpers.js';

function makeItems(rules) {
  return Object.entries(rules)
    .map(([id, r]) => ({ id, label: r.label, ...(r.sublabel != null && { sublabel: r.sublabel }) }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

// ── Deities ────────────────────────────────────────────────────────────────

const DEITIES = {
  'gede': {
    label: 'Gede',
    sublabel: 'Neutral',
    render(c) {
      const list = makeReferenceList();
      list.appendChild(makeReferenceCard('Gede', 'Neutral', 'God of feasts, mirth, and the wilds. Usually peaceful; primal storms rage when her anger rises. Many elves and halflings worship her.'));
      c.appendChild(list);
    },
  },
  'madeera-the-covenant': {
    label: 'Madeera the Covenant',
    sublabel: 'Lawful',
    render(c) {
      const list = makeReferenceList();
      list.appendChild(makeReferenceCard('Madeera the Covenant', 'Lawful', 'The first manifestation of Law. She carries every law of reality — the Covenant — written on her skin in precise symbols.'));
      c.appendChild(list);
    },
  },
  'memnon': {
    label: 'Memnon',
    sublabel: 'Chaotic',
    render(c) {
      const list = makeReferenceList();
      list.appendChild(makeReferenceCard('Memnon', 'Chaotic', 'The first manifestation of Chaos. Madeera\'s twin — a red-maned, leonine being whose ultimate ambition is to rend the Covenant from his sister\'s skin.'));
      c.appendChild(list);
    },
  },
  'ord': {
    label: 'Ord',
    sublabel: 'Neutral',
    render(c) {
      const list = makeReferenceList();
      list.appendChild(makeReferenceCard('Ord', 'Neutral', 'Ord the Unbending, the Wise, the Secret-Keeper. God of magic, knowledge, secrets, and equilibrium.'));
      c.appendChild(list);
    },
  },
  'ramlaat': {
    label: 'Ramlaat',
    sublabel: 'Chaotic',
    render(c) {
      const list = makeReferenceList();
      list.appendChild(makeReferenceCard('Ramlaat', 'Chaotic', 'The Pillager, the Barbaric, the Horde. Many orcs worship him and live by the Blood Rite prophecy.'));
      c.appendChild(list);
    },
  },
  'saint-terragnis': {
    label: 'Saint Terragnis',
    sublabel: 'Lawful',
    render(c) {
      const list = makeReferenceList();
      list.appendChild(makeReferenceCard('Saint Terragnis', 'Lawful', 'Patron of lawful humans. A legendary knight who ascended to godhood — the embodiment of righteousness and justice.'));
      c.appendChild(list);
    },
  },
  'shune-the-vile': {
    label: 'Shune the Vile',
    sublabel: 'Chaotic',
    render(c) {
      const list = makeReferenceList();
      list.appendChild(makeReferenceCard('Shune the Vile', 'Chaotic', 'Whispers arcane secrets to sorcerers and witches. Schemes to displace Ord and control the vast flow of magic.'));
      c.appendChild(list);
    },
  },
  'the-lost': {
    label: 'The Lost',
    sublabel: '?',
    render(c) {
      const list = makeReferenceList();
      list.appendChild(makeReferenceCard('The Lost (×2)', '?', 'Two of The Nine are lost to the ages, their names expunged from history. Their whispered legend lives on in ancient texts and forgotten places.'));
      c.appendChild(list);
    },
  },
};

export const deitiesSection = {
  id: 'deities',
  label: 'Deities',
  items: makeItems(DEITIES),
  renderDetail(container, itemId) { DEITIES[itemId]?.render(container); },
};

// ── Random Character Generation ────────────────────────────────────────────

const RANDOM_CHAR_GEN = {
  'alignment': {
    label: 'Alignment',
    render(c) {
      c.appendChild(makeSectionHeader('Alignment (d6)'));
      c.appendChild(makeTable(
        ['d6', 'Alignment'],
        [['1–3', 'Lawful'], ['4–5', 'Neutral'], ['6', 'Chaotic']]
      ));
    },
  },
  'ancestry': {
    label: 'Ancestry',
    render(c) {
      c.appendChild(makeSectionHeader('Ancestry (d12)'));
      c.appendChild(makeTable(
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
    },
  },
  'class': {
    label: 'Class',
    render(c) {
      c.appendChild(makeSectionHeader('Class (d4)'));
      c.appendChild(makeTable(
        ['d4', 'Class'],
        [['1', 'Fighter'], ['2', 'Priest'], ['3', 'Thief'], ['4', 'Wizard']]
      ));
    },
  },
  'common-languages': {
    label: 'Common Languages',
    render(c) {
      c.appendChild(makeSectionHeader('Common Languages (d10)'));
      c.appendChild(makeTable(
        ['d10', 'Language'],
        [
          ['1',  'Dwarvish'], ['2',  'Elvish'],    ['3',  'Giant'],
          ['4',  'Goblin'],   ['5',  'Merran'],    ['6',  'Orcish'],
          ['7',  'Reptilian'],['8',  'Sylvan'],    ['9',  'Thanian'],
          ['10', 'Reroll'],
        ]
      ));
    },
  },
  'deity': {
    label: 'Deity',
    sublabel: 'Priests only',
    render(c) {
      c.appendChild(makeSectionHeader('Deity — Priests Only (d8)'));
      c.appendChild(makeTable(
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
    },
  },
  'rare-languages': {
    label: 'Rare Languages',
    sublabel: 'Priests & Wizards',
    render(c) {
      c.appendChild(makeSectionHeader('Rare Languages (d4) — Priests & Wizards'));
      c.appendChild(makeTable(
        ['d4', 'Language'],
        [
          ['1', 'Celestial'],
          ['2', 'Diabolic'],
          ['3', 'Draconic (priest: reroll)'],
          ['4', 'Primordial'],
        ]
      ));
    },
  },
  'starting-gear': {
    label: 'Starting Gear',
    sublabel: '0-Level',
    render(c) {
      c.appendChild(makeSectionHeader('0-Level Starting Gear (d12, roll 1d4 items)'));
      c.appendChild(makeTable(
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
    },
  },
  'starting-spells-priest': {
    label: 'Starting Spells — Priest',
    render(c) {
      c.appendChild(makeSectionHeader('Starting Spells — Priest (d6)'));
      c.appendChild(makeTable(
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
    },
  },
  'starting-spells-wizard': {
    label: 'Starting Spells — Wizard',
    render(c) {
      c.appendChild(makeSectionHeader('Starting Spells — Wizard (d12)'));
      c.appendChild(makeTable(
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
    },
  },
};

export const randomCharacterGenerationSection = {
  id: 'random-character-generation',
  label: 'Random Character Gen',
  items: makeItems(RANDOM_CHAR_GEN),
  renderDetail(container, itemId) { RANDOM_CHAR_GEN[itemId]?.render(container); },
};

// ── Titles ─────────────────────────────────────────────────────────────────

const TITLES = {
  'fighter': {
    label: 'Fighter',
    render(c) {
      c.appendChild(makeTable(
        ['Level', 'Lawful', 'Chaotic', 'Neutral'],
        [
          ['1–2',  'Squire',    'Knave',       'Warrior'],
          ['3–4',  'Cavalier',  'Bandit',      'Barbarian'],
          ['5–6',  'Knight',    'Slayer',      'Battlerager'],
          ['7–8',  'Thane',     'Reaver',      'Warchief'],
          ['9–10', 'Lord/Lady', 'Warlord',     'Chieftain'],
        ]
      ));
    },
  },
  'priest': {
    label: 'Priest',
    render(c) {
      c.appendChild(makeTable(
        ['Level', 'Lawful', 'Chaotic', 'Neutral'],
        [
          ['1–2',  'Acolyte',  'Initiate',     'Seeker'],
          ['3–4',  'Crusader', 'Zealot',       'Invoker'],
          ['5–6',  'Templar',  'Cultist',      'Haruspex'],
          ['7–8',  'Champion', 'Scourge',      'Mystic'],
          ['9–10', 'Paladin',  'Chaos Knight', 'Oracle'],
        ]
      ));
    },
  },
  'thief': {
    label: 'Thief',
    render(c) {
      c.appendChild(makeTable(
        ['Level', 'Lawful', 'Chaotic', 'Neutral'],
        [
          ['1–2',  'Footpad',   'Thug',      'Robber'],
          ['3–4',  'Burglar',   'Cutthroat', 'Outlaw'],
          ['5–6',  'Rook',      'Shadow',    'Rogue'],
          ['7–8',  'Underboss', 'Assassin',  'Renegade'],
          ['9–10', 'Boss',      'Wraith',    'Bandit King/Queen'],
        ]
      ));
    },
  },
  'wizard': {
    label: 'Wizard',
    render(c) {
      c.appendChild(makeTable(
        ['Level', 'Lawful', 'Chaotic', 'Neutral'],
        [
          ['1–2',  'Apprentice', 'Adept',         'Shaman'],
          ['3–4',  'Conjurer',   'Channeler',      'Seer'],
          ['5–6',  'Arcanist',   'Witch/Warlock',  'Warden'],
          ['7–8',  'Mage',       'Diabolist',      'Sage'],
          ['9–10', 'Archmage',   'Sorcerer',       'Druid'],
        ]
      ));
    },
  },
};

export const titlesSection = {
  id: 'titles',
  label: 'Titles',
  items: makeItems(TITLES),
  renderDetail(container, itemId) { TITLES[itemId]?.render(container); },
};
