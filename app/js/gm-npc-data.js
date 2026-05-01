/**
 * NPC generation tables.
 *
 * Tables are flat arrays indexed by die roll - 1, or
 * grid structures (d4×d4) stored as 2D arrays [row][col].
 */

// d12 — maps identically to the character ancestry table
export const NPC_ANCESTRY_TABLE = [
  'Human', 'Human', 'Human', 'Human',
  'Elf', 'Elf',
  'Dwarf', 'Dwarf',
  'Halfling', 'Halfling',
  'Half-Orc',
  'Goblin',
];

// d6
export const NPC_ALIGNMENT_TABLE = ['Lawful', 'Lawful', 'Lawful', 'Neutral', 'Chaotic', 'Chaotic'];

// d8
export const NPC_AGE_TABLE = [
  'Child', 'Adolescent', 'Adult', 'Adult',
  'Middle-Aged', 'Middle-Aged', 'Elderly', 'Ancient',
];

// d6
export const NPC_WEALTH_TABLE = ['Poor', 'Standard', 'Standard', 'Wealthy', 'Wealthy', 'Extravagant'];

// d20 — each entry gives three qualities from a single roll
export const NPC_QUALITIES = [
  { appearance: 'Balding',       does: 'Spits',           secret: 'Hiding a fugitive' },
  { appearance: 'Stocky build',  does: 'Always eating',   secret: 'Adores baby animals' },
  { appearance: 'Very tall',     does: 'Moves quickly',   secret: 'Obsessed with fire' },
  { appearance: 'Beauty mark',   does: 'Card tricks',     secret: 'In a religious cult' },
  { appearance: 'One eye',       does: 'Prays aloud',     secret: 'Is a half-demon' },
  { appearance: 'Braided hair',  does: 'Writes in diary', secret: "Was a wizard's apprentice" },
  { appearance: 'Muscular',      does: 'Apologetic',      secret: 'Needlessly picks pockets' },
  { appearance: 'White hair',    does: 'Slaps backs',     secret: 'Has a false identity' },
  { appearance: 'Scar on face',  does: 'Drops things',    secret: 'Afraid of storms' },
  { appearance: 'Willowy build', does: 'Swears oaths',    secret: 'Has functional gills' },
  { appearance: 'Sweaty',        does: 'Makes puns',      secret: 'In deep gambling debt' },
  { appearance: 'Cleft chin',    does: 'Rare accent',     secret: 'Works as a smuggler' },
  { appearance: 'Frail',         does: 'Easily spooked',  secret: 'Is a werewolf' },
  { appearance: 'Big eyebrows',  does: 'Forgetful',       secret: 'Can actually smell lies' },
  { appearance: 'Tattooed',      does: 'Speaks quietly',  secret: 'Cast out of wealthy family' },
  { appearance: 'Floppy hat',    does: 'Twitches',        secret: 'In love with a bartender' },
  { appearance: 'Gold tooth',    does: 'Moves slowly',    secret: "Left the Thieves' Guild" },
  { appearance: 'Six fingers',   does: 'Speaks loudly',   secret: 'Best friends with a prince' },
  { appearance: 'Very short',    does: 'Swaggers',        secret: 'Retired crawler' },
  { appearance: 'Large nose',    does: 'Smokes pipe',     secret: 'Has a pet basilisk' },
];

// d4×d4 — [row - 1][col - 1]
export const NPC_OCCUPATIONS = [
  ['Gravedigger',  'Carpenter', 'Scholar',  'Blacksmith'],
  ['Tax collector','Farmer',    'Bartender','Beggar'],
  ['Baker',        'Cook',      'Sailor',   'Butcher'],
  ['Locksmith',    'Cobbler',   'Friar/nun','Merchant'],
];

// d20 by ancestry
export const NPC_NAMES = {
  Dwarf: [
    'Hera','Torin','Ginny','Gant','Olga','Dendor','Ygrid','Pike',
    'Sarda','Brigg','Zorli','Yorin','Jorgena','Trogin','Riga','Barton',
    'Katrina','Egrim','Elsa','Orgo',
  ],
  Elf: [
    'Sarenia','Ravos','Imeria','Farond','Isolden','Kieren','Mirenel','Riarden',
    'Allindra','Arlomas','Sylara','Tyr','Rinariel','Saramir','Vedana','Elindos',
    'Ophelia','Cydaros','Tiramel','Varond',
  ],
  Goblin: [
    'Kog','Dibbs','Fronk','Irv','Squag','Mort','Vig','Sticks',
    'Gorb','Yogg','Plok','Zrak','Dent','Krik','Mizzo','Bort',
    'Nabo','Hink','Bree','Kreeb',
  ],
  Halfling: [
    'Myrtle','Robby','Nora','Percy','Daisy','Jolly','Evelyn','Horace',
    'Willie','Gertie','Peri','Carlsby','Nyx','Kellan','Fern','Harlow',
    'Moira','Sage','Reenie','Wendry',
  ],
  'Half-Orc': [
    'Troga','Boraal','Urgana','Zoraal','Scalga','Krell','Voraga','Morak',
    'Draga','Sorak','Varga','Ulgar','Jala','Kresh','Zana','Torvash',
    'Rokara','Gartak','Iskana','Ziraak',
  ],
  Human: [
    'Hesta','Matteo','Rosalin','Endric','Kiara','Yao','Corina','Rowan',
    'Hariko','Ikam','Mariel','Jin','Hana','Lios','Indra','Remy',
    'Nura','Vakesh','Una','Nabilo',
  ],
};

// d4×d4 — [row - 1][col - 1]
export const NPC_EPITHETS = [
  ['The Gray',      'One-Eye',    'The Lesser', 'The Cunning'],
  ['Silvertongue',  'The Outcast','Fasthands',  'The Bold'],
  ['The Elder',     'The Charmer','The Exiled',  'The Wise'],
  ['Tree-Speaker',  'The Craven', 'The Red',    'Six-Finger'],
];

// Reaction check table — 2d6 result mapped to attitude
export const REACTION_TABLE = [
  { min: 0,  max: 6,  attitude: 'Hostile' },
  { min: 7,  max: 8,  attitude: 'Suspicious' },
  { min: 9,  max: 9,  attitude: 'Neutral' },
  { min: 10, max: 11, attitude: 'Curious' },
  { min: 12, max: 20, attitude: 'Friendly' },
];
