# Implementation Plan: Secretaria Escolar RFID

## Overview

O plano implementa, de forma incremental e testável, um sistema funcional de secretaria escolar com integração RFID sobre a stack existente (React Router v7 framework mode, TypeScript/TSX, Tailwind CSS v4, lucide-react).

A ordem segue o fluxo de dependências das camadas: primeiro os modelos de domínio, depois repositórios (interfaces trocáveis + implementação em memória/localStorage), serviços com validação e regras de negócio, a refatoração estrutural da UI (layout compartilhado, roteamento), as páginas funcionais, o fluxo RFID e, por fim, a suíte de testes de propriedade e integração. Cada tarefa constrói sobre as anteriores e termina com a integração nas rotas, sem código órfão.

Convenção: sub-tarefas marcadas com `*` são de teste e podem ser puladas para um MVP mais rápido.

## Tasks

- [ ] 1. Configurar base de testes e modelos de domínio
  - [ ] 1.1 Configurar Vitest, fast-check e @testing-library/react
    - Instalar dependências de desenvolvimento: `vitest`, `fast-check`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, `@testing-library/user-event`
    - Criar `vitest.config.ts` com ambiente `jsdom`, setup file e alias para `app/`
    - Criar `test/setup.ts` importando `@testing-library/jest-dom`
    - Adicionar script `"test": "vitest --run"` ao `package.json` (execução única, sem watch)
    - _Requirements: infraestrutura de testes para todas as propriedades_

  - [ ] 1.2 Definir modelos de domínio em `app/models/types.ts`
    - Declarar `StatusPresenca = "presente" | "ausente" | "justificado"`
    - Declarar interfaces `Aluno`, `Sala`, `CartaoRfid`, `RegistroPresenca` conforme o design (campos, tipos e comentários de limites)
    - Exportar todos os tipos para uso pelas camadas superiores
    - _Requirements: 2.1, 2.3, 2.5, 4.8_

- [ ] 2. Camada de repositório (interfaces trocáveis + localStorage/memória)
  - [ ] 2.1 Criar helpers de persistência em `app/repositories/storage.ts`
    - Implementar leitura/escrita JSON com fallback em memória quando `localStorage` não existe (SSR)
    - Utilitário de geração de id (`crypto.randomUUID`)
    - _Requirements: base de persistência para 1.x, 2.x, 3.x, 4.x_

  - [ ] 2.2 Implementar `AlunoRepository` em `app/repositories/aluno.repository.ts`
    - Definir interface `AlunoRepository` (listar, buscarPorId, buscarPorMatricula, criar, atualizar, remover)
    - Implementar `LocalStorageAlunoRepository`
    - _Requirements: 1.1, 1.5, 1.7, 1.8, 1.10, 2.4_

  - [ ] 2.3 Implementar `SalaRepository` em `app/repositories/sala.repository.ts`
    - Definir interface `SalaRepository` (listar, buscarPorId, buscarPorNome, criar, atualizar, remover)
    - Implementar `LocalStorageSalaRepository`
    - _Requirements: 3.1, 3.4, 3.5, 3.8, 3.10_

  - [ ] 2.4 Implementar `PresencaRepository` e `CartaoRfidRepository` em `app/repositories/presenca.repository.ts`
    - Definir interfaces com upsert por tupla `(alunoId, salaId, data)` para presença e resolução de cartão por `uid`
    - Implementar versões em localStorage/memória
    - _Requirements: 4.4, 4.7, 5.1, 5.3, 2.5, 2.8_

  - [ ] 2.5 Criar ponto único de instanciação em `app/repositories/index.ts`
    - Instanciar e exportar os repositórios como singletons (ponto único de troca por HTTP no futuro)
    - _Requirements: interface trocável (Architecture)_

- [ ] 3. Camada de validação e utilitários de resultado
  - [ ] 3.1 Implementar `app/services/validation.ts`
    - Definir tipo `Resultado<T>` discriminado (`ok: true | false` com `erros: Record<string, string>`)
    - Implementar validadores reutilizáveis: texto com limites, data ISO válida e não futura, matrícula alfanumérica, telefone, inteiro em intervalo
    - Definir limites canônicos (150/30) conforme decisão do design
    - _Requirements: 1.2, 1.3, 1.4, 2.1, 2.2, 3.2, 3.3, 6.2_

  - [ ]* 3.2 Escrever testes unitários dos validadores
    - Testar limites, vazios, espaços e formatos inválidos de cada validador
    - _Requirements: 1.2, 1.3, 1.4, 2.2, 3.2, 3.3_

