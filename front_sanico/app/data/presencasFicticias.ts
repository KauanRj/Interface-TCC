import { ALUNOS_FICTICIOS } from "./alunosFicticios";
import { textoDaData } from "~/utils/filtros";

function gerarPresencas() {
  const registros = [];

  for (let dias = 0; dias < 40; dias++) {
    const data = new Date();
    data.setDate(data.getDate() - dias);

    if ((data.getDay() === 0 || data.getDay() === 6) && dias !== 0) {
      continue;
    }

    for (let i = 0; i < ALUNOS_FICTICIOS.length; i++) {
      const aluno = ALUNOS_FICTICIOS[i];
      const porcentagem = parseInt(aluno.presenca);
      const sorteio = (aluno.id * 31 + dias * 17) % 100;

      let status = "Ausente";
      if (dias === 0) {
        status = aluno.statusHoje;
      } else if (sorteio < porcentagem) {
        status = "Presente";
        if (sorteio % 9 === 0) {
          status = "Atrasado";
        }
      } else if (sorteio % 4 === 0) {
        status = "Justificado";
      }

      let entrada = "—";
      if (status === "Presente") {
        entrada = "07:0" + ((aluno.id + dias) % 6);
      }
      if (status === "Atrasado") {
        entrada = "07:" + (20 + ((aluno.id + dias) % 20));
      }

      registros.push({
        id: dias * 100 + aluno.id,
        nome: aluno.nome,
        turma: aluno.turma,
        data: textoDaData(data),
        entrada: entrada,
        status: status,
      });
    }
  }

  return registros;
}

export const PRESENCAS_FICTICIAS = gerarPresencas();
