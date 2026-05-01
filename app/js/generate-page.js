/**
 * Generate tab — random character generator.
 *
 * State flow:
 *   showMenu()      — list with "Generate a Character" row
 *   showRolling()   — 1-second spinning d6 animation, then calls onComplete
 *   showCharacter() — character sheet + Re-roll button
 *
 * Back navigation: character → menu; back during rolling → menu.
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

    row.addEventListener('click', () => showRolling(() => showCharacter(generateCharacter())));
    nav.appendChild(row);
    container.appendChild(nav);
  }

  function showRolling(onComplete) {
    container.innerHTML = '';

    container.appendChild(makeBackButton('Generate', showMenu));

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

    // Header row: back button (left) + export button (right)
    const header = document.createElement('div');
    header.className = 'character-header';
    header.appendChild(makeBackButton('Generate', showMenu));

    const exportBtn = document.createElement('button');
    exportBtn.type = 'button';
    exportBtn.className = 'character-export-btn';
    exportBtn.textContent = 'Export';
    exportBtn.addEventListener('click', () => exportCharacter(char));
    header.appendChild(exportBtn);
    container.appendChild(header);

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

  // HP / AC / Gear Slots / Gold
  const hpCard = document.createElement('div');
  hpCard.className = 'character-sheet__hp-card';
  hpCard.appendChild(makeStat('HP',         `${char.hp}/${char.hp}`));
  hpCard.appendChild(makeStat('AC',         char.ac,        `10 + DEX (${fmtMod(char.stats.dex.mod)})`));
  hpCard.appendChild(makeStat('Gear Slots', char.gearSlots, gearSlotsFormula(char)));
  hpCard.appendChild(makeStat('Gold',       `${char.gold} gp`));
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

  // Proficiencies
  if (char.armor || char.weapons) {
    sheet.appendChild(makeCard(
      'Proficiencies',
      null,
      [char.armor && `Armor: ${char.armor}`, char.weapons && `Weapons: ${char.weapons}`]
        .filter(Boolean).join(' · '),
    ));
  }

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

  // Class abilities
  char.classAbilities.forEach((ability) => {
    sheet.appendChild(makeCard(ability.name, 'Class Feature', ability.description));
  });

  // Spells (Priest / Wizard) — one full card per spell
  char.spells.forEach((spell) => {
    const classLabel = spell.class === 'wizard' ? 'Wizard' : 'Priest';
    sheet.appendChild(makeCard(
      spell.name,
      `${classLabel} T${spell.tier} · ${spell.range} · ${spell.duration}`,
      spell.description,
    ));
  });

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

function makeStat(label, value, formula = null) {
  const wrap = document.createElement('div');
  wrap.className = 'character-sheet__hp-stat';
  const lbl = document.createElement('span');
  lbl.className = 'character-sheet__hp-label';
  lbl.textContent = label;
  const val = document.createElement('span');
  val.className = 'character-sheet__hp-value';
  val.textContent = value;
  wrap.appendChild(lbl);
  wrap.appendChild(val);
  if (formula) {
    const fml = document.createElement('span');
    fml.className = 'character-sheet__hp-formula';
    fml.textContent = formula;
    wrap.appendChild(fml);
  }
  return wrap;
}

function gearSlotsFormula(char) {
  const { str, con } = char.stats;
  let formula = `10 + STR (${fmtMod(str.mod)})`;
  if (char.class === 'Fighter' && con.mod > 0) {
    formula += ` + CON (${fmtMod(con.mod)}) Hauler`;
  }
  return formula;
}

// ── Export ─────────────────────────────────────────────────────────────────

async function exportCharacter(char) {
  if (!navigator.share) return;

  const text     = formatCharacterText(char);
  const filename = `${char.name.replace(/[^a-zA-Z0-9]/g, '-')}.txt`;
  const file     = new File([text], filename, { type: 'text/plain' });

  try {
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title: char.name });
    } else {
      await navigator.share({ title: char.name, text });
    }
  } catch (e) {
    if (e.name !== 'AbortError') console.error('Share failed', e);
  }
}

function formatCharacterText(char) {
  const SEP  = '─'.repeat(38);
  const out  = [];
  const add  = (...lines) => lines.forEach((l) => out.push(l));
  const sect = (heading) => { add('', heading, SEP); };

  // ── Header ─────────────────────────────────────────────────────────────
  add(char.name.toUpperCase());
  add(`${char.ancestry} ${char.class} · Level ${char.level} · ${char.alignment}${char.deity ? ` · ${char.deity}` : ''}`);

  // ── Derived stats ───────────────────────────────────────────────────────
  sect('STATS');
  add(
    `HP: ${char.hp}/${char.hp}   ` +
    `AC: ${char.ac} (10 + DEX ${fmtMod(char.stats.dex.mod)})   ` +
    `Gear Slots: ${char.gearSlots}   ` +
    `Gold: ${char.gold} gp`,
  );

  // ── Ability scores ──────────────────────────────────────────────────────
  sect('ABILITY SCORES');
  [['str','STR'],['dex','DEX'],['con','CON'],['int','INT'],['wis','WIS'],['cha','CHA']]
    .forEach(([key, abbr]) => {
      const { score, mod } = char.stats[key];
      add(`${abbr}   ${String(score).padStart(2)}   ${fmtMod(mod)}`);
    });

  // ── Proficiencies ───────────────────────────────────────────────────────
  if (char.armor || char.weapons) {
    sect('PROFICIENCIES');
    if (char.armor)   add(`Armor: ${char.armor}`);
    if (char.weapons) add(`Weapons: ${char.weapons}`);
  }

  // ── Background ──────────────────────────────────────────────────────────
  sect(`BACKGROUND: ${char.background.name.toUpperCase()}`);
  add(char.background.description);

  // ── Talents ─────────────────────────────────────────────────────────────
  char.talents.forEach((talent, i) => {
    sect(char.talents.length > 1 ? `TALENT ${i + 1}` : 'TALENT');
    add(talent);
  });

  // ── Class features ───────────────────────────────────────────────────────
  if (char.classAbilities.length > 0) {
    sect('CLASS FEATURES');
    char.classAbilities.forEach((ability, i) => {
      if (i > 0) add('');
      add(ability.name.toUpperCase());
      add(ability.description);
    });
  }

  // ── Spells ───────────────────────────────────────────────────────────────
  if (char.spells.length > 0) {
    sect('SPELLS');
    char.spells.forEach((spell, i) => {
      if (i > 0) add('');
      const cls = spell.class === 'wizard' ? 'Wizard' : 'Priest';
      add(`${spell.name.toUpperCase()} (${cls} Tier ${spell.tier})`);
      add(`Range: ${spell.range}   Duration: ${spell.duration}`);
      add(spell.description);
    });
  }

  // ── Languages ────────────────────────────────────────────────────────────
  sect('LANGUAGES');
  add(char.languages.join(', '));

  // ── Ancestry trait ────────────────────────────────────────────────────────
  if (char.ancestryTrait) {
    sect(`ANCESTRY TRAIT: ${char.ancestryTrait.name.toUpperCase()}`);
    add(char.ancestryTrait.description);
  }

  add('', '─'.repeat(38), 'Generated by ShadowDark Tools');

  return out.join('\n');
}

function makeBackButton(label, onClick) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'library-back-btn';
  btn.textContent = `‹ ${label}`;
  btn.addEventListener('click', onClick);
  return btn;
}
