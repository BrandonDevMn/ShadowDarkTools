import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Use jsdom so DOM APIs (document, Element, etc.) are available in tests
    environment: 'jsdom',

    // Only pick up files in the tests/ folder
    include: ['tests/**/*.test.js'],

    coverage: {
      provider: 'v8',

      // Only measure coverage on our app's JS modules — not the entry point
      // wiring (app.js registers a DOMContentLoaded listener that is tested
      // by calling initializeApp() directly) and not the service worker
      // (runs in a separate worker context, not testable with jsdom).
      include: ['app/js/**/*.js'],

      thresholds: {
        // Enforce the 80% branch coverage rule from how-we-work.md
        branches: 80,
      },
    },
  },
});
