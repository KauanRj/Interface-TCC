# Requirements Document

## Introduction

Esta funcionalidade transforma o esqueleto estático de páginas do aplicativo de secretaria escolar (React Router v7 em framework mode, TypeScript/TSX, Tailwind CSS v4) em um sistema funcional que centraliza as informações dos alunos e integra a leitura de presença via RFID. O escopo cobre a gestão completa de alunos (CRUD com informações cadastrais completas), a gestão de salas e turmas, o registro e a visualização de presença, a integração de leitura RFID para registrar presença automaticamente e a geração de relatórios de presença. Também padroniza a navegação e o layout compartilhado das páginas existentes, substituindo a navegação por `<a href>` por navegação client-side do React Router e removendo a duplicação de barra lateral, cabeçalho e textos de placeholder.

## Glossary

- **Sistema_Secretaria**: Aplicação web de secretaria escolar responsável por gerenciar alunos, salas, turmas, presenças e relatórios.
- **Aluno**: Registro que representa um estudante matriculado, contendo dados cadastrais completos e um identificador de cartão RFID opcional.
- **Sala**: Registro que representa uma turma ou ambiente de aula, contendo identificação, capacidade e lista de alunos associados.
- **Registro_Presenca**: Registro que associa um Aluno, uma Sala, uma data e um horário a um status de presença.
- **Status_Presenca**: Valor que indica a condição de comparecimento de um Aluno, sendo um dos seguintes: presente, ausente ou justificado.
- **Cartao_RFID**: Identificador único gravado em um cartão físico e associado a no máximo um Aluno.
- **Leitor_RFID**: Componente que captura a identificação de um Cartao_RFID e envia essa identificação ao Sistema_Secretaria.
- **Modulo_Leitura_RFID**: Componente do Sistema_Secretaria que recebe a identificação de um Cartao_RFID e cria o Registro_Presenca correspondente.
- **Layout_Compartilhado**: Estrutura de interface comum a todas as páginas autenticadas, composta por barra lateral de navegação e cabeçalho.
- **Navegacao_Cliente**: Mecanismo de transição entre rotas por meio do componente `Link` do React Router, sem recarregar a página inteira.
- **Relatorio_Presenca**: Conjunto de dados agregados de presença filtrado por período, Sala ou Aluno.

## Requirements

### Requirement 1: Gestão de Alunos (CRUD)

**User Story:** Como secretário escolar, quero cadastrar, consultar, editar e remover alunos com suas informações completas, para manter os dados dos estudantes centralizados e atualizados.

#### Acceptance Criteria

1. WHEN o secretário submete o formulário de cadastro de Aluno com nome preenchido (1 a 100 caracteres), data de nascimento válida e não futura, matrícula preenchida (1 a 20 caracteres alfanuméricos) e nome do responsável preenchido (1 a 100 caracteres), THE Sistema_Secretaria SHALL criar um novo Aluno e exibir o Aluno na lista de alunos em até 2 segundos.
2. IF o secretário submete o formulário de cadastro de Aluno com o campo nome vazio ou com mais de 100 caracteres, THEN THE Sistema_Secretaria SHALL rejeitar o cadastro, preservar os dados já preenchidos no formulário e exibir uma mensagem indicando que o nome é obrigatório e deve ter entre 1 e 100 caracteres.
3. IF o secretário submete o formulário de cadastro de Aluno com a matrícula vazia, com mais de 20 caracteres, com caracteres não alfanuméricos ou já existente em outro Aluno, THEN THE Sistema_Secretaria SHALL rejeitar o cadastro, preservar os dados já preenchidos no formulário e exibir uma mensagem indicando o motivo da rejeição referente à matrícula.
4. IF o secretário submete o formulário de cadastro de Aluno com data de nascimento vazia, inválida ou posterior à data atual, THEN THE Sistema_Secretaria SHALL rejeitar o cadastro, preservar os dados já preenchidos no formulário e exibir uma mensagem indicando que a data de nascimento deve ser uma data válida e não futura.
5. WHEN o secretário abre a página de Alunos, THE Sistema_Secretaria SHALL exibir, em até 2 segundos, a lista de alunos cadastrados com nome, matrícula e Sala associada.
6. IF nenhum Aluno está cadastrado quando o secretário abre a página de Alunos, THEN THE Sistema_Secretaria SHALL exibir uma mensagem indicando que não há alunos cadastrados.
7. WHEN o secretário seleciona um Aluno na lista, THE Sistema_Secretaria SHALL exibir as informações cadastrais completas do Aluno selecionado, contendo nome completo, data de nascimento, matrícula, nome do responsável, telefone de contato, Sala associada e identificador do Cartao_RFID associado.
8. WHEN o secretário confirma a edição de um Aluno com nome (1 a 100 caracteres), data de nascimento válida e não futura, matrícula (1 a 20 caracteres alfanuméricos, não duplicada) e nome do responsável (1 a 100 caracteres), THE Sistema_Secretaria SHALL atualizar o Aluno e exibir os dados atualizados em até 2 segundos.
9. IF o secretário confirma a edição de um Aluno com algum campo inválido ou com matrícula já existente em outro Aluno, THEN THE Sistema_Secretaria SHALL rejeitar a edição, preservar os dados originais do Aluno e exibir uma mensagem indicando o motivo da rejeição.
10. WHEN o secretário confirma a remoção de um Aluno, THE Sistema_Secretaria SHALL remover o Aluno da lista de alunos em até 2 segundos.
11. WHEN o secretário digita um termo no campo de pesquisa da página de Alunos, THE Sistema_Secretaria SHALL exibir, em até 2 segundos, apenas os alunos cujo nome ou matrícula contém o termo informado, ignorando diferenças entre maiúsculas e minúsculas.
12. IF nenhum Aluno corresponde ao termo pesquisado, THEN THE Sistema_Secretaria SHALL exibir uma mensagem indicando que nenhum aluno foi encontrado para o termo informado.

