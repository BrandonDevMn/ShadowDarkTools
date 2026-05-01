/**
 * Section descriptors for all 31 Library sections.
 *
 * Player sections are defined here. Rules, character, and GM sections are
 * imported from their respective files. The SECTIONS export is the single
 * source of truth for library-page.js.
 */

import { SPELLS }      from './spells-data.js';
import { ANCESTRIES }  from './ancestries-data.js';
import { CLASSES }     from './classes-data.js';
import { BACKGROUNDS } from './backgrounds-data.js';
import { EQUIPMENT }   from './equipment-data.js';
import { makeReferenceCard, makeSectionHeader, makeTable, makeReferenceList } from './library-helpers.js';

import {
  coreMechanicSection,
  combatSection,
  advancementSection,
  spellcastingSection,
  lightAndDarknessSection,
  restingSection,
  deathAndDyingSection,
  stealthAndSurpriseSection,
  luckTokensSection,
} from './library-sections-rules.js';

import {
  titlesSection,
  deitiesSection,
  randomCharacterGenerationSection,
} from './library-sections-character.js';

import {
  runningTheGameSection,
  monstersSection,
  magicItemsSection,
  treasureSection,
  npcsAndReactionsSection,
  adventureGeneratorSection,
  overlandTravelSection,
  encounterTablesSection,
  randomEventsSection,
  rumorsSection,
  settlementsSection,
} from './library-sections-gm.js';

// ── Spells ─────────────────────────────────────────────────────────────────

