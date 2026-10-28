# 04. Rotas, `root.tsx`, `routes/`, `services/` e `testeGemini.ts`

## `app/routes.ts` (o mapa de endereços)
Lista todos os endereços do site e qual arquivo de `app/routes/` abre em cada um:

| Endereço | Arquivo | Tela |
|---|---|---|
| `/` | `routes/_index.tsx` | Login |
| `/log` | `routes/Log.tsx` | Login (endereço alternativo) |
| `/home` | `routes/home.tsx` | Início (Welcome) |
| `/perfil` | `routes/perfil.tsx` | Perfil |
| `/alunos` | `routes/alunos.tsx` | Alunos |
| `/ia` | `routes/IA.tsx` | Assistente de IA |
| `/presenca` | `routes/presenca.tsx` | Presenças |
| `/relatorios` | `routes/relatorios.tsx` | Relatórios |
| `/salas` | `routes/salas.tsx` | Salas |
| `/settings` | `routes/settings.tsx` | Configurações |
| `/team` | `routes/team.tsx` | Funcionários (Team) |

`index(...)` é a rota da raiz `/`; `route("caminho", "arquivo")` cria as demais.

## `app/routes/*.tsx` (fichas finas das rotas)
**Por que existem separadas de `pages/`:** o React Router exige um arquivo por rota. Cada um faz só 3 coisas:
1. `meta()`: define o título da aba do navegador ("Educontrol - Alunos") e a descrição.
2. Importa a tela real da pasta `pages/`.
3. Envolve a tela em `<RotaProtegida permissao="pagina.xxx">` (menos o login, que é público).

Assim a "lógica da tela" (em `pages/`) fica separada da "configuração da rota" (em `routes/`).

## `app/root.tsx` (a casca de todas as páginas)
- `links`: carrega a fonte **Inter** do Google Fonts.
- `Layout`: monta o HTML base (`<html>`, `<head>`, `<body>`), com `Meta`, `Links`, `Scripts` e `ScrollRestoration` (lembrar a rolagem ao voltar).
- `App`: devolve `<Outlet />`, o "buraco" onde a rota atual aparece.
- `ErrorBoundary`: tela de erro (404 ou erro inesperado). No modo dev mostra o detalhe do erro.

## `app/app.css` (estilos globais)
356 linhas. Importa o Tailwind e define classes próprias, no `@layer components`, usando prefixo `app-` (ex.: `app-card`, `app-input`, `app-button-primary`, `app-button-filtrar`, `app-login-*`). Elas guardam o **visual padrão**: cores petróleo/teal, bordas, sombras, modo escuro (`dark:`). Por quê: se amanhã a cor do botão mudar, muda num lugar só. O guia visual completo está em `spec-design.md`.

## `app/services/iaService.ts`
Camada fina: a tela de IA chama `enviarParaIA(pergunta, historico, atualizarResposta, perfil)` e este arquivo repassa para `testarGemini`. **Por que existe:** quando a IA for movida para o backend (Etapa 13), só este arquivo precisa mudar para chamar a API do servidor; a tela de IA não muda.

## `app/testeGemini.ts` (conversa com o Gemini)
- Cria o cliente `GoogleGenAI` com a chave `VITE_GEMINI_API_KEY` (vem do arquivo `.env`).
- `instrucaoPorPerfil(perfil)`: se o usuário é secretário, adiciona regras extras ao prompt do sistema (não revelar contas, segurança, RFID, dados de funcionários nem ajudar a virar administrador).
- `testarGemini(...)`:
  1. Converte o histórico do chat no formato do Gemini (`role: "user"` ou `"model"`).
  2. Acrescenta a pergunta nova.
  3. Chama `generateContentStream` com o modelo `gemini-3.5-flash-lite` e uma **instrução de sistema** (responder em português, não inventar dados, avisar que não tem acesso ao banco).
  4. Recebe a resposta em pedacinhos (`for await`) e chama `atualizarResposta` a cada pedaço, criando o efeito de "digitando".
- **Ponto de atenção (segurança):** como o prefixo `VITE_` expõe a chave no navegador, qualquer visitante poderia copiá-la. Por isso a IA deve ir para o backend na Etapa 13. O nome "teste" vem do início do projeto; hoje é o arquivo de produção da IA.
