/**
 * Dungeon generation tables from the Dice Method rules.
 *
 * Rolls: d6 for size/type/danger, d10 per room, d12 for trap/hazard content.
 */

// d6 — each entry covers the listed min–max range
export const SITE_SIZES = [
  { min: 1, max: 2, label: 'Small',  dice: 5 },
  { min: 3, max: 5, label: 'Medium', dice: 8 },
  { min: 6, max: 6, label: 'Large',  dice: 12 },
];

// d6 — flat array (index = roll - 1)
export const SITE_TYPES = ['Cave', 'Cave', 'Tomb', 'Deep Tunnels', 'Ruins', 'Ruins'];

// d6 — flat array
export const DANGER_LEVELS = ['Unsafe', 'Unsafe', 'Unsafe', 'Risky', 'Risky', 'Deadly'];

// d10 room contents — each entry covers min–max; label is shown on the card
export const ROOM_CONTENTS = [
  { min: 1,  max: 2,  label: 'Empty' },
  { min: 3,  max: 3,  label: 'Trap' },
  { min: 4,  max: 4,  label: 'Minor Hazard' },
  { min: 5,  max: 5,  label: 'Solo Monster' },
  { min: 6,  max: 6,  label: 'NPC' },
  { min: 7,  max: 7,  label: 'Monster Mob' },
  { min: 8,  max: 8,  label: 'Major Hazard' },
  { min: 9,  max: 9,  label: 'Treasure' },
  { min: 10, max: 10, label: 'Boss Monster' },
];

// d12 traps
export const TRAPS = [
  { name: 'Crossbow',       trigger: 'Tripwire',              effect: '1d6' },
  { name: 'Hail of needles',trigger: 'Pressure plate',        effect: '1d6 / sleep' },
  { name: 'Toxic gas',      trigger: 'Opening a door',        effect: '1d6 / paralyze' },
  { name: 'Barbed net',     trigger: 'Switch or button',      effect: '1d6 / blind' },
  { name: 'Rolling boulder',trigger: 'False step on stairs',  effect: '2d8' },
  { name: 'Slicing blade',  trigger: 'Closing a door',        effect: '2d8 / sleep' },
  { name: 'Spiked pit',     trigger: 'Breaking a light beam', effect: '2d8 / paralyze' },
  { name: 'Javelin',        trigger: 'Pulling a lever',       effect: '2d8 / confuse' },
  { name: 'Magical glyph',  trigger: 'A word is spoken',      effect: '3d10' },
  { name: 'Blast of fire',  trigger: 'Hook on a thread',      effect: '3d10 / paralyze' },
  { name: 'Falling block',  trigger: 'Removing an object',    effect: '3d10 / unconscious' },
  { name: 'Cursed statue',  trigger: 'Casting a spell',       effect: '3d10 / petrify' },
];

// d12 hazards — three independent columns
export const HAZARDS = {
  movement: [
    'Quicksand', 'Caltrops', 'Loose debris', 'Tar field', 'Grasping vines',
    'Steep incline', 'Slippery ice', 'Rushing water', 'Sticky webs',
    'Gale force wind', 'Greased floor', 'Illusory terrain',
  ],
  damage: [
    'Acid pools', 'Exploding rocks', 'Icy water', 'Lava', 'Pummeling hail',
    'Steam vents', 'Toxic mold', 'Falling debris', 'Acid rain',
    'Curtain of fire', 'Electrified field', 'Gravity flux',
  ],
  weaken: [
    'Blinding smoke', 'Magnetic field', 'Exhausting runes', 'Antimagic zone',
    'Snuffs light sources', 'Disorienting sound', 'Magical silence',
    'Numbing cold', 'Sickening smell', 'Sleep-inducing spores',
    'Confusing reflections', 'Memory-stealing',
  ],
};

// 2d6 creature activity when encountered
export const CREATURE_ACTIVITY = [
  { min: 2,  max: 4,  activity: 'Hunting' },
  { min: 5,  max: 6,  activity: 'Eating' },
  { min: 7,  max: 8,  activity: 'Building/nesting' },
  { min: 9,  max: 10, activity: 'Socializing' },
  { min: 11, max: 11, activity: 'Guarding' },
  { min: 12, max: 12, activity: 'Sleeping' },
];

// d6 starting distance
export const STARTING_DISTANCES = ['Close', 'Near', 'Near', 'Near', 'Far', 'Far'];
