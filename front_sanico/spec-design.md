# Design System — EduControl

> **Escopo deste documento:** referência visual do Design System **atual** do EduControl. É documentação apenas — nenhuma regra aqui altera código, componentes, CSS ou layout do projeto. Serve para orientar futuros desenvolvimentos e manter consistência visual.
>
> **Stack de referência:** React 19 + React Router v7 (framework mode), TypeScript/TSX, Tailwind CSS v4 (`@tailwindcss/vite`) e ícones `lucide-react`. Os tokens de estilo estão centralizados em `app/app.css` dentro de `@layer components`, e a tipografia é carregada via Google Fonts (Inter).

---

## 1. Identidade visual e conceito

O **EduControl** é uma plataforma de **gestão escolar** com integração de presença via RFID. A identidade transmite **organização, confiança e tecnologia**, apoiada em uma paleta de **verde/azul petróleo** combinada com um **verde-água (teal) de destaque**.

Conceitos-chave do visual:

- **Petróleo como cor institucional** — transmite seriedade e estabilidade (usado na sidebar, botões primários e realces de foco).
- **Teal como cor de energia/ação** — usado em estados ativos, hovers e ícones de destaque.
- **Superfícies limpas com profundidade** — cartões e cabeçalhos usam sombras suaves e bordas sutis para criar hierarquia sem poluição visual.
- **Dark Mode nativo** — o produto foi pensado para funcionar de forma equivalente em tema claro e escuro, com alternância automática (ver seção 20).

A marca é escrita como uma palavra composta com diferenciação visual: **"Edu"** (neutro) + **"Control"** (petróleo/teal). O ícone da marca é o `GraduationCap` do `lucide-react`.

---

## 2. Paleta de cores

As cores abaixo já existem no projeto (extraídas de `app/app.css` e `app/pages/logout/Log.tsx`). A tabela indica o papel de cada uma e o comportamento entre temas.

### 2.1 Cores institucionais e de marca

| Cor | Hex | Papel | Comportamento entre temas |
|-----|-----|-------|---------------------------|
| Petróleo (institucional) | `#0d4c5c` | Cor primária: sidebar, botão "Entrar", card forte, realce de foco de inputs no Light | Usada como base sólida em ambos os temas; no Light também aparece em anéis de foco (`focus:ring-[#0d4c5c]/20`) |
| Teal (destaque/ação) | `#22c7a9` | Estados ativos, hovers, ícones de destaque, "Control" e "vindo" no Dark | Predominante como acento; no Dark assume o papel de cor viva de interação |
| Verde petróleo (marca — Light) | `#0d7f70` | "vindo" e ícones de features no Light Mode | Par claro do teal; troca por `#22c7a9` no Dark |
| Verde petróleo alternativo | `#0d8f70` / `#0d8f7b` | "Control" no Light (`app-login-logo-control`) | Variante de marca no Light; troca por `#22c7a9` no Dark |

> **Observação de consistência:** existem três tons próximos de verde petróleo em uso no Light Mode (`#0d7f70`, `#0d8f70`, `#0d8f7b`). Recomenda-se, em evoluções futuras, padronizar em **um único token** de "verde petróleo Light" para evitar divergência. Este documento apenas registra o estado atual.

### 2.2 Superfícies e fundos (Dark Mode)

| Cor | Hex | Papel |
|-----|-----|-------|
| Fundo base (mais escuro) | `#03080c` | Fundo do `body`, `app-shell`, grids de conteúdo no Dark |
| Superfície de header | `#071015` | Fundo do `app-header` no Dark (com opacidade `/95`) |
| Superfície de card | `#0a141a` | Fundo de `app-card` no Dark |
| Superfície de input/avatar | `#0c171d` | Inputs, avatar e botão Google no Dark |
| Superfície elevada (hover card) | `#0d1a21` | Fundo de `app-card` em hover no Dark |
| Vidro de login (Dark) | `#050b0e` | Base translúcida dos blocos de marca/info do login no Dark (`/75`) |

### 2.3 Neutros

