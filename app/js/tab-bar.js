// SVG path for the home (house) icon — Material Design baseline
const HOME_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
</svg>`;

// SVG path for the settings (gear) icon — Material Design baseline
const SETTINGS_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M19.43 12.97c.04-.32.07-.64.07-.97s-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07.97l-2.11 1.66c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.58 1.69-.98l2.49 1.01c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
</svg>`;

// One entry per tab. Adding a new tab only requires adding an entry here —
// the render loop handles the rest automatically.
const TAB_DEFINITIONS = [
  { id: 'home',     label: 'Home',     icon: HOME_ICON },
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
