/* =========================================================================
   IFMA HAKEM REHBERİ  —  sw.js  (servis çalışanı)
   Temel kabuk + içerik çevrimdışı açılsın diye önbelleğe alınır.
   İçerik güncellenince CACHE sürümünü artır (v1 -> v2).
   ========================================================================= */
var CACHE = "ifma-hakem-v30";
var ASSETS = [
  "./",
  "index.html",
  "privacy.html",
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
  "assets/img/splash-mobile.jpg",
  "assets/img/splash-desktop.jpg",
  "assets/img/bas-hakem-erdinc-patlar-full.png",
  "assets/img/bas-hakem-erdogan-aydin-full.png",
  "assets/img/logo.png",
  "assets/img/qr.png",
  "assets/img/ifma-logo.png",
  "assets/img/tmf-logo.png",
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
  "assets/img/wraps.jpg",
  "assets/img/form-medical-declaration.jpg",
  "assets/img/form-pregnancy-declaration.jpg",
  "assets/img/form-consent.jpg",
  "assets/img/adel-wada.png",
  "assets/img/muaythai-kategori-siklet-kural-ozet-tablosu-2026.png",
  "assets/img/dogum-yili-yas-kategorileri-2026.png",
  "assets/img/equipment-gloves.png",
  "assets/img/equipment-mongkon-prajiad.png",
  "assets/img/equipment-shorts.jpg",
  "assets/img/equipment-singlet.jpg",
  "assets/img/equipment-head-body-cover-female.jpg",
  "assets/img/equipment-hijab.jpg",
  "assets/img/equipment-head-body-cover-male.jpg",
  "assets/docs/muaythai-kategori-siklet-kural-ozet-tablosu-2026.pdf",
  "assets/docs/muaythai-yas-kategorileri-2026.pdf",
  "assets/avatars/roles/ref.svg",
  "assets/avatars/roles/judge.svg",
  "assets/avatars/roles/time.svg",
  "assets/avatars/roles/jury.svg",
  "assets/avatars/roles/weigh.svg",
  "assets/avatars/roles/corner.svg"
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
  // Yalnızca http/https istekleri: chrome-extension://, data:, blob: gibi
  // şemalar (bazı tarayıcı eklentilerinin kendi istekleri) Cache API
  // tarafından desteklenmez — bunlara hiç dokunmadan tarayıcıya bırak.
  if (req.url.indexOf("http") !== 0) return;
  // Gezinme istekleri: ağ varsa güncel sayfa, yoksa uygulama kabuğu.
  // Pretty URL'ler (/tr/kurallar/, /en/rule/...) GitHub Pages'te de offline açılır.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then(function (res) {
        if (!res || !res.ok) return caches.match("index.html");
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { return c.put(req, copy); }).catch(function () {});
        return res;
      }).catch(function () { return caches.match(req).then(function (r) { return r || caches.match("index.html"); }); })
    );
    return;
  }
  // Diğer varlıklar: önce önbellek, sonra ağ (ve önbelleğe ekle)
  e.respondWith(
    caches.match(req).then(function (r) {
      return r || fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { return c.put(req, copy); }).catch(function () {});
        return res;
      }).catch(function () { return r; });
    })
  );
});