| Cor | Hex | Papel | Tema |
|-----|-----|-------|------|
| Branco | `#ffffff` | Texto sobre petróleo, superfícies de card e vidro no Light | Ambos |
| Cinza claro de fundo | `#f3f4f6` (`bg-gray-100`) | Fundo base do Light Mode (`app-shell`, grids) | Light |
| Texto claro no Dark | `#edf7f4` | Cor de texto padrão do `body` no Dark | Dark |
| Título forte no Dark | `#f5fffc` | Títulos e textos de alto contraste no Dark | Dark |

### 2.4 Acentos auxiliares (texto de apoio no Dark)

| Cor | Hex | Papel |
|-----|-----|-------|
| Teal claro (foco Dark) | `#45dbc2` | Borda/anel de foco de inputs, hovers de card/avatar no Dark |
| Verde-menta claro | `#7ff5df` | Anéis e realces do logo-mark e navegação ativa na sidebar |
| Texto secundário petróleo | `#b9d2cc` | Texto de links de navegação inativos e do botão "Entrar" |
| Texto mudo (Dark) | `#8fb1aa` | Texto auxiliar/"muted" no Dark |
| Cinza petróleo mudo | `#78948e` / `#8fb1aa` | Placeholders e textos secundários no Dark |
| Petróleo médio (login) | `#4f7f8a` → hover `#7aaeb8` | Link "Esqueceu sua senha?" e "sign in" |
| Dourado (foco login) | `#B59A72` | Borda/anel de foco dos inputs **específicos da tela de login** |

> **Nota:** o dourado `#B59A72` aparece apenas nos inputs do login (`Log.tsx`) e não faz parte da paleta institucional principal. Está registrado para fidelidade ao estado atual.

---

## 3. Cores por tema — Light Mode e Dark Mode

O tema é controlado pela estratégia `dark:` do Tailwind, e o `html` declara `color-scheme: light dark` (alternância automática — ver seção 20).

| Elemento | Light Mode | Dark Mode |
|----------|------------|-----------|
| Fundo da aplicação | `bg-gray-100` (`#f3f4f6`) | `#03080c` |
| Texto padrão | `text-gray-900` | `#edf7f4` |
| Header | `bg-white/95` | `#071015` com `/95` |
| Card | `bg-white` + `border-slate-200` | `#0a141a` + `border-white/10` |
| Input | `bg-gray-200`, borda `slate-300` | `#0c171d`, borda `white/10` |
| Foco de input | borda/anel `#0d4c5c` | borda/anel `#45dbc2` |
| Ícone de feature (login) | `#0d7f70` sobre `#0d7f70/10` | `#22c7a9` sobre `#22c7a9/10` |
| Marca "Control"/"vindo" | `#0d8f7b` / `#0d7f70` | `#22c7a9` |

---

## 4. Tipografia

- **Fonte principal:** **Inter** (Google Fonts), definida no token `--font-sans` em `@theme` e carregada em `app/root.tsx` via `<link>`.
- **Fonte de exibição:** títulos grandes do login usam `font-serif` (`app-login-title2`) para diferenciação editorial.
- **Antialiasing:** o `body` aplica `antialiased`.

```css
--font-sans: "Inter", ui-sans-serif, system-ui, sans-serif,
  "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
```

---

## 5. Hierarquia de títulos e textos

| Papel | Classe/base | Tamanho | Peso | Cor |
|-------|-------------|---------|------|-----|
| Título de header | `app-title` | `text-xl` → `sm:text-2xl` | `font-bold` | `text-gray-950` / dark `#f5fffc` |
| Título de card | `app-card-title` | `text-lg` | `font-bold` | `#f5fffc` |
| Título de login (form) | `app-login-title2` | `text-5xl` | `font-bold` (serif) | `text-gray-950` / dark `#f5fffc` |
| Boas-vindas (imagem) | `app-login-welcome-text` | `text-5xl` | `font-bold` | ver seção 19 |
| Texto auxiliar / muted | `app-muted` | `text-lg` | normal | `text-gray-500` / dark `#8fb1aa` |
| Descrição do login | `app-login-description` | `text-base` | normal | `text-gray-500` |
| Subtítulo da marca | `app-login-subtitle` | `text-base` | normal | `text-white/70` |

