/**
 * Render functions for player-facing rules sections of the Library tab.
 */

import { makeReferenceCard, makeSectionHeader, makeTable, makeReferenceList, makeParagraph } from './library-helpers.js';

// ── Core Mechanic ──────────────────────────────────────────────────────────

export function renderCoreMechanicSection(container) {
  container.appendChild(makeSectionHeader('Difficulty Classes'));
  container.appendChild(makeTable(
    ['DC', 'Difficulty', 'Example'],
    [
      ['9',  'Easy',    'Leaping a narrow chasm, sneaking up on an inattentive guard'],
      ['12', 'Normal',  'Kicking open a stuck door, picking a poor lock'],
      ['15', 'Hard',    'Swimming against a strong current, giving first aid to stop dying'],
      ['18', 'Extreme', 'Climbing a slippery cliff one-handed, restraining a frenzied lion'],
    ]
  ));

  container.appendChild(makeSectionHeader('Distances'));
  container.appendChild(makeTable(
    ['Distance', 'Approximate'],
    [
      ['Close', '5 feet'],
      ['Near',  'Up to 30 feet'],
      ['Far',   'Within sight during an encounter or scene'],
    ]
  ));

  container.appendChild(makeSectionHeader('Advantage & Disadvantage'));
  const list = makeReferenceList();
  list.appendChild(makeReferenceCard('Advantage',    null, 'Roll the die twice and use the better result.'));
  list.appendChild(makeReferenceCard('Disadvantage', null, 'Roll the die twice and use the worse result.'));
  list.appendChild(makeReferenceCard('Both',         null, 'Advantage and disadvantage cancel each other out.'));
  container.appendChild(list);

  container.appendChild(makeSectionHeader('Natural Rolls'));
  const natList = makeReferenceList();
  natList.appendChild(makeReferenceCard('Natural 20', null, 'What you\'re doing succeeds to your maximum capacity. Attack rolls auto-hit and are a critical hit.'));
  natList.appendChild(makeReferenceCard('Natural 1',  null, 'What you\'re doing fails to your maximum capacity. Attack rolls automatically miss.'));
  container.appendChild(natList);

  container.appendChild(makeSectionHeader('The d6 Decider'));
  container.appendChild(makeParagraph('For random-chance outcomes the GM rolls 1d6. A 1–3 results in the worse outcome for the players; 4–6 results in the better one.'));

  container.appendChild(makeSectionHeader('Real Time'));
  container.appendChild(makeParagraph('Time passes in the game world at the same pace as in the real world. One minute or hour of game time equals one minute or hour in real time. If you can\'t track real time, assume one hour equals 10 rounds.'));
}

// ── Combat ─────────────────────────────────────────────────────────────────