- [ ] 4. AlunoService (regras de negócio de aluno e cartão)
  - [ ] 4.1 Implementar `app/services/aluno.service.ts`
    - Interface `AlunoService` (listar com busca, detalhar, criar, atualizar, remover, associarCartao)
    - `listar(termoBusca?)` filtra por nome/matrícula case-insensitive (Req 1.11); `detalhar` projeta todos os campos + cartão ou ausência
    - `criar`/`atualizar` aplicam validação e unicidade de matrícula retornando `Resultado`
    - `associarCartao` garante 1:1 e rejeita cartão em uso mantendo associação existente
    - _Requirements: 1.1, 1.5, 1.7, 1.8, 1.9, 1.10, 1.11, 2.1, 2.4, 2.5, 2.6, 2.7, 2.8_

  - [ ]* 4.2 Property test: round-trip de cadastro do Aluno
    - **Property 1: Round-trip de cadastro do Aluno**
    - **Validates: Requirements 1.1, 2.1**

  - [ ]* 4.3 Property test: validação de nome do Aluno
    - **Property 2: Validação de nome do Aluno**
    - **Validates: Requirements 1.2, 2.2**

  - [ ]* 4.4 Property test: unicidade e validação de matrícula
    - **Property 3: Unicidade e validação de matrícula**
    - **Validates: Requirements 1.3, 2.4**

  - [ ]* 4.5 Property test: data de nascimento válida e não futura
    - **Property 4: Data de nascimento válida e não futura**
    - **Validates: Requirements 1.4**

  - [ ]* 4.6 Property test: detalhe do Aluno contém todos os campos
    - **Property 5: Detalhe do Aluno contém todos os campos**
    - **Validates: Requirements 1.7, 2.6, 2.7**

  - [ ]* 4.7 Property test: edição válida persiste e inválida preserva o original
    - **Property 6: Edição válida persiste e edição inválida preserva o original**
    - **Validates: Requirements 1.8, 1.9**

  - [ ]* 4.8 Property test: remoção elimina o Aluno
    - **Property 7: Remoção elimina o Aluno**
    - **Validates: Requirements 1.10**

  - [ ]* 4.9 Property test: busca por nome/matrícula case-insensitive
    - **Property 8: Busca por nome/matrícula case-insensitive**
    - **Validates: Requirements 1.11**

  - [ ]* 4.10 Property test: cardinalidade máxima de uma Sala por Aluno
    - **Property 9: Cardinalidade máxima de uma Sala por Aluno**
    - **Validates: Requirements 2.3**

  - [ ]* 4.11 Property test: cardinalidade e unicidade do Cartão RFID
    - **Property 10: Cardinalidade e unicidade do Cartão RFID**
    - **Validates: Requirements 2.5, 2.8**

- [ ] 5. SalaService (regras de sala e associação)
  - [ ] 5.1 Implementar `app/services/sala.service.ts`
    - Interface `SalaService` (listar com ocupação derivada, criar, atualizar, remover, associarAluno)
    - `criar`/`atualizar` validam nome (1..100, único) e capacidade (1..999, ≥ ocupação na edição)
    - `associarAluno` respeita capacidade; `remover` desassocia alunos (`salaId = null`)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10_

  - [ ]* 5.2 Property test: criação e validação de Sala
    - **Property 11: Criação e validação de Sala**
    - **Validates: Requirements 3.1, 3.2, 3.3, 3.4**

  - [ ]* 5.3 Property test: associação respeita a capacidade da Sala
    - **Property 12: Associação respeita a capacidade da Sala**
    - **Validates: Requirements 3.6, 3.7**

  - [ ]* 5.4 Property test: edição não reduz capacidade abaixo da ocupação
    - **Property 13: Edição de Sala não pode reduzir capacidade abaixo da ocupação**
    - **Validates: Requirements 3.8, 3.9**

  - [ ]* 5.5 Property test: remoção de Sala desassocia alunos
    - **Property 14: Remoção de Sala desassocia alunos**
    - **Validates: Requirements 3.10**