Regra geral de hierarquia: **títulos** em `font-bold` com maior contraste; **descrições/apoio** em cinza (Light) ou verde-petróleo dessaturado (Dark), sempre com contraste reduzido em relação ao título.

---

## 6. Espaçamentos

Padrões observados (escala Tailwind, base 4px):

- **Padding de sidebar:** `px-5 py-6`.
- **Padding de header/cards:** `p-4`.
- **Padding de itens de navegação:** `px-3 py-3`.
- **Gap entre itens de navegação:** `gap-2`; entre ícone e texto: `gap-3`.
- **Margens de grid:** `m-4` com `gap-4`.
- **Divisor da sidebar:** `my-7`.
- **Blocos de login:** `gap-5` entre marca e info; `mt-10` antes das features; `gap-4`/`mt-4` por feature.

---

## 7. Border radius

| Token | Uso |
|-------|-----|
| `rounded-lg` | Padrão geral: cards, inputs, botões, itens de navegação |
| `rounded-xl` | Ícones de feature do login (`app-login-feature-icon`) |
| `rounded-2xl` | Blocos de vidro do login (`app-login-brand`, `app-login-info`) |
| `rounded-full` | Logo-mark, avatar |

**Regra:** quanto maior a superfície/destaque, maior o raio. Elementos circulares (avatar, marcador de logo) usam `rounded-full`.

---

## 8. Sombras

| Contexto | Light | Dark |
|----------|-------|------|
| Sidebar | `shadow-2xl shadow-black/30` | igual |
| Header | `shadow-xl shadow-slate-200/70` | `shadow-black/30` |
| Card | `shadow-lg shadow-slate-200/70` → hover `shadow-xl shadow-slate-300/70` | `shadow-black/25` → hover `shadow-black/40` |
| Card forte | `shadow-lg shadow-black/25` → hover `shadow-xl shadow-black/35` | igual |
| Botão "Entrar" | `shadow-lg shadow-black/10` | igual |
| Blocos de login (vidro) | `shadow-2xl` | igual |

**Regra:** no Light as sombras são acinzentadas (`slate`) e suaves; no Dark são pretas com opacidade, reforçando a profundidade sobre fundos escuros. O **hover eleva** a sombra em um nível.

---

## 9. Bordas

- **Padrão Light:** `border-slate-200` / `border-slate-300` (inputs).
- **Padrão Dark:** `border-white/10` (sutil, translúcida).
- **Realce de marca:** cards usam borda petróleo/teal no hover (`hover:border-[#0d4c5c]/35` no Light; `dark:hover:border-[#45dbc2]/35` no Dark).
- **Sidebar:** `border-r border-white/10`.

**Regra:** bordas são discretas por padrão e ganham cor de marca apenas em interação (hover/focus).

---

## 10. Glassmorphism

O efeito de vidro é usado nos blocos da tela de login (`app-login-brand`, `app-login-info`) e, de forma leve, no header (`backdrop-blur`).

Regras do glassmorphism no EduControl:

- **Dark Mode:** o vidro deve ser **mais escuro, com aparência preta/azulada e translúcida** — base `#050b0e/75` com borda `white/10`.
- **Light Mode:** o vidro deve ser **predominantemente branco e translúcido** — base `white/85` com borda `white/40`.
- **Composição obrigatória:** **blur** (`backdrop-blur-2xl`), **transparência** (opacidade na cor de fundo), **bordas sutis** e **sombras** (`shadow-2xl`).
- **Legibilidade em primeiro lugar:** o efeito **não pode prejudicar a leitura**. O texto sobre vidro mantém alto contraste (`text-gray-900` no Light, `text-white` no Dark) e a transparência é limitada (75%–85% de opacidade da superfície) para garantir contraste.

