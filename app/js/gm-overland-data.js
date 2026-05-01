/**
 * Overland travel tables for the hex-march generator.
 */

// Ordered terrain loop used for stepping (+1, +2 steps from current terrain).
// Wraps circularly as per the rules.
export const TERRAIN_ORDER = [
  'Desert/Arctic', 'Swamp', 'Grassland', 'Forest/Jungle',
  'River/Coast', 'Ocean', 'Mountain',
];

// 2d6 fresh-terrain table — used when New Hex result is "roll new terrain"
export const HEX_TERRAIN_TABLE = [
  { min: 2,  max: 2,  terrain: 'Desert/Arctic' },
  { min: 3,  max: 3,  terrain: 'Swamp' },
  { min: 4,  max: 6,  terrain: 'Grassland' },
  { min: 7,  max: 8,  terrain: 'Forest/Jungle' },
  { min: 9,  max: 10, terrain: 'River/Coast' },
  { min: 11, max: 11, terrain: 'Ocean' },
  { min: 12, max: 12, terrain: 'Mountain' },
];

// 2d6 new-hex result — steps relative to current terrain, or fresh roll
export const NEW_HEX_TABLE = [
  { min: 2,  max: 3,  steps: 1,    fresh: false },
  { min: 4,  max: 8,  steps: 0,    fresh: false },
  { min: 9,  max: 11, steps: 2,    fresh: false },
  { min: 12, max: 12, steps: null, fresh: true  },
];

// d6 hex danger level
export const HEX_DANGER_TABLE = [
  { min: 1, max: 1, level: 'Safe' },
  { min: 2, max: 3, level: 'Unsafe' },
  { min: 4, max: 5, level: 'Risky' },
  { min: 6, max: 6, level: 'Deadly' },
];

// d20 — single roll gives both location and development from the same row
export const POINTS_OF_INTEREST = [
  { min: 1,  max: 1,  location: 'Small tower',      development: 'Disaster! Roll on Cataclysm table', isCataclysm: true },
  { min: 2,  max: 2,  location: 'Fortified keep',   development: 'Over/connected to a large tomb',    isCataclysm: false },
  { min: 3,  max: 4,  location: 'Natural landmark', development: 'Being attacked by an invader',       isCataclysm: false },
  { min: 5,  max: 5,  location: 'Temple',           development: 'Home to an oracle',                  isCataclysm: false },
  { min: 6,  max: 6,  location: 'Barrow mounds',    development: 'Around/over a sleeping dragon',      isCataclysm: false },
  { min: 7,  max: 8,  location: 'Village',          development: 'Abandoned and in ruins',             isCataclysm: false },
  { min: 9,  max: 10, location: 'Town',             development: 'Guarded by its current residents',   isCataclysm: false },
  { min: 11, max: 11, location: 'City/metropolis',  development: 'Under siege by a warband',           isCataclysm: false },
  { min: 12, max: 12, location: 'Ravine',           development: 'Home to a religious cult',           isCataclysm: false },
  { min: 13, max: 14, location: 'Monster nest',     development: 'Where a secret circle of wizards meets', isCataclysm: false },
  { min: 15, max: 15, location: 'Hermit\'s abode',  development: 'Occupied by a self-titled king/queen', isCataclysm: false },
  { min: 16, max: 17, location: 'Cave formation',   development: 'Controlled by a malevolent sorcerer', isCataclysm: false },
  { min: 18, max: 18, location: 'Ancient dolmens',  development: 'Protected by an age-old guardian',   isCataclysm: false },
  { min: 19, max: 19, location: 'Barbarian camp',   development: 'Hiding a great treasure',            isCataclysm: false },
  { min: 20, max: 20, location: 'Holy shrine',      development: 'With a door to another plane',       isCataclysm: false },
];

// d8 cataclysm types — used when POI development is "Disaster!"
export const CATACLYSM_TABLE = [
  'Volcano', 'Fire', 'Earthquake', 'Storm',
  'Flood', 'War', 'Pestilence', 'Magical disaster',
];

// Settlement names by tier — d8 per tier
export const SETTLEMENT_NAMES = {
  Village: [
    "Bruga's Hold", 'Lastwatch', 'Darkwater', 'Ostlin',
    'Treefall', 'Vorn', 'Hillshire', 'Nighthaven',
  ],
  Town: [
    'Fairhollow', "Ivan's Keep", 'Galina', 'Brightlantern',
    "Corvin's Crest", 'Ironbridge', 'Skalvin', 'Toresk',
  ],
  'City/metropolis': [
    'Doraine', 'Meridia', "King's Gate", 'Myrkhos',
    'Rularn', 'Ordos', 'Thane', 'Rahgbat',
  ],
};
