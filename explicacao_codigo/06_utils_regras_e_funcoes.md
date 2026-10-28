# 06. Pasta `app/utils` (as regras do sistema)

**Por que existe:** as telas (em `pages/` e `components/`) só devem *mostrar* coisas. As **contas, regras e validações** ficam aqui, em funções simples, para: (1) não repetir o mesmo código em várias telas; (2) conseguir testar sozinho; (3) na Etapa 13, saber exatamente quais regras precisam virar API no backend.

Uma palavra importante: **simulação**. Vários arquivos daqui guardam dados no `localStorage` (a "gaveta" do navegador) para fingir um banco de dados. Cada um usa uma chave começando com `educontrol:`. No backend isso vira banco PostgreSQL.

---
## Mapa rápido

| Arquivo | Resumo em uma linha |
|---|---|
| `armazenamento.ts` | Ler e salvar listas no localStorage com segurança. |
| `paginacao.ts` | Corta uma lista em blocos. |
| `formatacao.ts` | Datas e nomes bonitos. |
| `filtros.ts` | Busca sem acento e filtros de Alunos, Presenças e Salas. |
| `validacoes.ts` | Valida nome, e-mail, telefone, CPF, senha, data. |
| `alunosCadastrados.ts` | Alunos base + novos; cadastrar aluno. |
| `salasCadastradas.ts` | Salas novas. |
| `funcionariosCadastrados.ts` | Funcionários novos. |
| `detalhesAluno.ts` / `detalhesFuncionario.ts` | Dados completos para os modais e edição de contato. |
| `registroHoje.ts` | A "chamada de hoje" (fonte única da presença do dia). |
| `rfid.ts` | Leitor de cartão: regras de Presente/Atrasado. |
| `resumoDia.ts` | Contagens do dia para cards e gráficos. |
| `relatorios.ts` | Filtro por período, contagens e evolução por dia. |
| `notificacoes.ts` | Avisos do sino. |
| `buscaGlobal.ts` | A busca do topo da tela inicial. |
| `exportarCsv.ts` | Gerar e baixar o CSV. |

---
## `armazenamento.ts`
- `lerLista(chave)`: pega o texto salvo na gaveta, transforma em lista com `JSON.parse`, e só devolve se realmente for uma lista. Qualquer problema (gaveta vazia, texto estragado, navegador bloqueando) devolve `[]`. O `try/catch` evita que o site quebre se o `localStorage` estiver corrompido.
- `salvarLista(chave, lista)`: grava a lista como texto (`JSON.stringify`). Devolve `true` se deu certo e `false` se falhou (ex.: gaveta cheia). Quem chama usa o `false` para avisar o usuário.

## `paginacao.ts`
- `dividirEmBlocos(lista, tamanho)`: usa um `for` que anda de `tamanho` em `tamanho` e usa `slice` para cortar. Ex.: 20 itens com tamanho 8 viram blocos de 8, 8 e 4. É a base do hook `usePaginacao`.

## `formatacao.ts`
- `lerData(valor)` (interna): transforma texto em data. Se o texto tem 10 caracteres ("2026-10-27"), soma `T12:00:00` para evitar o erro de fuso horário (sem isso a data podia aparecer um dia antes). Se inválida, devolve `null`.
- `formatarDataLonga`: "27 de outubro de 2026". `formatarDataCurta`: "27/10/2026". Se a data é inválida mostra "—".
- `formatarUltimoAcesso`: mostra "Hoje, 14:30", "Ontem, 09:10" ou data completa.
- `primeiroNome`: pega só o primeiro nome (para "Olá, Lohran").

## `filtros.ts`
- `semAcento(texto)`: `normalize("NFD")` separa a letra do acento e o `replace` remove os acentos; depois `toLowerCase`. Assim "JOÃO", "joao" e "João" são tratados iguais na busca.
- `contemBusca` (interna): vazio = passa tudo; senão verifica se o texto (sem acento) contém a busca.
- `numeroMedia`: transforma "8,7" em 8.7 (troca vírgula por ponto). Se for "—", devolve 0 (evita o erro `NaN` na ordenação).
- `filtrarAlunos(lista, busca, turma, status, ordem)`: percorre a lista com `for`; uma variável `passa` começa `true` e vira `false` se algum filtro reprovar. No fim ordena por nome ou média.
- `textoDaData(data)`: devolve "AAAA-MM-DD" (formato que dá para comparar com `<` e `>` como texto).
- `filtrarPresencas(...)`: filtros de busca, período (Hoje / Esta semana / Este mês), turma e status.
- `filtrarSalas(...)`: busca, andar, status e turma.

