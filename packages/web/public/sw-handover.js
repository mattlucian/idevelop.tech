// Loaded into the generated service worker via workbox importScripts.
//
// The previous service worker served pages from its precache, so a visitor
// coming from it may be looking at an older deploy. If that cached page is
// still present when this worker installs, reload the open pages once it
// activates so they show the latest deploy. This worker never caches pages, so
// first-time visitors and later deploys never trigger a reload.
const PENDING = "sw-handover-pending";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .match(new URL("/index.html", self.location.origin).href, {
        ignoreSearch: true,
      })
      .then((cachedPage) => cachedPage && caches.open(PENDING)),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.delete(PENDING).then(async (wasPending) => {
      if (!wasPending) return;
      const pages = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });
      pages.forEach((page) => page.navigate(page.url));
    }),
  );
});