```css
/* app-login-brand / app-login-info (estado atual) */
@apply border border-white/40 rounded-2xl shadow-2xl backdrop-blur-2xl
  bg-white/85 text-gray-900
  dark:border-white/10 dark:bg-[#050b0e]/75 dark:text-white;
```

---

## 11. Cards

Existem duas variantes principais:

**`app-card` (neutro):**

```css
@apply relative rounded-lg bg-white border border-slate-200 shadow-lg shadow-slate-200/70
  transition duration-200 hover:-translate-y-1 hover:border-[#0d4c5c]/35 hover:shadow-xl hover:shadow-slate-300/70
  dark:bg-[#0a141a] dark:border-white/10 dark:shadow-black/25 dark:hover:border-[#45dbc2]/35 dark:hover:bg-[#0d1a21] dark:hover:shadow-black/40;
```

**`app-card-strong` (destaque institucional):** fundo petróleo `#0d4c5c`, borda `#7ff5df/20`, texto branco — usado para o card em evidência (ex.: "Presenças" no dashboard).

- **Título de card:** `app-card-title` (`text-lg font-bold`, `#f5fffc`).
- **Interação:** hover eleva o card (`-translate-y-1`), aumenta a sombra e realça a borda com cor de marca.
- **Posicionamento interno:** os cards são `relative`, permitindo posicionar títulos/ícones com `absolute` (ex.: título no topo, ícone no rodapé).

---

## 12. Inputs

**Input padrão da aplicação (`app-input`):**

```css
@apply bg-gray-200 text-gray-900 placeholder-gray-500 text-sm rounded-lg h-10 px-4 outline-none border border-slate-300
  transition hover:border-[#0d4c5c]/50 focus:border-[#0d4c5c] focus:ring-2 focus:ring-[#0d4c5c]/20
  dark:bg-[#0c171d] dark:text-[#f5fffc] dark:placeholder-[#78948e] dark:border-white/10 dark:hover:border-[#45dbc2]/40 dark:focus:border-[#45dbc2] dark:focus:ring-[#45dbc2]/20;
```

- Altura fixa `h-10`, cantos `rounded-lg`, `outline-none` com anel de foco próprio.
- **Foco:** borda petróleo `#0d4c5c` + anel `/20` no Light; borda/anel teal `#45dbc2` no Dark.

**Inputs da tela de login** (definidos inline em `Log.tsx`): fundo `#151515`, borda `white/15`, texto branco, placeholder `gray-500`, e **foco dourado** `#B59A72` com anel `/30`. Ícones internos (`Mail`, `Lock`, `Eye`) posicionados com `absolute` e cor `text-gray-400`.

---

## 13. Botões

**Botão primário "Entrar" (`app-button-entrar`):**

```css
@apply relative w-full rounded-lg bg-[#0d4c5c] py-3 text-[#b9d2cc] font-semibold ring-1 ring-white/10 shadow-lg shadow-black/10
  transition hover:translate-x-1 hover:bg-[#22c7a9]/18 hover:text-white hover:ring-[#7ff5df]/20;
```

- Fundo petróleo, texto petróleo-claro, seta `ArrowRight` posicionada à direita (`absolute`).
- **Hover:** desloca levemente (`translate-x-1`), muda para tint teal e texto branco.

**Botão secundário "Entrar com o Google" (`app-google-button`):** superfície branca no Light / `#0c171d` no Dark, borda sutil, sombra leve que cresce no hover. Ícone "G" em `app-google-icon` (`text-xl font-bold`).

---

## 14. Estados de hover, focus e active

Padrões consistentes em todo o sistema:

| Estado | Comportamento |
|--------|---------------|
| **Hover (navegação)** | `translate-x-1`, fundo `white/[0.08]`, texto vira branco |
| **Hover (cards)** | `-translate-y-1`, sombra maior, borda com cor de marca |
| **Hover (botão primário)** | `translate-x-1`, tint teal, texto branco |
| **Hover (avatar)** | `scale-105` + anel de marca |
| **Focus (inputs)** | borda + `ring-2` na cor de marca (petróleo no Light, teal no Dark; dourado no login) |
| **Active (navegação)** | classe `app-nav-active`: fundo `#22c7a9/18`, `font-semibold`, anel `#7ff5df/20`, sombra |

