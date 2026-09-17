import {
  Home,
  LayoutDashboard,
  List,
  Filter,
  UserCircle,
  ClipboardCheck,
  DoorOpen,
  Users,
  UserRound,
  Settings,
  User,
  LogOut,
  BellRing,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import Lohran from "../../../public/lohran.png";
import { useNavigate } from "react-router";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


export function Welcome() {
  const navigate = useNavigate();

  const dadosFrequencia = [
    { dia: "5", presentes: 800, faltosos: 250, pendentes: 150 },
    { dia: "6", presentes: 700, faltosos: 210, pendentes: 290 },
    { dia: "7", presentes: 700, faltosos: 100, pendentes: 400 },
    { dia: "8", presentes: 850, faltosos: 300, pendentes: 50 },
    { dia: "9", presentes: 600, faltosos: 300, pendentes: 200 },
    { dia: "10", presentes: 800, faltosos: 350, pendentes: 50 },
    { dia: "11", presentes: 780, faltosos: 120, pendentes: 300 },
    { dia: "12", presentes: 1000, faltosos: 50, pendentes: 150 },
    { dia: "13", presentes: 600, faltosos: 320, pendentes: 280 },
    { dia: "14", presentes: 800, faltosos: 100, pendentes: 300 },
  ];

  const cardsInicio = [
    { titulo: "Presentes", valor: "362", texto: "84% do total", tipo: "strong" },
    { titulo: "Pendentes", valor: "6", texto: "chamadas abertas", tipo: "normal" },
    { titulo: "Faltou", valor: "34", texto: "8% do total", tipo: "normal" },
  ];

  const preRelatorio = [
    { label: "presentes", valor: 362, cor: "bg-emerald-500" },
    { label: "faltosos", valor: 34, cor: "bg-red-500" },
    { label: "faltam marcar presença", valor: 6, cor: "bg-yellow-500" },
  ];

  const alunosAtencao = [
    { id: 1, nome: "Carlos Eduardo", turma: "9º Ano A", motivo: "Media baixa", status: "Risco" },
    { id: 2, nome: "Bruno Almeida", turma: "8º Ano B", motivo: "Frequencia baixa", status: "Atenção" },
    { id: 3, nome: "Igor Fernandes", turma: "7º Ano A", motivo: "Faltas recentes", status: "Risco" },
    { id: 4, nome: "Lucas Pereira", turma: "8º Ano A", motivo: "Notas pendentes", status: "Atenção" },
  ];

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
            className="app-nav-active"
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

      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <div className="app-header">
          <div>
            <h1 className="app-title">
              Bem-vindo de volta, Lohran!
            </h1>
            <p className="app-muted">
              O que deseja fazer ou ver hoje?
            </p>
          </div>

          <div>
            <input
              type="text"
              placeholder="Pesquisar..."
              className="app-input w-full max-w-80"
            />
          </div>

          <div className="flex items-center gap-4">
            <BellRing size={20} className="text-gray-900 dark:text-[#f5fffc]" />

            <div className="app-avatar">
              <img
                src={Lohran}
                alt="Lohran"
                className="rounded-full"
              />
            </div>

            <span className="text-lg font-semibold text-gray-900 dark:text-[#f5fffc]">
              Lohran
            </span>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="app-page-grid">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {cardsInicio.map((card) => (
              <div
                key={card.titulo}
                className={card.tipo === "strong" ? "app-card-strong min-h-36 p-5" : "app-card min-h-36 p-5"}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className={card.tipo === "strong" ? "text-sm font-semibold text-white" : "text-sm font-semibold text-gray-900 dark:text-white"}>
                      {card.titulo}
                    </p>
                    <strong className={card.tipo === "strong" ? "mt-3 block text-3xl text-white" : "mt-3 block text-3xl text-gray-900 dark:text-white"}>
                      {card.valor}
                    </strong>
                    <span className={card.tipo === "strong" ? "text-sm text-white/70" : "text-sm text-gray-500 dark:text-[#8fb1aa]"}>
                      {card.texto}
                    </span>
                  </div>

                  <span className={card.tipo === "strong" ? "text-white/80" : "text-[#22c7a9]"}>
                    ›
                  </span>
                </div>

                <div className={card.tipo === "strong" ? "absolute bottom-5 left-5 text-white/80" : "absolute bottom-5 left-5 text-gray-500 dark:text-[#8fb1aa]"}>
                  {card.titulo === "Faltou" ? <TrendingDown size={18} /> : <TrendingUp size={18} />}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
            <div className="app-card min-h-80 overflow-hidden p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="app-report-title">Grafico de frequência</h2>
                <select className="h-9 rounded-lg border border-slate-300 bg-gray-200 px-3 text-sm dark:border-white/10 dark:bg-[#0c171d] dark:text-white">
                  <option>Últimos 14 dias</option>
                  <option>Últimos 30 dias</option>
                </select>
              </div>

              <div className="h-60 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart
                   data={dadosFrequencia}
                   margin={{
                     top: 5,
                     right: 10,
                     left: 0,
                     bottom: 5,
                   }}
                 >
                   <CartesianGrid
                     strokeDasharray="0"
                     vertical={true}
                     horizontal={false}
                     className="opacity-30"
                   />

                   <XAxis
                     dataKey="dia"
                     tick={{ fontSize: 12 }}
                     axisLine={false}
                     tickLine={false}
                   />

                   <YAxis
                     tick={{ fontSize: 11 }}
                     axisLine={false}
                     tickLine={false}
                     width={40}
                   />

                   <Tooltip />
                 
                   <Line
                     type="monotone"
                     dataKey="presentes"
                     stroke="#22c7a9"
                     strokeWidth={3}
                     dot={false}
                     activeDot={{ r: 5 }}
                   />

                   <Line
                     type="monotone"
                     dataKey="faltosos"
                     stroke="#f59e0b"
                     strokeWidth={3}
                     dot={false}
                     activeDot={{ r: 5 }}
                   />

                   <Line
                     type="monotone"
                     dataKey="pendentes"
                     stroke="#2f8de4"
                     strokeWidth={3}
                     dot={false}
                     activeDot={{ r: 5 }}
                   />
                 </LineChart>
               </ResponsiveContainer>
             </div>

            </div>

            <aside className="app-card min-h-80 p-5">
              <h2 className="app-report-title mb-5">Pré-relatório</h2>

              <div className="flex justify-center">
                <div className="flex h-36 w-36 items-center justify-center rounded-full bg-[conic-gradient(#22c7a9_0_78%,#ef4444_78%_92%,#f59e0b_92%_100%)]">
                  <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white dark:bg-[#0a141a]">
                    <strong className="text-2xl text-gray-900 dark:text-white">84%</strong>
                    <span className="text-xs text-gray-500 dark:text-[#8fb1aa]">presença</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {preRelatorio.map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`h-3 w-3 rounded-sm ${item.cor}`} />
                      <span className="text-gray-600 dark:text-[#b9d2cc]">{item.label}</span>
                    </div>
                    <strong>{item.valor}</strong>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          <div className="app-card overflow-hidden p-4">
            <h2 className="app-report-title mb-4">Alunos que precisam de atenção</h2>

            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-left dark:border-white/10">
                  <th className="py-3 p-2">#</th>
                  <th>Aluno</th>
                  <th>Turma</th>
                  <th>Motivo</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {alunosAtencao.map((aluno) => (
                  <tr
                    key={aluno.id}
                    className="border-b border-slate-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-[#101f27]"
                  >
                    <td className="py-3 p-2">{aluno.id}</td>
                    <td>{aluno.nome}</td>
                    <td>{aluno.turma}</td>
                    <td>{aluno.motivo}</td>
                    <td>
                      <span className={aluno.status === "Risco" ? "app-status-red" : "app-status-yellow"}>
                        {aluno.status}
                      </span>
                    </td>
                    <td>•••</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </div>
      </div>
    </main>
  );
}

