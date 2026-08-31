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
        ["10–9", tr(lang, "Küçük fark", "Small margin"), "≤ 7", "navy"],
        ["10–8", tr(lang, "Açık fark", "Clear margin"), "8–14", "amber"],
        ["10–7", tr(lang, "Tam üstünlük", "Full dominance"), "15–21", "red"]
      ];
      var body = rows.map(function (r) {
        return '<div class="dg-scale-row ' + r[3] + '"><b>' + r[0] + '</b><span>' + r[1] + '</span>' +
          '<em>' + tr(lang, "vuruş farkı ", "strike diff ") + r[2] + '</em></div>';
      }).join("");
      return '<div class="diagram"><div class="dg-scale">' + body + '</div>' +
        '<div class="dg-scale-note"><strong>' + tr(lang, "Not", "Note") + ':</strong><span>' +
        tr(lang, "10–10 yalnızca raundu kazanan sporcu İhtar (Warning) aldığında verilebilir.",
          "10–10 may only be awarded when the Athlete who won the round receives a Warning.") + '</span></div>' +
        '<div class="dg-cap">' + tr(lang, "Kaynak: Kural 29.2", "Source: Rule 29.2") + '</div></div>';
    },

    /* Kategori karşılaştırma tablosu (veriden üretilir) */
    "category-table": function (lang) {
      var groups = [
        {
          tone: "free",
          categories: tr(lang, "Veteranlar 40+ ve 45+|Büyükler 35+|Elite|U24|U18|U16", "Masters 40+ and 45+|Masters 35+|Elite|U24|U18|U16"),
          label: tr(lang, "Kısıtlama Yok", "No Restrictions"),
          detail: tr(lang, "Tüm Muaythai teknikleri uygulanabilir.", "All Muaythai techniques may be used.")
        },
        {
          tone: "caution",
          categories: "U14",
          label: tr(lang, "Kafaya Dirsek veya Diz Yok", "No Elbow or Knee to the Head"),
          detail: tr(lang, "Diğer izinli teknikler kurallar çerçevesinde uygulanabilir.", "Other permitted techniques may be used within the Rules.")
        },
        {
          tone: "blocked",
          categories: "U12|U10|U8",
          label: tr(lang, "Kafaya Vuruş Yok", "No Strikes to the Head"),
          detail: tr(lang, "Kafaya hiçbir Muaythai tekniği uygulanamaz.", "No Muaythai technique may be delivered to the head.")
        }
      ];
      var body = groups.map(function (group) {
        var chips = group.categories.split("|").map(function (name) {
          return '<span class="restriction-chip">' + name + '</span>';
        }).join("");
        return '<article class="restriction-row is-' + group.tone + '"><div class="restriction-categories">' +
          '<span class="restriction-column-label">' + tr(lang, "Kategori", "Category") + '</span><div>' + chips +
          '</div></div><div class="restriction-rule"><span class="restriction-column-label">' +
          tr(lang, "Kısıtlanmış Muaythai Teknikleri", "Restricted Muaythai Skills") + '</span><strong>' + group.label +
          '</strong><small>' + group.detail + '</small></div></article>';
      }).join("");
      return '<div class="diagram restriction-matrix"><header><span>31.3</span><div><strong>' +
        tr(lang, "Kategori Bazlı Kısıtlı Vuruşlar", "Restricted Strikes by Division") + '</strong><small>' +
        tr(lang, "Yalnızca vuruş kısıtları gösterilir", "Strike restrictions only") + '</small></div></header>' + body +
        '<div class="dg-cap">' + tr(lang, "Kısıtlanmış bir tekniğin kullanılması fauldür • Kural 31.3",
          "Use of a restricted technique is a foul • Rule 31.3") + '</div></div>';
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
      { categories: tr(lang, "U24 · Elite · Büyükler 35+", "U24 · Elite · Masters 35+"), round: "3", total: "4", tone: "navy" },
      { categories: tr(lang, "U18 · Veteranlar 40+ · Veteranlar 45+", "U18 · Masters 40+ · Masters 45+"), round: "2", total: "3", tone: "amber" },
      { categories: "U8 · U10 · U12 · U14 · U16", round: "2", total: "2", tone: "teal" }
    ];
    var body = rows.map(function (r) {
      return '<article class="ccl-limit-card is-' + r.tone + '"><h4>' + r.categories + '</h4><div class="ccl-limit-values">' +
        '<div><span>' + tr(lang, "Aynı Raundda", "In the Same Round") + '</span><strong>' + r.round + '</strong><small>' +
        tr(lang, "sayım", "counts") + '</small></div><span class="ccl-or">' + tr(lang, "veya", "or") + '</span><div><span>' +
        tr(lang, "Toplam Müsabakada", "In the Whole Contest") + '</span><strong>' + r.total + '</strong><small>' +
        tr(lang, "sayım", "counts") + '</small></div></div></article>';
    }).join("");
    return '<div class="diagram ccl-limit-board"><header><span>CCL</span><div><strong>' +
      tr(lang, "Zorunlu Sayma Limiti", "Compulsory Count Limit") + '</strong><small>' +
      tr(lang, "İlk ulaşılan limitte müsabaka biter", "The contest ends when either limit is reached") + '</small></div></header>' +
      '<div class="ccl-limit-grid">' + body + '</div><div class="ccl-skill-note">' +
      tr(lang, "CCL sayımı bir Muaythai tekniği sonucunda başlamış olmalıdır.",
        "A CCL count must be initiated by a Muaythai skill.") + '</div><div class="dg-cap">' +
      tr(lang, "Zorunlu Sayma Limiti • Kural 30.2.5", "Compulsory Count Limit • Rule 30.2.5") + '</div></div>';
  };

  // SbS onay: kaç Yan Hakem gerekli (1 sn içinde çoğunluk)
  DG["sbs-accept"] = function (lang) {
    function judges(total, need) {
      var dots = "";
      for (var i = 0; i < total; i++) dots += '<span class="dg-jdot' + (i < need ? " on" : "") + '"></span>';
      return '<div class="dg-jrow"><span class="dg-jn">' + total + ' ' + tr(lang, "Yan Hakem", "Judges") +
        '</span><span class="dg-jdots">' + dots + '</span><span class="dg-jneed">' + tr(lang, "en az ", "min ") + need + ' ' + tr(lang, "onay", "approve") + '</span></div>';
    }
    return '<div class="diagram">' + judges(5, 3) + judges(3, 2) +
      '<div class="dg-cap">' + tr(lang, "Onaylı puan: ilk butondan itibaren 1 sn içinde çoğunluk • Kural 29.4.2",
                                   "Accepted score: majority within 1 s of the first button • Rule 29.4.2") + '</div></div>';
  };

  // Maç sonrası zorunlu dinlenme (raund sayısına göre)
  DG["rest-table"] = function (lang) {
    var rows = [["1", tr(lang, "7 gün", "7 days")], ["2–4", tr(lang, "14 gün", "14 days")],
                ["4–9", tr(lang, "21 gün", "21 days")], ["10+", tr(lang, "28 gün", "28 days")],
                ["KOH/RSCH", tr(lang, "30 gün", "30 days")]];
    var body = rows.map(function (r) {
      var hl = r[0] === "KOH/RSCH" ? ' class="lim"' : "";
      return '<tr><td class="k">' + r[0] + '</td><td' + hl + '>' + r[1] + '</td></tr>';
    }).join("");
    return '<div class="diagram dg-scroll"><table class="dg-table"><thead><tr><th>' +
      tr(lang, "Raund sayısı", "Rounds") + '</th><th>' + tr(lang, "Zorunlu dinlenme", "Mandatory rest") +
      '</th></tr></thead><tbody>' + body + '</tbody></table><div class="dg-cap">' +
      tr(lang, "Maç sonrası zorunlu dinlenme • Kural 10.6 (KOH/RSCH önceliklidir)",
               "Mandatory rest after a bout • Rule 10.6 (KOH/RSCH takes priority)") + '</div></div>';
  };

  // Tartı görevli ölçeği (sporcu sayısına göre)
  DG["weigh-staffing"] = function (lang) {
    var rows = [["60", "3 + 1", "1"], ["120", "6 + 1", "2"], ["180", "9 + 1", "3"], ["300", "15 + 1", "5"]];
    var body = rows.map(function (r) {
      return '<tr><td class="k">' + r[0] + '</td><td>' + r[1] + '</td><td>' + r[2] + '</td></tr>';
    }).join("");
    return '<div class="diagram dg-scroll"><table class="dg-table"><thead><tr><th>' +
      tr(lang, "Sporcu", "Athletes") + '</th><th>' + tr(lang, "Görevli + Jüri", "Officials + Jury") +
      '</th><th>' + tr(lang, "İstasyon", "Stations") + '</th></tr></thead><tbody>' + body +
      '</tbody></table><div class="dg-cap">' +
      tr(lang, "Bir tartı noktası ~20 sporcu/saat • Kural 11.3.6", "One station ~20 athletes/hour • Rule 11.3.6") +
      '</div></div>';
  };

  // Gövde koruyucu — kategoriye göre zorunluluk
  DG["bodyprotector-table"] = function (lang) {
    var rows = [
      [tr(lang, "U8 – U24", "U8 – U24"), tr(lang, "Zorunlu", "Mandatory"), "ok"],
      [tr(lang, "Elite", "Elite"), tr(lang, "Giyilmez", "Not worn"), "no"],
      [tr(lang, "Masters 35+", "Masters 35+"), tr(lang, "Giyilmez", "Not worn"), "no"],
      [tr(lang, "Masters 40+ & 45+", "Masters 40+ & 45+"), tr(lang, "Zorunlu", "Mandatory"), "ok"]
    ];
    var body = rows.map(function (r) {
      var st = r[2] === "ok" ? ' style="color:var(--right-ink);font-weight:700"' : ' style="color:var(--wrong-ink)"';
      return '<tr><td class="k">' + r[0] + '</td><td' + st + '>' + r[1] + '</td></tr>';
    }).join("");
    return '<div class="diagram dg-scroll"><table class="dg-table"><thead><tr><th>' +
      tr(lang, "Kategori", "Category") + '</th><th>' + tr(lang, "Gövde koruyucu", "Body protector") +
      '</th></tr></thead><tbody>' + body + '</tbody></table><div class="dg-cap">' +
      tr(lang, "Köşe rengiyle uyumlu • Kural 15.4", "Corner-colour coordinated • Rule 15.4") + '</div></div>';
  };

  // Kural 15: kategoriye göre temel ve değişken zorunlu ekipmanlar
  DG["equipment-category-table"] = function (lang) {
    var rows = [
      { category: "U8 – U24", body: tr(lang, "Zorunlu", "Mandatory"), chest: tr(lang, "İsteğe Bağlı", "Optional"), bodyTone: "yes", chestTone: "optional" },
      { category: "Elite", body: tr(lang, "Kullanılmaz", "Not worn"), chest: tr(lang, "Zorunlu", "Mandatory"), bodyTone: "no", chestTone: "yes" },
      { category: tr(lang, "Masters 35+", "Masters 35+"), body: tr(lang, "Kullanılmaz", "Not worn"), chest: tr(lang, "Zorunlu", "Mandatory"), bodyTone: "no", chestTone: "yes" },
      { category: tr(lang, "Masters 40+ & 45+", "Masters 40+ & 45+"), body: tr(lang, "Zorunlu", "Mandatory"), chest: tr(lang, "İsteğe Bağlı", "Optional"), bodyTone: "yes", chestTone: "optional" }
    ];
    var body = rows.map(function (row) {
      return '<tr><th scope="row">' + row.category + '</th><td><span class="equip-status is-' + row.bodyTone + '">' +
        row.body + '</span></td><td><span class="equip-status is-' + row.chestTone + '">' + row.chest + '</span></td></tr>';
    }).join("");
    var essentials = [
      tr(lang, "Eldiven", "Gloves"), tr(lang, "Bandaj", "Wraps"), tr(lang, "Kask", "Head guard"),
      tr(lang, "Kaval koruyucu", "Shin guards"), tr(lang, "Dirseklik", "Elbow guards"),
      tr(lang, "Dişlik", "Gum shield"), tr(lang, "Kasık koruyucu", "Groin guard"),
      tr(lang, "Şort", "Shorts"), tr(lang, "Atlet", "Singlet"), "Mongkon (Wai Kru)"
    ].map(function (item) { return '<span>' + item + '</span>'; }).join("");
    return '<div class="diagram equipment-category-board"><header><div><strong>' +
      tr(lang, "Kategorilere Göre Zorunlu Ekipmanlar", "Mandatory Equipment by Category") + '</strong><small>' +
      tr(lang, "Tüm dövüş kategorilerinde ortak temel set", "Core set shared by all combat divisions") +
      '</small></div><b>15</b></header><div class="equipment-essentials">' + essentials +
      '</div><div class="equipment-category-wrap"><table><thead><tr><th>' + tr(lang, "Kategori", "Category") +
      '</th><th>' + tr(lang, "Gövde Koruyucu", "Body Protector") + '</th><th>' +
      tr(lang, "Kadın Göğüs Koruyucu", "Female Chest Protection") + '</th></tr></thead><tbody>' + body +
      '</tbody></table></div><footer>' + tr(lang,
        "Kasık koruyucu tüm kadın ve erkek sporcularda kişiseldir ve zorunludur.",
        "Every male and female athlete must use a personal mandatory groin guard.") + '</footer></div>';
  };

  // Kural 15.8: kadın göğüs koruyucusu kategori tablosu
  DG["chestprotector-table"] = function (lang) {
    var rows = [
      [tr(lang, "Masters 40+ & 45+", "Masters 40+ & 45+"), tr(lang, "İsteğe Bağlı", "Optional"), "optional"],
      [tr(lang, "Masters 35+", "Masters 35+"), tr(lang, "Zorunlu", "Mandatory"), "yes"],
      ["Elite", tr(lang, "Zorunlu", "Mandatory"), "yes"],
      ["U8 – U24", tr(lang, "İsteğe Bağlı", "Optional"), "optional"]
    ];
    var body = rows.map(function (row) {
      return '<tr><th scope="row">' + row[0] + '</th><td><span class="equip-status is-' + row[2] + '">' + row[1] + '</span></td></tr>';
    }).join("");
    return '<div class="diagram protector-status-board"><header><strong>' +
      tr(lang, "Kadın Göğüs Koruyucu", "Female Chest Protection") + '</strong><span>15.8</span></header>' +
      '<table><thead><tr><th>' + tr(lang, "Kategori", "Category") + '</th><th>' +
      tr(lang, "Kullanım", "Use") + '</th></tr></thead><tbody>' + body + '</tbody></table></div>';
  };

  // Doğum yılı bazlı kategoriler (2026 sezonu)
  DG["birthyear-table"] = function (lang) {
    var rows = (window.IFMA.birthYears2026 || []);
    var body = rows.map(function (r) {
      return '<tr><td class="k">' + (lang === "en" ? r.en : r.tr) + '</td><td>' + r.ageLo + '–' + r.ageHi +
        '</td><td>' + r.yrLo + '–' + r.yrHi + '</td></tr>';
    }).join("");
    return '<div class="diagram dg-scroll"><table class="dg-table"><thead><tr><th>' +
      tr(lang, "Kategori", "Category") + '</th><th>' + tr(lang, "Yaş", "Age") + '</th><th>' +
      tr(lang, "Doğum yılı", "Birth year") + '</th></tr></thead><tbody>' + body + '</tbody></table><div class="dg-cap">' +
      tr(lang, "2026 sezonu • takvim yılı sistemi • ref. " + window.IFMA.birthYearRefDate,
               "2026 season • calendar-year system • ref. " + window.IFMA.birthYearRefDate) + '</div></div>';
  };

  // Sıklet aralıkları (kategoriye göre özet)
  DG["weight-table"] = function (lang) {
    var order = [["SENIOR", tr(lang, "Büyükler ve Elite", "Masters and Elite")], ["U24", "U24"], ["U18", "U18"],
                 ["U16", "U16"], ["U14", "U14"], ["U12", "U12"], ["U10", "U10 ***"], ["U8", "U8 ***"]];
    var g = window.IFMA.weightGroups || {};
    function weightChips(items, group, gender) {
      return (items || []).map(function (value, index) {
        var note = group === "SENIOR" && gender === "male" && index === 0 ? "*" :
          (group === "SENIOR" && gender === "male" && value === "+91" ? "**" : "");
        return '<span class="weight-chip' + (note ? ' is-note' : '') + '"><b>' + value + '</b><small>kg' + note + '</small></span>';
      }).join("");
    }
    var body = order.map(function (o) {
      var w = g[o[0]] || {};
      return '<article class="weight-category-card"><header><strong>' + o[1] + '</strong><small>' +
        tr(lang, "Kural 4 · kilogram", "Rule 4 · kilograms") + '</small></header><div class="weight-gender-row male">' +
        '<div class="weight-gender-label"><span>♂</span><strong>' + tr(lang, "Erkek", "Male") + '</strong><small>' +
        (w.male || []).length + ' ' + tr(lang, "sıklet", "classes") + '</small></div><div class="weight-class-list">' +
        weightChips(w.male, o[0], "male") + '</div></div><div class="weight-gender-row female"><div class="weight-gender-label">' +
        '<span>♀</span><strong>' + tr(lang, "Kadın", "Female") + '</strong><small>' + (w.female || []).length + ' ' +
        tr(lang, "sıklet", "classes") + '</small></div><div class="weight-class-list">' +
        weightChips(w.female, o[0], "female") + '</div></div></article>';
    }).join("");
    return '<div class="diagram weight-board"><header class="weight-board-head"><div><strong>' +
      tr(lang, "Kategori ve Cinsiyete Göre Sıkletler", "Weight Classes by Category and Gender") + '</strong><small>' +
      tr(lang, "Her değer ilgili sıkletin üst sınırını gösterir", "Each value shows the upper limit of the weight class") +
      '</small></div><span>KG</span></header><div class="weight-category-grid">' + body + '</div><div class="weight-footnotes">' +
      '<span>* ' + tr(lang, "Seçilmiş çoklu spor etkinliklerinde IFMA onayına tabidir.", "Subject to IFMA approval in selected multi-sport events.") +
      '</span><span>** ' + tr(lang, "Veteranlar 40+ ve 45+ için +91 kg uygulanmaz.", "+91 kg does not apply to Masters 40+ and 45+.") +
      '</span><span>*** ' + tr(lang, "U8 ve U10 yalnızca Muaythai Teknik (Tatami).", "U8 and U10 are Muaythai Technical (Tatami) only.") +
      '</span></div><div class="dg-cap">' + tr(lang, "Resmî sıklet sınıflandırmaları • Kural 4",
        "Official weight classifications • Rule 4") + '</div></div>';
  };

  // Puan verme basamakları (raund eşitse sırasıyla)
  DG["scoring-steps"] = function (lang) {
    var steps = [
      tr(lang, "Daha çok sayı teknik vuruş yapan", "More scoring techniques landed"),
      tr(lang, "Daha güçlü teknik vuruşları olan", "Stronger technical strikes"),
      tr(lang, "Etki ve bulgu oluşturan hırpalayıcı vuruşlar", "Strikes that mark or take effect"),
      tr(lang, "Daha baskın ve atak olan", "More dominant and aggressive"),
      tr(lang, "Daha iyi Muaythai stili kullanan", "Better Muaythai style"),
      tr(lang, "Daha az faul yapan", "Fewer fouls")
    ];
    var body = steps.map(function (s, i) {
      return '<div class="dg-step-row"><span class="dg-step-n">' + (i + 1) + '</span><span>' + s + '</span></div>';
    }).join("");
    return '<div class="diagram">' + body + '<div class="dg-cap">' +
      tr(lang, "Raund eşitse sırasıyla değerlendirilir • Kural 29", "Applied in order when a round is tied • Rule 29") + '</div></div>';
  };

  IFMA.diagrams = DG;
  IFMA.hasDiagram = function (name) { return !!(name && DG[name]); };
  IFMA.renderDiagram = function (name, lang) { return DG[name] ? DG[name](lang) : ""; };

  /* Kart → diyagram eşlemesi (kartların "görsel anlatım" kutusunda gösterilir) */
  IFMA.cardDiagram = {
    REF_YOOT: "command-flow", REF_YAEK: "command-flow", REF_CHOCK: "command-flow",
    REF_SAYIMREF: "count-flow", FOUL_COUNT_THAI: "thai-count", FOUL_RULE8: "count-flow",
    FOUL_KO: "count-flow", FOUL_KNOCKDOWN: "count-flow",
    REF_RSC_POWER: "decision-tree", REF_ENDMATCH: "decision-tree",
    FOUL_DOUBLE_KD: "count-flow",
    FOUL_CCL: "ccl-table", CAT_CCL: "ccl-table",
    MED_KOH: "rest-table", WEIGH_ROOM: "weigh-staffing",
    CAT_LIMIT: "category-table",
    CAT_AGE: "birthyear-table", CAT_WEIGHT: "weight-table",
    JUDGE_10PT: "scoring-scale", JUDGE_KRITER: "scoring-steps",
    JUDGE_SBS: "sbs-accept",
    AREA_FOP: "fop-layout"
  };
})();
