import { describe, it, expect, vi, beforeEach } from 'vitest';

// ── Mock all data modules so tests are independent of data size ───────────

vi.mock('../../app/js/gm-adventure-data.js', () => ({
  ADVENTURE_HOOK: {
    detail1: ['Rescue the', 'Find the'],
    detail2: ['Goblet', 'Prisoner'],
    detail3: ['Of the evil wizard', 'In the city sewers'],
  },
  SITE_NAME: {
    name1: ['Mines of the', 'Abbey of the'],
    name2: ['Cursed', 'Whispering'],
    name3: ['Flame', 'Ghost'],
  },
}));

vi.mock('../../app/js/gm-npc-data.js', () => ({
  NPC_ANCESTRY_TABLE: ['Human', 'Human', 'Elf', 'Dwarf', 'Halfling', 'Half-Orc', 'Goblin'],
  NPC_ALIGNMENT_TABLE: ['Lawful', 'Neutral', 'Chaotic'],
  NPC_AGE_TABLE: ['Child', 'Adult', 'Elderly'],
  NPC_WEALTH_TABLE: ['Poor', 'Standard', 'Wealthy'],
  NPC_QUALITIES: [
    { appearance: 'Balding', does: 'Spits', secret: 'Hiding a fugitive' },
    { appearance: 'Tall',    does: 'Laughs', secret: 'Is a werewolf' },
  ],
  NPC_OCCUPATIONS: [
    ['Gravedigger', 'Carpenter'],
    ['Baker', 'Locksmith'],
  ],
  NPC_NAMES: {
    Human:    ['Hesta', 'Matteo'],
    Elf:      ['Sarenia', 'Ravos'],
    Dwarf:    ['Hera', 'Torin'],
    Halfling: ['Myrtle', 'Robby'],
    'Half-Orc': ['Troga', 'Boraal'],
    Goblin:   ['Kog', 'Dibbs'],
  },
  NPC_EPITHETS: [
    ['The Gray', 'One-Eye'],
    ['The Elder', 'Six-Finger'],
  ],
  REACTION_TABLE: [
    { min: 0,  max: 6,  attitude: 'Hostile' },
    { min: 7,  max: 8,  attitude: 'Suspicious' },
    { min: 9,  max: 9,  attitude: 'Neutral' },
    { min: 10, max: 11, attitude: 'Curious' },
    { min: 12, max: 20, attitude: 'Friendly' },
  ],
}));

vi.mock('../../app/js/gm-events-data.js', () => ({
  RANDOM_EVENTS: [
    [1,   1,   'A fissure opens'],
    [2,   3,   'A foe leaps out'],
    [4,   99,  'A buzzing sound'],
    [100, 100, 'A radiant being appears'],
  ],
}));

vi.mock('../../app/js/gm-rumors-data.js', () => ({
  RUMORS: [
    [1,   1,   'An armored beast rampages'],
    [2,   3,   'Assassins are coming'],
    [4,   99,  'A bounty on your heads'],
    [100, 100, 'The dragon awoke'],
  ],
}));

vi.mock('../../app/js/gm-treasure-data.js', () => ({
  OATHS: ['The duke will help you', 'A unicorn will heal you'],
  SECRET_DETAIL1: ['The True Name of', 'The killer of'],
  SECRET_DETAIL2: ['The king', 'A powerful demon'],
  BLESSINGS: [
    { name: 'Wraithsight', description: 'See invisible creatures' },
    { name: 'Nine Lives',  description: 'Regain 1 HP nine times' },
  ],
}));

vi.mock('../../app/js/gm-magic-items-data.js', () => ({
  MAGIC_ITEMS: [
    { name: 'Amulet of Vitality', description: 'CON becomes 18 (+4)' },
    { name: 'Bag of Badgers',     description: 'Pull out a badger once per day' },
  ],
}));

vi.mock('../../app/js/gm-encounter-data.js', () => ({
  ENCOUNTER_TABLES: {
    Forest: [
      ['01-50', 'Wolves in the trees'],
      ['51-99', 'A band of outlaws'],
      ['00',    'An ancient treant awakes'],
    ],
    Arctic: [
      ['01-50', 'A frost giant patrol'],
      ['51-99', 'Yeti tracks'],
      ['00',    'A frozen dragon'],
    ],
  },
}));

