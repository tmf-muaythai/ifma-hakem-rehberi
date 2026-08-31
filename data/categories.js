/* =========================================================================
   IFMA HAKEM REHBERİ  —  data/categories.js
   Kategori seçici filtreleri + kategori profilleri.
   Kaynak: IFMA 2026 — Kural 4 (sıklet), 5 (yaş), 6 (khan), 7 (raund),
   30.2.5 (CCL sayım limiti), 31.3 (teknik kısıt), 38 (kültürel süre).
   ========================================================================= */
window.IFMA = window.IFMA || {};

/* ---- Filtre seçenekleri ---- */
window.IFMA.filters = {
  discipline: [
    { id: "full",    tr: "Full Contact",  en: "Full Contact",  sub: { tr: "Tam Temas", en: "Full Contact" } },
    { id: "semi",    tr: "Semi Contact",  en: "Semi Contact",  sub: { tr: "Yarı Temas", en: "Semi Contact" } },
    { id: "waikru",  tr: "Wai Kru",       en: "Wai Kru",       sub: { tr: "Kültürel", en: "Cultural" } },
    { id: "maimuay", tr: "Mai Muay",      en: "Mai Muay",      sub: { tr: "Kültürel", en: "Cultural" } }
  ],
  age: [
    { id: "U8",    tr: "U8",           en: "U8" },
    { id: "U10",   tr: "U10",          en: "U10" },
    { id: "U12",   tr: "U12",          en: "U12" },
    { id: "U14",   tr: "U14",          en: "U14" },
    { id: "U16",   tr: "U16",          en: "U16" },
    { id: "U18",   tr: "U18",          en: "U18" },
    { id: "U24",   tr: "U24",          en: "U24" },
    { id: "ELITE", tr: "Elite",        en: "Elite" },
    { id: "M35",   tr: "Büyükler 35+", en: "Masters 35+" },
    { id: "V40",   tr: "Veteranlar 40+", en: "Masters 40+" },
    { id: "V45",   tr: "Veteranlar 45+", en: "Masters 45+" }
  ],
  gender: [
    { id: "female", tr: "Kadın", en: "Female" },
    { id: "male",   tr: "Erkek", en: "Male" }
  ],
  // Sıklet, yaş+cinsiyete göre değişir (Kural 4). Aşağıdaki liste Elite/U24
  // standart sıkletleridir; genç kategorilerde alt sınırlar farklıdır.
  weight: [
    { id: "w45",   tr: "45 kg",   en: "45 kg" },
    { id: "w48",   tr: "48 kg",   en: "48 kg" },
    { id: "w51",   tr: "51 kg",   en: "51 kg" },
    { id: "w54",   tr: "54 kg",   en: "54 kg" },
    { id: "w57",   tr: "57 kg",   en: "57 kg" },
    { id: "w60",   tr: "60 kg",   en: "60 kg" },
    { id: "w635",  tr: "63.5 kg", en: "63.5 kg" },
    { id: "w67",   tr: "67 kg",   en: "67 kg" },
    { id: "w71",   tr: "71 kg",   en: "71 kg" },
    { id: "w75",   tr: "75 kg",   en: "75 kg" },
    { id: "w81",   tr: "81 kg",   en: "81 kg" },
    { id: "w86",   tr: "86 kg",   en: "86 kg" },
    { id: "w91",   tr: "91 kg",   en: "91 kg" }
  ],
  /* avatar: kare PNG/JPG/SVG. Dosyayı aynı yola koyup uzantıyı güncellemen yeterli. */
  role: [
    { id: "ref",    icon: "whistle", avatar: "assets/avatars/roles/ref.svg",    tr: "Orta Hakem",      en: "Referee" },
    { id: "judge",  icon: "eye",     avatar: "assets/avatars/roles/judge.svg",  tr: "Yan Hakem",       en: "Judge" },
    { id: "time",   icon: "clock",   avatar: "assets/avatars/roles/time.svg",   tr: "Zaman Hakemi",    en: "Timekeeper" },
    { id: "jury",   icon: "shield",  avatar: "assets/avatars/roles/jury.svg",   tr: "Jüri",            en: "Jury" },
    { id: "weigh",  icon: "scale",   avatar: "assets/avatars/roles/weigh.svg",  tr: "Tartı",           en: "Weigh-in" },
    { id: "corner", icon: "corner",  avatar: "assets/avatars/roles/corner.svg", tr: "Köşe Görevlisi",  en: "Corner (Second)" }
  ]
};

/* ---- Teknik kısıt metinleri (Kural 31.3) ---- */
window.IFMA.headRules = {
  none:             { tr: "Kısıtlama yok — tüm teknikler serbest", en: "No restriction — all techniques allowed" },
  noElbowKneeHead:  { tr: "Kafaya dirsek veya diz vuruşu YOK",      en: "No elbow or knee strikes to the head" },
  noHead:           { tr: "Kafaya vuruş YOK",                        en: "No strikes to the head" }
};

