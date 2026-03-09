self.addEventListener("install",event=>{

event.waitUntil(

caches.open("reminder-cache").then(cache=>{

return cache.addAll([
"/",
"/index.html",
"/style.css",
"/app.js"
])

})

)

})

const CACHE_NAME = "reminder-app-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});