# Documento de Design

## Overview

Este design transforma o esqueleto estático de páginas em um sistema funcional de secretaria escolar com integração RFID, mantendo a stack existente: React Router v7 em framework mode, TypeScript/TSX, Tailwind CSS v4 e ícones `lucide-react`.

O design ataca dois eixos:

1. **Correção estrutural da UI** (Requisito 7): extrair o layout duplicado (sidebar + header) para uma **rota de layout** do React Router, substituir `<a href="home.tsx">` por `<NavLink to="/...">` com destaque de rota ativa e remover os textos de placeholder ("Welcome back, Lohran!", "blablabla", avatar placeholder), passando o nome do usuário via `loader`/sessão.
2. **Camada funcional de dados** (Requisitos 1–6): introduzir uma camada de serviço/repositório desacoplada da UI, acessada pelos `loader`/`action` das rotas. A implementação inicial é **em memória com espelho em `localStorage`** (adequada a um TCC frontend, sem backend), atrás de uma interface que pode ser trocada por uma API real sem mudar as rotas.

A integração RFID é modelada como uma **resource route** (`/api/rfid`) que expõe uma `action` recebendo o UID do cartão; a página de Presenças reflete a leitura em tempo quase real via revalidação (polling curto ou `useRevalidator`).

### Princípios de design

- **UI burra, serviço esperto**: componentes de página não contêm regra de negócio; toda validação e mutação vive na camada de serviço, chamada pelos `action`.
- **Uma fonte de dados**: `loader` para leitura, `action` para escrita. Sem `fetch` espalhado nos componentes.
- **Interface trocável**: repositórios expostos por interfaces (`AlunoRepository`, `SalaRepository`, `PresencaRepository`), permitindo substituir a implementação `localStorage` por HTTP futuramente.

## Architecture

### Camadas

```
┌───────────────────────────────────────────────────────────────┐
│  Camada de UI (app/pages/**)                                    │
│  Componentes React puros de apresentação (Alunos, Salas, ...)   │
│  Recebem dados via props/hooks de rota, disparam <Form>.        │
├───────────────────────────────────────────────────────────────┤
│  Camada de Rotas (app/routes/**, app/routes.ts)                 │
│  loaders (leitura) + actions (escrita) + rota de layout         │
│  Traduz requisições HTTP <-> chamadas de serviço.               │
├───────────────────────────────────────────────────────────────┤
│  Camada de Serviço (app/services/**)                            │
│  Regras de negócio, validação, cardinalidade, RFID.             │
│  AlunoService, SalaService, PresencaService, RfidService.       │
├───────────────────────────────────────────────────────────────┤
│  Camada de Repositório (app/repositories/**)                    │
│  Interfaces + implementação em memória/localStorage.            │
│  Persistência substituível por API real.                        │
├───────────────────────────────────────────────────────────────┤
│  Modelos de Domínio (app/models/**)                             │
│  Tipos: Aluno, Sala, RegistroPresenca, CartaoRfid, enums.       │
└───────────────────────────────────────────────────────────────┘
```

### Estrutura de diretórios proposta

```
app/
  models/
    types.ts            # Aluno, Sala, RegistroPresenca, CartaoRfid, StatusPresenca
  repositories/
    storage.ts          # helpers de leitura/escrita em localStorage (client) / memória (server)
    aluno.repository.ts
    sala.repository.ts
    presenca.repository.ts
    index.ts            # instancia e exporta os repositórios (ponto único de troca)
  services/
    validation.ts       # validadores reutilizáveis + tipo Resultado<T>
    aluno.service.ts
    sala.service.ts
    presenca.service.ts
    rfid.service.ts
  components/
    AppLayout.tsx       # sidebar + header compartilhados
    Sidebar.tsx
    Header.tsx
    Field.tsx           # input + mensagem de erro reutilizável
    EmptyState.tsx      # mensagens de lista/filtro vazios
  pages/**              # componentes de apresentação (já existentes, refatorados)
  routes/**             # loaders/actions + rota de layout
  routes.ts             # configuração de rotas
```

### Fluxo de rotas e layout compartilhado

