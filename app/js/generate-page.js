/**
 * Generate tab — random character generator.
 *
 * State flow:
 *   showMenu()    — list with "Generate a Character" row
 *   showLanding() — title + big Generate button
 *   showRolling() — 1-second stat-flicker animation, then calls onComplete
 *   showCharacter() — character sheet + Re-roll button
 *
 * Back navigation: character → landing → menu
 * Back during rolling cancels the animation and returns to landing.
 */

import { generateCharacter, fmtMod } from './character-generator.js';

const ROLL_DURATION_MS = 1000;

/**
 * Mounts the Generate page into the given container.
 *
 * Returns true on success, false if container is not a valid Element.
 *
 * @param {Element|null|undefined} container
 * @returns {boolean}
 */
export function renderGeneratePage(container) {
  if (!container || !(container instanceof Element)) {
    return false;
  }

  let rollingId = null;

  function cancelAnimation() {
    if (rollingId !== null) { clearTimeout(rollingId); rollingId = null; }
  }

  // ── Screens ────────────────────────────────────────────────────────────────

  function showMenu() {
    cancelAnimation();
    container.innerHTML = '';

    const title = document.createElement('h1');
    title.className = 'page-title';
    title.textContent = 'Generate';
    container.appendChild(title);

    const nav = document.createElement('nav');
    nav.className = 'library-nav';

    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'library-nav__row';

    const label = document.createElement('span');
    label.className = 'library-nav__row-label';
    label.textContent = 'Generate a Character';
    row.appendChild(label);

    const indicator = document.createElement('span');
    indicator.className = 'library-nav__row-indicator';
    indicator.textContent = '›';
    row.appendChild(indicator);

    row.addEventListener('click', () => showLanding());
    nav.appendChild(row);
    container.appendChild(nav);
  }

  function showLanding() {
    cancelAnimation();
    container.innerHTML = '';

    container.appendChild(makeBackButton('Generate', showMenu));

    const title = document.createElement('h1');
    title.className = 'page-title';
    title.textContent = 'Generate a Character';
    container.appendChild(title);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'generate-btn';
    btn.textContent = 'Generate';
    btn.addEventListener('click', () => showRolling(() => showCharacter(generateCharacter())));
    container.appendChild(btn);
  }

  function showRolling(onComplete) {
    container.innerHTML = '';

    container.appendChild(makeBackButton('Generate', showLanding));

    const title = document.createElement('h1');
    title.className = 'page-title';
    title.textContent = 'Rolling...';
    container.appendChild(title);

    const wrap = document.createElement('div');
    wrap.className = 'generate-die-wrap';
    const die = document.createElement('div');
    die.className = 'generate-die';
    for (let i = 0; i < 6; i++) {
      const pip = document.createElement('span');
      pip.className = 'generate-die__pip';
      die.appendChild(pip);
    }
    wrap.appendChild(die);
    container.appendChild(wrap);

    rollingId = setTimeout(() => {
      cancelAnimation();
      onComplete();
    }, ROLL_DURATION_MS);
  }

  function showCharacter(char) {
    container.innerHTML = '';

    container.appendChild(makeBackButton('Generate', showLanding));

    const title = document.createElement('h1');
    title.className = 'page-title';
    title.textContent = char.name;
    container.appendChild(title);

    const reroll = document.createElement('button');
    reroll.type = 'button';
    reroll.className = 'generate-reroll-btn';
    reroll.textContent = 'Re-roll';
    reroll.addEventListener('click', () => showRolling(() => showCharacter(generateCharacter())));
    container.appendChild(reroll);

    renderCharacterSheet(container, char);
  }

  showMenu();
  return true;
}

// ── Character sheet renderer ───────────────────────────────────────────────

function renderCharacterSheet(container, char) {
  const sheet = document.createElement('div');
  sheet.className = 'character-sheet generate-fade-in';

  // Identity
  sheet.appendChild(makeCard(
    `${char.ancestry} ${char.class}`,
    `Level ${char.level} · ${char.alignment}${char.deity ? ` · ${char.deity}` : ''}`,
    null,
  ));

  // HP
  const hpCard = document.createElement('div');
  hpCard.className = 'character-sheet__hp-card';
  const hpLabel = document.createElement('span');
  hpLabel.className = 'character-sheet__hp-label';
  hpLabel.textContent = 'HP';
  const hpValue = document.createElement('span');
  hpValue.className = 'character-sheet__hp-value';
  hpValue.textContent = char.hp;
  hpCard.appendChild(hpLabel);
  hpCard.appendChild(hpValue);
  sheet.appendChild(hpCard);

  // Stats grid
  const statsGrid = document.createElement('div');
  statsGrid.className = 'character-sheet__stats';
  const STAT_KEYS = [
    ['str', 'STR'], ['dex', 'DEX'], ['con', 'CON'],
    ['int', 'INT'], ['wis', 'WIS'], ['cha', 'CHA'],
  ];
  STAT_KEYS.forEach(([key, abbr]) => {
    const { score, mod } = char.stats[key];
    const cell = document.createElement('div');
    cell.className = 'character-sheet__stat';

    const lbl = document.createElement('span');
    lbl.className = 'character-sheet__stat-label';
    lbl.textContent = abbr;

    const scr = document.createElement('span');
    scr.className = 'character-sheet__stat-score';
    scr.textContent = score;

    const mEl = document.createElement('span');
    mEl.className = 'character-sheet__stat-mod';
    mEl.textContent = fmtMod(mod);

    cell.appendChild(lbl);
    cell.appendChild(scr);
    cell.appendChild(mEl);
    statsGrid.appendChild(cell);
  });
  sheet.appendChild(statsGrid);

  // Background
  sheet.appendChild(makeCard(
    `Background: ${char.background.name}`,
    null,
    char.background.description,
  ));

  // Talent(s)
  char.talents.forEach((talent, i) => {
    const label = char.talents.length > 1 ? `Talent ${i + 1}` : 'Talent';
    sheet.appendChild(makeCard(label, null, talent));
  });

  // Spells (Priest / Wizard)
  if (char.spells.length > 0) {
    sheet.appendChild(makeCard(
      'Starting Spells',
      null,
      char.spells.join(', '),
    ));
  }

  // Languages
  sheet.appendChild(makeCard(
    'Languages',
    null,
    char.languages.join(', '),
  ));

  // Ancestry trait
  if (char.ancestryTrait) {
    sheet.appendChild(makeCard(
      char.ancestryTrait.name,
      'Ancestry Trait',
      char.ancestryTrait.description,
    ));
  }

  container.appendChild(sheet);
}

// ── Shared builders ────────────────────────────────────────────────────────

function makeCard(name, meta, description) {
  const card = document.createElement('div');
  card.className = 'reference-card';

  if (name) {
    const nameEl = document.createElement('div');
    nameEl.className = 'reference-card__name';
    nameEl.textContent = name;
    card.appendChild(nameEl);
  }

  if (meta) {
    const metaEl = document.createElement('div');
    metaEl.className = 'reference-card__meta';
    metaEl.textContent = meta;
    card.appendChild(metaEl);
  }

  if (description) {
    const descEl = document.createElement('p');
    descEl.className = 'reference-card__description';
    descEl.textContent = description;
    card.appendChild(descEl);
  }

  return card;
}

function makeBackButton(label, onClick) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'library-back-btn';
  btn.textContent = `‹ ${label}`;
  btn.addEventListener('click', onClick);
  return btn;
}
