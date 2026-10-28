# Fontes e referências do EduControl

Lista organizada das fontes ligadas ao que existe no site, para montar a bibliografia do TCC.

## Leia antes de usar

1. **Datas de acesso.** Cada item tem a data em que a página foi realmente aberta nas sessões de trabalho (de 23 a 27/10/2026). Não foram inventadas datas: na bibliografia (ABNT) a "data de acesso" tem que ser o dia em que a pessoa abriu e leu a fonte. Quando você abrir um link por conta própria, escreva a sua data na coluna "Minha data" da seção 5.
2. **Vídeos.** Eu não consigo assistir vídeos. Para os vídeos, só abri a página e li título, canal, data e descrição. Por isso eles estão marcados `[vídeo: página aberta, não assistido]`. Assista antes de citar.
3. **O que são estas fontes.** O código do site foi escrito com ajuda de IA (Claude) e as fontes são referências dos conceitos usados (padrões de React, acessibilidade, segurança, algoritmos). Nenhum trecho foi copiado de repositórios. Confira com o seu orientador como a instituição quer que o uso de IA seja declarado.
4. **GitHub.** Repositórios sem licença informada servem só como referência de ideia, nunca para copiar código.

Legenda: `[verificado]` = página aberta e conteúdo conferido · `[não aberto]` = apareceu na busca ou é a página inicial oficial, mas não foi lida · `[vídeo: página aberta, não assistido]`.

Datas: **Acesso 27/10/2026** = aberto nesta rodada. **Acesso 23–27/10/2026** = aberto nas sessões anteriores (sem registro do dia exato).

---

## 1. Base do projeto (confirmado nos arquivos do próprio projeto)

| Item | Onde aparece | Fonte | Situação |
|---|---|---|---|
| Template inicial (React Router, Dockerfile, README) | `README.md` | https://github.com/remix-run/react-router-templates (pasta `default`) | citado no README |
| React Router v7, modo framework, SSR, `routes.ts` | `app/routes.ts`, `react-router.config.ts` | https://reactrouter.com/ | `[não aberto]` |
| Tailwind CSS v4 com plugin do Vite | `vite.config.ts`, `app/app.css` | https://tailwindcss.com/ | `[não aberto]` |
| React 19 | `package.json` | https://react.dev/ | `[não aberto]` (as páginas de react.dev usadas estão na seção 3) |
| Ícones | todas as telas | https://lucide.dev/guide/react | `[verificado]` · Acesso 23–27/10/2026 |
| Gráficos | Welcome e Relatórios | https://recharts.org/ | `[não aberto]` |
| Assistente de IA (Gemini) | `app/services/iaService.ts` | SDK https://www.npmjs.com/package/@google/genai · Guia https://ai.google.dev/gemini-api/docs/generate-content/get-started | guia `[verificado]` · Acesso 23–27/10/2026 |
| Fonte Inter | `app/root.tsx` | https://fonts.google.com/specimen/Inter | `[não aberto]` |

---

## 2. Projetos do GitHub (referência de ideia)

Todos `[verificado]` · Acesso 23–27/10/2026.

| Projeto | O que tem | Licença | Relação com o EduControl |
|---|---|---|---|
| TailAdmin — https://github.com/TailAdmin/free-react-tailwind-admin-dashboard | Painel em React 19, TypeScript, Tailwind v4; sidebar recolhível, modo escuro, tabelas, gráficos | MIT | Mais parecido em stack e layout |
| student_teacher_dashboard — https://github.com/ashvinck/student_teacher_dashboard | Painel escolar com acesso por perfil, presença e gráficos | MIT | Contas e permissões (Etapa 2) |
| RFID-Based-Attendance-System — https://github.com/OmkarKamble1/RFID-Based-Attendance-System | Presença por RFID: Arduino/NodeMCU + MFRC522, Node.js, React | não informada | Só ideia do fluxo do cartão |
| AMS — https://github.com/Ayan123C/AMS | Presença com perfis, relatórios e atestados; Spring + PostgreSQL + Redis | Apache-2.0 | Integração da Etapa 13 |
| RollCall — https://github.com/arnavpaniya/RollCall | Presença por QR code em Next.js; filtros por turma, data e status | não informada | Filtros (Etapa 5) |
| react-autocomplete (davidebalice) — https://github.com/davidebalice/react-autocomplete | Barra de busca com sugestões; setas e Enter no teclado | não informada | Busca geral da Welcome (só ideia) · Acesso 27/10/2026 |
| gerador-validador-cpf (tiagoporto) — https://github.com/tiagoporto/gerador-validador-cpf | Biblioteca JS para gerar e validar CPF/CNPJ (pacote no npm) | MIT | Referência de validação de CPF; o projeto NÃO usa a biblioteca, tem função própria · Acesso 27/10/2026 |

