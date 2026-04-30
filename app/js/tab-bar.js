// SVG path for the home (house) icon — Material Design baseline
const HOME_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
</svg>`;

// SVG path for the dice icon — d6 face showing 6 dots, Material Design casino
const DICE_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7 7c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm4 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm4 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm0-4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm0-4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
</svg>`;

// SVG path for the generate (sparkles/auto-awesome) icon — Material Design
const GENERATE_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z"/>
</svg>`;

// SVG path for the info icon — Material Design info circle
const INFO_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
</svg>`;

// SVG path for the settings (gear) icon — Material Design baseline
const SETTINGS_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M19.43 12.97c.04-.32.07-.64.07-.97s-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07.97l-2.11 1.66c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.58 1.69-.98l2.49 1.01c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
</svg>`;

// One entry per tab. Adding a new tab only requires adding an entry here —
// the render loop handles the rest automatically.
const TAB_DEFINITIONS = [
  { id: 'home',     label: 'Home',     icon: HOME_ICON },
  { id: 'dice',     label: 'Dice',     icon: DICE_ICON },
  { id: 'generate', label: 'Generate', icon: GENERATE_ICON },
  { id: 'info',     label: 'Info',     icon: INFO_ICON },
  { id: 'settings', label: 'Settings', icon: SETTINGS_ICON },
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
