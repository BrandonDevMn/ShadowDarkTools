/**
 * Render functions for each Library section.
 *
 * Each function receives the page container and appends the section's content
 * below any heading or back button already added by library-page.js.
 *
 * Player sections are implemented here (Spells, Ancestries, Classes,
 * Ability Scores, Backgrounds, Alignments, Languages, Equipment).
 *
 * Additional player rules sections are re-exported from library-sections-rules.js.
 * Character creation sections are re-exported from library-sections-character.js.
 * GM tools sections are re-exported from library-sections-gm.js.
 */

import { renderSpellsList } from './spells-list.js';
import { ANCESTRIES }       from './ancestries-data.js';
import { CLASSES }          from './classes-data.js';
import { BACKGROUNDS }      from './backgrounds-data.js';
import { EQUIPMENT }        from './equipment-data.js';
import {
  makeReferenceCard,
  makeSectionHeader,
  makeReferenceList,
} from './library-helpers.js';

// ── Re-exports: player rules sections ─────────────────────────────────────
export {
  renderCoreMechanicSection,
  renderCombatSection,
  renderAdvancementSection,
  renderSpellcastingSection,
  renderLightAndDarknessSection,
  renderRestingSection,
  renderDeathAndDyingSection,
  renderStealthAndSurpriseSection,
  renderLuckTokensSection,
} from './library-sections-rules.js';

// ── Re-exports: character creation sections ────────────────────────────────
export {
  renderTitlesSection,
  renderDeitiesSection,
  renderRandomCharacterGenerationSection,
} from './library-sections-character.js';

// ── Re-exports: GM tools sections ─────────────────────────────────────────
export {
  renderRunningTheGameSection,
  renderMonstersSection,
  renderMagicItemsSection,
  renderTreasureSection,
  renderNpcsAndReactionsSection,
  renderAdventureGeneratorSection,
  renderOverlandTravelSection,
  renderEncounterTablesSection,
  renderRandomEventsSection,
  renderRumorsSection,
  renderSettlementsSection,
} from './library-sections-gm.js';

// ── Ability score definitions ──────────────────────────────────────────────

const ABILITY_SCORES = [
  { name: 'Strength (STR)',     description: 'Physical power. Used for melee attacks, breaking things, and carrying gear.' },
  { name: 'Dexterity (DEX)',    description: 'Agility and reflexes. Used for ranged attacks, armor class, and sneaking.' },
  { name: 'Constitution (CON)', description: 'Endurance and vitality. Determines bonus hit points and stamina.' },
  { name: 'Intelligence (INT)', description: 'Reasoning and memory. Used for wizard spellcasting checks and recalling lore.' },
  { name: 'Wisdom (WIS)',       description: 'Perception and willpower. Used for priest spellcasting checks and awareness.' },
  { name: 'Charisma (CHA)',     description: 'Personality and presence. Used for persuasion, intimidation, and reaction rolls.' },
];

// ── Alignments ─────────────────────────────────────────────────────────────

const ALIGNMENTS = [
  { name: 'Lawful',  description: 'Lawful characters align themselves with fairness, order, and virtue. They operate from a "good of the whole" mentality.' },
  { name: 'Neutral', description: 'Neutral characters find balance between Law and Chaos. They align with the cycle of growth and decline, adopting a "nature must take its course" mentality.' },
  { name: 'Chaotic', description: 'Chaotic characters align themselves with destruction, ambition, and wickedness. They adopt a "survival of the fittest" mentality.' },
];

// ── Common languages ───────────────────────────────────────────────────────

const COMMON_LANGUAGES = [
  { name: 'Common',    description: 'Spoken by most humanoids.' },
  { name: 'Dwarvish',  description: 'Spoken by dwarves.' },
  { name: 'Elvish',    description: 'Spoken by elves.' },
  { name: 'Giant',     description: 'Spoken by giants, ogres, and trolls.' },
  { name: 'Goblin',    description: 'Spoken by bugbears, goblins, and hobgoblins.' },
  { name: 'Merran',    description: 'Spoken by merfolk, sahuagin, and sirens.' },
  { name: 'Orcish',    description: 'Spoken by orcs.' },
  { name: 'Reptilian', description: 'Spoken by lizardfolk and viperians.' },
  { name: 'Sylvan',    description: 'Spoken by centaurs, dryads, and faeries.' },
  { name: 'Thanian',   description: 'Spoken by minotaurs, beastmen, and manticores.' },
];

// ── Rare languages ─────────────────────────────────────────────────────────

const RARE_LANGUAGES = [
  { name: 'Celestial',  description: 'Spoken by angels.' },
  { name: 'Diabolic',   description: 'Spoken by demons and devils.' },
  { name: 'Draconic',   description: 'Spoken by dragons.' },
  { name: 'Primordial', description: 'Spoken by elder things and elementals.' },
];

// ── Section render functions ───────────────────────────────────────────────

export function renderSpellsSection(container) {
  return renderSpellsList(container);
}

export function renderAncestriesSection(container) {
  const list = makeReferenceList();
  ANCESTRIES.forEach((ancestry) => {
    list.appendChild(makeReferenceCard(ancestry.name, ancestry.traitName, ancestry.traitDescription));
  });
  container.appendChild(list);
}

export function renderClassesSection(container) {
  const list = makeReferenceList();

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

export function renderAbilityScoresSection(container) {
  const list = makeReferenceList();
  ABILITY_SCORES.forEach((score) => {
    list.appendChild(makeReferenceCard(score.name, null, score.description));
  });
  container.appendChild(list);
}

export function renderBackgroundsSection(container) {
  const intro = document.createElement('p');
  intro.className = 'reference-card__description';
  intro.textContent = 'Roll 1d20 at character creation to determine your background.';
  container.appendChild(intro);

  const list = makeReferenceList();
  BACKGROUNDS.forEach((bg) => {
    list.appendChild(makeReferenceCard(`${bg.roll}. ${bg.name}`, null, bg.description));
  });
  container.appendChild(list);
}

export function renderAlignmentsSection(container) {
  const list = makeReferenceList();
  ALIGNMENTS.forEach((alignment) => {
    list.appendChild(makeReferenceCard(alignment.name, null, alignment.description));
  });
  container.appendChild(list);
}

export function renderLanguagesSection(container) {
  container.appendChild(makeSectionHeader('Common Languages'));
  const commonList = makeReferenceList();
  COMMON_LANGUAGES.forEach((lang) => {
    commonList.appendChild(makeReferenceCard(lang.name, null, lang.description));
  });
  container.appendChild(commonList);

  container.appendChild(makeSectionHeader('Rare Languages'));
  const rareList = makeReferenceList();
  RARE_LANGUAGES.forEach((lang) => {
    rareList.appendChild(makeReferenceCard(lang.name, null, lang.description));
  });
  container.appendChild(rareList);
}

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

    const list = makeReferenceList();
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
