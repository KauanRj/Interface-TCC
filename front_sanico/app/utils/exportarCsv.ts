import { textoDaData } from "~/utils/filtros";
import { formatarDataCurta } from "~/utils/formatacao";

function limparCelula(valor: any) {
  let texto = String(valor);
  const primeiro = texto.charAt(0);
  if (primeiro === "=" || primeiro === "+" || primeiro === "-" || primeiro === "@") {
    texto = "'" + texto;
  }
  if (texto.includes(";") || texto.includes('"') || texto.includes("\n")) {
    texto = '"' + texto.replace(/"/g, '""') + '"';
  }
  return texto;
}

export function montarCsv(colunas: string[], linhas: any[][]) {
  let texto = colunas.map(limparCelula).join(";") + "\r\n";
  for (let i = 0; i < linhas.length; i++) {
    texto = texto + linhas[i].map(limparCelula).join(";") + "\r\n";
  }
  return texto;
}

export function linhasDeFrequencia(registros: any[]) {
  const linhas = [];
  for (let i = 0; i < registros.length; i++) {
    const r = registros[i];
    linhas.push([formatarDataCurta(r.data), r.nome, r.turma, r.status, r.entrada]);
  }
  return linhas;
}

export function linhasDeAlunos(alunos: any[]) {
  const linhas = [];
  for (let i = 0; i < alunos.length; i++) {
    const a = alunos[i];
    linhas.push([a.nome, a.turma, a.presenca, a.media, a.situacao]);
  }
  return linhas;
}

export function nomeDoArquivo(conteudo: string) {
  return "relatorio-" + conteudo + "-" + textoDaData(new Date()) + ".csv";
}

export function baixarCsv(nome: string, texto: string) {
  const arquivo = new Blob(["﻿" + texto], { type: "text/csv;charset=utf-8" });
  const endereco = URL.createObjectURL(arquivo);
  const link = document.createElement("a");
  link.href = endereco;
  link.download = nome;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(endereco);
}
