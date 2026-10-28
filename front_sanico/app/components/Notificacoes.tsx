import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router";
import { BellRing, X } from "lucide-react";
import { criarNotificacoes, lerLidas, salvarLidas, notificacoesLigadas } from "~/utils/notificacoes";

export function Notificacoes({ className = "text-gray-900 dark:text-[#f5fffc]" }: any) {
  const navigate = useNavigate();
  const [aberto, setAberto] = useState(false);
  const [lista, setLista] = useState<any[]>([]);
  const [lidas, setLidas] = useState<string[]>([]);
  const [ligadas, setLigadas] = useState(true);
  const [posicao, setPosicao] = useState({ top: 0, direita: 0 });
  const botao = useRef<HTMLButtonElement>(null);

  function abrir() {
    if (botao.current) {
      const caixa = botao.current.getBoundingClientRect();
      setPosicao({ top: caixa.bottom + 8, direita: window.innerWidth - caixa.right });
    }
    setLista(criarNotificacoes());
    setLidas(lerLidas());
    setLigadas(notificacoesLigadas());
    setAberto(!aberto);
  }

  useEffect(() => {
    setLista(criarNotificacoes());
    setLidas(lerLidas());
    setLigadas(notificacoesLigadas());
  }, []);

  useEffect(() => {
    function aoApertar(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setAberto(false);
      }
    }
    if (aberto) {
      window.addEventListener("keydown", aoApertar);
    }
    return () => window.removeEventListener("keydown", aoApertar);
  }, [aberto]);

  function foiLida(id: string) {
    return lidas.includes(id);
  }

  function marcarLida(id: string) {
    if (foiLida(id)) {
      return;
    }
    const novas = [...lidas, id];
    setLidas(novas);
    salvarLidas(novas);
  }

  function marcarTodas() {
    const novas = [...lidas];
    for (let i = 0; i < lista.length; i++) {
      if (!novas.includes(lista[i].id)) {
        novas.push(lista[i].id);
      }
    }
    setLidas(novas);
    salvarLidas(novas);
  }

  function abrirNotificacao(item: any) {
    marcarLida(item.id);
    setAberto(false);
    navigate(item.rota);
  }

  let naoLidas = 0;
  for (let i = 0; i < lista.length; i++) {
    if (!foiLida(lista[i].id)) {
      naoLidas = naoLidas + 1;
    }
  }
  if (!ligadas) {
    naoLidas = 0;
  }

  return (
    <div className="relative">
      <button
        type="button"
        ref={botao}
        onClick={abrir}
        title="Notificações"
        aria-label="Notificações"
        aria-expanded={aberto}
        className="relative cursor-pointer"
      >
        <BellRing size={20} className={className} />
        {naoLidas > 0 && (
          <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
            {naoLidas}
          </span>
        )}
      </button>

      {aberto && createPortal(
        <>
          <div className="fixed inset-0 z-[90]" onClick={() => setAberto(false)} />
          <div
            role="dialog"
            aria-label="Notificações"
            className="fixed z-[100] rounded-lg border border-slate-200 bg-white text-gray-900 dark:border-white/10 dark:bg-[#0a141a] dark:text-[#f5fffc] w-80 max-w-[calc(100vw-1rem)] p-4 text-sm shadow-xl"
            style={{ top: posicao.top, right: posicao.direita }}
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="app-report-title">Notificações</h2>
              <button type="button" onClick={() => setAberto(false)} aria-label="Fechar" className="cursor-pointer">
                <X size={16} />
              </button>
            </div>

            {!ligadas && (
              <p className="py-4 text-center text-gray-500">
                As notificações do sistema estão desativadas em Configurações.
              </p>
            )}

            {ligadas && lista.length === 0 && (
              <p className="py-4 text-center text-gray-500">Nenhuma notificação por enquanto.</p>
            )}

            {ligadas && lista.length > 0 && (
              <>
                <div className="max-h-72 space-y-2 overflow-y-auto">
                  {lista.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => abrirNotificacao(item)}
                      className="block w-full cursor-pointer rounded-lg border border-slate-200 p-3 text-left hover:bg-gray-100 dark:border-white/10 dark:hover:bg-[#101f27]"
                    >
                      <span className="flex items-center gap-2 font-semibold">
                        {!foiLida(item.id) && <span className="h-2 w-2 rounded-full bg-red-500" />}
                        {item.titulo}
                      </span>
                      <span className="block text-xs text-gray-500">{item.texto}</span>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={marcarTodas}
                  className="mt-3 w-full cursor-pointer text-center text-xs font-semibold text-[#22c7a9]"
                >
                  Marcar todas como lidas
                </button>
              </>
            )}
          </div>
        </>,
        document.body
      )}
    </div>
  );
}