- [ ] 6. PresencaService (registro, histórico e relatórios)
  - [ ] 6.1 Implementar `app/services/presenca.service.ts`
    - Interface `PresencaService` (listarPorSalaEData, definirStatus, historicoDoAluno, gerarRelatorio)
    - `listarPorSalaEData` retorna alunos da sala com status, projetando `ausente` quando sem registro
    - `definirStatus` faz upsert idempotente por `(alunoId, salaId, data)` gravando `registradoEm` com segundos; valida intervalo de data
    - `historicoDoAluno` ordena por data decrescente
    - `gerarRelatorio` aplica filtros conjuntos, valida `dataInicial ≤ dataFinal` e calcula totais
    - _Requirements: 4.1, 4.2, 4.4, 4.6, 4.7, 4.8, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

  - [ ]* 6.2 Property test: listagem de presença cobre alunos da Sala com status
    - **Property 15: Listagem de presença cobre os alunos da Sala com status**
    - **Validates: Requirements 4.1, 4.6**

  - [ ]* 6.3 Property test: validação de data de presença
    - **Property 16: Validação de data de presença**
    - **Validates: Requirements 4.2**

  - [ ]* 6.4 Property test: definir status é upsert idempotente
    - **Property 17: Definir status é um upsert idempotente**
    - **Validates: Requirements 4.4**

  - [ ]* 6.5 Property test: histórico ordenado por data decrescente
    - **Property 18: Histórico do Aluno ordenado por data decrescente**
    - **Validates: Requirements 4.7**

  - [ ]* 6.6 Property test: registro guarda timestamp com segundos
    - **Property 19: Registro guarda timestamp com segundos**
    - **Validates: Requirements 4.8, 5.4**

  - [ ]* 6.7 Property test: relatório inclui apenas datas no intervalo inclusivo
    - **Property 24: Relatório por período inclui apenas datas no intervalo inclusivo**
    - **Validates: Requirements 6.1**

  - [ ]* 6.8 Property test: relatório rejeita data inicial posterior à final
    - **Property 25: Relatório rejeita data inicial posterior à final**
    - **Validates: Requirements 6.2**

  - [ ]* 6.9 Property test: filtros combinados aplicam conjunção
    - **Property 26: Filtros combinados aplicam conjunção**
    - **Validates: Requirements 6.3, 6.4, 6.5**

  - [ ]* 6.10 Property test: totais do relatório são consistentes
    - **Property 27: Totais do relatório são consistentes**
    - **Validates: Requirements 6.6**

- [ ] 7. RfidService e ponto único de serviços
  - [ ] 7.1 Implementar `app/services/rfid.service.ts`
    - Definir `ResultadoLeitura` (registrado | duplicado | erro) e interface `RfidService`
    - `processarLeitura(uid)`: resolve cartão → aluno → sala; trata cartão não associado, aluno sem sala, duplicado e upsert `presente`/`origem: "rfid"` com horário `HH:MM:SS`
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ] 7.2 Criar `app/services/index.ts` e `app/services/sessao.ts`
    - Instanciar e exportar serviços (`alunoService`, `salaService`, `presencaService`, `rfidService`) ligados aos repositórios
    - Implementar `getUsuarioSessao(request)` retornando `{ nome } | null`
    - _Requirements: 7.4, 7.5; wiring dos serviços_

  - [ ]* 7.3 Property test: leitura de cartão associado registra presença
    - **Property 20: Leitura RFID de cartão associado registra presença**
    - **Validates: Requirements 5.1, 5.4**

  - [ ]* 7.4 Property test: leitura de cartão não associado não cria registro
    - **Property 21: Leitura de cartão não associado não cria registro**
    - **Validates: Requirements 5.2**

  - [ ]* 7.5 Property test: leitura duplicada é idempotente
    - **Property 22: Leitura duplicada é idempotente**
    - **Validates: Requirements 5.3**

  - [ ]* 7.6 Property test: leitura de Aluno sem Sala não cria registro
    - **Property 23: Leitura de Aluno sem Sala não cria registro**
    - **Validates: Requirements 5.5**

- [ ] 8. Checkpoint - Garantir que os testes das camadas de dados passam
  - Garanta que todos os testes passam, pergunte ao usuário em caso de dúvidas.