O ponto central da correção do Requisito 7 é uma **rota de layout** (`app/routes/_app.tsx`) que renderiza o `AppLayout` (sidebar + header) uma única vez e um `<Outlet />` para o conteúdo. Todas as páginas autenticadas passam a ser filhas dessa rota.

```typescript
// app/routes.ts
import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/_app.tsx", [
    index("routes/home.tsx"),
    route("alunos", "routes/alunos.tsx"),
    route("salas", "routes/salas.tsx"),
    route("presenca", "routes/presenca.tsx"),
    route("relatorios", "routes/relatorios.tsx"),
    route("ia", "routes/IA.tsx"),
    route("team", "routes/team.tsx"),
    route("settings", "routes/settings.tsx"),
    route("ajuda", "routes/ajuda.tsx"),
  ]),
  route("log", "routes/Log.tsx"),        // login/logout fora do layout autenticado
  route("api/rfid", "routes/api.rfid.ts"), // resource route de leitura RFID
] satisfies RouteConfig;
```

A rota de layout carrega o usuário da sessão e o repassa para o header:

```typescript
// app/routes/_app.tsx
import { Outlet, useLoaderData } from "react-router";
import type { Route } from "./+types/_app";
import { AppLayout } from "../components/AppLayout";
import { getUsuarioSessao } from "../services/sessao";

export async function loader({ request }: Route.LoaderArgs) {
  const usuario = await getUsuarioSessao(request); // { nome: string } | null
  return { nomeUsuario: usuario?.nome ?? null };
}

export default function AppShell() {
  const { nomeUsuario } = useLoaderData<typeof loader>();
  return (
    <AppLayout nomeUsuario={nomeUsuario}>
      <Outlet />
    </AppLayout>
  );
}
```

O `AppLayout` renderiza `Sidebar` e `Header` (garantindo exatamente um de cada por página — Requisito 7.3) e usa `NavLink` para o destaque de rota ativa (Requisito 7.6):

```tsx
// app/components/Sidebar.tsx (trecho)
import { NavLink } from "react-router";
import { LayoutDashboard, Users } from "lucide-react";

const navItemClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "app-nav-active" : "app-nav-link";

export function Sidebar() {
  return (
    <aside className="app-sidebar">
      <nav className="flex flex-col gap-2">
        <NavLink to="/" end className={navItemClass}>
          <LayoutDashboard size={20} /> <span>Início</span>
        </NavLink>
        <NavLink to="/alunos" className={navItemClass}>
          <Users size={20} /> <span>Alunos</span>
        </NavLink>
        {/* ...demais itens... */}
      </nav>
    </aside>
  );
}
```

```tsx
// app/components/Header.tsx (trecho)
export function Header({ nomeUsuario }: { nomeUsuario: string | null }) {
  const nome = nomeUsuario ?? "Usuário não identificado"; // Requisito 7.5
  return (
    <header className="app-header">
      <h1 className="app-title">{nome}</h1>
      <input type="text" placeholder="Pesquisar..." className="app-input w-full max-w-80" />
      <div className="app-avatar">{nome.charAt(0).toUpperCase()}</div>
    </header>
  );
}
```

Isso resolve: duplicação de sidebar/header (single source), navegação client-side sem recarga (`NavLink`), destaque de rota ativa (`isActive`), e remoção dos placeholders (nome vem do `loader`).

## Data Models

```typescript
// app/models/types.ts

export type StatusPresenca = "presente" | "ausente" | "justificado";

export interface Aluno {
  id: string;                 // gerado (crypto.randomUUID)
  nomeCompleto: string;       // 1..150
  dataNascimento: string;     // ISO "YYYY-MM-DD", válida e não futura
  matricula: string;          // 1..30 alfanumérico, único no sistema
  nomeResponsavel: string;    // 1..150
  telefoneContato: string;    // 8..20
  salaId: string | null;      // no máximo uma Sala (Req 2.3)
  cartaoRfidId: string | null;// no máximo um Cartao_RFID (Req 2.5)
}

export interface Sala {
  id: string;
  nome: string;               // 1..100, único
  capacidade: number;         // inteiro 1..999
  // ocupação NÃO é armazenada; derivada de count(alunos com salaId == id)
}

export interface CartaoRfid {
  uid: string;                // identificador único gravado no cartão físico
  alunoId: string | null;     // no máximo um Aluno (Req 2.5 / 2.8)
}

export interface RegistroPresenca {
  id: string;
  alunoId: string;
  salaId: string;
  data: string;               // ISO "YYYY-MM-DD"
  status: StatusPresenca;
  registradoEm: string;       // ISO datetime com segundos (Req 4.8) — quando o status foi definido
  origem: "manual" | "rfid";
}
```

