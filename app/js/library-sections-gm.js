/**
 * Section descriptors for the 11 GM Tools sections of the Library tab.
 */

import { makeReferenceCard, makeSectionHeader, makeTable, makeReferenceList, makeParagraph } from './library-helpers.js';

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
  'navigation': {
    label: 'Navigation',
    render(c) {
      c.appendChild(makeParagraph('Navigator makes an INT check when exiting an unfamiliar hex. On failure, the group moves into a random adjacent hex.'));
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
