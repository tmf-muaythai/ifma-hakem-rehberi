/* =========================================================================
   IFMA HAKEM REHBERİ  —  data/flows.js
   Görev Modu maç akışları (rol bazlı) + Eğitim Modu içerikleri.
   Adımlar ilgili kartlara (data/cards.js) bağlanır.
   ========================================================================= */
window.IFMA = window.IFMA || {};

/* ---- Görev Modu: rol → odak + maç akışı adımları ---- */
window.IFMA.taskModes = {
  ref: {
    focus: { tr: "Maç öncesi kontrol • komutlar • faul • sayım • doktor • maç sonu",
             en: "Pre-match check • commands • fouls • count • doctor • match end" },
    steps: [
      { tr: "Ringe gelmeden önce: fiziksel hazırlık ve kıyafet", en: "Before the ring: physical readiness & attire", cards: ["REF_ATTIRE", "REF_SAFETY"] },
      { tr: "Sporcu girişleri ve ekipman kontrolü", en: "Athlete entries & equipment check", cards: ["AREA_EQUIP"] },
      { tr: "Wai Kru ve selamlaşma", en: "Wai Kru & salute", cards: ["WAI_WHAT"] },
      { tr: "Yan Hakem / Jüri / Doktor / Zaman kontrolü", en: "Judge / jury / doctor / timekeeper check", cards: ["OFF_JURY"] },
      { tr: "CHOCK ile başlatma", en: "Start with CHOCK", cards: ["REF_CHOCK"] },
      { tr: "Maç içi pozisyon ve kontrol (YOOT / YAEK)", en: "In-match positioning & control (YOOT / YAEK)", cards: ["REF_YOOT", "REF_YAEK"] },
      { tr: "Clinch / ayırma / faul / ikaz / ihtar", en: "Clinch / break / foul / caution / warning", cards: ["FOUL_CLASS", "FOUL_CAT_LIMIT"] },
      { tr: "Knockdown ve sayım", en: "Knockdown & count", cards: ["FOUL_KNOCKDOWN", "FOUL_COUNT_THAI", "FOUL_RULE8"] },
      { tr: "Doktor gerektiren durum / RSC", en: "Doctor situation / RSC", cards: ["REF_RSC_POWER", "FOUL_RSC"] },
      { tr: "Raund sonu ve dinlenme", en: "Round end & rest", cards: ["CAT_ROUNDS", "CAT_REST"] },
      { tr: "Maç sonu: skor kartları ve karar", en: "Match end: scorecards & decision", cards: ["REF_ENDMATCH"] },
      { tr: "Bir sonraki Orta Hakeme devir", en: "Handover to the next referee", cards: [] }
    ]
  },
  judge: {
    focus: { tr: "Puanlama kriteri • RbR / SbS • skor kartı • örnek raund", en: "Scoring criteria • RbR / SbS • scorecard • example round" },
    steps: [
      { tr: "Puanlama kriterleri ve hedefler", en: "Scoring criteria & targets", cards: ["JUDGE_TARGET"] },
      { tr: "Zorunlu On Puan Sistemi (RbR)", en: "Ten-Point Must System (RbR)", cards: ["JUDGE_10PT"] },
      { tr: "İhtarda puan kesintisi", en: "Point deduction on a warning", cards: ["JUDGE_DEDUCT"] },
      { tr: "Skor kartını imzala ve teslim et", en: "Sign & hand in the scorecard", cards: ["REF_ENDMATCH"] }
    ]
  },
  time: {
    focus: { tr: "Başlat / durdur • gong • ara süreleri • istisnalar", en: "Start / stop • gong • intervals • exceptions" },
    steps: [
      { tr: "Raund süresi ve gong", en: "Round time & gong", cards: ["CAT_ROUNDS"] },
      { tr: "Ara (dinlenme) süreleri", en: "Rest intervals", cards: ["CAT_REST"] },
      { tr: "“TIME” komutunda süreyi durdur", en: "Stop the clock on “TIME”", cards: ["REF_TIME"] }
    ]
  },
  jury: {
    focus: { tr: "Gözetim • kart kontrolü • karar / itiraz • görevli yönetimi", en: "Oversight • card check • decision / appeal • official management" },
    steps: [
      { tr: "Orta/Yan Hakem kararlarının gözetimi", en: "Oversight of referee/judge decisions", cards: ["OFF_JURY"] },
      { tr: "İtiraz süreci ve ücreti", en: "Appeal process & fee", cards: ["FOUL_APPEAL"] }
    ]
  },
  weigh: {
    focus: { tr: "Belge • sağlık • tartı akışı • rapor • özel durumlar", en: "Documents • medical • weigh-in flow • report • special cases" },
    steps: [
      { tr: "Akreditasyon ve belge kontrolü", en: "Accreditation & document check", cards: ["TMF_ACCRED"] },
      { tr: "Resmi / günlük / maç öncesi tartı", en: "Official / daily / pre-contest weigh-in", cards: ["WEIGH_5PCT", "WEIGH_ONCE"] },
      { tr: "KOH/RSCH dinlenme kontrolü", en: "KOH/RSCH rest check", cards: ["MED_KOH"] }
    ]
  },
  corner: {
    focus: { tr: "Giyim • davranış • raund arası • su / ekipman • itiraz", en: "Attire • conduct • between rounds • water / equipment • appeal" },
    steps: [
      { tr: "Köşe davranış kuralları", en: "Corner conduct rules", cards: ["OFF_CORNER"] },
      { tr: "Faul ve sorumluluk", en: "Fouls & responsibility", cards: ["FOUL_CLASS"] }
    ]
  }
};

