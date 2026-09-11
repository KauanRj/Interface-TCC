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
  BarChart3,
  AlertTriangle,
  Plus,
  UserRound,
  UserCircle,
  WrenchIcon,
  WrenchOff,
  ChartNoAxesCombined,
  Building2,
  DoorClosed,
}from "lucide-react";
import Lohran from "../../../public/lohran.png";
import { useNavigate } from "react-router";


export function Salas() {
  const salas = [
    { nome: "Sala 1", capacidade: "30", andar: "Térreo", cor: "Em uso" },
    { nome: "Sala 2", capacidade: "25", andar: "1º Andar", cor: "Em manutenção" },
    { nome: "Sala 3", capacidade: "35", andar: "2º Andar", cor: "Disponível" },
    { nome: "Sala 4", capacidade: "20", andar: "Térreo", cor: "Em uso" },
  ];
  const navigate = useNavigate();
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
            className="app-nav-active"
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
              <h1 className="text-2xl font-bold py-4 p-2">Salas e turmas</h1>
              <p className="app-muted">Gerencie as salas e turmas da sua instituição</p>
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
              Nova sala 
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
                <Building2 size={20} />
              </div>
              <div>
                <div>
                  <p>Total de salas</p>
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
                <DoorClosed size={20} />
              </div>
              <div>
                <div>
                  <p>Salas em uso</p>
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
              <div className="app-report-icon gray">
                <DoorOpen size={20} />
              </div>
              <div>
                <div>
                  <p>Salas disponíveis</p>
                  <span>12</span>
                </div>
                

                <div className="flex justify-end gap-1">
                    <ChartNoAxesCombined 
                    size={20}
                    className="absolute bottom-5 right-5 text-gray-300  "
                  />

                </div>
                
              </div>
            </div>

            <div className="app-report-stat relative">
              <div className="app-report-icon red">
                <WrenchOff size={20} />
              </div>  
              <div>
                <div>
                  <p>Salas em manutenção</p>
                  <span>8</span>
                </div>
                

                <div className="flex justify-end gap-1">
                    <ChartNoAxesCombined 
                    size={20}
                    className="absolute bottom-5 right-5 text-red-300  "
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
                  <input placeholder="Buscar sala..." />
                </div>
              </div>



              <div>
                <label>Andar</label>
                <select>
                  <option>Todas os andares</option>
                  <option>Térreo</option>
                  <option>1º Andar</option>
                  <option>2º Andar</option>
                </select>
              </div>

              <div>
                <label>Status</label>
                <select>
                  <option>Todos os status</option>
                  <option>Em uso</option>
                  <option>Em manutenção</option>
                  <option>disponivel</option>
                </select>
              </div>

              <div>
                <label>Aplicar Filtro</label>
                <select>
                  <option>Filtros</option>
                  <option>6° Ano</option>
                  <option>7° Ano</option>
                  <option>8° Ano</option>
                  <option>9° Ano</option>
                  <option>1° Ano EM</option>
                  <option>2° Ano EM</option>
                  <option>3° Ano EM</option>
                </select>
              </div>

            </div>  


            <div className="app-card min-h-60 p-2">

            <table className="w-full text-left border-collapse ">
              <thead>
              <tr className="border-b  border-slate-200 text-left dark:border-white/10">
                
                <th className=" py-3 p-2">Salas</th>
                <th>Capacidade</th>
                <th>Andar</th>
                <th>Status</th>
                <th>Ações</th>
                
              </tr>
            </thead>
              <tbody>
              {salas.map((salas) => (
                <tr
                  key={salas.nome}
                  className="border-b border-slate-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-[#101f27]"
                >
                  <td className="py-3 p-2  ">{salas.nome}</td>
                  <td>{salas.capacidade}</td>
                  <td>{salas.andar}</td>
                  <td>
                    
                    <span className={salas.cor === "Em uso" ? "app-status-green" : salas.cor === "Em manutenção" ? "app-status-red" : "app-status-gray"}>
                      {salas.cor}
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
