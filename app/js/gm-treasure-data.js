/**
 * Boon tables — Oaths, Secrets, and Blessings.
 *
 * Oaths: d8. Secrets: two separate d12 rolls (detail1 + detail2). Blessings: d12.
 */

// d8
export const OATHS = [
  'The duke will procure you an audience with the queen',
  'The City Watch will pardon a crime you\'ve committed',
  'A dryad will protect you while you\'re in her grove',
  'A Thieves\' Guild member will get you into the gem vault',
  'A unicorn will heal a grave wound or affliction',
  'A dwarven forgemaster will make you a spectacular sword',
  'A baron will grant you the title of knight or constable',
  'The Circle of Mages will magically teleport you anywhere',
];

// Two-column secret table — roll d12 twice (once per column)
export const SECRET_DETAIL1 = [
  'The True Name of',
  'The one manipulating',
  'The killer of',
  'The impersonator of',
  'The horrifying plan of',
  'The secret location of',
  'The beloved of',
  'Proof of the crimes by',
  'The treasure hoard of',
  'The weakness of',
  'The secret identity of',
  'The one blackmailing',
];

export const SECRET_DETAIL2 = [
  'The king',
  'A powerful demon',
  'A legendary swordmaster',
  'The head of the church',
  'A mighty sorcerer',
  'A rival adventuring party',
  "The Thieves' Guild boss",
  'A revered knight of St. Terragnis',
  'A famous dragon-slayer',
  "The settlement's leadership",
  'A fearsome lich-queen',
  'A cherished NPC',
];

// d12
export const BLESSINGS = [
  { name: 'Wraithsight',       description: 'You can see invisible and hidden creatures' },
  { name: 'Nine Lives',        description: 'The next nine times you go to 0 HP, regain 1 HP' },
  { name: 'Demonskin',         description: 'You are immune to damage from fire' },
  { name: 'Spiderwalk',        description: 'You can crawl on walls and sheer surfaces' },
  { name: "Merfolk's Kiss",    description: 'You can breathe water as though it were air' },
  { name: "Gede's Blessing",   description: 'You can speak to and understand animals' },
  { name: 'Arcane Eye',        description: 'Three times per day, advantage to cast a spell' },
  { name: "Shune's Mark",      description: 'When you kill a creature, heal 1d6 hit points' },
  { name: 'Ghostwalk',         description: 'Once per day, turn incorporeal for 1d4 rounds' },
  { name: "Death's Sting",     description: 'You are immune to the effects of poison' },
  { name: 'Rite of Rage',      description: 'Once per day, deal double damage' },
  { name: 'Divine Halo',       description: 'Hostile spells that target you are DC 15 to cast' },
];
