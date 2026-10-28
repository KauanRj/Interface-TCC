# 07. Pasta `app/components` (as peças reutilizáveis)

**O que é um componente:** uma função que devolve um pedaço de tela (JSX, que parece HTML). Em vez de repetir o mesmo código em várias páginas, cria-se uma peça e usa-se onde precisar. Esta pasta tem as peças que aparecem em **mais de uma página** ou que são **janelas (modais)**.

## Palavras que aparecem em todos os arquivos
- **props**: informações que a página passa para o componente, como parâmetros de uma função. Ex.: `<NovoAluno aoFechar={...} aoSalvar={...} />`. Os nomes que começam com `ao` (aoFechar, aoSalvar, aoEscolher) são **funções que a página entrega para o componente chamar quando algo acontece**.
- **`useState`**: memória da tela. Quando o valor muda, o React redesenha. Ex.: o texto digitado num campo.
- **`useEffect`**: "faça isso depois que a tela apareceu". Usado aqui para escutar a tecla **Esc**.
- **Modal**: janela por cima da página. Todos os modais deste projeto seguem o mesmo padrão:
  1. Fundo escuro `fixed inset-0 z-50 bg-black/60 backdrop-blur-sm` (cobre a tela toda).
  2. Clicar no fundo fecha (`onClick={aoFechar}`).
  3. Clicar dentro **não** fecha (`stopPropagation`).
  4. Tecla Esc fecha (o `useEffect` adiciona e depois remove o "ouvinte" de teclado).
  5. `role="dialog"` e `aria-modal` informam leitores de tela que é uma janela.

---

## `CampoFormulario.tsx`
Peça mínima: um rótulo (label), o campo que vier dentro (`children`) e, se houver, a mensagem de erro em vermelho. Todos os formulários (Novo aluno, Nova sala, Novo funcionário) usam para ter o mesmo visual.

## `Paginacao.tsx`
Os botões "‹ 1 2 3 4 5 ›" e o texto "Mostrando 1–8 de 36 alunos".
- Se há só uma página, não aparece (`return null`).
- Calcula o primeiro e o último item da página.
- Mostra no máximo 5 botões numerados ao redor da página atual (o `for` monta a lista `botoes`).
- Setas ficam desabilitadas no começo/fim. O botão da página atual tem destaque.
- Recebe `irPara` do hook `usePaginacao`.

## `Sidebar.tsx` (menu lateral)
- Recebe `ativo` (qual rota destacar) e usa `useUsuario` e `useSidebarRecolhida`.
- `criarLink(rota, texto, icone, permissao)`: só desenha o link **se o usuário tem a permissão**. Por isso o secretário não vê o que não pode. O item ativo recebe a classe `app-nav-active`.
- Quando está **recolhida** mostra só os ícones (72px de largura) e usa o texto como `title` (dica ao passar o mouse).
- `sairDoSistema()`: chama `sair()` e vai para `/log`.
- Divide o menu em: páginas principais, Settings, e embaixo Perfil e Log out.

## `Notificacoes.tsx` (o sino)
- Mostra o ícone de sino com um **número vermelho** de avisos não lidos.
- Ao clicar, abre um painel. Ele é desenhado com **`createPortal`** direto no `document.body`: sem isso o painel ficava "por baixo" dos cards da página (cada card cria uma camada própria). A posição é calculada com `getBoundingClientRect()` (posição do botão na tela) e o painel usa `fixed z-[100]`.
- Lê os avisos de `criarNotificacoes()` e os lidos de `lerLidas()`.
- `marcarLida`, `marcarTodas`, `abrirNotificacao` (marca como lida, fecha e navega para `item.rota`).
- Esc e clique fora fecham. Se as notificações estão desligadas em Configurações, mostra aviso.

## `BuscaGlobal.tsx` (busca do topo da tela inicial)
- Campo de texto + lista de resultados que aparece por cima (portal, igual ao sino).
- Estados: `texto`, `aberto`, `indice` (item destacado) e `posicao`.
- `resultados = buscarTudo(texto, podeVer)` recalcula a cada letra (a partir de 2 letras).
- Teclado: seta para baixo/cima muda o destaque (`% resultados.length` dá a volta), Enter escolhe, Esc fecha.
- `onMouseDown={e.preventDefault()}` na lista evita que o campo perca o foco (e a lista suma) antes do clique ser registrado.
- `escolher(resultado)` limpa o campo e chama `aoEscolher`; a tela inicial decide se abre detalhes do aluno, do funcionário ou vai para Salas.

