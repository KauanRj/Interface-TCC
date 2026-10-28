export function semAcento(texto: string) {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

function contemBusca(texto: string, busca: string) {
  const buscaLimpa = semAcento(busca.trim());
  if (buscaLimpa === "") {
    return true;
  }
  return semAcento(texto).includes(buscaLimpa);
}

function numeroMedia(aluno: any) {
  const numero = parseFloat(aluno.media.replace(",", "."));
  if (isNaN(numero)) {
    return 0;
  }
  return numero;
}

export function filtrarAlunos(lista: any[], busca: string, turma: string, status: string, ordem: string) {
  const resultado = [];

  for (let i = 0; i < lista.length; i++) {
    const aluno = lista[i];
    let passa = true;

    if (contemBusca(aluno.nome, busca) === false) {
      passa = false;
    }
    if (turma !== "Todas as turmas" && aluno.turma !== turma) {
      passa = false;
    }
    if (status !== "Todos" && aluno.situacao !== status) {
      passa = false;
    }

    if (passa) {
      resultado.push(aluno);
    }
  }

  if (ordem === "Ordem alfabética") {
    resultado.sort((a, b) => a.nome.localeCompare(b.nome));
  }
  if (ordem === "Média crescente") {
    resultado.sort((a, b) => numeroMedia(a) - numeroMedia(b));
  }
  if (ordem === "Média decrescente") {
    resultado.sort((a, b) => numeroMedia(b) - numeroMedia(a));
  }

  return resultado;
}

export function textoDaData(data: Date) {
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");
  return data.getFullYear() + "-" + mes + "-" + dia;
}

export function filtrarPresencas(lista: any[], busca: string, periodo: string, turma: string, status: string) {
  const resultado = [];

  const hoje = new Date();
  const textoHoje = textoDaData(hoje);
  const inicioSemana = new Date();
  inicioSemana.setDate(hoje.getDate() - ((hoje.getDay() + 6) % 7));
  const textoInicioSemana = textoDaData(inicioSemana);
  const textoMes = textoHoje.slice(0, 7);

  for (let i = 0; i < lista.length; i++) {
    const registro = lista[i];
    let passa = true;

    if (contemBusca(registro.nome, busca) === false) {
      passa = false;
    }
    if (periodo === "Hoje" && registro.data !== textoHoje) {
      passa = false;
    }
    if (periodo === "Esta semana" && registro.data < textoInicioSemana) {
      passa = false;
    }
    if (periodo === "Este mês" && registro.data.slice(0, 7) !== textoMes) {
      passa = false;
    }
    if (turma !== "Todas as turmas" && registro.turma !== turma) {
      passa = false;
    }
    if (status !== "Todos os status" && registro.status !== status) {
      passa = false;
    }

    if (passa) {
      resultado.push(registro);
    }
  }

  return resultado;
}

export function filtrarSalas(lista: any[], busca: string, andar: string, status: string, turma: string) {
  const resultado = [];

  for (let i = 0; i < lista.length; i++) {
    const sala = lista[i];
    let passa = true;

    if (contemBusca(sala.nome, busca) === false) {
      passa = false;
    }
    if (andar !== "Todos os andares" && sala.andar !== andar) {
      passa = false;
    }
    if (status !== "Todos os status" && sala.cor !== status) {
      passa = false;
    }
    if (turma !== "Todas as turmas" && sala.turma.startsWith(turma) === false) {
      passa = false;
    }

    if (passa) {
      resultado.push(sala);
    }
  }

  return resultado;
}