## `validacoes.ts`
Todas as funções de validação devolvem **texto de erro** ou `""` (vazio = tudo certo). A tela mostra o erro embaixo do campo.
- `apenasDigitos`: remove tudo que não é número (`\D`).
- `validarNome`: não vazio, de 3 a 80 letras, sem números e símbolos.
- `validarEmail`: sem espaço, um único `@`, algo antes do `@`, ponto no domínio com pelo menos 2 letras depois.
- `validarTelefone`: opcional; se preenchido precisa de 10 ou 11 dígitos, DDD que não comece com 0, e celular (11) com 9 depois do DDD.
- `formatarTelefone`: monta a máscara "(35) 99999-9999" enquanto digita.
- `validarCargo`: 2 a 60 caracteres.
- `validarNovaSenha(atual, nova, confirmacao)`: todos preenchidos, mínimo 8 caracteres, diferente da atual, e confirmação igual.
- `formatarCpf`: máscara "000.000.000-00".
- `digitoDoCpf` + `validarCpf`: o **algoritmo oficial do CPF**. Multiplica cada dígito por pesos decrescentes, soma, multiplica por 10, pega o resto da divisão por 11 (se der 10 vira 0) e compara com o dígito verificador. Faz isso duas vezes (10º e 11º dígitos). Também recusa "111.111.111-11" (todos iguais).
- `validarDataNascimento(valor, idadeMinima, idadeMaxima)`: data válida, não no futuro, e idade dentro do limite (alunos: 5 a 20 anos). A conta da idade confere se o aniversário já passou este ano.
- `calcularIdade`: a mesma conta, só devolve a idade.

## `alunosCadastrados.ts`
- Chave: `educontrol:alunos-novos`.
- `todosOsAlunos()`: junta os 36 fictícios com os cadastrados pelo usuário. **É a lista que todas as telas usam.**
- `cpfDeAlunoJaCadastrado`, `cartaoJaCadastrado`: impedem duplicidade (CPF e cartão RFID).
- `cadastrarAluno(dados)`: acha o maior id, e se já chegou a 99 devolve `null` (limite). Cria o aluno com id = maior + 1, presença/média "—", situação "Bom", `statusHoje: "Pendente"` (entra na chamada de hoje) e um bloco `detalhes` (matrícula gerada pelo ano + id, data da matrícula = hoje, responsável, endereço etc.). Salva e devolve o aluno.
- `acharAlunoPorNome`: procura um aluno pelo nome (usado para abrir detalhes a partir de listas).

## `salasCadastradas.ts` e `funcionariosCadastrados.ts`
- Mesma ideia: chave própria, `lerXNovos()` e `cadastrarX(dados)`.
- Sala: guarda nome, capacidade (número), andar, turma e `cor` (que é o status).
- Funcionário: `status: "Ativo"`, vínculo Efetivo/Contratado, **fim do contrato só é salvo se for Contratado**, matrícula "F" + id + número aleatório de 3 dígitos.

## `detalhesAluno.ts` e `detalhesFuncionario.ts`
- `detalhesCompletos(aluno)`: pega os dados completos. Se o aluno foi cadastrado (tem `detalhes`) usa esses; senão gera os fictícios. Depois aplica as **edições de contato** salvas no localStorage (`alunos-contato`).
- `salvarContato(alunoId, contato)`: guarda o responsável/telefone/e-mail/endereço editados.
- `mascararCpf(cpf)`: mostra `***.456.789-**` (LGPD: dado pessoal não aparece completo por padrão; o botão do olho revela).
- `resumoFrequencia(aluno)`: conta presentes, atrasos, faltas e justificadas do aluno nos últimos 40 dias e separa as 5 mais recentes.
- Funcionário: `detalhesCompletosFuncionario` e `salvarContatoFuncionario`, mesma lógica (só telefone, e-mail e endereço são editáveis).

