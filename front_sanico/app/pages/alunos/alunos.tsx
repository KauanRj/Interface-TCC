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
  Search,
  Download,
  Plus,
  BarChart3,
  AlertTriangle,
  UserRound,
  UserCircle,
  ChartNoAxesColumnIncreasing,
  ChartNoAxesCombined,
  UserCheck,
}from "lucide-react";
import Lohran from "../../../public/lohran.png";
import { useNavigate } from "react-router";

export function Alunos() {
  const navigate = useNavigate();

  const alunos = [
    { id: 1, nome: "Ana Clara Silva", turma: "9º Ano A", presenca: "95%", media: "8,7", situacao: "Bom" },
    { id: 2, nome: "Bruno Almeida", turma: "8º Ano B", presenca: "78%", media: "6,9", situacao: "Em atenção" },
    { id: 3, nome: "Carlos Eduardo", turma: "9º Ano A", presenca: "60%", media: "5,4", situacao: "Risco" },
    { id: 4, nome: "Daniela Santos", turma: "7º Ano A", presenca: "88%", media: "7,8", situacao: "Bom" },
  ];  
  return (
    <main className="app-shell block-s">
   
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
            className="app-nav-active"
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
              <h1 className="text-2xl font-bold py-4 p-2">Alunos</h1>
              <p className="app-muted">Gerencie os alunos da sua instituição</p>
            </div>


            <div className="flex items-center gap-4 ">
            <input
              type="text"
              placeholder="Buscar no sistema..."
              className="app-input w-full max-w-80"
            />
          </div>



            <button 
            type="submit"
            className="app-button-relatorio ">
              <Plus size={18} />
              Novo aluno
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
            <div className="app-report-stat relative">
              <div className="app-report-icon blue">
                <UserRound size={20} />
              </div>
              <div>
                <div>
                  <p>Total de alunos</p>
                  <span>428</span>
                </div>

                <div className="flex justify-end gap-1">
                    <ChartNoAxesCombined 
                    size={20}
                    className="absolute bottom-5 right-5 text-blue-300  "
                  />

                </div>
                
                
              </div>
            </div>

            <div className="app-report-stat relative">
              <div className="app-report-icon green">
                <TrendingUp size={20} />
              </div>
              <div>
                <div>
                  <p>Ativos</p>
                  <span>280</span>
                </div>
                
                <div className="flex justify-end gap-1">
                    <ChartNoAxesCombined 
                    size={20}
                    className="absolute bottom-5 right-5 text-green-300  "
                  />

                </div>
              </div>
            </div>

            <div className="app-report-stat relative">
              <div className="app-report-icon yellow">
                <AlertTriangle size={20} />
              </div>
              <div className="  flex justify-around">

                <div>
                  <p>Alunos em atenção</p>
                  <span>12</span>
                </div>
                 

                  <div className="flex justify-end gap-1">
                    <ChartNoAxesCombined 
                    size={20}
                    className="absolute bottom-5 right-5 text-yellow-300  "
                  />

                  </div>
              </div> 
            </div>

            <div className="app-report-stat relative">
              <div className="app-report-icon purple">
                <ChartNoAxesColumnIncreasing size={20} />
              </div>
              <div>
                <div>
                  <p>Novas matrículas</p>
                  <span>8</span>
                </div>

                <div className="flex justify-end gap-1">
                    <ChartNoAxesCombined 
                    size={20}
                    className="absolute bottom-5 right-5 text-purple-300  "
                  />

                  </div>
                
                
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
                <label>Turma</label>
                <select>
                  <option>Todas as turmas</option>
                  <option>9º Ano A</option>
                  <option>9º Ano B</option>
                </select>
              </div>

              <div>
                <label>Status</label>
                <select>
                  <option>Todos</option>
                  <option>Bom</option>
                  <option>Em atenção</option>
                  <option>Risco</option>
                </select>
              </div>

              <div>
                <label>Filtrar</label>
                <select>
                  <option>Todos</option>
                  <option>Ordem alfabética</option>
                  <option>Crescente</option>
                  <option>Decrecente</option>
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
                  className="border-b border-slate-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-[#101f27]"
                >
                  <td className="py-3 p-2  ">{aluno.id}</td>
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

          <div className="flex justify-end gap-2 mt-4">
            <div className="app-card-strong h-10 w-10 ">
            
            </div>
            <div className="app-card h-10 w-10 ">
            
            </div>
            <div className="app-card h-10 w-10 ">
            
            </div>
            <div className="app-card h-10 w-10 ">
            
            </div>
          </div>  
          </div>       
        </div>
        
        
      
    </main>
  );
}