Outros resultados de busca, `[não aberto]`: https://github.com/Karthickmerk/React-tailwind-admin-dashboard · https://github.com/techember/Admin_Panel · https://github.com/JavaScript-Devlopers/Student-Management-System · https://github.com/codewithshahriar/studenttrack · https://github.com/hacknrollers/bunkify · https://github.com/PaulieScanlon/css-conic-gradient-charts · https://github.com/hugoj-goncalves/cpf-cnpj-validator · https://gist.github.com/joseabrantesjr/ff506de807acd15b7a9384f4db410e74

---

## 3. Fontes por funcionalidade

### 3.1 Estado, efeitos, listas e formulários (React)

Base de praticamente todas as telas e modais.

**Documentação oficial (react.dev)**
- **useEffect** — https://react.dev/reference/react/useEffect `[verificado]` · Acesso 27/10/2026
  Sincroniza o componente com algo de fora do React; a lista de dependências define quando roda de novo e o *cleanup* desfaz o que o setup fez. Usado nos modais (fechar com Esc) e no sino.
- **Synchronizing with Effects** — https://react.dev/learn/synchronizing-with-effects `[verificado]` · Acesso 27/10/2026
  Explica por que o listener é removido no cleanup (senão se acumulam).
- **Describing the UI** — https://react.dev/learn/describing-the-ui `[verificado]` · Acesso 27/10/2026
  Listas com `map()` e a prop `key`; `&&` para mostrar algo só quando a condição é verdadeira (usado em `{aberto && ...}`).
- **Responding to Events** — https://18.react.dev/learn/responding-to-events `[verificado]` · Acesso 23–27/10/2026
  O clique "sobe" para os pais e `stopPropagation()` impede isso (clicar fora fecha o modal, dentro não).
- **Updating Arrays in State** — https://18.react.dev/learn/updating-arrays-in-state `[verificado]` · Acesso 23–27/10/2026
  Trabalhar com arrays sem alterar o original (`slice`, `filter`, `map`). Base de `dividirEmBlocos`.

**Artigos**
- **Handling Form Inputs in React** (Ibas, DEV) — https://dev.to/ibaslogic/handling-form-inputs-in-react-a-simple-step-by-step-guide-4l9o `[verificado]` · Acesso 23–27/10/2026
- **React Forms** (W3Schools) — https://www.w3schools.com/react/react_forms.asp `[verificado]` · Acesso 27/10/2026
  Input controlado: valor no `useState`, `value` no campo e `onChange` com `e.target.value`.
- **useRef e getBoundingClientRect** (DEV, "Programmatically positioning elements with React Hooks") — https://dev.to/joepurnell1/programmatically-positioning-elements-with-react-hooks-aef `[não aberto]`

**Vídeos** `[vídeo: página aberta, não assistido]` · Acesso 27/10/2026
- ReactJS — Manipulando valores de um formulário com useState e onChange (Vinicius Dacal, 2020) — https://www.youtube.com/watch?v=o59EnbaSQ14
- Aprenda a validar um formulário em ReactJS (Instrutor Feijó, 2022; a descrição cita repositório no GitHub) — https://www.youtube.com/watch?v=kpmFJDBb1FY

### 3.2 Modais, portais e acessibilidade (Registrar presença, Novo aluno/sala/funcionário, Detalhes, sino, busca)

- **createPortal** (react.dev) — https://react.dev/reference/react-dom/createPortal `[verificado]` · Acesso 27/10/2026
  Renderiza os filhos em outro ponto do DOM, como `document.body`, para o conteúdo não ser cortado por contêineres com `overflow` e aparecer por cima. Foi a correção do sino que "passava por baixo dos cards".
