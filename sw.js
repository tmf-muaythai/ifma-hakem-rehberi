/* =========================================================================
   IFMA HAKEM REHBERİ  —  sw.js  (servis çalışanı)
   Temel kabuk + içerik çevrimdışı açılsın diye önbelleğe alınır.
   İçerik güncellenince CACHE sürümünü artır (v1 -> v2).
   ========================================================================= */
var CACHE = "ifma-hakem-v1";
var ASSETS = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "css/styles.css",
  "js/icons.js",
  "js/search.js",
  "js/diagrams.js",
  "js/app.js",
  "data/meta.js",
  "data/categories.js",
  "data/modules.js",
  "data/cards.js",
  "data/flows.js",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png",
  "assets/icons/icon-512-maskable.png",
  "assets/img/fop-ring.png",
  "assets/img/fop-tatami.png",
  "assets/img/ring-dimensions.png",
  "assets/img/head-guard.jpg",
  "assets/img/elbow-guard.jpg",
  "assets/img/shin-guard.jpg",
  "assets/img/gum-shield.jpg",
  "assets/img/groin-guard-male.jpg",
  "assets/img/groin-guard-female.jpg",
  "assets/img/chest-guard.jpg",
  "assets/img/body-protector.jpg",
  "assets/img/wraps.jpg"
];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) { if (k !== CACHE) return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  // Gezinme istekleri: önbellek -> ağ -> index.html
  if (req.mode === "navigate") {
    e.respondWith(
      caches.match(req).then(function (r) {
        return r || fetch(req).catch(function () { return caches.match("index.html"); });
      })
    );
    return;
  }
  // Diğer varlıklar: önce önbellek, sonra ağ (ve önbelleğe ekle)
  e.respondWith(
    caches.match(req).then(function (r) {
      return r || fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { try { c.put(req, copy); } catch (x) {} });
        return res;
      }).catch(function () { return r; });
    })
  );
});
