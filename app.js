/* ==========================================================================
   APP — comportamentos comuns a todas as páginas
   1. Tema e cores dinâmicas (horário + preferência do visitante)
   2. Menu móvel acessível
   3. Barra de progresso de leitura
   4. Revelar seções ao rolar
   5. Vínculo de contatos (dados.js → HTML)
   6. Utilitários: copiar link, imprimir, aviso (toast)
   ========================================================================== */
(function () {
  'use strict';

  var raiz = document.documentElement;
  var reduzMov = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- 1. Tema e cores dinâmicas ---------- */
  var TEMAS = ['auto', 'claro', 'escuro'];
  var ROTULO_TEMA = { auto: 'automático', claro: 'claro', escuro: 'escuro' };
  var ROTULO_FASE = { manha: 'manhã', dia: 'dia', tarde: 'tarde', noite: 'noite' };
  var prefereEscuro = window.matchMedia('(prefers-color-scheme: dark)');

  function faseAtual(data) {
    var h = (data || new Date()).getHours();
    if (h >= 5 && h < 11) return 'manha';
    if (h >= 11 && h < 16) return 'dia';
    if (h >= 16 && h < 19) return 'tarde';
    return 'noite';
  }

  function lerTema() {
    try {
      var t = localStorage.getItem('tema');
      return TEMAS.indexOf(t) > -1 ? t : 'auto';
    } catch (e) { return 'auto'; }
  }

  function salvarTema(t) {
    try { localStorage.setItem('tema', t); } catch (e) { /* navegação privada: ignora */ }
  }

  function atualizarMetaTema() {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) return;
    // Espera a transição de fundo terminar para ler a cor final.
    window.setTimeout(function () {
      meta.setAttribute('content', getComputedStyle(document.body).backgroundColor);
    }, 560);
  }

  function atualizarBotaoTema() {
    var btn = document.getElementById('tema-btn');
    var tema = raiz.dataset.tema || 'auto';
    if (btn) {
      var texto = 'Tema: ' + ROTULO_TEMA[tema] + '. Clique para alternar.';
      btn.setAttribute('aria-label', texto);
      btn.setAttribute('title', texto);
    }
    var fase = ROTULO_FASE[raiz.dataset.fase] || '';
    document.querySelectorAll('[data-fase-rotulo]').forEach(function (el) { el.textContent = fase; });
  }

  function aplicarTema() {
    var tema = raiz.dataset.tema || lerTema();
    var escuro = tema === 'escuro' || (tema === 'auto' && prefereEscuro.matches);
    raiz.dataset.tema = tema;
    raiz.dataset.fase = faseAtual();
    raiz.dataset.scheme = escuro ? 'dark' : 'light';
    atualizarBotaoTema();
    atualizarMetaTema();
  }

  var btnTema = document.getElementById('tema-btn');
  if (btnTema) {
    btnTema.addEventListener('click', function () {
      var atual = raiz.dataset.tema || 'auto';
      var proximo = TEMAS[(TEMAS.indexOf(atual) + 1) % TEMAS.length];
      raiz.dataset.tema = proximo;
      salvarTema(proximo);
      aplicarTema();
      aviso('Tema ' + ROTULO_TEMA[proximo]);
    });
  }

  if (prefereEscuro.addEventListener) prefereEscuro.addEventListener('change', aplicarTema);
  // Ao voltar para a aba (ex.: depois de horas), recalcula o período do dia.
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) aplicarTema();
  });
  aplicarTema();

  /* ---------- 2. Menu móvel ---------- */
  var menuBtn = document.getElementById('menu-btn');
  var menu = document.getElementById('menu');

  function abrirMenu(abrir) {
    if (!menu || !menuBtn) return;
    menu.classList.toggle('aberto', abrir);
    menuBtn.setAttribute('aria-expanded', String(abrir));
    menuBtn.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
  }

  if (menu && menuBtn) {
    menuBtn.addEventListener('click', function () {
      abrirMenu(!menu.classList.contains('aberto'));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('aberto')) {
        abrirMenu(false);
        menuBtn.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (menu.classList.contains('aberto') && !menu.contains(e.target) && !menuBtn.contains(e.target)) {
        abrirMenu(false);
      }
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) abrirMenu(false);
    });
    window.matchMedia('(min-width: 56em)').addEventListener('change', function () { abrirMenu(false); });
  }

  // Marca o link da página atual
  var pagina = document.body.getAttribute('data-pagina');
  if (pagina) {
    document.querySelectorAll('.nav a[data-pagina]').forEach(function (a) {
      if (a.getAttribute('data-pagina') === pagina) a.setAttribute('aria-current', 'page');
    });
  }

  /* ---------- 3. Barra de progresso ---------- */
  var barra = document.querySelector('.progresso');
  var esperando = false;

  function atualizarProgresso() {
    esperando = false;
    if (!barra) return;
    var max = raiz.scrollHeight - window.innerHeight;
    var p = max > 0 ? window.scrollY / max : 0;
    barra.style.transform = 'scaleX(' + Math.min(1, Math.max(0, p)) + ')';
  }

  if (barra) {
    window.addEventListener('scroll', function () {
      if (!esperando) { esperando = true; window.requestAnimationFrame(atualizarProgresso); }
    }, { passive: true });
    window.addEventListener('resize', atualizarProgresso);
    atualizarProgresso();
  }

  /* ---------- 4. Revelar ao rolar ---------- */
  function iniciarRevelar(contexto) {
    var itens = (contexto || document).querySelectorAll('[data-revelar]:not(.visivel)');
    if (!itens.length) return;
    itens.forEach(function (el) {
      var n = parseInt(el.getAttribute('data-revelar'), 10) || 0;
      if (n) el.style.setProperty('--atraso', n * 90 + 'ms');
    });
    if (!('IntersectionObserver' in window) || reduzMov.matches) {
      itens.forEach(function (el) { el.classList.add('visivel'); });
      return;
    }
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visivel'); obs.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    itens.forEach(function (el) { obs.observe(el); });
  }

  /* ---------- 5. Vínculo de contatos ---------- */
  function vincularDados() {
    var P = window.DADOS && window.DADOS.pessoa;
    if (!P) return;

    function texto(chave) {
      var v = P[chave];
      if (v && typeof v === 'object') return v.texto || '';
      return v || '';
    }

    function endereco(chave) {
      switch (chave) {
        case 'whatsapp':
          return 'https://wa.me/' + P.telefoneInternacional + '?text=' + encodeURIComponent(P.whatsappMensagem || '');
        case 'telefone': return 'tel:+' + P.telefoneInternacional;
        case 'email': return 'mailto:' + P.email;
        case 'emailCurriculo':
          return 'mailto:' + P.email + '?subject=' + encodeURIComponent('Solicitação de currículo completo');
        case 'linkedin': return (P.linkedin && P.linkedin.url) || '';
        case 'instagram': return (P.instagram && P.instagram.url) || '';
        case 'youtube': return (P.youtube && P.youtube.url) || '';
        case 'portfolio': return P.portfolioAnterior || '';
        default: return '';
      }
    }

    document.querySelectorAll('[data-bind]').forEach(function (el) {
      var t = texto(el.getAttribute('data-bind'));
      if (t) el.textContent = t;
    });

    document.querySelectorAll('[data-href]').forEach(function (el) {
      var url = endereco(el.getAttribute('data-href'));
      if (!url) {
        el.removeAttribute('href');
        el.classList.add('sem-link');
        return;
      }
      el.setAttribute('href', url);
      if (/^https?:/i.test(url)) {
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }

  document.querySelectorAll('[data-ano]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- 6. Utilitários ---------- */
  var toast = null;
  var toastTimer = null;

  function aviso(mensagem) {
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.textContent = mensagem;
    // força reinício da animação quando chamado em sequência
    toast.classList.remove('visivel');
    void toast.offsetWidth;
    toast.classList.add('visivel');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { toast.classList.remove('visivel'); }, 2200);
  }

  function copiarTexto(texto) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(texto);
    }
    return new Promise(function (ok, falha) {
      var campo = document.createElement('textarea');
      campo.value = texto;
      campo.setAttribute('readonly', '');
      campo.style.position = 'fixed';
      campo.style.opacity = '0';
      document.body.appendChild(campo);
      campo.select();
      try { document.execCommand('copy') ? ok() : falha(); } catch (e) { falha(e); }
      document.body.removeChild(campo);
    });
  }

  document.addEventListener('click', function (e) {
    var copiar = e.target.closest('[data-copiar]');
    if (copiar) {
      copiarTexto(copiar.getAttribute('data-copiar'))
        .then(function () { aviso('Link copiado'); })
        .catch(function () { aviso('Não foi possível copiar'); });
      return;
    }
    if (e.target.closest('[data-imprimir]')) window.print();
  });

  // API pública para os outros scripts
  window.Site = {
    aviso: aviso,
    iniciarRevelar: iniciarRevelar,
    vincularDados: vincularDados,
    reduzMovimento: function () { return reduzMov.matches; }
  };

  vincularDados();
  iniciarRevelar();
})();