- **Alert Dialog Pattern** (W3C WAI-ARIA APG) — https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/ `[não aberto]`
  Padrão de acessibilidade do modal: `role="dialog"`, `aria-modal`, fechar com Esc.
- **Disclosure (Show/Hide) FAQ** (W3C WAI-ARIA APG) — https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-faq/ `[verificado]` · Acesso 23–27/10/2026
  `aria-expanded` (true/false) no botão que mostra/esconde algo: sino e botão Filtrar.
- **Vídeos** `[vídeo: página aberta, não assistido]` · Acesso 27/10/2026
  - #11 ReactJS para Iniciantes — Como implementar um Modal com createPortal (Vinicius Dacal, 2020) — https://www.youtube.com/watch?v=rWLlPn-OuzY
  - Tutorial Atualizado: Criando um componente de Modal no ReactJS (Emerson Brôga Dev, 2022; descrição cita fechar com clique fora ou ESC) — https://www.youtube.com/watch?v=aY0HLDJKTSc

### 3.3 Salvar no navegador (localStorage) e sidebar que lembra o estado

- **Web Storage API** (MDN, pt-BR) — https://developer.mozilla.org/pt-BR/docs/Web/API/Web_Storage_API `[verificado]` · Acesso 23–27/10/2026
  `localStorage` mantém os dados ao fechar o navegador; `sessionStorage` só durante a sessão (usado no login fictício).
- **Window: localStorage** (MDN) — https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage `[verificado]` · Acesso 27/10/2026
  Dados em texto, isolados por origem, e o acesso pode falhar (bloqueio do usuário). Por isso a leitura/escrita usa `try/catch`.
- **How to Persist State in Local Storage with React** (OpenReplay) — https://blog.openreplay.com/persist-state-local-storage-react/ `[verificado]` · Acesso 23–27/10/2026
  Ler o valor salvo no inicializador do `useState` e salvar ao mudar.
- **Vídeo** `[vídeo: página aberta, não assistido]` · Acesso 27/10/2026: Como salvar e recuperar dados com o localStorage em Reactjs (TipsCode, 2023) — https://www.youtube.com/watch?v=P2je_XIbuSM
- Outros vídeos de localStorage achados na busca, `[não aberto]`: https://www.youtube.com/watch?v=oaDdTH2JQrA · https://www.youtube.com/watch?v=hNTozXl-qJA

### 3.4 Login fictício, permissões e rotas protegidas

- **Authorization Cheat Sheet** (OWASP) — https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html `[verificado]` · Acesso 23–27/10/2026
  A checagem de acesso é do servidor; negar por padrão; privilégio mínimo. Por isso as permissões do front só escondem botões e rotas e o backend precisa conferir de novo.
- **Authentication with React Router v7: A complete guide** (LogRocket) — https://blog.logrocket.com/authentication-react-router-v7/ `[verificado]` · Acesso 23–27/10/2026
  `ProtectedRoute` que redireciona quem não está logado (o projeto usa `<Navigate>`).
- **Building Reliable Protected Routes with React Router v7** (DEV) — https://dev.to/ra1nbow1/building-reliable-protected-routes-with-react-router-v7-1ka0 `[não aberto]`
- **Vídeos de React Router v7 (modo framework)** `[vídeo: página aberta, não assistido]` · Acesso 27/10/2026: playlist "Tutorial React Router v.7 - Modo Framework" (Bluuweb, 7 vídeos) — https://www.youtube.com/playlist?list=PLPl81lqbj-4IYHaEn8mubCTxmpQ-wRhKo · outros achados, `[não aberto]`: https://www.youtube.com/watch?v=xIXBA9JzYMM · https://www.youtube.com/watch?v=h7MTWLv3xvw

### 3.5 Paginação, filtros e busca (Alunos, Presenças, Salas, busca da Welcome)

- **String.prototype.normalize()** (MDN, pt-BR) — https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/normalize `[verificado]` · Acesso 23–27/10/2026
  Base da busca sem acento (`normalize("NFD")` separa a letra do acento, que é removido por regex; a regex é técnica comum confirmada pelos testes do projeto).
