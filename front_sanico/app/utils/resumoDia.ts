export function resumoDoDia(alunos: any[]) {
  const presentes = [];
  const pendentes = [];
  const faltas = [];

  for (let i = 0; i < alunos.length; i++) {
    const aluno = alunos[i];

    if (aluno.statusHoje === "Presente" || aluno.statusHoje === "Atrasado") {
      presentes.push(aluno);
    } else if (aluno.statusHoje === "Pendente") {
      pendentes.push(aluno);
    } else {
      faltas.push(aluno);
    }
  }

  return { total: alunos.length, presentes, pendentes, faltas };
}

export function porcentagem(parte: number, total: number) {
  if (total === 0) {
    return 0;
  }
  return Math.round((parte / total) * 100);
}

export function contarPorStatus(alunos: any[]) {
  let presentes = 0;
  let atrasados = 0;
  let justificados = 0;
  let ausentes = 0;
  let pendentes = 0;

  for (let i = 0; i < alunos.length; i++) {
    const status = alunos[i].statusHoje;
    if (status === "Presente") {
      presentes++;
    }
    if (status === "Atrasado") {
      atrasados++;
    }
    if (status === "Justificado") {
      justificados++;
    }
    if (status === "Ausente") {
      ausentes++;
    }
    if (status === "Pendente") {
      pendentes++;
    }
  }

  const marcados = presentes + atrasados + justificados + ausentes;
  let taxa = 0;
  if (marcados > 0) {
    taxa = Math.round(((presentes + atrasados) / marcados) * 100);
  }

  return { presentes, atrasados, justificados, ausentes, pendentes, marcados, taxa };
}

export function presencaPorTurma(alunos: any[]) {
  const turmas: string[] = [];
  for (let i = 0; i < alunos.length; i++) {
    if (turmas.includes(alunos[i].turma) === false) {
      turmas.push(alunos[i].turma);
    }
  }
  turmas.sort();

  const resultado = [];
  for (let i = 0; i < turmas.length; i++) {
    const daTurma = [];
    for (let j = 0; j < alunos.length; j++) {
      if (alunos[j].turma === turmas[i]) {
        daTurma.push(alunos[j]);
      }
    }
    resultado.push({ nome: turmas[i], porcentagem: contarPorStatus(daTurma).taxa });
  }
  return resultado;
}
