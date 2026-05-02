/**
 * Generate tab — random character generator and GM tools.
 *
 * State flow:
 *   showMenu()           — two sections: Player Tools and GM Tools
 *   showRolling()        — 1-second spinning d6 animation, then calls onComplete
 *   showCharacter()      — character sheet + Re-roll button
 *   showTerrainMenu()    — terrain picker before rolling a random encounter
 *   showResult()         — generic result card for GM generators
 *
 * Each GM result screen includes a "Result | Table" segmented control.
 * The Table segment shows the underlying die table(s) via a dropdown.
 *
 * Back navigation: any result/sheet → menu; back during rolling → menu.
 */

import { generateCharacter, fmtMod } from './character-generator.js';
import {
  generateAdventureHook,
  generateNPC,
  generateEncounter,
  getTerrainNames,
  generateRandomEvent,
  generateRumor,
  generateOath,
  generateSecret,
  generateBlessing,
  generateMagicItem,
  generateDungeon,
  generateMarch,
  getOverlandTerrains,
  getOverlandDangerLevels,
} from './gm-generators.js';
import {
  adventureHookTableGroups,
  npcTableGroups,
  encounterTableGroups,
  randomEventTableGroups,
  rumorTableGroups,
  oathTableGroups,
  secretTableGroups,
  blessingTableGroups,
  magicItemTableGroups,
  dungeonTableGroups,
  marchTableGroups,
} from './generate-tables.js';

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

    // ── Player Tools section ────────────────────────────────────────────────
    container.appendChild(makeNavSection('Player Tools', [
      {
        label: 'Generate a Character',
        onClick: () => showRolling(() => showCharacter(generateCharacter())),
      },
    ]));

    // ── GM Tools section ────────────────────────────────────────────────────
    container.appendChild(makeNavSection('GM Tools', [
      {
        label: 'Adventure Hook',
        onClick: () => showRolling(() => showAdventureHookResult(generateAdventureHook())),
      },
      {
        label: 'NPC',
        onClick: () => showRolling(() => showNPCResult(generateNPC())),
      },
      {
        label: 'Random Encounter',
        // Terrain must be chosen before rolling — skip the animation, go to terrain picker
        onClick: () => showTerrainMenu(),
      },
      {
        label: 'Random Event',
        onClick: () => {
          function roll() { showRolling(() => showResult('Random Event', generateRandomEvent().event, null, roll, randomEventTableGroups())); }
          roll();
        },
      },
      {
        label: 'Rumor',
        onClick: () => {
          function roll() { showRolling(() => showResult('Rumor', generateRumor().rumor, null, roll, rumorTableGroups())); }
          roll();
        },
      },
      {
        label: 'Oath',
        onClick: () => {
          function roll() { showRolling(() => showResult('Oath', generateOath().oath, null, roll, oathTableGroups())); }
          roll();
        },
      },
      {
        label: 'Secret',
        onClick: () => {
          function roll() { showRolling(() => showResult('Secret', generateSecret().secret, null, roll, secretTableGroups())); }
          roll();
        },
      },
      {
        label: 'Blessing',
        onClick: () => {
          function roll() {
            const b = generateBlessing();
            showRolling(() => showResult('Blessing', b.description, b.name, roll, blessingTableGroups()));
          }
          roll();
        },
      },
      {
        label: 'Magic Item',
        onClick: () => {
          function roll() {
            const item = generateMagicItem();
            showRolling(() => showResult('Magic Item', item.description, item.name, roll, magicItemTableGroups()));
          }
          roll();
        },
      },
      {
        label: 'Dungeon',
        onClick: () => showRolling(() => showDungeonResult(generateDungeon())),
      },
      {
        label: 'Overworld March',
        onClick: () => showMarchPicker(),
      },
    ]));
  }

  // ── Terrain menu — pick before rolling an encounter ──────────────────────

  function showTerrainMenu() {
    cancelAnimation();
    container.innerHTML = '';

    container.appendChild(makeBackButton('Generate', showMenu));

    const title = document.createElement('h1');
    title.className = 'page-title';
    title.textContent = 'Choose Terrain';
    container.appendChild(title);

    const terrains = getTerrainNames();
    container.appendChild(makeNavSection(null, terrains.map((terrain) => ({
      label: terrain,
      onClick: () => {
        function roll() {
          const result = generateEncounter(terrain);
          showRolling(() => showResult(
            `Encounter: ${result.terrain}`, result.encounter,
            null, roll, encounterTableGroups(), terrain,
          ));
        }
        roll();
      },
    }))));
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

  // ── Generic GM result screen ────────────────────────────────────────────

  /**
   * Renders a simple result card for single-output GM generators.
   *
   * `onReroll`     — called when the Re-roll button is clicked (null = button disabled).
   * `tableGroups`  — [{label, render}] array from generate-tables.js; adds Result|Table segment.
   * `initialTable` — pre-selects this table label in the dropdown (used by encounter terrain).
   *
   * Returns the result sheet div so callers can append extra cards.
   */
  function showResult(title, body, subtitle = null, onReroll = null, tableGroups = null, initialTable = null) {
    container.innerHTML = '';

    const header = document.createElement('div');
    header.className = 'character-header';
    header.appendChild(makeBackButton('Generate', showMenu));

    const rerollBtn = document.createElement('button');
    rerollBtn.type = 'button';
    rerollBtn.className = 'character-export-btn';
    rerollBtn.textContent = 'Re-roll';
    rerollBtn.addEventListener('click', () => onReroll && onReroll());
    header.appendChild(rerollBtn);
    container.appendChild(header);

    const heading = document.createElement('h1');
    heading.className = 'page-title';
    heading.textContent = title;
    container.appendChild(heading);

    const resultView = document.createElement('div');
    resultView.className = 'character-sheet generate-fade-in';
    resultView.appendChild(makeCard(subtitle, null, body));

    if (tableGroups) {
      const tableView = makeTableView(tableGroups, initialTable);
      tableView.hidden = true;
      container.appendChild(makeSegmentedControl(['Result', 'Table'], 0, (idx) => {
        resultView.hidden = idx === 1;
        tableView.hidden = idx === 0;
      }));
      container.appendChild(resultView);
      container.appendChild(tableView);
    } else {
      container.appendChild(resultView);
    }

    return resultView;
  }

  // ── Adventure Hook result ───────────────────────────────────────────────

  function showAdventureHookResult(result) {
    function roll() { showRolling(() => showAdventureHookResult(generateAdventureHook())); }
    const sheet = showResult('Adventure Hook', result.hook, null, roll, adventureHookTableGroups());
    sheet.appendChild(makeCard('Site Name', null, result.site));
  }

  // ── NPC result ──────────────────────────────────────────────────────────

  function showNPCResult(npc) {
    container.innerHTML = '';

    const header = document.createElement('div');
    header.className = 'character-header';
    header.appendChild(makeBackButton('Generate', showMenu));

    const rerollBtn = document.createElement('button');
    rerollBtn.type = 'button';
    rerollBtn.className = 'character-export-btn';
    rerollBtn.textContent = 'Re-roll';
    rerollBtn.addEventListener('click', () => showRolling(() => showNPCResult(generateNPC())));
    header.appendChild(rerollBtn);
    container.appendChild(header);

    const heading = document.createElement('h1');
    heading.className = 'page-title';
    heading.textContent = npc.name;
    container.appendChild(heading);

    const resultView = document.createElement('div');
    resultView.className = 'character-sheet generate-fade-in';

    resultView.appendChild(makeCard(
      `${npc.ancestry} · ${npc.alignment}`,
      `${npc.age} · ${npc.wealth}`,
      npc.occupation,
    ));
    resultView.appendChild(makeCard('Appearance', null, npc.appearance));
    resultView.appendChild(makeCard('Mannerism', null, npc.does));
    resultView.appendChild(makeCard('Secret', null, npc.secret));
    resultView.appendChild(makeCard('Epithet', null, npc.epithet));
    resultView.appendChild(makeCard('First Impression', `2d6 = ${npc.reactionRoll}`, npc.reaction));

    const tableView = makeTableView(npcTableGroups());
    tableView.hidden = true;

    container.appendChild(makeSegmentedControl(['Result', 'Table'], 0, (idx) => {
      resultView.hidden = idx === 1;
      tableView.hidden = idx === 0;
    }));
    container.appendChild(resultView);
    container.appendChild(tableView);
  }

  // ── March picker ────────────────────────────────────────────────────────

  /**
   * Screen with two dropdowns (terrain + danger) and a March button.
   * Back returns to the main menu; March triggers the rolling animation.
   */
  function showMarchPicker(selectedTerrain, selectedDanger) {
    cancelAnimation();
    container.innerHTML = '';

    container.appendChild(makeBackButton('Generate', showMenu));

    const title = document.createElement('h1');
    title.className = 'page-title';
    title.textContent = 'March';
    container.appendChild(title);

    const form = document.createElement('div');
    form.className = 'march-form';

    const terrainSelect = makeSelect(
      'Current Terrain',
      getOverlandTerrains(),
      selectedTerrain ?? getOverlandTerrains()[0],
    );
    form.appendChild(terrainSelect.wrap);

    const marchBtn = document.createElement('button');
    marchBtn.type = 'button';
    marchBtn.className = 'generate-reroll-btn march-btn';
    marchBtn.textContent = 'March →';
    marchBtn.addEventListener('click', () => {
      const terrain = terrainSelect.select.value;
      showRolling(() => showMarchResult(generateMarch(terrain), terrain));
    });
    form.appendChild(marchBtn);

    container.appendChild(form);
  }

  // ── March result ─────────────────────────────────────────────────────────

  function showMarchResult(result, fromTerrain) {
    container.innerHTML = '';

    const header = document.createElement('div');
    header.className = 'character-header';
    // Back goes to picker so the GM can immediately do the next march
    header.appendChild(makeBackButton('March', () => showMarchPicker(result.terrain)));

    const rerollBtn = document.createElement('button');
    rerollBtn.type = 'button';
    rerollBtn.className = 'character-export-btn';
    rerollBtn.textContent = 'Re-roll';
    rerollBtn.addEventListener('click', () => {
      showRolling(() => showMarchResult(generateMarch(fromTerrain), fromTerrain));
    });
    header.appendChild(rerollBtn);
    container.appendChild(header);

    const heading = document.createElement('h1');
    heading.className = 'page-title';
    heading.textContent = 'New Hex';
    container.appendChild(heading);

    const resultView = document.createElement('div');
    resultView.className = 'character-sheet generate-fade-in';

    resultView.appendChild(makeCard(result.terrain, result.danger, null));

    if (result.hasPOI && result.poi) {
      const { poi } = result;
      const poiTitle = poi.settlementName ? `${poi.location}: ${poi.settlementName}` : poi.location;
      resultView.appendChild(makeCard(
        'Point of Interest',
        poiTitle,
        poi.cataclysm ? `Disaster! ${poi.cataclysm}` : poi.development,
      ));
    }

    const tableView = makeTableView(marchTableGroups());
    tableView.hidden = true;

    container.appendChild(makeSegmentedControl(['Result', 'Table'], 0, (idx) => {
      resultView.hidden = idx === 1;
      tableView.hidden = idx === 0;
    }));
    container.appendChild(resultView);
    container.appendChild(tableView);
  }

  // ── Dungeon result ──────────────────────────────────────────────────────

  function showDungeonResult(dungeon) {
    container.innerHTML = '';

    const header = document.createElement('div');
    header.className = 'character-header';
    header.appendChild(makeBackButton('Generate', showMenu));

    const rerollBtn = document.createElement('button');
    rerollBtn.type = 'button';
    rerollBtn.className = 'character-export-btn';
    rerollBtn.textContent = 'Re-roll';
    rerollBtn.addEventListener('click', () => showRolling(() => showDungeonResult(generateDungeon())));
    header.appendChild(rerollBtn);
    container.appendChild(header);

    const heading = document.createElement('h1');
    heading.className = 'page-title';
    heading.textContent = 'Dungeon';
    container.appendChild(heading);

    const resultView = document.createElement('div');
    resultView.className = 'character-sheet generate-fade-in';

    resultView.appendChild(makeCard(
      `${dungeon.size} ${dungeon.type}`,
      `${dungeon.dangerLevel} · ${dungeon.rooms.length} rooms`,
      null,
    ));
    resultView.appendChild(makeDungeonMap(dungeon));
    dungeon.rooms.forEach((room) => {
      const label = room.isObjective ? `${room.label} ★` : room.label;
      resultView.appendChild(makeCard(`Room ${room.number}`, label, room.detail));
    });

    const tableView = makeTableView(dungeonTableGroups());
    tableView.hidden = true;

    container.appendChild(makeSegmentedControl(['Result', 'Table'], 0, (idx) => {
      resultView.hidden = idx === 1;
      tableView.hidden = idx === 0;
    }));
    container.appendChild(resultView);
    container.appendChild(tableView);
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

// ── Dungeon map ────────────────────────────────────────────────────────────

const DUNGEON_LABEL_ABBR = {
  'Empty':         'Empty',
  'Trap':          'Trap',
  'Minor Hazard':  'Minor Haz',
  'Solo Monster':  'Monster',
  'NPC':           'NPC',
  'Monster Mob':   'Mob',
  'Major Hazard':  'Major Haz',
  'Treasure':      'Treasure',
  'Boss Monster':  'Boss',
};

function makeDungeonMap(dungeon) {
  const NS   = 'http://www.w3.org/2000/svg';
  const CELL = 100; // logical units per grid cell
  const ROOM = 80;  // room rect size (leaves 10-unit border on each side)
  const CORRIDOR_W = CELL * 0.28; // wide enough to visually connect rooms

  const { rooms, layout } = dungeon;
  const { positions, connections } = layout;

  const xs   = positions.map((p) => p.x);
  const ys   = positions.map((p) => p.y);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const cols = Math.max(...xs) - minX + 1;
  const rows = Math.max(...ys) - minY + 1;

  function cx(p) { return (p.x - minX) * CELL + CELL / 2; }
  function cy(p) { return (p.y - minY) * CELL + CELL / 2; }

  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${cols * CELL} ${rows * CELL}`);
  svg.setAttribute('width', '100%');
  svg.setAttribute('class', 'dungeon-map');

  // Corridors first so rooms render on top
  connections.forEach(([ai, bi]) => {
    const line = document.createElementNS(NS, 'line');
    line.setAttribute('x1', cx(positions[ai]));
    line.setAttribute('y1', cy(positions[ai]));
    line.setAttribute('x2', cx(positions[bi]));
    line.setAttribute('y2', cy(positions[bi]));
    line.setAttribute('stroke-width', CORRIDOR_W);
    line.setAttribute('class', 'dungeon-corridor');
    svg.appendChild(line);
  });

  // Rooms
  rooms.forEach((room, i) => {
    const p  = positions[i];
    const rx = cx(p) - ROOM / 2;
    const ry = cy(p) - ROOM / 2;

    const rect = document.createElementNS(NS, 'rect');
    rect.setAttribute('x', rx);
    rect.setAttribute('y', ry);
    rect.setAttribute('width', ROOM);
    rect.setAttribute('height', ROOM);
    rect.setAttribute('rx', '6');
    rect.setAttribute('class', room.isObjective ? 'dungeon-room dungeon-room--boss' : 'dungeon-room');
    svg.appendChild(rect);

    const numText = document.createElementNS(NS, 'text');
    numText.setAttribute('x', cx(p));
    numText.setAttribute('y', cy(p) - 10);
    numText.setAttribute('text-anchor', 'middle');
    numText.setAttribute('dominant-baseline', 'middle');
    numText.setAttribute('font-size', '22');
    numText.setAttribute('font-weight', 'bold');
    numText.setAttribute('class', room.isObjective ? 'dungeon-text dungeon-text--boss' : 'dungeon-text');
    numText.textContent = String(room.number);
    svg.appendChild(numText);

    const abbr = DUNGEON_LABEL_ABBR[room.label] ?? room.label;
    const lblText = document.createElementNS(NS, 'text');
    lblText.setAttribute('x', cx(p));
    lblText.setAttribute('y', cy(p) + 18);
    lblText.setAttribute('text-anchor', 'middle');
    lblText.setAttribute('dominant-baseline', 'middle');
    lblText.setAttribute('font-size', '13');
    lblText.setAttribute('class', room.isObjective ? 'dungeon-sublabel dungeon-sublabel--boss' : 'dungeon-sublabel');
    lblText.textContent = abbr;
    svg.appendChild(lblText);
  });

  return svg;
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
  try {
    await navigator.share({ text: formatCharacterText(char) });
  } catch (e) {
    if (e.name !== 'AbortError') console.error('Share failed', e);
  }
}

function formatCharacterText(char) {
  const out  = [];
  const add  = (...lines) => lines.forEach((l) => out.push(l));
  const sect = (heading)  => add('', heading);

  const STAT_NAMES = {
    str: 'Strength', dex: 'Dexterity', con: 'Constitution',
    int: 'Intelligence', wis: 'Wisdom', cha: 'Charisma',
  };

  // ── Header ──────────────────────────────────────────────────────────────
  add(char.name);
  add(`Ancestry: ${char.ancestry}`);
  add(`Class: ${char.class}`);
  add(`Level: ${char.level}`);
  add(`Alignment: ${char.alignment}`);
  if (char.deity) add(`Deity: ${char.deity}`);

  // ── Derived stats ────────────────────────────────────────────────────────
  add('');
  add(`HP: ${char.hp}/${char.hp}`);
  add(`AC: ${char.ac} (10 + DEX ${fmtMod(char.stats.dex.mod)})`);
  add(`Gear Slots: ${char.gearSlots}`);
  add(`Gold: ${char.gold} gp`);

  // ── Ability scores ────────────────────────────────────────────────────────
  sect('Ability Scores');
  Object.entries(STAT_NAMES).forEach(([key, name]) => {
    const { score, mod } = char.stats[key];
    add(`${name}: ${score} (${fmtMod(mod)})`);
  });

  // ── Proficiencies ─────────────────────────────────────────────────────────
  if (char.armor || char.weapons) {
    sect('Proficiencies');
    if (char.armor)   add(`Armor: ${char.armor}`);
    if (char.weapons) add(`Weapons: ${char.weapons}`);
  }

  // ── Background ───────────────────────────────────────────────────────────
  sect(`Background: ${char.background.name}`);
  add(char.background.description);

  // ── Inventory (items granted by background) ───────────────────────────────
  const startingItems = parseStartingItems(char.background.description);
  if (startingItems.length > 0) {
    sect('Inventory');
    startingItems.forEach((item) => add(formatInventoryItem(item)));
  }

  // ── Talents ──────────────────────────────────────────────────────────────
  char.talents.forEach((talent, i) => {
    sect(char.talents.length > 1 ? `Talent ${i + 1}` : 'Talent');
    add(talent);
  });

  // ── Class features ────────────────────────────────────────────────────────
  if (char.classAbilities.length > 0) {
    sect('Class Features');
    char.classAbilities.forEach((ability, i) => {
      if (i > 0) add('');
      add(ability.name);
      add(ability.description);
    });
  }

  // ── Spells ────────────────────────────────────────────────────────────────
  if (char.spells.length > 0) {
    sect('Spells');
    char.spells.forEach((spell, i) => {
      if (i > 0) add('');
      const cls = spell.class === 'wizard' ? 'Wizard' : 'Priest';
      add(`${spell.name} (${cls} Tier ${spell.tier})`);
      add(`Range: ${spell.range}   Duration: ${spell.duration}`);
      add(spell.description);
    });
  }

  // ── Languages ─────────────────────────────────────────────────────────────
  sect('Languages');
  add(char.languages.join(', '));

  // ── Ancestry trait ────────────────────────────────────────────────────────
  if (char.ancestryTrait) {
    sect(`Ancestry Trait: ${char.ancestryTrait.name}`);
    add(char.ancestryTrait.description);
  }

  return out.join('\n');
}

// ── Inventory helpers ──────────────────────────────────────────────────────

function parseStartingItems(description) {
  const match = description.match(/[Ss]tart with (.+?)\.?\s*$/);
  if (!match) return [];
  return match[1]
    .split(/,\s*(?:and\s+)?|\s+and\s+/)
    .map((item) => item.replace(/^(a |an |the )/i, '').trim())
    .filter(Boolean);
}

function formatInventoryItem(item) {
  const numMatch = item.match(/^(\d+)\s+(.+)$/);
  if (numMatch) return `${numMatch[2]} x${numMatch[1]}`;
  return `${item} x1`;
}

function makeBackButton(label, onClick) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'library-back-btn';
  btn.textContent = `‹ ${label}`;
  btn.addEventListener('click', onClick);
  return btn;
}

/**
 * Builds a labelled <select> wrapper.
 * Returns { wrap, select } so the caller can read select.value.
 */
function makeSelect(label, options, selected) {
  const wrap = document.createElement('div');
  wrap.className = 'march-select-wrap';

  const lbl = document.createElement('label');
  lbl.className = 'march-select-label';
  lbl.textContent = label;
  wrap.appendChild(lbl);

  const sel = document.createElement('select');
  sel.className = 'march-select';
  options.forEach((opt) => {
    const o = document.createElement('option');
    o.value = opt;
    o.textContent = opt;
    if (opt === selected) o.selected = true;
    sel.appendChild(o);
  });
  wrap.appendChild(sel);

  return { wrap, select: sel };
}

/**
 * Builds a nav section with an optional heading and a list of labelled rows.
 * `heading` may be null to omit the section label.
 * `rows` is an array of { label, onClick } objects.
 */
function makeNavSection(heading, rows) {
  const wrap = document.createElement('div');
  wrap.className = 'generate-section';

  if (heading) {
    const h2 = document.createElement('h2');
    h2.className = 'generate-section__heading';
    h2.textContent = heading;
    wrap.appendChild(h2);
  }

  const nav = document.createElement('nav');
  nav.className = 'library-nav';

  rows.forEach(({ label, onClick }) => {
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'library-nav__row';

    const labelEl = document.createElement('span');
    labelEl.className = 'library-nav__row-label';
    labelEl.textContent = label;
    row.appendChild(labelEl);

    const indicator = document.createElement('span');
    indicator.className = 'library-nav__row-indicator';
    indicator.textContent = '›';
    row.appendChild(indicator);

    row.addEventListener('click', onClick);
    nav.appendChild(row);
  });

  wrap.appendChild(nav);
  return wrap;
}

/**
 * "Result | Table" two-button segmented control.
 * Calls onChange(index) whenever the active segment changes.
 */
function makeSegmentedControl(labels, activeIdx, onChange) {
  const wrap = document.createElement('div');
  wrap.className = 'generate-segment';
  let current = activeIdx;
  const btns = labels.map((label, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'generate-segment__btn' + (i === activeIdx ? ' generate-segment__btn--active' : '');
    btn.textContent = label;
    btn.addEventListener('click', () => {
      if (i === current) return;
      btns[current].classList.remove('generate-segment__btn--active');
      btn.classList.add('generate-segment__btn--active');
      current = i;
      onChange(i);
    });
    return btn;
  });
  btns.forEach((b) => wrap.appendChild(b));
  return wrap;
}

/**
 * Renders a table group selector (dropdown) + table content area.
 * `tableGroups` is [{label, render() => Element}].
 * `initialLabel` pre-selects a specific group (e.g. the rolled terrain).
 */
function makeTableView(tableGroups, initialLabel = null) {
  const wrap = document.createElement('div');
  wrap.className = 'generate-table-view';

  const effective = (initialLabel && tableGroups.some((g) => g.label === initialLabel))
    ? initialLabel
    : tableGroups[0].label;

  const content = document.createElement('div');

  function show(label) {
    content.innerHTML = '';
    const group = tableGroups.find((g) => g.label === label) ?? tableGroups[0];
    content.appendChild(group.render());
  }

  if (tableGroups.length > 1) {
    const { wrap: selWrap, select } = makeSelect('Table', tableGroups.map((g) => g.label), effective);
    select.addEventListener('change', () => show(select.value));
    wrap.appendChild(selWrap);
  }

  show(effective);
  wrap.appendChild(content);
  return wrap;
}
