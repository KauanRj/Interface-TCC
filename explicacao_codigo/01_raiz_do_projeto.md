# 01. Raiz do projeto (a pasta `front_sanico`)

Antes de entrar na pasta `app/`, vale entender os arquivos que ficam soltos na raiz. Eles não são "telas": são a configuração que faz o site funcionar.

## Como o site funciona, em uma frase
O EduControl é um site feito com **React** (biblioteca para montar telas com peças reutilizáveis) usando o **React Router** em "modo framework" (ele cuida das rotas, ou seja, dos endereços `/home`, `/alunos`...) e o **Tailwind** (classes de CSS escritas direto no HTML). Tudo é escrito em **TypeScript** (JavaScript com tipos, que avisa erros antes de rodar).

## Arquivos da raiz

| Arquivo / pasta | Para que serve | Por que existe |
|---|---|---|
| `package.json` | Lista as bibliotecas que o projeto usa e os comandos (`npm run dev`, `npm run build`...). | O npm precisa dele para instalar tudo e iniciar o site. |
| `package-lock.json` | "Foto" exata das versões instaladas. | Garante que todo computador instale as mesmas versões. Não se mexe à mão. |
| `node_modules/` | Onde ficam as bibliotecas baixadas. | Criada pelo `npm install`. Não vai para o GitHub nem para a banca. |
| `tsconfig.json` | Regras do TypeScript (modo `strict`, atalho `~` que aponta para a pasta `app`). | É por causa dele que se escreve `~/utils/filtros` em vez de `../../utils/filtros`. |
| `vite.config.ts` | Configura o Vite (programa que "empacota" o site) com os plugins do Tailwind e do React Router. | Sem ele o site não compila. |
| `react-router.config.ts` | Liga o modo `ssr: true` (a página já chega montada do servidor). | Define como o React Router se comporta. |
| `Dockerfile` | Receita para empacotar o site em um contêiner Docker. | Para publicar em um servidor depois (Etapa 13). |
| `README.md` | Texto padrão do modelo (template) do React Router. | Veio pronto; pode ser reescrito para o TCC. |
| `spec-design.md` | Especificação de design do projeto. | Registro do que foi planejado para as telas. |
| `build/` | Resultado do `npm run build` (site pronto para produção). | Gerada automaticamente. Pode apagar e gerar de novo. |
| `docs/BD/` | `ddl.sql` (criação das tabelas) e `DML.sql` (dados de exemplo). | Rascunho do banco de dados. Atenção: o `ddl.sql` está escrito em sintaxe MySQL (`AUTO_INCREMENT`, `USE`) e tem vírgulas faltando/sobrando; como o plano é PostgreSQL, ele será refeito na Etapa 13. |
| `public/` | Arquivos que o navegador pega direto: `favicon.ico` (ícone da aba), `lohran.png` e `lohran-avatar.png` (imagens). | Imagens estáticas. |
| `.kiro/` | Anotações do projeto, entre elas `fontes.md` (bibliografia). | Documentação do TCC, não faz parte do site. |
| `app/` | **Todo o código do site.** | Explicado nos arquivos seguintes. |

## Comandos do `package.json`
- `npm run dev`: liga o site em modo desenvolvimento (atualiza sozinho quando você salva um arquivo).
- `npm run build`: gera a versão final em `build/`.
- `npm run start`: roda a versão gerada.
- `npm run typecheck`: só confere os tipos do TypeScript, sem rodar o site.

## Bibliotecas principais (dependencies)
- `react`, `react-dom`: o React em si.
- `react-router`, `@react-router/*`: rotas e servidor.
- `lucide-react`: ícones (olho, sino, lupa...).
- `recharts`: gráficos (linhas, rosca).
- `@google/genai` e `@google/generative-ai`: conversa com o Gemini no assistente de IA.
- `isbot`: ajuda o servidor a reconhecer robôs de busca.
- `react-native`: **não é usado** no site (sobrou de um import automático que já removemos do Login). Pode ser retirado do `package.json` quando for conveniente.

## Fluxo geral de uma visita ao site
1. O navegador abre `/`. O React Router vê em `app/routes.ts` que `/` é a tela de **Login**.
2. Ao entrar, o login grava o usuário no `sessionStorage` e manda para `/home`.
3. Toda rota interna é envolvida por `RotaProtegida`, que confere se há usuário e se ele tem permissão.
4. As telas leem os dados fictícios (`app/data`), aplicam regras (`app/utils`) e guardam as mudanças do usuário no `localStorage` (simulação até o backend existir).
