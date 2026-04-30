/**
 * All Shadowdark spells, wizard and priest, tiers 1–5.
 *
 * Each entry has the fields the spell list UI needs: class, tier, name,
 * range, duration, and a concise description of the mechanical effect.
 * Descriptions are paraphrased from the Shadowdark core rules.
 */
export const SPELLS = [

  // ── Wizard — Tier 1 ────────────────────────────────────────────────────

  { class: 'wizard', tier: 1, name: 'Alarm',
    range: 'Touch', duration: '8 hours',
    description: 'You ward an area up to 20 ft across. A silent mental alert wakes you if any creature enters.' },

  { class: 'wizard', tier: 1, name: 'Burning Hands',
    range: 'Near', duration: 'Instant',
    description: 'A sheet of flame erupts from your fingers. All creatures in range take 1d6 fire damage per spell tier.' },

  { class: 'wizard', tier: 1, name: 'Charm Person',
    range: 'Near', duration: '1 hour',
    description: 'A humanoid you can see treats you as a trusted friend for the duration.' },

  { class: 'wizard', tier: 1, name: 'Color Spray',
    range: 'Near', duration: '1 round',
    description: 'Brilliant colors blind creatures of 5 HD or fewer for 1 round.' },

  { class: 'wizard', tier: 1, name: 'Comprehend Languages',
    range: 'Self', duration: '1 hour',
    description: 'You understand all spoken and written languages.' },

  { class: 'wizard', tier: 1, name: 'Dancing Lights',
    range: 'Far', duration: 'Focus',
    description: 'Up to 4 floating lights each shed dim light in a near radius. You can move them freely.' },

  { class: 'wizard', tier: 1, name: 'Detect Magic',
    range: 'Near', duration: 'Focus',
    description: 'You sense the presence and school of magic auras within range.' },

  { class: 'wizard', tier: 1, name: 'Feather Fall',
    range: 'Near', duration: '1 minute',
    description: 'Up to 5 creatures fall slowly and take no damage from falls.' },

  { class: 'wizard', tier: 1, name: 'Floating Disk',
    range: 'Near', duration: '8 hours',
    description: 'A circular disk of force carries up to 500 lb and hovers 3 ft off the ground, following you.' },

  { class: 'wizard', tier: 1, name: 'Hold Portal',
    range: 'Near', duration: '10 minutes',
    description: 'A door, gate, or window is held magically shut and counts as locked.' },

  { class: 'wizard', tier: 1, name: 'Light',
    range: 'Near', duration: '1 hour',
    description: 'An object you touch sheds bright light in a near radius.' },

  { class: 'wizard', tier: 1, name: 'Mage Armor',
    range: 'Self', duration: '8 hours',
    description: 'A sheath of magical force grants you +2 AC.' },

  { class: 'wizard', tier: 1, name: 'Magic Missile',
    range: 'Far', duration: 'Instant',
    description: 'Unerring bolts of force deal 1d4 damage each. You fire one bolt per spell tier.' },

  { class: 'wizard', tier: 1, name: 'Protection from Evil',
    range: 'Touch', duration: '1 hour',
    description: 'Evil creatures attack the warded target with disadvantage.' },

  { class: 'wizard', tier: 1, name: 'Shield',
    range: 'Self', duration: '1 round',
    description: 'A magical barrier grants +5 AC until the start of your next turn.' },

  { class: 'wizard', tier: 1, name: 'Sleep',
    range: 'Near', duration: '1 minute',
    description: 'Creatures totaling 4 HD or fewer in range fall into a magical slumber.' },

  // ── Wizard — Tier 2 ────────────────────────────────────────────────────

  { class: 'wizard', tier: 2, name: 'Darkness',
    range: 'Near', duration: 'Focus',
    description: 'Magical darkness fills a 20 ft radius, blocking all light including darkvision.' },

  { class: 'wizard', tier: 2, name: 'ESP',
    range: 'Near', duration: 'Focus',
    description: 'You detect the surface thoughts of one creature you can see.' },

  { class: 'wizard', tier: 2, name: 'Invisibility',
    range: 'Touch', duration: '1 hour',
    description: 'A creature becomes invisible. The effect ends if it attacks or casts a spell.' },

  { class: 'wizard', tier: 2, name: 'Knock',
    range: 'Near', duration: 'Instant',
    description: 'A locked object opens. Magical locks are suppressed for 10 minutes.' },

  { class: 'wizard', tier: 2, name: 'Levitate',
    range: 'Near', duration: 'Focus',
    description: 'A creature or object rises up to 20 ft and hovers in place.' },

  { class: 'wizard', tier: 2, name: 'Mirror Image',
    range: 'Self', duration: '1 minute',
    description: '1d4+1 illusory duplicates surround you, causing attackers to potentially strike a copy instead.' },

  { class: 'wizard', tier: 2, name: 'Phantasmal Force',
    range: 'Far', duration: 'Focus',
    description: 'You create a convincing illusion up to 10 ft across that one creature believes is real.' },

  { class: 'wizard', tier: 2, name: 'Ray of Enfeeblement',
    range: 'Near', duration: '1 minute',
    description: 'A black ray halves the damage of all Strength-based attacks a creature makes.' },

  { class: 'wizard', tier: 2, name: 'Spider Climb',
    range: 'Touch', duration: '1 hour',
    description: 'A willing creature can move across vertical surfaces and ceilings at full speed.' },

  { class: 'wizard', tier: 2, name: 'Web',
    range: 'Near', duration: '1 hour',
    description: 'Thick webs fill a 20 ft area. Creatures caught inside must break free or remain restrained.' },

  // ── Wizard — Tier 3 ────────────────────────────────────────────────────

  { class: 'wizard', tier: 3, name: 'Clairvoyance',
    range: '1 mile', duration: 'Focus',
    description: 'You create an invisible sensor at a location you know and can see and hear through it.' },

  { class: 'wizard', tier: 3, name: 'Dispel Magic',
    range: 'Near', duration: 'Instant',
    description: 'One magical effect of tier 5 or lower on a creature, object, or area ends.' },

  { class: 'wizard', tier: 3, name: 'Fireball',
    range: 'Far', duration: 'Instant',
    description: 'A blazing explosion deals 1d6 fire damage per spell tier to all creatures in a 20 ft radius.' },

  { class: 'wizard', tier: 3, name: 'Fly',
    range: 'Touch', duration: 'Focus',
    description: 'A willing creature gains a flying speed equal to its walking speed.' },

  { class: 'wizard', tier: 3, name: 'Lightning Bolt',
    range: 'Near', duration: 'Instant',
    description: 'A bolt of electricity deals 1d6 lightning damage per tier to all creatures in a line.' },

  { class: 'wizard', tier: 3, name: 'Phantasmal Killer',
    range: 'Far', duration: 'Focus',
    description: 'An invisible illusory predator terrorizes one creature. It takes 1d10 psychic damage each round.' },

  { class: 'wizard', tier: 3, name: 'Slow',
    range: 'Far', duration: 'Focus',
    description: 'Up to 6 creatures in a 40 ft area move at half speed and cannot use reactions or extra attacks.' },

  { class: 'wizard', tier: 3, name: 'Speak with Dead',
    range: 'Near', duration: '10 minutes',
    description: 'A corpse answers up to 5 questions truthfully, based on what it knew in life.' },

  { class: 'wizard', tier: 3, name: 'Tongues',
    range: 'Touch', duration: '1 hour',
    description: 'A creature can speak and understand any spoken language.' },

  { class: 'wizard', tier: 3, name: 'Water Breathing',
    range: 'Near', duration: '8 hours',
    description: 'Up to 10 creatures can breathe water as easily as air.' },

  // ── Wizard — Tier 4 ────────────────────────────────────────────────────

  { class: 'wizard', tier: 4, name: 'Confusion',
    range: 'Far', duration: 'Focus',
    description: 'Creatures in a 10 ft area act randomly: attacking randomly, moving erratically, or doing nothing.' },

  { class: 'wizard', tier: 4, name: 'Dimension Door',
    range: 'Far', duration: 'Instant',
    description: 'You and up to one willing creature teleport to any point within 500 ft that you can visualize.' },

  { class: 'wizard', tier: 4, name: 'Hallucinatory Terrain',
    range: 'Far', duration: '24 hours',
    description: 'Natural terrain in a 150 ft area looks, sounds, and smells like a different type of natural terrain.' },

  { class: 'wizard', tier: 4, name: 'Ice Storm',
    range: 'Far', duration: 'Instant',
    description: 'Hail and ice deal 2d8 bludgeoning and 4d6 cold damage to all creatures in a 20 ft cylinder.' },

  { class: 'wizard', tier: 4, name: 'Polymorph',
    range: 'Near', duration: 'Focus',
    description: 'A creature transforms into a beast of your choice and uses that beast\'s stats.' },

  { class: 'wizard', tier: 4, name: 'Remove Curse',
    range: 'Touch', duration: 'Instant',
    description: 'All curses afflicting one creature or object end.' },

  { class: 'wizard', tier: 4, name: 'Wall of Fire',
    range: 'Near', duration: 'Focus',
    description: 'A wall of flames deals 5d8 fire damage to creatures that enter or start their turn in it.' },

  // ── Wizard — Tier 5 ────────────────────────────────────────────────────

  { class: 'wizard', tier: 5, name: 'Cloudkill',
    range: 'Near', duration: 'Focus',
    description: 'A roiling cloud of poison deals 5d8 poison damage per round to all creatures inside.' },

  { class: 'wizard', tier: 5, name: 'Cone of Cold',
    range: 'Near', duration: 'Instant',
    description: 'A blast of freezing air deals 8d8 cold damage to all creatures in a cone.' },

  { class: 'wizard', tier: 5, name: 'Contact Other Plane',
    range: 'Self', duration: '10 minutes',
    description: 'You contact a deity or extraplanar entity and may ask up to 5 yes/no questions.' },

  { class: 'wizard', tier: 5, name: 'Feeblemind',
    range: 'Near', duration: 'Permanent',
    description: 'A creature\'s INT and CHA drop to 1. It cannot cast spells or use INT- or CHA-based abilities.' },

  { class: 'wizard', tier: 5, name: 'Hold Monster',
    range: 'Far', duration: 'Focus',
    description: 'Any creature you can see is paralyzed for the duration.' },

  { class: 'wizard', tier: 5, name: 'Magic Jar',
    range: 'Near', duration: 'Focus',
    description: 'Your soul leaves your body and possesses a nearby creature, controlling it completely.' },

  { class: 'wizard', tier: 5, name: 'Passwall',
    range: 'Near', duration: '1 hour',
    description: 'You create a 5 ft wide passage through a solid wall up to 10 ft thick.' },

  { class: 'wizard', tier: 5, name: 'Telekinesis',
    range: 'Far', duration: 'Focus',
    description: 'You move a creature or object weighing up to 1,000 lb using only your mind.' },

  { class: 'wizard', tier: 5, name: 'Teleport',
    range: 'Self', duration: 'Instant',
    description: 'You and up to 8 willing creatures instantly travel to a destination you have visited before.' },

  { class: 'wizard', tier: 5, name: 'Wall of Stone',
    range: 'Near', duration: 'Focus',
    description: 'A barrier of solid stone up to 10 panels (10×10×3 ft each) erupts from a solid surface.' },

  // ── Priest — Tier 1 ────────────────────────────────────────────────────

  { class: 'priest', tier: 1, name: 'Bless',
    range: 'Near', duration: 'Focus',
    description: 'Up to 3 creatures add 1d4 to all attack rolls and saving throws.' },

  { class: 'priest', tier: 1, name: 'Command',
    range: 'Near', duration: '1 round',
    description: 'A creature obeys a one-word divine command on its next turn — flee, drop, halt, grovel, etc.' },

  { class: 'priest', tier: 1, name: 'Cure Wounds',
    range: 'Touch', duration: 'Instant',
    description: 'A creature you touch regains 1d8+1 HP per spell tier.' },

  { class: 'priest', tier: 1, name: 'Detect Evil',
    range: 'Near', duration: 'Focus',
    description: 'You sense the presence and location of evil creatures and unholy objects within range.' },

  { class: 'priest', tier: 1, name: 'Guiding Bolt',
    range: 'Far', duration: '1 round',
    description: 'A bolt of radiance deals 4d6 radiant damage. The next attack against the target has advantage.' },

  { class: 'priest', tier: 1, name: 'Healing Word',
    range: 'Near', duration: 'Instant',
    description: 'A creature you can see regains 1d4+1 HP per spell tier.' },

  { class: 'priest', tier: 1, name: 'Inflict Wounds',
    range: 'Touch', duration: 'Instant',
    description: 'A melee touch attack channels necrotic energy, dealing 3d10 necrotic damage.' },

  { class: 'priest', tier: 1, name: 'Light',
    range: 'Near', duration: '1 hour',
    description: 'An object you touch sheds bright light in a near radius.' },

  { class: 'priest', tier: 1, name: 'Protection from Evil',
    range: 'Touch', duration: '1 hour',
    description: 'Evil creatures attack the warded target with disadvantage.' },

  { class: 'priest', tier: 1, name: 'Purify Food & Drink',
    range: 'Near', duration: 'Instant',
    description: 'All food and drink within range is cleansed of poison, disease, and contamination.' },

  { class: 'priest', tier: 1, name: 'Sanctuary',
    range: 'Near', duration: 'Focus',
    description: 'Creatures must succeed on a WIS check to attack the warded target. Effect ends if target attacks.' },

  { class: 'priest', tier: 1, name: 'Shield of Faith',
    range: 'Near', duration: 'Focus',
    description: 'A shimmering field of divine force grants a creature +2 AC.' },

  // ── Priest — Tier 2 ────────────────────────────────────────────────────

  { class: 'priest', tier: 2, name: 'Aid',
    range: 'Near', duration: '8 hours',
    description: 'Up to 3 creatures each gain 5 temporary HP.' },

  { class: 'priest', tier: 2, name: 'Augury',
    range: 'Self', duration: 'Instant',
    description: 'You receive a divine omen about an action: weal, woe, weal and woe, or nothing.' },

  { class: 'priest', tier: 2, name: 'Blindness/Deafness',
    range: 'Near', duration: '1 minute',
    description: 'A creature is blinded or deafened. It may attempt a saving throw each round to end the effect.' },

  { class: 'priest', tier: 2, name: 'Find Traps',
    range: 'Near', duration: 'Instant',
    description: 'You sense the presence of traps within range, though not their exact nature or location.' },

  { class: 'priest', tier: 2, name: 'Hold Person',
    range: 'Near', duration: 'Focus',
    description: 'A humanoid you can see is paralyzed for the duration.' },

  { class: 'priest', tier: 2, name: 'Lesser Restoration',
    range: 'Touch', duration: 'Instant',
    description: 'You end one condition — blinded, deafened, paralyzed, or poisoned — affecting a creature.' },

  { class: 'priest', tier: 2, name: 'Silence',
    range: 'Far', duration: 'Focus',
    description: 'No sound passes in or out of a 20 ft radius sphere. Spells with verbal components can\'t be cast inside.' },

  { class: 'priest', tier: 2, name: 'Spiritual Weapon',
    range: 'Far', duration: '1 minute',
    description: 'A floating magical weapon attacks as a bonus action each turn, dealing 1d8 + spellcasting modifier.' },

  // ── Priest — Tier 3 ────────────────────────────────────────────────────

  { class: 'priest', tier: 3, name: 'Create Food & Water',
    range: 'Near', duration: 'Instant',
    description: 'You conjure enough food and water to sustain up to 15 people for 24 hours.' },

  { class: 'priest', tier: 3, name: 'Cure Disease',
    range: 'Touch', duration: 'Instant',
    description: 'You cure any one disease afflicting a creature you touch.' },

  { class: 'priest', tier: 3, name: 'Dispel Magic',
    range: 'Near', duration: 'Instant',
    description: 'One magical effect of tier 5 or lower on a creature, object, or area ends.' },

  { class: 'priest', tier: 3, name: 'Mass Healing Word',
    range: 'Near', duration: 'Instant',
    description: 'Up to 6 creatures you can see each regain 1d4+1 HP per spell tier.' },

  { class: 'priest', tier: 3, name: 'Remove Curse',
    range: 'Touch', duration: 'Instant',
    description: 'All curses afflicting one creature or object end.' },

  { class: 'priest', tier: 3, name: 'Speak with Dead',
    range: 'Near', duration: '10 minutes',
    description: 'A corpse answers up to 5 questions truthfully, based on what it knew in life.' },

  // ── Priest — Tier 4 ────────────────────────────────────────────────────

  { class: 'priest', tier: 4, name: 'Banishment',
    range: 'Near', duration: 'Focus',
    description: 'A creature is sent to a harmless demiplane. If extraplanar, it stays there when focus ends.' },

  { class: 'priest', tier: 4, name: 'Death Ward',
    range: 'Touch', duration: '8 hours',
    description: 'The first time the target would drop to 0 HP, they drop to 1 HP instead.' },

  { class: 'priest', tier: 4, name: 'Divination',
    range: 'Self', duration: 'Instant',
    description: 'You receive a truthful reply from your deity about events expected within the next 7 days.' },

  { class: 'priest', tier: 4, name: 'Freedom of Movement',
    range: 'Touch', duration: '1 hour',
    description: 'A creature ignores magical effects that reduce speed, restrain, or paralyze it.' },

  { class: 'priest', tier: 4, name: 'Guardian of Faith',
    range: 'Near', duration: '8 hours',
    description: 'A spectral guardian appears and deals 20 radiant damage to hostile creatures that move within near range.' },

  // ── Priest — Tier 5 ────────────────────────────────────────────────────

  { class: 'priest', tier: 5, name: 'Flame Strike',
    range: 'Far', duration: 'Instant',
    description: 'Pillars of divine fire deal 4d6 fire and 4d6 radiant damage in a 10 ft cylinder.' },

  { class: 'priest', tier: 5, name: 'Greater Restoration',
    range: 'Touch', duration: 'Instant',
    description: 'You end one effect reducing ability scores, remove exhaustion, or cure a curse, petrification, or poison.' },

  { class: 'priest', tier: 5, name: 'Mass Cure Wounds',
    range: 'Near', duration: 'Instant',
    description: 'Up to 6 creatures you can see each regain 3d8+5 HP.' },

  { class: 'priest', tier: 5, name: 'Raise Dead',
    range: 'Touch', duration: 'Instant',
    description: 'You restore life to a creature dead no more than 10 days. It returns with 1 HP.' },

  { class: 'priest', tier: 5, name: 'True Seeing',
    range: 'Touch', duration: '1 hour',
    description: 'A creature sees through illusions, perceives invisible creatures, and can see into the Ethereal Plane.' },
];