function spellId(spell) {
  return `${spell.class}-${spell.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}

const SPELL_ITEMS = [...SPELLS]
  .map((s) => ({
    id:       spellId(s),
    label:    s.name,
    sublabel: `${s.class === 'wizard' ? 'Wizard' : 'Priest'} T${s.tier}`,
  }))
  .sort((a, b) => a.label.localeCompare(b.label) || a.sublabel.localeCompare(b.sublabel));

export const spellsSection = {
  id: 'spells',
  label: 'Spells',
  items: SPELL_ITEMS,
  renderDetail(container, itemId) {
    const spell = SPELLS.find((s) => spellId(s) === itemId);
    if (!spell) return;
    const list = makeReferenceList();
    const card = document.createElement('div');
    card.className = 'reference-card';
    const nameEl = document.createElement('div');
    nameEl.className = 'reference-card__name';
    nameEl.textContent = spell.name;
    const metaEl = document.createElement('div');
    metaEl.className = 'reference-card__meta';
    metaEl.textContent = `${spell.class === 'wizard' ? 'Wizard' : 'Priest'} T${spell.tier} · ${spell.range} · ${spell.duration}`;
    const descEl = document.createElement('p');
    descEl.className = 'reference-card__description';
    descEl.textContent = spell.description;
    card.appendChild(nameEl);
    card.appendChild(metaEl);
    card.appendChild(descEl);
    list.appendChild(card);
    container.appendChild(list);
  },
};

// ── Ancestries ─────────────────────────────────────────────────────────────

const ANCESTRY_ITEMS = [...ANCESTRIES]
  .map((a) => ({
    id:       a.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    label:    a.name,
    sublabel: a.traitName,
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

export const ancestriesSection = {
  id: 'ancestries',
  label: 'Ancestries',
  items: ANCESTRY_ITEMS,
  renderDetail(container, itemId) {
    const ancestry = ANCESTRIES.find(
      (a) => a.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === itemId
    );
    if (!ancestry) return;
    const list = makeReferenceList();
    list.appendChild(makeReferenceCard(ancestry.name, ancestry.traitName, ancestry.traitDescription));
    const descEl = document.createElement('p');
    descEl.className = 'reference-card__description';
    descEl.textContent = ancestry.description;
    container.appendChild(descEl);
    container.appendChild(list);
  },
};

// ── Classes ────────────────────────────────────────────────────────────────

const CLASS_ITEMS = [...CLASSES]
  .map((cls) => ({
    id:       cls.name.toLowerCase(),
    label:    cls.name,
    sublabel: `HD ${cls.hitDie}`,
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

export const classesSection = {
  id: 'classes',
  label: 'Classes',
  items: CLASS_ITEMS,
  renderDetail(container, itemId) {
    const cls = CLASSES.find((c) => c.name.toLowerCase() === itemId);
    if (!cls) return;
    const list = makeReferenceList();
    const card = document.createElement('div');
    card.className = 'reference-card';

    const nameEl = document.createElement('div');
    nameEl.className = 'reference-card__name';
    nameEl.textContent = cls.name;

    const metaEl = document.createElement('div');
    metaEl.className = 'reference-card__meta';
    metaEl.textContent = `HD ${cls.hitDie} · ${cls.armor}`;

    const descEl = document.createElement('p');
    descEl.className = 'reference-card__description';
    descEl.textContent = cls.description;

    card.appendChild(nameEl);
    card.appendChild(metaEl);
    card.appendChild(descEl);

    cls.abilities.forEach((ability) => {
      const el = document.createElement('div');
      el.className = 'reference-card__ability';
      const abilityName = document.createElement('span');
      abilityName.className = 'reference-card__ability-name';
      abilityName.textContent = `${ability.name}: `;
      const abilityDesc = document.createElement('span');
      abilityDesc.className = 'reference-card__ability-description';
      abilityDesc.textContent = ability.description;
      el.appendChild(abilityName);
      el.appendChild(abilityDesc);
      card.appendChild(el);
    });

    list.appendChild(card);
    container.appendChild(list);
  },
};

// ── Ability Scores ─────────────────────────────────────────────────────────

const ABILITY_SCORES = [
  { id: 'cha', label: 'Charisma (CHA)',     description: 'Personality and presence. Used for persuasion, intimidation, and reaction rolls.' },
  { id: 'con', label: 'Constitution (CON)', description: 'Endurance and vitality. Determines bonus hit points and stamina.' },
  { id: 'dex', label: 'Dexterity (DEX)',    description: 'Agility and reflexes. Used for ranged attacks, armor class, and sneaking.' },
  { id: 'int', label: 'Intelligence (INT)', description: 'Reasoning and memory. Used for wizard spellcasting checks and recalling lore.' },
  { id: 'str', label: 'Strength (STR)',     description: 'Physical power. Used for melee attacks, breaking things, and carrying gear.' },
  { id: 'wis', label: 'Wisdom (WIS)',       description: 'Perception and willpower. Used for priest spellcasting checks and awareness.' },
];

export const abilityScoresSection = {
  id: 'ability-scores',
  label: 'Ability Scores',
  items: ABILITY_SCORES.map(({ id, label }) => ({ id, label })),
  renderDetail(container, itemId) {
    const score = ABILITY_SCORES.find((s) => s.id === itemId);
    if (!score) return;
    const list = makeReferenceList();
    list.appendChild(makeReferenceCard(score.label, null, score.description));
    container.appendChild(list);
  },
};

// ── Backgrounds ────────────────────────────────────────────────────────────

const BACKGROUND_ITEMS = [...BACKGROUNDS]
  .map((bg) => ({
    id:       bg.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    label:    bg.name,
    sublabel: `d20: ${bg.roll}`,
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

export const backgroundsSection = {
  id: 'backgrounds',
  label: 'Backgrounds',
  items: BACKGROUND_ITEMS,
  renderDetail(container, itemId) {
    const bg = BACKGROUNDS.find(
      (b) => b.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === itemId
    );
    if (!bg) return;
    const list = makeReferenceList();
    list.appendChild(makeReferenceCard(`${bg.roll}. ${bg.name}`, null, bg.description));
    container.appendChild(list);
  },
};

// ── Alignments ─────────────────────────────────────────────────────────────

const ALIGNMENTS = [
  { id: 'chaotic', label: 'Chaotic', description: 'Chaotic characters align themselves with destruction, ambition, and wickedness. They adopt a "survival of the fittest" mentality.' },
  { id: 'lawful',  label: 'Lawful',  description: 'Lawful characters align themselves with fairness, order, and virtue. They operate from a "good of the whole" mentality.' },
  { id: 'neutral', label: 'Neutral', description: 'Neutral characters find balance between Law and Chaos. They align with the cycle of growth and decline, adopting a "nature must take its course" mentality.' },
];

export const alignmentsSection = {
  id: 'alignments',
  label: 'Alignments',
  items: ALIGNMENTS.map(({ id, label }) => ({ id, label })),
  renderDetail(container, itemId) {
    const alignment = ALIGNMENTS.find((a) => a.id === itemId);
    if (!alignment) return;
    const list = makeReferenceList();
    list.appendChild(makeReferenceCard(alignment.label, null, alignment.description));
    container.appendChild(list);
  },
};

// ── Languages ──────────────────────────────────────────────────────────────

const LANGUAGES = [
  { id: 'celestial',  label: 'Celestial',  sublabel: 'Rare',   description: 'Spoken by angels.' },
  { id: 'common',     label: 'Common',     sublabel: 'Common', description: 'Spoken by most humanoids.' },
  { id: 'diabolic',   label: 'Diabolic',   sublabel: 'Rare',   description: 'Spoken by demons and devils.' },
  { id: 'draconic',   label: 'Draconic',   sublabel: 'Rare',   description: 'Spoken by dragons.' },
  { id: 'dwarvish',   label: 'Dwarvish',   sublabel: 'Common', description: 'Spoken by dwarves.' },
  { id: 'elvish',     label: 'Elvish',     sublabel: 'Common', description: 'Spoken by elves.' },
  { id: 'giant',      label: 'Giant',      sublabel: 'Common', description: 'Spoken by giants, ogres, and trolls.' },
  { id: 'goblin',     label: 'Goblin',     sublabel: 'Common', description: 'Spoken by bugbears, goblins, and hobgoblins.' },
  { id: 'merran',     label: 'Merran',     sublabel: 'Common', description: 'Spoken by merfolk, sahuagin, and sirens.' },
  { id: 'orcish',     label: 'Orcish',     sublabel: 'Common', description: 'Spoken by orcs.' },
  { id: 'primordial', label: 'Primordial', sublabel: 'Rare',   description: 'Spoken by elder things and elementals.' },
  { id: 'reptilian',  label: 'Reptilian',  sublabel: 'Common', description: 'Spoken by lizardfolk and viperians.' },
  { id: 'sylvan',     label: 'Sylvan',     sublabel: 'Common', description: 'Spoken by centaurs, dryads, and faeries.' },
  { id: 'thanian',    label: 'Thanian',    sublabel: 'Common', description: 'Spoken by minotaurs, beastmen, and manticores.' },
];

export const languagesSection = {
  id: 'languages',
  label: 'Languages',
  items: LANGUAGES.map(({ id, label, sublabel }) => ({ id, label, sublabel })),
  renderDetail(container, itemId) {
    const lang = LANGUAGES.find((l) => l.id === itemId);
    if (!lang) return;
    const list = makeReferenceList();
    list.appendChild(makeReferenceCard(lang.label, lang.sublabel, lang.description));
    container.appendChild(list);
  },
};

// ── Equipment ──────────────────────────────────────────────────────────────

const EQUIPMENT_CATEGORIES = [
  { id: 'armor',   label: 'Armor',   key: 'armor'  },
  { id: 'gear',    label: 'Gear',    key: 'gear'   },
  { id: 'weapons', label: 'Weapons', key: 'weapon' },
];

export const equipmentSection = {
  id: 'equipment',
  label: 'Equipment',
  items: EQUIPMENT_CATEGORIES.map(({ id, label }) => ({ id, label })),
  renderDetail(container, itemId) {
    const cat = EQUIPMENT_CATEGORIES.find((c) => c.id === itemId);
    if (!cat) return;
    container.appendChild(makeSectionHeader(cat.label));
    const items = EQUIPMENT.filter((item) => item.category === cat.key);
    const list = makeReferenceList();
    items.forEach((item) => {
      let meta;
      if (cat.key === 'weapon') {
        meta = `${item.cost} · ${item.damage} · ${item.range}`;
      } else if (cat.key === 'armor') {
        meta = `${item.cost} · ${item.armorClass}`;
      } else {
        meta = item.cost;
      }
      list.appendChild(makeReferenceCard(item.name, meta, item.notes));
    });
    container.appendChild(list);
  },
};

// ── All 31 sections, sorted alphabetically by label ────────────────────────

export const SECTIONS = [
  abilityScoresSection,
  advancementSection,
  adventureGeneratorSection,
  alignmentsSection,
  ancestriesSection,
  backgroundsSection,
  classesSection,
  combatSection,
  coreMechanicSection,
  deathAndDyingSection,
  deitiesSection,
  encounterTablesSection,
  equipmentSection,
  languagesSection,
  lightAndDarknessSection,
  luckTokensSection,
  magicItemsSection,
  monstersSection,
  npcsAndReactionsSection,
  overlandTravelSection,
  randomCharacterGenerationSection,
  randomEventsSection,
  restingSection,
  rumorsSection,
  runningTheGameSection,
  settlementsSection,
  spellcastingSection,
  spellsSection,
  stealthAndSurpriseSection,
  titlesSection,
  treasureSection,
].sort((a, b) => a.label.localeCompare(b.label));
