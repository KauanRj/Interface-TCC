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
  Plus,
  AlertTriangle,
  BarChart3,
  Search,
  LogOut,
  BellRing,
  TrendingUp,
  UserCircle,
  UserRound,
  FilePlus,
  FilePenLine,
}from "lucide-react";
import Lohran from "../../../public/lohran.png";
import { useNavigate } from "react-router";

export function Presenca() {
  const navigate = useNavigate();

  const alunos = [
    { id: 1, nome: "Ana Clara Silva", turma: "9º Ano A", entrada: "95%", status: "Presente" },
    { id: 2, nome: "Bruno Almeida", turma: "8º Ano B", entrada: "78%", status: "Atrasado" },
    { id: 3, nome: "Carlos Eduardo", turma: "9º Ano A", entrada: "60%",  status: "Justificado" },
    { id: 4, nome: "Daniela Santos", turma: "7º Ano A", entrada: "88%",  status: "Ausente" },
    { id: 5, nome: "Eduardo Lima", turma: "8º Ano A", entrada: "90%", status: "Presente" },
    { id: 6, nome: "Fernanda Costa", turma: "7º Ano B", entrada: "82%", status: "Presente" },
    { id: 7, nome: "Gabriel Martins", turma: "9º Ano B", entrada: "70%", status: "Atrasado" },
    { id: 8, nome: "Helena Ribeiro", turma: "8º Ano B", entrada: "93%", status: "Presente" },
    { id: 9, nome: "Igor Fernandes", turma: "7º Ano A", entrada: "58%", status: "Ausente" },
    { id: 10, nome: "Julia Almeida", turma: "9º Ano A", entrada: "85%", status: "Presente" },
    { id: 11, nome: "Lucas Pereira", turma: "8º Ano A", entrada: "76%", status: "Justificado" },
    { id: 12, nome: "Mariana Souza", turma: "7º Ano B", entrada: "91%", status: "Presente" },
    { id: 13, nome: "Nicolas Santos", turma: "9º Ano B", entrada: "64%", status: "Ausente" },
    { id: 14, nome: "Olivia Rocha", turma: "8º Ano B", entrada: "87%", status: "Presente" },
    { id: 15, nome: "Pedro Henrique", turma: "7º Ano A", entrada: "73%", status: "Atrasado" },
    { id: 16, nome: "Rafaela Mendes", turma: "9º Ano A", entrada: "96%", status: "Presente" },
  ]; 

  const turmas = [
    { nome: "7º Ano A", porcentagem: "92%" },
    { nome: "8º Ano B", porcentagem: "85%" },
    { nome: "9º Ano A", porcentagem: "81%" },
    { nome: "9º Ano B", porcentagem: "79%" },
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
            className="app-nav-link-between"
          >
            <div className="flex items-center gap-3">
              <Users size={20} />
              <span>Team</span>
            </div>

          </a>

          <a
            onClick={() => navigate("/presenca")}
            className="app-nav-active"
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
              <h1 className="text-2xl font-bold">Presença</h1>
              <p className="app-muted">Acompanhe e registre a frequencia dos alunos</p>
            </div>



            <div className="app-header-actions">
              <button 
              type="button"
              className="app-button-relatorio w-50">
                <FilePlus size={18} />
                Registrar presença
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
          <div className="app-grid-relatorio p-5"> 
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
                <p>Ausentes</p>
                <span>280</span>
                
              </div>
            </div>

            <div className="app-report-stat">
              <div className="app-report-icon yellow">
                <AlertTriangle size={20} />
              </div>
              <div>
                <p>Atrasados</p>
                <span>12</span>
                
              </div>
            </div>

            <div className="app-report-stat">
              <div className="app-report-icon purple">
                <FilePenLine size={20} />
              </div>
              <div>
                <p>Justificados</p>
                <span>8</span>
                
              </div>
            </div>
            
          
          </div> 


          <div className="app-page-grid"> 

            

            <div className="app-report-filters">

              <div className="app-report-search">
                <label>Pesquisar</label>
                <div>
                  <Search size={17} />
                  <input placeholder="Pesquisar aluno..." />
                </div>
              </div>



              <div>
                <label>Data</label>
                <select>
                  <option>Todas as datas</option>
                  <option>Hoje</option>
                  <option>Esta semana</option>
                  <option>Este mês</option>
                
                </select>
              </div>

              <div>
                <label>Turmas</label>
                <select>
                  <option>Todas as turmas</option>
                  <option>7º Ano</option>
                  <option>8º Ano</option>
                  <option>9º Ano</option>
                  <option>Ensino Médio</option>
                </select>
              </div>

              <div>
                <label>Status</label>
                <select>
                  <option>Todos os status</option>
                  <option>Presente</option>
                  <option>Ausente</option>
                  <option>Atrasado</option>
                  <option>Justificado</option>
                </select>
              </div>

            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
              <div className="app-card min-h-60 overflow-hidden p-4">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-left dark:border-white/10">
                      <th className="py-3 p-2">#</th>
                      <th>Aluno</th>
                      <th>Turma</th>
                      <th>Entrada</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alunos.map((aluno) => (
                      <tr
                        key={aluno.id}
                        className="border-b border-slate-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-[#101f27]"
                      >
                        <td className="py-3 p-2">{aluno.id}</td>
                        <td>{aluno.nome}</td>
                        <td>{aluno.turma}</td>
                        <td>{aluno.entrada}</td>
                        <td>
                          <span className={aluno.status === "Presente" ? "app-status-green" : aluno.status === "Atrasado" ? "app-status-yellow" : aluno.status === "Justificado" ? "app-status-gray" : "app-status-red"}>
                            {aluno.status}
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
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h2 className="app-report-title">Frequência do dia</h2>
                      <p className="app-muted text-xs">Resumo de hoje</p>
                    </div>
                    <BarChart3 size={20} className="text-[#22c7a9]" />
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[conic-gradient(#22c7a9_0_84%,#ef4444_84%_92%,#f59e0b_92%_97%,#60a5fa_97%_100%)]">
                      <div className="flex h-22 w-22 flex-col items-center justify-center rounded-full bg-white dark:bg-[#0a141a]">
                        <strong className="text-2xl text-gray-900 dark:text-white">84%</strong>
                        <span className="text-xs text-gray-500 dark:text-[#8fb1aa]">Presença</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-500">Presentes</span>
                      <strong>362</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-red-500">Ausentes</span>
                      <strong>34</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-yellow-500">Atrasados</span>
                      <strong>18</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-500">Justificados</span>
                      <strong>14</strong>
                    </div>
                  </div>
                </div>

                <div className="app-card p-4">
                  <h2 className="app-report-title mb-4">Por turma</h2>

                  <div className="space-y-3">
                    {turmas.map((turma) => (
                      <div key={turma.nome} className="grid grid-cols-[70px_1fr_42px] items-center gap-3 text-sm">
                        <span>{turma.nome}</span>
                        <div className="h-2 rounded-full bg-gray-200 dark:bg-white/10">
                          <div
                            className="h-2 rounded-full bg-[#22c7a9]"
                            style={{ width: turma.porcentagem }}
                          />
                        </div>
                        <strong>{turma.porcentagem}</strong>
                      </div>
                    ))}
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
