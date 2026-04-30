// SVG path for the home (house) icon — Material Design baseline
const HOME_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
</svg>`;

// SVG for the dice icon — d6 face with six dots as negative space.
// fill-rule="evenodd" makes the circles act as holes in the filled rectangle.
const DICE_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 2L19.5 2Q22 2 22 4.5L22 19.5Q22 22 19.5 22L4.5 22Q2 22 2 19.5L2 4.5Q2 2 4.5 2ZM8.25 7a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM18.25 7a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM8.25 12a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM18.25 12a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM8.25 17a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM18.25 17a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Z"/>
</svg>`;

// SVG path for the generate (sparkles/auto-awesome) icon — Material Design
const GENERATE_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z"/>
</svg>`;

// SVG path for the library (open book) icon — Material Design menu_book
const LIBRARY_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/>
</svg>`;

// One entry per tab. Adding a new tab only requires adding an entry here —
// the render loop handles the rest automatically.
const TAB_DEFINITIONS = [
  { id: 'home',     label: 'Home',     icon: HOME_ICON },
  { id: 'dice',     label: 'Dice',     icon: DICE_ICON },
  { id: 'generate', label: 'Generate', icon: GENERATE_ICON },
  { id: 'library',  label: 'Library',  icon: LIBRARY_ICON },
];

/**
 * Renders tab buttons into tabBarContainer and wires up click handlers.
 *
 * Calls onTabSelect(tabId) whenever a tab button is tapped. The caller is
 * responsible for showing/hiding pages in response.
 *
 * Returns an object with a setActiveTab(tabId) method so the caller can
 * sync the highlighted tab with the visible page. Returns null if
 * tabBarContainer is not a valid Element.
 *
 * @param {Element|null|undefined} tabBarContainer
 * @param {function(string): void} onTabSelect
 * @returns {{ setActiveTab: function(string): void }|null}
 */
export function initializeTabBar(tabBarContainer, onTabSelect) {
  if (!tabBarContainer || !(tabBarContainer instanceof Element)) {
    return null;
  }

  TAB_DEFINITIONS.forEach(({ id, label, icon }) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'tab-bar__tab';
    button.dataset.tabId = id;
    button.setAttribute('aria-label', label);
    button.setAttribute('role', 'tab');

    // Icon sits above the label — mirrors the native iOS tab bar layout
    button.innerHTML = `
      <span class="tab-bar__icon">${icon}</span>
      <span class="tab-bar__label">${label}</span>
    `;

    button.addEventListener('click', () => onTabSelect(id));
    tabBarContainer.appendChild(button);
  });

  return {
    /**
     * Marks tabId's button as active and all others as inactive.
     * Safe to call with an unknown tabId — simply clears all active states.
     *
     * @param {string} tabId
     */
    setActiveTab(tabId) {
      tabBarContainer.querySelectorAll('.tab-bar__tab').forEach((btn) => {
        const isActive = btn.dataset.tabId === tabId;
        btn.classList.toggle('tab-bar__tab--active', isActive);
        btn.setAttribute('aria-selected', String(isActive));
      });
    },
  };
}
