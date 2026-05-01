/**
 * Shared DOM helpers for Library section renderers.
 */

export function makeReferenceCard(name, meta, description) {
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

export function makeSectionHeader(text) {
  const header = document.createElement('h2');
  header.className = 'reference-section-header';
  header.textContent = text;
  return header;
}

/**
 * Creates an HTML table from headers and rows arrays.
 * @param {string[]} headers
 * @param {string[][]} rows
 */
export function makeTable(headers, rows) {
  const table = document.createElement('table');
  table.className = 'reference-table';

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  headers.forEach((h) => {
    const th = document.createElement('th');
    th.textContent = h;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  rows.forEach((cells) => {
    const tr = document.createElement('tr');
    cells.forEach((cell) => {
      const td = document.createElement('td');
      td.textContent = cell;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  return table;
}

export function makeReferenceList() {
  const list = document.createElement('div');
  list.className = 'reference-list';
  return list;
}

export function makeParagraph(text) {
  const p = document.createElement('p');
  p.className = 'reference-card__description';
  p.textContent = text;
  return p;
}
