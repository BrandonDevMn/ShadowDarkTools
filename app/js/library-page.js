/**
 * Library page — two-level navigation shell.
 *
 * On first render the user sees a flat list of all reference sections. Tapping
 * a section drills in to its content and shows a back button that returns to
 * the list. All navigation is done by clearing and re-rendering the container
 * so there is no hidden state scattered across the DOM.
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

const SECTIONS = [
  { id: 'ability-scores',              label: 'Ability Scores',           render: renderAbilityScoresSection             },
  { id: 'advancement',                 label: 'Advancement',              render: renderAdvancementSection               },
  { id: 'adventure-generator',         label: 'Adventure Generator',      render: renderAdventureGeneratorSection        },
  { id: 'alignments',                  label: 'Alignments',               render: renderAlignmentsSection                },
  { id: 'ancestries',                  label: 'Ancestries',               render: renderAncestriesSection                },
  { id: 'backgrounds',                 label: 'Backgrounds',              render: renderBackgroundsSection               },
  { id: 'classes',                     label: 'Classes',                  render: renderClassesSection                   },
  { id: 'combat',                      label: 'Combat',                   render: renderCombatSection                    },
  { id: 'core-mechanic',               label: 'Core Mechanic',            render: renderCoreMechanicSection              },
  { id: 'death-and-dying',             label: 'Death & Dying',            render: renderDeathAndDyingSection             },
  { id: 'deities',                     label: 'Deities',                  render: renderDeitiesSection                   },
  { id: 'encounter-tables',            label: 'Encounter Tables',         render: renderEncounterTablesSection           },
  { id: 'equipment',                   label: 'Equipment',                render: renderEquipmentSection                 },
  { id: 'languages',                   label: 'Languages',                render: renderLanguagesSection                 },
  { id: 'light-and-darkness',          label: 'Light & Darkness',         render: renderLightAndDarknessSection          },
  { id: 'luck-tokens',                 label: 'Luck Tokens',              render: renderLuckTokensSection                },
  { id: 'magic-items',                 label: 'Magic Items',              render: renderMagicItemsSection                },
  { id: 'monsters',                    label: 'Monsters',                 render: renderMonstersSection                  },
  { id: 'npcs-and-reactions',          label: 'NPCs & Reactions',         render: renderNpcsAndReactionsSection          },
  { id: 'overland-travel',             label: 'Overland Travel',          render: renderOverlandTravelSection            },
  { id: 'random-character-generation', label: 'Random Character Gen',     render: renderRandomCharacterGenerationSection },
  { id: 'random-events',               label: 'Random Events',            render: renderRandomEventsSection              },
  { id: 'resting',                     label: 'Resting',                  render: renderRestingSection                   },
  { id: 'rumors',                      label: 'Rumors',                   render: renderRumorsSection                    },
  { id: 'running-the-game',            label: 'Running the Game',         render: renderRunningTheGameSection            },
  { id: 'settlements',                 label: 'Settlements',              render: renderSettlementsSection               },
  { id: 'spellcasting',                label: 'Spellcasting',             render: renderSpellcastingSection              },
  { id: 'spells',                      label: 'Spells',                   render: renderSpellsSection                    },
  { id: 'stealth-and-surprise',        label: 'Stealth & Surprise',       render: renderStealthAndSurpriseSection        },
  { id: 'titles',                      label: 'Titles',                   render: renderTitlesSection                    },
  { id: 'treasure',                    label: 'Treasure',                 render: renderTreasureSection                  },
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

  function showSectionList() {
    container.innerHTML = '';

    const title = document.createElement('h1');
    title.className = 'page-title';
    title.textContent = 'Library';
    container.appendChild(title);

    const nav = document.createElement('nav');
    nav.className = 'library-nav';

    SECTIONS.forEach((section) => {
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
      nav.appendChild(row);

      row.addEventListener('click', () => showSection(section));
    });

    container.appendChild(nav);
  }

  function showSection(section) {
    container.innerHTML = '';

    const backBtn = document.createElement('button');
    backBtn.type = 'button';
    backBtn.className = 'library-back-btn';
    backBtn.textContent = '‹ Library';
    backBtn.addEventListener('click', showSectionList);
    container.appendChild(backBtn);

    const title = document.createElement('h1');
    title.className = 'page-title';
    title.textContent = section.label;
    container.appendChild(title);

    section.render(container);
  }
}
