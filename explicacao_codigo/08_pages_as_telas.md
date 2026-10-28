# 08. Pasta `app/pages` (as telas do site)

Cada subpasta é uma tela. Elas **juntam** tudo o que foi explicado antes: pegam dados de `data/` e `utils/`, usam peças de `components/` e `hooks/`, e desenham a página.

## Estrutura que se repete em quase todas as telas
1. **Imports** no topo (ícones, componentes, funções).
2. `useUsuario()`: descobre o usuário e a função `pode(...)`.
3. Vários `useState`: busca, filtros, modal aberto, aviso verde, item selecionado.
4. **Cálculos** (com `for`): contagens para os cards, listas filtradas.
5. `return (...)`: o desenho da página, que sempre tem:
   - `<Sidebar ativo="/rota" />` (menu lateral);
   - cabeçalho com título, `<Notificacoes />`, avatar e nome do usuário;
   - cards, tabela, filtros, botões;
   - modais no final (`{alunoAberto && <DetalhesAluno ... />}`).
6. **Aviso verde** depois de cadastrar/registrar: o texto sempre deixa claro que é **simulação neste navegador** ("O cadastro definitivo depende da integração com a API") e some sozinho em 6 segundos (`setTimeout`).

Observação: o botão **Filtrar** (em Alunos, Presenças, Salas e Team) apenas mostra/esconde a barra de filtros (`filtrosAbertos`). Em Team os filtros ainda são só visuais.

---
## `welcome/welcome.tsx` (Início)
- **Cabeçalho:** "Bem-vindo de volta, {primeiro nome}!", a **busca geral** (`BuscaGlobal`), o sino e o avatar.
- **3 cards (Presentes / Pendentes / Faltou):** vêm de `resumoDoDia(alunosDeHoje())`. Clicar abre um **modal com a lista** daquela categoria (estado `categoria`; Esc fecha).
- **Card Leitor RFID:** o componente `LeitorRfid`. Quando uma leitura dá certo, `aoLer` aumenta `leituras` para a tela recalcular tudo.
- **Gráfico de linhas** (Recharts): ainda usa números **fixos** de exemplo (`dadosFrequencia`). Está na lista de pendências ligar isso à API.
- **Pré-relatório:** rosca feita só com CSS (`conic-gradient`) usando as porcentagens reais do dia, e legenda clicável.
- **Alunos que precisam de atenção:** 4 alunos **fixos**; o botão "•••" abre `DetalhesAluno` (usa `acharAlunoPorNome`).
- `escolherResultado`: decide o que fazer com um resultado da busca (aluno → modal; funcionário → modal; sala → navega para `/salas`).

## `alunos/alunos.tsx`
- `lista` (state) começa com `todosOsAlunos()`.
- Busca, turma, situação e ordem alimentam `filtrarAlunos(...)`; o resultado entra no `usePaginacao` (8 por página).
- **Cards calculados:** "Total de alunos", "Ativos" (hoje igual ao total, pois ainda não existe aluno inativo), "Em atenção" (situação = Em atenção) e "Novas matrículas" do mês (conta quem tem `detalhes.dataMatricula` no mês atual).
- Botão **Novo aluno** (só com `alunos.cadastrar`) abre `NovoAluno`. `aoCadastrar` recarrega a lista, limpa filtros, volta à página 1 e mostra o aviso.
- Cada linha tem "•••" que abre `DetalhesAluno` (editar só com `alunos.editar`; excluir só com `alunos.excluir`).

## `presencas/presenca.tsx`
- Tabela com o histórico (40 dias) de `presencasAtuais()` filtrado por busca, **período**, turma e status.
- Botão **Registrar presença** abre `RegistrarPresenca` (`podeCorrigir` vem de `presenca.corrigir`).
- Lado direito: **Frequência do dia** (rosca por `conic-gradient` com Presentes/Ausentes/Atrasados/Justificados) e **Por turma** (barras com a taxa de cada turma via `presencaPorTurma`).
- Clicar no nome do aluno abre os detalhes.

