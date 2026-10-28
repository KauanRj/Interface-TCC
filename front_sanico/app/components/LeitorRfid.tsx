import { useState } from "react";
import { Radio } from "lucide-react";
import { leitorAtivo, definirLeitorAtivo, lerCartao } from "~/utils/rfid";

export function LeitorRfid({ podeAlterar, aoLer }: any) {
  const [ativo, setAtivo] = useState<boolean>(leitorAtivo);
  const [cartao, setCartao] = useState("");
  const [resultado, setResultado] = useState<any>(null);

  function alternar() {
    definirLeitorAtivo(!ativo);
    setAtivo(!ativo);
    setResultado(null);
  }

  function simular() {
    const retorno = lerCartao(cartao);
    setResultado(retorno);
    if (retorno.ok) {
      setCartao("");
      aoLer();
    }
  }

  return (
    <div className="app-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Radio size={22} className={ativo ? "text-emerald-500" : "text-gray-400"} />
          <div>
            <p className="font-semibold">Leitor RFID</p>
            <p className="flex items-center gap-2 text-sm">
              <span className={ativo ? "h-2.5 w-2.5 rounded-full bg-emerald-500" : "h-2.5 w-2.5 rounded-full bg-red-500"} />
              {ativo ? "Ativo" : "Inativo"}
            </p>
          </div>
        </div>

        {podeAlterar && (
          <button type="button" onClick={alternar} className="cursor-pointer text-sm font-semibold text-[#22c7a9]">
            {ativo ? "Desativar leitor" : "Ativar leitor"}
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-end gap-3">
        <div className="min-w-48 flex-1">
          <label className="mb-1 block text-xs text-gray-500 dark:text-[#8fb1aa]">Número do cartão</label>
          <input
            className="app-input w-full"
            placeholder="0001"
            inputMode="numeric"
            value={cartao}
            disabled={!ativo}
            onChange={(e) => setCartao(e.target.value.replace(/\D/g, "").slice(0, 10))}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                simular();
              }
            }}
          />
        </div>
        <button
          type="button"
          onClick={simular}
          disabled={!ativo}
          className="app-button-relatorio disabled:cursor-not-allowed disabled:opacity-50"
        >
          Simular leitura
        </button>
      </div>

      {resultado && (
        <p role="status" className={resultado.ok ? "mt-3 text-sm text-emerald-500" : "mt-3 text-sm text-red-500"}>
          {resultado.mensagem}
        </p>
      )}
    </div>
  );
}
