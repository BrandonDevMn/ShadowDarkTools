/**
 * Render functions for each Library section.
 *
 * Each function receives the page container (which already holds the back
 * button and section title added by library-page.js) and appends the
 * section's content below. Returns true on success.
 */

import { renderSpellsList } from './spells-list.js';
import { ANCESTRIES }       from './ancestries-data.js';
import { CLASSES }          from './classes-data.js';
import { BACKGROUNDS }      from './backgrounds-data.js';
import { EQUIPMENT }        from './equipment-data.js';

// ── Ability score definitions — small enough to live inline ────────────────

const ABILITY_SCORES = [
  { name: 'Strength (STR)',     description: 'Physical power. Used for melee attacks, breaking things, and carrying gear.' },
  { name: 'Dexterity (DEX)',    description: 'Agility and reflexes. Used for ranged attacks, armor class, and sneaking.' },
  { name: 'Constitution (CON)', description: 'Endurance and vitality. Determines bonus hit points and stamina.' },
  { name: 'Intelligence (INT)', description: 'Reasoning and memory. Used for wizard spellcasting checks and recalling lore.' },
  { name: 'Wisdom (WIS)',       description: 'Perception and willpower. Used for priest spellcasting checks and awareness.' },
  { name: 'Charisma (CHA)',     description: 'Personality and presence. Used for persuasion, intimidation, and reaction rolls.' },
];

// ── Alignments — three in Shadowdark ──────────────────────────────────────

const ALIGNMENTS = [
  { name: 'Lawful',  description: 'You believe in order, duty, and the rule of law. You keep your word even when it costs you.' },
  { name: 'Neutral', description: 'You walk between order and chaos, guided by pragmatism, nature, or personal loyalty over ideology.' },
  { name: 'Chaotic', description: 'You embrace freedom, change, and personal power. Rules are tools, not masters.' },
];

// ── Languages spoken in the Shadowdark world ──────────────────────────────

const LANGUAGES = [
  { name: 'Common',    description: 'Spoken by most humans and civilized folk across the known world.' },
  { name: 'Elvish',    description: 'A musical, flowing tongue used by elves and some ancient arcane texts.' },
  { name: 'Dwarvish',  description: 'A guttural, percussive language spoken by dwarves and carved into stone.' },
  { name: 'Halfling',  description: 'A quiet, whispered dialect used among small folk.' },
  { name: 'Goblin',    description: 'A hissing, clipped tongue shared by goblins, kobolds, and their kin.' },
  { name: 'Orcish',    description: 'A harsh battle-language used among orcs and some half-orcs.' },
  { name: 'Draconic',  description: 'The ancient tongue of dragons, found in spells and arcane formulae.' },
  { name: 'Celestial', description: 'The language of angels and divine beings; used in holy rites.' },
  { name: 'Sylvan',    description: 'The tongue of fey creatures and nature spirits.' },
];

// ── Shared helpers ─────────────────────────────────────────────────────────

/**
 * Creates a simple reference card element from name, optional meta line,
 * and description text.
 */
function makeReferenceCard(name, meta, description) {
  const card = document.createElement('div');
  card.className = 'reference-card';

  const nameEl = document.createElement('div');
  nameEl.className = 'reference-card__name';
  nameEl.textContent = name;
  card.appendChild(nameEl);

  if (meta) {
    const metaEl = document.createElement('div');
    metaEl.className = 'reference-card__meta';
    metaEl.textContent = meta;
    card.appendChild(metaEl);
  }

  const descEl = document.createElement('p');
  descEl.className = 'reference-card__description';
  descEl.textContent = description;
  card.appendChild(descEl);

  return card;
}

/**
 * Creates a section sub-header (e.g. "Weapons", "Armor") within a section.
 */
function makeSectionHeader(text) {
  const header = document.createElement('h2');
  header.className = 'reference-section-header';
  header.textContent = text;
  return header;
}

// ── Section render functions ───────────────────────────────────────────────

/**
 * Delegates to the spells list component, which handles its own filter UI
 * and tier-grouped card layout.
 */
export function renderSpellsSection(container) {
  return renderSpellsList(container);
}

/**
 * Renders a card for each ancestry, showing the trait name and its effect.
 */
export function renderAncestriesSection(container) {
  const list = document.createElement('div');
  list.className = 'reference-list';

  ANCESTRIES.forEach((ancestry) => {
    list.appendChild(
      makeReferenceCard(ancestry.name, ancestry.traitName, ancestry.traitDescription)
    );
  });

  container.appendChild(list);
}

