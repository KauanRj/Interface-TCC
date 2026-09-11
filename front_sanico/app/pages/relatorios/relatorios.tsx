import {
  Home,
  LayoutDashboard,
  List,
  Filter,
  Mail,
  ClipboardCheck,
  DoorOpen,
  Users,
  Settings,
  Download,
  LogOut,
  BellRing,
  TrendingUp,
  AlertTriangle,
  BarChart3,
  Search,
  UserRound,
  UserCircle,
} from "lucide-react";
import Lohran from "../../../public/lohran.png";
import { useNavigate } from "react-router";

export function Relatorios() {
  const navigate = useNavigate();

  const alunos = [
    { id: 1, nome: "Ana Clara Silva", turma: "9º Ano A", presenca: "95%", media: "8,7", situacao: "Bom" },
    { id: 2, nome: "Bruno Almeida", turma: "8º Ano B", presenca: "78%", media: "6,9", situacao: "Em atenção" },
    { id: 3, nome: "Carlos Eduardo", turma: "9º Ano A", presenca: "60%", media: "5,4", situacao: "Risco" },
    { id: 4, nome: "Daniela Santos", turma: "7º Ano A", presenca: "88%", media: "7,8", situacao: "Bom" },
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
            className="app-nav-link"
          >
            <LayoutDashboard size={20} />
            <span>Início</span>
          </a>

          <a
            onClick={() => navigate("/relatorios")}
            className="app-nav-active"
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

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

        <div className="app-header">
          <div>
            <h1 className="app-title ">
              Relatorios
            </h1>
            <p className="app-muted">
              Acompanhe o desempenho, a frequenia e outros indicadores da sua escola
            </p>
          </div>  
          <button 
          type="button"
          className="app-button-relatorio ">
            <Download size={18} />
            Gerar relatorio
          </button>

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
       <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="app-page-grid ">

          <div className="app-grid-relatorio">

            <div className="app-report-stat">
              <div className="app-report-icon blue">
                <Users size={20} />
              </div>
              <div>
                <p>Total de alunos</p>
                <span>428</span>
              </div>
            </div>

            <div className="app-report-stat">
              <div className="app-report-icon green">
                <TrendingUp size={20} />
              </div>
              <div>
                <p>Taxa de presença</p>
                <span>82%</span>                
              </div>
            </div>

            <div className="app-report-stat">
              <div className="app-report-icon yellow">
                <AlertTriangle size={20} />
              </div>
              <div>
                <p>Alunos em atenção</p>
                <span>12</span>                
              </div>
            </div>

            <div className="app-report-stat">
              <div className="app-report-icon red">
                <BarChart3 size={20} />
              </div>
              <div>
                <p>Alunos com risco</p>
                <span>8</span>
                
              </div>
            </div>

          </div>
           <div className="app-report-filters">

        <div>
          <label>Período</label>
          <select>
            <option>Últimos 30 dias</option>
            <option>Últimos 7 dias</option>
            <option>Este mês</option>
            <option>Este ano</option>
          </select>
        </div>

        <div>
          <label>Turma</label>
          <select>
            <option>Todas as turmas</option>
            <option>9º Ano A</option>
            <option>9º Ano B</option>
          </select>
        </div>

        <div>
          <label>Disciplina</label>
          <select>
            <option>Todas as disciplinas</option>
            <option>Matemática</option>
            <option>Português</option>
            <option>Ciências</option>
          </select>
        </div>

        <div>
          <label>Tipo de relatório</label>
          <select>
            <option>Desempenho</option>
            <option>Frequência</option>
            <option>Alunos</option>
          </select>
        </div>



      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

        <div className="app-card p-5 lg:col-span-2">
          <h2 className="app-report-title">
            Desempenho por disciplina
          </h2>

          <div className="flex h-64 items-center justify-center text-gray-400">
            Gráfico de desempenho
          </div>
        </div>

        <div className="app-card p-5">
          <h2 className="app-report-title">
            Frequência dos alunos
          </h2>

          <div className="flex h-64 items-center justify-center text-gray-400">
            Gráfico de frequência
          </div>
        </div>

      </div>
      <div className="app-report-search">
          <label>Pesquisar</label>
          <div>
            <Search size={17} />
            <input placeholder="Pesquisar aluno..." />
          </div>
        </div>

      <div className="app-card overflow-hidden">

        <div className="border-b border-slate-200 p-5 dark:border-white/10">
          <h2 className="app-report-title">
            Relatório de alunos
          </h2>
        </div>

        <div className="overflow-x-auto p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b  border-slate-200 text-left dark:border-white/10">
                <th className=" py-3 p-2">#</th>
                <th>Aluno</th>
                <th>Turma</th>
                <th>Presença</th>
                <th>Média</th>
                <th>Situação</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {alunos.map((aluno) => (
                <tr
                  key={aluno.id}
                  className="border-b border-slate-200 dark:border-white/5"
                >
                  <td className="py-3 p-2">{aluno.id}</td>
                  <td>{aluno.nome}</td>
                  <td>{aluno.turma}</td>
                  <td>{aluno.presenca}</td>
                  <td>{aluno.media}</td>
                  <td>
                    <span className={aluno.situacao === "Bom" ? "app-status-green" : aluno.situacao === "Em atenção" ? "app-status-yellow" : "app-status-red"}>
                      {aluno.situacao}
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

      </div>

    </main>
  );
}