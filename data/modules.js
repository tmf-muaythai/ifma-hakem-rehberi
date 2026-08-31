/* =========================================================================
   IFMA HAKEM REHBERİ  —  data/modules.js
   10 ana içerik modülü, alt başlıkları ve IFMA kural eşlemeleri (Plan §04).
   Kartlar bu modül + subtopic kimliklerine bağlanır (data/cards.js).
   ========================================================================= */
window.IFMA = window.IFMA || {};

window.IFMA.modules = [
  {
    id: "kayit", num: 1, icon: "clipboard", color: "#2E6E9E",
    /* avatar: "assets/avatars/modules/kayit.png",  — kare görsel ekleyince bu satırı aç */
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
      { id: "accreditation-card", tr: "Akreditasyon Kartı", en: "Accreditation Card" },
      { id: "national-delegation-list", tr: "Kafile Listesi", en: "Delegation List" },
      { id: "national-license-id", tr: "Sporcu Lisansı ve Kimliği", en: "Athlete Licence and Identity Document" },
      { id: "national-weigh-sheet", tr: "Tartı Kağıdı", en: "Weigh-in Sheet" },
      { id: "national-doctor-report", tr: "Gerekli Durumlarda Doktor Raporu", en: "Doctor's Report When Required" }
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
        documentsTr: "Kayıt İçin Gerekli Belgeler",
        documentsEn: "Documents Required for Registration",
        documents: [
          { id: "national-delegation-list", card: "REG_NAT_DELEGATION_LIST" },
          { id: "national-license-id", card: "REG_NAT_LICENSE_ID" },
          { id: "national-weigh-sheet", card: "REG_NAT_WEIGH_SHEET" },
          { id: "national-doctor-report", card: "REG_NAT_DOCTOR_REPORT" }
        ]
      }
    ]
  },
  {
    id: "tarti", num: 2, icon: "scale", color: "#087F8D",
    tr: "Tartı İşlemleri", en: "Weigh-in Procedures",
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
    tr: "Müsabaka Alanı", en: "Field of Play",
    purposeTr: "Müsabaka alanının, medya bölgelerinin ve ringin IFMA standartlarına göre kurulumunu öğretmek.",
    purposeEn: "Teach the IFMA-standard setup of the field of play, media areas and ring.",
    rules: "Kural 13–14",
    subtopics: [
      { id: "kurulum", tr: "Müsabaka Alanı Kurulumu", en: "Competition Area Setup" },
      { id: "medya",   tr: "Medya",                    en: "Media" },
      { id: "ring",    tr: "Ring",                     en: "The Ring" }
    ],
    fieldSections: [
      { id: "kurulum", number: "1", card: "AREA_FOP",   tr: "Müsabaka Alanı Kurulumu", en: "Competition Area Setup", ruleRef: "13.1–13.2" },
      { id: "medya",   number: "2", card: "AREA_MEDIA", tr: "Medya",                    en: "Media",                  ruleRef: "13.3" },
      { id: "ring",    number: "3", card: "AREA_RING",  tr: "Ring",                     en: "The Ring",               ruleRef: "14" }
    ]
  },
  {
    id: "ekipman", num: 5, icon: "shield", color: "#8B5DAD",
    tr: "Ekipman", en: "Equipment",
    purposeTr: "Zorunlu sporcu ekipmanlarını kategori, ürün ve kısıtlama bazında fotoğraflı olarak incelemek.",
    purposeEn: "Review mandatory athlete equipment by category, item and restriction with photographs.",
    rules: "Kural 15",
    subtopics: [
      { id: "kategoriler",   tr: "Kategorilere Göre Zorunlu Ekipmanlar", en: "Mandatory Equipment by Category" },
      { id: "ekipmanlar",    tr: "Ekipmanlar",                         en: "Equipment" },
      { id: "kisitlamalar",  tr: "Kısıtlamalar",                       en: "Restrictions" }
    ],
    equipmentSections: [
      { id: "kategoriler", number: "1", card: "AREA_EQUIP", tr: "Kategorilere Göre Zorunlu Ekipmanlar", en: "Mandatory Equipment by Category", ruleRef: "15.1–15.9" },
      { id: "ekipmanlar", number: "2", tr: "Ekipmanlar", en: "Equipment", ruleRef: "15.1–15.9", cards: [
        "EQUIP_GLOVES", "EQUIP_WRAPS", "AREA_KASK", "EQUIP_SHIN", "EQUIP_ELBOW", "AREA_GOVDE", "AREA_DISLIK",
        "AREA_KASIK", "EQUIP_CHEST", "EQUIP_SHORTS", "EQUIP_SINGLET", "EQUIP_MONGKON", "EQUIP_COVER"
      ] },
      { id: "kisitlamalar", number: "3", tr: "Kısıtlamalar", en: "Restrictions", ruleRef: "15.6 / 15.10 / 15.11", cards: [
        "EQUIP_ANKLE", "EQUIP_LINIMENT", "EQUIP_FLAG"
      ] }
    ]
  },
  {
    id: "orta", num: 6, icon: "whistle", color: "#1F6FB2",
    tr: "Hakem (Orta Hakem)", en: "Referee",
    purposeTr: "Maç öncesinden maç sonuna kadar Orta Hakemin görev akışını video destekli öğretmek.",
    purposeEn: "Teach the referee's task flow from pre-match to post-match, with video support.",
    rules: "Kural 19, 21, 26, 30–32",
    subtopics: [
      { id: "giyim",      tr: "Giyim Kuralları",                 en: "Attire Rules" },
      { id: "yetkiler",   tr: "Orta Hakemin Yetkileri",          en: "Powers of the Referee" },
      { id: "ekipman",    tr: "Ekipman Kontrolü",                 en: "Equipment Inspection" },
      { id: "komutlar",   tr: "Komutlar",                         en: "Commands" },
      { id: "baslatma",   tr: "Maç Başlatma Adımları",            en: "Starting the Contest" },
      { id: "pozisyon",   tr: "Adımlama ve Pozisyon",             en: "Footwork and Positioning" },
      { id: "ikazihtar",  tr: "İkaz / İhtar Verme",               en: "Giving a Caution / Warning" },
      { id: "sayim",      tr: "Sayım Yapma",                       en: "Performing the Count" },
      { id: "ayirma",     tr: "Ayırma Pozisyonları",               en: "Separation Positions" },
      { id: "doktor",     tr: "Doktor Çağırma",                    en: "Calling the Doctor" },
      { id: "macsonu",    tr: "Maç Sonu",                          en: "End of Contest" }
    ],
    refereeSections: [
      { id: "giyim",     number: "1",  cards: ["REF_ATTIRE"],     tr: "Giyim Kuralları",                en: "Attire Rules", ruleRef: "21.12 / 26.1 / 26.6" },
      { id: "yetkiler",  number: "2",  cards: ["REF_RSC_POWER"],  tr: "Orta Hakemin Yetkileri",         en: "Powers of the Referee", ruleRef: "21.5 / 26.2–26.4" },
      { id: "ekipman",   number: "3",  cards: ["REF_RINGGIRIS"],  tr: "Ekipman Kontrolü",                en: "Equipment Inspection", ruleRef: "19.1 / 26.3" },
      { id: "komutlar",  number: "4",  cards: ["REF_CHOCK", "REF_YOOT", "REF_YAEK", "REF_TIME"], tr: "Komutlar", en: "Commands", ruleRef: "26.3" },
      { id: "baslatma",  number: "5",  cards: ["REF_BASLATMA"],   tr: "Maç Başlatma Adımları",           en: "Starting the Contest", ruleRef: "19.1–19.3" },
      { id: "pozisyon",  number: "6",  cards: ["REF_POZISYON"],   tr: "Adımlama ve Pozisyon",            en: "Footwork and Positioning", ruleRef: "26.3" },
      { id: "ikazihtar", number: "7",  cards: ["REF_IKAZIHTAR"], tr: "İkaz / İhtar Verme",              en: "Giving a Caution / Warning", ruleRef: "31.1" },
      { id: "sayim",     number: "8",  cards: ["REF_SAYIMREF"],  tr: "Sayım Yapma",                      en: "Performing the Count", ruleRef: "32.1–32.5" },
      { id: "ayirma",    number: "9",  cards: ["REF_CLINCH"],    tr: "Ayırma Pozisyonları",              en: "Separation Positions", ruleRef: "26.3 / 31.2" },
      { id: "doktor",    number: "10", cards: ["REF_DOKTOR"],    tr: "Doktor Çağırma",                   en: "Calling the Doctor", ruleRef: "30.2.2" },
      { id: "macsonu",   number: "11", cards: ["REF_ENDMATCH"],  tr: "Maç Sonu",                         en: "End of Contest", ruleRef: "26.3" }
    ]
  },
  {
    id: "yan", num: 7, icon: "eye", color: "#C77D1A",
    tr: "Hakim & Puanlama", en: "Judge & Scoring",
    purposeTr: "Yan hakem puanlamasını, puan sistemlerini ve puan kesintisini Kural 29'a göre öğretmek.",
    purposeEn: "Teach judging, scoring systems and point deductions under Rule 29.",
    rules: "Kural 29",
    subtopics: [
      { id: "kriterler",        tr: "Puanlama Kriterleri",        en: "Scoring Criteria" },
      { id: "on-puan",          tr: "Zorunlu On Puan Sistemi",    en: "Ten-Point Must System" },
      { id: "puanlama-sistemleri", tr: "Puanlama Sistemleri",     en: "Scoring Systems" },
      { id: "puanlanmayan",     tr: "Puanlanmayan Hedefler",      en: "Non-scoring Targets" },
      { id: "degerlendirilmeyen", tr: "Değerlendirilmeyen Puanlar", en: "Non-awarding of Points" },
      { id: "kesinti",          tr: "Puan Kesintisi",             en: "Deduction of Points" }
    ],
    judgeSections: [
      { id: "kriterler", number: "1", cards: ["JUDGE_KRITER"], tr: "Puanlama Kriterleri", en: "Scoring Criteria", ruleRef: "29.1 / 29.2.1" },
      { id: "on-puan", number: "2", cards: ["JUDGE_10PT"], tr: "Zorunlu On Puan Sistemi", en: "Ten-Point Must System", ruleRef: "29.2–29.2.3" },
      { id: "puanlama-sistemleri", number: "3", cards: ["JUDGE_SBS", "JUDGE_SKORKART"], tr: "Puanlama Sistemleri", en: "Scoring Systems", ruleRef: "29.4" },
      { id: "puanlanmayan", number: "4", cards: ["JUDGE_NONSCORING"], tr: "Puanlanmayan Hedefler", en: "Non-scoring Targets", ruleRef: "29.1.2" },
      { id: "degerlendirilmeyen", number: "5", cards: ["JUDGE_NONAWARD"], tr: "Değerlendirilmeyen Puanlar", en: "Non-awarding of Points", ruleRef: "29.2.2" },
      { id: "kesinti", number: "6", cards: ["JUDGE_DEDUCT"], tr: "Puan Kesintisi", en: "Deduction of Points", ruleRef: "29.2.4–29.2.5" }
    ]
  },
  {
    id: "zaman", num: 8, icon: "clock", color: "#5A6B7B",
    tr: "Resmi Görevliler", en: "Officials",
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
      { id: "tarafsizlik",tr: "Görev Değişimi ve Tarafsızlık", en: "Rotation & Impartiality" }
    ]
  },
  {
    id: "faul", num: 9, icon: "flag", color: "#C0492B",
    tr: "Fauller - Sayım - Maç Kararları", en: "Fouls - Count - Decisions",
    purposeTr: "Kritik olaylarda hakemin doğru kararı hızlı bulmasını sağlamak.",
    purposeEn: "Help the referee reach the correct decision fast in critical moments.",
    rules: "Kural 30–32",
    subtopics: [
      { id: "fauller", tr: "Fauller", en: "Fouls" },
      { id: "sayim", tr: "Sayım", en: "Count" },
      { id: "kararlar", tr: "Maç Kararları", en: "Decisions" }
    ],
    decisionSections: [
      { id: "fauller", number: "1", tr: "Fauller", en: "Fouls", ruleRef: "31", cards: [
        "FOUL_CLASS", "FOUL_3WARN", "FOUL_TYPES", "FOUL_POSTSANCTION"
      ] },
      { id: "sayim", number: "2", tr: "Sayım", en: "Count", ruleRef: "32", cards: [
        "FOUL_COUNT_THAI", "FOUL_RULE8", "FOUL_KNOCKDOWN", "FOUL_DOUBLE_KD", "FOUL_KO", "FOUL_OUTRING"
      ] },
      { id: "kararlar", number: "3", tr: "Maç Kararları", en: "Decisions", ruleRef: "30", cards: [
        "FOUL_DECISIONS", "FOUL_CCL", "FOUL_APPEAL"
      ] }
    ]
  },
  {
    id: "waikru", num: 10, icon: "lotus", color: "#B5642E",
    tr: "Wai Kru & Mai Muay", en: "Wai Kru & Mai Muay",
    purposeTr: "Wai Kru ve Mai Muay kültürel müsabakalarının katılım, uygulama, puanlama ve alan kurallarını öğretmek.",
    purposeEn: "Teach the entry, performance, scoring and field-of-play rules for Wai Kru and Mai Muay cultural competitions.",
    rules: "Kural 34–51",
    waiSections: [
      { id: "wai-kru-nedir", number: "1", tr: "Wai Kru Nedir?", en: "What Is Wai Kru?", ruleRef: "34", cards: ["WAI_WHAT"] },
      { id: "mai-muay-nedir", number: "2", tr: "Mai Muay Nedir?", en: "What Is Mai Muay?", ruleRef: "34, 37", cards: ["WAI_MAI_WHAT"] },
      { id: "yas-siniri", number: "3", tr: "Asgari ve Azami Yaş Sınırı", en: "Minimum and Maximum Age Limit", ruleRef: "35", cards: ["WAI_LIMIT"] },
      { id: "tibbi-gereklilik", number: "4", tr: "Tıbbi Gereklilik", en: "Medical Requirement", ruleRef: "36", cards: ["WAI_MEDICAL"] },
      { id: "musabaka-suresi", number: "5", tr: "Müsabaka Süresi", en: "Competition Duration", ruleRef: "38", cards: ["WAI_DURATION"] },
      { id: "muzik", number: "6", tr: "Müzik", en: "Music", ruleRef: "43", cards: ["WAI_MUSIC"] },
      { id: "ekipman-giyim", number: "7", tr: "Sporcu Ekipmanları ve Giyim", en: "Athlete Equipment and Dress", ruleRef: "42", cards: ["WAI_EQUIPMENT"] },
      { id: "kose-gorevlileri", number: "8", tr: "Köşe Görevlileri", en: "Seconds", ruleRef: "45", cards: ["WAI_SECONDS"] },
      { id: "puan-verme", number: "9", tr: "Puan Verme Adımları", en: "Awarding of Points", ruleRef: "49.1, 49.7", cards: ["WAI_KRITER"] },
      { id: "postur-listesi", number: "10", tr: "Postür Listesi", en: "Posture List", ruleRef: "49.2–49.8", cards: ["WAI_POSELIST"] },
      { id: "puanlama-sistemi", number: "11", tr: "Puanlama Sistemi", en: "Scoring System", ruleRef: "49.9–49.10", cards: ["WAI_SCORING"] },
      { id: "mac-kararlari", number: "12", tr: "Maç Kararları", en: "Decisions", ruleRef: "50", cards: ["WAI_DECISIONS"] },
      { id: "fauller", number: "13", tr: "Fauller", en: "Fouls", ruleRef: "51", cards: ["WAI_FOULS"] },
      { id: "musabaka-alani", number: "14", tr: "Teknik ve Kültürel Müsabaka Alanı", en: "Technical and Cultural Field of Play", ruleRef: "39–41", cards: ["WAI_AREA", "WAI_RING_EQUIPMENT"], cardNumbers: ["14", "14.1"] }
    ]
  }
];