/* ---- Sayım limiti metinleri (Kural 30.2.5 — CCL) ---- */
window.IFMA.cclRules = {
  A: { tr: "Aynı raundda 3 sayım veya maç boyunca toplam 4 sayım", en: "3 counts in the same round, or 4 total in the match" },
  B: { tr: "Aynı raundda 2 sayım veya maç boyunca toplam 3 sayım", en: "2 counts in the same round, or 3 total in the match" },
  C: { tr: "Aynı raundda 2 sayım veya maç boyunca toplam 2 sayım", en: "2 counts in the same round, or 2 total in the whole match" }
};

/* ---- Yaş kategorisi profilleri (Full/Semi Contact) ----
   roundMin/restMin = dakika; rounds = raund sayısı; head = headRules anahtarı;
   ccl = cclRules anahtarı; minKhan = asgari Khan (Kural 6); age = [asgari, azami]. */
window.IFMA.ageProfiles = {
  U8:    { age: [6, 7],   roundMin: "1",   rounds: 3, restMin: "1",   head: "noHead",            ccl: "C", minKhan: 1 },
  U10:   { age: [8, 9],   roundMin: "1",   rounds: 3, restMin: "1",   head: "noHead",            ccl: "C", minKhan: 1 },
  U12:   { age: [10, 11], roundMin: "1",   rounds: 3, restMin: "1",   head: "noHead",            ccl: "C", minKhan: 2 },
  U14:   { age: [12, 13], roundMin: "1.5", rounds: 3, restMin: "1",   head: "noElbowKneeHead",   ccl: "C", minKhan: 3 },
  U16:   { age: [14, 15], roundMin: "2",   rounds: 3, restMin: "1",   head: "none",              ccl: "C", minKhan: 4 },
  U18:   { age: [16, 17], roundMin: "2",   rounds: 3, restMin: "1",   head: "none",              ccl: "B", minKhan: 5 },
  U24:   { age: [18, 23], roundMin: "3",   rounds: 3, restMin: "1",   head: "none",              ccl: "A", minKhan: 6 },
  ELITE: { age: [18, 40], roundMin: "3",   rounds: 3, restMin: "1",   head: "none",              ccl: "A", minKhan: 6 },
  M35:   { age: [35, 39], roundMin: "3",   rounds: 3, restMin: "1.5", head: "none",              ccl: "A", minKhan: 6 },
  V40:   { age: [40, 44], roundMin: "2",   rounds: 3, restMin: "1.5", head: "none",              ccl: "B", minKhan: 6 },
  V45:   { age: [45, 50], roundMin: "2",   rounds: 3, restMin: "1.5", head: "none",              ccl: "B", minKhan: 6 }
};

/* ---- Disiplin profilleri ---- */
window.IFMA.disciplineProfiles = {
  full: {
    tr: "IFMA kurallarının tam uygulandığı, tam temaslı üst düzey disiplin.",
    en: "Top-level, full-contact discipline where IFMA rules apply in full.",
    contact: { tr: "Tam temas", en: "Full contact" }
  },
  semi: {
    tr: "Kontrollü, hafif temaslı teknik disiplin. Tam güçle (sert) vuruş yasaktır; aşırı güç fauldür.",
    en: "Controlled, light-contact technical discipline. Hard strikes are forbidden; excessive force is a foul.",
    contact: { tr: "Kontrollü hafif temas", en: "Controlled light contact" }
  },
  waikru: {
    tr: "Bireysel geleneksel ritüel dans (Nak Muay). Kültürel miras kategorisi.",
    en: "Solo traditional ritual dance (Nak Muay). Cultural-heritage category.",
    contact: { tr: "Temassız — kültürel", en: "No contact — cultural" },
    duration: { tr: "Performans süresi 4–5 dk (Kural 38.1)", en: "Performance 4–5 min (Rule 38.1)" }
  },
  maimuay: {
    tr: "İki kişilik geleneksel teknik performans. Kültürel miras kategorisi.",
    en: "Two-person traditional technical performance. Cultural-heritage category.",
    contact: { tr: "Temassız — kültürel", en: "No contact — cultural" },
    duration: { tr: "Performans süresi 5–6 dk (Kural 38.2)", en: "Performance 5–6 min (Rule 38.2)" }
  }
};