export function renderCombatSection(container) {
  const list = makeReferenceList();

  list.appendChild(makeReferenceCard('Initiative',    'Dexterity check',
    'After surprise turns, everyone makes a Dexterity check. The highest result goes first; turns go clockwise.'));
  list.appendChild(makeReferenceCard('Your Turn',     'Action + movement',
    'Move near and take one action per turn. You can split your movement. Move near again if you skip your action.'));
  list.appendChild(makeReferenceCard('Melee Attack',  '1d20 + STR',
    'Roll 1d20 + Strength modifier + talent bonuses. Hit if total ≥ target AC.'));
  list.appendChild(makeReferenceCard('Ranged Attack', '1d20 + DEX',
    'Roll 1d20 + Dexterity modifier + talent bonuses. Hit if total ≥ target AC.'));
  list.appendChild(makeReferenceCard('Cast a Spell',  'Takes your action',
    'See Spellcasting for details.'));
  list.appendChild(makeReferenceCard('Critical Hit',  'Natural 20 on attack',
    'Weapon: double the weapon\'s damage dice. Spell: double one of its numerical effects.'));
  list.appendChild(makeReferenceCard('Knockout',      'Optional',
    'When you reduce a creature to 0 HP, you may choose to knock it unconscious instead of killing it.'));
  list.appendChild(makeReferenceCard('Cover',         'Disadvantage to attacker',
    'Attacking a creature that is hiding at least half its body behind terrain has disadvantage. Can\'t target what you can\'t see.'));
  list.appendChild(makeReferenceCard('Morale',        'DC 15 Wisdom check',
    'Enemies at half HP (solo) or half their number (group) must pass DC 15 WIS or flee.'));

  container.appendChild(list);

  container.appendChild(makeSectionHeader('Movement'));
  const movList = makeReferenceList();
  movList.appendChild(makeReferenceCard('Climbing', null, 'STR or DEX check to climb half speed. Fall if you fail by 5+ points.'));
  movList.appendChild(makeReferenceCard('Falling',  null, '1d6 damage per 10 feet fallen.'));
  movList.appendChild(makeReferenceCard('Swimming', null, 'Half speed. CON check each round to hold breath; 1d6 damage/round after failure.'));
  movList.appendChild(makeReferenceCard('Terrain',  null, 'Difficult terrain (ice, mud) halves normal movement distance.'));
  container.appendChild(movList);
}

// ── Advancement ────────────────────────────────────────────────────────────

export function renderAdvancementSection(container) {
  container.appendChild(makeParagraph('To gain a level, earn your current level × 10 XP. Your total XP resets to zero when you level up.'));

  container.appendChild(makeSectionHeader('Level Advancement Table'));
  container.appendChild(makeTable(
    ['Level', 'Talent Roll', 'XP to Level Up'],
    [
      ['1',  '+1', '10 XP'],
      ['2',  '—',  '20 XP'],
      ['3',  '+1', '30 XP'],
      ['4',  '—',  '40 XP'],
      ['5',  '+1', '50 XP'],
      ['6',  '—',  '60 XP'],
      ['7',  '+1', '70 XP'],
      ['8',  '—',  '80 XP'],
      ['9',  '+1', '90 XP'],
      ['10', '—',  '100 XP'],
    ]
  ));

  container.appendChild(makeSectionHeader('On Leveling Up'));
  const list = makeReferenceList();
  list.appendChild(makeReferenceCard('Talent Roll', 'Odd levels',    'Roll on your class\'s talent table. Duplicate talents stack unless noted.'));
  list.appendChild(makeReferenceCard('Hit Points',  'Every level',   'Roll your class\'s hit die and add it to your maximum HP.'));
  list.appendChild(makeReferenceCard('Spells',      'Casters only',  'Choose new spells per the Wizard or Priest Spells Known table for your class.'));
  list.appendChild(makeReferenceCard('0 → 1st',     'First adventure','After surviving their first adventure, 0-level characters choose a class, make one talent roll, and set HP to their class die + CON mod (min 1).'));
  container.appendChild(list);
}

// ── Spellcasting ───────────────────────────────────────────────────────────

