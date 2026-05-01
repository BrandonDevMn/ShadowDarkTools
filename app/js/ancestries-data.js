/**
 * Shadowdark ancestries (player character races), tiers of traits, and
 * brief descriptions of the mechanical benefit each ancestry provides.
 *
 * Paraphrased from the Shadowdark core rules.
 */
export const ANCESTRIES = [

  {
    name: 'Human',
    description: 'Humans are the most numerous folk in the known world. Their ambition and adaptability let them rise in any profession.',
    traitName: 'Ambitious',
    traitDescription: 'You gain one additional talent roll at 1st level.',
  },

  {
    name: 'Elf',
    description: 'Elves are long-lived and deeply attuned to the natural and arcane worlds. They see clearly where others are blind.',
    traitName: 'Farsight',
    traitDescription: 'You get a +1 bonus to attack rolls with ranged weapons or a +1 bonus to spellcasting checks (choose one at character creation).',
  },

  {
    name: 'Dwarf',
    description: 'Dwarves are stout and stubborn, shaped by centuries underground. They endure hardships that would fell lesser folk.',
    traitName: 'Stout',
    traitDescription: 'Start with +2 HP. Roll hit points with advantage at every level (roll twice, take the higher result).',
  },

  {
    name: 'Halfling',
    description: 'Halflings are small, nimble, and eerily lucky. Their cheerful resilience masks surprising survival instincts.',
    traitName: 'Stealthy',
    traitDescription: 'Once per day, you can become invisible for 3 rounds.',
  },

  {
    name: 'Half-Orc',
    description: 'Half-orcs carry orcish might in a frame that moves through human society. Their raw power is undeniable.',
    traitName: 'Mighty',
    traitDescription: 'You have a +1 bonus to attack and damage rolls with melee weapons.',
  },

  {
    name: 'Goblin',
    description: 'Goblins are small, quick, and overlooked by those who mistake their size for weakness.',
    traitName: 'Keen Senses',
    traitDescription: 'You can\'t be surprised.',
  },

];
