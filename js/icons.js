/* =========================================================================
   IFMA HAKEM REHBERİ  —  js/icons.js
   Basit satır-içi SVG ikon seti. currentColor kullanır.
   Kullanım: IFMA.icon("home", "opsiyonel-css-sınıfı")
   ========================================================================= */
window.IFMA = window.IFMA || {};

(function () {
  var P = {
    // Sekmeler
    home:   '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h5v-6h4v6h5V10"/>',
    book:   '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 5.5V20"/>',
    cap:    '<path d="M12 4 2 9l10 5 10-5z"/><path d="M6 11v4c0 1.5 2.7 3 6 3s6-1.5 6-3v-4"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4-4"/>',
    // Modüller / roller
    clipboard:'<rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V6H9z"/><path d="M9 11h6M9 15h6"/>',
    layers: '<path d="m12 3 8 4-8 4-8-4z"/><path d="m4 12 8 4 8-4"/><path d="m4 17 8 4 8-4"/>',
    ring:   '<rect x="3.5" y="6" width="17" height="13" rx="1.5"/><path d="M3.5 9.5h17M3.5 15.5h17"/><path d="M6 6V4M18 6V4M6 19v2M18 19v2"/>',
    whistle:'<path d="M11 8h9a2 2 0 0 1 2 2 6 6 0 1 1-8.8-5.3"/><circle cx="8" cy="14" r="4"/><path d="M13 5.5 15 4"/>',
    eye:    '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    clock:  '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    flag:   '<path d="M6 21V4"/><path d="M6 4h11l-2 3.5L17 11H6"/>',
    lotus:  '<path d="M12 4c1.8 1.6 2.6 3.4 2.6 5.4 0 1-.3 2-.9 3"/><path d="M12 4c-1.8 1.6-2.6 3.4-2.6 5.4 0 1 .3 2 .9 3"/><path d="M4 11c2.2-.2 3.9.4 5.3 1.6M20 11c-2.2-.2-3.9.4-5.3 1.6"/><path d="M4.5 13.5c1.9 4 4.4 5.5 7.5 5.5s5.6-1.5 7.5-5.5"/>',
    shield: '<path d="M12 3l7 2.5V11c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V5.5z"/>',
    scale:  '<path d="M12 4v16M7 20h10"/><path d="M5 8h14l-2.5 4.5a3 3 0 0 1-5 0z" transform="translate(-2 0)"/><path d="M5 8 2.5 12.5a3 3 0 0 0 5 0z"/><path d="M19 8l2.5 4.5a3 3 0 0 1-5 0z"/><path d="M5 8h14"/>',
    corner: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 9h5V4"/>',
    // Yardımcı
    back:   '<path d="M15 5l-7 7 7 7"/>',
    chevron:'<path d="M9 6l6 6-6 6"/>',
    star:   '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8-4.3-4.1 5.9-.9z"/>',
    starf:  '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8-4.3-4.1 5.9-.9z" fill="currentColor" stroke="none"/>',
    globe:  '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.3 3.5 5.3 3.5 8.5S14.4 18.2 12 20.5C9.6 18.2 8.5 15.2 8.5 12S9.6 5.8 12 3.5z"/>',
    check:  '<path d="M5 12.5l4.5 4.5L19 7"/>',
    x:      '<path d="M6 6l12 12M18 6L6 18"/>',
    dot:    '<circle cx="12" cy="12" r="4" fill="currentColor" stroke="none"/>',
    info:   '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/>',
    play:   '<path d="M8 5.5v13l11-6.5z"/>',
    camera: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7l1.5-2.5h5L16 7"/><circle cx="12" cy="13.5" r="3.2"/>',
    film:   '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M8 5v14M16 5v14M3 9.5h5M3 14.5h5M16 9.5h5M16 14.5h5"/>',
    filter: '<path d="M4 5h16l-6 7v6l-4 2v-8z"/>',
    grid:   '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
    target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>',
    bolt:   '<path d="M13 3 5 13h5l-1 8 8-10h-5z"/>',
    doc:    '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/><path d="M9.5 12h5M9.5 15.5h5"/>',
    sun:    '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.4M12 19.1v2.4M4.7 4.7l1.7 1.7M17.6 17.6l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.7 19.3l1.7-1.7M17.6 6.4l1.7-1.7"/>',
    moon:   '<path d="M20 14.2A8 8 0 1 1 9.8 4 6.3 6.3 0 0 0 20 14.2z"/>',
    lock:   '<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    qr:     '<rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1"/><rect x="14" y="3.5" width="6.5" height="6.5" rx="1"/><rect x="3.5" y="14" width="6.5" height="6.5" rx="1"/><path d="M14 14h3.2v3.2M20.5 14v.01M14 20.5v.01M17.2 20.5h3.3v-3.3"/>',
    mail:   '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5 12 12.5l8.5-6"/>'
  };

  IFMA.icon = function (name, cls) {
    var body = P[name] || P.dot;
    return '<svg class="ic' + (cls ? ' ' + cls : '') +
      '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + '</svg>';
  };
})();
