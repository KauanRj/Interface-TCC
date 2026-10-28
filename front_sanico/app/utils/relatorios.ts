import { textoDaData } from "~/utils/filtros";

export function filtrarPorPeriodo(registros: any[], periodo: string, turma: string) {
  const hoje = new Date();
  const textoHoje = textoDaData(hoje);
  let inicio = "";

  if (periodo === "Últimos 7 dias") {
    const data = new Date();
    data.setDate(data.getDate() - 6);
    inicio = textoDaData(data);
  }
  if (periodo === "Últimos 30 dias") {
    const data = new Date();
    data.setDate(data.getDate() - 29);
    inicio = textoDaData(data);
  }
  if (periodo === "Este mês") {
    inicio = textoHoje.slice(0, 7) + "-01";
  }
  if (periodo === "Este ano") {
    inicio = textoHoje.slice(0, 4) + "-01-01";
  }

  const resultado = [];
  for (let i = 0; i < registros.length; i++) {
    const registro = registros[i];
    if (registro.data >= inicio && (turma === "Todas as turmas" || registro.turma === turma)) {
      resultado.push(registro);
    }
  }
  return resultado;
}

export function contarPresencas(registros: any[]) {
  let presentes = 0;
  let atrasados = 0;
  let justificados = 0;
  let ausentes = 0;

  for (let i = 0; i < registros.length; i++) {
    const status = registros[i].status;
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
  }

  const marcados = presentes + atrasados + justificados + ausentes;
  let taxa = 0;
  if (marcados > 0) {
    taxa = Math.round(((presentes + atrasados) / marcados) * 100);
  }

  return { presentes, atrasados, justificados, ausentes, marcados, taxa };
}

export function evolucaoPorDia(registros: any[]) {
  const dias: any = {};

  for (let i = 0; i < registros.length; i++) {
    const registro = registros[i];
    if (dias[registro.data] === undefined) {
      dias[registro.data] = { presentes: 0, faltosos: 0, pendentes: 0 };
    }
    if (registro.status === "Presente" || registro.status === "Atrasado") {
      dias[registro.data].presentes++;
    }
    if (registro.status === "Ausente" || registro.status === "Justificado") {
      dias[registro.data].faltosos++;
    }
    if (registro.status === "Pendente") {
      dias[registro.data].pendentes++;
    }
  }

  const datas = Object.keys(dias).sort();
  const resultado = [];
  for (let i = 0; i < datas.length; i++) {
    const data = datas[i];
    resultado.push({
      dia: data.slice(8, 10) + "/" + data.slice(5, 7),
      presentes: dias[data].presentes,
      faltosos: dias[data].faltosos,
      pendentes: dias[data].pendentes,
    });
  }
  return resultado;
}
