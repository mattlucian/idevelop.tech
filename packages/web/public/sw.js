// Retires the service worker that earlier versions of this site installed.
//
// Browsers that still have it registered check this URL for updates on their
// next visit, install this version, and it deletes the old caches and
// unregisters itself. It doesn't reload the page. Pages are then always
// loaded from the server with standard HTTP caching.
//
// Safe to delete once old registrations have aged out (2027).
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(names.map((name) => caches.delete(name)));
      await self.registration.unregister();
    })(),
  );
});
