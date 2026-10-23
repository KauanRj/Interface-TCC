import { useState } from "react";
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
  UserRound,
  Mail,
  Phone,
  Briefcase,
  CalendarDays,
  ShieldCheck,
  Clock,
  Lock,
  Save,
  Camera,
  UserCircle,
  Eye,
  EyeOff,
  X
} from "lucide-react";

import Lohran from "../../../public/lohran.png";
import { useNavigate } from "react-router";


export function Perfil() {

  const navigate = useNavigate();

  const [modalSenha, setModalSenha] = useState(false);
  const [mostrarSenhaAtual, setMostrarSenhaAtual] = useState(false);
  const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [mensagemSenha, setMensagemSenha] = useState("");

  const alterarSenha = () => {
    setMensagemSenha("");

    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      setMensagemSenha("Preencha todos os campos.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setMensagemSenha("As senhas não coincidem.");
      return;
    }

    if (novaSenha.length < 6) {
      setMensagemSenha("A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setMensagemSenha("Senha alterada com sucesso!");

    setTimeout(() => {
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");
      setMensagemSenha("");
      setModalSenha(false);
    }, 1500);
  };

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
            className="app-nav-link"
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
            className="app-nav-active"
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

          <div>

            <h1 className="app-title">
              Perfil
            </h1>

            <p className="text-sm text-gray-500 dark:text-[#8fa9a3]">
              Gerencie suas informações pessoais
            </p>

          </div>

          <div className="flex items-center gap-4">

            <BellRing
              size={20}
              className="text-gray-700 dark:text-[#b9d2cc]"
            />

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

        <div className="flex-1 overflow-y-auto">

          <div className="app-page-grid">
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-[280px_minmax(0,1fr)]">
              <div className="app-card flex min-h-[390px] flex-col items-center justify-center p-5">
                <div className="relative mb-4">
                  <div className="h-28 w-28 overflow-hidden rounded-full bg-[#dbe5e5]">

                    <img
                      src={Lohran}
                      alt="Foto de perfil"
                      className="h-full w-full object-cover"/>

                  </div>
                  <button
                    type="button"
                    className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-[#0d7f70] text-white shadow-md transition hover:bg-[#09695e]"
                  >
                    <Camera size={17} />
                  </button>

                </div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Lohran
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-[#91aaa5]">
                  Administrador
                </p>
                <p className="mt-1 text-center text-xs text-gray-400 dark:text-[#718985]">
                  lohran@educontrol.local
                </p>

                <div className="mt-5 rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                  Conta ativa
                </div>

              </div>

            <div className="flex flex-col gap-4">

              <div className="app-card p-5">

                <div className="mb-5">

                  <h2 className="text-base font-bold text-gray-900 dark:text-white">
                    Informações pessoais
                  </h2>

                  <p className="mt-1 text-sm text-gray-500 dark:text-[#8fa9a3]">
                    Atualize suas informações de acesso e contato
                  </p>

                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                  <div className="flex flex-col gap-2">

                    <label
                      htmlFor="nome"
                      className="text-sm font-medium text-gray-700 dark:text-[#c4d3d0]"
                    >
                      Nome
                    </label>

                    <div className="relative">

                      <UserRound
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        id="nome"
                        type="text"
                        defaultValue="Lohran"
                        className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-[#0d7f70] dark:border-white/15 dark:bg-[#151515] dark:text-white dark:focus:border-[#22c7a9]"
                      />

                    </div>

                  </div>

                  <div className="flex flex-col gap-2">

                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700 dark:text-[#c4d3d0]"
                    >
                      E-mail
                    </label>

                    <div className="relative">

                      <Mail
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        id="email"
                        type="email"
                        defaultValue="lohran@educontrol.local"
                        className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-[#0d7f70] dark:border-white/15 dark:bg-[#151515] dark:text-white dark:focus:border-[#22c7a9]"
                      />

                    </div>

                  </div>

                  <div className="flex flex-col gap-2">

                    <label
                      htmlFor="cargo"
                      className="text-sm font-medium text-gray-700 dark:text-[#c4d3d0]"
                    >
                      Cargo
                    </label>

                    <div className="relative">

                      <Briefcase
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        id="cargo"
                        type="text"
                        defaultValue="Administrador do Sistema"
                        className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-[#0d7f70] dark:border-white/15 dark:bg-[#151515] dark:text-white dark:focus:border-[#22c7a9]"
                      />

                    </div>

                  </div>

                  <div className="flex flex-col gap-2">

                    <label
                      htmlFor="telefone"
                      className="text-sm font-medium text-gray-700 dark:text-[#c4d3d0]"
                    >
                      Telefone
                    </label>

                    <div className="relative">

                      <Phone
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        id="telefone"
                        type="tel"
                        defaultValue="(35) 99876-5432"
                        className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-[#0d7f70] dark:border-white/15 dark:bg-[#151515] dark:text-white dark:focus:border-[#22c7a9]"
                      />

                    </div>

                  </div>

                </div>

                <div className="mt-5 flex justify-end">

                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-lg bg-[#0d7f70] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#09695e]"
                  >
                    <Save size={17} />
                    Salvar alterações
                  </button>

                </div>

              </div>

              <div className="app-card p-5">

                <div className="mb-5">
                  <h2 className="text-base font-bold text-gray-900 dark:text-white">
                    Atividade da conta
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-[#8fa9a3]">
                    Informações sobre sua conta no EduControl
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                  <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 dark:border-white/10">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0d7f70]/10 text-[#0d7f70] dark:bg-[#22c7a9]/10 dark:text-[#22c7a9]">
                      <Clock size={18} />
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 dark:text-[#8fa9a3]">
                        Último acesso
                      </p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        Hoje, 20:10
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 dark:border-white/10">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0d7f70]/10 text-[#0d7f70] dark:bg-[#22c7a9]/10 dark:text-[#22c7a9]">
                      <ShieldCheck size={18} />
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 dark:text-[#8fa9a3]">
                        Nível de acesso
                      </p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        Administrador
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 dark:border-white/10">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0d7f70]/10 text-[#0d7f70] dark:bg-[#22c7a9]/10 dark:text-[#22c7a9]">
                      <CalendarDays size={18} />
                    </div>

                    <div>

                      <p className="text-xs text-gray-500 dark:text-[#8fa9a3]">
                        Membro desde
                      </p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        12 de janeiro de 2026
                      </p>

                    </div>
                  </div>
                </div>
              </div>

              <div className="app-card p-5">

                <div className="mb-5">

                  <h2 className="text-base font-bold text-gray-900 dark:text-white">
                    Segurança
                  </h2>

                  <p className="mt-1 text-sm text-gray-500 dark:text-[#8fa9a3]">
                    Gerencie a segurança da sua conta
                  </p>

                </div>
                <div className="flex flex-col gap-4">

                  <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-white/10">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0d7f70]/10 text-[#0d7f70] dark:bg-[#22c7a9]/10 dark:text-[#22c7a9]">
                        <Lock size={19} />
                      </div>
                      <div>

                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          Senha
                        </p>

                        <p className="mt-1 text-xs text-gray-500 dark:text-[#8fa9a3]">
                          Última alteração: 15/09/2026
                        </p>

                      </div>
                    </div>

                    <button
                      onClick={() => setModalSenha(true)}
                      className="rounded-xl border border-[#0d7f70]/30 px-4 py-2 text-sm font-medium text-[#0d7f70] transition hover:bg-[#0d7f70]/10 dark:text-[#22c7a9]"
                    >
                      Alterar senha
                    </button>

                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-white/10">
                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0d7f70]/10 text-[#0d7f70] dark:bg-[#22c7a9]/10 dark:text-[#22c7a9]">
                        <ShieldCheck size={19} />
                      </div>
                      <div>

                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          Sessões ativas
                        </p>

                        <p className="mt-1 text-xs text-gray-500 dark:text-[#8fa9a3]">
                          Você está conectado neste dispositivo.
                        </p>

                      </div>
                    </div>

                    <button
                      type="button"
                      className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-white/15 dark:text-[#d8e5e2] dark:hover:bg-white/5"
                    >
                      Ver sessões
                    </button>

                  </div>
                  </div>
                </div>

            </div>

            </div>
          </div>
        </div>
      </div>
      {modalSenha && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
    <div className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#151515]">

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#17332e] dark:text-white">
            Alterar senha
          </h2>

          <p className="mt-1 text-sm text-[#6f8781] dark:text-[#8fa9a3]">
            Atualize a senha da sua conta.
          </p>
        </div>

        <button
          onClick={() => {
            setModalSenha(false);
            setMensagemSenha("");
          }}
          className="rounded-lg p-2 text-[#6f8781] transition hover:bg-black/5 hover:text-[#17332e] dark:text-[#8fa9a3] dark:hover:bg-white/10 dark:hover:text-white"
        >
          <X size={20} />
        </button>
      </div>

      <div className="space-y-4">

        <div>
          <label className="mb-2 block text-sm font-medium text-[#17332e] dark:text-white">
            Senha atual
          </label>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8fa9a3]"
            />

            <input
              type={mostrarSenhaAtual ? "text" : "password"}
              value={senhaAtual}
              onChange={(e) => setSenhaAtual(e.target.value)}
              placeholder="Digite sua senha atual"
              className="w-full rounded-xl border border-black/10 bg-white py-3 pl-10 pr-11 text-sm outline-none transition focus:border-[#0d7f70] dark:border-white/10 dark:bg-[#1c1c1c] dark:text-white"
            />

            <button
              type="button"
              onClick={() => setMostrarSenhaAtual(!mostrarSenhaAtual)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8fa9a3]"
            >
              {mostrarSenhaAtual ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#17332e] dark:text-white">
            Nova senha
          </label>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8fa9a3]"
            />

            <input
              type={mostrarNovaSenha ? "text" : "password"}
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              placeholder="Digite a nova senha"
              className="w-full rounded-xl border border-black/10 bg-white py-3 pl-10 pr-11 text-sm outline-none transition focus:border-[#0d7f70] dark:border-white/10 dark:bg-[#1c1c1c] dark:text-white"
            />

            <button
              type="button"
              onClick={() => setMostrarNovaSenha(!mostrarNovaSenha)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8fa9a3]"
            >
              {mostrarNovaSenha ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#17332e] dark:text-white">
            Confirmar nova senha
          </label>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8fa9a3]"
            />

            <input
              type={mostrarConfirmacao ? "text" : "password"}
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              placeholder="Digite novamente a nova senha"
              className="w-full rounded-xl border border-black/10 bg-white py-3 pl-10 pr-11 text-sm outline-none transition focus:border-[#0d7f70] dark:border-white/10 dark:bg-[#1c1c1c] dark:text-white"
            />

            <button
              type="button"
              onClick={() => setMostrarConfirmacao(!mostrarConfirmacao)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8fa9a3]"
            >
              {mostrarConfirmacao ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {mensagemSenha && (
          <div
            className={`rounded-xl px-4 py-3 text-sm ${
              mensagemSenha.includes("sucesso")
                ? "bg-green-500/10 text-green-600 dark:text-green-400"
                : "bg-red-500/10 text-red-600 dark:text-red-400"
            }`}
          >
            {mensagemSenha}
          </div>
        )}

      </div>

      <div className="mt-6 flex justify-end gap-3">

        <button
          onClick={() => {
            setModalSenha(false);
            setMensagemSenha("");
          }}
          className="rounded-xl border border-black/10 px-4 py-2.5 text-sm font-medium text-[#526a65] transition hover:bg-black/5 dark:border-white/10 dark:text-[#b9d2cc] dark:hover:bg-white/10"
        >
          Cancelar
        </button>

        <button
          onClick={alterarSenha}
          className="rounded-xl bg-[#0d7f70] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#09695e]"
        >
          Alterar senha
        </button>

      </div>
    </div>
  </div>
)}
    </main>
  );
}