import { detalhesDoAluno } from "~/data/detalhesFicticios";
import { presencasAtuais } from "~/utils/registroHoje";

const CHAVE = "educontrol:alunos-contato";

function lerEdicoes() {
  try {
    const texto = localStorage.getItem(CHAVE);
    if (texto) {
      return JSON.parse(texto);
    }
  } catch {
    return {};
  }
  return {};
}

export function detalhesCompletos(aluno: any) {
  let base: any = detalhesDoAluno(aluno);
  if (aluno.detalhes) {
    base = { ...aluno.detalhes };
  }
  const edicoes = lerEdicoes();
  const editado = edicoes[aluno.id];
  if (editado) {
    base.responsavelNome = editado.responsavelNome;
    base.responsavelTelefone = editado.responsavelTelefone;
    base.responsavelEmail = editado.responsavelEmail;
    base.endereco = editado.endereco;
  }
  return base;
}

export function salvarContato(alunoId: number, contato: any) {
  const edicoes = lerEdicoes();
  edicoes[alunoId] = contato;
  try {
    localStorage.setItem(CHAVE, JSON.stringify(edicoes));
  } catch {
    return;
  }
}

export function mascararCpf(cpf: string) {
  return "***." + cpf.substring(4, 7) + "." + cpf.substring(8, 11) + "-**";
}

export function resumoFrequencia(aluno: any) {
  const todas = presencasAtuais();
  const doAluno = [];
  for (let i = 0; i < todas.length; i++) {
    if (todas[i].nome === aluno.nome) {
      doAluno.push(todas[i]);
    }
  }
  doAluno.sort((a: any, b: any) => (a.data < b.data ? 1 : -1));

  let presentes = 0;
  let atrasos = 0;
  let faltas = 0;
  let justificadas = 0;
  for (let i = 0; i < doAluno.length; i++) {
    const status = doAluno[i].status;
    if (status === "Presente") {
      presentes = presentes + 1;
    } else if (status === "Atrasado") {
      atrasos = atrasos + 1;
    } else if (status === "Ausente") {
      faltas = faltas + 1;
    } else if (status === "Justificado") {
      justificadas = justificadas + 1;
    }
  }

  return {
    presentes: presentes,
    atrasos: atrasos,
    faltas: faltas,
    justificadas: justificadas,
    recentes: doAluno.slice(0, 5),
  };
}
