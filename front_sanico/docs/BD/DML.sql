INSERT INTO alunos (nome, nota, turma) 
VALUES ('Mariana Souza', 9.5, '3º Ano A');

INSERT INTO alunos (nome, nota, turma) 
VALUES ('josé Gonçalves', 3.5, '3º Ano A');

INSERT INTO alunos (nome, nota, turma)
VALUES ('Pedro Oliveira', 7.8, '2º Ano B');

INSERT INTO alunos (nome, nota, turma)
VALUES ('Carla Santos', 8.9, '3º Ano A');

INSERT INTO alunos (nome, nota, turma)
VALUES ('Ana Paula Costa', 6.7, '1º Ano C');

INSERT INTO alunos (nome, nota, turma)
VALUES ('Roberto Lima', 9.2, '2º Ano B');

INSERT INTO alunos (nome, nota, turma)
VALUES ('Fernanda Rodrigues', 7.5, '1º Ano C');

INSERT INTO alunos (nome, nota, turma)
VALUES ('Carlos Mendes', 8.4, '3º Ano A');

INSERT INTO alunos (nome, nota, turma)
VALUES ('Juliana Almeida', 9.0, '2º Ano B');

INSERT INTO alunos (nome, nota, turma)
VALUES ('Lucas Ferreira', 7.3, '1º Ano C');

SELECT * FROM alunos WHERE turma = '3º Ano A' AND nota > 9.0;

SELECT * FROM alunos WHERE turma =  '3º Ano B' AND nota > 9.0;

SELECT * FROM alunos WHERE turma = '1º Ano C' AND nota > 9.0;

SELECT * FROM alunos ORDER BY nota;

#funcionarios

INSERT INTO funcionarios (nome, area )
VALUES ('Carlos Silva', 'limpeza');

INSERT INTO funcionarios (nome, area)
VALUES ('Maria Santos', 'secretaria');

INSERT INTO funcionarios (nome, area)
VALUES ('João Oliveira', 'limpeza');

INSERT INTO funcionarios (nome, area)
VALUES ('Ana Costa', 'secretaria');

INSERT INTO funcionarios (nome, area)
VALUES ('Pedro Almeida', 'limpeza');

INSERT INTO funcionarios (nome, area)
VALUES ('Laura Pereira', 'cozinha');

INSERT INTO funcionarios (nome, area)
VALUES ('jose pererira ', 'suopervisao');

INSERT INTO funcionarios (nome, area)
VALUES ('jose pererira ', 'secretaria');

INSERT INTO funcionarios (nome, area)
VALUES ('jose pererira ', 'cozinha');

INSERT INTO funcionarios (nome, area)
VALUES ('jose pererira ', 'cozinha');