### Mapeamento Aluno ↔ Cartão

O vínculo é **bidirecional e 1:1**:

- `Aluno.cartaoRfidId` aponta para o UID do cartão.
- `CartaoRfid.alunoId` aponta de volta para o aluno.

A unicidade (Req 2.5, 2.8) é garantida no serviço: associar um cartão já vinculado a outro aluno é rejeitado e a associação existente permanece intacta. A resolução de leitura RFID usa `CartaoRfid.alunoId` para achar o aluno em O(1).

### Chave lógica de presença

Um `RegistroPresenca` é único pela tupla `(alunoId, salaId, data)`. Definir status para essa tupla faz **upsert** (cria se não existe, atualiza se existe — Req 4.4), garantindo idempotência e evitando duplicidade em leituras RFID repetidas (Req 5.3). Quando não há registro, a UI/serviço projeta `ausente` (Req 4.6).

## Components and Interfaces

### Repositórios (interfaces trocáveis)

```typescript
// app/repositories/aluno.repository.ts
export interface AlunoRepository {
  listar(): Promise<Aluno[]>;
  buscarPorId(id: string): Promise<Aluno | null>;
  buscarPorMatricula(matricula: string): Promise<Aluno | null>;
  criar(aluno: Omit<Aluno, "id">): Promise<Aluno>;
  atualizar(id: string, dados: Partial<Omit<Aluno, "id">>): Promise<Aluno>;
  remover(id: string): Promise<void>;
}
```

`SalaRepository` e `PresencaRepository` seguem o mesmo padrão. A implementação inicial é `LocalStorageAlunoRepository`, que serializa em JSON. `app/repositories/index.ts` é o **ponto único de instanciação**; trocar por `HttpAlunoRepository` no futuro não afeta serviços nem rotas.

### Tipo de resultado de validação

Para preservar dados do formulário e reportar erro por campo (Req 1.2–1.4, 2.2, 3.x), serviços retornam um resultado discriminado em vez de lançar exceção para erros de validação:

```typescript
// app/services/validation.ts
export type Resultado<T> =
  | { ok: true; valor: T }
  | { ok: false; erros: Record<string, string> }; // { campo: mensagem }
```

Os `action` traduzem `{ ok: false }` em uma resposta com `data(...)` de status 400 contendo `erros`, que o componente exibe via `useActionData` mantendo os valores digitados.

### Serviços

```typescript
// app/services/aluno.service.ts
export interface AlunoService {
  listar(termoBusca?: string): Promise<Aluno[]>;               // Req 1.5, 1.11
  detalhar(id: string): Promise<Aluno | null>;                 // Req 1.7, 2.6/2.7
  criar(dados: DadosAluno): Promise<Resultado<Aluno>>;         // Req 1.1–1.4, 2.1/2.2
  atualizar(id: string, dados: DadosAluno): Promise<Resultado<Aluno>>; // Req 1.8/1.9
  remover(id: string): Promise<void>;                          // Req 1.10
  associarCartao(alunoId: string, uid: string): Promise<Resultado<Aluno>>; // Req 2.5/2.8
}
```

```typescript
// app/services/sala.service.ts
export interface SalaService {
  listar(): Promise<SalaComOcupacao[]>;                        // Req 3.5 (nome, capacidade, qtdAlunos)
  criar(dados: DadosSala): Promise<Resultado<Sala>>;           // Req 3.1–3.4
  atualizar(id: string, dados: DadosSala): Promise<Resultado<Sala>>; // Req 3.8/3.9
  remover(id: string): Promise<void>;                          // Req 3.10 (desassocia alunos)
  associarAluno(salaId: string, alunoId: string): Promise<Resultado<void>>; // Req 3.6/3.7
}
```

