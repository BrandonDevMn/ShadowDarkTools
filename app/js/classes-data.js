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
        description: 'Add your Constitution modifier, if positive, to your gear slot total.',
      },
      {
        name: 'Weapon Mastery',
        description: 'Choose one weapon type. You gain +1 to attack and damage rolls with that weapon type. In addition, add half your level to these rolls (round down).',
      },
      {
        name: 'Grit',
        description: 'Choose Strength or Dexterity. You have advantage on checks of that type to overcome an opposing force, such as kicking open a stuck door or slipping free of chains.',
      },
    ],
  },

  {
    name: 'Thief',
    description: 'Thieves live by their wits, quick hands, and the shadows. They excel at trickery and dealing deadly blows from the dark.',
    hitDie: 'd4',
    armor: 'Leather armor, mithral chainmail',
    weapons: 'Club, crossbow, dagger, shortbow, shortsword',
    abilities: [
      {
        name: 'Backstab',
        description: 'If you hit a creature that is unaware of your attack, you deal an extra weapon die of damage. Add additional weapon dice equal to half your level (round down).',
      },
      {
        name: 'Thievery',
        description: 'You have advantage on checks to climb, sneak, hide, apply disguises, find and disable traps, pick pockets, and open locks. Tools take up no gear slots.',
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
        name: 'Languages',
        description: 'You know two additional common languages and two rare languages.',
      },
      {
        name: 'Learning Spells',
        description: 'You know three tier 1 spells of your choice. You can permanently learn a wizard spell from a scroll by studying it for a day and succeeding on a DC 15 Intelligence check; whether you succeed or fail, the scroll is expended.',
      },
      {
        name: 'Spellcasting',
        description: 'You can cast wizard spells you know. Each time you gain a level, you choose new spells according to the Wizard Spells Known table.',
      },
    ],
  },

  {
    name: 'Priest',
    description: 'Priests channel divine power granted by their deity, bolstering allies and smiting the unholy with sacred authority.',
    hitDie: 'd6',
    armor: 'All armor and shields',
    weapons: 'Club, crossbow, dagger, mace, longsword, staff, warhammer',
    abilities: [
      {
        name: 'Languages',
        description: 'You know Celestial, Diabolic, or Primordial (choose one).',
      },
      {
        name: 'Turn Undead',
        description: 'You know the Turn Undead spell. It does not count toward your number of known spells.',
      },
      {
        name: 'Deity',
        description: 'Choose a god to serve who matches your alignment. You have a holy symbol for your god (it takes up no gear slots).',
      },
      {
        name: 'Spellcasting',
        description: 'You know two tier 1 priest spells of your choice. Each time you gain a level, you choose new spells according to the Priest Spells Known table.',
      },
    ],
  },

];
