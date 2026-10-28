import { todosOsAlunos } from "~/utils/alunosCadastrados";
import { lerSalasNovas } from "~/utils/salasCadastradas";
import { lerFuncionariosNovos } from "~/utils/funcionariosCadastrados";
import { FUNCIONARIOS_BASE } from "~/data/funcionariosFicticios";
import { SALAS_BASE } from "~/data/salasFicticias";
import { semAcento } from "~/utils/filtros";

const LIMITE_POR_TIPO = 4;

function acha(textos: string[], busca: string) {
  for (let i = 0; i < textos.length; i++) {
    if (semAcento(textos[i]).includes(busca)) {
      return true;
    }
  }
  return false;
}

export function buscarTudo(texto: string, podeVer: any) {
  const busca = semAcento(texto.trim());
  const resultados: any[] = [];
  let totalAlunos = 0;
  let totalFuncionarios = 0;
  let totalSalas = 0;

  if (busca.length < 2) {
    return resultados;
  }

  if (podeVer.alunos) {
    const alunos = todosOsAlunos();
    for (let i = 0; i < alunos.length; i++) {
      const aluno = alunos[i];
      if (totalAlunos < LIMITE_POR_TIPO && acha([aluno.nome, aluno.turma, aluno.cartao || ""], busca)) {
        totalAlunos = totalAlunos + 1;
        resultados.push({ tipo: "Aluno", titulo: aluno.nome, detalhe: aluno.turma, item: aluno });
      }
    }
  }

  if (podeVer.equipe) {
    const funcionarios = FUNCIONARIOS_BASE.concat(lerFuncionariosNovos());
    for (let i = 0; i < funcionarios.length; i++) {
      const f = funcionarios[i];
      if (totalFuncionarios < LIMITE_POR_TIPO && acha([f.nome, f.cargo, f.setor, f.vinculo], busca)) {
        totalFuncionarios = totalFuncionarios + 1;
        resultados.push({ tipo: "Funcionário", titulo: f.nome, detalhe: f.cargo + " · " + f.vinculo, item: f });
      }
    }
  }

  if (podeVer.salas) {
    const salas = SALAS_BASE.concat(lerSalasNovas());
    for (let i = 0; i < salas.length; i++) {
      const s = salas[i];
      if (totalSalas < LIMITE_POR_TIPO && acha([s.nome, s.turma, s.andar], busca)) {
        totalSalas = totalSalas + 1;
        resultados.push({ tipo: "Sala", titulo: s.nome, detalhe: s.andar + " · " + s.turma, item: s });
      }
    }
  }

  return resultados;
}
