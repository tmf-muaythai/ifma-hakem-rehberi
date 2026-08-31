/* =========================================================================
   IFMA HAKEM REHBERİ  —  data/flows.js
   Eğitim Modu içerikleri. Adımlar ilgili kartlara (data/cards.js) bağlanır.
   ========================================================================= */
window.IFMA = window.IFMA || {};

/* ---- Eğitim Modu ---- */
window.IFMA.training = {
  micro: [
    { id: "m1", tr: "Komutlar: YOOT / YAEK / CHOCK", en: "Commands: YOOT / YAEK / CHOCK", cards: ["REF_YOOT", "REF_YAEK", "REF_CHOCK"] },
    { id: "m2", tr: "Sayım ve 8 kuralı", en: "Count & the rule of 8", cards: ["FOUL_COUNT_THAI", "FOUL_RULE8", "FOUL_KO"] },
    { id: "m3", tr: "RSC ve CCL", en: "RSC & CCL", cards: ["FOUL_DECISIONS", "FOUL_CCL"] },
    { id: "m4", tr: "Puanlama temelleri", en: "Scoring basics", cards: ["JUDGE_KRITER", "JUDGE_10PT", "JUDGE_NONSCORING"] }
  ],
  scenarios: [
    {
      id: "s1", rule: "31.3", card: "FOUL_TYPES",
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