## `registroHoje.ts` (a chamada de hoje)
**Conceito-chave:** todas as telas precisam concordar sobre "quem está presente hoje". Este arquivo é a **fonte única**.
- Chave: `educontrol:registros-de-hoje`, guarda `{ data, registros }`. Se a data salva não é hoje, a lista vem vazia: a chamada **reinicia a cada dia**.
- `lerRegistros()` / `salvarRegistros()`: ler e gravar.
- `horaAgora()`: "HH:MM" atual.
- `alunosDeHoje()`: para cada aluno devolve o `statusHoje` e a `entradaHoje`: o valor base do dado fictício, trocado pelo que foi registrado na chamada ou no leitor RFID.
- `presencasAtuais()`: histórico de 40 dias com a linha de hoje já atualizada, mais uma linha de hoje para alunos novos.

## `rfid.ts`
- Chaves: `rfid-ativo` ("sim"/"nao") e `rfid-ultima`.
- `LIMITE_ATRASO = "07:15"`: depois dessa hora o aluno vira "Atrasado".
- `leitorAtivo()` / `definirLeitorAtivo()`: liga e desliga.
- `ultimaLeitura()`: última passagem de cartão **do dia**.
- `lerCartao(cartao, hora)`: roda as regras nesta ordem: (1) leitor inativo → recusa; (2) cartão vazio → recusa; (3) cartão não cadastrado → recusa; (4) aluno já com presença → recusa; (5) senão registra "Presente" (ou "Atrasado" se passou das 07:15) no mesmo registro da chamada de hoje e guarda a última leitura. Devolve `{ ok, mensagem }`. **Esta função vira uma chamada de API na Etapa 13** (o backend deve validar o cartão e o horário).

## `resumoDia.ts`
- `resumoDoDia(alunos)`: separa em presentes (Presente + Atrasado), pendentes e faltas.
- `porcentagem(parte, total)`: porcentagem arredondada (0 se total for 0).
- `contarPorStatus(alunos)`: conta cada status e calcula a **taxa de presença** = (presentes + atrasados) ÷ (presentes + atrasados + justificados + ausentes). Pendentes não entram na conta, pois ainda não foi marcado.
- `presencaPorTurma(alunos)`: taxa de cada turma (para a rosca/barras).

## `relatorios.ts`
- `filtrarPorPeriodo(registros, periodo, turma)`: calcula a data inicial (7 dias, 30 dias, este mês, este ano) e mantém só os registros depois dela e da turma escolhida.
- `contarPresencas`: mesma contagem do dia, só que para o período.
- `evolucaoPorDia`: agrupa por dia (presentes, faltosos, pendentes) e devolve na ordem, com o dia no formato "27/10" para o gráfico de linhas.

## `notificacoes.ts`
- `criarNotificacoes()`: conta pendentes, ausentes, atrasados (de hoje) e alunos em risco, e cria um aviso para cada contagem maior que zero, com `id`, título, texto e a rota para onde levar (`/presenca` ou `/alunos`). O `id` inclui o número e a data: se o número muda, vira um aviso novo (não lido).
- `lerLidas()` / `salvarLidas()`: lista de avisos já lidos no localStorage.
- `notificacoesLigadas()`: respeita a chave de notificações da tela de Configurações.

## `buscaGlobal.ts`
- `buscarTudo(texto, podeVer)`: com no mínimo 2 letras, procura (sem acento) em alunos (nome, turma, cartão), funcionários (nome, cargo, setor, vínculo) e salas (nome, turma, andar). Máximo 4 por tipo. `podeVer` diz se o perfil pode ver cada tipo, assim o secretário não enxerga o que não tem direito. Devolve uma lista com `tipo`, `titulo`, `detalhe` e o `item`.

## `exportarCsv.ts`
- `limparCelula`: **proteção contra injeção de fórmula**: se o texto começa com `=`, `+`, `-` ou `@`, põe um `'` na frente, assim o Excel não executa como fórmula. Se tem `;`, aspas ou quebra de linha, coloca entre aspas (padrão CSV).
- `montarCsv(colunas, linhas)`: junta tudo com `;` (padrão do Excel em português) e quebra de linha.
- `linhasDeFrequencia` / `linhasDeAlunos`: transformam registros em linhas.
- `nomeDoArquivo`: "relatorio-frequencia-2026-10-27.csv".
- `baixarCsv(nome, texto)`: cria um `Blob` (arquivo na memória), uma URL temporária, um link `<a download>` invisível, clica nele e apaga a URL. O `"﻿"` (BOM) no começo faz o Excel entender os acentos.