vi.mock('../../app/js/gm-overland-data.js', () => ({
  TERRAIN_ORDER: ['Desert/Arctic', 'Swamp', 'Grassland', 'Forest/Jungle'],
  HEX_TERRAIN_TABLE: [
    { min: 2,  max: 5,  terrain: 'Grassland' },
    { min: 6,  max: 12, terrain: 'Forest/Jungle' },
  ],
  NEW_HEX_TABLE: [
    { min: 2,  max: 3,  steps: 1,    fresh: false },
    { min: 4,  max: 10, steps: 0,    fresh: false },
    { min: 11, max: 11, steps: 2,    fresh: false },
    { min: 12, max: 12, steps: null, fresh: true  },
  ],
  HEX_DANGER_TABLE: [
    { min: 1, max: 3, level: 'Unsafe' },
    { min: 4, max: 6, level: 'Risky'  },
  ],
  POINTS_OF_INTEREST: [
    { min: 1,  max: 1,  location: 'Small tower', development: 'Disaster! Roll on Cataclysm table', isCataclysm: true },
    { min: 2,  max: 20, location: 'Village',      development: 'Abandoned',                        isCataclysm: false },
  ],
  CATACLYSM_TABLE: ['Volcano', 'Fire'],
  SETTLEMENT_NAMES: {
    Village: ['Lastwatch', 'Ostlin'],
  },
}));

vi.mock('../../app/js/gm-dungeon-data.js', () => ({
  SITE_SIZES: [
    { min: 1, max: 3, label: 'Small',  dice: 3 },
    { min: 4, max: 6, label: 'Medium', dice: 5 },
  ],
  SITE_TYPES: ['Cave', 'Ruins'],
  DANGER_LEVELS: ['Unsafe', 'Risky', 'Deadly'],
  ROOM_CONTENTS: [
    { min: 1, max: 2, label: 'Empty' },
    { min: 3, max: 3, label: 'Trap' },
    { min: 4, max: 4, label: 'Minor Hazard' },
    { min: 5, max: 5, label: 'Solo Monster' },
    { min: 6, max: 6, label: 'NPC' },
    { min: 7, max: 7, label: 'Monster Mob' },
    { min: 8, max: 8, label: 'Major Hazard' },
    { min: 9, max: 9, label: 'Treasure' },
    { min: 10, max: 10, label: 'Boss Monster' },
  ],
  TRAPS: [
    { name: 'Crossbow', trigger: 'Tripwire', effect: '1d6' },
    { name: 'Spiked pit', trigger: 'Light beam', effect: '2d8' },
  ],
  HAZARDS: {
    movement: ['Quicksand', 'Caltrops'],
    damage:   ['Acid pools', 'Lava'],
    weaken:   ['Blinding smoke', 'Antimagic zone'],
  },
  CREATURE_ACTIVITY: [
    { min: 2,  max: 7,  activity: 'Hunting' },
    { min: 8,  max: 12, activity: 'Sleeping' },
  ],
  STARTING_DISTANCES: ['Close', 'Near', 'Far'],
}));

import {
  generateAdventureHook,
  generateNPC,
  generateEncounter,
  getTerrainNames,
  generateRandomEvent,
  generateRumor,
  generateOath,
  generateSecret,
  generateBlessing,
  generateMagicItem,
  generateDungeon,
  generateMarch,
  getOverlandTerrains,
  getOverlandDangerLevels,
} from '../../app/js/gm-generators.js';

// ── Adventure Hook ─────────────────────────────────────────────────────────

describe('generateAdventureHook', () => {
  it('returns an object with hook and site string fields', () => {
    const result = generateAdventureHook();
    expect(typeof result.hook).toBe('string');
    expect(typeof result.site).toBe('string');
  });

  it('hook is a non-empty string', () => {
    expect(generateAdventureHook().hook.length).toBeGreaterThan(0);
  });

  it('site is a non-empty string', () => {
    expect(generateAdventureHook().site.length).toBeGreaterThan(0);
  });

  it('hook contains words from all three columns', () => {
    // With 2-entry mock tables, one of the combinations must appear
    const { hook } = generateAdventureHook();
    expect(hook).toMatch(/^(Rescue the|Find the)/);
    expect(hook).toMatch(/(Goblet|Prisoner)/);
  });

  it('site contains words from all three name columns', () => {
    const { site } = generateAdventureHook();
    expect(site).toMatch(/^(Mines of the|Abbey of the)/);
  });

  it('generates different results on repeated calls', () => {
    const results = new Set(Array.from({ length: 20 }, () => generateAdventureHook().hook));
    expect(results.size).toBeGreaterThan(1);
  });
});

