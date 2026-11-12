/* AutoRadar: one GTM installation; WhatsApp clicks are intent, not confirmed leads. */
(function () {
  'use strict';
  if (window.autoradarGoogleTagsInitialized) return;
  window.autoradarGoogleTagsInitialized = true;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-N5GF8JG5';
  document.head.appendChild(script);

  document.addEventListener('click', function (event) {
    if (!(event.target instanceof Element)) return;
    var link = event.target.closest('a[href]');
    if (!link) return;
    var url;
    try { url = new URL(link.href, window.location.href); } catch (_) { return; }
    if (url.protocol !== 'https:' || url.hostname !== 'wa.me' ||
        !/^\/525544723900\/?$/.test(url.pathname)) return;
    var position = link.getAttribute('data-whatsapp') ||
      (link.closest('footer') ? 'footer' : link.closest('header') ? 'header' : 'content');
    // Do not send WhatsApp message text, destination query strings or customer data.
    window.dataLayer.push({
      event: 'autoradar_whatsapp_click',
      autoradar_link_position: position,
      autoradar_page_path: window.location.pathname
    });
  });
}());
