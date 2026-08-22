/* =========================================================================
   IFMA HAKEM REHBERİ  —  data/meta.js
   Uygulama meta bilgisi, arayüz metinleri (TR/EN) ve içerik-etiketi tanımları.
   İçerik koddan ayrıdır: bu dosyayı düzenlemek uygulamayı yeniden kodlamadan
   metinleri değiştirir. Yeni dil eklemek için ui.<kod> bloğu eklemek yeterli.
   ========================================================================= */
window.IFMA = window.IFMA || {};

/* ---- Uygulama meta ---- */
window.IFMA.meta = {
  appId: "ifma-hakem-rehberi",
  version: "0.1.0",                 // uygulama sürümü (kod)
  source: "IFMA Kuralları ve Yönetmelikleri 2026",
  revision: "2026-05-11",           // kaynak yönetmelik revizyonu
  revisionLabel: { tr: "Revizyon: 11.05.2026", en: "Revision: 11 May 2026" },
  defaultLang: "tr",
  languages: ["tr", "en"],
  // Bir içerik henüz o dilde uzman onayından geçmediyse "taslak" rozeti gösterilir.
  langNames: { tr: "Türkçe", en: "English" }
};

/* ---- İçerik türü etiketleri (planın 3 etiketi) ---- */
window.IFMA.labels = {
  ifma:     { key: "ifma",     color: "var(--label-ifma)",     tr: "IFMA KURALI",            en: "IFMA RULE" },
  tmf:      { key: "tmf",      color: "var(--label-tmf)",      tr: "TMF / ORGANİZASYON",     en: "TMF / ORGANISATION" },
  training: { key: "training", color: "var(--label-training)", tr: "HAKEM EĞİTİMİ",          en: "REFEREE TRAINING" }
};

/* ---- Onay durumu rozetleri ---- */
window.IFMA.status = {
  approved: { tr: "Onaylı",  en: "Approved" },
  draft:    { tr: "Taslak çeviri", en: "Draft translation" },
  pending:  { tr: "Kaynak bekliyor", en: "Awaiting source" }
};

/* ---- Alt navigasyon (5 sabit sekme) ---- */
window.IFMA.tabs = [
  { id: "home",     icon: "home",   tr: "Ana Sayfa", en: "Home" },
  { id: "rules",    icon: "book",   tr: "Kurallar",  en: "Rules" },
  { id: "task",     icon: "whistle",tr: "Görev Modu",en: "Task Mode" },
  { id: "training", icon: "cap",    tr: "Eğitim",    en: "Training" },
  { id: "search",   icon: "search", tr: "Arama",     en: "Search" }
];