## `LeitorRfid.tsx` (card do leitor na tela inicial)
- Mostra se o leitor está **Ativo/Inativo** (bolinha verde/vermelha).
- O botão "Desativar/Ativar leitor" só aparece se `podeAlterar` (admin).
- Campo "Número do cartão" aceita só dígitos (`replace(/\D/g, "")`, até 10) e fica desabilitado se o leitor está inativo; Enter também dispara.
- `simular()` chama `lerCartao(cartao)`; mostra a mensagem verde (sucesso) ou vermelha (erro); se deu certo, limpa o campo e chama `aoLer()` para a tela inicial recalcular os números.
- É a **simulação** do hardware: no mundo real o leitor RFID manda o número do cartão para o backend.

## `RegistrarPresenca.tsx` (modal da chamada)
- Lista todos os alunos de hoje (`alunosDeHoje()`) com botões **Presente / Atrasado / Justificado / Ausente** e o horário de entrada.
- `rascunho`: cópia da chamada em edição. Nada é gravado até clicar em **Salvar presenças**.
- Filtros por turma e nome.
- `escolherStatus`: ao marcar Presente/Atrasado sugere a hora atual (`horaAgora()`), mantendo a hora anterior se já existia.
- `marcarPendentesComoPresentes`: botão de atalho para quem ainda não foi marcado.
- `salvar()`: compara cada aluno com o que já estava, valida (Presente/Atrasado exige horário), grava só os alterados com `salvarRegistros` e avisa a página (`aoSalvar(quantidade)`). Se nada mudou: "Nenhuma alteração para salvar."
- `podeCorrigir`: se o usuário não pode corrigir presenças já registradas, os botões desses alunos ficam travados.

## `NovoAluno.tsx`, `NovaSala.tsx`, `NovoFuncionario.tsx` (formulários de cadastro)
Todos seguem o mesmo roteiro:
1. `form` (state): um objeto com todos os campos; `mudar(campo, valor)` altera um campo.
2. `salvar()` monta um objeto `novosErros` chamando as funções de `utils/validacoes.ts`.
3. Procura duplicados (aluno com mesmo nome na turma; CPF repetido; cartão repetido; sala com mesmo nome; turma já em outra sala; funcionário com mesmo nome).
4. Se existe qualquer erro, mostra "Corrija os campos destacados." e para.
5. Se tudo certo, chama `cadastrarX` (grava no localStorage) e `aoSalvar(...)` para a página atualizar a lista e mostrar o aviso verde.

Detalhes de cada um:
- **Novo aluno**: nascimento entre 5 e 20 anos, CPF com dígito verificador, cartão RFID obrigatório (4 a 10 dígitos, único), responsável (nome, parentesco, telefone, e-mail) e endereço. A máscara de CPF e telefone é aplicada enquanto digita.
- **Nova sala**: nome único (até 30 letras), capacidade inteira de 1 a 100, andar, status, e **uma turma só pode estar em uma sala**.
- **Novo funcionário**: nascimento entre 18 e 75 anos; vínculo Efetivo/Contratado; o campo "Fim do contrato" **só aparece** se for Contratado e precisa ser depois da admissão; admissão não pode ser futura.

## `DetalhesAluno.tsx` e `DetalhesFuncionario.tsx` (janelas "•••")
- Mostram todos os dados organizados em blocos (aluno / responsável / frequência; funcionário / vínculo / contato).
- Componente interno `Campo`: rótulo pequeno em cima e valor embaixo.
- **CPF mascarado** com botão do olho (`cpfVisivel`): proteção de dados pessoais (LGPD).
- **Editar contato** (se `podeEditar`): troca os textos por campos, valida e salva no localStorage (`salvarContato`). Mostra aviso verde: a gravação definitiva depende da API.
- Frequência do aluno: presentes, atrasos, faltas e justificadas dos últimos 40 dias e tabela com os 5 registros mais recentes.
- Botões "Excluir aluno" e "Desligar funcionário" aparecem só para quem tem permissão, mas ficam **desabilitados** até existir backend.
- Funcionário: o "Fim do contrato" só aparece se o vínculo for Contratado.

## `GerarRelatorio.tsx` (modal de exportação)
- Escolha entre **Frequência** (um registro por aluno e dia, respeitando os filtros da página) e **Alunos** (presença, média, situação).
- Mostra o período, a turma e quantas linhas terá o arquivo; se for 0, desabilita o botão ("Não há dados com esses filtros").
- `baixar()` monta o CSV com `montarCsv` e baixa com `baixarCsv`; depois chama `aoGerar(nome, quantidade)` para a página mostrar o aviso.