Todas as transições usam `transition` (e `duration-200` nos cards) para suavidade.

---

## 15. Ícones

- **Biblioteca:** `lucide-react`.
- **Tamanhos comuns:** `size={20}` (navegação/header), `size={21}` (logo-mark), `size={22}` (features do login), `h-12 w-12` (ícone da marca `GraduationCap`).
- **Ícones em uso:** `LayoutDashboard`, `List`, `Filter`, `Mail`, `ClipboardCheck`, `DoorOpen`, `Users`, `Settings`, `HelpCircle`, `LogOut`, `BellRing`, `TrendingUp`, `TrendingDown`, `Home`, `GraduationCap`, `ArrowRight`, `Eye`, `Lock`, `BarChart3`, `Zap`.
- **Cor dos ícones:**
  - Na sidebar herdam a cor do link (petróleo-claro → branco no hover/ativo).
  - Ícones de feature do login: `#0d7f70` no Light, `#22c7a9` no Dark, sobre fundo tint `/10` com borda `/20`.
  - Ícones do header (ex.: `BellRing`) seguem `text-gray-900 dark:text-[#f5fffc]`.

**Regra de contraste:** o ícone precisa manter contraste nos dois temas — por isso os ícones de feature trocam de tom entre Light e Dark (ver seção 19).

---

## 16. Sidebar

Definida por `app-sidebar`:

```css
@apply w-55 min-h-screen bg-[#0d4c5c] text-white text-sm flex flex-col px-5 py-6 border-r border-white/10 shadow-2xl shadow-black/30;
```

- **Largura fixa** `w-55`, altura total, fundo **petróleo** em ambos os temas.
- **Marcador de logo (`app-logo-mark`):** círculo com tint teal `#22c7a9/15`, ícone `#7ff5df`, anel `/20` que intensifica no hover.
- **Itens de navegação:** `app-nav-link` (inativo), `app-nav-active` (ativo), `app-nav-link-between` (item com conteúdo à direita, ex.: "Team").
- **Divisor:** `app-divider` (`border-t border-white/10 my-7`) separa a navegação principal de "Settings".
- **Rodapé fixo:** "Ajuda" e "Log out" empurrados para baixo com um `flex-1` spacer.

---

## 17. Header

Definido por `app-header`:

```css
@apply w-full bg-white/95 p-4 shadow-xl shadow-slate-200/70 flex flex-wrap justify-between items-center gap-4 border-b border-slate-200 backdrop-blur transition
  dark:bg-[#071015]/95 dark:shadow-black/30 dark:border-white/10;
```

- Superfície translúcida com `backdrop-blur`, borda inferior sutil.
- **Estrutura em três blocos:** título + muted (`app-title` / `app-muted`), campo de busca (`app-input`), e ações à direita (sino `BellRing`, avatar `app-avatar`, nome do usuário).
- `flex-wrap` garante adaptação em telas menores.

---

## 18. Layouts

- **Casca da aplicação (`app-shell`):** `min-h-screen flex` com fundo do tema. Estrutura: **sidebar fixa + área de conteúdo em coluna** (header + grid).
- **Grid de conteúdo (`app-content-grid`):** `grid-cols-1` no mobile, `lg:grid-cols-3` no desktop, com `gap-4` e `m-4`. Cards podem ocupar múltiplas colunas (`lg:col-span-2`).
- **Grid de página (`app-page-grid`):** variante simples de página com `grid-cols-1`.
- **Login:** layout de **duas metades** (imagem à esquerda `w-1/2`, formulário à direita `w-1/2`) — detalhado na seção 19.

---

## 19. Padrões específicos da tela de login

A tela de login (`app/pages/logout/Log.tsx` + classes `app-login-*`) segue um padrão próprio.

### 19.1 Divisão imagem × formulário

