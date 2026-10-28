import {
  Users,
  Settings,
  BellRing,
  UserCircle,
  ShieldCheck,
  Bell,
  Lock,
  Save,
  CalendarDays,
  Radio,
  Clock,
  KeyRound,
  Check,
  ChevronRight,
} from "lucide-react";
import { leitorAtivo } from "~/utils/rfid";
import { Sidebar } from "~/components/Sidebar";
import { useUsuario } from "~/hooks/useUsuario";
import { nomeDoPerfil } from "~/auth/permissoes";

import Lohran from "../../../public/lohran-avatar.png";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

const ABAS = [
  { nome: "Geral", editar: "configuracoes.pessoais" },
  { nome: "Notificações", editar: "configuracoes.notificacoesGlobais" },
  { nome: "Regras da escola", editar: "configuracoes.regrasEscola" },
  { nome: "Permissões", editar: "configuracoes.permissoes" },
  { nome: "Segurança", editar: "perfil.alterarSenha" },
  { nome: "RFID", editar: "configuracoes.rfid" },
];

export function Configuracao() {
  const navigate = useNavigate();

  const [mensagem, setMensagem] = useState("");
  const [aba, setAba] = useState("Geral");
  const { pode, usuario } = useUsuario();
  let permissaoDaAba = "configuracoes.pessoais";
  for (let i = 0; i < ABAS.length; i++) {
    if (ABAS[i].nome === aba) {
      permissaoDaAba = ABAS[i].editar;
    }
  }
  const podeEditarAba = pode(permissaoDaAba);
  const podeEditarNotificacoes = pode("configuracoes.notificacoesGlobais");
  const podeEditarRegras = pode("configuracoes.regrasEscola");

  const [notificacoes, setNotificacoes] = useState(true);
  const [faltas, setFaltas] = useState(true);
  const [alunosRisco, setAlunosRisco] = useState(true);
  const [novosAlunos, setNovosAlunos] = useState(false);
  const [professoresAusentes, setProfessoresAusentes] = useState(true);
  const [emailRelatorios, setEmailRelatorios] = useState(false);

  const [horarioLimite, setHorarioLimite] = useState("07:10");
  const [anoLetivo, setAnoLetivo] = useState("2026");
  const [turno, setTurno] = useState("Matutino");

  const [modalSenha, setModalSenha] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [senhaNova, setSenhaNova] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erroSenha, setErroSenha] = useState("");

  useEffect(() => {
    try {
      const dadosSalvos = localStorage.getItem("educontrol-configuracoes");

      if (dadosSalvos) {
        const dados = JSON.parse(dadosSalvos);

        setNotificacoes(dados.notificacoes ?? true);
        setFaltas(dados.faltas ?? true);
        setAlunosRisco(dados.alunosRisco ?? true);
        setNovosAlunos(dados.novosAlunos ?? false);
        setProfessoresAusentes(dados.professoresAusentes ?? true);
        setEmailRelatorios(dados.emailRelatorios ?? false);
        setHorarioLimite(dados.horarioLimite ?? "07:10");
        setAnoLetivo(dados.anoLetivo ?? "2026");
        setTurno(dados.turno ?? "Matutino");
      }
    } catch {
      console.log("Não foi possível carregar as configurações.");
    }
  }, []);

  function salvarConfiguracoes() {
    let configuracoes: any = {};
    try {
      configuracoes = JSON.parse(localStorage.getItem("educontrol-configuracoes") || "{}");
    } catch {
      configuracoes = {};
    }

    if (podeEditarNotificacoes) {
      configuracoes.notificacoes = notificacoes;
      configuracoes.faltas = faltas;
      configuracoes.alunosRisco = alunosRisco;
      configuracoes.novosAlunos = novosAlunos;
      configuracoes.professoresAusentes = professoresAusentes;
      configuracoes.emailRelatorios = emailRelatorios;
    }

    if (podeEditarRegras) {
      configuracoes.horarioLimite = horarioLimite;
      configuracoes.anoLetivo = anoLetivo;
      configuracoes.turno = turno;
    }

    try {
      localStorage.setItem(
        "educontrol-configuracoes",
        JSON.stringify(configuracoes)
      );

      setMensagem("Configurações salvas com sucesso!");

      setTimeout(() => {
        setMensagem("");
      }, 3000);
    } catch {
      setMensagem("Não foi possível salvar as configurações.");
    }
  }

  function alterarSenha(e: any) {
    e.preventDefault();

    if (!senhaAtual || !senhaNova || !confirmarSenha) {
      setErroSenha("Preencha todos os campos.");
    } else if (senhaNova.length < 8) {
      setErroSenha("A senha precisa ter pelo menos 8 caracteres.");
    } else if (senhaNova !== confirmarSenha) {
      setErroSenha("As senhas não são iguais.");
    } else {
      setErroSenha(
        "Campos validados! A alteração real precisa ser conectada à API."
      );
    }
  }


  return (
    <main className="app-shell">
      <Sidebar ativo="/settings" />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="app-header">
          <div>
            <h1 className="app-title">Configurações</h1>
            <p className="app-muted">
              Gerencie as configurações do EduControl
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setAba("Notificações")}
              title="Notificações"
            >
              <BellRing
                size={20}
                className="text-gray-900 dark:text-[#f5fffc]"
              />
            </button>

            <button
              type="button"
              onClick={() => navigate("/perfil")}
              className="flex items-center gap-3"
            >
              <div className="app-avatar">
                <img
                  src={Lohran}
                  alt={usuario?.nome ?? "Usuário"}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>

              <span className="text-lg font-semibold text-gray-900 dark:text-[#f5fffc]">
                {usuario?.nome ?? ""}
              </span>
            </button>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="app-page-grid">
            

            {mensagem && (
              <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-700 dark:text-green-300">
                {mensagem}
              </div>
            )}

            <div className="app-card flex flex-wrap gap-2 p-4">
              {ABAS.map(({ nome }) => (
                <button
                  key={nome}
                  type="button"
                  onClick={() => setAba(nome)}
                  className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                    aba === nome
                      ? "border-[#0d4c5c] bg-[#0d4c5c] text-white"
                      : "border-slate-300 text-gray-700 hover:border-[#0d4c5c] dark:border-white/10 dark:text-white"
                  }`}
                >
                  {nome}
                </button>
              ))}
            </div>

            {!podeEditarAba && (
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-700 dark:text-amber-300">
                Somente leitura: apenas o administrador pode alterar estas
                configurações.
              </div>
            )}

            {aba === "Geral" && (
              <>
                <section className="app-card p-5">
                  <div className="mb-5 flex items-center gap-3">
                    <UserCircle size={23} className="text-[#0d8f7b]" />
                    <div>
                      <h3 className="font-semibold">Minha conta</h3>
                      <p className="app-muted text-sm">
                        Informações da conta conectada
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Nome
                      </label>
                      <input value={usuario?.nome ?? ""} readOnly className="app-input w-full" />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        E-mail
                      </label>
                      <input
                        value={usuario?.email ?? ""}
                        readOnly
                        className="app-input w-full"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Cargo
                      </label>
                      <input
                        value={usuario ? nomeDoPerfil(usuario.perfil) : ""}
                        readOnly
                        className="app-input w-full"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Situação
                      </label>
                      <div className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 dark:border-white/10">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        Conta ativa
                      </div>
                    </div>
                  </div>
                </section>

                <section className="app-card p-5">
                  <div className="mb-4 flex items-center gap-3">
                    <Settings size={23} className="text-[#0d8f7b]" />
                    <div>
                      <h3 className="font-semibold">Preferências gerais</h3>
                      <p className="app-muted text-sm">
                        Configurações básicas do sistema
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Aparência
                      </label>
                      <p className="app-muted rounded-lg border border-slate-200 p-3 text-sm dark:border-white/10">
                        Tema automático do sistema
                      </p>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Idioma
                      </label>
                      <p className="app-muted rounded-lg border border-slate-200 p-3 text-sm dark:border-white/10">
                        Português (Brasil)
                      </p>
                    </div>
                  </div>
                </section>
              </>
            )}

            {aba === "Notificações" && (
              <section className="app-card p-5">
                <div className="mb-5 flex items-center gap-3">
                  <Bell size={23} className="text-[#0d8f7b]" />
                  <div>
                    <h3 className="font-semibold">Notificações</h3>
                    <p className="app-muted text-sm">
                      Escolha os alertas que deseja receber.
                    </p>
                  </div>
                </div>

                <div className="divide-y divide-gray-100 dark:divide-white/10">
                  {[
                    {
                      titulo: "Notificações do sistema",
                      descricao: "Ativar os avisos gerais.",
                      valor: notificacoes,
                      alterar: setNotificacoes,
                    },
                    {
                      titulo: "Faltas e atrasos",
                      descricao: "Avisos de frequência dos alunos.",
                      valor: faltas,
                      alterar: setFaltas,
                    },
                    {
                      titulo: "Alunos em risco",
                      descricao: "Alertas sobre alunos que precisam de atenção.",
                      valor: alunosRisco,
                      alterar: setAlunosRisco,
                    },
                    {
                      titulo: "Novos alunos",
                      descricao: "Avisos de novos cadastros.",
                      valor: novosAlunos,
                      alterar: setNovosAlunos,
                    },
                    {
                      titulo: "Professores ausentes",
                      descricao: "Avisos de ausências dos professores.",
                      valor: professoresAusentes,
                      alterar: setProfessoresAusentes,
                    },
                    {
                      titulo: "Relatórios por e-mail",
                      descricao: "Preferência para envio de relatórios.",
                      valor: emailRelatorios,
                      alterar: setEmailRelatorios,
                    },
                  ].map((item) => (
                    <div
                      key={item.titulo}
                      className="flex items-center justify-between gap-4 py-3"
                    >
                      <div>
                        <p className="font-medium">{item.titulo}</p>
                        <p className="app-muted text-sm">{item.descricao}</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={item.valor}
                        onChange={(e) => item.alterar(e.target.checked)}
                        disabled={!podeEditarNotificacoes}
                        className="h-4 w-4 accent-[#0d8f7b] disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {aba === "Regras da escola" && (
              <section className="app-card p-5">
                <div className="mb-5 flex items-center gap-3">
                  <CalendarDays size={23} className="text-[#0d8f7b]" />
                  <div>
                    <h3 className="font-semibold">Regras da escola</h3>
                    <p className="app-muted text-sm">
                      Defina os parâmetros de frequência.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Horário limite
                    </label>
                    <div className="relative">
                      <Clock
                        size={18}
                        className="absolute left-3 top-3 text-gray-400"
                      />
                      <input
                        type="time"
                        value={horarioLimite}
                        onChange={(e) => setHorarioLimite(e.target.value)}
                        disabled={!podeEditarRegras}
                        className="app-input w-full pl-10 disabled:cursor-not-allowed disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Ano letivo
                    </label>
                    <select
                      value={anoLetivo}
                      onChange={(e) => setAnoLetivo(e.target.value)}
                      disabled={!podeEditarRegras}
                      className="app-input w-full disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Turno
                    </label>
                    <select
                      value={turno}
                      onChange={(e) => setTurno(e.target.value)}
                      disabled={!podeEditarRegras}
                      className="app-input w-full disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <option>Matutino</option>
                      <option>Vespertino</option>
                      <option>Noturno</option>
                    </select>
                  </div>
                </div>

                <p className="app-muted mt-4 text-sm">
                  As preferências ficam salvas no navegador. Para aplicar
                  regras reais de presença, será necessário conectar a API.
                </p>
              </section>
            )}

            {aba === "Permissões" && (
              <section className="app-card p-5">
                <div className="mb-5 flex items-center gap-3">
                  <ShieldCheck size={23} className="text-[#0d8f7b]" />
                  <div>
                    <h3 className="font-semibold">Usuários e permissões</h3>
                    <p className="app-muted text-sm">
                      Tipos de conta do EduControl.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="rounded-lg border border-slate-200 p-4 dark:border-white/10">
                    <div className="flex items-center gap-3">
                      <ShieldCheck size={22} className="text-blue-500" />
                      <div>
                        <p className="font-medium">Administrador</p>
                        <p className="app-muted text-sm">
                          Acesso completo a todas as áreas.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-200 p-4 dark:border-white/10">
                    <div className="flex items-center gap-3">
                      <Users size={22} className="text-purple-500" />
                      <div>
                        <p className="font-medium">Secretário</p>
                        <p className="app-muted text-sm">
                          Acesso limitado às funções da secretaria.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="app-muted mt-4 text-sm">
                  As permissões reais precisam ser aplicadas na autenticação e
                  na API.
                </p>
              </section>
            )}

            {aba === "Segurança" && (
              <section className="app-card p-5">
                <div className="mb-5 flex items-center gap-3">
                  <Lock size={23} className="text-[#0d8f7b]" />
                  <div>
                    <h3 className="font-semibold">Segurança da conta</h3>
                    <p className="app-muted text-sm">
                      Gerencie a proteção da sua conta.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setModalSenha(true);
                    setErroSenha("");
                  }}
                  className="flex w-full items-center justify-between gap-3 rounded-lg border border-slate-200 p-4 text-left transition hover:bg-gray-50 dark:border-white/10 dark:hover:bg-white/5"
                >
                  <div className="flex items-center gap-3">
                    <KeyRound size={22} />
                    <div>
                      <p className="font-medium">Alterar senha</p>
                      <p className="app-muted text-sm">
                        Abrir formulário de senha.
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={20} />
                </button>

                <div className="mt-3 flex items-center gap-3 rounded-lg border border-slate-200 p-4 dark:border-white/10">
                  <Lock size={22} />
                  <div>
                    <p className="font-medium">Proteção da conta</p>
                    <p className="app-muted text-sm">
                      Mantenha seus dados de acesso seguros.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {aba === "RFID" && (
              <section className="app-card p-5">
                <div className="mb-5 flex items-center gap-3">
                  <Radio size={23} className="text-[#0d8f7b]" />
                  <div>
                    <h3 className="font-semibold">Sistema RFID</h3>
                    <p className="app-muted text-sm">
                      Integração com os leitores de cartões.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 dark:border-white/10">
                  <Radio size={22} />
                  <div>
                    <p className="font-medium">Leitor de cartões</p>
                    <p className="app-muted text-sm">
                      {leitorAtivo()
                        ? "Ativo. Use o card Leitor RFID na tela inicial para ativar, desativar e simular leituras."
                        : "Inativo. Use o card Leitor RFID na tela inicial para ativar e simular leituras."}{" "}
                      O status real do leitor virá da API.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {podeEditarAba && (
              <div className="flex justify-end pb-6">
                <button
                  type="button"
                  onClick={salvarConfiguracoes}
                  className="flex items-center gap-2 rounded-lg bg-[#0d8f7b] px-5 py-3 font-semibold text-white transition hover:bg-[#0b7567]"
                >
                  <Save size={18} />
                  Salvar configurações
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {modalSenha && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setModalSenha(false)}
        >
          <div
            className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-[#0a141a]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="app-title text-xl">Alterar senha</h2>
                <p className="app-muted mt-1 text-sm">
                  Preencha os campos abaixo.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setModalSenha(false)}
                className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-white/10"
              >
                ×
              </button>
            </div>

            <form onSubmit={alterarSenha} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Senha atual
                </label>
                <input
                  type="password"
                  value={senhaAtual}
                  onChange={(e) => setSenhaAtual(e.target.value)}
                  className="app-input w-full"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Nova senha
                </label>
                <input
                  type="password"
                  value={senhaNova}
                  onChange={(e) => setSenhaNova(e.target.value)}
                  className="app-input w-full"
                  minLength={8}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Confirmar nova senha
                </label>
                <input
                  type="password"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  className="app-input w-full"
                  required
                />
              </div>

              {erroSenha && (
                <p className="text-sm text-orange-600 dark:text-orange-400">
                  {erroSenha}
                </p>
              )}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0d8f7b] px-4 py-3 font-semibold text-white transition hover:bg-[#0b7567]"
              >
                <Check size={18} />
                Validar senha
              </button>

              <p className="app-muted text-xs">
                A validação funciona no front-end, mas a senha real ainda
                precisa ser alterada pela API.
              </p>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}