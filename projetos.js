/* ==========================================================================
   PÁGINA PROJETOS — fichas técnicas, filtro por categoria e link direto (#id)
   ========================================================================== */
(function () {
  'use strict';

  var lista = document.querySelector('[data-lista-projetos]');
  if (!lista || !window.DADOS || !window.Render) return;

  var R = window.Render;
  var projetos = window.DADOS.projetos;
  var contagem = document.querySelector('[data-contagem]');
  var filtros = document.querySelector('[data-filtros]');

  var CATEGORIAS = { institucional: 'Institucional', educativo: 'Educativo' };

  lista.innerHTML = projetos.map(function (p, i) {
    return '<article class="card-proj" id="' + R.esc(p.id) + '" data-categoria="' + R.esc(p.categoria) + '" ' +
      'style="--tom:' + Number(p.tom) + '" data-revelar>' +
        '<div class="card-proj__visual">' + R.moldura(p) + '</div>' +
        '<div class="card-proj__corpo">' +
          '<p class="card-proj__meta">Projeto ' + (i + 1 < 10 ? '0' : '') + (i + 1) + ' · ' +
            R.esc(CATEGORIAS[p.categoria] || p.categoria) + ' · ' + R.esc(p.tipo) + '</p>' +
          '<h2>' + R.esc(p.titulo) + '</h2>' +
          '<p>' + R.esc(p.descricao) + '</p>' +
          R.ficha([['Endereço', R.host(p.url)]].concat(p.ficha)) +
          R.botoes(p, false) +
        '</div>' +
      '</article>';
  }).join('');

  var cards = [].slice.call(lista.querySelectorAll('.card-proj'));

  function textoContagem(n) {
    return n === 1 ? '1 projeto' : n + ' projetos';
  }

  function filtrar(categoria) {
    var visiveis = 0;
    cards.forEach(function (c) {
      var mostrar = categoria === 'todos' || c.getAttribute('data-categoria') === categoria;
      c.hidden = !mostrar;
      if (mostrar) visiveis++;
    });
    if (contagem) contagem.textContent = 'Mostrando ' + textoContagem(visiveis);
    if (filtros) {
      [].forEach.call(filtros.querySelectorAll('[data-filtro]'), function (b) {
        b.setAttribute('aria-pressed', String(b.getAttribute('data-filtro') === categoria));
      });
    }
  }

  if (filtros) {
    filtros.addEventListener('click', function (e) {
      var b = e.target.closest('[data-filtro]');
      if (b) filtrar(b.getAttribute('data-filtro'));
    });
  }

  filtrar('todos');
  if (window.Site) window.Site.iniciarRevelar(lista);

  // Link direto para um projeto (ex.: projetos.html#mundopet), já que os cards
  // são criados depois do carregamento da página.
  if (location.hash) {
    var alvo = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (alvo && alvo.classList.contains('card-proj')) {
      alvo.classList.add('visivel');
      window.setTimeout(function () { alvo.scrollIntoView({ block: 'start' }); }, 60);
    }
  }
})();
