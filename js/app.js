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
    var map = { tr: { home:"", rules:"kurallar", training:"egitim" }, en: { home:"", rules:"rules", training:"training" } };
    return (map[lg] || map.tr)[tab] || "";
  }
  function parseInitialRoute() {
    var p = pathParts(), lg = D.meta.languages.indexOf(p[0]) >= 0 ? p.shift() : null;
    var slug = p.shift() || "", tab = "home", detail = [];
    if (slug === "kurallar" || slug === "rules") tab = "rules";
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
    moduleSections: {},         // sekmeli modüllerde seçili şampiyona
    moduleDocuments: {},        // sekmeli modüllerde seçili belge
    decisionCodes: {}           // maç kararları tablosunda açık karar kodu
  };
  if (state.active) state.sel = Object.assign({}, state.sel, state.active);

  /* ---------- Yardımcılar ---------- */
  var lang = function () { return state.lang; };
  function t(key) { var u = D.ui[lang()] || D.ui.tr; return u[key] != null ? u[key] : (D.ui.tr[key] || key); }
  function L(o) { if (!o) return ""; return o[lang()] != null ? o[lang()] : (o.tr != null ? o.tr : ""); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function ic(n, c) { return D.icon(n, c); }
  function avatarMarkup(item, fallbackIcon, cls, alt) {
    var src = item && item.avatar;
    var klass = "avatar" + (cls ? " " + cls : "") + (src ? "" : " is-missing");
    var img = src
      ? '<img src="' + esc(src) + '" alt="' + esc(alt || "") + '" loading="lazy" decoding="async" onerror="this.parentNode.classList.add(\'is-missing\')">'
      : "";
    return '<span class="' + klass + '">' + img +
      '<span class="avatar-fallback" aria-hidden="true">' + ic(fallbackIcon || "whistle") + "</span></span>";
  }

  function formatRuleText(value) {
    var namedHeadings = [
      "gizlilik ve amaç", "periyodik gözden geçirme",
      "kapsayıcılık ve kültürel gelişim yolları", "periyodik değerlendirme", "yükümlülüklerin bildirilmesi",
      "confidentiality and purpose", "periodic review", "inclusion and cultural pathways", "review clause", "communication of obligations"
    ];
    return String(value == null ? "" : value).split(/\r?\n/).map(function (line) {
      var trimmed = line.trim();
      if (!trimmed) return '<span class="rule-text-space" aria-hidden="true"></span>';
      var isMain = /^(?:KURAL|RULE)\s+\d/i.test(trimmed);
      var isNumbered = /^\d+(?:\.\d+)*:\s/.test(trimmed);
      var isNamed = namedHeadings.indexOf(trimmed.toLocaleLowerCase("tr")) >= 0;
      if (isMain || isNumbered || isNamed) {
        return '<strong class="rule-text-heading ' + (isMain ? "is-main" : "") + '">' + esc(trimmed) + '</strong>';
      }
      if (/^•\s*/.test(trimmed)) {
        return '<span class="rule-text-bullet"><span class="rule-text-bullet-mark" aria-hidden="true">•</span><span>' +
          esc(trimmed.replace(/^•\s*/, "")) + '</span></span>';
      }
      return '<span class="rule-text-line">' + esc(trimmed) + '</span>';
    }).join("");
  }

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
    if (location.protocol === "file:") return;
    var url = currentRoutePath(lang());
    if (location.pathname !== url) history.replaceState({ifma:true}, "", url + location.search + location.hash);
    var origin = location.origin === "null" ? "https://tmf-muaythai.github.io" : location.origin;
    var tr = document.getElementById("altTr"), en = document.getElementById("altEn"), xd = document.getElementById("altDefault");
    if (tr) tr.href = origin + currentRoutePath("tr");
    if (en) en.href = origin + currentRoutePath("en");
    if (xd) xd.href = origin + currentRoutePath("tr");
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
        '<span class="app-brand-mark"><img src="assets/icons/icon-192.png" alt="" aria-hidden="true"></span>' +
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

  /* ================= TABBAR ================= */
  function renderTabbar() {
    var el = document.getElementById("tabbar");
    el.innerHTML = D.tabs.map(function (tb) {
      return '<button class="tab ' + (state.tab === tb.id ? "on" : "") + '" data-act="tab" data-tab="' + tb.id + '">' +
        ic(tb.icon) + '<span>' + esc(L(tb)) + '</span></button>';
    }).join("");
  }

  /* ================= ANA SAYFA ================= */
  function viewHome() {
    var html = '<div class="fade-in">';
    html += '<header class="home-page-head"><h1>' + esc(t("homeTitle")) + '</h1></header>';
    html += welcomeHeroHtml();

    var scenario = D.training.scenarios[0];
    html += '<div class="section"><div class="section-title">' + esc(t("learnTodayTitle")) + '</div>' +
      '<button class="card" data-act="tab" data-tab="training">' +
        '<div class="card-top"><span class="pill training">' + esc(L(D.labels.training)) + '</span><span class="grow"></span>' + ic("bolt") + '</div>' +
        '<div class="card-title">' + esc(L(scenario.q)) + '</div><div class="card-foot"><span>' + esc(t("learnTodayDesc")) + '</span></div></button></div>';

    html += '<div class="section"><div class="section-head"><div class="section-title">' + esc(t("modulesTitle")) +
      '</div><button class="link" data-act="tab" data-tab="rules">' + esc(t("seeAll")) + '</button></div>' + modGrid(D.modules.slice(0, 4)) + '</div>';

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

  function welcomeHeroHtml() {
    return '<div class="section"><div class="welcome-hero">' +
      '<div class="welcome-hero-title">' + esc(t("welcomeHeroTitle")) + '</div>' +
      '<p class="welcome-hero-text">' + esc(t("welcomeHeroText")) + '</p>' +
      '<div class="welcome-hero-row">' +
        '<figure class="welcome-hero-person">' +
          '<img class="welcome-hero-photo" src="assets/img/bas-hakem-erdinc-patlar-full.png" alt="' + esc(t("mhkViceChairName")) + '">' +
          '<figcaption class="welcome-hero-name"><b>' + esc(t("mhkViceChairName")) + '</b><span class="welcome-hero-badge">' + esc(t("chiefInstructorLabel")) + '</span><span class="welcome-hero-role">' + esc(t("mhkViceChairTitle")) + '</span></figcaption>' +
          '<blockquote class="welcome-hero-quote">' + esc(t("mhkViceChairQuote")) + '</blockquote>' +
        '</figure>' +
        '<figure class="welcome-hero-person">' +
          '<img class="welcome-hero-photo" src="assets/img/bas-hakem-erdogan-aydin-full.png" alt="' + esc(t("mhkChairName")) + '">' +
          '<figcaption class="welcome-hero-name"><b>' + esc(t("mhkChairName")) + '</b><span class="welcome-hero-badge">' + esc(t("chiefInstructorLabel")) + '</span><span class="welcome-hero-role">' + esc(t("mhkChairTitle")) + '</span></figcaption>' +
          '<blockquote class="welcome-hero-quote">' + esc(t("mhkChairQuote")) + '</blockquote>' +
        '</figure>' +
      '</div>' +
    '</div></div>';
  }

  function emptyBox(msg, icon) {
    return '<div class="empty-state">' + ic(icon || "info") + '<div>' + esc(msg) + '</div></div>';
  }

  function footerHtml() {
    return '<footer id="appFooter" class="app-footer">' +
      '<div class="ft-layout">' +
        '<a class="ft-logo-slot ft-logo-ifma" href="https://muaythai.sport/" target="_blank" rel="noopener noreferrer" aria-label="IFMA resmî sitesini aç"><img src="assets/img/ifma-logo.png" alt="International Federation of Muaythai Associations (IFMA)"></a>' +
        '<div class="ft-content">' +
          '<div class="ft-credit">Designed &amp; Developed by <b>Afra UZ</b> · TMF Muaythai</div>' +
          '<div class="ft-feedback">' + esc(t("footerFeedback")) + ' <a href="mailto:afrauz@outlook.com">afrauz@outlook.com</a></div>' +
          '<div class="ft-btns">' +
            '<a class="ft-btn" href="privacy.html" target="_blank" rel="noopener">' + ic("lock") + '<span>' + esc(t("btnPrivacy")) + '</span></a>' +
            '<a class="ft-btn" href="' + RULES_PDF + '" target="_blank" rel="noopener">' + ic("doc") + '<span>' + esc(t("btnRules")) + '</span></a>' +
            '<button class="ft-btn" data-act="qr">' + ic("qr") + '<span>' + esc(t("btnQR")) + '</span></button>' +
            '<a class="ft-btn ft-btn-app" href="' + REFEREE_APP_URL + '" target="_blank" rel="noopener">' + ic("cap") + '<span>' + esc(t("btnRefEng")) + '</span></a>' +
          '</div>' +
          '<div class="ft-fed">' + esc(t("footerFed")) + '</div>' +
        '</div>' +
        '<a class="ft-logo-slot ft-logo-tmf" href="https://muaythai.gov.tr/" target="_blank" rel="noopener noreferrer" aria-label="Türkiye Muaythai Federasyonu resmî sitesini aç"><img src="assets/img/tmf-logo.png" alt="Türkiye Muaythai Federasyonu (TMF)"></a>' +
      '</div>' +
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
        (m.avatar ? avatarMarkup(m, m.icon, "avatar-mod", L(m)) : '<span class="mod-ico">' + ic(m.icon) + '</span>') +
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
      '<div class="detail-labels">' +
      (m.avatar ? avatarMarkup(m, m.icon, "avatar-md", L(m)) : '<span class="mod-ico">' + ic(m.icon) + '</span>') +
      '<span class="badge">' + esc(m.rules) + '</span></div>' +
      '<div class="detail-title">' + esc(L(m)) + '</div>' +
      '<div class="when-text">' + esc(lang() === "tr" ? m.purposeTr : m.purposeEn) + '</div></div>';

    if (m.championships && m.championships.length) return viewChampionshipModule(m, html);
    if (m.weighingOutline && m.weighingOutline.length) return viewWeighingModule(m, html);
    if (m.categorySections && m.categorySections.length) return viewCategoryModule(m, html);
    if (m.refereeSections && m.refereeSections.length) return viewRefereeModule(m, html);
    if (m.fieldSections && m.fieldSections.length) return viewFieldModule(m, html);
    if (m.equipmentSections && m.equipmentSections.length) return viewEquipmentModule(m, html);
    if (m.decisionSections && m.decisionSections.length) return viewDecisionModule(m, html);
    if (m.judgeSections && m.judgeSections.length) return viewJudgeModule(m, html);
    if (m.waiSections && m.waiSections.length) return viewWaiModule(m, html);

    html += '<div class="section-title">' + esc(t("inThisModule")) + '</div><div class="list">';
    m.subtopics.forEach(function (sub) {
      var cs = cardsInSub(mid, sub.id);
      if (cs.length) {
        html += '<button class="row" data-act="open-subtopic" data-module="' + mid + '" data-sub="' + sub.id + '">' +
          '<span class="row-ico">' + ic("doc") + '</span>' +
          '<span class="row-body"><span class="row-title">' + esc(L(sub)) + '</span>' +
          '<span class="row-meta">' + cs.length + ' ' + (lang() === "tr" ? "içerik" : "items") + '</span></span>' +
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

  function viewJudgeModule(m, html) {
    var sections = m.judgeSections || [];
    var sectionId = state.moduleSections[m.id] || sections[0].id;
    var selected = sections.filter(function (item) { return item.id === sectionId; })[0] || sections[0];
    state.moduleSections[m.id] = selected.id;

    html += '<div class="judge-main-tabs" role="tablist" aria-label="' +
      esc(lang() === "tr" ? "Yan Hakem içerikleri" : "Judge contents") + '">';
    sections.forEach(function (item) {
      var on = item.id === selected.id;
      html += '<button id="judge-section-' + esc(item.id) + '" class="judge-main-tab ' + (on ? "on" : "") +
        '" role="tab" aria-selected="' + on + '" data-act="module-section" data-module="' + esc(m.id) +
        '" data-section="' + esc(item.id) + '"><span>' + esc(item.number) + '</span><div><strong>' + esc(L(item)) +
        '</strong><small>' + esc((lang() === "tr" ? "Madde " : "Article ") + item.ruleRef) + '</small></div></button>';
    });
    html += '</div>';

    if (selected.id === "puanlama-sistemleri") {
      html += renderJudgeScoringSystems(selected);
    } else {
      var card = cardIndex[(selected.cards || [])[0]];
      html += '<div class="judge-section-content">' + registrationDocumentPanel(card, selected.id, {
        tabPrefix: "judge-section-", showAllMedia: true, hideDetail: true
      }) + '</div>';
    }

    return '<div class="fade-in">' + html + '</div>';
  }

  function renderJudgeScoringSystems(section) {
    var cards = (section.cards || []).map(function (id) { return cardIndex[id]; }).filter(Boolean);
    var html = '<div class="judge-system-stack" role="tabpanel" aria-labelledby="judge-section-' +
      esc(section.id) + '">';
    cards.forEach(function (c, index) {
      var itemNumber = "3." + (index + 1);
      var labelId = "judge-system-label-" + (index + 1);
      html += '<article class="judge-system-item"><header id="' + labelId + '"><span>' + itemNumber +
        '</span><div><small>' + esc(index === 0 ?
          (lang() === "tr" ? "Kural 29.4 · Vuruş Bazlı (SbS)" : "Rule 29.4 · Strike-by-Strike (SbS)") :
          (lang() === "tr" ? "İçerik daha sonra eklenecek" : "Content will be added later")) +
        '</small><h2>' + esc(L(c.title)) + '</h2></div></header>' +
        registrationDocumentPanel(c, String(index + 1), {
          tabPrefix: "judge-system-label-", showAllMedia: true, hideDetail: true
        }) + '</article>';
    });
    return html + '</div>';
  }

  function viewWaiModule(m, html) {
    var sections = m.waiSections || [];
    var sectionId = state.moduleSections[m.id] || sections[0].id;
    var selected = sections.filter(function (item) { return item.id === sectionId; })[0] || sections[0];
    state.moduleSections[m.id] = selected.id;

    html += '<div class="wai-main-tabs" role="tablist" aria-label="' +
      esc(lang() === "tr" ? "Wai Kru ve Mai Muay içerikleri" : "Wai Kru and Mai Muay contents") + '">';
    sections.forEach(function (item) {
      var on = item.id === selected.id;
      html += '<button id="wai-section-' + esc(item.id) + '" class="wai-main-tab ' + (on ? "on" : "") +
        '" role="tab" aria-selected="' + on + '" data-act="module-section" data-module="' + esc(m.id) +
        '" data-section="' + esc(item.id) + '"><span>' + esc(item.number) + '</span><div><strong>' + esc(L(item)) +
        '</strong><small>' + esc((lang() === "tr" ? "Kural " : "Rule ") + item.ruleRef) + '</small></div></button>';
    });
    html += '</div>';

    if ((selected.cards || []).length > 1) {
      html += renderWaiAreaStack(selected);
    } else {
      var card = cardIndex[(selected.cards || [])[0]];
      html += '<div class="wai-section-content">' + registrationDocumentPanel(card, selected.id, {
        tabPrefix: "wai-section-", showAllMedia: true, hideDetail: true
      }) + '</div>';
    }

    return '<div class="fade-in">' + html + '</div>';
  }

  function renderWaiAreaStack(section) {
    var cards = (section.cards || []).map(function (id) { return cardIndex[id]; }).filter(Boolean);
    var numbers = section.cardNumbers || [];
    var html = '<div class="wai-area-stack" role="tabpanel" aria-labelledby="wai-section-' +
      esc(section.id) + '">';
    cards.forEach(function (c, index) {
      var labelId = "wai-subsection-" + c.id;
      html += '<article class="wai-area-item"><header id="' + esc(labelId) + '"><span>' +
        esc(numbers[index] || String(index + 1)) + '</span><div><small>' +
        esc((lang() === "tr" ? "Kural " : "Rule ") + c.rule) + '</small><h2>' + esc(L(c.title)) +
        '</h2></div></header>' + registrationDocumentPanel(c, c.id, {
          tabPrefix: "wai-subsection-", showAllMedia: true, hideDetail: true
        }) + '</article>';
    });
    return html + '</div>';
  }

  function viewFieldModule(m, html) {
    var sections = m.fieldSections || [];
    var selectedId = state.moduleDocuments[m.id] || sections[0].id;
    var selected = sections.filter(function (item) { return item.id === selectedId; })[0] || sections[0];
    var card = cardIndex[selected.card];
    state.moduleDocuments[m.id] = selected.id;

    html += '<div class="field-direct-tabs" role="tablist" aria-label="' +
      esc(lang() === "tr" ? "Müsabaka Alanı içerikleri" : "Field of Play contents") + '">';
    sections.forEach(function (item) {
      var on = item.id === selected.id;
      html += '<button id="field-tab-' + esc(item.id) + '" class="field-direct-tab ' + (on ? "on" : "") +
        '" role="tab" aria-selected="' + on + '" data-act="module-document" data-module="' + esc(m.id) +
        '" data-document="' + esc(item.id) + '"><span class="field-tab-number">' + esc(item.number) +
        '</span><span><strong>' + esc(L(item)) + '</strong><small>' +
        esc((lang() === "tr" ? "Madde " : "Article ") + item.ruleRef) + '</small></span></button>';
    });
    html += '</div><div class="field-direct-content">' + registrationDocumentPanel(card, selected.id, {
      tabPrefix: "field-tab-", showAllMedia: true, hideDetail: true
    }) + '</div>';
    return '<div class="fade-in">' + html + '</div>';
  }

  function viewEquipmentModule(m, html) {
    var sections = m.equipmentSections || [];
    var sectionId = state.moduleSections[m.id] || sections[0].id;
    var selected = sections.filter(function (item) { return item.id === sectionId; })[0] || sections[0];
    state.moduleSections[m.id] = selected.id;

    html += '<div class="equipment-main-tabs" role="tablist" aria-label="' +
      esc(lang() === "tr" ? "Ekipman modülü içerikleri" : "Equipment module contents") + '">';
    sections.forEach(function (item) {
      var on = item.id === selected.id;
      html += '<button id="equipment-section-' + esc(item.id) + '" class="equipment-main-tab ' + (on ? "on" : "") +
        '" role="tab" aria-selected="' + on + '" data-act="module-section" data-module="' + esc(m.id) +
        '" data-section="' + esc(item.id) + '"><span>' + esc(item.number) + '</span><div><strong>' + esc(L(item)) +
        '</strong><small>' + esc((lang() === "tr" ? "Madde " : "Article ") + item.ruleRef) + '</small></div></button>';
    });
    html += '</div><div class="equipment-section-content" role="tabpanel" aria-labelledby="equipment-section-' + esc(selected.id) + '">';

    if (selected.card) {
      html += registrationDocumentPanel(cardIndex[selected.card], selected.id, {
        tabPrefix: "equipment-section-", showAllMedia: true, hideDetail: true
      });
    } else if (selected.id === "ekipmanlar") {
      html += renderEquipmentCatalog(m, selected);
    } else {
      html += renderEquipmentRestrictions(selected.cards || []);
    }

    html += '</div>';
    return '<div class="fade-in">' + html + '</div>';
  }

  function renderEquipmentCatalog(m, section) {
    var cardIds = section.cards || [];
    var selectedId = state.moduleDocuments[m.id];
    if (!selectedId || cardIds.indexOf(selectedId) < 0) selectedId = cardIds[0];
    state.moduleDocuments[m.id] = selectedId;
    var selectedCard = cardIndex[selectedId];
    var html = '<div class="equipment-catalog-layout"><section class="equipment-catalog" aria-labelledby="equipment-catalog-title">' +
      '<div class="equipment-catalog-head"><div><span>' + esc(lang() === "tr" ? "Fotoğraflı Katalog" : "Photo Catalogue") +
      '</span><h2 id="equipment-catalog-title">' + esc(lang() === "tr" ? "Ekipmanlar" : "Equipment") +
      '</h2></div><b>' + cardIds.length + '</b></div><div class="equipment-tile-grid" role="tablist">';

    cardIds.forEach(function (cardId, index) {
      var c = cardIndex[cardId];
      var on = cardId === selectedId;
      var img = c && c.imgs && c.imgs[0] ? c.imgs[0].src : "assets/img/logo.png";
      html += '<button id="equipment-item-' + esc(cardId) + '" class="equipment-tile ' + (on ? "on" : "") +
        '" role="tab" aria-selected="' + on + '" data-act="equipment-item" data-module="' + esc(m.id) +
        '" data-document="' + esc(cardId) + '"><span class="equipment-tile-number">2.' + (index + 1) +
        '</span><span class="equipment-tile-photo"><img src="' + esc(img) + '" alt="" loading="lazy"></span>' +
        '<strong>' + esc(L(c.title)) + '</strong></button>';
    });

    html += '</div></section><div class="equipment-detail-wrap">' + equipmentDetailPanel(selectedCard,
      "2." + (cardIds.indexOf(selectedId) + 1)) + '</div></div>';
    return html;
  }

  function equipmentDetailPanel(c, number) {
    if (!c) return emptyBox(t("comingSoonTitle"), "shield");
    var html = '<article class="equipment-detail" role="tabpanel" aria-labelledby="equipment-item-' + esc(c.id) + '">' +
      '<header><div class="equipment-detail-meta"><span>' + esc(number) + '</span><b>' +
      esc((lang() === "tr" ? "Madde " : "Article ") + c.rule) + '</b></div><h2>' + esc(L(c.title)) +
      '</h2><p>' + esc(L(c.quick)) + '</p></header>';
    if (c.ruleText) html += '<section class="equipment-rule"><div class="block-label">' + ic("book") +
      esc(t("cardRuleText")) + '</div><div class="rule-text">' + formatRuleText(L(c.ruleText)) + '</div></section>';
    if (hasCardMedia(c)) html += '<section class="equipment-photo"><div class="block-label">' + ic("camera") +
      esc(lang() === "tr" ? "İlgili Ekipman Görseli" : "Related Equipment Image") + '</div>' + mediaBox(c) + '</section>';
    return html + '</article>';
  }

  function renderEquipmentRestrictions(cardIds) {
    var html = '<div class="equipment-restriction-head"><span>' + ic("shield") + '</span><div><h2>' +
      esc(lang() === "tr" ? "Kısıtlamalar" : "Restrictions") + '</h2><p>' +
      esc(lang() === "tr" ? "Kural 15 kapsamında doğrudan yasaklanan veya sınırlandırılan uygulamalar." :
        "Practices directly prohibited or restricted under Rule 15.") + '</p></div></div><div class="equipment-restriction-grid">';
    cardIds.forEach(function (cardId, index) {
      var c = cardIndex[cardId];
      html += '<article class="equipment-restriction-card"><header><span>3.' + (index + 1) + '</span><b>' +
        esc((lang() === "tr" ? "Madde " : "Article ") + c.rule) + '</b></header><h3>' + esc(L(c.title)) +
        '</h3><p>' + esc(L(c.quick)) + '</p><div class="equipment-restriction-rule rule-text">' +
        formatRuleText(L(c.ruleText)) + '</div></article>';
    });
    return html + '</div>';
  }

  function viewDecisionModule(m, html) {
    var sections = m.decisionSections || [];
    var sectionId = state.moduleSections[m.id] || sections[0].id;
    var selected = sections.filter(function (item) { return item.id === sectionId; })[0] || sections[0];
    state.moduleSections[m.id] = selected.id;

    html += '<div class="decision-main-tabs" role="tablist" aria-label="' +
      esc(lang() === "tr" ? "Fauller, Sayım ve Maç Kararları" : "Fouls, Count and Decisions") + '">';
    sections.forEach(function (item) {
      var on = item.id === selected.id;
      html += '<button id="decision-section-' + esc(item.id) + '" class="decision-main-tab ' + (on ? "on" : "") +
        '" role="tab" aria-selected="' + on + '" data-act="module-section" data-module="' + esc(m.id) +
        '" data-section="' + esc(item.id) + '"><span>' + esc(item.number) + '</span><div><strong>' + esc(L(item)) +
        '</strong><small>' + esc((lang() === "tr" ? "Kural " : "Rule ") + item.ruleRef) + '</small></div></button>';
    });
    html += '</div><div class="decision-section-content" role="tabpanel" aria-labelledby="decision-section-' +
      esc(selected.id) + '">' + renderDecisionSection(selected) + '</div>';
    return '<div class="fade-in">' + html + '</div>';
  }

  function renderDecisionSection(section) {
    var cards = (section.cards || []).map(function (id) { return cardIndex[id]; }).filter(Boolean);
    var html = '<div class="decision-direct-stack">';
    cards.forEach(function (c, index) {
      if (c.foulItems && c.foulItems.length) html += renderFoulTypesPanel(c, index + 1);
      else if (c.decisionItems && c.decisionItems.length) html += renderDecisionMatrix(c, index + 1);
      else html += renderDirectRuleCard(c, index + 1);
    });
    return html + '</div>';
  }

  function renderDirectRuleCard(c, number) {
    var html = '<article class="decision-direct-card"><header><span class="decision-item-number">' + number +
      '</span><div><small>' + esc((lang() === "tr" ? "Madde " : "Article ") + c.rule) + '</small><h2>' +
      esc(L(c.title)) + '</h2>' + (c.subtitle ? '<h3>' + esc(L(c.subtitle)) + '</h3>' : '') +
      '</div></header><p class="decision-direct-quick">' + esc(L(c.quick)) + '</p>';
    if (c.ruleText) html += '<section class="decision-rule-block"><div class="block-label">' + ic("book") +
      esc(t("cardRuleText")) + '</div><div class="rule-text">' + formatRuleText(L(c.ruleText)) + '</div></section>';
    var notes = [];
    if (c.when) notes.push({ label: lang() === "tr" ? "Ne zaman?" : "When?", value: L(c.when) });
    if (c.right) notes.push({ label: lang() === "tr" ? "Doğru uygulama" : "Correct action", value: L(c.right) });
    if (c.wrong) notes.push({ label: lang() === "tr" ? "Kaçınılacak hata" : "Avoid", value: L(c.wrong) });
    if (notes.length) html += '<div class="decision-note-grid">' + notes.map(function (note) {
      return '<div><strong>' + esc(note.label) + '</strong><span>' + esc(note.value) + '</span></div>';
    }).join("") + '</div>';
    if (hasCardMedia(c)) html += '<section class="decision-card-media">' + mediaBox(c) + '</section>';
    return html + '</article>';
  }

  function renderFoulTypesPanel(c, number) {
    var html = '<article class="foul-types-panel"><header><span class="decision-item-number">' + number +
      '</span><div><small>' + esc((lang() === "tr" ? "Madde " : "Article ") + c.rule) + '</small><h2>' +
      esc(L(c.title)) + '</h2><p>' + esc(L(c.quick)) + '</p></div><span class="future-video-badge">' + ic("film") +
      esc(lang() === "tr" ? "Video daha sonra" : "Video to follow") + '</span></header>';
    if (c.ruleText) html += '<div class="foul-types-intro rule-text">' + formatRuleText(L(c.ruleText)) + '</div>';
    html += '<div class="foul-types-grid">';
    c.foulItems.forEach(function (item) {
      html += '<article class="foul-type-item"><span>' + esc(item.number) + '</span><p>' +
        esc(lang() === "tr" ? item.tr : item.en) + '</p></article>';
    });
    return html + '</div></article>';
  }

  function renderDecisionMatrix(c, number) {
    var activeCode = state.decisionCodes[c.id];
    var active = c.decisionItems.filter(function (item) { return item.code === activeCode; })[0] || c.decisionItems[0];
    state.decisionCodes[c.id] = active.code;
    function displayCode(item) {
      if (!item.alias) return item.code;
      return item.code === "WO" ? item.code + " / " + item.alias : item.alias + " / " + item.code;
    }
    var html = '<article class="decision-matrix"><header><span class="decision-item-number">' + number +
      '</span><div><small>' + esc((lang() === "tr" ? "Madde " : "Article ") + c.rule) + '</small><h2>' +
      esc(L(c.title)) + '</h2><p>' + esc(L(c.quick)) + '</p></div></header><div class="decision-code-table" role="table"><div class="decision-code-head" role="row"><span role="columnheader">' +
      esc(lang() === "tr" ? "Kod" : "Code") + '</span><span role="columnheader">' +
      esc(lang() === "tr" ? "Kararın Tam Adı" : "Full Decision Name") + '</span><span role="columnheader">' +
      esc(lang() === "tr" ? "Madde" : "Article") + '</span></div>';
    c.decisionItems.forEach(function (item) {
      var on = item.code === active.code;
      html += '<button class="decision-code-row ' + (on ? "on" : "") + '" role="row" aria-expanded="' + on +
        '" data-act="decision-code" data-card="' + esc(c.id) + '" data-code="' + esc(item.code) + '"><strong role="cell">' +
        esc(displayCode(item)) + '</strong><span role="cell">(' + esc(L(item.full)) + ')</span><small role="cell">' +
        esc(item.rule) + '</small></button>';
    });
    html += '</div><article class="decision-code-detail" aria-live="polite"><header><strong>' + esc(displayCode(active)) +
      '</strong><div><h3>' + esc(L(active.full)) + '</h3><span>' + esc((lang() === "tr" ? "Madde " : "Article ") + active.rule) +
      '</span></div></header><p>' + esc(L(active.detail)) + '</p></article></article>';
    return html;
  }

  function viewRefereeModule(m, html) {
    var sections = m.refereeSections || [];
    var sectionId = state.moduleSections[m.id] || sections[0].id;
    var selected = sections.filter(function (item) { return item.id === sectionId; })[0] || sections[0];
    state.moduleSections[m.id] = selected.id;

    var selectedCardId = state.moduleDocuments[m.id];
    if (!selectedCardId || selected.cards.indexOf(selectedCardId) < 0) selectedCardId = selected.cards[0];
    state.moduleDocuments[m.id] = selectedCardId;
    var card = cardIndex[selectedCardId];

    html += '<div class="referee-video-plan">' + ic("film") + '<div><strong>' +
      esc(lang() === "tr" ? "Video anlatım alanları hazır" : "Video lesson areas are ready") + '</strong><span>' +
      esc(lang() === "tr" ? "Her başlığın uygulamalı videosu daha sonra bu içeriklere eklenecek." :
        "A practical video for each topic will be added to these sections later.") + '</span></div></div>';

    html += '<div class="referee-workspace"><nav class="referee-outline" aria-label="' +
      esc(lang() === "tr" ? "Orta Hakem içerikleri" : "Referee contents") + '"><div class="referee-outline-head"><div><span>' +
      esc(lang() === "tr" ? "Görev Akışı" : "Duty Flow") + '</span><small>' +
      esc(lang() === "tr" ? "Maç öncesinden maç sonuna" : "From pre-match to post-match") + '</small></div><b>' +
      sections.length + '</b></div><div class="referee-outline-list" role="tablist">';

    sections.forEach(function (item) {
      var on = item.id === selected.id;
      html += '<button id="ref-section-' + esc(item.id) + '" class="referee-section-item ' + (on ? "on" : "") +
        '" role="tab" aria-selected="' + on + '" data-act="module-section" data-module="' + esc(m.id) +
        '" data-section="' + esc(item.id) + '"><span class="referee-section-number">' + esc(item.number) +
        '</span><span class="referee-section-copy"><strong>' + esc(L(item)) + '</strong><small>' +
        esc((lang() === "tr" ? "Madde " : "Article ") + item.ruleRef) + '</small></span>' + ic("chevron") + '</button>';
    });

    html += '</div></nav><div class="referee-content">';
    if (selected.cards.length > 1) {
      html += '<section class="referee-command-switcher" aria-labelledby="ref-section-' + esc(selected.id) + '"><div><span>' +
        esc(lang() === "tr" ? "Tayca Ring Komutları" : "Thai Ring Commands") + '</span><small>' +
        esc(lang() === "tr" ? "Her komutun videosu ayrı eklenecek" : "Each command will receive its own video") +
        '</small></div><div class="referee-command-tabs" role="tablist">';
      selected.cards.forEach(function (cardId) {
        var command = cardIndex[cardId];
        var on = cardId === selectedCardId;
        html += '<button id="ref-card-' + esc(cardId) + '" class="referee-command-tab ' + (on ? "on" : "") +
          '" role="tab" aria-selected="' + on + '" data-act="module-document" data-module="' + esc(m.id) +
          '" data-document="' + esc(cardId) + '"><span>' + esc(L(command.title).split(" ")[0]) + '</span><small>' +
          esc(command.rule) + '</small></button>';
      });
      html += '</div></section>' + registrationDocumentPanel(card, card.id, {
        tabPrefix: "ref-card-", showAllMedia: true, hideDetail: true
      });
    } else {
      html += registrationDocumentPanel(card, selected.id, {
        tabPrefix: "ref-section-", showAllMedia: true, hideDetail: true
      });
    }
    html += '</div></div>';
    return '<div class="fade-in">' + html + '</div>';
  }

  function flattenWeighingOutline(items, depth, out) {
    out = out || [];
    (items || []).forEach(function (item) {
      out.push({ item: item, depth: depth || 0 });
      if (item.children && item.children.length) flattenWeighingOutline(item.children, (depth || 0) + 1, out);
    });
    return out;
  }

  function viewWeighingModule(m, html) {
    var outline = flattenWeighingOutline(m.weighingOutline, 0, []);
    var selectedId = state.moduleDocuments[m.id] || outline[0].item.id;
    var selected = outline.filter(function (entry) { return entry.item.id === selectedId; })[0] || outline[0];
    state.moduleDocuments[m.id] = selected.item.id;
    var card = cardIndex[selected.item.card];

    html += '<div class="weighing-workspace"><nav class="weighing-outline" aria-label="' +
      esc(lang() === "tr" ? "Tartı modülü içerikleri" : "Weigh-in module contents") + '"><div class="weighing-outline-head"><span>' +
      esc(lang() === "tr" ? "Tartı Akışı" : "Weigh-in Flow") + '</span><small>' + outline.length + ' ' +
      esc(lang() === "tr" ? "başlık" : "topics") + '</small></div><div class="weighing-outline-list">';

    outline.forEach(function (entry) {
      var item = entry.item;
      var on = item.id === selected.item.id;
      html += '<button id="weigh-item-' + esc(item.id) + '" class="weighing-outline-item depth-' + entry.depth + ' ' +
        (on ? "on" : "") + '" aria-current="' + (on ? "true" : "false") + '" data-act="module-document" data-module="' +
        esc(m.id) + '" data-document="' + esc(item.id) + '"><span class="weighing-outline-number">' + esc(item.number) +
        '</span><span class="weighing-outline-copy"><strong>' + esc(L(item)) + '</strong>' +
        (item.ruleRef ? '<small>' + esc((lang() === "tr" ? "Madde " : "Article ") + item.ruleRef) + '</small>' : '') +
        '</span>' + ic("chevron") + '</button>';
    });

    html += '</div></nav><div class="weighing-content">' +
      registrationDocumentPanel(card, selected.item.id, { tabPrefix: "weigh-item-" }) + '</div></div>';
    return '<div class="fade-in">' + html + '</div>';
  }

  function viewCategoryModule(m, html) {
    var sections = m.categorySections || [];
    var selectedId = state.moduleDocuments[m.id] || sections[0].id;
    var selected = sections.filter(function (item) { return item.id === selectedId; })[0] || sections[0];
    var card = cardIndex[selected.card];
    state.moduleDocuments[m.id] = selected.id;

    html += '<div class="category-direct-tabs" role="tablist" aria-label="' +
      esc(lang() === "tr" ? "Kategori kuralları içerikleri" : "Category rules contents") + '">';
    sections.forEach(function (item) {
      var on = item.id === selected.id;
      html += '<button id="category-tab-' + esc(item.id) + '" class="category-direct-tab ' + (on ? "on" : "") +
        '" role="tab" aria-selected="' + on + '" data-act="module-document" data-module="' + esc(m.id) +
        '" data-document="' + esc(item.id) + '"><span class="category-tab-number">' + esc(item.number) +
        '</span><span class="category-tab-copy"><strong>' + esc(L(item)) + '</strong><small>' +
        esc((lang() === "tr" ? "Madde " : "Article ") + item.ruleRef) + '</small></span></button>';
    });
    html += '</div><div class="category-direct-content">' +
      registrationDocumentPanel(card, selected.id, { tabPrefix: "category-tab-", showAllMedia: true, hideDetail: true }) + '</div>' +
      renderCategoryResources(m.categoryResources || []);
    return '<div class="fade-in">' + html + '</div>';
  }

  function renderCategoryResources(resources) {
    if (!resources.length) return "";
    var html = '<section class="category-resources" aria-labelledby="category-resources-title"><div class="category-resources-head">' +
      '<div><span class="category-resources-kicker">' + esc(lang() === "tr" ? "Federasyon Kaynakları" : "Federation Resources") +
      '</span><h2 id="category-resources-title">' + esc(lang() === "tr" ? "İndirilebilir 2026 Tabloları" : "Downloadable 2026 Tables") +
      '</h2><p>' + esc(lang() === "tr" ? "Tabloları PDF veya yüksek çözünürlüklü PNG olarak telefonuna kaydedebilirsin." :
        "Save the tables to your phone as a PDF or high-resolution PNG.") + '</p></div><span class="category-resource-count">' +
      resources.length + '</span></div><div class="category-resource-grid">';

    resources.forEach(function (resource) {
      html += '<article class="category-resource-card"><figure class="category-resource-preview"><img src="' +
        esc(resource.image) + '" alt="' + esc(L(resource.title)) + '" loading="lazy"></figure><div class="category-resource-body">' +
        '<h3>' + esc(L(resource.title)) + '</h3><p>' + esc(L(resource.description)) + '</p><div class="category-resource-actions">' +
        '<a class="category-download pdf" href="' + esc(resource.pdf) + '" download>' + ic("doc") + '<span>' +
        esc(lang() === "tr" ? "PDF İndir" : "Download PDF") + '</span></a><a class="category-download image" href="' +
        esc(resource.image) + '" download>' + ic("camera") + '<span>' + esc(lang() === "tr" ? "Resim İndir" : "Download Image") +
        '</span></a></div></div></article>';
    });
    return html + '</div></section>';
  }

  function viewChampionshipModule(m, html) {
    var championships = m.championships || [];
    var sectionId = state.moduleSections[m.id] || championships[0].id;
    var section = championships.filter(function (s) { return s.id === sectionId; })[0] || championships[0];
    state.moduleSections[m.id] = section.id;

    html += '<div class="championship-tabs" role="tablist" aria-label="' + esc(lang() === "tr" ? "Şampiyona türü" : "Championship type") + '">';
    championships.forEach(function (item) {
      var on = item.id === section.id;
      html += '<button id="champ-tab-' + esc(item.id) + '" class="championship-tab ' + (on ? "on" : "") + '" role="tab" aria-selected="' + on + '" data-act="module-section" data-module="' + m.id + '" data-section="' + item.id + '">' +
        ic(item.id === "ifma" ? "globe" : "flag") + '<span>' + esc(L(item)) + '</span></button>';
    });
    html += '</div>';

    if (!section.documents || !section.documents.length) {
      var empty = lang() === "tr" ? section.emptyTr : section.emptyEn;
      html += '<div class="registration-empty" role="tabpanel" aria-labelledby="champ-tab-' + esc(section.id) + '">' +
        ic("clipboard") + '<div class="registration-empty-title">' + esc(L(section)) + '</div>' +
        '<div class="when-text">' + esc(empty || t("comingSoonTitle")) + '</div></div>';
      return '<div class="fade-in">' + html + '</div>';
    }

    var documentId = state.moduleDocuments[m.id] || section.documents[0].id;
    var documentItem = section.documents.filter(function (item) { return item.id === documentId; })[0] || section.documents[0];
    var card = cardIndex[documentItem.card];
    state.moduleDocuments[m.id] = documentItem.id;

    html += '<div class="registration-documents">' +
      '<div class="section-head registration-section-head"><div><div class="section-title">' +
      esc(lang() === "tr" ? section.documentsTr : section.documentsEn) + '</div><div class="document-count">' +
      section.documents.length + ' ' + esc(lang() === "tr" ? "belge sekmesi" : "document tabs") + '</div></div></div>';

    html += '<div class="document-tabs" role="tablist" aria-label="' + esc(lang() === "tr" ? "Gerekli belgeler" : "Required documents") + '">';
    section.documents.forEach(function (item, index) {
      var sub = (m.subtopics || []).filter(function (s) { return s.id === item.id; })[0];
      var on = item.id === documentItem.id;
      html += '<button id="doc-tab-' + esc(item.id) + '" class="document-tab ' + (on ? "on" : "") + '" role="tab" aria-selected="' + on + '" data-act="module-document" data-module="' + m.id + '" data-document="' + item.id + '">' +
        '<span class="document-tab-number">' + (index + 1) + '</span><span>' + esc(L(sub)) + '</span></button>';
    });
    html += '</div>' + registrationDocumentPanel(card, documentItem.id, {
      showAllMedia: section.id === "national"
    }) + '</div>';
    return '<div class="fade-in">' + html + '</div>';
  }

  function registrationDocumentPanel(c, documentId, options) {
    if (!c) return emptyBox(t("comingSoonTitle"), "doc");
    options = options || {};
    var html = '<section class="registration-document" role="tabpanel" aria-labelledby="' + esc(options.tabPrefix || "doc-tab-") + esc(documentId) + '">';
    html += '<div class="registration-document-head">' +
      (c.rule && c.rule !== "—" ? '<div class="detail-labels"><span class="badge rule-ref">' + esc((lang() === "tr" ? "Madde " : "Article ") + c.rule) + '</span></div>' : '') +
      '<h2>' + esc(L(c.title)) + '</h2><p>' + esc(L(c.quick)) + '</p></div>';

    var hasStructuredMedia = (c.imgs && c.imgs.length) || c.tableDiagram || c.khanTable || c.restTable || c.headInjuryTable || c.roundsTable || c.culturalDurationTable;
    if (hasStructuredMedia || (options.showAllMedia && hasCardMedia(c))) html += '<div class="registration-media"><div class="block-label">' + ic("camera") +
      esc(t("cardDocumentVisual")) + '</div>' + mediaBox(c) + '</div>';

    if (c.ruleText) html += '<div class="registration-rule-text"><div class="block-label">' + ic("book") +
      esc(t("cardRuleText")) + '</div><div class="rule-text">' + formatRuleText(L(c.ruleText)) + '</div></div>';

    if (c.links && c.links.length) html += '<div class="registration-document-links"><div class="section-title">' +
      esc(t("cardLinks")) + '</div><div class="related-row">' + c.links.map(function (lk) {
        return '<a class="doc-link" href="' + esc(lk.url) + '" target="_blank" rel="noopener noreferrer">' +
          ic("doc") + '<span>' + esc(L(lk.label)) + '</span>' + ic("chevron") + '</a>';
      }).join("") + '</div></div>';

    if (!options.hideDetail) html += '<button class="registration-detail-btn" data-act="open-card" data-id="' + c.id + '">' +
      ic("doc") + '<span>' + esc(t("openDocumentDetail")) + '</span>' + ic("chevron") + '</button>';
    html += '</section>';
    return html;
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
    if (c.source) return L(c.source);
    if (c.label === "training") return lang() === "tr" ? "Eğitim uygulaması" : "Training drill";
    if (c.rule === "—" || !c.rule) return "IFMA 2026";
    return "IFMA 2026 • " + (lang() === "tr" ? "Kural " : "Rule ") + c.rule;
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
    html += '<div class="detail-head"><button class="card-fav detail-fav" data-act="fav" data-id="' + c.id + '" aria-label="' + esc(fav ? t("remFav") : t("addFav")) + '">' + ic(fav ? "starf" : "star") + '</button>' +
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
    if (hasCardMedia(c)) html += '<div class="block"><div class="block-label">' + ic("camera") + esc(t("cardVisual")) + '</div>' + mediaBox(c) + '</div>';
    if (c.ruleText) html += '<div class="block rule-text-block"><div class="block-label">' + ic("book") + esc(t("cardRuleText")) + '</div><div class="rule-text">' + formatRuleText(L(c.ruleText)) + '</div></div>';
    if (c.right) html += '<div class="rw-grid"><div class="rw ok"><div class="rw-head">' + ic("check") + esc(t("cardRight")) + '</div><div class="rw-text">' + esc(L(c.right)) + '</div></div></div>';

    html += '<div class="source source-permanent">' + ic("doc") + '<div class="source-body"><b>' + esc(t("cardSource")) + ':</b> ' + esc(c.source ? L(c.source) : D.meta.source) +
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

  function hasCardMedia(c) {
    var m = c.media || {};
    var diagram = window.IFMA.cardDiagram && window.IFMA.cardDiagram[c.id];
    return !!(c.khanTable || c.restTable || c.headInjuryTable || c.roundsTable || c.culturalDurationTable || c.tableDiagram || (c.imgs && c.imgs.length) || diagram || m.photo || m.video || m.animation);
  }

  function renderCulturalDurationTable(c) {
    var table = c.culturalDurationTable;
    var rows = (table.rows || []).map(function (row) {
      return '<tr><th scope="row"><span class="cultural-format-mark"></span><strong>' + esc(L(row.format)) +
        '</strong></th><td data-label="' + esc(L(table.teamLabel)) + '">' + esc(L(row.team)) +
        '</td><td data-label="' + esc(L(table.minimumLabel)) + '"><span class="cultural-time is-min">' +
        esc(L(row.minimum)) + '</span></td><td data-label="' + esc(L(table.allowedLabel)) +
        '"><span class="cultural-time is-allowed">' + esc(L(row.allowed)) + '</span></td><td data-label="' +
        esc(L(table.stopLabel)) + '"><span class="cultural-time is-stop">' + esc(L(row.stop)) + '</span></td></tr>';
    }).join("");
    return '<section class="cultural-duration-card" aria-label="' + esc(L(table.title)) + '"><header>' +
      '<span class="cultural-duration-mark">' + ic("clock") + '</span><div><h3>' + esc(L(table.title)) +
      '</h3><p>' + esc(lang() === "tr" ? "IFMA 2026 · Kural 38" : "IFMA 2026 · Rule 38") +
      '</p></div></header><div class="cultural-duration-wrap"><table><thead><tr><th scope="col">' +
      esc(L(table.formatLabel)) + '</th><th scope="col">' + esc(L(table.teamLabel)) + '</th><th scope="col">' +
      esc(L(table.minimumLabel)) + '</th><th scope="col">' + esc(L(table.allowedLabel)) + '</th><th scope="col">' +
      esc(L(table.stopLabel)) + '</th></tr></thead><tbody>' + rows + '</tbody></table></div><footer>' +
      ic("info") + '<span>' + esc(L(table.note)) + '</span></footer></section>';
  }

  function renderRoundsTable(c) {
    var table = c.roundsTable;
    var rows = (table.rows || []).map(function (row) {
      return '<tr><th scope="row">' + esc(L(row.categories)) + '</th><td><span class="round-duration">' +
        esc(L(row.duration)) + '</span></td><td><span class="round-count">' + esc(row.rounds) + '</span></td><td>' +
        esc(L(row.rest)) + '</td></tr>';
    }).join("");
    return '<section class="rounds-table-card" aria-label="' + esc(L(table.title)) + '"><header><span class="rounds-table-mark">' +
      ic("clock") + '</span><div><h3>' + esc(L(table.title)) + '</h3><p>' +
      esc(lang() === "tr" ? "IFMA 2026 · Kural 7" : "IFMA 2026 · Rule 7") + '</p></div></header>' +
      '<div class="rounds-table-wrap"><table><thead><tr><th scope="col">' + esc(L(table.categoryLabel)) + '</th><th scope="col">' +
      esc(L(table.durationLabel)) + '</th><th scope="col">' + esc(L(table.roundsLabel)) + '</th><th scope="col">' +
      esc(L(table.restLabel)) + '</th></tr></thead><tbody>' + rows + '</tbody></table></div><footer>' + ic("info") +
      '<span>' + esc(L(table.note)) + '</span></footer></section>';
  }

  function renderRestTable(c) {
    var table = c.restTable;
    var rows = (table.rows || []).map(function (row) {
      return '<tr class="' + (row.alert ? "is-alert" : "") + '"><th scope="row">' + esc(row.rounds) +
        '</th><td><span>' + esc(L(row.rest)) + '</span></td></tr>';
    }).join("");
    return '<section class="rest-table-card" aria-label="' + esc(L(table.title)) + '"><header>' + ic("clock") +
      '<div><h3>' + esc(L(table.title)) + '</h3><p>' + esc(lang() === "tr" ? "Kural 10.6 · Fiziksel hazırlık" : "Rule 10.6 · Physical readiness") +
      '</p></div></header><table><thead><tr><th scope="col">' + esc(L(table.roundsLabel)) + '</th><th scope="col">' +
      esc(L(table.restLabel)) + '</th></tr></thead><tbody>' + rows + '</tbody></table><p class="rest-table-note">' +
      ic("info") + '<span>' + esc(L(table.note)) + '</span></p></section>';
  }

  function renderHeadInjuryTable(c) {
    var table = c.headInjuryTable;
    var rows = (table.rows || []).map(function (row) {
      return '<tr class="is-' + esc(row.tone || "caution") + '"><th scope="row"><span class="head-step">' +
        esc(row.step) + '</span><strong>' + esc(L(row.event)) + '</strong></th><td><small class="head-mobile-label">' +
        esc(L(table.windowLabel)) + '</small>' + esc(L(row.window)) + '</td><td><small class="head-mobile-label">' +
        esc(L(table.restLabel)) + '</small><span class="head-rest">' + esc(L(row.rest)) + '</span></td></tr>';
    }).join("");
    var checks = (table.clearance.items || []).map(function (item) {
      return '<li>' + ic("check") + '<span>' + esc(L(item)) + '</span></li>';
    }).join("");

    return '<section class="head-injury-card" aria-label="' + esc(L(table.title)) + '"><header class="head-injury-hero">' +
      '<span class="head-injury-mark">' + ic("shield") + '</span><div><h3>' + esc(L(table.title)) + '</h3><p>' +
      esc(L(table.subtitle)) + '</p></div><span class="head-rule-chip">' + esc(lang() === "tr" ? "Kural 9" : "Rule 9") +
      '</span></header><div class="head-table-wrap"><table class="head-procedure-table"><thead><tr><th scope="col">' +
      esc(L(table.eventLabel)) + '</th><th scope="col">' + esc(L(table.windowLabel)) + '</th><th scope="col">' +
      esc(L(table.restLabel)) + '</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
      '<div class="head-action-grid"><article class="head-action protective"><div class="head-action-top"><span>' +
      esc((lang() === "tr" ? "Madde " : "Article ") + table.protective.rule) + '</span><strong>' +
      esc(L(table.protective.duration)) + '</strong></div><h4>' + esc(L(table.protective.title)) + '</h4><p>' +
      esc(L(table.protective.text)) + '</p></article><article class="head-action clearance"><div class="head-action-top"><span>' +
      esc((lang() === "tr" ? "Madde " : "Article ") + table.clearance.rule) + '</span></div><h4>' +
      esc(L(table.clearance.title)) + '</h4><ul>' + checks + '</ul></article></div><footer class="head-record-note">' +
      ic("info") + '<span>' + esc(L(table.recordNote)) + '</span></footer></section>';
  }

  function khanLevelClass(level) {
    if (level >= 7) return "is-instructor";
    if (level >= 5) return "is-advanced";
    if (level >= 3) return "is-progress";
    return "is-foundation";
  }

  function renderKhanTable(c) {
    var table = c.khanTable;
    var athletes = (table.athletes || []).map(function (row) {
      return '<tr><th scope="row">' + esc(L(row.category)) + '</th><td><span class="khan-level ' +
        khanLevelClass(row.level) + '"><small>Khan</small>' + esc(row.level) + '</span></td></tr>';
    }).join("");
    var officials = (table.officials || []).map(function (row) {
      return '<article class="khan-official-row" role="listitem"><div class="khan-official-role"><span>' +
        esc(L(table.roleLabel)) + '</span><strong>' + esc(L(row.role)) + '</strong></div><span class="khan-level ' +
        khanLevelClass(row.level) + '"><small>Khan</small>' + esc(row.level) + '</span><div class="khan-official-definition"><span>' +
        esc(L(table.definitionLabel)) + '</span><strong>' + esc(L(row.definition)) + '</strong></div></article>';
    }).join("");

    return '<section class="khan-table-card" aria-label="' + esc(L(table.title)) + '">' +
      '<header class="khan-table-hero"><span class="khan-table-mark">' + ic("shield") + '</span><div><h3>' +
      esc(L(table.title)) + '</h3><p>' + esc(L(table.subtitle)) + '</p></div><span class="khan-rule-chip">' +
      esc((lang() === "tr" ? "Kural " : "Rule ") + c.rule) + '</span></header>' +
      '<div class="khan-table-layout"><section class="khan-athlete-panel"><div class="khan-section-title"><span>' +
      esc(L(table.athleteTitle)) + '</span><small>' + esc(L(table.minimumLabel)) + '</small></div>' +
      '<table class="khan-athlete-table" aria-label="' + esc(L(table.athleteTitle)) + '"><thead><tr><th scope="col">' +
      esc(L(table.categoryLabel)) + '</th><th scope="col">' + esc(L(table.minimumLabel)) + '</th></tr></thead><tbody>' +
      athletes + '</tbody></table></section><section class="khan-official-panel"><div class="khan-section-title"><span>' +
      esc(L(table.officialTitle)) + '</span><small>' + esc(L(table.minimumLabel)) + '</small></div><div class="khan-official-list" role="list">' +
      officials + '</div></section></div></section>';
  }

  function mediaBox(c) {
    var m = c.media || {};
    if (c.headInjuryTable) return renderHeadInjuryTable(c);
    if (c.restTable) return renderRestTable(c);
    if (c.khanTable) return renderKhanTable(c);
    if (c.roundsTable) return renderRoundsTable(c);
    if (c.culturalDurationTable) return renderCulturalDurationTable(c);
    var tableVisual = c.tableDiagram && window.IFMA.hasDiagram && window.IFMA.hasDiagram(c.tableDiagram) ?
      window.IFMA.renderDiagram(c.tableDiagram, lang()) : "";
    // Kod tablosu ile gerçek görseller birlikte gösterilebilir.
    if (c.imgs && c.imgs.length) {
      return tableVisual + c.imgs.map(function (im) {
        var cap = L(im.cap);
        return '<figure class="card-img"><img src="' + im.src + '" alt="' + esc(cap) + '" loading="lazy">' +
          (cap ? '<figcaption>' + esc(cap) + '</figcaption>' : "") + '</figure>';
      }).join("");
    }
    if (tableVisual) return tableVisual;
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

    items += sumItem("doc", t("catSources"), sourceChips(["CAT_ROUNDS", "CAT_LIMIT", "FOUL_CCL", "AREA_EQUIP"]));

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

  /* ================= EĞİTİM ================= */
  function viewTraining() {
    var top = state.detail[state.detail.length - 1];
    if (top && top.kind === "quiz") return viewQuiz();
    if (top && top.kind === "micro") return viewMicro(top.id);

    var html = '<div class="fade-in"><div class="detail-title" style="margin-bottom:12px">' + esc(t("trainTitle")) + '</div>';
    html += '<div class="train-tiles">' +
      trainTile("cap", t("trainMicro"), D.training.micro.length + (lang() === "tr" ? " ders" : " lessons"), 'data-act="scroll-micro"') +
      trainTile("target", t("trainScenario"), D.training.scenarios.length + (lang() === "tr" ? " senaryo" : " scenarios"), 'data-act="open-quiz"') +
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

  /* ================= ARAMA =================
     Not: Arama yalnızca üst çubuktaki global arama penceresi (openGlobalSearch)
     üzerinden çalışır — ayrı bir "search" sekmesi/ekranı yok (D.tabs = home/rules/training). */
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
        case "quiz": html = viewTraining(); break;
        case "micro": html = viewTraining(); break;
        default: html = "";
      }
    } else {
      switch (state.tab) {
        case "home": html = viewHome(); break;
        case "rules": html = viewRules(); break;
        case "training": html = viewTraining(); break;
        default: html = viewHome();
      }
    }
    main.innerHTML = html;
    var activeDocumentTab = main.querySelector(".document-tab.on");
    if (activeDocumentTab && activeDocumentTab.parentElement) {
      var documentTabList = activeDocumentTab.parentElement;
      documentTabList.scrollLeft = Math.max(0, activeDocumentTab.offsetLeft - (documentTabList.clientWidth - activeDocumentTab.offsetWidth) / 2);
    }
    syncUrl();
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
      case "module-section": {
        var moduleId = el.getAttribute("data-module");
        var sectionId = el.getAttribute("data-section");
        state.moduleSections[moduleId] = sectionId;
        var moduleData = moduleIndex[moduleId];
        var sectionData = moduleData && (moduleData.championships || []).filter(function (item) { return item.id === sectionId; })[0];
        if (!sectionData && moduleData) sectionData = (moduleData.refereeSections || []).filter(function (item) { return item.id === sectionId; })[0];
        if (!sectionData && moduleData) sectionData = (moduleData.equipmentSections || []).filter(function (item) { return item.id === sectionId; })[0];
        if (!sectionData && moduleData) sectionData = (moduleData.decisionSections || []).filter(function (item) { return item.id === sectionId; })[0];
        if (!sectionData && moduleData) sectionData = (moduleData.judgeSections || []).filter(function (item) { return item.id === sectionId; })[0];
        if (!sectionData && moduleData) sectionData = (moduleData.waiSections || []).filter(function (item) { return item.id === sectionId; })[0];
        if (sectionData && sectionData.documents && sectionData.documents.length) state.moduleDocuments[moduleId] = sectionData.documents[0].id;
        if (sectionData && sectionData.cards && sectionData.cards.length) state.moduleDocuments[moduleId] = sectionData.cards[0];
        if (sectionData && sectionData.card) state.moduleDocuments[moduleId] = sectionData.card;
        render(); break;
      }
      case "module-document":
        state.moduleDocuments[el.getAttribute("data-module")] = el.getAttribute("data-document"); render(); break;
      case "equipment-item":
        state.moduleDocuments[el.getAttribute("data-module")] = el.getAttribute("data-document");
        render();
        if (window.matchMedia("(max-width: 860px)").matches) {
          window.requestAnimationFrame(function () {
            var detail = document.querySelector(".equipment-detail-wrap");
            if (detail) detail.scrollIntoView({ behavior: "smooth", block: "start" });
          });
        }
        break;
      case "decision-code":
        state.decisionCodes[el.getAttribute("data-card")] = el.getAttribute("data-code"); render(); break;
      case "open-subtopic":
        push({ kind: "subtopic", module: el.getAttribute("data-module"), sub: el.getAttribute("data-sub") }); break;
      case "open-card":
        e.preventDefault(); closeSheet(); openCard(el.getAttribute("data-id")); break;
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
