/* ==========================================================================
   DADOS EDITÁVEIS DO SITE
   --------------------------------------------------------------------------
   Este é o único arquivo que você precisa mexer para atualizar contatos e
   projetos. O restante do site lê daqui.

   • Contatos  → aparecem no rodapé, no currículo e na página de contato.
   • Projetos  → alimentam os slides da página inicial, a página "Projetos"
                 e a lista do currículo. Para adicionar um projeto novo,
                 copie um bloco { ... } e altere os campos.

   Regra do projeto: só entra aqui informação verdadeira e verificável.
   ========================================================================== */

window.DADOS = {

  pessoa: {
    nome: "Carlos Alexandria de Oliveira",
    nomeCompleto: "Carlos Eduardo Alexandria de Oliveira",

    telefone: "(85) 99872-4041",
    telefoneInternacional: "5585998724041",     // formato para links tel: e wa.me
    email: "carloalexandria1212@gmail.com",

    // Mensagem que já vem escrita quando alguém clica no botão do WhatsApp
    whatsappMensagem: "Olá, Carlos! Vi o seu portfólio e gostaria de conversar.",

    // Deixe "url" vazio ("") enquanto não houver link: o texto aparece sem link.
    linkedin:  { texto: "Carlos Alexandria", url: "" },
    instagram: { texto: "@carlosalexandria", url: "https://www.instagram.com/carlosalexandria" },
    youtube:   { texto: "Deslinguistimificando", url: "https://www.youtube.com/@deslinguistimificando" },

    // Endereço do portfólio anterior (aparece na seção "Projetos" do currículo)
    portfolioAnterior: "https://dev-carlosalexandria.vercel.app"

    // Data de nascimento: propositalmente NÃO exibida no site público.
    // dataNascimento: "29/10/2006"
  },

  /* Projetos — a ordem aqui é a ordem dos slides.
     Campos:
       id          identificador curto (usado no link #id da página Projetos)
       titulo      nome exibido
       categoria   "institucional" ou "educativo" (usado no filtro)
       tipo        rótulo curto sob o título
       url         endereço do site publicado
       imagem      caminho da imagem de pré-visualização (NÃO é link)
       imagemAlt   descrição da imagem para leitores de tela
       esquematica true = a imagem é uma ilustração e não uma captura real
       tom         matiz (0–360) que colore o slide quando ele está ativo
       resumo      1 frase (slides)
       descricao   texto completo (página Projetos)
       ficha       lista de [rótulo, valor] da ficha técnica
  */
  projetos: [
    {
      id: "mundopet",
      titulo: "Mundo Pet",
      categoria: "institucional",
      tipo: "Site institucional multipágina",
      url: "https://mundopet-psi.vercel.app/",
      imagem: "mundopet.svg",
      imagemAlt: "Prévia esquemática da página inicial do site Mundo Pet em tela de celular",
      esquematica: true,
      tom: 28,
      resumo: "Site de um pet shop de bairro com serviços, produtos, horários e agendamento pelo WhatsApp.",
      descricao: "Site institucional para um pet shop de bairro. Apresenta serviços, produtos, depoimentos de clientes, endereço e horário de funcionamento, com botão de agendamento por WhatsApp e menu adaptado para celular.",
      ficha: [
        ["Páginas", "Início, Serviços, Produtos, Sobre e Contato"],
        ["Recursos", "Botão de WhatsApp com mensagem pré-preenchida, depoimentos, horários de funcionamento, menu para celular"],
        ["Hospedagem", "Vercel"]
      ]
    },
    {
      id: "contabilidade",
      titulo: "Escritório de Contabilidade",
      categoria: "institucional",
      tipo: "Site institucional de página única",
      url: "https://escrivania-contabilistico.vercel.app/",
      imagem: "contabilidade.svg",
      imagemAlt: "Prévia esquemática da página inicial do site de escritório de contabilidade em tela de celular",
      esquematica: true,
      tom: 200,
      resumo: "Página única para escritório de contabilidade que atende MEI, ME e EPP, com contato direto pelo WhatsApp.",
      descricao: "Site institucional para escritório de contabilidade voltado a MEI, ME e EPP. Reúne apresentação do escritório, serviços, diferenciais, depoimentos, perguntas frequentes e contato, com botão de WhatsApp e formulário de mensagem.",
      ficha: [
        ["Seções", "Início, Sobre, Serviços, Diferenciais, Depoimentos, Perguntas frequentes e Contato"],
        ["Serviços descritos", "Abertura de empresa, Imposto de Renda, folha de pagamento e consultoria fiscal"],
        ["Recursos", "Botão de WhatsApp, formulário de contato, navegação por âncoras"],
        ["Hospedagem", "Vercel"]
      ]
    },
    {
      id: "shakespeare",
      titulo: "Os Papéis de Shakespeare",
      categoria: "educativo",
      tipo: "Site de conteúdo educativo",
      url: "https://shakespeare-jade.vercel.app/",
      imagem: "shakespeare.webp",
      imagemAlt: "Captura de tela do site Os Papéis de Shakespeare em celular",
      esquematica: false,
      tom: 275,
      resumo: "Impressões em preto e branco para colorir, sobre as peças e os sonetos de Shakespeare.",
      descricao: "Os papéis de Shakespeare são impressões para a criança colorir com lápis. Divertidos, emocionantes, peculiares, educativos, inesperados e surpreendentes, tratam das peças e dos sonetos de Shakespeare.",
      ficha: [
        ["Tema", "Peças e sonetos de Shakespeare"],
        ["Público", "Crianças (impressões para colorir)"],
        ["Hospedagem", "Vercel"]
      ]
    },
    {
      id: "hogwarts",
      titulo: "Línguas de Hogwarts",
      categoria: "educativo",
      tipo: "Site de conteúdo informativo",
      url: "https://linguas-hogwarts.vercel.app/",
      imagem: "hogwarts.webp",
      imagemAlt: "Captura de tela do site Línguas de Hogwarts em celular",
      esquematica: false,
      tom: 55,
      resumo: "As personagens de Harry Potter e seus nomes em idiomas diferentes.",
      descricao: "Página que reúne as personagens de Harry Potter e seus nomes em idiomas diferentes. A série tem traduções para mais de 85 idiomas; conhecer os nomes em outras línguas ajuda a mergulhar mais fundo nesse universo.",
      ficha: [
        ["Tema", "Nomes das personagens em vários idiomas"],
        ["Seções", "Personagens e Quem somos"],
        ["Hospedagem", "Vercel"]
      ]
    },
    {
      id: "deslinguistimificando",
      titulo: "Deslinguistimificando",
      categoria: "educativo",
      tipo: "Site de conteúdo educativo",
      url: "https://deslinguistimificando.vercel.app/",
      imagem: "deslinguistimificando.webp",
      imagemAlt: "Captura de tela do site Deslinguistimificando em celular",
      esquematica: false,
      tom: 350,
      resumo: "Linguística e fonética com tabelas do IPA, em cores harmônicas para uma leitura confortável.",
      descricao: "Site de linguística com tabelas do IPA, explicações da física científica por trás dos fenômenos fonéticos, distribuição dos quadros fonéticos e cores harmônicas para uma leitura confortável. Leva o mesmo nome do meu canal no YouTube.",
      ficha: [
        ["Tema", "Fonética e Alfabeto Fonético Internacional (IPA)"],
        ["Seções", "IPA, Sobre e Formulário"],
        ["Hospedagem", "Vercel"]
      ]
    },
    {
      id: "cartografia-jangurussu",
      titulo: "Cartografia do Jangurussu",
      categoria: "educativo",
      tipo: "Site de pesquisa e proposta",
      url: "https://cartografia-jangurussu-yk6l.vercel.app/",
      imagem: "cartografia-jangurussu.webp",
      imagemAlt: "Captura de tela do site Cartografia do Jangurussu em celular",
      esquematica: false,
      tom: 145,
      resumo: "Proposta não oficial de cartografia do bairro Jangurussu, em Fortaleza, pela perspectiva dos seus conjuntos.",
      descricao: "Proposta não oficial de cartografia do bairro Jangurussu, em Fortaleza, apresentado pela perspectiva dos seus conjuntos habitacionais para facilitar a localização de endereços em um bairro de grande população.",
      ficha: [
        ["Tema", "Bairro Jangurussu e seus conjuntos habitacionais"],
        ["Fontes citadas", "IBGE, PNUD, Prefeitura de Fortaleza, WikiMapia e OpenStreetMap"],
        ["Hospedagem", "Vercel"]
      ]
    }
  ]
};