- **Lado esquerdo (`w-1/2`, `hidden lg:block`):** imagem de fundo em tela cheia (`object-cover`), visível apenas a partir de `lg`. Sobre a imagem ficam os blocos de vidro.
- **Lado direito (`w-full lg:w-1/2`):** formulário centralizado (`max-w-md`), com título, campos, opções e botões.

### 19.2 Bloco da marca (`app-login-brand`)

Bloco de **vidro** separado (glassmorphism, seção 10) contendo o logo e o subtítulo "Gestão escolar". Largura ajustada ao conteúdo (`w-fit`).

### 19.3 Bloco de boas-vindas / conteúdo (`app-login-info`)

Bloco de **vidro** separado (`max-w-xl`) com o texto "Bem-vindo", a descrição e os **cards de funcionalidades**.

### 19.4 Ícone e escrita da marca

- **Ícone:** `GraduationCap` (`app-login-logo-icon`, `h-12 w-12`), cor `text-gray-900` no Light / `text-white` no Dark.
- **"Edu" e "Control" com diferenciação visual:**
  - `app-login-logo-edu`: `font-bold`, neutro (`text-gray-900` / dark `text-white`).
  - `app-login-logo-control`: `font-bold`, **verde petróleo** `#0d8f7b` no Light / **teal** `#22c7a9` no Dark.
- O mesmo padrão de diferenciação aparece em "Bem-" (neutro) + "vindo" (`#0d7f70` / `#22c7a9`).

### 19.5 Cards de funcionalidades (`app-login-feature`)

Cada feature combina um **ícone em cápsula** (`app-login-feature-icon`) + título + descrição:

- **Ícone em cápsula:** `h-10 w-10 rounded-xl`, fundo tint `/10`, borda `/20`, cor `#0d7f70` (Light) / `#22c7a9` (Dark).
- Features atuais: **Gestão completa** (`Users`), **Praticidade** (`BarChart3`), **Acompanhamento escolar** (`Zap`).

### 19.6 Contraste dos ícones nos dois temas

Os ícones de feature **trocam de tom** entre temas para preservar contraste: verde petróleo `#0d7f70` sobre fundo claro tint no Light, e teal `#22c7a9` sobre fundo escuro tint no Dark. Ícones internos dos inputs usam `text-gray-400`, legível sobre o fundo escuro dos campos de login.

### 19.7 Divisor e botão social

- **Divisor "ou continue" (`app-login-divider`):** duas linhas (`bg-gray-300` / dark `white/10`) com texto central mudo.
- **Botão Google (`app-google-button`):** ver seção 13.

---

## 20. Comportamento visual automático entre Light e Dark Mode

- O documento raiz (`app/root.tsx`) renderiza `<html lang="en">` e o CSS declara `html { color-scheme: light dark; }`, permitindo que o navegador aplique o esquema de cores conforme a preferência do sistema.
- Todo o Design System usa o prefixo **`dark:`** do Tailwind para definir o par claro/escuro de cada token. Ou seja, **a mesma classe descreve os dois temas** e a troca é automática conforme o tema ativo.
- **Regra para novos componentes:** sempre declarar o par `base` (Light) + `dark:` (Dark) para fundo, texto, borda, sombra e foco, seguindo a tabela da seção 3.

---

## 21. Responsividade

- **Breakpoints:** segue o padrão do Tailwind (`sm`, `lg` são os mais usados no projeto).
- **Login:** o painel de imagem é `hidden` e só aparece em `lg` (`lg:block`); o formulário ocupa a largura total no mobile e metade a partir de `lg`.
- **Header:** `flex-wrap` para reorganizar título, busca e ações em telas estreitas; título escala `text-xl` → `sm:text-2xl`.
- **Grid de conteúdo:** `grid-cols-1` no mobile → `lg:grid-cols-3` no desktop.
- **Busca no header:** `w-full max-w-80` para não ultrapassar o espaço disponível.

---

## 22. Acessibilidade e contraste

