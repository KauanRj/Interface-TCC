import { alunosDeHoje } from "~/utils/registroHoje";
import { textoDaData } from "~/utils/filtros";

const CHAVE_LIDAS = "educontrol:notificacoes-lidas";

export function criarNotificacoes() {
  const alunos = alunosDeHoje();
  const hoje = textoDaData(new Date());

  let pendentes = 0;
  let ausentes = 0;
  let atrasados = 0;
  let risco = 0;

  for (let i = 0; i < alunos.length; i++) {
    const aluno = alunos[i];
    if (aluno.statusHoje === "Pendente") {
      pendentes = pendentes + 1;
    }
    if (aluno.statusHoje === "Ausente") {
      ausentes = ausentes + 1;
    }
    if (aluno.statusHoje === "Atrasado") {
      atrasados = atrasados + 1;
    }
    if (aluno.situacao === "Risco") {
      risco = risco + 1;
    }
  }

  const lista = [];

  if (pendentes > 0) {
    lista.push({
      id: "pendentes:" + pendentes + ":" + hoje,
      titulo: pendentes + " alunos sem chamada hoje",
      texto: "Registre a presença para fechar o dia.",
      rota: "/presenca",
    });
  }
  if (ausentes > 0) {
    lista.push({
      id: "ausentes:" + ausentes + ":" + hoje,
      titulo: ausentes + " faltas sem justificativa hoje",
      texto: "Veja quem faltou e avise os responsáveis.",
      rota: "/presenca",
    });
  }
  if (atrasados > 0) {
    lista.push({
      id: "atrasados:" + atrasados + ":" + hoje,
      titulo: atrasados + " atrasos hoje",
      texto: "Alunos que entraram depois do horário.",
      rota: "/presenca",
    });
  }
  if (risco > 0) {
    lista.push({
      id: "risco:" + risco,
      titulo: risco + " alunos em risco",
      texto: "Frequência ou média abaixo do esperado.",
      rota: "/alunos",
    });
  }

  return lista;
}

export function lerLidas() {
  try {
    const texto = localStorage.getItem(CHAVE_LIDAS);
    if (texto) {
      return JSON.parse(texto);
    }
  } catch {
    return [];
  }
  return [];
}

export function salvarLidas(lidas: string[]) {
  try {
    localStorage.setItem(CHAVE_LIDAS, JSON.stringify(lidas));
  } catch {
    return;
  }
}

export function notificacoesLigadas() {
  try {
    const texto = localStorage.getItem("educontrol-configuracoes");
    if (texto) {
      const dados = JSON.parse(texto);
      if (dados.notificacoes === false) {
        return false;
      }
    }
  } catch {
    return true;
  }
  return true;
}
