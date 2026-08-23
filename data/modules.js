/* =========================================================================
   IFMA HAKEM REHBERİ  —  data/modules.js
   9 ana içerik modülü, alt başlıkları ve IFMA kural eşlemeleri (Plan §04).
   Kartlar bu modül + subtopic kimliklerine bağlanır (data/cards.js).
   ========================================================================= */
window.IFMA = window.IFMA || {};

window.IFMA.modules = [
  {
    id: "kayit", num: 1, icon: "clipboard", color: "#2E6E9E",
    tr: "Sporcu Kayıt", en: "Athlete Registration",
    purposeTr: "Uluslararası ve ulusal şampiyona kayıt belgelerini ayrı akışlarda sunmak.",
    purposeEn: "Present international and national championship registration documents in separate flows.",
    rules: "Kural 6, 8, 10, 12",
    subtopics: [
      { id: "ifma-medical", tr: "IFMA Tıbbi Onay Formu", en: "IFMA Medical Declaration Form" },
      { id: "non-pregnancy", tr: "Hamile Olmama Beyanı", en: "Declaration of Non-pregnancy" },
      { id: "anti-doping", tr: "Anti-Doping Onay Formu", en: "Anti-Doping Consent Form" },
      { id: "adel", tr: "Zorunlu Eğitim Programları (ADEL)", en: "Mandatory Education Programmes (ADEL)" },
      { id: "khan", tr: "Khan Derecesi Şartı", en: "Khan Level Requirement" },
      { id: "blood-tests", tr: "Kan Testleri", en: "Blood Tests" },
      { id: "athletes-book", tr: "Athlete's Book", en: "Athlete's Book" },
      { id: "accreditation-card", tr: "Akreditasyon Kartı", en: "Accreditation Card" }
    ],
    championships: [
      {
        id: "ifma",
        tr: "IFMA Uluslararası Şampiyonalar",
        en: "IFMA International Championships",
        documentsTr: "Kayıt İçin Gerekli Belgeler",
        documentsEn: "Documents Required for Registration",
        documents: [
          { id: "ifma-medical", card: "MED_FORM" },
          { id: "non-pregnancy", card: "PREGNANCY_FORM" },
          { id: "anti-doping", card: "DOPING_FORM" },
          { id: "adel", card: "REG_ADEL" },
          { id: "khan", card: "REG_KHAN" },
          { id: "blood-tests", card: "REG_BLOOD_TESTS" },
          { id: "athletes-book", card: "REG_ATHLETES_BOOK" },
          { id: "accreditation-card", card: "REG_ACCREDITATION" }
        ]
      },
      {
        id: "national",
        tr: "Ulusal Şampiyonalar",
        en: "National Championships",
        emptyTr: "Ulusal Şampiyonalar kayıt içeriği daha sonra eklenecek.",
        emptyEn: "National Championships registration content will be added later.",
        documents: []
      }
    ]
  },
  {
    id: "tarti", num: 2, icon: "scale", color: "#087F8D",
    tr: "Tartı", en: "Weigh-in",
    purposeTr: "Tartı türlerini, sağlık uygunluğunu, katılım standartlarını ve görev dağılımını tek bir hiyerarşik akışta sunmak.",
    purposeEn: "Present weigh-in types, medical fitness, participation standards and staffing in one hierarchical flow.",
    rules: "Kural 9–11 / Ulusal",
    subtopics: [
      { id: "genel", tr: "Genel Tartı Kuralları", en: "General Weigh-in Rules" },
      { id: "resmi-kayit", tr: "Resmi Kayıt Tartısı", en: "Official Weigh-in" },
      { id: "gunluk", tr: "Günlük Müsabaka Tartısı", en: "Competition Weigh-in" },
      { id: "mac-oncesi", tr: "Maç Öncesi Tartı", en: "Pre-contest Weigh-in" },
      { id: "tek-hak", tr: "Tek Tartı Hakkı", en: "One Weigh-in Attempt" },
      { id: "istisna", tr: "İstisnai Durum", en: "Contentious Circumstance" },
      { id: "saglik-muayenesi", tr: "Sağlık Muayenesi", en: "Medical Examination" },
      { id: "tibbi-uygunluk", tr: "Tıbbi Uygunluk", en: "Medical Aptitude" },
      { id: "kafa-darbesi", tr: "Kafaya Alınan Darbe Sonrası Prosedürler", en: "Procedures for Head Injuries" },
      { id: "katilim-standardi", tr: "Tartıya Katılım Standartları", en: "Weigh-in Participation Standards" },
      { id: "oda-gorevleri", tr: "Tartı Odası Görev Dağılımı", en: "Weigh-in Room Staffing" },
      { id: "ulusal-tutanak", tr: "Tartı Tutanağı (Ulusal Maçlar)", en: "Weigh-in Record (National Bouts)" },
      { id: "elenme", tr: "Tartıda Elenme", en: "Failed Weigh-in" }
    ],
    weighingOutline: [
      {
        id: "genel", number: "1", card: "WEIGH_GENERAL", tr: "Genel Tartı Kuralları", en: "General Weigh-in Rules", ruleRef: "11.3.1",
        children: [
          { id: "resmi-kayit", number: "1.1", card: "WEIGH_OFFICIAL", tr: "Resmi Kayıt Tartısı", en: "Official Weigh-in", ruleRef: "11.1 / 11.1.1" },
          { id: "gunluk", number: "1.2", card: "WEIGH_DAILY", tr: "Günlük Müsabaka Tartısı", en: "Competition Weigh-in", ruleRef: "11.1" },
          { id: "mac-oncesi", number: "1.3", card: "WEIGH_5PCT", tr: "Maç Öncesi Tartı", en: "Pre-contest Weigh-in", ruleRef: "11.1.2" },
          { id: "tek-hak", number: "1.4", card: "WEIGH_ONCE", tr: "Tek Tartı Hakkı", en: "One Weigh-in Attempt", ruleRef: "11.3.3" },
          { id: "istisna", number: "•", card: "WEIGH_EXCEPTION", tr: "İstisnai Durum", en: "Contentious Circumstance", ruleRef: "11.3.4" },
          {
            id: "saglik-muayenesi", number: "1.5", card: "WEIGH_MEDICAL_EXAM", tr: "Sağlık Muayenesi", en: "Medical Examination", ruleRef: "11.2",
            children: [
              { id: "tibbi-uygunluk", number: "1.5.1", card: "WEIGH_MEDICAL_FIT", tr: "Tıbbi Uygunluk", en: "Medical Aptitude", ruleRef: "10.1–10.6" },
              { id: "kafa-darbesi", number: "1.5.2", card: "MED_KOH", tr: "Kafaya Alınan Darbe Sonrası Prosedürler", en: "Procedures for Head Injuries", ruleRef: "9.1–9.3" }
            ]
          }
        ]
      },
      { id: "katilim-standardi", number: "2", card: "WEIGH_STANDARD", tr: "Tartıya Katılım Standartları", en: "Weigh-in Participation Standards", ruleRef: "11.3.2" },
      { id: "oda-gorevleri", number: "3", card: "WEIGH_ROOM", tr: "Tartı Odası Görev Dağılımı", en: "Weigh-in Room Staffing", ruleRef: "11.3.6 / 11.3.7" },
      { id: "ulusal-tutanak", number: "4", card: "WEIGH_NATIONAL_RECORD", tr: "Tartı Tutanağı (Ulusal Maçlar)", en: "Weigh-in Record (National Bouts)" },
      { id: "elenme", number: "5", card: "WEIGH_FAILED", tr: "Tartıda Elenme", en: "Failed Weigh-in", ruleRef: "11.4" }
    ]
  },
  {
    id: "kategori", num: 3, icon: "layers", color: "#7A5EA6",
    tr: "Kategori Kuralları", en: "Category Rules",
    purposeTr: "Yaş, sıklet, raund, kısıtlı vuruş ve zorunlu sayma kurallarını tek ekranda göstermek.",
    purposeEn: "Show age, weight, round, restricted-strike and compulsory-count rules on one screen.",
    rules: "Kural 4, 5, 7, 30.2.5, 31.3",
    subtopics: [
      { id: "yas",     tr: "Yaş Kategorileri",                         en: "Age Categories" },
      { id: "siklet",  tr: "Sıkletler",                                en: "Weight Classes" },
      { id: "raund",   tr: "Muaythai Müsabakalarında Raundlar",        en: "Rounds in Muaythai Competitions" },
      { id: "kisitli", tr: "Kategori Bazlı Kısıtlı Vuruşlar",          en: "Category-based Restricted Strikes" },
      { id: "ccl",     tr: "Zorunlu Sayma Limiti (CCL)",               en: "Compulsory Count Limit (CCL)" }
    ],
    categorySections: [
      { id: "yas",     number: "1", card: "CAT_AGE",    tr: "Yaş Kategorileri",                    en: "Age Categories", ruleRef: "5" },
      { id: "siklet",  number: "2", card: "CAT_WEIGHT", tr: "Sıkletler",                           en: "Weight Classes", ruleRef: "4" },
      { id: "raund",   number: "3", card: "CAT_ROUNDS", tr: "Muaythai Müsabakalarında Raundlar",   en: "Rounds in Muaythai Competitions", ruleRef: "7" },
      { id: "kisitli", number: "4", card: "CAT_LIMIT",  tr: "Kategori Bazlı Kısıtlı Vuruşlar",     en: "Category-based Restricted Strikes", ruleRef: "31.3" },
      { id: "ccl",     number: "5", card: "CAT_CCL",    tr: "Zorunlu Sayma Limiti (CCL)",          en: "Compulsory Count Limit (CCL)", ruleRef: "30.2.5" }
    ],
    categoryResources: [
      {
        id: "category-rules-table",
        title: { tr: "MUAYTHAI Kategori, Sıklet ve Kural Özet Tablosu", en: "MUAYTHAI Category, Weight and Rules Summary Table" },
        description: { tr: "Federasyonun 2026 kategori, sıklet ve temel kural özet tablosu.", en: "The federation's 2026 category, weight and key-rules summary table." },
        image: "assets/img/muaythai-kategori-siklet-kural-ozet-tablosu-2026.png",
        pdf: "assets/docs/muaythai-kategori-siklet-kural-ozet-tablosu-2026.pdf"
      },
      {
        id: "birth-year-table",
        title: { tr: "Doğum Yılı Bazlı Yaş Kategorileri Tablosu", en: "Birth-year-based Age Categories Table" },
        description: { tr: "2026 müsabaka yılı için doğum yılı ve yaş kategorisi eşleştirmesi.", en: "Birth-year and age-category mapping for the 2026 competition year." },
        image: "assets/img/dogum-yili-yas-kategorileri-2026.png",
        pdf: "assets/docs/muaythai-yas-kategorileri-2026.pdf"
      }
    ]
  },
  {
    id: "alan", num: 4, icon: "ring", color: "#2A9D8F",
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
    id: "orta", num: 5, icon: "whistle", color: "#1F6FB2",
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
    id: "yan", num: 6, icon: "eye", color: "#C77D1A",
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
    id: "zaman", num: 7, icon: "clock", color: "#5A6B7B",
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
    id: "faul", num: 8, icon: "flag", color: "#C0492B",
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
    id: "waikru", num: 9, icon: "lotus", color: "#B5642E",
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
