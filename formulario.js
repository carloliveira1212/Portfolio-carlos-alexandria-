/* ==========================================================================
   FORMULÁRIO DE CONTATO — validação em linha e estado de envio
   O envio em si é um POST comum para o FormSubmit (funciona até sem este
   script; aqui só melhoramos a experiência).
   ========================================================================== */
(function () {
  'use strict';

  var form = document.getElementById('form-contato');
  if (!form) return;

  form.noValidate = true; // com JS, usamos mensagens próprias; sem JS, vale a validação nativa

  var botao = form.querySelector('button[type="submit"]');
  var textoBotao = botao ? botao.innerHTML : '';
  var contador = form.querySelector('[data-contador]');
  var proximo = form.querySelector('input[name="_next"]');

  var REGRAS = {
    name: function (v) {
      return v.trim().length >= 2 ? '' : 'Informe seu nome (mínimo de 2 letras).';
    },
    email: function (v, campo) {
      return v.trim() && campo.validity.valid ? '' : 'Informe um e-mail válido, como nome@exemplo.com.';
    },
    message: function (v) {
      return v.trim().length >= 10 ? '' : 'Escreva pelo menos 10 caracteres para eu entender o assunto.';
    }
  };

  function campos() {
    return Object.keys(REGRAS).map(function (nome) { return form.elements[nome]; });
  }

  function mostrarErro(campo, mensagem) {
    var erro = document.getElementById('erro-' + campo.name);
    if (erro) erro.textContent = mensagem;
    if (mensagem) campo.setAttribute('aria-invalid', 'true');
    else campo.removeAttribute('aria-invalid');
  }

  function validar(campo) {
    var mensagem = REGRAS[campo.name](campo.value, campo);
    mostrarErro(campo, mensagem);
    return !mensagem;
  }

  campos().forEach(function (campo) {
    campo.addEventListener('blur', function () { if (campo.value) validar(campo); });
    campo.addEventListener('input', function () {
      if (campo.getAttribute('aria-invalid') === 'true') validar(campo);
    });
  });

  var mensagem = form.elements.message;
  function atualizarContador() {
    if (contador) contador.textContent = mensagem.value.length + '/' + mensagem.maxLength;
  }
  mensagem.addEventListener('input', atualizarContador);
  atualizarContador();

  form.addEventListener('submit', function (e) {
    var invalidos = campos().filter(function (c) { return !validar(c); });
    if (invalidos.length) {
      e.preventDefault();
      invalidos[0].focus();
      if (window.Site) window.Site.aviso('Confira os campos destacados');
      return;
    }

    // Página de agradecimento no mesmo endereço em que o site estiver publicado
    if (proximo) {
      if (/^https?:$/.test(location.protocol)) {
        proximo.value = new URL('enviado.html', location.href).href;
      } else {
        proximo.disabled = true; // abrindo o arquivo direto do computador
      }
    }

    if (botao) {
      botao.disabled = true;
      botao.setAttribute('aria-busy', 'true');
      botao.textContent = 'Enviando…';
    }
  });

  // Se a pessoa voltar pelo botão "voltar" do navegador, reativa o botão
  window.addEventListener('pageshow', function () {
    if (botao) {
      botao.disabled = false;
      botao.removeAttribute('aria-busy');
      botao.innerHTML = textoBotao;
    }
  });
})();
