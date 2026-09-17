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
}from "lucide-react";
import Lohran from "../../../public/lohran.png";
import { useNavigate } from "react-router";

export function Team() {
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
              <div className="app-report-icon blue">
                <Users size={20} />
              </div>
              <div>
                <p>Total de funcionarios</p>
                <span>428</span>
              </div>
            </div>

            <div className="app-report-stat">
              <div className="app-report-icon green">
                <TrendingUp size={20} />
              </div>
              <div>
                <p>Diretores</p>
                <span>82%</span>                
              </div>
            </div>

            <div className="app-report-stat">
              <div className="app-report-icon yellow">
                <AlertTriangle size={20} />
              </div>
              <div>
                <p>Coordenadores</p>
                <span>12</span>                
              </div>
            </div>

            <div className="app-report-stat">
              <div className="app-report-icon red">
                <BarChart3 size={20} />
              </div>
              <div>
                <p>supervisores</p>
                <span>8</span>
                
              </div>
            </div>
            <div className="app-report-stat">
              <div className="app-report-icon red">
                <BarChart3 size={20} />
              </div>
              <div>
                <p>secretarios</p>
                <span>8</span>
                
              </div>
            </div>
            <div className="app-report-stat">
              <div className="app-report-icon red">
                <BarChart3 size={20} />
              </div>
              <div>
                <p>professores</p>
                <span>8</span>
                
              </div>
            </div>

          </div>
            </div>
          </div>
          
        </div>
        
      
    </main>
  );
}
