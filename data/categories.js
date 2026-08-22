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
  role: [
    { id: "ref",    icon: "whistle", tr: "Orta Hakem",      en: "Referee" },
    { id: "judge",  icon: "eye",     tr: "Yan Hakem",       en: "Judge" },
    { id: "time",   icon: "clock",   tr: "Zaman Hakemi",    en: "Timekeeper" },
    { id: "jury",   icon: "shield",  tr: "Jüri",            en: "Jury" },
    { id: "weigh",  icon: "scale",   tr: "Tartı",           en: "Weigh-in" },
    { id: "corner", icon: "corner",  tr: "Köşe Görevlisi",  en: "Corner (Second)" }
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
  C: { tr: "Maç boyunca toplam 2 sayım",                            en: "2 counts total in the whole match" }
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
