# 05. Pasta `app/data` (dados fictícios)

**Por que existe:** ainda não há banco de dados. Estes arquivos fazem o papel do banco para o site parecer real. Quando o backend existir, eles serão substituídos por chamadas à API. Todos os nomes, CPFs e telefones são **inventados** (os dígitos vêm de uma conta matemática, não de pessoas reais).

## `alunosFicticios.ts`
- `type Aluno`: id, nome, turma, presença (%), média, situação (Bom / Em atenção / Risco), `statusHoje` (Presente, Atrasado, Justificado, Ausente, Pendente) e `cartao` (número do cartão RFID).
- `ALUNOS_FICTICIOS`: 36 alunos. Cartões de 1001 a 1035 (id + 1000). O id 36, **"Aluno Teste RFID"**, tem o cartão `0001` e serve para testar o leitor.
- É a **fonte base**: Alunos, Presenças, Relatórios, Notificações e Busca partem dela (junto com os alunos novos cadastrados).

## `presencasFicticias.ts`
- `gerarPresencas()`: cria o histórico dos **últimos 40 dias**, para cada aluno.
  - Pula sábado e domingo (exceto "hoje").
  - Para hoje usa o `statusHoje` do aluno.
  - Para os outros dias faz um "sorteio previsível" `(id*31 + dias*17) % 100`: se for menor que a % de presença do aluno, ele esteve Presente (e de vez em quando Atrasado); senão, Ausente (às vezes Justificado). Previsível = sempre o mesmo resultado, sem aleatoriedade, bom para testes.
  - Gera a hora de entrada (07:0x para Presente, 07:20+ para Atrasado, "—" nos demais).
- `PRESENCAS_FICTICIAS`: o resultado já pronto, usado nas telas de Presenças, Relatórios e nos gráficos.

## `detalhesFicticios.ts`
- `detalhesDoAluno(aluno)`: inventa os dados completos de um aluno a partir do id e do nome: matrícula, data de matrícula, data de nascimento (pela série), idade, CPF fictício, turno, responsável (nome, parentesco, telefone, e-mail) e endereço em Santa Rita do Sapucaí.
- `digitosFicticios(id, tamanho)`: gerador de dígitos "aleatórios" mas repetíveis (conta com multiplicação e resto da divisão). Garante que o mesmo aluno sempre tem o mesmo CPF.
- Usado por `utils/detalhesAluno.ts` para mostrar o modal de detalhes.

## `funcionariosFicticios.ts`
- `FUNCIONARIOS_BASE`: 5 funcionários (cargo, setor, status, **vínculo** Efetivo ou Contratado).
- `detalhesDoFuncionario(funcionario)`: dados completos fictícios (matrícula "F..", nascimento, CPF, admissão, **fim do contrato só se for Contratado**, jornada de 24h para professor e 40h para os demais, telefone, e-mail, endereço).

## `salasFicticias.ts`
- `SALAS_BASE`: 4 salas (nome, capacidade, andar, turma e `cor`, que na verdade é o **status**: Em uso, Em manutenção, Disponível). O nome `cor` ficou do começo do projeto, quando o status era só uma cor.
