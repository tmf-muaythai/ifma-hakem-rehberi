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

  /* ---------- Durum ---------- */
  var state = {
    lang: (store.get("ifma_lang") === "en" ? "en" : (D.meta.defaultLang || "tr")),
    tab: "home",
    detail: [],                 // detay yığını (geri navigasyonu)
    sel: { discipline: null, age: null, gender: null, weight: null, role: null }, // seçilen (uygulanmadan)
    active: loadJSON("ifma_cat", null),   // uygulanmış kategori
    favorites: loadJSON("ifma_fav", []),
    recent: loadJSON("ifma_recent", []),
    quiz: {},                   // senaryo cevap durumları
    q: ""                       // arama sorgusu
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
  function renderHeader() {
    var h = document.getElementById("appHeader");
    var langBtns = D.meta.languages.map(function (lg) {
      return '<button data-act="lang" data-lang="' + lg + '" class="' + (lg === lang() ? "on" : "") + '">' +
        (lg.toUpperCase()) + '</button>';
    }).join("");

    var ctx;
    if (state.active) {
      var chips = [];
      ["discipline", "age", "gender", "role"].forEach(function (dim) {
        if (state.active[dim]) chips.push('<span class="ctx-chip">' + ic(dim === "role" ? "whistle" : (dim === "discipline" ? "layers" : (dim === "age" ? "grid" : "eye"))) + esc(optLabel(dim, state.active[dim])) + '</span>');
      });
      ctx = chips.join("") +
        '<button class="ctx-btn" data-act="open-cat">' + ic("filter") + esc(t("catActive")) + '</button>';
    } else {
      ctx = '<button class="ctx-btn" data-act="open-cat">' + ic("filter") + esc(t("pickCategory")) + '</button>';
    }

    h.innerHTML =
      '<div class="hd-row">' +
        '<div class="hd-brand">' +
          '<div class="hd-logo">IFMA</div>' +
          '<div class="hd-titles">' +
            '<div class="hd-title">' + esc(t("appName")) + '</div>' +
            '<div class="hd-sub">' + esc(L(D.meta.revisionLabel)) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="hd-spacer"></div>' +
        '<div class="lang-toggle">' + langBtns + '</div>' +
      '</div>' +
      '<div class="hd-context">' + ctx + '</div>';
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

    // Arama kısayolu
    html += '<div class="section">' +
      '<button class="hero-search" data-act="tab" data-tab="search" style="width:100%">' +
        ic("search") + '<span>' + esc(t("quickSearchPlaceholder")) + '</span>' +
      '</button>' +
      '<div class="hero-hint">' + esc(t("searchExamples")) + '</div>' +
    '</div>';

    // İki büyük kutu: Kategori seç + Bugünkü görev
    html += '<div class="section"><div class="tiles-2">' +
      '<button class="tile accent-teal" data-act="open-cat">' + ic("filter") +
        '<div class="tile-title">' + esc(t("pickCategory")) + '</div>' +
        '<div class="tile-desc">' + esc(t("pickCategoryDesc")) + '</div></button>' +
      '<button class="tile accent-navy" data-act="tab" data-tab="task">' + ic("whistle") +
        '<div class="tile-title">' + esc(t("todaysTaskTitle")) + '</div>' +
        '<div class="tile-desc">' + esc(t("todaysTaskDesc")) + '</div></button>' +
    '</div></div>';

    // Bugün öğren
    var s = D.training.scenarios[0];
    html += '<div class="section"><div class="section-title">' + esc(t("learnTodayTitle")) + '</div>' +
      '<button class="card" data-act="tab" data-tab="training">' +
        '<div class="card-top"><span class="pill training">' + esc(L(D.labels.training)) + '</span>' +
          '<span class="grow"></span>' + ic("bolt", "") + '</div>' +
        '<div class="card-title">' + esc(L(s.q)) + '</div>' +
        '<div class="card-foot"><span>' + esc(t("learnTodayDesc")) + '</span></div>' +
      '</button></div>';

    // Modüller
    html += '<div class="section"><div class="section-head"><div class="section-title">' + esc(t("modulesTitle")) +
      '</div><button class="link" data-act="tab" data-tab="rules">' + esc(t("seeAll")) + '</button></div>' +
      modGrid(D.modules.slice(0, 4)) + '</div>';

    // Favoriler
    html += '<div class="section"><div class="section-title">' + esc(t("favoritesTitle")) + '</div>';
    if (state.favorites.length) html += '<div class="list">' + state.favorites.map(function (id) {
      return cardRow(cardIndex[id]); }).filter(Boolean).join("") + '</div>';
    else html += emptyBox(t("favoritesEmpty"), "star");
    html += '</div>';

    // Son görüntülenenler
    if (state.recent.length) {
      html += '<div class="section"><div class="section-title">' + esc(t("recentTitle")) + '</div>' +
        '<div class="list">' + state.recent.map(function (id) { return cardRow(cardIndex[id]); }).filter(Boolean).join("") + '</div></div>';
    }

    // Neler değişti + faz notu
    html += '<div class="section"><div class="source">' + ic("info") +
      '<div class="source-body"><b>' + esc(t("whatsChangedTitle")) + '</b> — ' + esc(t("whatsChangedDesc")) +
      '<br>' + esc(t("phaseNote")) + '</div></div></div>';

    html += '</div>';
    return html;
  }

  function emptyBox(msg, icon) {
    return '<div class="empty-state">' + ic(icon || "info") + '<div>' + esc(msg) + '</div></div>';
  }

  /* ================= KURALLAR (modül ızgarası) ================= */
  function viewRules() {
    return '<div class="fade-in"><div class="section"><div class="section-title">' + esc(t("modulesTitle")) +
      '</div>' + modGrid(D.modules) + '</div></div>';
  }

  function modGrid(mods) {
    return '<div class="mod-grid">' + mods.map(function (m) {
      var n = cardsInModule(m.id).length;
      return '<button class="mod-card" style="--accent:' + m.color + '" data-act="open-module" data-id="' + m.id + '">' +
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
      '<div class="detail-labels"><span class="mod-ico" style="--accent:' + m.color + '">' + ic(m.icon) + '</span>' +
      '<span class="badge">' + esc(m.rules) + '</span></div>' +
      '<div class="detail-title">' + esc(L(m)) + '</div>' +
      '<div class="when-text">' + esc(lang() === "tr" ? m.purposeTr : m.purposeEn) + '</div></div>';

    html += '<div class="section-title">' + esc(t("inThisModule")) + '</div><div class="list">';
    m.subtopics.forEach(function (sub) {
      var cs = cardsInSub(mid, sub.id);
      if (cs.length) {
        html += '<button class="row" data-act="open-subtopic" data-module="' + mid + '" data-sub="' + sub.id + '">' +
          '<span class="row-ico" style="color:' + m.color + '">' + ic("doc") + '</span>' +
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
      '<div class="card-foot"><span class="src">' + ic("doc") + esc(sourceShort(c)) + '</span>' +
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
    var s = st[lang()] || "approved";
    var m = D.status[s] || D.status.approved;
    var cls = s;
    var iconName = s === "approved" ? "check" : (s === "draft" ? "info" : "info");
    return '<span class="badge ' + cls + '">' + ic(iconName) + esc(L(m)) + '</span>';
  }
  function mediaTags(c) {
    var m = c.media || {}; var out = "";
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

    var html = subbar(L(m), m ? m.color : null);

    html += '<div class="detail">';
    // Başlık bloğu
    html += '<div class="detail-head">' +
      '<div class="detail-labels">' +
        '<span class="pill ' + c.label + '">' + esc(L(D.labels[c.label])) + '</span>' +
        statusBadge(c) +
        '<span class="grow" style="flex:1"></span>' +
        '<button class="card-fav ' + (fav ? "on" : "") + '" data-act="fav" data-id="' + c.id + '" aria-label="fav">' + ic(fav ? "starf" : "star") + '</button>' +
      '</div>' +
      '<div class="detail-title">' + esc(L(c.title)) + '</div></div>';

    // Taslak çeviri uyarısı
    if (st === "draft") html += '<div class="note draft-note">' + ic("info") + '<span>' + esc(t("draftNote")) + '</span></div>';
    if (st === "pending") html += '<div class="note">' + ic("info") + '<span>' + esc(L(D.status.pending)) + ' — ' + esc(c.rule) + '</span></div>';

    // Hızlı cevap
    html += '<div class="block quick-block"><div class="block-label">' + ic("bolt") + esc(t("cardQuickAnswer")) + '</div>' +
      '<div class="quick-text">' + esc(L(c.quick)) + '</div></div>';

    // Ne zaman geçerli
    html += '<div class="block"><div class="block-label">' + ic("filter") + esc(t("cardWhenValid")) + '</div>' +
      '<div class="when-text">' + esc(L(c.when)) + whenChips(c) + '</div></div>';

    // Görsel anlatım (yer tutucu)
    html += '<div class="block"><div class="block-label">' + ic("camera") + esc(t("cardVisual")) + '</div>' + mediaBox(c) + '</div>';

    // Doğru / yanlış
    if (c.right || c.wrong) {
      html += '<div class="rw-grid">';
      if (c.right) html += '<div class="rw ok"><div class="rw-head">' + ic("check") + esc(t("cardRight")) + '</div><div class="rw-text">' + esc(L(c.right)) + '</div></div>';
      if (c.wrong) html += '<div class="rw no"><div class="rw-head">' + ic("x") + esc(t("cardWrong")) + '</div><div class="rw-text">' + esc(L(c.wrong)) + '</div></div>';
      html += '</div>';
    }

    // Kaynak
    html += '<div class="source">' + ic("doc") + '<div class="source-body">' +
      '<b>' + esc(t("cardSource")) + ':</b> ' + esc(D.meta.source) +
      (c.rule && c.rule !== "—" ? ' • <b>' + esc(t("cardRuleNo")) + '</b> ' + esc(c.rule) : "") +
      ' • ' + esc(L(D.meta.revisionLabel)) + '</div></div>';

    // İlgili içerikler
    var rel = (c.related || []).map(function (rid) { return cardIndex[rid]; }).filter(Boolean);
    if (rel.length) {
      html += '<div><div class="section-title">' + esc(t("cardRelated")) + '</div><div class="related-row">' +
        rel.map(function (r) { return cardRow(r); }).join("") + '</div></div>';
    }

    html += '</div>';
    return '<div class="fade-in">' + html + '</div>';
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
    var opts = D.filters[dim] || [];
    var chips = opts.map(function (o) {
      var on = state.sel[dim] === o.id;
      var sub = o.sub ? ' <small>' + esc(L(o.sub)) + '</small>' : "";
      return '<button class="chip ' + (on ? "on teal" : "") + '" data-act="filter" data-dim="' + dim + '" data-val="' + o.id + '">' +
        (o.icon ? ic(o.icon) : "") + esc(L(o)) + sub + '</button>';
    }).join("");
    return '<div class="filter-group"><div class="filter-title">' + ic(icon) + esc(title) + '</div><div class="chips">' + chips + '</div></div>';
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
    if (sel.weight) items += sumItem("scale", t("catWeight"), esc(optLabel("weight", sel.weight)) + '<small>' + (lang() === "tr" ? "Kural 4 — yaş+cinsiyete göre" : "Rule 4 — by age+gender") + '</small>');

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
    html += '<div class="section"><button class="tile accent-teal" style="width:100%" data-act="open-quiz">' + ic("target") +
      '<div class="tile-title">' + esc(t("trainScenario")) + '</div>' +
      '<div class="tile-desc">' + esc(t("trainStart")) + ' →</div></button></div>';

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
          '<span class="row-ico" style="color:' + m.color + '">' + ic(m.icon) + '</span>' +
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
    document.documentElement.lang = lang();
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
        e.preventDefault(); openCard(el.getAttribute("data-id")); break;
      case "open-role":
        state.tab = "task"; push({ kind: "role", id: el.getAttribute("data-id") }); break;
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
        state.q = el.getAttribute("data-q"); state.tab = "search"; state.detail = []; render(); break;
      case "search-clear":
        state.q = ""; var si2 = document.getElementById("searchInput"); if (si2) { si2.value = ""; si2.focus(); }
        var rc2 = document.getElementById("searchResults"); if (rc2) rc2.innerHTML = searchResultsHtml("");
        el.style.visibility = "hidden"; break;
      case "scroll-micro": {
        var ml = document.getElementById("microList"); if (ml) ml.scrollIntoView({ behavior: "smooth", block: "start" }); break;
      }
    }
  });

  /* ================= BAŞLAT ================= */
  render();
})();