/* ---- Eğitim Modu ---- */
window.IFMA.training = {
  micro: [
    { id: "m1", tr: "Komutlar: YOOT / YAEK / CHOCK", en: "Commands: YOOT / YAEK / CHOCK", cards: ["REF_YOOT", "REF_YAEK", "REF_CHOCK"] },
    { id: "m2", tr: "Sayım ve 8 kuralı", en: "Count & the rule of 8", cards: ["FOUL_COUNT_THAI", "FOUL_RULE8", "FOUL_KO"] },
    { id: "m3", tr: "RSC ve CCL", en: "RSC & CCL", cards: ["FOUL_RSC", "FOUL_CCL"] },
    { id: "m4", tr: "Puanlama temelleri", en: "Scoring basics", cards: ["JUDGE_10PT", "JUDGE_TARGET"] }
  ],
  scenarios: [
    {
      id: "s1", rule: "31.3", card: "FOUL_U14_HEAD",
      q: { tr: "U14 Full Contact maçında sporcu rakibin kafasına diz vuruşu yapıyor. Hakem hangi alana bakmalı?",
           en: "In a U14 Full Contact bout an athlete knees the opponent's head. Which area applies?" },
      options: [
        { tr: "Puanlama", en: "Scoring", correct: false },
        { tr: "Kısıtlı teknik — faul", en: "Restricted technique — foul", correct: true },
        { tr: "Sadece ekipman", en: "Equipment only", correct: false },
        { tr: "Wai Kru", en: "Wai Kru", correct: false }
      ],
      explain: { tr: "U14'te kafaya diz/dirsek yasaktır (Kural 31.3); kasıtlıysa fauldür.",
                 en: "In U14 knee/elbow to the head is prohibited (Rule 31.3); if intentional it is a foul." }
    },
    {
      id: "s2", rule: "32.4", card: "FOUL_RULE8",
      q: { tr: "Sporcu knockdown oldu ve “BAED” (8) sayısında hazır görünüyor. Hakem ne yapar?",
           en: "An athlete is knocked down and looks ready at “BAED” (8). What does the referee do?" },
      options: [
        { tr: "Hemen CHOCK der", en: "Give CHOCK immediately", correct: false },
        { tr: "8'e kadar sayar, sonra CHOCK", en: "Count to 8, then CHOCK", correct: true },
        { tr: "Doğrudan 10 sayar", en: "Count straight to 10", correct: false },
        { tr: "Maçı bitirir", en: "End the match", correct: false }
      ],
      explain: { tr: "Sporcu erken hazır olsa da maç 8'e kadar yeniden başlamaz (Kural 32.4).",
                 en: "Even if ready early, the match does not resume until 8 (Rule 32.4)." }
    },
    {
      id: "s3", rule: "30.2.5", card: "FOUL_CCL",
      q: { tr: "Elite kategoride bir sporcu aynı raundda 3. kez sayıldı. Karar nedir?",
           en: "In Elite an athlete is counted for the 3rd time in the same round. The decision?" },
      options: [
        { tr: "Maça devam", en: "Continue", correct: false },
        { tr: "CCL ile maçı bitir", en: "End the match by CCL", correct: true },
        { tr: "Sadece İhtar", en: "Warning only", correct: false },
        { tr: "Beraberlik", en: "Draw", correct: false }
      ],
      explain: { tr: "U24/Elite/35+ için aynı raundda 3 sayım = Zorunlu Sayma Limiti (Kural 30.2.5).",
                 en: "For U24/Elite/35+, 3 counts in one round = Compulsory Count Limit (Rule 30.2.5)." }
    },
    {
      id: "s4", rule: "30.10", card: "FOUL_OUTRING",
      q: { tr: "Ring dışına düşen sporcu kaç sayımı içinde yardımsız dönmelidir?",
           en: "Within what count must an athlete who fell out return unaided?" },
      options: [
        { tr: "10 (SIB)", en: "10 (SIB)", correct: false },
        { tr: "20 (Yee-Sib)", en: "20 (Yee-Sib)", correct: true },
        { tr: "8 (BAED)", en: "8 (BAED)", correct: false },
        { tr: "Süre sınırı yok", en: "No time limit", correct: false }
      ],
      explain: { tr: "Sporcu Tayca “Yee-Sib” (20) sayımı içinde yardımsız ringe dönmelidir (Kural 30.10).",
                 en: "The athlete must return unaided within the “Yee-Sib” (20) count (Rule 30.10)." }
    }
  ]
};
