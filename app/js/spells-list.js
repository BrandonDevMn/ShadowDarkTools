import { SPELLS } from './spells-data.js';

/**
 * Renders a filterable, tier-grouped spell list into the given container.
 *
 * Renders Wizard/Priest filter buttons and the spell list below them.
 * Clicking a filter button re-renders the list for that class. The list
 * starts on Wizard spells by default.
 *
 * Returns true on success, false if container is not a valid Element.
 *
 * @param {Element|null|undefined} container
 * @returns {boolean}
 */
export function renderSpellsList(container) {
  if (!container || !(container instanceof Element)) {
    return false;
  }

  let activeFilter = 'wizard';

  // ── Filter buttons (segmented control) ─────────────────────────────────

  const filterRow = document.createElement('div');
  filterRow.className = 'spells-filter';

  const wizardBtn = makeFilterButton('Wizard', 'wizard');
  const priestBtn  = makeFilterButton('Priest',  'priest');

  filterRow.appendChild(wizardBtn);
  filterRow.appendChild(priestBtn);
  container.appendChild(filterRow);

  // ── Spell list area ─────────────────────────────────────────────────────

  const listArea = document.createElement('div');
  listArea.className = 'spells-list';
  container.appendChild(listArea);

  renderList('wizard');

  wizardBtn.addEventListener('click', () => renderList('wizard'));
  priestBtn.addEventListener('click',  () => renderList('priest'));

  return true;

  // ── Helpers ─────────────────────────────────────────────────────────────

  function makeFilterButton(label, filter) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'spells-filter__btn';
    btn.dataset.filter = filter;
    btn.textContent = label;
    return btn;
  }

  function renderList(filter) {
    activeFilter = filter;

    // Sync active style on both buttons
    filterRow.querySelectorAll('.spells-filter__btn').forEach((btn) => {
      btn.classList.toggle('spells-filter__btn--active', btn.dataset.filter === filter);
    });

    listArea.innerHTML = '';

    const filtered = SPELLS.filter((spell) => spell.class === filter);

    // Collect tiers present in the filtered set, in order
    const tiers = [...new Set(filtered.map((s) => s.tier))].sort((a, b) => a - b);

    tiers.forEach((tier) => {
      const tierHeader = document.createElement('h2');
      tierHeader.className = 'spells-tier-header';
      tierHeader.textContent = `Tier ${tier}`;
      listArea.appendChild(tierHeader);

      filtered
        .filter((s) => s.tier === tier)
        .sort((a, b) => a.name.localeCompare(b.name))
        .forEach((spell) => {
          const card = document.createElement('div');
          card.className = 'spell-card';

          const nameEl = document.createElement('div');
          nameEl.className = 'spell-card__name';
          nameEl.textContent = spell.name;

          const metaEl = document.createElement('div');
          metaEl.className = 'spell-card__meta';
          metaEl.textContent = `${spell.range} · ${spell.duration}`;

          const descEl = document.createElement('p');
          descEl.className = 'spell-card__description';
          descEl.textContent = spell.description;

          card.appendChild(nameEl);
          card.appendChild(metaEl);
          card.appendChild(descEl);
          listArea.appendChild(card);
        });
    });
  }
}
