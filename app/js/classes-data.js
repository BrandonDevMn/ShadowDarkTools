/**
 * Shadowdark character classes with hit die, gear proficiencies, and
 * class-defining abilities.
 *
 * Paraphrased from the Shadowdark core rules.
 */
export const CLASSES = [

  {
    name: 'Fighter',
    description: 'Fighters are the masters of martial combat, able to wear any armor and wield any weapon with deadly efficiency.',
    hitDie: 'd8',
    armor: 'All armor and shields',
    weapons: 'All weapons',
    abilities: [
      {
        name: 'Hauler',
        description: 'Add your Constitution modifier (minimum 1) to your gear slot total.',
      },
      {
        name: 'Weapon Mastery',
        description: 'Choose one weapon type. You gain +1 to attack and damage rolls with that weapon type.',
      },
      {
        name: 'Grit',
        description: 'Once per day, you can choose to succeed on one Strength or Constitution check.',
      },
    ],
  },

  {
    name: 'Thief',
    description: 'Thieves live by their wits, quick hands, and the shadows. They excel at trickery and dealing deadly blows from the dark.',
    hitDie: 'd4',
    armor: 'Leather armor',
    weapons: 'Simple weapons, plus the shortsword',
    abilities: [
      {
        name: 'Backstab',
        description: 'If you attack a creature that is unaware of you or that is engaged with an ally, you deal an extra die of damage.',
      },
      {
        name: 'Thievery',
        description: 'You are trained in climbing, hiding, sneaking, picking locks, and picking pockets. Make a check when attempting any of these.',
      },
      {
        name: 'Luck Token',
        description: 'Once per day, you can reroll any one d20 roll you make.',
      },
    ],
  },

  {
    name: 'Wizard',
    description: 'Wizards wield reality-bending arcane spells, purchased at the price of wearing no armor and carrying little iron.',
    hitDie: 'd4',
    armor: 'None',
    weapons: 'Daggers and staves only',
    abilities: [
      {
        name: 'Spellcasting',
        description: 'You can cast wizard spells. Roll a d20 + your INT modifier. On a 10+, the spell succeeds. On a failure, the spell is lost until you rest.',
      },
      {
        name: 'Learning Spells',
        description: 'You start with a spellbook containing 3 random 1st-tier wizard spells. You can copy new spells found as treasure into your book.',
      },
      {
        name: 'Iron Sensitivity',
        description: 'You cannot wear armor or use shields. Carrying iron or steel reduces your spellcasting rolls by 1.',
      },
    ],
  },

  {
    name: 'Priest',
    description: 'Priests channel divine power granted by their deity, bolstering allies and smiting the unholy with sacred authority.',
    hitDie: 'd6',
    armor: 'Light and medium armor',
    weapons: 'Clubs, maces, and war hammers',
    abilities: [
      {
        name: 'Spellcasting',
        description: 'You can cast priest spells. Roll a d20 + your WIS modifier. On a 10+, the spell succeeds. On a failure, the spell is lost until you rest.',
      },
      {
        name: 'Turn Undead',
        description: 'Once per rest, hold up your holy symbol and roll a spellcasting check. On success, undead of equal or lower tier flee or are destroyed.',
      },
      {
        name: 'Deity',
        description: 'You worship a specific deity who grants you access to a set of spells aligned to their domain.',
      },
    ],
  },

];
