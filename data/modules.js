/* =========================================================================
   IFMA HAKEM REHBERİ  —  data/modules.js
   8 ana içerik modülü, alt başlıkları ve IFMA kural eşlemeleri (Plan §04).
   Kartlar bu modül + subtopic kimliklerine bağlanır (data/cards.js).
   ========================================================================= */
window.IFMA = window.IFMA || {};

window.IFMA.modules = [
  {
    id: "kayit", num: 1, icon: "clipboard", color: "#2E6E9E",
    tr: "Sporcu Kayıt & Tartı", en: "Athlete Registration & Weigh-in",
    purposeTr: "Kayıt, belge kontrolü, sağlık kontrolü ve tartı sürecini adım adım göstermek.",
    purposeEn: "Show registration, document checks, medical control and the weigh-in process step by step.",
    rules: "Kural 5–12",
    subtopics: [
      { id: "belgeler",   tr: "Gerekli evraklar",              en: "Required documents" },
      { id: "kimlik",     tr: "Kimlik / sporcu kitabı / akreditasyon", en: "ID / athletes book / accreditation" },
      { id: "khanbelge",  tr: "Khan ve eğitim belgeleri",      en: "Khan & education certificates" },
      { id: "saglik",     tr: "Sağlık kontrolü ve testler",    en: "Medical control & tests" },
      { id: "resmitarti", tr: "Resmi kayıt tartısı",           en: "Official weigh-in" },
      { id: "gunluktarti",tr: "Günlük ve maç öncesi tartı",    en: "Daily & pre-contest weigh-in" },
      { id: "tartistandart",tr: "Tartı görünüm standardı",     en: "Weigh-in appearance standard" },
      { id: "tektarti",   tr: "Tek tartı hakkı",               en: "One weigh-in attempt" },
      { id: "tartiodasi", tr: "Tartı odası görev dağılımı",    en: "Weigh-in room staffing" }
    ]
  },
  {
    id: "kategori", num: 2, icon: "layers", color: "#7A5EA6",
    tr: "Kategori Kuralları", en: "Category Rules",
    purposeTr: "Bir kategori seçildiğinde o sporcu için geçerli süre, teknik, ekipman ve limitleri tek ekranda özetlemek.",
    purposeEn: "When a category is picked, summarise the applicable time, techniques, equipment and limits on one screen.",
    rules: "Kural 4, 5, 7, 15, 30.2.5, 32",
    subtopics: [
      { id: "yas",        tr: "Yaş kategorileri",       en: "Age categories" },
      { id: "siklet",     tr: "Sıkletler",              en: "Weight classes" },
      { id: "raund",      tr: "Raund süreleri",         en: "Round durations" },
      { id: "dinlenme",   tr: "Dinlenme süreleri",      en: "Rest periods" },
      { id: "kisitli",    tr: "Kısıtlı vuruşlar",       en: "Restricted strikes" },
      { id: "ekipman",    tr: "Zorunlu ekipman",        en: "Mandatory equipment" },
      { id: "cinsiyetekip",tr: "Cinsiyete göre ekipman",en: "Gender-specific equipment" },
      { id: "ccl",        tr: "Zorunlu sayma limiti (CCL)", en: "Compulsory count limit (CCL)" },
      { id: "disiplinfark",tr: "Disiplin farkları",     en: "Discipline differences" }
    ]
  },
  {
    id: "alan", num: 3, icon: "ring", color: "#2A9D8F",
    tr: "Müsabaka Alanı & Ekipman", en: "Field of Play & Equipment",
    purposeTr: "Ring/FOP düzenini ve sporcu ekipmanını görsel olarak öğretmek.",
    purposeEn: "Teach the ring/FOP layout and athlete equipment visually.",
    rules: "Kural 13–15",
    subtopics: [
      { id: "fop",        tr: "FOP yerleşimi (Şekil 1 & 2)", en: "FOP layout (Fig. 1 & 2)" },
      { id: "ringolcu",   tr: "Ring ölçüleri",          en: "Ring dimensions" },
      { id: "masalar",    tr: "Resmi görevli masaları",  en: "Officials' tables" },
      { id: "eldiven",    tr: "Eldiven ve bandaj",       en: "Gloves & wraps" },
      { id: "kask",       tr: "Kask",                    en: "Head guard" },
      { id: "govde",      tr: "Gövde koruyucu",          en: "Body protector" },
      { id: "dislik",     tr: "Dişlik",                  en: "Gum shield" },
      { id: "kasik",      tr: "Kasık / göğüs koruyucu",  en: "Groin / chest guard" },
      { id: "kiyafet",    tr: "Giyim, mongkon ve prajiad",en: "Attire, mongkon & prajiad" },
      { id: "kontrolakis",tr: "Ekipman kontrol akışı",   en: "Equipment check flow" }
    ]
  },
  {
    id: "orta", num: 4, icon: "whistle", color: "#1F6FB2",
    tr: "Orta Hakem", en: "Referee",
    purposeTr: "Maç öncesinden maç sonuna kadar Orta Hakemin görev akışını video destekli öğretmek.",
    purposeEn: "Teach the referee's task flow from pre-match to post-match, with video support.",
    rules: "Kural 19, 21, 26, 30–33",
    subtopics: [
      { id: "hazirlik",   tr: "Giyim ve fiziksel hazırlık", en: "Attire & physical readiness" },
      { id: "ringgiris",  tr: "Ringe giriş / ekipman kontrolü", en: "Ring entry / equipment check" },
      { id: "baslatma",   tr: "Maç başlatma",            en: "Starting the match" },
      { id: "komutlar",   tr: "Komutlar: CHOCK / YOOT / YAEK / TIME", en: "Commands: CHOCK / YOOT / YAEK / TIME" },
      { id: "pozisyon",   tr: "Adımlama ve pozisyon",    en: "Footwork & positioning" },
      { id: "clinch",     tr: "Clinch ayırma",           en: "Breaking the clinch" },
      { id: "ikazihtar",  tr: "İkaz / ihtar verme",      en: "Giving caution / warning" },
      { id: "sayimref",   tr: "Sayım yapma",             en: "Performing the count" },
      { id: "doktor",     tr: "Doktor çağırma",          en: "Calling the doctor" },
      { id: "ringdisi",   tr: "Ring dışına düşme",       en: "Falling out of the ring" },
      { id: "macsonu",    tr: "Maç sonu ve karar",       en: "Match end & decision" }
    ]
  },
  {
    id: "yan", num: 5, icon: "eye", color: "#C77D1A",
    tr: "Yan Hakem & Puanlama", en: "Judge & Scoring",
    purposeTr: "Puanlama sistemini karar ağacı ve örnek videolarla öğretmek.",
    purposeEn: "Teach the scoring system with a decision tree and example videos.",
    rules: "Kural 27, 29, 30",
    subtopics: [
      { id: "kriter",     tr: "Puanlama kriterleri",     en: "Scoring criteria" },
      { id: "onpuan",     tr: "Zorunlu On Puan Sistemi", en: "Ten-Point Must System" },
      { id: "rbr",        tr: "Raund Bazlı (RbR)",       en: "Round-by-Round (RbR)" },
      { id: "sbs",        tr: "Vuruş Bazlı (SbS)",       en: "Strike-by-Strike (SbS)" },
      { id: "hedefler",   tr: "Puanlanan / yasak hedefler", en: "Scoring / forbidden targets" },
      { id: "skorkart",   tr: "Skor kartı",              en: "Scorecard" },
      { id: "buton",      tr: "Elektronik butonlama",    en: "Electronic buttons" },
      { id: "kesinti",    tr: "Puan kesintisi",          en: "Point deduction" },
      { id: "beraberlik", tr: "Beraberlik / karar",      en: "Draw / decision" }
    ]
  },
  {
    id: "zaman", num: 6, icon: "clock", color: "#5A6B7B",
    tr: "Zaman Hakemi & Resmi Görevliler", en: "Timekeeper & Officials",
    purposeTr: "Tüm resmi rollerin görev tanımlarını ayrı kartlarda sunmak.",
    purposeEn: "Present every official role's duties on separate cards.",
    rules: "Kural 17, 18, 21–25, 28, 33",
    subtopics: [
      { id: "zamanhakem", tr: "Zaman Hakemi",            en: "Timekeeper" },
      { id: "anons",      tr: "Anons Hakemi",            en: "Announcer" },
      { id: "td",         tr: "Teknik Delege (TD)",      en: "Technical Delegate (TD)" },
      { id: "coj",        tr: "Başhakem (COJ)",          en: "Chairman of the Jury (COJ)" },
      { id: "juri",       tr: "Jüri",                    en: "Jury" },
      { id: "mcm",        tr: "Sağlık Kurulu Üyesi (MCM)", en: "Medical Commission Member (MCM)" },
      { id: "doktortakim",tr: "Takım Doktoru",           en: "Team Doctor" },
      { id: "kose",       tr: "Köşe Görevlisi (Second)", en: "Corner (Second)" },
      { id: "tarafsizlik",tr: "Görev değişimi ve tarafsızlık", en: "Rotation & impartiality" }
    ]
  },
  {
    id: "faul", num: 7, icon: "flag", color: "#C0492B",
    tr: "Fauller • Sayım • Maç Kararları", en: "Fouls • Count • Decisions",
    purposeTr: "Kritik olaylarda hakemin doğru kararı hızlı bulmasını sağlamak.",
    purposeEn: "Help the referee reach the correct decision fast in critical moments.",
    rules: "Kural 30–33",
    subtopics: [
      { id: "faulsinif",  tr: "Faul sınıfları: İkaz / İhtar / DQ", en: "Foul classes: Caution / Warning / DQ" },
      { id: "faultur",    tr: "27 faul türü",            en: "27 foul types" },
      { id: "knockdown",  tr: "Knockdown (yere serilme)",en: "Knockdown" },
      { id: "sayim8",     tr: "Sayım ve 8 kuralı",       en: "Count & the rule of 8" },
      { id: "ko",         tr: "Nakavt (KO / KOH / KOB)", en: "Knockout (KO / KOH / KOB)" },
      { id: "rsc",        tr: "RSC türleri (RSCS/RSCI/RSCH/RSCB/CCL)", en: "RSC types (RSCS/RSCI/RSCH/RSCB/CCL)" },
      { id: "ciftekd",    tr: "Çifte knockdown",         en: "Double knockdown" },
      { id: "ringdisidus",tr: "Ring dışına düşme (20 sayımı)", en: "Fall out of ring (20 count)" },
      { id: "wonc",       tr: "WO / NC / RET / DQ",      en: "WO / NC / RET / DQ" },
      { id: "itiraz",     tr: "İtirazlar",               en: "Appeals" }
    ]
  },
  {
    id: "waikru", num: 8, icon: "lotus", color: "#B5642E",
    tr: "Wai Kru & Mai Muay", en: "Wai Kru & Mai Muay",
    purposeTr: "Kültürel disiplinleri duruş listeleri, fotoğraf ve puanlama kriterleriyle öğretmek.",
    purposeEn: "Teach the cultural disciplines with pose lists, photos and scoring criteria.",
    rules: "Kural 20, 34–52",
    subtopics: [
      { id: "wainedir",   tr: "Wai Kru nedir?",          en: "What is Wai Kru?" },
      { id: "muziksure",  tr: "Müzik ve süre",           en: "Music & duration" },
      { id: "baslangicdur",tr: "Başlangıç duruşları",    en: "Opening poses" },
      { id: "promnang",   tr: "Prom Nang",               en: "Prom Nang" },
      { id: "promyuen",   tr: "Prom Yuen",               en: "Prom Yuen" },
      { id: "bitirisdur", tr: "Bitiriş duruşları",       en: "Closing poses" },
      { id: "maimuayteknik",tr: "Mai Muay teknik duruşları", en: "Mai Muay technical poses" },
      { id: "waikrukriter",tr: "Puanlama kriterleri",    en: "Scoring criteria" },
      { id: "duruslist",  tr: "Duruş listesi",           en: "Pose list" }
    ]
  }
];
