/**
 * Shadowdark equipment, grouped by category.
 *
 * Weapon entries include damage and range. Armor entries include the armor
 * class formula. Gear entries have a brief notes field describing use.
 * Paraphrased from the Shadowdark core rules.
 */
export const EQUIPMENT = [

  // ── Weapons ────────────────────────────────────────────────────────────────

  { category: 'weapon', name: 'Dagger',     cost: '1 gp',   damage: '1d4',  range: 'Close/Near', notes: 'Finesse, can be thrown' },
  { category: 'weapon', name: 'Shortsword', cost: '7 gp',   damage: '1d6',  range: 'Close',      notes: 'Finesse' },
  { category: 'weapon', name: 'Longsword',  cost: '9 gp',   damage: '1d8',  range: 'Close',      notes: '' },
  { category: 'weapon', name: 'Greatsword', cost: '11 gp',  damage: '1d10', range: 'Close',      notes: 'Two-handed' },
  { category: 'weapon', name: 'Handaxe',    cost: '5 gp',   damage: '1d6',  range: 'Close/Near', notes: 'Can be thrown' },
  { category: 'weapon', name: 'Battleaxe',  cost: '10 gp',  damage: '1d8',  range: 'Close',      notes: '' },
  { category: 'weapon', name: 'Club',       cost: '2 sp',   damage: '1d4',  range: 'Close',      notes: '' },
  { category: 'weapon', name: 'Mace',       cost: '5 gp',   damage: '1d6',  range: 'Close',      notes: '' },
  { category: 'weapon', name: 'Spear',      cost: '2 gp',   damage: '1d6',  range: 'Close/Near', notes: 'Can be thrown' },
  { category: 'weapon', name: 'Shortbow',   cost: '6 gp',   damage: '1d6',  range: 'Far',        notes: 'Two-handed' },
  { category: 'weapon', name: 'Longbow',    cost: '9 gp',   damage: '1d8',  range: 'Far',        notes: 'Two-handed' },
  { category: 'weapon', name: 'Crossbow',   cost: '8 gp',   damage: '1d6',  range: 'Far',        notes: 'Two-handed, reload after each shot' },

  // ── Armor ───────────────────────────────────────────────────────────────────

  { category: 'armor', name: 'Leather',   cost: '10 gp',  armorClass: '11 + DEX', notes: 'Light armor' },
  { category: 'armor', name: 'Chainmail', cost: '60 gp',  armorClass: '13 + DEX (max +2)', notes: 'Medium armor' },
  { category: 'armor', name: 'Plate',     cost: '130 gp', armorClass: '15',       notes: 'Heavy armor, no DEX bonus' },
  { category: 'armor', name: 'Shield',    cost: '10 gp',  armorClass: '+1 AC',    notes: 'Occupies one hand' },

  // ── Gear ────────────────────────────────────────────────────────────────────

  { category: 'gear', name: 'Torch',           cost: '1 cp',  notes: 'Sheds near light, lasts 1 hour' },
  { category: 'gear', name: 'Lantern',         cost: '5 gp',  notes: 'Sheds near light, uses oil' },
  { category: 'gear', name: 'Oil (3 uses)',    cost: '1 sp',  notes: 'Fuel for lanterns; also flammable' },
  { category: 'gear', name: 'Tinderbox',       cost: '1 gp',  notes: 'Start fires with flint and steel' },
  { category: 'gear', name: 'Rope (60 ft)',    cost: '1 gp',  notes: 'Hemp rope, holds up to 400 lb' },
  { category: 'gear', name: 'Grappling Hook',  cost: '1 gp',  notes: 'Use with rope to climb walls' },
  { category: 'gear', name: 'Rations (3 days)', cost: '1 gp', notes: 'Dried food for travel' },
  { category: 'gear', name: 'Waterskin',       cost: '1 sp',  notes: 'Holds one day\'s water' },
  { category: 'gear', name: 'Thieves\' Tools', cost: '5 gp',  notes: 'Required for picking locks' },
  { category: 'gear', name: 'Healing Potion',  cost: '50 gp', notes: 'Drink to restore 1d6 HP' },

];