/* ---- Doğum yılı bazlı kategoriler (2026 sezonu) — TMF referans tablosu ---- */
window.IFMA.birthYearRefDate = "11.06.2026";
window.IFMA.birthYears2026 = [
  { id: "V45",   tr: "Veteranlar 45+", en: "Masters 45+", ageLo: 45, ageHi: 50, yrLo: 1976, yrHi: 1981 },
  { id: "V40",   tr: "Veteranlar 40+", en: "Masters 40+", ageLo: 40, ageHi: 44, yrLo: 1982, yrHi: 1986 },
  { id: "M35",   tr: "Büyükler 35+",   en: "Masters 35+", ageLo: 35, ageHi: 39, yrLo: 1987, yrHi: 1991 },
  { id: "ELITE", tr: "Elite",          en: "Elite",       ageLo: 18, ageHi: 40, yrLo: 1986, yrHi: 2008 },
  { id: "U24",   tr: "U24",            en: "U24",         ageLo: 18, ageHi: 23, yrLo: 2003, yrHi: 2008 },
  { id: "U18",   tr: "U18",            en: "U18",         ageLo: 16, ageHi: 17, yrLo: 2009, yrHi: 2010 },
  { id: "U16",   tr: "U16",            en: "U16",         ageLo: 14, ageHi: 15, yrLo: 2011, yrHi: 2012 },
  { id: "U14",   tr: "U14",            en: "U14",         ageLo: 12, ageHi: 13, yrLo: 2013, yrHi: 2014 },
  { id: "U12",   tr: "U12",            en: "U12",         ageLo: 10, ageHi: 11, yrLo: 2015, yrHi: 2016 },
  { id: "U10",   tr: "U10",            en: "U10",         ageLo: 8,  ageHi: 9,  yrLo: 2017, yrHi: 2018 },
  { id: "U8",    tr: "U8",             en: "U8",          ageLo: 6,  ageHi: 7,  yrLo: 2019, yrHi: 2020 }
];

/* ---- Sıklet sınıfları (kg) — TMF 2026 özet tablosu; yaş+cinsiyete göre ----
   NOT: Genç kategorilerin (özellikle U16) rakamları resmî tabloya göre doğrulanmalı. */
window.IFMA.weightGroups = {
  SENIOR: { // Elite / Büyükler 35+ / Veteran 40+ / Veteran 45+  (V40/V45 için +91 yok)
    male:   ["45", "48", "51", "54", "57", "60", "63.5", "67", "71", "75", "81", "86", "91", "+91"],
    female: ["45", "48", "51", "54", "57", "60", "63.5", "67", "71", "75", "+75"] },
  U24: {
    male:   ["45", "48", "51", "54", "57", "60", "63.5", "67", "71", "75", "81", "86", "91", "+91"],
    female: ["45", "48", "51", "54", "57", "60", "63.5", "67", "71", "75", "+75"] },
  U18: {
    male:   ["45", "48", "51", "54", "57", "60", "63.5", "67", "71", "75", "81", "86", "91", "+91"],
    female: ["42", "45", "48", "51", "54", "57", "60", "63.5", "67", "71", "75", "+75"] },
  U16: {
    male:   ["38", "40", "42", "45", "48", "51", "54", "57", "60", "63.5", "67", "71", "75", "81", "+81"],
    female: ["36", "38", "40", "42", "45", "48", "51", "54", "57", "60", "63.5", "67", "71", "+71"] },
  U14: {
    male:   ["32", "34", "36", "38", "40", "42", "44", "46", "48", "50", "52", "54", "56", "58", "60", "63.5", "67", "71", "+71"],
    female: ["32", "34", "36", "38", "40", "42", "44", "46", "48", "50", "52", "54", "56", "58", "60", "63.5", "+63.5"] },
  U12: {
    male:   ["30", "32", "34", "36", "38", "40", "42", "44", "46", "48", "50", "52", "54", "56", "58", "60", "+60"],
    female: ["30", "32", "34", "36", "38", "40", "42", "44", "46", "48", "50", "52", "54", "56", "58", "60", "+60"] },
  U10: { // *** yalnızca Muaythai Teknik (Tatami)
    male:   ["20", "22", "24", "26", "28", "30", "32", "34", "36"],
    female: ["18", "20", "22", "24", "26", "28", "30", "32"] },
  U8: {  // *** yalnızca Muaythai Teknik (Tatami)
    male:   ["16", "18", "20", "22", "24", "26", "28"],
    female: ["16", "18", "20", "22", "24", "26"] }
};
window.IFMA.ageWeightGroup = {
  ELITE: "SENIOR", M35: "SENIOR", V40: "SENIOR", V45: "SENIOR",
  U24: "U24", U18: "U18", U16: "U16", U14: "U14", U12: "U12", U10: "U10", U8: "U8"
};
window.IFMA.weightsFor = function (ageId, genderId) {
  var g = window.IFMA.ageWeightGroup[ageId];
  if (!g || !(genderId === "male" || genderId === "female")) return null;
  var w = window.IFMA.weightGroups[g];
  return w ? w[genderId] : null;
};
