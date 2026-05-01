/**
 * Library page — two-level navigation shell (three levels for GM Tools group).
 *
 * On first render the user sees a flat list of reference sections plus one
 * "GM Tools" group entry. Tapping a section drills in to its content and shows
 * a back button that returns to the list. Tapping "GM Tools" shows a sub-list
 * of GM sections; tapping one of those drills into its content with a back
 * button that returns to the GM Tools sub-list.
 *
 * All navigation is done by clearing and re-rendering the container so there
 * is no hidden state scattered across the DOM.
 */

import {
  renderSpellsSection,
  renderAncestriesSection,
  renderClassesSection,
  renderAbilityScoresSection,
  renderBackgroundsSection,
  renderAlignmentsSection,
  renderLanguagesSection,
  renderEquipmentSection,
  renderCoreMechanicSection,
  renderCombatSection,
  renderAdvancementSection,
  renderSpellcastingSection,
  renderLightAndDarknessSection,
  renderRestingSection,
  renderDeathAndDyingSection,
  renderStealthAndSurpriseSection,
  renderLuckTokensSection,
  renderTitlesSection,
  renderDeitiesSection,
  renderRandomCharacterGenerationSection,
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
} from './library-sections.js';

// ── GM sub-sections ────────────────────────────────────────────────────────

const GM_SECTIONS = [
  { id: 'running-the-game',    label: 'Running the Game',    render: renderRunningTheGameSection    },
  { id: 'monsters',            label: 'Monsters',            render: renderMonstersSection          },
  { id: 'magic-items',         label: 'Magic Items',         render: renderMagicItemsSection        },
  { id: 'treasure',            label: 'Treasure',            render: renderTreasureSection          },
  { id: 'npcs-and-reactions',  label: 'NPCs & Reactions',    render: renderNpcsAndReactionsSection  },
  { id: 'adventure-generator', label: 'Adventure Generator', render: renderAdventureGeneratorSection},
  { id: 'overland-travel',     label: 'Overland Travel',     render: renderOverlandTravelSection    },
  { id: 'encounter-tables',    label: 'Encounter Tables',    render: renderEncounterTablesSection   },
  { id: 'settlements',         label: 'Settlements',         render: renderSettlementsSection       },
  { id: 'random-events',       label: 'Random Events',       render: renderRandomEventsSection      },
  { id: 'rumors',              label: 'Rumors',              render: renderRumorsSection            },
];

// ── Top-level sections (player-facing + one GM group) ─────────────────────

const SECTIONS = [
  { id: 'spells',                    label: 'Spells',                      render: renderSpellsSection                    },
  { id: 'ancestries',                label: 'Ancestries',                  render: renderAncestriesSection                },
  { id: 'classes',                   label: 'Classes',                     render: renderClassesSection                   },
  { id: 'ability-scores',            label: 'Ability Scores',              render: renderAbilityScoresSection             },
  { id: 'backgrounds',               label: 'Backgrounds',                 render: renderBackgroundsSection               },
  { id: 'alignments',                label: 'Alignments',                  render: renderAlignmentsSection                },
  { id: 'languages',                 label: 'Languages',                   render: renderLanguagesSection                 },
  { id: 'equipment',                 label: 'Equipment',                   render: renderEquipmentSection                 },
  { id: 'core-mechanic',             label: 'Core Mechanic',               render: renderCoreMechanicSection              },
  { id: 'combat',                    label: 'Combat',                      render: renderCombatSection                    },
  { id: 'advancement',               label: 'Advancement',                 render: renderAdvancementSection               },
  { id: 'spellcasting',              label: 'Spellcasting',                render: renderSpellcastingSection              },
  { id: 'light-and-darkness',        label: 'Light & Darkness',            render: renderLightAndDarknessSection          },
  { id: 'resting',                   label: 'Resting',                     render: renderRestingSection                   },
  { id: 'death-and-dying',           label: 'Death & Dying',               render: renderDeathAndDyingSection             },
  { id: 'stealth-and-surprise',      label: 'Stealth & Surprise',          render: renderStealthAndSurpriseSection        },
  { id: 'luck-tokens',               label: 'Luck Tokens',                 render: renderLuckTokensSection                },
  { id: 'titles',                    label: 'Titles',                      render: renderTitlesSection                    },
  { id: 'deities',                   label: 'Deities',                     render: renderDeitiesSection                   },
  { id: 'random-character-generation', label: 'Random Character Gen',      render: renderRandomCharacterGenerationSection },
  { id: 'gm-tools',                  label: 'GM Tools',                   sections: GM_SECTIONS                          },
];

/**
 * Mounts the Library page into the given container and shows the section list.
 *
 * Returns true on success, false if container is not a valid Element.
 *
 * @param {Element|null|undefined} container
 * @returns {boolean}
 */
export function renderLibraryPage(container) {
  if (!container || !(container instanceof Element)) {
    return false;
  }

  showSectionList();
  return true;

  // ── Navigation helpers ────────────────────────────────────────────────────

  function buildNavRow(section, onClick) {
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'library-nav__row';
    row.dataset.section = section.id;

    const labelEl = document.createElement('span');
    labelEl.className = 'library-nav__row-label';
    labelEl.textContent = section.label;

    const indicatorEl = document.createElement('span');
    indicatorEl.className = 'library-nav__row-indicator';
    indicatorEl.textContent = '›';

    row.appendChild(labelEl);
    row.appendChild(indicatorEl);
    row.addEventListener('click', onClick);
    return row;
  }

  function buildBackButton(label, onClick) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'library-back-btn';
    btn.textContent = '‹ ' + label;
    btn.addEventListener('click', onClick);
    return btn;
  }

  function buildPageTitle(text) {
    const title = document.createElement('h1');
    title.className = 'page-title';
    title.textContent = text;
    return title;
  }

  function showSectionList() {
    container.innerHTML = '';
    container.appendChild(buildPageTitle('Library'));

    const nav = document.createElement('nav');
    nav.className = 'library-nav';

    SECTIONS.forEach((section) => {
      nav.appendChild(
        buildNavRow(section, () => showSection(section))
      );
    });

    container.appendChild(nav);
  }

  function showSection(section) {
    if (section.sections) {
      showGroupList(section);
    } else {
      showSectionContent(section, showSectionList, 'Library');
    }
  }

  function showGroupList(group) {
    container.innerHTML = '';
    container.appendChild(buildBackButton('Library', showSectionList));
    container.appendChild(buildPageTitle(group.label));

    const nav = document.createElement('nav');
    nav.className = 'library-nav';

    group.sections.forEach((sub) => {
      nav.appendChild(
        buildNavRow(sub, () => showSectionContent(sub, () => showGroupList(group), group.label))
      );
    });

    container.appendChild(nav);
  }

  function showSectionContent(section, onBack, backLabel) {
    container.innerHTML = '';
    container.appendChild(buildBackButton(backLabel, onBack));
    container.appendChild(buildPageTitle(section.label));
    section.render(container);
  }
}