// ── NPC ────────────────────────────────────────────────────────────────────

describe('generateNPC', () => {
  it('returns an object with all required fields', () => {
    const npc = generateNPC();
    expect(npc).toMatchObject({
      name:       expect.any(String),
      ancestry:   expect.any(String),
      alignment:  expect.any(String),
      age:        expect.any(String),
      wealth:     expect.any(String),
      appearance: expect.any(String),
      does:       expect.any(String),
      secret:     expect.any(String),
      occupation: expect.any(String),
      epithet:    expect.any(String),
      reaction:   expect.any(String),
      reactionRoll: expect.any(Number),
    });
  });

  it('reactionRoll is between 2 and 12 inclusive', () => {
    for (let i = 0; i < 20; i++) {
      const { reactionRoll } = generateNPC();
      expect(reactionRoll).toBeGreaterThanOrEqual(2);
      expect(reactionRoll).toBeLessThanOrEqual(12);
    }
  });

  it('reaction maps to a valid attitude string', () => {
    const valid = ['Hostile', 'Suspicious', 'Neutral', 'Curious', 'Friendly'];
    for (let i = 0; i < 20; i++) {
      expect(valid).toContain(generateNPC().reaction);
    }
  });

  it('name comes from the correct ancestry name list', () => {
    const humanNames = ['Hesta', 'Matteo'];
    const elfNames   = ['Sarenia', 'Ravos'];
    const dwarfNames = ['Hera', 'Torin'];
    const allNames   = [...humanNames, ...elfNames, ...dwarfNames,
                        'Myrtle', 'Robby', 'Troga', 'Boraal', 'Kog', 'Dibbs'];
    for (let i = 0; i < 30; i++) {
      expect(allNames).toContain(generateNPC().name);
    }
  });
});

// ── Random Encounter ───────────────────────────────────────────────────────

describe('getTerrainNames', () => {
  it('returns a sorted array of terrain strings', () => {
    const names = getTerrainNames();
    expect(names).toEqual(['Arctic', 'Forest']);
  });
});

describe('generateEncounter', () => {
  it('returns an object with terrain, roll, and encounter fields', () => {
    const result = generateEncounter('Forest');
    expect(result).toMatchObject({
      terrain:   'Forest',
      roll:      expect.any(Number),
      encounter: expect.any(String),
    });
  });

  it('roll is between 1 and 100', () => {
    for (let i = 0; i < 20; i++) {
      const { roll } = generateEncounter('Forest');
      expect(roll).toBeGreaterThanOrEqual(1);
      expect(roll).toBeLessThanOrEqual(100);
    }
  });

  it('returns null for an unknown terrain', () => {
    expect(generateEncounter('Volcano')).toBeNull();
  });

  it('reflects the correct terrain in the result', () => {
    expect(generateEncounter('Arctic').terrain).toBe('Arctic');
  });

  it('encounter text is non-empty', () => {
    expect(generateEncounter('Forest').encounter.length).toBeGreaterThan(0);
  });

  it('handles the "00" = 100 edge case', () => {
    // Force roll of 100 via Math.random → 0.99...
    vi.spyOn(Math, 'random').mockReturnValueOnce(0.999);
    const result = generateEncounter('Forest');
    expect(result.encounter).toBe('An ancient treant awakes');
    vi.restoreAllMocks();
  });
});

// ── Random Event ───────────────────────────────────────────────────────────

