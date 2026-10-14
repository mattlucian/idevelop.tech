// Retires the service worker that earlier versions of this site installed.
//
// That worker served pages from its own cache, so a returning visitor's first
// page after it was replaced can be an older deploy. Browsers that still have
// it registered fetch this file on that visit. If the old worker's cached page
// is present, this worker takes control and reloads the open pages right away
// so they show the current deploy, then deletes the old caches and
// unregisters itself. Visitors without the old worker never install this.
//
// Safe to delete once old registrations have aged out (2027).
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const stalePage = await caches.match(
        new URL("/index.html", self.location.origin).href,
        { ignoreSearch: true },
      );
      if (stalePage) {
        await self.clients.claim();
        const pages = await self.clients.matchAll({ type: "window" });
        pages.forEach((page) => page.navigate(page.url));
      }
      const names = await caches.keys();
      await Promise.all(names.map((name) => caches.delete(name)));
      await self.registration.unregister();
    })(),
  );
});