- **Array.prototype.sort()** (MDN, pt-BR) — https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort `[verificado]` · Acesso 23–27/10/2026
  Função de comparação e o fato de o `sort` alterar o próprio array (a ordenação é feita na lista já filtrada).
- **Remove accents** (30 seconds of code) — https://www.30secondsofcode.org/js/s/remove-accents `[não aberto]`
- **Combobox Pattern** (W3C WAI-ARIA APG) — https://www.w3.org/WAI/ARIA/apg/patterns/combobox/ `[verificado]` · Acesso 23–27/10/2026
  Setas movem a opção, Enter aceita, Esc fecha. É o teclado da busca (`role="listbox"`, `role="option"`, `aria-selected`).
- **Build an Autocomplete Search Bar with React** (DEV, rahulxsingh) — https://dev.to/rahulxsingh/build-an-autocomplete-search-bar-with-react-1kn5 `[verificado]` · Acesso 27/10/2026
  Mínimo de caracteres, setas com volta ao início, Enter seleciona, Esc e clique fora fecham. (O tutorial usa debounce e cache; a busca do EduControl é local e não precisou.)
- **Editable Combobox With List Autocomplete Example** (W3C) — https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list/ `[não aberto]`
- Repositório de ideia: davidebalice/react-autocomplete (seção 2).

### 3.6 Gráficos (Welcome e Relatórios)

- **Recharts: guia completo** (DEV, stacknotice) — https://dev.to/stacknotice/recharts-react-data-visualization-complete-guide-2026-24ln `[verificado]` · Acesso 23–27/10/2026
  `LineChart`, `ResponsiveContainer`, `Tooltip`, `Legend`.
- **Como criar gráficos interativos no React usando Recharts** (conceitos.tech, em português) — https://conceitos.tech/tutoriais/react/bibliotecas-ferramentas/como-criar-graficos-interativos-no-react-usando-recharts/ `[verificado]` · Acesso 27/10/2026
  Array de objetos na prop `data` do `LineChart` e `dataKey` em cada `Line`.
- **How To Create Dynamic Donut Charts With TailwindCSS And React** (Paul Scanlon, Smashing Magazine) — https://smashingmagazine.com/2023/03/dynamic-donut-charts-tailwind-css-react/ `[verificado]` · Acesso 23–27/10/2026
  Rosca com `conic-gradient()` calculada a partir das porcentagens (rosca da Welcome e de Relatórios).
- **Bar Chart** (Chakra UI) — https://chakra-ui.com/docs/charts/bar-chart `[verificado]` · Acesso 23–27/10/2026 (do gráfico de barras, removido a pedido).
- **CSS conic-gradient()** (W3Schools) — https://www.w3schools.com/cssref/func_conic-gradient.php `[não aberto]`
- **Vídeos de Recharts** achados na busca, `[não aberto]`: https://www.youtube.com/watch?v=xl5XZsOTvzY · https://www.youtube.com/watch?v=DOwKPMHJEa0 · https://www.youtube.com/watch?v=z1KuuHLOY9c · https://www.youtube.com/watch?v=Fu_YFp-9xoQ

### 3.7 CPF, validações e dados pessoais (LGPD)

- **Como validar um CPF: algoritmo do dígito verificador** (Hub do Desenvolvedor) — https://blog.hubdodesenvolvedor.com.br/como-validar-um-cpf/ `[verificado]` · Acesso 23–27/10/2026 e 27/10/2026
  Dois dígitos por soma com pesos (10 a 2 e 11 a 2) e módulo 11; CPFs com todos os dígitos iguais passam na conta mas são inválidos. É o `validarCpf`.
- **PII: mascaramento de CPF e CNPJ** (DEV, Beans Tech BR) — https://dev.to/beanstechbr/pii-mascaramento-de-cpf-e-cnpj-4k2g `[verificado]` · Acesso 23–27/10/2026
  CPF é dado pessoal; mascarar em telas aplica a minimização da LGPD. O CPF aparece mascarado e só revela no botão do olho.
