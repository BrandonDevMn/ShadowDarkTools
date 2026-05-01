import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../app/js/library-sections.js', () => ({
  renderSpellsSection:                   vi.fn().mockReturnValue(true),
  renderAncestriesSection:               vi.fn().mockReturnValue(true),
  renderClassesSection:                  vi.fn().mockReturnValue(true),
  renderAbilityScoresSection:            vi.fn().mockReturnValue(true),
  renderBackgroundsSection:              vi.fn().mockReturnValue(true),
  renderAlignmentsSection:               vi.fn().mockReturnValue(true),
  renderLanguagesSection:                vi.fn().mockReturnValue(true),
  renderEquipmentSection:                vi.fn().mockReturnValue(true),
  renderCoreMechanicSection:             vi.fn().mockReturnValue(true),
  renderCombatSection:                   vi.fn().mockReturnValue(true),
  renderAdvancementSection:              vi.fn().mockReturnValue(true),
  renderSpellcastingSection:             vi.fn().mockReturnValue(true),
  renderLightAndDarknessSection:         vi.fn().mockReturnValue(true),
  renderRestingSection:                  vi.fn().mockReturnValue(true),
  renderDeathAndDyingSection:            vi.fn().mockReturnValue(true),
  renderStealthAndSurpriseSection:       vi.fn().mockReturnValue(true),
  renderLuckTokensSection:               vi.fn().mockReturnValue(true),
  renderTitlesSection:                   vi.fn().mockReturnValue(true),
  renderDeitiesSection:                  vi.fn().mockReturnValue(true),
  renderRandomCharacterGenerationSection:vi.fn().mockReturnValue(true),
  renderRunningTheGameSection:           vi.fn().mockReturnValue(true),
  renderMonstersSection:                 vi.fn().mockReturnValue(true),
  renderMagicItemsSection:               vi.fn().mockReturnValue(true),
  renderTreasureSection:                 vi.fn().mockReturnValue(true),
  renderNpcsAndReactionsSection:         vi.fn().mockReturnValue(true),
  renderAdventureGeneratorSection:       vi.fn().mockReturnValue(true),
  renderOverlandTravelSection:           vi.fn().mockReturnValue(true),
  renderEncounterTablesSection:          vi.fn().mockReturnValue(true),
  renderRandomEventsSection:             vi.fn().mockReturnValue(true),
  renderRumorsSection:                   vi.fn().mockReturnValue(true),
  renderSettlementsSection:              vi.fn().mockReturnValue(true),
}));

import { renderLibraryPage } from '../../app/js/library-page.js';
import {
  renderSpellsSection,
  renderAncestriesSection,
  renderEquipmentSection,
  renderRunningTheGameSection,
  renderMonstersSection,
} from '../../app/js/library-sections.js';