### Requirement 2: Informações completas do Aluno

**User Story:** Como secretário escolar, quero armazenar informações cadastrais completas de cada aluno, para consultar dados pessoais, de contato e acadêmicos em um único lugar.

#### Acceptance Criteria

1. THE Sistema_Secretaria SHALL armazenar para cada Aluno os campos nome completo (1 a 150 caracteres), data de nascimento (data válida e não futura), matrícula (1 a 30 caracteres alfanuméricos), nome do responsável (1 a 150 caracteres) e telefone de contato (8 a 20 caracteres).
2. IF o secretário submete o cadastro ou a edição de um Aluno com algum campo obrigatório vazio ou fora dos limites definidos, THEN THE Sistema_Secretaria SHALL rejeitar a operação, preservar os dados informados no formulário e exibir uma mensagem indicando qual campo é inválido e qual é o limite esperado.
3. THE Sistema_Secretaria SHALL permitir associar cada Aluno a no máximo uma Sala.
4. THE Sistema_Secretaria SHALL associar cada matrícula a no máximo um Aluno.
5. THE Sistema_Secretaria SHALL permitir associar cada Aluno a no máximo um Cartao_RFID.
6. WHERE um Aluno possui um Cartao_RFID associado, THE Sistema_Secretaria SHALL exibir o identificador do Cartao_RFID na tela de detalhes do Aluno.
7. WHERE um Aluno não possui um Cartao_RFID associado, THE Sistema_Secretaria SHALL exibir na tela de detalhes do Aluno uma indicação de que nenhum Cartao_RFID está associado.
8. IF o secretário tenta associar a um Aluno um Cartao_RFID já associado a outro Aluno, THEN THE Sistema_Secretaria SHALL rejeitar a associação, manter inalterada a associação de Cartao_RFID existente e exibir uma mensagem indicando que o cartão já está em uso por outro aluno.

### Requirement 3: Gestão de Salas e Turmas

**User Story:** Como secretário escolar, quero cadastrar e gerenciar salas/turmas e associar alunos a elas, para organizar os estudantes por ambiente de aula.

#### Acceptance Criteria

