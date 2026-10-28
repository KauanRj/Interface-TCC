import { todosOsAlunos } from "~/utils/alunosCadastrados";
import { PRESENCAS_FICTICIAS } from "~/data/presencasFicticias";
import { textoDaData } from "~/utils/filtros";

const CHAVE = "educontrol:registros-de-hoje";

export function lerRegistros() {
  if (typeof window === "undefined") {
    return {};
  }

  const texto = localStorage.getItem(CHAVE);
  if (texto === null) {
    return {};
  }

  let dados: any = {};
  try {
    dados = JSON.parse(texto);
  } catch {
    return {};
  }

  if (dados.data !== textoDaData(new Date())) {
    return {};
  }
  return dados.registros;
}

export function salvarRegistros(registros: any) {
  const dados = { data: textoDaData(new Date()), registros: registros };
  localStorage.setItem(CHAVE, JSON.stringify(dados));
}

export function horaAgora() {
  const agora = new Date();
  const hora = String(agora.getHours()).padStart(2, "0");
  const minuto = String(agora.getMinutes()).padStart(2, "0");
  return hora + ":" + minuto;
}

export function alunosDeHoje() {
  const registros: any = lerRegistros();
  const textoHoje = textoDaData(new Date());
  const resultado = [];
  const alunos = todosOsAlunos();

  for (let i = 0; i < alunos.length; i++) {
    const aluno = alunos[i];

    let entradaHoje = "";
    for (let j = 0; j < PRESENCAS_FICTICIAS.length; j++) {
      const linha = PRESENCAS_FICTICIAS[j];
      if (linha.data === textoHoje && linha.nome === aluno.nome) {
        if (linha.entrada !== "—") {
          entradaHoje = linha.entrada;
        }
      }
    }

    let statusHoje = aluno.statusHoje;
    if (registros[aluno.id] !== undefined) {
      statusHoje = registros[aluno.id].status;
      entradaHoje = registros[aluno.id].entrada;
    }

    resultado.push({ ...aluno, statusHoje: statusHoje, entradaHoje: entradaHoje });
  }

  return resultado;
}

export function presencasAtuais() {
  const registros: any = lerRegistros();
  const textoHoje = textoDaData(new Date());
  const resultado = [];

  for (let i = 0; i < PRESENCAS_FICTICIAS.length; i++) {
    const linha = PRESENCAS_FICTICIAS[i];

    if (linha.data === textoHoje && registros[linha.id] !== undefined) {
      let entrada = registros[linha.id].entrada;
      if (entrada === "") {
        entrada = "—";
      }
      resultado.push({ ...linha, status: registros[linha.id].status, entrada: entrada });
    } else {
      resultado.push(linha);
    }
  }

  const alunos = todosOsAlunos();
  for (let i = 0; i < alunos.length; i++) {
    const aluno = alunos[i];
    if (aluno.detalhes) {
      let status = "Pendente";
      let entrada = "—";
      if (registros[aluno.id] !== undefined) {
        status = registros[aluno.id].status;
        if (registros[aluno.id].entrada !== "") {
          entrada = registros[aluno.id].entrada;
        }
      }
      resultado.push({ id: aluno.id, nome: aluno.nome, turma: aluno.turma, data: textoHoje, entrada: entrada, status: status });
    }
  }

  return resultado;
}
