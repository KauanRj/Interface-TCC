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
  User
}from "lucide-react";
import Lohran from "../../../public/lohran.png";
import { useNavigate } from "react-router";

import { useState } from "react";
import { testarGemini } from "../../testeGemini";

export function IA() {
  const navigate = useNavigate();

  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  const [mensagens, setMensagens] = useState([
    {
      tipo: "ia",
      texto: "Olá! 👋 Sou o assistente do EduControl. Como posso ajudar?"
    }
  ]);

async function enviarMensagem() {
  if (mensagem.trim() === "") {
    return;
  }

  const pergunta = mensagem;

  const novaMensagem = {
    tipo: "usuario",
    texto: pergunta
  };

  setMensagens([...mensagens, novaMensagem]);
  setMensagem("");
  setCarregando(true);

  try {
    const resposta = await testarGemini(pergunta);

    const novaResposta = {
      tipo: "ia",
      texto: resposta
    };

    setMensagens((mensagensAtuais) => [
      ...mensagensAtuais,
      novaResposta
    ]);

 } catch (erro) {
  console.log("Erro no Gemini:", erro);

  const mensagemErro =
    erro instanceof Error
      ? erro.message
      : String(erro);

  const novaResposta = {
    tipo: "ia",
    texto: "Erro: " + mensagemErro
  };

  setMensagens((mensagensAtuais) => [
    ...mensagensAtuais,
    novaResposta
  ]);
} finally {
    setCarregando(false);
  }
}

  return (
    <main className="app-shell">
   
      <aside className="app-sidebar">
        <div className="flex items-center gap-3 mb-10">
          <span className="sm:text-2xl">
             <span className="app-login-logo-edu">Edu</span>
             <span className="app-login-logo-control">Control</span>
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

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          
                    <div className="app-header">
                      <div >
                        <h1 className="text-2xl font-bold">Assistente de IA</h1>
                        <p className="app-muted">Receba análises e sugestões para melhorar o acompanhamento escolar</p>
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
                        <span className="text-lg font-semibold text-gray-900 dark:text-[#f5fffc]">Lohran</span>
                      </div>
                    </div>
                    
        <div className="flex-1 p-6">

        <div className="h-full rounded-xl border border-gray-700 bg-[#0d1519]">

          <div className="flex-1 p-6">
            {mensagens.map((msg, index) => (
          <div
             key={index}
             className="flex items-start gap-3 mb-5" >

            {msg.tipo === "ia" ? (
              <Bot size={24} />
            ) : (

              <User size={24} />
            )}

         <div>
           <p className="font-semibold">
             {msg.tipo === "ia" ? "EduControl IA" : "Você"}
           </p>

           <p className="text-gray-400">
             {msg.texto}
           </p>
         </div>
         </div>
         ))}

         {carregando && (
          <div className="flex items-start gap-3 mb-5">
          <Bot size={24} />

           <div>
            <p className="font-semibold">EduControl IA</p>
            <p className="text-gray-400">
              Pensando...
            </p>
           </div>
          </div>
          )}

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
             className="flex-1 rounded-lg border border-gray-700 bg-[#050b0e] px-4 py-3 outline-none"
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
       
     
   </main>
  );
}
