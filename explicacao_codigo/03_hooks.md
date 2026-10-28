# 03. Pasta `app/hooks` (lógicas reutilizáveis do React)

Um **hook** é uma função cujo nome começa com `use` e que usa recursos do React (como `useState`). Servem para não repetir a mesma lógica em várias telas. Aqui há 3.

## `useUsuario.ts`
**Para que serve:** qualquer tela que precise saber "quem é o usuário e o que ele pode" chama `const { usuario, pode, sair } = useUsuario()`.

- `useState(pegarUsuario)`: guarda o usuário na memória da tela (e dispara nova desenhada quando muda).
- `perfil`: pega só o campo `perfil` do usuário (ou `null`).
- `pode(permissao)`: atalho para `temPermissao(perfil, permissao)`. Nas telas fica assim: `if (pode("alunos.cadastrar")) { mostra o botão }`.
- `atualizarUsuario(dados)`: junta os dados novos ao usuário (`{ ...usuario, ...dados }`), salva na sessão e atualiza a tela. Usado no Perfil ao editar nome/telefone.
- `sair()`: apaga a sessão e zera o usuário.

## `usePaginacao.ts`
**Para que serve:** dividir listas grandes em páginas (de 8 itens por padrão) com os botões "anterior / próxima".

- Recebe a `lista` e o `tamanho` do bloco.
- Usa `dividirEmBlocos` (em `utils/paginacao.ts`) para cortar a lista em pedaços.
- `pagina` (state) começa em 0. `paginaAtual` é a página corrigida: se a lista encolher (por causa de um filtro) e a página atual deixar de existir, ela volta para a última válida.
- Devolve: `bloco` (os itens da página), `paginaAtual`, `totalPaginas`, `irPara(n)` (muda de página sem passar dos limites) e `totalItens`.
- Os componentes `Paginacao.tsx` usam esses valores para desenhar os botões.

## `useSidebarRecolhida.ts`
**Para que serve:** lembrar se o menu lateral (sidebar) está aberto ou recolhido, mesmo depois de trocar de página ou recarregar.

- Chave `educontrol:sidebar-recolhida` no `localStorage`; "1" = recolhida, "0" = aberta.
- `lerSalvo()` é executada na criação do state. Tem o teste de `window` (por causa do servidor).
- `alternar()` inverte o valor, atualiza a tela e grava no `localStorage`.
