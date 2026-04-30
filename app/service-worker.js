// DEPLOY_COMMIT_SHA is replaced with the actual git commit SHA by the
// GitHub Actions deploy workflow before the file is uploaded to Pages.
// This means every deploy gets a unique cache name, so the activate
// handler below always clears out the previous deploy's stale cache —
// no manual version bumping ever needed.
const CACHE_NAME = 'shadowdark-tools-DEPLOY_COMMIT_SHA';

// Files that make up the app shell — everything needed to render the UI
// with zero network access. Add new JS/CSS files here as the app grows.
// Relative paths resolve from the SW's own location, so they work correctly
// whether the site is served from / or a subdirectory like /ShadowDarkTools/.
const APP_SHELL_FILES = [
  './',
  './index.html',
  './manifest.json',
  './css/app.css',
  './css/tab-bar.css',
  './js/app.js',
  './js/home-page.js',
  './js/dice-page.js',
  './js/dice-roller.js',
  './js/generate-page.js',
  './js/library-page.js',
  './js/spells-list.js',
  './js/spells-data.js',
  './js/settings-page.js',
  './js/tab-bar.js',
  './js/home-feed.js',
  './js/service-worker-registration.js',
  './js/update-checker.js',
];

// Pre-cache the app shell the moment the service worker installs.
// skipWaiting() makes the new worker take control immediately rather
// than waiting for all existing tabs to close.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL_FILES))
      .then(() => self.skipWaiting())
  );
});

// Take control of all open pages immediately after activation so we
// don't need a page refresh before offline support kicks in.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) =>
        // Delete any caches from previous versions of the app
        Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Cache-first strategy: serve from cache when available, fall back to network.
// This makes the app feel instant after the first load.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => cachedResponse || fetch(event.request))
  );
});