/* ---- Arayüz metinleri ---- */
window.IFMA.ui = {
  tr: {
    appName: "IFMA Yönetmelik ve Kurallar Hakem Kılavuzu",
    tagline: "Hızlı • Görsel • Kaynağı açık kural rehberi",
    // Ana sayfa
    homeHello: "Bugün hangi bilgiye ihtiyacın var?",
    quickSearchPlaceholder: "Kural, komut, madde veya durum ara…",
    searchExamples: "Örnek: “U14 kafa diz”, “YOOT”, “RSC”, “31.2.18”, “20 sayımı”",
    todaysTaskTitle: "Bugünkü görevin nedir?",
    todaysTaskDesc: "Görevini seç, ana ekran o göreve göre öncelik versin.",
    pickCategory: "Kategori Seç",
    pickCategoryDesc: "Disiplin, yaş, cinsiyet, sıklet ve görevi seç; kurallar filtrelensin.",
    learnTodayTitle: "Bugün öğren",
    learnTodayDesc: "1 dakikalık kısa eğitim.",
    favoritesTitle: "Favorilerin",
    favoritesEmpty: "Henüz favori eklemedin. Bir kartta ☆ simgesine dokun.",
    recentTitle: "Son görüntülenenler",
    recentEmpty: "Son baktığın kartlar burada görünecek.",
    whatsChangedTitle: "Neler değişti?",
    whatsChangedDesc: "Bu sürüm 11.05.2026 IFMA yönetmeliğine dayanır.",
    offlineReady: "Çevrimdışı kullanıma hazır",
    offlinePartial: "Temel içerik çevrimdışı açılır",
    modulesTitle: "8 Ana Modül",
    // Kategori seçici
    catDiscipline: "Disiplin",
    catAge: "Yaş Kategorisi",
    catGender: "Cinsiyet",
    catWeight: "Sıklet",
    catRole: "Görev",
    catApply: "Uygula",
    catClear: "Temizle",
    catSummaryTitle: "Kategori Özeti",
    catRound: "Raund",
    catRoundVal: "Süre • raund sayısı • dinlenme",
    catTechLimit: "Teknik Kısıt",
    catEquip: "Ekipman",
    catCount: "Sayım / CCL",
    catSources: "İlgili Kaynaklar",
    catNoSelection: "Henüz kategori seçilmedi.",
    catActive: "Aktif kategori",
    // Kart
    cardQuickAnswer: "Hızlı cevap",
    cardWhenValid: "Ne zaman geçerli?",
    cardVisual: "Görsel anlatım",
    cardRight: "Doğru uygulama",
    cardWrong: "Sık yapılan hata",
    cardSource: "Kaynak",
    cardRelated: "İlgili içerikler",
    cardRuleNo: "Madde",
    addFav: "Favorilere ekle",
    remFav: "Favoriden çıkar",
    // Görev modu
    taskPickRole: "Görevini seç",
    taskFlowTitle: "Maç Akışı",
    taskStep: "Adım",
    taskOpenCard: "İlgili kuralı aç",
    taskPriorityContent: "Öne çıkan içerikler",
    // Eğitim
    trainTitle: "Eğitim Modu",
    trainMicro: "Mikro dersler",
    trainScenario: "Senaryo soruları",
    trainCompare: "Doğru / yanlış karşılaştırma",
    trainTest: "Çoktan seçmeli test",
    trainSim: "Video puanlama simülasyonu",
    trainProgress: "İlerlemen",
    trainStart: "Başla",
    // Arama
    searchTitle: "Arama",
    searchResultsFor: "Sonuçlar:",
    searchNoResults: "Sonuç bulunamadı. Farklı bir kelime, komut veya madde numarası dene.",
    searchTryTitle: "Şunları deneyebilirsin",
    // Genel
    back: "Geri",
    comingSoonTitle: "İçerik gelecek",
    photoComing: "📷 Fotoğraf buraya gelecek",
    videoComing: "🎬 Video buraya gelecek",
    animationComing: "▶ Animasyon buraya gelecek",
    draftNote: "Bu içeriğin bu dildeki çevirisi henüz uzman onayından geçmedi.",
    seeAll: "Tümünü gör",
    inThisModule: "Bu modülde",
    phaseNote: "1. faz: arayüz + örnek içerik. Fotoğraf ve videolar sonra eklenecek.",
    cardLinks: "Belge / bağlantı",
    footerFeedback: "Görüş ve öneriler için:",
    btnPrivacy: "Gizlilik Politikası",
    btnRules: "Güncel Talimat",
    btnQR: "QR Kod ile Paylaş",
    footerFed: "Türkiye Muaythai Federasyonu",
    btnRefEng: "Muaythai Hakem İngilizcesi",
    themeLabel: "Tema (gece/gündüz)"
  },
  en: {
    appName: "IFMA R&J Rules and Regulations Referee Guide",
    tagline: "Fast • Visual • Source-linked rule guide",
    homeHello: "What do you need to know right now?",
    quickSearchPlaceholder: "Search a rule, command, article or situation…",
    searchExamples: "e.g. “U14 knee to head”, “YOOT”, “RSC”, “31.2.18”, “20 count”",
    todaysTaskTitle: "What is your role today?",
    todaysTaskDesc: "Pick your role and the home screen prioritises it.",
    pickCategory: "Select Category",
    pickCategoryDesc: "Choose discipline, age, gender, weight and role to filter the rules.",
    learnTodayTitle: "Learn today",
    learnTodayDesc: "A 1-minute micro-lesson.",
    favoritesTitle: "Favourites",
    favoritesEmpty: "No favourites yet. Tap ☆ on any card.",
    recentTitle: "Recently viewed",
    recentEmpty: "Cards you open will show up here.",
    whatsChangedTitle: "What changed?",
    whatsChangedDesc: "This version is based on the IFMA rulebook rev. 11 May 2026.",
    offlineReady: "Ready for offline use",
    offlinePartial: "Core content opens offline",
    modulesTitle: "8 Main Modules",
    catDiscipline: "Discipline",
    catAge: "Age Category",
    catGender: "Gender",
    catWeight: "Weight",
    catRole: "Role",
    catApply: "Apply",
    catClear: "Clear",
    catSummaryTitle: "Category Summary",
    catRound: "Round",
    catRoundVal: "Time • rounds • rest",
    catTechLimit: "Technique Limit",
    catEquip: "Equipment",
    catCount: "Count / CCL",
    catSources: "Related Sources",
    catNoSelection: "No category selected yet.",
    catActive: "Active category",
    cardQuickAnswer: "Quick answer",
    cardWhenValid: "When does it apply?",
    cardVisual: "Visual explanation",
    cardRight: "Correct application",
    cardWrong: "Common mistake",
    cardSource: "Source",
    cardRelated: "Related content",
    cardRuleNo: "Article",
    addFav: "Add to favourites",
    remFav: "Remove favourite",
    taskPickRole: "Pick your role",
    taskFlowTitle: "Match Flow",
    taskStep: "Step",
    taskOpenCard: "Open related rule",
    taskPriorityContent: "Priority content",
    trainTitle: "Training Mode",
    trainMicro: "Micro-lessons",
    trainScenario: "Scenario questions",
    trainCompare: "Right / wrong comparison",
    trainTest: "Multiple-choice test",
    trainSim: "Video scoring simulation",
    trainProgress: "Your progress",
    trainStart: "Start",
    searchTitle: "Search",
    searchResultsFor: "Results:",
    searchNoResults: "No results. Try another word, command or article number.",
    searchTryTitle: "You can try",
    back: "Back",
    comingSoonTitle: "Content coming",
    photoComing: "📷 Photo will go here",
    videoComing: "🎬 Video will go here",
    animationComing: "▶ Animation will go here",
    draftNote: "The translation of this content has not yet been approved by an expert.",
    seeAll: "See all",
    inThisModule: "In this module",
    phaseNote: "Phase 1: interface + sample content. Photos and videos come later.",
    cardLinks: "Document / link",
    footerFeedback: "For feedback and suggestions:",
    btnPrivacy: "Privacy Policy",
    btnRules: "Current Rules",
    btnQR: "Share via QR",
    footerFed: "Türkiye Muaythai Federasyonu",
    btnRefEng: "Muaythai Referee English",
    themeLabel: "Theme (day/night)"
  }
};