- [ ] 9. Refatoração estrutural da UI (layout compartilhado e roteamento)
  - [ ] 9.1 Criar componentes compartilhados `Sidebar`, `Header` e `AppLayout`
    - `app/components/Sidebar.tsx`: `NavLink` para cada rota com classe ativa (`isActive`), `end` na raiz
    - `app/components/Header.tsx`: exibe nome do usuário da sessão ou "Usuário não identificado", sem placeholders
    - `app/components/AppLayout.tsx`: compõe exatamente um `Sidebar` + um `Header` e envolve `children`
    - _Requirements: 7.1, 7.3, 7.4, 7.5, 7.6_

  - [ ] 9.2 Criar componentes utilitários `Field` e `EmptyState`
    - `app/components/Field.tsx`: input + mensagem de erro por campo
    - `app/components/EmptyState.tsx`: mensagem reutilizável para listas/filtros vazios
    - _Requirements: 1.2, 1.6, 1.12, 4.3, 6.7_

  - [ ] 9.3 Criar rota de layout `app/routes/_app.tsx`
    - `loader` obtém usuário da sessão; componente renderiza `AppLayout` com `<Outlet />`
    - `ErrorBoundary` que mantém o usuário na rota e indica falha de navegação
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [ ] 9.4 Atualizar `app/routes.ts` com `layout()` e a resource route
    - Envolver rotas autenticadas em `layout("routes/_app.tsx", [...])`; manter `log` fora do layout
    - Registrar `route("api/rfid", "routes/api.rfid.ts")`
    - _Requirements: 7.1, 7.3, 5.1_

  - [ ] 9.5 Remover barra lateral/cabeçalho duplicados e placeholders das páginas existentes
    - Ajustar `app/pages/**` e `app/routes/**` para consumir o layout compartilhado, removendo `<a href>`, "Welcome back, Lohran!", "blablabla" e avatar placeholder
    - _Requirements: 7.1, 7.3, 7.4, 7.5_

  - [ ]* 9.6 Teste de integração: exatamente um item de navegação ativo por rota
    - **Property 28: Exatamente um item de navegação ativo por rota**
    - **Validates: Requirements 7.3, 7.6**

  - [ ]* 9.7 Teste de integração do layout compartilhado
    - Renderizar o layout e verificar exatamente um cabeçalho e uma barra lateral; nome da sessão vs. "não identificado"; ausência de placeholders
    - _Requirements: 7.3, 7.4, 7.5_

- [ ] 10. Página de Alunos (CRUD + busca + detalhes)
  - [ ] 10.1 Implementar `loader`/`action` em `app/routes/alunos.tsx`
    - `loader` lê lista filtrada pela query string e detalhe do aluno selecionado via `AlunoService`
    - `action` trata criar/editar/remover/associar cartão, traduzindo `Resultado` em resposta 400 com erros
    - _Requirements: 1.1, 1.5, 1.7, 1.8, 1.9, 1.10, 1.11, 2.6, 2.7, 2.8_

  - [ ] 10.2 Refatorar apresentação em `app/pages/alunos/alunos.tsx`
    - Lista com nome/matrícula/sala; `EmptyState` para vazio e busca sem resultado; campo de busca sincronizado com a query
    - `<Form method="post">` de cadastro/edição com `Field` preservando valores via `useActionData`; painel de detalhes completo + cartão
    - _Requirements: 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.9, 1.11, 1.12, 2.6, 2.7_

  - [ ]* 10.3 Teste de integração da página de Alunos
    - Renderizar lista vazia, busca sem resultado e exibição de erros de validação preservando valores
    - _Requirements: 1.6, 1.12, 1.2_

- [ ] 11. Página de Salas (CRUD + associação)
  - [ ] 11.1 Implementar `loader`/`action` em `app/routes/salas.tsx`
    - `loader` lista salas com ocupação derivada; `action` trata criar/editar/remover/associar aluno via `SalaService`
    - _Requirements: 3.1, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10_

  - [ ] 11.2 Refatorar apresentação em `app/pages/salas/salas.tsx`
    - Lista com nome/capacidade/ocupação; forms com validação; ação de associar aluno com mensagem de capacidade máxima
    - _Requirements: 3.2, 3.3, 3.5, 3.7, 3.9_

  - [ ]* 11.3 Teste de integração da página de Salas
    - Verificar exibição de ocupação e mensagem de capacidade máxima ao associar
    - _Requirements: 3.5, 3.7_

