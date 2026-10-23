import { 
  LayoutDashboard, 
  List, 
  Filter, 
  ClipboardCheck, 
  DoorOpen, 
  Users, 
  Settings, 
  LogOut, 
  BellRing, 
  UserCircle, 
  UserRound, 
  Send, 
  Bot, 
  Trash2,
  User 
} from "lucide-react";

import Lohran from "../../../public/lohran.png";
import { useNavigate } from "react-router";

import { useEffect, useRef, useState } from "react";
import { enviarParaIA } from "../../services/iaService";

export function IA() {

  const navigate = useNavigate();

  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  const [autoScroll, setAutoScroll] = useState(true);

  const [mensagens, setMensagens] = useState([
    {
      tipo: "ia",
      texto: "Olá! 👋 Sou o assistente do EduControl. Como posso ajudar?"
    }
  ]);

  const fimDoChat = useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (autoScroll) {

      fimDoChat.current?.scrollIntoView({
        behavior: "smooth"
      });

    }

  }, [mensagens, autoScroll]);
async function enviarMensagem() {
  if (carregando) {
    return;
  }

  if (mensagem.trim() === "") {
    return;
  }

  const pergunta = mensagem;

  const novaMensagem = {
    tipo: "usuario",
    texto: pergunta
  };

  setMensagens((mensagensAtuais) => [
    ...mensagensAtuais,
    novaMensagem
  ]);

  setMensagem("");
  setCarregando(true);

  try {
    const novaResposta = {
      tipo: "ia",
      texto: "..."
    };

    setMensagens((mensagensAtuais) => [
      ...mensagensAtuais,
      novaResposta
    ]);

    await enviarParaIA(pergunta, mensagens, (texto) => {
      setMensagens((mensagensAtuais) => {
        const novasMensagens = [...mensagensAtuais];

        novasMensagens[novasMensagens.length - 1] = {
          tipo: "ia",
          texto: texto
        };

        return novasMensagens;
      });
    });

  } catch (erro) {
    console.log("Erro no Gemini:", erro);

    setMensagens((mensagensAtuais) => {
      const novasMensagens = [...mensagensAtuais];

      novasMensagens[novasMensagens.length - 1] = {
        tipo: "ia",
        texto: "Não consegui responder agora. Tente novamente em alguns instantes."
      };

      return novasMensagens;
    });

  } finally {
    setCarregando(false);
  }
}

