# 02. Pasta `app/auth` (quem é o usuário e o que ele pode fazer)

"Auth" vem de *authentication/authorization*: **autenticação** (quem é você?) e **autorização** (o que você pode fazer?). São 3 arquivos pequenos, mas toda a segurança do frontend passa por eles.

> Importante para a banca: essa segurança é só de **vitrine**. Qualquer pessoa técnica consegue mexer no navegador. Quem vai proteger de verdade é o backend (Java/Spring Boot), que deve conferir tudo de novo. Isso está registrado como pendência da Etapa 13.

---

## `sessao.ts` (a conta e a sessão)

**Por que existe:** guardar quem está logado e fornecer as contas fictícias de teste.

- `type Usuario`: o "molde" de um usuário (nome, e-mail, senha, perfil, cargo, telefone, membroDesde, senhaAlteradaEm, ultimoAcessoEm). O TypeScript usa esse molde para avisar se faltar algum campo.
- `CONTAS`: lista de duas contas fictícias:
  - Administrador: `admin@educontrol.com` / `244466666`.
  - Secretário: `secretario@educontrol.com` / `secretaria123`.
  Quando houver backend, essa lista some e o login consulta o servidor.
- `CHAVE = "educontrol:usuario"`: o "nome da gaveta" onde o usuário fica salvo no navegador.
- `fazerLogin(email, senha)`: limpa o e-mail (`trim` tira espaços, `toLowerCase` deixa minúsculo), percorre as contas com um `for` e compara e-mail e senha. Se achar, cria uma cópia do usuário com `ultimoAcessoEm` = agora, salva e devolve. Se não achar, devolve `null` (a tela de Login usa isso para mostrar "E-mail ou senha incorretos.").
- `salvarUsuario(usuario)`: grava no **`sessionStorage`**. Diferente do `localStorage`, ele se apaga quando a aba fecha: ao fechar o navegador, o usuário precisa entrar de novo.
- `pegarUsuario()`: lê da gaveta. Tem um teste `typeof window === "undefined"` porque o site também roda no servidor (SSR), onde `window` e o storage não existem; nesse caso devolve `null`.
- `sairDaConta()`: apaga a gaveta (logout).

## `permissoes.ts` (o que cada perfil pode)

**Por que existe:** em vez de espalhar `if (perfil === "admin")` por todas as telas, existe uma regra só, num lugar só.

- `PERMISSOES_SECRETARIO`: lista de "chaves" que o secretário tem, escritas como `area.acao` (ex.: `pagina.alunos` = pode abrir a página de alunos; `alunos.cadastrar` = pode cadastrar aluno; `presenca.registrar`).
- `temPermissao(perfil, permissao)`: se o perfil é `administrador` devolve `true` para tudo; se é `secretario`, devolve `true` só se a chave estiver na lista; qualquer outro caso, `false`.
- `nomeDoPerfil(perfil)`: troca `administrador`/`secretario` por "Administrador"/"Secretário" para mostrar bonito na tela.

Coisas que **só o administrador** tem (não estão na lista do secretário): `salas.gerenciar`, `alunos.excluir`, `usuarios.gerenciar` (cadastrar funcionário), `configuracoes.rfid` (ligar/desligar leitor), regras da escola, segurança.

## `RotaProtegida.tsx` (o porteiro das páginas)

**Por que existe:** impedir que alguém digite `/alunos` na barra do navegador sem estar logado ou sem permissão.

Como funciona, passo a passo:
1. Recebe duas coisas: a `permissao` exigida pela página e o conteúdo (`children`).
2. Começa com `carregado = false` e só vira `true` dentro de um `useEffect`. O `useEffect` só roda **no navegador**, nunca no servidor. Isso evita um erro clássico de SSR: o servidor não sabe quem está logado (o `sessionStorage` é do navegador).
3. Enquanto não carregou, devolve `null` (nada na tela).
4. Depois lê o usuário. Se for `null`, usa `<Navigate to="/">` (volta ao login). Se não tiver a permissão, `<Navigate to="/home">`.
5. Se tudo certo, mostra a página (`children`).

**Consequência útil:** dentro das páginas protegidas, ler `localStorage`/`sessionStorage` é seguro, porque elas só aparecem depois de montar no navegador.