- **Contraste de texto:** títulos usam tons de alto contraste (`text-gray-950` / `#f5fffc`); textos de apoio usam cinza/petróleo dessaturado mas ainda legível. Sobre superfícies petróleo, o texto é branco ou petróleo-claro (`#b9d2cc`).
- **Foco visível:** inputs e elementos interativos têm **anel de foco** explícito (`focus:ring-2`) na cor de marca — essencial para navegação por teclado.
- **Ícones com significado:** imagens usam `alt` (ex.: `alt="Imagem de login"`, `alt="Lohran"`); labels de formulário usam `htmlFor` associado ao `id` do input.
- **Glassmorphism legível:** transparência limitada (75%–85%) e texto de alto contraste garantem leitura sobre o vidro (seção 10).
- **`color-scheme`:** declarar `light dark` melhora o contraste de elementos nativos (scrollbars, campos) conforme o tema.

> **Nota de verificação:** conformidade WCAG completa exige validação manual com ferramentas de contraste e testes com tecnologia assistiva. Este documento registra as práticas atuais, não uma auditoria formal.

---

## 23. Regras de consistência visual

Diretrizes para manter o Design System coeso em novos desenvolvimentos:

1. **Use os tokens existentes.** Prefira classes `app-*` de `app/app.css` a estilos inline; o login é a exceção histórica.
2. **Sempre defina o par Light + `dark:`** para fundo, texto, borda, sombra e foco.
3. **Petróleo (`#0d4c5c`) é institucional; teal (`#22c7a9`) é ação/destaque.** Não inverter os papéis.
4. **Raio padrão `rounded-lg`;** `2xl` só para vidro, `full` só para elementos circulares.
5. **Foco sempre visível** com anel na cor de marca (petróleo no Light, teal no Dark).
6. **Hover eleva** (sombra maior + leve translação) e **realça a borda** com cor de marca.
7. **Sombras acinzentadas no Light, pretas translúcidas no Dark.**
8. **Glassmorphism** só onde faz sentido (login/overlays), sempre preservando legibilidade.
9. **Ícones `lucide-react`** com tamanhos padronizados; trocar o tom entre temas quando o contraste exigir.
10. **Marca sempre como "Edu" + "Control"** com diferenciação visual e `GraduationCap`.

### Pendências de padronização registradas (não corrigir agora)

- Unificar os tons de verde petróleo do Light Mode (`#0d7f70`, `#0d8f70`, `#0d8f7b`) em um único token.
- Possível typo em `app-login-description` (`dark:text-[#fb1aa]` — cor de 5 dígitos; provavelmente `#8fb1aa`). Registrado para revisão futura.
- Inputs do login usam estilos inline e paleta própria (dourado `#B59A72`); avaliar migração para tokens `app-*` no futuro.

---

## 24. Referência rápida de tokens de cor

| Hex | Nome sugerido | Uso principal | Tema |
|-----|---------------|---------------|------|
| `#0d4c5c` | Petróleo institucional | Sidebar, botão primário, card forte, foco Light | Ambos |
| `#22c7a9` | Teal ação | Ativo, hover, destaque, marca no Dark | Ambos (acento) |
| `#0d7f70` | Verde petróleo Light | "vindo" e ícones de feature no Light | Light |
| `#0d8f7b` / `#0d8f70` | Verde petróleo Light (variantes) | "Control" no Light | Light |
| `#03080c` | Fundo base Dark | `body`, `app-shell`, grids | Dark |
| `#071015` | Superfície header Dark | `app-header` | Dark |
| `#0a141a` | Superfície card Dark | `app-card` | Dark |
| `#f3f4f6` | Cinza claro (`gray-100`) | Fundo base Light | Light |
| `#ffffff` | Branco | Cards/vidro Light, texto sobre petróleo | Ambos |
| `#45dbc2` | Teal claro | Foco/hover no Dark | Dark |
| `#7ff5df` | Verde-menta | Realces da sidebar (logo/ativo) | Ambos |
| `#edf7f4` / `#f5fffc` | Texto claro Dark | Texto/títulos no Dark | Dark |
| `#B59A72` | Dourado (login) | Foco dos inputs do login | Login |
```

