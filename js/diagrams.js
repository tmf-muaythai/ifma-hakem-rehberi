/* =========================================================================
   IFMA HAKEM REHBERİ  —  js/diagrams.js
   Kartların "görsel anlatım" kutusuna giren diyagramlar (fotoğraf yerine).
   Her üretici bir dil ("tr"/"en") alır ve HTML/SVG döndürür. Tema duyarlı
   (CSS değişkenleri + currentColor). Kaynak: IFMA 2026.
   Kart verisinde  diagram: "count-flow"  gibi bir alanla bağlanır.
   ========================================================================= */
window.IFMA = window.IFMA || {};

(function () {
  function tr(lang, t, e) { return lang === "en" ? e : t; }

  // Dikey akış kutusu
  function node(txt, sub, cls) {
    return '<div class="dg-node ' + (cls || "") + '">' +
      '<span class="dg-node-t">' + txt + '</span>' +
      (sub ? '<span class="dg-node-s">' + sub + '</span>' : "") + '</div>';
  }
  function arrow() { return '<div class="dg-arrow">↓</div>'; }

  var DG = {

    /* Komut akışı: İhlal/clinch → YOOT/YAEK → geri adım → CHOCK */
    "command-flow": function (lang) {
      return '<div class="diagram"><div class="dg-flow">' +
        node(tr(lang, "İhlal veya clinch", "Foul or clinch"), tr(lang, "Hakem müdahale eder", "Referee steps in"), "muted") +
        arrow() +
        node('“YOOT” / “YAEK”', tr(lang, "Dur / Ayrıl", "Stop / Break"), "navy") +
        arrow() +
        node(tr(lang, "Geri adım + bekle", "Step back + wait"), tr(lang, "Sporcular komutu bekler", "Athletes wait for the command"), "muted") +
        arrow() +
        node('“CHOCK”', tr(lang, "Devam", "Continue"), "teal") +
        '</div><div class="dg-cap">' + tr(lang, "Kaynak: Kural 26.3", "Source: Rule 26.3") + '</div></div>';
    },

    /* Sayım akışı: Knockdown → YOOT+say → 8 → (hazır?) CHOCK / 10 KO */
    "count-flow": function (lang) {
      return '<div class="diagram"><div class="dg-flow">' +
        node(tr(lang, "Knockdown", "Knockdown"), tr(lang, "Sporcu yere serildi", "Athlete is down"), "muted") +
        arrow() +
        node('“YOOT” + ' + tr(lang, "sayıma başla", "start counting"), tr(lang, "Darbeden 1 sn sonra “NUENG”", "1 s after the blow: “NUENG”"), "navy") +
        arrow() +
        node(tr(lang, "Tayca say: NUENG → BAED (8)", "Count in Thai: NUENG → BAED (8)"), tr(lang, "Zorunlu — her sayı 1 sn arayla", "Mandatory — 1 s apart"), "") +
        arrow() +
        '<div class="dg-branch">' +
          '<div class="dg-b-q">' + tr(lang, "8’de hazır mı?", "Ready at 8?") + '</div>' +
          '<div class="dg-b-row">' +
            node(tr(lang, "Evet → “CHOCK”", "Yes → “CHOCK”"), tr(lang, "Maç devam", "Fight on"), "teal") +
            node(tr(lang, "Hayır → SIB (10)", "No → SIB (10)"), tr(lang, "Nakavt (KO)", "Knockout (KO)"), "red") +
          '</div>' +
        '</div>' +
        '</div><div class="dg-cap">' + tr(lang, "Kaynak: Kural 32.2–32.5", "Source: Rule 32.2–32.5") + '</div></div>';
    },

    /* Tayca sayım tablosu */
    "thai-count": function (lang) {
      var rows = [["1", "NUENG"], ["2", "SONG"], ["3", "SAAM"], ["4", "SII"], ["5", "HAH"],
                  ["6", "HOK"], ["7", "JED"], ["8", "BAED"], ["9", "KOUW"], ["10", "SIB"]];
      var cells = rows.map(function (r) {
        var hi = (r[0] === "8" || r[0] === "10") ? " hi" : "";
        return '<div class="dg-cnt' + hi + '"><b>' + r[0] + '</b><span>' + r[1] + '</span></div>';
      }).join("");
      return '<div class="diagram"><div class="dg-count-grid">' + cells + '</div>' +
        '<div class="dg-cap">' + tr(lang, "8 (BAED) = zorunlu sayım • 10 (SIB) = KO • Kural 32.2",
                                     "8 (BAED) = mandatory • 10 (SIB) = KO • Rule 32.2") + '</div></div>';
    },

    /* Maç kararları ağacı */
    "decision-tree": function (lang) {
      var outs = [
        ["WP", tr(lang, "Puanla galibiyet", "Win on points"), "teal", ""],
        ["RSC", tr(lang, "Hakem durdurur", "Referee stops"), "navy", "RSCS · RSCI · RSCH · RSCB · CCL"],
        ["KO", tr(lang, "Nakavt", "Knockout"), "red", "KOH · KOB"],
        ["RET", tr(lang, "Çekilme", "Retirement"), "amber", ""],
        ["DQ", tr(lang, "Diskalifiye", "Disqualification"), "red", ""],
        ["WO", tr(lang, "Hükmen galibiyet", "Walk-over"), "amber", ""],
        ["NC", tr(lang, "Geçersiz maç", "No contest"), "muted", ""]
      ];
      var grid = outs.map(function (o) {
        return '<div class="dg-out ' + o[2] + '"><b>' + o[0] + '</b><span>' + o[1] + '</span>' +
          (o[3] ? '<em>' + o[3] + '</em>' : "") + '</div>';
      }).join("");
      return '<div class="diagram"><div class="dg-title">' + tr(lang, "Maç nasıl biter?", "How a match ends") + '</div>' +
        '<div class="dg-out-grid">' + grid + '</div>' +
        '<div class="dg-cap">' + tr(lang, "Kaynak: Kural 30", "Source: Rule 30") + '</div></div>';
    },

    /* Puanlama ölçeği (On Puan Sistemi) */
    "scoring-scale": function (lang) {
      var rows = [
        ["10–10", tr(lang, "Fark yok", "Tie"), "0", "teal"],
        ["10–9", tr(lang, "Küçük fark", "Small margin"), "≤ 7", "navy"],
        ["10–8", tr(lang, "Açık fark", "Clear margin"), "8–14", "amber"],
        ["10–7", tr(lang, "Tam üstünlük", "Full dominance"), "15–21", "red"]
      ];
      var body = rows.map(function (r) {
        return '<div class="dg-scale-row ' + r[3] + '"><b>' + r[0] + '</b><span>' + r[1] + '</span>' +
          '<em>' + tr(lang, "vuruş farkı ", "strike diff ") + r[2] + '</em></div>';
      }).join("");
      return '<div class="diagram"><div class="dg-scale">' + body + '</div>' +
        '<div class="dg-cap">' + tr(lang, "Kaynak: Kural 29.2", "Source: Rule 29.2") + '</div></div>';
    },

    /* Kategori karşılaştırma tablosu (veriden üretilir) */
    "category-table": function (lang) {
      var head = window.IFMA.headRules, ccl = window.IFMA.cclRules, prof = window.IFMA.ageProfiles;
      var headShort = {
        none: tr(lang, "—", "—"),
        noElbowKneeHead: tr(lang, "kafaya diz/dirsek ✗", "no knee/elbow to head"),
        noHead: tr(lang, "kafaya vuruş ✗", "no head strikes")
      };
      var cclShort = { A: "3 / 4", B: "2 / 3", C: "— / 2" };
      var order = ["U8", "U10", "U12", "U14", "U16", "U18", "U24", "ELITE", "M35", "V40", "V45"];
      var names = {}; window.IFMA.filters.age.forEach(function (a) { names[a.id] = (lang === "en" ? a.en : a.tr); });
      var rows = order.map(function (id) {
        var p = prof[id]; if (!p) return "";
        return '<tr><td class="k">' + names[id] + '</td><td>' + p.roundMin + '×' + p.rounds +
          '</td><td>' + p.restMin + '</td><td class="lim">' + headShort[p.head] + '</td><td>' + cclShort[p.ccl] + '</td></tr>';
      }).join("");
      return '<div class="diagram dg-scroll"><table class="dg-table"><thead><tr>' +
        '<th>' + tr(lang, "Kategori", "Category") + '</th>' +
        '<th>' + tr(lang, "Raund (dk)", "Round (min)") + '</th>' +
        '<th>' + tr(lang, "Dinlenme", "Rest") + '</th>' +
        '<th>' + tr(lang, "Kafa kısıtı", "Head limit") + '</th>' +
        '<th>' + tr(lang, "CCL r/m", "CCL r/m") + '</th></tr></thead><tbody>' + rows + '</tbody></table>' +
        '<div class="dg-cap">' + tr(lang, "CCL = raund / maç sayım limiti • Kural 7, 30.2.5, 31.3",
                                     "CCL = round / match count limit • Rule 7, 30.2.5, 31.3") + '</div></div>';
    },

    /* Geçerli / yasak hedef bölgeleri */
    "target-zones": function (lang) {
      return '<div class="diagram"><svg viewBox="0 0 220 180" class="dg-svg" role="img">' +
        // vücut (basit ön siluet)
        '<g stroke="var(--line-2)" stroke-width="1.5" fill="var(--right-bg)">' +
        '<circle cx="70" cy="34" r="18"/>' +                         // kafa
        '<rect x="52" y="54" width="36" height="52" rx="10"/>' +      // gövde
        '<rect x="40" y="58" width="12" height="40" rx="6"/>' +       // sol kol
        '<rect x="88" y="58" width="12" height="40" rx="6"/>' +       // sağ kol
        '<rect x="55" y="104" width="14" height="52" rx="7"/>' +      // sol bacak
        '<rect x="71" y="104" width="14" height="52" rx="7"/>' +      // sağ bacak
        '</g>' +
        // yasak: boyun (C1-C7) ve kasık
        '<rect x="62" y="49" width="16" height="8" rx="3" fill="var(--wrong-bg)" stroke="var(--wrong-ink)" stroke-width="1.5"/>' +
        '<rect x="62" y="99" width="16" height="9" rx="3" fill="var(--wrong-bg)" stroke="var(--wrong-ink)" stroke-width="1.5"/>' +
        // efsane
        '<g font-size="9" font-family="sans-serif">' +
        '<rect x="120" y="30" width="12" height="12" rx="3" fill="var(--right-bg)" stroke="var(--right-ink)"/>' +
        '<text x="138" y="39" fill="var(--ink)">' + tr(lang, "Geçerli hedef", "Scoring target") + '</text>' +
        '<rect x="120" y="52" width="12" height="12" rx="3" fill="var(--wrong-bg)" stroke="var(--wrong-ink)"/>' +
        '<text x="138" y="61" fill="var(--ink)">' + tr(lang, "Yasak: boyun (C1–C7)", "Forbidden: neck (C1–C7)") + '</text>' +
        '<rect x="120" y="74" width="12" height="12" rx="3" fill="var(--wrong-bg)" stroke="var(--wrong-ink)"/>' +
        '<text x="138" y="83" fill="var(--ink)">' + tr(lang, "Yasak: kasık", "Forbidden: groin") + '</text>' +
        '</g></svg>' +
        '<div class="dg-cap">' + tr(lang, "Eldiven/ön kol/kaval/ayak puan getirmez • Kural 29.1",
                                     "Gloves/forearms/shins/feet don’t score • Rule 29.1") + '</div></div>';
    },

    /* Müsabaka alanı (FOP) — üstten görünüm, basitleştirilmiş */
    "fop-layout": function (lang) {
      function lbl(x, y, t, fill) { return '<text x="' + x + '" y="' + y + '" fill="' + (fill || "var(--ink-2)") + '" font-size="8" text-anchor="middle" font-family="sans-serif">' + t + '</text>'; }
      return '<div class="diagram"><svg viewBox="0 0 220 200" class="dg-svg" role="img">' +
        // ring
        '<rect x="60" y="45" width="100" height="100" rx="4" fill="var(--surface-3)" stroke="var(--ink-2)" stroke-width="2"/>' +
        '<rect x="66" y="51" width="88" height="88" fill="none" stroke="var(--line-2)" stroke-width="1"/>' +
        // köşeler
        '<circle cx="60" cy="45" r="6" fill="var(--wrong-ink)"/>' +
        '<circle cx="160" cy="145" r="6" fill="#2f6fb2"/>' +
        lbl(110, 100, "RING", "var(--ink-3)") +
        // yan hakemler (3)
        '<circle cx="110" cy="30" r="7" fill="var(--teal)"/>' + lbl(110, 24, tr(lang, "Yan Hakem", "Judge")) +
        '<circle cx="40" cy="95" r="7" fill="var(--teal)"/>' + lbl(28, 98, "YH") +
        '<circle cx="180" cy="95" r="7" fill="var(--teal)"/>' + lbl(192, 98, "YH") +
        // masalar / roller
        '<rect x="70" y="165" width="80" height="16" rx="3" fill="var(--navy-2)"/>' + lbl(110, 176, "TD · COJ · " + tr(lang, "Jüri", "Jury"), "#fff") +
        '<rect x="168" y="120" width="34" height="14" rx="3" fill="var(--wrong-bg)" stroke="var(--wrong-ink)"/>' + lbl(185, 130, tr(lang, "Doktor", "Doctor")) +
        '<rect x="18" y="120" width="40" height="14" rx="3" fill="var(--surface)" stroke="var(--line-2)"/>' + lbl(38, 130, tr(lang, "Zaman", "Time")) +
        '</svg>' +
        '<div class="dg-cap">' + tr(lang, "Şekil 1 (3 Yan Hakem) • asgari 18×18 m • Kural 13",
                                     "Figure 1 (3 judges) • min 18×18 m • Rule 13") + '</div></div>';
    }
  };

  // CCL grubu tablosu (kısa)
  DG["ccl-table"] = function (lang) {
    var rows = [
      [tr(lang, "U24 · Elite · 35+", "U24 · Elite · 35+"), tr(lang, "raundda 3  ·  maçta 4", "3 in a round · 4 in match"), "navy"],
      [tr(lang, "U18 · V40+ · V45+", "U18 · V40+ · V45+"), tr(lang, "raundda 2  ·  maçta 3", "2 in a round · 3 in match"), "amber"],
      [tr(lang, "U8 – U16", "U8 – U16"), tr(lang, "maçta 2", "2 in match"), "teal"]
    ];
    var body = rows.map(function (r) {
      return '<div class="dg-scale-row ' + r[2] + '"><b>' + r[0] + '</b><em>' + r[1] + '</em></div>';
    }).join("");
    return '<div class="diagram"><div class="dg-scale">' + body + '</div>' +
      '<div class="dg-cap">' + tr(lang, "Zorunlu Sayma Limiti • Kural 30.2.5", "Compulsory Count Limit • Rule 30.2.5") + '</div></div>';
  };

  IFMA.diagrams = DG;
  IFMA.hasDiagram = function (name) { return !!(name && DG[name]); };
  IFMA.renderDiagram = function (name, lang) { return DG[name] ? DG[name](lang) : ""; };

  /* Kart → diyagram eşlemesi (kartların "görsel anlatım" kutusunda gösterilir) */
  IFMA.cardDiagram = {
    REF_YOOT: "command-flow", REF_YAEK: "command-flow", REF_CHOCK: "command-flow",
    REF_SAYIMREF: "count-flow", FOUL_COUNT_THAI: "thai-count", FOUL_RULE8: "count-flow",
    FOUL_KO: "count-flow", FOUL_KNOCKDOWN: "count-flow",
    REF_RSC_POWER: "decision-tree", FOUL_RSC: "decision-tree", REF_ENDMATCH: "decision-tree",
    FOUL_DOUBLE_KD: "count-flow", FOUL_RETDQ: "decision-tree", FOUL_WONC: "decision-tree",
    FOUL_CCL: "ccl-table", CAT_CCL: "ccl-table",
    FOUL_CAT_LIMIT: "category-table", CAT_LIMIT: "category-table", CAT_ROUNDS: "category-table", CAT_REST: "category-table",
    JUDGE_10PT: "scoring-scale", JUDGE_TARGET: "target-zones", AREA_FOP: "fop-layout"
  };
})();
