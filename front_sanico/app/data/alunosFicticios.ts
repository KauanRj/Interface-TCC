export type Aluno = {
  id: number;
  nome: string;
  turma: string;
  presenca: string;
  media: string;
  situacao: string;
  statusHoje: string;
  cartao: string;
};

export const ALUNOS_FICTICIOS: Aluno[] = [
  { id: 1, cartao: "1001", nome: "Ana Clara Silva", turma: "9º Ano A", presenca: "95%", media: "8,7", situacao: "Bom", statusHoje: "Presente" },
  { id: 2, cartao: "1002", nome: "Bruno Almeida", turma: "8º Ano B", presenca: "78%", media: "6,9", situacao: "Em atenção", statusHoje: "Atrasado" },
  { id: 3, cartao: "1003", nome: "Carlos Eduardo", turma: "9º Ano A", presenca: "60%", media: "5,4", situacao: "Risco", statusHoje: "Justificado" },
  { id: 4, cartao: "1004", nome: "Daniela Santos", turma: "7º Ano A", presenca: "88%", media: "7,8", situacao: "Bom", statusHoje: "Ausente" },
  { id: 5, cartao: "1005", nome: "Eduardo Lima", turma: "8º Ano A", presenca: "90%", media: "8,2", situacao: "Bom", statusHoje: "Presente" },
  { id: 6, cartao: "1006", nome: "Fernanda Costa", turma: "7º Ano B", presenca: "82%", media: "7,1", situacao: "Em atenção", statusHoje: "Pendente" },
  { id: 7, cartao: "1007", nome: "Gabriel Martins", turma: "9º Ano B", presenca: "70%", media: "6,2", situacao: "Em atenção", statusHoje: "Atrasado" },
  { id: 8, cartao: "1008", nome: "Helena Ribeiro", turma: "8º Ano B", presenca: "93%", media: "8,9", situacao: "Bom", statusHoje: "Presente" },
  { id: 9, cartao: "1009", nome: "Igor Fernandes", turma: "7º Ano A", presenca: "58%", media: "4,9", situacao: "Risco", statusHoje: "Ausente" },
  { id: 10, cartao: "1010", nome: "Julia Almeida", turma: "9º Ano A", presenca: "85%", media: "7,9", situacao: "Bom", statusHoje: "Presente" },
  { id: 11, cartao: "1011", nome: "Lucas Pereira", turma: "8º Ano A", presenca: "76%", media: "6,5", situacao: "Em atenção", statusHoje: "Justificado" },
  { id: 12, cartao: "1012", nome: "Mariana Souza", turma: "7º Ano B", presenca: "91%", media: "8,4", situacao: "Bom", statusHoje: "Presente" },
  { id: 13, cartao: "1013", nome: "Nicolas Santos", turma: "9º Ano B", presenca: "64%", media: "5,6", situacao: "Risco", statusHoje: "Ausente" },
  { id: 14, cartao: "1014", nome: "Olivia Rocha", turma: "8º Ano B", presenca: "87%", media: "8,0", situacao: "Bom", statusHoje: "Presente" },
  { id: 15, cartao: "1015", nome: "Pedro Henrique", turma: "7º Ano A", presenca: "73%", media: "6,3", situacao: "Em atenção", statusHoje: "Atrasado" },
  { id: 16, cartao: "1016", nome: "Rafaela Mendes", turma: "9º Ano A", presenca: "96%", media: "9,1", situacao: "Bom", statusHoje: "Presente" },
  { id: 17, cartao: "1017", nome: "Samuel Barbosa", turma: "7º Ano B", presenca: "89%", media: "7,7", situacao: "Bom", statusHoje: "Presente" },
  { id: 18, cartao: "1018", nome: "Tatiana Moreira", turma: "8º Ano A", presenca: "81%", media: "7,0", situacao: "Em atenção", statusHoje: "Pendente" },
  { id: 19, cartao: "1019", nome: "Valentina Cardoso", turma: "9º Ano B", presenca: "94%", media: "8,8", situacao: "Bom", statusHoje: "Presente" },
  { id: 20, cartao: "1020", nome: "Wesley Teixeira", turma: "7º Ano A", presenca: "67%", media: "5,8", situacao: "Em atenção", statusHoje: "Ausente" },
  { id: 21, cartao: "1021", nome: "Yasmin Araújo", turma: "8º Ano B", presenca: "92%", media: "8,5", situacao: "Bom", statusHoje: "Presente" },
  { id: 22, cartao: "1022", nome: "Arthur Nogueira", turma: "9º Ano A", presenca: "79%", media: "6,8", situacao: "Em atenção", statusHoje: "Atrasado" },
  { id: 23, cartao: "1023", nome: "Beatriz Carvalho", turma: "7º Ano B", presenca: "97%", media: "9,3", situacao: "Bom", statusHoje: "Presente" },
  { id: 24, cartao: "1024", nome: "Caio Monteiro", turma: "8º Ano A", presenca: "62%", media: "5,1", situacao: "Risco", statusHoje: "Ausente" },
  { id: 25, cartao: "1025", nome: "Débora Freitas", turma: "9º Ano B", presenca: "86%", media: "7,6", situacao: "Bom", statusHoje: "Presente" },
  { id: 26, cartao: "1026", nome: "Enzo Gabriel", turma: "7º Ano A", presenca: "90%", media: "8,1", situacao: "Bom", statusHoje: "Presente" },
  { id: 27, cartao: "1027", nome: "Flávia Duarte", turma: "8º Ano B", presenca: "74%", media: "6,4", situacao: "Em atenção", statusHoje: "Justificado" },
  { id: 28, cartao: "1028", nome: "Guilherme Reis", turma: "9º Ano A", presenca: "83%", media: "7,2", situacao: "Em atenção", statusHoje: "Pendente" },
  { id: 29, cartao: "1029", nome: "Heloísa Barros", turma: "7º Ano B", presenca: "95%", media: "9,0", situacao: "Bom", statusHoje: "Presente" },
  { id: 30, cartao: "1030", nome: "Isaac Cunha", turma: "8º Ano A", presenca: "68%", media: "5,9", situacao: "Em atenção", statusHoje: "Atrasado" },
  { id: 31, cartao: "1031", nome: "Joana Pinto", turma: "9º Ano B", presenca: "88%", media: "7,9", situacao: "Bom", statusHoje: "Presente" },
  { id: 32, cartao: "1032", nome: "Kauê Ramos", turma: "7º Ano A", presenca: "59%", media: "4,7", situacao: "Risco", statusHoje: "Ausente" },
  { id: 33, cartao: "1033", nome: "Larissa Nunes", turma: "8º Ano B", presenca: "91%", media: "8,3", situacao: "Bom", statusHoje: "Presente" },
  { id: 34, cartao: "1034", nome: "Matheus Correia", turma: "9º Ano A", presenca: "77%", media: "6,6", situacao: "Em atenção", statusHoje: "Pendente" },
  { id: 35, cartao: "1035", nome: "Natália Azevedo", turma: "7º Ano B", presenca: "84%", media: "7,3", situacao: "Em atenção", statusHoje: "Pendente" },
  { id: 36, cartao: "0001", nome: "Aluno Teste RFID", turma: "9º Ano B", presenca: "100%", media: "7,0", situacao: "Bom", statusHoje: "Pendente" },
];