/**
 * Renders a card for each class showing hit die, gear proficiencies, and
 * a list of class abilities.
 */
export function renderClassesSection(container) {
  const list = document.createElement('div');
  list.className = 'reference-list';

  CLASSES.forEach((cls) => {
    const card = document.createElement('div');
    card.className = 'reference-card';

    const nameEl = document.createElement('div');
    nameEl.className = 'reference-card__name';
    nameEl.textContent = cls.name;
    card.appendChild(nameEl);

    const metaEl = document.createElement('div');
    metaEl.className = 'reference-card__meta';
    metaEl.textContent = `HD ${cls.hitDie} · ${cls.armor}`;
    card.appendChild(metaEl);

    const descEl = document.createElement('p');
    descEl.className = 'reference-card__description';
    descEl.textContent = cls.description;
    card.appendChild(descEl);

    // Each class ability as an indented sub-item
    cls.abilities.forEach((ability) => {
      const abilityEl = document.createElement('div');
      abilityEl.className = 'reference-card__ability';

      const abilityName = document.createElement('span');
      abilityName.className = 'reference-card__ability-name';
      abilityName.textContent = ability.name + ': ';
      abilityEl.appendChild(abilityName);

      const abilityDesc = document.createElement('span');
      abilityDesc.className = 'reference-card__ability-description';
      abilityDesc.textContent = ability.description;
      abilityEl.appendChild(abilityDesc);

      card.appendChild(abilityEl);
    });

    list.appendChild(card);
  });

  container.appendChild(list);
}

/**
 * Renders all six ability score definitions as simple reference cards.
 */
export function renderAbilityScoresSection(container) {
  const list = document.createElement('div');
  list.className = 'reference-list';

  ABILITY_SCORES.forEach((score) => {
    list.appendChild(makeReferenceCard(score.name, null, score.description));
  });

  container.appendChild(list);
}

/**
 * Renders the d20 background table. Players roll 1d20 at character creation
 * to determine their starting background and equipment.
 */
export function renderBackgroundsSection(container) {
  const intro = document.createElement('p');
  intro.className = 'reference-card__description';
  intro.textContent = 'Roll 1d20 at character creation to determine your background.';
  container.appendChild(intro);

  const list = document.createElement('div');
  list.className = 'reference-list';

  BACKGROUNDS.forEach((bg) => {
    list.appendChild(
      makeReferenceCard(`${bg.roll}. ${bg.name}`, null, bg.description)
    );
  });

  container.appendChild(list);
}

/**
 * Renders the three alignments available in Shadowdark.
 */
export function renderAlignmentsSection(container) {
  const list = document.createElement('div');
  list.className = 'reference-list';

  ALIGNMENTS.forEach((alignment) => {
    list.appendChild(makeReferenceCard(alignment.name, null, alignment.description));
  });

  container.appendChild(list);
}

/**
 * Renders the languages available in the Shadowdark world.
 */
export function renderLanguagesSection(container) {
  const list = document.createElement('div');
  list.className = 'reference-list';

  LANGUAGES.forEach((lang) => {
    list.appendChild(makeReferenceCard(lang.name, null, lang.description));
  });

  container.appendChild(list);
}

/**
 * Renders equipment grouped by category: Weapons, Armor, then Gear.
 * Weapons show damage and range; armor shows armor class; gear shows notes.
 */
export function renderEquipmentSection(container) {
  const categories = [
    { key: 'weapon', label: 'Weapons' },
    { key: 'armor',  label: 'Armor'   },
    { key: 'gear',   label: 'Gear'    },
  ];

  categories.forEach(({ key, label }) => {
    const items = EQUIPMENT.filter((item) => item.category === key);
    if (items.length === 0) return;

    container.appendChild(makeSectionHeader(label));

    const list = document.createElement('div');
    list.className = 'reference-list';

    items.forEach((item) => {
      let meta;
      if (key === 'weapon') {
        meta = `${item.cost} · ${item.damage} · ${item.range}`;
      } else if (key === 'armor') {
        meta = `${item.cost} · ${item.armorClass}`;
      } else {
        meta = item.cost;
      }

      list.appendChild(makeReferenceCard(item.name, meta, item.notes));
    });

    container.appendChild(list);
  });
}
