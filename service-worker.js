const CACHE_NAME = "stash-cache-v1";

const filesToCache = ["/cool-pig.png"];

self.addEventListener("install", event => {
  console.log(`${CACHE_NAME} installing…`);
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(filesToCache))
  );
});

self.addEventListener("activate", event => {
  console.log(`${CACHE_NAME} now ready to handle fetches!`);
});

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // serve the cool-pig SVG from the cache if the request
  // path is '/money-king.svg'
  if (url.pathname == "/money-king.svg") {
    event.respondWith(caches.match("/cool-pig.png"));
  }
});