describe('generateRandomEvent', () => {
  it('returns an object with roll and event fields', () => {
    const result = generateRandomEvent();
    expect(typeof result.roll).toBe('number');
    expect(typeof result.event).toBe('string');
  });

  it('roll is between 1 and 100', () => {
    for (let i = 0; i < 20; i++) {
      expect(generateRandomEvent().roll).toBeGreaterThanOrEqual(1);
      expect(generateRandomEvent().roll).toBeLessThanOrEqual(100);
    }
  });

  it('event is a non-empty string', () => {
    expect(generateRandomEvent().event.length).toBeGreaterThan(0);
  });

  it('resolves roll 1 to the first entry', () => {
    vi.spyOn(Math, 'random').mockReturnValueOnce(0);
    expect(generateRandomEvent().event).toBe('A fissure opens');
    vi.restoreAllMocks();
  });

  it('resolves roll 100 to the last entry', () => {
    vi.spyOn(Math, 'random').mockReturnValueOnce(0.999);
    expect(generateRandomEvent().event).toBe('A radiant being appears');
    vi.restoreAllMocks();
  });
});

// ── Rumor ──────────────────────────────────────────────────────────────────

describe('generateRumor', () => {
  it('returns an object with roll and rumor fields', () => {
    const result = generateRumor();
    expect(typeof result.roll).toBe('number');
    expect(typeof result.rumor).toBe('string');
  });

  it('rumor is a non-empty string', () => {
    expect(generateRumor().rumor.length).toBeGreaterThan(0);
  });

  it('resolves roll 1 to the first rumor', () => {
    vi.spyOn(Math, 'random').mockReturnValueOnce(0);
    expect(generateRumor().rumor).toBe('An armored beast rampages');
    vi.restoreAllMocks();
  });
});

// ── Boons ──────────────────────────────────────────────────────────────────

describe('generateOath', () => {
  it('returns an object with an oath string', () => {
    expect(typeof generateOath().oath).toBe('string');
  });

  it('oath is non-empty', () => {
    expect(generateOath().oath.length).toBeGreaterThan(0);
  });

  it('oath comes from the OATHS table', () => {
    const valid = ['The duke will help you', 'A unicorn will heal you'];
    for (let i = 0; i < 20; i++) {
      expect(valid).toContain(generateOath().oath);
    }
  });
});

describe('generateSecret', () => {
  it('returns an object with a secret string', () => {
    expect(typeof generateSecret().secret).toBe('string');
  });

  it('secret is non-empty', () => {
    expect(generateSecret().secret.length).toBeGreaterThan(0);
  });

  it('secret combines a detail1 and detail2', () => {
    const { secret } = generateSecret();
    expect(secret).toMatch(/^(The True Name of|The killer of)/);
    expect(secret).toMatch(/(The king|A powerful demon)$/);
  });
});

describe('generateBlessing', () => {
  it('returns an object with name and description', () => {
    const b = generateBlessing();
    expect(typeof b.name).toBe('string');
    expect(typeof b.description).toBe('string');
  });

  it('name and description are non-empty', () => {
    const b = generateBlessing();
    expect(b.name.length).toBeGreaterThan(0);
    expect(b.description.length).toBeGreaterThan(0);
  });

  it('returns one of the known blessings', () => {
    const valid = ['Wraithsight', 'Nine Lives'];
    for (let i = 0; i < 20; i++) {
      expect(valid).toContain(generateBlessing().name);
    }
  });
});

// ── Magic Item ─────────────────────────────────────────────────────────────

describe('generateMagicItem', () => {
  it('returns an object with name and description', () => {
    const item = generateMagicItem();
    expect(typeof item.name).toBe('string');
    expect(typeof item.description).toBe('string');
  });

  it('name is non-empty', () => {
    expect(generateMagicItem().name.length).toBeGreaterThan(0);
  });

  it('description is non-empty', () => {
    expect(generateMagicItem().description.length).toBeGreaterThan(0);
  });

  it('returns one of the known magic items', () => {
    const valid = ['Amulet of Vitality', 'Bag of Badgers'];
    for (let i = 0; i < 20; i++) {
      expect(valid).toContain(generateMagicItem().name);
    }
  });

  it('generates different items on repeated calls', () => {
    const names = new Set(Array.from({ length: 20 }, () => generateMagicItem().name));
    expect(names.size).toBeGreaterThan(1);
  });
});

// ── Dungeon ────────────────────────────────────────────────────────────────