```typescript
// app/services/presenca.service.ts
export interface PresencaService {
  listarPorSalaEData(salaId: string, data: string): Promise<PresencaAluno[]>; // Req 4.1/4.6
  definirStatus(alunoId: string, salaId: string, data: string, status: StatusPresenca): Promise<Resultado<RegistroPresenca>>; // Req 4.4
  historicoDoAluno(alunoId: string): Promise<RegistroPresenca[]>; // Req 4.7 (data desc)
  gerarRelatorio(filtro: FiltroRelatorio): Promise<Resultado<Relatorio>>; // Req 6
}

export interface FiltroRelatorio {
  dataInicial: string;
  dataFinal: string;
  salaId?: string;
  alunoId?: string;
}

export interface Relatorio {
  registros: RegistroPresenca[];
  totais: { presentes: number; ausentes: number; justificados: number }; // Req 6.6
}
```

### Componentes de UI por página

**Alunos** (`app/pages/alunos/alunos.tsx`)
- Lista/tabela com nome, matrícula e sala (Req 1.5); `EmptyState` quando vazia (Req 1.6) ou sem resultado de busca (Req 1.12).
- Campo de busca que atualiza a query string; o `loader` filtra por nome/matrícula case-insensitive (Req 1.11).
- `<Form method="post">` de cadastro/edição usando o componente `Field` (input + erro), preservando valores via `useActionData` em falha (Req 1.2–1.4, 1.9).
- Painel de detalhes com todos os campos + id do cartão ou indicação de ausência (Req 1.7, 2.6/2.7).

**Salas** (`app/pages/salas/salas.tsx`)
- Lista com nome, capacidade e ocupação (Req 3.5).
- Form de cadastro/edição com validação de nome/capacidade (Req 3.1–3.4, 3.8/3.9).
- Ação de associar aluno respeitando capacidade (Req 3.6/3.7).

**Presenças** (`app/pages/presencas/presenca.tsx`)
- Seletor de Sala e data; validação de intervalo de data (Req 4.1/4.2); `EmptyState` para sala sem alunos (Req 4.3).
- Grade de alunos com controle de status (presente/ausente/justificado) que dispara `action` de upsert (Req 4.4); status padrão `ausente` (Req 4.6).
- **Painel de leitura RFID ao vivo**: exibe nome + horário `HH:MM:SS` das leituras recentes (Req 5.4) e mensagens de erro/aviso por no mínimo 5s (Req 5.2/5.3/5.5). Mantido atualizado por `useRevalidator` com polling curto (~2s) ou `EventSource` se disponível.

**Relatórios** (`app/pages/relatorios/relatorios.tsx`)
- Filtros de período, sala e aluno (Req 6.1–6.5); validação data inicial ≤ final (Req 6.2).
- Tabela de registros + cartões de totais presentes/ausentes/justificados (Req 6.6); `EmptyState` quando sem dados (Req 6.7).

## Fluxo de Integração RFID

A leitura é recebida por uma **resource route** (sem componente, só `action`), permitindo que o Leitor_RFID (ou um simulador de teste) faça `POST /api/rfid` com o UID.

```
┌────────────┐  POST /api/rfid    ┌──────────────────┐   ┌───────────────────┐   ┌──────────────┐
│ Leitor_RFID│ ─────{ uid }─────▶ │ routes/api.rfid  │──▶│  RfidService      │──▶│ PresencaRepo │
│ (físico ou │                    │  (action)        │   │  processarLeitura │   │ (upsert)     │
│  simulador)│ ◀──resultado JSON──│                  │◀──│                   │◀──│              │
└────────────┘                    └──────────────────┘   └───────────────────┘   └──────────────┘
                                                                   │
                    página Presenças (useRevalidator/polling) ◀────┘  reflete registro/mensagem
```

```typescript
// app/routes/api.rfid.ts (resource route)
import { data } from "react-router";
import type { Route } from "./+types/api.rfid";
import { rfidService } from "../services";

export async function action({ request }: Route.ActionArgs) {
  const { uid } = await request.json();
  const resultado = await rfidService.processarLeitura(uid);
  return data(resultado, { status: resultado.tipo === "erro" ? 422 : 200 });
}
```