## `relatorios/relatorios.tsx`
- Filtros: **Período** (7 dias, 30 dias, este mês, este ano), **Turma**, **Tipo** (Frequência / Alunos / todos) e Disciplina (desabilitado: ainda não existe dado por disciplina).
- Cards: total de alunos, presença média (taxa), em atenção e em risco, todos calculados.
- **Gráfico de linhas** com `evolucaoPorDia` (dados reais da simulação), **rosca** da frequência e **tabela** de alunos com paginação.
- Botão **Gerar relatório** abre `GerarRelatorio` (CSV). Ao baixar, `aoGerar` mostra o aviso.

## `salas/salas.tsx`
- `todasSalas = SALAS_BASE + salas novas`. Cards (em uso, disponíveis, em manutenção, total) são **calculados**.
- Filtros: busca, andar, status, turma (`filtrarSalas`).
- Botão **Nova sala** (só `salas.gerenciar`, ou seja, administrador) abre `NovaSala` e passa `salasExistentes` para validar duplicados.
- Limitação conhecida: sem paginação nem rolagem (a lista é curta).

## `Team/team.tsx` (Funcionários)
- Lista = `FUNCIONARIOS_BASE` + novos. Tabela com cargo, setor, **vínculo** (Efetivo/Contratado), status e "•••" para `DetalhesFuncionario`.
- Botão **Novo funcionário** (`usuarios.gerenciar`) abre `NovoFuncionario`; `proximoId` é o maior id + 1.
- "Distribuição por cargo", "Contatos rápidos" e os cards de topo seguem **fixos** (exemplo visual).

## `perfil/perfil.tsx`
- Mostra foto, nome, perfil (Administrador/Secretário) e e-mail.
- **Informações pessoais** (nome, e-mail, telefone, cargo): valida com `utils/validacoes.ts`; só o administrador edita o **cargo**. `atualizarUsuario` grava na sessão.
- **Foto:** `escolherFoto` aceita só imagem de até 2 MB e mostra uma pré-visualização com `URL.createObjectURL` (o envio real depende da API).
- **Atividade da conta:** último acesso e membro desde, com as funções de `formatacao.ts`.
- **Alterar senha:** modal com 3 campos, botões de olho para mostrar/ocultar, validação por `validarNovaSenha`. A troca real depende da API.

## `settings/configuracao.tsx` (Configurações)
- Abas: **Geral, Notificações, Regras da escola, Permissões, Segurança, RFID**. Cada aba tem a permissão que dá direito de editar; sem ela, os campos ficam travados.
- Salva em `localStorage` na chave `educontrol-configuracoes` (liga/desliga notificações, horário limite, ano letivo, turno). A chave `notificacoes` é lida pelo sino.
- Aba **RFID:** aponta para o card do leitor na tela inicial (lê `leitorAtivo()`).
- Aba **Segurança:** modal de senha com validação própria simples (limitação: não reutiliza `validarNovaSenha`).

## `assistenteIA/IA.tsx` (chat)
- `mensagens` (lista de `{tipo, texto}`) começa com a saudação da IA.
- `enviarMensagem()`: adiciona a pergunta do usuário, uma resposta provisória "...", e chama `enviarParaIA` passando uma função que **substitui a última mensagem** a cada pedaço recebido (efeito de digitação). Se der erro, mostra "Não consegui responder agora...". `finally` sempre libera o botão (`carregando = false`).
- `autoScroll` + `useRef` (`fimDoChat`): rola para a última mensagem, a menos que o usuário tenha rolado para cima (`onScroll`).
- Botão **Limpar conversa** abre uma confirmação (`mostrarConfirmacao`).
- Enter envia a mensagem.

## `logout/Log.tsx` (Login)
- Dois lados: o painel com marca/boas-vindas e o formulário.
- `handlelogin`: impede o envio padrão (`preventDefault`), chama `fazerLogin(email, senha)`. Se achar o usuário, `navigate("/home")`; senão `setMensagemErro("E-mail ou senha incorretos.")` e a mensagem aparece em vermelho acima dos campos.
- `showPassword` alterna o olho da senha.
- Os botões "esqueci a senha" e "Entrar com o Google" são **só visuais** (Etapa 13).
- As imagens `frente.jpeg`, `frente-sanico.jpeg` e `frente-sanico.jpg` na mesma pasta não são mais usadas pelo código.
