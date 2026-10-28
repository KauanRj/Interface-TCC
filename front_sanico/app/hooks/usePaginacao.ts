import { useState } from "react";
import { dividirEmBlocos } from "~/utils/paginacao";

export function usePaginacao(lista: any[], tamanho: number = 8) {
  const [pagina, setPagina] = useState(0);

  const blocos = dividirEmBlocos(lista, tamanho);

  let totalPaginas = blocos.length;
  if (totalPaginas < 1) {
    totalPaginas = 1;
  }

  let paginaAtual = pagina;
  if (paginaAtual > totalPaginas - 1) {
    paginaAtual = totalPaginas - 1;
  }

  let bloco: any[] = [];
  if (blocos.length > 0) {
    bloco = blocos[paginaAtual];
  }

  function irPara(destino: number) {
    if (destino < 0) {
      destino = 0;
    }
    if (destino > totalPaginas - 1) {
      destino = totalPaginas - 1;
    }
    setPagina(destino);
  }

  return { bloco, paginaAtual, totalPaginas, irPara, totalItens: lista.length, tamanho };
}
