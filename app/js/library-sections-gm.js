/**
 * Section descriptors for the 11 GM Tools sections of the Library tab.
 */

import { makeReferenceCard, makeSectionHeader, makeTable, makeReferenceList, makeParagraph } from './library-helpers.js';
import { ENCOUNTER_TABLES, TERRAIN_NAMES } from './gm-encounter-data.js';

function makeItems(rules) {
  return Object.entries(rules)
    .map(([id, r]) => ({ id, label: r.label, ...(r.sublabel != null && { sublabel: r.sublabel }) }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

// ── Running the Game ───────────────────────────────────────────────────────

const RUNNING_THE_GAME = {
  'awarding-xp': {
    label: 'Awarding XP',
    render(c) {
      c.appendChild(makeSectionHeader('Awarding XP'));
      c.appendChild(makeTable(
        ['Quality', 'XP', 'Examples'],
        [
          ['Poor',      '0',  'Bag of silver, used dagger, knucklebone dice'],
          ['Normal',    '1',  'Bag of gold, gem, fine armor, magic scroll'],
          ['Fabulous',  '3',  'Magic sword, giant diamond, mithral chainmail'],
          ['Legendary', '10', 'The Staff of Ord, a djinni\'s wish, a dragon hoard'],
        ]
      ));
      c.appendChild(makeSectionHeader('Gold per Treasure Find'));
      c.appendChild(makeTable(
        ['Level Band', 'Approx. Gold per Find'],
        [['0–3', '20 gp'], ['4–6', '50 gp'], ['7–9', '80 gp']]
      ));
    },
  },
  'difficulty-classes': {
    label: 'Difficulty Classes',
    render(c) {
      c.appendChild(makeParagraph('Easy (9), Normal (12), Hard (15), Extreme (18). When you ask for a check, state the type: e.g. "easy Charisma check" or "DC 15 Dexterity check."'));
    },
  },
  'dungeon-maps': {
    label: 'Dungeon Maps',
    render(c) {
      c.appendChild(makeSectionHeader('Dungeon Maps — Dice Method'));
      c.appendChild(makeTable(
        ['d6', 'Danger Level'],
        [['1–3', 'Unsafe'], ['4–5', 'Risky'], ['6', 'Deadly']]
      ));
      c.appendChild(makeTable(
        ['d6', 'Size', 'Dice'],
        [['1–2', 'Small', '5d10'], ['3–5', 'Medium', '8d10'], ['6', 'Large', '12d10']]
      ));
      c.appendChild(makeTable(
        ['d6', 'Site Type'],
        [['1–2', 'Cave'], ['3', 'Tomb'], ['4', 'Deep tunnels'], ['5–6', 'Ruins']]
      ));
      c.appendChild(makeSectionHeader('Room Contents (d10)'));
      c.appendChild(makeTable(
        ['d10', 'Feature'],
        [
          ['1–2', 'Empty'],   ['3', 'Trap'],          ['4', 'Minor hazard'],
          ['5',   'Solo monster'], ['6', 'NPC'],      ['7', 'Monster mob'],
          ['8',   'Major hazard'], ['9', 'Treasure'], ['10', 'Boss monster'],
        ]
      ));
    },
  },
  'hazards': {
    label: 'Hazards',
    render(c) {
      c.appendChild(makeSectionHeader('Hazards (d12)'));
      c.appendChild(makeTable(
        ['d12', 'Movement', 'Damage', 'Weaken'],
        [
          ['1',  'Quicksand',      'Acid pools',          'Blinding smoke'],
          ['2',  'Caltrops',       'Exploding rocks',     'Magnetic field'],
          ['3',  'Loose debris',   'Icy water',           'Exhausting runes'],
          ['4',  'Tar field',      'Lava',                'Antimagic zone'],
          ['5',  'Grasping vines', 'Pummeling hail',      'Snuffs light sources'],
          ['6',  'Steep incline',  'Steam vents',         'Disorienting sound'],
          ['7',  'Slippery ice',   'Toxic mold',          'Magical silence'],
          ['8',  'Rushing water',  'Falling debris',      'Numbing cold'],
          ['9',  'Sticky webs',    'Acid rain',           'Sickening smell'],
          ['10', 'Gale force wind','Curtain of fire',     'Sleep-inducing spores'],
          ['11', 'Greased floor',  'Electrified field',   'Confusing reflections'],
          ['12', 'Illusory terrain','Gravity flux',       'Memory-stealing'],
        ]
      ));
    },
  },
  'optional-modes': {
    label: 'Optional Modes',
    render(c) {
      const list = makeReferenceList();
      list.appendChild(makeReferenceCard('Hunter Mode',   null, 'Defeated monsters grant XP equal to half their level (round down).'));
      list.appendChild(makeReferenceCard('Momentum Mode', null, 'Advantage on checks to repeat a failed action; damage dice explode (no cap).'));
      list.appendChild(makeReferenceCard('Pulp Mode',     null, 'No luck token max; start each session with 1d4 tokens; tokens convert hits to crits or grant extra actions.'));
      list.appendChild(makeReferenceCard('Blitz Mode',    null, 'Light timers last 30 minutes.'));
      list.appendChild(makeReferenceCard('Chaos Mode',    null, 'Reroll initiative at the start of every combat round.'));
      list.appendChild(makeReferenceCard('Deadly Mode',   null, 'Death timer is always 1; DC 18 INT to stabilize.'));
      list.appendChild(makeReferenceCard('Fatality Mode', null, 'Characters die at 0 hit points.'));
      list.appendChild(makeReferenceCard('Grinder Mode',  null, 'Regain only 1 stat damage per stat and one hit die worth of HP per rest; spellcasters recover only 1d4 lost spells.'));
      c.appendChild(list);
    },
  },
  'random-encounters': {
    label: 'Random Encounters',
    render(c) {
      const list = makeReferenceList();
      list.appendChild(makeReferenceCard('Check',             '1d6',        'Encounter occurs on a result of 1. Check at intervals per danger level.'));
      list.appendChild(makeReferenceCard('Starting Distance', '1d6',        '1: Close · 2–4: Near · 5–6: Far'));
      list.appendChild(makeReferenceCard('Activity',          '2d6',        '2–4: Hunting · 5–6: Eating · 7–8: Building/nesting · 9–10: Socializing · 11: Guarding · 12: Sleeping'));
      list.appendChild(makeReferenceCard('Reaction Check',    '2d6 + CHA',  '0–6: Hostile · 7–8: Suspicious · 9: Neutral · 10–11: Curious · 12+: Friendly'));
      c.appendChild(list);
    },
  },
  'traps': {
    label: 'Traps',
    render(c) {
      c.appendChild(makeSectionHeader('Traps (d12)'));
      c.appendChild(makeTable(
        ['d12', 'Trap', 'Trigger', 'Damage / Effect'],
        [
          ['1',  'Crossbow',      'Tripwire',              '1d6'],
          ['2',  'Hail of needles','Pressure plate',       '1d6/sleep'],
          ['3',  'Toxic gas',     'Opening a door',        '1d6/paralyze'],
          ['4',  'Barbed net',    'Switch or button',      '1d6/blind'],
          ['5',  'Rolling boulder','False step on stairs', '2d8'],
          ['6',  'Slicing blade', 'Closing a door',        '2d8/sleep'],
          ['7',  'Spiked pit',    'Breaking a light beam', '2d8/paralyze'],
          ['8',  'Javelin',       'Pulling a lever',       '2d8/confuse'],
          ['9',  'Magical glyph', 'A word is spoken',      '3d10'],
          ['10', 'Blast of fire', 'Hook on a thread',      '3d10/paralyze'],
          ['11', 'Falling block', 'Removing an object',    '3d10/unconscious'],
          ['12', 'Cursed statue', 'Casting a spell',       '3d10/petrify'],
        ]
      ));
    },
  },
};

export const runningTheGameSection = {
  id: 'running-the-game',
  label: 'Running the Game',
  items: makeItems(RUNNING_THE_GAME),
  renderDetail(container, itemId) { RUNNING_THE_GAME[itemId]?.render(container); },
};

// ── Monsters ───────────────────────────────────────────────────────────────

const MONSTERS = {
  'combat-roles': {
    label: 'Combat Roles',
    render(c) {
      const list = makeReferenceList();
      list.appendChild(makeReferenceCard('Mook',       null, 'Low damage, HP, AC, and attack bonus. Swarmy.'));
      list.appendChild(makeReferenceCard('Soldier',    null, 'Mid-range damage, HP, AC, and attack bonus.'));
      list.appendChild(makeReferenceCard('Striker',    null, 'High damage and attack bonus. Low HP and AC. Often stealthy.'));
      list.appendChild(makeReferenceCard('Tank',       null, 'Mid-range damage and attack bonus. High HP and AC.'));
      list.appendChild(makeReferenceCard('Controller', null, 'Environment-altering talents. Mid-range damage, low HP and AC.'));
      list.appendChild(makeReferenceCard('Legendary',  null, 'High HP, AC, damage, and/or attack bonus.'));
      c.appendChild(list);
    },
  },
  'damage-by-level': {
    label: 'Damage by Level',
    render(c) {
      c.appendChild(makeTable(
        ['LV', 'Damage per Attack', 'Number of Attacks'],
        [
          ['0–3',  'd4 or d6',               'One or two'],
          ['4–6',  'd6 or d8',               'Two or three'],
          ['7–9',  'd8 or d10',              'Three or four'],
          ['10+',  'd12 or multiple dice',   'Four or five'],
        ]
      ));
    },
  },
  'level-tiers': {
    label: 'Level Tiers',
    render(c) {
      c.appendChild(makeTable(
        ['LV', 'Tier', 'Treasure'],
        [
          ['0–3',  'Weak, common',       'Poor or normal'],
          ['4–6',  'Risky, uncommon',    'Normal'],
          ['7–9',  'Dangerous, rare',    'Normal or fabulous'],
          ['10+',  'Mighty, unique',     'Fabulous or legendary'],
        ]
      ));
    },
  },
  'monster-difficulty': {
    label: 'Monster Difficulty',
    render(c) {
      c.appendChild(makeSectionHeader('1:1 Monster Difficulty'));
      c.appendChild(makeTable(
        ['Avg. Party Level', 'Monster LV per PC'],
        [['0–3', '1'], ['4–6', '3'], ['7–9', '5']]
      ));
    },
  },
  'monster-generator': {
    label: 'Monster Generator',
    render(c) {
      c.appendChild(makeSectionHeader('Monster Generator (d20)'));
      c.appendChild(makeTable(
        ['d20', 'Combat', 'Quality', 'Strength', 'Weakness'],
        [
          ['1',  'PL −3', 'Beastlike',   '+1 attack',          'Cold'],
          ['2',  'PL −3', 'Avian',       'Absorbs magic',      'Greed'],
          ['3',  'PL −2', 'Amphibious',  'Swarm',              'Light'],
          ['4',  'PL −2', 'Demonic',     '1d10 damage',        'Salt'],
          ['5',  'PL −1', 'Arachnid',    'Poison sting',       'Vanity'],
          ['6',  'PL −1', 'Ooze',        'Confusing gaze',     'Mirrors'],
          ['7',  'PL',    'Insectoid',   'Eats metal',         'Electricity'],
          ['8',  'PL',    'Draconic',    'Ranged attacks',     'Fragile body'],
          ['9',  'PL',    'Plantlike',   'Highly intelligent', 'Sunlight'],
          ['10', 'PL',    'Elephantine', 'Crushing grasp',     'Silver'],
          ['11', 'PL',    'Undead',      'Psychic blast',      'Fire'],
          ['12', 'PL',    'Crystalline', 'Stealthy',           'Food'],
          ['13', 'PL',    'Humanoid',    'Petrifying gaze',    'Acid'],
          ['14', 'PL +1', 'Angelic',     '1d12 damage',        'Garlic'],
          ['15', 'PL +1', 'Spectral',    'Impersonation',      'Iron'],
          ['16', 'PL +2', 'Stonecarved', 'Blinding aura',      'Water'],
          ['17', 'PL +2', 'Serpentine',  'Turns invisible',    'Its True Name'],
          ['18', 'PL +3', 'Elemental',   '2d6 damage',         'Loud sounds'],
          ['19', 'PL +3', 'Piscine',     'Swallows whole',     'Holy water'],
          ['20', 'PL +4', 'Reptilian',   '+2 attacks',         'Music'],
        ]
      ));
    },
  },
  'monster-mutations': {
    label: 'Monster Mutations',
    render(c) {
      c.appendChild(makeSectionHeader('Monster Mutations (d12 — up to 3)'));
      c.appendChild(makeTable(
        ['d12', 'Mutation 1', 'Mutation 2', 'Mutation 3'],
        [
          ['1',  'Shapechanger',    'Double damage',        'Speaks Common'],
          ['2',  'Fins and gills',  'Breathes fire',        'Knows 1d4 spells'],
          ['3',  'Insulating fur',  'Fast healing',         'Telepathic'],
          ['4',  'Ironlike scales', '+1 attack',            'Toxic spores'],
          ['5',  'Extra limbs',     '+2 AC',                'Sonic blasts'],
          ['6',  'Tentacles',       '+2 levels',            'Can teleport in bursts'],
          ['7',  'Boneless',        '+1d6 damage',          'Paralytic touch'],
          ['8',  'Gigantic',        'Life-draining touch',  'Genius intellect'],
          ['9',  'Flings spikes',   'Very fast',            'Antimagic field'],
          ['10', 'Two heads',       'Reflects spells',      'Blood-draining bite'],
          ['11', 'Burrows',         'Electrified weapon',   'Has swamp fever'],
          ['12', 'Wings',           'Acidic saliva',        'Blessed by a god'],
        ]
      ));
    },
  },
  'monster-rules': {
    label: 'Monster Rules',
    render(c) {
      const list = makeReferenceList();
      list.appendChild(makeReferenceCard('Dark-Adapted', null, 'All non-humanoid monsters are dark-adapted and ignore penalties of total darkness.'));
      list.appendChild(makeReferenceCard('Morale',       'DC 15 WIS', 'Enemies at half HP (solo) or half their number (group) flee on a failed DC 15 Wisdom check.'));
      list.appendChild(makeReferenceCard('Spellcasting', null, 'Treat the same as character spellcasting. Tier = spellcasting DC − 10. Nat 1 on INT/CHA: Wizard Mishap. Nat 1 on WIS: penance.'));
      c.appendChild(list);
    },
  },
  'stat-block': {
    label: 'Stat Block Format',
    render(c) {
      c.appendChild(makeParagraph('AC · HP · ATK (attacks, range, bonus, damage) · MV (movement) · S/D/C/I/W/Ch (stat mods) · AL (alignment) · LV (level). Followed by any special talents.'));
    },
  },
};

export const monstersSection = {
  id: 'monsters',
  label: 'Monsters',
  items: makeItems(MONSTERS),
  renderDetail(container, itemId) { MONSTERS[itemId]?.render(container); },
};

// ── Magic Items ────────────────────────────────────────────────────────────

const MAGIC_ITEMS = {
  'design-principles': {
    label: 'Design Principles',
    render(c) {
      const list = makeReferenceList();
      list.appendChild(makeReferenceCard('Unique',       null, 'All magic items should be distinct. Give them personalities, strange curses, or unique appearances.'));
      list.appendChild(makeReferenceCard('Power Level',  null, 'Benefits should each be roughly equivalent to a class talent. Magic items can be mighty, but rarely eclipse what a character contributes.'));
      list.appendChild(makeReferenceCard('Darkvision Caution', null, 'Be very careful with effects that remove the need for torches or the light spell — they remove core time pressure.'));
      list.appendChild(makeReferenceCard('Gear Slots',   null, 'Enhancing gear slots reduces core challenges. Such effects should be rare and limited.'));
      c.appendChild(list);
    },
  },
  'item-bonus': {
    label: 'Item Bonus',
    render(c) {
      c.appendChild(makeParagraph('+0 and +1 items are most frequent. +3 items are very rare. Armor bonus adds to AC. Weapon bonus adds to attack and damage rolls.'));
    },
  },
  'item-tables': {
    label: 'Item Tables',
    render(c) {
      c.appendChild(makeSectionHeader('Qualities Table (2d6)'));
      c.appendChild(makeTable(
        ['2d6', 'Benefits', 'Curses'],
        [['2–3', '—', '1'], ['4–7', '1', '1'], ['8–11', '1', '—'], ['12', '2', '—']]
      ));
      c.appendChild(makeSectionHeader('Personality Table (2d6)'));
      c.appendChild(makeTable(
        ['2d6', 'Virtues', 'Flaws'],
        [['2–3', '—', '1'], ['4–9', '—', '—'], ['10–11', '1', '1'], ['12', '1', '—']]
      ));
      c.appendChild(makeSectionHeader('Item Type (d6)'));
      c.appendChild(makeTable(
        ['d6', 'Item'],
        [['1', 'Armor'], ['2', 'Potion'], ['3', 'Scroll'], ['4', 'Utility'], ['5', 'Wand'], ['6', 'Weapon']]
      ));
    },
  },
  'item-value': {
    label: 'Item Value',
    render(c) {
      c.appendChild(makeParagraph('Magic items are rarely bought or sold. When they are: weak items cost 1d6 × 100 gp; powerful items cost 2d6 × 100 gp (or are priceless).'));
    },
  },
};

export const magicItemsSection = {
  id: 'magic-items',
  label: 'Magic Items',
  items: makeItems(MAGIC_ITEMS),
  renderDetail(container, itemId) { MAGIC_ITEMS[itemId]?.render(container); },
};

// ── Treasure ───────────────────────────────────────────────────────────────

const TREASURE = {
  'boons': {
    label: 'Boons',
    render(c) {
      const list = makeReferenceList();
      list.appendChild(makeReferenceCard('Oaths',    null, 'A favor owed — a unicorn\'s promise, a baron\'s title, a dryad\'s safe harbor.'));
      list.appendChild(makeReferenceCard('Secrets',  null, 'The identity of a murderer, an incriminating letter, or the True Name of a demon.'));
      list.appendChild(makeReferenceCard('Blessings',null, 'A magical enchantment from a fountain or deity gift. Can be temporary or permanent.'));
      c.appendChild(list);
    },
  },
  'sample-blessings': {
    label: 'Sample Blessings',
    render(c) {
      c.appendChild(makeTable(
        ['d12', 'Blessing', 'Effect'],
        [
          ['1',  'Wraithsight',     'See invisible and hidden creatures'],
          ['2',  'Nine Lives',      'Next nine times at 0 HP, regain 1 HP'],
          ['3',  'Demonskin',       'Immune to fire damage'],
          ['4',  'Spiderwalk',      'Crawl on walls and sheer surfaces'],
          ['5',  'Merfolk\'s Kiss', 'Breathe water as air'],
          ['6',  'Gede\'s Blessing','Speak to and understand animals'],
          ['7',  'Arcane Eye',      'Three times per day: advantage to cast'],
          ['8',  'Shune\'s Mark',   'Kill a creature: heal 1d6 HP'],
          ['9',  'Ghostwalk',       'Once/day: incorporeal for 1d4 rounds'],
          ['10', 'Death\'s Sting',  'Immune to poison effects'],
          ['11', 'Rite of Rage',    'Once/day: deal double damage'],
          ['12', 'Divine Halo',     'Hostile spells targeting you are DC 15 to cast'],
        ]
      ));
    },
  },
  'sample-oaths': {
    label: 'Sample Oaths',
    render(c) {
      c.appendChild(makeTable(
        ['d8', 'Oath'],
        [
          ['1', 'The duke procures you an audience with the queen'],
          ['2', 'The City Watch pardons a crime you\'ve committed'],
          ['3', 'A dryad protects you while in her grove'],
          ['4', 'A Thieves\' Guild member gets you into the gem vault'],
          ['5', 'A unicorn heals a grave wound or affliction'],
          ['6', 'A dwarven forgemaster makes you a spectacular sword'],
          ['7', 'A baron grants you the title of knight or constable'],
          ['8', 'The Circle of Mages teleports you anywhere'],
        ]
      ));
    },
  },
  'sample-secrets': {
    label: 'Sample Secrets',
    render(c) {
      c.appendChild(makeTable(
        ['d12', 'Detail 1', 'Detail 2'],
        [
          ['1',  'The True Name of',       'The king'],
          ['2',  'The one manipulating',   'A powerful demon'],
          ['3',  'The killer of',          'A legendary swordmaster'],
          ['4',  'The impersonator of',    'The head of the church'],
          ['5',  'The horrifying plan of', 'A mighty sorcerer'],
          ['6',  'The secret location of', 'A rival adventuring party'],
          ['7',  'The beloved of',         'The Thieves\' Guild boss'],
          ['8',  'Proof of the crimes by', 'A revered knight of St. Terragnis'],
          ['9',  'The treasure hoard of',  'A famous dragon-slayer'],
          ['10', 'The weakness of',        'The settlement\'s leadership'],
          ['11', 'The secret identity of', 'A fearsome lich-queen'],
          ['12', 'The one blackmailing',   'A cherished NPC'],
        ]
      ));
    },
  },
  'xp-for-treasure': {
    label: 'XP for Treasure',
    render(c) {
      c.appendChild(makeTable(
        ['Quality', 'XP', 'Examples'],
        [
          ['Poor',      '0',  'Bag of silver, used dagger, knucklebone dice'],
          ['Normal',    '1',  'Bag of gold, gem, fine armor, magic scroll'],
          ['Fabulous',  '3',  'Magic sword, giant diamond, mithral chainmail'],
          ['Legendary', '10', 'The Staff of Ord, a djinni\'s wish, a dragon hoard'],
        ]
      ));
    },
  },
};

export const treasureSection = {
  id: 'treasure',
  label: 'Treasure',
  items: makeItems(TREASURE),
  renderDetail(container, itemId) { TREASURE[itemId]?.render(container); },
};

// ── NPCs & Reactions ───────────────────────────────────────────────────────

const NPCS_AND_REACTIONS = {
  'npc-epithet': {
    label: 'NPC Epithet',
    render(c) {
      c.appendChild(makeSectionHeader('NPC Epithet (d4, d4)'));
      c.appendChild(makeTable(
        ['d4,d4', '1', '2', '3', '4'],
        [
          ['1', 'The Gray',     'One-Eye',     'The Lesser',  'The Cunning'],
          ['2', 'Silvertongue', 'The Outcast', 'Fasthands',   'The Bold'],
          ['3', 'The Elder',    'The Charmer', 'The Exiled',  'The Wise'],
          ['4', 'Tree-Speaker', 'The Craven',  'The Red',     'Six-Finger'],
        ]
      ));
    },
  },
  'npc-qualities': {
    label: 'NPC Qualities',
    render(c) {
      c.appendChild(makeSectionHeader('NPC Qualities (d20)'));
      c.appendChild(makeTable(
        ['d20', 'Appearance', 'Does', 'Secret'],
        [
          ['1',  'Balding',       'Spits',           'Hiding a fugitive'],
          ['2',  'Stocky build',  'Always eating',   'Adores baby animals'],
          ['3',  'Very tall',     'Moves quickly',   'Obsessed with fire'],
          ['4',  'Beauty mark',   'Card tricks',     'In a religious cult'],
          ['5',  'One eye',       'Prays aloud',     'Is a half-demon'],
          ['6',  'Braided hair',  'Writes in diary', 'Was a wizard\'s apprentice'],
          ['7',  'Muscular',      'Apologetic',      'Needlessly picks pockets'],
          ['8',  'White hair',    'Slaps backs',     'Has a false identity'],
          ['9',  'Scar on face',  'Drops things',    'Afraid of storms'],
          ['10', 'Willowy build', 'Swears oaths',    'Has functional gills'],
          ['11', 'Sweaty',        'Makes puns',      'In deep gambling debt'],
          ['12', 'Cleft chin',    'Rare accent',     'Works as a smuggler'],
          ['13', 'Frail',         'Easily spooked',  'Is a werewolf'],
          ['14', 'Big eyebrows',  'Forgetful',       'Can actually smell lies'],
          ['15', 'Tattooed',      'Speaks quietly',  'Cast out of wealthy family'],
          ['16', 'Floppy hat',    'Twitches',        'In love with a bartender'],
          ['17', 'Gold tooth',    'Moves slowly',    'Left the Thieves\' Guild'],
          ['18', 'Six fingers',   'Speaks loudly',   'Best friends with a prince'],
          ['19', 'Very short',    'Swaggers',        'Retired crawler'],
          ['20', 'Large nose',    'Smokes pipe',     'Has a pet basilisk'],
        ]
      ));
    },
  },
  'occupation': {
    label: 'Occupation',
    render(c) {
      c.appendChild(makeSectionHeader('Occupation (d4, d4)'));
      c.appendChild(makeTable(
        ['d4,d4', '1', '2', '3', '4'],
        [
          ['1', 'Gravedigger',   'Carpenter', 'Scholar',  'Blacksmith'],
          ['2', 'Tax collector', 'Farmer',    'Bartender', 'Beggar'],
          ['3', 'Baker',         'Cook',      'Sailor',   'Butcher'],
          ['4', 'Locksmith',     'Cobbler',   'Friar/nun','Merchant'],
        ]
      ));
    },
  },
  'random-npc': {
    label: 'Random NPC',
    render(c) {
      c.appendChild(makeTable(
        ['Table', 'Die', 'Options'],
        [
          ['Ancestry',  'd12', '1–4 Human · 5–6 Elf · 7–8 Dwarf · 9–10 Halfling · 11 Half-orc · 12 Goblin'],
          ['Alignment', 'd6',  '1–3 Lawful · 4 Neutral · 5–6 Chaotic'],
          ['Age',       'd8',  '1 Child · 2 Adolescent · 3–4 Adult · 5–6 Middle-Aged · 7 Elderly · 8 Ancient'],
          ['Wealth',    'd6',  '1 Poor · 2–3 Standard · 4–5 Wealthy · 6 Extravagant'],
        ]
      ));
    },
  },
  'reaction-check': {
    label: 'Reaction Check',
    sublabel: '2d6 + CHA',
    render(c) {
      c.appendChild(makeTable(
        ['Roll', 'Attitude'],
        [
          ['0–6',  'Hostile'],
          ['7–8',  'Suspicious'],
          ['9',    'Neutral'],
          ['10–11','Curious'],
          ['12+',  'Friendly'],
        ]
      ));
    },
  },
  'rival-crawlers': {
    label: 'Rival Crawlers',
    render(c) {
      const list = makeReferenceList();
      list.appendChild(makeReferenceCard('Size',  '1d4 + 1 members', 'All rivals share the same alignment.'));
      list.appendChild(makeReferenceCard('Level', '1d6 per member',  'Roll 1d6 for each rival crawler\'s starting level.'));
      c.appendChild(list);
    },
  },
};

export const npcsAndReactionsSection = {
  id: 'npcs-and-reactions',
  label: 'NPCs & Reactions',
  items: makeItems(NPCS_AND_REACTIONS),
  renderDetail(container, itemId) { NPCS_AND_REACTIONS[itemId]?.render(container); },
};

// ── Adventure Generator ────────────────────────────────────────────────────

const ADVENTURE_GENERATOR = {
  'adventure-hooks': {
    label: 'Adventure Hooks',
    render(c) {
      c.appendChild(makeParagraph('Roll some or all details and modify connecting words as needed. E.g. "Tower of the Deepwood Swamp" could be "Deepwood Swamp Tower."'));
      c.appendChild(makeSectionHeader('Adventure Generator (d20)'));
      c.appendChild(makeTable(
        ['d20', 'Detail 1', 'Detail 2', 'Detail 3'],
        [
          ['1',  'Rescue the',  'Goblet',      'Of the evil wizard'],
          ['2',  'Find the',    'Prisoner',    'Stalking the wastes'],
          ['3',  'Destroy the', 'Sword',       'At the bottom of the river'],
          ['4',  'Infiltrate the','Vault',     'In the city sewers'],
          ['5',  'Bypass the',  'Cult',        'Under the barrow mounds'],
          ['6',  'Return the',  'Spirit',      'Of the fallen hero'],
          ['7',  'Defeat the',  'Killer',      'In the magical library'],
          ['8',  'Spy on the',  'Demon',       'In the king\'s court'],
          ['9',  'Bribe the',   'Noble',       'Of the ancient lineage'],
          ['10', 'Deliver the', 'Hunter',      'In the sorcerer\'s tower'],
          ['11', 'Escape the',  'Hostage',     'In the Murkwood'],
          ['12', 'Imprison the','Thief',       'Hiding in the slums'],
          ['13', 'Stop the',    'Spy',         'Of the Dwarven lord'],
          ['14', 'Befriend the','Werewolf',    'In the musty tomb'],
          ['15', 'Pacify the',  'Relic',       'Of the royal knights'],
          ['16', 'Persuade the','High priest', 'Sacrificing innocents'],
          ['17', 'Steal the',   'Merchant',    'In the catacombs'],
          ['18', 'Escort the',  'Witch',       'Blackmailing the baron'],
          ['19', 'Banish the',  'Ritual',      'In the Thieves\' Guild'],
          ['20', 'Free the',    'Vampire',     'Murdering townsfolk'],
        ]
      ));
    },
  },
  'site-names': {
    label: 'Site Names',
    render(c) {
      c.appendChild(makeSectionHeader('Site Name Generator (d20)'));
      c.appendChild(makeTable(
        ['d20', 'Name 1', 'Name 2', 'Name 3'],
        [
          ['1',  'Mines of the',      'Cursed',     'Flame'],
          ['2',  'Abbey of the',      'Whispering', 'Ghost'],
          ['3',  'Tower of the',      'Bleeding',   'Darkness'],
          ['4',  'Caves of the',      'Shrouded',   'Peak'],
          ['5',  'Barrow of the',     'Lost',       'Borderlands'],
          ['6',  'Warrens of the',    'Dead',       'King'],
          ['7',  'Crypt of the',      'Deepwood',   'Twilight'],
          ['8',  'Monastery of the',  'Fallen',     'Depths'],
          ['9',  'Ruin of the',       'Revenant',   'Jewel'],
          ['10', 'Tunnels of the',    'Frozen',     'God'],
          ['11', 'Citadel of the',    'Shimmering', 'Lands'],
          ['12', 'Tomb of the',       'Chaos',      'Storm'],
          ['13', 'Castle of the',     'Abandoned',  'Swamp'],
          ['14', 'Temple of the',     'Blighted',   'Ravine'],
          ['15', 'Fortress of the',   'Forgotten',  'Valley'],
          ['16', 'Isle of the',       'Slumbering', 'Horde'],
          ['17', 'Keep of the',       'Savage',     'Skull'],
          ['18', 'Dungeon of the',    'Unholy',     'Queen'],
          ['19', 'Necropolis of the', 'Enchanted',  'Wastes'],
          ['20', 'Shrine of the',     'Immortal',   'Hero'],
        ]
      ));
    },
  },
};

export const adventureGeneratorSection = {
  id: 'adventure-generator',
  label: 'Adventure Generator',
  items: makeItems(ADVENTURE_GENERATOR),
  renderDetail(container, itemId) { ADVENTURE_GENERATOR[itemId]?.render(container); },
};

// ── Overland Travel ────────────────────────────────────────────────────────

const OVERLAND_TRAVEL = {
  'downtime': {
    label: 'Downtime',
    render(c) {
      c.appendChild(makeTable(
        ['Activity', 'Cost / Check', 'Benefit'],
        [
          ['Carousing', '30 gp', 'XP and a new NPC contact (friend or foe)'],
          ['Learning',  'DC 18 INT', 'Learn a new skill; difficulty decreases each failed attempt'],
        ]
      ));
    },
  },
  'food-and-water': {
    label: 'Food and Water',
    render(c) {
      c.appendChild(makeParagraph('PCs can go 3 days without a ration. After that: 1 CON damage per day (death at 0). Forage for 1 ration per day with an INT check.'));
    },
  },
  'hex-tables': {
    label: 'Hex Tables',
    render(c) {
      c.appendChild(makeTable(
        ['d6', 'Hex Danger Level'],
        [['1', 'Safe'], ['2–3', 'Unsafe'], ['4–5', 'Risky'], ['6', 'Deadly']]
      ));
      c.appendChild(makeTable(
        ['2d6', 'Hex Terrain'],
        [
          ['2',    'Desert/Arctic'],
          ['3',    'Swamp'],
          ['4–6',  'Grassland'],
          ['7–8',  'Forest/Jungle'],
          ['9–10', 'River/Coast'],
          ['11',   'Ocean'],
          ['12',   'Mountain'],
        ]
      ));
      c.appendChild(makeTable(
        ['2d6', 'New Hex'],
        [
          ['2–3',  'Current terrain +1 step'],
          ['4–8',  'Same as current terrain'],
          ['9–11', 'Current terrain +2 steps'],
          ['12',   'Roll a new hex terrain'],
        ]
      ));
      c.appendChild(makeSectionHeader('Cataclysm (d8)'));
      c.appendChild(makeTable(
        ['d8', 'Type'],
        [
          ['1', 'Volcano'], ['2', 'Fire'],     ['3', 'Earthquake'], ['4', 'Storm'],
          ['5', 'Flood'],   ['6', 'War'],      ['7', 'Pestilence'], ['8', 'Magical disaster'],
        ]
      ));
    },
  },
  'navigation': {
    label: 'Navigation',
    render(c) {
      c.appendChild(makeParagraph('Navigator makes an INT check when exiting an unfamiliar hex. On failure, the group moves into a random adjacent hex.'));
    },
  },
  'points-of-interest': {
    label: 'Points of Interest',
    render(c) {
      c.appendChild(makeTable(
        ['d20', 'Location', 'Development'],
        [
          ['1',     'Small tower',       'Disaster! Roll on Cataclysm table'],
          ['2',     'Fortified keep',    'Over/connected to a large tomb'],
          ['3–4',   'Natural landmark',  'Being attacked by an invader'],
          ['5',     'Temple',            'Home to an oracle'],
          ['6',     'Barrow mounds',     'Around/over a sleeping dragon'],
          ['7–8',   'Village',           'Abandoned and in ruins'],
          ['9–10',  'Town',              'Guarded by its current residents'],
          ['11',    'City/metropolis',   'Under siege by a warband'],
          ['12',    'Ravine',            'Home to a religious cult'],
          ['13–14', 'Monster nest',      'Where a secret circle of wizards meets'],
          ['15',    'Hermit\'s abode',   'Occupied by a self-titled king/queen'],
          ['16–17', 'Cave formation',    'Controlled by a malevolent sorcerer'],
          ['18',    'Ancient dolmens',   'Protected by an age-old guardian'],
          ['19',    'Barbarian camp',    'Hiding a great treasure'],
          ['20',    'Holy shrine',       'With a door to another plane'],
        ]
      ));
    },
  },
  'settlement-names': {
    label: 'Settlement Names',
    render(c) {
      c.appendChild(makeTable(
        ['d8', 'Village', 'Town', 'City/Metropolis'],
        [
          ['1', 'Bruga\'s Hold',  'Fairhollow',       'Doraine'],
          ['2', 'Lastwatch',      'Ivan\'s Keep',      'Meridia'],
          ['3', 'Darkwater',      'Galina',            'King\'s Gate'],
          ['4', 'Ostlin',         'Brightlantern',     'Myrkhos'],
          ['5', 'Treefall',       'Corvin\'s Crest',   'Rularn'],
          ['6', 'Vorn',           'Ironbridge',        'Ordos'],
          ['7', 'Hillshire',      'Skalvin',           'Thane'],
          ['8', 'Nighthaven',     'Toresk',            'Rahgbat'],
        ]
      ));
    },
  },
  'travel-speeds': {
    label: 'Travel Speeds',
    render(c) {
      c.appendChild(makeParagraph('PCs can travel up to 8 hours per day. Hexes are 6 miles across. Push further with CON checks.'));
      c.appendChild(makeTable(
        ['Method', 'Time per Hex'],
        [
          ['Walking',           '4 hours'],
          ['Mounted',           '2 hours'],
          ['Sailing',           '1 hour'],
          ['Difficult terrain', '2× normal'],
          ['Arduous terrain',   '8 hours'],
        ]
      ));
    },
  },
};

export const overlandTravelSection = {
  id: 'overland-travel',
  label: 'Overland Travel',
  items: makeItems(OVERLAND_TRAVEL),
  renderDetail(container, itemId) { OVERLAND_TRAVEL[itemId]?.render(container); },
};

// ── Encounter Tables ───────────────────────────────────────────────────────

// Items are the terrain names, sorted alphabetically (TERRAIN_NAMES is already sorted)
const ENCOUNTER_TABLE_ITEMS = [...TERRAIN_NAMES]
  .sort((a, b) => a.localeCompare(b))
  .map((name) => ({ id: name, label: name }));

export const encounterTablesSection = {
  id: 'encounter-tables',
  label: 'Encounter Tables',
  items: ENCOUNTER_TABLE_ITEMS,
  renderDetail(container, itemId) {
    const table = ENCOUNTER_TABLES[itemId];
    if (!table) return;
    container.appendChild(makeSectionHeader(itemId));
    container.appendChild(makeTable(['d100', 'Encounter'], table));
  },
};

// ── Random Events ──────────────────────────────────────────────────────────

const RANDOM_EVENTS_DATA = [
  ['01',    'The ground shakes violently and a massive fissure opens'],
  ['02–03', 'An unseen foe leaps out of hiding at close range'],
  ['04–05', 'A horrible buzzing fills the air, growing louder and louder'],
  ['06–07', 'You catch the acrid smell of smoke and flame'],
  ['08–09', 'A bright star appears in the sky, visible even at midday'],
  ['10–11', 'You spot a half-open bag with gold coins glinting inside'],
  ['12–13', 'A man slips a note and an odd potion into your hand'],
  ['14–15', 'Someone observing you from afar steps out of sight'],
  ['16–17', 'A dwarf in a red hat hands you a rose, bows, and leaves'],
  ['18–19', 'A cowled stranger in a black cloak approaches you'],
  ['20–21', 'Someone tries to pick your pocket'],
  ['22–23', 'A strange ticking sound comes from inside your bag'],
  ['24–25', 'A frothing, frantic horse with a saddle but no rider appears'],
  ['26–27', 'A mound in the earth quickly burrows toward you'],
  ['28–29', 'You sense you are being magically scryed upon'],
  ['30–31', 'Someone tries to plant an object on your person'],
  ['32–33', 'You are filled with a strong sense of dread and danger'],
  ['34–35', 'A woman hands you a black cat and then runs away'],
  ['36–37', 'A small, woodland creature jumps out of a backpack'],
  ['38–39', 'You smell lilacs and hear faint, ghostly laughter'],
  ['40–41', 'A note wrapped around a thin dagger lands next to you'],
  ['42–43', 'A green-glowing meteor streaks through the sky'],
  ['44–45', 'Someone nearby is staring at you and mouthing words'],
  ['46–47', 'A pair of yellow eyes watches you from the darkness'],
  ['48–49', 'An orc with an arrow in her back crashes through a door'],
  ['50–53', 'You hear a beast cry out in pain just up ahead'],
  ['54–55', 'A huge swarm of bats crashes over you and swirls away'],
  ['56–57', 'A frail beggar whispers that he has a secret to tell you'],
  ['58–59', 'An object falls from above and barely misses your head'],
  ['60–61', 'A seagull lands on your head and coughs up an odd bottle'],
  ['62–63', 'The smell of ozone rises and electricity crackles in the air'],
  ['64–65', 'You spot a trail of tiny silver coins leading around a bend'],
  ['66–67', 'A wild-eyed man approaches with a holy book held high'],
  ['68–69', 'Every light source suddenly extinguishes'],
  ['70–71', 'A stampede of wild animals bursts into view'],
  ['72–73', 'An old woman points at you and yells, "There they are!"'],
  ['74–75', 'A passing stranger presses an ancient coin into your hand'],
  ['76–77', 'A chorus of howls echo in the distance'],
  ['78–79', 'Two pinching and slapping goblins tumble into sight'],
  ['80–81', 'You realize you are not alone; something is behind you'],
  ['82–83', 'The sudden sound of rushing water crashes toward you'],
  ['84–85', 'You hear an ear-splitting scream that nobody else hears'],
  ['86–87', 'A man slaps you with a glove and throws it at your feet'],
  ['88–89', 'A violent, windy storm kicks up without warning'],
  ['90–91', 'Lightning strikes close and leaves a glowing object behind'],
  ['92–93', 'A multicolored orb drifts up to you and then zips away'],
  ['94–95', 'A runaway wagon crashes toward you'],
  ['96–97', 'An NPC throws off their disguise, revealing an enemy'],
  ['98–99', 'A demon appears to you and presents a tempting offer'],
  ['00',    'A radiant being appears to you with a message of warning'],
];

const RANDOM_EVENTS_BY_ID = Object.fromEntries(
  RANDOM_EVENTS_DATA.map(([roll, text]) => [
    `re-${roll.replace(/[–\s]/g, '-')}`,
    { label: text, sublabel: `d100: ${roll}`, roll, text },
  ])
);

export const randomEventsSection = {
  id: 'random-events',
  label: 'Random Events',
  items: Object.entries(RANDOM_EVENTS_BY_ID)
    .map(([id, { label, sublabel }]) => ({ id, label, sublabel }))
    .sort((a, b) => a.label.localeCompare(b.label)),
  renderDetail(container, itemId) {
    const entry = RANDOM_EVENTS_BY_ID[itemId];
    if (!entry) return;
    const list = makeReferenceList();
    list.appendChild(makeReferenceCard(entry.text, `d100: ${entry.roll}`, ''));
    container.appendChild(list);
  },
};

// ── Rumors ─────────────────────────────────────────────────────────────────

const RUMORS_DATA = [
  ['01',    'An armored beast the size of a ship is rampaging nearby'],
  ['02–03', 'A team of assassins is on its way to kill your group'],
  ['04–05', 'The local ruler has placed a 2,000 gp bounty on your heads'],
  ['06–07', 'The cult of Shune is planning a fiery coup at midnight'],
  ['08–09', 'An ancient, stone door has been found in the castle cellar'],
  ['10–11', 'Lizardfolk have been raiding caravans near the swamp'],
  ['12–13', 'Armored skeletons are roaming the misty graveyard'],
  ['14–15', 'An earthquake uncovered a ruin inside a deep rift'],
  ['16–17', 'A warband of orcs has taken over an abandoned keep'],
  ['18–19', 'There is a hall of golden statues underneath the well'],
  ['20–21', 'Those who survive the Trial of the Lotus gain a strange gift'],
  ['22–23', 'A Captain of the Guard has been taken hostage by thugs'],
  ['24–25', 'The Crystal Caves are home to a cult of psychic sorcerers'],
  ['26–27', 'A crocodile dragged a richly-laden mule into the sewers'],
  ['28–29', 'A fortune-telling witch speaks true omens and portents'],
  ['30–31', 'Every full moon, the Prancing Unicorn\'s larder is robbed'],
  ['32–33', 'A famous group of crawlers hasn\'t returned from a delve'],
  ['34–35', 'A glowing meteor crashed deep inside the marshlands'],
  ['36–37', 'Fire will not light or burn within sight of the Lion Fountain'],
  ['38–39', 'The lost Jewel of Barbalt is hidden in the Howling Caves'],
  ['40–41', 'A dwarven mining team has uncovered a tentacled statue'],
  ['42–43', 'The Red Owl tavern has a trapdoor to the Shadowdark'],
  ['44–45', '2d12 viperians guard a shrine to a medusa in the jungle'],
  ['46–47', 'Three thieves just pulled off a gemstone heist nearby'],
  ['48–49', 'Harpies keep watch from the cliffs around Diridia\'s Tomb'],
  ['50–53', 'A gorgon stalks the ruins of the Underhill Halls'],
  ['54–55', 'Beneath the Red Abbey is the forgotten Barrow of Ur-Din'],
  ['56–57', 'A dying sage is calling for a mighty group of heroes'],
  ['58–59', 'A wizard accidentally let his trio of cockatrices escape'],
  ['60–61', 'A local lord has somehow been stranded atop a high roof'],
  ['62–63', 'Bartomeu the Pirate Prince will be hanged at noon'],
  ['64–65', 'Goblin spelunkers found an underground cathedral'],
  ['66–67', 'The Kytherian Mechanism sank into the sea near Myrkhos'],
  ['68–69', 'Rare and valuable mushrooms grow inside an old crypt'],
  ['70–71', 'The Church of St. Terragnis will pay for the return of a relic'],
  ['72–73', 'A volcanic eruption revealed tunnels in the caldera\'s walls'],
  ['74–75', 'The cyclopean ruins of Tal-Yool lie deep within the forest'],
  ['76–77', 'A famous gambler will bet a ruby on a Wizard Thief game'],
  ['78–79', 'The Moon Druids will bless a sword used to slay a werewolf'],
  ['80–81', 'Gravediggers found a chained coffin in an unmarked plot'],
  ['82–83', 'An abandoned wizard\'s tower is full of clockwork creatures'],
  ['84–85', 'The Thieves\' Guild is about to attack a rival merchant lord'],
  ['86–87', 'Windstorms uncovered a stone monolith in the desert'],
  ['88–89', 'A rival group of crawlers found the map to Jiraal\'s Hoard'],
  ['90–91', 'A monstrosity called The Carver lurks below the university'],
  ['92–93', 'The Onyx Destrier is in Ekmara\'s Keep in the wasteland'],
  ['94–95', 'The princess has been kidnapped by a group of sorcerers'],
  ['96–97', 'A Chaos Knight\'s tomb has been found beneath a temple'],
  ['98–99', 'The fabled Library of Gehemna appeared outside the city'],
  ['00',    'The dragon Ixamir has awoken from her 200-year slumber'],
];

const RUMORS_BY_ID = Object.fromEntries(
  RUMORS_DATA.map(([roll, text]) => [
    `rumor-${roll.replace(/[–\s]/g, '-')}`,
    { label: text, sublabel: `d100: ${roll}`, roll, text },
  ])
);

export const rumorsSection = {
  id: 'rumors',
  label: 'Rumors',
  items: Object.entries(RUMORS_BY_ID)
    .map(([id, { label, sublabel }]) => ({ id, label, sublabel }))
    .sort((a, b) => a.label.localeCompare(b.label)),
  renderDetail(container, itemId) {
    const entry = RUMORS_BY_ID[itemId];
    if (!entry) return;
    const list = makeReferenceList();
    list.appendChild(makeReferenceCard(entry.text, `d100: ${entry.roll}`, ''));
    container.appendChild(list);
  },
};

// ── Settlements ────────────────────────────────────────────────────────────

const SETTLEMENTS = {
  'districts-and-pois': {
    label: 'Districts & POIs',
    render(c) {
      c.appendChild(makeSectionHeader('Districts (d8)'));
      c.appendChild(makeTable(
        ['d8', 'Type'],
        [
          ['1', 'Slums'],           ['2', 'Low district'],
          ['3', 'Artisan district'],['4', 'Market'],
          ['5', 'High District'],   ['6', 'Temple district'],
          ['7', 'University district'], ['8', 'Castle district'],
        ]
      ));
      c.appendChild(makeSectionHeader('District Points of Interest (d6)'));
      const poiData = [
        ['Slums',             ['Seedy flophouse', 'Poor tavern (2–3)', 'Criminal safehouse', 'Poor shop', 'Witch/warlock\'s hovel']],
        ['Low District',      ['Graveyard', 'Poor tavern (2–3)', 'Poor shop', 'Standard shop', 'Warehouses/sheds']],
        ['Artisan District',  ['Stocks and pillories', 'Modest temple (2–3)', 'Standard tavern (4–5)', 'Wealthy shop']],
        ['High District',     ['Guildhouse', 'Wealthy tavern (2–3)', 'Manor house', 'Wealthy shop', 'City Watch outpost']],
        ['Market',            ['Fortune teller', 'Rare and exotic goods (2–4)', 'Apothecary', 'Illicit black market']],
        ['Temple District',   ['Ruined temple', 'Minor deity\'s chapel (2–3)', 'Forbidden shrine', 'Major god\'s temple', 'Revered holy site']],
        ['University District',['Library', 'Lecture hall (2–3)', 'Standard tavern (4–5)', 'Wizard\'s tower']],
        ['Castle District',   ['Royal bathhouse', 'City Watch\'s garrison (2–3)', 'Theater or coliseum (4–5)', 'Royal castle']],
      ];
      poiData.forEach(([district, pois]) => {
        const header = document.createElement('h3');
        header.className = 'reference-subsection-header';
        header.textContent = district;
        c.appendChild(header);
        const list = makeReferenceList();
        pois.forEach((poi) => list.appendChild(makeReferenceCard(poi, null, '')));
        c.appendChild(list);
      });
    },
  },
  'food-and-drinks': {
    label: 'Food & Drinks',
    render(c) {
      c.appendChild(makeSectionHeader('Food (d12)'));
      c.appendChild(makeTable(
        ['d12', 'Poor (1d4 cp)', 'Standard (1d6 sp)', 'Wealthy (1d8 gp)'],
        [
          ['1',  'Boiled cabbage',  'Alligator steak',   'Fried basilisk eyes'],
          ['2',  'Dates and olives','Rosemary ham',      'Giant snake filet'],
          ['3',  'Goat stew',       'Raw flailfish',     'Griffon eggs'],
          ['4',  'Pickled eggs',    'Seared venison',    'Candied scarabs'],
          ['5',  'Cheese and bread','Buttered ostrich',  'Baked troll bones'],
          ['6',  'Hearty broth',    'Spicy veal curry',  'Cockatrice wings'],
          ['7',  'Meat pastry',     'Salted frog legs',  'Crispy silkworms'],
          ['8',  'Mushroom kebab',  'Herbed snails',     'Roasted stingbat'],
          ['9',  'Roasted pigeon',  'Grilled tiger eel', 'Dire lobster tail'],
          ['10', 'Garlic flatbread','Spit-roasted boar', 'Wyvern tongue'],
          ['11', 'Turkey leg',      'Saffron duck neck', 'Shrieking seaweed'],
          ['12', 'Rat-on-a-stick',  'Crimson pudding',   'Dragon shanks'],
        ]
      ));
      c.appendChild(makeSectionHeader('Drinks'));
      c.appendChild(makeTable(
        ['d*', 'Drink', 'Cost', 'Effect'],
        [
          ['1',  'Barnacle grog',        '1 cp',  'DC 9 CON or blind 1 hour'],
          ['2',  'Watered-down swill',   '3 cp',  'Toxic, −1 CON for 1 hour'],
          ['3',  'Vinegary wine',        '5 cp',  'Stains teeth purple, −1 CHA 1 hour'],
          ['4',  'Stale ale',            '5 cp',  'Dulls senses, −1 WIS 1 hour'],
          ['5',  'Clear spirits',        '1 sp',  'Burns; ends 1 bad effect from another drink'],
          ['6',  'House ale',            '2 sp',  'Crisp and clean; first mug is free'],
          ['7',  'Autumn mead',          '3 sp',  'Floral; doubles effect of next drink'],
          ['8',  'Halfling summer wine', '5 sp',  'Sparkling, +1 CHA 1 hour'],
          ['9',  'Elvish brandy',        '5 sp',  'Spiced, +1 INT 1 hour'],
          ['10', 'Dwarvish gold ale',    '5 sp',  'Icy cold; regain 1d4 HP per mug'],
          ['11', 'Aged royal wine',      '2 gp',  'Smooth and rich, +1 WIS 1 hour'],
          ['12', 'Van Dinkle whiskey',   '20 gp', 'Only 5 bottles made, +1 XP'],
        ]
      ));
      c.appendChild(makeParagraph('Roll d6 for Poor taverns, 2d6 for Standard, d12 for Wealthy.'));
    },
  },
  'settlement-types': {
    label: 'Settlement Types',
    render(c) {
      c.appendChild(makeTable(
        ['d6', 'Type', 'Dice'],
        [['1', 'Village', '3d4'], ['2–3', 'Town', '4d4'], ['4–5', 'City', '6d6'], ['6', 'Metropolis', '8d8']]
      ));
    },
  },
  'shop-generator': {
    label: 'Shop Generator',
    render(c) {
      c.appendChild(makeTable(
        ['d20', 'Name', 'Known For'],
        [
          ['1',  'Fink & Sons',          'Ancient, beloved owner'],
          ['2',  'Imperial Toad',        'Buying anything of value'],
          ['3',  'The Stout Hammer',     'Charging non-regulars extra'],
          ['4',  'Rose\'s Commodities',  'Being a Thieves\' Guild front'],
          ['5',  'The King\'s Daughters','Resident cat, Crumpet'],
          ['6',  'Fox & Sundries',       'Password required to enter'],
          ['7',  'Noble Castle',         'Free ale with a purchase'],
          ['8',  'Sylvia\'s Finery',     'Heavily armed bodyguards'],
          ['9',  'Sunrise Oddments',     'Paying top coin for curios'],
          ['10', 'The Corner Beetle',    'Secret room behind shelf'],
          ['11', 'Grigor\'s Storehouse', 'Fencing illicit goods'],
          ['12', 'Royal Keep',           'Ringing a gong at every sale'],
          ['13', 'Crown & Coins',        'Goods from distant lands'],
          ['14', 'Ralina\'s Hearth',     'Shoddy and cheap items'],
          ['15', 'The Village Wheel',    'Accusing customers of theft'],
          ['16', 'Golden Wares',         'All goods are dyed blue'],
          ['17', 'Boot & Market',        'Owner\'s talking parrot'],
          ['18', 'Marvolo\'s Lantern',   'Famous bronze imp statue'],
          ['19', 'The Merry Vendibles',  'Being haunted'],
          ['20', 'The Jade Stocks',      'Aggressive rodent problem'],
        ]
      ));
    },
  },
  'tavern-generator': {
    label: 'Tavern Generator',
    render(c) {
      c.appendChild(makeTable(
        ['d20', 'Name', 'Known For'],
        [
          ['1',  'The Crimson Rat',      'High-stakes gambling'],
          ['2',  'The Dancing Wench',    'Illicit poison sales'],
          ['3',  'The Dog & Lantern',    'Wizard patrons'],
          ['4',  'The Rusty Eel',        'Cult rituals in the basement'],
          ['5',  'The Demon\'s Goblet',  'Rare food and drinks'],
          ['6',  'The Singing Trident',  'Dancing contests'],
          ['7',  'The Boar & Candle',    'Violent brawls'],
          ['8',  'The Silver Dagger',    'Ancient tunnels in the cellar'],
          ['9',  'The Filthy Wheel',     'Thugs for hire'],
          ['10', 'The Captain\'s Pig',   'Thieves\' Guild spies'],
          ['11', 'The Jolly Snake',      'Hostility toward spellcasters'],
          ['12', 'The Wise Camel',       'City Watch patrons'],
          ['13', 'Cloak & Dragon',       'Underground pit fighting'],
          ['14', 'The Royal Axe',        'Famous bard performances'],
          ['15', 'The Gilded Bell',      'Treasonous meetings'],
          ['16', 'The Blade & Tankard',  'Ban on all weapons'],
          ['17', 'The Drunken Shield',   'Hostility toward non-regulars'],
          ['18', 'Cup & Blade',          'Exotic taxidermy collection'],
          ['19', 'The Jeweled Anvil',    'Pirate and smuggler patrons'],
          ['20', 'The Frog & Bard',      'Drinking contests'],
        ]
      ));
    },
  },
};

export const settlementsSection = {
  id: 'settlements',
  label: 'Settlements',
  items: makeItems(SETTLEMENTS),
  renderDetail(container, itemId) { SETTLEMENTS[itemId]?.render(container); },
};