export function renderSpellcastingSection(container) {
  const list = makeReferenceList();
  list.appendChild(makeReferenceCard('Wizard Casting', '1d20 + INT', 'DC = 10 + spell tier. Success: spell takes effect. Failure: no effect; can\'t cast again until rest.'));
  list.appendChild(makeReferenceCard('Priest Casting', '1d20 + WIS', 'DC = 10 + spell tier. Success: spell takes effect. Failure: no effect; can\'t cast again until rest.'));
  list.appendChild(makeReferenceCard('Critical Success', 'Natural 20', 'Double one of the spell\'s numerical effects.'));
  list.appendChild(makeReferenceCard('Critical Failure (Wizard)', 'Natural 1', 'Spell fails; can\'t cast again until rest. Roll on the Wizard Mishap table for the spell\'s tier.'));
  list.appendChild(makeReferenceCard('Critical Failure (Priest)', 'Natural 1', 'Spell fails; deity is displeased and revokes power. Require penance + successful rest to regain the spell.'));
  list.appendChild(makeReferenceCard('Focus Spells', 'Ongoing concentration', 'Maintain with a spellcasting check at the start of each turn. Crit fail ends the spell and triggers mishap.'));
  list.appendChild(makeReferenceCard('Scrolls & Wands', 'DC 10 + tier', 'Spellcasters can use items on their spell list. Scroll disappears after use. Wand stops working on failure; breaks on crit fail.'));
  container.appendChild(list);

  container.appendChild(makeSectionHeader('Wizard Mishap Tables'));
  container.appendChild(makeSectionHeader('Tier 1–2 (d12)'));
  container.appendChild(makeTable(
    ['d12', 'Effect'],
    [
      ['1',  'Devastation! Roll twice and combine both effects (reroll further 1s)'],
      ['2',  'Explosion! You take 1d8 damage'],
      ['3',  'Refraction! You target yourself with the spell'],
      ['4',  'Your hand slipped! You target a random ally with the spell'],
      ['5',  'Mind wound! You can\'t cast this spell again for a week'],
      ['6',  'Discorporation! One random piece of your gear disappears forever'],
      ['7',  'Spell worm! Lose ability to cast a random spell each turn until DC 12 CON check'],
      ['8',  'Harmonic failure! Lose ability to cast a random spell until rest'],
      ['9',  'Poof! Suppress all light within near distance for 10 rounds'],
      ['10', 'The horror! Scream uncontrollably in Primordial for 3 rounds'],
      ['11', 'Energy surge! Glow bright purple for 10 rounds; enemies have advantage against you'],
      ['12', 'Unstable conduit! Disadvantage on spells of the same tier for 10 rounds'],
    ]
  ));

  container.appendChild(makeSectionHeader('Tier 3–4 (d12)'));
  container.appendChild(makeTable(
    ['d12', 'Effect'],
    [
      ['1',  'Devastation! Roll twice and combine both effects (reroll further 1s)'],
      ['2',  'Blast radius! You and all near creatures take 2d6 damage'],
      ['3',  'Duplicate refraction! Target yourself and nearest ally with two copies of the spell'],
      ['4',  'You flubbed the incantation! Cast a random known spell at the same targets'],
      ['5',  'Ethereal bandersnatch! Two random pieces of gear disappear forever'],
      ['6',  'Arcano-mutagenesis! DC 12 CON or random stat drops to 3 (−4) until rest'],
      ['7',  'Boom! Open a 30-foot sinkhole; all near must pass DC 15 DEX or fall in'],
      ['8',  'Petrification! 1d4 of your limbs petrify for 24 hours'],
      ['9',  'Stupefaction! Lose ability to cast all spells of the same tier until rest'],
      ['10', 'It cannot be unseen! DC 12 WIS or descend into mad raving for 1d10 rounds'],
      ['11', 'Radioactive energies! All enemies attack you for the next 1d4 rounds'],
      ['12', 'Uncontained channeling! Disadvantage on spells of same tier and lower for 10 rounds'],
    ]
  ));

  container.appendChild(makeSectionHeader('Tier 5 (d12)'));
  container.appendChild(makeTable(
    ['d12', 'Effect'],
    [
      ['1',  'Devastation! Roll twice and combine both effects (reroll further 1s)'],
      ['2',  'Pyroclastic extrusion! Deal 3d8 damage to yourself and all creatures within near'],
      ['3',  'Astral incision! Permanently forget one random spell'],
      ['4',  'The grimlow! Summon a hostile grimlow near you; persists 2d4 rounds'],
      ['5',  'Dark plasma aura! Attacks deal double damage to you for 2d6 rounds'],
      ['6',  'Gate! Portal opens; something dreadful arrives in 1d4 rounds unless DC 18 INT closes it'],
      ['7',  'Runaway arcana loop! Spell targets a random creature; repeats each turn until success'],
      ['8',  'Arcane obstruction! Lose ability to cast all spells of a random tier until rest'],
      ['9',  'What lurks beyond the veil! DC 15 WIS or fall into mad raving for 1d4 hours'],
      ['10', 'Ord\'s balance! Permanently sacrifice a magic item or a tier 3+ known spell'],
      ['11', 'Unmitigated chain reaction! Disadvantage on all spells for 10 rounds'],
      ['12', 'Shred! Tear a hole in the fabric of the universe; it grows larger every round'],
    ]
  ));

  container.appendChild(makeSectionHeader('Priest Penance — Sacrifice Value'));
  container.appendChild(makeTable(
    ['Spell Tier', 'Value'],
    [['1', '5 gp'], ['2', '20 gp'], ['3', '40 gp'], ['4', '90 gp'], ['5', '150 gp']]
  ));
}

