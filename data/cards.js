/* =========================================================================
   IFMA HAKEM REHBERİ  —  data/cards.js
   İçerik kartları. Her kart benzersiz ID'lidir ve koddan ayrıdır.
   Kaynak: IFMA Kuralları ve Yönetmelikleri 2026 (rev. 11.05.2026).
   Alanlar (Plan §03): label (ifma|tmf|training), rule, when-valid filtreleri
   (discipline/age/gender/role — boş = hepsi), status (dile göre onay), media
   (foto/video/animasyon yer tutucuları), related (çapraz bağlantı), tags (arama).
   1. FAZ NOTU: metinler hazır; fotoğraf ve videolar sonraki fazda eklenecek.
   ========================================================================= */
window.IFMA = window.IFMA || {};

// EN artık resmî İngilizce IFMA metninden (v3.057) alınıyor → doğrulanan modüllerde onaylı.
var A  = { tr: "approved", en: "approved" }; // TR + EN onaylı (resmî kaynaktan doğrulandı)
var AD = { tr: "approved", en: "draft" };    // EN henüz kaynaktan doğrulanmadı (taslak)
var P  = { tr: "pending",  en: "pending" };  // kaynak bekliyor

window.IFMA.cards = [

  /* ===================== ORTA HAKEM ===================== */
  {
    id: "REF_YOOT", module: "orta", subtopic: "komutlar", label: "ifma",
    rule: "26.3", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: true, video: true, animation: false },
    title: { tr: "YOOT (Dur)", en: "YOOT (Stop)" },
    quick: {
      tr: "Sporcuları durdurmak için Tayca “YOOT” (Dur) komutu verilir; sporcular derhal durup geri adım atmalıdır.",
      en: "The Thai command “YOOT” (Stop) is used to stop the athletes; they must halt at once and step back."
    },
    when: { tr: "Tüm disiplinler ve kategoriler • Orta Hakem görevi.", en: "All disciplines and categories • Referee duty." },
    right: { tr: "“YOOT” duyunca sporcular vuruşu keser, bir adım geri çekilir ve Hakemin “CHOCK” komutunu bekler.",
             en: "On “YOOT” the athletes stop striking, step back and wait for the referee's “CHOCK”." },
    wrong: { tr: "“YOOT” sonrası “CHOCK” verilmeden vurmaya çalışmak fauldür (31.2.22); komuta uymamak da faul (31.2.21).",
             en: "Striking after “YOOT” before “CHOCK” is a foul (31.2.22); not obeying the command is also a foul (31.2.21)." },
    related: ["REF_CHOCK", "REF_YAEK", "FOUL_CLASS"],
    tags: ["yoot", "dur", "stop", "komut", "command", "26.3", "31.2.21"]
  },
  {
    id: "REF_YAEK", module: "orta", subtopic: "komutlar", label: "ifma",
    rule: "26.3", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: true, video: true, animation: false },
    title: { tr: "YAEK (Ayrıl)", en: "YAEK (Break)" },
    quick: {
      tr: "Clinch'i ayırmak için “YAEK” (Ayrıl) komutu verilir; her sporcu geri çekilir, Hakem devam komutunu bekler.",
      en: "“YAEK” (Break) separates the clinch; each athlete steps back and the referee awaits the continue command."
    },
    when: { tr: "Clinch/kilitlenme durumlarında • Orta Hakem görevi.", en: "In clinch/locking situations • Referee duty." },
    right: { tr: "“YAEK” ile sporcular ayrılır, birer adım geri gider; Hakem “CHOCK” deyince devam edilir.",
             en: "On “YAEK” the athletes separate, step back; play resumes on the referee's “CHOCK”." },
    wrong: { tr: "Ayrılmadan devam etmek veya “CHOCK” öncesi vurmak faul.", en: "Continuing without breaking, or striking before “CHOCK”, is a foul." },
    related: ["REF_CHOCK", "REF_YOOT"],
    tags: ["yaek", "ayrıl", "break", "clinch", "komut", "26.3"]
  },
  {
    id: "REF_CHOCK", module: "orta", subtopic: "komutlar", label: "ifma",
    rule: "26.3", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: true, video: true, animation: false },
    title: { tr: "CHOCK (Dövüş)", en: "CHOCK (Fight)" },
    quick: {
      tr: "Sporcuların (yeniden) dövüşmeye başlaması için “CHOCK” (Dövüş) komutu verilir.",
      en: "“CHOCK” (Fight) is the command for athletes to (re)start fighting."
    },
    when: { tr: "Maç/raund başlangıcı ve her duraklamadan sonra.", en: "At match/round start and after every stoppage." },
    right: { tr: "Yalnızca “CHOCK” komutundan sonra dövüşe devam edilir.", en: "Fighting resumes only after the “CHOCK” command." },
    wrong: { tr: "Komut verilmeden başlamak; “YOOT”/“YAEK” sonrası “CHOCK” beklememek.", en: "Starting before the command; not waiting for “CHOCK” after “YOOT”/“YAEK”." },
    related: ["REF_YOOT", "REF_YAEK"],
    tags: ["chock", "dövüş", "fight", "başlat", "komut", "26.3"]
  },
  {
    id: "REF_TIME", module: "orta", subtopic: "komutlar", label: "ifma",
    rule: "26.3", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref", "time"],
    media: { photo: false, video: true, animation: false },
    title: { tr: "TIME (Süreyi Durdur)", en: "TIME (Stop the clock)" },
    quick: {
      tr: "Ring içi/dışı bir müdahale için aktif raundda kronometrenin durması amacıyla Zaman Hakemine “TIME” komutu verilir.",
      en: "“TIME” tells the timekeeper to stop the clock during an active round for an in/out-of-ring intervention."
    },
    when: { tr: "Ekipman düzeltme, sakatlık, ring dışına düşme vb.", en: "Equipment fix, injury, fall out of ring, etc." },
    right: { tr: "Durdurulan süre raunda eklenmez, ek raund verilmez (Kural 7).", en: "Stopped time is not added to the round; no extra round is given (Rule 7)." },
    wrong: { tr: "Süreyi durdurmadan müdahale etmek; durdurulan süreyi rakip aleyhine saymak.", en: "Intervening without stopping time; counting stopped time against an athlete." },
    related: ["CAT_ROUNDS"],
    tags: ["time", "süre", "zaman", "kronometre", "clock", "26.3"]
  },
  {
    id: "REF_ATTIRE", module: "orta", subtopic: "hazirlik", label: "ifma",
    rule: "26.1", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: true, video: false, animation: false },
    title: { tr: "Hakem giyimi ve hazırlık", en: "Referee attire & readiness" },
    quick: {
      tr: "Orta Hakem topuksuz düz tabanlı siyah ayakkabı giyer; cerrahi eldiven tavsiye edilir. Gözlük, takı, kemer ve başlık yasaktır.",
      en: "The referee wears flat-soled black shoes; surgical gloves are recommended. Glasses, jewellery, belts and headwear are prohibited."
    },
    when: { tr: "Tüm maçlar. Görme için kontakt lens serbest (26.6).", en: "All matches. Contact lenses are allowed for vision (26.6)." },
    right: { tr: "Düz tabanlı siyah ayakkabı + (tavsiye) cerrahi eldiven; aksesuarsız.", en: "Flat-soled black shoes + (recommended) surgical gloves; no accessories." },
    wrong: { tr: "Topuklu ayakkabı, kol saati/yüzük, kemer veya başlık ile ringe çıkmak.", en: "Entering with heeled shoes, a watch/ring, a belt or headwear." },
    related: ["REF_SAFETY"],
    tags: ["giyim", "ayakkabı", "eldiven", "attire", "26.1", "26.6"]
  },
  {
    id: "REF_SAFETY", module: "orta", subtopic: "hazirlik", label: "ifma",
    rule: "26.2", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Birincil öncelik: sporcu güvenliği", en: "Primary priority: athlete safety" },
    quick: {
      tr: "Sporcunun güvenliği ve sağlığı, Orta Hakemin her kararında birincil önceliğidir.",
      en: "The athlete's safety and health are the referee's primary priority in every decision."
    },
    when: { tr: "Her an, her maçta.", en: "At all times, in every match." },
    right: { tr: "Şüphede kal → güvenlik lehine karar ver (gerekirse RSC).", en: "When in doubt → decide for safety (RSC if needed)." },
    wrong: { tr: "Maçı sürdürmek için güvenlik işaretlerini görmezden gelmek.", en: "Ignoring safety signals to keep the match going." },
    related: ["REF_RSC_POWER", "FOUL_RSC"],
    tags: ["güvenlik", "safety", "öncelik", "26.2"]
  },
  {
    id: "REF_RSC_POWER", module: "orta", subtopic: "macsonu", label: "ifma",
    rule: "26.4", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: false, video: true, animation: false },
    title: { tr: "Maçı durdurma yetkisi (RSC)", en: "Power to stop the contest (RSC)" },
    quick: {
      tr: "Orta Hakem; aşırı güç farkı (RSCS), sakatlık (RSCI), kafa (RSCH) veya vücut (RSCB) darbesi ya da sayım limiti (CCL) durumunda maçı bitirebilir.",
      en: "The referee may end the match for one-sidedness (RSCS), injury (RSCI), head (RSCH) or body (RSCB) strikes, or the count limit (CCL)."
    },
    when: { tr: "Tüm dövüş kategorileri.", en: "All combat categories." },
    right: { tr: "Ciddi yaralanmada derhal durdur; gerekirse ringdeki doktora en fazla 1 dk danış (30.2.2).", en: "Stop at once on serious injury; consult the ringside doctor for max 1 min if needed (30.2.2)." },
    wrong: { tr: "Tek taraflı maçta güvenlik durdurmasını geciktirmek.", en: "Delaying a safety stop in a one-sided match." },
    related: ["FOUL_RSC", "FOUL_CCL"],
    tags: ["rsc", "rscs", "rsci", "rsch", "rscb", "ccl", "26.4", "30.2"]
  },
  {
    id: "REF_ENDMATCH", module: "orta", subtopic: "macsonu", label: "ifma",
    rule: "26.3", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: true, video: false, animation: false },
    title: { tr: "Maç sonu ve el kaldırma", en: "Match end & raising the hand" },
    quick: {
      tr: "Karar resmen açıklanmadan Orta Hakem galibi ilan etmez; kazanan anons edilince kazananın elini kaldırır.",
      en: "The referee does not signal the winner before the official announcement; on announcement, raises the winner's hand."
    },
    when: { tr: "Maç bitiminde.", en: "At the end of the match." },
    right: { tr: "Skor kartlarını topla → Jüriye/anons hakemine ver → karar açıklanınca eli kaldır.", en: "Collect the scorecards → give to jury/announcer → raise the hand once announced." },
    wrong: { tr: "Anons öncesi galibi belli etmek.", en: "Revealing the winner before the announcement." },
    related: ["JUDGE_10PT"],
    tags: ["maç sonu", "el kaldırma", "karar", "26.3"]
  },
  {
    id: "TRAIN_YOOT", module: "orta", subtopic: "komutlar", label: "training",
    rule: "—", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: false, video: true, animation: false },
    title: { tr: "Komut çalışması: YOOT → CHOCK", en: "Command drill: YOOT → CHOCK" },
    quick: {
      tr: "Eğitim uygulaması: YOOT ile durdur, sporcuların geri adımını bekle, CHOCK ile başlat. Ritmi, ses tonunu ve el işaretini çalış.",
      en: "Training drill: stop with YOOT, wait for the step-back, start with CHOCK. Practise the rhythm, tone and hand signal."
    },
    when: { tr: "Eğitim / prova amaçlı — yönetmelik hükmü değildir.", en: "For training/rehearsal — not a regulation clause." },
    right: { tr: "Net ses + görünür işaret + tutarlı ritim.", en: "Clear voice + visible signal + consistent rhythm." },
    wrong: { tr: "Komutu mırıldanmak; işaretsiz durdurmak.", en: "Mumbling the command; stopping without a signal." },
    related: ["REF_YOOT", "REF_CHOCK"],
    tags: ["eğitim", "training", "komut", "drill", "yoot", "chock"]
  },
  {
    id: "REF_RINGGIRIS", module: "orta", subtopic: "ringgiris", label: "ifma",
    rule: "19.1", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: true, video: false, animation: false },
    title: { tr: "Ringe giriş ve ekipman kontrolü", en: "Ring entry & equipment check" },
    quick: {
      tr: "Sporcu ekipmanı hazır ringe gelir; mongkon köşe tarafından takılır ve Orta Hakem sporcunun köşesinde ekipman kontrolü yapar.",
      en: "The athlete enters ready-equipped; the corner places the mongkon, and the referee checks the equipment at the athlete's corner."
    },
    when: { tr: "Maç öncesi, ringe girişte.", en: "Pre-match, on ring entry." },
    right: { tr: "Bandaj/el sargısı, eldiven, dirseklik, kaval ve kasık koruyucu kontrol edilir; mongkon, kask ve dişlik köşe tarafından tutulur (19.1).",
             en: "Wraps, gloves, elbow guard, shin and groin guards are checked; the mongkon, headguard and gum shield are held by the corner (19.1)." },
    wrong: { tr: "Kontrol tamamlanmadan Wai Kru'ya veya maça geçmek.", en: "Moving to Wai Kru or the match before the check is complete." },
    related: ["AREA_EQUIP", "REF_BASLATMA"],
    tags: ["ringe giriş", "ekipman kontrolü", "mongkon", "19.1"]
  },
  {
    id: "REF_BASLATMA", module: "orta", subtopic: "baslatma", label: "ifma",
    rule: "19.2", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: true, video: false, animation: false },
    title: { tr: "Maç başlatma sırası", en: "Starting sequence" },
    quick: {
      tr: "Ekipman kontrolü → Orta Hakem Wai Kru sinyali → selamlaşma (Wai) → gong → “CHOCK” ile başla.",
      en: "Equipment check → referee signals Wai Kru → salute (Wai) → gong → start with “CHOCK”."
    },
    when: { tr: "Her maç başında.", en: "At the start of every match." },
    right: { tr: "Selamlaşma yalnızca 1. raund öncesi ve maç sonu yapılır; raund arası selamlaşma yasaktır (19.3.1).",
             en: "The salute is only before round 1 and after the result; saluting between rounds is prohibited (19.3.1)." },
    wrong: { tr: "Wai Kru veya selamlaşma sırasını atlamak.", en: "Skipping the Wai Kru or salute sequence." },
    related: ["REF_CHOCK", "WAI_WHAT"],
    tags: ["başlangıç", "wai kru", "selamlaşma", "gong", "19"]
  },
  {
    id: "REF_POZISYON", module: "orta", subtopic: "pozisyon", label: "ifma",
    rule: "26.3", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: true, video: false, animation: false },
    title: { tr: "Adımlama ve pozisyon", en: "Footwork & positioning" },
    quick: {
      tr: "Orta Hakem maçın tüm aşamalarında kontrolü sürdürür ve güçsüz düşmüş bir sporcunun gereksiz darbe almasını önleyecek şekilde konumlanır.",
      en: "The referee maintains control at all stages and positions to prevent a weakened athlete from taking undue punishment."
    },
    when: { tr: "Maç boyunca.", en: "Throughout the match." },
    right: { tr: "Sporculara net görüş açısı koruyan, hızlı müdahaleye hazır mesafe.", en: "A distance that keeps a clear view and allows quick intervention." },
    wrong: { tr: "Görüşü kapatan ya da müdahaleye uzak konum.", en: "Blocking the view, or standing too far to intervene." },
    related: ["REF_SAFETY", "REF_CLINCH"],
    tags: ["pozisyon", "adımlama", "kontrol", "26"]
  },
  {
    id: "REF_CLINCH", module: "orta", subtopic: "clinch", label: "ifma",
    rule: "26.3", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: false, video: true, animation: false },
    title: { tr: "Clinch ayırma", en: "Breaking the clinch" },
    quick: {
      tr: "Clinch Muaythai'nin bir parçasıdır; gerektiğinde Orta Hakem “YAEK” ile ayırır, sporcular geri çekilir ve “CHOCK” ile devam edilir.",
      en: "The clinch is part of Muaythai; when needed the referee breaks it with “YAEK”, athletes step back, and play resumes on “CHOCK”."
    },
    when: { tr: "Clinch / kilitlenme durumlarında.", en: "In clinch / locking situations." },
    right: { tr: "“YAEK” → geri adım → “CHOCK”.", en: "“YAEK” → step back → “CHOCK”." },
    wrong: { tr: "Rakibin bacağını tutup 2 adımdan fazla ilerlemek (31.2.19) veya tamamen pasif clinch.", en: "Holding the opponent's leg and stepping more than 2 steps (31.2.19), or a fully passive clinch." },
    related: ["REF_YAEK", "FOUL_CAT_LIMIT"],
    tags: ["clinch", "yaek", "ayırma", "26.3", "31.2.19"]
  },
  {
    id: "REF_IKAZIHTAR", module: "orta", subtopic: "ikazihtar", label: "ifma",
    rule: "31.1", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: true, video: false, animation: false },
    title: { tr: "İkaz ve ihtar verme", en: "Giving a caution & a warning" },
    quick: {
      tr: "Küçük ihlalde fiziksel işaretle sözlü İkaz; ciddi/tekrar eden ihlalde maçı durdurup İhtar ver, Jüriye bildir ve işaretle.",
      en: "A verbal Caution with a physical signal for minor infringements; for serious/repeated ones, stop the match, give a Warning, inform the jury and signal it."
    },
    when: { tr: "Faul değerlendirmesinde.", en: "When assessing a foul." },
    right: { tr: "Aynı ihlalden 3 İkaz → 1 İhtar. Bir maçta 3 İhtar → Diskalifiye.", en: "3 Cautions for the same offence → 1 Warning. 3 Warnings in a contest → disqualification." },
    wrong: { tr: "İhtarı sessizce vermek; İkaz için maçı gereksiz durdurmak.", en: "Giving a Warning silently; stopping the match unnecessarily for a Caution." },
    related: ["FOUL_CLASS", "JUDGE_DEDUCT"],
    tags: ["ikaz", "ihtar", "caution", "warning", "31.1"]
  },
  {
    id: "REF_SAYIMREF", module: "orta", subtopic: "sayimref", label: "ifma",
    rule: "32.2", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: false, video: true, animation: false },
    title: { tr: "Sayım yapma", en: "Performing the count" },
    quick: {
      tr: "Knockdown'da Orta Hakem “YOOT” der ve Tayca yüksek sesle sayar (NUENG→SIB); darbeyle NUENG arasında en az 1 sn, her sayı 1 sn arayla ve elle gösterilir.",
      en: "On a knockdown the referee commands “YOOT” and counts aloud in Thai (NUENG→SIB); at least 1 s between the blow and NUENG, each number 1 s apart, shown by hand."
    },
    when: { tr: "Her knockdown'da.", en: "At every knockdown." },
    right: { tr: "8 (BAED)'e kadar zorunlu; 8'de hazırsa “CHOCK”, değilse 10 (SIB) = KO.", en: "Mandatory to 8 (BAED); if ready at 8 → “CHOCK”, otherwise 10 (SIB) = KO." },
    wrong: { tr: "Çok hızlı saymak; sporcu erken kalktı diye 8'den önce başlatmak.", en: "Counting too fast; resuming before 8 because the athlete rose early." },
    related: ["FOUL_COUNT_THAI", "FOUL_RULE8", "FOUL_KO"],
    tags: ["sayım", "count", "nueng", "sib", "baed", "32.2"]
  },
  {
    id: "REF_DOKTOR", module: "orta", subtopic: "doktor", label: "ifma",
    rule: "30.2.2", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: true, video: false, animation: false },
    title: { tr: "Doktor çağırma", en: "Calling the doctor" },
    quick: {
      tr: "Ciddi yaralanmada Orta Hakem doktoru tarafsız köşeye çağırır ve en fazla 1 dk danışır; doktor durdur derse Hakem uymak zorundadır.",
      en: "For a serious injury the referee calls the doctor to the neutral corner and consults for no more than 1 min; if the doctor advises to stop, the referee must comply."
    },
    when: { tr: "Sakatlık / ciddi yaralanma durumunda.", en: "On injury / serious harm." },
    right: { tr: "Doktor muayenesinde ringde yalnızca Hakem ve doktor bulunur; köşe giremez (30.2.2).", en: "During the exam only the referee and doctor are in the ring; no Second may enter (30.2.2)." },
    wrong: { tr: "Köşenin ringe veya aprona girmesine izin vermek.", en: "Letting a Second enter the ring or apron." },
    related: ["REF_RSC_POWER", "FOUL_RSC"],
    tags: ["doktor", "rsci", "yaralanma", "30.2.2", "33"]
  },
  {
    id: "REF_OUTRING", module: "orta", subtopic: "ringdisi", label: "ifma",
    rule: "30.10", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Ring dışına düşme (Hakem)", en: "Fall out of the ring (referee)" },
    quick: {
      tr: "Sporcu ring dışına düşerse Orta Hakem derhal “YOOT” der ve sayar; sporcu yardımsız 20 (Yee-Sib) sayımı içinde ringe dönmelidir.",
      en: "If an athlete falls out, the referee immediately commands “YOOT” and counts; the athlete must return unaided within a count of 20 (Yee-Sib)."
    },
    when: { tr: "Sporcu ring dışına düştüğünde.", en: "When an athlete falls out of the ring." },
    right: { tr: "20 içinde dönerse devam; dönemezse ringdeki sporcu RSC ile kazanır. Sporcuya yardım/engel olunmadığından emin ol.", en: "Returns within 20 → continue; if not, the athlete in the ring wins by RSC. Ensure the athlete is neither assisted nor hindered." },
    wrong: { tr: "Süreyi durdurmadan saymak; sporcuya yardım edilmesine izin vermek.", en: "Counting without stopping time; allowing help to the athlete." },
    related: ["FOUL_OUTRING", "REF_TIME"],
    tags: ["ring dışı", "20", "yee-sib", "30.10"]
  },

  /* ===================== FAUL / SAYIM / KARARLAR ===================== */
  {
    id: "FOUL_CLASS", module: "faul", subtopic: "faulsinif", label: "ifma",
    rule: "31.1", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref", "judge"],
    media: { photo: false, video: false, animation: true },
    title: { tr: "İkaz / İhtar / DQ farkı", en: "Caution / Warning / DQ" },
    quick: {
      tr: "İkaz (Caution) sözlü küçük uyarıdır; İhtar (Warning) maçı durdurup verilir; büyük/tehlikeli ihlal doğrudan Diskalifiye (DQ).",
      en: "A Caution is a minor verbal warning; a Warning stops the match; a serious/dangerous foul leads to direct Disqualification (DQ)."
    },
    when: { tr: "Tüm faul değerlendirmeleri.", en: "All foul assessments." },
    right: { tr: "Aynı ihlalden 3 İkaz → 1 İhtar. Bir maçta 3 İhtar → DQ.", en: "3 Cautions for the same foul → 1 Warning. 3 Warnings in a match → DQ." },
    wrong: { tr: "İhtarı sessizce vermek; İkaz için maçı gereksiz durdurmak.", en: "Giving a Warning silently; stopping the match unnecessarily for a Caution." },
    related: ["FOUL_3WARN", "FOUL_CAT_LIMIT"],
    tags: ["ikaz", "ihtar", "caution", "warning", "dq", "diskalifiye", "31.1"]
  },
  {
    id: "FOUL_3WARN", module: "faul", subtopic: "faulsinif", label: "ifma",
    rule: "31.1.2", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "3 İhtar = Diskalifiye", en: "3 Warnings = Disqualification" },
    quick: {
      tr: "Bir sporcu bir maç boyunca 3 İhtar (Warning) alırsa diskalifiye edilir.",
      en: "An athlete who receives 3 Warnings in a match is disqualified."
    },
    when: { tr: "Tüm dövüş kategorileri.", en: "All combat categories." },
    right: { tr: "İhtarları Jüriye bildir ve işaretle; 3'te DQ uygula.", en: "Report Warnings to the jury and signal; apply DQ on the 3rd." },
    wrong: { tr: "İhtarları takip etmemek.", en: "Not keeping track of Warnings." },
    related: ["FOUL_CLASS"],
    tags: ["ihtar", "3 ihtar", "warning", "dq", "31.1.2"]
  },
  {
    id: "FOUL_COUNT_THAI", module: "faul", subtopic: "sayim8", label: "ifma",
    rule: "32.2", revision: "2026-05-11", status: A,
    discipline: ["full"], age: [], gender: [], role: ["ref"],
    media: { photo: false, video: true, animation: false },
    title: { tr: "Tayca sayım (NUENG → SIB)", en: "Thai count (NUENG → SIB)" },
    quick: {
      tr: "Sayımda Orta Hakem Tayca yüksek sesle sayar: NUENG(1), SONG(2), SAAM(3), SII(4), HAH(5), HOK(6), JED(7), BAED(8), KOUW(9), SIB(10).",
      en: "During the count the referee counts aloud in Thai: NUENG(1), SONG(2), SAAM(3), SII(4), HAH(5), HOK(6), JED(7), BAED(8), KOUW(9), SIB(10)."
    },
    when: { tr: "Her knockdown ve sayım durumunda.", en: "At every knockdown and count." },
    right: { tr: "Darbe ile “NUENG” arasında en az 1 sn geçer; her sayı 1 sn arayla, elle gösterilerek sayılır.", en: "At least 1 s between the blow and “NUENG”; each number 1 s apart, shown by hand." },
    wrong: { tr: "Çok hızlı saymak; darbeden hemen sonra “NUENG” demek.", en: "Counting too fast; saying “NUENG” immediately after the blow." },
    related: ["FOUL_RULE8", "FOUL_KO"],
    tags: ["sayım", "count", "nueng", "song", "baed", "sib", "tayca", "32.2"]
  },
  {
    id: "FOUL_RULE8", module: "faul", subtopic: "sayim8", label: "ifma",
    rule: "32.4", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Zorunlu 8'e kadar sayım", en: "Mandatory count to 8" },
    quick: {
      tr: "Orta Hakem sayıma başlayınca sporcu hazır olsa bile maç “BAED” (8) sayısına ulaşana kadar yeniden başlamaz.",
      en: "Once the referee starts the count, the match does not resume until “BAED” (8), even if the athlete is ready earlier."
    },
    when: { tr: "Her knockdown sayımında.", en: "At every knockdown count." },
    right: { tr: "8'e kadar say; 8'de sporcu hazırsa “CHOCK”.", en: "Count to 8; if ready at 8, give “CHOCK”." },
    wrong: { tr: "Sporcu erken kalktı diye 8'den önce devam ettirmek.", en: "Resuming before 8 because the athlete stood up early." },
    related: ["FOUL_COUNT_THAI", "FOUL_KO"],
    tags: ["8 sayımı", "baed", "zorunlu sayım", "32.4"]
  },
  {
    id: "FOUL_KO", module: "faul", subtopic: "ko", label: "ifma",
    rule: "32.5", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: false, video: true, animation: false },
    title: { tr: "Nakavt (KO): 10 sayımı", en: "Knockout (KO): the 10 count" },
    quick: {
      tr: "“BAED” (8) sayısında maça devam edemeyen sporcu için Hakem “SIB” (10) sayısına kadar sayar; 10'da maç biter ve karar Nakavt (KO).",
      en: "If the athlete cannot continue at “BAED” (8), the referee counts to “SIB” (10); at 10 the match ends as a Knockout (KO)."
    },
    when: { tr: "Sporcu 8'de devam edemezse.", en: "When the athlete cannot continue at 8." },
    right: { tr: "KOH = kafa darbesi, KOB = vücut darbesi kaynaklı nakavt (30.3).", en: "KOH = knockout by head strike, KOB = by body strike (30.3)." },
    wrong: { tr: "10 sayımını tamamlamadan KO ilan etmek.", en: "Declaring KO without completing the 10 count." },
    related: ["FOUL_COUNT_THAI", "FOUL_RULE8"],
    tags: ["ko", "nakavt", "koh", "kob", "sib", "10 sayımı", "32.5", "30.3"]
  },
  {
    id: "FOUL_KNOCKDOWN", module: "faul", subtopic: "knockdown", label: "ifma",
    rule: "32.1", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref", "judge"],
    media: { photo: true, video: true, animation: false },
    title: { tr: "Knockdown (yere serilme) tanımı", en: "Knockdown definition" },
    quick: {
      tr: "Sporcu; ayakları dışında bir yeriyle zemine değerse, iplere savunmasız yaslanırsa, iplerden kısmen/tamamen çıkarsa veya sert darbe sonrası yarı bilinçli/savunmasızsa “Knockdown” sayılır.",
      en: "A knockdown is when the athlete touches the floor with anything but the feet, leans defenceless on the ropes, goes through the ropes, or is semi-conscious/defenceless after a hard blow."
    },
    when: { tr: "Tüm dövüş kategorileri.", en: "All combat categories." },
    right: { tr: "Yan Hakem skor kartına “KD”, kafa kaynaklıysa “KD+H” yazar (32.2.3).", en: "The judge writes “KD” on the card, or “KD+H” if head-caused (32.2.3)." },
    wrong: { tr: "Dengesini kaybeden ama darbe almayan sporcuyu knockdown saymak.", en: "Scoring a knockdown for an athlete who lost balance without a blow." },
    related: ["FOUL_COUNT_THAI", "FOUL_CCL"],
    tags: ["knockdown", "yere serilme", "kd", "32.1"]
  },
  {
    id: "FOUL_RSC", module: "faul", subtopic: "rsc", label: "ifma",
    rule: "30.2", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: false, video: false, animation: true },
    title: { tr: "RSC türleri", en: "RSC types" },
    quick: {
      tr: "Hakem Kararıyla Maçın Bitmesi: RSCS (güvenlik/tek taraflı), RSCI (sakatlık), RSCH (kafa darbesi), RSCB (vücut darbesi), CCL (sayım limiti).",
      en: "Referee Stops Contest: RSCS (safety/one-sided), RSCI (injury), RSCH (head strike), RSCB (body strike), CCL (count limit)."
    },
    when: { tr: "Güvenlik veya sağlık gerektiren durumlar.", en: "Situations requiring safety or health action." },
    right: { tr: "Ciddi yaralanma (kırık, çıkık, kusma, durdurulamayan kanama) → derhal durdur, RSCI, tıbbi değerlendirme (30.2.2).", en: "Serious injury (fracture, dislocation, vomiting, uncontrolled bleeding) → stop at once, RSCI, medical eval (30.2.2)." },
    wrong: { tr: "RSCH'yi yalnızca çok sayıda vuruştan kaçan sporcuya uygulamak (açık kafa darbesi yoksa değil).", en: "Calling RSCH merely because an athlete retreats from many strikes (no clear head blow)." },
    related: ["REF_RSC_POWER", "FOUL_CCL"],
    tags: ["rsc", "rscs", "rsci", "rsch", "rscb", "30.2"]
  },
  {
    id: "FOUL_CCL", module: "faul", subtopic: "rsc", label: "ifma",
    rule: "30.2.5", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Zorunlu Sayma Limiti (CCL)", en: "Compulsory Count Limit (CCL)" },
    quick: {
      tr: "Kategoriye göre sayım limitine ulaşınca Hakem maçı bitirir. U24/Elite/35+: raundda 3 veya toplam 4 • U18/V40+/V45+: raundda 2 veya toplam 3 • U8–U16: toplam 2 sayım.",
      en: "The referee ends the match when the category count limit is reached. U24/Elite/35+: 3 in a round or 4 total • U18/V40+/V45+: 2 in a round or 3 total • U8–U16: 2 total."
    },
    when: { tr: "Kategoriye bağlı — üstteki Kategori Özeti bunu senin seçimine göre gösterir.", en: "Category-dependent — the Category Summary shows this for your selection." },
    right: { tr: "Sayımın CCL'e sayılması için bir Muaythai vuruşu sonucu olması gerekir.", en: "A count only counts toward CCL if it results from a Muaythai strike." },
    wrong: { tr: "Kategori limitini karıştırmak; yanlış limitte maçı bitirmek/sürdürmek.", en: "Confusing the category limit; ending/continuing at the wrong limit." },
    related: ["FOUL_RSC", "CAT_CCL"],
    tags: ["ccl", "sayma limiti", "compulsory count", "30.2.5"]
  },
  {
    id: "FOUL_OUTRING", module: "faul", subtopic: "ringdisidus", label: "ifma",
    rule: "30.10", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: false, video: true, animation: false },
    title: { tr: "Ring dışına düşme (20 sayımı)", en: "Fall out of the ring (20 count)" },
    quick: {
      tr: "Sporcu ring dışına düşerse Hakem “YOOT” der ve sayar; sporcu yardımsız Tayca “Yee-Sib” (20) sayımı içinde ringe dönmelidir.",
      en: "If an athlete falls out, the referee calls “YOOT” and counts; the athlete must return unaided within the Thai “Yee-Sib” (20) count."
    },
    when: { tr: "Sporcu(lar) ring dışına düştüğünde.", en: "When an athlete falls out of the ring." },
    right: { tr: "20 içinde dönerse “CHOCK” ile devam; dönemezse ringdeki sporcu RSC ile kazanır.", en: "Returns within 20 → “CHOCK”; if not, the athlete in the ring wins by RSC." },
    wrong: { tr: "Sporcuya yardım edilmesine izin vermek; süreyi durdurmadan saymak.", en: "Allowing help to the athlete; counting without stopping time." },
    related: ["REF_TIME", "FOUL_COUNT_THAI"],
    tags: ["ring dışı", "20 sayımı", "yee-sib", "30.10", "32.10"]
  },
  {
    id: "FOUL_CAT_LIMIT", module: "faul", subtopic: "faultur", label: "ifma",
    rule: "31.3", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref", "judge"],
    media: { photo: false, video: false, animation: true },
    title: { tr: "Kategoriye göre kısıtlı teknikler", en: "Category-restricted techniques" },
    quick: {
      tr: "U14: kafaya dirsek/diz yok. U12/U10/U8: kafaya vuruş yok. Elite/U16 ve üstü: kısıtlama yok. Semi Contact: sert (tam güç) vuruş yok.",
      en: "U14: no elbow/knee to head. U12/U10/U8: no strikes to head. Elite/U16 and above: no restriction. Semi Contact: no hard (full-power) strikes."
    },
    when: { tr: "Kategori seçimine göre değişir.", en: "Varies by category selection." },
    right: { tr: "Maç öncesi kategoriyi kontrol et; kısıtı sporcuya hatırlat.", en: "Check the category pre-match; remind the athlete of the limit." },
    wrong: { tr: "Genç kategoride kafaya teknik çıkışını görmezden gelmek.", en: "Missing a head technique in a youth category." },
    related: ["FOUL_U14_HEAD", "CAT_LIMIT"],
    tags: ["kısıt", "u14", "u12", "kafa", "diz", "dirsek", "semi", "31.3"]
  },
  {
    id: "FOUL_U14_HEAD", module: "faul", subtopic: "faultur", label: "ifma",
    rule: "31.3", revision: "2026-05-11", status: A,
    discipline: ["full", "semi"], age: ["U14"], gender: [], role: ["ref", "judge"],
    media: { photo: true, video: true, animation: false },
    title: { tr: "U14: Kafaya diz ve dirsek", en: "U14: knee & elbow to the head" },
    quick: {
      tr: "U14 kategorisinde kafaya dirsek veya diz vuruşu yasaktır; kasıtlı uygulanırsa fauldür.",
      en: "In U14, elbow or knee strikes to the head are prohibited; if intentional, it is a foul."
    },
    when: { tr: "Yalnızca U14 • Full/Semi Contact.", en: "U14 only • Full/Semi Contact." },
    right: { tr: "Gövdeye diz/dirsek serbest; kafaya yalnızca izinli teknikler.", en: "Knee/elbow to the body allowed; only permitted techniques to the head." },
    wrong: { tr: "U14'te kafaya diz/dirsek çıkarmak.", en: "Throwing a knee/elbow to the head in U14." },
    related: ["FOUL_CAT_LIMIT", "CAT_LIMIT"],
    tags: ["u14", "kafaya diz", "kafaya dirsek", "kısıt", "31.3"]
  },
  {
    id: "FOUL_GROIN", module: "faul", subtopic: "faultur", label: "ifma",
    rule: "31.2.18", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref", "judge"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Kasık ve boyun omurlarına vuruş", en: "Strikes to groin & neck vertebrae" },
    quick: {
      tr: "Kasık bölgesine veya boyun omurlarına (C1–C7, ense kökü dahil) vuruş yasaktır — yasak hedef.",
      en: "Strikes to the groin or the neck vertebrae (C1–C7, incl. base of the skull) are forbidden — a prohibited target."
    },
    when: { tr: "Tüm kategoriler.", en: "All categories." },
    right: { tr: "Kasıtsız ve devam edemeyen sporcuya Hakem 3 dk'ya kadar süre verebilir/sayabilir.", en: "For an unintentional foul leaving the athlete unable to continue, the referee may allow up to 3 min / count." },
    wrong: { tr: "Bu bölgelere kasıtlı vuruş → İhtar/DQ.", en: "Intentional strikes here → Warning/DQ." },
    related: ["JUDGE_TARGET", "FOUL_CLASS"],
    tags: ["kasık", "groin", "boyun", "c1-c7", "yasak hedef", "31.2.18"]
  },
  {
    id: "FOUL_APPEAL", module: "faul", subtopic: "itiraz", label: "ifma",
    rule: "30.12", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["jury"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "İtiraz süreci ve ücreti", en: "Appeal process & fee" },
    quick: {
      tr: "İtiraz, karardan sonra 30 dk içinde (altın madalya maçında 5 dk) Takım Yöneticisi tarafından yazılı ve 500 USD ücretle yapılır.",
      en: "An appeal is filed within 30 min of the decision (5 min for a gold-medal bout) by the Team Manager, in writing, with a 500 USD fee."
    },
    when: { tr: "Karar açıklandıktan sonra.", en: "After the decision is announced." },
    right: { tr: "Kabul edilirse 100 USD idari kesinti, kalan iade; reddedilirse ücret iade edilmez.", en: "If upheld, 100 USD admin kept, rest refunded; if rejected, fee retained." },
    wrong: { tr: "Süre veya ücret şartını atlamak.", en: "Skipping the deadline or fee requirement." },
    related: ["OFF_JURY"],
    tags: ["itiraz", "appeal", "500 usd", "30.12"]
  },
  {
    id: "FOUL_DOUBLE_KD", module: "faul", subtopic: "ciftekd", label: "ifma",
    rule: "32.8", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref", "judge"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Çifte knockdown", en: "Double knockdown" },
    quick: {
      tr: "Her iki sporcu da aynı anda yere serilirse, en az biri knockdown durumunda kaldığı sürece sayım sürer; ikisi de 8 (BAED)'e kadar kalkamazsa maç durur.",
      en: "If both athletes are down at once, the count continues while at least one remains down; if neither is up by 8 (BAED), the match is stopped."
    },
    when: { tr: "İki sporcu da aynı anda yere serildiğinde.", en: "When both athletes go down at once." },
    right: { tr: "İkisi de kafa darbesiyle düşerse Puanla Galibiyet (WP); tıbbi kayıt için her ikisine RSCH/KOH işlenir (32.8.1).", en: "If both fall from head blows, decide by Win on Points (WP); record RSCH/KOH for both for medical tracking (32.8.1)." },
    wrong: { tr: "Yalnızca birini saymak; olayı kayda geçmemek.", en: "Counting only one; not recording the event." },
    related: ["FOUL_KNOCKDOWN", "FOUL_COUNT_THAI"],
    tags: ["çifte knockdown", "double knockdown", "32.8"]
  },
  {
    id: "FOUL_RETDQ", module: "faul", subtopic: "wonc", label: "ifma",
    rule: "30.4", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref", "jury"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Çekilme (RET) ve Diskalifiye (DQ)", en: "Retirement (RET) & Disqualification (DQ)" },
    quick: {
      tr: "RET: sporcu dinlenme sonrası köşeden çıkmaz, sayımdan sonra devam etmek istemez ya da köşesi onun adına çekilir. DQ: büyük/tehlikeli ihlalde rakip galip.",
      en: "RET: the athlete doesn't leave the corner after rest, won't continue after a count, or the corner retires on their behalf. DQ: for a major/dangerous foul the opponent wins."
    },
    when: { tr: "Sporcu devam etmediğinde veya ciddi ihlalde.", en: "When an athlete won't continue, or on a serious foul." },
    right: { tr: "Diskalifiye edilen sporcu o müsabakadan madalya/ödül/derece alamaz (30.5).", en: "A disqualified athlete gets no medal/award/grading from that competition (30.5)." },
    wrong: { tr: "Köşenin havlu atmasını (RET) görmezden gelmek.", en: "Ignoring the corner throwing in the towel (RET)." },
    related: ["FOUL_RSC", "REF_ENDMATCH"],
    tags: ["ret", "dq", "çekilme", "diskalifiye", "30.4", "30.5"]
  },
  {
    id: "FOUL_WONC", module: "faul", subtopic: "wonc", label: "ifma",
    rule: "30.6", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref", "jury"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Hükmen (WO) ve Geçersiz maç (NC)", en: "Walk-over (WO) & No Contest (NC)" },
    quick: {
      tr: "WO: sporcu hazır ama rakibi anons + gong sonrası 2 dk içinde ringe çıkmazsa hükmen galip. NC: ring/ışık/hava gibi dış nedenle 10 dk içinde çözülemezse geçersiz maç.",
      en: "WO: an athlete is ready but the opponent doesn't enter within 2 min of the announcement and gong. NC: if an external cause (ring/lights/weather) isn't resolved within 10 min → no contest."
    },
    when: { tr: "Rakip çıkmaz veya dış etken olursa.", en: "When an opponent fails to appear, or an external cause arises." },
    right: { tr: "WO'da önce Jüriye bildir, sporcuyu ringin ortasına çağır (30.6).", en: "For a WO, inform the jury first and call the athlete to the ring centre (30.6)." },
    wrong: { tr: "2 dk / 10 dk sürelerini beklemeden karar vermek.", en: "Deciding before the 2 min / 10 min periods elapse." },
    related: ["FOUL_RETDQ", "REF_ENDMATCH"],
    tags: ["wo", "nc", "hükmen", "geçersiz", "walkover", "no contest", "30.6", "30.7"]
  },
  {
    id: "FOUL_DOWNED", module: "faul", subtopic: "faultur", label: "ifma",
    rule: "31.2.13", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: true, video: false, animation: false },
    title: { tr: "Yerdeki/kalkan rakibe vurmak", en: "Striking a downed or rising opponent" },
    quick: {
      tr: "Yerde olan veya ayağa kalkmakta olan rakibe vurmak fauldür.",
      en: "Striking an opponent who is down or in the act of rising is a foul."
    },
    when: { tr: "Rakip yerde veya kalkarken.", en: "When the opponent is down or rising." },
    right: { tr: "Rakip düşünce vuruşu kes, Hakemin komutunu bekle.", en: "When the opponent goes down, stop striking and await the referee's command." },
    wrong: { tr: "Düşen rakibe ek vuruş yapmak → İhtar/DQ.", en: "Adding a strike on a downed opponent → Warning/DQ." },
    related: ["FOUL_CLASS", "FOUL_KNOCKDOWN"],
    tags: ["yerde vurmak", "downed", "31.2.13"]
  },
  {
    id: "FOUL_ROUND_END", module: "faul", subtopic: "faultur", label: "ifma",
    rule: "31.2.20", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: true, video: false, animation: false },
    title: { tr: "Raund bittikten sonra vurmak", en: "Striking after the round ends" },
    quick: {
      tr: "Gong/zil çaldıktan (raund bittikten) sonra rakibe vurmak fauldür.",
      en: "Striking the opponent after the bell (round end) is a foul."
    },
    when: { tr: "Raund bitiminde.", en: "At the end of the round." },
    right: { tr: "Gong sesinde vuruşu derhal kes.", en: "Stop striking immediately on the bell." },
    wrong: { tr: "Gong sonrası son bir vuruş → İkaz/İhtar.", en: "A last strike after the bell → Caution/Warning." },
    related: ["FOUL_CLASS"],
    tags: ["raund sonu", "gong", "31.2.20"]
  },
  {
    id: "FOUL_PASSIVE", module: "faul", subtopic: "faultur", label: "ifma",
    rule: "31.2.16", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Pasif savunma / çift blok", en: "Passive defence / double cover" },
    quick: {
      tr: "Çift blok (kapanma) ile tamamen pasif savunma yapmak veya darbe almamak için kasıtlı yere düşmek fauldür.",
      en: "Completely passive defence by double cover, or deliberately going down to avoid a hit, is a foul."
    },
    when: { tr: "Sürekli kapanıp dövüşmeme durumunda.", en: "When an athlete keeps covering up and won't fight." },
    right: { tr: "Aktif savunma + karşılık; Hakem pasifliği İkaz/İhtar ile yaptırır.", en: "Active defence and countering; the referee penalises passivity with a Caution/Warning." },
    wrong: { tr: "Sürekli kapanıp darbe vermemek.", en: "Constantly covering up and not striking." },
    related: ["FOUL_CLASS"],
    tags: ["pasif savunma", "çift blok", "double cover", "31.2.16"]
  },
  {
    id: "FOUL_POSTSANCTION", module: "faul", subtopic: "faulsinif", label: "ifma",
    rule: "31.6", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["jury"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Maç sonrası yaptırımlar", en: "Post-competition sanctions" },
    quick: {
      tr: "Isırma, kafa atma veya yerdeki sporcuya vurma gibi ciddi/tehlikeli faullerde, maç içi cezaya ek olarak maç sonrası yaptırım uygulanabilir.",
      en: "For serious/dangerous fouls such as biting, headbutting or striking a downed athlete, sanctions may follow after the contest in addition to in-bout penalties."
    },
    when: { tr: "Ciddi/tehlikeli faul sonrası.", en: "After a serious/dangerous foul." },
    right: { tr: "Yaptırımlar: 6–9 ay men, 1.000–5.000 USD para cezası, unvan/derece kaybı, zorunlu yeniden eğitim (31.6.2).", en: "Sanctions: 6–9 month ban, USD 1,000–5,000 fine, loss of ranking/title, mandatory re-education (31.6.2)." },
    wrong: { tr: "Ciddi faulü sadece maç içi cezayla kapatmak.", en: "Treating a serious foul with in-bout penalties only." },
    related: ["FOUL_CLASS", "FOUL_APPEAL"],
    tags: ["yaptırım", "sanction", "ban", "para cezası", "31.6"]
  },

  /* ===================== KATEGORİ KURALLARI ===================== */
  {
    id: "CAT_ROUNDS", module: "kategori", subtopic: "raund", label: "ifma",
    rule: "7", revision: "2026-05-11", status: A,
    discipline: ["full", "semi"], age: [], gender: [], role: [],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Raund süreleri", en: "Round durations" },
    quick: {
      tr: "Tüm kategorilerde 3 raund. Süre: Elite/U24/35+ 3 dk; U16/U18/V40+/V45+ 2 dk; U14 1.5 dk; U8/U10/U12 1 dk.",
      en: "3 rounds in all categories. Time: Elite/U24/35+ 3 min; U16/U18/V40+/V45+ 2 min; U14 1.5 min; U8/U10/U12 1 min."
    },
    when: { tr: "Kategori seçimine göre — Kategori Özeti tam değeri gösterir.", en: "By category — the Category Summary shows the exact value." },
    right: { tr: "Hakem duraklatmaları raund süresine eklenmez; ek raund verilmez.", en: "Referee stoppages are not added to round time; no extra round is given." },
    wrong: { tr: "Kategoriye göre süreyi karıştırmak.", en: "Confusing the round time for the category." },
    related: ["CAT_REST", "REF_TIME"],
    tags: ["raund", "round", "süre", "3 raund", "kural 7"]
  },
  {
    id: "CAT_REST", module: "kategori", subtopic: "dinlenme", label: "ifma",
    rule: "7", revision: "2026-05-11", status: A,
    discipline: ["full", "semi"], age: [], gender: [], role: [],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Dinlenme süreleri", en: "Rest periods" },
    quick: {
      tr: "Raund arası dinlenme: Veteranlar ve Büyükler 35+ için 1.5 dk; Elite ve altı için 1 dk.",
      en: "Rest between rounds: 1.5 min for Veterans and Masters 35+; 1 min for Elite and below."
    },
    when: { tr: "Kategori seçimine göre.", en: "By category selection." },
    right: { tr: "Dinlenme sonunda ilk vuruşla devam etmeyen sporcu için 32.9 uygulanır.", en: "If an athlete does not resume at the end of rest, Rule 32.9 applies." },
    wrong: { tr: "Dinlenme süresini kategoriye göre yanlış vermek.", en: "Setting the wrong rest length for the category." },
    related: ["CAT_ROUNDS"],
    tags: ["dinlenme", "rest", "raund arası", "kural 7"]
  },
  {
    id: "CAT_LIMIT", module: "kategori", subtopic: "kisitli", label: "ifma",
    rule: "31.3", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: [],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Kısıtlı vuruşlar", en: "Restricted strikes" },
    quick: {
      tr: "Yaş kategorisine göre kafaya vuruş kısıtları vardır. Kategori Özetinde seçtiğin profil için tam kısıt görünür.",
      en: "Head-strike restrictions vary by age category. The Category Summary shows the exact limit for your selection."
    },
    when: { tr: "Kategori seçimine göre.", en: "By category selection." },
    right: { tr: "U14 kafaya diz/dirsek yok; U12 ve altı kafaya vuruş yok.", en: "U14 no knee/elbow to head; U12 and below no head strikes." },
    wrong: { tr: "Kısıtı sporcuya hatırlatmadan maça başlamak.", en: "Starting without reminding the athlete of the limit." },
    related: ["FOUL_CAT_LIMIT", "FOUL_U14_HEAD"],
    tags: ["kısıt", "kafa", "u14", "u12", "31.3"]
  },
  {
    id: "CAT_CCL", module: "kategori", subtopic: "ccl", label: "ifma",
    rule: "30.2.5", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: [],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Zorunlu sayma limiti (CCL)", en: "Compulsory count limit (CCL)" },
    quick: {
      tr: "Kategorine göre sayım limitine ulaşınca maç biter. Kategori Özeti senin seçimin için limiti gösterir.",
      en: "The match ends when your category's count limit is reached. The Category Summary shows it for your selection."
    },
    when: { tr: "Kategori seçimine göre.", en: "By category selection." },
    right: { tr: "Sayımın CCL'e dahil olması için bir Muaythai vuruşu sonucu olmalı.", en: "A count counts toward CCL only if caused by a Muaythai strike." },
    wrong: { tr: "Yanlış limitte maçı bitirmek.", en: "Ending at the wrong limit." },
    related: ["FOUL_CCL"],
    tags: ["ccl", "sayma limiti", "30.2.5"]
  },

  /* ===================== YAN HAKEM & PUANLAMA ===================== */
  {
    id: "JUDGE_10PT", module: "yan", subtopic: "onpuan", label: "ifma",
    rule: "29.2", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["judge"],
    media: { photo: false, video: true, animation: false },
    title: { tr: "Zorunlu On Puan Sistemi", en: "Ten-Point Must System" },
    quick: {
      tr: "Her raund ayrı puanlanır; kazanana 10 puan verilir, rakibe farka göre 9/8/7. Küsuratlı puan yok.",
      en: "Each round is scored separately; 10 to the winner, 9/8/7 to the other by margin. No fractional points."
    },
    when: { tr: "Raund Bazlı (RbR) puanlamada.", en: "In Round-by-Round (RbR) scoring." },
    right: { tr: "Fark yok 10-10; küçük fark 10-9; açık fark 10-8; tam üstünlük 10-7.", en: "Tie 10-10; small margin 10-9; clear margin 10-8; full dominance 10-7." },
    wrong: { tr: "Raundu puanlamadan bırakmak; küsurat vermek.", en: "Leaving a round unscored; giving fractions." },
    related: ["JUDGE_TARGET", "JUDGE_DEDUCT"],
    tags: ["puanlama", "10 puan", "10-9", "10-8", "rbr", "29.2"]
  },
  {
    id: "JUDGE_TARGET", module: "yan", subtopic: "hedefler", label: "ifma",
    rule: "29.1", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["judge", "ref"],
    media: { photo: true, video: false, animation: false },
    title: { tr: "Puanlanan ve yasak hedefler", en: "Scoring & forbidden targets" },
    quick: {
      tr: "Geçerli teknik (yumruk/tekme/diz/dirsek) puan verir. Boyun omurları (C1–C7) ve ensenin arkası hedef değildir; kasık ve boyun yasak hedeftir.",
      en: "A valid technique (punch/kick/knee/elbow) scores. The neck vertebrae (C1–C7) and back of the neck are not targets; groin and neck are forbidden."
    },
    when: { tr: "Tüm puanlama.", en: "All scoring." },
    right: { tr: "Eldiven/ön kol/kaval/ayak vuruşları puan getirmez; ama dengeyi bozan bloklu tekme değerlendirilebilir (29.1.2).", en: "Strikes on gloves/forearms/shins/feet don't score; a blocked kick that unbalances may be scored (29.1.2)." },
    wrong: { tr: "Bloklanan zayıf vuruşu puanlamak.", en: "Scoring a weak, blocked strike." },
    related: ["JUDGE_10PT", "FOUL_GROIN"],
    tags: ["hedef", "target", "yasak hedef", "puanlama", "29.1"]
  },
  {
    id: "JUDGE_DEDUCT", module: "yan", subtopic: "kesinti", label: "ifma",
    rule: "29.2.5", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["judge"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Puan kesintisi (İhtar)", en: "Point deduction (Warning)" },
    quick: {
      tr: "İhtarda: On Puan Sisteminde ihtarlı sporcunun toplamından 1 puan düşülür; Eş Zamanlı sistemde rakibe otomatik 5 puan eklenir.",
      en: "On a Warning: in Ten-Point Must, 1 point is deducted from the warned athlete; in Real-Time, the opponent auto-gets 5 points."
    },
    when: { tr: "Orta Hakem İhtar verdiğinde.", en: "When the referee gives a Warning." },
    right: { tr: "Hakemle hemfikirse “W”, kendi tespitinse “X/J” işaretle (29.2.4).", en: "Mark “W” if agreeing with the referee, “X/J” if self-detected (29.2.4)." },
    wrong: { tr: "İhtarı skor kartına yansıtmamak.", en: "Not reflecting the Warning on the card." },
    related: ["JUDGE_10PT", "FOUL_CLASS"],
    tags: ["puan kesintisi", "ihtar", "deduction", "29.2.5"]
  },
  {
    id: "JUDGE_KRITER", module: "yan", subtopic: "kriter", label: "ifma",
    rule: "29.2.1", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["judge"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Puanlama kriterleri", en: "Scoring criteria" },
    quick: {
      tr: "Raundu daha fazla geçerli Muaythai vuruşu yapan sporcu kazanır. Beceri eşitse daha güçlü/etkili teknik kazandırır; Semi Contact'ta ham güç değil kontrollü hafif teknik değerlendirilir.",
      en: "The athlete landing more scoring Muaythai skills wins the round. If skill is equal, more forceful/effective technique wins; in Semi Contact, controlled light execution counts, not raw force."
    },
    when: { tr: "Her raund değerlendirmesinde.", en: "In every round assessment." },
    right: { tr: "Yan Hakem iki sporcuyu bağımsız değerlendirir ve kazananı kendisi belirler (27.1).", en: "Each judge independently evaluates the two athletes and decides the winner (27.1)." },
    wrong: { tr: "Diğer hakeme veya bir kişiye bakarak puan vermek.", en: "Scoring by looking at another judge or person." },
    related: ["JUDGE_10PT", "JUDGE_TARGET"],
    tags: ["kriter", "puanlama kriteri", "29.2.1", "27.1"]
  },
  {
    id: "JUDGE_RBR", module: "yan", subtopic: "rbr", label: "ifma",
    rule: "29.2", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["judge"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Raund Bazlı puanlama (RbR)", en: "Round-by-Round scoring (RbR)" },
    quick: {
      tr: "Her raund ayrı puanlanır ve puanlar raund biter bitmez skor kartına girilir. Kazanana 10, rakibe farka göre 9/8/7.",
      en: "Each round is scored separately and entered on the scorecard right after the round ends. 10 to the winner, 9/8/7 to the other by margin."
    },
    when: { tr: "RbR (Raund Bazlı) sisteminde.", en: "In the RbR (Round-by-Round) system." },
    right: { tr: "Fark yok 10-10; küçük 10-9; açık 10-8; tam üstünlük 10-7 (29.2.3).", en: "Tie 10-10; small 10-9; clear 10-8; total domination 10-7 (29.2.3)." },
    wrong: { tr: "Raundu geç puanlamak veya küsuratlı puan vermek.", en: "Scoring the round late, or giving fractional points." },
    related: ["JUDGE_10PT", "JUDGE_SBS"],
    tags: ["rbr", "raund bazlı", "round by round", "29.2"]
  },
  {
    id: "JUDGE_SBS", module: "yan", subtopic: "sbs", label: "ifma",
    rule: "29.4", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["judge"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Vuruş Bazlı puanlama (SbS)", en: "Strike-by-Strike scoring (SbS)" },
    quick: {
      tr: "Her geçerli Muaythai vuruşunda Yan Hakem kontrol panelindeki Kırmızı veya Mavi düğmeye basar; onaylanan her vuruş anlık olarak skora katkı sağlar.",
      en: "For each valid Muaythai skill the judge presses the Red or Blue button on the control panel; each confirmed strike contributes to the score live."
    },
    when: { tr: "Eş Zamanlı (Anlık) sistemde.", en: "In the Real-Time system." },
    right: { tr: "İki mod: On Puan'a dönüştürme veya doğrudan SbS birikimli (29.4.3).", en: "Two modes: Ten-Point-Must conversion, or Pure SbS accumulated (29.4.3)." },
    wrong: { tr: "Bloklanan veya güçsüz vuruşa basmak.", en: "Pressing for a blocked or weak strike." },
    related: ["JUDGE_BUTON", "JUDGE_10PT"],
    tags: ["sbs", "vuruş bazlı", "eş zamanlı", "strike by strike", "29.4"]
  },
  {
    id: "JUDGE_BUTON", module: "yan", subtopic: "buton", label: "ifma",
    rule: "29.4.2", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["judge"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Elektronik butonlama ve onay", en: "Electronic buttons & acceptance" },
    quick: {
      tr: "Bir vuruşun onaylı puan sayılması için, ilk hakemin butona basmasından itibaren 1 sn içinde Yan Hakemlerin çoğunluğunun basması gerekir.",
      en: "For a strike to count as an accepted score, a majority of judges must press within 1 s of the first judge's input."
    },
    when: { tr: "SbS (Eş Zamanlı) sistemde.", en: "In the SbS (Real-Time) system." },
    right: { tr: "5 Yan Hakem → en az 3 onay; 3 Yan Hakem → en az 2 onay (29.4.2).", en: "5 judges → at least 3 approvals; 3 judges → at least 2 (29.4.2)." },
    wrong: { tr: "Geç basmak — 1 sn'lik pencereyi kaçırmak.", en: "Pressing late — missing the 1 s window." },
    related: ["JUDGE_SBS"],
    tags: ["buton", "kırmızı", "mavi", "onay", "red blue", "29.4.2"]
  },
  {
    id: "JUDGE_SKORKART", module: "yan", subtopic: "skorkart", label: "ifma",
    rule: "27.1", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["judge"],
    media: { photo: true, video: false, animation: false },
    title: { tr: "Skor kartı: doldur, imzala, teslim et", en: "Scorecard: fill, sign, submit" },
    quick: {
      tr: "Yan Hakem her raundun puanını kaydeder; maç sonunda toplar, kazananı belirler, kartı imzalar ve Orta Hakeme teslim eder.",
      en: "The judge records each round's points; at the end totals them, nominates a winner, signs the card and submits it to the referee."
    },
    when: { tr: "Maç boyunca ve sonunda.", en: "During and at the end of the match." },
    right: { tr: "İhtar işaretleri: hakemle hemfikirse “W”, kendi tespiti “X”, kendi faul tespiti “J” (29.2.4).", en: "Warning marks: “W” if agreeing with the referee, “X” for own detection, “J” for a judge-detected foul (29.2.4)." },
    wrong: { tr: "Karar anons edilmeden yerinden ayrılmak (27.1).", en: "Leaving the seat before the decision is announced (27.1)." },
    related: ["JUDGE_DEDUCT", "REF_ENDMATCH"],
    tags: ["skor kartı", "imza", "w x j", "27.1", "29.2.4"]
  },
  {
    id: "JUDGE_BERABERLIK", module: "yan", subtopic: "beraberlik", label: "ifma",
    rule: "29.3", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["judge"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Beraberlik ve kazanan belirleme", en: "Draw & determining the winner" },
    quick: {
      tr: "Tüm turnuvalarda mutlaka bir kazanan belirlenir. Skorlar eşitse Yan Hakem, maçın bütününü değerlendirerek Puan Verme Adımlarını uygular. Beraberlik yalnızca gösteri maçlarında verilebilir.",
      en: "A winner must be nominated in all tournaments. If scores are equal, the judge applies the Steps for Awarding Points across the whole contest. A draw may only be given in exhibition matches."
    },
    when: { tr: "Skorlar eşit çıktığında.", en: "When scores are equal." },
    right: { tr: "Kriter: daha az yorgunluk/iz, daha fazla atak, daha iyi savunma ve stil, daha az faul (29.3).", en: "Criteria: less exhaustion/bruising, more aggression, better defence and style, fewer fouls (29.3)." },
    wrong: { tr: "Resmî maçta beraberlik ilan etmek.", en: "Declaring a draw in an official bout." },
    related: ["JUDGE_KRITER", "JUDGE_RBR"],
    tags: ["beraberlik", "draw", "kazanan belirleme", "29.3"]
  },

  /* ===================== SPORCU KAYIT & TARTI ===================== */
  {
    id: "WEIGH_5PCT", module: "kayit", subtopic: "gunluktarti", label: "ifma",
    rule: "11.1.2", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["weigh", "jury"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Maç öncesi tartı: %5 / bir üst sıklet", en: "Pre-contest weigh-in: 5% / one class up" },
    quick: {
      tr: "Sporcunun müsabaka öncesi kilosu, kayıtlı sıkletinin %5 üzerinde veya bir üst siklete eşit çıkarsa diskalifiye edilir.",
      en: "If the pre-contest weight exceeds the registered class by 5% or reaches one class up, the athlete is disqualified."
    },
    when: { tr: "Maç öncesi tartıda (Pre-Contest Weigh-In).", en: "At the pre-contest weigh-in." },
    right: { tr: "Maç öncesi tartı, ilgili Jüri üyesi tarafından maçtan önce/sonra yapılabilir.", en: "The pre-contest weigh-in may be done by the jury member before or after the bout." },
    wrong: { tr: "Sınırı aşan sporcuyu maça çıkarmak.", en: "Letting an over-limit athlete compete." },
    related: ["WEIGH_ONCE"],
    tags: ["tartı", "%5", "weigh-in", "diskalifiye", "11.1.2"]
  },
  {
    id: "WEIGH_ONCE", module: "kayit", subtopic: "tektarti", label: "ifma",
    rule: "11.3.3", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["weigh"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Tek tartı hakkı", en: "One weigh-in attempt" },
    quick: {
      tr: "Sporcuya her gün yapılan tartıda yalnızca bir kez baskül hakkı verilir; kaydedilen kilo kesindir.",
      en: "The athlete gets one attempt on the scale each day; the recorded weight is final."
    },
    when: { tr: "Her günkü tartıda.", en: "At each daily weigh-in." },
    right: { tr: "Tartıya katılmayan sporcu otomatik diskalifiye (DSQ).", en: "Not attending the weigh-in = automatic DSQ." },
    wrong: { tr: "İkinci baskül hakkı vermek.", en: "Allowing a second attempt." },
    related: ["WEIGH_5PCT"],
    tags: ["tartı", "tek hak", "weigh-in", "11.3.3"]
  },
  {
    id: "MED_KOH", module: "kayit", subtopic: "saglik", label: "ifma",
    rule: "9.1", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["jury", "weigh"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "KOH/RSCH sonrası zorunlu dinlenme", en: "Mandatory rest after KOH/RSCH" },
    quick: {
      tr: "1. KOH/RSCH: en az 30 gün; 2. (90 gün içinde): 90 gün; 3. (12 ay içinde): 12 ay müsabaka/sparring yasağı.",
      en: "1st KOH/RSCH: min 30 days; 2nd (within 90 days): 90 days; 3rd (within 12 months): 12 months no competition/sparring."
    },
    when: { tr: "Kafa darbesi sonrası nakavt/RSCH durumunda.", en: "After a head-strike knockout/RSCH." },
    right: { tr: "Her KOH/RSCH tıbbi kayda işlenir ve Ulusal Federasyona bildirilir.", en: "Each KOH/RSCH is recorded and reported to the national federation." },
    wrong: { tr: "Dinlenme süresi dolmadan sporcuyu kaydetmek.", en: "Registering the athlete before the rest period ends." },
    related: ["FOUL_KO"],
    tags: ["koh", "rsch", "dinlenme", "30 gün", "9.1"]
  },
  {
    id: "TMF_ACCRED", module: "kayit", subtopic: "kimlik", label: "tmf",
    rule: "Ek IX / TMF", revision: "2026-05-11", status: P,
    discipline: [], age: [], gender: [], role: ["weigh"],
    media: { photo: true, video: false, animation: false },
    title: { tr: "Akreditasyon ve sporcu kitabı", en: "Accreditation & athletes book" },
    quick: {
      tr: "Akreditasyonda kimlik, sporcu kitabı (Athletes Book) ve Khan belgesi ibraz edilir. Ulusal uygulama ayrıntıları TMF organizasyon talimatına göre yürütülür.",
      en: "At accreditation, ID, the Athletes Book and the Khan certificate are presented. National details follow the TMF organisation instruction."
    },
    when: { tr: "Kayıt/akreditasyon aşamasında.", en: "At registration/accreditation." },
    right: { tr: "Sporcu kitabı her müsabaka sonunda geri alınır (8.1.4).", en: "The Athletes Book is collected back after each event (8.1.4)." },
    wrong: { tr: "Belge doğrulaması olmadan akredite etmek.", en: "Accrediting without document verification." },
    related: ["MED_KOH"],
    tags: ["akreditasyon", "sporcu kitabı", "khan", "tmf", "kayıt"]
  },
  {
    id: "REG_DOCS", module: "kayit", subtopic: "belgeler", label: "ifma",
    rule: "10, 12", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["weigh", "jury"],
    media: { photo: true, video: false, animation: false },
    title: { tr: "Kayıt için gerekli evraklar", en: "Documents required for registration" },
    quick: {
      tr: "Kayıt/akreditasyonda gerekenler: IFMA Tıbbi Beyan Formu (doktor imzalı), 16+ için HIV/HBV/HCV kan testleri (son 6 ay), Sporcu Kitabı, geçerli Khan sertifikası ve Anti-Doping Onay Formu.",
      en: "Required at registration/accreditation: the IFMA Medical Declaration Form (doctor-signed), HIV/HBV/HCV blood tests for ages 16+ (within 6 months), the Athletes Book, a valid Khan certificate and the Anti-Doping Consent Form."
    },
    when: { tr: "Kayıt/akreditasyon aşamasında.", en: "At registration/accreditation." },
    right: { tr: "18 yaş altı için tıbbi ve anti-doping formları veli/vasi ek imzası gerektirir (10.1.1, 12.1.1).", en: "For under-18s, the medical and anti-doping forms need a parent/guardian's extra signature (10.1.1, 12.1.1)." },
    wrong: { tr: "Eksik belge veya süresi geçmiş kan testiyle akredite etmek.", en: "Accrediting with missing documents or expired blood tests." },
    related: ["REG_KHAN", "WEIGH_OFFICIAL"],
    tags: ["evrak", "belge", "kan testi", "tıbbi beyan", "anti-doping", "10.1", "10.2", "12.1"]
  },
  {
    id: "REG_KHAN", module: "kayit", subtopic: "khanbelge", label: "ifma",
    rule: "6", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["weigh", "jury"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Khan derecesi şartı", en: "Khan level requirement" },
    quick: {
      tr: "IFMA etkinliklerinde asgari Khan derecesi şarttır. Sporcular: Elite/U24/35+/40+/45+ = 6, U18 = 5, U16 = 4, U14 = 3, U12 = 2, U10/U8 = 1.",
      en: "A minimum Khan level is required at IFMA events. Athletes: Elite/U24/Masters 35+/40+/45+ = 6, U18 = 5, U16 = 4, U14 = 3, U12 = 2, U10/U8 = 1."
    },
    when: { tr: "Kayıt/akreditasyonda geçerli Khan sertifikası ibraz edilir.", en: "A valid Khan certificate is presented at registration/accreditation." },
    right: { tr: "Antrenörler: Menajer/Kıdemli Antrenör = 10, Antrenör/Köşe = 7, Teknik Görevliler = 7 (6.2).", en: "Officials: Manager/Senior Coach = 10, Coach/Seconds = 7, Technical Officials = 7 (6.2)." },
    wrong: { tr: "Geçerli Khan sertifikası olmadan katılıma izin vermek.", en: "Allowing participation without a valid Khan certificate." },
    related: ["REG_DOCS"],
    tags: ["khan", "derece", "6", "6.1", "6.2"]
  },
  {
    id: "WEIGH_OFFICIAL", module: "kayit", subtopic: "resmitarti", label: "ifma",
    rule: "11.1", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["weigh", "jury"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Resmi, günlük ve maç öncesi tartı", en: "Official, daily & pre-contest weigh-in" },
    quick: {
      tr: "Üç tartı zamanı: Resmi Kayıt Tartısı (1 gün önce), Günlük Müsabaka Tartısı (her sabah) ve Maç Öncesi Tartı (maçtan önce herhangi bir zaman). Müsabaka, günlük tartıdan en az 3 saat sonra başlar.",
      en: "Three weigh-in times: Official Weigh-In (1 day before), Competition Weigh-In (each morning) and Pre-Contest Weigh-In (any time before the bout). Competition starts at least 3 hours after the Competition Weigh-In."
    },
    when: { tr: "Müsabaka öncesi ve günlerinde.", en: "Before and on competition days." },
    right: { tr: "Tartıya katılmayan sporcu otomatik diskalifiye (DSQ); sıkleti tutturamayan veya sağlık kontrolünü geçemeyen mağlup sayılır ve rakibe WO verilir (11.3.1, 11.4).", en: "Not attending = automatic DSQ; failing to make weight or the medical = a loss, and a WO to the opponent (11.3.1, 11.4)." },
    wrong: { tr: "Günlük tartı ile maç arasındaki 3 saatlik süreye uymamak.", en: "Not observing the 3-hour gap between the daily weigh-in and the bout." },
    related: ["WEIGH_5PCT", "WEIGH_STANDARD"],
    tags: ["resmi tartı", "günlük tartı", "maç öncesi tartı", "official weigh-in", "11.1"]
  },
  {
    id: "WEIGH_STANDARD", module: "kayit", subtopic: "tartistandart", label: "ifma",
    rule: "11.3.2", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["weigh"],
    media: { photo: true, video: false, animation: false },
    title: { tr: "Tartı görünüm standardı", en: "Weigh-in appearance standard" },
    quick: {
      tr: "Sporcular tartıya uygun hafif iç çamaşırıyla ve müsabakaya tamamen hazır halde çıkar (çorapsız, sakal tıraşı olmuş, ayak tırnakları kesilmiş vb.).",
      en: "Athletes weigh in wearing suitable lightweight undergarments, fully prepared for competition (no socks, facial hair shaved, toenails trimmed, etc.)."
    },
    when: { tr: "Her tartıda.", en: "At every weigh-in." },
    right: { tr: "Kadın sporcuların tartısı aynı yapı ve modelle ayrı yürütülür (11.3.5–11.3.6).", en: "Female weigh-ins are conducted separately using the same structure (11.3.5–11.3.6)." },
    wrong: { tr: "Uygun olmayan kıyafetle veya hazırlıksız tartıya çıkmak.", en: "Weighing in with unsuitable clothing or unprepared." },
    related: ["WEIGH_OFFICIAL", "WEIGH_ROOM"],
    tags: ["tartı görünüm", "iç çamaşırı", "11.3.2"]
  },
  {
    id: "WEIGH_ROOM", module: "kayit", subtopic: "tartiodasi", label: "ifma",
    rule: "11.3.6", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["weigh", "jury"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Tartı odası görev dağılımı", en: "Weigh-in room staffing" },
    quick: {
      tr: "Bir Tartı Noktası 3 Teknik Görevliden oluşur: giriş kontrolü, kilo ölçümü ve belgelendirme. Bir Jüri üyesi Tartı Baş Sorumlusu olarak atanır.",
      en: "A Weigh-in Station has 3 Technical Officials: entry control, weight measurement and documentation. One Jury member is appointed Head of Weigh-ins."
    },
    when: { tr: "Tartı organizasyonunda.", en: "In organising the weigh-in." },
    right: { tr: "Bir nokta saatte ~20 sporcu işler. Ölçek: 60 sporcu = 3 görevli + 1 jüri; 120 = 6+1; 180 = 9+1; 300 = 15+1 (11.3.6).", en: "One station processes ~20 athletes/hour. Scaling: 60 athletes = 3 officials + 1 jury; 120 = 6+1; 180 = 9+1; 300 = 15+1 (11.3.6)." },
    wrong: { tr: "Görevli sayısını sporcu sayısına göre planlamamak.", en: "Not scaling official numbers to the athlete count." },
    related: ["WEIGH_STANDARD", "WEIGH_OFFICIAL"],
    tags: ["tartı odası", "görevli", "staffing", "11.3.6"]
  },

  /* ===================== MÜSABAKA ALANI & EKİPMAN ===================== */
  {
    id: "AREA_FOP", module: "alan", subtopic: "fop", label: "ifma",
    rule: "13", revision: "2026-05-11", status: AD,
    discipline: [], age: [], gender: [], role: [],
    media: { photo: true, video: false, animation: false },
    title: { tr: "Müsabaka alanı (FOP) yerleşimi", en: "Field of Play (FOP) layout" },
    quick: {
      tr: "Müsabaka alanı Şekil 1 (3 Yan Hakem) veya Şekil 2 (5 Yan Hakem) düzenine göre kurulur. Asgari FOP 18×18 m.",
      en: "The FOP is set up per Figure 1 (3 judges) or Figure 2 (5 judges). Minimum FOP is 18×18 m."
    },
    when: { tr: "Tüm etkinlikler.", en: "All events." },
    right: { tr: "Her ek ring için genişliğe 18 m eklenir (13.2.1).", en: "Add 18 m of width for each additional ring (13.2.1)." },
    wrong: { tr: "Görevli masalarını yanlış konumlandırmak.", en: "Placing officials' tables incorrectly." },
    related: ["AREA_EQUIP"],
    tags: ["fop", "müsabaka alanı", "ring", "18 metre", "kural 13"]
  },
  {
    id: "AREA_EQUIP", module: "alan", subtopic: "eldiven", label: "ifma",
    rule: "15", revision: "2026-05-11", status: AD,
    discipline: [], age: [], gender: [], role: ["ref", "corner"],
    media: { photo: true, video: true, animation: false },
    title: { tr: "Zorunlu koruyucu ekipman", en: "Mandatory protective equipment" },
    quick: {
      tr: "Zorunlu ekipman: eldiven, dişlik (gum shield), kasık koruyucu ve disipline özgü diğer gereksinimler.",
      en: "Mandatory: gloves, gum shield, groin guard and other discipline-specific requirements."
    },
    when: { tr: "Ringe girişte ekipman kontrolünde.", en: "At the equipment check on entry." },
    right: { tr: "Kadın sporcular için göğüs koruyucu ve kadın kasık koruyucu (15.7–15.8).", en: "Chest guard and female groin guard for female athletes (15.7–15.8)." },
    wrong: { tr: "Dişlik veya kasık koruyucu olmadan ringe almak.", en: "Allowing entry without gum shield or groin guard." },
    related: ["AREA_FOP"],
    tags: ["ekipman", "eldiven", "dişlik", "kasık koruyucu", "kural 15"]
  },

  /* ===================== ZAMAN & RESMİ GÖREVLİLER ===================== */
  {
    id: "OFF_CORNER", module: "zaman", subtopic: "kose", label: "ifma",
    rule: "17", revision: "2026-05-11", status: AD,
    discipline: [], age: [], gender: [], role: ["corner"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Köşe Görevlisi davranış kuralları", en: "Corner (Second) conduct" },
    quick: {
      tr: "Köşe Görevlisi aktif raundda ve raund arası dinlenmede belirli davranış kurallarına uyar; kural dışı davranış sporcuya yansıyabilir.",
      en: "The corner must follow conduct rules during the round and rest; misconduct can affect the athlete."
    },
    when: { tr: "Maç boyunca köşede.", en: "In the corner throughout the match." },
    right: { tr: "Her sporcu, köşesinin davranışından sorumlu tutulabilir (31.4).", en: "Each athlete may be held responsible for their corner's conduct (31.4)." },
    wrong: { tr: "Aktif raundda ring iplerine müdahale/uyarı.", en: "Interfering at the ropes during an active round." },
    related: ["FOUL_CLASS"],
    tags: ["köşe", "second", "corner", "davranış", "kural 17"]
  },
  {
    id: "OFF_JURY", module: "zaman", subtopic: "juri", label: "ifma",
    rule: "25.3.2", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["jury"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Jüri: kararları değiştirme yetkisi", en: "Jury: power to change decisions" },
    quick: {
      tr: "Jüri; Orta Hakemin kurala açıkça aykırı kararını veya Yan Hakemlerin bariz puan hatasını değiştirebilir.",
      en: "The jury may change a referee's clearly rule-breaking decision, or judges' obvious scoring error."
    },
    when: { tr: "Gözetim ve itiraz incelemesinde.", en: "In oversight and appeal review." },
    right: { tr: "Gerektiğinde maçın durdurulmasına karar verebilir (25.3.2).", en: "May order the match paused when necessary (25.3.2)." },
    wrong: { tr: "Yetki dışı bireysel karara müdahale.", en: "Intervening in decisions outside its authority." },
    related: ["FOUL_APPEAL"],
    tags: ["jüri", "jury", "karar değiştirme", "25.3.2"]
  },

  /* ===================== WAI KRU & MAI MUAY ===================== */
  {
    id: "WAI_WHAT", module: "waikru", subtopic: "wainedir", label: "ifma",
    rule: "20", revision: "2026-05-11", status: AD,
    discipline: ["waikru", "maimuay"], age: [], gender: [], role: ["judge"],
    media: { photo: true, video: true, animation: false },
    title: { tr: "Wai Kru nedir?", en: "What is Wai Kru?" },
    quick: {
      tr: "Wai Kru, sporcunun hocasına ve geleneğe saygı ritüelidir; Mai Muay'a geçişten önce icra edilir. Bireysel performans 4–5 dk (Kural 38.1).",
      en: "Wai Kru is the athlete's ritual of respect to teacher and tradition, performed before Mai Muay. Solo performance 4–5 min (Rule 38.1)."
    },
    when: { tr: "Kültürel kategoriler (Wai Kru / Mai Muay).", en: "Cultural categories (Wai Kru / Mai Muay)." },
    right: { tr: "Krob Kru ve Rai Ram Muaythai temel unsurlardır (20.2).", en: "Krob Kru and Rai Ram Muaythai are the core elements (20.2)." },
    wrong: { tr: "Kültürel performansı dövüş kriterleriyle puanlamak.", en: "Scoring a cultural performance by combat criteria." },
    related: ["WAI_LIMIT"],
    tags: ["wai kru", "mai muay", "kültürel", "krob kru", "kural 20"]
  },
  {
    id: "WAI_LIMIT", module: "waikru", subtopic: "muziksure", label: "ifma",
    rule: "34.1", revision: "2026-05-11", status: AD,
    discipline: ["waikru", "maimuay"], age: [], gender: [], role: [],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Kültürel katılım limiti", en: "Cultural participation limit" },
    quick: {
      tr: "Bir sporcu Wai Kru veya Mai Muay'dan yalnızca birine katılabilir; ayrıca en fazla bir dövüş/teknik kategorisine girebilir.",
      en: "An athlete may enter only one of Wai Kru or Mai Muay, plus at most one combat/technical category."
    },
    when: { tr: "Kültürel kategori kaydında.", en: "At cultural-category registration." },
    right: { tr: "Katılım limitini kayıt aşamasında doğrula.", en: "Verify the limit at registration." },
    wrong: { tr: "Aynı sporcuyu her iki kültürel kategoriye yazmak.", en: "Entering the same athlete in both cultural categories." },
    related: ["WAI_WHAT"],
    tags: ["katılım limiti", "wai kru", "mai muay", "34.1"]
  }

];