```typescript
// app/services/rfid.service.ts
export type ResultadoLeitura =
  | { tipo: "registrado"; alunoNome: string; horario: string; registro: RegistroPresenca } // Req 5.1/5.4
  | { tipo: "duplicado"; alunoNome: string; mensagem: string }   // Req 5.3
  | { tipo: "erro"; motivo: "cartao_nao_associado" | "aluno_sem_sala" | "falha_comunicacao"; mensagem: string }; // Req 5.2/5.5/5.6

export interface RfidService {
  processarLeitura(uid: string): Promise<ResultadoLeitura>;
}
```

Lógica de `processarLeitura` (Req 5):
1. Resolve o cartão pelo `uid`. Sem aluno associado → `erro/cartao_nao_associado`, nenhum registro criado (Req 5.2).
2. Resolve o aluno. Se `aluno.salaId == null` → `erro/aluno_sem_sala`, nenhum registro (Req 5.5).
3. Verifica se já existe registro `presente` para `(alunoId, salaId, hoje)` → `duplicado`, mantém registro inalterado (Req 5.3).
4. Caso contrário, faz upsert com `status: "presente"`, `origem: "rfid"`, `registradoEm` = agora → `registrado`, com `horario` formatado `HH:MM:SS` (Req 5.1/5.4).
5. A página de Presenças, ao revalidar, exibe o novo registro e/ou a mensagem apropriada; mensagens de aviso/erro permanecem por no mínimo 5s (Req 5.2/5.3/5.5).

Falha/timeout de comunicação (Req 5.6): o cliente que chama `/api/rfid` (painel de Presenças ou o próprio leitor) aplica timeout de 3s; se estourar ou a resposta indicar `falha_comunicacao`, a UI mostra "a leitura não pôde ser processada" e nenhum registro é criado.

## Error Handling

### Validações de domínio (camada de serviço)

| Campo | Regra | Requisito |
|-------|-------|-----------|
| Aluno.nomeCompleto | 1..150, não vazio | 1.2, 2.1/2.2 |
| Aluno.dataNascimento | data ISO válida e ≤ hoje | 1.4, 2.1 |
| Aluno.matricula | 1..30 alfanumérico, único | 1.3, 2.4 |
| Aluno.nomeResponsavel | 1..150 | 2.1 |
| Aluno.telefoneContato | 8..20 | 2.1 |
| Aluno.cartaoRfidId | único entre alunos | 2.5, 2.8 |
| Sala.nome | 1..100, único | 3.2, 3.4 |
| Sala.capacidade | inteiro 1..999 e ≥ ocupação atual | 3.3, 3.9 |
| Presença.data | dentro de [início do ano letivo, hoje] | 4.2 |
| Relatório | dataInicial ≤ dataFinal | 6.2 |

Observação: os limites de nome/matrícula diferem entre Req 1 (100/20) e Req 2 (150/30). O design adota os limites **mais amplos do Requisito 2** (150/30) como canônicos no armazenamento, por serem a especificação dedicada de dados do aluno; validadores usam esses limites. (Ponto a confirmar com o usuário; escolha documentada para evitar conflito.)

### Estratégia de erros

- **Erros de validação** (esperados): retornados como `Resultado<T> { ok: false, erros }`; o `action` responde 400 com os erros; a UI preserva os dados digitados e mostra a mensagem por campo. Nenhuma exceção é lançada.
- **Erros de estado/negócio** (sala cheia, cartão em uso, capacidade < ocupação): mesmo mecanismo `Resultado`, mantendo o estado anterior inalterado (Req 2.8, 3.7, 3.9, 4.5).
- **Erros inesperados** (I/O, falha de repositório): lançados e capturados pelo `ErrorBoundary` da rota (Req 7.2), mantendo o usuário na rota atual com indicação de erro.
- **Integridade referencial**: remover Sala desassocia alunos (`salaId = null`) atomicamente no serviço (Req 3.10).

## Testing Strategy

