/* ==========================================================================
   CURRÍCULO — lista de projetos publicados (lida de dados.js)
   ========================================================================== */
(function () {
  'use strict';

  var alvo = document.querySelector('[data-cv-projetos]');
  if (!alvo || !window.DADOS || !window.Render) return;

  var R = window.Render;
  var itens = window.DADOS.projetos.map(function (p) {
    return '<li><a href="' + R.esc(p.url) + '" target="_blank" rel="noopener noreferrer">' + R.esc(p.titulo) +
      '</a><small>' + R.esc(p.tipo) + ' · ' + R.esc(R.host(p.url)) + '</small></li>';
  }).join('');

  alvo.insertAdjacentHTML('beforeend', itens);
})();
