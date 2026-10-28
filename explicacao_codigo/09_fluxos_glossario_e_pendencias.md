# 09. Como tudo se conecta, glossário e pendências

## Fluxos em passos (para explicar na banca)

### A) Login até a tela inicial
1. `/` abre `routes/_index.tsx` → tela `Log`.
2. Usuário digita e-mail/senha → `handlelogin` → `fazerLogin` (`auth/sessao.ts`) compara com `CONTAS`.
3. Acertou: grava o usuário no `sessionStorage` e `navigate("/home")`. Errou: mensagem vermelha.
4. `/home` abre `routes/home.tsx`, que usa `RotaProtegida permissao="pagina.inicio"`. O porteiro confere usuário e permissão e deixa `Welcome` aparecer.

### B) Registrar presença (chamada manual)
1. Presenças → botão **Registrar presença** → modal `RegistrarPresenca`.
2. O modal lê `alunosDeHoje()` e monta o `rascunho` com o que cada aluno já tem.
3. A secretária marca Presente/Atrasado/Justificado/Ausente (e a hora de entrada).
4. **Salvar** valida e grava em `registros-de-hoje` (localStorage) com `salvarRegistros`.
5. Welcome, Presenças, Relatórios, notificações e detalhes do aluno leem pelo mesmo `registroHoje.ts`, por isso todos mostram o mesmo número.

### C) Passar o cartão RFID (simulação)
1. Tela inicial → card **Leitor RFID** → digita o número (ex.: `0001`) → **Simular leitura**.
2. `lerCartao` valida: leitor ativo? cartão preenchido? existe? aluno ainda pendente?
3. Hora ≤ 07:15 = **Presente**; depois = **Atrasado**. Grava no mesmo `registros-de-hoje`.
4. Os cards da tela inicial recalculam na hora.
5. No sistema real, o leitor físico envia o número ao backend e o backend aplica essas mesmas regras.

### D) Cadastrar um aluno
1. Alunos → **Novo aluno** (só com `alunos.cadastrar`).
2. `NovoAluno.salvar` valida cada campo (`validacoes.ts`) e procura duplicados (nome na turma, CPF, cartão).
3. `cadastrarAluno` cria o aluno com `statusHoje: "Pendente"` e grava em `alunos-novos`.
4. `todosOsAlunos()` agora inclui o novo; ele aparece na lista, na chamada, nos relatórios, na busca e no leitor RFID.

### E) Gerar relatório (CSV)
1. Relatórios → escolhe período/turma → **Gerar relatório**.
2. O modal conta as linhas; **Baixar CSV** monta o texto (`montarCsv`) e dispara o download (`baixarCsv`).
3. Células que começam com `= + - @` ganham `'` na frente (proteção contra injeção de fórmula).

### F) Permissões na prática
- Menu: `Sidebar.criarLink` só mostra o link se `pode(permissao)`.
- Página: `RotaProtegida` bloqueia o endereço digitado à mão.
- Botão: `{pode("alunos.cadastrar") && <button>}` esconde botões.
- Mesmo assim, **o backend precisa revalidar tudo**, porque o frontend pode ser alterado no navegador.

## Glossário rápido
| Termo | Significado simples |
|---|---|
| Componente | Função que devolve um pedaço de tela (JSX). |
| JSX/TSX | HTML escrito dentro do JavaScript/TypeScript. |
| Props | Informações passadas a um componente, como parâmetros. |
| State (`useState`) | Memória da tela; se muda, a tela é redesenhada. |
| Hook | Função `useAlgo` que usa recursos do React. |
| `useEffect` | Código que roda depois da tela aparecer (ex.: escutar a tecla Esc). |
| Rota | Endereço do site (`/alunos`). |
| SSR | A página é montada primeiro no servidor; por isso há testes com `typeof window`. |
| `localStorage` | Gaveta do navegador que **sobrevive** ao fechar o site (simula o banco). |
| `sessionStorage` | Gaveta que **some** ao fechar a aba (guarda o login). |
| Portal (`createPortal`) | Desenha um elemento direto no `<body>` para ficar acima de tudo. |
| Modal | Janela por cima da página. |
| RFID | Cartão que o leitor identifica por aproximação. |
| LGPD | Lei de proteção de dados; por isso o CPF aparece mascarado. |
| CSV | Arquivo de texto com colunas separadas por `;` que abre no Excel. |
| RBAC | Controle de acesso por perfil (administrador, secretário). |
| Fictício | Dado inventado só para demonstração. |

## Onde as chaves do `localStorage` são usadas
| Chave | Guarda | Arquivo |
|---|---|---|
| `educontrol:alunos-novos` | alunos cadastrados | `alunosCadastrados.ts` |
| `educontrol:salas-novas` | salas cadastradas | `salasCadastradas.ts` |
| `educontrol:funcionarios-novos` | funcionários cadastrados | `funcionariosCadastrados.ts` |
| `educontrol:alunos-contato` / `funcionarios-contato` | contatos editados | `detalhesAluno.ts` / `detalhesFuncionario.ts` |
| `educontrol:registros-de-hoje` | chamada do dia (zera a cada dia) | `registroHoje.ts` |
| `educontrol:rfid-ativo` / `rfid-ultima` | leitor ligado e última leitura | `rfid.ts` |
| `educontrol:notificacoes-lidas` | avisos já lidos | `notificacoes.ts` |
| `educontrol:sidebar-recolhida` | menu recolhido | `useSidebarRecolhida.ts` |
| `educontrol-configuracoes` | configurações | `configuracao.tsx` |
| `sessionStorage educontrol:usuario` | usuário logado | `sessao.ts` |

## O que é SIMULAÇÃO e o que será REAL (Etapa 13)
| Hoje (simulação) | Depois (backend Java + PostgreSQL) |
|---|---|
| `CONTAS` fixas, senha em texto | Login real com senha criptografada e token |
| Dados em `data/` e `localStorage` | Tabelas no PostgreSQL via API |
| Permissões só no frontend | Backend valida todas as permissões |
| `lerCartao` roda no navegador | Backend recebe o cartão do leitor e valida |
| Chave do Gemini no navegador (`VITE_GEMINI_API_KEY`) | Chave guardada no servidor |
| CSV montado no navegador | Relatórios gerados pela API |

## Limitações e pendências conhecidas
- Gráfico de linhas e lista "Alunos que precisam de atenção" da tela inicial, cards e distribuição de Team: valores fixos.
- Salas sem paginação; filtros de Team só visuais.
- Alunos novos não têm média nem histórico de presença.
- O formato do cartão RFID (4 a 10 dígitos) é uma suposição, para alinhar com o backend.
- `react-native` ainda está no `package.json` sem ser usado.
- `docs/BD/ddl.sql` está em sintaxe MySQL com erros; será refeito para PostgreSQL.
- Login com Google, "esqueci a senha" e "lembrar de mim" são só visuais.
- Cliques em navegador real, build de produção e celular ainda precisam de conferência manual.
