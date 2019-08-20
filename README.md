# Service Workers

## What is a service worker?

- a special web worker that runs on a separate thread
- intercepts network requests, caching or retrieving resources from the cache
- fully async and non-blocking
- has no access to the Dom

## What are service workers used for?

- Cache resources - Caching can make page loads super fast regardless of network connectivity
- Offline applications - Your application can be made to work offline regardless of network state
- Notifications, push messages, background sync, and more coming in the future

## Basic setup

1. Create service worker file
2. Register service worker

```js
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(reg => console.log("Registration successful"))
    .catch(error => console.log("Registration failed"));
}
```

3. Install service worker - install is only called once per service worker - used for initial caching of css, js, images, templates, etc
4. Activate service worker - service worker is ready to handle events. The activate event is usually used for handling cleanup and deletions of unused caches.
   ![](https://paper-attachments.dropbox.com/s_7A54A0B9C400A1FEBB099144C9CF74FBD762AA0FF5D18E3029D19880E8CD1C78_1560784310032_72ed77b1720512da.png)

## Different caching strategies

- **Stale while revalidate strategy**
  ![](https://paper-attachments.dropbox.com/s_7A54A0B9C400A1FEBB099144C9CF74FBD762AA0FF5D18E3029D19880E8CD1C78_1560784332169_stale-while-revalidate.png)

- **Cache first strategy (with fall back to network)**
  ![](https://paper-attachments.dropbox.com/s_7A54A0B9C400A1FEBB099144C9CF74FBD762AA0FF5D18E3029D19880E8CD1C78_1560784355197_cache-first.png)

- **Network first**
- **Cache / network only**

## Let’s build a cache

1. control what image is shown
2. Build a ‘stale while revalidate’ service worker for all assets

https://github.com/tylerwolff/service-worker-demo

## Common problems

- Service workers require HTTPS, so they can be hard to test locally (use chrome).
- They can easily cause frustrating cache related bugs during development. Use incognito browser.
- With CRA’s service worker strategy, new updates are only available after n+1 page loads because index.html is cached
- multiple versions of your app running at once (multiple tabs problem)

## More resources & examples

- [Introduction to Service Worker | Google Developers](https://developers.google.com/web/ilt/pwa/introduction-to-service-worker)
- [The Offline Cookbook | Google Developers](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/)
- [Can I use… Service workers](https://caniuse.com/#feat=serviceworkers)
- [Workbox | Google Developers](https://developers.google.com/web/tools/workbox/)

```js
// Image cache
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: "images",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
      })
    ]
  })
);
```