**Abordagem dupla**: testes de propriedade (fast-check) para regras universais sobre as camadas de serviço/repositório (código puro, sem I/O real) e testes de exemplo/integração para renderização, roteamento e casos pontuais. Ferramenta sugerida: **Vitest + fast-check** para unidade/propriedade e **@testing-library/react** para componentes. Property tests com mínimo de 100 iterações; execução única (`--run`, sem watch).

Foco de propriedade: serviços de Aluno/Sala/Presença/RFID usando repositório em memória. Foco de exemplo/integração: layout compartilhado, navegação, formatação de horário, casos de lista/filtro vazios, e falhas de I/O simuladas.

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Round-trip de cadastro do Aluno

*For any* conjunto de dados de Aluno válidos, criar o Aluno e depois lê-lo por id deve retornar um Aluno com exatamente os mesmos valores de campo informados.

**Validates: Requirements 1.1, 2.1**

### Property 2: Validação de nome do Aluno

*For any* string de nome vazia, composta só por espaços, ou com comprimento fora dos limites permitidos, o cadastro/edição do Aluno deve ser rejeitado com erro referente ao nome e o repositório deve permanecer inalterado.

**Validates: Requirements 1.2, 2.2**

### Property 3: Unicidade e validação de matrícula

*For any* estado do repositório, nunca existem dois alunos com a mesma matrícula, e qualquer tentativa de criar/editar com matrícula vazia, fora do limite, não alfanumérica ou já existente é rejeitada.

**Validates: Requirements 1.3, 2.4**

### Property 4: Data de nascimento válida e não futura

*For any* data de nascimento vazia, malformada ou posterior à data atual, o cadastro/edição do Aluno é rejeitado com erro referente à data.

**Validates: Requirements 1.4**

### Property 5: Detalhe do Aluno contém todos os campos

*For any* Aluno existente, a projeção de detalhe contém nome completo, data de nascimento, matrícula, nome do responsável, telefone, sala associada e o identificador do cartão (ou a indicação de ausência de cartão).

**Validates: Requirements 1.7, 2.6, 2.7**

### Property 6: Edição válida persiste e edição inválida preserva o original

*For any* Aluno e conjunto de dados de edição, se os dados são válidos a leitura posterior reflete os novos valores; se algum campo é inválido ou a matrícula duplica outro Aluno, a edição é rejeitada e o Aluno permanece com os valores originais.

**Validates: Requirements 1.8, 1.9**

### Property 7: Remoção elimina o Aluno

*For any* Aluno existente, após a remoção o Aluno não aparece mais na listagem nem pode ser buscado por id.

**Validates: Requirements 1.10**

### Property 8: Busca por nome/matrícula case-insensitive

*For any* conjunto de alunos e termo de busca, o resultado da pesquisa é exatamente o conjunto de alunos cujo nome ou matrícula contém o termo ignorando diferenças de maiúsculas/minúsculas.

**Validates: Requirements 1.11**

### Property 9: Cardinalidade máxima de uma Sala por Aluno

*For any* sequência de associações, cada Aluno referencia no máximo uma Sala (`salaId` é único ou nulo).

**Validates: Requirements 2.3**

### Property 10: Cardinalidade e unicidade do Cartão RFID

*For any* sequência de associações de cartão, cada Aluno referencia no máximo um cartão e cada cartão está associado a no máximo um Aluno; associar um cartão já em uso a outro Aluno é rejeitado e a associação existente permanece inalterada.

**Validates: Requirements 2.5, 2.8**

### Property 11: Criação e validação de Sala

*For any* dados de Sala, a criação é aceita apenas quando o nome tem 1 a 100 caracteres, não duplica outra Sala e a capacidade é inteiro entre 1 e 999; caso contrário é rejeitada com o erro correspondente.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4**

### Property 12: Associação respeita a capacidade da Sala

*For any* Sala e Aluno, associar quando a ocupação é menor que a capacidade incrementa a ocupação em exatamente 1; associar quando a ocupação é igual à capacidade é rejeitado e a ocupação permanece inalterada.

**Validates: Requirements 3.6, 3.7**

### Property 13: Edição de Sala não pode reduzir capacidade abaixo da ocupação