- **Vídeo** `[vídeo: página aberta, não assistido]` · Acesso 27/10/2026: Como validar CPF usando JavaScript (To Codando, 2020) — https://www.youtube.com/watch?v=2RKg5XIQCHQ
- Achados, `[não aberto]`: https://dev.to/gerador-br/como-validar-cpf-em-javascript-guia-simples-para-desenvolvedores-11b3 · https://www.devmedia.com.br/validar-cpf-com-javascript/23916 · https://ogeradordecpf.com.br/lgpd-cpf-desenvolvedor/
- **Registrar presença: `<input type="time">`** (MDN) — https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/time `[verificado]` · Acesso 23–27/10/2026
  O valor é sempre texto `HH:mm` (24 h); o horário é guardado como "07:10".

### 3.8 Foto de perfil e Gerar relatório (arquivos no navegador)

- **Blob** (javascript.info) — https://javascript.info/blob `[verificado]` · Acesso 27/10/2026
  Criar `Blob`, gerar URL com `URL.createObjectURL`, ligar ao `href` de um link com `download`, clicar e depois `URL.revokeObjectURL`. É o download do CSV.
- **Object URLs Need a Lifecycle** (John Kavanagh) — https://johnkavanagh.co.uk/articles/object-url-lifecycle-creating-and-revoking/ `[verificado]` · Acesso 23–27/10/2026
  Por que liberar a URL temporária (foto de pré-visualização).
- **Testing for CSV Injection** (OWASP WSTG) — https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Input_Validation_Testing/21-Testing_for_CSV_Injection `[não aberto]` (redirecionou para a página inicial). Motivo da proteção: células que começam com `=`, `+`, `-` ou `@` ganham um apóstrofo.
- Achados, `[não aberto]`: https://blog.logrocket.com/programmatically-downloading-files-browser/ · https://www.bennadel.com/blog/3472-downloading-text-using-blobs-url-createobjecturl-and-the-anchor-download-attribute-in-javascript.htm

### 3.9 Leitor RFID (status, simulação e cartão no cadastro)

- **Controle de Acesso usando Módulo RFID com Arduino** (MakerHero) — https://www.makerhero.com/blog/controle-acesso-leitor-rfid-arduino/ `[verificado]` · Acesso 23–27/10/2026
  O leitor lê o UID (identificação única do cartão) e o sistema compara com os UIDs cadastrados para liberar ou negar. É a lógica da simulação. O UID real costuma ser hexadecimal; o formato de 4 a 10 dígitos é uma suposição que muda com o backend.
- **ESP32 com RFID, Display e Mini Fonte** (Fernando K Tecnologia) — https://www.fernandok.com/2020/09/esp32-com-rfid-display-e-mini-fonte.html `[verificado]` · Acesso 27/10/2026
  ESP32 + MFRC522: detecta o cartão, autentica o bloco com a chave padrão e lê ou grava. Mostra a parte de hardware que o backend/leitor real vai cobrir.
- **Vídeos** `[vídeo: página aberta, não assistido]` · Acesso 27/10/2026
  - COMO USAR RFID MFRC522 COM ESP32 — PASSO A PASSO (Clube do Maker, 2023) — https://www.youtube.com/watch?v=oIUBarWEJeM
  - Tutorial como usar RFID RC522 no Arduino (Eletrônica Arduino e Android, 2015) — https://www.youtube.com/watch?v=ZmaJRGBUGmY
- **RFID nas escolas** (JT Speedwork) — https://pt.jtspeedwork.com/blog/rfid-in-schools-improving-attendance-and-equipment-management `[não aberto]`
- Repositório de ideia: RFID-Based-Attendance-System (seção 2).

### 3.10 Vínculo dos funcionários (Efetivo / Contratado)

- **Superdesignação de professores na rede estadual de ensino de Minas Gerais** (Educação e Pesquisa / SciELO) — https://educa.fcc.org.br/scielo.php?script=sci_arttext&pid=S1413-24782018000100136 `[verificado]` · Acesso 23–27/10/2026
  Efetivos entram por concurso; designados são contratados temporariamente, com vínculo mais frágil. Por isso o modal mostra "Efetivo" ou "Contratado" e, no contratado, o fim do contrato.
- Mesmo artigo no SciELO Brasil — https://www.scielo.br/j/rbedu/a/XQBvhP3NkwP6Q7YyZtfT3rB/?lang=pt `[não aberto]` (a página não carregou).

### 3.11 Integração futura (Etapa 13: Java/Spring Boot + PostgreSQL)

