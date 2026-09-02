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
    ruleText: {
      tr: "26.3: ORTA HAKEMİN GÖREVLERİ\nYOOT (Dur): Orta Hakem, sporcuların hareketi durdurmasını emrederken Tayca “YOOT” komutunu kullanır. Her raundun sonunda gong çaldığında “YOOT” komutunu verir, sporcuların arasına girer ve onları köşelerine yönlendirir.\n31.2.21: “YOOT” veya “YAEK” komutuna uymamak ve geri adım atmamak fauldür.\n31.2.22: “YOOT” veya “YAEK” komutunun ardından Orta Hakem “CHOCK” emrini vermeden önce rakibe vurmaya teşebbüs etmek fauldür.",
      en: "26.3: DUTIES OF THE REFEREE\nYOOT (Stop): The Referee uses the Thai command “YOOT” when ordering the athletes to stop action. At the strike of the bell, the Referee stops each round by commanding “YOOT”, obstructs the athletes and directs them to their corners.\n31.2.21: Failing to follow “YOOT” or “YAEK” and take a step back is a foul.\n31.2.22: Attempting to strike before the Referee orders “CHOCK” after “YOOT” or “YAEK” is a foul."
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
    ruleText: {
      tr: "26.3: ORTA HAKEMİN GÖREVLERİ\nYAEK (Ayrıl): Orta Hakem clinch'i ayırırken Tayca “YAEK” komutunu kullanır. Bu komut üzerine her sporcu geri adım atar ve müsabakaya devam etmek için Orta Hakemin komutunu bekler.\n31.2.21: “YOOT” veya “YAEK” komutuna uymamak ve geri adım atmamak fauldür.\n31.2.22: “CHOCK” komutundan önce rakibe vurmaya teşebbüs etmek fauldür.",
      en: "26.3: DUTIES OF THE REFEREE\nYAEK (Break): The Referee uses the Thai command “YAEK” when breaking a clinch. On this command each athlete shall step back and await the Referee's command to continue the competition.\n31.2.21: Failing to follow “YOOT” or “YAEK” and take a step back is a foul.\n31.2.22: Attempting to strike before the command “CHOCK” is a foul."
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
    ruleText: {
      tr: "26.3: ORTA HAKEMİN GÖREVLERİ\nCHOCK (Dövüş): Orta Hakem, sporculara müsabakaya başlamalarını veya devam etmelerini emrederken Tayca “CHOCK” komutunu kullanır. Sporcular, “YOOT” veya “YAEK” sonrasında yalnızca “CHOCK” komutuyla yeniden mücadeleye başlayabilir.",
      en: "26.3: DUTIES OF THE REFEREE\nCHOCK (Box): The Referee uses the Thai command “CHOCK” when ordering the athletes to begin or continue the competition. After “YOOT” or “YAEK”, the athletes may resume only on the command “CHOCK”."
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
    ruleText: {
      tr: "26.3: ORTA HAKEMİN GÖREVLERİ\nTIME: Orta Hakem, aktif raund sırasında ring içinde veya dışında meydana gelen olaylarla ilgilenmek amacıyla kronometre geri sayımının durdurulmasını Zaman Hakemine emrederken “TIME” komutunu kullanır.\nKural 7: Uyarı, ikaz, kıyafet veya ekipman düzeltmesi ya da başka bir nedenle durdurulan süre raund süresine dahil edilmez; ek raund verilmez.",
      en: "26.3: DUTIES OF THE REFEREE\nTIME: The Referee uses “TIME” when ordering the Timekeeper to stop the countdown of the clock during the active round to attend to incidents inside or outside the ring.\nRule 7: A stoppage for a Warning, Caution, clothing, equipment or any other reason is not included in the round period; no additional round may be given."
    },
    when: { tr: "Ekipman düzeltme, sakatlık, ring dışına düşme vb.", en: "Equipment fix, injury, fall out of ring, etc." },
    right: { tr: "Durdurulan süre raunda eklenmez, ek raund verilmez (Kural 7).", en: "Stopped time is not added to the round; no extra round is given (Rule 7)." },
    wrong: { tr: "Süreyi durdurmadan müdahale etmek; durdurulan süreyi rakip aleyhine saymak.", en: "Intervening without stopping time; counting stopped time against an athlete." },
    related: ["CAT_ROUNDS"],
    tags: ["time", "süre", "zaman", "kronometre", "clock", "26.3"]
  },
  {
    id: "REF_ATTIRE", module: "orta", subtopic: "giyim", label: "ifma",
    rule: "21.12 / 26.1 / 26.6", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: true, video: true, animation: false },
    title: { tr: "Giyim Kuralları", en: "Attire Rules" },
    quick: {
      tr: "Orta Hakem topuksuz düz tabanlı siyah ayakkabı giyer; cerrahi eldiven tavsiye edilir. Gözlük, takı, kemer ve başlık yasaktır.",
      en: "The referee wears flat-soled black shoes; surgical gloves are recommended. Glasses, jewellery, belts and headwear are prohibited."
    },
    ruleText: {
      tr: "21.12: GİYİM\nTeknik Görevliler; koyu mavi veya siyah pantolon, topuksuz siyah düz ayakkabı, IFMA resmi hakem gömleği ve koyu mavi veya siyah papyon giyer. Resmi gömlek ve papyon, Başhakem ile Teknik Delegenin onayıyla değiştirilebilir; uygun görülürse ceket kullanılabilir.\n21.12.1: DIŞ GÖRÜNÜM\nResmi Görevliler kişisel hijyen, düzeltilmiş sakal ve bıyık ile görünür piercing veya dövme bulunmaması dahil her zaman profesyonel görünmelidir.\n26.1: EK GİYİM GEREKLİLİKLERİ\nOrta Hakem, topuğu yükseltilmemiş düz tabanlı siyah ayakkabı giymeli ve görev sırasında cerrahi eldiven kullanması tavsiye edilmelidir. Gözlük, takı, kemer ve başlık gibi aksesuarlar yasaktır.\n26.6: TIBBİ HUSUSLAR\nOrta Hakem, görevlerini yerine getirme yeteneğini olumsuz etkileyebilecek herhangi bir rahatsızlık veya hastalıktan ari olmalıdır. Görme düzeltmesi için kontakt lens kullanımına izin verilir.\n26.6.1: Zorunlu Sağlık Muayenesi\nTüm Orta Hakemler, müsabaka tartısının ardından mümkün olan en erken zamanda, müsabaka veya şampiyona sırasında sağlık muayenesinden geçmelidir.",
      en: "21.12: ATTIRE\nTechnical Officials wear dark blue or black trousers, black flat shoes without a raised heel, the official IFMA referee shirt and a dark blue or black bow tie. The official shirt and bow tie may be varied with the approval of the Chairman of the Jury and Technical Delegate; a jacket may be worn when deemed appropriate.\n21.12.1: APPEARANCE\nOfficials shall maintain a professional appearance at all times, including personal hygiene, trimmed facial hair and no visible piercings or tattoos.\n26.1: ADDITIONAL DRESS REQUIREMENTS\nThe Referee is to wear black flat-soled shoes without a raised heel and is recommended to wear surgical gloves while officiating. Accessories such as eyeglasses, jewellery, belts and headwear are prohibited.\n26.6: MEDICAL CONSIDERATIONS\nThe Referee shall be free of any condition or ailment that may compromise the ability to perform the duties. Contact lenses for corrective vision are permitted.\n26.6.1: COMPULSORY MEDICAL\nAll Referees must undergo a medical examination at the earliest opportunity following a competition weigh-in, during a competition or championship."
    },
    when: { tr: "Tüm maçlar. Görme için kontakt lens serbest (26.6).", en: "All matches. Contact lenses are allowed for vision (26.6)." },
    right: { tr: "Düz tabanlı siyah ayakkabı + (tavsiye) cerrahi eldiven; aksesuarsız.", en: "Flat-soled black shoes + (recommended) surgical gloves; no accessories." },
    wrong: { tr: "Topuklu ayakkabı, kol saati/yüzük, kemer veya başlık ile ringe çıkmak.", en: "Entering with heeled shoes, a watch/ring, a belt or headwear." },
    related: ["REF_RSC_POWER"],
    tags: ["giyim", "ayakkabı", "eldiven", "attire", "26.1", "26.6"]
  },
  {
    id: "REF_RSC_POWER", module: "orta", subtopic: "yetkiler", label: "ifma",
    rule: "21.5 / 26.2–26.4", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: false, video: true, animation: false },
    title: { tr: "Orta Hakemin Yetkileri", en: "Powers of the Referee" },
    quick: {
      tr: "Sporcunun korunması birincil kaygıdır. Orta Hakem maçı bitirebilir; ikaz, ihtar veya diskalifiye uygulayabilir; sayımı durdurabilir ve kurallarda açıkça bulunmayan müsabaka durumlarında karar verebilir.",
      en: "Care of the athlete is the primary concern. The Referee may terminate the contest, administer a Caution, Warning or Disqualification, suspend a count and decide circumstances not expressly covered by a rule."
    },
    ruleText: {
      tr: "21.5: ORTA HAKEM\nHer maç, ringde görev yapan ancak aynı maç için skor kartı doldurmayan, IFMA veya Kıtasal Federasyon onaylı bir Orta Hakem tarafından yönetilir.\n26.2: BİRİNCİL KAYGI\nSporcunun korunması Orta Hakemin birincil kaygısıdır.\n26.4: ORTA HAKEMİN YETKİLERİ\nOrta Hakem aşağıdaki yetkilere sahiptir:\n• Müsabakanın aşırı derecede tek taraflı olduğunu düşünürse herhangi bir aşamada maçı bitirmek (RSC: Güvenlik).\n• Bir sporcunun devam etmemesi gerektiğine karar verdiği bir sakatlık alması hâlinde maçı bitirmek (RSC: Sakatlık).\n• Sporcuların ciddi biçimde mücadele etmediğini düşünürse maçı bitirmek ve birini veya her ikisini diskalifiye etmek.\n• Fauller, fair play veya kurallara uyumu sağlamak için sporcuya ikaz vermek ya da maçı durdurup ihtar uygulamak.\n• Emirlerine derhal uymayan veya saldırgan/hakaret içeren davranış sergileyen sporcuyu diskalifiye etmek.\n• Kural ihlali yapan Köşe Görevlisini ve emirlere uymaması hâlinde sporcuyu diskalifiye etmek.\n• Ciddi bir faulde önceden ihtar vermiş olsun veya olmasın sporcuyu diskalifiye etmek.\n• Knockdown sırasında rakip tarafsız köşeye gitmez veya gitmeyi geciktirirse sayımı durdurmak.\n• Geçerli kuralları yorumlamak ve kurallarda açıkça düzenlenmemiş müsabaka durumlarında karar alıp uygulamak.",
      en: "21.5: REFEREE\nEach contest is controlled by an IFMA or Continental Federation-approved Referee who officiates in the ring but does not fill a scorecard for that contest.\n26.2: PRIMARY CONCERN\nThe care of the athlete is the primary concern of the Referee.\n26.4: POWERS OF THE REFEREE\nThe Referee is empowered to:\n• Terminate a contest at any stage if it is considered too one-sided (RSC: Safety).\n• Terminate a contest if an athlete has received an injury on account of which they should not continue (RSC: Injury).\n• Terminate a contest if the contestants are not competing in earnest and disqualify one or both contestants.\n• Caution an athlete or stop the contest to administer a Warning for fouls, fair play or compliance with the Rules.\n• Disqualify an athlete who does not immediately comply with orders or behaves offensively or aggressively.\n• Disqualify a Second who infringes the Rules and/or the athlete if the Second does not comply with orders.\n• Disqualify a contestant for a serious foul, with or without a previous Warning.\n• Suspend a count if the opponent deliberately fails or delays to retire to a neutral corner.\n• Interpret the applicable Rules and decide and act on circumstances not covered by a rule."
    },
    when: { tr: "Tüm dövüş kategorileri.", en: "All combat categories." },
    right: { tr: "Ciddi yaralanmada derhal durdur; gerekirse ringdeki doktora en fazla 1 dk danış (30.2.2).", en: "Stop at once on serious injury; consult the ringside doctor for max 1 min if needed (30.2.2)." },
    wrong: { tr: "Tek taraflı maçta güvenlik durdurmasını geciktirmek.", en: "Delaying a safety stop in a one-sided match." },
    related: ["FOUL_DECISIONS", "FOUL_CCL"],
    tags: ["rsc", "rscs", "rsci", "rsch", "rscb", "ccl", "26.4", "30.2"]
  },
  {
    id: "REF_ENDMATCH", module: "orta", subtopic: "macsonu", label: "ifma",
    rule: "26.3", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: true, video: true, animation: false },
    title: { tr: "Maç Sonu", en: "End of Contest" },
    quick: {
      tr: "Karar resmen açıklanmadan Orta Hakem galibi ilan etmez; kazanan anons edilince kazananın elini kaldırır.",
      en: "The referee does not signal the winner before the official announcement; on announcement, raises the winner's hand."
    },
    ruleText: {
      tr: "26.3: ORTA HAKEMİN MAÇ SONU GÖREVLERİ\nMüsabakanın sonunda Orta Hakem, Yan Hakemlerin skor kâğıtlarını toplar ve kontrol eder. Kontrolün ardından kâğıtları Jüriye; Jürinin bulunmadığı durumlarda Anons Hakemine teslim eder.\nOrta Hakem müsabakayı durdurduğunda, kararın kamuoyuna açıklanabilmesi için öncelikle durdurma nedenini Jüriye bildirir.\nOrta Hakem, sonuç açıklanmadan önce sporcunun elini kaldırarak veya başka bir şekilde kazananı işaret edemez. Kazanan anons edildiğinde kazanan sporcunun elini kaldırır.",
      en: "26.3: END-OF-CONTEST DUTIES\nAt the end of a contest, the Referee collects and checks the Judges' papers. After checking, the papers are presented to the Jury or, when there is no Jury, to the announcer.\nWhen the Referee has stopped the contest, the Jury shall first be informed of the reason so the decision can be made known to the public.\nThe Referee shall not indicate the winner by raising an athlete's hand or otherwise until the announcement has been made. When the winner is announced, the Referee raises the hand of the winning athlete."
    },
    when: { tr: "Maç bitiminde.", en: "At the end of the match." },
    right: { tr: "Skor kartlarını topla → Jüriye/anons hakemine ver → karar açıklanınca eli kaldır.", en: "Collect the scorecards → give to jury/announcer → raise the hand once announced." },
    wrong: { tr: "Anons öncesi galibi belli etmek.", en: "Revealing the winner before the announcement." },
    related: ["JUDGE_10PT"],
    tags: ["maç sonu", "el kaldırma", "karar", "26.3"]
  },
  {
    id: "REF_RINGGIRIS", module: "orta", subtopic: "ekipman", label: "ifma",
    rule: "19.1", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: true, video: true, animation: false },
    title: { tr: "Ekipman Kontrolü", en: "Equipment Inspection" },
    quick: {
      tr: "Sporcu ekipmanı hazır ringe gelir; mongkon köşe tarafından takılır ve Orta Hakem sporcunun köşesinde ekipman kontrolü yapar.",
      en: "The athlete enters ready-equipped; the corner places the mongkon, and the referee checks the equipment at the athlete's corner."
    },
    ruleText: {
      tr: "19.1: MÜSABAKAYA HAZIR BULUNMA\nSporcu; bandaj veya el sargısı, eldiven, dirseklik, kaval koruyucu, kasık koruyucu ile kullanılıyorsa göğüs ve gövde koruyucusu müsabakaya hazır durumda ringe gelir. Mongkon, kask ve dişlik müsabakaya hazırlık amacıyla Köşe Görevlileri tarafından tutulur.\nSporcu ringe girdikten sonra Köşe Görevlisi Mongkon'u sporcunun başına yerleştirir. Sporcu Jüri ve Yan Hakemlere kendini takdim ettikten sonra kendi köşesinde ekipman kontrolü için Orta Hakemin karşısına çıkar.\n26.3: Orta Hakem, sporcuların eldivenlerini ve kıyafetlerini kontrol eder.",
      en: "19.1: PRESENTING FOR COMPETITION\nThe athlete approaches the ring with bandages or hand wraps, gloves, elbow guards, shin guards, groin guard and, if used, chest and body protectors ready for competition. The Mongkon, head guard and gum shield are held by the athlete's Seconds in preparation for the contest.\nAfter entering the ring, the Mongkon is placed on the athlete's head by the Second. After presenting to the Jury and Judges, the athlete presents to the Referee in the corner for equipment inspection.\n26.3: The Referee checks the gloves and dress of the athletes."
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
    media: { photo: true, video: true, animation: false },
    title: { tr: "Maç Başlatma Adımları", en: "Starting the Contest" },
    quick: {
      tr: "Ekipman kontrolü → Orta Hakem Wai Kru sinyali → selamlaşma (Wai) → gong → “CHOCK” ile başla.",
      en: "Equipment check → referee signals Wai Kru → salute (Wai) → gong → start with “CHOCK”."
    },
    ruleText: {
      tr: "KURAL 19: MAÇIN BAŞLATILMASI\n19.1: Sporcu gerekli ekipmanla ringe gelir, ringe girer, Mongkon'u takılır, Jüri ve Yan Hakemlere kendini takdim eder ve kendi köşesinde Orta Hakemin ekipman kontrolünden geçer.\n19.2: WAİ KRU'NUN YAPILMASI\nEkipman kontrolü tamamlandıktan sonra Orta Hakem Wai Kru'nun başlaması için işaret verir.\n19.3: SELAMLAŞMA\nSporcular maç başlamadan önce ve maçtan sonra sportmenlik ve dostça rekabet göstergesi olarak uygun biçimde el sıkışır veya Wai yapar.\n19.3.1: İzin Verilen Zamanlar\nSelamlaşma yalnızca birinci raund başlamadan önce ve maç sonucunun açıklanmasından sonra yapılır. Raundlar arasında yeniden selamlaşmak yasaktır.\n26.3: Orta Hakem, sporcuların mücadeleye başlaması için “CHOCK” komutunu verir.",
      en: "RULE 19: STARTING A CONTEST\n19.1: The athlete presents with the required equipment, enters the ring, has the Mongkon placed, presents to the Jury and Judges and undergoes the Referee's equipment inspection in the corner.\n19.2: PERFORMING THE WAI KRU\nAfter the equipment inspection is completed, the Referee signals the start of the Wai Kru.\n19.3: SHAKING OF HANDS\nBefore beginning and after a contest, athletes shake hands or Wai properly as a sign of sporting and friendly rivalry.\n19.3.1: Authorised Times\nThe salute takes place before the first round and after announcement of the result. Any further salute between rounds is prohibited.\n26.3: The Referee commands “CHOCK” to order the athletes to begin competing."
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
    media: { photo: true, video: true, animation: false },
    title: { tr: "Adımlama ve Pozisyon", en: "Footwork and Positioning" },
    quick: {
      tr: "Orta Hakem maçın tüm aşamalarında kontrolü sürdürür ve güçsüz düşmüş bir sporcunun gereksiz darbe almasını önleyecek şekilde konumlanır.",
      en: "The referee maintains control at all stages and positions to prevent a weakened athlete from taking undue punishment."
    },
    ruleText: {
      tr: "26.3: ORTA HAKEMİN GÖREVLERİ\nOrta Hakem:\n• Kuralların ve fair play ilkelerinin eksiksiz uygulanmasını sağlar.\n• Müsabakanın tüm aşamalarında kontrolü sürdürür.\n• Güçsüz düşmüş bir sporcunun gereksiz ve aşırı darbe almasını önler.\n• Kural ihlalini sporcuya görsel olarak gösterir.\n• Her raundun sonunda “YOOT” komutunu vererek sporcuların arasına girer ve onları köşelerine yönlendirir.\nTalimat belirli bir adımlama modeli tarif etmez; pozisyonun amacı sürekli görüş, kontrol ve güvenli müdahaledir.",
      en: "26.3: DUTIES OF THE REFEREE\nThe Referee shall:\n• See that the Rules and fair play are strictly observed.\n• Maintain control of the contest in all its stages.\n• Prevent a weak athlete from receiving undue and unnecessary punishment.\n• Visually demonstrate any infringement of the Rules to an athlete.\n• At the end of each round, command “YOOT”, obstruct the athletes and direct them to their corners.\nThe Rules do not prescribe a specific footwork pattern; positioning serves continuous vision, control and safe intervention."
    },
    when: { tr: "Maç boyunca.", en: "Throughout the match." },
    right: { tr: "Sporculara net görüş açısı koruyan, hızlı müdahaleye hazır mesafe.", en: "A distance that keeps a clear view and allows quick intervention." },
    wrong: { tr: "Görüşü kapatan ya da müdahaleye uzak konum.", en: "Blocking the view, or standing too far to intervene." },
    related: ["REF_RSC_POWER", "REF_CLINCH"],
    tags: ["pozisyon", "adımlama", "kontrol", "26"]
  },
  {
    id: "REF_CLINCH", module: "orta", subtopic: "ayirma", label: "ifma",
    rule: "26.3", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: false, video: true, animation: false },
    title: { tr: "Ayırma Pozisyonları", en: "Separation Positions" },
    quick: {
      tr: "Clinch Muaythai'nin bir parçasıdır; gerektiğinde Orta Hakem “YAEK” ile ayırır, sporcular geri çekilir ve “CHOCK” ile devam edilir.",
      en: "The clinch is part of Muaythai; when needed the referee breaks it with “YAEK”, athletes step back, and play resumes on “CHOCK”."
    },
    ruleText: {
      tr: "26.3: ORTA HAKEMİN GÖREVLERİ\nOrta Hakem clinch'i ayırırken “YAEK” komutunu kullanır. Bu komutla her sporcu geri adım atar ve müsabakaya devam etmek için Orta Hakemin “CHOCK” komutunu bekler.\n31.2.19: Herhangi bir Muaythai tekniğiyle vuruş yapmadan rakibin bacağını tutup herhangi bir yönde iki adımdan fazla ileri itmek fauldür.\n31.2.21: “YOOT” veya “YAEK” komutuna uymamak ve geri adım atmamak fauldür.\n31.2.22: Orta Hakem “CHOCK” emrini vermeden önce rakibe vurmaya teşebbüs etmek fauldür.\nTalimat ayırma sırasında kullanılacak belirli el veya beden pozisyonlarını tarif etmez; uygulamalı pozisyonlar video eğitiminde gösterilecektir.",
      en: "26.3: DUTIES OF THE REFEREE\nThe Referee uses “YAEK” when breaking a clinch. On this command each athlete steps back and waits for “CHOCK” before continuing.\n31.2.19: Holding the opponent's leg and pushing forward more than two steps in any direction without striking with a Muaythai skill is a foul.\n31.2.21: Failing to follow “YOOT” or “YAEK” and take a step back is a foul.\n31.2.22: Attempting to strike before the Referee orders “CHOCK” is a foul.\nThe Rules do not prescribe specific hand or body positions for separation; practical positions will be demonstrated in the training video."
    },
    when: { tr: "Clinch / kilitlenme durumlarında.", en: "In clinch / locking situations." },
    right: { tr: "“YAEK” → geri adım → “CHOCK”.", en: "“YAEK” → step back → “CHOCK”." },
    wrong: { tr: "Rakibin bacağını tutup 2 adımdan fazla ilerlemek (31.2.19) veya tamamen pasif clinch.", en: "Holding the opponent's leg and stepping more than 2 steps (31.2.19), or a fully passive clinch." },
    related: ["REF_YAEK", "FOUL_TYPES"],
    tags: ["clinch", "yaek", "ayırma", "26.3", "31.2.19"]
  },
  {
    id: "REF_IKAZIHTAR", module: "orta", subtopic: "ikazihtar", label: "ifma",
    rule: "31.1", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: true, video: true, animation: false },
    title: { tr: "İkaz / İhtar Verme", en: "Giving a Caution / Warning" },
    quick: {
      tr: "Küçük ihlalde fiziksel işaretle sözlü İkaz; ciddi/tekrar eden ihlalde maçı durdurup İhtar ver, Jüriye bildir ve işaretle.",
      en: "A verbal Caution with a physical signal for minor infringements; for serious/repeated ones, stop the match, give a Warning, inform the jury and signal it."
    },
    ruleText: {
      tr: "31.1: FAULLERİN DEĞERLENDİRİLMESİ\nFaul yapan sporcu, Orta Hakemin takdirine bağlı olarak ikaz edilebilir, ihtar alabilir veya önceden ihtar verilmeden diskalifiye edilebilir.\n31.1.1: İKAZ\nİkaz, daha hafif kural ihlallerindeki istenmeyen davranışı düzeltmek veya önlemek için verilen uyarıdır. Orta Hakem maçı durdurmak zorunda değildir; raund içinde güvenli bir fırsat bularak ikaz verir. İkaz, ihlale uygun fiziksel işaretle birlikte yapılır. Aynı ihlal için üç ikaz alan sporcuya ihtar verilir. Farklı fauller için çok sayıda ikaz alan sporcuya sportmenlik dışı davranıştan ihtar verilebilir.\n31.1.2: İHTAR\nTekrarlanan veya ciddi ihlalde Orta Hakem maçı durdurur ve ihlali açıkça gösterir. İhtarı Jüriye bildirir; sporcuyu ve ardından her Yan Hakemi işaret ederek ihtarın verildiğini gösterir. Sonrasında müsabakayı yeniden başlatır. Aynı ihlal için bir kez ihtar verildikten sonra o ihlal için yeniden ikaz verilemez. Bir maçta üç ihtar alan sporcu diskalifiye edilir.\n31.1.3: DİSKALİFİYE\nBüyük veya tehlikeli ihlallerde Orta Hakem sporcuyu derhal diskalifiye edebilir.",
      en: "31.1: TREATMENT OF FOULS\nAn athlete who commits fouls may, at the Referee's discretion, be Cautioned, Warned or Disqualified without a Warning.\n31.1.1: CAUTIONS\nA Caution checks or prevents undesirable practices in less serious infringements. The Referee need not stop the contest and may use a suitable safe opportunity during a round. A Caution is accompanied by the appropriate physical signal. Three Cautions for the same offence result in a Warning. Many different Cautions may result in a Warning for unsportsmanlike conduct.\n31.1.2: WARNINGS\nFor repeated or serious infringements, the Referee stops the contest and clearly demonstrates the infringement. The Jury is informed; the Referee points to the athlete and each Judge to signal the Warning, then resumes the contest. Once a Warning has been administered, a Caution cannot be issued for the same type of offence. Three Warnings in a contest result in disqualification.\n31.1.3: DISQUALIFICATIONS\nFor major or dangerous infringements, the Referee may immediately disqualify an athlete."
    },
    when: { tr: "Faul değerlendirmesinde.", en: "When assessing a foul." },
    right: { tr: "Aynı ihlalden 3 İkaz → 1 İhtar. Bir maçta 3 İhtar → Diskalifiye.", en: "3 Cautions for the same offence → 1 Warning. 3 Warnings in a contest → disqualification." },
    wrong: { tr: "İhtarı sessizce vermek; İkaz için maçı gereksiz durdurmak.", en: "Giving a Warning silently; stopping the match unnecessarily for a Caution." },
    related: ["FOUL_CLASS", "JUDGE_DEDUCT"],
    tags: ["ikaz", "ihtar", "caution", "warning", "31.1"]
  },
  {
    id: "REF_SAYIMREF", module: "orta", subtopic: "sayim", label: "ifma",
    rule: "32.1–32.5", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: false, video: true, animation: false },
    title: { tr: "Sayım Yapma", en: "Performing the Count" },
    quick: {
      tr: "Knockdown'da Orta Hakem “YOOT” der ve Tayca yüksek sesle sayar (NUENG→SIB); darbeyle NUENG arasında en az 1 sn, her sayı 1 sn arayla ve elle gösterilir.",
      en: "On a knockdown the referee commands “YOOT” and counts aloud in Thai (NUENG→SIB); at least 1 s between the blow and NUENG, each number 1 s apart, shown by hand."
    },
    ruleText: {
      tr: "32.1: KNOCKDOWN TANIMI\nBir sporcu; vuruş sonucu ayakları dışında vücudunun herhangi bir kısmıyla zemine temas edip kalkmakta zorlanırsa, iplere savunmasız biçimde asılı kalırsa, vuruş sonucu iplerin tamamen veya kısmen dışındaysa ya da sert bir vuruştan sonra düşmemesine rağmen yarı bilinçli olup kendisini etkili biçimde savunamıyorsa Knockdown kabul edilir.\n32.2: SAYIM\nKnockdown durumunda Orta Hakem derhal “YOOT” komutunu verir ve geçen saniyeleri Tayca yüksek sesle sayar: NUENG (1), SONG (2), SAAM (3), SII (4), HAH (5), HOK (6), JED (7), BAED (8), KOUW (9), SIB (10).\n32.2.1: Sayımın Başlaması\nDarbe ile NUENG (1) komutu arasında bir saniye geçmelidir.\n32.2.2: Zamanlama ve İşaret\nHer sayı arasında bir saniye bulunur. Orta Hakem işaret parmağından başlayarak her saniyeyi eliyle, knockdown durumundaki sporcunun sayımı görebileceği şekilde gösterir.\n32.3: Rakibin Sorumluluğu\nRakip derhal belirlenen tarafsız köşeye gider, ringin merkezine dönük biçimde kolları yanında bekler. Rakip köşeye gitmezse sayım durdurulur; köşeye ulaştığında kaldığı yerden sürdürülür. Rakip yalnızca Orta Hakemin “CHOCK” komutundan sonra devam edebilir.\n32.4: Zorunlu Sekiz Sayımı\nSporcu daha önce hazır olsa bile sayım BAED (8)'e ulaşmadan müsabaka devam ettirilemez.\n32.5: Nakavt\nSporcu BAED (8)'de devam edemiyorsa sayım SIB (10)'a kadar sürer. SIB (10)'da müsabaka sona erer ve sonuç Nakavt olarak belirlenir.",
      en: "32.1: DEFINITION OF KNOCKDOWN\nAn athlete is Knocked Down if, following a strike, they touch the floor with any part of the body other than the feet and have difficulty rising; hang helplessly on the ropes; are outside or partly outside the ropes; or, after a hard strike, remain standing but semi-conscious and unable to defend effectively.\n32.2: THE COUNT\nOn a Knockdown, the Referee immediately commands “YOOT” and counts aloud in Thai: NUENG (1), SONG (2), SAAM (3), SII (4), HAH (5), HOK (6), JED (7), BAED (8), KOUW (9), SIB (10).\n32.2.1: Starting the Count\nOne second must elapse between the strike and announcing NUENG (1).\n32.2.2: Timing and Signal\nThere is a one-second interval between each number. Starting with the index finger, the Referee indicates each second by hand so the Knocked Down athlete is aware of the count.\n32.3: Opponent's Responsibilities\nThe opponent immediately goes to the designated neutral corner, faces the centre and waits with arms at the sides. If the opponent does not retire, the count is suspended and continues from where it stopped once the opponent complies. The opponent may resume only after “CHOCK”.\n32.4: Mandatory 8-count\nThe contest cannot continue before BAED (8), even if the athlete is ready earlier.\n32.5: The Knockout\nIf the athlete cannot continue at BAED (8), the count proceeds to SIB (10). At SIB (10), the contest ends by Knockout."
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
    media: { photo: true, video: true, animation: false },
    title: { tr: "Doktor Çağırma", en: "Calling the Doctor" },
    quick: {
      tr: "Ciddi yaralanmada Orta Hakem doktoru tarafsız köşeye çağırır ve en fazla 1 dk danışır; doktor durdur derse Hakem uymak zorundadır.",
      en: "For a serious injury the referee calls the doctor to the neutral corner and consults for no more than 1 min; if the doctor advises to stop, the referee must comply."
    },
    ruleText: {
      tr: "30.2.2: SAKATLIK (RSCI)\nOrta Hakem, yasal vuruşlardan veya başka bir hareketten kaynaklanan sakatlık nedeniyle sporcunun devam edemeyeceğine ya da başka fiziksel nedenlerle yetersiz kaldığına karar verirse müsabakayı durdurur ve rakibi kazanan ilan eder.\nŞüpheli kırık, eklem çıkığı, kusma veya kontrol edilemeyen kanama dahil ciddi yaralanma belirtilerinde Orta Hakem maçı derhal durdurur, RSCI ilan eder ve tıbbi değerlendirme ister.\nKarar yetkisi Orta Hakeme aittir. Orta Hakem tarafsız köşedeki doktora en fazla bir dakika danışabilir. Doktor müsabakanın durdurulmasını tavsiye ederse Orta Hakem bu tavsiyeye uymak zorundadır.\nDoktor sporcuyu ring içinde muayene ederken yalnızca doktor ve Orta Hakem bulunabilir; hiçbir Köşe Görevlisi ringe veya aprona giremez.\nDoktor, dinlenme süresinde sporcuyu yalnızca Orta Hakemin doğrudan talimatıyla muayene eder. Doktor durdurma tavsiyesi verirse Orta Hakem Zaman Hakemine raund süresini başlatmasını söyler; ardından maçı derhal durdurur ve rakibi RSC Sakatlık ile kazanan ilan eder.",
      en: "30.2.2: INJURY (RSCI)\nIf, in the Referee's opinion, an athlete is unfit to continue because of an injury from legal strikes or other action, or is incapacitated for other physical reasons, the contest is stopped and the opponent declared the winner.\nFor apparent serious injury, including suspected fractures, joint dislocations, vomiting or uncontrolled bleeding, the Referee immediately stops the contest, declares RSCI and seeks medical assessment.\nThe decision rests with the Referee, who may consult the Doctor at the neutral corner for no more than one minute. If the Doctor advises stopping, the Referee must follow that advice.\nWhen the Doctor examines an athlete inside the ring, only the Doctor and Referee may be present; no Seconds may enter the ring or apron.\nDuring the rest, the Doctor examines an athlete only under direct instruction from the Referee. If stopping is advised, the Referee instructs the Timekeeper to begin the round time, immediately stops the contest and declares the opponent the winner by RSC Injury."
    },
    when: { tr: "Sakatlık / ciddi yaralanma durumunda.", en: "On injury / serious harm." },
    right: { tr: "Doktor muayenesinde ringde yalnızca Hakem ve doktor bulunur; köşe giremez (30.2.2).", en: "During the exam only the referee and doctor are in the ring; no Second may enter (30.2.2)." },
    wrong: { tr: "Köşenin ringe veya aprona girmesine izin vermek.", en: "Letting a Second enter the ring or apron." },
    related: ["REF_RSC_POWER", "FOUL_DECISIONS"],
    tags: ["doktor", "rsci", "yaralanma", "30.2.2", "33"]
  },
  /* ===================== FAUL / SAYIM / KARARLAR ===================== */
  {
    id: "FOUL_CLASS", module: "faul", subtopic: "fauller", label: "ifma",
    rule: "31.1", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref", "judge"],
    media: { photo: false, video: false, animation: true },
    title: { tr: "Faul Sınıfları", en: "Foul Classes" },
    subtitle: { tr: "İkaz / İhtar / DQ Tanımları", en: "Caution / Warning / DQ Definitions" },
    quick: {
      tr: "İkaz (Caution) sözlü küçük uyarıdır; İhtar (Warning) maçı durdurup verilir; büyük/tehlikeli ihlal doğrudan Diskalifiye (DQ).",
      en: "A Caution is a minor verbal warning; a Warning stops the match; a serious/dangerous foul leads to direct Disqualification (DQ)."
    },
    ruleText: {
      tr: "31.1: FAULLERİN DEĞERLENDİRİLMESİ\nKural dışı hareket yapan sporcuya Orta Hakemin takdirine bağlı olarak İkaz verilebilir, İhtar uygulanabilir veya önceden İhtar verilmeden doğrudan Diskalifiye edilebilir.\n31.1.1: İKAZ (CAUTION)\nİkaz, daha hafif ihlalleri kontrol etmek veya istenmeyen davranışı önlemek için verilen sözlü uyarıdır. Maçın durdurulması zorunlu değildir; güvenli bir anda ve ihlale uygun fiziksel işaretle verilir. Aynı ihlal için üç İkaz bir İhtara dönüşür. Farklı faullerden çok sayıda İkaz sportmenlik dışı davranış gerekçesiyle İhtara dönüştürülebilir.\n31.1.2: İHTAR (WARNING)\nTekrarlanan veya ciddi ihlalde Orta Hakem maçı durdurur, ihlali açıkça gösterir, İhtarı Jüriye bildirir ve sporcu ile Yan Hakemlere işaret eder. Bir ihlal için İhtar verildikten sonra aynı ihlal tekrarlandığında İkaz verilemez; yeniden İhtar uygulanır. Bir maçta üç İhtar alan sporcu diskalifiye edilir.\n31.1.3: DİSKALİFİYE (DQ)\nBüyük veya tehlikeli kural ihlalinde Orta Hakem sporcuyu derhal diskalifiye edebilir.",
      en: "31.1: TREATMENT OF FOULS\nAn Athlete who commits a foul may, at the Referee's discretion, be Cautioned, Warned or Disqualified without a prior Warning.\n31.1.1: CAUTION\nA Caution is a verbal admonishment used to check a less serious infringement or prevent undesirable conduct. The contest need not be stopped; it is given at a safe opportunity with the appropriate physical signal. Three Cautions for the same offence result in a Warning. Many different Cautions may result in a Warning for unsportsmanlike conduct.\n31.1.2: WARNING\nFor a repeated or serious infringement, the Referee stops the contest, clearly demonstrates the offence, informs the Jury and signals the Warning to the Athlete and Judges. Once a Warning has been given for an offence, a Caution cannot later be used for the same type; another Warning is issued. Three Warnings in one contest result in disqualification.\n31.1.3: DISQUALIFICATION (DQ)\nFor a major or dangerous infringement, the Referee may immediately disqualify an Athlete."
    },
    when: { tr: "Tüm faul değerlendirmeleri.", en: "All foul assessments." },
    right: { tr: "Aynı ihlalden 3 İkaz → 1 İhtar. Bir maçta 3 İhtar → DQ.", en: "3 Cautions for the same foul → 1 Warning. 3 Warnings in a match → DQ." },
    wrong: { tr: "İhtarı sessizce vermek; İkaz için maçı gereksiz durdurmak.", en: "Giving a Warning silently; stopping the match unnecessarily for a Caution." },
    related: ["FOUL_3WARN", "FOUL_TYPES"],
    tags: ["ikaz", "ihtar", "caution", "warning", "dq", "diskalifiye", "31.1"]
  },
  {
    id: "FOUL_3WARN", module: "faul", subtopic: "fauller", label: "ifma",
    rule: "31.1.2", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "3 İhtar: Diskalifiye", en: "3 Warnings: Disqualification" },
    quick: {
      tr: "Bir sporcu bir maç boyunca 3 İhtar (Warning) alırsa diskalifiye edilir.",
      en: "An athlete who receives 3 Warnings in a match is disqualified."
    },
    ruleText: {
      tr: "31.1.2: İHTAR\nBir sporcuya aynı ihlal için bir kez İhtar verildikten sonra aynı tür ihlalde İkaz uygulanamaz; tekrarında doğrudan İhtar verilir. Bir sporcunun bir maç boyunca üç İhtar alması hâlinde sporcu diskalifiye edilir.",
      en: "31.1.2: WARNINGS\nOnce a Warning has been administered for an infringement, a Caution cannot be issued for the same type of offence. If an Athlete receives three Warnings in a contest, the Athlete is disqualified."
    },
    when: { tr: "Tüm dövüş kategorileri.", en: "All combat categories." },
    right: { tr: "İhtarları Jüriye bildir ve işaretle; 3'te DQ uygula.", en: "Report Warnings to the jury and signal; apply DQ on the 3rd." },
    wrong: { tr: "İhtarları takip etmemek.", en: "Not keeping track of Warnings." },
    related: ["FOUL_CLASS"],
    tags: ["ihtar", "3 ihtar", "warning", "dq", "31.1.2"]
  },
  {
    id: "FOUL_COUNT_THAI", module: "faul", subtopic: "sayim", label: "ifma",
    rule: "32.2", revision: "2026-05-11", status: A,
    discipline: ["full"], age: [], gender: [], role: ["ref"],
    media: { photo: false, video: true, animation: false },
    title: { tr: "Tayca Sayım", en: "Thai Count" },
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
    id: "FOUL_RULE8", module: "faul", subtopic: "sayim", label: "ifma",
    rule: "32.4", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Zorunlu 8'e Kadar Sayım", en: "Mandatory Count to 8" },
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
    id: "FOUL_KO", module: "faul", subtopic: "sayim", label: "ifma",
    rule: "32.5", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: false, video: true, animation: false },
    title: { tr: "Nakavt (KO): 10 Sayımı", en: "Knockout (KO): The 10 Count" },
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
    id: "FOUL_KNOCKDOWN", module: "faul", subtopic: "sayim", label: "ifma",
    rule: "32.1", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref", "judge"],
    media: { photo: true, video: true, animation: false },
    title: { tr: "Knockdown (Yere Serilme)", en: "Knockdown" },
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
    id: "FOUL_DECISIONS", module: "faul", subtopic: "kararlar", label: "ifma",
    rule: "30.1–30.8", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref", "judge", "jury"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Maç Kararları", en: "Contest Decisions" },
    quick: {
      tr: "Karar koduna dokunarak tam adını, ilgili kural maddesini ve uygulanacağı durumu açabilirsiniz.",
      en: "Select a decision code to open its full name, governing article and application."
    },
    decisionItems: [
      { code: "KOH", alias: "KO-H", rule: "30.3.1", full: { tr: "Kafa Darbesiyle Nakavt", en: "Knock-Out by Head Strike" }, detail: { tr: "Kafa bölgesine alınan sert darbeler sporcuyu savunmasız ve devam edemez duruma getirir; sporcu SIB (10) sayımında maça devam edemez.", en: "Hard head blows render the Athlete defenceless and unable to continue; the Athlete cannot resume by SIB (10)." } },
      { code: "KOB", alias: "KO-B", rule: "30.3.2", full: { tr: "Vücut Darbesiyle Nakavt", en: "Knock-Out by Body Strike" }, detail: { tr: "Kafa dışındaki bir bölgeye alınan sert darbe sporcuyu savunmasız ve devam edemez duruma getirir; sporcu SIB (10) sayımında maça devam edemez.", en: "A hard strike to the body, excluding the head, renders the Athlete defenceless and unable to resume by SIB (10)." } },
      { code: "RSCH", rule: "30.2.3", full: { tr: "Kafa Darbesi Nedeniyle Hakem Kararıyla Maçın Bitmesi", en: "Referee Stops Contest – Head Strike" }, detail: { tr: "Kafa bölgesine alınan sert darbeler sporcuyu savunmasız ve devam edemez hâle getirir. Yalnızca açık biçimde geride kalan ve puan vuruşları alan sporcu için kullanılmaz.", en: "Hard head strikes render the Athlete defenceless and unable to continue. It is not used merely because an Athlete is outclassed and receiving scoring hits." } },
      { code: "RSCB", rule: "30.2.4", full: { tr: "Vücut Darbesi Nedeniyle Hakem Kararıyla Maçın Bitmesi", en: "Referee Stops Contest – Body Strike" }, detail: { tr: "Kafa dışındaki bir vücut bölgesine alınan sert darbe sporcuyu savunmasız ve devam edemez duruma getirir.", en: "A hard strike to any part of the body except the head renders the Athlete defenceless and unable to continue." } },
      { code: "RSCS", rule: "30.2.1", full: { tr: "Güvenlik Nedeniyle Hakem Kararıyla Maçın Bitmesi", en: "Referee Stops Contest – Safety" }, detail: { tr: "Sporcu tehlikedeyse, aşırı cezaya veya sert vuruşlara maruz kalıyor ve kendisini koruyamıyorsa maç durdurulur; rakibi kazanan ilan edilir.", en: "The contest is stopped when an Athlete is in danger, receiving excessive punishment or hard strikes and cannot protect themselves; the opponent wins." } },
      { code: "RSCI", rule: "30.2.2", full: { tr: "Yaralanma Nedeniyle Hakem Kararıyla Maçın Bitmesi", en: "Referee Stops Contest – Injury" }, detail: { tr: "Yasal vuruş, başka bir hareket veya fiziksel neden sebebiyle sporcu devam edemiyorsa maç durdurulur. Ciddi yaralanmada Orta Hakem derhal RSCI verir ve tıbbi değerlendirme ister.", en: "The contest is stopped when injury from legal strikes, other action or another physical reason makes the Athlete unfit to continue. Apparent serious injury requires immediate RSCI and medical assessment." } },
      { code: "RSC", rule: "30.2", full: { tr: "Hakem Kararıyla Maçın Bitmesi", en: "Referee Stops Contest" }, detail: { tr: "Güvenlik, yaralanma, kafa darbesi, vücut darbesi veya zorunlu sayma limitinde Orta Hakemin müsabakayı bitirdiği üst karar grubudur.", en: "The decision family used when the Referee stops the contest for safety, injury, head strike, body strike or the compulsory count limit." } },
      { code: "WP", rule: "30.1", full: { tr: "Puanlama ile Galibiyet", en: "Win on Points" }, detail: { tr: "Maç sonunda Yan Hakemlerin çoğunluğunun karar verdiği sporcu kazanır. Her iki sporcu aynı anda devam edemezse durdurma anına kadar kaydedilen puanlar esas alınır.", en: "The Athlete awarded the decision by a majority of Judges wins. If both cannot continue, points recorded up to the stoppage determine the winner." } },
      { code: "CCL", rule: "30.2.5", full: { tr: "Zorunlu Sayma Limiti", en: "Compulsory Count Limit" }, detail: { tr: "Kategori için belirlenen aynı raund veya toplam müsabaka sayım sınırına ulaşıldığında Orta Hakem maçı bitirir. Sayımın CCL'ye girmesi için Muaythai tekniği sonucu başlaması gerekir.", en: "The Referee stops the contest when the prescribed same-round or whole-contest count limit is reached. A count qualifies only when initiated by a Muaythai skill." } },
      { code: "RET", rule: "30.4", full: { tr: "Maçtan Çekilme ile Galibiyet", en: "Win by Retirement" }, detail: { tr: "Sporcu dinlenmeden sonra köşesinden çıkmazsa, sayım sonrasında devam etmek istemezse veya Köşe Görevlisi onun adına çekilirse rakibi kazanır.", en: "The opponent wins when the Athlete does not leave the corner after the rest, refuses to continue after a count or is retired by the Second." } },
      { code: "DQ", rule: "30.5", full: { tr: "Diskalifiye ile Galibiyet", en: "Win by Disqualification" }, detail: { tr: "Bir sporcu diskalifiye edildiğinde rakibi kazanan ilan edilir. Her iki sporcu diskalifiye edilirse karar buna göre açıklanır.", en: "When an Athlete is disqualified, the opponent wins. If both Athletes are disqualified, the decision is announced accordingly." } },
      { code: "WO", alias: "QO", rule: "30.6", full: { tr: "Hükmen Galibiyet", en: "Win by Walk-Over" }, detail: { tr: "Hazır sporcu ringdeyken rakibi anons, gong ve azami iki dakika sonrasında ringe çıkmazsa ringdeki sporcu hükmen kazanır. IFMA talimatındaki resmî kod WO'dur; QO arama alternatifi olarak gösterilir.", en: "If a fully prepared Athlete is in the ring and the opponent fails to appear after the announcement, bell and a maximum of two minutes, the Athlete present wins. WO is the official IFMA code; QO is shown only as a search alias." } },
      { code: "NC", rule: "30.7", full: { tr: "Geçersiz Maç", en: "No Contest" }, detail: { tr: "Ring hasarı, ışık arızası veya olağanüstü hava gibi tarafların kontrolü dışındaki olay en fazla 10 dakikada çözülemezse maç geçersiz ilan edilir.", en: "If an external event such as ring damage, lighting failure or exceptional weather cannot be resolved within a maximum of 10 minutes, the contest is declared No Contest." } },
      { code: "DRAW", rule: "30.8", full: { tr: "Beraberlik", en: "Draw" }, detail: { tr: "Yalnızca iki kulüp veya ülkenin beraberliğe izin vermeyi kabul ettiği gösteri maçlarında, Yan Hakemlerin çoğunluğu eşit puan verdiğinde uygulanabilir.", en: "Permitted only in exhibition matches where the two clubs or nations agree to allow a draw and the majority of Judges score the contest equally." } }
    ],
    related: ["FOUL_CCL", "FOUL_APPEAL", "REF_ENDMATCH"],
    tags: ["maç kararı", "koh", "kob", "ko-h", "ko-b", "rsc", "rscs", "rsci", "rsch", "rscb", "wp", "ccl", "ret", "dq", "wo", "qo", "nc", "draw", "30"]
  },
  {
    id: "FOUL_CCL", module: "faul", subtopic: "kararlar", label: "ifma",
    rule: "30.2.5", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Zorunlu Sayma Limiti (CCL)", en: "Compulsory Count Limit (CCL)" },
    quick: {
      tr: "Kategoriye göre sayım limitine ulaşınca Hakem maçı bitirir. U24/Elite/35+: raundda 3 veya toplam 4 • U18/V40+/V45+: raundda 2 veya toplam 3 • U8–U16: toplam 2 sayım.",
      en: "The referee ends the match when the category count limit is reached. U24/Elite/35+: 3 in a round or 4 total • U18/V40+/V45+: 2 in a round or 3 total • U8–U16: 2 total."
    },
    ruleText: {
      tr: "30.2.5: ZORUNLU SAYMA LİMİTİ (CCL)\nOrta Hakem, müsabaka kategorisine bağlı sayım sınırına ulaşıldığında maçı bitirir.\n• U24, Elite ve Büyükler 35+: aynı raundda 3 veya maç boyunca toplam 4 sayım.\n• U18, Veteranlar 40+ ve Veteranlar 45+: aynı raundda 2 veya maç boyunca toplam 3 sayım.\n• U8, U10, U12, U14 ve U16: maç boyunca toplam 2 sayım.\nTüm kategorilerde bir sayımın CCL kapsamında değerlendirilmesi için sayımın bir Muaythai tekniği sonucunda başlaması zorunludur.",
      en: "30.2.5: COMPULSORY COUNT LIMIT (CCL)\nThe Referee stops the contest when the prescribed count limit for the division is reached.\n• U24, Elite and Masters 35+: 3 counts in the same round or 4 in the whole contest.\n• U18, Masters 40+ and Masters 45+: 2 counts in the same round or 3 in the whole contest.\n• U8, U10, U12, U14 and U16: 2 counts in the whole contest.\nIn every division, a count qualifies for CCL only when initiated by a Muaythai skill."
    },
    when: { tr: "Kategoriye bağlı — üstteki Kategori Özeti bunu senin seçimine göre gösterir.", en: "Category-dependent — the Category Summary shows this for your selection." },
    right: { tr: "Sayımın CCL'e sayılması için bir Muaythai vuruşu sonucu olması gerekir.", en: "A count only counts toward CCL if it results from a Muaythai strike." },
    wrong: { tr: "Kategori limitini karıştırmak; yanlış limitte maçı bitirmek/sürdürmek.", en: "Confusing the category limit; ending/continuing at the wrong limit." },
    related: ["FOUL_DECISIONS", "CAT_CCL"],
    tags: ["ccl", "sayma limiti", "compulsory count", "30.2.5"]
  },
  {
    id: "FOUL_OUTRING", module: "faul", subtopic: "sayim", label: "ifma",
    rule: "30.10", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref"],
    media: { photo: false, video: true, animation: false },
    title: { tr: "Ring Dışına Düşme (20 Sayımı)", en: "Fall Out of the Ring (20 Count)" },
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
    id: "FOUL_TYPES", module: "faul", subtopic: "fauller", label: "ifma",
    rule: "31.2–31.2.27", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref", "judge"],
    media: { photo: false, video: true, animation: false },
    title: { tr: "Faul Türleri", en: "Types of Fouls" },
    quick: {
      tr: "Kural 31.2'deki 27 faul, talimattaki madde sırasıyla ve eksiksiz olarak listelenmiştir. Uygulamalı videolar sonraki aşamada eklenecektir.",
      en: "All 27 fouls in Rule 31.2 are listed in official article order. Practical videos will be added in a later phase."
    },
    ruleText: {
      tr: "31.2: FAUL TÜRLERİ\nSporcunun aşağıdaki hareketleri kasıtlı olarak işlemesi fauldür.",
      en: "31.2: TYPES OF FOULS\nThe following intentional acts by an Athlete are fouls."
    },
    foulItems: [
      { number: "31.2.1", tr: "Rakibi ısırmak, kafa atmak veya rakibe tükürmek.", en: "Biting, head-butting or spitting at an opponent." },
      { number: "31.2.2", tr: "Başparmakla rakibin gözlerine baskı uygulamak.", en: "Pressing on the opponent's eyes with the thumb." },
      { number: "31.2.3", tr: "Kasıtlı olarak çene kullanarak rakibin yüzünü ezmek.", en: "Intentionally using the chin to rub an opponent's face." },
      { number: "31.2.4", tr: "Rakibin ağzını ve burnunu kapatarak kasıtlı olarak boğmaya veya nefessiz bırakmaya çalışmak.", en: "Intentionally smothering or suffocating an opponent by covering the mouth and nose." },
      { number: "31.2.5", tr: "Ekipmanları kasıtlı olarak çıkarmak, çözmek veya yerini değiştirmek.", en: "Intentionally removing, unfastening or displacing equipment." },
      { number: "31.2.6", tr: "Dişliği kasıtlı olarak tükürmek veya ağızdan çıkarmak.", en: "Intentionally expelling or removing the gum shield." },
      { number: "31.2.7", tr: "Muaythai dışı bir teknikle rakibi kasıtlı olarak yere çarpmaya çalışmak; Muaythai tekniği kullanmadan üç temas noktası oluşturarak süpürmek, kalçayla fırlatmak veya gövde ya da bacaklara sarılarak düşürmek buna dahildir.", en: "Intending to impact the opponent with the canvas using a non-Muaythai technique, including a three-point-contact trip without a Muaythai skill, a hip throw or tackling the body or legs." },
      { number: "31.2.8", tr: "Baldır, ayak bileği veya topuk kullanarak rakibin bacaklarını kilitlemek veya hareketsiz bırakmak.", en: "Hooking or immobilising the opponent's legs using the calf, ankle or heel." },
      { number: "31.2.9", tr: "Rakibi gövdesinden tutarak havaya kaldırmak.", en: "Lifting an opponent by the body." },
      { number: "31.2.10", tr: "Rakibin kol, bacak, baş/boyun veya sırt eklemlerini kilitlemek ya da aşırı baskı uygulamak.", en: "Locking or hyperextending the opponent's arm, leg, head/neck or back joints." },
      { number: "31.2.11", tr: "İpleri tutarak vuruş yapmak veya iplerden kural dışı şekilde yararlanmak.", en: "Striking while holding the ropes or making unfair use of the ropes." },
      { number: "31.2.12", tr: "Yerde yatan rakibin üzerine düşmek.", en: "Falling onto an opponent who is lying on the floor." },
      { number: "31.2.13", tr: "Yerde olan veya ayağa kalkmakta olan rakibe vurmak.", en: "Striking an opponent who is down or in the act of rising." },
      { number: "31.2.14", tr: "Ayaklar dışındaki bir vücut parçası yere temas ederken vuruş yapmak.", en: "Striking while any body part other than the feet touches the floor." },
      { number: "31.2.15", tr: "Rakibin ayağa kalkmasını veya ringe geri girmesini engellemek.", en: "Obstructing an opponent from rising or re-entering the ring." },
      { number: "31.2.16", tr: "Çift blokla tamamen pasif savunma yapmak veya darbe almamak için kasıtlı olarak yere düşmek.", en: "Using completely passive double-cover defence or intentionally falling to avoid a hit." },
      { number: "31.2.17", tr: "Muaythai tekniğiyle darbe almaktan kaçınmak için müsabaka alanını kasıtlı olarak terk etmek.", en: "Intentionally leaving the Contest Area to avoid being struck by a Muaythai skill." },
      { number: "31.2.18", tr: "Rakibin kasık bölgesine veya boyun omurlarına vurmak. Kasıtsız darbede sporcu devam edemiyorsa Orta Hakem sayım yapabilir veya üç dakikaya kadar dinlenme verebilir; sporcu üç dakika sonunda devam etmeyi reddederse rakibi kazanır.", en: "Striking the opponent's groin or cervical spine. For an unintentional strike leaving the Athlete unable to continue, the Referee may count or allow up to three minutes' rest; refusal to resume after three minutes results in the opponent winning." },
      { number: "31.2.19", tr: "Muaythai tekniğiyle vuruş yapmadan rakibin bacağını tutup herhangi bir yönde iki adımdan fazla ileri itmek.", en: "Holding the opponent's leg and pushing forward more than two steps in any direction without striking with a Muaythai skill." },
      { number: "31.2.20", tr: "Raund bittikten sonra rakibe vurmak.", en: "Striking an opponent after the round has ended." },
      { number: "31.2.21", tr: "Orta Hakemin YOOT veya YAEK komutuna uymamak ve geri adım atmamak.", en: "Not following the Referee's YOOT or YAEK command and failing to step back." },
      { number: "31.2.22", tr: "YOOT veya YAEK komutundan sonra Orta Hakem CHOCK demeden rakibe vurmaya teşebbüs etmek.", en: "Attempting to strike before CHOCK after the command YOOT or YAEK." },
      { number: "31.2.23", tr: "Müsabaka sırasında gereksiz, agresif veya kırıcı/hakaret içerikli sözler söylemek.", en: "Making useless, aggressive or offensive utterances during the contest." },
      { number: "31.2.24", tr: "Herhangi bir zamanda Orta Hakeme saldırmak veya agresif davranmak.", en: "Assaulting or behaving aggressively towards the Referee at any time." },
      { number: "31.2.25", tr: "Sporcuya sprey şişesi dışında bir yöntemle su uygulamak.", en: "Applying water to an Athlete by means other than a spray bottle." },
      { number: "31.2.26", tr: "Raund arası dinlenmede aşırı su kullanarak sonraki raundun başlamasını geciktirmek.", en: "Using excessive water during the rest and delaying the next round." },
      { number: "31.2.27", tr: "WADA veya IFMA Anti-Doping Kuralları tarafından yasaklanan herhangi bir maddeyi kullanmak.", en: "Using any substance prohibited by WADA or the IFMA Anti-Doping Code." }
    ],
    related: ["FOUL_CLASS", "CAT_LIMIT", "JUDGE_NONSCORING"],
    tags: ["27 faul", "faul türleri", "ısırma", "kafa atma", "dişlik", "ip", "yerde vurmak", "kasık", "boyun", "yo ot", "yaek", "chock", "wada", "31.2"]
  },
  {
    id: "FOUL_APPEAL", module: "faul", subtopic: "kararlar", label: "ifma",
    rule: "30.12", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["jury"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "İtiraz Prosedürü", en: "Protest Procedure" },
    quick: {
      tr: "İtiraz, karardan sonra 30 dk içinde (altın madalya maçında 5 dk) Takım Yöneticisi tarafından yazılı ve 500 USD ücretle yapılır.",
      en: "An appeal is filed within 30 min of the decision (5 min for a gold-medal bout) by the Team Manager, in writing, with a 500 USD fee."
    },
    ruleText: {
      tr: "30.12: İTİRAZLAR\nİtiraz, karar açıklandıktan sonra 30 dakika içinde; altın madalya maçında ise 5 dakika içinde Takım Yöneticisi tarafından yapılır. Yazılı itiraz, 500 ABD doları ücretle birlikte Teknik Delegeye veya Başhakeme teslim edilir. Jüri incelemeyi kabul ederse gerekli işlemler yapılabilir. İtiraz haklı bulunursa 100 ABD doları idari kesinti yapılarak kalan ücret iade edilir. Karar korunur ve itiraz reddedilirse ücret iade edilmez; IFMA veya Kıtasal Federasyonda kalır.",
      en: "30.12: PROTESTS\nA protest is lodged by the Team Manager within 30 minutes after the decision, or within 5 minutes for a gold-medal contest. The written protest is handed to the Technical Delegate or Chairman of the Jury with a USD 500 fee. If the Jury agrees to review, necessary action may be taken. If upheld, the fee is refunded after a USD 100 administration deduction. If the decision is upheld and the protest rejected, the fee is not refunded and remains with IFMA or the Continental Federation."
    },
    when: { tr: "Karar açıklandıktan sonra.", en: "After the decision is announced." },
    right: { tr: "Kabul edilirse 100 USD idari kesinti, kalan iade; reddedilirse ücret iade edilmez.", en: "If upheld, 100 USD admin kept, rest refunded; if rejected, fee retained." },
    wrong: { tr: "Süre veya ücret şartını atlamak.", en: "Skipping the deadline or fee requirement." },
    related: ["OFF_JURY"],
    tags: ["itiraz", "appeal", "500 usd", "30.12"]
  },
  {
    id: "FOUL_DOUBLE_KD", module: "faul", subtopic: "sayim", label: "ifma",
    rule: "32.8", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref", "judge"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Çifte Knockdown", en: "Double Knockdown" },
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
    id: "FOUL_POSTSANCTION", module: "faul", subtopic: "fauller", label: "ifma",
    rule: "31.6–31.6.4", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["jury"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Maç Sonrası Yaptırımlar", en: "Post-Competition Sanctions" },
    quick: {
      tr: "Isırma, kafa atma veya yerdeki sporcuya vurma gibi ciddi/tehlikeli faullerde, maç içi cezaya ek olarak maç sonrası yaptırım uygulanabilir.",
      en: "For serious/dangerous fouls such as biting, headbutting or striking a downed athlete, sanctions may follow after the contest in addition to in-bout penalties."
    },
    ruleText: {
      tr: "31.6: MÜSABAKA SONRASI YAPTIRIMLAR\nIsırma, kafa atma veya yerdeki sporcuya vurma gibi ciddi ya da tehlikeli bir faulde, maç içi cezalara ek olarak maç sonrası işlem uygulanabilir.\n31.6.1: İNCELEME SÜRECİ\nIFMA Teknik Komitesi maç görüntülerini ve raporunu inceleyebilir. Sonraki yaptırım IFMA Yönetim Kurulunun nihai onayına tabidir.\n31.6.2: YAPTIRIMLAR\nYaptırımlar; genellikle 6–9 ay müsabakadan men, gerekli hukuki ve tıbbi masraflar için genellikle 1.000–5.000 ABD doları para cezası, sıralama/unvan/ödül kaybı ve zorunlu yeniden eğitim veya disiplin eğitimini kapsayabilir.\n31.6.3: BİLDİRİM\nYaptırım, etkinlikten sonra makul süre içinde sporcuya ve Ulusal Federasyona yazılı bildirilir.\n31.6.4: İTİRAZ HAKKI\nSporcu, IFMA Disiplin ve İtiraz Kuralları uyarınca yaptırıma itiraz edebilir.",
      en: "31.6: POST-COMPETITION SANCTIONS\nFor a serious or dangerous foul such as biting, headbutting or striking a downed Athlete, further action may follow in addition to in-bout penalties.\n31.6.1: REVIEW PROCESS\nThe IFMA Technical Committee may review bout footage and the bout report. Any further sanction requires final approval from the IFMA Executive Committee.\n31.6.2: SANCTIONS\nSanctions may include a suspension typically lasting 6–9 months, fines typically ranging from USD 1,000–5,000 for legal and medical costs, removal from rankings/titles/awards and mandatory retraining or disciplinary education.\n31.6.3: NOTIFICATION\nThe Athlete and National Federation are formally notified in writing within a reasonable period after the event.\n31.6.4: RIGHT OF APPEAL\nThe Athlete may appeal under the IFMA Disciplinary and Appeals Code."
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
    title: { tr: "Muaythai Müsabakalarında Raundlar", en: "Rounds in Muaythai Competitions" },
    quick: {
      tr: "Tüm kategoriler 3 raund üzerinden oynanır. Raund süresi kategoriye göre 1–3 dakika; dinlenme Masters kategorilerinde 1,5 dakika, diğer kategorilerde 1 dakikadır.",
      en: "All categories compete over 3 rounds. Round duration varies from 1 to 3 minutes; rest is 1.5 minutes for Masters divisions and 1 minute for all other divisions."
    },
    ruleText: {
      tr: "KURAL 7: MUAYTHAI MÜSABAKALARINDA RAUNDLAR\nBir uyarı, ikaz, kıyafet veya ekipmanın düzeltilmesi ya da başka herhangi bir nedenle müsabakanın Orta Hakem tarafından durdurulması raund süresine dahil edilmez. Ek raund verilemez. Teknik Delege, yalnızca seçilmiş çoklu spor etkinliklerinde ve IFMA Yönetim Kurulunun onayına tabi olmak üzere bu formatları değiştirebilir.\nMasters 40+ ve 45+: 3 raund × 2 dakika; 1,5 dakika dinlenme.\nMasters 35+: 3 raund × 3 dakika; 1,5 dakika dinlenme.\nElite ve U24: 3 raund × 3 dakika; 1 dakika dinlenme.\nU18 ve U16: 3 raund × 2 dakika; 1 dakika dinlenme.\nU14: 3 raund × 1,5 dakika; 1 dakika dinlenme.\nU12, U10 ve U8: 3 raund × 1 dakika; 1 dakika dinlenme.",
      en: "RULE 7: ROUNDS FOR MUAYTHAI COMPETITION\nStopping of the contest by the Referee for a Warning, Caution, putting clothing or equipment into order or for any other reason is not included in the period of the round. No additional round may be given. The Technical Delegate may adjust these formats for selected multi-sport events only, subject to approval by the IFMA Executive Committee.\nMasters 40+ and 45+: 3 rounds × 2 minutes; 1.5 minutes rest.\nMasters 35+: 3 rounds × 3 minutes; 1.5 minutes rest.\nElite and U24: 3 rounds × 3 minutes; 1 minute rest.\nU18 and U16: 3 rounds × 2 minutes; 1 minute rest.\nU14: 3 rounds × 1.5 minutes; 1 minute rest.\nU12, U10 and U8: 3 rounds × 1 minute; 1 minute rest."
    },
    when: { tr: "Kategori seçimine göre — Kategori Özeti tam değeri gösterir.", en: "By category — the Category Summary shows the exact value." },
    right: { tr: "Hakem duraklatmaları raund süresine eklenmez; ek raund verilmez.", en: "Referee stoppages are not added to round time; no extra round is given." },
    wrong: { tr: "Kategoriye göre süreyi karıştırmak.", en: "Confusing the round time for the category." },
    roundsTable: {
      title: { tr: "Kategori Bazlı Raund Tablosu", en: "Category Round Table" },
      categoryLabel: { tr: "Kategori", en: "Category" },
      durationLabel: { tr: "Raund Süresi", en: "Round Duration" },
      roundsLabel: { tr: "Raundlar", en: "Rounds" },
      restLabel: { tr: "Dinlenme Süresi", en: "Rest Duration" },
      rows: [
        { categories: { tr: "Masters 40+ · Masters 45+", en: "Masters 40+ · Masters 45+" }, duration: { tr: "2 dakika", en: "2 minutes" }, rounds: 3, rest: { tr: "1,5 dakika", en: "1.5 minutes" } },
        { categories: { tr: "Masters 35+", en: "Masters 35+" }, duration: { tr: "3 dakika", en: "3 minutes" }, rounds: 3, rest: { tr: "1,5 dakika", en: "1.5 minutes" } },
        { categories: { tr: "Elite · U24", en: "Elite · U24" }, duration: { tr: "3 dakika", en: "3 minutes" }, rounds: 3, rest: { tr: "1 dakika", en: "1 minute" } },
        { categories: { tr: "U18 · U16", en: "U18 · U16" }, duration: { tr: "2 dakika", en: "2 minutes" }, rounds: 3, rest: { tr: "1 dakika", en: "1 minute" } },
        { categories: { tr: "U14", en: "U14" }, duration: { tr: "1,5 dakika", en: "1.5 minutes" }, rounds: 3, rest: { tr: "1 dakika", en: "1 minute" } },
        { categories: { tr: "U12 · U10 · U8", en: "U12 · U10 · U8" }, duration: { tr: "1 dakika", en: "1 minute" }, rounds: 3, rest: { tr: "1 dakika", en: "1 minute" } }
      ],
      note: {
        tr: "U8 ve U10 yaş kategorileri yalnızca Muaythai Teknik (Tatami) branşında uygulanır.",
        en: "The U8 and U10 age categories apply only in the Muaythai Technical (Tatami) discipline."
      }
    },
    related: ["REF_TIME"],
    tags: ["raund", "round", "süre", "dinlenme", "3 raund", "kural 7"]
  },
  {
    id: "CAT_LIMIT", module: "kategori", subtopic: "kisitli", label: "ifma",
    rule: "31.3", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: [],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Kategori Bazlı Kısıtlı Vuruşlar", en: "Category-based Restricted Strikes" },
    quick: {
      tr: "U16 ve üzeri kategorilerde kısıtlama yoktur. U14'te kafaya dirsek veya diz, U12 ve altındaysa kafaya her türlü vuruş yasaktır.",
      en: "There are no restrictions in U16 and older divisions. Elbows and knees to the head are prohibited in U14; all head strikes are prohibited in U12 and below."
    },
    ruleText: {
      tr: "31.3: KATEGORİLERE GÖRE KISITLANMIŞ VURUŞLAR\nBelirli bir kategoride kısıtlanmış veya yasaklanmış bir Muaythai tekniğinin kullanılması faul olarak kabul edilir.\nVeteranlar 40+ ve 45+, Büyükler 35+, Elite, U24, U18 ve U16: Kısıtlama yoktur.\nU14: Kafaya dirsek veya diz vuruşu yapılamaz.\nU12, U10 ve U8: Kafaya vuruş yapılamaz.",
      en: "31.3: RESTRICTED STRIKES BY DIVISION\nUse of a restricted Muaythai skill in a given division is considered a foul.\nMasters 40+ and 45+, Masters 35+, Elite, U24, U18 and U16: No restrictions.\nU14: No elbow or knee strikes to the head.\nU12, U10 and U8: No strikes to the head."
    },
    when: { tr: "Kategori seçimine göre.", en: "By category selection." },
    right: { tr: "U14 kafaya diz/dirsek yok; U12 ve altı kafaya vuruş yok.", en: "U14 no knee/elbow to head; U12 and below no head strikes." },
    wrong: { tr: "Kısıtı sporcuya hatırlatmadan maça başlamak.", en: "Starting without reminding the athlete of the limit." },
    related: ["FOUL_TYPES"],
    tags: ["kısıt", "kafa", "u14", "u12", "31.3"]
  },
  {
    id: "CAT_CCL", module: "kategori", subtopic: "ccl", label: "ifma",
    rule: "30.2.5", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: [],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Zorunlu Sayma Limiti (CCL)", en: "Compulsory Count Limit (CCL)" },
    quick: {
      tr: "Limitler kategoriye göre sırasıyla 3/4, 2/3 ve 2/2'dir. İlk sayı aynı raunddaki, ikinci sayı tüm müsabakadaki toplam sayım limitidir.",
      en: "The limits are 3/4, 2/3 and 2/2 by division. The first number is the same-round limit; the second is the whole-contest limit."
    },
    ruleText: {
      tr: "30.2.5: ZORUNLU SAYMA LİMİTİ (CCL)\nOrta Hakem, müsabaka kategorisine bağlı olarak belirlenen sayma limitine ulaşıldığında maçı bitirir.\nU24, Elite ve Büyükler 35+: Aynı raundda 3 veya müsabaka boyunca toplam 4 sayım.\nU18, Veteranlar 40+ ve Veteranlar 45+: Aynı raundda 2 veya müsabaka boyunca toplam 3 sayım.\nU8, U10, U12, U14 ve U16: Aynı raundda 2 veya müsabaka boyunca toplam 2 sayım.\nTüm kategorilerde bir sayımın CCL kapsamında değerlendirilebilmesi için bu sayımın bir Muaythai tekniği sonucunda başlamış olması zorunludur.",
      en: "30.2.5: COMPULSORY COUNT LIMIT (CCL)\nThe Referee stops the contest when the prescribed limit of counts has been reached, depending on the division.\nU24, Elite and Masters 35+: 3 counts in the same round or 4 counts in the whole contest.\nU18, Masters 40+ and Masters 45+: 2 counts in the same round or 3 counts in the whole contest.\nU8, U10, U12, U14 and U16: 2 counts in the same round or 2 counts in the whole contest.\nIn all divisions, for a count to be considered part of the CCL, it must be initiated by a Muaythai skill."
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
    title: { tr: "Yaş Kategorileri", en: "Age Categories" },
    quick: {
      tr: "Yaş uygunluğu takvim yılı sistemine göre belirlenir. Dövüş: U8, U10, U12, U14, U16, U18, U24, Elite, Büyükler 35+, Veteranlar 40+, Veteranlar 45+. Kültürel kategorilerde ayrıca Veteranlar 50+ ve 60+ vardır.",
      en: "Age eligibility is set by the calendar-year system. Combat: U8, U10, U12, U14, U16, U18, U24, Elite, Masters 35+, Masters 40+, Masters 45+. Cultural categories also add Masters 50+ and 60+."
    },
    ruleText: {
      tr: "KURAL 5: SPORCULAR İÇİN ASGARİ VE AZAMİ YAŞ SINIRI\n5.1: YAŞ SINIRLARI\nTüm kategorilerde yaş uygunluğu takvim yılı sistemi kullanılarak belirlenir.\n5.1.1: Kesim Tarihi\nResmî kesim tarihi, müsabaka yılının 31 Aralık günüdür.\n5.1.2: Doğum Yılı\nSporcunun kategorisi yalnızca doğum yılına göre belirlenir.\n5.1.3: Müsabaka Yılı\nBu kurallar bakımından müsabaka yılı 1 Ocak'tan 31 Aralık'a kadar olan süreyi kapsar.\n5.2: MÜSABAKA GELİŞİM YOLLARI\nSporcular; Elite (Olimpik performans), Gelişim (U kategorileri) veya Masters (elit sonrası ya da müsabakaya dönüş) gelişim yollarından birine katılır. Bir sporcu her müsabakada yalnızca bir gelişim yoluna kayıt yaptırabilir.\n5.3: YAŞ KATEGORİLERİ\nVeteranlar 45+: 45–50; Veteranlar 40+: 40–44; Büyükler 35+: 35–39; Elite: 18–40; U24: 18–23; U18: 16–17; U16: 14–15; U14: 12–13; U12: 10–11; U10: 8–9; U8: 6–7.\nSporcular, müsabaka yılı içinde asgari veya azami yaşa ulaşmaları hâlinde ilgili yaş kategorisine uygundur.",
      en: "RULE 5: MINIMUM AND MAXIMUM AGE LIMIT FOR ATHLETES\n5.1: AGE LIMITS\nAge eligibility for all divisions shall be determined using the calendar-year system.\n5.1.1: Cut-off Date\nThe official cut-off date shall be 31 December of the competition year.\n5.1.2: Year of Birth\nAn athlete's division shall be determined exclusively by their year of birth.\n5.1.3: Competition Year\nFor the purpose of these Rules, the competition year runs from 1 January to 31 December.\n5.2: COMPETITION PATHWAYS\nAthletes shall enter the Elite (Olympic performance), Development (U categories) or Masters (post-elite or return-to-competition) pathway. An athlete may only enter one pathway per competition.\n5.3: AGE CATEGORIES\nMasters 45+: 45–50; Masters 40+: 40–44; Masters 35+: 35–39; Elite: 18–40; U24: 18–23; U18: 16–17; U16: 14–15; U14: 12–13; U12: 10–11; U10: 8–9; U8: 6–7.\nAthletes are eligible for an age category if they reach the minimum or maximum age during the competition year."
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
    title: { tr: "Sıkletler", en: "Weight Classes" },
    quick: {
      tr: "Sıklet, yaş ve cinsiyete göre belirlenir. Elite/U24 erkek sıkletleri 45–91+ kg; kadın 45–75+ kg arasındadır. Genç kategorilerde alt sınırlar farklıdır (tam tablo Kural 4).",
      en: "Weight classes are set by age and gender. Elite/U24 male classes run 45–91+ kg; female 45–75+ kg. Youth categories have different lower bounds (full table in Rule 4)."
    },
    ruleText: {
      tr: "KURAL 4: SIKLET SINIFLANDIRMALARI\nSıklet sınıflandırmaları yaş kategorisi ve cinsiyete göre yukarıdaki resmî tabloda gösterilir.\n* 45 kg erkek sıkleti yalnızca seçilmiş çoklu spor etkinliklerine dahil edilmek üzere IFMA Yönetim Kurulunun onayına tabidir.\n** Veteranlar 40+ ve Veteranlar 45+ kategorilerindeki sporcuların +91 kg sıkletine katılmasına izin verilmez.\nSporcular; IFMA Yönetim Kurulunca onaylanan ve uluslararası spor yönetimi standartlarıyla uyumlu, cinsiyete göre ayrılmış ve karma müsabakalara ilişkin IFMA uygunluk kurallarına göre yarışmalıdır.",
      en: "RULE 4: WEIGHT CLASSIFICATIONS\nWeight classifications by age category and gender are shown in the official table above.\n* The 45 kg male class is for inclusion in selected multi-sport events only, subject to approval by the IFMA Executive Committee.\n** Masters 40+ and Masters 45+ athletes are not permitted to take part in the +91 kg class.\nAthletes must compete in accordance with the IFMA eligibility regulations for sex-segregated and mixed competitions, as approved by the IFMA Executive Committee and aligned with applicable international sport governance standards."
    },
    when: { tr: "Kategori ve tartıda.", en: "At category and weigh-in." },
    right: { tr: "Sporcu yalnızca tartıda hak kazandığı siklette yarışır (11.3.1).", en: "An athlete may only compete in the class for which they qualified at the weigh-in (11.3.1)." },
    wrong: { tr: "Yaş+cinsiyete uygun olmayan sıklet tablosunu kullanmak.", en: "Using a weight table not matching the age+gender." },
    related: ["WEIGH_5PCT", "CAT_AGE"],
    tags: ["sıklet", "weight class", "kural 4"]
  },
  /* ===================== YAN HAKEM & PUANLAMA ===================== */
  {
    id: "JUDGE_KRITER", module: "yan", subtopic: "kriterler", label: "ifma",
    rule: "29.1 / 29.2.1", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["judge"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Puanlama Kriterleri", en: "Scoring Criteria" },
    quick: {
      tr: "Geçerli bir Muaythai becerisi; etki yaratma amacıyla kuvvetle uygulanan ve kuralları ihlal etmeden hedefe ulaşan yumruk, tekme, diz veya dirsektir. Raund önce geçerli vuruş sayısına, eşitlikte güç ve etkiye göre değerlendirilir.",
      en: "A scoring Muaythai skill is a punch, kick, knee or elbow applied with force and intent that reaches a scoring target without infringing the rules. A round is judged first by scoring skills and, if equal, by force and effect."
    },
    ruleText: {
      tr: "29.1: MUAYTHAI BECERİLERİNİN PUANLANMASI\nMuaythai tekniği; etki yaratma amacıyla kuvvetle uygulanan yumruk, tekme, diz veya dirsektir. Kuralları ihlal etmeksizin, engellenmeden veya gardda kalmadan puan verici bir hedefe isabet eden her bir Muaythai tekniği için bir (1) puan verilir.\n29.1.1: HEDEF\nMuaythai'de hedef, kasık ve servikal omurga (C1–C7 omurları ile oksipital kemik, yani boynun arka kısmı) hariç vücudun herhangi bir bölümüdür.\n29.2.1: PUAN VERME ADIMLARI\n• İlk olarak; rakibinden daha fazla Muaythai becerisiyle vuruş yapan raundu kazanır.\n• Sporcular arasındaki Muaythai becerisi ile vuruş sayısı farkı 7 veya daha az ise bu küçük bir farktır.\n• Sporcular arasında Muaythai becerisi ile vuruş sayısı farkı 8 ila 14 arasında ise bu açık bir farktır.\n• Sporcular arasında Muaythai becerisi ile vuruş sayısı farkı 15 ila 21 arasında ise bu tam üstünlük olarak kabul edilir.\nSporcular Muaythai Becerisi puanlamasında eşitse: İkinci olarak; rakibine göre daha güçlü/etkili Muaythai becerileri kullanan Sporcu raundu kazanır.\n• Semi Contact (Muaythai Teknik) müsabakalarında değerlendirme, ham güçten ziyade kontrollü hafif temaslı teknik uygulamaya göre yapılır.",
      en: "29.1: SCORING MUAYTHAI SKILL\nA Muaythai skill is a punch, kick, knee or elbow applied with force and intent to cause effect. One score will be awarded for each Muaythai skill that strikes against a scoring target without being blocked, guarded against, or infringing the rules.\n29.1.1: TARGET\nThe Target for Muaythai means any part of the body except the groin and cervical spine (C1–C7 vertebrae, including the occipital bone, referred to as the back of the neck).\n29.2.1: STEPS FOR AWARDING POINTS\n• First, an Athlete wins the round when utilising more scoring Muaythai skills than the opponent.\n• A difference of 7 or less scoring Muaythai skills between the athletes is a small margin.\n• A difference of 8 to 14 scoring Muaythai skills between the athletes is a large margin.\n• A difference of 15 to 21 scoring Muaythai skills between the athletes is a total domination.\nIf the Athletes are equal in scoring Muaythai skill: Second, an Athlete wins the round when using more forceful Muaythai skills than the opponent.\n• Semi Contact (Muaythai Technical): the Athlete wins the round based on effective light-contact execution rather than raw force."
    },
    when: { tr: "Her raundun ve her geçerli tekniğin değerlendirilmesinde.", en: "When assessing every round and every valid technique." },
    right: { tr: "Önce daha fazla geçerli Muaythai becerisini, eşitlikte daha güçlü ve etkili uygulamayı değerlendir.", en: "First assess the greater number of scoring Muaythai skills; if equal, assess the more forceful and effective execution." },
    wrong: { tr: "Yalnızca hareket sayısına, seyirci tepkisine veya başka bir Yan Hakeme bakarak karar vermek.", en: "Deciding only from activity, crowd reaction or another Judge's score." },
    related: ["JUDGE_10PT", "JUDGE_NONSCORING", "JUDGE_NONAWARD"],
    tags: ["puanlama kriterleri", "scoring criteria", "puan verme adımları", "29.1", "29.2.1"]
  },
  {
    id: "JUDGE_10PT", module: "yan", subtopic: "on-puan", label: "ifma",
    rule: "29.2 / 29.2.3", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["judge"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Zorunlu On Puan Sistemi", en: "Ten-Point Must System" },
    quick: {
      tr: "Her raund ayrı puanlanır. En az bir sporcu 10 puan alır; rakibe raund farkına göre 9, 8 veya 7 puan verilir. Küsuratlı puan verilemez.",
      en: "Each round is scored individually. At least one Athlete receives 10 points; the opponent receives 9, 8 or 7 according to the margin. No fraction of points may be given."
    },
    ruleText: {
      tr: "29.2: ZORUNLU ON PUAN SİSTEMİ\nHer raund ayrı ayrı puanlanır (Raund Bazlı Puanlama Sistemi–RbR) ve bu sistemde en az bir sporcuya 10 puan verilir. Küsuratlı puan verilemez.\n29.2.3: RAUNDUN PUANLANMASI\nHer raundun sonunda, daha iyi olan (Muaythai tekniklerini daha iyi uygulayan) Sporcuya 10 puan verilir, rakibine ise orantılı olarak daha az puan (sırasıyla 9, 8 veya 7 puan) verilir.\n• Raund içinde eşitlik söz konusuysa, her iki Sporcuya da 10 puan verilir.\n• Raundu küçük bir farkla kazanan Sporcuya 10 puan, rakibine ise 9 puan verilir.\n• Raundu büyük bir farkla kazanan Sporcuya 10 puan, rakibine ise 8 puan verilir.\n• Raundu tam bir üstünlükle kazanan Sporcuya 10 puan, rakibine ise 7 puan verilir.\n• Yan Hakemler verilen bir İhtar (Warning) konusunda Orta Hakemle aynı fikirdeyse, sporcunun aldığı her bir Ceza için toplam puanından bir (1) puan düşülür.",
      en: "29.2: TEN-POINT MUST SYSTEM\nWhen each round shall be scored individually (Round-by-Round, RbR Scoring System), at least one Athlete shall be awarded 10 points. No fraction of points may be given.\n29.2.3: ASSIGNMENT OF A ROUND'S SCORE\nAt the end of each round, 10 points shall be awarded to the better (more skilful in Muaythai) Athlete, and the opponent proportionately less (9, 8 or 7 respectively).\n• 10 points will be awarded to each Athlete if they are even in the round.\n• 10 points will be awarded to the Athlete who wins the round by a small margin; the opponent will receive 9 points.\n• 10 points will be awarded to the Athlete who wins the round by a large margin; the opponent will receive 8 points.\n• 10 points will be awarded to the Athlete who wins the round by a total domination; the opponent will receive 7 points.\n• The Athlete will have their number of total points reduced by one (1) for each Warning received if the Judges are in agreement with the Warning."
    },
    when: { tr: "Raund Bazlı (RbR) puanlamada.", en: "In Round-by-Round (RbR) scoring." },
    right: { tr: "Küçük fark 10–9, büyük fark 10–8, tam üstünlük 10–7 yazılır. 10–10 yalnızca raundu kazanan sporcu İhtar aldığında verilebilir.", en: "Record a small margin as 10–9, a large margin as 10–8 and total domination as 10–7. A 10–10 score may only be awarded when the round winner receives a Warning." },
    wrong: { tr: "Raundu puanlamadan bırakmak veya küsuratlı puan vermek.", en: "Leaving a round unscored or awarding fractional points." },
    related: ["JUDGE_KRITER", "JUDGE_SBS", "JUDGE_DEDUCT"],
    tags: ["zorunlu on puan", "ten point must", "10-10", "10-9", "10-8", "10-7", "29.2"]
  },
  {
    id: "JUDGE_SBS", module: "yan", subtopic: "puanlama-sistemleri", label: "ifma",
    rule: "29.4", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["judge"],
    media: { photo: true, video: true, animation: false },
    title: { tr: "Eş Zamanlı (Anlık) Puanlama Sistemi", en: "Real-Time Scoring System" },
    quick: {
      tr: "Vuruş Bazlı (SbS) sistemde her geçerli Muaythai becerisi bağımsız puanlanır. Yan Hakem Kırmızı veya Mavi düğmeye basar; çoğunluğun bir saniye içinde onayladığı vuruş skora eklenir.",
      en: "In the Strike-by-Strike (SbS) system each valid Muaythai skill is scored individually. A Judge presses Red or Blue; a strike confirmed by the majority within one second contributes to the score."
    },
    ruleText: {
      tr: "29.4: EŞ ZAMANLI (ANLIK) PUANLAMA SİSTEMİ\nHer Muaythai beceri vuruşunun bağımsız olarak puanlandığı Vuruş Bazlı (SbS) Puanlama Sisteminde, onaylanan her vuruş skora katkı sağlar. SbS Puanlama Sistemi aşağıda tanımlanan iki onaylı moddan biriyle uygulanabilir.\n29.4.1: BİR MUAYTHAI BECERİ VURUŞUNUN PUANLANMASI\nYan Hakem, rakibe yapılan bir Muaythai tekniğini gördüğünde kontrol panelindeki Kırmızı veya Mavi düğmeye basar. Bu işlem “Bireysel Puan” olarak kaydedilir. Vuruşun Kurallar ve Yönetmeliklere uygun olması gerekir.\n29.4.2: SBS PUANLAMA SİSTEMİ ONAY KRİTERİ\nSbS Puanlama Sisteminin bir vuruşu geçerli puan olarak kabul edebilmesi için, Yan Hakemlerin çoğunluğunun ilk hakemin butona basmasından itibaren bir (1) saniye içinde Kırmızı veya Mavi düğmeye basmış olması gerekir.\n• Beş Yan Hakem varsa en az üç Yan Hakemin onayı gerekir.\n• Üç Yan Hakem varsa en az iki Yan Hakemin onayı gerekir.\nBu şart sağlandığında işlem, Onaylanmış Skor (Kabul Edilen Puan) olarak kaydedilir.\n29.4.3: PUANLAMA MODLARI\nSbS Puanlama Sistemi, müsabaka için Teknik Delege tarafından belirlenen aşağıdaki onaylı modlardan biriyle uygulanır.\n• Zorunlu On Puan Sistemine Dönüştürme Modu: Onaylanan vuruşlar her raundun galibini belirlemek için kullanılır ve Zorunlu On Puan Sistemi puanlamasına dönüştürülür. Önde olan sporcu on (10) puan alır; rakip sporcu vuruş farkına göre karşılık gelen puanı alır.\n• Doğrudan SbS Birikimli Mod: Onaylanan tüm vuruşların her birine bir (1) puan verilir. Skorlar her raund için kaydedilir ve maçın tüm rauntları boyunca biriktirilerek nihai sonuç belirlenir.\n29.4.4: RAUNDUN ON PUAN SİSTEMİNE DÖNÜŞTÜRÜLMESİ\nHer raundun sonunda sporcular arasındaki onaylanan Muaythai beceri vuruşu farkı aşağıdaki şekilde Zorunlu On Puan Sistemi sonucuna dönüştürülür.\n• Puan farkı 0 ise raund 10–10 olarak puanlanır.\n• Puan farkı 7 veya daha az ise raund 10–9 olarak puanlanır.\n• Puan farkı 8 ila 14 ise raund 10–8 olarak puanlanır.\n• Puan farkı 15 ila 21 ise raund 10–7 olarak puanlanır.\nÖnde olan sporcu on (10) puan alır; rakip sporcu yukarıdaki ölçeğe göre karşılık gelen puanı alır.\n29.4.5: TOPLAM RAUND SKORU\n• Zorunlu On Puan Sistemine Dönüştürme Modu: Her Sporcunun Zorunlu On Puan Sistemi raund skorları maçın tüm rauntları boyunca toplanır. Maçın bitiminde bu kümülatif miktar Nihai Skoru belirler.\n• Doğrudan SbS Birikimli Mod: Her Sporcunun onaylanmış toplam vuruş sayıları maçın tüm rauntları boyunca toplanır. Maçın bitiminde daha yüksek sayıda onaylanmış vuruşa sahip olan Sporcu kazanan olarak belirlenir.\n29.4.6: BERABERLİK DURUMU\n• Zorunlu On Puan Sistemine Dönüştürme Modu: Toplam nihai puan beraberlikle sonuçlanırsa sonuç, her Yan Hakemin tüm rauntlar boyunca kaydettiği birikimli SbS onaylı vuruş toplamları kullanılarak belirlenir.\n• Beş Yan Hakem: Yan Hakemlerin bireysel kaydettiği en yüksek ve en düşük toplam SbS puanları sistemden çıkarılır. Kazananı belirlemek için kalan üç Yan Hakemin toplamlarının ortalaması uygulanır.\n• Üç Yan Hakem: Kazanan, üç Yan Hakemin her birinin bireysel SbS puan toplamlarına dayalı çoğunluk kararıyla belirlenir. Üç Yan Hakem farklı karar verirse sonuç zorunlu karar prosedürüne göre belirlenir.\n• Doğrudan SbS Birikimli Mod: Toplam onaylanmış vuruş sayıları beraberlikle sonuçlanırsa sonuç, beş veya üç Yan Hakem için yukarıda tanımlanan aynı toplam SbS puanlama yöntemiyle belirlenir.\n29.4.7: BİR KAZANAN BELİRLENEMEMESİ DURUMUNDA\nYukarıdaki prosedürün ardından sonuç hâlâ berabere kalırsa tüm Yan Hakemler kontrol panelindeki Kırmızı veya Mavi butona basarak nihai kararını belirtmek zorundadır. Çoğunluk kararını alan Sporcu kazanan ilan edilir. Aksi belirtilmedikçe (örneğin gösteri maçları) tüm maçlarda mutlaka bir kazanan belirlenmelidir.",
      en: "29.4: REAL TIME SCORING SYSTEM\nWhen each Muaythai skill strike is scored individually (Strike-by-Strike, SbS Scoring System), each confirmed strike contributes to scoring. The SbS Scoring System may be operated in one of two approved modes, as defined below.\n29.4.1: SCORING A MUAYTHAI SKILL STRIKE\nThe Judge shall observe a Muaythai skill strike delivered against the opponent and press either the Red or Blue button on the control panel. This shall be recorded as an Individual Score. The strike must comply with the Rules and Regulations.\n29.4.2: SBS SCORING SYSTEM ACCEPTANCE\nFor the SbS Scoring System to accept a strike as a confirmed score, a majority of the Judges must press either the Red or Blue button within one (1) second of the first Judge's input.\n• For five Judges, at least three Judges are required.\n• For three Judges, at least two Judges are required.\nThis shall be recorded as an Accepted Score.\n29.4.3: SCORING MODES\nThe SbS Scoring System shall operate under one of the following approved scoring modes, as determined by the Technical Delegate for the competition.\n• Ten-Point-Must Conversion Mode: Confirmed strikes are used to determine the winner of each round and are converted into a Ten-Point-Must scoring allocation. The leading Athlete shall receive ten (10) points, and the opponent shall receive a corresponding score based on the strike difference.\n• Pure SbS Accumulated Mode: All confirmed strikes shall be awarded one (1) point each. Scores are recorded per round and accumulated across all rounds of the contest to determine the final result.\n29.4.4: TEN-POINT-MUST ROUND CONVERSION\nAt the end of each round, the difference in confirmed Muaythai skill strikes between Athletes shall be converted into a Ten-Point-Must scoring result as follows.\n• 0 scoring Muaythai skills between the athletes is a 10–10 Round.\n• 7 or less scoring Muaythai skills between the athletes is a 10–9 Round.\n• 8 to 14 scoring Muaythai skills between the athletes is a 10–8 Round.\n• 15 to 21 scoring Muaythai skills between the athletes is a 10–7 Round.\nThe leading Athlete shall receive ten (10) points, and the opponent shall receive the corresponding Must score based on the above scale.\n29.4.5: CUMULATIVE ROUND SCORE\n• Ten-Point-Must Conversion Mode: Each Athlete's Ten-Point-Must round scores shall be accumulated across all rounds of the contest. At the conclusion of the bout, the cumulative Ten-Point-Must total shall determine the Final Score.\n• Pure SbS Accumulated Mode: Each Athlete's confirmed strike totals shall be accumulated across all rounds of the contest. At the conclusion of the bout, the Athlete with the higher number of confirmed strikes shall determine the winner.\n29.4.6: IN CASE OF A DRAW\n• Ten-Point-Must Conversion Mode: If the cumulative final score results in a draw, the result shall be resolved using cumulative SbS confirmed strike totals recorded by each Judge across all rounds.\n• Five Judges: The highest and lowest individual Judge cumulative SbS confirmed strike totals shall be removed. The average of the remaining three Judges' totals shall be applied to determine the winner.\n• Three Judges: The winner shall be determined by the majority decision of the three Judges based on their individual cumulative SbS confirmed strike totals. If all three Judges are split, the result shall proceed to the forced decision procedure.\n• Pure SbS Accumulated Mode: If the cumulative confirmed strike totals result in a draw, the result shall be resolved using the same Judge-level cumulative SbS method as defined above for five or three Judges respectively.\n29.4.7: IF A WINNER CANNOT BE DETERMINED\nIf the result remains a draw after the above procedure, all Judges must register a final decision by pressing either Red or Blue on the control panel. The Athlete receiving the majority decision shall be declared the winner. A winner must be determined in all contests, except where otherwise specified (e.g. exhibition matches)."
    },
    when: { tr: "Eş Zamanlı (Anlık) sistemde.", en: "In the Real-Time system." },
    right: { tr: "Beş Yan Hakemde en az üç, üç Yan Hakemde en az iki hakem aynı renk için bir saniye içinde onay verir.", en: "At least three of five Judges, or two of three Judges, confirm the same colour within one second." },
    wrong: { tr: "Kurala uygun olmayan, bloke edilen veya yetersiz güçteki vuruş için butona basmak.", en: "Pressing for a strike that infringes the rules, is blocked or lacks force." },
    related: ["JUDGE_KRITER", "JUDGE_10PT", "JUDGE_SKORKART"],
    tags: ["eş zamanlı", "anlık", "real time", "sbs", "strike by strike", "buton", "29.4"]
  },
  {
    id: "JUDGE_SKORKART", module: "yan", subtopic: "puanlama-sistemleri", label: "ifma",
    rule: "—", revision: "2026-05-11", status: P,
    discipline: [], age: [], gender: [], role: ["judge"],
    media: { photo: true, video: false, animation: false },
    title: { tr: "Skor Kart", en: "Scorecard" },
    quick: {
      tr: "Skor kartı içeriği ve örnek görsel daha sonra eklenecek.",
      en: "Scorecard content and a sample image will be added later."
    },
    when: { tr: "İçerik planlama aşamasında.", en: "Content is in the planning stage." },
    related: ["JUDGE_10PT", "JUDGE_SBS"],
    tags: ["skor kart", "scorecard", "sonra eklenecek"]
  },
  {
    id: "JUDGE_NONSCORING", module: "yan", subtopic: "puanlanmayan", label: "ifma",
    rule: "29.1.2", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["judge", "ref"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Puanlanmayan Hedefler", en: "Non-scoring Targets" },
    quick: {
      tr: "Eldivenler, ön kollar, ayaklar ve kaval kemikleri puan verici hedef değildir. Ancak yeterli güçle etki yaratıp rakibin dengesini bozan bir vuruş puanlanabilir.",
      en: "Gloves, forearms, feet and shins are not scoring targets. A strike may still score if it is forceful enough to affect the target, such as off-balancing the opponent."
    },
    ruleText: {
      tr: "29.1.2: PUANLANMAYAN HEDEFLER\nEldivenler, ön kollar, ayaklar ve kaval kemikleri puan verici hedefler değildir. Ancak bir vuruş, puan kazandırmayan bu hedeflere etki edecek kadar yeterli güçle uygulanırsa (örneğin; blok yapan rakibin eldivenlerine gelen yüksek bir tekmenin rakibin dengesini bozması durumu) puan olarak değerlendirilir.",
      en: "29.1.2: NON-SCORING TARGETS\nThe gloves, forearms, foot and shin are not scoring targets, unless a strike is applied with enough force to affect a non-scoring target (e.g. a high kick against the gloves of a blocking opponent off-balances the target)."
    },
    when: { tr: "Bir vuruşun hedefe etkisini değerlendirirken.", en: "When assessing a strike's effect on the target." },
    right: { tr: "Blok bölgesine isabet eden vuruşun rakibin dengesini bozup bozmadığını değerlendir.", en: "Assess whether a strike landing on a blocking area off-balances the opponent." },
    wrong: { tr: "Eldiven, ön kol, ayak veya kavala temas eden her vuruşu otomatik puanlamak.", en: "Automatically scoring every strike that contacts a glove, forearm, foot or shin." },
    related: ["JUDGE_KRITER", "JUDGE_NONAWARD"],
    tags: ["puanlanmayan hedefler", "non-scoring targets", "eldiven", "ön kol", "kaval", "29.1.2"]
  },
  {
    id: "JUDGE_NONAWARD", module: "yan", subtopic: "degerlendirilmeyen", label: "ifma",
    rule: "29.2.2", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["judge"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Değerlendirilmeyen Puanlar", en: "Non-awarding of Points" },
    quick: {
      tr: "Muaythai becerisi içermeyen, etkili biçimde bloke edilen, güçsüz, vuruş olmadan fırlatmaya dayanan veya kuralları ihlal eden uygulamalara puan verilmez.",
      en: "No points are awarded for actions lacking Muaythai skill, effectively blocked or weak strikes, throws without striking, or strikes that infringe the rules."
    },
    ruleText: {
      tr: "29.2.2: DEĞERLENDİRİLMEYEN PUANLAR\n• Muaythai becerisi olmadan yapılan vuruş.\n• Rakibin ön kolları/eldivenleri veya kaval kemikleri/ayakları tarafından etkin biçimde bloke edilen vuruşlar.\n• Hedefe isabet etse dahi yeterli güçten yoksun (zayıf) vuruşlar.\n• Semi Contact (Muaythai Teknik) müsabakalarında hafif temas sınırını aşan vuruşlar faul sayılır.\n• Vuruş yapmadan rakibi fırlatmak/yere atmak.\n• Kurallardan herhangi birini ihlal ederek vurmak.",
      en: "29.2.2: NON-AWARDING OF POINTS\n• Striking with lack of Muaythai skills.\n• Strikes which are effectively blocked by the opponent's forearms/gloves or shins/feet.\n• Striking with lack of force even when those strikes have landed on target.\n• Semi Contact (Muaythai Technical): strikes exceeding light-contact expectations shall be considered a foul.\n• Throwing the opponent without striking.\n• Striking while infringing any of the rules."
    },
    when: { tr: "Her vuruş ve aksiyonun puan değerini belirlerken.", en: "When deciding whether an action receives a score." },
    right: { tr: "Tekniğin niteliğini, bloklanıp bloklanmadığını, gücünü ve kurallara uygunluğunu birlikte değerlendir.", en: "Assess the skill, whether it was blocked, its force and compliance with the rules together." },
    wrong: { tr: "Hedefe yalnızca temas ettiği için zayıf veya bloke edilmiş bir vuruşa puan vermek.", en: "Awarding a point to a weak or blocked strike merely because it made contact." },
    related: ["JUDGE_KRITER", "JUDGE_NONSCORING"],
    tags: ["değerlendirilmeyen puanlar", "non-awarding", "blok", "güçsüz vuruş", "29.2.2"]
  },
  {
    id: "JUDGE_DEDUCT", module: "yan", subtopic: "kesinti", label: "ifma",
    rule: "29.2.4 / 29.2.5", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["judge"],
    media: { photo: true, video: true, animation: false },
    title: { tr: "Puan Kesintisi", en: "Deduction of Points" },
    quick: {
      tr: "Orta Hakemin İhtarıyla aynı görüşteyse Yan Hakem “W”, puan vermeyecekse “X”, kendisinin tespit ettiği faul için “J” yazar. On Puan Sisteminde 1 puan düşülür; Anlık sistemde rakibe 5 puan eklenir.",
      en: "A Judge agreeing with the Referee's Warning records “W”, records “X” when not awarding the point, and “J” for a foul detected by the Judge. Ten-Point Must deducts 1 point; Real-Time adds 5 points to the opponent."
    },
    ruleText: {
      tr: "29.2.4: PUAN KESİNTİSİ\nOrta Hakem sporculardan birine İhtar (Warning) verdiğinde, Yan Hakemler diğer sporcu lehine bir puan verebilir. Yan Hakem, Orta Hakemin verdiği İhtar ile aynı görüşte olup sporcu lehine puan verilmesine karar verirse, İhtar alan sporcunun puanlarının bulunduğu ilgili sütuna bunu göstermek amacıyla “W” harfini yazar. Yan Hakem puan verilmemesine karar verirse, İhtar alan sporcunun o raunddaki puanının yanına gerekçesini belirtmek amacıyla “X” harfini yazar.\nHer raund sırasında Yan Hakem, görmüş olduğu herhangi bir faulün ciddiyetini değerlendirir ve Orta Hakem bu faulü fark etmiş olsun ya da olmasın uygun puan cezasını uygular. Yan Hakem, Orta Hakem tarafından fark edilmediği düşünülen bir faul tespit eder ve ihlali yapan sporcuya bir İhtar puanı uygularsa, bunu göstermek amacıyla ihlali gerçekleştiren sporcunun puanlarının karşısındaki ilgili sütuna gerekçesini de belirterek “J” harfini yazar.\n29.2.5: PUAN KESİNTİSİNİ UYGULAMA YÖNTEMİ\nYan Hakem Orta Hakemin İhtarıyla (W) hemfikir ise veya kendisi bir faul tespit edip Yan Hakem İhtarı (J) uygularsa aşağıdaki kurallar geçerlidir.\n• Zorunlu On Puan Sisteminde: İhtar alan sporcunun toplam puanından bir (1) puan düşülür.\n• Eş Zamanlı (Anlık) Puanlama Sisteminde: Rakip sporcuya otomatik olarak beş (5) puan eklenir.",
      en: "29.2.4: DEDUCTION OF POINTS\nIf the Referee provides a Warning to one of the Athletes the Judges may award a point to the other competitor. When a Judge decides to award a point to an Athlete in agreement with a Referee Warning they shall place a “W” in the appropriate column against the points of the warned competitor to show that they have done so. If the Judge decides not to award a point, they shall place the letter “X” against the points allotted for that round to the warned Athlete, indicating the reason they have done so.\nDuring each round, a Judge shall assess the seriousness of and impose an appropriate scoring penalty for any foul witnessed whether or not the Referee has observed such foul. If a Judge observes a foul apparently unnoticed by the Referee and imposes an appropriate penalty on the offending Athlete, they shall place the letter “J” in the appropriate column against the points of the offending Athlete and indicate the reason.\n29.2.5: METHOD FOR APPLYING A DEDUCTION OF POINTS\nIf a Judge is in agreement with a Referee's Warning or observes a foul and imposes a Judge's Warning, the following shall apply.\n• Under the Ten-Point Must System, the Athlete receiving the Warning shall have one (1) point deducted from their total points.\n• Under the Real Time Scoring System, five (5) points shall automatically be awarded to the opponent."
    },
    when: { tr: "Orta Hakem İhtar verdiğinde veya Yan Hakem bir faul tespit ettiğinde.", en: "When the Referee gives a Warning or a Judge observes a foul." },
    right: { tr: "Kararı W, X veya J ile doğru sütunda gerekçesiyle kaydet; sistem türüne göre 1 puan düş veya rakibe 5 puan ekle.", en: "Record W, X or J in the correct column with the reason; deduct 1 point or add 5 to the opponent according to the scoring system." },
    wrong: { tr: "İhtarı kaydetmemek, yanlış harfi kullanmak veya iki sistemin kesinti yöntemlerini karıştırmak.", en: "Failing to record the Warning, using the wrong letter or mixing the deduction methods of the two systems." },
    related: ["JUDGE_10PT", "JUDGE_SBS", "FOUL_CLASS"],
    tags: ["puan kesintisi", "deduction", "ihtar", "warning", "w x j", "29.2.4", "29.2.5"]
  },

  /* ===================== SPORCU KAYIT & TARTI ===================== */
  {
    id: "WEIGH_5PCT", module: "tarti", subtopic: "mac-oncesi", label: "ifma",
    rule: "11.1.2", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["weigh", "jury"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Maç Öncesi Tartı", en: "Pre-contest Weigh-in" },
    quick: {
      tr: "Sporcunun müsabaka öncesi kilosu, kayıtlı sıkletinin %5 üzerinde veya bir üst siklete eşit çıkarsa diskalifiye edilir.",
      en: "If the pre-contest weight exceeds the registered class by 5% or reaches one class up, the athlete is disqualified."
    },
    ruleText: {
      tr: "11.1.2: MAÇ ÖNCESİ TARTI\nTeknik Delege veya Başhakem tarafından görevlendirilen ilgili maçın Jüri üyesi (İdari veya Protokol) tarafından, sporcunun maçından önce veya sonra herhangi bir zamanda gerçekleştirilecektir. Sporcunun müsabaka öncesi kilosu, kayıtlı olduğu sıkletin %5 üzerinde veya bir üst sıklete eşit çıkarsa sporcu diskalifiye edilir.",
      en: "11.1.2: PRE-CONTEST WEIGH-IN\nWill be conducted at any time prior, or after the Athlete's contest by an appointed Jury member (Administration or Protocol) of the contest, as designated by the Technical Delegate or the Chairman of the Jury. If the Athlete's pre-contest weight is found 5% above their qualified weight classification, or equal to the next weight classification they will be disqualified."
    },
    when: { tr: "Maç öncesi tartıda (Pre-Contest Weigh-In).", en: "At the pre-contest weigh-in." },
    right: { tr: "Maç öncesi tartı, ilgili Jüri üyesi tarafından maçtan önce/sonra yapılabilir.", en: "The pre-contest weigh-in may be done by the jury member before or after the bout." },
    wrong: { tr: "Sınırı aşan sporcuyu maça çıkarmak.", en: "Letting an over-limit athlete compete." },
    related: ["WEIGH_ONCE"],
    tags: ["tartı", "%5", "weigh-in", "diskalifiye", "11.1.2"]
  },
  {
    id: "WEIGH_ONCE", module: "tarti", subtopic: "tek-hak", label: "ifma",
    rule: "11.3.3", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["weigh"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Tek tartı hakkı", en: "One weigh-in attempt" },
    quick: {
      tr: "Sporcuya her gün yapılan tartıda yalnızca bir kez baskül hakkı verilir; kaydedilen kilo kesindir.",
      en: "The athlete gets one attempt on the scale each day; the recorded weight is final."
    },
    ruleText: {
      tr: "11.3.3: TEK TARTI HAKKI\nSporcuya her gün yapılan tartıda yalnızca bir kez basküle çıkma hakkı verilir. Bu tartıda kaydedilen kilo sonucu kesindir.",
      en: "11.3.3: MAKING WEIGHT\nA competitor will be allowed to present himself/herself at the official scales only once at the weigh-in each day. The weight recorded on that presentation is final."
    },
    when: { tr: "Her günkü tartıda.", en: "At each daily weigh-in." },
    right: { tr: "Tartıya katılmayan sporcu otomatik diskalifiye (DSQ).", en: "Not attending the weigh-in = automatic DSQ." },
    wrong: { tr: "İkinci baskül hakkı vermek.", en: "Allowing a second attempt." },
    related: ["WEIGH_5PCT"],
    tags: ["tartı", "tek hak", "weigh-in", "11.3.3"]
  },
  {
    id: "MED_KOH", module: "tarti", subtopic: "kafa-darbesi", label: "ifma",
    rule: "9.1, 9.2, 9.3", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["jury", "weigh"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Kafaya Alınan Darbe Sonrası Prosedürler", en: "Procedures for Head Injuries" },
    quick: {
      tr: "1. KOH/RSCH: en az 30 gün; 2. (90 gün içinde): 90 gün; 3. (12 ay içinde): 12 ay müsabaka/sparring yasağı.",
      en: "1st KOH/RSCH: min 30 days; 2nd (within 90 days): 90 days; 3rd (within 12 months): 12 months no competition/sparring."
    },
    headInjuryTable: {
      title: { tr: "KOH / RSCH Güvenlik Prosedürü", en: "KOH / RSCH Safety Procedure" },
      subtitle: { tr: "Kafa darbesi sonrası zorunlu men ve güvenli dönüş özeti", en: "Mandatory suspension and safe-return summary after head strikes" },
      eventLabel: { tr: "Durum", en: "Occurrence" },
      windowLabel: { tr: "Tekrar aralığı", en: "Occurrence window" },
      restLabel: { tr: "Zorunlu süre", en: "Mandatory period" },
      rows: [
        {
          step: "1",
          event: { tr: "İlk KOH / RSCH", en: "First KOH / RSCH" },
          window: { tr: "Tek olay", en: "Single occurrence" },
          rest: { tr: "En az 30 gün", en: "At least 30 days" },
          tone: "caution"
        },
        {
          step: "2",
          event: { tr: "İkinci KOH / RSCH", en: "Second KOH / RSCH" },
          window: { tr: "90 gün içinde", en: "Within 90 days" },
          rest: { tr: "90 gün", en: "90 days" },
          tone: "warning"
        },
        {
          step: "3",
          event: { tr: "Üçüncü KOH / RSCH", en: "Third KOH / RSCH" },
          window: { tr: "12 ay içinde", en: "Within 12 months" },
          rest: { tr: "12 ay", en: "12 months" },
          tone: "danger"
        }
      ],
      protective: {
        rule: "9.2",
        title: { tr: "Koruyucu Tedbir", en: "Protective Measure" },
        duration: { tr: "En az 4 hafta", en: "At least 4 weeks" },
        text: {
          tr: "Çok sayıda kafa darbesi veya art arda Knockdown sonrası Sağlık Görevlisi gerekli görürse müsabaka ve antrenman durdurulabilir.",
          en: "After numerous head strikes or repeated knockdowns, competition and training may be suspended when the Medical Officer considers it necessary."
        }
      },
      clearance: {
        rule: "9.3",
        title: { tr: "Spora Dönüş Onayı", en: "Return-to-sport Clearance" },
        items: [
          { tr: "Nörolog tarafından uygunluk onayı", en: "Fitness clearance by a neurologist" },
          { tr: "Mümkünse EEG; gerekirse CCT incelemesi", en: "EEG where possible; CCT when necessary" },
          { tr: "Sonuçlar ve dönüş izni sağlık kaydına işlenir", en: "Results and return permission entered in the medical record" }
        ]
      },
      recordNote: {
        tr: "Her KOH/RSCH; sağlık kaydına ve RSportz sistemine işlenir, Ulusal Federasyona bildirilir.",
        en: "Every KOH/RSCH is recorded in the medical record and RSportz, and reported to the National Federation."
      }
    },
    ruleText: {
      tr: "KURAL 9: KAFAYA ALINAN DARBE SONRASI PROSEDÜRLER (KOH/RSCH)\n\n9.1: ZORUNLU DİNLENME SÜRESİ\nBir sporcu, kafaya alınan darbeler sonucu Nakavt (KOH) veya Hakem Kararıyla Maçın Bitmesi (RSCH) durumunda zorunlu dinlenme süresine tabi tutulur.\n• Bir (1) KOH veya RSCH: Kafaya alınan sert darbeler sonucunda nakavt olan veya Orta Hakemin sporcuyu savunmasız ya da devam edemez durumda görmesi nedeniyle maçı bitirdiği bir sporcunun; en az otuz (30) gün süreyle Muaythai müsabakalarına veya sparring antrenmanlarına katılmasına izin verilmeyecektir.\n• İkinci (2) KOH veya RSCH: Doksan (90) günlük bir süre içinde, kafa darbeleri sonucu ikinci kez nakavt olan veya Orta Hakemin sporcuyu savunmasız ya da devam edemez durumda görmesi nedeniyle maçı bitirdiği bir sporcunun; ikinci KOH veya RSCH tarihinden itibaren doksan (90) gün süreyle Muaythai müsabakalarına veya sparring antrenmanlarına katılmasına izin verilmeyecektir.\n• Üçüncü (3) KOH veya RSCH: On iki (12) aylık bir süre içinde, kafa darbeleri sonucu üçüncü kez nakavt olan veya Orta Hakemin sporcuyu savunmasız ya da devam edemez durumda görmesi nedeniyle maçı bitirdiği bir sporcunun; üçüncü KOH veya RSCH tarihinden itibaren on iki (12) ay süreyle Muaythai müsabakalarına veya sparring antrenmanlarına katılmasına izin verilmeyecektir.\nKafa darbeleri sonucu yaşanan her KOH ve her RSCH durumu; sporcunun tıbbi kayıtlarına, IFMA etkinlik yönetim sistemine (RSportz) işlenmeli ve sporcunun bağlı olduğu Ulusal Federasyona bildirilmelidir.\n\n9.2: KORUYUCU TEDBİRLER\nKafa bölgesine çok sayıda darbe alarak zorlu bir maç geçiren ya da birbirini takip eden bazı müsabakalarda birden fazla kez Knockdown durumuna düşen bir sporcunun, Sağlık Görevlisinin gerekli görmesi ve tavsiyesi üzerine, son maçtan itibaren en az dört (4) hafta süreyle Muaythai müsabakalarına ve antrenmana katılmasına izin verilmeyebilir.\n\n9.3: TIBBİ MEN SONRASI DOKTOR ONAYI\nBir sporcu, herhangi bir tıbbi men sürecinin ardından Muaythai'ye geri dönmeden önce, bir nörolog tarafından Muaythai müsabakalarına katılmaya uygun olduğuna dair tıbbi onay almalıdır. Sporcu, mümkünse özel bir muayeneden, elektroensefalogram (EEG) ve gerektiğinde kontrastlı bilgisayarlı tomografi (CCT) incelemesinden geçmelidir. Muayene sonuçları ile yeniden müsabakalara katılım izni, sporcunun sağlık kaydına işlenmelidir.\n\nYükümlülüklerin Bildirilmesi\nUlusal Dernekler; reşit olmayan sporcular ve dil yeterliliği sınırlı olan sporcular dahil tüm sporcuların, tıbbi gereklilikleri, sorumlulukları ve müsabakalara güvenli dönüş prosedürlerini tam olarak anlayabilmeleri amacıyla gerekli bilgilendirmenin erişilebilir ve anlaşılır biçimde yapılmasını sağlamakla yükümlüdür. Antrenman sırasında meydana gelen kafa travmalarında da tüm koruyucu tedbirler aynı şekilde uygulanır.",
      en: "RULE 9: PROCEDURES FOR HEAD INJURIES (KOH/RSCH)\n\n9.1: MANDATORY PROBATION PERIOD\nAn Athlete shall receive a mandatory period of rest in the event of a Knock-Out or RSC caused by strikes to the head.\n• One (1) KOH or RSCH: An Athlete who has been knocked out or for whom the Referee has stopped the contest due to receiving hard hits to the head rendering the Athlete defenceless or incapable of continuing, shall not be permitted to take part in competition of Muaythai or sparring for a period of at least thirty (30) days.\n• Two (2) KOH or RSCH: An Athlete who has been knocked out as result of head hits or wherein the Referee has stopped the contest due to an Athlete having received hard hits to the head rendering the Athlete defenceless or incapable of continuing twice within a period of ninety (90) days, shall not be allowed to take part in Muaythai competition or sparring for a period of ninety (90) days from the second KOH or RSCH.\n• Three (3) KOH or RSCH: An Athlete who has been knocked out as a result of head hits or wherein the Referee has stopped the contest due to the Athlete having received hard hits to the head rendering the Athlete defenceless or incapable of continuing three (3) times in a period of twelve (12) months, shall not be allowed to take part in Muaythai competition or sparring for a period of twelve (12) months from the third KOH or RSCH.\nEach Knock-Out suffered as a result of head hits and each RSCH must be recorded in the Athlete's medical record, IFMA event management system (RSportz) and the Athlete's National Federation must be informed.\n\n9.2: PROTECTIVE MEASURES\nAny Athlete having lost a hard contest with many hits to the head or having been knocked down several times in some consecutive contests, may not be permitted to take part in Muaythai competition or training for a period of at least four (4) weeks after the last contest on the advice of the Medical Officer should they decide that it would be necessary.\n\n9.3: MEDICAL CERTIFICATION FOLLOWING PROBATION\nBefore resuming Muaythai after any periods of medical probation, an Athlete must be certified by a neurologist as fit to take part in Muaythai competition. The Athlete should undergo, if possible, a special examination, electroencephalogram (EEG) and, if necessary, a contrast-enhanced computed tomography (CCT) test. The results of examinations as well as the permission to resume competing shall be entered in the medical record.\n\nCommunication of Obligations\nNational Associations must ensure that these medical and safeguarding obligations are communicated in an accessible way to all Athletes, including minors and Athletes with limited language proficiency, so that they fully understand the medical requirements, their responsibilities, and the procedures to follow for safe return to competition. All protective measures apply equally if a head injury occurs during training."
    },
    when: { tr: "Kafa darbesi sonrası nakavt/RSCH durumunda.", en: "After a head-strike knockout/RSCH." },
    right: { tr: "Her KOH/RSCH tıbbi kayda işlenir ve Ulusal Federasyona bildirilir.", en: "Each KOH/RSCH is recorded and reported to the national federation." },
    wrong: { tr: "Dinlenme süresi dolmadan sporcuyu kaydetmek.", en: "Registering the athlete before the rest period ends." },
    related: ["FOUL_KO"],
    tags: ["koh", "rsch", "dinlenme", "30 gün", "koruyucu tedbir", "nörolog", "9.1", "9.2", "9.3"]
  },
  {
    id: "MED_FORM", module: "kayit", subtopic: "ifma-medical", label: "ifma",
    rule: "10.1", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["weigh", "jury"],
    media: { photo: true, video: false, animation: false },
    imgs: [
      { src: "assets/img/form-medical-declaration.jpg", cap: { tr: "IFMA Tıbbi Beyan Formu — sağlık durumu beyanı", en: "IFMA Medical Declaration Form — medical conditions" } }
    ],
    links: [ { url: "https://muaythai.sport/wp-content/uploads/2020/06/IFMA-Medical-Declaration-for-Athletes-V.9.pdf", label: { tr: "Tam formu aç / indir (PDF, 4 sayfa)", en: "Open / download full form (PDF, 4 pages)" } } ],
    title: { tr: "IFMA Tıbbi Onay Formu", en: "IFMA Medical Declaration Form" },
    quick: {
      tr: "Eksiksiz doldurulmuş, İngilizce hazırlanmış ve yetkili bir tıp doktoru tarafından imzalanmış IFMA Tıbbi Beyan Formu kayıt için zorunludur.",
      en: "A completed IFMA Medical Declaration Form, prepared in English and signed by an authorised Doctor of Medicine, is mandatory for registration."
    },
    ruleText: {
      tr: "10.1: TIBBİ BEYAN\nYetkili bir tıp doktoru tarafından imzalanmış, eksiksiz bir IFMA Tıbbi Beyan Formu bulunmayan hiçbir sporcunun müsabakaya katılmasına izin verilmeyecektir. Beyan İngilizce olarak doldurulmalı ve yetkili doktor tarafından imzalanmalıdır; beyan, sporcunun ülkesinden ayrılmadan önce fiziksel durumunun iyi olduğunu ve müsabaka kapasitesini etkileyebilecek herhangi bir sakatlık, enfeksiyon veya engellilik durumunun bulunmadığını teyit etmelidir. Sporcunun vücut ve uzuv bütünlüğü açısından uygun olmalıdır.",
      en: "10.1: MEDICAL DECLARATION\nNo Athlete shall be allowed to compete without having a completed IFMA Medical Declaration Form, which must be signed by an authorised Doctor of Medicine. The medical declaration must be completed in the English language stating that prior to leaving their country the Athlete was in good physical condition and not suffering from any injury, infection or disability liable to affect the Athlete’s capacity to compete. The Athlete must be intact and of full body."
    },
    when: { tr: "Kayıt/akreditasyonda (Kural 10.1).", en: "At registration/accreditation (Rule 10.1)." },
    right: { tr: "Form ülke dışına çıkmadan önce tamamlanmalı ve yetkili doktor tarafından imzalanmalıdır.", en: "The form must be completed before leaving the athlete’s country and signed by an authorised doctor." },
    related: ["PREGNANCY_FORM", "REG_BLOOD_TESTS"],
    tags: ["tıbbi onay formu", "tıbbi beyan formu", "medical declaration", "sağlık formu", "10.1"]
  },
  {
    id: "PREGNANCY_FORM", module: "kayit", subtopic: "non-pregnancy", label: "ifma",
    rule: "10.1.1", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: ["female"], role: ["weigh", "jury"],
    media: { photo: true, video: false, animation: false },
    imgs: [
      { src: "assets/img/form-pregnancy-declaration.jpg", cap: { tr: "Kadın sporcular için Hamile Olmama Beyanı", en: "Declaration of Non-pregnancy for female athletes" } }
    ],
    links: [ { url: "https://muaythai.sport/wp-content/uploads/2020/06/IFMA-Medical-Declaration-for-Athletes-V.9.pdf", label: { tr: "Beyanın bulunduğu tam formu aç / indir (PDF)", en: "Open / download the full form containing the declaration (PDF)" } } ],
    title: { tr: "Hamile Olmama Beyanı", en: "Declaration of Non-pregnancy" },
    quick: {
      tr: "18 yaş ve üzerindeki sporcular beyanı şahsen imzalar; 18 yaş altındaki sporcular için ebeveyn veya yasal vasi ek imzası gerekir.",
      en: "Athletes aged 18 and above sign the declaration personally; athletes under 18 require an additional parent or legal guardian signature."
    },
    ruleText: {
      tr: "10.1.1: HAMİLE OLMAMA BEYANI\n18 yaş ve üzerindeki sporcular, Hamile Olunmadığına Dair Beyanı şahsen imzalamak zorundadır. 18 yaşın altındaki sporcular için sporcunun ebeveynlerinden ve/veya yasal vasilerinden birinin ek imzası gereklidir.\n\nGizlilik ve Amaç\nHamile olmama beyanları, yalnızca yüksek etkili bir sporda sporcu sağlığını korumak amacıyla talep edilir. Bu beyanlar gizli tıbbi bilgi olarak değerlendirilecek ve başka hiçbir amaç için kullanılmayacaktır.\n\nPeriyodik Gözden Geçirme\nSağlık ve Toplumsal Cinsiyet Eşitliği Kurulları; güncel tıbbi kanıtları, uluslararası insan hakları ve toplumsal cinsiyet eşitliği standartlarını referans alarak, hamile olunmadığına dair beyanların formatını, gerekliliğini ve ölçülülüğünü en az dört (4) yılda bir periyodik olarak gözden geçirecektir.",
      en: "10.1.1: DECLARATION OF NON-PREGNANCY\nAthletes aged 18 and above must sign the Declaration of Non-pregnancy. Athletes under this age require an additional signature from one of the Athlete’s parents and/or legal guardians.\n\nConfidentiality and Purpose\nNon-pregnancy declarations are required solely for the protection of Athlete health in a high-impact sport. These declarations shall be treated as confidential medical information and shall not be used for any other purpose.\n\nPeriodic Review\nThe Medical and Gender Equality Commissions shall periodically review the format, necessity, and proportionality of non-pregnancy declarations at least every four (4) years, with reference to current medical evidence and international human-rights and gender-equality standards."
    },
    when: { tr: "IFMA kayıt/akreditasyon sürecinde.", en: "During IFMA registration/accreditation." },
    right: { tr: "Beyan gizli tıbbi bilgi olarak değerlendirilir ve yalnızca sporcu sağlığını koruma amacıyla kullanılır.", en: "The declaration is confidential medical information used solely to protect athlete health." },
    related: ["MED_FORM"],
    tags: ["hamile olmama beyanı", "gebelik", "non-pregnancy", "kadın sporcu", "10.1.1"]
  },
  {
    id: "REG_ADEL", module: "kayit", subtopic: "adel", label: "ifma",
    rule: "12.1.2", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["weigh", "jury"],
    media: { photo: true, video: false, animation: false },
    imgs: [
      {
        src: "assets/img/adel-wada.png",
        cap: {
          tr: "ADEL — Dünya Dopingle Mücadele Ajansı (WADA) eğitim platformu",
          en: "ADEL — World Anti-Doping Agency (WADA) education platform"
        }
      }
    ],
    links: [
      {
        url: "https://adel.wada-ama.org/learn/learning-plans/1/international-level-athletes-education-program-english",
        label: { tr: "U16 ve üzeri sporcular — Uluslararası Düzey Sporcular Eğitim Programı", en: "Athletes U16 and above — International-Level Athletes Education Program" }
      },
      {
        url: "https://adel.wada-ama.org/learn/signin;redirectUrl=%2F",
        label: { tr: "ADEL'e giriş — Genç Sporcular Eğitim Programına erişim", en: "Sign in to ADEL — access the Youth Athletes Education Program" }
      },
      {
        url: "https://adel.wada-ama.org/learn/learning-plans/7/coaches-of-high-performance-education-program-english",
        label: { tr: "Antrenörler — Yüksek Performans Antrenörleri Eğitim Programı", en: "Coaches — Coaches of High Performance Education Program" }
      },
      {
        url: "https://adel.wada-ama.org/learn/learning-plans/13/medical-professionalseducationprogram-english",
        label: { tr: "Takım doktorları — Sağlık Profesyonelleri Eğitim Programı", en: "Team doctors — Medical Professionals Education Program" }
      }
    ],
    title: { tr: "Zorunlu Eğitim Programları (ADEL)", en: "Mandatory Education Programmes (ADEL)" },
    quick: {
      tr: "Sporcu, antrenör ve takım doktorları rolleri ile yaş gruplarına uygun anti-doping eğitim programını tamamlamak zorundadır.",
      en: "Athletes, coaches and team doctors must complete the anti-doping education programme applicable to their role and age group."
    },
    ruleText: {
      tr: "12.1.2: DOPİNGLE MÜCADELE EĞİTİM ZORUNLULUĞU\n• U16 ve üzeri sporcular, Uluslararası Düzey Sporcular Eğitim Programını (International-Level Athletes Education Program) tamamlamak zorundadır.\n• U12–U14 sporcuları, ADEL Genç Sporcular Eğitim Programını (ADEL Youth Athletes Education Program) tamamlamak zorundadır.\n• Tüm antrenörler, Yüksek Performans Antrenörleri Eğitim Programını (Coaches of High Performance Education Program) tamamlamak zorundadır.\n• Tüm takım doktorları, Sağlık Profesyonelleri için ADEL Eğitim Programını (ADEL for Medical Professional's Education Program) tamamlamak zorundadır.",
      en: "12.1.2: ANTI-DOPING EDUCATION REQUIREMENT\n• Athletes U16 and above must complete the International-Level Athletes Education Program.\n• Athletes U12–U14 must complete the ADEL Youth Athletes Education Program.\n• All coaches must complete the Coaches of High Performance Education Program.\n• All team doctors must complete the ADEL for Medical Professional's Education Program."
    },
    when: { tr: "IFMA etkinlik kaydı öncesinde.", en: "Before registration for an IFMA event." },
    right: { tr: "Yaş kategorisine ve role uygun güncel eğitim tamamlanmalıdır.", en: "The current programme appropriate to the age category and role must be completed." },
    related: ["DOPING_FORM"],
    tags: ["adel", "zorunlu eğitim", "anti-doping eğitim", "12.1.2", "u12", "u14", "u16"]
  },
  {
    id: "DOPING_FORM", module: "kayit", subtopic: "anti-doping", label: "ifma",
    rule: "12", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["weigh", "jury"],
    media: { photo: true, video: false, animation: false },
    imgs: [ { src: "assets/img/form-consent.jpg", cap: { tr: "Anti-Doping Onay Formu (2020) — 1. sayfa (tamamı 2 sayfa)", en: "Athlete Consent Form (2020) — page 1 (2 pages total)" } } ],
    links: [ { url: "https://muaythai.sport/wp-content/uploads/2020/06/Athlete-Consent-Form-IFMA-Events-and-Anti-Doping_2020.pdf", label: { tr: "Formu aç / indir (PDF)", en: "Open / download form (PDF)" } } ],
    title: { tr: "Anti-Doping Onay Formu", en: "Athlete Consent Form (Anti-Doping)" },
    quick: {
      tr: "18 yaş ve üzerindeki sporcular IFMA Anti-Doping Onay Formunu imzalar; daha küçük sporcular için ebeveyn veya yasal vasi ek imzası gerekir.",
      en: "Athletes aged 18 and above sign the IFMA Anti-Doping Consent Form; younger athletes require an additional parent or legal guardian signature."
    },
    ruleText: {
      tr: "KURAL 12: İLAÇ KULLANIMI VE DOPİNG\n\n12.1: DOPİNG\nBir sporcunun normal beslenme düzeninin bir parçasını oluşturmayan ilaçların veya kimyasal maddelerin sporcuya verilmesi/uygulanması yasaktır. Dünya Dopingle Mücadele Ajansı (WADA) Doping Yönetmelikleri ve IFMA Dopingle Mücadele Kuralları uygulanacaktır.\n\n12.1.1: ANTİ-DOPİNG ONAYI\n18 yaş ve üzerindeki sporcular, IFMA Anti-Doping Onay Formunu imzalamak zorundadır. Bu yaşın altındaki sporcular için ayrıca sporcunun ebeveynlerinden ve/veya yasal vasilerinden birinin ek imzası gereklidir.\n\n12.1.2: DOPİNGLE MÜCADELE EĞİTİM ZORUNLULUĞU\n• U16 ve üzeri sporcular, Uluslararası Düzey Sporcular Eğitim Programını (International-Level Athletes Education Program) tamamlamak zorundadır.\n• U12–U14 sporcuları, ADEL Genç Sporcular Eğitim Programını (ADEL Youth Athletes Education Program) tamamlamak zorundadır.\n• Tüm antrenörler, Yüksek Performans Antrenörleri Eğitim Programını (Coaches of High Performance Education Program) tamamlamak zorundadır.\n• Tüm takım doktorları, Sağlık Profesyonelleri için ADEL Eğitim Programını (ADEL for Medical Professional's Education Program) tamamlamak zorundadır.\n\n12.2: YAPTIRIMLAR\nBu yükümlülüğü ihlal eden herhangi bir sporcu veya resmi görevli, IFMA tarafından diskalifiye veya uzaklaştırma cezalarına tabi tutulacaktır.\n\n12.3: LOKAL ANESTEZİKLER\nLokal anesteziklerin kullanımına, Sağlık Kurulu doktorunun takdirine ve onayına bağlı olarak izin verilir.\n\n12.4: YASAKLI İLAÇLAR\nDünya Dopingle Mücadele Ajansının (WADA) güncel yasaklı maddeler listesi, IFMA’nın yasaklı maddeler listesini oluşturur. Bu tür maddeleri kullanan herhangi bir sporcu veya bu maddeleri uygulayan herhangi bir resmi görevli cezalara tabi tutulacaktır. IFMA, IFMA Sağlık Kurulunun tavsiyesi üzerine ek maddeleri de yasaklayabilir.",
      en: "RULE 12: ADMINISTRATION OF DRUGS & DOPING\n\n12.1: DOPING\nThe administration to an Athlete of drugs or chemical substances not forming part of the usual diet of an Athlete is prohibited. The doping regulations of the World Anti-Doping Agency (WADA) and the IFMA Anti-Doping Code shall be applied.\n\n12.1.1: ANTI-DOPING CONSENT\nAthletes age 18 and above must sign the IFMA Anti-Doping Consent Form. Athletes under this age will also require an additional signature from one of the Athletes parents and/or legal guardians.\n\n12.1.2: ANTI-DOPING EDUCATION REQUIREMENT\n• Athletes U16 and above must complete the International-Level Athletes Education Program.\n• Athletes U12–U14 must complete the ADEL Youth Athletes Education Program.\n• All coaches must complete the Coaches of High Performance Education Program.\n• All team doctors must complete the ADEL for Medical Professional's Education Program.\n\n12.2: PENALTIES\nAny Athlete or official violating this prohibition shall be liable to disqualification or suspension by IFMA.\n\n12.3: LOCAL ANESTHETICS\nThe use of local anaesthetics is permitted according to the discretion of a doctor of the Medical Commission.\n\n12.4: PROHIBITED DRUGS\nThe current World Anti-Doping Agency (WADA) list of prohibited substances shall constitute IFMA’s list of prohibited substances. Any Athlete taking such substances or any official administering such substances shall be subject to the penalties. IFMA may ban additional substances upon the recommendation of the IFMA Medical Commissions."
    },
    when: { tr: "Kayıtta (Kural 12.1.1).", en: "At registration (Rule 12.1.1)." },
    right: { tr: "18 yaş altı sporcular için veli/vasi imzası zorunludur (12.1.1).", en: "For under-18 athletes a parent/guardian signature is required (12.1.1)." },
    related: ["REG_ADEL"],
    tags: ["anti-doping onay formu", "consent form", "doping", "onay formu", "12", "12.1", "12.2", "12.3", "12.4"]
  },
  {
    id: "REG_KHAN", module: "kayit", subtopic: "khan", label: "ifma",
    rule: "6", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["weigh", "jury"],
    media: { photo: false, video: false, animation: false },
    khanTable: {
      title: { tr: "Asgari Khan Dereceleri", en: "Minimum Khan Levels" },
      subtitle: {
        tr: "IFMA etkinlikleri için kayıt ve akreditasyon şartı",
        en: "Registration and accreditation requirement for IFMA events"
      },
      minimumLabel: { tr: "Asgari derece", en: "Minimum level" },
      categoryLabel: { tr: "Yaş kategorisi", en: "Age category" },
      athleteTitle: { tr: "Sporcular", en: "Athletes" },
      officialTitle: { tr: "Antrenörler ve Teknik Görevliler", en: "Coaches and Technical Officials" },
      roleLabel: { tr: "Rol", en: "Role" },
      definitionLabel: { tr: "Unvan", en: "Designation" },
      athletes: [
        { category: { tr: "Masters 45+", en: "Masters 45+" }, level: 6 },
        { category: { tr: "Masters 40+", en: "Masters 40+" }, level: 6 },
        { category: { tr: "Masters 35+", en: "Masters 35+" }, level: 6 },
        { category: { tr: "Elite", en: "Elite" }, level: 6 },
        { category: { tr: "U24", en: "U24" }, level: 6 },
        { category: { tr: "U18", en: "U18" }, level: 5 },
        { category: { tr: "U16", en: "U16" }, level: 4 },
        { category: { tr: "U14", en: "U14" }, level: 3 },
        { category: { tr: "U12", en: "U12" }, level: 2 },
        { category: { tr: "U10", en: "U10" }, level: 1 },
        { category: { tr: "U8", en: "U8" }, level: 1 }
      ],
      officials: [
        {
          role: { tr: "Takım Menajeri / Kıdemli Antrenör", en: "Team Manager / Senior Coach" },
          level: 10,
          definition: { tr: "Uluslararası Eğitmen", en: "International Instructor" }
        },
        {
          role: { tr: "Antrenör / Köşe Görevlisi", en: "Coach / Second" },
          level: 7,
          definition: { tr: "Yardımcı Eğitmen", en: "Assistant Instructor" }
        },
        {
          role: { tr: "Teknik Görevliler", en: "Technical Officials" },
          level: 7,
          definition: { tr: "Yardımcı Eğitmen", en: "Assistant Instructor" }
        }
      ]
    },
    title: { tr: "Khan derecesi şartı", en: "Khan level requirement" },
    quick: {
      tr: "IFMA etkinliklerinde asgari Khan derecesi şarttır. Sporcular: Elite/U24/35+/40+/45+ = 6, U18 = 5, U16 = 4, U14 = 3, U12 = 2, U10/U8 = 1.",
      en: "A minimum Khan level is required at IFMA events. Athletes: Elite/U24/Masters 35+/40+/45+ = 6, U18 = 5, U16 = 4, U14 = 3, U12 = 2, U10/U8 = 1."
    },
    ruleText: {
      tr: "KURAL 6: KHAN DERECESİ ŞARTI\nIFMA onaylı etkinliklere katılan tüm Sporcular, Antrenörler, Köşe Görevlileri (Seconds) ve Teknik Görevliler, belirlenen asgari Khan derecesi şartını karşılamak zorundadır. Geçerli Khan sertifikasının kanıtı, kayıt veya akreditasyon sırasında ibraz edilmelidir. Gerekli derecenin karşılanamaması durumunda katılım sağlanmasına onay verilmez.\n\n6.1: YAŞ KATEGORİSİNE GÖRE SPORCULAR İÇİN ASGARİ KHAN DERECESİ\nVeteranlar 45+: 6\nVeteranlar 40+: 6\nBüyükler 35+: 6\nElite: 6\nU24: 6\nU18: 5\nU16: 4\nU14: 3\nU12: 2\nU10: 1\nU8: 1",
      en: "RULE 6: KHAN LEVEL REQUIREMENT\nAll Athletes, Coaches, Seconds, and Technical Officials participating in IFMA-sanctioned events must meet the prescribed minimum Khan level requirement. Proof of valid Khan certification must be presented during registration or accreditation. Failure to meet the required level shall result in ineligibility to participate.\n\n6.1: ATHLETES MINIMUM KHAN BY AGE CATEGORY\nMasters 45+: 6\nMasters 40+: 6\nMasters 35+: 6\nElite: 6\nU24: 6\nU18: 5\nU16: 4\nU14: 3\nU12: 2\nU10: 1\nU8: 1"
    },
    when: { tr: "Kayıt/akreditasyonda geçerli Khan sertifikası ibraz edilir.", en: "A valid Khan certificate is presented at registration/accreditation." },
    right: { tr: "Antrenörler: Menajer/Kıdemli Antrenör = 10, Antrenör/Köşe = 7, Teknik Görevliler = 7 (6.2).", en: "Officials: Manager/Senior Coach = 10, Coach/Seconds = 7, Technical Officials = 7 (6.2)." },
    wrong: { tr: "Geçerli Khan sertifikası olmadan katılıma izin vermek.", en: "Allowing participation without a valid Khan certificate." },
    related: ["REG_ACCREDITATION"],
    tags: ["khan", "derece", "6", "6.1", "6.2"]
  },
  {
    id: "REG_BLOOD_TESTS", module: "kayit", subtopic: "blood-tests", label: "ifma",
    rule: "10.2", revision: "2026-05-11", status: A,
    discipline: [], age: ["U18", "U24", "ELITE", "M35", "V40", "V45"], gender: [], role: ["weigh", "jury"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Kan Testleri", en: "Blood Tests" },
    quick: {
      tr: "16 yaş ve üzerindeki sporcular HIV antikoru, HBV ve HCV tarama sonuçlarını laboratuvar antetli kâğıdında ve son 6 ay içinde alınmış olarak sunar.",
      en: "Athletes aged 16 and above present HIV antibody, HBV and HCV screening results on laboratory letterhead, completed within the previous 6 months."
    },
    ruleText: {
      tr: "10.2: KAN TESTLERİ\nSağlık Beyanına ek olarak, 16 yaş ve üzerindeki sporcular; HIV antikoru, HBV (Hepatit B Yüzey Antijeni) ve HCV (Hepatit C Antikoru) tarama kan testlerinin sonuçlarını ibraz etmek zorundadır. Sonuçlar, testleri uygulayan laboratuvarın antetli kâğıdına basılı olmalı ve müsabakadan önceki son 6 ay içinde alınmış olmalıdır.",
      en: "10.2: BLOOD TESTS\nIn addition to the Medical Declaration, Athletes aged 16 and above must present completed HIV antibody & HBV (Hepatitis B Surface Antigen) & HCV (Hepatitis C Antibody) screening blood tests. The results must be printed on the letterhead of the laboratory that administered the tests and must have been completed within the 6 months prior to competition."
    },
    when: { tr: "16 yaş ve üzerindeki sporcuların IFMA kaydında.", en: "At IFMA registration for athletes aged 16 and above." },
    right: { tr: "Üç testin sonucu da laboratuvar antetli kâğıdında ve geçerli 6 aylık süre içinde olmalıdır.", en: "All three test results must be on laboratory letterhead and within the valid 6-month period." },
    related: ["MED_FORM"],
    tags: ["kan testi", "hiv", "hbv", "hcv", "hepatit", "laboratuvar", "6 ay", "10.2"]
  },
  {
    id: "REG_ATHLETES_BOOK", module: "kayit", subtopic: "athletes-book", label: "ifma",
    rule: "8.1.4", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["weigh", "jury"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Athlete's Book", en: "Athlete's Book" },
    quick: {
      tr: "Dijital veya fiziksel Sporcu Kitabı zorunludur; akreditasyondaki uyruğu yansıtmalı, tüm sağlık kontrolleri ve tartılarda sunulmalıdır.",
      en: "The digital or physical Athletes Book is compulsory; it must reflect the nationality recorded at accreditation and be presented at all medical checks and weigh-ins."
    },
    ruleText: {
      tr: "8.1.4: SPORCU EL KİTABI (ATHLETES BOOK)\nDijital veya fiziksel Sporcu Kitabı, sporcunun akreditasyon sırasında kaydedilen uyruğunu yansıtmalıdır. Bu kitabın bulundurulması zorunludur; tüm sağlık kontrollerinde ve tartılarda ibraz edilmelidir. Kitap, her müsabakanın sonunda geri alınmalıdır.",
      en: "8.1.4: ATHLETES BOOK\nThe Athletes Book, digital or physical, must reflect the athlete’s nationality as recorded during accreditation. It is compulsory and must be presented at all medical checks and weigh-ins. The book must be collected at the end of each contest."
    },
    when: { tr: "Akreditasyonda, sağlık kontrolünde ve tartıda.", en: "At accreditation, medical checks and weigh-ins." },
    right: { tr: "Sporcu Kitabı her müsabakanın sonunda geri alınır.", en: "The Athletes Book is collected at the end of each contest." },
    related: ["REG_ACCREDITATION"],
    tags: ["athlete's book", "athletes book", "sporcu kitabı", "sporcu el kitabı", "8.1.4"]
  },
  {
    id: "REG_ACCREDITATION", module: "kayit", subtopic: "accreditation-card", label: "ifma",
    rule: "8.1.1", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["weigh", "jury"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Akreditasyon Kartı", en: "Accreditation Card" },
    quick: {
      tr: "Akreditasyon sırasında kimlik ve uyruk doğrulaması yapılır; sporcu pasaportunda ibraz edilen uyruğu temsil etmelidir.",
      en: "Identity and nationality are verified at accreditation; the athlete must represent the nationality presented in their passport."
    },
    ruleText: {
      tr: "8.1.1: KİMLİK TESPİTİ\nSporcu, akreditasyon esnasında pasaportunda ibraz edilen uyruğu temsil etmek zorundadır.",
      en: "8.1.1: IDENTIFICATION\nThe Athlete must represent the same nationality as presented in their passport at accreditation."
    },
    when: { tr: "IFMA akreditasyonu sırasında.", en: "During IFMA accreditation." },
    right: { tr: "Akreditasyon bilgileri pasaporttaki uyrukla eşleşmelidir.", en: "Accreditation details must match the nationality in the passport." },
    related: ["REG_ATHLETES_BOOK", "REG_KHAN"],
    tags: ["akreditasyon kartı", "akreditasyon", "kimlik", "pasaport", "uyruk", "8.1.1"]
  },
  {
    id: "REG_NAT_DELEGATION_LIST", module: "kayit", subtopic: "national-delegation-list", label: "national",
    rule: "—", revision: "2026-08-31", status: A,
    source: { tr: "Ulusal Şampiyona Kayıt Belgeleri", en: "National Championship Registration Documents" },
    discipline: [], age: [], gender: [], role: ["weigh", "jury"],
    media: { photo: true, video: false, animation: false },
    title: { tr: "Kafile Listesi", en: "Delegation List" },
    quick: {
      tr: "Ulusal Şampiyona kaydında kafilede yer alan sporcu ve görevlilerin listesi sunulur. Örnek belge görseli daha sonra eklenecek.",
      en: "The list of athletes and officials in the delegation is submitted for National Championship registration. A sample document image will be added later."
    },
    when: { tr: "Ulusal Şampiyona kafile kaydında.", en: "During National Championship delegation registration." },
    related: ["REG_NAT_LICENSE_ID", "REG_NAT_WEIGH_SHEET"],
    tags: ["kafile listesi", "ulusal şampiyona", "delegation list"]
  },
  {
    id: "REG_NAT_LICENSE_ID", module: "kayit", subtopic: "national-license-id", label: "national",
    rule: "—", revision: "2026-08-31", status: A,
    source: { tr: "Ulusal Şampiyona Kayıt Belgeleri", en: "National Championship Registration Documents" },
    discipline: [], age: [], gender: [], role: ["weigh", "jury"],
    media: { photo: true, video: false, animation: false },
    title: { tr: "Sporcu Lisansı ve Kimliği", en: "Athlete Licence and Identity Document" },
    quick: {
      tr: "Sporcunun geçerli lisansı ile kimlik belgesi kayıt sırasında birlikte kontrol edilir. Örnek belge görselleri daha sonra eklenecek.",
      en: "The athlete's valid licence and identity document are checked together during registration. Sample document images will be added later."
    },
    when: { tr: "Ulusal Şampiyona sporcu kaydında.", en: "During National Championship athlete registration." },
    related: ["REG_NAT_DELEGATION_LIST", "REG_NAT_WEIGH_SHEET"],
    tags: ["sporcu lisansı", "kimlik", "ulusal şampiyona", "athlete licence"]
  },
  {
    id: "REG_NAT_WEIGH_SHEET", module: "kayit", subtopic: "national-weigh-sheet", label: "national",
    rule: "—", revision: "2026-08-31", status: A,
    source: { tr: "Ulusal Şampiyona Kayıt Belgeleri", en: "National Championship Registration Documents" },
    discipline: [], age: [], gender: [], role: ["weigh", "jury"],
    media: { photo: true, video: false, animation: false },
    title: { tr: "Tartı Kağıdı", en: "Weigh-in Sheet" },
    quick: {
      tr: "Sporcunun sıklet ve tartı bilgilerinin bulunduğu Tartı Kağıdı kayıt belgeleri arasında sunulur. Örnek görsel daha sonra eklenecek.",
      en: "The Weigh-in Sheet containing the athlete's weight-class and weigh-in information is submitted with the registration documents. A sample image will be added later."
    },
    when: { tr: "Ulusal Şampiyona kayıt ve tartı kontrolünde.", en: "During National Championship registration and weigh-in checks." },
    related: ["REG_NAT_LICENSE_ID", "REG_NAT_DOCTOR_REPORT"],
    tags: ["tartı kağıdı", "ulusal şampiyona", "weigh-in sheet"]
  },
  {
    id: "REG_NAT_DOCTOR_REPORT", module: "kayit", subtopic: "national-doctor-report", label: "national",
    rule: "—", revision: "2026-08-31", status: A,
    source: { tr: "Ulusal Şampiyona Kayıt Belgeleri", en: "National Championship Registration Documents" },
    discipline: [], age: [], gender: [], role: ["weigh", "jury"],
    media: { photo: true, video: false, animation: false },
    title: { tr: "Gerekli Durumlarda Doktor Raporu", en: "Doctor's Report When Required" },
    quick: {
      tr: "Sağlık durumunun ek belgelendirme gerektirdiği hâllerde Doktor Raporu sunulur. Örnek rapor görseli daha sonra eklenecek.",
      en: "A Doctor's Report is submitted when the athlete's medical condition requires additional documentation. A sample report image will be added later."
    },
    when: { tr: "Ulusal Şampiyonada ek sağlık belgesi gerektiğinde.", en: "When additional medical documentation is required at a National Championship." },
    related: ["REG_NAT_WEIGH_SHEET", "WEIGH_MEDICAL_EXAM"],
    tags: ["doktor raporu", "ulusal şampiyona", "doctor report"]
  },
  {
    id: "WEIGH_GENERAL", module: "tarti", subtopic: "genel", label: "ifma",
    rule: "11.3.1", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["weigh", "jury"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Genel Tartı Kuralları", en: "General Weigh-in Rules" },
    quick: {
      tr: "Teknik Delege isterse tüm sporcular Resmi Kayıt Tartısı ve sağlık kontrolüne katılır; aksi hâlde yarışacakları her sabah Günlük Müsabaka Tartısına ve zorunlu sağlık kontrolüne girer.",
      en: "When required by the Technical Delegate, all athletes attend the Official Weigh-in and medical check; otherwise they attend the Competition Weigh-in and compulsory medical check each morning they compete."
    },
    ruleText: {
      tr: "11.3.1: KATILIM\nTeknik Delege tarafından talep edilmesi halinde, tüm sıkletlerdeki sporcular; müsabakanın bütünü için esas alınacak kilolarının belirleneceği Resmi Kayıt Tartısına ve Sağlık Kontrolüne katılmak zorundadır. Sporcu yalnızca tartıda uygun bulunduğu sıklette yarışabilir.\nTeknik Delege tarafından Resmi Kayıt Tartısının talep edilmediği durumlarda sporcu; o günkü mevcut kilosunun kendi sıkletinin üst sınırını aşmadığından emin olmak için yarışacağı her günün sabahında yalnızca Günlük Müsabaka Tartısına katılmalı ve zorunlu sağlık kontrolünden geçmelidir.\n• Tartıya katılmayan sporcu otomatik olarak diskalifiye edilir (DSQ).",
      en: "11.3.1: ATTENDANCE\nAthletes in all weight divisions when required by the Technical Delegate, must complete a medical and weight check at the Official Weigh-in, which shall determine their weight for the entirety of competition. An Athlete may only compete in the weight classification for which they have qualified at the weigh-in.\nWhen not required by the Technical Delegate, an Athlete shall present themselves only at the Competition Weigh-in each morning that they are scheduled to compete, to ensure that their actual weight on that day does not exceed the maximum of their weight class, and must pass the compulsory medical check.\n• An Athlete who does not attend their weigh-in will automatically be disqualified (DSQ)."
    },
    when: { tr: "Tüm IFMA tartı ve sağlık kontrolü süreçlerinde.", en: "Across all IFMA weigh-in and medical-check processes." },
    right: { tr: "Sporcu yalnızca tartıda uygun bulunduğu sıklette yarışır.", en: "The athlete competes only in the weight classification qualified for at weigh-in." },
    related: ["WEIGH_OFFICIAL", "WEIGH_DAILY", "WEIGH_MEDICAL_EXAM", "WEIGH_FAILED"],
    tags: ["genel tartı", "katılım", "dsq", "11.3.1"]
  },
  {
    id: "WEIGH_DAILY", module: "tarti", subtopic: "gunluk", label: "ifma",
    rule: "11.1", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["weigh", "jury"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Günlük Müsabaka Tartısı", en: "Competition Weigh-in" },
    quick: {
      tr: "Günlük Müsabaka Tartısı müsabakanın her sabahı yapılır; müsabaka normalde tartının tamamlanmasından en erken üç saat sonra başlar.",
      en: "The Competition Weigh-in is held each morning of competition; competition normally starts no earlier than three hours after it closes."
    },
    ruleText: {
      tr: "11.1: GÜNLÜK MÜSABAKA TARTISI\nGünlük Müsabaka Tartısı, müsabakanın her sabahı gerçekleştirilir. Müsabaka, Günlük Müsabaka Tartısının tamamlanmasından en erken üç (3) saat sonra başlayacaktır. Organizasyon Kurulu veya diğer IFMA yetkili delegeleri, Sağlık Kuruluna danıştıktan sonra durumun uygun olduğuna ve o günkü programın ilk tur maçlarına çıkacak sporcuları olumsuz etkilemeyeceğine karar verirse, müsabakaların daha kısa bir sürede başlamasına izin verilebilir.",
      en: "11.1: COMPETITION WEIGH-IN\nThe Competition Weigh-in is conducted each morning of competition. Competition shall start no earlier than three (3) hours after the close of the Competition Weigh-in. A shorter time may be permitted by the Organising Committee or other IFMA authorised delegates after consulting the Medical Commission, should it be determined as suitable and not detrimental to an Athlete taking part in the early contests of the forthcoming session."
    },
    when: { tr: "Sporcunun yarışacağı her günün sabahında.", en: "Each morning the athlete is scheduled to compete." },
    right: { tr: "Zorunlu sağlık kontrolü günlük tartıyla birlikte tamamlanır.", en: "The compulsory medical check is completed with the daily weigh-in." },
    related: ["WEIGH_GENERAL", "WEIGH_MEDICAL_EXAM"],
    tags: ["günlük tartı", "competition weigh-in", "3 saat", "11.1"]
  },
  {
    id: "WEIGH_EXCEPTION", module: "tarti", subtopic: "istisna", label: "ifma",
    rule: "11.3.4", revision: "2026-05-11", status: A,
    discipline: [], age: ["U24"], gender: [], role: ["weigh", "jury"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "İstisnai Durum", en: "Contentious Circumstance" },
    quick: {
      tr: "Seyahat aksaklığı Teknik Delege tarafından onaylanan U24 sporcuya 0,5 kg tolerans verilebilir; ilk müsabaka gününde Maç Öncesi Tartı zorunludur.",
      en: "An U24 athlete whose travel disruption is approved by the Technical Delegate may receive a 0.5 kg allowance; the Pre-contest Weigh-in is mandatory on the first competition day."
    },
    ruleText: {
      tr: "11.3.4: SEYAHAT KAYNAKLI İSTİSNAİ DURUM\nSeyahat koşullarındaki aksaklıklar nedeniyle tartıyı kaçırma riski olan ve Teknik Delege tarafından onaylanan bir U24 sporcusuna 0,5 kg tolerans tanınacaktır. Ancak bu sporcunun, müsabakanın ilk gününde istisnasız olarak Maç Öncesi Tartıya girmesi zorunludur.",
      en: "11.3.4: CONTENTIOUS CIRCUMSTANCE\nAn U24 athlete, approved by the Technical Delegate, who is likely to fail their weigh-in due to contentious travel circumstances, will be allowed a 0.5 kg allowance. However, they will be required to make the Pre-contest Weigh-in without exception on their first day of competition."
    },
    when: { tr: "Yalnızca Teknik Delege onaylı U24 seyahat aksaklığında.", en: "Only for a Technical Delegate-approved U24 travel disruption." },
    right: { tr: "Tolerans otomatik değildir; onay ve ilk gün Maç Öncesi Tartı birlikte aranır.", en: "The allowance is not automatic; approval and a first-day Pre-contest Weigh-in are both required." },
    related: ["WEIGH_5PCT", "WEIGH_GENERAL"],
    tags: ["istisna", "u24", "0.5 kg", "seyahat", "11.3.4"]
  },
  {
    id: "WEIGH_MEDICAL_EXAM", module: "tarti", subtopic: "saglik-muayenesi", label: "ifma",
    rule: "11.2", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["weigh", "jury"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Sağlık Muayenesi", en: "Medical Examination" },
    quick: {
      tr: "Sporcu her müsabaka gününde tartıdan hemen önce organizasyon doktoru tarafından muayene edilmeli ve yarışmaya uygun bulunmalıdır.",
      en: "On each competition day, the athlete must be examined immediately before weigh-in by the appointed doctor and passed fit to compete."
    },
    ruleText: {
      tr: "11.2: SAĞLIK MUAYENESİ\nSporcu, her müsabaka gününde tartıya çıkmadan hemen önce Organizasyon Kurulu tarafından görevlendirilen doktor tarafından muayene edilmeli ve yarışmaya uygun olduğuna dair onay almak zorundadır.",
      en: "11.2: MEDICAL EXAMINATION\nEach day of competition the Athlete must be passed as fit to compete by the doctor appointed by the Organising Committee immediately before being weighed in."
    },
    when: { tr: "Her müsabaka gününde, tartıdan hemen önce.", en: "Each competition day, immediately before weigh-in." },
    right: { tr: "Sağlık onayı olmadan tartı süreci tamamlanmış sayılmaz.", en: "The weigh-in process is not complete without medical clearance." },
    related: ["WEIGH_MEDICAL_FIT", "MED_KOH", "WEIGH_FAILED"],
    tags: ["sağlık muayenesi", "doktor", "tartı öncesi", "11.2"]
  },
  {
    id: "WEIGH_MEDICAL_FIT", module: "tarti", subtopic: "tibbi-uygunluk", label: "ifma",
    rule: "10.1, 10.1.2, 10.1.3, 10.3, 10.5, 10.6", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["weigh", "jury"],
    media: { photo: false, video: false, animation: false },
    restTable: {
      title: { tr: "Zorunlu Dinlenme Süreleri", en: "Mandatory Rest Periods" },
      roundsLabel: { tr: "Toplam raund", en: "Total rounds" },
      restLabel: { tr: "Zorunlu dinlenme", en: "Mandatory rest" },
      rows: [
        { rounds: "1", rest: { tr: "7 gün", en: "7 days" } },
        { rounds: "2-4", rest: { tr: "14 gün", en: "14 days" } },
        { rounds: "4-9", rest: { tr: "21 gün", en: "21 days" } },
        { rounds: "10+", rest: { tr: "28 gün", en: "28 days" } },
        { rounds: "KOH/RSCH", rest: { tr: "30 gün*", en: "30 days*" }, alert: true }
      ],
      note: {
        tr: "* KOH/RSCH durumlarında Kural 9.1'deki daha uzun zorunlu süreler önceliklidir.",
        en: "* For KOH/RSCH, the longer mandatory periods under Rule 9.1 take precedence."
      }
    },
    title: { tr: "Tıbbi Uygunluk", en: "Medical Aptitude" },
    quick: {
      tr: "Geçerli tıbbi beyan, engelli ve reşit olmayan sporcuların korunması, günlük doktor onayı, kesik kontrolleri ve zorunlu dinlenme süreleri birlikte değerlendirilir.",
      en: "The medical declaration, safeguards for disabled and minor athletes, daily doctor clearance, checks for cuts and mandatory recovery periods are assessed together."
    },
    ruleText: {
      tr: "10.1: TIBBİ BEYAN\nYetkili bir tıp doktoru tarafından imzalanmış, eksiksiz bir IFMA Tıbbi Beyan Formu bulunmayan hiçbir sporcunun müsabakaya katılmasına izin verilmeyecektir. Beyan İngilizce olarak doldurulmalı ve yetkili doktor tarafından imzalanmalıdır; beyan, sporcunun ülkesinden ayrılmadan önce fiziksel durumunun iyi olduğunu ve müsabaka kapasitesini etkileyebilecek herhangi bir sakatlık, enfeksiyon veya engellilik durumunun bulunmadığını teyit etmelidir. Sporcunun vücut ve uzuv bütünlüğü açısından uygun olmalıdır.\n\n10.1.2: ENGELLİ SPORCULAR İÇİN KATILIM ESASLARI\nEngelli sporcuların (vücut veya uzuv bütünlüğü tam olmayanlar dahil) dövüş veya teknik Muaythai müsabakalarına katılımına getirilen her türlü kısıtlama, yalnızca sert temaslı ortamlar için yapılan tıbbi ve güvenlik değerlendirmelerine dayanır ve ayrımcılık teşkil etmez. Engelli sporcular, gerekli diğer şartları karşıladıkları takdirde Muaythai müsabakalarına katılma hakkına sahip olabilir.\n\nKapsayıcılık ve Kültürel Gelişim Yolları\nSağlık, Sporcu ve Toplumsal Cinsiyet Eşitliği Kurulları; kültürel Muaythai müsabakaları dahil olmak üzere güvenli ve kapsayıcı katılım modellerini birlikte değerlendirecektir.\n\nPeriyodik Değerlendirme\nBu hükümler periyodik olarak gözden geçirilecek ve ilgili kurullar; sporcu güvenliğiyle uyumlu kapsayıcı müsabaka veya gösteri formatlarına ilişkin önerilerde bulunacaktır.\n\n10.1.3: REŞİT OLMAYAN SPORCULARIN KORUNMASI VE ONAYI\n18 yaşın altındaki sporcular için yapılan tüm tıbbi testler ve belgelendirmeler, sporcunun kendi ülkesindeki geçerli çocuk koruma ve tıbbi gizlilik yasalarına uygun olmalıdır. Bu tür testler yalnızca bir ebeveynin veya yasal vasinin bilgilendirilmiş onayı ile yapılabilir; bilgiler gizli tutulacak ve yalnızca sporcu sağlığı ve güvenliği amaçlarıyla kullanılacaktır.\n\n10.3: MÜSABAKA GÜNÜ TIBBİ UYGUNLUK ONAYI\nSporcu, her müsabaka günü ilgili organizasyonun yetkisi altında onaylanmış nitelikli bir tıp doktoru tarafından müsabakaya uygun bulunduğuna dair sağlık onayı almak zorundadır. Dünya Şampiyonaları, Dünya Kupası, Kıta Şampiyonaları ve Kıta Kupalarında bu onay, IFMA veya ilgili Kıta Federasyonunun Sağlık Kurulu tarafından yetkilendirilen doktorlar tarafından verilir.\n\n10.5: KESİKLER VE SIYRIKLAR\nSporcunun kafa derisinde veya yüzünde (burun ve kulaklar dahil) bir kesik, yara, sıyrık, yırtılma veya kan toplanması (hematom) üzerinde pansuman/bandaj varsa, maça çıkmasına izin verilmeyecektir. Bir sıyrık steri-strip/dikiş bandı ile kapatılmışsa sporcunun yarışmasına izin verilir. Bu karar, müsabaka günü sporcuyu muayene eden doktor tarafından verilmelidir.\n\n10.6: FİZİKSEL HAZIRLIK VE ZORUNLU DİNLENME SÜRELERİ\nSporcular, bir sonraki maçlarına veya gelecekteki müsabakalarına fiziksel olarak hazır olabilmeleri için katıldıkları her maçın ardından toplam raund sayılarına göre zorunlu dinlenme sürelerine uymak zorundadır.\n• Tek bir müsabakada toplam bir (1) raund maç yaparak kazanan sporcular yedi (7) gün dinlenmelidir.\n• Tek bir müsabakada toplam dört (4) raunda kadar maç yaparak kazanan sporcular en az on dört (14) gün dinlenmelidir.\n• Tek bir turnuva içerisinde toplam dört (4) ila dokuz (9) raund maç yapan sporcular en az yirmi bir (21) gün dinlenmelidir.\n• Tek bir turnuvada toplam on (10) veya daha fazla raund maç yapan sporcular en az yirmi sekiz (28) gün dinlenmelidir.\n• KOH veya RSCH durumunda Kural 9.1'deki zorunlu süreler diğer tüm dinlenme kurallarından önceliklidir.",
      en: "10.1: MEDICAL DECLARATION\nNo Athlete shall be allowed to compete without having a completed IFMA Medical Declaration Form, which must be signed by an authorised Doctor of Medicine. The medical declaration must be completed in the English language stating that prior to leaving their country the Athlete was in good physical condition and not suffering from any injury, infection or disability liable to affect the Athlete's capacity to compete. The Athlete must be intact and of full body.\n\n10.1.2: DISABILITY CLAUSE\nAny restriction on participation of Athletes with a disability, including not being intact or of full body, in combat or technical Muaythai competitions is based solely on medical and safety assessments in high-impact environments and shall not constitute discrimination. Athletes with a disability may still be eligible to compete in cultural Muaythai competitions, provided they meet the other necessary requirements.\n\nInclusion and Cultural Pathways\nThe Medical, Athletes, and Gender Equality Commissions shall work together to explore safe, inclusive participation formats, including in Muaythai cultural competitions.\n\nReview Clause\nThese provisions shall be reviewed periodically, with the Medical, Athletes, and Gender Equality Commissions making recommendations for inclusive competition or demonstration formats consistent with Athlete safeguarding.\n\n10.1.3: MINORS SAFEGUARDING AND CONSENT\nAll medical testing and documentation for Athletes under 18 must comply with applicable child protection and medical confidentiality laws in the Athlete's home jurisdiction. Such testing may only be conducted with the informed consent of a parent or legal guardian, and the information shall be treated as confidential and used solely for Athlete health and safety purposes.\n\n10.3: COMPETITION MEDICAL CERTIFICATION\nOn each day of competition the Athlete shall be certified as fit to compete by a qualified doctor of medicine approved by the Association under whose jurisdiction the competition is taking place, or at World Championships, World Cup, Continental Championships and Continental Cup by the medical commission of IFMA or the Continental Federation.\n\n10.5: CUTS AND ABRASIONS\nNo Athlete shall be allowed to take part in any contest if the Athlete is wearing a dressing on a cut, wound, abrasion, laceration or blood swelling on the Athlete's scalp or face including the nose and ears. An Athlete is allowed to compete if an abrasion is covered with steri-strip. The decision should be made by the doctor examining the Athlete on the day of competition.\n\n10.6: PHYSICAL READINESS\nAthletes must observe mandatory recovery periods after each contest to ensure they are physically fit for their next contest or future competition.\n• Winning a competition within one (1) round: rest for at least seven (7) days.\n• Winning a competition within up to four (4) rounds: rest for at least fourteen (14) days.\n• Accumulating four (4) to nine (9) rounds across contests in a single tournament: rest for at least twenty-one (21) days.\n• Accumulating ten (10) or more rounds in a single tournament: rest for at least twenty-eight (28) days.\n• KOH/RSCH requirements under Rule 9.1 supersede all other recovery rules."
    },
    when: { tr: "Kayıt, sağlık kontrolü ve her müsabaka gününde.", en: "At registration, medical checks and on each competition day." },
    right: { tr: "Doktor onayı ve zorunlu dinlenme süreleri birlikte doğrulanır.", en: "Medical clearance and mandatory recovery periods are verified together." },
    related: ["MED_FORM", "MED_KOH", "WEIGH_MEDICAL_EXAM"],
    tags: ["tıbbi uygunluk", "engelli sporcu", "reşit olmayan", "kesik", "dinlenme", "10.1", "10.1.2", "10.1.3", "10.3", "10.5", "10.6"]
  },
  {
    id: "WEIGH_OFFICIAL", module: "tarti", subtopic: "resmi-kayit", label: "ifma",
    rule: "11.1, 11.1.1", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["weigh", "jury"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Resmi Kayıt Tartısı", en: "Official Weigh-in" },
    quick: {
      tr: "Resmi Kayıt Tartısı müsabakanın başlamasından bir gün önce ve yalnızca Teknik Delegenin takdirine bağlı olarak yapılır.",
      en: "The Official Weigh-in is held one day before competition and only at the discretion of the Technical Delegate."
    },
    ruleText: {
      tr: "11.1: RESMİ KAYIT TARTISI\nResmi Kayıt Tartısı, müsabakanın başlamasından bir (1) gün önce gerçekleştirilir.\n\n11.1.1: TEKNİK DELEGE KARARI\nResmi Kayıt Tartısı yalnızca Teknik Delegenin takdirine bağlı olarak gerçekleştirilecektir.",
      en: "11.1: OFFICIAL WEIGH-IN\nThe Official Weigh-in is conducted one (1) day prior to the start of competition.\n\n11.1.1: TECHNICAL DELEGATE DECISION\nThe Official Weigh-in will be conducted only at the discretion of the Technical Delegate."
    },
    when: { tr: "Müsabaka öncesi ve günlerinde.", en: "Before and on competition days." },
    right: { tr: "Teknik Delege isterse bu tartı müsabakanın tamamı için sporcunun sıkletini belirler.", en: "When required, this weigh-in determines the athlete's class for the entire competition." },
    wrong: { tr: "Teknik Delege kararı olmadan Resmi Kayıt Tartısı uygulamak.", en: "Conducting the Official Weigh-in without the Technical Delegate's decision." },
    related: ["WEIGH_GENERAL", "WEIGH_DAILY"],
    tags: ["resmi kayıt tartısı", "official weigh-in", "teknik delege", "11.1", "11.1.1"]
  },
  {
    id: "WEIGH_STANDARD", module: "tarti", subtopic: "katilim-standardi", label: "ifma",
    rule: "11.3.2", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["weigh"],
    media: { photo: true, video: false, animation: false },
    imgs: [{ src: "assets/img/tarti-kilik-kiyafet-kurallari.png", cap: { tr: "Tartı kılık kıyafet kuralları: takı, çorap, uzun ayak tırnağı ve tıraşsız katılım yasaktır.", en: "Weigh-in dress code: jewellery, socks, long toenails and unshaved facial hair are not permitted." } }],
    title: { tr: "Tartıya Katılım Standartları", en: "Weigh-in Participation Standards" },
    quick: {
      tr: "Sporcular tartıya uygun hafif iç çamaşırıyla ve müsabakaya tamamen hazır halde çıkar (çorapsız, sakal tıraşı olmuş, ayak tırnakları kesilmiş vb.).",
      en: "Athletes weigh in wearing suitable lightweight undergarments, fully prepared for competition (no socks, facial hair shaved, toenails trimmed, etc.)."
    },
    ruleText: {
      tr: "11.3.2: TARTIYA KATILIM STANDARTLARI\nSporcular tartı işlemini hafif ve uygun bir iç çamaşırıyla ve müsabakaya tamamen hazır bir halde (örneğin; çorapsız, sakal tıraşı olmuş, ayak tırnakları kesilmiş vb.) tamamlamak zorundadır.",
      en: "11.3.2: CLOTHING & DRESS\nAthletes must complete their weigh-in in suitable lightweight undergarments, and in a fully prepared state for competition (e.g. no socks, facial hair shaved, trimmed toenails, etc.)."
    },
    when: { tr: "Her tartıda.", en: "At every weigh-in." },
    right: { tr: "Kadın sporcuların tartısı aynı yapı ve modelle ayrı yürütülür (11.3.5–11.3.6).", en: "Female weigh-ins are conducted separately using the same structure (11.3.5–11.3.6)." },
    wrong: { tr: "Uygun olmayan kıyafetle veya hazırlıksız tartıya çıkmak.", en: "Weighing in with unsuitable clothing or unprepared." },
    related: ["WEIGH_OFFICIAL", "WEIGH_ROOM"],
    tags: ["tartı görünüm", "iç çamaşırı", "11.3.2"]
  },
  {
    id: "WEIGH_ROOM", module: "tarti", subtopic: "oda-gorevleri", label: "ifma",
    rule: "11.3.6, 11.3.7", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["weigh", "jury"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Tartı odası görev dağılımı", en: "Weigh-in room staffing" },
    quick: {
      tr: "Bir Tartı Noktası 3 Teknik Görevliden oluşur: giriş kontrolü, kilo ölçümü ve belgelendirme. Bir Jüri üyesi Tartı Baş Sorumlusu olarak atanır.",
      en: "A Weigh-in Station has 3 Technical Officials: entry control, weight measurement and documentation. One Jury member is appointed Head of Weigh-ins."
    },
    ruleText: {
      tr: "11.3.6: GÖREVLENDİRME\nBu bölüm, o gün tartıya girmesi planlanan toplam sporcu sayısına ve mevcut zaman dilimine bağlı olarak, sporcu tartılarının yürütülmesi için gereken Teknik Görevli sayısına ilişkin öneri sunmaktadır.\n• Tartı Noktası: Bir Tartı Noktası üç (3) Teknik Görevliden oluşur; giriş kontrolü için bir (1), kilo ölçümü için bir (1) ve belgelendirme/kayıt için bir (1) görevli.\n• Jüri Görevlisi: Bir (1) Jüri Görevlisi Tartı Baş Sorumlusu olarak atanır. Tüm tartı noktalarını denetler, prosedürlere uyulmasını sağlar, anlaşmazlıkları veya usulsüzlükleri çözüme kavuşturur ve gerektiğinde tartı sonuçlarını onaylar.\n• Tartı İşlem Kapasitesi: Bir Tartı Noktası yaklaşık olarak saatte yirmi (20) sporcunun, iki ila üç (2-3) saatlik bir zaman diliminde ise kırk ila altmış (40-60) sporcunun tartı işlemini gerçekleştirir.\n• 60 sporcu = 3 Teknik Görevli + 1 Jüri (1 Tartı Noktası, 1 Ring).\n• 120 sporcu = 6 Teknik Görevli + 1 Jüri (2 Tartı Noktası, 1-2 Ring).\n• 180 sporcu = 9 Teknik Görevli + 1 Jüri (3 Tartı Noktası, 2-3 Ring).\n• 300 sporcu = 15 Teknik Görevli + 1 Jüri (5 Tartı Noktası, 3-4 Ring).\nKadın sporcuların tartıları aynı yapı ve görevlendirme modeli kullanılarak ayrı şekilde gerçekleştirilir.\n\n11.3.7: BASKÜL\nElektronik basküllerin kullanılması tavsiye edilir ve ağırlığı metrik sistemde (kg cinsinden) göstermelidir.",
      en: "11.3.6: STAFFING\nThis section provides a recommendation for the number of Technical Officials required to conduct Athlete weigh-ins, based on the total number of Athletes scheduled for weigh-in on that day and the available time window.\n• Weigh-in Station: A Weigh-in Station consists of three (3) Technical Officials; one (1) for entry control, one (1) for weight measurement and one (1) for documentation.\n• Jury Official: One (1) Jury Official shall be appointed as Head of Weigh-ins. The official oversees all stations, ensures compliance, resolves disputes or irregularities and validates outcomes where required.\n• Processing Capacity: One (1) station processes approximately twenty (20) Athletes per hour, or forty to sixty (40-60) Athletes within a two to three (2-3) hour window.\n• 60 Athletes = 3 Technical Officials + 1 Jury (1 Station, 1 Ring).\n• 120 Athletes = 6 Technical Officials + 1 Jury (2 Stations, 1-2 Rings).\n• 180 Athletes = 9 Technical Officials + 1 Jury (3 Stations, 2-3 Rings).\n• 300 Athletes = 15 Technical Officials + 1 Jury (5 Stations, 3-4 Rings).\nFemale weigh-ins shall be conducted separately using the same structure and staffing model.\n\n11.3.7: SCALE\nElectronic scales are recommended and shall present the weight in metric."
    },
    when: { tr: "Tartı organizasyonunda.", en: "In organising the weigh-in." },
    right: { tr: "Bir nokta saatte ~20 sporcu işler. Ölçek: 60 sporcu = 3 görevli + 1 jüri; 120 = 6+1; 180 = 9+1; 300 = 15+1 (11.3.6).", en: "One station processes ~20 athletes/hour. Scaling: 60 athletes = 3 officials + 1 jury; 120 = 6+1; 180 = 9+1; 300 = 15+1 (11.3.6)." },
    wrong: { tr: "Görevli sayısını sporcu sayısına göre planlamamak.", en: "Not scaling official numbers to the athlete count." },
    related: ["WEIGH_STANDARD", "WEIGH_OFFICIAL"],
    tags: ["tartı odası", "görevli", "staffing", "baskül", "elektronik", "11.3.6", "11.3.7"]
  },
  {
    id: "WEIGH_NATIONAL_RECORD", module: "tarti", subtopic: "ulusal-tutanak", label: "national",
    rule: "—", revision: "2026-05-11", status: P,
    source: { tr: "Ulusal müsabaka uygulaması", en: "National competition practice" },
    discipline: [], age: [], gender: [], role: ["weigh", "jury"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Tartı Tutanağı (Ulusal Maçlar)", en: "Weigh-in Record (National Bouts)" },
    quick: {
      tr: "Ulusal müsabakalarda kullanılacak tartı tutanağı için ayrılmış bölümdür. Resmî tutanak dosyası sağlandığında bu alana eklenecektir.",
      en: "This section is reserved for the weigh-in record used in national bouts. The official record file will be added here when supplied."
    },
    when: { tr: "Ulusal maçların tartı sürecinde.", en: "During the weigh-in process for national bouts." },
    related: ["WEIGH_ROOM", "WEIGH_FAILED"],
    tags: ["tartı tutanağı", "ulusal maç", "weigh-in record"]
  },
  {
    id: "WEIGH_FAILED", module: "tarti", subtopic: "elenme", label: "ifma",
    rule: "11.4", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["weigh", "jury"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Tartıda Elenme", en: "Failed Weigh-in" },
    quick: {
      tr: "Sıkletine uygun bulunmayan veya sağlık kontrolünü geçemeyen sporcu otomatik mağlup sayılır; rakibine Hükmen Galibiyet (WO) verilir.",
      en: "An athlete who fails to qualify for the weight class or pass the medical check automatically loses; the opponent receives a Walk Over (WO)."
    },
    ruleText: {
      tr: "11.4: TARTIDA ELENME\nSıklet kategorisine uygun bulunmayan veya sağlık kontrolünü geçemeyen sporcu otomatik olarak mağlup sayılır ve Hükmen Galibiyet (WO) kararı verilir. Bu durumda rakip sporcunun ringe çıkması gerekmez.",
      en: "11.4: FAILED\nAn Athlete who fails to qualify for their weight classification or fails to pass the medical check will automatically receive a loss, and a Walk Over (WO) decision will be given. Their opponent will not be required to present themselves at the ring."
    },
    when: { tr: "Sıklet veya sağlık kontrolü başarısız olduğunda.", en: "When the athlete fails the weight classification or medical check." },
    right: { tr: "Rakibe WO verilir; ringe çıkması gerekmez.", en: "The opponent receives a WO and need not appear in the ring." },
    related: ["WEIGH_GENERAL", "WEIGH_MEDICAL_EXAM"],
    tags: ["tartıda elenme", "wo", "walk over", "sağlık kontrolü", "11.4"]
  },

  /* ===================== MÜSABAKA ALANI ===================== */
  {
    id: "AREA_FOP", module: "alan", subtopic: "kurulum", label: "ifma",
    rule: "13.1–13.2.2", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: [],
    media: { photo: true, video: false, animation: false },
    imgs: [
      { src: "assets/img/fop-ring.png", cap: { tr: "Ring müsabaka alanı yerleşimi", en: "Ring field-of-play layout" } },
      { src: "assets/img/fop-tatami.png", cap: { tr: "Teknik ve kültürel müsabaka alanı", en: "Technical and cultural contest area" } }
    ],
    title: { tr: "Müsabaka Alanı Kurulumu", en: "Competition Area Setup" },
    quick: {
      tr: "Müsabaka alanı Teknik Delegenin belirlediği düzende kurulur; asgari ölçü 18×18 metredir ve her ek ring için genişliğe 18 metre eklenir.",
      en: "The competition area is set up as determined by the Technical Delegate; the minimum size is 18×18 m and each additional ring requires 18 m extra width."
    },
    ruleText: {
      tr: "13.1: MÜSABAKA ALANI KURULUMU\nMüsabaka alanı, Teknik Delege tarafından belirlenen şekilde Şekil 1 veya Şekil 2’ye uygun olarak kurulacaktır.\n13.2: RİNG İLAVESİ\nŞampiyonalarda Şekil 3 veya Şekil 4'e uygun olarak iki veya daha fazla ring kullanılabilir. Bir etkinlikte birden fazla ring kullanılıyorsa tüm ringlerde, ring etrafında oturan Yan Hakem sayısı aynı olmak zorundadır.\n13.2.1: MÜSABAKA ALANI ÖLÇÜLERİ\nAsgari müsabaka alanı boyutu 18×18 metredir. Her ek ring için genişliğe ilave 18 metre eklenmesi gerekir. Bu ölçüler Teknik Delegenin kararına göre değişiklik gösterebilir.\n13.2.2: TEKNİK VE KÜLTÜREL MÜSABAKA ALANI\nTeknik Delege, IFMA Yönetim Kurulunun onayına tabi olmak kaydıyla Muaythai teknik ve geleneksel müsabakaları için Tatami Alanı kullanabilir. Bu alan Şekil 5 ve Kural 41'e uygun olmalıdır.",
      en: "13.1: COMPETITION AREA SETUP\nThe competition area shall be set up as per Figure 1 or Figure 2 as determined by the Technical Delegate.\n13.2: ADDITIONAL RINGS\nTwo or more rings may be used in championships as per Figure 3 or Figure 4. If more than one ring is used, all rings shall use the same number of Judges seated around the ring.\n13.2.1: FOP MEASUREMENT\nThe minimum FOP size is 18×18 metres. Every additional ring requires an extra 18 metres in width. This is subject to change by the Technical Delegate.\n13.2.2: TECHNICAL AND CULTURAL CONTEST AREA\nThe Technical Delegate may use a Contest Area for Muaythai technical and traditional competitions, subject to approval by the IFMA Executive Committee. The area shall follow Figure 5 and Rule 41."
    },
    related: ["AREA_MEDIA", "AREA_RING"],
    tags: ["fop", "müsabaka alanı", "ring", "tatami", "18 metre", "13.1", "13.2"]
  },
  {
    id: "AREA_MEDIA", module: "alan", subtopic: "medya", label: "ifma",
    rule: "13.3–13.3.3", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: [],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Medya", en: "Media" },
    quick: {
      tr: "Medya doktorun erişimini ve görevlilerin görüşünü engelleyemez; takım başına yalnızca bir medya temsilcisi FOP'a girebilir.",
      en: "Media may not impede the Doctor's access or officials' line of sight; only one media representative per team may enter the FOP."
    },
    ruleText: {
      tr: "13.3: MEDYA\nFotoğrafçılar, kameramanlar ve diğer medya mensupları doktorun ring merdivenlerine erişimini engellememek kaydıyla tarafsız köşelerden herhangi birinin zemininde durabilir. Teknik Delege belirli medya personeline ring apronunda durma izni verebilir. Medya, raund araları dahil müsabaka sırasında hiçbir zaman Yan Hakemlerin arkasında veya Jürinin önünde duramaz; görüş açılarını engellememelidir.\n13.3.1: ULUSLARARASI SOSYAL MEDYA EKİBİ\nIFMA tarafından onaylanıp görevlendirilen Uluslararası Sosyal Medya Ekibi, IFMA onaylı etkinliklerde müsabaka boyunca FOP'a sınırsız erişebilir. Bu erişim tarafsız köşeleri, Teknik Delegenin izin verdiği ring apronunu ve resmi içerik üretimi için diğer onaylı alanları kapsar. Ekip Kural 13.3'e uymalı; görevlileri, sağlık personelini veya sporcuları engellememelidir.\n13.3.2: TAKIM MEDYA TEMSİLCİSİ\nBir takımın maçı sırasında FOP'a o takımdan yalnızca bir medya temsilcisi girebilir. Temsilci müsabakayı veya görevlileri engelleyemez ve raund araları dahil müsabaka boyunca sporcu ya da Köşe Görevlileriyle iletişim kuramaz.\n13.3.3: VİDEO ANLIK TEKRARI (VAR)\nYalnızca müsabakanın sona ermesine yol açan kritik durumların incelenmesinde kullanılabilir. VAR kullanım şartları resmi IFMA VAR Protokollerinde tanımlanır ve her şampiyona için Teknik Delegenin onayına tabidir.",
      en: "13.3: MEDIA\nPhotographers, videographers and other media may stand on the floor at either neutral corner without impeding the Doctor's access to the ring stairs. The Technical Delegate may permit specific media personnel on the ring apron. Media must never stand behind the Judges or in front of the Jury, including during round breaks, and must not obstruct their line of sight.\n13.3.1: INTERNATIONAL SOCIAL MEDIA TEAM\nIFMA-accredited International Social Media Team representatives have unrestricted FOP access during competition at IFMA-sanctioned events. This includes neutral corners, the ring apron where permitted by the Technical Delegate and other approved areas for official content. They must comply with Rule 13.3 and must not impede officials, medical personnel or athletes.\n13.3.2: TEAM MEDIA\nOnly one media representative from each team may enter the FOP during that team's contest. The representative must not impede the competition or communicate with the athlete or Seconds at any time, including round breaks.\n13.3.3: VIDEO INSTANT REPLAY\nIt may be used only to review a critical incident that brought the contest to an end. VAR use is governed by official IFMA VAR Protocols and requires Technical Delegate approval for each championship."
    },
    related: ["AREA_FOP"],
    tags: ["medya", "fotoğrafçı", "kameraman", "var", "13.3"]
  },
  {
    id: "AREA_RING", module: "alan", subtopic: "ring", label: "ifma",
    rule: "14.1–14.3", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: [],
    media: { photo: true, video: false, animation: false },
    imgs: [
      { src: "assets/img/ring-dimensions.png", cap: { tr: "Ring ölçüleri ve teknik kurulum", en: "Ring dimensions and technical setup" } }
    ],
    title: { tr: "Ring", en: "The Ring" },
    quick: {
      tr: "Kural 14; ring ölçülerini, platformu, köşeleri, zemini, ipleri, ring ekipmanını ve köşe alanı güvenliğini birlikte düzenler.",
      en: "Rule 14 governs ring dimensions, platform, corners, floor, ropes, ring equipment and corner-area safety."
    },
    ruleText: {
      tr: "14.1: TEKNİK ÖZELLİKLER\nTüm müsabakalarda ring Kural 14'teki teknik gerekliliklere uygun olmalıdır.\n14.1.1: BOYUT\nRingin ipler arasındaki iç ölçüsü en az 6 m, en fazla 6,5 m; platform yüksekliği yerden 1,2–1,5 m olmalıdır.\n14.1.2: PLATFORM VE KÖŞE YASTIKLARI\nPlatform güvenli, düz, çıkıntısız olmalı ve iplerin dışına en az 90 cm uzanmalıdır. Dört köşe direği iyi yastıklanmış, 10–12,5 cm çapında ve yerden en fazla 2,85 m yüksekliğinde olmalıdır. Jüri masasına göre köşeler: yakın sol kırmızı, uzak sol beyaz, uzak sağ mavi, yakın sağ beyazdır.\n14.1.3: ZEMİN KAPLAMASI\nZemin 2,5–3,75 cm kalınlığında keçe, kauçuk veya aynı esneklikte onaylı dolgu ile kaplanmalı; branda dolgu üzerine gerilip sabitlenmeli ve platformun tamamını kaplamalıdır.\n14.1.4: İPLER\nKöşe direkleri arasında 3–5 cm kalınlığında dört gergin ip bulunur. İp yükseklikleri yerden 45, 80, 115 ve 150 cm'dir. İpler yumuşak veya pürüzsüz malzemeyle kaplanır ve her kenarda eşit aralıklı, kaymayan, 3–4 cm genişliğinde iki kanvas şeritle birbirine bağlanır.\n14.1.5: GERME APARATLARI\nİp germe aparatları en az 2 cm köpükle kaplanmalı ve cırt cırtlı kılıf veya bantla güvenle sabitlenmelidir.\n14.2: RİNG EKİPMANI\nMüsabaka alanında: renkli köşelerde sporcular için iki ve tarafsız köşede Hakem/doktor için bir olmak üzere üç merdiven; Köşe Görevlileri için dört sandalye ve sporcular için iki tabure; iki çöp kovası; iki paspas; görevli masaları ve sandalyeleri bulunmalıdır. Beş Yan Hakem için beş, üç Yan Hakem için üç ayrı masa; TD/COJ ve yardımcısı için iki sandalyeli bir masa; Jüri için üç sandalyeli bir masa; skor görevlileri, Zaman/Anons Hakemi ve doktor/sağlık personeli için ikişer sandalyeli birer masa hazırlanır. Ayrıca tarafsız köşelerde kullanılmış kan pedleri için plastik torbalar; beyaz pudrasız latekssiz eldivenler; en az ikişer kırmızı/mavi bant; saç filesi; gong veya zil; bir, tercihen iki kronometre; elektronik puanlama sistemi veya skor kartları; ana ve yedek mikrofon; sedye veya hasta yatağı; görevli masalarıyla seyirciler arasında en az 1,5 m bariyer bulunmalıdır. Yalnızca IFMA onaylı ringlere izin verilir.\n14.3: KÖŞELERDE DİKKAT EDİLECEK HUSUSLAR\nİplerin içindeki köşe alanları su ve atıklardan arındırılmış tutulur. Ring çevresinde basınçlı şişe bulundurulamaz.",
      en: "14.1: SPECIFICATIONS\nIn all competitions the ring shall conform to Rule 14.\n14.1.1: SIZE\nThe ring shall measure 6–6.5 m inside the ropes and stand 1.2–1.5 m above the ground.\n14.1.2: PLATFORM AND CORNER PADS\nThe platform shall be safe, level, free of projections and extend at least 90 cm beyond the ropes. Four well-padded posts shall measure 10–12.5 cm in diameter and no more than 2.85 m from the ground. Relative to the Jury table, corners are near-left red, far-left white, far-right blue and near-right white.\n14.1.3: FLOOR COVERING\nThe floor shall have 2.5–3.75 cm of felt, rubber or equivalent approved padding. Canvas shall be stretched and secured over it, and both shall cover the whole platform.\n14.1.4: ROPES\nFour taut ropes, 3–5 cm thick, shall be set at 45, 80, 115 and 150 cm. They shall be covered with soft or smooth material and joined on each side by two non-sliding, closely textured canvas ties 3–4 cm wide.\n14.1.5: TURNBUCKLES\nTurnbuckles shall be covered by at least 2 cm of foam and securely fastened with a Velcro cover or tape.\n14.2: RING EQUIPMENT\nThe FOP shall contain three sets of steps; four seats for Seconds and two stools for athletes; two shallow trays; two mops; and the required officials' tables and chairs. Provide five tables for five Judges or three for three Judges; one two-chair table for the TD/COJ and Assistant; one three-chair Jury table; and two-chair tables for scorekeepers, Timekeeper/Announcer and medical staff. Also provide plastic waste bags at neutral corners, white powderless non-latex gloves, at least two red and two blue tape rolls, hairnets, a gong or bell, one (preferably two) stopwatches, electronic scoring or scorecards, main and backup microphones, a stretcher or gurney and a barrier at least 1.5 m from officials' tables to spectators. Only IFMA-approved rings are permitted.\n14.3: CORNER ACTIVITY\nCorner areas inside the ropes shall be kept clean of water and debris. Bottles under compression are not permitted ringside."
    },
    related: ["AREA_FOP"],
    tags: ["ring", "ölçü", "platform", "ip", "ring ekipmanı", "14"]
  },

  /* ===================== EKİPMAN ===================== */
  {
    id: "AREA_EQUIP", module: "ekipman", subtopic: "kategoriler", label: "ifma",
    rule: "15.1–15.9", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref", "corner"],
    media: { photo: false, video: false, animation: false },
    tableDiagram: "equipment-category-table",
    title: { tr: "Kategorilere Göre Zorunlu Ekipmanlar", en: "Mandatory Equipment by Category" },
    quick: {
      tr: "Temel ekipman tüm dövüş kategorilerinde zorunludur; gövde ve kadın göğüs koruyucusunun durumu kategoriye göre değişir.",
      en: "Core equipment is mandatory in all combat divisions; body and female chest protection vary by division."
    },
    ruleText: {
      tr: "KURAL 15: SPORCU EKİPMANLARI VE GİYİM KURALLARI\nTüm sporcular IFMA onaylı eldiven, bandaj/el sargısı, kask, kaval koruyucu, dirseklik, dişlik, kişisel kasık koruyucu, Muaythai şortu ve köşe renginde atlet kullanır. Mongkon Wai Kru sırasında zorunludur; Prajiad kullanılabilir.\n15.4: GÖVDE KORUYUCU\nKöşe rengiyle uyumlu gövde koruyucu U8–U24 ile Masters 40+ ve 45+ kategorilerinde zorunlu; Elite ve Masters 35+ kategorilerinde kullanılmaz.\n15.8: KADIN GÖĞÜS KORUYUCU\nMasters 35+ ve Elite kadın sporcularda zorunlu; Masters 40+/45+ ve U8–U24 kadın sporcularda isteğe bağlıdır.\n15.12: EKİPMAN VE GİYİM İHLALLERİ\nStandartlara uymayan ekipman veya kıyafetle sporcu müsabakaya alınmaz. Eldiven veya kıyafet açılırsa Orta Hakem düzeltilmesi için maçı durdurur.",
      en: "RULE 15: ATHLETE EQUIPMENT AND DRESS\nAll athletes use IFMA-approved gloves, bandages/hand wraps, head guard, shin guards, elbow guards, gum shield, personal groin guard, Muaythai shorts and a corner-colour singlet. The Mongkon is mandatory during the Wai Kru; a Prajiad may be worn.\n15.4: BODY PROTECTOR\nA corner-colour body protector is mandatory for U8–U24 and Masters 40+/45+, and is not worn in Elite or Masters 35+.\n15.8: FEMALE CHEST PROTECTION\nIt is mandatory for female Masters 35+ and Elite athletes, and optional for female Masters 40+/45+ and U8–U24 athletes.\n15.12: EQUIPMENT AND DRESS INFRACTIONS\nAn athlete whose equipment or dress does not conform is excluded. If a glove or dress becomes undone, the Referee stops the contest to have it attended to."
    },
    related: ["REF_RINGGIRIS"],
    tags: ["zorunlu ekipman", "kategori", "gövde koruyucu", "göğüs koruyucu", "15"]
  },
  {
    id: "EQUIP_GLOVES", module: "ekipman", subtopic: "ekipmanlar", label: "ifma",
    rule: "15.1–15.1.4", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref", "corner"],
    media: { photo: true, video: false, animation: false },
    imgs: [{ src: "assets/img/equipment-gloves.png", cap: { tr: "10 ons Muaythai müsabaka eldiveni", en: "10-ounce Muaythai competition glove" } }],
    title: { tr: "Eldiven", en: "Gloves" },
    quick: { tr: "Yalnızca IFMA onaylı, 10 ons, temiz ve kullanılabilir kırmızı/mavi eldivenler kullanılır.", en: "Only IFMA-approved, 10-ounce, clean and serviceable red/blue gloves are used." },
    ruleText: {
      tr: "15.1: ELDİVENLER\nSporcular organizatörün belirlediği ve IFMA'nın onayladığı eldivenleri kullanır.\n15.1.1: UYGUNLUK ONAYI\nOrganizasyon, müsabakayı denetleyen ilgili IFMA kuruluşundan eldiven onayı alır. Belirli üretici şartı yoksa kolay temin edilen IFMA onaylı eldiven kullanılabilir.\n15.1.2: TEKNİK ÖZELLİKLER\nEldivenler 10 ons (284 g) olmalı; deri kısmı toplam ağırlığın yarısını geçmemeli, dolgu en az yarısını oluşturmalıdır. Dolgu yerinden çıkmış veya deforme olmamalıdır. Aynı maçtaki sporcular aynı üreticinin birebir aynı, temiz, kullanılabilir kırmızı ve mavi eldivenlerini takar.\n15.1.3: ELDİVEN DENETİMİ\nEldiven, sargı ve bandajlar bir veya iki Eldiven Denetçisinin gözetiminde takılır. Denetçiler bilek kısmını bantlayıp imzalar ve sporcu ringe girene kadar güvenlik kontrolünü sürdürür.\n15.1.4: ELDİVENLERİN ÇIKARILMASI\nEldivenler karar açıklandıktan sonra ring dışında çıkarılır.",
      en: "15.1: GLOVES\nAthletes wear gloves designated by the organiser and approved by IFMA.\n15.1.1: CERTIFICATION\nThe organiser obtains approval from the appropriate IFMA federation. If no manufacturer is designated, any readily available IFMA-approved glove may be used.\n15.1.2: SPECIFICATION\nGloves weigh 10 ounces (284 g); leather is no more than half and padding no less than half of total weight. Padding must not be displaced or broken. Both athletes use identical clean, serviceable red and blue gloves from the same manufacturer.\n15.1.3: GLOVE SUPERVISION\nGloves, wraps and bandages are fitted under one or two appointed supervisors. They tape and sign each wrist and maintain security checks until ring entry.\n15.1.4: WHEN TO REMOVE GLOVES\nGloves are removed outside the ring after the decision is announced."
    },
    related: ["EQUIP_WRAPS"], tags: ["eldiven", "gloves", "10 ons", "15.1"]
  },
  {
    id: "EQUIP_WRAPS", module: "ekipman", subtopic: "ekipmanlar", label: "ifma",
    rule: "15.2–15.2.2", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref", "corner"],
    media: { photo: true, video: false, animation: false },
    imgs: [{ src: "assets/img/wraps.jpg", cap: { tr: "Tıbbi bandaj ve cırt cırtlı el sargısı", en: "Surgical bandage and Velcro hand wrap" } }],
    title: { tr: "Bandaj", en: "Bandages and Hand Wraps" },
    quick: { tr: "Her el için en fazla 5 m uzunlukta, 5 cm genişlikte tıbbi bandaj veya 5 m Velcro el sargısı kullanılabilir.", en: "Each hand may use up to 5 m of surgical bandage no wider than 5 cm, or a 5 m Velcro hand wrap." },
    ruleText: {
      tr: "15.2: BANDAJLAR VE EL SARGILARI\nHer el için 5 m'den uzun ve 5 cm'den geniş olmayan yumuşak tıbbi bandaj veya 5 m'den uzun olmayan Velcro el sargısı kullanılır; başka tür kabul edilmez. Kıtasal ve Dünya turnuvalarında bandajları organizasyon kurulu sağlar.\n15.2.1: BANT KULLANIMI\nBandaj yerine kauçuk veya yapışkan flaster dahil hiçbir bant kullanılamaz. Yalnızca bandajı sabitlemek için bileğin üstünde 7,5×2,5 cm tek şerit bant kullanılabilir. Aykırı bantlama ihlaldir.\n15.2.2: BANDAJ KONTROLÜ\nBandaj/el sargısı ekipman verilmeden önce kontrol edilir; maç kararı sonrasında dahi Hakem veya Jüri yeniden inceleyebilir. Sargı yoksa veya kural dışı bantlama varsa Baş Jüriye bildirilir ve disiplin incelemesi yapılır.",
      en: "15.2: BANDAGES AND HAND WRAPS\nEach hand uses soft surgical bandage no longer than 5 m and no wider than 5 cm, or a Velcro hand wrap no longer than 5 m; no other type is accepted. The organising committee provides bandages at Continental and World tournaments.\n15.2.1: TAPE\nTape, rubber or adhesive plaster may not replace bandage. One adhesive strip 7.5×2.5 cm may secure the bandage at the upper wrist. Other taping is a violation.\n15.2.2: INSPECTION\nWraps are inspected before equipment is issued and may be rechecked by the Referee or Jury, even after the decision. Missing wraps or illegal taping are reported to the Head of Jury for disciplinary review."
    },
    related: ["EQUIP_GLOVES"], tags: ["bandaj", "el sargısı", "wrap", "bant", "15.2"]
  },
  {
    id: "AREA_KASK", module: "ekipman", subtopic: "ekipmanlar", label: "ifma",
    rule: "15.3–15.3.1", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref", "corner"],
    media: { photo: true, video: false, animation: false },
    imgs: [{ src: "assets/img/head-guard.jpg", cap: { tr: "IFMA teknik özelliklerine uygun kask", en: "Head guard conforming to IFMA specifications" } }],
    title: { tr: "Kask", en: "Head Guard" },
    quick: { tr: "Kask zorunlu ve IFMA onaylıdır; elmacık kemiği koruyucusu, çenelik veya yüz siperi içeremez.", en: "The head guard is mandatory and IFMA-approved; it may not have cheek protectors, chin guard or face shield." },
    ruleText: {
      tr: "15.3: KASK, KAVAL KORUYUCU VE DİRSEKLİK\nBu üç koruyucu zorunludur, Yerel Organizasyon Kurulu tarafından sağlanır ve yalnızca IFMA onaylı ürünler kullanılır.\n15.3.1: KASK\nKask IFMA teknik özelliklerine uygun olmalı; elmacık kemiği koruyucusu, çenelik veya yüz siperi içermemelidir. Sporcu ringe kasksız çıkar; seyirciye tanıtım, Wai Kru ve selamlaşma tamamlandıktan sonra kask takılır. Maç biter bitmez ve karar açıklanmadan önce çıkarılır. Müsabaka sırasında Jüri veya Hakem gözetimi ve izni olmadan çıkarılamaz ya da bağı gevşetilemez.",
      en: "15.3: HEAD GUARD, SHIN GUARD AND ELBOW GUARD\nAll three are mandatory, supplied by the Local Organising Committee and IFMA-approved.\n15.3.1: HEAD GUARD\nIt shall conform to IFMA specifications and have no cheek protector, chin guard or face shield. The athlete enters without it; it is fitted after presentation, Wai Kru and handshake. It is removed immediately after the contest and before the decision. It may not be removed or undone during the contest without Jury or Referee supervision and permission."
    },
    related: ["EQUIP_SHIN", "EQUIP_ELBOW"], tags: ["kask", "head guard", "15.3.1"]
  },
  {
    id: "EQUIP_SHIN", module: "ekipman", subtopic: "ekipmanlar", label: "ifma",
    rule: "15.3 / 15.3.2", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref", "corner"],
    media: { photo: true, video: false, animation: false },
    imgs: [{ src: "assets/img/shin-guard.jpg", cap: { tr: "Kumaş ve cırt cırtlı kaval koruyucu", en: "Cloth shin guard with Velcro fixing" } }],
    title: { tr: "Kaval Koruyucu", en: "Shin Guard" },
    quick: { tr: "Kaval koruyucu zorunlu, kumaştan ve cırt cırtlı sabitlemeli olmalıdır.", en: "The shin guard is mandatory and must be made of cloth with Velcro fixing." },
    ruleText: { tr: "15.3: Kask, kaval koruyucu ve dirseklik zorunludur; organizasyon tarafından sağlanır ve IFMA onaylı olmalıdır.\n15.3.2: Kaval koruyucu kumaştan yapılmış ve cırt cırtlı sabitlemeye sahip olmalıdır. Ek bant gerekirse Yerel Organizasyon Kurulu sağlar.", en: "15.3: The head guard, shin guard and elbow guards are mandatory, organiser-supplied and IFMA-approved.\n15.3.2: The shin guard shall be made of cloth with Velcro fixing. If tape is required, the Local Organising Committee supplies it." },
    related: ["AREA_KASK", "EQUIP_ELBOW"], tags: ["kaval koruyucu", "shin guard", "15.3.2"]
  },
  {
    id: "EQUIP_ELBOW", module: "ekipman", subtopic: "ekipmanlar", label: "ifma",
    rule: "15.3 / 15.3.2", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref", "corner"],
    media: { photo: true, video: false, animation: false },
    imgs: [{ src: "assets/img/elbow-guard.jpg", cap: { tr: "Kumaş ve cırt cırtlı dirseklik", en: "Cloth elbow guard with Velcro fixing" } }],
    title: { tr: "Dirseklik", en: "Elbow Guard" },
    quick: { tr: "Dirseklik zorunlu, kumaştan ve cırt cırtlı sabitlemeli olmalıdır.", en: "Elbow guards are mandatory and must be made of cloth with Velcro fixing." },
    ruleText: { tr: "15.3: Kask, kaval koruyucu ve dirseklik zorunludur; organizasyon tarafından sağlanır ve IFMA onaylı olmalıdır.\n15.3.2: Dirseklik kumaştan yapılmış ve cırt cırtlı sabitlemeye sahip olmalıdır. Ek bant gerekirse Yerel Organizasyon Kurulu sağlar.", en: "15.3: The head guard, shin guard and elbow guards are mandatory, organiser-supplied and IFMA-approved.\n15.3.2: Elbow guards shall be made of cloth with Velcro fixing. If tape is required, the Local Organising Committee supplies it." },
    related: ["AREA_KASK", "EQUIP_SHIN"], tags: ["dirseklik", "elbow guard", "15.3.2"]
  },
  {
    id: "AREA_GOVDE", module: "ekipman", subtopic: "ekipmanlar", label: "ifma",
    rule: "15.4", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref", "corner"],
    media: { photo: true, video: false, animation: false },
    tableDiagram: "bodyprotector-table",
    imgs: [{ src: "assets/img/body-protector.jpg", cap: { tr: "Köşe rengiyle uyumlu gövde koruyucu", en: "Corner-colour coordinated body protector" } }],
    title: { tr: "Gövde Koruyucu", en: "Body Protector" },
    quick: { tr: "Gövde koruyucu U8–U24 ve Masters 40+/45+ kategorilerinde zorunlu; Elite ve Masters 35+ kategorilerinde kullanılmaz.", en: "The body protector is mandatory for U8–U24 and Masters 40+/45+, and is not worn in Elite or Masters 35+." },
    ruleText: { tr: "15.4: GÖVDE KORUYUCU\nKöşe rengiyle uyumlu gövde koruyucu U8–U24 ile Masters 40+ ve Masters 45+ kategorilerindeki tüm sporcular için zorunludur. Elite ve Masters 35+ kategorilerinde giyilmez.", en: "15.4: BODY PROTECTOR\nA corner-colour coordinated body protector is mandatory for all athletes in U8–U24 and Masters 40+/45+. It is not worn in Elite or Masters 35+." },
    related: ["EQUIP_CHEST"], tags: ["gövde koruyucu", "body protector", "15.4"]
  },
  {
    id: "AREA_DISLIK", module: "ekipman", subtopic: "ekipmanlar", label: "ifma",
    rule: "15.5", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref", "corner"],
    media: { photo: true, video: false, animation: false },
    imgs: [{ src: "assets/img/gum-shield.jpg", cap: { tr: "Forma uygun, kırmızı veya pembe olmayan dişlik", en: "Form-fitted gum shield that is not red or pink" } }],
    title: { tr: "Dişlik", en: "Gum Shield" },
    quick: { tr: "Dişlik her raunddan önce takılır; forma uygun olmalı ve kırmızı ya da pembe olmamalıdır.", en: "A gum shield is worn before every round; it must be form-fitted and not red or pink." },
    ruleText: { tr: "15.5: DİŞLİK\nTüm sporcular raund başlamadan önce dişlik takar. Dişlik ağız yapısına göre şekillendirilmiş olmalı ve kırmızı ya da pembe olmamalıdır. Kasıtlı çıkarma İkaz, İhtar veya Diskalifiye ile cezalandırılır. Dişlik çıkarsa Köşe Görevlisi suyla durulayıp yeniden takar.", en: "15.5: GUM SHIELD\nAll athletes wear a gum shield before a round. It shall be form-fitted and not red or pink. Intentional removal results in Caution, Warning or Disqualification. If it comes out, the Second rinses it before replacement." },
    related: ["FOUL_CLASS"], tags: ["dişlik", "gum shield", "15.5"]
  },
  {
    id: "AREA_KASIK", module: "ekipman", subtopic: "ekipmanlar", label: "ifma",
    rule: "15.7–15.7.2", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref", "weigh"],
    media: { photo: true, video: false, animation: false },
    imgs: [
      { src: "assets/img/groin-guard-male.jpg", cap: { tr: "Erkek kasık koruyucu", en: "Male groin guard" } },
      { src: "assets/img/groin-guard-female.jpg", cap: { tr: "Kadın kasık koruyucu", en: "Female groin guard" } }
    ],
    title: { tr: "Kasık Koruyucu", en: "Groin Guard" },
    quick: { tr: "Kasık koruyucu kadın ve erkek tüm sporcularda zorunludur; kişisel olmalı ve maç öncesinde kontrolden geçmelidir.", en: "A personal groin guard is mandatory for all male and female athletes and must pass pre-contest inspection." },
    ruleText: { tr: "15.7: KASIK KORUYUCU\nKasık koruyucu zorunludur. Hijyen için kadın ve erkek sporcular kendi koruyucusunu kullanır; her koruyucu maç öncesi kontrolden geçer.\n15.7.1: ERKEK KASIK KORUYUCU\nErkek sporcu metal veya polikarbonat koruyucu takar; ayrıca atletik destek iç çamaşırı kullanılabilir.\n15.7.2: KADIN KASIK KORUYUCU\nKadın sporcu polikarbonat veya köpük kasık koruyucu takar.", en: "15.7: GROIN GUARD\nA groin guard is mandatory. For hygiene, every athlete uses a personal guard and each guard passes inspection before competition.\n15.7.1: MALE GROIN GUARDS\nMale athletes wear a metal or polycarbonate guard; a jock strap may also be worn.\n15.7.2: FEMALE GROIN GUARDS\nFemale athletes wear a polycarbonate or foam groin guard." },
    related: ["EQUIP_CHEST"], tags: ["kasık koruyucu", "groin guard", "kadın", "erkek", "15.7"]
  },
  {
    id: "EQUIP_CHEST", module: "ekipman", subtopic: "ekipmanlar", label: "ifma",
    rule: "15.8–15.8.1", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: ["female"], role: ["ref", "weigh"],
    media: { photo: true, video: false, animation: false },
    tableDiagram: "chestprotector-table",
    imgs: [{ src: "assets/img/chest-guard.jpg", cap: { tr: "Kadın göğüs koruyucu", en: "Female chest protector" } }],
    title: { tr: "Kadın Göğüs Koruyucu", en: "Female Chest Protection" },
    quick: { tr: "Masters 35+ ve Elite kadınlarda zorunlu; Masters 40+/45+ ve U8–U24 kadınlarda isteğe bağlıdır.", en: "Mandatory for female Masters 35+ and Elite athletes; optional for female Masters 40+/45+ and U8–U24." },
    ruleText: { tr: "15.8: KADIN GÖĞÜS KORUYUCU\nMeme dokusundaki yumuşak bölgelerde hematom oluşmasını önlemek için Masters 35+ ve Elite kadın sporcularda zorunludur. Masters 40+/45+ ve U8–U24 kadın sporcularda isteğe bağlıdır. Her koruyucu maç öncesi kontrolden geçer.\n15.8.1: KORUYUCU EKİPMAN İNCELEMESİ\nSağlık ve Toplumsal Cinsiyet Eşitliği Kurulları zorunlu/isteğe bağlı statüsünü tıbbi kanıt, sporcu geri bildirimi ve eşitlik ilkelerine göre dönemsel olarak gözden geçirir.", en: "15.8: FEMALE CHEST PROTECTION\nIt is mandatory for female Masters 35+ and Elite athletes to guard against hematoma in breast soft tissue, and optional for female Masters 40+/45+ and U8–U24 athletes. Each protector passes inspection before competition.\n15.8.1: PROTECTIVE EQUIPMENT REVIEW\nThe Medical and Gender Equality Commissions periodically review mandatory or optional status using medical evidence, athlete feedback and equity considerations." },
    related: ["AREA_GOVDE", "AREA_KASIK"], tags: ["kadın göğüs koruyucu", "chest protection", "15.8"]
  },
  {
    id: "EQUIP_SHORTS", module: "ekipman", subtopic: "ekipmanlar", label: "ifma",
    rule: "15.9 / 15.9.1", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref", "corner"],
    media: { photo: true, video: false, animation: false },
    imgs: [{ src: "assets/img/equipment-shorts.jpg", cap: { tr: "Önünde ‘Muaythai’ yazısı bulunan müsabaka şortu", en: "Competition shorts with ‘Muaythai’ displayed on the front" } }],
    title: { tr: "Şort", en: "Shorts" },
    quick: { tr: "Müsabakada ön kısmında ‘Muaythai’ yazısı açıkça görünen Muaythai şortu giyilir.", en: "Muaythai shorts with ‘Muaythai’ clearly displayed on the front are worn in competition." },
    ruleText: { tr: "15.9: GİYİM VE KIYAFET\nSporcular organizasyonun sağladığı müsabaka kıyafetlerini hafif iç çamaşırlarıyla giyer.\n15.9.1: ŞORT\nMüsabaka için Muaythai şortu giyilmesi zorunludur ve ön kısmında ‘Muaythai’ yazısı açıkça görünmelidir.", en: "15.9: CLOTHING AND DRESS\nAthletes wear competition clothing provided by the Organising Committee with lightweight undergarments.\n15.9.1: SHORTS\nMuaythai shorts are mandatory and the wording ‘Muaythai’ shall be clearly displayed on the front." },
    related: ["EQUIP_SINGLET"], tags: ["şort", "muaythai shorts", "15.9.1"]
  },
  {
    id: "EQUIP_SINGLET", module: "ekipman", subtopic: "ekipmanlar", label: "ifma",
    rule: "15.9.2", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref", "corner"],
    media: { photo: true, video: false, animation: false },
    imgs: [{ src: "assets/img/equipment-singlet.jpg", cap: { tr: "Köşe rengine uygun kırmızı ve mavi atlet", en: "Red and blue singlets matching the corner colour" } }],
    title: { tr: "Atlet", en: "Singlet" },
    quick: { tr: "Kadın ve erkek sporcular köşe rengine uygun kırmızı veya mavi atlet giyer; atlet şortun içine sokulur.", en: "Male and female athletes wear a red or blue singlet matching the corner; it is tucked into the shorts." },
    ruleText: { tr: "15.9.2: ATLET\nKadın ve erkek sporcular köşe renklerine uygun kırmızı veya mavi atlet giymek zorundadır. Atlet şortun bel lastiğinin içine sokulmalıdır.", en: "15.9.2: SHIRTS\nMale and female athletes wear a red or blue singlet according to corner colour. The singlet shall be tucked into the belt line of the shorts." },
    related: ["EQUIP_SHORTS"], tags: ["atlet", "singlet", "shirt", "15.9.2"]
  },
  {
    id: "EQUIP_MONGKON", module: "ekipman", subtopic: "ekipmanlar", label: "ifma",
    rule: "15.9.3", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref", "corner"],
    media: { photo: true, video: false, animation: false },
    imgs: [{ src: "assets/img/equipment-mongkon-prajiad.png", cap: { tr: "Mongkon ve Prajiad", en: "Mongkon and Prajiad" } }],
    title: { tr: "Mongkon ve Prajiad", en: "Mongkon and Prajiad" },
    quick: { tr: "Mongkon Wai Kru sırasında zorunludur; Prajiad düzgün sabitlenmeli ve uzun ya da çözülen bağlar çıkarılmalıdır.", en: "The Mongkon is mandatory during the Wai Kru; the Prajiad must be secured and long or loose strings may require removal." },
    ruleText: { tr: "15.9.3: MONGKON VE PRAJIAD\nSporcular Wai Kru sırasında saygı göstergesi olarak Mongkon takar. Deri veya kumaş muska/tılsım içeren Krueng-Wrang (Prajiad) üst kola, biceps bölgesine veya bele takılabilir ve düzgün sabitlenmelidir. Sarkan uçlar 7–10 cm'den, gençlerde 5–7 cm'den uzunsa veya çözülüp düşerek maçı geciktirirse Hakem veya Jüri çıkarılmasını isteyebilir.", en: "15.9.3: MONGKON AND PRAJIAD\nAthletes wear the sacred Mongkon during the Wai Kru. A Krueng-Wrang (Prajiad) with a leather or fabric amulet may be worn on the upper arm, biceps or waist and shall be neatly secured. The Referee or Jury may order removal if strings exceed 7–10 cm, or 5–7 cm for Youth, or become undone and delay competition." },
    related: ["WAI_WHAT"], tags: ["mongkon", "prajiad", "wai kru", "15.9.3"]
  },
  {
    id: "EQUIP_COVER", module: "ekipman", subtopic: "ekipmanlar", label: "ifma",
    rule: "15.9.5", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref", "corner"],
    media: { photo: true, video: false, animation: false },
    imgs: [
      { src: "assets/img/equipment-head-body-cover-female.jpg", cap: { tr: "Kadın sporcu için izin verilen baş ve vücut örtüsü örneği", en: "Permitted female head and body covering" } },
      { src: "assets/img/equipment-hijab.jpg", cap: { tr: "Beyaz spor başörtüsü", en: "White sports hijab" } },
      { src: "assets/img/equipment-head-body-cover-male.jpg", cap: { tr: "Erkek sporcu için diz altına kadar beyaz tayt örneği", en: "Permitted white tights below the knee for male athletes" } }
    ],
    title: { tr: "Baş ve Vücut Örtüsü", en: "Head and Body Covers" },
    quick: { tr: "Kültürel veya dinî gereklilikler için yalnızca beyaz kumaştan, güvenli ve IFMA onaylı baş/vücut örtüsü kullanılabilir.", en: "For cultural or religious requirements, only safe, IFMA-approved white-fabric head and body covers may be used." },
    ruleText: { tr: "15.9.5: BAŞ VE VÜCUT ÖRTÜSÜ\nKadın sporcular beyaz kumaştan tam spor başörtüsü veya bağımsız bone/kafa başlığı kullanabilir. Buna ek olarak bacakları ayak bileğine ve kolları el bileğine kadar kapatan beyaz iki parçalı içlik giyilebilir. Erkek sporcular diz altına kadar beyaz tayt kullanabilir. Yalnızca IFMA onaylı kıyafetlere izin verilir.\nEŞİTLİK İLKESİ\nGüvenlik ve ekipman koşulları karşılandığında hiçbir sporcu izin verilen dinî veya kültürel örtüyü giyme ya da giymeme tercihi nedeniyle seçim, sıralama, değerlendirme veya müsabaka fırsatlarında dezavantajlı duruma düşürülemez.", en: "15.9.5: HEAD AND BODY COVERS\nFemale athletes may wear a full sports hijab or skull cap made of white fabric, optionally with a white two-piece body suit covering legs to ankles and arms to wrists. Male athletes may wear white tights below the knee. Only IFMA-approved attire is permitted.\nNON-DISCRIMINATION PRINCIPLE\nWhere safety and equipment requirements are met, no athlete may be disadvantaged in selection, seeding, officiating or competition opportunities for choosing to wear or not wear permitted religious or cultural coverings." },
    related: ["EQUIP_SHORTS", "EQUIP_SINGLET"], tags: ["baş örtüsü", "vücut örtüsü", "hijab", "15.9.5"]
  },
  {
    id: "EQUIP_ANKLE", module: "ekipman", subtopic: "kisitlamalar", label: "ifma",
    rule: "15.6", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref", "corner"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Bilek Koruyucu", en: "Ankle Protection" },
    quick: { tr: "Kumaş bileklik, bant veya başka bir ayak bileği koruması kullanılamaz.", en: "Cloth anklets, tape or any other ankle protection may not be worn." },
    ruleText: { tr: "15.6: BİLEK KORUYUCU\nHiçbir ayak bileği koruyucusu; kumaş bileklik, bant veya benzeri ürün kullanılamaz.", en: "15.6: ANKLE PROTECTION\nNo ankle protection, including cloth anklets or tape, may be worn." },
    related: [], tags: ["bilek koruyucu", "ayak bileği", "ankle", "15.6"]
  },
  {
    id: "EQUIP_LINIMENT", module: "ekipman", subtopic: "kisitlamalar", label: "ifma",
    rule: "15.10", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref", "corner"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Yağ ve Vazelin Kullanımı", en: "Liniment and Vaseline" },
    quick: { tr: "Yalnızca yüzde kesik riskini azaltacak makul miktarda Vazeline izin verilir; vücudun diğer bölgelerinde yasaktır.", en: "Only a reasonable amount of Vaseline on the face to reduce cuts is permitted; use elsewhere is prohibited." },
    ruleText: { tr: "15.10: YAĞ VE VAZELİN KULLANIMI\nYalnızca kesik riskini azaltmak amacıyla yüz bölgesinde makul miktarda Vazelin kullanılabilir. Vücudun başka yerinde gres yağı, Vazelin, ısıtıcı losyon veya rakibe zarar verebilecek ya da rahatsızlık verecek ürünler yasaktır.", en: "15.10: LINIMENT AND VASELINE\nA reasonable amount of Vaseline is permitted on the face only to reduce the risk of cuts. Grease, Vaseline, rubbing liniment or products harmful or objectionable to an opponent are forbidden elsewhere on the body." },
    related: [], tags: ["yağ", "vazelin", "liniment", "15.10"]
  },
  {
    id: "EQUIP_FLAG", module: "ekipman", subtopic: "kisitlamalar", label: "ifma",
    rule: "15.11–15.11.1", revision: "2026-05-11", status: A,
    discipline: [], age: [], gender: [], role: ["ref", "corner"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Ulusal Bayrak", en: "National Flag" },
    quick: { tr: "FOP içinde ülke bayrağı gösterilemez; üniformada yalnızca IFMA onaylı üç harfli ülke kodu kullanılabilir.", en: "National flags may not be displayed inside the FOP; only an IFMA-approved three-letter country code may appear on the uniform." },
    ruleText: { tr: "15.11: ULUSAL BAYRAK\nMüsabaka alanı içinde herhangi bir ülkenin bayrağı sergilenemez.\n15.11.1: ALPHA-3 ÜLKE KISALTMASI\nMüsabaka üniformalarında yalnızca IFMA onaylı üç harfli ülke kısaltması basılı etiketleri kullanılabilir; örneğin TUR.", en: "15.11: NATIONAL FLAG\nA country's flag may not be displayed within the field of play.\n15.11.1: ALPHA-3 COUNTRY ABBREVIATION\nOnly IFMA-approved three-letter country abbreviation press-on labels, for example TUR, may be used on competition uniforms." },
    related: [], tags: ["ulusal bayrak", "alpha-3", "tur", "15.11"]
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
    id: "WAI_WHAT", module: "waikru", subtopic: "wai-kru-nedir", label: "ifma",
    rule: "34", revision: "2026-05-11", status: A,
    discipline: ["waikru"], age: [], gender: [], role: [],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Wai Kru Nedir?", en: "What Is Wai Kru?" },
    quick: {
      tr: "Wai Kru, Muaythai'nin kültürel mirasını öne çıkaran bireysel ritüel dans müsabakasıdır. Her ulusal takım, her sıklette yalnızca bir sporcu kaydedebilir.",
      en: "Wai Kru is an individual ritual-dance competition that highlights Muaythai's cultural heritage. Each national team may enter only one athlete per division."
    },
    ruleText: {
      tr: "KURAL 34: WAI KRU VE MAI MUAY MÜSABAKALARI\nWai Kru ve Mai Muay müsabakaları, Muaythai'nin kültürel mirasını ön plana çıkarır. Wai Kru bireysel bir ritüel dans olarak icra edilir. Her ulusal takım, bireysel Wai Kru müsabakası için her sıklette yalnızca bir (1) sporcu (Nak Muay) ile kaydolma hakkına sahiptir.\n34.1: MÜSABAKA KATILIM LİMİTİ\nBir sporcu Wai Kru veya Mai Muay müsabakasının kültürel kategorilerinden yalnızca birinde yer alabilir; her ikisinde birden yer alamaz. Bunun yanı sıra Muaythai müsabakalarının yalnızca bir (1) dövüş veya teknik kategorisine katılabilir.",
      en: "RULE 34: WAI KRU & MAI MUAY COMPETITIONS\nThe Wai Kru and Mai Muay competitions highlight Muaythai's cultural heritage. Wai Kru is performed as an individual Ritual Dance. Each national team can only enter one (1) Athlete (Nak Gila) per division for the individual Wai Kru contest.\n34.1: LIMITATION OF COMPETITIONS\nAn athlete may participate in only one (1) cultural division of either the Wai Kru or Mai Muay competition, but not both, and only one (1) combat or technical division of the Muaythai competitions."
    },
    related: ["WAI_MAI_WHAT", "WAI_LIMIT"],
    tags: ["wai kru", "ritüel dans", "cultural", "34", "34.1"]
  },
  {
    id: "WAI_MAI_WHAT", module: "waikru", subtopic: "mai-muay-nedir", label: "ifma",
    rule: "34, 37", revision: "2026-05-11", status: A,
    discipline: ["maimuay"], age: [], gender: [], role: [],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Mai Muay Nedir?", en: "What Is Mai Muay?" },
    quick: {
      tr: "Mai Muay, iki sporcudan oluşan takımın geleneksel Muaythai tekniklerini sergilediği ikili performanstır. Takımlar erkek, kadın veya karma olabilir.",
      en: "Mai Muay is a duo performance in which a two-athlete team presents traditional Muaythai techniques. Teams may be male, female or mixed."
    },
    ruleText: {
      tr: "KURAL 34: WAI KRU VE MAI MUAY MÜSABAKALARI\nMai Muay, Muaythai'nin kültürel mirasını ön plana çıkaran iki kişilik geleneksel teknik performansı olarak icra edilir. Her ulusal takım, çiftli Mai Muay müsabakası için sıklet başına iki (2) sporcudan oluşan yalnızca bir (1) takım ile kaydolma hakkına sahiptir.\n34.1: MÜSABAKA KATILIM LİMİTİ\nBir sporcu Wai Kru veya Mai Muay müsabakasının kültürel kategorilerinden yalnızca birinde yer alabilir; her ikisinde birden yer alamaz. Bunun yanı sıra Muaythai müsabakalarının yalnızca bir (1) dövüş veya teknik kategorisine katılabilir.\nKURAL 37: MİLLİ TAKIM KATEGORİLERİ\n37.1: TAKIM KATEGORİLERİ\nİkili müsabaka formatlarında takım kategorileri aşağıdaki gibidir:\n• Erkek: Takımdaki her iki sporcu da erkek olmak zorundadır.\n• Kadın: Takımdaki her iki sporcu da kadın olmak zorundadır.\n• Karma: Sporculardan biri kadın, diğeri erkek olmalıdır.",
      en: "RULE 34: WAI KRU & MAI MUAY COMPETITIONS\nMai Muay highlights Muaythai's cultural heritage as a duo-based performance of Traditional Techniques. Each national team can only enter one (1) Team of two (2) Athletes per division for the duo Mai Muay contest.\n34.1: LIMITATION OF COMPETITIONS\nAn athlete may participate in only one (1) cultural division of either the Wai Kru or Mai Muay competition, but not both, and only one (1) combat or technical division of the Muaythai competitions.\nRULE 37: NATIONAL TEAM DIVISIONS\n37.1: TEAM DIVISIONS\nFor duo format competitions:\n• Male: Both Athletes from the Team must be Male.\n• Female: Both Athletes from the Team must be Female.\n• Mixed: Athletes from the Team must include one Female and one Male."
    },
    related: ["WAI_WHAT", "WAI_POSELIST"],
    tags: ["mai muay", "ikili", "duo", "takım", "34", "37"]
  },
  {
    id: "WAI_LIMIT", module: "waikru", subtopic: "yas-siniri", label: "ifma",
    rule: "35", revision: "2026-05-11", status: A,
    discipline: ["waikru", "maimuay"], age: [], gender: [], role: [],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Asgari ve Azami Yaş Sınırı", en: "Minimum and Maximum Age Limit" },
    quick: {
      tr: "Yaş uygunluğu takvim yılı sistemiyle belirlenir. Kültürel müsabakalar U8'den Veteranlar 60+ kategorisine kadar düzenlenir.",
      en: "Age eligibility is determined by the calendar-year system. Cultural competitions range from U8 through Masters 60+."
    },
    ruleText: {
      tr: "KURAL 35: SPORCULAR İÇİN ASGARİ VE AZAMİ YAŞ SINIRI\nTüm kategoriler için sporcu yaşı uygunluğu, takvim yılı sistemi kullanılarak belirlenecektir.\n• Veteranlar 60+: Asgari 60 yaş, azami yaş sınırı yoktur.\n• Veteranlar 50+: 50–59 yaş.\n• Veteranlar 40+: 40–49 yaş.\n• Büyükler 35+: 35–39 yaş.\n• Elite: 18–40 yaş.\n• U24: 18–23 yaş.\n• U18: 16–17 yaş.\n• U16: 14–15 yaş.\n• U14: 12–13 yaş.\n• U12: 10–11 yaş.\n• U10: 8–9 yaş.\n• U8: 6–7 yaş.",
      en: "RULE 35: MINIMUM & MAXIMUM AGE LIMIT FOR ATHLETES\nThe Athlete's age eligibility for all divisions shall be determined using the calendar-year system.\n• Masters 60+: Minimum age 60, no maximum age.\n• Masters 50+: Ages 50–59.\n• Masters 40+: Ages 40–49.\n• Masters 35+: Ages 35–39.\n• Elite: Ages 18–40.\n• U24: Ages 18–23.\n• U18: Ages 16–17.\n• U16: Ages 14–15.\n• U14: Ages 12–13.\n• U12: Ages 10–11.\n• U10: Ages 8–9.\n• U8: Ages 6–7."
    },
    related: ["WAI_WHAT", "WAI_MEDICAL"],
    tags: ["yaş sınırı", "takvim yılı", "u8", "elite", "masters", "35"]
  },
  {
    id: "WAI_MEDICAL", module: "waikru", subtopic: "tibbi-gereklilik", label: "ifma",
    rule: "36", revision: "2026-05-11", status: A,
    discipline: ["waikru", "maimuay"], age: [], gender: [], role: ["doctor", "coach"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Tıbbi Gereklilik", en: "Medical Requirement" },
    quick: {
      tr: "Temassız kültürel müsabakalarda da Kural 10'daki tıbbi gereklilikler uygulanır. Mai Muay sırasında 10 saniyeden uzun bilinç kaybı derhal bildirilmelidir.",
      en: "Rule 10 medical requirements also apply to non-contact cultural competitions. Loss of consciousness longer than 10 seconds during Mai Muay must be reported immediately."
    },
    ruleText: {
      tr: "KURAL 36: TIBBİ GEREKLİLİK\n36.1: UYGULAMA\nMuaythai kültürel müsabakalarının temassız yapısını yansıtmak amacıyla aşağıda yapılan değişiklikler hariç olmak üzere, tüm tıbbi gereklilikler KURAL 10'a uygun olacaktır.\n36.1.1: BİLİNÇ KAYBI\nBir sporcunun Mai Muay müsabakası sırasında kazara on (10) saniyeden daha uzun bir süre boyunca bilincinin kapanması durumunda, performansının hemen ardından Tıbbi Komisyonu derhal bilgilendirmeli ve Muaythai maçının yapıldığı sabah tıbbi kontrolden geçerken doktora bu durumu bildirmelidir. Bilinç kaybı veya beyin sarsıntısını gözlemleyen ya da bundan şüphelenen antrenörler, köşe görevlileri ve teknik görevliler de durumu derhal Sağlık Kuruluna veya doktora bildirmekle yükümlüdür. Bildirim yapılmaması disiplin suçu teşkil edebilir.\n36.2: MÜSABAKA KATILIMI\nTıbbi görevli, müsabaka alanına engelsiz erişimi olacak şekilde yakın bir yerde oturacaktır. Müsabaka boyunca görev yerinde hazır bulunacak; oturumun son maçına katılan son sporcuyu muayene edene ve maç bitene kadar bu yerden ayrılmayacaktır.\n36.2.1: BİLİNCİ KAPALI SPORCUYA MÜDAHALE\nBir sporcunun bilincini yitirmesi halinde, tıbbi görevlinin ek yardıma ihtiyaç duyması hali dışında müsabaka alanında yalnızca çağrılan tıbbi görevli olacaktır.\n36.2.2: TIBBİ YARDIM SAĞLAMA\nBir maçta kafa bölgesine aldığı darbe sonucunda bilincini yitiren sporcu, maçın hemen ardından tıbbi görevli tarafından muayene edilecek; sporcuya ve köşesindeki yardımcılarına gerekli bakım veya takip muayeneleri tavsiye edilecektir. Sporcuya, kalacağı konaklama yerine kadar etkinlikte görevli resmi yetkililerden biri eşlik edecektir.",
      en: "RULE 36: MEDICAL REQUIREMENT\n36.1: APPLICATION\nAll medical requirements shall be in accordance with RULE 10, except where modified below to reflect the non-contact nature of Muaythai Cultural competition.\n36.1.1: CONCUSSION\nShould an Athlete accidentally be rendered unconscious during a Mai Muay contest for a period longer than ten (10) seconds, they must inform the Medical Commission immediately after their performance, and inform the Doctor during their medical check on the morning of their Muaythai bout. Coaches, Seconds, and Technical Officials who observe or suspect a loss of consciousness or concussion must also report this immediately to the Medical Commission or Doctor. Failure to do so may constitute a disciplinary offence.\n36.2: COMPETITION ATTENDANCE\nThe Medical person shall sit close to the competition area with unimpeded access. They shall be in attendance throughout competition and should not leave this place until having examined the last Athlete(s) who participated in the last contest of the session.\n36.2.1: ATTEND AN UNCONSCIOUS ATHLETE\nIf an Athlete is rendered unconscious, only a Medical person summoned should remain in the competition area unless the Medical person requires extra help.\n36.2.2: PROVIDE MEDICAL ATTENTION\nAn Athlete who has been rendered unconscious as a result of a head hit in a contest shall be examined by a Medical person immediately afterwards and recommend aftercare or follow-up examinations to the Athlete and their Seconds. The Athlete will be accompanied to their accommodation by one of the officials on duty at the event."
    },
    related: ["WAI_LIMIT", "WAI_DURATION"],
    tags: ["tıbbi gereklilik", "bilinç kaybı", "beyin sarsıntısı", "doktor", "36"]
  },
  {
    id: "WAI_DURATION", module: "waikru", subtopic: "musabaka-suresi", label: "ifma",
    rule: "38", revision: "2026-05-11", status: A,
    discipline: ["waikru", "maimuay"], age: [], gender: [], role: ["timekeeper", "jury"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Müsabaka Süresi", en: "Competition Duration" },
    quick: {
      tr: "Wai Kru 4–5 dakika, Mai Muay 5–6 dakikadır. Zorunlu tamamlanma sınırı sırasıyla 6 ve 7 dakikadır; bu sınırda Jüri müziği durdurur.",
      en: "Wai Kru lasts 4–5 minutes and Mai Muay 5–6 minutes. Their compulsory completion limits are 6 and 7 minutes respectively, when the Jury stops the music."
    },
    culturalDurationTable: {
      title: { tr: "Wai Kru ve Mai Muay Süre Tablosu", en: "Wai Kru and Mai Muay Duration Table" },
      formatLabel: { tr: "Müsabaka", en: "Competition" },
      teamLabel: { tr: "Format", en: "Format" },
      minimumLabel: { tr: "Asgari Süre", en: "Minimum Time" },
      allowedLabel: { tr: "İzin Verilen Süre", en: "Allowed Time" },
      stopLabel: { tr: "Zorunlu Bitiş", en: "Compulsory Finish" },
      rows: [
        { format: { tr: "Wai Kru", en: "Wai Kru" }, team: { tr: "Bireysel", en: "Individual" }, minimum: { tr: "4 dakika", en: "4 minutes" }, allowed: { tr: "En fazla 5 dakika", en: "Up to 5 minutes" }, stop: { tr: "6. dakikada", en: "At 6 minutes" } },
        { format: { tr: "Mai Muay", en: "Mai Muay" }, team: { tr: "İkili", en: "Duo" }, minimum: { tr: "5 dakika", en: "5 minutes" }, allowed: { tr: "En fazla 6 dakika", en: "Up to 6 minutes" }, stop: { tr: "7. dakikada", en: "At 7 minutes" } }
      ],
      note: { tr: "Zorunlu bitiş süresine ulaşıldığında Jüri müziğin durdurulması talimatını verir. Süre aşımı veya eksikliği için her tam 10 saniyede 1 puan, en fazla 5 puan kesilir (49.9.4).", en: "At the compulsory finish time, the Jury instructs the music to stop. Overrun or underrun is penalised by 1 point for every full 10 seconds, up to 5 points (49.9.4)." }
    },
    ruleText: {
      tr: "KURAL 38: MÜSABAKA SÜRESİ\n38.1: WAI KRU MÜSABAKA SÜRESİ\nBireysel formatta yapılan Wai Kru müsabakasında izin verilen asgari süre dört (4) dakika, izin verilen toplam azami süre beş (5) dakikadır.\n38.2: MAI MUAY MÜSABAKA SÜRESİ\nİkili formatta yapılan Mai Muay müsabakasında izin verilen asgari süre beş (5) dakika, izin verilen toplam azami süre altı (6) dakikadır.\n38.2.2: ZORUNLU TAMAMLAMA SÜRESİ\nBireysel Wai Kru müsabakasında sporcu performansını en fazla altı (6) dakika içinde tamamlamış olmalıdır. İkili Mai Muay müsabakasında izin verilen azami süre yedi (7) dakikadır. Zorunlu tamamlanma süresine ulaşıldığında Jüri, müziğin durdurulması talimatını verecektir.",
      en: "RULE 38: TIME FOR COMPETITION\n38.1: TIME FOR WAI KRU COMPETITION\nIn an individual format Wai Kru competition the minimum allowed time is four (4) minutes, and the total allowed time is five (5) minutes.\n38.2: TIME FOR MAI MUAY COMPETITION\nFor a duo format Mai Muay competition the minimum allowed time is five (5) minutes, and the total allowed time is six (6) minutes.\n38.2.2: COMPULSORY COMPLETION TIME\nIn an individual format Wai Kru competition the Athlete must have completed their performance by no more than six (6) minutes. For a duo format Mai Muay competition the maximum time allowed is seven (7) minutes. The Jury will instruct the music to stop once the compulsory completion time is reached."
    },
    related: ["WAI_MUSIC", "WAI_SCORING"],
    tags: ["süre", "time", "wai kru 4 5", "mai muay 5 6", "38"]
  },
  {
    id: "WAI_MUSIC", module: "waikru", subtopic: "muzik", label: "ifma",
    rule: "43", revision: "2026-05-11", status: A,
    discipline: ["waikru", "maimuay"], age: [], gender: [], role: ["jury", "timekeeper"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Müzik", en: "Music" },
    quick: {
      tr: "Ritüele geleneksel Muay Boran çalgıları eşlik eder. Canlı Pi Muay yoksa Wai Kru için Sarama, Mai Muay için Keck Jao Sen kaydı kullanılabilir.",
      en: "Traditional Muay Boran instruments accompany the ritual. If live Pi Muay is unavailable, recorded Sarama for Wai Kru and Keck Jao Sen for Mai Muay may be used."
    },
    ruleText: {
      tr: "KURAL 43: MÜZİK\nRitüele geleneksel Muay Boran müzik aletleri (Zurna/Java flütü, küçük ziller ve iki adet davul) eşlik edecektir. Canlı bir müzik grubunun (Pi Muay) bulunmadığı durumlarda, kayıttan çalınan Muay Boran müziğinin (Wai Kru için ‘Sarama’, Mai Muay için ‘Keck Jao Sen’) kullanılmasına izin verilir.\n43.1: WAI KRU'DAN MAI MUAY'A GEÇİŞ\nİkili formatta yapılan Mai Muay müsabakalarında, Wai Kru müziğinden Mai Muay müziğine geçiş yalnızca sporcular Wai Kru performanslarını tamamladıklarında gerçekleşecektir. Takımlar tam performanslarını bitirene kadar Mai Muay müziği durdurulmayacaktır.\n43.1.1: WAI KRU MÜSABAKASI\nBireysel formatta yapılan Wai Kru müsabakalarında, takımlar tam performanslarını tamamlayana kadar müzik durdurulmayacaktır.",
      en: "RULE 43: MUSIC\nThe traditional Muay Boran musical instruments (java pipe, small cymbals and two drums) will accompany the ritual. If a live band (Pi Muay) is not available, it is permissible to use Muay Boran music (known as ‘Sarama’ Wai Kru and ‘Keck Jao Sen’ Mai Muay) played from a recording.\n43.1: WAI KRU TO MAI MUAY\nFor duo format Mai Muay contests, the transition from Wai Kru music to Mai Muay music will happen only when the Athletes have completed their Wai Kru performance. The Mai Muay music will not stop until the Teams have completed their full performance.\n43.1.1: WAI KRU CONTEST\nFor individual format Wai Kru contests, the music will not stop until the Teams have completed their full performance."
    },
    related: ["WAI_DURATION", "WAI_POSELIST"],
    tags: ["müzik", "sarama", "keck jao sen", "pi muay", "43"]
  },
  {
    id: "WAI_EQUIPMENT", module: "waikru", subtopic: "ekipman-giyim", label: "ifma",
    rule: "42", revision: "2026-05-11", status: A,
    discipline: ["waikru", "maimuay"], age: [], gender: [], role: ["athlete", "coach"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Sporcu Ekipmanları ve Giyim", en: "Athlete Equipment and Dress" },
    quick: {
      tr: "Sporcular siyah dışında bir renkte, IFMA onaylı geleneksel Muay Boran üniforması; el bağları, kuşak kemeri ve geleneksel Mongkon kullanır.",
      en: "Athletes wear an IFMA-approved traditional Muay Boran uniform in any colour except black, with hand bindings, sash belt and a traditional Mongkon."
    },
    ruleText: {
      tr: "KURAL 42: SPORCU EKİPMANLARI VE GİYİM\nSporcular, siyah hariç herhangi bir renkte ve IFMA tarafından onaylanmış geleneksel Muay Boran üniforması giymelidir.\n42.1: ÜNİFORMA\n• Kıyafet, sporcunun cinsiyetine uygun geleneksel bir üst ve şorttan oluşmalıdır.\n• Aksesuarlar, geleneksel el bağları ve kuşak kemerini kapsar.\n42.1.1: GELENEKSEL KIYAFET\nSporcular provoke edici uygunsuz kıyafetler giymemelidir.\n42.2: MONGKON VE PRAJIAD RENGİ\nSporcular kendi IFMA Khan derecelerine karşılık gelen renkleri veya Gümüş, Gümüş-Altın ya da Altın hariç her türlü renk kombinasyonunu kullanabilir. Bu üç renk yalnızca Teknik Görevliler tarafından kullanılabilir; sporcu ilgili IFMA Khan derecesine sahipse istisnadır.\n42.2.1: GELENEKSEL MONGKON\nSporcular geleneksel bir Mongkon takmak zorundadır; ek süslemelere izin verilmez.",
      en: "RULE 42: ATHLETE EQUIPMENT & DRESS\nAthletes should wear the traditional Muay Boran uniform in any colour except for black, and be approved by IFMA.\n42.1: UNIFORM\n• Costume must consist of a traditional top and short appropriate for athlete gender.\n• Accessories include traditional hand bindings (hand wraps) and sash belt.\n42.1.1: TRADITIONAL ATTIRE\nAthletes must not wear provocative uniforms.\n42.2: MONGKON & PRAJIAD COLOUR\nAthletes should wear their respective IFMA Khan level colour, or any mix of colours other than Silver, Silver & Gold, and Gold which shall be worn by the Technical Officials only, unless the athlete has qualified for these IFMA Khan levels.\n42.2.1: TRADITIONAL MONGKON\nAthletes must wear a traditional Mongkon; no additional ornaments are permitted."
    },
    related: ["EQUIP_MONGKON", "WAI_SECONDS"],
    tags: ["ekipman", "giyim", "muay boran", "mongkon", "prajiad", "42"]
  },
  {
    id: "WAI_SECONDS", module: "waikru", subtopic: "kose-gorevlileri", label: "ifma",
    rule: "45", revision: "2026-05-11", status: A,
    discipline: ["waikru", "maimuay"], age: [], gender: [], role: ["coach"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Köşe Görevlileri", en: "Seconds" },
    quick: {
      tr: "Her sporcu tam olarak bir köşe görevlisiyle müsabakaya katılır. Köşe görevlisi aktif raundda oturur, alanı boş bırakır ve nizami üniforma giyer.",
      en: "Each athlete competes with exactly one Second. During an active round the Second remains seated, keeps the area clear and wears the prescribed uniform."
    },
    ruleText: {
      tr: "KURAL 45: KÖŞE GÖREVLİLERİ (ANTRENÖR)\n45.1: KÖŞE GÖREVLİSİ SAYISI\nHer sporcunun en fazla bir (1) Köşe Görevlisi bulundurma hakkı vardır; ancak en az bir (1) Köşe Görevlisi olmadan müsabakaya katılamaz.\n45.1.1: UYRUK\nKöşe Görevlisi, pasaportuyla aynı uyrukta olmalı veya akreditasyon sırasında ibraz edilen ulusal takımın ülkesinde ikamet ediyor olmalıdır. Teknik Delegenin takdirine bağlı olarak bir Köşe Görevlisi, müsabaka esnasında başka bir ülkeye yardımcı olabilir.\n45.2: DAVRANIŞ KURALLARI\n45.2.1: AKTİF RAUND ESNASINDA\nKöşe Görevlileri ring platformundan veya tatami alanından uzakta, oturur pozisyonda bekleyecektir. Raund başlamadan önce sandalye, havlu, kova ve sprey şişesi gibi tüm nesneleri ring platformundan veya tatami alanından kaldıracaktır.\n45.3: GİYİM\nKöşe Görevlileri düz tabanlı spor ayakkabılarıyla Ulusal Derneğin resmi üniformasını veya siyah hariç herhangi bir renkte IFMA onaylı geleneksel Muay Boran üniformasını giymek zorundadır. Kot pantolon, şort, şapka/kasket, deri ceket, yelek, önü açık ayakkabı ve diğer uygunsuz kıyafetlere izin verilmez.\n45.4: ZORUNLU TEKNİK TOPLANTI\nTeknik Delege veya Müsabaka Yöneticisi, görev yapacak Resmi Görevliler ve Köşe Görevlileri için Teknik Toplantı düzenler ve IFMA kurallarına uyulması gerektiğini vurgular.",
      en: "RULE 45: THE SECOND (COACH)\n45.1: NUMBER OF SECONDS\nEach competitor is entitled to a maximum of one (1) Second but may not compete with less than one (1).\n45.1.1: NATIONALITY\nThe Second should be of the same nationality as their passport, or resident within the country of the national team presented at accreditation. At the discretion of the Technical Delegate, a Second may assist another nation during a contest.\n45.2: CONDUCT\n45.2.1: DURING AN ACTIVE ROUND\nThe Seconds shall remain seated away from the platform of the ring or contest area. Before a round begins, they shall remove all objects from the ring platform or contest area, including seats, towels, buckets and spray bottles.\n45.3: ATTIRE\nSeconds must wear the uniform of the National Association with flat-heeled athletic shoes, or an IFMA-approved traditional Muay Boran uniform in any colour except black. Jeans, shorts, hats/caps, leather jackets, vests, open-toe footwear and other inappropriate attire are not permitted.\n45.4: COMPULSORY MEETING\nAt each competition the Technical Delegate or Competition Manager shall arrange a Technical Meeting of the Officials and Seconds and emphasise that IFMA rules will be followed."
    },
    related: ["WAI_EQUIPMENT", "WAI_MEDICAL"],
    tags: ["köşe görevlisi", "antrenör", "second", "giyim", "45"]
  },
  {
    id: "WAI_KRITER", module: "waikru", subtopic: "puan-verme", label: "ifma",
    rule: "49.1, 49.7", revision: "2026-05-11", status: A,
    discipline: ["waikru", "maimuay"], age: [], gender: [], role: ["judge", "jury"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Puan Verme Adımları", en: "Awarding of Points" },
    quick: {
      tr: "Wai Kru'da özgünlük, tamamlanmış duruşlar, ritim, akıcılık, kişilik ve kıyafet; Mai Muay'da performans gerçekçiliği, kondisyon ve diğer kriterler değerlendirilir.",
      en: "Wai Kru assesses authenticity, completed postures, rhythm, fluidity, personality and costume; Mai Muay assesses performance realism, athlete fitness and other criteria."
    },
    ruleText: {
      tr: "KURAL 49: PUAN VERME ADIMLARI\n49.1: WAI KRU VE MAI MUAY PUANLAMASI\nİkili Mai Muay müsabakasında en yüksek toplam puan 100'dür. Bireysel Wai Kru müsabakasında en yüksek toplam puan 100; ikili Mai Muay müsabakasının Wai Kru bölümünde en yüksek alt toplam puan 35'tir. Wai Kru ve Mai Muay'ın Wai Kru bölümlerinde küçük ihlaller için aşağıdaki kategoriler kullanılır:\n• 49.1.1 Özgünlük: Doğru duruşların kullanılması.\n• 49.1.2 Tamamlanmış Duruşlar: Duruşların eksiksiz yapılması.\n• 49.1.3 Ritim: İyi bir ritimle icra edilmesi.\n• 49.1.4 Akıcılık: Duruşların kesintisiz ve düzgün yapılması.\n• 49.1.5 Kişilik: Sanatsal açıdan doğru olması.\n• 49.1.6 Kıyafet: Kıyafetin performans boyunca düzgün kalması ve IFMA onaylı olması.\n49.7: MAI MUAY PUANLAMA KRİTERLERİ\nMai Muay bölümü en fazla 65 toplam puan üzerinden değerlendirilir. Takımlar, performanslarını içeren Jüri Postür Listesi formunu müsabakanın başlamasından en az altmış (60) dakika önce İdari Jüriye teslim etmelidir. Tüm Muaythai teknik duruşları IFMA Khan müfredatından alınmalı ve Temel Beceri, Muay Sanatı ve İleri Seviye duruş gruplarının bir kombinasyonunu içermelidir.\n• Performans Gerçekçiliği: En fazla 30 puan.\n• Sporcunun Kondisyonu: En fazla 25 puan.\n• Diğer Kriterler: En fazla 10 puan.\nMai Muay'da küçük ihlaller; zamanlama, hedef, gerçekçilik, denge, süreklilik, kondisyon, kıyafet düzeni, alan farkındalığı ve teslim edilen listedeki tüm postürlerin tamamlanması üzerinden değerlendirilir.",
      en: "RULE 49: AWARDING OF POINTS\n49.1: SCORING WAI KRU & MAI MUAY\nThe duo format Mai Muay contest has a maximum combined total score of 100 points. The Wai Kru has a maximum total score of 100 points during an individual contest and a maximum sub-total score of 35 points during a duo Mai Muay contest. The following categories are used to deduct points for minor infringements:\n• 49.1.1 Authentic: Correct postures used.\n• 49.1.2 Completed Postures: Full identity performed.\n• 49.1.3 Rhythmic: Performed in good rhythm.\n• 49.1.4 Fluidity: Postures flow uninterrupted and smoothly.\n• 49.1.5 Personality: Artistically correct.\n• 49.1.6 Costume: Remains in place throughout and is IFMA approved.\n49.7: MAI MUAY AWARDING POINTS\nThe Mai Muay has a maximum total score of 65 points. Teams must forward their performances on the Jury Posture List form to the Administration Jury no less than sixty (60) minutes before competition. All Muaythai Skill postures must be taken from the IFMA Khan syllabus and contain a blend of Basic Skill, Art of Muay and High Level posture groups.\n• Performance Realism: Maximum 30 points.\n• Athlete Fitness: Maximum 25 points.\n• Other: Maximum 10 points.\nMinor infringements in Mai Muay are assessed through timing, target, realism, balance, continuality, conditioning, costume, spatial awareness and completion of every posture on the submitted list."
    },
    related: ["WAI_POSELIST", "WAI_SCORING"],
    tags: ["puan verme", "scoring", "özgünlük", "ritim", "65 puan", "49.1", "49.7"]
  },
  {
    id: "WAI_POSELIST", module: "waikru", subtopic: "postur-listesi", label: "ifma",
    rule: "49.2–49.8", revision: "2026-05-11", status: A,
    discipline: ["waikru", "maimuay"], age: [], gender: [], role: ["judge", "jury"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Postür Listesi", en: "Posture List" },
    quick: {
      tr: "Wai Kru'da 6 başlangıç, 4 Prom Nang, 4 Prom Yuen ve 5 bitiriş postürü zorunludur. Mai Muay postürleri IFMA Khan müfredatından seçilir ve liste en az 60 dakika önce teslim edilir.",
      en: "Wai Kru requires 6 starting, 4 Prom Nang, 4 Prom Yuen and 5 finishing postures. Mai Muay postures come from the IFMA Khan syllabus and the list is submitted at least 60 minutes in advance."
    },
    ruleText: {
      tr: "49.2: WAI KRU BAŞLANGIÇ POSTÜRLERİ\nTüm sporcular altı (6) başlangıç postürünün tamamını icra etmek zorundadır. Azami puan bireyselde 20, ikilide 5'tir.\n• Thep Pa Nom, Kom Krab, Kob Pramae Thoranee, Tha Wai Bangkom, Pathom ve Prom.\n49.3: PROM NANG (OTURUŞ) POSTÜRLERİ\nSporcular yedi postürden dört (4) tanesini icra eder. Azami puan bireyselde 20, ikilide 10'dur.\n• Lab Hok Mokkasak (Kumpakan Lab Hok), Mekkala Loah Kaew, Song Mek (Tai Mek), Mae Pra Thoranee Beeb Muay Phom, Sue Lak Hang, Paya Krut Yut Naka ve Sao Noi Pa Paeng.\n49.4: PROM YUEN (AYAKTA) POSTÜRLERİ\nSporcular yedi postürden dört (4) tanesini icra eder. Azami puan bireyselde 20, ikilide 10'dur.\n• Yoong Ram Paen, Na Rai Kwang Jak, Chang Choo Nguang, Pra Ram Plaeong Sorn, Kum Pa Kan Poung Hok, Kun Paen Fun Mahn ve Hong Hoen.\n49.5: BİTİRİŞ (HAREKETLİ) POSTÜRLERİ\nBeş (5) bitiriş hareketinin tamamı zorunludur. Azami puan bireyselde 20, ikilide 5'tir.\n• Yang Sam Khum, Payak Dom Kwang, Kwang Liaw Lang, Tad Mai Kom Nam ve Yang Suk Ka Sem.\n49.6: GEÇİŞ (BAĞLANTI) POSTÜRLERİ\nSporcular dokuz bağlantı postürünü icra edebilir. Azami puan bireyselde 20, ikilide 5'tir.\n• Sod Soi Mala, Khuang Mad, Muan Muay, Chang Yaek Plok, Klub Hua Sanam, Klum Choeng Kru, Doo Dussakorn, Fon Long Choeng ve Kinaree Liab Thom.\n49.7: MAI MUAY POSTÜR LİSTESİ\nTakımlar Jüri Postür Listesi formunu müsabakadan en az altmış (60) dakika önce İdari Jüriye teslim eder. Listedeki tüm postürlerin tamamlanması puanlamada dikkate alınır.\n49.8: MUAYTHAI TEKNİK POSTÜRLERİ\n• Temel Beceri: Duruş/Hareket; yumruk, dirsek, diz, itiş tekmesi ve tekme; savunma gruplarından teknikler.\n• Muay Sanatı: Muaythai Taktiği ve Muaythai Stratejisi gruplarından en az on (10) teknik.\n• İleri Seviye: 17 yaş altı sporcular üç (3), 17 yaş ve üzeri sporcular en az beş (5) postür icra eder: Hiran Muan Paendin, Jorake Fad Hang, Kwang Liew Lang, Kacha Tokman, Hanuman Tayan, Hanuman Yieb Longo, Narai Kan Samut, Rue Sri Bod Ya ve Rue Sri Hern.",
      en: "49.2: WAI KRU STARTING POSTURES\nAll Athletes must perform all six (6) Starting Postures. Maximum score: 20 individual, 5 duo.\n• Thep Pa Nom, Kom Krab, Kob Pramae Thoranee, Tha Wai Bangkom, Pathom and Prom.\n49.3: PROM NANG (SITTING) POSTURES\nAthletes must perform four (4) of seven postures. Maximum score: 20 individual, 10 duo.\n• Lab Hok Mokkasak (Kumpakan Lab Hok), Mekkala Loah Kaew, Song Mek (Tai Mek), Mae Pra Thoranee Beeb Muay Phom, Sue Lak Hang, Paya Krut Yut Naka and Sao Noi Pa Paeng.\n49.4: PROM YUEN (STANDING) POSTURES\nAthletes must perform four (4) of seven postures. Maximum score: 20 individual, 10 duo.\n• Yoong Ram Paen, Na Rai Kwang Jak, Chang Choo Nguang, Pra Ram Plaeong Sorn, Kum Pa Kan Poung Hok, Kun Paen Fun Mahn and Hong Hoen.\n49.5: FINISHING (MOVEMENT) POSTURES\nAll five (5) finishing movements are compulsory. Maximum score: 20 individual, 5 duo.\n• Yang Sam Khum, Payak Dom Kwang, Kwang Liaw Lang, Tad Mai Kom Nam and Yang Suk Ka Sem.\n49.6: JOINING (CONNECTION) POSTURES\nAthletes can perform the nine Joining Postures. Maximum score: 20 individual, 5 duo.\n• Sod Soi Mala, Khuang Mad, Muan Muay, Chang Yaek Plok, Klub Hua Sanam, Klum Choeng Kru, Doo Dussakorn, Fon Long Choeng and Kinaree Liab Thom.\n49.7: MAI MUAY POSTURE LIST\nTeams must submit the Jury Posture List form to the Administration Jury no less than sixty (60) minutes before competition. Completion of all postures on the submitted list is part of the assessment.\n49.8: MUAYTHAI SKILL POSTURES\n• Basic Skill: Techniques from Stance/Moving; punch, elbow, knee, push kick and kick; and Defence groups.\n• Art of Muay: At least ten (10) techniques from Muaythai Tactic and Muaythai Strategy groups.\n• High Level: Athletes under 17 perform three (3), and athletes aged 17 or older at least five (5): Hiran Muan Paendin, Jorake Fad Hang, Kwang Liew Lang, Kacha Tokman, Hanuman Tayan, Hanuman Yieb Longo, Narai Kan Samut, Rue Sri Bod Ya and Rue Sri Hern."
    },
    related: ["WAI_KRITER", "WAI_SCORING"],
    tags: ["postür listesi", "posture list", "prom nang", "prom yuen", "khan", "49.2", "49.8"]
  },
  {
    id: "WAI_SCORING", module: "waikru", subtopic: "puanlama-sistemi", label: "ifma",
    rule: "49.9–49.10", revision: "2026-05-11", status: A,
    discipline: ["waikru", "maimuay"], age: [], gender: [], role: ["judge", "jury"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Puanlama Sistemi", en: "Scoring System" },
    quick: {
      tr: "Her performans 100 puan üzerinden puanlanır. En yüksek ve en düşük hakem puanı çıkarılır; kalan üç skor, süre kesintileri uygulandıktan sonra 10'a ve 3'e bölünür.",
      en: "Each performance is scored out of 100. The highest and lowest judges' scores are removed; after time deductions, the remaining three are divided by 10 and then by 3."
    },
    ruleText: {
      tr: "49.9: YÜZ PUANLIK SİSTEM\nHer raund ayrı ayrı puanlanır ve en az bir sporcuya veya takıma en fazla 100 puan verilebilir. Yan Hakemler küsuratlı puan veremez.\n49.9.1: NİHAİ TAKIM SKORU\n• En yüksek ve en düşük Yan Hakem skorları çıkarılır.\n• Kalan üç (3) skor toplanır.\n• Süre ceza puanları düşülür.\n• Toplam skor ona (10), ardından üçe (3) bölünür.\n• Nihai skor iki ondalık basamakla gösterilir; 9.064 ve 9.063, 9.06'ya; 9.065 ve 9.066, 9.07'ye yuvarlanır.\n49.9.2: JÜRİ\nResmi sonucu onaylamadan önce tüm Yan Hakemlerin skorlarını ve skor kartlarını kontrol edip doğrulamak Jürinin görevidir.\n49.9.3: BERABERLİK\nNihai skorlar eşitse beş (5) Yan Hakemin kümülatif toplam skorları hesaplanır. Eşitlik sürerse Yan Hakemler, Wai Kru veya Mai Muay'ın genel performans üstünlüğüne göre üst sıradaki takımı seçer.\n49.9.4: SÜRE\nİzin verilen sürenin aşılması veya altında kalınması halinde her tam on (10) saniye için 1 puan, en fazla 5 puan kesilir.\n49.9.5: HÜKMEN GALİBİYET (WO)\nAnons edildikten sonra azami iki (2) dakika içinde alanda bulunmayan sporcu veya takım, Hükmen Galibiyet (WO) nedeniyle mağlup ilan edilir.\n49.10: RAUND ESNASINDA\n• Kırmızı köşedeki sporcu Prom Nang, mavi köşedeki sporcu Prom Yuen postürlerini sergiler.\n• Prom Nang/Yuen serileri alanın dört (4) yönüne bakılarak yapılır.\n• Mai Muay, Wai Kru biter bitmez başlar.\n• Ring dışına düşen sporcuya devam edebilmesi için en fazla iki (2) dakika verilir.\n• Doktor gerektiren sakatlıkta, durdurulma anına kadar kazanılan puanlar kaydedilir.\n• Alandan çıkıp on (10) saniye içinde dönmeyen sporcu veya takım, Maçtan Çekilme (RET) nedeniyle mağlup ilan edilir.",
      en: "49.9: ONE HUNDRED SCORING SYSTEM\nEach round shall be scored individually, in which at least one Athlete or Team can be awarded a maximum of 100 points. No fraction of points may be given by the Judges.\n49.9.1: FINAL TEAM SCORE\n• The highest and lowest Judges' scores are removed.\n• The remaining three (3) Judges' scores are added together.\n• Time deduction points are removed.\n• The total is divided by ten (10), then by three (3).\n• The final score is shown to two decimal places; 9.064 and 9.063 become 9.06, while 9.065 and 9.066 become 9.07.\n49.9.2: JURY\nThe Jury must confirm the final scores and scoring papers of all Judges before confirming the official results.\n49.9.3: DRAWS\nIf final scores are equal, the combined scores of all five (5) Judges are calculated. If the draw remains, Judges select the higher-ranked team based on the superior overall Wai Kru or Mai Muay performance.\n49.9.4: TIME\nOverrunning or underrunning the allowed time incurs a 1-point deduction for every full ten (10) seconds, up to 5 points.\n49.9.5: WALK OVER (WO)\nAn Athlete or Team failing to appear within two (2) minutes after being called is declared to lose by Walk Over (WO).\n49.10: DURING THE ROUND\n• The Red Corner Athlete performs Prom Nang and the Blue Corner Athlete performs Prom Yuen postures.\n• Prom Nang/Yuen sequences face all four (4) sides of the competition area.\n• Mai Muay begins immediately after Wai Kru.\n• Athletes who fall out of the ring have up to two (2) minutes to continue.\n• When injury requires a Doctor, points gained up to termination are recorded.\n• An Athlete or Team leaving and not returning within ten (10) seconds loses by Retirement (RET)."
    },
    related: ["WAI_KRITER", "WAI_DECISIONS"],
    tags: ["100 puan", "nihai skor", "beraberlik", "wo", "ret", "49.9", "49.10"]
  },
  {
    id: "WAI_DECISIONS", module: "waikru", subtopic: "mac-kararlari", label: "ifma",
    rule: "50", revision: "2026-05-11", status: A,
    discipline: ["waikru", "maimuay"], age: [], gender: [], role: ["judge", "jury"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Maç Kararları", en: "Decisions" },
    quick: {
      tr: "Final performansında en fazla puanı alan takım Sıralama ile Kazanma (BR) kararıyla birinci olur; diğer takımlar final puanlarına göre sıralanır.",
      en: "The team with the most points in the final performance wins by Ranking (BR); all other teams are placed according to their final score."
    },
    ruleText: {
      tr: "KURAL 50: MAÇ KARARLARI\n50.1: SIRALAMA İLE KAZANMA (BR)\nMüsabakanın veya şampiyonanın sonunda, final performansında en fazla puanı alan takım kazanan ilan edilecektir.\n50.1.1: SIRALAMALAR\nEn yüksek puanı alan takım birinci, en düşük puanı alan takım sonuncu olur. Diğer tüm takımlar final puanlarına göre birinci ve sonuncu arasında sıralanır.",
      en: "RULE 50: DECISIONS\n50.1: WIN BY RANKING (BR)\nAt the end of the competition or championship, the Team awarded the most points in the final performance shall be declared the winner.\n50.1.1: STANDINGS\nThe Team with the highest score is awarded first place and the Team with the lowest score last place. All other Teams are ranked between first and last according to their final score."
    },
    related: ["WAI_SCORING", "WAI_FOULS"],
    tags: ["maç kararı", "sıralama", "br", "ranking", "50"]
  },
  {
    id: "WAI_FOULS", module: "waikru", subtopic: "fauller", label: "ifma",
    rule: "51", revision: "2026-05-11", status: A,
    discipline: ["waikru", "maimuay"], age: [], gender: [], role: ["judge", "jury"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Fauller", en: "Fouls" },
    quick: {
      tr: "Fauller puan kesintisine veya uyarı olmadan diskalifiyeye yol açabilir. Saygısız postür, hareket veya tavır ile alanın, ring iplerinin ve köşe yastıklarının uygunsuz kullanımı yasaktır.",
      en: "Fouls may lead to point deductions or disqualification without warning. Disrespectful posture, motion or attitude and improper use of the area, ropes or corner padding are forbidden."
    },
    ruleText: {
      tr: "KURAL 51: FAULLER\n51.1: FAULLERİN DEĞERLENDİRİLMESİ\nFaul yapan sporcu veya takımın puanları Yan Hakemlerin ve Jürinin takdirine bağlı olarak düşürülebilir ya da sporcu ön uyarı olmaksızın doğrudan diskalifiye edilebilir.\n51.1.1: DİSKALİFİYE\nKuralların büyük veya bariz şekilde ihlal edilmesi durumunda Jüri, sporcu veya takımı derhal diskalifiye edebilir.\n51.2: FAUL TÜRLERİ\nSporcunun aşağıdaki fiilleri kasıtlı olarak işlemesi yasaktır:\n• Rakibe karşı saygısız postür sergilemek.\n• Rakibe karşı saygısız hareketlerde bulunmak.\n• Rakibe karşı saygısız tavır takınmak.\n• Müsabaka alanının dışına çıkarak alanı uygunsuz kullanmak.\n• Ring iplerini ve köşe yastıklarını uygunsuz kullanmak.",
      en: "RULE 51: FOULS\n51.1: TREATMENT OF FOULS\nThe Athlete or Team who commits fouls can, at the discretion of the Judges and Jury, have points deducted or be Disqualified without a Warning.\n51.1.1: DISQUALIFICATIONS\nFor major or blatant infractions, the Jury may immediately disqualify an Athlete or Team.\n51.2: TYPES OF FOULS\nThe Athlete must not intentionally commit the following:\n• Impolite Posture towards an opponent.\n• Impolite Motion towards an opponent.\n• Impolite Attitude towards an opponent.\n• Improper use of the Performance Area by being outside.\n• Improper use of ring ropes and corner padding."
    },
    related: ["WAI_DECISIONS", "WAI_AREA"],
    tags: ["faul", "diskalifiye", "saygısız", "ring ipi", "51"]
  },
  {
    id: "WAI_AREA", module: "waikru", subtopic: "musabaka-alani", label: "ifma",
    rule: "39, 41", revision: "2026-05-11", status: A,
    discipline: ["waikru", "maimuay"], age: [], gender: [], role: ["jury", "official"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Teknik ve Kültürel Müsabaka Alanı", en: "Technical and Cultural Field of Play" },
    quick: {
      tr: "Alan Teknik Delegenin belirlediği ring veya tatami düzenine göre kurulur. Tatami en az 8×8 metre, 4–5 cm kalınlıkta ve 64 adet toksik olmayan EVA minderden oluşur.",
      en: "The area is set up as a ring or contest area determined by the Technical Delegate. Tatami is at least 8×8 metres, 4–5 cm thick and made from 64 non-toxic EVA mats."
    },
    ruleText: {
      tr: "KURAL 39: TEKNİK VE KÜLTÜREL MÜSABAKA ALANI (FOP)\nMüsabaka alanı, Teknik Delege tarafından belirlenen ring veya tatami alanı düzenine uygun kurulacaktır.\n39.1: EK RİNGLER\nŞampiyonalarda iki veya daha fazla ring kullanılabilir. Bir etkinlikte birden fazla ring kullanılırsa tüm ringlerde ring kenarında aynı sayıda Yan Hakem görev yapar.\n38.2: EK MÜSABAKA ALANI\nŞampiyonalarda iki veya daha fazla tatami alanı kullanılabilir. Bir etkinlikte birden fazla tatami alanı kullanıldığında tüm alanlarda aynı sayıda Yan Hakem görevlendirilir.\n39.3: MEDYA\nMedya mensupları, doktorun ring merdivenlerine erişimini engellemeden kırmızı/beyaz köşelerin ortasından mavi/beyaz köşelerin çevresine kadar zeminde durabilir. Teknik Delege belirli medya personeline ring apronunda veya tatami alanında durma izni verebilir. Medya maç sırasında Yan Hakemlerin arkasında veya Jürinin önünde duramaz.\nKURAL 41: MÜSABAKA ALANI\n41.1: TEKNİK ÖZELLİKLER\n• Malzeme: Toksik madde içermeyen, birbirine geçmeli EVA köpük minderler.\n• Boyut: Minderler 1 m² ve 4–5 cm kalınlığında olmalıdır. Alan düz kenardan düz kenara en az 8 metre olmalı ve 64 minder kullanılmalıdır.\n• Yerleşim: Ortada 6×6 siyah veya mavi minder; çevresinde gri veya kırmızı bir minderlik sınır bulunur. Karşılıklı iki köşede dört gri veya kırmızı minder yer alır; Jürinin sol önündeki köşe sporcu alanını gösterir.\n• Platform: Podyum kullanılıyorsa tekerlekli sandalye erişimine uygun olmalıdır.",
      en: "RULE 39: FIELD OF PLAY (FOP)\nThe competition area shall be set up as a ring or contest area determined by the Technical Delegate.\n39.1: ADDITIONAL RINGS\nTwo or more rings may be used in championships. If more than one ring is used, all rings shall use the same number of Judges seated at the ring.\n38.2: ADDITIONAL CONTEST AREA\nTwo or more contest areas may be used in championships. If more than one contest area is used, all areas shall use the same number of Judges.\n39.3: MEDIA\nMedia may stand on the floor from the middle of the red/white corners around to the blue/white corners without impeding the Doctor's access to the ring stairs. The Technical Delegate may permit specific media personnel on the ring apron or contest area. Media must never stand behind the Judges or in front of the Jury during competition.\nRULE 41: CONTEST AREA\n41.1: SPECIFICATIONS\n• Material: Non-toxic EVA Foam interlocking mats.\n• Size: Mats are 1 m² and 4–5 cm thick. The area is at least 8 metres from straight edge to straight edge and uses 64 mats.\n• Layout: A centred 6×6 area of black or blue mats is surrounded by one grey or red mat at the edge. Four grey or red mats occupy two opposite corners; the near-left corner of the Jury represents the Athlete Area.\n• Staging Area: Any platform must provide wheelchair access."
    },
    related: ["WAI_RING_EQUIPMENT", "WAI_FOULS"],
    tags: ["müsabaka alanı", "fop", "tatami", "eva", "medya", "39", "41"]
  },
  {
    id: "WAI_RING_EQUIPMENT", module: "waikru", subtopic: "musabaka-alani", label: "ifma",
    rule: "40", revision: "2026-05-11", status: A,
    discipline: ["waikru", "maimuay"], age: [], gender: [], role: ["jury", "official"],
    media: { photo: false, video: false, animation: false },
    title: { tr: "Ring Ekipmanları", en: "Ring Equipment" },
    quick: {
      tr: "Ringde sporcu ve doktor merdivenleri, köşe görevlisi sandalyesi, görevli masaları, gong/zil, kronometre, puanlama sistemi, mikrofon, sedye ve seyirci bariyeri hazır bulunur.",
      en: "The ring provides athlete and doctor steps, a coach seat, officials' tables, gong/bell, stopwatches, scoring system, microphones, stretcher and a spectator barrier."
    },
    ruleText: {
      tr: "KURAL 40: RİNG EKİPMANLARI\n40.1: RİNG EKİPMANLARI\nMüsabaka alanında aşağıdaki ekipmanlar hazır bulundurulmalıdır:\n• İki (2) merdiven: Biri kırmızı köşede sporcular, diğeri Jüriye en yakın nötr köşede doktorlar için.\n• Köşe Görevlisi için bir (1) sandalye.\n• Yan Hakem Heyeti için beş sandalyeli bir masa.\n• Jüri Heyeti için üç sandalyeli bir masa.\n• Skor Hakemleri için iki sandalyeli bir masa.\n• Zaman ve Anons Hakemleri için iki sandalyeli bir masa.\n• Doktor ve sağlık personeli için iki sandalyeli bir masa.\n• Tokmağıyla birlikte gong veya zil.\n• Bir, tercihen iki kronometre.\n• IFMA elektronik puanlama sistemi veya puan kartları.\n• Hoparlör sistemine bağlı mikrofon ve yedek mikrofon.\n• Sedye veya taşınabilir hasta yatağı/tekerlekli sedye.\n• Görevli masalarıyla seyirciler arasında en az 1,5 metre mesafede bariyer.\n• Yalnızca IFMA onaylı ringler.",
      en: "RULE 40: RING EQUIPMENT\n40.1: RING EQUIPMENT\nThe following equipment shall be available:\n• Two (2) sets of steps: one at the red corner for contestants and one in the neutral corner closest to the Jury for Doctors.\n• One (1) seat for the coach.\n• One table with five chairs for the Judges.\n• One table with three chairs for the Jury.\n• One table with two chairs for scorekeepers.\n• One table with two chairs for the Timekeeper and Announcer.\n• One table with two chairs for the Doctor and medical staff.\n• Gong with striker, or bell.\n• One, preferably two, stopwatches.\n• IFMA electronic scoring system or score cards.\n• One microphone connected to the loudspeaker system and one backup.\n• One stretcher or access to a cot/gurney.\n• A barrier at least 1.5 metres from officials' tables to spectators.\n• Only IFMA-approved rings are permitted."
    },
    related: ["WAI_AREA"],
    tags: ["ring ekipmanı", "merdiven", "gong", "kronometre", "sedye", "40"]
  }

];
