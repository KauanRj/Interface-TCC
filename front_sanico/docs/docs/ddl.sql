CREATE DATABASE TCC;

USE TCC;

CREATE TABLE Alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(15),
    Numero_responsavel INT NOT NULL,
    Nome_responsavel VARCHAR(100) NOT NULL,
    presença DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    Data_nascimento DATE NOT NULL,
);

CREATE TABLE Salas (
    numero INT AUTO_INCREMENT PRIMARY KEY,
    serie VARCHAR(50) NOT NULL,
    capacidade INT NOT NULL
    andar INT NOT NULL
);

CREATE TABLE Team (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(15)
);

CREATE TABLE Relatorios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_aluno VARCHAR(100) NOT NULL,
    email_aluno VARCHAR(100) UNIQUE NOT NULL,
    email_responsavel VARCHAR(100) UNIQUE NOT NULL,
    telefone_aluno VARCHAR(15),
    telefone_responsavel VARCHAR(15),
    numero_sala INT NOT NULL,
    andar_sala INT NOT NULL,
    ano_letivos VARCHAR(50) NOT NULL,


);
CREATE TABLE Presenca (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_aluno VARCHAR(100) NOT NULL,
    email_aluno VARCHAR(100) UNIQUE NOT NULL,
    numero_sala INT NOT NULL,
    andar_sala INT NOT NULL,
    data_presenca DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);