describe('renderLibraryPage', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    vi.clearAllMocks();
  });

  // ── Invalid container ───────────────────────────────────────────────────

  it('returns false when container is null', () => {
    expect(renderLibraryPage(null)).toBe(false);
  });

  it('returns false when container is undefined', () => {
    expect(renderLibraryPage(undefined)).toBe(false);
  });

  it('returns false when container is not an Element', () => {
    expect(renderLibraryPage('#page-library')).toBe(false);
  });

  // ── Section list (initial view) ─────────────────────────────────────────

  it('returns true when given a valid container', () => {
    expect(renderLibraryPage(container)).toBe(true);
  });

  it('renders a page title with text "Library"', () => {
    renderLibraryPage(container);
    expect(container.querySelector('.page-title').textContent).toBe('Library');
  });

  it('renders a library-nav element', () => {
    renderLibraryPage(container);
    expect(container.querySelector('.library-nav')).not.toBeNull();
  });

  it('renders a nav row for each section', () => {
    renderLibraryPage(container);
    expect(container.querySelectorAll('.library-nav__row').length).toBe(31);
  });

  it('renders a Spells nav row', () => {
    renderLibraryPage(container);
    const labels = Array.from(container.querySelectorAll('.library-nav__row-label')).map((el) => el.textContent);
    expect(labels).toContain('Spells');
  });

  it('renders an Ancestries nav row', () => {
    renderLibraryPage(container);
    const labels = Array.from(container.querySelectorAll('.library-nav__row-label')).map((el) => el.textContent);
    expect(labels).toContain('Ancestries');
  });

  it('renders an Equipment nav row', () => {
    renderLibraryPage(container);
    const labels = Array.from(container.querySelectorAll('.library-nav__row-label')).map((el) => el.textContent);
    expect(labels).toContain('Equipment');
  });

  it('renders new player and GM section rows', () => {
    renderLibraryPage(container);
    const labels = Array.from(container.querySelectorAll('.library-nav__row-label')).map((el) => el.textContent);
    expect(labels).toContain('Core Mechanic');
    expect(labels).toContain('Combat');
    expect(labels).toContain('Deities');
    expect(labels).toContain('Monsters');
    expect(labels).toContain('Running the Game');
    expect(labels).toContain('Encounter Tables');
  });

  it('does not render a back button on the section list', () => {
    renderLibraryPage(container);
    expect(container.querySelector('.library-back-btn')).toBeNull();
  });

  it('does not call any section render function on initial load', () => {
    renderLibraryPage(container);
    expect(renderSpellsSection).not.toHaveBeenCalled();
    expect(renderAncestriesSection).not.toHaveBeenCalled();
  });

  // ── Section drill-in ────────────────────────────────────────────────────

  it('clicking a section row shows a back button', () => {
    renderLibraryPage(container);
    container.querySelector('[data-section="spells"]').click();
    expect(container.querySelector('.library-back-btn')).not.toBeNull();
  });

  it('clicking the Spells row calls renderSpellsSection', () => {
    renderLibraryPage(container);
    container.querySelector('[data-section="spells"]').click();
    expect(renderSpellsSection).toHaveBeenCalledWith(container);
  });

  it('clicking a section row updates the page title to the section name', () => {
    renderLibraryPage(container);
    container.querySelector('[data-section="ancestries"]').click();
    expect(container.querySelector('.page-title').textContent).toBe('Ancestries');
  });

  it('clicking the Equipment row calls renderEquipmentSection', () => {
    renderLibraryPage(container);
    container.querySelector('[data-section="equipment"]').click();
    expect(renderEquipmentSection).toHaveBeenCalledWith(container);
  });

  it('section view hides the nav list', () => {
    renderLibraryPage(container);
    container.querySelector('[data-section="spells"]').click();
    expect(container.querySelector('.library-nav')).toBeNull();
  });

  // ── Back navigation ─────────────────────────────────────────────────────

  it('clicking back restores the section list', () => {
    renderLibraryPage(container);
    container.querySelector('[data-section="spells"]').click();
    container.querySelector('.library-back-btn').click();
    expect(container.querySelector('.library-nav')).not.toBeNull();
  });

  it('clicking back removes the back button', () => {
    renderLibraryPage(container);
    container.querySelector('[data-section="spells"]').click();
    container.querySelector('.library-back-btn').click();
    expect(container.querySelector('.library-back-btn')).toBeNull();
  });

  it('clicking back restores the "Library" page title', () => {
    renderLibraryPage(container);
    container.querySelector('[data-section="spells"]').click();
    container.querySelector('.library-back-btn').click();
    expect(container.querySelector('.page-title').textContent).toBe('Library');
  });

  it('clicking a GM section row calls its render function', () => {
    renderLibraryPage(container);
    container.querySelector('[data-section="monsters"]').click();
    expect(renderMonstersSection).toHaveBeenCalledWith(container);
  });

  it('clicking a GM section row updates the page title', () => {
    renderLibraryPage(container);
    container.querySelector('[data-section="running-the-game"]').click();
    expect(container.querySelector('.page-title').textContent).toBe('Running the Game');
  });
});