*For any* Sala com ocupação atual, editar para uma capacidade menor que a ocupação é rejeitado e a Sala mantém seus dados originais; edições válidas são persistidas.

**Validates: Requirements 3.8, 3.9**

### Property 14: Remoção de Sala desassocia alunos

*For any* Sala removida, nenhum Aluno permanece referenciando o `salaId` da Sala removida.

**Validates: Requirements 3.10**

### Property 15: Listagem de presença cobre os alunos da Sala com status

*For any* Sala e data válida, a lista de presença retorna exatamente os alunos associados à Sala, cada um com um Status_Presenca, e alunos sem registro naquela data aparecem como ausente.

**Validates: Requirements 4.1, 4.6**

### Property 16: Validação de data de presença

*For any* data anterior ao início do ano letivo, posterior à data atual ou malformada, a seleção de presença é rejeitada e o estado da tela é preservado.

**Validates: Requirements 4.2**

### Property 17: Definir status é um upsert idempotente

*For any* Aluno, Sala e data, definir um Status_Presenca cria o registro se não existir e atualiza o existente caso exista, sem nunca duplicar registros para a mesma tupla (aluno, sala, data); definir o mesmo status duas vezes produz o mesmo estado que defini-lo uma vez.

**Validates: Requirements 4.4**

### Property 18: Histórico do Aluno ordenado por data decrescente

*For any* conjunto de registros de um Aluno, a lista retornada está ordenada por data de forma decrescente.

**Validates: Requirements 4.7**

### Property 19: Registro guarda timestamp com segundos

*For any* definição de Status_Presenca, o registro resultante possui um `registradoEm` com precisão de segundos, formatável como HH:MM:SS.

**Validates: Requirements 4.8, 5.4**

### Property 20: Leitura RFID de cartão associado registra presença

*For any* Aluno com cartão associado e Sala definida, processar a leitura desse cartão cria (ou confirma) um registro com status presente para (aluno, sala, data da leitura) e retorna o nome do aluno com o horário da leitura.

**Validates: Requirements 5.1, 5.4**

### Property 21: Leitura de cartão não associado não cria registro

*For any* UID não associado a nenhum Aluno, processar a leitura não cria nenhum registro e retorna um resultado indicando que o cartão não está associado.

**Validates: Requirements 5.2**

### Property 22: Leitura duplicada é idempotente

*For any* Aluno que já possui registro presente na mesma Sala e data, processar novamente a leitura do seu cartão mantém o registro existente inalterado e não cria registro adicional.

**Validates: Requirements 5.3**

### Property 23: Leitura de Aluno sem Sala não cria registro

*For any* Aluno com cartão associado mas sem Sala definida, processar a leitura não cria nenhum registro e retorna um resultado indicando que o Aluno não está associado a nenhuma Sala.

**Validates: Requirements 5.5**

### Property 24: Relatório por período inclui apenas datas no intervalo inclusivo

*For any* conjunto de registros e período com data inicial ≤ data final, todo registro retornado tem data dentro do intervalo incluindo os limites, e nenhum registro dentro do intervalo é omitido.

**Validates: Requirements 6.1**

### Property 25: Relatório rejeita data inicial posterior à final

*For any* filtro em que a data inicial é posterior à data final, a geração do relatório é rejeitada e os filtros informados são preservados.

**Validates: Requirements 6.2**

### Property 26: Filtros combinados aplicam conjunção

*For any* conjunto de registros e combinação de filtros de período, Sala e Aluno, o resultado é exatamente o subconjunto de registros que satisfaz simultaneamente todos os filtros aplicados.

**Validates: Requirements 6.3, 6.4, 6.5**

### Property 27: Totais do relatório são consistentes

*For any* conjunto filtrado de registros, a soma de presentes, ausentes e justificados é igual ao total de registros do conjunto, e cada total corresponde à quantidade de registros com o respectivo Status_Presenca.

**Validates: Requirements 6.6**

### Property 28: Exatamente um item de navegação ativo por rota

*For any* rota autenticada conhecida, exatamente um item da barra lateral recebe o destaque de ativo, e esse item corresponde à rota atual.

**Validates: Requirements 7.3, 7.6**