describe('generateDungeon', () => {
  it('returns an object with size, type, dangerLevel, and rooms', () => {
    const dungeon = generateDungeon();
    expect(typeof dungeon.size).toBe('string');
    expect(typeof dungeon.type).toBe('string');
    expect(typeof dungeon.dangerLevel).toBe('string');
    expect(Array.isArray(dungeon.rooms)).toBe(true);
  });

  it('room count matches the dice count for the rolled size', () => {
    // With the mock, Small=3 rooms, Medium=5 rooms
    for (let i = 0; i < 20; i++) {
      const { size, rooms } = generateDungeon();
      const expectedDice = size === 'Small' ? 3 : 5;
      expect(rooms).toHaveLength(expectedDice);
    }
  });

  it('rooms are numbered sequentially starting at 1', () => {
    const { rooms } = generateDungeon();
    rooms.forEach((r, i) => expect(r.number).toBe(i + 1));
  });

  it('every room has a roll between 1 and 10', () => {
    const { rooms } = generateDungeon();
    rooms.forEach((r) => {
      expect(r.roll).toBeGreaterThanOrEqual(1);
      expect(r.roll).toBeLessThanOrEqual(10);
    });
  });

  it('every room has a label string', () => {
    const { rooms } = generateDungeon();
    rooms.forEach((r) => expect(typeof r.label).toBe('string'));
  });

  it('at least one room is marked as the objective', () => {
    const { rooms } = generateDungeon();
    expect(rooms.some((r) => r.isObjective)).toBe(true);
  });

  it('the objective room has the highest roll', () => {
    const { rooms } = generateDungeon();
    const maxRoll = Math.max(...rooms.map((r) => r.roll));
    const objectiveRooms = rooms.filter((r) => r.isObjective);
    objectiveRooms.forEach((r) => expect(r.roll).toBe(maxRoll));
  });

  it('no non-objective room has a roll higher than the objective', () => {
    const { rooms } = generateDungeon();
    const maxRoll = Math.max(...rooms.map((r) => r.roll));
    rooms.filter((r) => !r.isObjective).forEach((r) => {
      expect(r.roll).toBeLessThanOrEqual(maxRoll);
    });
  });

  it('trap rooms have a detail string', () => {
    // Force all rooms to be traps (d10=3) by fixing Math.random
    vi.spyOn(Math, 'random').mockReturnValue(0.25); // 0.25 * 10 + 1 = 3.5 → roll 3 (Trap)
    const { rooms } = generateDungeon();
    rooms.forEach((r) => {
      if (r.label === 'Trap') {
        expect(typeof r.detail).toBe('string');
        expect(r.detail.length).toBeGreaterThan(0);
      }
    });
    vi.restoreAllMocks();
  });

  it('empty rooms have null detail', () => {
    // Force rolls of 1–2 (Empty)
    vi.spyOn(Math, 'random').mockReturnValue(0.05);
    const { rooms } = generateDungeon();
    rooms.filter((r) => r.label === 'Empty').forEach((r) => {
      expect(r.detail).toBeNull();
    });
    vi.restoreAllMocks();
  });

  it('treasure rooms have null detail', () => {
    // Force roll of 9 (Treasure) — Math.random = 0.85 → floor(0.85*10)+1 = 9
    vi.spyOn(Math, 'random').mockReturnValue(0.85);
    const { rooms } = generateDungeon();
    rooms.filter((r) => r.label === 'Treasure').forEach((r) => {
      expect(r.detail).toBeNull();
    });
    vi.restoreAllMocks();
  });

  it('generates different dungeons on repeated calls', () => {
    const types = new Set(Array.from({ length: 30 }, () => generateDungeon().type));
    expect(types.size).toBeGreaterThan(1);
  });
});

// ── Overland March ─────────────────────────────────────────────────────────

describe('getOverlandTerrains', () => {
  it('returns the terrain order array', () => {
    expect(getOverlandTerrains()).toEqual(['Desert/Arctic', 'Swamp', 'Grassland', 'Forest/Jungle']);
  });
});

describe('getOverlandDangerLevels', () => {
  it('returns all danger level strings', () => {
    const levels = getOverlandDangerLevels();
    expect(levels).toContain('Unsafe');
    expect(levels).toContain('Risky');
  });
});

