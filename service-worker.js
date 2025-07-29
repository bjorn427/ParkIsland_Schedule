const CACHE_NAME = 'v6';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './app-data.js',
    './favicon/favicon.ico',
    './favicon/favicon-96x96.png',
    './favicon/apple-touch-icon.png',
    './favicon/site.webmanifest',
];


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});
