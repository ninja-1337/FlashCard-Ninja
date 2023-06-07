
self.addEventListener("fetch", (event) => {
    console.log("Worker fetch");
    event.respondWith(caches.match(event.request));
  });