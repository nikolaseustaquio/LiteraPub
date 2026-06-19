LITERAHUB V2 - AJUSTES IMPLEMENTADOS

✅ 1 - RESPONSIVO (MOBILE + ZOOM SEGURO)
- Media queries para 768px, 480px
- Viewport com maximum-scale: 5.0
- CSS Grid fluido com auto-fit
- Barra de acessibilidade fixa no canto

✅ 2 - ZOOM SEGURO
- Layout não quebra com zoom
- Tipografia escalável (rem)
- Estrutura flexível

✅ 3 - ACESSIBILIDADE
- Botão aumentar/diminuir fonte (10% por clique)
- Botão de leitura em voz alta (texto-para-fala)
- Barra fixa no topo direito
- Dados salvos em localStorage

✅ 4 - TOTALMENTE ADAPTÁVEL (READY FOR DEPLOY)
- Caminhos relativos em todos os arquivos
- Meta viewport correto
- Sem dependências de backend (localStorage)
- QR Code ready

✅ 5 - TIPO DE USUÁRIO NO CADASTRO
- Radio button: "Você é: Leitor / Escritor"
- Salvo em localStorage['tipoUsuario']
- Disponível para lógica futura

✅ 6 - LOGO/NOME VOLTA AO INICIAL
- Clique na logo redireciona para #inicio
- Função voltarInicio()
- Cursor: pointer

✅ 7 - LOGIN SEM REDIRECIONAMENTO
- Após login: página recarrega na mesma aba
- Botões de login/cadastro somem
- Aparece "Bem-vindo, [email]" com botão sair
- Permanece no index.html

✅ 8 - SEÇÃO GÊNEROS (DINÂMICA)
- 4 gêneros: Romance, Ficção, Terror, Fantasia
- Clique no gênero salva em localStorage['generoSelecionado']
- Redireciona para catalogo.html
- Cards com hover effects

✅ 9 - SEÇÃO SOBRE
- Descrição de como foi criado
- Objetivo da plataforma
- Menção que são estudantes de TI
- Sem necessidade de scroll (tudo em uma página)

ESTRUTURA:
/LiteraHUB_v2/
├── index.html
├── CSS/
│   ├── style.css (responsive)
│   ├── login.css
│   ├── cadastro.css
│   └── acessibilidade.css
└── JS/
    ├── acessibilidade.js
    ├── login.js
    ├── cadastro.js
    └── index.js

COMO USAR:
1. Coloque os arquivos em um servidor (local ou público)
2. Acesse index.html
3. Teste em mobile e desktop
4. Para deploy: copie os arquivos para a host pública
5. Crie QR Code apontando para o index.html

TECNOLOGIAS:
- HTML5 com meta viewport
- CSS3 com Grid/Flexbox
- JavaScript vanilla
- LocalStorage para dados
- Web Speech API para leitura
