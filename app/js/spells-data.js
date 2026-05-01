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
    range: 'Close', duration: '1 day',
    description: 'Touch an object to set a magical alarm. A mental bell sounds in your head if any creature you didn\'t designate touches or crosses it.' },

  { class: 'wizard', tier: 1, name: 'Burning Hands',
    range: 'Close', duration: 'Instant',
    description: 'Unleash a circle of flame out to close range. Creatures take 1d6 damage and flammable objects catch fire.' },

  { class: 'wizard', tier: 1, name: 'Charm Person',
    range: 'Near', duration: '1d8 days',
    description: 'One humanoid of level 2 or less regards you as a friend for the duration. It knows you enchanted it after the spell ends.' },

  { class: 'wizard', tier: 1, name: 'Detect Magic',
    range: 'Near', duration: 'Focus',
    description: 'Sense the presence of magic within near range. After 2 rounds of focus, discern its general properties. Full barriers block this spell.' },

  { class: 'wizard', tier: 1, name: 'Feather Fall',
    range: 'Self', duration: 'Instant',
    description: 'Cast when you fall. Your rate of descent slows so you land safely on your feet.' },

  { class: 'wizard', tier: 1, name: 'Floating Disk',
    range: 'Near', duration: '10 rounds',
    description: 'Create a floating force disk carrying up to 20 gear slots. It hovers at waist level and automatically stays within near range of you.' },

  { class: 'wizard', tier: 1, name: 'Hold Portal',
    range: 'Near', duration: '10 rounds',
    description: 'Magically hold a portal closed. A creature must succeed on a STR check vs. your spellcasting check to open it.' },

  { class: 'wizard', tier: 1, name: 'Light',
    range: 'Close', duration: '1 hour',
    description: 'One touched object glows with bright heatless light, illuminating out to a near distance.' },

  { class: 'wizard', tier: 1, name: 'Mage Armor',
    range: 'Self', duration: '10 rounds',
    description: 'An invisible magical force protects you. Your AC becomes 14 (18 on a critical spellcasting check) for the duration.' },

  { class: 'wizard', tier: 1, name: 'Magic Missile',
    range: 'Far', duration: 'Instant',
    description: 'You have advantage on the spellcasting check. A bolt of force deals 1d4 damage to one target.' },

  { class: 'wizard', tier: 1, name: 'Protection From Evil',
    range: 'Close', duration: 'Focus',
    description: 'Chaotic beings have disadvantage on attacks and hostile spellcasting against the target; they can\'t possess, compel, or beguile it.' },

  { class: 'wizard', tier: 1, name: 'Sleep',
    range: 'Near', duration: 'Instant',
    description: 'Creatures of level 2 or less in a near-sized cube fall into a deep sleep. Vigorous shaking or injury wakes them.' },

  // ── Wizard — Tier 2 ────────────────────────────────────────────────────

  { class: 'wizard', tier: 2, name: 'Acid Arrow',
    range: 'Far', duration: 'Focus',
    description: 'A corrosive bolt hits one foe, dealing 1d6 damage per round for as long as you focus.' },

  { class: 'wizard', tier: 2, name: 'Alter Self',
    range: 'Self', duration: '5 rounds',
    description: 'Magically change your physical form to gain one feature modifying your anatomy (gills, claws, etc.). Cannot grow wings or extra limbs.' },

  { class: 'wizard', tier: 2, name: 'Detect Thoughts',
    range: 'Near', duration: 'Focus',
    description: 'Peer into one creature\'s mind and learn its immediate thoughts each round. The target may make a WIS check vs. your check to notice and end the spell.' },

  { class: 'wizard', tier: 2, name: 'Fixed Object',
    range: 'Close', duration: '5 rounds',
    description: 'An object of 5 lbs or less you touch becomes fixed in place, supporting up to 5,000 lbs for the duration.' },

  { class: 'wizard', tier: 2, name: 'Hold Person',
    range: 'Near', duration: 'Focus',
    description: 'Magically paralyze one humanoid of level 4 or less you can see within range.' },

  { class: 'wizard', tier: 2, name: 'Invisibility',
    range: 'Close', duration: '10 rounds',
    description: 'A touched creature becomes invisible. The effect ends if the target attacks or casts a spell.' },

  { class: 'wizard', tier: 2, name: 'Knock',
    range: 'Near', duration: 'Instant',
    description: 'Any door, window, gate, chest, or portal you can see instantly opens. Creates a loud knock audible to all nearby.' },

  { class: 'wizard', tier: 2, name: 'Levitate',
    range: 'Self', duration: 'Focus',
    description: 'Float a near distance vertically per round on your turn. Push against solid objects to move horizontally.' },

  { class: 'wizard', tier: 2, name: 'Mirror Image',
    range: 'Self', duration: '5 rounds',
    description: 'Create illusory duplicates equal to half your level (minimum 1). Each duplicate absorbs one attack before vanishing.' },

  { class: 'wizard', tier: 2, name: 'Misty Step',
    range: 'Self', duration: 'Instant',
    description: 'In a puff of smoke, teleport a near distance to any spot you can see.' },

  { class: 'wizard', tier: 2, name: 'Silence',
    range: 'Far', duration: 'Focus',
    description: 'Silence a near-sized cube. Creatures inside are deafened and cannot cast spells with verbal components.' },

  { class: 'wizard', tier: 2, name: 'Web',
    range: 'Far', duration: '5 rounds',
    description: 'Fill a near-sized cube with sticky webs. Trapped creatures can\'t move without a STR check vs. your spellcasting check.' },

  // ── Wizard — Tier 3 ────────────────────────────────────────────────────

  { class: 'wizard', tier: 3, name: 'Animate Dead',
    range: 'Close', duration: '1 day',
    description: 'Touch humanoid remains with at least three limbs and head intact; it rises as a zombie or skeleton under your control. After 1 day, it collapses into grave dust.' },

  { class: 'wizard', tier: 3, name: 'Dispel Magic',
    range: 'Near', duration: 'Instant',
    description: 'End one spell that affects one target you can see within range.' },

  { class: 'wizard', tier: 3, name: 'Fabricate',
    range: 'Near', duration: '10 rounds',
    description: 'Convert a tree-sized collection of raw materials into a finished work (e.g., bricks into a bridge). Reverts to raw materials when the spell ends.' },

  { class: 'wizard', tier: 3, name: 'Fireball',
    range: 'Far', duration: 'Instant',
    description: 'A flame erupts into a fiery blast. All creatures in a near-sized cube around the impact take 4d6 damage.' },

  { class: 'wizard', tier: 3, name: 'Fly',
    range: 'Self', duration: '5 rounds',
    description: 'Your feet lift from the ground. You can fly a near distance per round and hover in place.' },

  { class: 'wizard', tier: 3, name: 'Gaseous Form',
    range: 'Self', duration: '10 rounds',
    description: 'You and your gear become a cloud of smoke. Fly and pass through any gap smoke could. You can\'t cast spells in this form.' },

  { class: 'wizard', tier: 3, name: 'Illusion',
    range: 'Far', duration: 'Focus',
    description: 'Create a convincing visible and audible illusion up to a near-sized cube. Creatures must pass a WIS check vs. your check to see through it. Touching the illusion reveals its false nature.' },

  { class: 'wizard', tier: 3, name: 'Lightning Bolt',
    range: 'Far', duration: 'Instant',
    description: 'A blue-white ray of lightning hits all creatures in a straight line out to far range, dealing 3d6 damage.' },

  { class: 'wizard', tier: 3, name: 'Magic Circle',
    range: 'Near', duration: 'Focus',
    description: 'Conjure a near-sized circle of runes and name a creature type. Those creatures can\'t attack or cast hostile spells on anyone inside the circle.' },

  { class: 'wizard', tier: 3, name: 'Protection From Energy',
    range: 'Close', duration: 'Focus',
    description: 'One touched creature becomes immune to fire, cold, or electricity (your choice) for the duration.' },

  { class: 'wizard', tier: 3, name: 'Sending',
    range: 'Unlimited', duration: 'Instant',
    description: 'Send a brief mental message to any creature you know on the same plane.' },

  { class: 'wizard', tier: 3, name: 'Speak With Dead',
    range: 'Close', duration: 'Instant',
    description: 'A dead body you touch answers up to three yes/no questions. Casting more than once in 24 hours escalates failed checks to critical failures.' },

  // ── Wizard — Tier 4 ────────────────────────────────────────────────────

  { class: 'wizard', tier: 4, name: 'Arcane Eye',
    range: 'Near', duration: 'Focus',
    description: 'Conjure an invisible flying eye. It sees in the dark to near range, can fly near on your turn, and fits through openings as narrow as a keyhole.' },

  { class: 'wizard', tier: 4, name: 'Cloudkill',
    range: 'Far', duration: '5 rounds',
    description: 'A cloud of yellow poison fills a near-sized cube. Creatures inside are blinded and take 2d6 damage per turn. Creatures of level 9 or less die if they end their turn fully inside.' },

  { class: 'wizard', tier: 4, name: 'Confusion',
    range: 'Near', duration: 'Focus',
    description: 'Mesmerize one creature; it can\'t take actions and moves randomly. Creatures of level 9+ may make a WIS check vs. your check each turn to end it.' },

  { class: 'wizard', tier: 4, name: 'Control Water',
    range: 'Far', duration: 'Focus',
    description: 'Move and shape a section of water up to 100 feet wide and deep, changing its shape, defying gravity, or redirecting its flow.' },

  { class: 'wizard', tier: 4, name: 'Dimension Door',
    range: 'Self', duration: 'Instant',
    description: 'Teleport yourself and up to one willing creature within close range to any point you can see.' },

  { class: 'wizard', tier: 4, name: 'Divination',
    range: 'Self', duration: 'Instant',
    description: 'Ask the GM one yes/no question; the GM answers truthfully. Casting more than once in 24 hours escalates failed checks to critical failures.' },

  { class: 'wizard', tier: 4, name: 'Passwall',
    range: 'Close', duration: '5 rounds',
    description: 'Open a tunnel of your height through a barrier you touch. The passage can be up to near distance long in a straight line.' },

  { class: 'wizard', tier: 4, name: 'Polymorph',
    range: 'Close', duration: '10 rounds',
    description: 'Transform a touched creature into another natural creature of equal or smaller size. It gains the creature\'s physical stats. At 0 HP, it reverts at half its prior HP.' },

  { class: 'wizard', tier: 4, name: 'Resilient Sphere',
    range: 'Close', duration: '5 rounds',
    description: 'Conjure a weightless glassy sphere around you extending to close range. Nothing can pass through or crush it. You can roll it a near distance on your turn.' },

  { class: 'wizard', tier: 4, name: 'Stoneskin',
    range: 'Self', duration: '10 rounds',
    description: 'Your skin becomes like granite. Your AC becomes 17 (20 on a critical spellcasting check) for the duration.' },

  { class: 'wizard', tier: 4, name: 'Telekinesis',
    range: 'Far', duration: 'Focus',
    description: 'Lift a creature or object of 1,000 lbs or less with your mind. Move it a near distance in any direction and hold it in place.' },

  { class: 'wizard', tier: 4, name: 'Wall of Force',
    range: 'Near', duration: '5 rounds',
    description: 'Conjure a transparent wall of force covering a near-sized area. You choose its shape. Nothing on the same plane can physically pass through the wall.' },

  // ── Wizard — Tier 5 ────────────────────────────────────────────────────

  { class: 'wizard', tier: 5, name: 'Antimagic Shell',
    range: 'Self', duration: 'Focus',
    description: 'A near-sized cube of null-magic moves with you. No spells can be cast inside; magic items and spells have no effect within the zone.' },

  { class: 'wizard', tier: 5, name: 'Create Undead',
    range: 'Close', duration: '1 day',
    description: 'Summon either a wight or wraith under your control. It acts on your turn and melts away into smoke after 1 day.' },

  { class: 'wizard', tier: 5, name: 'Disintegrate',
    range: 'Far', duration: 'Instant',
    description: 'A green ray turns a target to ash. Creatures of level 5 or less instantly die; level 6+ take 3d8 damage. Destroys non-magical objects up to the size of a large tree.' },

  { class: 'wizard', tier: 5, name: 'Hold Monster',
    range: 'Near', duration: 'Focus',
    description: 'Paralyze one creature you can see. Creatures of level 9+ may make a STR check vs. your check at the start of their turn to end it.' },

  { class: 'wizard', tier: 5, name: 'Plane Shift',
    range: 'Close', duration: 'Instant',
    description: 'Transport yourself and all willing creatures within close range to another plane. Without a prior visit, you arrive at a random location on the destination plane.' },

  { class: 'wizard', tier: 5, name: 'Power Word Kill',
    range: 'Near', duration: 'Instant',
    description: 'Utter the Word of Doom. A targeted creature of level 9 or less dies if it hears you. Failed spellcasting checks are treated as critical failures.' },

  { class: 'wizard', tier: 5, name: 'Prismatic Orb',
    range: 'Far', duration: 'Instant',
    description: 'A strobing orb of fire, cold, or electricity (your choice) deals 3d8 damage. Deals double damage if the chosen energy is anathema to the target.' },

  { class: 'wizard', tier: 5, name: 'Scrying',
    range: 'Self', duration: 'Focus',
    description: 'Look into a crystal ball or pool to see and hear a distant creature or location. DC 18 for unfamiliar targets. Targets may make a WIS check each round to notice your observation.' },

  { class: 'wizard', tier: 5, name: 'Shapechange',
    range: 'Self', duration: 'Focus',
    description: 'Transform into any natural creature of level 10 or less you\'ve seen. Gain its physical stats while retaining your own non-physical stats. Revert to 1 HP if you reach 0 HP.' },

  { class: 'wizard', tier: 5, name: 'Summon Extraplanar',
    range: 'Near', duration: 'Focus',
    description: 'Summon an elemental or outsider of level 7 or less under your control. Losing focus causes you to lose control and the creature becomes hostile.' },

  { class: 'wizard', tier: 5, name: 'Teleport',
    range: 'Close', duration: 'Instant',
    description: 'You and willing creatures within close range teleport to a known sigil or previously visited location. Otherwise, 50% chance of arriving off-target.' },

  { class: 'wizard', tier: 5, name: 'Wish',
    range: 'Self', duration: 'Instant',
    description: 'State a single wish as exactly as possible; it occurs as interpreted by the GM. Failed spellcasting checks are treated as critical failures.' },

  // ── Priest — Tier 1 ────────────────────────────────────────────────────

  { class: 'priest', tier: 1, name: 'Cure Wounds',
    range: 'Close', duration: 'Instant',
    description: 'Your touch restores ebbing life. Roll 1 + half your level (rounded down) d6s; one target you touch regains that many HP.' },

  { class: 'priest', tier: 1, name: 'Holy Weapon',
    range: 'Close', duration: '5 rounds',
    description: 'One weapon you touch becomes magical with +1 to attack and damage rolls for the duration.' },

  { class: 'priest', tier: 1, name: 'Light',
    range: 'Close', duration: '1 hour',
    description: 'One touched object glows with bright heatless light, illuminating out to a near distance.' },

  { class: 'priest', tier: 1, name: 'Protection From Evil',
    range: 'Close', duration: 'Focus',
    description: 'Chaotic beings have disadvantage on attacks and hostile spellcasting against the target; they can\'t possess, compel, or beguile it.' },

  { class: 'priest', tier: 1, name: 'Shield of Faith',
    range: 'Self', duration: '5 rounds',
    description: 'A protective force of holy conviction surrounds you. You gain +2 AC for the duration.' },

  { class: 'priest', tier: 1, name: 'Turn Undead',
    range: 'Near', duration: 'Instant',
    description: 'Present a holy symbol. Undead within near must CHA check vs. your spellcasting check. Fail by 10+ and level ≤ yours: destroyed. Otherwise on a fail: flees for 5 rounds.' },

  // ── Priest — Tier 2 ────────────────────────────────────────────────────

  { class: 'priest', tier: 2, name: 'Augury',
    range: 'Self', duration: 'Instant',
    description: 'Ask the GM one question about a course of action. The GM replies "weal" or "woe."' },

  { class: 'priest', tier: 2, name: 'Bless',
    range: 'Close', duration: 'Instant',
    description: 'One creature you touch gains a luck token.' },

  { class: 'priest', tier: 2, name: 'Blind/Deafen',
    range: 'Near', duration: 'Focus',
    description: 'Blind or deafen one creature you can see. It has disadvantage on tasks requiring the lost sense.' },

  { class: 'priest', tier: 2, name: 'Cleansing Weapon',
    range: 'Close', duration: '5 rounds',
    description: 'One touched weapon is wreathed in purifying flames, dealing +1d4 damage (+1d6 vs. undead) for the duration.' },

  { class: 'priest', tier: 2, name: 'Smite',
    range: 'Near', duration: 'Instant',
    description: 'Call down punishing flames on a creature you can see within range; it takes 1d6 damage.' },

  { class: 'priest', tier: 2, name: 'Zone of Truth',
    range: 'Near', duration: 'Focus',
    description: 'A creature you can see can\'t utter a deliberate lie while within range.' },

  // ── Priest — Tier 3 ────────────────────────────────────────────────────

  { class: 'priest', tier: 3, name: 'Command',
    range: 'Far', duration: 'Focus',
    description: 'Issue a one-word verbal command to a creature that can understand you; it obeys while you focus. If the command is directly harmful, the target may CHA check to end it.' },

  { class: 'priest', tier: 3, name: 'Lay To Rest',
    range: 'Close', duration: 'Instant',
    description: 'Instantly destroy an undead creature of level 9 or less that you touch, sending it to its final afterlife.' },

  { class: 'priest', tier: 3, name: 'Mass Cure',
    range: 'Near', duration: 'Instant',
    description: 'All allies within near range regain 2d6 hit points.' },

  { class: 'priest', tier: 3, name: 'Rebuke Unholy',
    range: 'Near', duration: 'Instant',
    description: 'Present a holy symbol. Affected creatures within near must CHA check vs. your check. Fail by 10+ and level ≤ yours: destroyed. Otherwise: flees 5 rounds. Lawful/neutral: affects demons and outsiders. Chaotic: affects angels.' },

  { class: 'priest', tier: 3, name: 'Restoration',
    range: 'Close', duration: 'Instant',
    description: 'End one curse, illness, or affliction of your choice affecting a creature you touch.' },

  { class: 'priest', tier: 3, name: 'Speak With Dead',
    range: 'Close', duration: 'Instant',
    description: 'A dead body you touch answers up to three yes/no questions. Casting more than once in 24 hours escalates failed checks to critical failures.' },

  // ── Priest — Tier 4 ────────────────────────────────────────────────────

  { class: 'priest', tier: 4, name: 'Commune',
    range: 'Self', duration: 'Instant',
    description: 'Ask your god up to three yes/no questions; the GM answers truthfully. Casting more than once in 24 hours escalates failed checks to critical failures.' },

  { class: 'priest', tier: 4, name: 'Control Water',
    range: 'Far', duration: 'Focus',
    description: 'Move and shape a section of water up to 100 feet wide and deep, changing its shape, defying gravity, or redirecting its flow.' },

  { class: 'priest', tier: 4, name: 'Flame Strike',
    range: 'Far', duration: 'Instant',
    description: 'Call down a holy pillar of fire on one creature you can see within range; it takes 2d6 damage.' },

  { class: 'priest', tier: 4, name: 'Pillar of Salt',
    range: 'Near', duration: 'Focus',
    description: 'Turn a creature of level 5 or less you can see into a salt statue. Focusing for 3 consecutive rounds makes the transformation permanent.' },

  { class: 'priest', tier: 4, name: 'Regenerate',
    range: 'Close', duration: 'Focus',
    description: 'A touched creature regains 1d4 HP on your turn each round. This spell also regrows lost body parts.' },

  { class: 'priest', tier: 4, name: 'Wrath',
    range: 'Self', duration: '10 rounds',
    description: 'Your weapons become magical +2 and deal an additional d8 damage for the duration.' },

  // ── Priest — Tier 5 ────────────────────────────────────────────────────

  { class: 'priest', tier: 5, name: 'Divine Vengeance',
    range: 'Self', duration: '10 rounds',
    description: 'Become a divine avatar wreathed in holy flames or dark aura. You can fly a near distance, your weapons are magical, and you have +4 to weapon attacks and damage.' },

  { class: 'priest', tier: 5, name: 'Dominion',
    range: 'Near', duration: '10 rounds',
    description: 'Summon beings with combined levels ≤ 16. Lawful/neutral: angels. Chaotic: demons or devils. They act freely to aid you. Cannot cast again until penance.' },

  { class: 'priest', tier: 5, name: 'Heal',
    range: 'Close', duration: 'Instant',
    description: 'One touched creature is healed to full hit points. Cannot be cast again until after a rest.' },

  { class: 'priest', tier: 5, name: 'Judgment',
    range: 'Close', duration: '5 rounds',
    description: 'Banish a creature of level 10 or less to face your god\'s judgment. Returns in 5 rounds: full HP if deeds pleased; 1 HP if angered; unchanged if unjudged.' },

  { class: 'priest', tier: 5, name: 'Plane Shift',
    range: 'Close', duration: 'Instant',
    description: 'Transport yourself and all willing creatures within close range to another plane. Without a prior visit, you arrive at a random location on the destination plane.' },

  { class: 'priest', tier: 5, name: 'Prophecy',
    range: 'Self', duration: 'Instant',
    description: 'Ask your god one open question; the GM answers truthfully using the knowledge your god possesses. Cannot cast again until penance.' },

];
