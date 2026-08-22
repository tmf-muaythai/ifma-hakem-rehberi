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
  {
    id: "CAT_AGE", module: "kategori", subtopic: "yas", label: "ifma",
    rule: "5", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: [],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Yaş kategorileri", en: "Age categories" },
    quick: {
      tr: "Yaş uygunluğu takvim yılı sistemine göre belirlenir. Dövüş: U8, U10, U12, U14, U16, U18, U24, Elite, Büyükler 35+, Veteranlar 40+, Veteranlar 45+. Kültürel kategorilerde ayrıca Veteranlar 50+ ve 60+ vardır.",
      en: "Age eligibility is set by the calendar-year system. Combat: U8, U10, U12, U14, U16, U18, U24, Elite, Masters 35+, Masters 40+, Masters 45+. Cultural categories also add Masters 50+ and 60+."
    },
    when: { tr: "Kayıt ve kategori belirlemede.", en: "At registration and category assignment." },
    right: { tr: "Sporcu, müsabaka yılı içinde asgari veya azami yaşa ulaşırsa o kategoriye uygundur (Kural 5).", en: "An athlete is eligible if they reach the minimum or maximum age during the competition year (Rule 5)." },
    wrong: { tr: "Yaşı doğum tarihiyle değil, yılla değerlendirmemek.", en: "Judging age by exact date rather than by year." },
    related: ["CAT_ROUNDS", "CAT_LIMIT"],
    tags: ["yaş", "kategori", "takvim yılı", "5", "35"]
  },
  {
    id: "CAT_WEIGHT", module: "kategori", subtopic: "siklet", label: "ifma",
    rule: "4", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["weigh"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Sıkletler", en: "Weight classes" },
    quick: {
      tr: "Sıklet, yaş ve cinsiyete göre belirlenir. Elite/U24 erkek sıkletleri 45–91+ kg; kadın 45–75+ kg arasındadır. Genç kategorilerde alt sınırlar farklıdır (tam tablo Kural 4).",
      en: "Weight classes are set by age and gender. Elite/U24 male classes run 45–91+ kg; female 45–75+ kg. Youth categories have different lower bounds (full table in Rule 4)."
    },
    when: { tr: "Kategori ve tartıda.", en: "At category and weigh-in." },
    right: { tr: "Sporcu yalnızca tartıda hak kazandığı siklette yarışır (11.3.1).", en: "An athlete may only compete in the class for which they qualified at the weigh-in (11.3.1)." },
    wrong: { tr: "Yaş+cinsiyete uygun olmayan sıklet tablosunu kullanmak.", en: "Using a weight table not matching the age+gender." },
    related: ["WEIGH_5PCT", "CAT_AGE"],
    tags: ["sıklet", "weight class", "kural 4"]
  },
  {
    id: "CAT_EQUIP", module: "kategori", subtopic: "ekipman", label: "ifma",
    rule: "15", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Zorunlu ekipman", en: "Mandatory equipment" },
    quick: {
      tr: "Zorunlu ekipman: eldiven (10 oz), dişlik, kaval ve dirseklik, kasık koruyucu ve kask. Gövde koruyucu kategoriye göre değişir; kadın göğüs koruyucu Senior kategoride zorunludur.",
      en: "Mandatory: gloves (10 oz), gum shield, shin and elbow guards, groin guard and head guard. The body protector varies by category; a female chest guard is mandatory in Senior divisions."
    },
    when: { tr: "Kategori seçimine göre.", en: "By category selection." },
    right: { tr: "Ekipman koddan değil kategoriden çıkar; kontrol akışı için Ekipman modülüne bak.", en: "Equipment follows the category; see the Equipment module for the check flow." },
    wrong: { tr: "Kategoriye özel ekipmanı (gövde/göğüs) atlamak.", en: "Skipping category-specific equipment (body/chest)." },
    related: ["AREA_EQUIP", "AREA_GOVDE"],
    tags: ["zorunlu ekipman", "kural 15"]
  },
  {
    id: "CAT_GENDEREQUIP", module: "kategori", subtopic: "cinsiyetekip", label: "ifma",
    rule: "15.7", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref", "weigh"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Cinsiyete göre ekipman", en: "Gender-specific equipment" },
    quick: {
      tr: "Erkek: metal veya polikarbonat kasık koruyucu (+ suspansuar). Kadın: polikarbonat veya köpük kasık koruyucu ve Senior (35+/Elite) kategoride zorunlu göğüs koruyucu. Kadın tartısı ayrı yürütülür.",
      en: "Male: metal or polycarbonate groin guard (+ jock strap). Female: polycarbonate or foam groin guard and, in Senior (35+/Elite) divisions, a mandatory chest guard. Female weigh-ins are conducted separately."
    },
    when: { tr: "Cinsiyet ve kategoriye göre.", en: "By gender and category." },
    right: { tr: "Her koruyucu müsabaka öncesi kontrolden geçer (15.7, 15.8).", en: "Each guard passes inspection before competition (15.7, 15.8)." },
    wrong: { tr: "Kadın Senior sporcuda göğüs koruyucuyu eksik bırakmak.", en: "Missing the chest guard on a Senior female athlete." },
    related: ["AREA_KASIK", "WEIGH_STANDARD"],
    tags: ["cinsiyet", "kasık", "göğüs koruyucu", "15.7", "15.8"]
  },
  {
    id: "CAT_DISCIPLINE", module: "kategori", subtopic: "disiplinfark", label: "ifma",
    rule: "2", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: [],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Disiplin farkları", en: "Discipline differences" },
    quick: {
      tr: "Full Contact (tam temas, IFMA kuralları tam uygulanır), Semi Contact (kontrollü hafif temas, sert vuruş yasak), Wai Kru (bireysel kültürel) ve Mai Muay (ikili kültürel).",
      en: "Full Contact (full contact, IFMA rules apply in full), Semi Contact (controlled light contact, hard strikes forbidden), Wai Kru (solo cultural) and Mai Muay (duo cultural)."
    },
    when: { tr: "Kategori seçiminde.", en: "At category selection." },
    right: { tr: "Bir sporcu en fazla bir kültürel (Wai Kru veya Mai Muay) ve bir dövüş/teknik kategorisine girebilir (34.1).", en: "An athlete may enter at most one cultural (Wai Kru or Mai Muay) and one combat/technical division (34.1)." },
    wrong: { tr: "Semi Contact'ta tam güçle vurmak — bu fauldür (31.3.1).", en: "Striking at full power in Semi Contact — that is a foul (31.3.1)." },
    related: ["CAT_LIMIT", "WAI_LIMIT"],
    tags: ["disiplin", "full contact", "semi contact", "wai kru", "mai muay", "kural 2"]
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
    id: "MED_FORM", module: "kayit", subtopic: "saglik", label: "ifma",
    rule: "10.1", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["weigh", "jury"],
    media: { photo: true, video: false, animation: false },
    imgs: [
      { src: "assets/img/form-medical-declaration.jpg", cap: { tr: "Bölüm 1 — Sağlık durumu beyanı", en: "Section 1 — Medical conditions" } },
      { src: "assets/img/form-pregnancy-declaration.jpg", cap: { tr: "Bölüm 4 — Kadın sporcular için Hamile Olmama Beyanı", en: "Section 4 — Female Non-Pregnancy Declaration" } }
    ],
    links: [ { url: "https://muaythai.sport/wp-content/uploads/2020/06/IFMA-Medical-Declaration-for-Athletes-V.9.pdf", label: { tr: "Tam formu aç / indir (PDF, 4 sayfa)", en: "Open / download full form (PDF, 4 pages)" } } ],
    title: { tr: "IFMA Tıbbi Beyan Formu", en: "IFMA Medical Declaration Form" },
    quick: {
      tr: "Sporcunun sağlık durumunu beyan ettiği, yetkili bir tıp doktoru tarafından imzalanan resmî IFMA formu (İngilizce, 4 bölüm: sağlık durumu, doktor onayı, kilo kontrolü ve kadın sporcular için hamile olmama beyanı). Kayıt/akreditasyonda ibraz edilir.",
      en: "The official IFMA form declaring the athlete's health, signed by a licensed doctor (in English, 4 sections: medical conditions, physician approval, weight-cut control and a female non-pregnancy declaration). Presented at registration/accreditation."
    },
    when: { tr: "Kayıt/akreditasyonda (Kural 10.1).", en: "At registration/accreditation (Rule 10.1)." },
    right: { tr: "18 yaş altı için veli/vasi imzası gerekir; 16+ için HIV/HBV/HCV kan testleri eklenir. Hamile olmama beyanı tüm kadın sporcular için doldurulur (10.1.1, 10.2).", en: "Under-18s need a parent/guardian signature; ages 16+ add HIV/HBV/HCV blood tests. The non-pregnancy declaration is completed by all female athletes (10.1.1, 10.2)." },
    related: ["REG_DOCS", "DOPING_FORM"],
    tags: ["tıbbi beyan formu", "medical declaration", "sağlık formu", "hamile olmama beyanı", "gebelik", "non-pregnancy", "10.1"]
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
    related: ["REG_KHAN", "WEIGH_OFFICIAL", "MED_FORM", "DOPING_FORM"],
    tags: ["evrak", "belge", "kan testi", "tıbbi beyan", "anti-doping", "10.1", "10.2", "12.1"]
  },
  {
    id: "DOPING_FORM", module: "kayit", subtopic: "belgeler", label: "ifma",
    rule: "12.1", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["weigh", "jury"],
    media: { photo: true, video: false, animation: false },
    imgs: [ { src: "assets/img/form-consent.jpg", cap: { tr: "Anti-Doping Onay Formu (2020) — 1. sayfa (tamamı 2 sayfa)", en: "Athlete Consent Form (2020) — page 1 (2 pages total)" } } ],
    links: [ { url: "https://muaythai.sport/wp-content/uploads/2020/06/Athlete-Consent-Form-IFMA-Events-and-Anti-Doping_2020.pdf", label: { tr: "Formu aç / indir (PDF)", en: "Open / download form (PDF)" } } ],
    title: { tr: "Anti-Doping Onay Formu", en: "Athlete Consent Form (Anti-Doping)" },
    quick: {
      tr: "Sporcunun IFMA etkinlikleri ve anti-doping kurallarını kabul ettiği resmî onay formu. Kayıtta imzalanır.",
      en: "The official consent form by which the athlete accepts IFMA events and the anti-doping rules. Signed at registration."
    },
    when: { tr: "Kayıtta (Kural 12.1.1).", en: "At registration (Rule 12.1.1)." },
    right: { tr: "18 yaş altı sporcular için veli/vasi imzası zorunludur (12.1.1).", en: "For under-18 athletes a parent/guardian signature is required (12.1.1)." },
    related: ["REG_DOCS", "MED_FORM"],
    tags: ["anti-doping onay formu", "consent form", "doping", "onay formu", "12.1"]
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
    rule: "13", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: [],
    media: { photo: true, video: false, animation: false },
    imgs: [
      { src: "assets/img/fop-ring.png", cap: { tr: "Şekil 1 — Ring düzeni (3 Yan Hakem)", en: "Figure 1 — Ring layout (3 judges)" } },
      { src: "assets/img/fop-tatami.png", cap: { tr: "Müsabaka Alanı (Tatami) düzeni — kültürel/teknik", en: "Contest Area (Tatami) layout — cultural/technical" } }
    ],
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
    rule: "15", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref", "corner"],
    media: { photo: true, video: true, animation: false },
    imgs: [
      { src: "assets/img/wraps.jpg", cap: { tr: "Bandaj / el sargısı — yumuşak cerrahi sargı veya Velcro, ≤5 m", en: "Wraps / hand bandage — soft surgical or Velcro, ≤5 m" } }
    ],
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
  {
    id: "AREA_RINGSIZE", module: "alan", subtopic: "ringolcu", label: "ifma",
    rule: "14.1", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: [],
    media: { photo: true, video: false, animation: false },
    imgs: [
      { src: "assets/img/ring-dimensions.png", cap: { tr: "Ring ölçüleri (Kural 14) — 600/650 cm iç, 90 cm apron, 285 cm yükseklik, 4 ip", en: "Ring dimensions (Rule 14) — 600/650 cm inside, 90 cm apron, 285 cm height, 4 ropes" } }
    ],
    title: { tr: "Ring ölçüleri", en: "Ring dimensions" },
    quick: {
      tr: "Ring iplerin içinden asgari 6 m, azami 6.5 m; yerden 1.2–1.5 m yükseklikte. 4 ip: 45 / 80 / 115 / 150 cm. Platform iplerin dışına en az 90 cm taşar.",
      en: "The ring is min 6 m, max 6.5 m inside the ropes; 1.2–1.5 m above the ground. 4 ropes at 45 / 80 / 115 / 150 cm. The platform extends at least 90 cm beyond the ropes."
    },
    when: { tr: "Tüm müsabakalar (yalnızca IFMA onaylı ring).", en: "All competitions (IFMA-approved rings only)." },
    right: { tr: "Köşe renkleri: Kırmızı (jüri masasının yakın solu), Beyaz (uzak sol), Mavi (uzak sağ), Beyaz (yakın sağ) (14.1.2).", en: "Corner colours: Red (near-left of the jury), White (far-left), Blue (far-right), White (near-right) (14.1.2)." },
    wrong: { tr: "Zemin yastığı 2.5–3.75 cm dışında; ipleri gergin ve doğru yükseklikte olmayan ring.", en: "Floor padding outside 2.5–3.75 cm; ropes not taut or at the wrong heights." },
    related: ["AREA_FOP", "AREA_TABLES"],
    tags: ["ring", "ölçü", "ip", "köşe rengi", "14.1"]
  },
  {
    id: "AREA_TABLES", module: "alan", subtopic: "masalar", label: "ifma",
    rule: "14.2", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: [],
    media: { photo: true, video: false, animation: false },
    imgs: [
      { src: "assets/img/fop-ring.png", cap: { tr: "Görevli yerleşimi: Jüri, TD & COJ, skor, zaman/anons, doktor, köşeler", en: "Officials layout: jury, TD & COJ, scoring, time/announcer, doctor, corners" } }
    ],
    title: { tr: "Resmi görevli masaları ve ring ekipmanı", en: "Officials' tables & ring equipment" },
    quick: {
      tr: "Ringde bulunması gerekenler: 3 set merdiven, sandalye ve tepsiler; masalar (5 Yan Hakem = 5 masa; TD/COJ; Jüri 3 sandalye; skor; zaman/anons; doktor); gong, hakemler için beyaz eldiven, seyirciye en az 1.5 m bariyer.",
      en: "Required at the ring: 3 sets of steps, seats and trays; tables (5 judges = 5 tables; TD/COJ; jury with 3 chairs; scorekeepers; timekeeper/announcer; doctor); a gong, white gloves for referees, and a barrier at least 1.5 m from the spectators."
    },
    when: { tr: "FOP kurulumunda.", en: "In the FOP setup." },
    right: { tr: "Tarafsız köşelerde kan/tampon için plastik torba; kırmızı/mavi bant ruloları hazır (14.2).", en: "Plastic bags in the neutral corners for blood/pads; red/blue tape rolls ready (14.2)." },
    wrong: { tr: "Medyanın Jürinin arkasında/önünde durması veya görüşü kapatması (13.3).", en: "Media standing behind or in front of the jury, or blocking the line of sight (13.3)." },
    related: ["AREA_FOP", "AREA_RINGSIZE"],
    tags: ["masalar", "ring ekipmanı", "gong", "14.2"]
  },
  {
    id: "AREA_KASK", module: "alan", subtopic: "kask", label: "ifma",
    rule: "15.3", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref", "corner"],
    media: { photo: true, video: false, animation: false },
    imgs: [
      { src: "assets/img/head-guard.jpg", cap: { tr: "Kask — yanak/çene/yüz siperi olmadan", en: "Head guard — no cheek/chin/face shield" } },
      { src: "assets/img/elbow-guard.jpg", cap: { tr: "Dirseklik", en: "Elbow guard" } },
      { src: "assets/img/shin-guard.jpg", cap: { tr: "Kaval koruyucu", en: "Shin guard" } }
    ],
    title: { tr: "Kask, kaval ve dirseklik", en: "Head, shin & elbow guards" },
    quick: {
      tr: "Kask, kaval koruyucu ve dirseklik zorunludur ve Organizasyon Kurulu tarafından sağlanır (yalnızca IFMA onaylı). Kaskın yanak/çene/yüz siperi olamaz.",
      en: "The head guard, shin guard and elbow guards are mandatory and provided by the Organising Committee (IFMA-approved only). The head guard has no cheek/chin/face shield."
    },
    when: { tr: "Tüm dövüş kategorileri.", en: "All combat categories." },
    right: { tr: "Kask, Wai Kru ve selamlaşmadan SONRA takılır; maç bitince karar açıklanmadan hemen çıkarılır (15.3.1).", en: "The head guard is put on AFTER the Wai Kru and handshake; removed immediately after the contest, before the decision (15.3.1)." },
    wrong: { tr: "Maç sırasında kaskı Jüri/Hakem izni olmadan çıkarmak.", en: "Removing the head guard during the contest without jury/referee supervision." },
    related: ["AREA_EQUIP", "REF_RINGGIRIS"],
    tags: ["kask", "kaval", "dirseklik", "head guard", "15.3"]
  },
  {
    id: "AREA_GOVDE", module: "alan", subtopic: "govde", label: "ifma",
    rule: "15.4", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: true, video: false, animation: false },
    imgs: [
      { src: "assets/img/body-protector.jpg", cap: { tr: "Gövde koruyucu — köşe rengine göre (kırmızı/mavi)", en: "Body protector — by corner colour (red/blue)" } }
    ],
    title: { tr: "Gövde koruyucu", en: "Body protector" },
    quick: {
      tr: "Köşe rengiyle uyumlu gövde koruyucu U8–U24 ve Masters 40+/45+ için zorunludur; Elite ve Masters 35+ kategorilerinde giyilmez.",
      en: "A corner-colour coordinated body protector is mandatory for U8–U24 and Masters 40+/45+; it is not worn in Elite and Masters 35+."
    },
    when: { tr: "Kategoriye göre değişir.", en: "Varies by category." },
    right: { tr: "Kategoriyi kontrol et; zorunlu olduğu yerlerde eksikse ringe alma.", en: "Check the category; where mandatory, don't allow entry without it." },
    wrong: { tr: "Elite/35+ sporcuya gövde koruyucu giydirmek ya da genç sporcuda eksik bırakmak.", en: "Putting a body protector on an Elite/35+ athlete, or missing it on a youth athlete." },
    related: ["AREA_KASK", "AREA_KASIK"],
    tags: ["gövde koruyucu", "body protector", "15.4"]
  },
  {
    id: "AREA_DISLIK", module: "alan", subtopic: "dislik", label: "ifma",
    rule: "15.5", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref", "corner"],
    media: { photo: true, video: false, animation: false },
    imgs: [
      { src: "assets/img/gum-shield.jpg", cap: { tr: "Dişlik — forma uygun, kırmızı/pembe olamaz", en: "Gum shield — form-fitted, not red/pink" } }
    ],
    title: { tr: "Dişlik", en: "Gum shield" },
    quick: {
      tr: "Tüm sporcular her raund başlamadan önce dişlik takar. Dişlik forma uygun olmalı ve kırmızı/pembe olmamalıdır.",
      en: "All athletes wear a gum shield before each round starts. It must be form-fitted and not red or pink."
    },
    when: { tr: "Her raund öncesi.", en: "Before every round." },
    right: { tr: "Dişlik ağızdan çıkarsa köşe durular ve geri takar.", en: "If the gum shield comes out, the corner rinses it and puts it back." },
    wrong: { tr: "Dişliği kasıtlı çıkarmak → İkaz / İhtar / DQ (15.5).", en: "Intentionally removing the gum shield → Caution / Warning / DQ (15.5)." },
    related: ["AREA_EQUIP", "FOUL_CLASS"],
    tags: ["dişlik", "gum shield", "15.5"]
  },
  {
    id: "AREA_KASIK", module: "alan", subtopic: "kasik", label: "ifma",
    rule: "15.7", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref", "weigh"],
    media: { photo: true, video: false, animation: false },
    imgs: [
      { src: "assets/img/groin-guard-male.jpg", cap: { tr: "Erkek kasık koruyucu (metal/polikarbonat + suspansuar)", en: "Male groin guard (metal/polycarbonate + jock strap)" } },
      { src: "assets/img/groin-guard-female.jpg", cap: { tr: "Kadın kasık koruyucu (polikarbonat/köpük)", en: "Female groin guard (polycarbonate/foam)" } },
      { src: "assets/img/chest-guard.jpg", cap: { tr: "Kadın göğüs koruyucu — Senior kategoride zorunlu", en: "Female chest guard — mandatory in Senior" } }
    ],
    title: { tr: "Kasık ve göğüs koruyucu", en: "Groin & chest guard" },
    quick: {
      tr: "Kasık koruyucu zorunludur (erkek: metal veya polikarbonat + suspansuar; kadın: polikarbonat veya köpük). Kadın göğüs koruyucu Senior (35+/Elite) kategorilerde zorunludur.",
      en: "A groin guard is mandatory (male: metal or polycarbonate + jock strap; female: polycarbonate or foam). A female chest guard is mandatory in Senior (35+/Elite) divisions."
    },
    when: { tr: "Tüm sporcular; göğüs koruyucu kadın Senior kategoride.", en: "All athletes; chest guard for Senior female divisions." },
    right: { tr: "Her koruyucu müsabaka öncesi kontrolden geçer (15.7, 15.8).", en: "Each guard passes inspection before competition (15.7, 15.8)." },
    wrong: { tr: "Ayak bileği koruması (bileklik/bant) giymek — yasaktır (15.6).", en: "Wearing ankle protection (anklet/tape) — it is prohibited (15.6)." },
    related: ["AREA_GOVDE", "AREA_EQUIP"],
    tags: ["kasık koruyucu", "göğüs koruyucu", "groin", "chest", "15.7", "15.8"]
  },
  {
    id: "AREA_KIYAFET", module: "alan", subtopic: "kiyafet", label: "ifma",
    rule: "15.9", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: true, video: false, animation: false },
    title: { tr: "Giyim, mongkon ve prajiad", en: "Attire, mongkon & prajiad" },
    quick: {
      tr: "Muaythai şortu (önünde “Muaythai” yazar), köşe rengine göre kırmızı/mavi atlet (şorta sokulu). Wai Kru için mongkon takılır; prajiad amuletli ve düzgün örtülü olur.",
      en: "Muaythai shorts (with “Muaythai” on the front) and a red/blue singlet by corner colour (tucked in). A mongkon is worn for the Wai Kru; the prajiad carries an amulet and is neatly covered."
    },
    when: { tr: "Tüm müsabakalar.", en: "All competitions." },
    right: { tr: "Saç toplanır ve file içinde tutulur; toka yasak. Prajiad ipleri 7–10 cm'den (gençlerde 5–7 cm) uzunsa çıkarılması istenebilir (15.9.3–15.9.4).", en: "Hair is tied and kept in a hairnet; clips are prohibited. The prajiad may be removed if its strings exceed 7–10 cm (5–7 cm for youth) (15.9.3–15.9.4)." },
    wrong: { tr: "Yalnızca IFMA onaylı kıyafet giyilebilir; onaysız kıyafetle ringe çıkmak.", en: "Only IFMA-approved attire is allowed; entering with non-approved dress." },
    related: ["AREA_KASK", "WAI_WHAT"],
    tags: ["şort", "atlet", "mongkon", "prajiad", "saç", "15.9"]
  },
  {
    id: "AREA_CHECK", module: "alan", subtopic: "kontrolakis", label: "ifma",
    rule: "15.2", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: false, video: true, animation: false },
    title: { tr: "Ekipman kontrol akışı", en: "Equipment check flow" },
    quick: {
      tr: "Ringe girişte Orta Hakem eldiven ve kıyafeti kontrol eder; bandaj/sargılar Eldiven Sorumlusu gözetiminde takılır, banda imza atılır; kask Wai Kru sonrası takılır.",
      en: "On ring entry the referee checks gloves and dress; wraps/bandages are fitted under the Glove Supervisor and signed; the head guard goes on after the Wai Kru."
    },
    when: { tr: "Maç öncesi kontrolde.", en: "At the pre-match check." },
    right: { tr: "Bandaj: yumuşak cerrahi sargı ≤5 m / ≤5 cm veya Velcro sargı ≤5 m; başka bandaj kabul edilmez. Bant, bandaj olarak yasaktır (15.2, 15.2.1).", en: "Wraps: soft surgical bandage ≤5 m / ≤5 cm, or Velcro wraps ≤5 m; no other bandage. Tape as a bandage is forbidden (15.2, 15.2.1)." },
    wrong: { tr: "Sargısız veya kural dışı bantlı sporcuyu ringe almak → Baş Jüriye bildirilir (15.2.2).", en: "Letting an athlete in without wraps or with illegal taping → reported to the Head of Jury (15.2.2)." },
    related: ["REF_RINGGIRIS", "AREA_EQUIP"],
    tags: ["ekipman kontrolü", "bandaj", "sargı", "15.2", "19.1"]
  },

  /* ===================== ZAMAN & RESMİ GÖREVLİLER ===================== */
  {
    id: "OFF_CORNER", module: "zaman", subtopic: "kose", label: "ifma",
    rule: "17", revision: "2026-05-11", status: A,
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
  {
    id: "OFF_TIMEKEEPER", module: "zaman", subtopic: "zamanhakem", label: "ifma",
    rule: "18.1", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["time"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Zaman Hakemi görevleri", en: "Timekeeper duties" },
    quick: {
      tr: "Ring kenarında oturan 1 Zaman Hakemi: Wai Kru süresini, raund sayısı/süresini ve araları düzenler, gong ile raundu başlatıp bitirir, her raund öncesi 10 sn “ring boşalsın” sinyali verir ve Hakem talimatıyla süreyi durdurur.",
      en: "One ringside Timekeeper: regulates the Wai Kru duration, round number/duration and intervals, starts/ends each round by gong, signals 10 seconds to clear the ring before each round, and takes off time when instructed by the referee."
    },
    when: { tr: "Her maçta.", en: "In every contest." },
    right: { tr: "Raund sonunda sporcu “down” ve Hakem sayıyorsa raund gongu ÇALINMAZ; gong yalnızca Hakem “CHOCK” komutundan sonra çalınır (18.1).", en: "If an athlete is “down” at round end and the referee is counting, the round-end gong is NOT sounded; the gong sounds only after the referee's “CHOCK” (18.1)." },
    wrong: { tr: "Sayım sürerken raund bitiş gongunu çalmak.", en: "Sounding the round-end gong while a count is in progress." },
    related: ["REF_TIME", "CAT_ROUNDS"],
    tags: ["zaman hakemi", "gong", "timekeeper", "18.1"]
  },
  {
    id: "OFF_ANNOUNCER", module: "zaman", subtopic: "anons", label: "ifma",
    rule: "18.2", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: [],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Anons Hakemi görevleri", en: "Announcer duties" },
    quick: {
      tr: "1 Anons Hakemi: Jüriyi (günün ilk maçından önce), Orta/Yan Hakemleri ve sporcuları (ad/ülke/kategori/sıklet/köşe) anons eder; her raund öncesi 10 sn “Seconds out” der; sonuç ve kazananı duyurur.",
      en: "One Announcer: announces the jury (before the day's first contest), the referee/judges and the athletes (name/country/division/weight/corner); calls “Seconds out” 10 s before each round; announces the result and the winner."
    },
    when: { tr: "Her maçta (gerekirse 1 tercüman).", en: "In every contest (a translator if needed)." },
    right: { tr: "Anonslar sporcular ringe çıktığında ve raund başında yapılır (18.2).", en: "Announcements are made as athletes enter the ring and at the start of each round (18.2)." },
    wrong: { tr: "Sonucu Orta Hakemin kartları teslim ve kontrolünden önce açıklamak.", en: "Announcing the result before the referee has collected and checked the cards." },
    related: ["OFF_TIMEKEEPER", "REF_ENDMATCH"],
    tags: ["anons hakemi", "seconds out", "announcer", "18.2"]
  },
  {
    id: "OFF_TD", module: "zaman", subtopic: "td", label: "ifma",
    rule: "21.1", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["jury"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Teknik Delege (TD)", en: "Technical Delegate (TD)" },
    quick: {
      tr: "Teknik Delege müsabaka/şampiyonanın tüm yönlerinden sorumludur ve doğrudan Yönetim Kuruluna rapor verir; ring(ler)e yakın, ayrı bir yerde oturur.",
      en: "The Technical Delegate is responsible for all aspects of the competition/championship and reports directly to the Executive Committee; seated separately, close to the ring(s)."
    },
    when: { tr: "Tüm müsabaka boyunca.", en: "Throughout the competition." },
    right: { tr: "Tüm ilgili taraflarla gözetim ve koordinasyon sağlar; yorum konusunda nihai yetki TD ve/veya Başhakemdedir (22.2, 1.8.1).", en: "Observes and liaises with all parties; final authority on interpretation rests with the TD and/or COJ (22.2, 1.8.1)." },
    wrong: { tr: "TD onayı olmadan format/ring düzeninde değişiklik yapmak.", en: "Changing the format/ring setup without the TD's approval." },
    related: ["OFF_COJ", "OFF_JURY"],
    tags: ["teknik delege", "td", "21.1", "22"]
  },
  {
    id: "OFF_COJ", module: "zaman", subtopic: "coj", label: "ifma",
    rule: "21.3", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["jury"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Başhakem (COJ)", en: "Chairman of the Jury (COJ)" },
    quick: {
      tr: "Başhakem (COJ) tüm görevlileri ve müsabaka alanını (FOP) denetler ve doğrudan Teknik Delegeye rapor verir.",
      en: "The Chairman of the Jury (COJ) oversees all officials and the field of play (FOP) and reports directly to the Technical Delegate."
    },
    when: { tr: "Tüm müsabaka boyunca.", en: "Throughout the competition." },
    right: { tr: "FOP içindeki tüm taraflarla gözetim ve koordinasyon sağlar (24.2).", en: "Observes and liaises with all parties within the FOP (24.2)." },
    wrong: { tr: "Görevli performansını gözetmeden bırakmak.", en: "Leaving official performance unsupervised." },
    related: ["OFF_TD", "OFF_JURY"],
    tags: ["başhakem", "coj", "21.3", "24"]
  },
  {
    id: "OFF_MCM", module: "zaman", subtopic: "mcm", label: "ifma",
    rule: "21.2", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["jury"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Sağlık Kurulu Üyesi (MCM)", en: "Medical Commission Member (MCM)" },
    quick: {
      tr: "Sağlık Kurulu Üyesi (MCM), Kıta/Dünya şampiyonalarında sağlık ekibini denetler ve TD'ye rapor verir; ring doktorlarıyla günlük brifing yapar ve olay anında doktora tavsiye verir.",
      en: "The Medical Commission Member (MCM) oversees the medical team at Continental/World championships and reports to the TD; holds a daily briefing with the ring doctors and advises the doctor during an incident."
    },
    when: { tr: "Kıta/Dünya şampiyonalarında.", en: "At Continental/World championships." },
    right: { tr: "Takım doktoru dahil tüm tıbbi konularda nihai yetki MCM'dedir (28.3).", en: "The MCM has final authority on all medical matters, including over the team doctor (28.3)." },
    wrong: { tr: "Tıbbi kararı MCM gözetimi dışında vermek.", en: "Taking a medical decision outside the MCM's authority." },
    related: ["OFF_DOCTOR", "REF_DOKTOR"],
    tags: ["mcm", "sağlık kurulu", "medical commission", "21.2", "23"]
  },
  {
    id: "OFF_DOCTOR", module: "zaman", subtopic: "doktortakim", label: "ifma",
    rule: "28", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: [],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Takım Doktoru", en: "Team Doctor" },
    quick: {
      tr: "Her Ulusal Federasyon sporcularına destek için bir Takım Doktoru görevlendirebilir; doktor federasyon sporcularının sağlık ve tıbbi gözetiminden sorumludur ve MCM yetkisi altındadır.",
      en: "Each National Federation may appoint a Team Doctor to support its athletes; the doctor is responsible for their medical care and supervision and is under the MCM's authority."
    },
    when: { tr: "Müsabaka/şampiyona süresince.", en: "During the competition/championship." },
    right: { tr: "Ring doktorunun görevleri Kural 33'te ayrıdır; maç durdurma tavsiyesi bağlayıcıdır.", en: "The ring doctor's duties are separate (Rule 33); a recommendation to stop is binding." },
    wrong: { tr: "Takım doktorunu ring doktoruyla karıştırmak.", en: "Confusing the team doctor with the ring doctor." },
    related: ["OFF_MCM", "REF_DOKTOR"],
    tags: ["takım doktoru", "team doctor", "28"]
  },
  {
    id: "OFF_IMPARTIAL", module: "zaman", subtopic: "tarafsizlik", label: "ifma",
    rule: "21.8", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["jury"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Görev değişimi ve tarafsızlık", en: "Rotation & impartiality" },
    quick: {
      tr: "Her maçta Orta ve Yan Hakemler; birbirinden ve sporculardan farklı ülke ve dernekten olmalıdır. Bir maçta aynı kıtadan en fazla 2 görevli bulunabilir.",
      en: "For each contest the referee and judges must be from a different country and association from each other and from the athletes. No more than 2 officials in one contest may be from the same continent."
    },
    when: { tr: "Görevli atamasında.", en: "In official assignment." },
    right: { tr: "Birden fazla ring varsa ITO görevlileri RSportz ile ringlere rastgele atanır (21.8.1). Çıkar çatışması olan görevli çekilir (21.9).", en: "With more than one ring, ITOs are randomly allocated to rings by RSportz (21.8.1). An official with a conflict of interest must recuse themselves (21.9)." },
    wrong: { tr: "Sporcunun ülkesinden bir hakemi o maça atamak.", en: "Assigning a referee from an athlete's own country to that contest." },
    related: ["OFF_JURY", "OFF_TD"],
    tags: ["tarafsızlık", "rotasyon", "ito", "neutrality", "21.8"]
  },

  /* ===================== WAI KRU & MAI MUAY ===================== */
  {
    id: "WAI_WHAT", module: "waikru", subtopic: "wainedir", label: "ifma",
    rule: "20", revision: "2026-05-11", status: A,
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
    rule: "34.1", revision: "2026-05-11", status: A,
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
  },
  {
    id: "WAI_OPENING", module: "waikru", subtopic: "baslangicdur", label: "ifma",
    rule: "49.2", revision: "2026-05-11", status: A,
    discipline: ["waikru", "maimuay"], age: [], gender: [], role: ["judge"],
    media: { photo: true, video: true, animation: false },
    title: { tr: "Başlangıç Duruşları (6 duruş)", en: "Starting Postures (6 postures)" },
    quick: {
      tr: "Tüm sporcular 6 Wai Kru Başlangıç Duruşunun tamamını yapmalıdır: Thep Pa Nom, Kom Krab, Kob Pramae Thoranee, Tha Wai Bangkom, Pathom ve Prom. Azami 20 puan (bireysel) / 5 (ikili).",
      en: "All athletes must perform all 6 Wai Kru Starting Postures: Thep Pa Nom, Kom Krab, Kob Pramae Thoranee, Tha Wai Bangkom, Pathom and Prom. Max 20 points (individual) / 5 (duo)."
    },
    when: { tr: "Her Wai Kru performansının başında.", en: "At the start of every Wai Kru performance." },
    right: { tr: "Kutsal Mongkon takılıyken 3 kez yere kapanılır (20.2).", en: "Prostrate to the canvas three times while wearing the sacred Mongkon (20.2)." },
    wrong: { tr: "Muaythai geleneğine ait olmayan başka bir ritüel eklemek.", en: "Adding a ritual that is not part of the Muaythai tradition." },
    related: ["WAI_WHAT", "WAI_PROMNANG"],
    tags: ["başlangıç duruşları", "thep pa nom", "kom krab", "49.2", "20.2"]
  },
  {
    id: "WAI_PROMNANG", module: "waikru", subtopic: "promnang", label: "ifma",
    rule: "49.3", revision: "2026-05-11", status: A,
    discipline: ["waikru", "maimuay"], age: [], gender: [], role: ["judge"],
    media: { photo: true, video: true, animation: false },
    title: { tr: "Prom Nang (oturarak duruşlar)", en: "Prom Nang (sitting postures)" },
    quick: {
      tr: "7 Prom Nang (oturarak) duruşundan 4'ü icra edilir. İkili formatta Kırmızı köşedeki sporcu oturarak duruşları yapar (49.10.1). Azami 20 puan (bireysel) / 10 (ikili).",
      en: "Athletes perform 4 of the 7 Prom Nang (sitting) postures. In duo format the Red-corner athlete does the sitting postures (49.10.1). Max 20 (individual) / 10 (duo)."
    },
    when: { tr: "Wai Kru'nun oturarak bölümünde.", en: "In the sitting section of the Wai Kru." },
    right: { tr: "7 duruş: Lab Hok Mokkasak, Mekkala Loah Kaew, Song Mek, Mae Pra Thoranee Beeb Muay Phom, Sue Lak Hang, Paya Krut Yut Naka, Sao Noi Pa Paeng.", en: "The 7: Lab Hok Mokkasak, Mekkala Loah Kaew, Song Mek, Mae Pra Thoranee Beeb Muay Phom, Sue Lak Hang, Paya Krut Yut Naka, Sao Noi Pa Paeng." },
    wrong: { tr: "Duruşları dört yöne yapmamak (49.10.3).", en: "Not performing the postures to all four directions (49.10.3)." },
    related: ["WAI_PROMYUEN", "WAI_KRITER"],
    tags: ["prom nang", "oturarak", "sitting", "49.3"]
  },
  {
    id: "WAI_PROMYUEN", module: "waikru", subtopic: "promyuen", label: "ifma",
    rule: "49.4", revision: "2026-05-11", status: A,
    discipline: ["waikru", "maimuay"], age: [], gender: [], role: ["judge"],
    media: { photo: true, video: true, animation: false },
    title: { tr: "Prom Yuen (ayakta duruşlar)", en: "Prom Yuen (standing postures)" },
    quick: {
      tr: "7 Prom Yuen (ayakta) duruşundan 4'ü icra edilir. İkili formatta Mavi köşedeki sporcu ayakta duruşları yapar. Azami 20 puan (bireysel) / 10 (ikili).",
      en: "Athletes perform 4 of the 7 Prom Yuen (standing) postures. In duo format the Blue-corner athlete does the standing postures. Max 20 (individual) / 10 (duo)."
    },
    when: { tr: "Wai Kru'nun ayakta bölümünde.", en: "In the standing section of the Wai Kru." },
    right: { tr: "7 duruş: Yoong Ram Paen, Na Rai Kwang Jak, Chang Choo Nguang, Pra Ram Plaeong Sorn, Kum Pa Kan Poung Hok, Kun Paen Fun Mahn, Hong Hoen.", en: "The 7: Yoong Ram Paen, Na Rai Kwang Jak, Chang Choo Nguang, Pra Ram Plaeong Sorn, Kum Pa Kan Poung Hok, Kun Paen Fun Mahn, Hong Hoen." },
    wrong: { tr: "Kırmızı/Mavi köşe duruş dağılımını karıştırmak.", en: "Confusing the Red/Blue corner posture split." },
    related: ["WAI_PROMNANG", "WAI_CLOSING"],
    tags: ["prom yuen", "ayakta", "standing", "49.4"]
  },
  {
    id: "WAI_CLOSING", module: "waikru", subtopic: "bitirisdur", label: "ifma",
    rule: "49.5", revision: "2026-05-11", status: A,
    discipline: ["waikru", "maimuay"], age: [], gender: [], role: ["judge"],
    media: { photo: true, video: false, animation: false },
    title: { tr: "Bitiriş ve Bağlantı Duruşları", en: "Finishing & Joining Postures" },
    quick: {
      tr: "5 Bitiriş (hareket) duruşunun tamamı yapılır: Yang Sam Khum, Payak Dom Kwang, Kwang Liaw Lang, Tad Mai Kom Nam, Yang Suk Ka Sem. Ayrıca 9 Bağlantı (Joining) duruşu icra edilebilir.",
      en: "All 5 Finishing (movement) postures are performed: Yang Sam Khum, Payak Dom Kwang, Kwang Liaw Lang, Tad Mai Kom Nam, Yang Suk Ka Sem. The 9 Joining (connection) postures may also be performed."
    },
    when: { tr: "Wai Kru'nun kapanışında.", en: "In the closing of the Wai Kru." },
    right: { tr: "Bitiriş azami 20/5, Bağlantı azami 20/5 puan (49.5, 49.6).", en: "Finishing max 20/5, Joining max 20/5 points (49.5, 49.6)." },
    wrong: { tr: "5 bitiriş duruşunun bir kısmını atlamak.", en: "Skipping some of the 5 finishing postures." },
    related: ["WAI_PROMYUEN", "WAI_MAIMUAY"],
    tags: ["bitiriş", "bağlantı", "finishing", "joining", "49.5", "49.6"]
  },
  {
    id: "WAI_MAIMUAY", module: "waikru", subtopic: "maimuayteknik", label: "ifma",
    rule: "49.7", revision: "2026-05-11", status: A,
    discipline: ["maimuay"], age: [], gender: [], role: ["judge"],
    media: { photo: true, video: true, animation: false },
    title: { tr: "Mai Muay teknik duruşları", en: "Mai Muay technical postures" },
    quick: {
      tr: "Mai Muay azami 65 puan. Duruşlar Khan müfredatından alınır: Temel Beceri (Duruş/Hareket, Silahlar, Savunma), Muay Sanatı (2 gruptan en az 10 teknik) ve Üst Düzey (17 yaş altı 3, 17+ 5 duruş).",
      en: "Mai Muay is worth up to 65 points. Postures come from the Khan syllabus: Basic Skill (Stance/Moving, Weapons, Defence), Art of Muay (min 10 from 2 groups) and High Level (under 17: 3, 17+: 5)."
    },
    when: { tr: "İkili Mai Muay performansında.", en: "In the duo Mai Muay performance." },
    right: { tr: "Mai Muay, Wai Kru bittikten hemen sonra yapılır; sporcular mongkonu boyunlarına indirir (47.2.2, 49.10.4).", en: "Mai Muay is performed immediately after the Wai Kru; athletes pull the mongkon down around the neck (47.2.2, 49.10.4)." },
    wrong: { tr: "Duruşları Khan müfredatı dışından seçmek.", en: "Choosing postures outside the Khan syllabus." },
    related: ["WAI_CLOSING", "WAI_KRITER"],
    tags: ["mai muay", "teknik duruş", "khan müfredatı", "49.7", "49.8"]
  },
  {
    id: "WAI_KRITER", module: "waikru", subtopic: "waikrukriter", label: "ifma",
    rule: "49.1", revision: "2026-05-11", status: A,
    discipline: ["waikru", "maimuay"], age: [], gender: [], role: ["judge"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Puanlama kriterleri (Yüz Puan Sistemi)", en: "Scoring criteria (Hundred-Point System)" },
    quick: {
      tr: "Wai Kru/Mai Muay 100 puan üzerinden değerlendirilir (küsurat yok). Kriterler: Otantiklik (doğru duruş), Tamamlanmış Duruşlar, Ritim, Akıcılık, Karakter ve Kostüm. Süre aşımı/eksiği her 10 sn için −1 (azami −5).",
      en: "Wai Kru/Mai Muay is scored out of 100 (no fractions). Criteria: Authentic (correct postures), Completed Postures, Rhythmic, Fluidity, Personality and Costume. Over/under-run of time is −1 per 10 s (max −5)."
    },
    when: { tr: "Kültürel puanlamada.", en: "In cultural scoring." },
    right: { tr: "Final skor: en yüksek ve en düşük atılır, kalan 3 hakem toplanır, süre kesintisi düşülür, /10 ve /3 → 2 ondalık (49.9.1).", en: "Final score: drop highest and lowest, add the remaining 3 judges, subtract time deductions, /10 then /3 → 2 decimals (49.9.1)." },
    wrong: { tr: "Küsuratlı puan vermek veya raundu puanlamadan bırakmak.", en: "Giving fractional points, or leaving a round unscored." },
    related: ["WAI_POSELIST", "JUDGE_10PT"],
    tags: ["puanlama", "100 puan", "otantiklik", "kostüm", "49.1", "49.9"]
  },
  {
    id: "WAI_POSELIST", module: "waikru", subtopic: "duruslist", label: "ifma",
    rule: "49.7", revision: "2026-05-11", status: A,
    discipline: ["waikru", "maimuay"], age: [], gender: [], role: ["judge", "jury"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Duruş listesi ve onay", en: "Posture list & approval" },
    quick: {
      tr: "Takımlar performanslarını, müsabakadan en az 60 dakika önce Yönetim Jürisine “Duruş Listesi” formuyla bildirir; jüri listeyi inceler ve maçları programa göre denetler.",
      en: "Teams submit their performance on the “Posture List” form to the Administration Jury at least 60 minutes before the competition; the jury inspects the list and checks bouts against the schedule."
    },
    when: { tr: "Müsabaka öncesi hazırlıkta.", en: "In pre-competition preparation." },
    right: { tr: "Kırmızı köşe oturarak (Prom Nang), Mavi köşe ayakta (Prom Yuen); duruşlar dört yöne yapılır (49.10.1, 49.10.3).", en: "Red corner sits (Prom Nang), Blue corner stands (Prom Yuen); postures are done to all four directions (49.10.1, 49.10.3)." },
    wrong: { tr: "Listeyi 60 dk kuralına uymadan teslim etmek.", en: "Submitting the list past the 60-minute rule." },
    related: ["WAI_KRITER", "OFF_JURY"],
    tags: ["duruş listesi", "posture list", "jüri", "49.7", "48.2.2"]
  }

];
