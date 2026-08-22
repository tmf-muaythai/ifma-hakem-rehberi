/* =========================================================================
   IFMA HAKEM REHBERİ  —  js/app.js
   Durum yönetimi, yönlendirme ve tüm ekranların render'ı (vanilla JS).
   ========================================================================= */
(function () {
  "use strict";
  var D = window.IFMA;

  /* ---------- Güvenli depolama (localStorage yoksa bellek) ---------- */
  var mem = {};
  var store = {
    get: function (k) {
      try { var v = localStorage.getItem(k); return v == null ? mem[k] : v; }
      catch (e) { return mem[k]; }
    },
    set: function (k, v) {
      mem[k] = v;
      try { localStorage.setItem(k, v); } catch (e) {}
    }
  };
  function loadJSON(k, def) { try { return JSON.parse(store.get(k)) || def; } catch (e) { return def; } }
  function saveJSON(k, v) { store.set(k, JSON.stringify(v)); }

  /* ---------- Sabitler + tema (gece/gündüz) ---------- */
  var APP_URL = "https://tmf-muaythai.github.io/ifma-hakem-rehberi/";
  var RULES_PDF = "https://muaythai.sport/wp-content/uploads/2026/05/IFMA-Rules-and-Regulations-v3.057_110526.pdf";
  var REFEREE_APP_URL = "https://tmf-muaythai.github.io/tmf-referee/";
  function currentTheme() {
    var th = store.get("ifma_theme");
    if (th === "dark" || th === "light") return th;
    return D.meta.defaultTheme || "dark";
  }
  function applyTheme() {
    document.documentElement.setAttribute("data-theme", currentTheme());
  }
  function toggleTheme() { store.set("ifma_theme", currentTheme() === "dark" ? "light" : "dark"); applyTheme(); render(); }

  /* ---------- Locale URL yönlendirme ---------- */
  var BASE_PATH = location.pathname.indexOf("/ifma-hakem-rehberi/") >= 0 ? "/ifma-hakem-rehberi/" : "/";
  function pathParts() {
    var p = location.pathname;
    if (BASE_PATH !== "/" && p.indexOf(BASE_PATH) === 0) p = p.slice(BASE_PATH.length);
    else p = p.replace(/^\/+/, "");
    return p.split("/").filter(Boolean);
  }
  function langFromPath() { var p = pathParts(); return D.meta.languages.indexOf(p[0]) >= 0 ? p[0] : null; }
  function routeSlug(tab, lg) {
    var map = { tr: { home:"", rules:"kurallar", task:"gorev", training:"egitim" }, en: { home:"", rules:"rules", task:"task", training:"training" } };
    return (map[lg] || map.tr)[tab] || "";
  }
  function parseInitialRoute() {
    var p = pathParts(), lg = D.meta.languages.indexOf(p[0]) >= 0 ? p.shift() : null;
    var slug = p.shift() || "", tab = "home", detail = [];
    if (slug === "kurallar" || slug === "rules") tab = "rules";
    else if (slug === "gorev" || slug === "task") tab = "task";
    else if (slug === "egitim" || slug === "training") tab = "training";
    else if (slug === "kural" || slug === "rule") { tab = "rules"; if (p[0]) detail.push({kind:"card", id:decodeURIComponent(p[0])}); }
    else if (slug === "modul" || slug === "module") { tab = "rules"; if (p[0]) detail.push({kind:"module", id:decodeURIComponent(p[0])}); }
    return { lang: lg, tab: tab, detail: detail };
  }
  var initialRoute = parseInitialRoute();

  /* ---------- Durum ---------- */
  var state = {
    lang: initialRoute.lang || (store.get("ifma_lang") === "en" ? "en" : (D.meta.defaultLang || "tr")),
    tab: initialRoute.tab || "home",
    detail: initialRoute.detail || [],                 // detay yığını (geri navigasyonu)
    sel: { discipline: null, age: null, gender: null, weight: null, role: null }, // seçilen (uygulanmadan)
    active: loadJSON("ifma_cat", null),   // uygulanmış kategori
    favorites: loadJSON("ifma_fav", []),
    recent: loadJSON("ifma_recent", []),
    quiz: {},                   // senaryo cevap durumları
    q: "",                      // arama sorgusu
    roleMode: store.get("ifma_role_mode") || null
  };
  if (state.active) state.sel = Object.assign({}, state.sel, state.active);

  /* ---------- Yardımcılar ---------- */
  var lang = function () { return state.lang; };
  function t(key) { var u = D.ui[lang()] || D.ui.tr; return u[key] != null ? u[key] : (D.ui.tr[key] || key); }
  function L(o) { if (!o) return ""; return o[lang()] != null ? o[lang()] : (o.tr != null ? o.tr : ""); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function ic(n, c) { return D.icon(n, c); }

  var cardIndex = {}; D.cards.forEach(function (c) { cardIndex[c.id] = c; });
  var moduleIndex = {}; D.modules.forEach(function (m) { moduleIndex[m.id] = m; });
  function cardsInModule(mid) { return D.cards.filter(function (c) { return c.module === mid; }); }
  function cardsInSub(mid, sid) { return D.cards.filter(function (c) { return c.module === mid && c.subtopic === sid; }); }

  function optLabel(dim, id) {
    var arr = D.filters[dim] || []; for (var i = 0; i < arr.length; i++) if (arr[i].id === id) return L(arr[i]);
    return id;
  }

  function formatDate(iso) {
    if (!iso) return "";
    try { return new Intl.DateTimeFormat(lang(), { day:"2-digit", month:"short", year:"numeric" }).format(new Date(iso + "T12:00:00")); }
    catch (e) { return iso; }
  }
  function setDocumentLocale() {
    document.documentElement.lang = lang();
    document.documentElement.dir = (D.meta.rtlLanguages || []).indexOf(lang()) >= 0 ? "rtl" : "ltr";
  }
  function currentRoutePath(lg) {
    var top = state.detail[state.detail.length - 1], parts = [lg];
    if (top && top.kind === "card") parts.push(lg === "tr" ? "kural" : "rule", encodeURIComponent(top.id));
    else if (top && top.kind === "module") parts.push(lg === "tr" ? "modul" : "module", encodeURIComponent(top.id));
    else { var slug = routeSlug(state.tab, lg); if (slug) parts.push(slug); }
    return BASE_PATH + parts.join("/") + "/";
  }
  function syncUrl() {
    var url = currentRoutePath(lang());
    if (location.pathname !== url) history.replaceState({ifma:true}, "", url + location.search + location.hash);
    var origin = location.origin === "null" ? "https://tmf-muaythai.github.io" : location.origin;
    var tr = document.getElementById("altTr"), en = document.getElementById("altEn"), xd = document.getElementById("altDefault");
    if (tr) tr.href = origin + currentRoutePath("tr");
    if (en) en.href = origin + currentRoutePath("en");
    if (xd) xd.href = origin + currentRoutePath("tr");
  }
  function approvalTooltip(c) {
    var a = D.meta.approval || {};
    var who = a.by || t("approverMissing");
    return (lang() === "tr" ? "Onaylayan: " : "Approved by: ") + who + " · " + (a.authority || D.meta.source) + " · " + formatDate(c.revision || a.date || D.meta.revision);
  }

  /* ---------- Navigasyon ---------- */
  function go(tab) { state.tab = tab; state.detail = []; scrollTop(); render(); }
  function push(view) { state.detail.push(view); scrollTop(); render(); }
  function back() { state.detail.pop(); scrollTop(); render(); }
  function scrollTop() { var m = document.getElementById("main"); if (m) m.scrollTop = 0; }

  function openCard(id) {
    if (!cardIndex[id]) return;
    // son görüntülenenlere ekle
    state.recent = [id].concat(state.recent.filter(function (x) { return x !== id; })).slice(0, 8);
    saveJSON("ifma_recent", state.recent);
    push({ kind: "card", id: id });
  }

  function toggleFav(id) {
    var i = state.favorites.indexOf(id);
    if (i >= 0) state.favorites.splice(i, 1); else state.favorites.unshift(id);
    saveJSON("ifma_fav", state.favorites);
    render();
  }

  /* ================= HEADER ================= */
  function activeFilterChips() {
    if (!state.active) return "";
    var out = [];
    ["discipline", "age", "gender", "weight", "role"].forEach(function (dim) {
      if (!state.active[dim]) return;
      var label = dim === "weight" ? state.active[dim] + "kg" : optLabel(dim, state.active[dim]);
      out.push('<button class="ctx-chip" data-act="active-filter-remove" data-dim="' + dim + '" title="' + esc(t("catClear")) + '">' +
        '<span>' + esc(label) + '</span>' + ic("x") + '</button>');
    });
    return out.join("");
  }

  function renderHeader() {
    var h = document.getElementById("appHeader");
    var localeOptions = D.meta.languages.map(function (lg) {
      return '<option value="' + lg + '"' + (lg === lang() ? ' selected' : '') + '>' + esc(D.meta.langNames[lg] || lg.toUpperCase()) + '</option>';
    }).join("");
    var chips = activeFilterChips();
    var filter = '<div class="top-filter-wrap" aria-label="' + esc(t("activeFilters")) + '">' +
      (chips ? '<div class="active-filter-list">' + chips + '</div>' : '') +
      '<button class="top-icon-btn top-filter-btn" data-act="open-cat" title="' + esc(t("pickCategory")) + '">' + ic("filter") +
      (chips ? '' : '<span class="top-control-label">' + esc(t("pickCategory")) + '</span>') + '</button></div>';

    var appBrand = lang() === "en" ? { title:"Referee Guide", sub:"Muaythai rule companion" } : { title:"Hakem Rehberi", sub:"Muaythai kural kılavuzu" };
    h.innerHTML = '<div class="topbar">' +
      '<button class="brand-lockup app-brand" data-act="tab" data-tab="home" aria-label="' + esc(appBrand.title) + '">' +
        '<span class="app-brand-mark">' + ic("book") + '</span>' +
        '<span class="brand-copy"><b>' + esc(appBrand.title) + '</b><small>' + esc(appBrand.sub) + '</small></span>' +
      '</button>' +
      '<button class="global-search-trigger" data-act="global-search" aria-label="' + esc(t("globalSearch")) + '">' +
        ic("search") + '<span>' + esc(t("quickSearchPlaceholder")) + '</span><kbd>⌘K</kbd></button>' +
      '<div class="top-actions">' +
        '<span class="ruleset-chip">' + esc(t("rulesetLabel")) + '</span>' + filter +
        '<label class="locale-select-wrap" title="Language">' + ic("globe") + '<select data-act="locale-select" aria-label="Language">' + localeOptions + '</select></label>' +
        '<button class="top-icon-btn" data-act="theme" aria-label="' + esc(t("themeLabel")) + '">' + ic(currentTheme() === "dark" ? "sun" : "moon") + '</button>' +
        '<span class="network-state ' + (navigator.onLine ? 'is-online' : 'is-offline') + '" title="' + esc(navigator.onLine ? t("online") : t("offline")) + '"></span>' +
      '</div></div>';
  }

  function renderModeBanner() {
    var el = document.getElementById("modeBanner");
    if (!el) return;
    var rid = state.roleMode;
    var r = (D.filters.role || []).filter(function (x) { return x.id === rid; })[0];
    if (!r) { el.hidden = true; el.innerHTML = ""; return; }
    el.hidden = false;
    el.innerHTML = '<div class="mode-banner-inner">' + ic(r.icon || "whistle") +
      '<span><b>' + esc(L(r)) + '</b> ' + esc(t("roleViewing")) + '</span>' +
      '<button data-act="change-role">' + esc(t("change")) + '</button></div>';
  }

  /* ================= TABBAR ================= */
  function renderTabbar() {
    var el = document.getElementById("tabbar");
    el.innerHTML = D.tabs.map(function (tb) {
      var on = (state.tab === tb.id && state.detail.length === 0) || (state.tab === tb.id);
      return '<button class="tab ' + (state.tab === tb.id ? "on" : "") + '" data-act="tab" data-tab="' + tb.id + '">' +
        ic(tb.icon) + '<span>' + esc(L(tb)) + '</span></button>';
    }).join("");
  }

  /* ================= ANA SAYFA ================= */
  function viewHome() {
    var html = '<div class="fade-in">';
    html += '<header class="home-page-head"><h1>' + esc(t("homeTitle")) + '</h1><p>' + esc(t("tagline")) + '</p></header>';

    if (state.roleMode && D.taskModes[state.roleMode]) {
      var tm = D.taskModes[state.roleMode];
      var role = (D.filters.role || []).filter(function (r) { return r.id === state.roleMode; })[0];
      var ids = [];
      (tm.steps || []).forEach(function (step) { (step.cards || []).forEach(function (id) { if (ids.indexOf(id) < 0) ids.push(id); }); });
      html += '<div class="section"><div class="section-head"><div class="section-title">' + esc(t("taskPriorityContent")) + '</div>' +
        '<button class="link" data-act="tab" data-tab="task">' + esc(t("change")) + '</button></div>' +
        '<div class="focus-card"><span class="role-ico">' + ic(role ? role.icon : "whistle") + '</span><div><b>' + esc(role ? L(role) : "") + '</b><span>' + esc(L(tm.focus)) + '</span></div></div>' +
        '<div class="list role-focus-list">' + ids.slice(0, 6).map(function (id) { return cardRow(cardIndex[id]); }).filter(Boolean).join("") + '</div></div>';
    } else {
      html += '<div class="section"><button class="task-prompt" data-act="tab" data-tab="task">' + ic("whistle") +
        '<span><b>' + esc(t("todaysTaskTitle")) + '</b><small>' + esc(t("todaysTaskDesc")) + '</small></span>' + ic("chevron") + '</button></div>';

      var scenario = D.training.scenarios[0];
      html += '<div class="section"><div class="section-title">' + esc(t("learnTodayTitle")) + '</div>' +
        '<button class="card" data-act="tab" data-tab="training">' +
          '<div class="card-top"><span class="pill training">' + esc(L(D.labels.training)) + '</span><span class="grow"></span>' + ic("bolt") + '</div>' +
          '<div class="card-title">' + esc(L(scenario.q)) + '</div><div class="card-foot"><span>' + esc(t("learnTodayDesc")) + '</span></div></button></div>';

      html += '<div class="section"><div class="section-head"><div class="section-title">' + esc(t("modulesTitle")) +
        '</div><button class="link" data-act="tab" data-tab="rules">' + esc(t("seeAll")) + '</button></div>' + modGrid(D.modules.slice(0, 4)) + '</div>';
    }

    html += '<div class="section"><div class="section-title">' + esc(t("favoritesTitle")) + '</div>';
    if (state.favorites.length) html += '<div class="list">' + state.favorites.map(function (id) { return cardRow(cardIndex[id]); }).filter(Boolean).join("") + '</div>';
    else html += emptyBox(t("favoritesEmpty"), "star");
    html += '</div>';

    if (state.recent.length) html += '<div class="section"><div class="section-title">' + esc(t("recentTitle")) + '</div><div class="list">' + state.recent.map(function (id) { return cardRow(cardIndex[id]); }).filter(Boolean).join("") + '</div></div>';

    html += '<div class="section"><div class="source">' + ic("info") + '<div class="source-body"><b>' + esc(t("whatsChangedTitle")) + '</b> — ' +
      esc(lang() === "tr" ? "Ruleset " + D.meta.ruleset + " · revizyon " + formatDate(D.meta.revision) : "Ruleset " + D.meta.ruleset + " · revision " + formatDate(D.meta.revision)) +
      '<br>' + esc(t("offlineReady")) + '</div></div></div>';
    html += footerHtml() + '</div>';
    return html;
  }

  function emptyBox(msg, icon) {
    return '<div class="empty-state">' + ic(icon || "info") + '<div>' + esc(msg) + '</div></div>';
  }

  function footerHtml() {
    return '<footer class="app-footer">' +
      '<div class="ft-credit">Designed &amp; Developed by <b>Afra UZ</b> · TMF Muaythai</div>' +
      '<div class="ft-feedback">' + esc(t("footerFeedback")) + ' <a href="mailto:afrauz@outlook.com">afrauz@outlook.com</a></div>' +
      '<div class="ft-btns">' +
        '<a class="ft-btn" href="privacy.html" target="_blank" rel="noopener">' + ic("lock") + '<span>' + esc(t("btnPrivacy")) + '</span></a>' +
        '<a class="ft-btn" href="' + RULES_PDF + '" target="_blank" rel="noopener">' + ic("doc") + '<span>' + esc(t("btnRules")) + '</span></a>' +
        '<button class="ft-btn" data-act="qr">' + ic("qr") + '<span>' + esc(t("btnQR")) + '</span></button>' +
        '<a class="ft-btn ft-btn-app" href="' + REFEREE_APP_URL + '" target="_blank" rel="noopener">' + ic("cap") + '<span>' + esc(t("btnRefEng")) + '</span></a>' +
      '</div>' +
      '<div class="ft-fed">' + esc(t("footerFed")) + '</div>' +
    '</footer>';
  }
  function openQR() {
    var s = document.getElementById("sheet");
    s.innerHTML = '<div class="sheet-back" data-act="sheet-close"></div>' +
      '<div class="sheet-card">' +
        '<button class="sheet-x" data-act="sheet-close" aria-label="Kapat">' + ic("x") + '</button>' +
        '<div class="sheet-title">' + esc(t("btnQR")) + '</div>' +
        '<img class="qr-img" src="assets/img/qr.png" alt="QR" />' +
        '<div class="qr-url">' + esc(APP_URL) + '</div>' +
      '</div>';
    s.hidden = false;
  }
  function closeSheet() { var s = document.getElementById("sheet"); if (s) { s.hidden = true; s.innerHTML = ""; } }

  /* ================= KURALLAR (modül ızgarası) ================= */
  function viewRules() {
    return '<div class="fade-in"><div class="section"><div class="section-title">' + esc(t("modulesTitle")) +
      '</div>' + modGrid(D.modules) + '</div></div>';
  }

  function modGrid(mods) {
    return '<div class="mod-grid">' + mods.map(function (m) {
      var n = cardsInModule(m.id).length;
      return '<button class="mod-card" data-act="open-module" data-id="' + m.id + '">' +
        '<span class="mod-num">' + m.num + '</span>' +
        '<span class="mod-ico">' + ic(m.icon) + '</span>' +
        '<span class="mod-title">' + esc(L(m)) + '</span>' +
        '<span class="mod-rule">' + esc(m.rules) + '</span>' +
        '<span class="mod-count">' + n + ' ' + (lang() === "tr" ? "kart" : "cards") + '</span>' +
      '</button>';
    }).join("") + '</div>';
  }

  /* ================= MODÜL DETAY ================= */
  function viewModule(mid) {
    var m = moduleIndex[mid]; if (!m) return "";
    var html = subbar(L({ tr: "Kurallar", en: "Rules" }));
    html += '<div class="detail-head" style="margin-bottom:14px">' +
      '<div class="detail-labels"><span class="mod-ico">' + ic(m.icon) + '</span>' +
      '<span class="badge">' + esc(m.rules) + '</span></div>' +
      '<div class="detail-title">' + esc(L(m)) + '</div>' +
      '<div class="when-text">' + esc(lang() === "tr" ? m.purposeTr : m.purposeEn) + '</div></div>';

    html += '<div class="section-title">' + esc(t("inThisModule")) + '</div><div class="list">';
    m.subtopics.forEach(function (sub) {
      var cs = cardsInSub(mid, sub.id);
      if (cs.length) {
        html += '<button class="row" data-act="open-subtopic" data-module="' + mid + '" data-sub="' + sub.id + '">' +
          '<span class="row-ico">' + ic("doc") + '</span>' +
          '<span class="row-body"><span class="row-title">' + esc(L(sub)) + '</span>' +
          '<span class="row-meta">' + cs.length + ' ' + (lang() === "tr" ? "içerik" : "items") +
          statusDots(cs) + '</span></span>' +
          '<span class="row-chev">' + ic("chevron") + '</span></button>';
      } else {
        html += '<div class="row is-empty">' +
          '<span class="row-ico">' + ic("doc") + '</span>' +
          '<span class="row-body"><span class="row-title">' + esc(L(sub)) + '</span>' +
          '<span class="row-meta">' + esc(t("comingSoonTitle")) + '</span></span></div>';
      }
    });
    html += '</div>';
    return '<div class="fade-in">' + html + '</div>';
  }

  function statusDots(cs) {
    var labels = {};
    cs.forEach(function (c) { labels[c.label] = true; });
    var out = "";
    ["ifma", "tmf", "training"].forEach(function (k) {
      if (labels[k]) out += ' <span class="pill ' + k + '" style="font-size:8.5px;padding:2px 6px">' + esc(L(D.labels[k])) + '</span>';
    });
    return out;
  }

  /* ================= ALT BAŞLIK (kart listesi) ================= */
  function viewSubtopic(mid, sid) {
    var m = moduleIndex[mid];
    var sub = (m.subtopics || []).filter(function (s) { return s.id === sid; })[0];
    var cs = cardsInSub(mid, sid);
    var html = subbar(L(m));
    html += '<div class="detail-title" style="margin-bottom:14px">' + esc(L(sub)) + '</div>';
    if (cs.length) html += '<div class="list">' + cs.map(function (c) { return cardRow(c); }).join("") + '</div>';
    else html += placeholderCard();
    return '<div class="fade-in">' + html + '</div>';
  }

  function placeholderCard() {
    return '<div class="card"><div class="card-title">' + esc(t("comingSoonTitle")) + '</div>' +
      '<div class="media">' + ic("camera") + '<div class="media-txt">' + esc(t("photoComing")) + '</div>' +
      '<div class="media-sub">' + esc(t("phaseNote")) + '</div></div></div>';
  }

  /* ---------- Kart satırı (özet) ---------- */
  function cardRow(c) {
    if (!c) return "";
    var fav = state.favorites.indexOf(c.id) >= 0;
    return '<button class="card" data-act="open-card" data-id="' + c.id + '">' +
      '<div class="card-top">' +
        '<span class="pill ' + c.label + '">' + esc(L(D.labels[c.label])) + '</span>' +
        statusBadge(c) +
        '<span class="grow"></span>' +
        '<span class="card-fav ' + (fav ? "on" : "") + '" data-act="fav" data-id="' + c.id + '" role="button" aria-label="fav">' +
          ic(fav ? "starf" : "star") + '</span>' +
      '</div>' +
      '<div class="card-title">' + esc(L(c.title)) + '</div>' +
      '<div class="card-quick">' + esc(clip(L(c.quick), 120)) + '</div>' +
      '<div class="card-foot"><span class="src rule-ref">' + ic("doc") + esc(sourceShort(c)) + '</span>' +
        mediaTags(c) + '</div>' +
    '</button>';
  }
  function clip(s, n) { s = String(s || ""); return s.length > n ? s.slice(0, n - 1) + "…" : s; }
  function sourceShort(c) {
    if (c.label === "training") return lang() === "tr" ? "Eğitim uygulaması" : "Training drill";
    if (c.rule === "—" || !c.rule) return "IFMA 2026";
    return "IFMA 2026 • " + (lang() === "tr" ? "Kural " : "Rule ") + c.rule;
  }
  function statusBadge(c) {
    var st = c.status || {};
    var sv = st[lang()] || "approved";
    var m = D.status[sv] || D.status.approved;
    var cls = sv;
    var iconName = sv === "approved" ? "check" : "info";
    var title = sv === "approved" ? approvalTooltip(c) : L(m);
    return '<span class="badge ' + cls + '" title="' + esc(title) + '" aria-label="' + esc(title) + '">' + ic(iconName) + esc(L(m)) + '</span>';
  }
  function mediaTags(c) {
    var m = c.media || {}; var out = "";
    if (window.IFMA.cardDiagram && window.IFMA.cardDiagram[c.id]) out += '<span class="media-tag">' + ic("grid") + (lang() === "tr" ? "Şema" : "Diagram") + '</span>';
    if (m.photo) out += '<span class="media-tag">' + ic("camera") + (lang() === "tr" ? "Foto" : "Photo") + '</span>';
    if (m.video) out += '<span class="media-tag">' + ic("film") + (lang() === "tr" ? "Video" : "Video") + '</span>';
    if (m.animation) out += '<span class="media-tag">' + ic("play") + (lang() === "tr" ? "Anim." : "Anim.") + '</span>';
    return out;
  }

  /* ================= KART DETAY ================= */
  function viewCard(id) {
    var c = cardIndex[id]; if (!c) return emptyBox("—");
    var m = moduleIndex[c.module];
    var fav = state.favorites.indexOf(c.id) >= 0;
    var st = (c.status || {})[lang()] || "approved";
    var html = subbar(L(m));

    html += '<div class="detail">';
    html += '<div class="detail-head"><div class="detail-labels">' +
      '<span class="pill ' + c.label + '">' + esc(L(D.labels[c.label])) + '</span>' + statusBadge(c) +
      '<span class="grow"></span><button class="card-fav" data-act="fav" data-id="' + c.id + '" aria-label="' + esc(fav ? t("remFav") : t("addFav")) + '">' + ic(fav ? "starf" : "star") + '</button></div>' +
      '<div class="detail-title">' + esc(L(c.title)) + '</div></div>';

    html += '<div class="rule-toolbar">' +
      '<button class="tool-btn" data-act="print-rule">' + ic("print") + '<span>' + esc(t("printPdf")) + '</span></button>' +
      '<button class="tool-btn" data-act="copy-link">' + ic("link") + '<span>' + esc(t("copyLink")) + '</span></button>' +
      '<button class="tool-btn" data-act="toggle-original" data-id="' + c.id + '">' + ic("translate") + '<span>' + esc(t("showOriginal")) + '</span></button>' +
      '</div>';

    html += '<div id="originalPanel" class="original-panel" hidden>' +
      '<div class="source">' + ic("doc") + '<div class="source-body">' +
      (c.original ? esc(typeof c.original === "string" ? c.original : L(c.original)) : esc(t("originalUnavailable"))) +
      '<div style="margin-top:8px"><a class="text-link" href="' + RULES_PDF + '" target="_blank" rel="noopener noreferrer">' + esc(t("openOfficialSource")) + ' →</a></div></div></div></div>';

    if (st === "draft") html += '<div class="note draft-note">' + ic("info") + '<span>' + esc(t("draftNote")) + '</span></div>';
    if (st === "pending") html += '<div class="note">' + ic("info") + '<span>' + esc(L(D.status.pending)) + ' — ' + esc(c.rule) + '</span></div>';

    html += '<div class="block quick-block"><div class="block-label">' + ic("bolt") + esc(t("cardQuickAnswer")) + '</div><div class="quick-text">' + esc(L(c.quick)) + '</div></div>';
    html += '<div class="block"><div class="block-label">' + ic("camera") + esc(t("cardVisual")) + '</div>' + mediaBox(c) + '</div>';
    if (c.right) html += '<div class="rw-grid"><div class="rw ok"><div class="rw-head">' + ic("check") + esc(t("cardRight")) + '</div><div class="rw-text">' + esc(L(c.right)) + '</div></div></div>';

    html += '<div class="source source-permanent">' + ic("doc") + '<div class="source-body"><b>' + esc(t("cardSource")) + ':</b> ' + esc(D.meta.source) +
      (c.rule && c.rule !== "—" ? ' • <b>' + esc(t("cardRuleNo")) + '</b> <span class="rule-ref">' + esc(c.rule) + '</span>' : '') +
      ' • <span>' + esc(lang() === "tr" ? "Revizyon " + formatDate(c.revision || D.meta.revision) : "Revision " + formatDate(c.revision || D.meta.revision)) + '</span></div></div>';

    if (c.links && c.links.length) html += '<div><div class="section-title">' + esc(t("cardLinks")) + '</div><div class="related-row">' + c.links.map(function (lk) {
      return '<a class="doc-link" href="' + esc(lk.url) + '" target="_blank" rel="noopener noreferrer">' + ic("doc") + '<span>' + esc(L(lk.label)) + '</span>' + ic("chevron") + '</a>';
    }).join("") + '</div></div>';

    var rel = (c.related || []).map(function (rid) { return cardIndex[rid]; }).filter(Boolean);
    if (rel.length) html += '<div><div class="section-title">' + esc(t("cardRelated")) + '</div><div class="related-row">' + rel.map(function (r) { return cardRow(r); }).join("") + '</div></div>';
    return '<div class="fade-in">' + html + '</div></div>';
  }

  function whenChips(c) {
    var chips = [];
    (c.discipline || []).forEach(function (d) { chips.push(optLabel("discipline", d)); });
    (c.age || []).forEach(function (a) { chips.push(optLabel("age", a)); });
    (c.gender || []).forEach(function (g) { chips.push(optLabel("gender", g)); });
    if (!chips.length) return "";
    return '<div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:6px">' + chips.map(function (x) {
      return '<span class="badge">' + esc(x) + '</span>'; }).join("") + '</div>';
  }

  function mediaBox(c) {
    var m = c.media || {};
    // Gerçek görsel (resmî şema / fotoğraf) varsa önce onu göster
    if (c.imgs && c.imgs.length) {
      return c.imgs.map(function (im) {
        var cap = L(im.cap);
        return '<figure class="card-img"><img src="' + im.src + '" alt="' + esc(cap) + '" loading="lazy">' +
          (cap ? '<figcaption>' + esc(cap) + '</figcaption>' : "") + '</figure>';
      }).join("");
    }
    // Diyagram varsa görsel anlatım kutusunda onu göster
    var dg = window.IFMA.cardDiagram && window.IFMA.cardDiagram[c.id];
    if (dg && window.IFMA.hasDiagram && window.IFMA.hasDiagram(dg)) {
      var note = "";
      if (m.photo || m.video) {
        note = '<div class="media-note">' + ic("info") + '<span>' +
          (lang() === "tr" ? "Şema — fotoğraf/video sonraki fazda eklenecek." : "Diagram — photo/video added in a later phase.") + '</span></div>';
      }
      return window.IFMA.renderDiagram(dg, lang()) + note;
    }
    var tags = "";
    if (m.photo) tags += '<span class="media-tag">' + ic("camera") + (lang() === "tr" ? "Fotoğraf" : "Photo") + '</span>';
    if (m.video) tags += '<span class="media-tag">' + ic("film") + "Video" + '</span>';
    if (m.animation) tags += '<span class="media-tag">' + ic("play") + (lang() === "tr" ? "Animasyon" : "Animation") + '</span>';
    var primary = m.video ? t("videoComing") : (m.animation ? t("animationComing") : t("photoComing"));
    var picon = m.video ? "film" : (m.animation ? "play" : "camera");
    return '<div class="media">' + ic(picon) + '<div class="media-txt">' + esc(primary) + '</div>' +
      '<div class="media-sub">' + esc(t("phaseNote")) + '</div>' +
      (tags ? '<div class="media-row">' + tags + '</div>' : "") + '</div>';
  }

  /* ================= KATEGORİ SEÇİCİ ================= */
  function viewCategory() {
    var html = subbar(t("appName"));
    html += '<div class="detail-title" style="margin-bottom:14px">' + esc(t("pickCategory")) + '</div>';

    html += filterGroup("discipline", t("catDiscipline"), "layers");
    html += filterGroup("age", t("catAge"), "grid");
    html += filterGroup("gender", t("catGender"), "eye");
    html += filterGroup("weight", t("catWeight"), "scale");
    html += filterGroup("role", t("catRole"), "whistle");

    html += '<div class="cat-actions">' +
      '<button class="btn ghost" data-act="cat-clear">' + ic("x") + esc(t("catClear")) + '</button>' +
      '<button class="btn primary" data-act="cat-apply">' + ic("check") + esc(t("catApply")) + '</button>' +
    '</div>';

    // Canlı özet
    html += '<div style="margin-top:18px">' + categorySummary(state.sel) + '</div>';

    return '<div class="fade-in">' + html + '</div>';
  }

  function filterGroup(dim, title, icon) {
    if (dim === "weight") return weightGroup(title, icon);
    var opts = D.filters[dim] || [];
    var chips = opts.map(function (o) {
      var on = state.sel[dim] === o.id;
      var sub = o.sub ? ' <small>' + esc(L(o.sub)) + '</small>' : "";
      return '<button class="chip ' + (on ? "on teal" : "") + '" data-act="filter" data-dim="' + dim + '" data-val="' + o.id + '">' +
        (o.icon ? ic(o.icon) : "") + esc(L(o)) + sub + '</button>';
    }).join("");
    return '<div class="filter-group"><div class="filter-title">' + ic(icon) + esc(title) + '</div><div class="chips">' + chips + '</div></div>';
  }

  // Sıklet: yaş+cinsiyete göre dinamik liste (TMF 2026 sıklet tablosu)
  function weightGroup(title, icon) {
    var a = state.sel.age, g = state.sel.gender;
    var ws = (a && g) ? window.IFMA.weightsFor(a, g) : null;
    var inner;
    if (!ws) {
      inner = '<div class="when-text" style="margin:0 2px">' +
        esc(lang() === "tr" ? "Önce yaş ve cinsiyet seç — o kategorinin sıkletleri otomatik gelir."
                            : "Pick age and gender first — that category's weights load automatically.") + '</div>';
    } else {
      inner = '<div class="chips">' + ws.map(function (w) {
        var on = state.sel.weight === w;
        return '<button class="chip ' + (on ? "on teal" : "") + '" data-act="filter" data-dim="weight" data-val="' + esc(w) + '">' + esc(w) + ' kg</button>';
      }).join("") + '</div>';
    }
    return '<div class="filter-group"><div class="filter-title">' + ic(icon) + esc(title) + '</div>' + inner + '</div>';
  }

  /* ---------- Kategori özeti ---------- */
  function categorySummary(sel) {
    var d = sel.discipline, a = sel.age;
    var head = '<div class="summary-hd">';
    var any = false;
    ["discipline", "age", "gender", "weight", "role"].forEach(function (dim) {
      if (sel[dim]) { head += '<span class="s-chip">' + esc(optLabel(dim, sel[dim])) + '</span>'; any = true; }
    });
    if (!any) head += '<span class="s-chip">' + esc(t("catNoSelection")) + '</span>';
    head += '</div>';

    if (!any) return '<div class="summary">' + head + '</div>';

    var items = "";

    // Kültürel disiplinler
    if (d === "waikru" || d === "maimuay") {
      var dp = D.disciplineProfiles[d];
      items += sumItem("info", t("catDiscipline"), esc(L(dp)));
      if (dp.duration) items += sumItem("clock", t("catRound"), esc(L(dp.duration)));
      items += sumItem("target", t("catTechLimit"), esc(L(dp.contact)));
      items += sumItem("doc", t("catSources"), sourceChips(["WAI_WHAT", "WAI_LIMIT"]));
      return '<div class="summary">' + head + items + '</div>';
    }

    // Dövüş/teknik disiplinler
    var p = a ? D.ageProfiles[a] : null;
    if (p) {
      items += sumItem("clock", t("catRound"),
        '<span class="big">' + p.roundMin + ' ' + (lang() === "tr" ? "dk" : "min") + ' × ' + p.rounds + '</span>' +
        '<small>' + p.restMin + ' ' + (lang() === "tr" ? "dk dinlenme" : "min rest") + ' • Kural 7</small>');
      var headTxt = L(D.headRules[p.head]);
      if (d === "semi") headTxt += (lang() === "tr" ? " • Semi: sert vuruş yok" : " • Semi: no hard strikes");
      items += sumItem("target", t("catTechLimit"), esc(headTxt) + '<small>Kural 31.3</small>');
      items += sumItem("shield", t("catEquip"), esc(equipText(sel)) + '<small>Kural 15</small>');
      items += sumItem("flag", t("catCount"), esc(L(D.cclRules[p.ccl])) + '<small>Kural 30.2.5 • Khan ≥ ' + p.minKhan + ' (Kural 6)</small>');
    } else {
      items += '<div class="note">' + ic("info") + '<span>' + esc(lang() === "tr"
        ? "Yaş kategorisi seç: süre, kısıt ve sayım limiti yaşa göre değişir."
        : "Pick an age category: time, limits and count vary by age.") + '</span></div>';
    }
    // Sıklet
    if (sel.weight) items += sumItem("scale", t("catWeight"), '<span class="big">' + esc(sel.weight) + ' kg</span><small>' + (lang() === "tr" ? "Kural 4 — yaş+cinsiyete göre" : "Rule 4 — by age+gender") + '</small>');

    items += sumItem("doc", t("catSources"), sourceChips(["CAT_ROUNDS", "CAT_REST", "CAT_LIMIT", "FOUL_CCL", "AREA_EQUIP"]));

    return '<div class="summary">' + head + items + '</div>';
  }

  function equipText(sel) {
    var base = lang() === "tr" ? "Eldiven, dişlik, kasık koruyucu" : "Gloves, gum shield, groin guard";
    if (sel.gender === "female") base += lang() === "tr" ? " + göğüs/kadın kasık koruyucu" : " + chest/female groin guard";
    return base;
  }
  function sumItem(icon, key, valHtml) {
    return '<div class="sum-item"><div class="sum-key">' + ic(icon) + esc(key) + '</div><div class="sum-val">' + valHtml + '</div></div>';
  }
  function sourceChips(ids) {
    return '<div class="step-links" style="margin-top:2px">' + ids.map(function (id) {
      var c = cardIndex[id]; if (!c) return "";
      return '<button class="mini-link" data-act="open-card" data-id="' + id + '">' + ic("doc") + esc(L(c.title)) + '</button>';
    }).join("") + '</div>';
  }

  /* ================= GÖREV MODU ================= */
  function viewTask() {
    // rol seçili mi?
    var top = state.detail[state.detail.length - 1];
    if (top && top.kind === "role") return viewRole(top.id);

    var html = '<div class="fade-in"><div class="section-title">' + esc(t("taskPickRole")) + '</div>';
    html += '<div class="role-grid">' + D.filters.role.map(function (r) {
      return '<button class="role-card" data-act="open-role" data-id="' + r.id + '">' +
        '<span class="role-ico">' + ic(r.icon) + '</span>' +
        '<span class="role-name">' + esc(L(r)) + '</span></button>';
    }).join("") + '</div></div>';
    return html;
  }

  function viewRole(rid) {
    var r = D.filters.role.filter(function (x) { return x.id === rid; })[0];
    var tm = D.taskModes[rid];
    var html = subbar(t("taskPickRole"));
    html += '<div class="detail-head" style="margin-bottom:12px"><div class="detail-labels">' +
      '<span class="role-ico">' + ic(r.icon) + '</span></div>' +
      '<div class="detail-title">' + esc(L(r)) + '</div></div>';
    if (tm) {
      html += '<div class="focus-banner">' + ic("bolt") + ' <b>' + esc(t("taskPriorityContent")) + ':</b> ' + esc(L(tm.focus)) + '</div>';
      html += '<div class="section-title">' + esc(t("taskFlowTitle")) + '</div><div class="flow">';
      tm.steps.forEach(function (s, i) {
        var links = (s.cards || []).map(function (cid) {
          var c = cardIndex[cid]; if (!c) return "";
          return '<button class="mini-link" data-act="open-card" data-id="' + cid + '">' + ic("doc") + esc(L(c.title)) + '</button>';
        }).join("");
        html += '<div class="step" data-n="' + (i + 1) + '"><div class="step-card">' +
          '<div class="step-title">' + esc(L(s)) + '</div>' +
          (links ? '<div class="step-links">' + links + '</div>' : "") + '</div></div>';
      });
      html += '</div>';
    }
    return '<div class="fade-in">' + html + '</div>';
  }

  /* ================= EĞİTİM ================= */
  function viewTraining() {
    var top = state.detail[state.detail.length - 1];
    if (top && top.kind === "quiz") return viewQuiz();
    if (top && top.kind === "micro") return viewMicro(top.id);

    var html = '<div class="fade-in"><div class="detail-title" style="margin-bottom:12px">' + esc(t("trainTitle")) + '</div>';
    html += '<div class="train-tiles">' +
      trainTile("cap", t("trainMicro"), D.training.micro.length + (lang() === "tr" ? " ders" : " lessons"), 'data-act="scroll-micro"') +
      trainTile("target", t("trainScenario"), D.training.scenarios.length + (lang() === "tr" ? " senaryo" : " scenarios"), 'data-act="open-quiz"') +
      trainTile("check", t("trainCompare"), lang() === "tr" ? "Doğru / yanlış" : "Right / wrong", 'data-act="open-quiz"') +
      trainTile("film", t("trainSim"), esc(t("comingSoonTitle")), '') +
    '</div>';

    // Mikro dersler
    html += '<div class="section" id="microList" style="margin-top:18px"><div class="section-title">' + esc(t("trainMicro")) + '</div><div class="list">';
    D.training.micro.forEach(function (mm) {
      html += '<button class="row" data-act="open-micro" data-id="' + mm.id + '">' +
        '<span class="row-ico">' + ic("cap") + '</span>' +
        '<span class="row-body"><span class="row-title">' + esc(L(mm)) + '</span>' +
        '<span class="row-meta">' + mm.cards.length + ' ' + (lang() === "tr" ? "kart" : "cards") + '</span></span>' +
        '<span class="row-chev">' + ic("chevron") + '</span></button>';
    });
    html += '</div></div>';

    // Senaryo kısayolu
    html += '<div class="section"><button class="training-scenario-cta" data-act="open-quiz">' + ic("target") + '<span><b>' + esc(t("trainScenario")) + '</b><small>' + D.training.scenarios.length + (lang() === "tr" ? " senaryo" : " scenarios") + '</small></span><span class="inline-cta">' + esc(t("trainStart")) + ' →</span></button></div>';

    return html + '</div>';
  }
  function trainTile(icon, name, sub, attr) {
    return '<button class="train-tile" ' + attr + '>' + ic(icon) +
      '<span class="train-name">' + esc(name) + '</span><span class="train-sub">' + esc(sub) + '</span></button>';
  }

  function viewMicro(id) {
    var mm = D.training.micro.filter(function (x) { return x.id === id; })[0];
    var html = subbar(t("trainTitle"));
    html += '<div class="detail-title" style="margin-bottom:12px">' + esc(L(mm)) + '</div>';
    html += '<div class="list">' + mm.cards.map(function (cid) { return cardRow(cardIndex[cid]); }).filter(Boolean).join("") + '</div>';
    return '<div class="fade-in">' + html + '</div>';
  }

  function viewQuiz() {
    var html = subbar(t("trainTitle"));
    html += '<div class="detail-title" style="margin-bottom:6px">' + esc(t("trainScenario")) + '</div>';
    var answered = Object.keys(state.quiz).length, total = D.training.scenarios.length;
    html += '<div class="when-text" style="margin-bottom:6px">' + answered + '/' + total + '</div>' +
      '<div class="progress-wrap"><div class="progress-bar" style="width:' + (answered / total * 100) + '%"></div></div>';

    html += '<div style="margin-top:14px;display:flex;flex-direction:column;gap:14px">';
    D.training.scenarios.forEach(function (s) {
      var chosen = state.quiz[s.id];
      html += '<div class="quiz"><div class="quiz-q">' + esc(L(s.q)) + '</div><div class="quiz-opts">';
      s.options.forEach(function (o, i) {
        var cls = "";
        if (chosen != null) {
          if (o.correct) cls = "correct";
          else if (chosen === i) cls = "wrong";
        }
        var letter = String.fromCharCode(65 + i);
        html += '<button class="opt ' + cls + '" data-act="quiz" data-q="' + s.id + '" data-i="' + i + '"' +
          (chosen != null ? " disabled" : "") + '>' +
          '<span class="dot-ix">' + (cls === "correct" ? ic("check") : (cls === "wrong" ? ic("x") : letter)) + '</span>' +
          '<span>' + esc(L(o)) + '</span></button>';
      });
      html += '</div>';
      html += '<div class="quiz-explain ' + (chosen != null ? "" : "hidden") + '">' + ic("info") + ' ' + esc(L(s.explain)) +
        ' <button class="mini-link" data-act="open-card" data-id="' + s.card + '" style="margin-left:6px">' + ic("doc") + (lang() === "tr" ? "Kuralı aç" : "Open rule") + '</button></div>';
      html += '</div>';
    });
    html += '</div>';
    return '<div class="fade-in">' + html + '</div>';
  }

  function openGlobalSearch() {
    var sh = document.getElementById("sheet");
    sh.innerHTML = '<div class="sheet-back" data-act="sheet-close"></div><section class="search-dialog" role="dialog" aria-modal="true" aria-label="' + esc(t("globalSearch")) + '">' +
      '<div class="search-dialog-head"><div class="search-box">' + ic("search") +
      '<input id="globalSearchInput" type="search" autocomplete="off" placeholder="' + esc(t("quickSearchPlaceholder")) + '" value="' + esc(state.q) + '">' +
      '<button class="search-clear" data-act="global-search-clear" aria-label="' + esc(t("catClear")) + '">' + ic("x") + '</button></div>' +
      '<button class="sheet-close-btn" data-act="sheet-close" aria-label="' + esc(t("back")) + '">' + ic("x") + '</button></div>' +
      '<div class="global-search-hint">' + esc(t("searchExamples")) + '</div><div id="globalSearchResults">' + searchResultsHtml(state.q) + '</div></section>';
    sh.hidden = false;
    var inp = document.getElementById("globalSearchInput");
    if (inp) { inp.focus(); inp.oninput = function () { state.q = inp.value; var r = document.getElementById("globalSearchResults"); if (r) r.innerHTML = searchResultsHtml(state.q); }; }
  }

  function copyPermanentLink(btn) {
    var url = location.href;
    function done() { if (!btn) return; var sp = btn.querySelector("span"); if (sp) { var old = sp.textContent; sp.textContent = t("copied"); setTimeout(function(){ sp.textContent = old; }, 1400); } }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done).catch(function(){});
    else { var ta=document.createElement("textarea"); ta.value=url; document.body.appendChild(ta); ta.select(); try{document.execCommand("copy");done();}catch(e){} document.body.removeChild(ta); }
  }

  /* ================= ARAMA ================= */
  function viewSearch() {
    var html = '<div class="fade-in">';
    html += '<div class="search-box">' + ic("search") +
      '<input id="searchInput" type="search" autocomplete="off" placeholder="' + esc(t("quickSearchPlaceholder")) + '" value="' + esc(state.q) + '">' +
      '<button class="search-clear" data-act="search-clear" ' + (state.q ? "" : 'style="visibility:hidden"') + '>' + ic("x") + '</button>' +
    '</div>';
    html += '<div id="searchResults">' + searchResultsHtml(state.q) + '</div>';
    return html + '</div>';
  }

  function searchResultsHtml(q) {
    q = (q || "").trim();
    if (!q) {
      var ex = ["U14 kafa diz", "YOOT", "RSC", "31.2.18", "20 sayımı", "10-8", "tartı", "CCL"];
      return '<div class="result-meta">' + esc(t("searchTryTitle")) + '</div>' +
        '<div class="chips-hint">' + ex.map(function (x) {
          return '<button class="chip" data-act="search-chip" data-q="' + esc(x) + '">' + ic("search") + esc(x) + '</button>'; }).join("") + '</div>';
    }
    var res = D.search(q, lang(), { cards: D.cards, modules: D.modules, cardIndex: cardIndex, moduleIndex: moduleIndex });
    if (!res.length) return emptyBox(t("searchNoResults"), "search");
    var out = '<div class="result-meta">' + esc(t("searchResultsFor")) + ' “' + esc(q) + '” — ' + res.length + '</div><div class="list">';
    res.forEach(function (r) {
      if (r.type === "card") out += cardRow(cardIndex[r.id]);
      else if (r.type === "module") {
        var m = moduleIndex[r.id];
        out += '<button class="row" data-act="open-module" data-id="' + m.id + '">' +
          '<span class="row-ico">' + ic(m.icon) + '</span>' +
          '<span class="row-body"><span class="row-title">' + esc(L(m)) + '</span><span class="row-meta">' + esc(m.rules) + '</span></span>' +
          '<span class="row-chev">' + ic("chevron") + '</span></button>';
      }
    });
    return out + '</div>';
  }

  /* ---------- Alt bar (geri) ---------- */
  function subbar(crumb, color) {
    return '<div class="subbar">' +
      '<button class="back-btn" data-act="back">' + ic("back") + esc(t("back")) + '</button>' +
      '<span class="crumb">' + esc(crumb || "") + '</span></div>';
  }

  /* ================= RENDER DISPATCH ================= */
  function render() {
    var app = document.getElementById("app");
    app.setAttribute("data-lang", lang());
    setDocumentLocale();
    renderHeader();
    renderModeBanner();
    renderTabbar();

    var main = document.getElementById("main");
    var top = state.detail[state.detail.length - 1];
    var html;

    if (top) {
      switch (top.kind) {
        case "card": html = viewCard(top.id); break;
        case "module": html = viewModule(top.id); break;
        case "subtopic": html = viewSubtopic(top.module, top.sub); break;
        case "category": html = viewCategory(); break;
        case "role": html = viewTask(); break;      // viewTask kendi içinde role'ü çizer
        case "quiz": html = viewTraining(); break;
        case "micro": html = viewTraining(); break;
        default: html = "";
      }
    } else {
      switch (state.tab) {
        case "home": html = viewHome(); break;
        case "rules": html = viewRules(); break;
        case "task": html = viewTask(); break;
        case "training": html = viewTraining(); break;
        case "search": html = viewSearch(); break;
        default: html = viewHome();
      }
    }
    main.innerHTML = html;
    syncUrl();

    // Arama girişi: odak ve canlı sonuç
    var si = document.getElementById("searchInput");
    if (si) {
      si.focus();
      var v = si.value; si.value = ""; si.value = v; // imleci sona al
      si.oninput = function () {
        state.q = si.value;
        var rc = document.getElementById("searchResults");
        if (rc) rc.innerHTML = searchResultsHtml(state.q);
        var cl = document.querySelector('[data-act="search-clear"]');
        if (cl) cl.style.visibility = state.q ? "visible" : "hidden";
      };
    }
  }

  /* ================= OLAY YÖNETİMİ (delege) ================= */
  document.addEventListener("click", function (e) {
    var el = e.target.closest ? e.target.closest("[data-act]") : null;
    if (!el) return;
    var act = el.getAttribute("data-act");

    switch (act) {
      case "lang":
        state.lang = el.getAttribute("data-lang"); store.set("ifma_lang", state.lang); render(); break;
      case "locale-select":
        break;
      case "global-search":
        openGlobalSearch(); break;
      case "global-search-clear":
        state.q = ""; var gsi = document.getElementById("globalSearchInput"); if (gsi) { gsi.value = ""; gsi.focus(); }
        var gsr = document.getElementById("globalSearchResults"); if (gsr) gsr.innerHTML = searchResultsHtml(""); break;
      case "active-filter-remove": {
        var ad = el.getAttribute("data-dim"); if (state.active && ad) { state.active[ad] = null; state.sel[ad] = null;
          var anyActive = ["discipline","age","gender","weight","role"].some(function(k){return state.active[k];});
          if (!anyActive) state.active = null; saveJSON("ifma_cat", state.active); render(); } break;
      }
      case "change-role":
        state.tab = "task"; state.detail = []; scrollTop(); render(); break;
      case "print-rule":
        window.print(); break;
      case "copy-link":
        copyPermanentLink(el); break;
      case "toggle-original": {
        var op = document.getElementById("originalPanel"); if (op) { op.hidden = !op.hidden; var tx = el.querySelector("span"); if (tx) tx.textContent = op.hidden ? t("showOriginal") : t("hideOriginal"); } break;
      }
      case "theme":
        toggleTheme(); break;
      case "qr":
        openQR(); break;
      case "sheet-close":
        closeSheet(); break;
      case "tab":
        go(el.getAttribute("data-tab")); break;
      case "open-cat":
        // kategori seçiciyi detay olarak aç
        state.detail = []; state.detail.push({ kind: "category" }); scrollTop(); render(); break;
      case "open-module":
        push({ kind: "module", id: el.getAttribute("data-id") }); break;
      case "open-subtopic":
        push({ kind: "subtopic", module: el.getAttribute("data-module"), sub: el.getAttribute("data-sub") }); break;
      case "open-card":
        e.preventDefault(); closeSheet(); openCard(el.getAttribute("data-id")); break;
      case "open-role":
        state.roleMode = el.getAttribute("data-id"); store.set("ifma_role_mode", state.roleMode);
        state.tab = "task"; push({ kind: "role", id: state.roleMode }); break;
      case "open-quiz":
        state.tab = "training"; push({ kind: "quiz" }); break;
      case "open-micro":
        state.tab = "training"; push({ kind: "micro", id: el.getAttribute("data-id") }); break;
      case "back":
        back(); break;
      case "fav":
        e.preventDefault(); e.stopPropagation(); toggleFav(el.getAttribute("data-id")); break;
      case "filter": {
        var dim = el.getAttribute("data-dim"), val = el.getAttribute("data-val");
        state.sel[dim] = (state.sel[dim] === val ? null : val);
        // yaş/cinsiyet değişince geçersiz kalan sıkleti temizle
        if (dim === "age" || dim === "gender") {
          var ws = window.IFMA.weightsFor(state.sel.age, state.sel.gender);
          if (!ws || ws.indexOf(state.sel.weight) < 0) state.sel.weight = null;
        }
        render(); break;
      }
      case "cat-apply": {
        var hasAny = ["discipline", "age", "gender", "weight", "role"].some(function (k) { return state.sel[k]; });
        state.active = hasAny ? Object.assign({}, state.sel) : null;
        saveJSON("ifma_cat", state.active);
        state.detail = []; state.tab = "home"; scrollTop(); render(); break;
      }
      case "cat-clear":
        state.sel = { discipline: null, age: null, gender: null, weight: null, role: null };
        state.active = null; saveJSON("ifma_cat", null); render(); break;
      case "quiz": {
        var qid = el.getAttribute("data-q"), qi = parseInt(el.getAttribute("data-i"), 10);
        if (state.quiz[qid] == null) { state.quiz[qid] = qi; render(); }
        break;
      }
      case "search-chip":
        state.q = el.getAttribute("data-q");
        if (!document.getElementById("sheet").hidden) openGlobalSearch(); else { state.tab = "home"; state.detail = []; openGlobalSearch(); } break;
      case "search-clear":
        state.q = ""; var si2 = document.getElementById("searchInput"); if (si2) { si2.value = ""; si2.focus(); }
        var rc2 = document.getElementById("searchResults"); if (rc2) rc2.innerHTML = searchResultsHtml("");
        el.style.visibility = "hidden"; break;
      case "scroll-micro": {
        var ml = document.getElementById("microList"); if (ml) ml.scrollIntoView({ behavior: "smooth", block: "start" }); break;
      }
    }
  });

  document.addEventListener("change", function (e) {
    var el = e.target;
    if (el && el.matches && el.matches('select[data-act="locale-select"]')) {
      var lg = el.value; if (D.meta.languages.indexOf(lg) >= 0) { state.lang = lg; store.set("ifma_lang", lg); render(); }
    }
  });

  document.addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && String(e.key).toLowerCase() === "k") { e.preventDefault(); openGlobalSearch(); }
    if (e.key === "Escape") closeSheet();
  });

  var longPressTimer = null;
  document.addEventListener("pointerdown", function (e) {
    var b = e.target.closest && e.target.closest(".global-search-trigger");
    if (!b) return;
    longPressTimer = setTimeout(function () { openGlobalSearch(); }, 520);
  });
  ["pointerup","pointercancel","pointerleave"].forEach(function (ev) { document.addEventListener(ev, function(){ if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer=null; } }); });
  window.addEventListener("online", renderHeader);
  window.addEventListener("offline", renderHeader);
  window.addEventListener("popstate", function(){ var r=parseInitialRoute(); state.lang=r.lang||state.lang; state.tab=r.tab; state.detail=r.detail; render(); });

  /* ================= BAŞLAT ================= */
  applyTheme();
  render();
})();