// ── Light & Darkness ───────────────────────────────────────────────────────

export function renderLightAndDarknessSection(container) {
  container.appendChild(makeTable(
    ['Light Source', 'Range', 'Duration', 'Notes'],
    [
      ['Torch',       'Near',        '1 hour (real time)',   'Burns for one hour of real time'],
      ['Lantern',     'Double near', '1 hr per oil flask',   'Requires oil; has a shutter'],
      ['Oil flask',   'Close area',  '4 rounds',             'Also fuels lantern for 1 hour'],
      ['Campfire',    'Near',        'Up to 8 hours',        'Three torches; can\'t be moved'],
      ['Light spell', 'Near',        '1 hour (real time)',   'Cast on one object'],
    ]
  ));

  container.appendChild(makeSectionHeader('Total Darkness'));
  container.appendChild(makeParagraph('Creatures not dark-adapted have disadvantage on all sight-based tasks. The environment becomes deadly: the GM checks for a random encounter every crawling round.'));

  container.appendChild(makeSectionHeader('Multiple Light Sources'));
  container.appendChild(makeParagraph('When lighting a second source: either ride the current timer, or extinguish all old sources and start a new timer. Keep tracking simple, not frustrating.'));

  container.appendChild(makeSectionHeader('Light Mishaps (d6)'));
  container.appendChild(makeTable(
    ['d6', 'Effect'],
    [
      ['1', 'Dud — light source goes out; must be replaced or recast'],
      ['2', 'Fire — light source flares, burns your hand (1 damage); DC 18 DEX or drop it'],
      ['3', 'Air — rogue wind; DC 15 DEX or the flames go out'],
      ['4', 'Water — dripping ceiling hits the light; DC 15 DEX or flames go out'],
      ['5', 'Earth — debris covers the light source; DC 12 DEX to protect it'],
      ['6', 'Spark — open flame catches 1d4 flammable objects within close; DC 12 DEX each'],
    ]
  ));
}

// ── Resting ────────────────────────────────────────────────────────────────

export function renderRestingSection(container) {
  const list = makeReferenceList();
  list.appendChild(makeReferenceCard('Resting',      '8 hours + 1 ration',
    'Consume a ration and sleep for 8 hours. Sleep can be broken for light tasks like taking watch.'));
  list.appendChild(makeReferenceCard('Success',      null,
    'Regain all lost HP. Recover all temporary stat damage. Some talents, spells, and items also reset.'));
  list.appendChild(makeReferenceCard('Interruption', 'DC 12 CON check',
    'Each stressful interruption (including combat) requires a DC 12 Constitution check. Failure: consume a ration but gain no benefit.'));
  container.appendChild(list);

  container.appendChild(makeSectionHeader('Danger Level — Random Encounter Cadence'));
  container.appendChild(makeTable(
    ['Level', 'Crawling (in dungeon)', 'Overland / Resting'],
    [
      ['Unsafe', 'Every 3 rounds', 'Every 3 hours'],
      ['Risky',  'Every 2 rounds', 'Every 2 hours'],
      ['Deadly', 'Every round',    'Every hour'],
    ]
  ));

  container.appendChild(makeSectionHeader('Campfire'));
  container.appendChild(makeParagraph('Combine three torches to make a campfire that can\'t be moved once lit. Lasts up to 8 hours while at least one character stays near it. Casts light to near distance.'));
}

