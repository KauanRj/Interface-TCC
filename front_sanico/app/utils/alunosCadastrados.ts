import { ALUNOS_FICTICIOS } from "~/data/alunosFicticios";
import { lerLista, salvarLista } from "~/utils/armazenamento";
import { textoDaData } from "~/utils/filtros";
import { calcularIdade, apenasDigitos } from "~/utils/validacoes";

const CHAVE = "educontrol:alunos-novos";

export function lerAlunosNovos() {
  return lerLista(CHAVE);
}

export function todosOsAlunos() {
  const novos = lerAlunosNovos();
  const lista = [];
  for (let i = 0; i < ALUNOS_FICTICIOS.length; i++) {
    lista.push(ALUNOS_FICTICIOS[i]);
  }
  for (let i = 0; i < novos.length; i++) {
    lista.push(novos[i]);
  }
  return lista;
}

export function cpfDeAlunoJaCadastrado(cpf: string) {
  const novos = lerAlunosNovos();
  for (let i = 0; i < novos.length; i++) {
    if (apenasDigitos(novos[i].detalhes.cpf) === apenasDigitos(cpf)) {
      return true;
    }
  }
  return false;
}

export function cartaoJaCadastrado(cartao: string) {
  const todos = todosOsAlunos();
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].cartao === cartao.trim()) {
      return true;
    }
  }
  return false;
}

export function cadastrarAluno(dados: any) {
  const todos = todosOsAlunos();
  let maiorId = 0;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id > maiorId) {
      maiorId = todos[i].id;
    }
  }
  if (maiorId >= 99) {
    return null;
  }

  const id = maiorId + 1;
  const hoje = textoDaData(new Date());
  const novo = {
    id: id,
    nome: dados.nome.trim(),
    cartao: dados.cartao.trim(),
    turma: dados.turma,
    presenca: "—",
    media: "—",
    situacao: "Bom",
    statusHoje: "Pendente",
    detalhes: {
      matricula: hoje.slice(0, 4) + String(id).padStart(4, "0"),
      dataMatricula: hoje,
      dataNascimento: dados.dataNascimento,
      idade: calcularIdade(dados.dataNascimento),
      cpf: dados.cpf,
      turno: dados.turno,
      responsavelNome: dados.responsavelNome.trim(),
      parentesco: dados.parentesco,
      responsavelTelefone: apenasDigitos(dados.responsavelTelefone),
      responsavelEmail: dados.responsavelEmail.trim(),
      endereco: dados.endereco.trim(),
    },
  };

  const novos = lerAlunosNovos();
  novos.push(novo);
  if (salvarLista(CHAVE, novos) === false) {
    return null;
  }
  return novo;
}

export function acharAlunoPorNome(nome: string) {
  const todos = todosOsAlunos();
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].nome === nome) {
      return todos[i];
    }
  }
  return null;
}