function limparConversa() {
  setMostrarConfirmacao(true);
}

  function usarSugestao(pergunta: string) {
  setMensagem(pergunta);
}
function confirmarLimpeza() {
  setMensagens([
    {
      tipo: "ia",
      texto: "Olá! 👋 Sou o assistente do EduControl. Como posso ajudar?"
    }
  ]);

  setMensagem("");
  setAutoScroll(true);
  setMostrarConfirmacao(false);
}

  return (

    <main className="app-shell h-screen overflow-hidden">

      <aside className="app-sidebar">

        <div className="flex items-center gap-3 mb-10">

          <span className="sm:text-2xl">

            <span className="app-login-logo-edu">
              Edu
            </span>

            <span className="app-login-logo-control">
              Control
            </span>

          </span>

        </div>

        <nav className="flex flex-col gap-2">

          <a
            onClick={() => navigate("/home")}
            className="app-nav-link"
          >
            <LayoutDashboard size={20} />
            <span>Início</span>
          </a>

          <a
            onClick={() => navigate("/relatorios")}
            className="app-nav-link"
          >
            <List size={20} />
            <span>Relatórios</span>
          </a>

          <a
            onClick={() => navigate("/ia")}
            className="app-nav-active"
          >
            <Filter size={20} />
            <span>Assistente de IA</span>
          </a>

          <a
            onClick={() => navigate("/team")}
            className="app-nav-link-between"
          >

            <div className="flex items-center gap-3">

              <Users size={20} />

              <span>Team</span>

            </div>

          </a>

          <a
            onClick={() => navigate("/presenca")}
            className="app-nav-link"
          >
            <ClipboardCheck size={20} />
            <span>Presenças</span>
          </a>

          <a
            onClick={() => navigate("/salas")}
            className="app-nav-link"
          >
            <DoorOpen size={20} />
            <span>Salas</span>
          </a>

          <a
            onClick={() => navigate("/alunos")}
            className="app-nav-link"
          >
            <UserRound size={20} />
            <span>Alunos</span>
          </a>

        </nav>

        <div className="app-divider" />

        <nav>

          <a
            onClick={() => navigate("/settings")}
            className="app-nav-link"
          >
            <Settings size={20} />
            <span>Settings</span>
          </a>

        </nav>

        <div className="flex-1" />

        <div className="flex flex-col gap-3">

          <a
            onClick={() => navigate("/perfil")}
            className="app-nav-link"
          >
            <UserCircle size={20} />
            <span>Perfil</span>
          </a>

          <a
            onClick={() => navigate("/log")}
            className="app-nav-link"
          >
            <LogOut size={20} />
            <span>Log out</span>
          </a>

        </div>

      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">

        <div className="app-header">

          <div>

            <h1 className="text-2xl font-bold">
              Assistente de IA
            </h1>

            <p className="app-muted">
              Receba análises e sugestões para melhorar o acompanhamento escolar
            </p>

          </div>

          <div className="app-header-actions">

            <BellRing size={20} />

            <div className="app-avatar">

              <img
                src={Lohran}
                alt="Profile"
                className="rounded-full"
              />

            </div>

            <span className="text-lg font-semibold text-gray-900 dark:text-[#f5fffc]">
              Lohran
            </span>

          </div>

        </div>

        <div className="flex-1 min-h-0 p-6">

          <div className="flex h-full  min-h-0  flex-col rounded-xl border border-gray-700 bg-[#0d1519]">
             <div className="flex items-center justify-between border-b border-gray-700 p-4">

              <div>

                <h2 className="font-semibold">
                  EduControl IA
                </h2>

                <p className="text-sm text-gray-500">
                  Assistente inteligente
                </p>

              </div>

              <button
                onClick={limparConversa}
                disabled={carregando}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50">
                <Trash2 size={18} />
                Limpar conversa
              </button>

            </div>
            <div
              className="min-h-0    flex-1 overflow-y-auto p-6"
              onScroll={(e) => {

                const elemento = e.currentTarget;

                const estaNoFinal =
                  elemento.scrollHeight - elemento.scrollTop <=
                  elemento.clientHeight + 50;

                setAutoScroll(estaNoFinal);

              }}
            >

              {mensagens.map((msg, index) => (

                <div
                  key={index}
                  className={`flex items-start gap-3 mb-5 ${
                    msg.tipo === "usuario"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  {msg.tipo === "ia" && (
                    <Bot size={24} />
                  )}

                  <div
                    className={`max-w-[70%] ${
                      msg.tipo === "usuario"
                        ? "text-right"
                        : "text-left"
                    }`}
                  >

                    <p className="font-semibold">

                      {msg.tipo === "ia"
                        ? "EduControl IA"
                        : "Você"}

                    </p>

                    <p className="text-gray-400">
                     {msg.texto === "..." ? (
                      <span className="animate-pulse">
                        ● ● ●
                      </span>
                      ) : (
                         msg.texto
                      )}
                    </p>

                  </div>

                  {msg.tipo === "usuario" && (
                    <User size={24} />
                  )}

                </div>

              ))}

              {mensagens.length === 1 &&  !carregando && (
              
                <div className="mt-8">
                
                  <p className="mb-3 text-sm text-gray-500">
                    Sugestões rápidas
                  </p>
              
                  <div className="grid grid-cols-2 gap-3">
              
                    <button
                      onClick={() =>
                        usarSugestao("Como funciona o EduControl?")
                      }
                      className="rounded-lg border border-gray-700 bg-[#111c21] p-4 text-left text-sm text-gray-300 hover:bg-[#16252b]"
                    >
                      Como funciona o EduControl?
                    </button>
                                        
                    <button
                      onClick={() =>
                        usarSugestao("Como funciona o controle de presença?")
                      }
                      className="rounded-lg border border-gray-700 bg-[#111c21] p-4 text-left text-sm text-gray-300 hover:bg-[#16252b]"
                    >
                      Como funciona o controle de presença?
                    </button>
                    
                    <button
                      onClick={() =>
                        usarSugestao("Como gerar um relatório?")
                      }
                      className="rounded-lg border border-gray-700 bg-[#111c21] p-4 text-left text-sm text-gray-300 hover:bg-[#16252b]"
                    >
                      Como gerar um relatório?
                    </button>
                                        
                    <button
                      onClick={() =>
                        usarSugestao("O que posso perguntar para você?")
                      }
                      className="rounded-lg border border-gray-700 bg-[#111c21] p-4 text-left text-sm text-gray-300 hover:bg-[#16252b]"
                    >
                      O que posso perguntar para você?
                    </button>
                    
                  </div>
                </div>

              )}

              <div ref={fimDoChat}></div>

            </div>

            <div className="flex gap-3 border-t border-gray-700 p-4">

              <input
                type="text"
                placeholder="Digite sua mensagem..."
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                onKeyDown={(e) => {

                  if (e.key === "Enter") {
                    enviarMensagem();
                  }

                }}
                disabled={carregando}
                className="flex-1 rounded-lg border border-gray-700 bg-[#050b0e] px-4 py-3 outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />

              <button
                onClick={enviarMensagem}
                disabled={carregando}
                className="rounded-lg bg-[#0d4c5c] px-4"
              >

                <Send size={20} />

              </button>

            </div>

          </div>

        </div>

      </div>

          {mostrarConfirmacao && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          
            <div className="w-full max-w-md rounded-xl border border-gray-700 bg-[#0d1519] p-6 shadow-2xl">
            
              <h2 className="text-lg font-semibold text-white">
                Limpar conversa?
              </h2>
            
              <p className="mt-2 text-sm text-gray-400">
                Tem certeza que deseja apagar toda a conversa?
              </p>
            
              <p className="mt-1 text-sm text-gray-500">
                Essa ação não poderá ser desfeita.
              </p>
            
              <div className="mt-6 flex justify-end gap-3">
            
                <button
                  onClick={() => setMostrarConfirmacao(false)}
                  className="rounded-lg px-4 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-white"
                >
                  Cancelar
                </button>
            
                <button
                  onClick={confirmarLimpeza}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                >
                  Limpar conversa
                </button>
            
              </div>
            
            </div>

    </div>
  )}


    </main>

  );

}