- **Building a Full-Stack Student Management System with React, Spring Boot, and PostgreSQL** (DEV, tamilselvan1812) — https://dev.to/tamilselvan1812/building-a-full-stack-student-management-system-with-react-spring-boot-and-postgresql-4igb `[verificado]` · Acesso 23–27/10/2026
  CRUD de alunos com Axios, Spring Boot e JPA. Sem repositório indicado.
- Repositórios de referência: AMS e student_teacher_dashboard (seção 2).

### 3.12 Documentação do código (pasta `explicacao_codigo`, fora do projeto)

- **Your First Component** (react.dev) — https://react.dev/learn/your-first-component `[verificado]` · Acesso 27/10/2026
  - Usado para: explicar o que é um componente (função que devolve JSX, nome com letra maiúscula, `export default`).
- **routes.ts** (React Router, modo framework) — https://reactrouter.com/api/framework-conventions/routes.ts.md `[verificado]` · Acesso 27/10/2026
  - Usado para: explicar `app/routes.ts` e as funções `index` e `route`.

---

## 4. Correspondência rápida: onde cada fonte foi usada no código

| Funcionalidade | Arquivos | Fontes (seção 3) |
|---|---|---|
| Modais com Esc e clique fora | `RegistrarPresenca`, `Novo*`, `Detalhes*`, `GerarRelatorio` | 3.1, 3.2 |
| Sino e painel por cima da página | `Notificacoes` | 3.1, 3.2 (createPortal, disclosure) |
| Busca geral | `BuscaGlobal`, `buscaGlobal.ts` | 3.5 |
| Filtros e paginação | `filtros.ts`, `usePaginacao` | 3.5, 3.1 |
| Salvar no navegador | `armazenamento.ts`, `registroHoje.ts`, `*Cadastrados.ts` | 3.3 |
| Permissões | `permissoes.ts`, `RotaProtegida` | 3.4 |
| Gráficos | Welcome, Relatórios | 3.6 |
| CPF e máscara | `validacoes.ts`, `detalhesAluno.ts` | 3.7 |
| CSV | `exportarCsv.ts` | 3.8 |
| RFID | `rfid.ts`, `LeitorRfid` | 3.9 |
| Efetivo/Contratado | `DetalhesFuncionario`, `NovoFuncionario` | 3.10 |

---

## 5. Como preencher a bibliografia do TCC

1. Escolha só o que você realmente abriu e leu (documentação oficial conta, mesmo sem copiar código). Apague o resto.
2. Anote **a sua data de acesso**, a do dia em que abriu. Use a coluna "Minha data" abaixo. Modelo ABNT: `Disponível em: <URL>. Acesso em: 5 nov. 2026.`
3. Para vídeo, assista antes e cite canal, título e data de publicação (já anotados acima quando a página trouxe).
4. Se copiou ou adaptou trecho de terceiros, confira a licença: MIT e Apache-2.0 permitem com atribuição; sem licença informada, não copie.

| Fonte | Abri e li? (sim/não) | Minha data |
|---|---|---|
| react.dev: useEffect, createPortal, Describing the UI | sim | 27/10/2026 |
| MDN: localStorage, input time | sim | 27/10/2026 |
| MDN: normalize, sort | sim | out. 2026 (dia exato não lembrado) |
| W3C APG: combobox, disclosure | sim | 27/10/2026 |
| W3C APG: alertdialog | sim | out. 2026 (dia exato não lembrado) |
| OWASP: Authorization Cheat Sheet | sim | out. 2026 (dia exato não lembrado) |
| CPF (Hub do Desenvolvedor) e LGPD (Beans Tech) | sim | 27/10/2026 |
| RFID (MakerHero, Fernando K) | sim | 27/10/2026 |
| Recharts: conceitos.tech | sim | 27/10/2026 |
| Recharts (DEV) / conic-gradient | sim | out. 2026 (dia exato não lembrado) |
| Vídeos escolhidos | página aberta; assistir antes de citar | 27/10/2026 |


Nota: as datas acima são as que o aluno informou ter acessado. O registro da sessão confirma abertura pelo Claude em 27/10/2026 para as fontes com data completa. Para as demais o dia exato não está registrado; na ABNT é válido citar só o mês ("Acesso em: out. 2026").