- [ ] 12. Página de Presenças (grade de status + painel RFID ao vivo)
  - [ ] 12.1 Implementar `loader`/`action` em `app/routes/presenca.tsx`
    - `loader` recebe sala/data, valida intervalo e retorna alunos com status (ausente por padrão) e leituras RFID recentes
    - `action` faz upsert de status via `PresencaService`
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

  - [ ] 12.2 Refatorar apresentação em `app/pages/presencas/presenca.tsx`
    - Seletor de sala/data com validação; grade de status (presente/ausente/justificado); `EmptyState` para sala sem alunos
    - Painel RFID ao vivo com `useRevalidator`/polling (~2s), exibindo nome + `HH:MM:SS` e mensagens de aviso/erro por no mínimo 5s
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 5.2, 5.3, 5.4, 5.5, 5.6_

  - [ ]* 12.3 Teste de integração da página de Presenças
    - Data inválida rejeitada preservando a tela; sala sem alunos exibe mensagem; formatação de horário HH:MM:SS
    - _Requirements: 4.2, 4.3, 5.4_

- [ ] 13. Página de Relatórios (filtros + totais)
  - [ ] 13.1 Implementar `loader`/`action` em `app/routes/relatorios.tsx`
    - Aplicar filtros de período/sala/aluno via `PresencaService.gerarRelatorio`; validar `dataInicial ≤ dataFinal`
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7_

  - [ ] 13.2 Refatorar apresentação em `app/pages/relatorios/relatorios.tsx`
    - Filtros; tabela de registros; cartões de totais presentes/ausentes/justificados; `EmptyState` quando sem dados
    - _Requirements: 6.2, 6.6, 6.7_

  - [ ]* 13.3 Teste de integração da página de Relatórios
    - Data inicial posterior à final rejeitada preservando filtros; sem dados exibe mensagem; totais coerentes
    - _Requirements: 6.2, 6.6, 6.7_

- [ ] 14. Fluxo RFID (resource route) e wiring final
  - [ ] 14.1 Implementar resource route `app/routes/api.rfid.ts`
    - `action` recebe `{ uid }` via JSON, chama `rfidService.processarLeitura` e responde JSON com status 200/422
    - Integrar com o painel ao vivo da página de Presenças (revalidação) e tratar timeout de 3s no cliente
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

  - [ ]* 14.2 Teste de integração do fluxo RFID via resource route
    - Simular POST com UID associado, não associado e duplicado; verificar registro/mensagens e nenhum registro nos casos de erro
    - _Requirements: 5.1, 5.2, 5.3, 5.5, 5.6_

- [ ] 15. Checkpoint final - Garantir que todos os testes passam
  - Garanta que todos os testes passam, pergunte ao usuário em caso de dúvidas.

## Notes

- Tarefas marcadas com `*` são opcionais (testes) e podem ser puladas para um MVP mais rápido.
- Cada tarefa referencia requisitos e/ou propriedades específicas para rastreabilidade.
- Os checkpoints garantem validação incremental das camadas.
- Property tests (fast-check, mínimo de 100 iterações, execução única com `--run`) validam as 28 propriedades de correção; testes de exemplo/integração cobrem UI, roteamento e formatação.
- Toda regra de negócio vive na camada de serviço; componentes de página apenas apresentam dados e disparam `<Form>`.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["2.1", "3.1"] },
    { "id": 2, "tasks": ["2.2", "2.3", "2.4", "3.2"] },
    { "id": 3, "tasks": ["2.5"] },
    { "id": 4, "tasks": ["4.1", "5.1", "6.1"] },
    { "id": 5, "tasks": ["4.2", "4.3", "4.4", "4.5", "4.6", "4.7", "4.8", "4.9", "4.10", "4.11", "5.2", "5.3", "5.4", "5.5", "6.2", "6.3", "6.4", "6.5", "6.6", "6.7", "6.8", "6.9", "6.10", "7.1"] },
    { "id": 6, "tasks": ["7.2", "7.3", "7.4", "7.5", "7.6"] },
    { "id": 7, "tasks": ["9.1", "9.2"] },
    { "id": 8, "tasks": ["9.3"] },
    { "id": 9, "tasks": ["9.4", "9.5"] },
    { "id": 10, "tasks": ["9.6", "9.7", "10.1", "11.1", "12.1", "13.1", "14.1"] },
    { "id": 11, "tasks": ["10.2", "11.2", "12.2", "13.2"] },
    { "id": 12, "tasks": ["10.3", "11.3", "12.3", "13.3", "14.2"] }
  ]
}
```
