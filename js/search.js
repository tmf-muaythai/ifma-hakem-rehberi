/* =========================================================================
   IFMA HAKEM REHBERİ  —  js/search.js
   Arama: doğal dil ("U14 kafa diz"), komut (YOOT/CHOCK), kısaltma (RSC/KO/CCL),
   madde numarası (31.2.18, Kural 26) ve kategori. Türkçe karakter duyarsız.
   ========================================================================= */
window.IFMA = window.IFMA || {};

(function () {
  // Türkçe karakterleri sadeleştir + küçük harf
  function fold(s) {
    s = String(s == null ? "" : s);
    s = s.replace(/İ/g, "i").replace(/I/g, "i").replace(/ı/g, "i");
    s = s.toLowerCase();
    return s.replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ö/g, "o")
            .replace(/ş/g, "s").replace(/ü/g, "u").replace(/â/g, "a").replace(/î/g, "i");
  }
  var STOP = { "kural": 1, "rule": 1, "madde": 1, "the": 1, "ve": 1, "and": 1, "ile": 1 };
  function terms(q) {
    return fold(q).split(/[^a-z0-9.+\-]+/).filter(function (w) { return w && !STOP[w] && (w.length > 1 || /[0-9]/.test(w)); });
  }
  function isRuleNo(w) { return /^[0-9]+(\.[0-9]+)*$/.test(w); }

  function haystack(c) {
    var parts = [];
    ["tr", "en"].forEach(function (lg) {
      if (c.title) parts.push(c.title[lg]);
      if (c.quick) parts.push(c.quick[lg]);
      if (c.when) parts.push(c.when[lg]);
    });
    if (c.tags) parts.push(c.tags.join(" "));
    return {
      title: fold((c.title && (c.title.tr + " " + c.title.en)) || ""),
      tags: fold((c.tags || []).join(" ")),
      rule: fold(c.rule || ""),
      body: fold(parts.join(" "))
    };
  }

  IFMA.search = function (query, lg, ctx) {
    var ts = terms(query);
    if (!ts.length) return [];
    var cards = ctx.cards, modules = ctx.modules;

    var scored = [];
    cards.forEach(function (c) {
      var H = haystack(c);
      var total = 0, matched = 0;
      ts.forEach(function (term) {
        var s = 0;
        if (isRuleNo(term)) {
          if (H.rule === term) s = 14;
          else if (H.rule.indexOf(term) === 0) s = 11;
          else if (H.rule.indexOf(term) >= 0) s = 8;
          else if (H.tags.indexOf(term) >= 0) s = 6;
        } else {
          if (H.tags.split(" ").indexOf(term) >= 0) s = 9;      // tam etiket
          else if (H.title.indexOf(term) >= 0) s = 7;
          else if (H.tags.indexOf(term) >= 0) s = 6;            // etiket içinde
          else if (H.body.indexOf(term) >= 0) s = 3;
        }
        if (s > 0) { matched++; total += s; }
      });
      if (matched === ts.length) scored.push({ type: "card", id: c.id, score: total });
    });

    // Modüller (kart sonuçlarından sonra, daha düşük öncelik)
    modules.forEach(function (m) {
      var H = fold(m.tr + " " + m.en + " " + m.rules);
      var matched = 0;
      ts.forEach(function (term) { if (H.indexOf(term) >= 0) matched++; });
      if (matched === ts.length) scored.push({ type: "module", id: m.id, score: 2 + matched });
    });

    scored.sort(function (a, b) {
      if (a.type !== b.type) return a.type === "card" ? -1 : 1;
      return b.score - a.score;
    });
    return scored.slice(0, 24);
  };
})();
