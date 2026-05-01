/**
 * Adventure generator data — hooks and site names.
 *
 * Each table is indexed 0–19 for a d20 roll (index = roll - 1).
 */

// Three-column adventure hook table (d20)
export const ADVENTURE_HOOK = {
  detail1: [
    'Rescue the', 'Find the', 'Destroy the', 'Infiltrate the', 'Bypass the',
    'Return the', 'Defeat the', 'Spy on the', 'Bribe the', 'Deliver the',
    'Escape the', 'Imprison the', 'Stop the', 'Befriend the', 'Pacify the',
    'Persuade the', 'Steal the', 'Escort the', 'Banish the', 'Free the',
  ],
  detail2: [
    'Goblet', 'Prisoner', 'Sword', 'Vault', 'Cult',
    'Spirit', 'Killer', 'Demon', 'Noble', 'Hunter',
    'Hostage', 'Thief', 'Spy', 'Werewolf', 'Relic',
    'High priest', 'Merchant', 'Witch', 'Ritual', 'Vampire',
  ],
  detail3: [
    'Of the evil wizard', 'Stalking the wastes', 'At the bottom of the river',
    'In the city sewers', 'Under the barrow mounds', 'Of the fallen hero',
    'In the magical library', "In the king's court", 'Of the ancient lineage',
    "In the sorcerer's tower", 'In the Murkwood', 'Hiding in the slums',
    'Of the Dwarven lord', 'In the musty tomb', 'Of the royal knights',
    'Sacrificing innocents', 'In the catacombs', 'Blackmailing the baron',
    "In the Thieves' Guild", 'Murdering townsfolk',
  ],
};

// Three-column adventuring site name table (d20)
export const SITE_NAME = {
  name1: [
    'Mines of the', 'Abbey of the', 'Tower of the', 'Caves of the', 'Barrow of the',
    'Warrens of the', 'Crypt of the', 'Monastery of the', 'Ruin of the', 'Tunnels of the',
    'Citadel of the', 'Tomb of the', 'Castle of the', 'Temple of the', 'Fortress of the',
    'Isle of the', 'Keep of the', 'Dungeon of the', 'Necropolis of the', 'Shrine of the',
  ],
  name2: [
    'Cursed', 'Whispering', 'Bleeding', 'Shrouded', 'Lost',
    'Dead', 'Deepwood', 'Fallen', 'Revenant', 'Frozen',
    'Shimmering', 'Chaos', 'Abandoned', 'Blighted', 'Forgotten',
    'Slumbering', 'Savage', 'Unholy', 'Enchanted', 'Immortal',
  ],
  name3: [
    'Flame', 'Ghost', 'Darkness', 'Peak', 'Borderlands',
    'King', 'Twilight', 'Depths', 'Jewel', 'God',
    'Lands', 'Storm', 'Swamp', 'Ravine', 'Valley',
    'Horde', 'Skull', 'Queen', 'Wastes', 'Hero',
  ],
};