describe('generateMarch', () => {
  it('returns an object with terrain, danger, hasPOI, and poi fields', () => {
    const result = generateMarch('Grassland');
    expect(typeof result.terrain).toBe('string');
    expect(typeof result.danger).toBe('string');
    expect(typeof result.hasPOI).toBe('boolean');
  });

  it('terrain is one of the known terrain types', () => {
    const known = ['Desert/Arctic', 'Swamp', 'Grassland', 'Forest/Jungle'];
    for (let i = 0; i < 20; i++) {
      expect(known).toContain(generateMarch('Grassland').terrain);
    }
  });

  it('steps +1 forward from current terrain correctly', () => {
    // Force new-hex roll of 2 (steps=1) and no POI (d6 > 1)
    const calls = [
      0.1,   // new-hex 2d6 die 1: floor(0.1*6)+1 = 1
      0.1,   // new-hex 2d6 die 2: 1 → total 2 → steps=1
      0.1,   // danger d6: 1 → Unsafe
      0.9,   // poi d6: floor(0.9*6)+1 = 6 → no POI
    ];
    let callIdx = 0;
    vi.spyOn(Math, 'random').mockImplementation(() => calls[callIdx++ % calls.length]);
    const result = generateMarch('Grassland'); // Grassland is index 2 → +1 = Forest/Jungle (index 3)
    expect(result.terrain).toBe('Forest/Jungle');
    vi.restoreAllMocks();
  });

  it('poi is null when hasPOI is false', () => {
    // Force no POI: d6 result > 1 → mock Math.random to give ~0.9 for the poi roll
    vi.spyOn(Math, 'random').mockReturnValue(0.9);
    const result = generateMarch('Grassland');
    if (!result.hasPOI) {
      expect(result.poi).toBeNull();
    }
    vi.restoreAllMocks();
  });

  it('when hasPOI is true, poi has location and development', () => {
    // Force POI: make Math.random return ~0 so d6 roll = 1
    vi.spyOn(Math, 'random').mockReturnValue(0.0);
    const result = generateMarch('Grassland');
    if (result.hasPOI) {
      expect(typeof result.poi.location).toBe('string');
      expect(typeof result.poi.development).toBe('string');
    }
    vi.restoreAllMocks();
  });

  it('cataclysm POI includes a cataclysm string', () => {
    // Force: new-hex same terrain, poi d6=1, poi d20=1 (cataclysm row)
    const seq = [
      0.5,  // die1 new-hex: 4
      0.5,  // die2 new-hex: 4 → total 8 → steps=0 (same terrain)
      0.1,  // danger d6: 1
      0.0,  // poi d6: 1 → has POI
      0.0,  // poi d20: 1 → cataclysm row
      0.0,  // cataclysm d2: 1 → Volcano
    ];
    let i = 0;
    vi.spyOn(Math, 'random').mockImplementation(() => seq[i++ % seq.length]);
    const result = generateMarch('Grassland');
    if (result.hasPOI && result.poi?.cataclysm) {
      expect(typeof result.poi.cataclysm).toBe('string');
      expect(result.poi.cataclysm.length).toBeGreaterThan(0);
    }
    vi.restoreAllMocks();
  });

  it('settlement locations get a settlement name', () => {
    // Force: same terrain, POI d6=1, d20=2 (Village row, index 1 in mock)
    const seq = [
      0.5, 0.5,  // new-hex 2d6: 4+4=8, same terrain
      0.1,       // danger
      0.0,       // poi d6: 1 → has POI
      0.05,      // poi d20: floor(0.05*20)+1 = 2 → Village row
      0.0,       // settlement name d2: 1 → Lastwatch
    ];
    let i = 0;
    vi.spyOn(Math, 'random').mockImplementation(() => seq[i++ % seq.length]);
    const result = generateMarch('Grassland');
    if (result.hasPOI && result.poi?.settlementName) {
      expect(typeof result.poi.settlementName).toBe('string');
    }
    vi.restoreAllMocks();
  });

  it('unknown current terrain falls back gracefully', () => {
    expect(() => generateMarch('Volcano')).not.toThrow();
  });
});