// ── Death & Dying ──────────────────────────────────────────────────────────

export function renderDeathAndDyingSection(container) {
  const list = makeReferenceList();
  list.appendChild(makeReferenceCard('Going to 0 HP', null,
    'The character falls unconscious and is dying. They wake up if healed above 0 HP.'));
  list.appendChild(makeReferenceCard('Death Timer', '1d4 + CON mod (min 1)',
    'Roll on your turn to determine how many rounds you have. You die at the end of that round unless healed or stabilized.'));
  list.appendChild(makeReferenceCard('Miracle Roll', 'Natural 20 on d20',
    'Each subsequent turn, the dying character rolls a d20. On a natural 20 they rise with 1 HP.'));
  list.appendChild(makeReferenceCard('Stabilize', 'DC 15 INT check',
    'An intelligent being can give first aid at close range. On success, the target stops dying (but stays unconscious).'));
  list.appendChild(makeReferenceCard('Death', null,
    'A character who perishes is retired from the game.'));
  container.appendChild(list);

  container.appendChild(makeSectionHeader('Optional Modes'));
  const modeList = makeReferenceList();
  modeList.appendChild(makeReferenceCard('Deadly Mode', null, 'Death timer is always 1. DC 18 INT to stabilize.'));
  modeList.appendChild(makeReferenceCard('Fatality Mode', null, 'Characters die at 0 HP — no death timer.'));
  container.appendChild(modeList);
}

// ── Stealth & Surprise ─────────────────────────────────────────────────────

export function renderStealthAndSurpriseSection(container) {
  const list = makeReferenceList();
  list.appendChild(makeReferenceCard('Hiding', 'DEX check',
    'Must succeed on Dexterity checks to remain undetected. Can\'t hide while others can see you.'));
  list.appendChild(makeReferenceCard('Detecting', 'WIS check',
    'Actively looking or listening. Looking in the right place reveals a hidden creature automatically; otherwise a WIS check is needed.'));
  list.appendChild(makeReferenceCard('Surprise', null,
    'An undetected creature at the start of combat takes one turn before initiative. It has advantage on attack rolls against surprised targets.'));
  list.appendChild(makeReferenceCard('Revealing Position', null,
    'Attacking from hiding gives away your position afterwards unless the GM determines otherwise.'));
  container.appendChild(list);
}

// ── Luck Tokens ────────────────────────────────────────────────────────────

export function renderLuckTokensSection(container) {
  const list = makeReferenceList();
  list.appendChild(makeReferenceCard('Earning Luck Tokens', null,
    'The GM awards luck tokens for exceptional roleplaying, heroism, or just plain coolness — big sacrifices, moving speeches, incredibly daring maneuvers.'));
  list.appendChild(makeReferenceCard('One at a Time', null,
    'Each player can only hold one luck token at a time.'));
  list.appendChild(makeReferenceCard('Using a Luck Token', null,
    'Cash in your luck token to reroll any roll you just made. You must use the new result.'));
  list.appendChild(makeReferenceCard('Giving Away', null,
    'You can give your luck token to a companion.'));
  container.appendChild(list);

  container.appendChild(makeSectionHeader('How Many to Give?'));
  const modeList = makeReferenceList();
  modeList.appendChild(makeReferenceCard('Heroic / Pulpy', '2–3 per session', 'Generous luck token economy for a pulpy, heroic feel.'));
  modeList.appendChild(makeReferenceCard('Grim / Dark', '0 per session', 'No luck tokens for a grim, difficult, and dark game.'));
  container.appendChild(modeList);
}
