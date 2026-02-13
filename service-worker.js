self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("truckunity").then(cache => {
      return cache.addAll(["/"]);
    })
  );
});
