import { useEffect, useState } from "react";
import { X, Download } from "lucide-react";
import {
  montarCsv,
  linhasDeFrequencia,
  linhasDeAlunos,
  nomeDoArquivo,
  baixarCsv,
} from "~/utils/exportarCsv";

export function GerarRelatorio({ aoFechar, aoGerar, tipo, periodo, turma, registros, alunos }: any) {
  let inicial = "frequencia";
  if (tipo === "Alunos") {
    inicial = "alunos";
  }
  const [conteudo, setConteudo] = useState(inicial);

  useEffect(() => {
    function aoApertar(e: KeyboardEvent) {
      if (e.key === "Escape") {
        aoFechar();
      }
    }
    window.addEventListener("keydown", aoApertar);
    return () => window.removeEventListener("keydown", aoApertar);
  }, []);

  let quantidade = registros.length;
  if (conteudo === "alunos") {
    quantidade = alunos.length;
  }

  function baixar() {
    if (quantidade === 0) {
      return;
    }
    let texto = "";
    if (conteudo === "alunos") {
      texto = montarCsv(["Aluno", "Turma", "Presença", "Média", "Situação"], linhasDeAlunos(alunos));
    } else {
      texto = montarCsv(["Data", "Aluno", "Turma", "Status", "Entrada"], linhasDeFrequencia(registros));
    }
    const nome = nomeDoArquivo(conteudo);
    baixarCsv(nome, texto);
    aoGerar(nome, quantidade);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={aoFechar}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Gerar relatório"
        className="app-card w-full max-w-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Gerar relatório</h2>
            <p className="app-muted text-sm">Arquivo CSV, que abre no Excel e no Google Planilhas.</p>
          </div>
          <button type="button" onClick={aoFechar} aria-label="Fechar" className="cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <div className="mb-4 space-y-2 text-sm">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="conteudo"
              checked={conteudo === "frequencia"}
              onChange={() => setConteudo("frequencia")}
            />
            Frequência (um registro por aluno e dia)
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="conteudo"
              checked={conteudo === "alunos"}
              onChange={() => setConteudo("alunos")}
            />
            Alunos (presença, média e situação)
          </label>
        </div>

        <div className="mb-4 rounded-lg border border-slate-200 p-3 text-sm dark:border-white/10">
          {conteudo === "frequencia" && <p>Período: {periodo}</p>}
          <p>Turma: {turma}</p>
          <p className="font-semibold">
            {quantidade} {quantidade === 1 ? "linha" : "linhas"} no arquivo
          </p>
          {quantidade === 0 && <p className="mt-1 text-red-500">Não há dados com esses filtros.</p>}
        </div>

        <div className="flex justify-end gap-2">
          <button type="button" onClick={aoFechar} className="cursor-pointer rounded-lg px-4 py-2 text-sm">
            Cancelar
          </button>
          <button
            type="button"
            onClick={baixar}
            disabled={quantidade === 0}
            className="app-button-relatorio disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Download size={16} />
            Baixar CSV
          </button>
        </div>
      </div>
    </div>
  );
}