1. WHEN o secretário submete o formulário de cadastro de Sala com nome preenchido (1 a 100 caracteres) e capacidade preenchida (número inteiro de 1 a 999), THE Sistema_Secretaria SHALL criar uma nova Sala e exibir a Sala na lista de salas.
2. IF o secretário submete o formulário de cadastro de Sala com o campo nome vazio ou com mais de 100 caracteres, THEN THE Sistema_Secretaria SHALL rejeitar o cadastro, preservar os dados já preenchidos no formulário e exibir uma mensagem indicando que o nome é obrigatório e deve ter entre 1 e 100 caracteres.
3. IF o secretário submete o formulário de cadastro de Sala com capacidade vazia, não numérica, menor que 1 ou maior que 999, THEN THE Sistema_Secretaria SHALL rejeitar o cadastro, preservar os dados já preenchidos no formulário e exibir uma mensagem indicando que a capacidade deve ser um número inteiro entre 1 e 999.
4. IF o secretário submete o formulário de cadastro de Sala com um nome idêntico ao de uma Sala já existente, THEN THE Sistema_Secretaria SHALL rejeitar o cadastro e exibir uma mensagem indicando que já existe uma Sala com esse nome.
5. WHEN o secretário abre a página de Salas, THE Sistema_Secretaria SHALL exibir a lista de salas com nome, capacidade e quantidade de alunos associados.
6. WHEN o secretário associa um Aluno a uma Sala cuja quantidade de alunos associados é menor que a capacidade, THE Sistema_Secretaria SHALL registrar a associação entre o Aluno e a Sala e incrementar em 1 a quantidade de alunos associados exibida para a Sala.
7. IF o secretário tenta associar um Aluno a uma Sala cuja quantidade de alunos associados é igual à capacidade, THEN THE Sistema_Secretaria SHALL rejeitar a associação, manter inalterada a quantidade de alunos associados e exibir uma mensagem indicando que a Sala atingiu a capacidade máxima.
8. WHEN o secretário confirma a edição de uma Sala com nome preenchido (1 a 100 caracteres, não duplicado) e capacidade preenchida (número inteiro de 1 a 999 e maior ou igual à quantidade de alunos já associados), THE Sistema_Secretaria SHALL atualizar a Sala e exibir os dados atualizados.
9. IF o secretário confirma a edição de uma Sala com capacidade menor que a quantidade de alunos já associados a ela, THEN THE Sistema_Secretaria SHALL rejeitar a edição, preservar os dados originais da Sala e exibir uma mensagem indicando que a capacidade não pode ser menor que a quantidade de alunos associados.
10. WHEN o secretário confirma a remoção de uma Sala, THE Sistema_Secretaria SHALL remover a Sala, desassociar os alunos vinculados a ela e remover a Sala da lista de salas.

### Requirement 4: Registro e Visualização de Presença

**User Story:** Como secretário escolar, quero registrar e visualizar a presença dos alunos por sala e data, para acompanhar o comparecimento dos estudantes.

#### Acceptance Criteria

1. WHEN o secretário seleciona uma Sala e uma data válida (entre o início do ano letivo e a data atual, inclusive) na página de Presenças, THE Sistema_Secretaria SHALL exibir, em até 3 segundos, a lista de alunos associados à Sala com o Status_Presenca de cada Aluno para a data selecionada.
2. IF o secretário seleciona na página de Presenças uma data inválida, anterior ao início do ano letivo ou posterior à data atual, THEN THE Sistema_Secretaria SHALL rejeitar a seleção, preservar o estado atual da tela e exibir uma mensagem indicando que a data deve estar entre o início do ano letivo e a data atual.
3. IF a Sala selecionada não possui alunos associados, THEN THE Sistema_Secretaria SHALL exibir uma mensagem indicando que a Sala não possui alunos associados.
4. WHEN o secretário define o Status_Presenca de um Aluno (presente, ausente ou justificado) para uma Sala e data, THE Sistema_Secretaria SHALL criar ou atualizar o Registro_Presenca correspondente com o Status_Presenca informado em até 3 segundos.
5. IF a operação de salvar o Status_Presenca de um Aluno falhar, THEN THE Sistema_Secretaria SHALL manter o Status_Presenca anterior do Aluno e exibir uma mensagem indicando que não foi possível salvar a presença.
6. WHERE não existe Registro_Presenca para um Aluno em uma Sala e data selecionadas, THE Sistema_Secretaria SHALL exibir o Status_Presenca do Aluno como ausente.
7. WHEN o secretário abre a visualização de presença de um Aluno, THE Sistema_Secretaria SHALL exibir os Registro_Presenca do Aluno ordenados por data decrescente.
8. THE Sistema_Secretaria SHALL registrar em cada Registro_Presenca a data e o horário, com precisão de segundos, em que o Status_Presenca foi definido.

### Requirement 5: Integração de Leitura RFID

**User Story:** Como secretário escolar, quero que a presença seja registrada automaticamente quando um aluno passa o cartão no leitor RFID, para reduzir o registro manual de presença.

#### Acceptance Criteria

