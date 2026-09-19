/* ==========================================================================
   RENDER — pequenas funções de marcação compartilhadas entre as páginas
   (slides da página inicial, fichas da página Projetos, lista do currículo)
   ========================================================================== */
(function () {
  'use strict';

  function esc(valor) {
    return String(valor == null ? '' : valor).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function host(url) {
    try { return new URL(url).host; } catch (e) { return String(url || ''); }
  }

  var SETA = '<svg class="seta" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>';

  var COPIAR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/>' +
    '<path d="M5 15V6a2 2 0 0 1 2-2h9"/></svg>';

  /* Moldura de celular com a prévia do projeto.
     A imagem NÃO é link: quem quiser abrir o site usa os botões ao lado. */
  function moldura(p) {
    return '<div class="moldura">' +
      '<span class="moldura__barra" aria-hidden="true">' + esc(host(p.url)) + '</span>' +
      '<div class="moldura__tela">' +
        '<img src="' + esc(p.imagem) + '" alt="' + esc(p.imagemAlt) + '" width="600" height="1080" ' +
        'loading="lazy" decoding="async" draggable="false">' +
      '</div>' +
    '</div>' +
    (p.esquematica ? '<p class="moldura__nota">Prévia esquemática · abra o site para ver o original</p>' : '');
  }

  function botoes(p, comDetalhes) {
    return '<div class="acoes">' +
      '<a class="btn" href="' + esc(p.url) + '" target="_blank" rel="noopener noreferrer">' +
        'Abrir site' + SETA + '<span class="sr-only"> (abre em nova aba)</span></a>' +
      (comDetalhes
        ? '<a class="btn btn--sec" href="projetos.html#' + esc(p.id) + '">Ver detalhes</a>'
        : '<button class="btn btn--sec" type="button" data-copiar="' + esc(p.url) + '">' + COPIAR + 'Copiar link</button>') +
    '</div>';
  }

  function ficha(lista) {
    return '<dl class="ficha">' + (lista || []).map(function (par) {
      return '<div><dt>' + esc(par[0]) + '</dt><dd>' + esc(par[1]) + '</dd></div>';
    }).join('') + '</dl>';
  }

  window.Render = { esc: esc, host: host, moldura: moldura, botoes: botoes, ficha: ficha };
})();
