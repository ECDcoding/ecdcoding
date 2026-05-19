// Minimal service worker — enables PWA install prompt on Chrome/Android.
// No caching, just a passthrough fetch handler.
self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});
