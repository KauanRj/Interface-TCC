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

  LogOut,
  BellRing,
  TrendingUp,
  TrendingDown,
  User,
  UserRound,
  UserCircle,
  Plus,
  BarChart3,
  AlertTriangle,
  ShieldCheck,
  GraduationCap,
  BriefcaseBusiness,
  ClipboardList,
  UserCog,
  Phone,
}from "lucide-react";
import Lohran from "../../../public/lohran.png";
import { useNavigate } from "react-router";

export function Team() {
  const navigate = useNavigate();

  const funcionarios = [
    { id: 1, nome: "Mariana Silva", cargo: "Professora", setor: "Matematica", status: "Ativo" },
    { id: 2, nome: "Carlos Mendes", cargo: "Coordenador", setor: "Pedagogico", status: "Ativo" },
    { id: 3, nome: "Fernanda Lima", cargo: "Diretora", setor: "Gestao", status: "Ativo" },
    { id: 4, nome: "Juliana Costa", cargo: "Secretaria", setor: "Administrativo", status: "Pendente" },
    { id: 5, nome: "Ricardo Santos", cargo: "Supervisor", setor: "Ensino Medio", status: "Ativo" },
  ];

  const cargos = [
    { nome: "Professores", quantidade: 24, largura: "88%" },
    { nome: "Coordenadores", quantidade: 5, largura: "55%" },
    { nome: "Administrativo", quantidade: 7, largura: "65%" },
    { nome: "Supervisao", quantidade: 3, largura: "38%" },
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
            className="app-nav-active"
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
            <div >
              <h1 className="text-2xl font-bold">Team</h1>
              <p className="app-muted">Gerencie a equipe e acompanhe responsabilidades</p>
            </div>

            <div className="app-header-actions">
              <button 
              type="submit"
              className="app-button-relatorio">
                <Plus size={18} />
                Novo funcionario 
              </button>

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
          
          <div className="min-h-0 flex-1 overflow-y-auto">

            <div className="app-page-grid">

              <div className="app-grid-team">
                <div className="app-report-stat">
                  <div className="app-report-icon bg-cyan-500/15 text-cyan-500">
                    <Users size={20} />
                  </div>
                  <div>
                    <p>Total da equipe</p>
                    <span>50</span>
                  </div>
                </div>

                <div className="app-report-stat">
                  <div className="app-report-icon bg-emerald-500/15 text-emerald-500">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <p>Professores</p>
                    <span>32</span>
                  </div>
                </div>

                <div className="app-report-stat">
                  <div className="app-report-icon bg-indigo-500/15 text-indigo-500">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p>Coordenadores</p>
                    <span>3</span>
                  </div>
                </div>

                <div className="app-report-stat">
                  <div className="app-report-icon bg-orange-500/15 text-orange-500">
                    <BriefcaseBusiness size={20} />
                  </div>
                  <div>
                    <p>Administrativo</p>
                    <span>6</span>
                  </div>
                </div>

                <div className="app-report-stat">
                  <div className="app-report-icon bg-rose-500/15 text-rose-500">
                    <UserCog size={20} />
                  </div>
                  <div>
                    <p>Supervisores</p>
                    <span>4</span>
                  </div>
                </div>

                <div className="app-report-stat">
                  <div className="app-report-icon bg-violet-500/15 text-violet-500">
                    <ClipboardList size={20} />
                  </div>
                  <div>
                    <p>Secretarios</p>
                    <span>5</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
                <div className="app-card overflow-hidden p-4">
                  <h2 className="app-report-title mb-4">Funcionarios cadastrados</h2>

                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-left dark:border-white/10">
                        <th className="py-3 p-2">#</th>
                        <th>Nome</th>
                        <th>Cargo</th>
                        <th>Setor</th>
                        <th>Status</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {funcionarios.map((funcionario) => (
                        <tr
                          key={funcionario.id}
                          className="border-b border-slate-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-[#101f27]"
                        >
                          <td className="py-3 p-2">{funcionario.id}</td>
                          <td>{funcionario.nome}</td>
                          <td>{funcionario.cargo}</td>
                          <td>{funcionario.setor}</td>
                          <td>
                            <span className={funcionario.status === "Ativo" ? "app-status-green" : "app-status-yellow"}>
                              {funcionario.status}
                            </span>
                          </td>
                          <td>•••</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <aside className="grid gap-4">
                  <div className="app-card p-4">
                    <h2 className="app-report-title mb-4">Distribuicao por cargo</h2>

                    <div className="space-y-4">
                      {cargos.map((cargo) => (
                        <div key={cargo.nome}>
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span>{cargo.nome}</span>
                            <strong>{cargo.quantidade}</strong>
                          </div>
                          <div className="h-2 rounded-full bg-gray-200 dark:bg-white/10">
                            <div className="h-2 rounded-full bg-[#22c7a9]" style={{ width: cargo.largura }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="app-card p-4">
                    <h2 className="app-report-title mb-4">Contatos rapidos</h2>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3">
                        <Mail size={18} className="text-cyan-500" />
                        <span>Admir@educontrol.com</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone size={18} className="text-emerald-500" />
                        <span>(02) 4002-8922</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <ClipboardList size={18} className="text-violet-500" />
                        <span>4 tarefas pendentes</span>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
          
        </div>
        
      
    </main>
  );
}
