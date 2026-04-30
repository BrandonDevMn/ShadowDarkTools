// Cache name is versioned so we can bust it by bumping the number
// when the app shell files change in a future deploy.
const CACHE_NAME = 'shadowdark-tools-v1';

// Files that make up the app shell — everything needed to render the UI
// with zero network access. Add new JS/CSS files here as the app grows.
// Relative paths resolve from the SW's own location, so they work correctly
// whether the site is served from / or a subdirectory like /ShadowDarkTools/.
const APP_SHELL_FILES = [
  './',
  './index.html',
  './manifest.json',
  './css/app.css',
  './js/app.js',
  './js/hello-world.js',
  './js/service-worker-registration.js',
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
