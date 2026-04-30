/**
 * Library page — two-level navigation shell.
 *
 * On first render the user sees a list of reference sections. Tapping a
 * section drills in to that section's content and shows a back button that
 * returns to the list. All navigation is done by clearing and re-rendering
 * the container so there is no hidden state scattered across the DOM.
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
} from './library-sections.js';

// Each entry pairs a display label with the function that renders its content.
const SECTIONS = [
  { id: 'spells',         label: 'Spells',         render: renderSpellsSection        },
  { id: 'ancestries',     label: 'Ancestries',      render: renderAncestriesSection    },
  { id: 'classes',        label: 'Classes',         render: renderClassesSection       },
  { id: 'ability-scores', label: 'Ability Scores',  render: renderAbilityScoresSection },
  { id: 'backgrounds',    label: 'Backgrounds',     render: renderBackgroundsSection   },
  { id: 'alignments',     label: 'Alignments',      render: renderAlignmentsSection    },
  { id: 'languages',      label: 'Languages',       render: renderLanguagesSection     },
  { id: 'equipment',      label: 'Equipment',       render: renderEquipmentSection     },
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
      // Right-chevron character acts as a visual affordance that the row is tappable
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
