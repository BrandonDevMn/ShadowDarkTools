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
    traitDescription: 'You gain one additional background roll at character creation.',
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
    traitDescription: 'Roll your hit points with advantage at every level (roll twice, take the higher result).',
  },

  {
    name: 'Halfling',
    description: 'Halflings are small, nimble, and eerily lucky. Their cheerful resilience masks surprising survival instincts.',
    traitName: 'Lucky',
    traitDescription: 'Once per day, you may reroll any one die roll and keep the preferred result.',
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
    traitName: 'Nimble',
    traitDescription: 'You can fit through gaps a human could not. You get a +2 bonus to initiative rolls.',
  },

];
