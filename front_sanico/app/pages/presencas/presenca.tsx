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



            <button 
            type="button"
            className="app-button-relatorio w-50 ">
              <FilePlus size={18} />
              Registrar presença
            </button>
          
          
            <div className="flex items-center gap-4">
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
            

          <div className="app-card min-h-60 p-4">

            <table className="w-full text-left border-collapse ">
              <thead>
              <tr className="border-b  border-slate-200 text-left dark:border-white/10">
                <th className=" py-3 p-2">#</th>
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
                  <td className="py-3 p-2  ">{aluno.id}</td>
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

        </div>

        </div>
  
        
      
    </main>
  );
}
