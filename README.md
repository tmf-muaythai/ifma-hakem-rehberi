# IFMA Hakem Rehberi

IFMA Kuralları ve Yönetmelikleri 2026'yı (rev. 11.05.2026) hakemler, aday hakemler
ve teknik görevliler için **hızlı, görsel ve kaynağı açık** bir dijital rehbere
dönüştüren web/PWA uygulaması.

Bu depo **1. faz**ı içerir: tüm sistem/arayüz + öncelikli modüllerde gerçek örnek
kartlar. Fotoğraf, açıklama görselleri ve videolar sonraki fazlarda eklenecek.

## Hızlı başlangıç

Kurulum gerekmez. `index.html` dosyasını bir tarayıcıda aç.

> Not: Servis çalışanı (çevrimdışı/PWA kurulumu) yalnızca `http://` veya `https://`
> üzerinden çalışır; `file://` ile açıldığında uygulama çalışır ama çevrimdışı devre dışıdır.
> Yerel sunucu için: `python -m http.server` çalıştırıp `http://localhost:8000` adresini aç.

## GitHub Pages'te yayınlama

```bash
git init
git add .
git commit -m "IFMA Hakem Rehberi — 1. faz (arayüz + örnek içerik)"
git branch -M main
git remote add origin https://github.com/<KULLANICI>/ifma-hakem-rehberi.git
git push -u origin main
```
Ardından GitHub → repo → **Settings → Pages → Branch: main / root** seç.
Birkaç dakika içinde `https://<KULLANICI>.github.io/ifma-hakem-rehberi/` yayına girer.

## Proje yapısı

```
ifma-hakem-rehberi/
├── index.html              Uygulama kabuğu (script sırası burada)
├── manifest.webmanifest    PWA manifesti
├── sw.js                   Servis çalışanı (çevrimdışı önbellek)
├── css/
│   └── styles.css          Tüm stiller (açık/karanlık tema)
├── js/
│   ├── icons.js            SVG ikon seti
│   ├── search.js           Arama motoru
│   └── app.js              Durum + tüm ekranların render'ı
├── data/                   >>> İÇERİK KODDAN AYRIDIR <<<
│   ├── meta.js             Arayüz metinleri (TR/EN), etiketler
│   ├── categories.js       Filtreler + kategori profilleri (raund/kısıt/CCL)
│   ├── modules.js          8 modül + alt başlıklar
│   ├── cards.js            Kural kartları (gerçek örnek + gelecek yer tutucular)
│   └── flows.js            Görev modu akışları + eğitim senaryoları
└── assets/
    ├── icons/              PWA ikonları
    ├── img/                (foto — sonraki faz)
    └── video/              (video — sonraki faz)
```

## İçerik nasıl eklenir/güncellenir (kod bilmeden)

Yeni bir kural kartı eklemek için `data/cards.js` içine yeni bir nesne ekle:

```js
{
  id: "REF_YENI", module: "orta", subtopic: "komutlar", label: "ifma",
  rule: "26.3", revision: "2026-05-11", status: { tr: "approved", en: "draft" },
  discipline: [], age: [], gender: [], role: ["ref"],
  media: { photo: true, video: true, animation: false },
  title: { tr: "Başlık", en: "Title" },
  quick: { tr: "Hızlı cevap.", en: "Quick answer." },
  when:  { tr: "Ne zaman geçerli.", en: "When it applies." },
  right: { tr: "Doğru uygulama.", en: "Correct." },
  wrong: { tr: "Sık hata.", en: "Common mistake." },
  related: ["REF_YOOT"], tags: ["anahtar", "kelime"]
}
```

- `label`: `ifma` (kural), `tmf` (organizasyon prosedürü), `training` (eğitim uygulaması).
- `status`: dile göre onay — `approved` / `draft` (taslak çeviri) / `pending` (kaynak bekliyor).
- `media`: hangi yer tutucunun gösterileceği. Gerçek dosyalar `assets/img` ve `assets/video`'ya
  eklenip kart alanları bu yollara bağlanacak (2. faz).
- `discipline/age/gender/role` boş `[]` = tüm kategoriler.

Fotoğraf/video eklerken `data/cards.js`'e `photoSrc`/`videoSrc` alanları eklenip
`js/app.js` içindeki `mediaBox` bu yolları render edecek şekilde genişletilecek.

## Fazlar

- **Faz 1 (bu depo):** 5 sekme, 8 modül, kategori seçici, standart kart, görev modu,
  eğitim iskeleti, arama, TR/EN, PWA. Öncelikli modüllerde gerçek örnek kartlar.
- **Faz 2:** Açıklama görselleri + fotoğraflar; tüm modüllerin içeriğinin doldurulması;
  uzman onaylı EN çeviriler.
- **Faz 3:** Profesyonel videolar; yönetici paneli/CMS; çoklu dil genişlemesi;
  kurumsal/rol bazlı erişim.

## Kaynak

Tüm kural içerikleri **IFMA Kuralları ve Yönetmelikleri 2026 — Revizyon 11 Mayıs 2026**
belgesine dayanır. Her kartta madde numarası ve revizyon tarihi görünür.
Eğitim ve organizasyon prosedürü içerikleri ayrı etiketlerle işaretlenmiştir.
