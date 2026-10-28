import { ChevronLeft, ChevronRight } from "lucide-react";

const BASE_BOTAO =
  "flex h-10 w-10 cursor-pointer items-center justify-center text-sm font-semibold select-none";

export function Paginacao({ paginaAtual, totalPaginas, totalItens, tamanho, irPara, rotulo = "alunos" }: any) {
  if (totalPaginas <= 1) {
    return null;
  }

  const primeiro = paginaAtual * tamanho + 1;
  let ultimo = (paginaAtual + 1) * tamanho;
  if (ultimo > totalItens) {
    ultimo = totalItens;
  }

  let inicio = paginaAtual - 2;
  if (inicio < 0) {
    inicio = 0;
  }
  let fim = inicio + 4;
  if (fim > totalPaginas - 1) {
    fim = totalPaginas - 1;
    inicio = fim - 4;
    if (inicio < 0) {
      inicio = 0;
    }
  }

  const botoes = [];
  for (let i = inicio; i <= fim; i++) {
    let classe = "app-card";
    if (i === paginaAtual) {
      classe = "app-card-strong text-white";
    }
    botoes.push(
      <button
        key={i}
        type="button"
        onClick={() => irPara(i)}
        className={`${classe} ${BASE_BOTAO}`}
      >
        {i + 1}
      </button>
    );
  }

  return (
    <nav className="mt-4 flex flex-wrap items-center justify-between gap-3">
      <p className="app-muted text-sm">
        Mostrando {primeiro}–{ultimo} de {totalItens} {rotulo}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={paginaAtual === 0}
          onClick={() => irPara(paginaAtual - 1)}
          className={`app-card ${BASE_BOTAO} disabled:cursor-not-allowed disabled:opacity-40`}
        >
          <ChevronLeft size={18} />
        </button>

        {botoes}

        <button
          type="button"
          disabled={paginaAtual === totalPaginas - 1}
          onClick={() => irPara(paginaAtual + 1)}
          className={`app-card ${BASE_BOTAO} disabled:cursor-not-allowed disabled:opacity-40`}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </nav>
  );
}
