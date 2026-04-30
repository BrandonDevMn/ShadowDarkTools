/**
 * Shadowdark character backgrounds, indexed by d20 roll (1–20).
 *
 * Players roll a d20 at character creation to determine their background.
 * Each background grants a relevant starting item or skill connection.
 * Paraphrased from the Shadowdark core rules.
 */
export const BACKGROUNDS = [

  { roll: 1,  name: 'Urchin',             description: 'You grew up alone on city streets. Start with a 10 ft rope and a set of thieves\' tools.' },
  { roll: 2,  name: 'Wanted',             description: 'There is a bounty on your head. Start with a wanted poster of yourself and a disguise kit.' },
  { roll: 3,  name: 'Cult Initiate',      description: 'You were part of a secret cult. Start with a black candle, a forbidden tome, and an unholy symbol.' },
  { roll: 4,  name: 'Thieves\' Guild',    description: 'You trained under professional thieves. Start with thieves\' tools and knowledge of guild signs.' },
  { roll: 5,  name: 'Banished',           description: 'Your people cast you out. Start with a letter of exile and a deep grudge.' },
  { roll: 6,  name: 'Orphaned',           description: 'You were raised by strangers. Start with a lucky charm of unknown origin.' },
  { roll: 7,  name: 'Wizard\'s Apprentice', description: 'You studied under a wizard before parting ways. Start with a spellbook containing one random spell.' },
  { roll: 8,  name: 'Jeweler',            description: 'You appraised gems and metals for a merchant. Start with a jeweler\'s loupe.' },
  { roll: 9,  name: 'Herbalist',          description: 'You gathered and sold medicinal plants. Start with an herbalism kit and 3 healing poultices.' },
  { roll: 10, name: 'Barbarian',          description: 'You come from a warrior tribe beyond civilization. Start with a trophy from your first kill.' },
  { roll: 11, name: 'Mercenary',          description: 'You sold your sword to whoever paid. Start with a mercenary contract and a brand mark.' },
  { roll: 12, name: 'Sailor',             description: 'You crewed ships and crossed open waters. Start with a nautical chart and a compass.' },
  { roll: 13, name: 'Acolyte',            description: 'You served in a temple. Start with a holy symbol and a prayer book.' },
  { roll: 14, name: 'Soldier',            description: 'You served in an organized army. Start with a rank insignia and military rations.' },
  { roll: 15, name: 'Ranger',             description: 'You patrolled the frontier, tracking threats. Start with a hunting trap and a rough map.' },
  { roll: 16, name: 'Scout',              description: 'You were always first into unknown territory. Start with a signal whistle and a spyglass.' },
  { roll: 17, name: 'Minstrel',           description: 'You entertained crowds with music and stories. Start with an instrument and a performance costume.' },
  { roll: 18, name: 'Scholar',            description: 'You studied at an academy before adventure called. Start with a notebook, quill, and ink.' },
  { roll: 19, name: 'Noble',              description: 'You were born to wealth and privilege. Start with a signet ring and fine clothes worth 5 gp.' },
  { roll: 20, name: 'Chirurgeon',         description: 'You practiced surgery and field medicine. Start with a surgeon\'s kit and a dose of laudanum.' },

];
