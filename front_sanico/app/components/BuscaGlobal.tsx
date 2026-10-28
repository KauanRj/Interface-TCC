import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Search } from "lucide-react";
import { buscarTudo } from "~/utils/buscaGlobal";

export function BuscaGlobal({ podeVer, aoEscolher }: any) {
  const [texto, setTexto] = useState("");
  const [aberto, setAberto] = useState(false);
  const [indice, setIndice] = useState(0);
  const [posicao, setPosicao] = useState({ top: 0, left: 0, largura: 0 });
  const campo = useRef<HTMLInputElement>(null);

  const resultados = buscarTudo(texto, podeVer);
  const mostrarLista = aberto && texto.trim().length >= 2;

  function marcarPosicao() {
    if (campo.current) {
      const caixa = campo.current.getBoundingClientRect();
      setPosicao({ top: caixa.bottom + 6, left: caixa.left, largura: caixa.width });
    }
  }

  function escolher(resultado: any) {
    setAberto(false);
    setTexto("");
    setIndice(0);
    aoEscolher(resultado);
  }

  function aoApertar(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      setAberto(false);
    }
    if (e.key === "ArrowDown" && resultados.length > 0) {
      e.preventDefault();
      setIndice((indice + 1) % resultados.length);
    }
    if (e.key === "ArrowUp" && resultados.length > 0) {
      e.preventDefault();
      setIndice((indice - 1 + resultados.length) % resultados.length);
    }
    if (e.key === "Enter" && resultados.length > 0) {
      e.preventDefault();
      escolher(resultados[indice]);
    }
  }

  return (
    <div>
      <div className="relative w-full max-w-80">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          ref={campo}
          type="text"
          placeholder="Pesquisar aluno, funcionário ou sala..."
          aria-label="Pesquisa geral"
          className="app-input w-full pl-9"
          value={texto}
          onChange={(e) => {
            setTexto(e.target.value);
            setIndice(0);
            setAberto(true);
            marcarPosicao();
          }}
          onFocus={() => {
            setAberto(true);
            marcarPosicao();
          }}
          onBlur={() => setAberto(false)}
          onKeyDown={aoApertar}
        />
      </div>

      {mostrarLista &&
        createPortal(
          <div
            role="listbox"
            className="fixed z-[100] max-h-80 overflow-y-auto rounded-lg border border-slate-200 bg-white p-1 text-sm text-gray-900 shadow-xl dark:border-white/10 dark:bg-[#0a141a] dark:text-[#f5fffc]"
            style={{ top: posicao.top, left: posicao.left, width: Math.max(posicao.largura, 288) }}
            onMouseDown={(e) => e.preventDefault()}
          >
            {resultados.length === 0 && <p className="p-3 text-center text-gray-500">Nada encontrado.</p>}
            {resultados.map((resultado, posicaoNaLista) => (
              <button
                type="button"
                role="option"
                aria-selected={posicaoNaLista === indice}
                key={resultado.tipo + resultado.titulo}
                onClick={() => escolher(resultado)}
                className={
                  posicaoNaLista === indice
                    ? "flex w-full cursor-pointer items-center justify-between gap-3 rounded-md bg-gray-100 p-2 text-left dark:bg-[#101f27]"
                    : "flex w-full cursor-pointer items-center justify-between gap-3 rounded-md p-2 text-left hover:bg-gray-100 dark:hover:bg-[#101f27]"
                }
              >
                <span>
                  <span className="block font-medium">{resultado.titulo}</span>
                  <span className="block text-xs text-gray-500">{resultado.detalhe}</span>
                </span>
                <span className="rounded-full bg-[#22c7a9]/15 px-2 py-0.5 text-xs text-[#22c7a9]">{resultado.tipo}</span>
              </button>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
}
