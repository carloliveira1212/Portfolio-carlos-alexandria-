/* ==========================================================================
   SLIDER DE PROJETOS EM DESTAQUE (página inicial)
   • Rolagem nativa com "snap": arrastar com o dedo funciona sem script.
   • Botões, pontos e setas do teclado usam a mesma pista.
   • Ao trocar de slide, a cor de toda a seção muda para o matiz do projeto.
   • As imagens NÃO são links; os botões abrem o site em nova aba.
   ========================================================================== */
(function () {
  'use strict';

  var raiz = document.querySelector('[data-slider]');
  if (!raiz || !window.DADOS || !window.Render) return;

  var R = window.Render;
  var projetos = window.DADOS.projetos;
  var area = raiz.closest('.destaques') || raiz;
  var pista = raiz.querySelector('.slider__pista');
  var pontos = raiz.querySelector('.slider__pontos');
  var btnAnt = raiz.querySelector('[data-ant]');
  var btnProx = raiz.querySelector('[data-prox]');
  var contador = raiz.querySelector('.slider__contador');
  var total = projetos.length;
  var atual = -1;
  var esperando = false;

  function doisDigitos(n) { return (n < 10 ? '0' : '') + n; }

  pista.innerHTML = projetos.map(function (p, i) {
    return '<article class="slide" id="slide-' + R.esc(p.id) + '" role="group" ' +
      'aria-roledescription="slide" aria-label="' + (i + 1) + ' de ' + total + '">' +
        '<div class="slide__texto">' +
          '<p class="slide__meta">Projeto ' + doisDigitos(i + 1) + ' · ' + R.esc(p.tipo) + '</p>' +
          '<h3 class="slide__titulo">' + R.esc(p.titulo) + '</h3>' +
          '<p class="slide__resumo">' + R.esc(p.resumo) + '</p>' +
          '<p class="slide__host">' + R.esc(R.host(p.url)) + '</p>' +
          R.botoes(p, true) +
        '</div>' +
        '<div class="slide__visual">' + R.moldura(p) + '</div>' +
      '</article>';
  }).join('');

  pontos.innerHTML = projetos.map(function (p, i) {
    return '<button class="slider__ponto" type="button" data-i="' + i + '" ' +
      'aria-label="Ir para o projeto ' + (i + 1) + ': ' + R.esc(p.titulo) + '"></button>';
  }).join('');

  var slides = [].slice.call(pista.children);
  var dots = [].slice.call(pontos.children);

  function irPara(i, instantaneo) {
    i = Math.max(0, Math.min(total - 1, i));
    var suave = !instantaneo && !(window.Site && window.Site.reduzMovimento());
    pista.scrollTo({ left: i * pista.clientWidth, behavior: suave ? 'smooth' : 'auto' });
  }

  function atualizar(i) {
    if (i === atual) return;
    atual = i;
    slides.forEach(function (s, k) {
      if (k === i) s.removeAttribute('inert'); else s.setAttribute('inert', '');
    });
    dots.forEach(function (d, k) {
      if (k === i) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
    });
    btnAnt.disabled = i === 0;
    btnProx.disabled = i === total - 1;
    contador.textContent = doisDigitos(i + 1) + ' / ' + doisDigitos(total);
    // Cor dinâmica: o matiz do projeto ativo colore a seção inteira
    area.style.setProperty('--tom', String(projetos[i].tom));
  }

  pista.addEventListener('scroll', function () {
    if (esperando) return;
    esperando = true;
    window.requestAnimationFrame(function () {
      esperando = false;
      var i = Math.round(pista.scrollLeft / (pista.clientWidth || 1));
      atualizar(Math.max(0, Math.min(total - 1, i)));
    });
  }, { passive: true });

  btnAnt.addEventListener('click', function () { irPara(atual - 1); });
  btnProx.addEventListener('click', function () { irPara(atual + 1); });
  pontos.addEventListener('click', function (e) {
    var b = e.target.closest('[data-i]');
    if (b) irPara(parseInt(b.getAttribute('data-i'), 10));
  });

  pista.addEventListener('keydown', function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); irPara(atual + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); irPara(atual - 1); }
    else if (e.key === 'Home') { e.preventDefault(); irPara(0); }
    else if (e.key === 'End') { e.preventDefault(); irPara(total - 1); }
  });

  // Mantém o slide alinhado quando a janela muda de tamanho
  var timer = null;
  window.addEventListener('resize', function () {
    window.clearTimeout(timer);
    timer = window.setTimeout(function () { irPara(atual, true); }, 120);
  });

  atualizar(0);
  if (window.Site) window.Site.iniciarRevelar(raiz);
})();
