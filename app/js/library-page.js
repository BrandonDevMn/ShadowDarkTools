/**
 * Library page — three-level navigation shell.
 *
 * Level 1: section list (all 31 sections)
 * Level 2: item list for a selected section (sorted A-Z)
 * Level 3: detail view for a selected item
 *
 * All levels use the same container; each navigation clears and re-renders.
 * All levels use identical .library-nav / .library-nav__row chrome.
 */

import { SECTIONS } from './library-sections.js';

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

  // ── Level helpers ─────────────────────────────────────────────────────────

  function showSectionList() {
    container.innerHTML = '';

    const title = document.createElement('h1');
    title.className = 'page-title';
    title.textContent = 'Library';
    container.appendChild(title);

    container.appendChild(makeNav(
      SECTIONS,
      'section',
      (section) => showItemList(section)
    ));
  }

  function showItemList(section) {
    container.innerHTML = '';
    container.appendChild(makeBackButton('Library', showSectionList));

    const title = document.createElement('h1');
    title.className = 'page-title';
    title.textContent = section.label;
    container.appendChild(title);

    container.appendChild(makeNav(
      section.items,
      'item',
      (item) => showDetail(section, item)
    ));
  }

  function showDetail(section, item) {
    container.innerHTML = '';
    container.appendChild(makeBackButton(section.label, () => showItemList(section)));

    const title = document.createElement('h1');
    title.className = 'page-title';
    title.textContent = item.label;
    container.appendChild(title);

    section.renderDetail(container, item.id);
  }
}

// ── Shared builders ───────────────────────────────────────────────────────

function makeNav(items, attrName, onClick) {
  const nav = document.createElement('nav');
  nav.className = 'library-nav';

  items.forEach((item) => {
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'library-nav__row';
    row.dataset[attrName] = item.id;

    if (item.sublabel) {
      const content = document.createElement('div');
      content.className = 'library-nav__row-content';

      const labelEl = document.createElement('span');
      labelEl.className = 'library-nav__row-label';
      labelEl.textContent = item.label;

      const sublabelEl = document.createElement('span');
      sublabelEl.className = 'library-nav__row-sublabel';
      sublabelEl.textContent = item.sublabel;

      content.appendChild(labelEl);
      content.appendChild(sublabelEl);
      row.appendChild(content);
    } else {
      const labelEl = document.createElement('span');
      labelEl.className = 'library-nav__row-label';
      labelEl.textContent = item.label;
      row.appendChild(labelEl);
    }

    const indicator = document.createElement('span');
    indicator.className = 'library-nav__row-indicator';
    indicator.textContent = '›';
    row.appendChild(indicator);

    row.addEventListener('click', () => onClick(item));
    nav.appendChild(row);
  });

  return nav;
}

function makeBackButton(label, onClick) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'library-back-btn';
  btn.textContent = `‹ ${label}`;
  btn.addEventListener('click', onClick);
  return btn;
}