1. WHEN o Modulo_Leitura_RFID recebe a identificação de um Cartao_RFID associado a um Aluno, THE Sistema_Secretaria SHALL criar um Registro_Presenca com Status_Presenca igual a presente para o Aluno, na Sala associada ao Aluno, na data e horário da leitura, e exibir o registro na página de Presenças em até 3 segundos.
2. IF o Modulo_Leitura_RFID recebe a identificação de um Cartao_RFID não associado a nenhum Aluno, THEN THE Sistema_Secretaria SHALL não criar nenhum Registro_Presenca e exibir na página de Presenças, por no mínimo 5 segundos, uma mensagem indicando que o cartão não está associado a nenhum aluno.
3. IF o Modulo_Leitura_RFID recebe a identificação de um Cartao_RFID associado a um Aluno que já possui Registro_Presenca com Status_Presenca presente na mesma Sala e data, THEN THE Sistema_Secretaria SHALL manter inalterado o Registro_Presenca existente e exibir na página de Presenças, por no mínimo 5 segundos, uma mensagem indicando que a presença já foi registrada.
4. WHEN o Modulo_Leitura_RFID cria um Registro_Presenca a partir de uma leitura, THE Sistema_Secretaria SHALL exibir na página de Presenças o nome do Aluno e o horário da leitura no formato HH:MM:SS.
5. WHERE a Sala associada ao Aluno lido não está definida, THE Sistema_Secretaria SHALL não criar nenhum Registro_Presenca e exibir na página de Presenças, por no mínimo 5 segundos, uma mensagem indicando que o Aluno não está associado a nenhuma Sala.
6. IF a comunicação com o Modulo_Leitura_RFID falhar ou não retornar resposta em até 3 segundos, THEN THE Sistema_Secretaria SHALL não criar nenhum Registro_Presenca e exibir na página de Presenças uma mensagem indicando que a leitura não pôde ser processada.

### Requirement 6: Relatórios de Presença

**User Story:** Como secretário escolar, quero gerar relatórios de presença filtrados por período, sala e aluno, para analisar a frequência dos estudantes.

#### Acceptance Criteria

1. WHEN o secretário seleciona um período com data inicial e data final válidas, com data inicial menor ou igual à data final, na página de Relatórios, THE Sistema_Secretaria SHALL exibir, em até 5 segundos, os Registro_Presenca cuja data está dentro do período selecionado, incluindo as datas inicial e final.
2. IF o secretário seleciona um período em que a data inicial é posterior à data final, THEN THE Sistema_Secretaria SHALL rejeitar a geração do Relatorio_Presenca, preservar os filtros informados e exibir uma mensagem indicando que a data inicial não pode ser posterior à data final.
3. WHEN o secretário aplica um filtro por Sala no Relatorio_Presenca, THE Sistema_Secretaria SHALL exibir apenas os Registro_Presenca da Sala selecionada.
4. WHEN o secretário aplica um filtro por Aluno no Relatorio_Presenca, THE Sistema_Secretaria SHALL exibir apenas os Registro_Presenca do Aluno selecionado.
5. WHEN o secretário aplica simultaneamente os filtros de período, Sala e Aluno, THE Sistema_Secretaria SHALL exibir apenas os Registro_Presenca que atendem a todos os filtros aplicados ao mesmo tempo.
6. WHEN o Relatorio_Presenca é exibido, THE Sistema_Secretaria SHALL exibir a quantidade total de presenças, ausências e justificativas do conjunto filtrado, correspondentes aos valores de Status_Presenca presente, ausente e justificado.
7. IF nenhum Registro_Presenca corresponde aos filtros aplicados, THEN THE Sistema_Secretaria SHALL preservar os filtros informados e exibir uma mensagem indicando que não há dados para os filtros selecionados.

### Requirement 7: Navegação e Layout Compartilhado

**User Story:** Como usuário do sistema, quero navegar entre as páginas sem recarregar a aplicação e ver um layout consistente, para ter uma experiência fluida e sem duplicações.

#### Acceptance Criteria

1. WHEN o usuário aciona um item de navegação na barra lateral, THE Sistema_Secretaria SHALL usar Navegacao_Cliente para transitar para a rota correspondente, atualizando apenas a área de conteúdo e preservando o Layout_Compartilhado sem recarregar o documento completo, em até 500 milissegundos.
2. IF a transição de rota via Navegacao_Cliente falhar, THEN THE Sistema_Secretaria SHALL manter o usuário na rota atual e exibir uma indicação de erro informando que a navegação não pôde ser concluída.
3. THE Sistema_Secretaria SHALL renderizar o Layout_Compartilhado a partir de uma única definição reutilizada por todas as páginas autenticadas, contendo exatamente um cabeçalho e uma barra lateral por página.
4. WHEN uma página autenticada é exibida, THE Sistema_Secretaria SHALL apresentar no cabeçalho o nome do usuário autenticado obtido da sessão ativa, sem exibir texto de placeholder.
5. IF o nome do usuário autenticado não estiver disponível na sessão ativa, THEN THE Sistema_Secretaria SHALL exibir no cabeçalho um texto identificando o usuário como não identificado, sem exibir texto de placeholder de desenvolvimento.
6. WHILE o usuário está em uma rota, THE Sistema_Secretaria SHALL destacar na barra lateral exatamente um item de navegação, aquele correspondente à rota atual, mantendo os demais itens sem destaque.
