# Explicação do código do EduControl (frontend)

Esta pasta explica **todo o código do site** que está em `front_sanico`, em português simples, pasta por pasta e arquivo por arquivo. Ela fica **fora** do projeto de propósito: não entra no site, não é enviada no build e pode ser entregue à banca à parte.

## Ordem sugerida de leitura
1. [`01_raiz_do_projeto.md`](01_raiz_do_projeto.md): arquivos soltos da raiz (package.json, Vite, Docker, docs).
2. [`02_auth_login_e_permissoes.md`](02_auth_login_e_permissoes.md): quem é o usuário e o que ele pode fazer.
3. [`03_hooks.md`](03_hooks.md): lógicas reutilizáveis (usuário, paginação, sidebar).
4. [`04_rotas_root_e_servicos.md`](04_rotas_root_e_servicos.md): endereços do site, casca do HTML, CSS global e IA.
5. [`05_dados_ficticios.md`](05_dados_ficticios.md): os dados inventados que fazem o papel do banco.
6. [`06_utils_regras_e_funcoes.md`](06_utils_regras_e_funcoes.md): as regras do sistema (validações, chamada, RFID, relatórios, CSV...).
7. [`07_components_pecas_reutilizaveis.md`](07_components_pecas_reutilizaveis.md): modais, formulários, sino, busca, leitor RFID.
8. [`08_pages_as_telas.md`](08_pages_as_telas.md): cada tela e como ela junta tudo.
9. [`09_fluxos_glossario_e_pendencias.md`](09_fluxos_glossario_e_pendencias.md): como as peças se conectam em exemplos, glossário e o que falta.

## Mapa da pasta `app/`

```
app/
├── root.tsx          casca HTML do site (fonte, erro 404)
├── routes.ts         lista de endereços (/home, /alunos...)
├── app.css           estilos globais (classes app-*)
├── testeGemini.ts    conversa com o Gemini (IA)
├── routes/           1 arquivo por endereço: título da aba + RotaProtegida + tela
├── pages/            as telas de verdade (welcome, alunos, presencas, relatorios, salas, Team, perfil, settings, assistenteIA, logout)
├── components/       peças reutilizáveis e modais
├── hooks/            useUsuario, usePaginacao, useSidebarRecolhida
├── auth/             sessao, permissoes, RotaProtegida
├── utils/            regras e funções (sem desenho)
├── data/             dados fictícios
└── services/         iaService (camada entre a tela de IA e o Gemini/backend)
```

## A regra de ouro da organização
- **`pages/` e `components/`** desenham (HTML/JSX).
- **`utils/` e `hooks/`** pensam (contas, regras, validações).
- **`data/`** guarda os dados de exemplo.
- **`auth/`** decide quem entra e o que pode.
- Separar assim facilita testar, explicar e, na Etapa 13, trocar `data/` + `localStorage` por chamadas ao backend sem reescrever as telas.

## Estilo de código combinado no projeto
Código em estilo **básico**: `useState` simples, `if/else`, `for`, funções pequenas, sem Context, sem `useMemo/useCallback` e sem TypeScript avançado. Sem comentários no código (a explicação mora aqui).
